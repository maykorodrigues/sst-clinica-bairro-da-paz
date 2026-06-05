---
title: Setup — SST Group Parser (Chatwoot → Notion)
tags: [sst, n8n, chatwoot, notion, setup]
criado: 2026-05-26
---

# Setup: SST Group Parser
**Chatwoot Grupo → n8n → Claude AI → Notion "Parciais SST"**

> Tempo estimado de setup: 30 minutos | Requer: n8n + Chatwoot API token + Notion token

---

## Visão Geral

```
Clube SSTCARD (GROUP) [Chatwoot #4372]
    ↓  webhook new_message
n8n Workflow: SST Group Parser
    ↓  filtro conversation_id = 4372
    ↓  extract: remetente + texto
    ↓  filtro: tem métricas?
    ↓  Claude Haiku: parse → JSON estruturado
    ↓  HTTP: Notion API
Notion Database: "Parciais SST"
    └─ {Pessoa | Tipo | Data | Falou Com | Fechamentos | Reativações | ...}
```

---

## Passo 1 — Criar o Database no Notion

### 1.1 Criar nova database

Dentro do Hub SST (https://www.notion.so/33ead3c0037381b093b3d0c0a41d3c4b):

1. Clique em "+ New page"
2. Selecione "Database → Table"
3. Nome: **"Parciais SST Card"**

### 1.2 Configurar propriedades

| Nome da Coluna | Tipo | Opções |
|---|---|---|
| **Título** | Title | (automático) |
| **Pessoa** | Select | Karine, Lucas, Raquel, Rogério, Mayko |
| **Tipo** | Select | parcial-12h, final-15h, check-in, reporte-espontaneo |
| **Data** | Date | — |
| **Hora** | Text | — |
| **Falou Com** | Number | — |
| **Fechamentos** | Number | — |
| **Reativações** | Number | — |
| **Leads Gerados** | Number | — |
| **Ativações** | Number | — |
| **Confiança Parse** | Select | alta, media, baixa |
| **Observação** | Text | — |
| **Mensagem Original** | Text | — |
| **Conversa ID** | Text | — |

### 1.3 Pegar o Database ID

A URL da database fica assim:
```
https://www.notion.so/33ead3c003738XXXXXXXXXXXXXXXXXXXXX?v=...
```
O **Database ID** é o hash de 32 caracteres após `notion.so/` (sem o `?v=...`).

**Salvar em:** `NOTION_PARCIAIS_DB_ID = <ID aqui>`

---

## Passo 2 — Configurar n8n

### 2.1 Importar o workflow

1. Acesse: https://n8n.clinicalucrativa.ia.br
2. Menu "Workflows" → "Import from File"
3. Selecione: `n8n-sst-group-parser.json`

### 2.2 Configurar variáveis de ambiente

Em **Settings → Environment Variables** do n8n, adicionar:

```
ANTHROPIC_API_KEY = sk-ant-...  (sua API key da Anthropic)
NOTION_TOKEN      = secret_...  (token da integração Notion)
NOTION_PARCIAIS_DB_ID = <ID do database criado no Passo 1>
```

> **Nota:** Se `ANTHROPIC_API_KEY` já existe de outro workflow, pule.

### 2.3 Ativar o workflow

1. Abrir o workflow importado
2. Clicar "Activate" (toggle no canto superior direito)
3. Copiar a URL do webhook: `https://n8n.clinicalucrativa.ia.br/webhook/sst-group-parser`

---

## Passo 3 — Configurar Webhook no Chatwoot

### 3.1 Acessar configurações

1. Acesse: https://chatwoot.clinicalucrativa.ia.br
2. Vá em **Settings → Integrations → Webhooks**
3. Clique em "Add new webhook"

### 3.2 Configurar o webhook

| Campo | Valor |
|---|---|
| **URL** | `https://n8n.clinicalucrativa.ia.br/webhook/sst-group-parser` |
| **Events** | ✅ Message Created |
| | (desmarcar: conversation_created, conversation_updated, contact_created) |

Clique em "Create Webhook".

### 3.3 Verificar Inbox correto

A conversa **Clube SSTCARD (GROUP)** está no inbox `whats-920078167` (inbox_id: 3). O filtro do workflow usa `conversation.id = 4372` — se a conversa tiver ID diferente, ajustar o nó **"Filtrar: Conversa SST GROUP?"**.

> **Como verificar o conversation ID:** Na URL do Chatwoot ao abrir a conversa do grupo: `.../conversations/4372`

---

## Passo 4 — Configurar Integração Notion

### 4.1 Criar ou usar integração existente

1. Acesse: https://www.notion.so/my-integrations
2. Clique "New integration"
3. Nome: "n8n SST Parser"
4. Permissões: Read content, Update content, Insert content

### 4.2 Compartilhar o database com a integração

1. Abrir o database "Parciais SST Card" no Notion
2. Clicar "..." → "Connections" → "Connect to" → selecionar "n8n SST Parser"

---

## Passo 5 — Testar

### 5.1 Teste manual no n8n

1. No workflow, clicar em "Test workflow"
2. No nó Webhook, clicar em "Listen for test event"
3. Enviar mensagem no grupo do WhatsApp/Chatwoot

### 5.2 Ou testar com payload manual

No n8n, usar o "Execute Node" no nó Webhook com este payload de teste:
```json
{
  "event": "message_created",
  "id": 99999,
  "content": "+55 7186844401 - Karine Santana: falei com 15 hoje, fechei 3 pelo perdão de dívida",
  "conversation": { "id": 4372, "inbox_id": 3 },
  "message_type": "incoming",
  "created_at": 1748260000
}
```

**Resultado esperado no Notion:**
- Título: `Karine | reporte-espontaneo | 2026-05-26 HH:MM`
- Pessoa: Karine
- Falou Com: 15
- Fechamentos: 3
- Observação: "Karine fez 15 contatos e fechou 3 reativações na campanha de perdão de dívida"

---

## Fluxo Operacional Diário

### Como a equipe envia parciais (sem mudança)

A equipe continua mandando mensagens normais no grupo:

```
Karine: "galera, 12h: falei com 20, fechei 5, 3 pendentes"
Lucas: "ativei 10 até agora, Tenex tá ok"
Raquel: "passei 15 leads pra Karine hoje"
```

O n8n captura automaticamente e cria uma entrada no Notion a cada mensagem.

### Como Mayko acessa os dados

1. Abrir Notion → "Parciais SST Card"
2. Filtrar por Data = hoje
3. Ver métricas consolidadas por pessoa
4. Atualizar manualmente o playbook HTML com os números reais

### Próxima evolução (v3 — opcional)

Adicionar um nó n8n Cron às 15h30 que:
1. Lê todas as parciais do dia no Notion (SST Card + Clínica)
2. Consolida por pessoa e unidade
3. Gera um bloco HTML com os dados
4. Faz commit no GitHub via API → Vercel redeploya o playbook automaticamente

---

## ⭐ v2 — Dual Group: SST Card + Clínica Simões Filhos (27/05/2026)

Workflow expandido que monitora **dois grupos** simultaneamente e grava em **databases separados** no Notion.

**Arquivo:** `02-cadencias/n8n-sst-group-parser-v2.json`

### Arquitetura v2

```
Chatwoot Webhook (todos os grupos)
    ↓
Filtrar: Evento Válido? (message_created + não outgoing)
    ↓
Identificar Grupo + Extrair Base
    ↓
Switch: Por Grupo
    ├── SST Card (conv. 4372) → Filtrar Relevância → Claude Vendas → Notion "Parciais SST Card"
    ├── Clínica Simões Filhos (conv. XXXX) → Filtrar Relevância → Claude Clínica → Notion "Parciais Clínica"
    └── Outros grupos → Ignorar (sem custo)
```

### Passo 1 — Descobrir o conversation_id do grupo da Clínica

Abra o Chatwoot, entre na conversa do grupo da Clínica Simões Filhos e veja a URL:
```
https://chatwoot.clinicalucrativa.ia.br/app/accounts/1/conversations/XXXX
```
O número `XXXX` é o `conversation_id`.

### Passo 2 — IDs dos grupos (já configurados no JSON)

Os IDs estão gravados no nó **"Identificar Grupo + Extrair Base"**:

```javascript
const GRUPOS = {
  '4372': 'sstcard',   // Clube SSTCARD (GROUP) — equipe comercial
  '5590': 'clinica'    // SST CLÍNICA CONVERSÃO LABORATÓRIO (GROUP) — Débora, Aline
};
```

> Nenhuma edição necessária — IDs já confirmados via Chatwoot em 27/05/2026.

### Passo 3 — Criar o Database Notion "Parciais Clínica Simões Filhos"

Dentro do Hub SST (https://www.notion.so/33ead3c0037381b093b3d0c0a41d3c4b):

> **Grupo monitorado:** SST CLÍNICA CONVERSÃO LABORATÓRIO (GROUP) — conv. 5590
> Métricas de conversão do laboratório MADIP (Débora, Aline). Foco em orçamentos × convertidos × taxa.

| Nome da Coluna | Tipo | Opções / Notas |
|---|---|---|
| **Título** | Title | (automático: Pessoa \| tipo \| data hora) |
| **Tipo** | Select | parcial-12h, final-dia, meta, bloqueador, reporte-espontaneo |
| **Unidade** | Select | Simões Filhos, Bairro da Paz |
| **Data** | Date | — |
| **Hora** | Text | — |
| **Pessoa** | Text | — |
| **Orçamentos Dia** | Number | Valor R$ como número (ex: R$983 → 983) |
| **Convertidos** | Number | Valor R$ convertido como número |
| **Taxa Conversão** | Number | Percentual como float (ex: 40,5% → 40.5) |
| **Ligações Feitas** | Number | — |
| **Mensagens Enviadas** | Number | — |
| **Bloqueador** | Text | Objeção ou impedimento relatado |
| **Meta do Dia** | Text | Objetivo/alvo do dia |
| **Confiança Parse** | Select | alta, media, baixa |
| **Observação** | Text | — |
| **Mensagem Original** | Text | — |
| **Conversa ID** | Text | — |

Pegar o Database ID da URL e salvar em: `NOTION_CLINICA_DB_ID = <ID aqui>`

### Passo 4 — Adicionar variável de ambiente no n8n

Em **Settings → Environment Variables**, adicionar:

```
NOTION_CLINICA_DB_ID = <ID do database "Parciais Clínica Simões Filhos">
```

As demais variáveis (`ANTHROPIC_API_KEY`, `NOTION_TOKEN`, `NOTION_PARCIAIS_DB_ID`) já existem do v1.

### Passo 5 — Importar e ativar o workflow v2

1. n8n → Workflows → Import from File → `n8n-sst-group-parser-v2.json`
2. **Desativar** o workflow v1 (para não duplicar entradas do grupo SST Card)
3. Ativar o workflow v2
4. O webhook URL é o mesmo: `https://n8n.clinicalucrativa.ia.br/webhook/sst-group-parser`
5. O Chatwoot já está configurado — nenhuma mudança necessária

### O que o Claude extrai de cada grupo

**Grupo SST Card — conv. 4372 (equipe comercial: Karine, Lucas, Raquel):**
- tipo: parcial-12h, final-15h, check-in, reporte-espontaneo
- falou_com, fechamentos, reativacoes, leads_gerados, ativacoes
- → Notion database: `NOTION_PARCIAIS_DB_ID`

**Grupo SST Clínica Conversão Laboratório — conv. 5590 (Débora, Aline):**
- tipo: parcial-12h, final-dia, meta, bloqueador, reporte-espontaneo
- orcamentos_dia (R$), convertidos (R$), taxa_conversao (%), ligacoes_feitas, mensagens_enviadas
- bloqueador (objeção relatada), meta_dia (objetivo do dia)
- → Notion database: `NOTION_CLINICA_DB_ID`

---

## Troubleshooting

| Problema | Causa Provável | Solução |
|---|---|---|
| Webhook não recebe nada | Chatwoot não configurado | Verificar Settings → Integrations → Webhooks |
| Grupo da Clínica não entra no banco | conversation_id errado no código | Verificar URL Chatwoot (`.../conversations/XXXX`) e editar o nó "Identificar Grupo" |
| Filtro bloqueando tudo | conversation_id diferente | Verificar URL Chatwoot |
| Claude não responde | `ANTHROPIC_API_KEY` inválida | Verificar env vars do n8n |
| Notion dá 401 | Token expirado ou sem permissão | Reconectar integração no Notion |
| Notion SST Card dá 404 | `NOTION_PARCIAIS_DB_ID` errado | Verificar env var |
| Notion Clínica dá 404 | `NOTION_CLINICA_DB_ID` não configurado | Adicionar env var no n8n |
| Parse com confiança "baixa" | Mensagem muito curta/informal | Aceitar — Claude extrai o que consegue |

---

## Links Úteis

- Workflow v1: `02-cadencias/n8n-sst-group-parser.json`
- **Workflow v2 (dual group):** `02-cadencias/n8n-sst-group-parser-v2.json`
- Hub Notion SST: https://www.notion.so/33ead3c0037381b093b3d0c0a41d3c4b
- Chatwoot: https://chatwoot.clinicalucrativa.ia.br
- n8n: https://n8n.clinicalucrativa.ia.br

*Relacionado: [[RETOMADA]] | [[workflows-n8n]] | [[processo-comercial-7dias/00-plano-execucao-7dias]]*
