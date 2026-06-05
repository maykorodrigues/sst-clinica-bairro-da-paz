---
title: Grande Automação MADIP — Plano Consolidado
tags: [sst, n8n, automacao, madip, master-plan, #em-progresso]
criado: 05/06/2026
atualizado: 05/06/2026
related: [[RETOMADA]] [[SETUP-sst-group-parser]] [[automacao-dashboard-diario-n8n]] [[checklist-mestre-inauguracao-01-07-2026]]
---

# Grande Automação MADIP — Plano Consolidado
## 3 frentes · 9 automações · inauguração 01/07/2026

> **Escopo:** SST Card (equipe comercial) + SST Clínica MADIP (laboratório) + Nova Unidade Bairro da Paz
> **Lógica geral:** Group Parser captura os dados → Dashboard consolida → Cadências agem automaticamente → Typebot qualifica leads novos

---

## INVENTÁRIO GERAL — Estado atual (05/06/2026)

| # | Automação | Frente | Arquivo JSON | Estado | Prioridade |
|---|-----------|--------|-------------|--------|-----------|
| A1 | Group Parser dual (SST Card + Clínica) | SST Card + MADIP | `n8n-sst-group-parser-v2.json` | ✅ JSON pronto — **IMPLANTAR** | 🔴 HOJE |
| A2 | Dashboard diário automatizado (cron 15h45) | SST Card | `n8n-dashboard-diario-sst.json` | ✅ JSON criado agora | 🔴 HOJE |
| A3 | Cadência cobrança D+3/D+7/D+15 | SST Card | `n8n-cobranca-d3-d7-d15.json` | ✅ JSON criado agora | 🟠 Esta semana |
| A4 | Funil 1 anti-noshow (cron D-3/D-1/D+1) | SST Clínica MADIP | `n8n-funil1-cron-anti-noshow-sst-clinica.json` | ✅ JSON pronto — **IMPLANTAR** | 🔴 HOJE |
| A5 | Typebot anti-noshow confirmação/reagendamento | SST Clínica MADIP | `typebot-funil1-anti-noshow-sst-clinica.json` | ✅ JSON pronto — **IMPLANTAR** | 🔴 HOJE |
| A6 | Cadência onboarding novos membros (D+0→D+30) | SST Card + BP | `n8n-onboarding-novos-membros.json` | ✅ JSON criado — implantar | 🟠 10/06 |
| A7 | Cadência reativação cancelados | SST Card | `n8n-reativacao-cancelados.json` | ✅ JSON criado — implantar | 🟡 15/06 |
| A8 | Typebot qualificação de lead Bairro da Paz | Bairro da Paz | `typebot-qualificacao-lead-bp.json` | ✅ JSON criado — importar no Typebot | 🟠 10/06 |
| A9 | n8n Typebot BP → Chatwoot (notifica Closer) | Bairro da Paz | `n8n-typebot-bp-chatwoot.json` | ✅ JSON criado — implantar | 🟠 13/06 |

---

## ARQUITETURA GLOBAL — Como as automações se conectam

```
DADOS DE ENTRADA
├── Grupo WhatsApp SST Card (conv. 4372) ────────────────────┐
├── Grupo WhatsApp Clínica MADIP (conv. 5590) ───────────────┤
│                                                             │
│              [A1] GROUP PARSER v2                          │
│              Chatwoot Webhook → n8n → Claude → Notion      │
│                        ↓                                    │
│         ┌──────────────┴──────────────┐                    │
│    Notion "Parciais SST Card"    Notion "Parciais Clínica" │
│                        │                                    │
│              [A2] DASHBOARD DIÁRIO                         │
│              Cron 15h45 → lê Notion → gera HTML            │
│              → Evolution API → grupo WhatsApp              │
│                                                             │
AÇÕES DE SAÍDA
├── Inadimplentes → [A3] CADÊNCIA COBRANÇA D+3/7/15
│   Sheets "Cobranças" → Evolution API (WhatsApp individual)
│
├── Pacientes agendados → [A4+A5] FUNIL ANTI-NOSHOW
│   Google Sheets "Agenda" → D-3/D-1/D+1 → Typebot confirm.
│
├── Novos membros → [A6] ONBOARDING 30 DIAS
│   Sheets "trigger ativo" → fila D+0/3/7/25/30
│
├── Cancelados → [A7] REATIVAÇÃO
│   Sheets cancelados → cadência 3 toques
│
└── Leads Bairro da Paz → [A8+A9] TYPEBOT → CHATWOOT
    Formulário qualificação → n8n → notifica Closer
```

---

## VARIÁVEIS DE AMBIENTE n8n — Referência única

> Configurar em: `n8n.clinicalucrativa.ia.br → Settings → Environment Variables`

| Variável | Descrição | Onde obter |
|----------|-----------|------------|
| `ANTHROPIC_API_KEY` | Chave API Claude (Haiku) | console.anthropic.com |
| `NOTION_TOKEN` | Token integração Notion | notion.so/my-integrations → "n8n SST Parser" |
| `NOTION_PARCIAIS_DB_ID` | Database "Parciais SST Card" | URL Notion após abrir o DB |
| `NOTION_CLINICA_DB_ID` | Database "Parciais Clínica Simões Filhos" | URL Notion após criar o DB |
| `CHATWOOT_API_KEY` | API token Chatwoot | chatwoot.clinicalucrativa.ia.br → Profile → Access Token |
| `CHATWOOT_ACCOUNT_ID` | ID da conta Chatwoot (ex: `1`) | URL do Chatwoot |
| `EVOLUTION_API_URL` | URL da Evolution API | configuração interna |
| `EVOLUTION_API_KEY` | Token Evolution API | configuração interna |
| `EVOLUTION_INSTANCE` | Nome da instância WhatsApp | painel Evolution API |
| `SST_CARD_GROUP_CHAT_ID` | Chat ID do grupo SST Card no WhatsApp | verificar via Evolution |
| `SHEETS_COBRANCA_ID` | ID Google Sheets planilha de cobranças | URL da planilha |
| `SHEETS_AGENDA_ID` | ID Google Sheets planilha de agenda | URL da planilha |

---

---

# FRENTE 1 — SST CARD (equipe comercial)
## Começar aqui — base para todas as outras frentes

---

## A1 — Group Parser v2 (SST Card + Clínica)

**Status:** ✅ JSON pronto — só implantar
**Arquivo:** `n8n-sst-group-parser-v2.json`
**Guia completo:** `SETUP-sst-group-parser.md`

### Resumo de setup (30 min)

1. **Notion — criar databases:**
   - "Parciais SST Card" (já pode existir — verificar)
   - "Parciais Clínica Simões Filhos" → criar novo com colunas do SETUP (seção v2)
   - Pegar ambos os Database IDs e salvar como `NOTION_PARCIAIS_DB_ID` e `NOTION_CLINICA_DB_ID`

2. **n8n — importar:**
   - Desativar v1 (se ativo)
   - Import → `n8n-sst-group-parser-v2.json`
   - Adicionar variáveis: `NOTION_CLINICA_DB_ID`

3. **Chatwoot — já configurado** (webhook aponta para mesmo endpoint)
   - Verificar: Settings → Integrations → Webhooks → URL `webhook/sst-group-parser` ativa

4. **Testar:**
   - Enviar mensagem de teste no grupo SST Card e no grupo Clínica
   - Verificar se aparece nas databases Notion corretas

### IDs dos grupos (já confirmados 27/05/2026)
```javascript
'4372': 'sstcard'   // Clube SSTCARD (GROUP)
'5590': 'clinica'   // SST CLÍNICA CONVERSÃO LABORATÓRIO
```

---

## A2 — Dashboard Diário Automatizado (cron 15h45)

**Status:** ✅ JSON criado (`n8n-dashboard-diario-sst.json`)
**Lógica:** Lê Notion "Parciais SST Card" do dia → consolida → gera texto → envia no grupo WhatsApp às 15h45

### Como funciona após implantado

A equipe continua mandando mensagens normais no grupo → o [A1] Group Parser captura tudo no Notion → às 15h45 o dashboard roda automaticamente e envia o resultado consolidado.

### Setup (20 min após A1 implantado)

1. **n8n → Import:** `n8n-dashboard-diario-sst.json`
2. **Configurar variáveis:**
   - `NOTION_PARCIAIS_DB_ID` (já definida no A1)
   - `EVOLUTION_API_URL`, `EVOLUTION_API_KEY`, `EVOLUTION_INSTANCE`
   - `SST_CARD_GROUP_CHAT_ID` — chat ID do grupo no WhatsApp
3. **Ativar workflow**
4. **Testar manualmente:** botão "Execute" → verificar se mensagem chega no grupo

### Formato da mensagem diária (15h45)

```
📊 *Resultado SST Card — [data]*

👤 *Karine:*  [fechamentos] cartões | [reativações] Tenex
👤 *Lucas:*   [ativações] ativações | [retenções] retenções
👤 *Raquel:*  [leads] leads gerados | [Instagram] fechamentos

📦 *Consolidado:* [total cartões] cartões | [total msgs]
📈 *Projeção mês:* [proj]

🔴 Bloqueadores: [se houver]
```

---

## A3 — Cadência de Cobrança D+3 / D+7 / D+15

**Status:** ✅ JSON criado (`n8n-cobranca-d3-d7-d15.json`)
**Lógica:** Cron 9h seg-sab → lê Google Sheets "Cobranças" → calcula dias de atraso → envia WhatsApp → atualiza Sheets + Notion

### Setup (40 min)

1. **Google Sheets — preparar planilha:**
   - Aba "Cobranças" com colunas: `nome_membro | whatsapp | valor_mensalidade | data_vencimento | status_pagamento | fase_cobranca | data_ultimo_contato | log_disparo`
   - Pegar ID da planilha (URL: `/spreadsheets/d/[ID]/`)
   - Salvar como `SHEETS_COBRANCA_ID`

2. **n8n → Import:** `n8n-cobranca-d3-d7-d15.json`
3. **Configurar credencial Google Sheets** (OAuth2 ou Service Account)
4. **Testar:** criar 3 linhas com datas 3/7/15 dias atrás → executar manualmente
5. **Ativar cron**

### Scripts de cobrança (o JSON usa estes textos)

**D+3:**
> Oi {{nome_membro}}, tudo bem? Aqui é a Karine da SST Card 😊 Identifiquei que sua mensalidade de R${{valor}} está em aberto desde {{data}}. Pode ser esquecimento — acontece! Pode me confirmar quando consegue regularizar? Pix, débito ou dinheiro na clínica, o que for mais fácil pra você.

**D+7:**
> {{nome_membro}}, já são 7 dias com o cartão suspenso. Não quero te perder como membro! O que aconteceu? Me conta e a gente resolve. A SST Card continua aqui por você — só precisamos que o pagamento de R${{valor}} seja regularizado pra reativar o acesso.

**D+15:**
> {{nome_membro}}, ultima tentativa antes de encerrar sua conta SST Card. Passaram 15 dias. Se quiser manter, precisa regularizar R${{valor}} hoje. Se tiver algum problema financeiro, me fala — a gente pode negociar. Caso não tenha interesse em continuar, me avisa que encerro sem cobranças futuras.

---

---

# FRENTE 2 — SST CLÍNICA MADIP (laboratório)

---

## A4 — Funil 1 Anti-Noshow (cron D-3 / D-1 / D+1)

**Status:** ✅ JSON pronto — implantar
**Arquivo:** `n8n-funil1-cron-anti-noshow-sst-clinica.json`

### Lógica do funil

```
Google Sheets "Agenda" (Aline preenche)
    ↓  Cron 9h (todos os dias)
    ↓  Filtra: consultas em D-3, D-1, D+1
    ↓
D-3 (3 dias antes):  "Ei, sua consulta tá chegando!"
D-1 (1 dia antes):   "Amanhã é sua consulta — confirma aqui"  → abre Typebot
D+1 (1 dia depois):  "Sentimos sua falta — reagenda agora"    → abre Typebot
```

### Setup (45 min)

1. **Google Sheets — criar planilha "Agenda MADIP":**
   - Colunas: `nome_paciente | whatsapp | data_consulta | medico | status (confirmado/noshow/reagendado) | data_enviado_d3 | data_enviado_d1 | data_enviado_d1pos`
   - Pegar ID: salvar como `SHEETS_AGENDA_ID`

2. **Typebot — importar primeiro (veja A5 abaixo)**

3. **n8n → Import:** `n8n-funil1-cron-anti-noshow-sst-clinica.json`
4. **Configurar variáveis:**
   - `SHEETS_AGENDA_ID`
   - `EVOLUTION_API_URL`, `EVOLUTION_API_KEY`, `EVOLUTION_INSTANCE`
   - `TYPEBOT_WEBHOOK_URL` (URL de entrada do Typebot — obtida no A5)
5. **Ativar workflow**
6. **Treinar Aline:** preencher a aba "Agenda" diariamente até 12h → sistema dispara automaticamente

### Responsável operacional: Aline Souza
Aline precisa preencher a planilha de agenda todo dia até 12h. O sistema faz o resto.

---

## A5 — Typebot Anti-Noshow (confirmação e reagendamento)

**Status:** ✅ JSON pronto — importar no Typebot
**Arquivo:** `typebot-funil1-anti-noshow-sst-clinica.json`

### Setup (20 min)

1. Acesse o Typebot self-hosted (Easypanel)
2. Criar novo typebot → Import → selecionar `typebot-funil1-anti-noshow-sst-clinica.json`
3. Publicar → copiar o link/webhook do bot
4. Voltar ao workflow n8n A4 → atualizar `TYPEBOT_WEBHOOK_URL`

### Fluxo do Typebot

```
Paciente recebe link via WhatsApp
    ↓
"Sua consulta é amanhã às [horário]. Você confirma?"
    ├── SIM → "Ótimo! Te esperamos. Lembre de trazer RG."
    └── NÃO → "Tudo bem. Quer reagendar?"
                    ├── SIM → Coletar nova data disponível → Notifica Aline
                    └── NÃO → "Sem problemas. Quando quiser, é só nos chamar."
```

---

---

# FRENTE 3 — BAIRRO DA PAZ (nova unidade)

> **Prioridade:** implantar depois que A1–A5 estiverem rodando.
> **Marco:** ter A8+A9 funcionando até 10/06 (piloto começa 15/06).

---

## A8 — Typebot Qualificação de Lead Bairro da Paz

**Status:** ❌ Não existe — criar
**Skill sugerida:** `/typebot-quiz-funnels`
**Arquivo a criar:** `typebot-qualificacao-lead-bp.json`

### O que o bot deve coletar

| Pergunta | Por que importa |
|----------|----------------|
| Qual seu bairro? | Confirmar que é do Bairro da Paz / entorno |
| Quantas pessoas moram com você? | Individual vs. Família |
| Você ou alguém da família usa o SUS? | Validar dor principal |
| Qual sua maior dificuldade com saúde hoje? | Qualificação de urgência |
| Você gostaria de saber mais sobre o SST Card? | Opt-in para contato do Closer |
| Qual seu WhatsApp? | Para o Closer ligar/mensagem |

### Fluxo pós-qualificação

```
Paciente responde o Typebot (link no panfleto / QR code da faixa)
    ↓
[A9] n8n captura resposta → classifica lead (frio/morno/quente)
    ↓
Lead quente (quer saber mais) → notifica Closer por WhatsApp imediato
Lead morno → entra na cadência D+1/D+3/D+7
Lead frio → entra em lista de transmissão semanal (dica de saúde)
```

---

## A9 — n8n: Typebot BP → Chatwoot (notifica Closer)

**Status:** ❌ Não existe — criar após A8
**Arquivo a criar:** `n8n-typebot-bp-chatwoot.json`

### Lógica

```
Typebot webhook → n8n
    ↓
Classificar score do lead (quente/morno/frio)
    ↓
Criar contato no Chatwoot (inbox Bairro da Paz)
    ↓
Abrir conversa e atribuir ao Closer
    ↓
Enviar WhatsApp para o Closer: "Novo lead quente: [nome], [bairro], [dor]"
```

---

---

# CRONOGRAMA DE IMPLANTAÇÃO

```
05/06 (hoje) — Prioridade máxima
├── [A1] Group Parser v2: implantar no n8n (30 min)
│     └── Criar database Notion "Parciais Clínica Simões Filhos"
├── [A2] Dashboard diário: implantar no n8n (20 min)
│     └── Verificar variável chat ID do grupo WhatsApp
└── [A4+A5] Funil anti-noshow: importar Typebot + n8n (45 min)
      └── Criar planilha "Agenda MADIP" e treinar Aline

06–07/06
├── [A3] Cadência cobrança D+3/7/15: preparar planilha + implantar (40 min)
└── Validar todos os A1–A5 com dados reais do dia

09–10/06
├── [A6] Onboarding novos membros: criar JSON + implantar
└── [A8] Typebot qualificação lead BP: criar via /typebot-quiz-funnels

10–13/06
└── [A9] n8n Typebot BP → Chatwoot: criar + testar com Closer

15/06 — PILOTO BAIRRO DA PAZ
└── A8 + A9 operacionais antes da abertura do piloto

15–20/06
└── [A7] Cadência reativação cancelados: criar JSON + implantar
```

---

# CHECKLIST DE IMPLANTAÇÃO — O QUE FAZER HOJE

## Antes de começar (10 min de prep)

- [ ] Confirmar n8n acessível: https://n8n.clinicalucrativa.ia.br
- [ ] Confirmar Chatwoot acessível: https://chatwoot.clinicalucrativa.ia.br
- [ ] Confirmar Typebot (Easypanel) acessível
- [ ] Ter em mãos: ANTHROPIC_API_KEY, NOTION_TOKEN, CHATWOOT_API_KEY, EVOLUTION_API_KEY
- [ ] Confirmar se o webhook Chatwoot já existe (SST Group Parser URL ativa?)

## Sequência de implantação (ordem certa)

```
1. Criar DB Notion "Parciais Clínica Simões Filhos" → pegar NOTION_CLINICA_DB_ID
2. n8n: configurar variáveis (NOTION_CLINICA_DB_ID + todas do quadro acima)
3. Typebot: importar typebot-funil1-anti-noshow-sst-clinica.json → publicar → copiar URL
4. n8n: importar n8n-sst-group-parser-v2.json → ativar
5. n8n: importar n8n-funil1-cron-anti-noshow-sst-clinica.json → configurar URL Typebot → ativar
6. n8n: importar n8n-dashboard-diario-sst.json → configurar chat ID grupo → ativar
7. Google Sheets: criar aba "Cobranças" → pegar SHEETS_COBRANCA_ID
8. n8n: importar n8n-cobranca-d3-d7-d15.json → ativar
9. TESTE GERAL: enviar mensagem no grupo SST Card → verificar Notion + aguardar 15h45
```

---

## Suporte — skills Claude Code para cada frente

| Automação | Skill | Quando invocar |
|-----------|-------|---------------|
| Typebot lead BP (A8) | `/typebot-quiz-funnels` | Para criar o fluxo de qualificação |
| WhatsApp Evolution API | `/whatsapp-automation` | Para configurar instância e chat IDs |
| Chatwoot + Instagram | `/instagram-chatwoot` | Para conectar inbox BP no Chatwoot |
| CRM Notion | `/crm-automation` | Para criar databases e dashboards Notion |
| KPIs e métricas | `/revops-saude` | Para montar dashboard KPIs mensal |
| Scripts cadência | `/sdr-cadencia` | Para revisar/refinar textos das cadências |

---

Relacionado: [[RETOMADA]] · [[SETUP-sst-group-parser]] · [[automacao-dashboard-diario-n8n]] · [[checklist-mestre-inauguracao-01-07-2026]] · [[cadencia-cobranca-automatizada]] · [[cadenca-novos-membros]]
