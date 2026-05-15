---
title: FUNIL PREDICTABLE REVENUE — Raquel + MÉDINA + Karine (SST Card)
tags: [medina, sdr-ia, raquel, karine, funil, predictable-revenue, social-seller]
aliases: [Funil SDR Raquel MÉDINA Karine, Predictable Revenue SST]
criado: 2026-05-06
---

# 🔄 FUNIL COMPLETO: Raquel → MÉDINA → Karine → Irlana

**Modelo:** Predictable Revenue (Cold Calling 2.0 adaptado para Social Selling + WhatsApp)  
**Objetivo:** Gerar pipeline previsível de consultas + cartões SST Card

---

## 🎯 O FUNIL (3 Papéis Especializados)

```
┌────────────────────────────────────────────────────────────────┐
│                   MÁQUINA DE RECEITA PREVISÍVEL                 │
└────────────────────────────────────────────────────────────────┘

RAQUEL (Social Seller)
├─ Publica 5 posts/semana (seg-sex)
├─ CTA: "Envia ZAP" → WhatsApp
├─ Gera LEADS brutos (volume)
├─ Métrica: Leads gerados/semana
└─ Objetivo: ≥10 leads/semana

        ↓↓↓ Leads chegam no WhatsApp ↓↓↓

MÉDINA (SDR-IA via GPTMaker)
├─ Acolhe leads com empatia
├─ Qualifica via SPIN (Situação → Problema → Implicação → Necessidade)
├─ Identifica se é Particular ou SST Card
├─ Agenda call 5 min com Irlana (até 7 dias)
├─ Envia detalhes para Karine
├─ Métrica: Oportunidades qualificadas/semana
└─ Objetivo: ≥70% dos leads qualificados

        ↓↓↓ Qualificados vão para Karine ↓↓↓

KARINE (Closer/Account Executive)
├─ Recebe leads qualificados de MÉDINA
├─ Confirma disponibilidade/interesse
├─ Apresenta opções (Particular vs SST Card)
├─ Oferece parcelamento
├─ Recolhe informações para CRM
├─ Agenda com Irlana via Google Calendar
├─ Métrica: Conversão para agendamento
└─ Objetivo: ≥60% dos qualificados agendam

        ↓↓↓ Agendados vão para Irlana ↓↓↓

IRLANA (Consultora de Saúde / CSM)
├─ Executa call de 5 min (discovery)
├─ Identifica necessidade exata
├─ Oferece procedimento + SST Card
├─ Agenda consulta presencial
├─ Métrica: Conversão para cliente
└─ Objetivo: ≥50% dos agendados viram clientes

        ↓↓↓ RESULTADO FINAL ↓↓↓
        
CLIENTE SST
├─ Paga por consulta/exame (Particular ou SST Card)
├─ Oportunidade de upsell (check-ups, cartão anual)
└─ Métrica: Receita gerada
```

---

## 📊 PIPELINE MATH — SST CARD

**Objetivo semanal:** Gerar receita previsível

### Cenário Base

```
RECEITA GOAL (semanal):  R$ 2.000 (30 consultas a R$150 média)

Cálculo backward:

Receita: R$ 2.000
├─ ÷ Ticket médio (R$150)
├─ = 13-14 consultas/semana AGENDADAS

Consultas agendadas: 13
├─ ÷ Conversão Irlana (50%)
├─ = 26 CALLS agendados com Irlana

Calls agendados: 26
├─ ÷ Conversão Karine (60%)
├─ = 43 LEADS QUALIFICADOS por MÉDINA

Leads qualificados: 43
├─ ÷ Conversão MÉDINA (70%)
├─ = 61 LEADS BRUTOS gerados por Raquel

Leads brutos: 61
├─ ÷ Meta semanal Raquel (≥10/semana)
├─ = 6+ semanas para atingir meta
└─ (Raquel consegue com 5 posts → ~15 leads/semana)
```

**Resultado:** Com Raquel gerando 15 leads/semana:
- MÉDINA qualifica: 15 × 70% = 10-11 qualificados
- Karine agenda: 10-11 × 60% = 6-7 calls
- Irlana converte: 6-7 × 50% = 3-4 clientes/semana
- **Receita:** 3-4 × R$150 = **R$450–600/semana**

---

## 🤖 MÉDINA (SDR-IA) — PROMPTS ATUALIZADOS

### IDENTIDADE (Atualizada para Social Seller)

```
Sou MÉDINA, Estagiária SDR da SST Clínica (Simões Filho-BA).

Missão: Acolher leads vindos dos posts de Raquel (Instagram),
qualificar via SPIN e agendar call de 5 min com Consultora 
Irlana Gonçalves (até 7 dias).

Contexto: Raquel faz Social Selling — publica posts que geram
leads qualificados no WhatsApp. Meu trabalho é transformar
esses leads brutos em oportunidades confirmadas.

Atendimentos: Particular ou SST Card (até 75% Desc.)
Pagamento: Presencial | Horário: Seg-Sex 07–17h | Sáb 07–11h

Status: Alguém já contatou = lead quente (não frio)
```

### FLUXO ATUALIZADOS

**Trigger:** Lead chega no WhatsApp (via CTA do post de Raquel)

#### PASSO 1: Acolhimento + Saudação

```
MÉDINA entra com:
"Oi [Nome]! 👋 Sou MÉDINA da SST Clínica.

Vi que se interessou no post de Raquel!

Que bom! 💚 Qual consulta ou exame traz você aqui?"

Regras:
✅ Cumprimentar pelo nome (guardar greeted=true)
✅ Máximo 3 linhas
✅ Tom empático
✅ 1 pergunta (aberta)
```

#### PASSO 2: Qualificação SPIN

**Usar quando lead responde:**

```
S) SITUAÇÃO:
   "Qual consulta ou exame você precisa?"
   (Lead: "Quero fazer check-up")

P) PROBLEMA:
   "Qual motivo está te trazendo agora?"
   (Lead: "Colesterol alto, meu pai teve infarto")

I) IMPLICAÇÃO:
   "Se não resolver agora, qual pode ser a consequência?"
   (Lead: "Tenho medo de ter a mesma coisa")

N) NECESSIDADE:
   "Como ficaria sua saúde se resolvêssemos isso?"
   (Lead: "Faria diferença no meu dia-a-dia")

💰 INVESTIMENTO:
   Se não citado: "E quanto ao investimento? Qual sua disponibilidade?"
```

#### PASSO 3: Oferta (Particular vs SST Card)

**Baseado na necessidade:**

```
MÉDINA oferece:

"Ótimo! Tenho 2 caminhos para você:

1️⃣ PARTICULAR: Consulta Clínico Geral R$120
   (Resultado em 24h, pague presencial)

2️⃣ SST CARD: Assinatura R$39,90/mês
   (Acompanhamento ilimitado, 75% desc em consultas)

Qual faz mais sentido para você?"

Se hesita: 
"Pode agendar a consulta sem se comprometer 
com o cartão. Você conhece na prática!"
```

#### PASSO 4: Agendamento Call com Irlana

```
MÉDINA confirma:
"Perfeito! Qual seria o melhor horário para 
uma ligação de 5 min com nossa Consultora 
Irlana nos próximos 7 dias?

Seg-Sáb, 07-17h 
(Sábado até 11h)"

Lead responde: "Terça às 9h"

MÉDINA confirma:
"✅ Terça às 9h pronto! 

Seu e-mail? (para enviar confirmação)"

AÇÃO: Karine agenda no Google Calendar + 
prepara contexto para Irlana
```

#### PASSO 5: Encaminhamento para Karine

```
MÉDINA passa dados para Karine:

- Nome: João Silva
- Telefone: 71 99887-7765
- Necessidade: Check-up (colesterol alto)
- Tipo: Particular (mencionou investimento limitado)
- Horário agendado: Terça 9h
- SST Card: Pode oferecer (aberto)

"João, você vai receber uma mensagem da Karine 
confirma tudo. Até terça! 🎯"
```

---

## 🎤 KARINE (Closer/AE) — SCRIPT DE CONFIRMAÇÃO

**Quando recebe qualificado de MÉDINA:**

```
Oi João! 👋 Sou Karine da equipe SST.

Médina me passou seu contato!

Só confirmando: Terça às 9h com Irlana 
para seu check-up?

Dúvidas antes? Estou aqui! 💚

[Se ele disser SIM]

Perfeito! Irá receber link de confirmação.

Aproveita: SST Card sai por R$39,90/mês.
Você quer conhecer como funciona?

[Se ele disser NÃO]

Sem problema! E se fosse num outro horário?
(Qual seria melhor para você?)
```

---

## 📊 MÉTRICAS DE SUCESSO (Semanal)

| Métrica | Meta | Status | Responsável |
|---------|------|--------|------------|
| **Leads brutos (Raquel)** | ≥15/semana | ⏳ | Raquel |
| **Leads qualificados (MÉDINA)** | ≥10/semana (70%) | ⏳ | MÉDINA |
| **Calls agendados (Karine)** | ≥6/semana (60%) | ⏳ | Karine |
| **Clientes confirmados (Irlana)** | ≥3/semana (50%) | ⏳ | Irlana |
| **Receita gerada** | ≥R$450/semana | ⏳ | Time |

---

## 🔍 CRITÉRIOS DE QUALIFICAÇÃO (MÉDINA)

**Lead é QUALIFICADO se:**

1. ✅ Necessidade imediata de serviço (check-up, consulta, exame)
2. ✅ Disponível para call em até 7 dias (Seg-Sáb, 07-17h | Sáb até 11h)
3. ✅ Mencionou investimento (Particular ou SST Card)

**Lead é NÃO QUALIFICADO se:**

❌ Pergunta muito vaga ("tipo... preciso de um médico")
❌ Não tem disponibilidade nos próximos 7 dias
❌ Diz "vou pensar" após 2 follow-ups
❌ Pede "informação geral" (sem necessidade específica)

**Ação se NÃO qualificado:**

Encaminhar para evento gratuito:
```
"Entendo! Sem pressa.

Temos um evento gratuito de prevenção:
→ https://evento.sstcardprevencaoasaude.com.br/

Quer que eu envie o link?"
```

---

## 🚀 FLUXO SEMANAL COMPLETO

### SEGUNDA–QUINTA

```
09h00 → Raquel publica 1 post (conforme calendário)
        ↓
10h–17h → Leads chegam no WhatsApp (GPTMaker)
        ↓
MÉDINA responde automático + qualifica manualmente
        ↓
Qualificados são passados para Karine (WhatsApp)
        ↓
Karine confirma + agenda no Google Calendar
        ↓
Irlana recebe agenda + prepara contexto
```

### SEXTA (Fechamento)

```
15h00 → Compilar resultados da semana:

        ✅ Leads brutos Raquel: ___
        ✅ Qualificados MÉDINA: ___
        ✅ Agendados Karine: ___
        ✅ Confirmados Irlana: ___
        ✅ Receita gerada: R$ ___
        
        ↓
        
17h00 → Reunião rápida (15 min):
        - O que deu certo?
        - O que precisa melhorar?
        - Ajustes para semana 2?
```

---

## 📈 SCORE PREDICTABLE REVENUE

**Avaliação atual do funil:**

| Critério | Score | Por quê |
|----------|-------|--------|
| **Separação de papéis** | 9/10 | Raquel (prospecção) + MÉDINA (qualificação) + Karine (closing) |
| **Processo repetível** | 8/10 | MÉDINA tem prompts padronizados, fluxo claro |
| **Pipeline previsível** | 7/10 | MÉDINA qualifica ≥70%, mas depende de Raquel (variável ainda) |
| **Hands-off estruturado** | 8/10 | MÉDINA → Karine é clara; Karine → Irlana é clara |
| **Métricas rastreadas** | 7/10 | Rastreamos leads, mas falta historical data |
| **Otimização contínua** | 6/10 | Ainda em fase 1 (semana 1 de testes) |

**Score geral: 7.5/10**

**Para chegar a 10/10:**
- [ ] Completar 4 semanas de dados históricos (para validar pipeline math)
- [ ] Otimizar taxa de qualificação MÉDINA (baseado em padrões)
- [ ] Adicionar upsell playbook (após agendamento, oferecer check-ups)
- [ ] Integrar n8n para automação de rastreamento
- [ ] Criar dashboard em tempo real (Notion ou Metabase)

---

## 🎯 OBJETIVOS — PRÓXIMAS 4 SEMANAS

### Semana 1 (06–12 maio): Validar funil
```
✅ Raquel gera ≥10 leads
✅ MÉDINA qualifica ≥70%
✅ Karine agenda ≥60%
✅ Irlana converte ≥50%
Resultado esperado: ~3–4 clientes
```

### Semana 2 (13–19 maio): Otimizar scripts
```
✅ MÉDINA refina SPIN baseado em respostas reais
✅ Karine testa 2 closes diferentes
✅ Irlana identifica padrões de conversão
Resultado esperado: +20% nas taxas
```

### Semana 3 (20–26 maio): Escalar Raquel
```
✅ Raquel aumenta para 7 posts/semana
✅ MÉDINA treina IA para auto-responder primária
✅ Karine automatiza confirmações com Zapier
Resultado esperado: ~10–15 clientes/semana
```

### Semana 4 (27–02 junho): Consolidar + Upsell
```
✅ Dashboard de métricas ao vivo
✅ Playbook de upsell (check-ups, cartão anual)
✅ Projeção de receita Q2
Resultado esperado: ~20–25 clientes/semana, R$2–3k/semana
```

---

## 📋 CHECKLIST EXECUÇÃO

- [ ] MÉDINA está configurado no GPTMaker (prompts atualizados)
- [ ] Raquel tem 5 posts agendados (seg–sex)
- [ ] Cada post tem CTA com link WhatsApp correto
- [ ] Karine recebe notificação quando lead qualificado
- [ ] Irlana tem Google Calendar pronto (para agendamento)
- [ ] Tabela de rastreamento criada (atualizar diariamente)
- [ ] Reunião de revisão agendada (sexta-feira 15h)

---

**Modelo:** Predictable Revenue (Aaron Ross)  
**Status:** 🔴 Semana 1 em progresso (06–12 maio)  
**Próximo check:** 07/05/2026 (quinta) — Raquel + MÉDINA + Karine

Voltar para [[SESSAO-RAQUEL-06-05-RESUMO-EXEC]]
