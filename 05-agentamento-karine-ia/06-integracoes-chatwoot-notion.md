---
title: Integração Chatwoot ↔ Notion — Sincronização em Tempo Real
tags: [sst, karine, webhook, chatwoot, notion, integracao]
criado: 2026-05-13
atualizado: 2026-05-13
---

# 🔗 Integração Chatwoot ↔ Notion — Pipeline Sincronizada

> Como manter a pipeline no Notion atualizada automaticamente quando mensagens entram/saem do Chatwoot.

---

## Fluxo de Sincronização

```
[1] Mensagem entra no Chatwoot (cliente responde)
        ↓
[2] Chatwoot API emite webhook
        ↓
[3] n8n recebe webhook (Workflow 2)
        ↓
[4] n8n lê dados:
    - Contact ID Chatwoot
    - Mensagem conteúdo
    - Timestamp
    - Status conversa (open/resolved)
        ↓
[5] n8n busca contato no Notion (by Contact ID)
        ↓
[6] n8n classifica resposta (IA)
        ↓
[7] n8n atualiza Notion:
    - Status
    - Data Último Contato
    - Observações
    - Tentativas de Contato
        ↓
[8] Notion atualiza AUTOMATICAMENTE
    (Karine vê em tempo real)
```

---

## Setup: Notion → Adicionar ID Chatwoot

**Pré-requisito:** Campo "ID Chatwoot" deve existir na pipeline.

Já existe? ✅ Sim (ver schema anterior)

**Como popular:**

1. **Manual (hoje):**
   - Karine abre Chatwoot
   - Para cada contato, copiar Contact ID (URL: `/contacts/12345`)
   - Cola no Notion campo "ID Chatwoot"

2. **Automático (depois):**
   - Workflow importa contatos Blingo → Notion + Chatwoot
   - Sincroniza Contact IDs automaticamente

---

## Setup: Chatwoot → Gerar Webhook

**Passo 1: Acessar Chatwoot Admin**

```
URL: https://chatwoot.clinicabairrordapaz.com.br/dashboard/settings/webhooks
```

**Passo 2: Criar Novo Webhook**

- **Nome:** `SST Card — Nota Notion Sync`
- **Event:** `conversation_updated` (quando conversa muda status)
- **URL:** `https://n8n.seu-dominio.com/webhook/sst-chatwoot-response`
- **Authentication:** Basic Auth
  - User: `sst-bot`
  - Password: `webhook_secret_gerado` (gerar no n8n)

**Passo 3: Testar Webhook**

- Enviar teste
- Verificar se n8n recebe (checar logs n8n)

---

## Setup: n8n → Receber e Processar

### Node 1: Webhook (Trigger)

```json
{
  "name": "Webhook Chatwoot",
  "type": "n8n-nodes-base.webhook",
  "method": "POST",
  "path": "/sst-chatwoot-response",
  "authentication": "basicAuth",
  "basicAuth": {
    "user": "sst-bot",
    "password": "{{env.WEBHOOK_SECRET}}"
  },
  "responseCode": 200,
  "responseData": "success"
}
```

### Node 2: Extrair Dados

```json
{
  "name": "Processar Payload Chatwoot",
  "type": "n8n-nodes-base.code",
  "language": "javascript",
  "code": "
    // Extrair dados do webhook Chatwoot
    const payload = $json;
    
    return {
      contactId: payload.conversation.contact_id,
      conversationId: payload.conversation.id,
      accountId: payload.account_id,
      status: payload.conversation.status, // open, resolved, snoozed
      lastMessage: payload.conversation.messages[0]?.content || '',
      lastMessageTime: payload.conversation.updated_at,
      inboxId: payload.conversation.inbox_id
    };
  "
}
```

### Node 3: Buscar no Notion

```json
{
  "name": "Notion — Buscar por Contact ID",
  "type": "n8n-nodes-base.notion",
  "operation": "getDatabase",
  "databaseId": "{{env.NOTION_DATABASE_ID}}",
  "filter": {
    "property": "ID Chatwoot",
    "text": {
      "equals": "{{contactId}}"
    }
  },
  "limit": 1
}
```

### Node 4: Classificar Resposta (IA)

```json
{
  "name": "Claude IA — Classificar",
  "type": "n8n-nodes-base.openai",
  "resource": "chat",
  "prompt": "Classifique a resposta do cliente em uma destas categorias:\n\n1. 'Respondeu Positivo' (quer pagar, quer mais info, interesse)\n2. 'Em Negociação' (quer pensar, quer falar com alguém)\n3. 'Recusou' (disse não, não quer, bloqueado)\n4. 'Spambot' (bot automático, não é resposta real)\n\nMensagem cliente: '{{lastMessage}}'\n\nResponda APENAS com a categoria."
}
```

### Node 5: Atualizar Notion

```json
{
  "name": "Notion — Atualizar Status",
  "type": "n8n-nodes-base.notion",
  "operation": "update",
  "pageId": "{{$items[0].data.id}}",
  "properties": {
    "Status": "{{classification}}", 
    "date:Data Último Contato:start": "{{lastMessageTime}}",
    "Observações": "Cliente: {{lastMessage}}",
    "Canal": "WhatsApp"
  }
}
```

### Node 6: Notificar Karine (Telegram)

```json
{
  "name": "Telegram — Alerta Karine",
  "type": "n8n-nodes-base.telegram",
  "condition": "{{classification}} == 'Respondeu Positivo'",
  "chatId": "{{env.TELEGRAM_KARINE_CHAT_ID}}",
  "message": "🎯 NOVO RESPONDEU:\n{{contato_nome}}\nMensagem: {{lastMessage}}\n→ Ação: ligar e fechar"
}
```

---

## Mapeamento: Campos Chatwoot → Notion

| Chatwoot | Notion | Tipo | Atualiza? |
|---|---|---|---|
| `contact_id` | `ID Chatwoot` | text | ❌ Não (sync manual) |
| `status` (open/resolved) | `Status` | select | ✅ Sim (webhook) |
| `updated_at` | `Data Último Contato` | date | ✅ Sim (webhook) |
| `messages[0].content` | `Observações` | text | ✅ Sim (webhook) |
| `source` (whatsapp/email) | `Canal` | select | ✅ Sim (webhook) |
| Contagem de tentativas | `Tentativas de Contato` | number | ⏳ Manual (Karine) |

---

## Tratamento de Erros

### ⚠️ Contact Not Found

**Problema:** Webhook recebe Contact ID que não existe no Notion.

**Causa:** Contato existe em Chatwoot mas não foi importado para Notion.

**Solução:**

```json
{
  "name": "Condicional: Contact Found?",
  "type": "n8n-nodes-base.if",
  "condition": "{{$items[0].data.length}} > 0"
}
```

- Se SIM → atualizar (fluxo normal)
- Se NÃO → criar novo registro no Notion + notificar Mayko

---

### 🚨 Chatwoot API Error

**Problema:** Webhook não consegue enviar dados.

**Solução:** Implementar retry automático

```json
{
  "name": "Try-Catch",
  "type": "n8n-nodes-base.tryCatch",
  "retry": {
    "type": "exponential",
    "interval": "2s",
    "maxAttempts": 3
  }
}
```

Se falhar 3x: notificar Mayko via Telegram

---

## Dashboard em Tempo Real (Notion)

### View: Quadro Kanban

Agrupar por `Status`:

```
Para Contatar | Mensagem Enviada | Respondeu | Em Negociação | Recuperado
    [cards]   |    [cards]       |  [cards]  |    [cards]     |   [cards]
```

✅ Atualiza em tempo real quando webhook sincroniza

### View: Gráfico de Conversão

```
SELECT(Status) / COUNT(*) × 100
```

- Taxa resposta = COUNT(Respondeu) / COUNT(Mensagem Enviada) × 100%
- Taxa conversão = COUNT(Recuperado) / COUNT(Mensagem Enviada) × 100%

---

## Monitoramento

### Logs n8n (verificar 1x/dia)

**Acessar:**
```
https://n8n.seu-dominio.com/workflows/xxx/executions
```

**Procurar por:**
- ❌ Erros de API (Notion/Chatwoot timeout)
- ❌ Contact not found
- ❌ Falha de classificação IA

### Alerta: Se webhook parar

- n8n para de receber
- Notion não atualiza
- Karine sem visibilidade em tempo real

**Solução:**
1. Verificar webhook URL (acessível?)
2. Verificar credenciais (token expirou?)
3. Testar manual em Chatwoot (Settings > Webhooks > Test)

---

## Cenários de Teste (antes de ativar em produção)

### Teste 1: Novo Contato Responde

1. **Criar contato fake no Chatwoot:** `Test User`
2. **Enviar mensagem:** "Oi, tudo bem?"
3. **Simular resposta:** "Quero o cartão"
4. **Verificar Notion:** Status deve virar "Respondeu"

**Resultado esperado:** ✅ Status sincronizado em <5s

### Teste 2: Contato Recusa

1. **Enviar:** "Qual seu melhor desconto?"
2. **Resposta simulada:** "Não quero, nunca preciso disso"
3. **Verificar Notion:** Status deve virar "Recusou"

**Resultado esperado:** ✅ Classificação correta, Telegram notifica

### Teste 3: Contact ID não existe

1. **Enviar webhook com Contact ID fake**
2. **Verificar logs n8n:** Deve criar novo registro

**Resultado esperado:** ✅ Notion novo contato criado, alerta Mayko

---

## Checklist Antes de Produção

- [ ] Webhook criado em Chatwoot
- [ ] n8n workflows 100% testados (3 testes acima)
- [ ] Notion campo "ID Chatwoot" preenchido (mín 50 contatos)
- [ ] Chatwoot Contact IDs sincronizados
- [ ] Telegram Karine recebendo alertas
- [ ] Logs n8n monitorados
- [ ] Backup Google Sheets ativo (redundância)
- [ ] Documento de backup/contingência criado

---

## Contingência: Webhook Cai (plano B)

**Se webhook parar funcionando:**

1. Karine continua usando Chatwoot normalmente
2. Status atualiza manual no Notion (D+1)
3. n8n roda backup Cron (daily sync 18h)
4. Mayko corrige problema webhook

**Não deixa cliente sem atendimento.**

---

## Performance: Esperado

| Operação | Tempo |
|---|---|
| Chatwoot recebe msg | <1s |
| Webhook emitido | <2s |
| n8n processa | <3s |
| Notion atualiza | <2s |
| **Total** | **<8s** |

Se > 10s: investigar logs

---

## Próximas Ações

### [Mayko] — 17/05
- [ ] Criar webhook em Chatwoot
- [ ] Testar 3 cenários acima
- [ ] Validar logs n8n
- [ ] Ativar monitoramento

### [Karine] — 17/05
- [ ] Popular "ID Chatwoot" no Notion (50 contatos)
- [ ] Receber 1 alerta Telegram (teste)
- [ ] Verificar Notion atualiza em tempo real

### [TI] — 17/05 (se houver)
- [ ] Validar firewall (n8n acessível)
- [ ] Monitorar performance webhook
- [ ] Setup Sentry ou similar (alertas erro)

---

Voltar para [[README.md]] | [[03-workflow-n8n-cobranca.md]]
