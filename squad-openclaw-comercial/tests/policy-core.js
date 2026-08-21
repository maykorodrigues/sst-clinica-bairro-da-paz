const crypto = require('crypto');

const ALLOWLIST = new Set([
  'responder_conversa',
  'criar_card_echat',
  'atualizar_card_echat',
  'mover_card_estagio',
  'registrar_nota_interna',
  'transferir_para_humano',
  'agendar_followup',
  'enviar_template_aprovado',
  'solicitar_segunda_via',
  'notificar_equipe_interna',
  'registrar_no_vault',
  'espelhar_no_notion',
  'consultar_status_leitura',
  'abrir_chamado_interno',
  'sinalizar_risco',
  'bloquear_execucao',
]);

const UUID_V4 = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
const CPF_FORMATADO = /\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/;

function sha256(value) {
  return crypto.createHash('sha256').update(String(value || '')).digest('hex');
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function isExpired(expiresAt, now = new Date()) {
  const parsed = new Date(expiresAt);
  if (Number.isNaN(parsed.getTime())) return true;
  return parsed.getTime() <= now.getTime();
}

function hasSensitivePayload(intent) {
  const payload = intent && intent.payload ? intent.payload : {};
  const message = String(payload.mensagem || '');
  if (CPF_FORMATADO.test(message)) return true;
  if (/\bcpf\b/i.test(message)) return true;
  return false;
}

function validateIntentShape(intent, now = new Date()) {
  const errors = [];
  if (!intent || typeof intent !== 'object' || Array.isArray(intent)) {
    return ['intencao_nao_e_objeto'];
  }

  const required = [
    'intent_id',
    'created_at',
    'actor',
    'agent',
    'action',
    'dry_run',
    'target',
    'reason',
    'source_paths',
    'approval',
    'payload',
    'expires_at',
  ];

  for (const key of required) {
    if (!(key in intent)) errors.push(`campo_obrigatorio_ausente:${key}`);
  }

  if (!UUID_V4.test(String(intent.intent_id || ''))) errors.push('intent_id_invalido');
  if (!ALLOWLIST.has(intent.action)) errors.push('acao_fora_da_allowlist');
  if (asArray(intent.source_paths).length === 0) errors.push('source_paths_ausente');
  if (typeof intent.dry_run !== 'boolean') errors.push('dry_run_invalido');
  if (!intent.approval || typeof intent.approval.required !== 'boolean') {
    errors.push('approval_required_invalido');
  }
  if (!intent.target || typeof intent.target.system !== 'string') {
    errors.push('target_system_ausente');
  }
  if (typeof intent.reason !== 'string' || intent.reason.length < 20) {
    errors.push('reason_curto_ou_ausente');
  }
  if (isExpired(intent.expires_at, now)) errors.push('expires_at_vencido');
  if (hasSensitivePayload(intent)) errors.push('payload_com_dado_sensivel');

  return errors;
}

function evaluateIntent(intent, options = {}, store) {
  const now = options.now || new Date();
  const killSwitch = options.killSwitch === true;
  const autonomy = intent && intent.autonomy_level ? intent.autonomy_level : (options.autonomyLevel || 'L0');
  const result = {
    status: 'registrado',
    execute: false,
    dry_run: intent ? intent.dry_run : true,
    reasons: [],
    alerts: [],
    divergences: [],
    route: 'espelho',
    intent,
  };

  if (killSwitch) {
    result.status = 'bloqueado';
    result.reasons.push('kill_switch_ativo');
    result.alerts.push('alerta_interno_kill_switch');
    return result;
  }

  const shapeErrors = validateIntentShape(intent, now);
  if (shapeErrors.length > 0) {
    result.status = 'rejeitado';
    result.reasons.push(...shapeErrors);
    return result;
  }

  if ((autonomy === 'L0' || autonomy === 'L1') && intent.dry_run === false) {
    result.dry_run = true;
    result.intent = { ...intent, dry_run: true };
    result.divergences.push('dry_run_false_forcado_para_true_em_L0_L1');
  }

  if (store && store.hasIntent(intent.intent_id)) {
    result.status = 'rejeitado';
    result.reasons.push('intent_id_duplicado');
    return result;
  }

  if (store) store.registerIntent(intent.intent_id, { intent, registered_at: now.toISOString() });

  if (options.dailySentCount >= options.dailyLimit) {
    result.status = 'bloqueado';
    result.reasons.push('teto_diario_estourado');
    result.alerts.push('alerta_teto_diario');
    return result;
  }

  if (result.dry_run === true) {
    result.status = result.divergences.length > 0 ? 'registrado_com_divergencia' : 'registrado';
    result.route = 'dry_run';
    return result;
  }

  if (intent.approval.required === true && !intent.approval.approved_by) {
    result.status = 'fila_humana';
    result.reasons.push('aprovacao_humana_pendente');
    result.route = 'fila_aprovacao';
    return result;
  }

  result.status = 'aprovado_para_fase_futura';
  result.reasons.push('f5_nao_implementado_modo_espelho');
  return result;
}

function minimizeEventPayload(event) {
  const body = event.body || event;
  const headers = event.headers || {};
  const rawText = String(body.message || body.text || body.content || '');
  return {
    event_id: String(body.event_id || body.id || ''),
    event_type: String(body.event_type || body.type || body.event || 'desconhecido'),
    channel: String(body.channel || body.canal || 'desconhecido'),
    conversation_id: String(body.conversation_id || body.conversation?.id || ''),
    message_id: String(body.message_id || body.message?.id || ''),
    occurred_at: String(body.occurred_at || body.timestamp || new Date().toISOString()),
    raw_text_sha256: rawText ? sha256(rawText) : null,
    raw_text_length: rawText.length,
    has_attachment: Boolean(body.attachment || body.attachments?.length),
    source_system: 'e-chat',
    signature_header_seen: Object.keys(headers).some((key) => /^x-|assinatura|signature/i.test(key)),
  };
}

function validateSignature(event, env = {}) {
  const headerName = env.ECHAT_SIGNATURE_HEADER;
  const secret = env.ECHAT_WEBHOOK_SECRET;
  if (!headerName || !secret) {
    return { ok: false, reason: 'assinatura_nao_configurada_placeholder_eas' };
  }
  const headers = event.headers || {};
  const received = headers[headerName] || headers[headerName.toLowerCase()];
  if (!received) return { ok: false, reason: 'assinatura_ausente' };

  const rawBody = typeof event.rawBody === 'string' ? event.rawBody : JSON.stringify(event.body || event);
  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
  const normalized = String(received).replace(/^sha256=/, '');
  const ok = normalized.length === expected.length &&
    crypto.timingSafeEqual(Buffer.from(normalized), Buffer.from(expected));
  return { ok, reason: ok ? 'assinatura_valida' : 'assinatura_invalida' };
}

function processEvent(event, env = {}, store) {
  const now = env.now || new Date();
  const signature = validateSignature(event, env);
  const minimized = minimizeEventPayload(event);
  const eventId = minimized.event_id;
  const result = {
    status: 'registrado',
    http_status: 200,
    process_brain: false,
    minimized,
    reasons: [],
    alerts: [],
  };

  if (!signature.ok) {
    result.status = 'rejeitado';
    result.http_status = 401;
    result.reasons.push(signature.reason);
    return result;
  }

  if (!eventId) {
    result.status = 'rejeitado';
    result.http_status = 400;
    result.reasons.push('event_id_ausente');
    return result;
  }

  if (store && store.hasEvent(eventId)) {
    result.status = 'duplicado';
    result.reasons.push('event_id_duplicado_24h');
    return result;
  }

  if (store) store.registerEvent(eventId, { minimized, expires_at: new Date(now.getTime() + 86400000).toISOString() });

  if (env.PAUSAR_DIRETOR_COMERCIAL === true || env.PAUSAR_DIRETOR_COMERCIAL === 'true') {
    result.status = 'registrado_pausado';
    result.reasons.push('kill_switch_ativo');
    result.alerts.push('alerta_interno_kill_switch');
    return result;
  }

  result.status = 'registrado_modo_espelho';
  result.reasons.push('f1_nao_chama_cerebro_nesta_fase');
  return result;
}

function handleBrainConsultation(options = {}) {
  if (options.killSwitch) {
    return { status: 'bloqueado', execute: false, retry: false, reasons: ['kill_switch_ativo'] };
  }
  if (options.openclawAvailable === false || options.timeout === true) {
    return {
      status: 'fila_humana',
      execute: false,
      retry: false,
      reasons: [options.timeout ? 'timeout_openclaw_30s' : 'openclaw_indisponivel'],
    };
  }
  return { status: 'espelho_sem_consulta_real', execute: false, retry: false, reasons: ['f2_nao_ativa_nesta_entrega'] };
}

function executionPreflight(options = {}) {
  if (options.killSwitch) {
    return { status: 'bloqueado', execute: false, channel_switch: false, reasons: ['kill_switch_ativo'] };
  }
  if (options.echatAvailable === false) {
    return { status: 'fila_humana', execute: false, channel_switch: false, reasons: ['e_chat_indisponivel'] };
  }
  return { status: 'f5_nao_implementado', execute: false, channel_switch: false, reasons: ['sem_endpoint_confirmado_echat'] };
}

module.exports = {
  ALLOWLIST,
  validateIntentShape,
  evaluateIntent,
  processEvent,
  minimizeEventPayload,
  validateSignature,
  handleBrainConsultation,
  executionPreflight,
  sha256,
};
