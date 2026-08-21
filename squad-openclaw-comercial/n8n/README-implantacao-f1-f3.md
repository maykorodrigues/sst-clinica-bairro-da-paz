---
title: Implantação F1-F3 em modo espelho
tags: [sst, n8n, openclaw, modo-espelho, testes]
related: ["[[blueprint-orquestracao-comercial]]", "[[kill-switch-e-idempotencia]]"]
criado: 2026-08-21
---

# Implantação F1-F3 em modo espelho

## Entregas desta camada

| Arquivo | Função |
|---|---|
| `sst-f1-entrada-echat.workflow.json` | Recebe webhook do E-Chat, valida assinatura via variáveis de ambiente, deduplica `event_id` por 24h, minimiza payload e registra. Não chama o cérebro. |
| `sst-f3-politica.workflow.json` | Recebe intenção estruturada do cérebro, valida política, força `dry_run` em L0/L1, aplica kill switch e registra idempotência de `intent_id`. Não executa F5. |
| `idempotencia-postgres.sql` | Cria a tabela persistente `sst_openclaw_idempotencia`. Não usar memória do n8n para dedupe. |
| `../tests/policy-core.js` | Núcleo testável da política. |
| `../tests/run-kill-switch-idempotencia-tests.js` | Suíte local com os 12 casos de `kill-switch-e-idempotencia.md`. |

## Variáveis de ambiente

Valores ficam no cofre do n8n. Este pacote só referencia os nomes:

| Variável | Uso |
|---|---|
| `ECHAT_SIGNATURE_HEADER` | Nome do header de assinatura que a EAS confirmar. Placeholder enquanto o contrato do E-Chat não existir. |
| `ECHAT_WEBHOOK_SECRET` | Segredo para HMAC-SHA256 do webhook. |
| `PAUSAR_DIRETOR_COMERCIAL` | Kill switch global. `true` bloqueia processamento e execução. |

## Persistência

A tabela `sst_openclaw_idempotencia` guarda:

- `event` por 24h para F1;
- `intent` por 7 dias para F3;
- `policy_log` e `event_rejeitado` para auditoria.

## Limite desta entrega

F5 não existe aqui. Nenhum workflow chama endpoint de envio do E-Chat, Evolution, Chatwoot, WhatsApp, Notion ou GPTMaker. A única saída é ACK técnico do webhook e registro persistente.

## Como testar localmente

```powershell
cd C:\Users\mayko\meu-cerebro\01-projetos\consultoria-comercial\clientes\SST_Clinica_Bairro_da_Paz\squad-openclaw-comercial
node .\tests\run-kill-switch-idempotencia-tests.js
```

Critério: `12/12 testes passaram`.
