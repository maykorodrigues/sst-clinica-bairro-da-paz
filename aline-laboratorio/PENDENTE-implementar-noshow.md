---
title: PENDENTE — Implementar Cadência No-Show com Aline
tags: [sst, laboratorio, aline, noshow, pendente, #urgente]
aliases: [Pendente No-Show Aline]
related: [[cadencia-noshow-laboratorio]], [[sessao-acompanhamento-aline-06-05-2026]], [[briefing-madip-aline-29-04-2026]]
criado: 2026-05-06
atualizado: 2026-05-06
---

# PENDENTE — Implementar Processo de No-Show com Aline

> Criado em 06/05/2026 após MADIP com Aline + Rogério.
> **No-show atual: ~40% dos pacientes agendados não comparecem — maior oportunidade de receita imediata da clínica.**

---

## Por que isso é urgente

Aline tem 38% de conversão hoje. Meta é 70%.
A rota mais rápida NÃO é converter mais orçamentos novos — é **recuperar os 40% que já agendaram e não vieram**.

Esses pacientes já decidiram comprar. Só precisam de acompanhamento sistemático.

**Exemplo real (Aline, 06/05):** Orçamento de R$3.000 pode representar apenas 2–4 pacientes no-show.

---

## O que já está pronto (só precisar ativar)

| Entrega | Arquivo | Status |
|---|---|---|
| Cadência documentada (D+1, D+3, D+7, D+14) | `cadencia-noshow-laboratorio.md` | ✅ Pronto |
| Schema Google Sheets (14 colunas) | `cadencia-noshow-laboratorio.md` | ✅ Pronto |
| Workflow n8n — Cadência automática | `n8n-noshow-cadencia.json` | ✅ Pronto para importar |
| Workflow n8n — Webhook de resposta | `n8n-noshow-webhook-resposta.json` | ✅ Pronto para importar |
| Scripts D+1, D+3, D+7 personalizados | `cadencia-noshow-laboratorio.md` | ✅ Prontos |
| Formulário diagnóstico IA (pré-qualificação) | `cadencia-noshow-laboratorio.md` | ✅ Documentado |

---

## Checklist de Implementação

### Etapa 1 — Observação ao vivo com Aline (07/05 às 13h)
- [ ] Ligar para Aline às 13h
- [ ] Ouvir ligações de conversão ao vivo (1–2 horas)
- [ ] Registrar método real: o que ela diz, como contorna objeções, onde o paciente trava
- [ ] Ajustar scripts D+1/D+3/D+7 com linguagem real da Aline
- [ ] Coletar lista de no-shows dos últimos 14 dias (primeiro lote da cadência)

### Etapa 2 — Configurar Google Sheets (07/05 após observação)
- [ ] Criar aba **"No-Show Lab"** na planilha SST existente
- [ ] Adicionar as 14 colunas do schema (ver `cadencia-noshow-laboratorio.md`)
- [ ] Preencher os no-shows coletados com Aline como primeiro lote
- [ ] Compartilhar planilha com Aline e Débora para preencherem diariamente

### Etapa 3 — Importar e configurar n8n (08/05)
- [ ] Importar `n8n-noshow-cadencia.json`
- [ ] Importar `n8n-noshow-webhook-resposta.json`
- [ ] Criar credencial **Google Sheets OAuth2** e substituir nos nodes
- [ ] Criar credencial **Telegram Bot** e substituir nos nodes
- [ ] Configurar variáveis de ambiente no n8n:

```
SST_SHEETS_ID          = ID da planilha (da URL do Sheets)
EVOLUTION_API_URL      = URL base da Evolution API
EVOLUTION_INSTANCE_LAB = nome da instância do laboratório
EVOLUTION_API_KEY      = API Key da Evolution
TELEGRAM_CHAT_ID_ALINE = Chat ID do Telegram da Aline
```

### Etapa 4 — Conectar webhook (08/05)
- [ ] Ativar workflow de webhook no n8n
- [ ] Copiar URL gerada (`/webhook/sst-noshow-resposta`)
- [ ] Configurar na Evolution API como destino de eventos de mensagem recebida
- [ ] Testar enviando uma mensagem de um número de teste

### Etapa 5 — Teste completo antes de ativar (08/05)
- [ ] Criar 3 linhas de teste no Sheets com números próprios
- [ ] Datas retroativas: hoje-1 dia, hoje-3 dias, hoje-7 dias
- [ ] Executar workflow manualmente (não pelo cron)
- [ ] Confirmar que 3 mensagens chegaram com conteúdo correto
- [ ] Confirmar que Telegram recebeu notificações
- [ ] Confirmar que Sheets foi atualizado (fase_cadencia, data_ultimo_contato, log)
- [ ] Responder de um número de teste → confirmar alerta "Paciente Respondeu!" no Telegram
- [ ] Confirmar que segunda mensagem NÃO foi enviada para quem respondeu

### Etapa 6 — Ativar em produção
- [ ] Ativar workflow "SST No-Show Lab — Cadência Automática" (toggle)
- [ ] Ativar workflow "SST No-Show Lab — Webhook Resposta Paciente" (toggle)
- [ ] Informar Aline e Débora: a partir de agora, todo no-show deve ser registrado no Sheets no mesmo dia
- [ ] Combinar revisão dos resultados em 7 dias

---

## Responsabilidades por pessoa

| Pessoa | O que fazer |
|---|---|
| **Mayko** | Ligar 13h/07/05 + configurar n8n + ativar workflows |
| **Aline** | Criar grupo WhatsApp + preencher planilha com no-shows + implementar horário 13h–16h |
| **Débora** | Registrar no Sheets todo orçamento que não converteu no dia |
| **Rogério** | Contratar estagiário + aprovar estrutura de comissão |

---

## Eventos no Google Calendar criados

- **07/05 às 13h** — "SST Aline 13h — Observar Conversão ao Vivo + Ativar No-Show"
- **08/05 às 9h** — "SST — Ativar Cadência No-Show n8n (Laboratório Aline)"

---

## Quando este arquivo pode ser arquivado

Quando todos os itens do checklist estiverem marcados e o primeiro relatório de 7 dias mostrar:
- Taxa de resposta D+1 > 30%
- Taxa de reagendamento > 25%

Mover para `04-arquivo/` com data de conclusão.

---

Voltar para [[sessao-acompanhamento-aline-06-05-2026]] | [[RETOMADA]]
