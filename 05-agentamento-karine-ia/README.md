---
title: Agentização de Karine — Cobrança/Vendas com IA
tags: [sst, karine, agentamento, ia, cobranca, vendas]
criado: 2026-05-13
atualizado: 2026-05-13
---

# 🤖 Agentização de Karine — Sistema de Cobrança/Vendas Automatizado com IA

> Estrutura para transformar Karine em vendedora potencializada por IA, com automações de WhatsApp, Chatwoot, n8n e Notion.

---

## Objetivo da Agentização

**Multiplicar a capacidade de cobrança e venda de Karine** através de:
- ✅ Scripts de WhatsApp automatizados no Chatwoot
- ✅ Cadências de follow-up inteligentes no n8n
- ✅ Rastreamento centralizado no Notion
- ✅ Prompts de IA para personalizar mensagens
- ✅ Dashboard de resultados em tempo real

**Resultado esperado:** 
- Karine sai de 24 adesões/mês para 40+
- Recuperação de 150+ contratos Tenex (base inadimplente)
- Automatização de 70% das mensagens rotineiras

---

## Arquitetura Técnica

```
WhatsApp Business (Evolution API)
         ↓
Chatwoot (recebe/envia mensagens)
         ↓
n8n (processa regras, dispara workflows)
         ↓
Notion (rastreia status + atualiza pipeline)
         ↓
Karine (revisa, personaliza, fecha negócios)
```

---

## Documentos Nesta Pasta

| Arquivo | Propósito | Público |
|---|---|---|
| `README.md` | Este arquivo — índice geral | Referência |
| `01-roadmap-implementacao.md` | Plano 30 dias de agentização (fases, sprints, gates) | Mayko + Karine |
| `02-prompts-ia-whatsapp.md` | Prompts prontos para copiar → Chatwoot/IA | Karine + IA |
| `03-workflow-n8n-cobranca.md` | Diagrama e specs dos workflows n8n (D+3, D+7, D+15) | Mayko + TI |
| `04-scripts-venda-perdao-divida.md` | Scripts de venda para 5 cenários (novo lead, reativação, perdão, voucher) | Karine + Equipe |
| `05-dashboard-metricas-karine.md` | Setup de dashboard em Notion (conversão, tentativas, origem) | Karine |
| `06-integracoes-chatwoot-notion.md` | Webhook Chatwoot → Notion (atualiza pipeline em tempo real) | Mayko + TI |

---

## Estado Atual (13/05/2026)

### ✅ Já Feito
- [x] Pipeline criada no Notion com 15+ colunas estruturadas (estatuto 07/05)
- [x] 307 disparos WhatsApp enviados (27/04) — fila de campanha perdão dívida
- [x] Base Tenex mapeada: 761 contratos em atraso
- [x] Perfil de Karine documentado (super poder: comunicação/convencimento)
- [x] Scripts básicos de abordagem criados

### 🔄 Em Progresso
- [ ] Automações n8n para cadências (D+3, D+7, D+15)
- [ ] Webhook Chatwoot → Notion (atualizar status em tempo real)
- [ ] Prompts de IA personalizáveis para Chatwoot
- [ ] Dashboard de KPIs para Karine acompanhar

### ⏳ Bloqueado
- Aprovação Rogério: autorizar ChatBot + automatização (pendente call com Karine)
- Script perdão dívida: aguardando validação final de Rogério

---

## Quick Start — Próximos 7 Dias

**Sexta 16/05:**
- [ ] Ler `01-roadmap-implementacao.md`
- [ ] Mayko + Karine: sessão ao vivo (60 min) para alinhamento

**Segunda 19/05–Terça 20/05:**
- [ ] Setup n8n workflows (Mayko + TI)
- [ ] Teste com 10 contatos (Karine manualmente)

**Quarta 21/05–Quinta 22/05:**
- [ ] Ativar webhook Chatwoot → Notion
- [ ] Rastrear conversões em tempo real

**Sexta 23/05:**
- [ ] Gate Decision: <10 / 10–19 / ≥20 novas adesões?

---

## Próximas Ações Imediatas

### [Mayko] — Esta Semana (13–16/05)
1. Finalizar `01-roadmap-implementacao.md`
2. Escrever `02-prompts-ia-whatsapp.md` (5 cenários de venda)
3. Documentar `03-workflow-n8n-cobranca.md` (com JSONs dos workflows)
4. Agendar sessão Karine (16/05 às 14h)

### [Rogério] — Aprovação
- [ ] Autorizar ChatBot Notion (no máximo 50% de desconto em mensagens automáticas)
- [ ] Confirmar perdão dívida: Tenex 5+ parcelas → R$9,90/mês permanente

### [Karine] — Preparação
- [ ] Revisar scripts de venda (quando disponível em `04-scripts-venda-perdao-divida.md`)
- [ ] Testar envio de mensagens personalizadas no Chatwoot (manual)
- [ ] Aceitar sessão de treinamento (16/05)

---

## Métricas de Sucesso

| KPI | Baseline | Meta |
|---|---|---|
| Adesões/mês (novo lead) | 24 | 40+ |
| Recuperação Tenex (20%) | 0 | 150+ |
| Taxa de conversão (WhatsApp) | 33% | 50%+ |
| Tempo médio resposta (horas) | - | <4h |
| Tentativas por contato | 2 | 7 |

---

## Links Relacionados

- [[RETOMADA.md]] — Estado geral do projeto SST
- [[sessao-agentamento-karine-27-04-2026.md]] — Última reunião (campanha perdão dívida)
- [[perfil-karine-entrevista-nov2025.md]] — Quem é Karine, seus super poderes
- Notion: 🎯 Pipeline Ativa — Karine | Cobranças SST Card (https://www.notion.so/138f7d78-0ea6-423d-babc-2f5a1fe0092b)

---

Voltar para [[00-plano-execucao-7dias]] | [[RETOMADA.md]]
