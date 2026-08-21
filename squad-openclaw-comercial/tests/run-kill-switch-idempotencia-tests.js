const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const {
  evaluateIntent,
  processEvent,
  handleBrainConsultation,
  executionPreflight,
} = require('./policy-core');

class FileBackedStore {
  constructor(filePath) {
    this.filePath = filePath;
    this.state = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, 'utf8'))
      : { events: {}, intents: {} };
  }

  save() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.state, null, 2));
  }

  hasEvent(eventId) {
    return Boolean(this.state.events[eventId]);
  }

  registerEvent(eventId, payload) {
    this.state.events[eventId] = payload;
    this.save();
  }

  hasIntent(intentId) {
    return Boolean(this.state.intents[intentId]);
  }

  registerIntent(intentId, payload) {
    this.state.intents[intentId] = payload;
    this.save();
  }
}

function signedEvent(body, env) {
  const rawBody = JSON.stringify(body);
  const signature = crypto.createHmac('sha256', env.ECHAT_WEBHOOK_SECRET).update(rawBody).digest('hex');
  return { body, rawBody, headers: { [env.ECHAT_SIGNATURE_HEADER]: `sha256=${signature}` } };
}

function validIntent(overrides = {}) {
  return {
    intent_id: overrides.intent_id || crypto.randomUUID(),
    created_at: overrides.created_at || '2026-08-21T09:14:00-03:00',
    actor: overrides.actor || 'diretor-comercial-openclaw',
    agent: overrides.agent || 'A2',
    action: overrides.action || 'registrar_nota_interna',
    dry_run: overrides.dry_run ?? true,
    autonomy_level: overrides.autonomy_level || 'L0',
    target: overrides.target || { system: 'e-chat', record_id: 'conv-ficticia-001', channel: 'whatsapp_oficial' },
    reason: overrides.reason || 'Contato ficticio registrado em modo espelho para validar a camada de politica.',
    source_paths: overrides.source_paths ?? ['squad-openclaw-comercial/tests/run-kill-switch-idempotencia-tests.js'],
    approval: overrides.approval || { required: false, reason_required: 'nenhum', approved_by: null, approved_at: null },
    payload: overrides.payload || { mensagem: 'Mensagem ficticia em modo espelho, sem envio externo.' },
    guardrails: overrides.guardrails || {
      sem_dado_sensivel: true,
      sem_preco_nao_aprovado: true,
      sem_promessa_clinica: true,
      opt_out_verificado: true,
      dentro_do_horario_comercial: true,
      toques_no_dia: 0,
    },
    expires_at: overrides.expires_at || '2026-08-21T12:14:00-03:00',
    kill_switch_checked: overrides.kill_switch_checked ?? true,
  };
}

function freshStore() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'sst-policy-'));
  return new FileBackedStore(path.join(dir, 'idempotencia.json'));
}

const now = new Date('2026-08-21T10:00:00-03:00');
const env = {
  ECHAT_SIGNATURE_HEADER: 'x-assinatura-echat-teste',
  ECHAT_WEBHOOK_SECRET: 'segredo-ficticio-de-teste',
  PAUSAR_DIRETOR_COMERCIAL: false,
};

const tests = [
  {
    name: '1. Kill switch acionado registra evento, nao processa e alerta',
    run() {
      const store = freshStore();
      const event = signedEvent({ event_id: 'evt-001', message: 'oi' }, env);
      const result = processEvent(event, { ...env, PAUSAR_DIRETOR_COMERCIAL: true, now }, store);
      assert.strictEqual(result.status, 'registrado_pausado');
      assert.strictEqual(result.process_brain, false);
      assert.ok(result.alerts.includes('alerta_interno_kill_switch'));
      assert.ok(store.hasEvent('evt-001'));
    },
  },
  {
    name: '2. Mesmo event_id duas vezes processa uma vez so',
    run() {
      const store = freshStore();
      const event = signedEvent({ event_id: 'evt-002', message: 'oi' }, env);
      const first = processEvent(event, { ...env, now }, store);
      const second = processEvent(event, { ...env, now }, store);
      assert.strictEqual(first.status, 'registrado_modo_espelho');
      assert.strictEqual(second.status, 'duplicado');
      assert.strictEqual(second.process_brain, false);
    },
  },
  {
    name: '3. Mesma intencao duas vezes rejeita a segunda',
    run() {
      const store = freshStore();
      const intent = validIntent({ intent_id: '11111111-1111-4111-8111-111111111111' });
      const first = evaluateIntent(intent, { now }, store);
      const second = evaluateIntent(intent, { now }, store);
      assert.strictEqual(first.status, 'registrado');
      assert.strictEqual(second.status, 'rejeitado');
      assert.ok(second.reasons.includes('intent_id_duplicado'));
      assert.strictEqual(second.execute, false);
    },
  },
  {
    name: '4. Intencao vencida e rejeitada',
    run() {
      const result = evaluateIntent(validIntent({ expires_at: '2026-08-21T09:00:00-03:00' }), { now }, freshStore());
      assert.strictEqual(result.status, 'rejeitado');
      assert.ok(result.reasons.includes('expires_at_vencido'));
    },
  },
  {
    name: '5. Acao fora da allowlist e rejeitada',
    run() {
      const result = evaluateIntent(validIntent({ action: 'enviar_whatsapp_direto' }), { now }, freshStore());
      assert.strictEqual(result.status, 'rejeitado');
      assert.ok(result.reasons.includes('acao_fora_da_allowlist'));
    },
  },
  {
    name: '6. Intencao sem source_paths e rejeitada',
    run() {
      const result = evaluateIntent(validIntent({ source_paths: [] }), { now }, freshStore());
      assert.strictEqual(result.status, 'rejeitado');
      assert.ok(result.reasons.includes('source_paths_ausente'));
    },
  },
  {
    name: '7. L0 com dry_run false e forcado para true',
    run() {
      const result = evaluateIntent(validIntent({ dry_run: false, autonomy_level: 'L0' }), { now }, freshStore());
      assert.strictEqual(result.status, 'registrado_com_divergencia');
      assert.strictEqual(result.dry_run, true);
      assert.ok(result.divergences.includes('dry_run_false_forcado_para_true_em_L0_L1'));
      assert.strictEqual(result.execute, false);
    },
  },
  {
    name: '8. Item aprovado nao executa se kill switch liga antes',
    run() {
      const result = evaluateIntent(
        validIntent({
          dry_run: false,
          autonomy_level: 'L2',
          approval: { required: false, reason_required: 'nenhum', approved_by: 'Mayko', approved_at: '2026-08-21T09:30:00-03:00' },
        }),
        { now, killSwitch: true },
        freshStore(),
      );
      assert.strictEqual(result.status, 'bloqueado');
      assert.ok(result.reasons.includes('kill_switch_ativo'));
      assert.strictEqual(result.execute, false);
    },
  },
  {
    name: '9. OpenClaw fora do ar vai para fila humana sem reenvio',
    run() {
      const result = handleBrainConsultation({ openclawAvailable: false });
      assert.strictEqual(result.status, 'fila_humana');
      assert.strictEqual(result.retry, false);
      assert.strictEqual(result.execute, false);
    },
  },
  {
    name: '10. E-Chat fora do ar nao troca de canal',
    run() {
      const result = executionPreflight({ echatAvailable: false });
      assert.strictEqual(result.status, 'fila_humana');
      assert.strictEqual(result.channel_switch, false);
      assert.strictEqual(result.execute, false);
    },
  },
  {
    name: '11. Teto diario estourado bloqueia e alerta',
    run() {
      const result = evaluateIntent(
        validIntent({ dry_run: false, autonomy_level: 'L2' }),
        { now, dailySentCount: 20, dailyLimit: 20 },
        freshStore(),
      );
      assert.strictEqual(result.status, 'bloqueado');
      assert.ok(result.reasons.includes('teto_diario_estourado'));
      assert.ok(result.alerts.includes('alerta_teto_diario'));
      assert.strictEqual(result.execute, false);
    },
  },
  {
    name: '12. Payload com CPF na mensagem e rejeitado pela regra de dado sensivel',
    run() {
      const result = evaluateIntent(
        validIntent({ payload: { mensagem: 'Paciente ficticio informou CPF 123.456.789-09 no texto.' } }),
        { now },
        freshStore(),
      );
      assert.strictEqual(result.status, 'rejeitado');
      assert.ok(result.reasons.includes('payload_com_dado_sensivel'));
      assert.strictEqual(result.execute, false);
    },
  },
];

let passed = 0;
for (const test of tests) {
  test.run();
  passed += 1;
  console.log(`OK - ${test.name}`);
}

console.log(`\n${passed}/${tests.length} testes passaram.`);

