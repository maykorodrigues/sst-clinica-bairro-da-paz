---
title: Dashboard de Métricas — Karine acompanha em Tempo Real
tags: [sst, karine, dashboard, metricas, notion]
criado: 2026-05-13
atualizado: 2026-05-13
---

# 📊 Dashboard de Métricas para Karine — Notion

> Como montar dashboard que Karine vê em tempo real (atualiza com webhook Chatwoot).

---

## Visão Geral

Karine precisa ver, em tempo real, no Notion:

1. **Hoje:** Quantas mensagens enviou? Quantas respostas? Taxa conversão?
2. **Esta semana:** Progresso vs meta (40 adesões, 20 reativações)
3. **Por origem:** Qual categoria está convertendo melhor? (Tenex 5+, Boom, etc)
4. **Próxima ação:** Quem precisa de follow-up hoje?

---

## Dashboard Estrutura

```
┌─────────────────────────────────────────────────────┐
│  🎯 Dashboard Vendas Karine — 13/05/2026           │
├─────────────────────────────────────────────────────┤
│                                                      │
│  📈 RESUMO HOJE                                     │
│  ├─ Disparos: 24 (+8 desde ontem) 🟢               │
│  ├─ Respostas: 8 (33% conversão) 📞                │
│  ├─ Recuperados: 3 (+150% vs semana) 💰            │
│  └─ Em negociação: 5 (próxima ação: D+3)          │
│                                                      │
│  📅 META SEMANAL (23/05)                           │
│  ├─ Adesões: 12/40 (↪️ 30%)                        │
│  ├─ Reativações: 8/20 (↪️ 40%)                     │
│  ├─ Valor recuperado: R$ 4.280 / R$ 6.000 (↪️ 71%)│
│  └─ Semanas restantes: 1 (tempo!)                  │
│                                                      │
│  🔄 POR ORIGEM                                     │
│  ├─ Tenex 5+ parc: 18 disparos, 7 respostas (38%) │
│  ├─ Tenex 3-4 parc: 12 disparos, 5 respostas (41%)│
│  ├─ Boom: 8 disparos, 3 respostas (37%)           │
│  └─ Novo Lead: 6 disparos, 2 respostas (33%)      │
│                                                      │
│  ⏰ PRÓXIMAS AÇÕES (hoje)                          │
│  ├─ Michele — Follow-up D+3 (resposta positiva)   │
│  ├─ Lilian — Objeção "sem grana" → oferta lite   │
│  ├─ Malcon — Sem resposta D+5 (última chance)     │
│  └─ Ação: 3 call prioritários hoje                │
│                                                      │
│  💬 CONVERSAS ATIVAS                               │
│  ├─ Respondeu: 11 pessoas (precisa Karine seguir) │
│  ├─ Recusou: 4 pessoas (arquivo)                  │
│  └─ Sem resposta: 18 pessoas (D+3/D+7 automático) │
│                                                      │
└─────────────────────────────────────────────────────┘
```

---

## Como Montar no Notion

### Passo 1: Criar Página de Dashboard

1. **Abrir Notion**
2. **Nova página:** `📊 Dashboard Karine — Vendas`
3. **Local:** Mesma pasta da pipeline

### Passo 2: Adicionar Blocos de Dados

#### Bloco 1: Contador "Disparos Hoje"

```
Banco de dados: 🎯 Pipeline Ativa
Filtro: Data Última Contato = hoje AND Status = "Mensagem Enviada"
Mostrar: COUNT
```

**Fórmula Notion:**
```
"Disparos hoje: " + format(dateBetween(prop("Data Último Contato"), now(), "days")) 
```

#### Bloco 2: Taxa de Conversão (Gráfico Donut)

```
Banco de dados: 🎯 Pipeline Ativa
Tipo: Gráfico (Donut)
Agrupar por: Status
Contar: registros

Resultado:
- Respondeu: 8 (33%)
- Mensagem Enviada: 16 (65%)
- Sem Resposta: 1 (2%)
```

#### Bloco 3: Progress Meta Semanal

```
Banco de dados: 🎯 Pipeline Ativa
Filtro: 
  - Semana = semana atual (W20)
  - Status = "Recuperado"
Contar: registros

Mostrar:
- Contador: {{count}} / 20 (meta reativações)
- Barra de progresso: {{count / 20 * 100}}%
```

#### Bloco 4: Tabela "Próximas Ações"

```
Banco de dados: 🎯 Pipeline Ativa
Filtro:
  - Status = "Respondeu" OR "Em Negociação" OR "Sem Resposta"
  - Próxima Ação <= hoje
Sort: Próxima Ação (crescente)
Mostrar colunas:
  - Nome
  - Status
  - Próxima Ação
  - Canal
  - Observações
```

#### Bloco 5: Gráfico de Conversão por Origem

```
Banco de dados: 🎯 Pipeline Ativa
Tipo: Gráfico (Coluna)
Agrupar por: Origem
Contar: registros onde Status = "Recuperado"

Resultado:
- Tenex 5+ parc: 7 recuperados
- Tenex 3-4 parc: 5 recuperados
- Boom: 3 recuperados
```

---

## Setup: Fórmulas Notion Avançadas

### Fórmula 1: Taxa Resposta (em tempo real)

**Campo novo:** `Taxa Resposta %`

```
Notion Formula:
(prop("Respondeu") / (prop("Respondeu") + prop("Sem Resposta") + prop("Mensagem Enviada")) * 100).round(1)
```

Assim Karine vê instantaneamente: "33% conversão"

### Fórmula 2: Dias em Atraso

**Campo novo:** `Dias Sem Resposta`

```
Notion Formula:
dateBetween(now(), prop("Data Último Contato"), "days")
```

Se > 3 dias: destaque em vermelho (follow-up automático roda)

### Fórmula 3: Valor Total em Aberto

**Campo novo:** `Total Valor em Aberto`

```
Notion Formula:
prop("Valor em Aberto") * count(prop("Parcelas em Atraso"))
```

Assim Karine vê: "R$12.485 em oportunidade esta semana"

---

## Automações Notion (sem n8n extra)

### Automação 1: Notificar Quando Cliente Responde

**Trigger:** Status atualizar para "Respondeu"
**Ação:** Enviar Telegram para Karine

```
Conceito (usando Telegram via webhook):
- Quando: Status muda para "Respondeu"
- Fazer: POST /telegram
  Message: "🎯 {{Nome}} respondeu! {{Observações}}"
```

### Automação 2: Marcar Próxima Ação Automaticamente

**Trigger:** 
- Status = "Mensagem Enviada"
- Dias sem resposta = 3

**Ação:** 
- Próxima Ação = hoje
- Tag: "FOLLOW-UP D+3"

---

## Views Diferentes para Diferentes Contextos

### View 1: "Quadro" (Karine acompanha estado)

```
Agrupar por: Status
Filtro: Última semana
Mostrar colunas: Nome, Tentativas, Oferta Feita, Observações
Cartão: Nome + Status + Data Último Contato
```

**Para quê:** Karine vê cada contato em qual estágio (Kanban)

### View 2: "Próximas Ações" (Karine sabe o que fazer hoje)

```
Filtro:
  - Próxima Ação = hoje
  - Status != "Recuperado" E Status != "Recusou"
Sort: Próxima Ação crescente
Mostrar: Nome, Telefone, Observações, Canal
```

**Para quê:** Checklist diário — Karine só vê tarefas hoje

### View 3: "Gráfico de Performance" (Mayko acompanha)

```
Tipo: Gráfico (múltiplos)
1. Coluna: Origem × Count(Status=Recuperado) — "Qual origem melhor?"
2. Línea: Data × Count(Disparos) — "Crescimento disparos"
3. Donut: Status × Count — "Distribuição funil"
```

**Para quê:** Revisar estratégia com Rogério (semanal)

### View 4: "Calendário" (Visual por data)

```
Tipo: Calendário
Por data: "Próxima Ação"
Mostrar: Nome, Status
```

**Para quê:** Karine vê semana inteira de forma visual

---

## Mobile: Karine no Celular

### Setup Notion Mobile

1. **Baixar app Notion** (iOS/Android)
2. **Abrir Dashboard**
3. **Add to Home:** botão ... > "Add to home screen"
4. **Shortcut:** Cria atalho Karine abre com 1 clique

### Widgets Úteis para Mobile

**Widget 1: Contador (Disparos Hoje)**
```
Notion Widget → "Contador de Disparos"
Refresh: 30 min
Tamanho: pequeno (home screen)
```

**Widget 2: To-Do (Próximas Ações)**
```
Notion Widget → "Próximas Ações"
Refresh: 2 horas
Mostra: top 3 tarefas hoje
```

---

## Dados para Preencher Manualmente (hoje)

| Campo | Como Preencher | Quem | Quando |
|---|---|---|---|
| `ID Chatwoot` | Copiar de Chatwoot > contact ID | Karine | Terça 17/05 |
| `Plano Atual` | Ver em Blingo (sistema antigo) | Lucas | Hoje (manual) |
| `Parcelas em Atraso` | Contar em fatura Tenex | Lucas | Hoje (manual) |
| `Valor em Aberto` | Somar parcelas atrasadas | Lucas | Hoje (manual) |
| `Via Pagamento` | Verificar em Tenex (PIX/Cartão) | Lucas | Hoje (manual) |

---

## KPIs no Dashboard (Atualizar D+1)

**Relatório Diário — Karine Preenche 15h30**

| Métrica | Fórmula Notion | Meta | Status |
|---|---|---|---|
| Disparos do dia | COUNT(Status="Msg Enviada" AND Data Hoje) | 10 | ? |
| Taxa resposta | COUNT(Respondeu) / COUNT(Msg Enviada) | 40% | ? |
| Recuperados | COUNT(Status="Recuperado") | 3 | ? |
| Valor rec. | SUM(Valor) WHERE Status="Recuperado" | R$3k | ? |
| Sem resposta D+7 | COUNT(Status="Msg Enviada" AND Dias>7) | <5 | ? |

---

## Checklist: Dashboard Pronto

- [ ] Página criada: `📊 Dashboard Karine — Vendas`
- [ ] Contador disparos hoje: atualiza
- [ ] Gráfico taxa resposta: atualiza
- [ ] Tabela próximas ações: filtrada
- [ ] View "Quadro": agrupada por Status
- [ ] Fórmulas: Taxa Resposta %, Dias Sem Resposta
- [ ] Mobile: Notion instalado + widgets
- [ ] Automação: Telegram notifica quando "Respondeu"
- [ ] Teste: Enviar 1 msg, ver atualizar em tempo real

---

## Troubleshooting Dashboard

| Problema | Solução |
|---|---|
| Gráfico não atualiza | Clicar "Refresh" no Notion (canto superior) |
| Contador mostra 0 | Verificar filtro (data está correta?) |
| Fórmula mostra erro | Validar nome do campo (case sensitive) |
| Mobile lento | Limpar cache Notion app + reinstalar |

---

## Próximas Ações

**Hoje (13/05):**
- [ ] Criar página `📊 Dashboard Karine`
- [ ] Adicionar 1 contador (disparos hoje)
- [ ] Karine testa no celular

**Terça (17/05):**
- [ ] Completar todos blocos
- [ ] Preencher dados Tenex (Lucas)
- [ ] Ativar automações

**Sexta (20/05):**
- [ ] Dashboard 100% operacional
- [ ] Karine apresenta resultado em tempo real

---

Voltar para [[README.md]] | [[01-roadmap-implementacao.md]]
