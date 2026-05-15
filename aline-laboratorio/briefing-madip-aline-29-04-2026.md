---
title: Briefing MADIP — Aline Souza (Implementação Conversor Lab)
tags: [sst, aline, laboratorio, madip, implementacao, em-progresso]
aliases: [MADIP Aline, Máquina Conversão Lab]
related: [[perfil-aline-souza]], [[sessao-diagnostico-aline-23-04-2026]], [[viabilidade_card]]
criado: 2026-04-29
atualizado: 2026-04-29
---

# Briefing MADIP — Aline Souza
## Implementação da Máquina de Conversão do Laboratório SST Clínica

**Data:** 29/04/2026  
**Reunião:** Mayko + Aline (SST Clínica — Laboratório)  
**Foco:** Estruturar e executar a frente de Conversão (32% → 70%) em 90 dias

---

## 🎯 Seu Papel no MADIP (Pilares)

O MADIP organiza o negócio em 4 pilares. **Você é a âncora do pilar de CONVERSÃO:**

| Pilar | Definição | Seu Papel | Meta |
|---|---|---|---|
| **Atração** | Gerar leads de forma previsível | Raquel (Marketing/Instagram) | 40–50 consultas/semana |
| **🔴 Conversão** | Transformar orçamentos em vendas | **Você (Aline) + Ilana + Equipe** | **32% → 70% em 90 dias** |
| Retenção | Garantir uso contínuo do produto | Lucas (CS) | NPS 8+; churn <5% |
| Recuperação | Resgatar clientes perdidos | Karine (Financeiro) | Tenex: 20% reativação |

---

## 📊 A Situação Atual do Laboratório

| Métrica | Valor | Observação |
|---|---|---|
| **Pacientes/mês** | ~245 | Estimado (75k receita ÷ ~R$300 ticket médio) |
| **Orçamentos gerados/mês** | ~245 | 1 orçamento por paciente que passa |
| **Vendas atuais (32%)** | ~78 | A base: 78 exames vendidos/mês |
| **Receita mensal** | ~R$ 75.000 | Estimado (78 vendas × ~R$300 ticket médio + consultas) |
| **Meta: 70% conversão** | ~172 vendas | +94 vendas/mês |
| **Receita potencial** | ~R$ 127.000 | Incremento: +R$52.000/mês |

**Resumo:** Você já tem o tráfego. Falta estruturar a abordagem para converter.

---

## ✅ Prova de Conceito (Por que você consegue)

### Dado histórico que prova funcionalidade

| Período | Modelo | Conversão | Senhas/dia |
|---|---|---|---|
| Jan/Fev 2026 | Comissão ativa | **37%** | 12+ |
| Mar–Abr 2026 | Sem foco/sobrecarga | **32%** | 4–5 |
| 23/04/2026 (1 dia) | Ligação + mensagens ativas | ~48%* | 12 |

*Estimado (12 senhas/dia × 5 dias = 60 conversões; se ~245 pacientes/mês passarem, taxa ~24% desse período, mas com foco concentrado)

**Insight-chave:** Você não precisa aprender a vender. Você **já sabe**. O que falta é **tempo + estrutura + reconhecimento**.

---

## 🎬 Sua Máquina de Conversão em 4 Etapas

### Fluxo padrão de um paciente no laboratório

```
1. ACOLHIMENTO
   ↓ (Ilana na recepção)
2. CONSULTA → ORÇAMENTO
   ↓ (Médico + Aline)
3. FECHAMENTO
   ↓ (Aline — aqui é crítico)
4. FOLLOW-UP (D+1, D+3, D+7)
   ↓ (Automação n8n + você validando)
```

---

## 📝 Script de Conversão — 3 Fases Críticas

### Fase 1: Acolhimento + Contextualização (Ilana na recepção)

**Quando:** Paciente chega, antes de ser chamado para consulta  
**Quem:** Ilana (recepcionista)  
**Tempo:** 2–3 minutos  

**Script:**
```
"Olá, tudo bem? Bem-vindo à SST Clínica. Aqui a gente oferece 
um cartão de saúde complementar — o SST Card — que torna todos 
os seus exames muito mais rápidos e baratos. A Aline vai falar 
mais sobre isso durante sua consulta. Você já conhece?"
```

**Objetivo:** Plantar a semente. Não vender agora.  
**Indicador:** Se já mencionar SST Card, paciente entra com predisposição positiva.

---

### Fase 2: Fechamento Consultório (Aline com paciente + médico)

**Quando:** Após consulta / diagnóstico realizado  
**Quem:** Você (Aline) + Médico  
**Tempo:** 5–7 minutos  
**Caso típico:** "Preciso fazer ultrassom do abdômen"

**Script — 3 Etapas:**

#### A. Problema (Contexto)
```
"Ótimo, Dr. [Médico] solicitou um ultrassom abdominal para você.
Normalmente esse exame custa R$ 180 a R$ 350 em clínicas particulares,
e as filas do SUS são longas."
```

#### B. Solução (Oferta SST Card)
```
"Com nosso SST Card, você tem o ultrassom por R$ 39,90 por mês —
e paga esse valor uma única vez, não por cada exame.
Você ainda ganha acesso a consultas ilimitadas, exames preventivos
e outras especialidades. É como um 'Netflix de saúde'."
```

**Variações conforme objeção:**
- "Está caro" → "Você vai gastar isso em 2 consultas particulares"
- "Já tenho plano" → "Esse é complementar — para você não ficar preso ao horário do seu plano"
- "Não tenho renda fixa" → "Temos plano a partir de R$ 9,90 — básico, mas funciona"

#### C. Fechamento (Senso de urgência)
```
"Esse exame a gente pode fazer hoje à tarde ou amanhã cedo.
Se você se filiar agora no SST Card, entra na fila de prioridade.
Quanto você quer investir por mês?"
```

**Alternativa (se resistência forte):**
```
"Sem pressão. Deixe comigo um WhatsApp seu. Amanhã eu envio
o link para você ver os planos sem compromisso. Depois você me retorna."
```

---

### Fase 3: Follow-up Automático (D+1, D+3, D+7)

**Quando:** Se não fechou na primeira vez  
**Quem:** Automação n8n (com validação sua)  
**Frequência:** 3 toques estruturados

#### Toque 1 (D+1 — 24h depois)
```
Oi [Nome]! Tudo bem?

Vimos que você não completou o cadastro do SST Card ainda.
Sem pressão — mas deixa eu te mostrar: com R$ 39,90/mês,
você já économiza R$ 140 no ultrassom que fez.

Link: [URL Notion com planos]

Qualquer dúvida, é comigo! 🙂
```

#### Toque 2 (D+3 — 3 dias)
```
[Nome], como foi sua experiência com a gente?

Só vinha conferir se o ultrassom saiu com qualidade.
E aproveitar: o SST Card te dá direito a 3 consultas de acompanhamento
no 1º mês. Quer agendar uma revisão?

Link: [URL WhatsApp direto com você]
```

#### Toque 3 (D+7 — 1 semana, última tentativa)
```
[Nome], essa é a última mensagem, prometo! 😄

A promoção de acesso fácil ao SST Card vai encerrar em 3 dias.
Se você quiser, envio a fatura em PDF agora mesmo.

Me manda um "Sim" e resolve isso comigo?
```

**Automação (n8n):**
- Sistema coleta whatsapp do paciente após exame realizado
- Dispara automaticamente D+1, D+3, D+7
- Você recebe notificação Telegram quando paciente responde
- Você valida e envia resposta personalizada

---

## 🎯 Cadência de 7 Toques Completa (Semanal)

A cadência não termina em 7 dias. Estruturamos **7 toques por ciclo** para nunca deixar paciente "esquecer":

| Toque | Quando | Quem | Canal | Mensagem |
|---|---|---|---|---|
| 1 | Dia 0 (Consultório) | Aline | Presencial | "SST Card — solução rápida" |
| 2 | D+1 (24h) | n8n | WhatsApp | Recapitulação + Link |
| 3 | D+3 (3 dias) | n8n | WhatsApp | "Como foi sua experiência?" |
| 4 | D+7 (1 semana) | n8n | WhatsApp | "Última chance — promoção encerra" |
| 5 | D+14 (2 semanas) | Aline/Ilana | Ligação | "Olá! Fiquei com você... quer conversar?" |
| 6 | D+21 (3 semanas) | Ilana | WhatsApp | Reabordagem com novo motivo (ex: "nova promoção") |
| 7 | D+30 (1 mês) | Aline | Presencial* | Se volta à clínica para outro exame, retoma |

*Ou ligação se não retornar

---

## 📊 Dashboard de Acompanhamento (Aline — Diário)

Você precisa medir 5 números todos os dias. Simples assim:

### Tabela de acompanhamento (planilha Google Sheets)

```
Data: 29/04/2026

| Métrica | Meta/Dia | Realizado | Diferença | Ação |
|---|---|---|---|---|
| Pacientes atendidos | 15 | 14 | -1 | OK |
| Orçamentos apresentados | 14 | 13 | -1 | 1 não aceita avaliação |
| Conversões SST (Fase 2) | 10 (70%) | 7 | -3 | Reforçar script |
| Follow-ups enviados (D+1) | — | 5 | — | Validar respostas |
| Adesões fechadas (D+3 e além) | 3 (20% acum.) | 1 | -2 | Aumentar toque 2 |

Receita SST Card (estim.): R$ 7 × R$39,90 = R$ 279 (meta semanal: ~R$1.680)
```

### O que rastrear (na sua cabeça todos os dias)

1. **Conversão Fase 2** (Consultório) — Meta: 70% dos orçamentos apresentados  
   *Fórmula: Vendas do dia ÷ Orçamentos apresentados*

2. **Receita agregada SST** — Meta: R$ 1.680/semana (~R$ 240/dia)

3. **Taxa de resposta D+1** — Meta: >40% (indica qualidade da mensagem)

4. **Adesão final (D+3/D+7)** — Meta: 20% de conversão do follow-up

---

## ⚙️ Integração com Automação (n8n + Chatwoot)

**O que você NÃO precisa fazer manualmente:**

1. ✅ **Envio de mensagens D+1, D+3, D+7** → n8n (automático)
2. ✅ **Rastreamento de respostas** → Chatwoot + Notion (automático)
3. ✅ **Notificações quando paciente responde** → Telegram para você (automático)

**O que VOCÊ precisa fazer:**

1. **Validar WhatsApp do paciente** após exame (15s)  
   → Dar para Ilana registrar em planilha Google (coluna: "WhatsApp Paciente")

2. **Responder quando paciente retorna** (durante seu horário)  
   → Abre mensagem, valida oferta, fecha negócio

3. **Revisar dashboard diário** (5 min)  
   → Pergunta: "Conversão está caindo? Por quê?"

---

## 💰 Estrutura de Comissão (Baseado em Jan/Fev 2026)

**Prova de conceito:** Quando você teve comissão, conversão pulou para 37%.

### Modelo sugerido (validar com Rogério)

| Resultado | Comissão |
|---|---|
| Venda SST Card durante consulta | R$ 15/cartão |
| Adesão via follow-up (D+1 a D+7) | R$ 12/cartão |
| Ilana (recepção) facilita adesão | R$ 5/cartão (para motivar desenvolvimento dela) |
| Meta mensal: +20 adesões/mês vs. baseline | Bônus: R$ 200 |

**Exemplo:** 30 vendas/mês × R$15 = R$450 + R$200 (bônus meta) = **R$650/mês para você**

---

## 🚀 Plano de Execução (Próximas 48h)

| Ação | Quem | Prazo | Checklist |
|---|---|---|---|
| Validar script com Rogério | Mayko | 29/04 (hoje) | [ ] Aprovação dos 3 scripts |
| Treinar Ilana no acolhimento | Você + Ilana | 29/04 (hoje) | [ ] 1 rodada de prática |
| Configurar n8n + Chatwoot | Mayko (TI) | 29/04 | [ ] Fluxo automático ativo |
| Revisar dashboard Sheets | Você | 30/04 | [ ] 1 dia piloto medindo |
| Reunião de validação com você | Mayko | 01/05 | [ ] Ajustes identificados |
| **INÍCIO OFICIAL:** Máquina de conversão | Você | 01/05 | [ ] 100% operacional |

---

## 🎓 Seu Desenvolvimento em 90 Dias

Além de elevar conversão, você vai:

| Mês | Meta | Desenvolvimento |
|---|---|---|
| **Mês 1 (Mai)** | 50% conversão | Ilana segue seus scripts de acolhimento. Você valida. |
| **Mês 2 (Jun)** | 60% conversão | Ilana gerencia follow-up D+1/D+3 com n8n. Você valida. |
| **Mês 3 (Jul)** | 70% conversão | Ilana lidera conversão D+7 + abordagem em recepção. Você supervisiona. |

**Resultado:** Em 90 dias, você está **livre de sobrecarga de recepção** e **focado em vendas estratégicas** — exatamente como você pediu na entrevista.

---

## ❓ Perguntas-Chave para Hoje (Reunião)

Deixo aqui para você validar comigo:

1. **Script:** Os 3 scripts (Acolhimento, Fechamento, Follow-up) fazem sentido com seu fluxo atual?

2. **Comissão:** O modelo de R$ 15 por venda + R$ 200 bônus mensal funciona para você e Ilana?

3. **Automação:** Você consegue coletar WhatsApp dos pacientes hoje? (Se sim, qual o processo?)

4. **Ilana:** Ela está pronta para assumir acolhimento + follow-up? Precisa de algo antes?

5. **Rogério:** Ele já aprovou a estrutura de comissão?

---

## 📌 O Que Vem Depois (Fase 2)

Depois que a conversão estiver em 70%, o próximo passo é:

1. **Retenção** (Lucas/CS) — Garantir que quem compra SST Card usa continuamente
2. **Indicação** — Pacientes satisfeitos trazem amigos (crescimento viral no bairro)
3. **Bairro da Paz** — Replicar o mesmo modelo na 2ª filial

---

## 🔗 Documentos Relacionados

- [[perfil-aline-souza]] — Seu perfil completo (superpoderes + demandas)
- [[sessao-diagnostico-aline-23-04-2026]] — Dados da entrevista (23/04)
- [[viabilidade_card]] — Modelo financeiro completo da SST Card
- [[contexto_projeto]] — Visão estratégica global do projeto
- [[perfil-rogerio-diretor]] — Como trabalhar com Rogério nas decisões

---

**Próxima reunião:** 30/04 ou 01/05/2026 (agendar com Mayko)  
**Volta para:** [[RETOMADA]]
