---
title: Automação Dashboard Diário — n8n
tags: [sst, n8n, automacao, dashboard, workflow]
aliases: [dashboard-automation, n8n-dashboard]
status: em-progresso
criado: 2026-05-15
relacionados: [[dashboard-resultado-diario-sst.html]], [[resultado-15-05-2026.md]]
---

# 🤖 AUTOMAÇÃO N8N — DASHBOARD DIÁRIO

**Objetivo:** Gerar e enviar dashboard resultado diário (15h45) sem intervenção manual

**Frequência:** Segunda a sexta, 15h45 BRT  
**Input:** Mensagens WhatsApp (Lucas, Karine, Raquel reportando)  
**Output:** Dashboard HTML + mensagem WhatsApp formatada  
**Status:** ⏳ Planejamento (iniciar 19/05)

---

## 📋 FLUXO DO WORKFLOW

```
┌─────────────────────────────────────────────────────────┐
│ TRIGGER: Cron 15h45 (segunda a sexta)                  │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│ LEITURA: Extrair mensagens WhatsApp últimas 3 horas    │
│ (de Lucas, Karine, Raquel com números)                 │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│ PARSING: Extrair métricas via regex/IA                 │
│ - Ativações Lucas: \d+ (padrão "Ativações = X")       │
│ - Fechamentos Karine: \d+ (padrão "Fiz X card")       │
│ - Leads Raquel: \d+ (padrão "Total: X pessoas")       │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│ CÁLCULO: Processar dados                               │
│ - Metas (Lucas 50, Karine 3, Raquel 10 — fixas)       │
│ - % atingido: (realizado / meta) × 100                 │
│ - Síntese: soma cartões + leads + msgs                 │
│ - Projeção 30/05: realizado × 15 dias restantes       │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│ GERAÇÃO HTML: Template parametrizado                   │
│ - Substituir valores no dashboard-resultado.html        │
│ - Inserir emojis/cores baseado em % (🟢/🟡/🔴)        │
│ - Calcular status (OK/ABAIXO/CRÍTICO)                  │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│ ENVIO: Mensagem WhatsApp formatada                      │
│ - Chat ID: Grupo SST Card                              │
│ - Conteúdo: Síntese + tabela + projeção + ações        │
│ - Anexo: Link para HTML (opcional)                     │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│ LOG: Registrar execução                                 │
│ - Timestamp, dados processados, status                 │
└─────────────────────────────────────────────────────────┘
```

---

## 🔧 COMPONENTES N8N

### 1. TRIGGER — Cron Schedule
```
Name: Dashboard Diário Trigger
Type: Cron
Timing: 0 15 * * 1-5 (15h45, seg-sex)
Timezone: America/Sao_Paulo
```

### 2. LEITURA — Chatwoot/WhatsApp
```
Name: Buscar mensagens últimas 3h
Type: Chatwoot HTTP
Method: GET
Endpoint: /api/v1/accounts/{account_id}/conversations
Filters:
  - source_id = whatsapp
  - label = "sst-relatorio"
  - created_after = now() - 3h
Return: Array de mensagens
```

**Alternativa:** Se n8n não ler Chatwoot direto, usar **Webhook** (Rogério/Mayko ativa manualmente ao reportar números)

### 3. PARSING — Regex + Filtro
```javascript
// Extrair números das mensagens

const lucas = {
  ativacoes: extrairNumero(msg, /ativacoes?\s*=?\s*(\d+)/i),
  retencao: extrairNumero(msg, /retencao\s*=?\s*(\d+)/i),
  msgs: extrairNumero(msg, /msg\s*=?\s*(\d+)/i)
};

const karine = {
  cartoes: extrairNumero(msg, /fiz\s*(\d+)\s*card/i),
  pipeline: extrairNumero(msg, /(\d+)\s*esperando/i)
};

const raquel = {
  leads: extrairNumero(msg, /total\s*:\s*(\d+)/i),
  instagram: msg.includes("instagram") ? 1 : 0
};
```

### 4. CÁLCULO — Function Node
```javascript
const metas = {
  lucas_ativ: 50,
  karine_card: 3,
  raquel_leads: 10
};

const resultado = {
  lucas_ativ_pct: (lucas.ativacoes / metas.lucas_ativ * 100).toFixed(0),
  karine_pct: (karine.cartoes / metas.karine_card * 100).toFixed(0),
  raquel_pct: (raquel.leads / metas.raquel_leads * 100).toFixed(0),
  
  // Projeção 30/05 (15 dias restantes)
  proj_lucas: lucas.ativacoes * 15,
  proj_karine: karine.cartoes * 15,
  proj_raquel: raquel.leads * 15,
  
  // Status
  status_lucas: lucas.ativacoes >= 25 ? "OK" : lucas.ativacoes >= 10 ? "ABAIXO" : "CRÍTICO",
  status_karine: karine.cartoes >= 2 ? "OK" : karine.cartoes >= 1 ? "ABAIXO" : "CRÍTICO",
  status_raquel: raquel.leads >= 10 ? "OK" : "EXCELENTE"
};
```

### 5. GERAÇÃO HTML — Template Node
```
Type: Render Template
Template: dashboard-resultado-diario-sst.html (parametrizado)

Substituições:
- {{data}} = 15/05/2026
- {{lucas_ativ}} = 5
- {{lucas_pct}} = 10
- {{karine_cartoes}} = 1
- {{raquel_leads}} = 25
- ... (todos os valores)

Output: HTML string pronto para envio
```

### 6. ENVIO — Evolution API / WhatsApp
```
Name: Enviar WhatsApp
Type: HTTP POST
URL: Evolution API webhook
Headers:
  Authorization: Bearer {{EVOLUTION_TOKEN}}
Body (JSON):
{
  "chatId": "551198255752-1234567890@g.us",
  "textMessage": {{msg_formatada}},
  "mediaUrl": "https://..." (opcional — link HTML)
}
```

**Alternativa:** Se usar Chatwoot integrado, enviar direto via Chatwoot API

### 7. LOG — Airtable / Google Sheets
```
Name: Registrar execução
Type: Airtable
Table: Dashboard Logs
Fields:
  - Data/Hora: {{now()}}
  - Dados processados: {{JSON.stringify(resultado)}}
  - Status envio: {{status}}
  - Erros (se houver): {{error}}
```

---

## 📝 CONFIGURAÇÃO INICIAL

### Credenciais necessárias:
- ✅ **Chatwoot API Key** (ou Webhook token)
- ✅ **Evolution API Token** (WhatsApp)
- ✅ **Chat ID do grupo** (SST Card — salvar como variável)
- ⚠️ **Metas hardcoded** (Lucas 50, Karine 3, Raquel 10 — parametrizar depois)

### Arquivos base:
- `dashboard-resultado-diario-sst.html` → salvar versão parametrizada
- Mensagem WhatsApp template (com emojis/formatação)
- Regex patterns para parsing

---

## 🧪 TESTE (19/05)

**Fase 1 — Manual:**
1. Simular mensagens WhatsApp (copy/paste)
2. Testar parsing (extrair números corretos?)
3. Validar cálculos (metas, %, projeção)
4. Gerar HTML + mensagem

**Fase 2 — Automático:**
1. Agendar Cron para 15h45
2. Rodar 1 vez, validar output
3. Ajustar conforme necessário
4. Liberar para produção (segunda-feira 19/05)

---

## ⚠️ LIMITAÇÕES & FALLBACKS

| Cenário | Problema | Fallback |
|---------|----------|----------|
| Mensagem não chega até 15h45 | Workflow roda sem dados | Webhook manual (Rogério clica link) |
| Parsing falha (formato errado) | Números extraídos = 0 | Alert Telegram para Mayko investigar |
| WhatsApp API offline | Não consegue enviar | Log em Airtable, retry em 30min |
| Dados incompletos | Alguns campos em branco | Dashboard mostra "[DADOS PENDENTES]" |

---

## 🎯 PRÓXIMOS PASSOS

- [ ] **Sexta 15/05:** Validar manualmente (dashboard HTML + mensagem)
- [ ] **Segunda 19/05:** Criar workflow n8n (estrutura básica)
- [ ] **Terça 20/05:** Testar com dados reais de segunda (ajustar parsing)
- [ ] **Quarta 21/05:** Agendar Cron + validar automação
- [ ] **Quinta 22/05 em diante:** Rodar automaticamente (monitorar logs)

---

**Estimativa:** 2–3 horas de setup n8n + testes = pronto quarta 21/05

Quer começar segunda-feira (19/05) quando Rogério retornar da visita arquiteta?
