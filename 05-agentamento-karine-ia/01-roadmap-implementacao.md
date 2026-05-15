---
title: Roadmap de Agentização Karine — 30 Dias
tags: [sst, karine, roadmap, agentamento, timeline]
criado: 2026-05-13
atualizado: 2026-05-13
---

# 📅 Roadmap: Agentização de Karine em 30 Dias

> Plano de transformar Karine em vendedora com IA, começando 16/05 e culminando em gate decision 23/05.

---

## Fases de Implementação

### 🟦 Fase 1: Alignment + Setup (16/05 — 22/05 | 1 semana)

**Objetivo:** Karine entende o sistema, IA está integrada, workflows testados com 10 contatos.

#### Segunda 16/05 (hoje)
- [ ] **14h — Sessão Mayko + Karine (60 min)**
  - Apresentar roadmap
  - Demo: Chatwoot + prompts IA
  - Validar scripts de venda
  - Confirmar autorização Rogério (ChatBot, desconto máx 50%)
  - Treinar: como usar Notion como checklist
- [ ] **Após sessão — Karine testa manual:**
  - 10 contatos Tenex 5+ parcelas
  - Envia mensagem (com prompt IA)
  - Rastreia resposta no Notion
  - Relata bloqueadores

#### Terça 17/05
- [ ] **Mayko + TI: Setup n8n workflows**
  - [ ] Workflow 1: `Disparar mensagem perdão dívida (D+0)`
  - [ ] Workflow 2: `Follow-up automático (D+3 sem resposta)`
  - [ ] Workflow 3: `Lembrete D+7`
  - [ ] JSONs salvos em `n8n_workflows/`
- [ ] **Karine: Continua testes manuais (10 mais)**
- [ ] **Rogério: Aprovação final** (ChatBot, limite desconto)

#### Quarta 18/05–Quinta 19/05
- [ ] **Mayko: Webhook Chatwoot → Notion**
  - Cada mensagem recebida atualiza: Status, Data Último Contato
  - Cada resposta positiva marca: Status = "Respondeu"
- [ ] **Karine: Testa integração manual**
  - Envia via Chatwoot
  - Verifica se Notion atualiza automaticamente

#### Sexta 20/05
- [ ] **Ativar workflows n8n em PRODUÇÃO** (não teste)
  - Disparar para 50 contatos (amostra Tenex)
  - Monitorar: taxa de entrega, erros de API
- [ ] **Karine prepara relatório semanal:**
  - Quantos disparos
  - Taxa de resposta
  - Quantos em negociação

---

### 🟩 Fase 2: Escalada + Otimização (23/05 — 29/05 | 1 semana)

**Objetivo:** Atingir meta gate decision (≥20 adesões). Otimizar prompts de IA com base em resultados.

#### Segunda 23/05
- [ ] **09h — Gate Decision Call com Rogério**
  - Karine apresenta: adesões, reativações, taxa conversão
  - Decisão: CONTINUAR / AJUSTAR / PAUSAR
  - Critério de sucesso:
    - ✅ ≥20 adesões + ≥20 reativações → **contrato advisory assinado**
    - 🟡 10–19 adesões → extensão 15 dias
    - ❌ <10 adesões → diagnóstico + ajustes

#### Terça 24/05–Sexta 27/05 (se continuar)
- [ ] **Escalar disparos:**
  - Semana 1 (teste): 60 contatos
  - Semana 2 (escala): 150 contatos Tenex
  - Semana 3 (manutenção): 50 contatos BUM + novos leads
- [ ] **Otimizar prompts com base em conversões:**
  - Qual script gerou mais respostas?
  - Qual oferta (perdão 100%, 50%, voucher) converteu?
  - Melhorar tom/horário de envio
- [ ] **Dashboard em tempo real no Notion:**
  - Gráfico: Status × Origem
  - Tabela dinâmica: Tentativas vs Taxa conversão
  - Karine consegue filtrar por "Tenex 5+ parc" e ver progress

#### Sexta 27/05
- [ ] **Relatório semanal completo:**
  - Adesões: ___ (meta 40)
  - Reativações: ___ (meta 20)
  - Taxa conversão: ___% (meta 50%)
  - Custo por adesão: R$___ (meta <R$100)
  - Próximas ações

---

### 🟪 Fase 3: Automação Avançada + Mentoria (30/05 — 13/06 | 2 semanas)

**Objetivo:** 70% das mensagens rotineiras são automáticas. Karine foca em personalização + fechamento.

#### Segunda 30/05
- [ ] **Ativar ChatBot Notion (automações de resposta)**
  - [ ] Resposta automática: "Obrigado por responder, uma de nossas agentes entrará em contato em <4h"
  - [ ] Perguntas mais frequentes (FAQs) respondidas por IA
  - [ ] Escalação automática: se cliente menciona "não quero", marca "Recusou" e notifica Karine
- [ ] **Integração com Google Calendar**
  - Agendar call de Karine automaticamente (D+3 se cliente respondeu)
- [ ] **Karine: Sessão de Mentoria**
  - Foco em FECHAMENTO (não em prospecção)
  - Objeções mais comuns + rebatidas
  - Como oferecer plano correto para cada perfil

#### Terça 31/05–Quarta 01/06
- [ ] **Expandir base Tenex**
  - Karine recuperou 20% de 150 tentativas = 30 novos membros?
  - Escalar para 300 contatos Tenex
  - Manter cadência 70% automática + 30% Karine

#### Quinta 02/06–Sexta 03/06
- [ ] **Criar programa de incentivos (comissão)**
  - Karine recebe R$50 por cada Tenex reativado
  - R$100 por cada novo lead convertido
  - Transparência total no Notion
- [ ] **Documentar playbook:**
  - Scripts que funcionaram
  - Horários de maior resposta
  - Perfis de cliente por tipo de oferta

#### Segunda 06/06–Sexta 10/06
- [ ] **Executar em escala:**
  - 500 disparos Tenex / semana
  - 50 conversas manuais / semana (de Karine)
  - 15 novos membros / semana (meta)
- [ ] **Preparar proposta consultoria:**
  - Dados: quanto recuperou em MRR?
  - ROI: custo de IA vs receita nova
  - Contrato mensal: R$___ (proposta)

---

## Sprints Semanais

### Sprint 1: Alignment (16–22/05)

| Dia | Resultado Esperado | Responsável |
|---|---|---|
| Seg 16 | Karine entende sistema + testa manual (10) | Mayko + Karine |
| Ter 17 | n8n workflows prontos; Karine testa (10 mais) | Mayko/TI + Karine |
| Qua 18 | Webhook Chatwoot → Notion funcionando | Mayko |
| Qui 19 | Integração testada manualmente | Karine |
| Sex 20 | Workflows ativos em produção (50 contatos teste) | Mayko/TI |
| **Relatório** | **Adesões: ?** / **Taxa resposta: ?** | Karine |

### Sprint 2: Escala (23–29/05)

| Gate Decision | <10 adesões | 10–19 adesões | ≥20 adesões |
|---|---|---|---|
| Resultado | ❌ Pausar | 🟡 Estender | ✅ Contratar |
| Ação | Diagnóstico + ajustes | +15 dias de testes | Advisory assinado |

---

## Bloqueadores Críticos

| Bloqueador | Impacto | Como Resolver |
|---|---|---|
| Aprovação Rogério (ChatBot + limite 50%) | Alto | Agendar call Karine + Rogério (16/05) |
| Setup n8n (workflows não existem) | Alto | Mayko/TI begin 17/05 |
| Webhook Chatwoot → Notion | Médio | Validar com Notion API (18/05) |
| Base Tenex incompleta (Lucas não enviou) | Médio | Karine puxa de Blingo manualmente |
| Chatwoot não tem prompts IA integrados | Médio | Usar Claude API via Chatwoot extension |

---

## Checklist de Recursos

### [Mayko]
- [ ] Sessão Karine (16/05 14h) — convite enviado?
- [ ] JSONs dos 3 workflows n8n prontos?
- [ ] Webhook configurado no Notion?
- [ ] Prompts de IA documentados em `02-prompts-ia-whatsapp.md`?
- [ ] Documentação n8n em `03-workflow-n8n-cobranca.md`?

### [Rogério]
- [ ] Autorização ChatBot (sim/não)?
- [ ] Limite máximo de desconto automático (50% confirmado)?
- [ ] Call com Karine (16/05)?

### [Karine]
- [ ] Baixou app Notion no celular?
- [ ] Testou envio manual de 20 mensagens?
- [ ] Acessou Chatwoot (login ok)?
- [ ] Entendeu o fluxo WhatsApp → Chatwoot → n8n → Notion?

### [TI]
- [ ] n8n workflows criados (3x)?
- [ ] Teste de API (Chatwoot × n8n)?
- [ ] Webhook validado (Chatwoot → Notion)?
- [ ] Monitoramento de erros (Sentry/logs)?

---

## KPIs por Fase

### Fase 1 (16–22/05)
- **Adesões mínimas:** 5
- **Taxa resposta:** >30%
- **Bloqueadores resolvidos:** 100%

### Fase 2 (23–29/05)
- **Adesões mínimas:** 20 (gate decision)
- **Reativações:** 20
- **Taxa conversão:** >40%
- **Custo por adesão:** <R$200

### Fase 3 (30/05–13/06)
- **Adesões mínimas:** 30
- **Reativações:** 30
- **Automação:** 70% das mensagens
- **Comissão Karine:** R$5.000+ (mensal)

---

## Próxima Ação

**Imediata:** Enviar convite sessão Karine para **sexta 16/05 às 14h**.

Voltar para [[README.md]] | [[RETOMADA.md]]
