---
title: Workflows n8n — Cobrança + Perdão Dívida
tags: [sst, karine, n8n, workflow, automacao, chatwoot]
criado: 2026-05-13
atualizado: 2026-05-13
---

# 🔄 Workflows n8n — Automação Chatwoot → Notion

> Três workflows principais para automação de cobrança, follow-up e rastreamento de status.

---

## Visão Geral da Arquitetura

```
[Google Sheets ou Manual Input]
           ↓
[n8n Workflow 1: Disparo Inicial]
           ↓
Chatwoot API → envia WhatsApp
           ↓
[Cliente responde via WhatsApp]
           ↓
Chatwoot Webhook → n8n (recebe resposta)
           ↓
[n8n Workflow 2: Processar Resposta]
           ↓
Notion API → atualiza Status + Data Contato
           ↓
[Se sem resposta por 3 dias]
           ↓
[n8n Workflow 3: Follow-up D+3]
           ↓
[Repetir ciclo]
```

---

## Workflow 1: Disparo Inicial — Perdão Dívida

**Trigger:** Manual (Karine clica "Disparar" em interface n8n) ou Cron (agendado)

**Função:** Enviar 50–150 mensagens perdão dívida via Chatwoot para base Tenex

### Fluxo Lógico

```
Start
  ↓
[1] Ler contatos do Notion (filtro: Origem = "Tenex 5+ parc")
  ↓
[2] Para cada contato:
    - Montar mensagem (prompt IA)
    - Buscar WhatsApp no Notion (tel. campo)
  ↓
[3] Enviar via Chatwoot API
    - Chatwoot contact ID
    - Mensagem body
    - Identificar como "Bot Perdão Dívida"
  ↓
[4] Atualizar Notion:
    - Status = "Mensagem Enviada"
    - Canal = "WhatsApp"
    - Data Disparo = hoje
    - Tentativas de Contato +1
  ↓
[5] Logar resposta em Google Sheets (backup)
  ↓
Fim
```

### JSON do Workflow (Template)

```json
{
  "name": "Disparo Perdão Dívida — Tenex",
  "active": true,
  "nodes": [
    {
      "name": "Start",
      "type": "n8n-nodes-base.start"
    },
    {
      "name": "Notion — Buscar Tenex 5+ parc",
      "type": "n8n-nodes-base.notion",
      "operation": "getDatabase",
      "filter": {
        "property": "Origem",
        "select": {
          "equals": "Tenex 5+ parc"
        },
        "AND": {
          "property": "Status",
          "select": {
            "equals": "Para Contatar"
          }
        }
      },
      "limit": 50
    },
    {
      "name": "Loop — Cada Contato",
      "type": "n8n-nodes-base.itemList",
      "operation": "splitInBatches"
    },
    {
      "name": "Claude IA — Personalizar Mensagem",
      "type": "n8n-nodes-base.openai",
      "resource": "chat",
      "prompt": "Você é agente de vendas da SST Card (cartão de saúde). Envie mensagem para cliente com dívida de {{valor}} em {{parcelas}} parcelas. Ofereça: desconto 50% + migração para plano Prata (R$39,90). Tom: direto, humanizado, sem constranger. Máx 2 linhas."
    },
    {
      "name": "Chatwoot API — Enviar Mensagem",
      "type": "n8n-nodes-base.httpRequest",
      "method": "POST",
      "url": "https://chatwoot.clinicabairrordapaz.com.br/api/v1/conversations/{{chatwootConversationId}}/messages",
      "headers": {
        "api_token": "{{env.CHATWOOT_API_TOKEN}}",
        "Content-Type": "application/json"
      },
      "body": {
        "content": "{{messagePersonalized}}",
        "message_type": "outgoing",
        "private": false
      }
    },
    {
      "name": "Notion — Atualizar Status",
      "type": "n8n-nodes-base.notion",
      "operation": "update",
      "properties": {
        "Status": "Mensagem Enviada",
        "Canal": "WhatsApp",
        "date:Data Último Contato:start": "{{now}}",
        "Tentativas de Contato": "{{Tentativas + 1}}"
      }
    },
    {
      "name": "Google Sheets — Log Backup",
      "type": "n8n-nodes-base.googleSheets",
      "operation": "append",
      "spreadsheet": "SST Card Backup — Disparos Cobrança",
      "sheet": "Perdão Dívida 2026",
      "columns": [
        "Data",
        "Nome",
        "Telefone",
        "Origem",
        "Valor",
        "Tentativas",
        "Status Chatwoot"
      ]
    }
  ]
}
```

### Variáveis de Ambiente Necessárias

```bash
CHATWOOT_API_TOKEN=xxx
NOTION_API_KEY=xxx
OPENAI_API_KEY=xxx (para Claude personalização)
```

---

## Workflow 2: Processar Resposta — Webhook Chatwoot

**Trigger:** Webhook Chatwoot (cada mensagem recebida)

**Função:** Atualizar Notion automaticamente quando cliente responde

### Fluxo Lógico

```
[Cliente envia mensagem WhatsApp]
  ↓
Chatwoot recebe
  ↓
[Webhook POST → n8n]
  ↓
[1] Extrair dados:
    - chatwoot_contact_id
    - message_content
    - conversation_id
  ↓
[2] Buscar contato no Notion
    (match por Chatwoot Contact ID)
  ↓
[3] Classificar resposta:
    - Contém "sim" → "Respondeu"
    - Contém "não" → "Recusou"
    - Contém "depois" → "Em Negociação"
    - Outro → "Respondeu" (precisa acompanhamento Karine)
  ↓
[4] Atualizar Notion:
    - Status = [classificação acima]
    - Data Último Contato = agora
    - Observações += [mensagem cliente]
  ↓
[5] Notificar Karine:
    - Se "Respondeu" → ping Telegram
    - Se "Recusou" → silencioso (log apenas)
  ↓
Fim
```

### JSON do Webhook

```json
{
  "name": "Webhook Chatwoot — Processar Resposta",
  "active": true,
  "nodes": [
    {
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "method": "POST",
      "path": "/sst-chatwoot-response",
      "authentication": "basicAuth",
      "basicAuth": {
        "user": "sst-bot",
        "password": "{{env.WEBHOOK_SECRET}}"
      }
    },
    {
      "name": "Extrair Dados Chatwoot",
      "type": "n8n-nodes-base.set",
      "values": {
        "contactId": "{{$json.conversation.contact_id}}",
        "conversationId": "{{$json.conversation.id}}",
        "messageContent": "{{$json.message.content}}",
        "messageAt": "{{$json.message.created_at}}"
      }
    },
    {
      "name": "Notion — Buscar por Contact ID",
      "type": "n8n-nodes-base.notion",
      "operation": "getDatabase",
      "filter": {
        "property": "ID Chatwoot",
        "text": {
          "equals": "{{contactId}}"
        }
      }
    },
    {
      "name": "Claude IA — Classificar Resposta",
      "type": "n8n-nodes-base.openai",
      "resource": "chat",
      "prompt": "Classifique resposta cliente em: 'Respondeu Positivo', 'Recusou', 'Em Negociação' ou 'Precisa Follow-up'. Mensagem: '{{messageContent}}'"
    },
    {
      "name": "Notion — Atualizar Status",
      "type": "n8n-nodes-base.notion",
      "operation": "update",
      "properties": {
        "Status": "{{classificationIA}}",
        "date:Data Último Contato:start": "{{messageAt}}",
        "Observações": "Cliente: {{messageContent}}"
      }
    },
    {
      "name": "Condicional: Se Respondeu Positivo",
      "type": "n8n-nodes-base.if",
      "condition": "{{classificationIA}} == 'Respondeu Positivo'"
    },
    {
      "name": "Telegram — Notificar Karine",
      "type": "n8n-nodes-base.telegram",
      "chatId": "{{env.TELEGRAM_KARINE_CHAT_ID}}",
      "message": "🎉 {{contactName}} respondeu SIM! \nMensagem: {{messageContent}} \nProx. ação: ligar para fechar."
    }
  ]
}
```

---

## Workflow 3: Follow-up Automático D+3 e D+7

**Trigger:** Cron (roda diariamente às 9h e 14h)

**Função:** Enviar lembrete para clientes que não responderam há 3 ou 7 dias

### Fluxo Lógico

```
[Cron: 09h]
  ↓
[1] Buscar contatos com:
    - Status = "Mensagem Enviada"
    - Data Último Contato < 3 dias atrás
    - Tentativas de Contato < 7
  ↓
[2] Para cada contato:
    - Se D+3: enviar lembrete "suave"
    - Se D+5: enviar lembrete "com urgência"
    - Se D+7: marcar "Sem Resposta" + preparar para Serasa
  ↓
[3] Atualizar Notion:
    - Tentativas de Contato +1
    - Data Próxima Ação = [D+3 novamente]
  ↓
[4] Logar em Google Sheets
  ↓
Fim
```

### Prompts para Follow-up

**D+3 (suave):**
> "Oi {{nome}}, tudo bem? Vi que você recebeu nossa proposta de desconto. Ficou com dúvida? Posso ajudar? 😊"

**D+5 (com urgência):**
> "{{nome}}, só mais 2 dias para aproveitar o desconto de 50%! Plano Prata só R$39,90. Quer regularizar? ✅"

**D+7 (última chance):**
> "{{nome}}, essa é sua última oportunidade. A partir de amanhã, vamos encaminhar para órgão de proteção. Quer regularizar agora? 📞"

---

## Webhook Notion → Atualizar Dashboard

**Trigger:** Cada 30 min (Cron)

**Função:** Atualizar dashboard em tempo real no Notion com KPIs

### KPIs Atualizados

```
Total Disparos: COUNT(Status = "Mensagem Enviada")
Taxa Resposta: COUNT(Status = "Respondeu") / Total Disparos × 100%
Taxa Conversão: COUNT(Status = "Recuperado") / Total Disparos × 100%
Em Negociação: COUNT(Status = "Em Negociação")
Recusaram: COUNT(Status = "Recusou")
Sem Resposta: COUNT(Status = "Sem Resposta")

Por Origem:
  Tenex 5+ parc: [gráfico]
  Tenex 3-4 parc: [gráfico]
  Boom: [gráfico]
```

---

## Setup Técnico — Checklist

### Antes de Ativar em Produção

- [ ] Chatwoot API token validado (teste simples)
- [ ] Notion API key validado (leitura/escrita)
- [ ] Claude API key configurada (personalização mensagens)
- [ ] Webhook URL gerado e testado (post simples)
- [ ] Bases de contato importadas no Notion (761 Tenex min)
- [ ] Campos Notion alinhados (Status, Canal, Data Contato, etc)
- [ ] Teste com 10 contatos (manual, antes de escalar)
- [ ] Monitoramento n8n ativo (logs, erros)

### Variáveis de Ambiente

Criar arquivo `.env` no n8n:

```bash
CHATWOOT_API_TOKEN=token_xxx
CHATWOOT_BASE_URL=https://chatwoot.clinicabairrordapaz.com.br
NOTION_API_KEY=secret_xxx
NOTION_DATABASE_ID=e819fdee-322b-4cd5-a9b5-208bd30f14e1
OPENAI_API_KEY=sk-xxx (Claude)
TELEGRAM_KARINE_CHAT_ID=123456789
WEBHOOK_SECRET=webhook_secret_xxx
```

---

## Erros Comuns + Solução

| Erro | Causa | Solução |
|---|---|---|
| "Invalid API token" | Token expirado ou incorreto | Validar em Chatwoot admin panel |
| "Contact not found" | Chatwoot Contact ID não existe no Notion | Sincronizar contatos primeiro (importar de Blingo) |
| "Rate limit exceeded" | Muitos disparos muito rápido | Adicionar delay entre batches (1s) |
| "Webhook not received" | URL do webhook não acessível | Validar firewall, usar ngrok para teste |
| "Message too long" | Mensagem > 1000 chars | Resumir com prompt IA melhor |

---

## Próximas Ações (17/05)

1. [ ] Copiar JSONs para n8n (criar 3 workflows)
2. [ ] Validar credenciais (Chatwoot, Notion, Claude)
3. [ ] Teste com 10 contatos (Karine manual)
4. [ ] Coletar logs de erro
5. [ ] Ajustar com base em feedback Karine

---

Voltar para [[README.md]] | [[01-roadmap-implementacao.md]]
