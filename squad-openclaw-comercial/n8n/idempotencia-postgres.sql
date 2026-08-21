-- SST · OpenClaw Comercial · tabela persistente de idempotência
-- Rodar uma vez no PostgreSQL usado pelo n8n ou em banco leve dedicado na VPS.
-- Não guardar credenciais neste arquivo; configurar acesso no cofre do n8n.

CREATE TABLE IF NOT EXISTS sst_openclaw_idempotencia (
  key_type text NOT NULL,
  key_value text NOT NULL,
  first_seen_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz,
  status text NOT NULL DEFAULT 'received',
  hit_count integer NOT NULL DEFAULT 1,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  PRIMARY KEY (key_type, key_value)
);

CREATE INDEX IF NOT EXISTS sst_openclaw_idempotencia_expires_at_idx
  ON sst_openclaw_idempotencia (expires_at);

CREATE INDEX IF NOT EXISTS sst_openclaw_idempotencia_status_idx
  ON sst_openclaw_idempotencia (status);

-- Limpeza segura para eventos de entrada. Intenções podem reter 7 dias ou mais.
-- Executar em rotina separada, não dentro dos webhooks.
DELETE FROM sst_openclaw_idempotencia
WHERE expires_at IS NOT NULL
  AND expires_at < now()
  AND key_type IN ('event', 'event_rejeitado', 'policy_log');
