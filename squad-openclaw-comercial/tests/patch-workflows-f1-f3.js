const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
}

function writeJson(file, data) {
  fs.writeFileSync(path.join(root, file), `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

function nodeByName(workflow, name) {
  const node = workflow.nodes.find((candidate) => candidate.name === name);
  if (!node) throw new Error(`No ausente: ${name}`);
  return node;
}

function connect(workflow, from, outputIndex, to) {
  workflow.connections[from] = workflow.connections[from] || { main: [] };
  workflow.connections[from].main = workflow.connections[from].main || [];
  while (workflow.connections[from].main.length <= outputIndex) {
    workflow.connections[from].main.push([]);
  }
  if (!workflow.connections[from].main[outputIndex].some((edge) => edge.node === to)) {
    workflow.connections[from].main[outputIndex].push({ node: to, type: 'main', index: 0 });
  }
}

function upsertNode(workflow, node) {
  const index = workflow.nodes.findIndex((candidate) => candidate.name === node.name);
  if (index >= 0) workflow.nodes[index] = node;
  else workflow.nodes.push(node);
}

function fallbackQuery(statusExpression, ttlExpression) {
  return `WITH entrada AS (
  SELECT
    '{{ $json.idempotency_key_type }}'::text AS key_type,
    '{{ $json.idempotency_key_value }}'::text AS key_value,
    {{ JSON.stringify($json.metadata || $json.log_payload).replace(/'/g, "''") }}::jsonb AS metadata
), inserido AS (
  INSERT INTO sst_openclaw_idempotencia (key_type, key_value, expires_at, status, metadata)
  SELECT key_type, key_value, ${ttlExpression}, ${statusExpression}, metadata
  FROM entrada
  ON CONFLICT (key_type, key_value) DO NOTHING
  RETURNING true AS inserted, key_type, key_value, status, hit_count, metadata
), atualizado AS (
  UPDATE sst_openclaw_idempotencia t
  SET last_seen_at = now(), hit_count = t.hit_count + 1
  FROM entrada e
  WHERE t.key_type = e.key_type
    AND t.key_value = e.key_value
    AND NOT EXISTS (SELECT 1 FROM inserido)
  RETURNING false AS inserted, t.key_type, t.key_value, t.status, t.hit_count, t.metadata
), resultado AS (
  SELECT * FROM inserido
  UNION ALL
  SELECT * FROM atualizado
)
SELECT * FROM resultado
UNION ALL
SELECT false AS inserted, e.key_type, e.key_value, 'fallback_sem_linha'::text AS status, 0 AS hit_count, e.metadata
FROM entrada e
WHERE NOT EXISTS (SELECT 1 FROM resultado);`;
}

const f1 = readJson('n8n/sst-f1-entrada-echat.workflow.json');
nodeByName(f1, 'Webhook E-Chat (INFERIDO)').parameters.options.rawBody = true;

const f1Postgres = nodeByName(f1, 'Postgres · registrar idempotência do evento');
f1Postgres.onError = 'continueErrorOutput';
f1Postgres.retryOnFail = false;
f1Postgres.parameters.query = fallbackQuery("'{{ $json.status_pre_banco }}'", "now() + interval '24 hours'");

nodeByName(f1, 'Log espelho sem chamar cérebro').parameters.jsCode = `const banco = $input.first().json || {};
const pre = $('Validar assinatura e minimizar payload').first().json;
const duplicado = pre.idempotency_key_type === 'event' && banco.inserted !== true;

let status = pre.status_pre_banco;
let httpStatus = pre.http_status_pre_banco;
let motivo = pre.motivo_pre_banco;

if (duplicado) {
  status = 'duplicado';
  httpStatus = 200;
  motivo = 'event_id_duplicado_24h';
}

if (status === 'validado') {
  status = 'registrado_modo_espelho';
  motivo = 'f1_nao_chama_cerebro_nesta_fase';
}

return [{ json: {
  workflow: 'SST · F1 Entrada E-Chat',
  status,
  motivo,
  http_status: httpStatus,
  process_brain: false,
  sends_external_message: false,
  duplicate: duplicado,
  idempotency: {
    key_type: banco.key_type,
    key_value: banco.key_value,
    inserted: banco.inserted === true,
    hit_count: banco.hit_count || 0
  },
  mirror_mode: true
} }];`;

upsertNode(f1, {
  parameters: {
    jsCode: `const pre = $('Validar assinatura e minimizar payload').first().json;
return [{ json: {
  workflow: 'SST · F1 Entrada E-Chat',
  status: 'fila_humana',
  motivo: 'falha_persistencia_idempotencia',
  http_status: 200,
  process_brain: false,
  sends_external_message: false,
  retry_automatico: false,
  alerts: ['alerta_falha_banco_idempotencia'],
  idempotency: {
    key_type: pre.idempotency_key_type,
    key_value: pre.idempotency_key_value,
    inserted: false,
    hit_count: 0
  },
  mirror_mode: true
} }];`,
  },
  id: 'f1-falha-banco-fila-humana',
  name: 'Fila humana por falha de banco',
  type: 'n8n-nodes-base.code',
  typeVersion: 2,
  position: [-20, 420],
  notes: 'Falha de persistência é fail-closed: registra alerta e não reprocessa automaticamente.',
});
connect(f1, 'Postgres · registrar idempotência do evento', 1, 'Fila humana por falha de banco');
connect(f1, 'Fila humana por falha de banco', 0, 'Responder ao E-Chat (somente ACK)');
writeJson('n8n/sst-f1-entrada-echat.workflow.json', f1);

const f3 = readJson('n8n/sst-f3-politica.workflow.json');
const f3Policy = nodeByName(f3, 'Function · validar schema e política');
let policyCode = f3Policy.parameters.jsCode;
policyCode = policyCode.replace(
  'const errors = [];\nconst divergences = [];\nconst alerts = [];',
  'const errors = [];\nconst divergences = [];\nconst alerts = [];\nconst tetoDiario = Number($env.TETO_MENSAGENS_DIA || 20);\nconst mensagensHoje = Number(input.mensagens_automaticas_hoje || intent.mensagens_automaticas_hoje || 0);',
);
policyCode = policyCode.replace(
  `} else if (errors.length > 0) {
  status = 'rejeitado';
  route = 'rejeitado';
  reason = errors.join(',');
  keyType = 'policy_log';
} else if ((intent.autonomy_level === 'L0' || intent.autonomy_level === 'L1' || !intent.autonomy_level) && intent.dry_run === false) {`,
  `} else if (errors.length > 0) {
  status = 'rejeitado';
  route = 'rejeitado';
  reason = errors.join(',');
  keyType = 'policy_log';
} else if (mensagensHoje >= tetoDiario) {
  status = 'bloqueado';
  route = 'bloqueado';
  reason = 'teto_diario_estourado';
  alerts.push('alerta_teto_diario');
  keyType = 'policy_log';
} else if ((intent.autonomy_level === 'L0' || intent.autonomy_level === 'L1' || !intent.autonomy_level) && intent.dry_run === false) {`,
);
policyCode = policyCode.replace(
  `dry_run: effectiveIntent.dry_run !== false,
    sends_external_message: false,`,
  `dry_run: effectiveIntent.dry_run !== false,
    teto_diario: tetoDiario,
    mensagens_automaticas_hoje: mensagensHoje,
    sends_external_message: false,`,
);
f3Policy.parameters.jsCode = policyCode;

const f3Postgres = nodeByName(f3, 'Postgres · registrar idempotência da intenção');
f3Postgres.onError = 'continueErrorOutput';
f3Postgres.retryOnFail = false;
f3Postgres.parameters.query = fallbackQuery(
  "'{{ $json.status_pre_banco }}'",
  "CASE WHEN key_type = 'intent' THEN now() + interval '7 days' ELSE now() + interval '24 hours' END",
);

nodeByName(f3, 'Decisão final sem F5').parameters.jsCode = `const banco = $input.first().json || {};
const pre = $('Function · validar schema e política').first().json;
let status = pre.status_pre_banco;
let route = pre.route_pre_banco;
let reason = pre.reason_pre_banco;
const duplicate = banco.key_type === 'intent' && banco.inserted !== true;

if (duplicate) {
  status = 'rejeitado';
  route = 'rejeitado';
  reason = 'intent_id_duplicado';
}

let approvalRequired = Boolean(pre.intent?.approval?.required);
if (approvalRequired && status === 'registrado') {
  status = 'fila_humana';
  route = 'fila_aprovacao';
  reason = 'aprovacao_humana_pendente';
}

return [{ json: {
  workflow: 'SST · F3 Política',
  status,
  route,
  reason,
  execute: false,
  sends_external_message: false,
  f5_enabled: false,
  mirror_mode: true,
  dry_run: pre.intent?.dry_run !== false,
  duplicate,
  errors: pre.errors,
  divergences: pre.divergences,
  alerts: pre.alerts,
  idempotency: {
    key_type: banco.key_type,
    key_value: banco.key_value,
    inserted: banco.inserted === true,
    hit_count: banco.hit_count || 0
  },
  intent: pre.intent
} }];`;

upsertNode(f3, {
  parameters: {
    jsCode: `const pre = $('Function · validar schema e política').first().json;
return [{ json: {
  workflow: 'SST · F3 Política',
  status: 'fila_humana',
  route: 'fila_humana',
  reason: 'falha_persistencia_idempotencia',
  execute: false,
  sends_external_message: false,
  f5_enabled: false,
  mirror_mode: true,
  retry_automatico: false,
  dry_run: true,
  errors: pre.errors || [],
  divergences: pre.divergences || [],
  alerts: ['alerta_falha_banco_idempotencia'],
  idempotency: {
    key_type: pre.idempotency_key_type,
    key_value: pre.idempotency_key_value,
    inserted: false,
    hit_count: 0
  },
  intent: pre.intent
} }];`,
  },
  id: 'f3-falha-banco-fila-humana',
  name: 'Fila humana por falha de banco',
  type: 'n8n-nodes-base.code',
  typeVersion: 2,
  position: [-60, 460],
  notes: 'Falha de persistência é fail-closed: alerta, fila humana e nenhum retry automático.',
});
connect(f3, 'Postgres · registrar idempotência da intenção', 1, 'Fila humana por falha de banco');
connect(f3, 'Fila humana por falha de banco', 0, 'Responder política (espelho)');
writeJson('n8n/sst-f3-politica.workflow.json', f3);
