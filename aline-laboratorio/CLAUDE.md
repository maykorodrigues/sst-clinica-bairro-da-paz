# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## O que é este diretório

Subprojeto especializado da frente de **Advisory Laboratório/Clínica** para SST Clínica (Rogério Ferreira). Focado em estruturar e executar a máquina de vendas do laboratório e clínica, capitaneada por **Aline Souza** (gestora do laboratório).

**Este é um diretório de consultoria, não uma base de código** — contém documentação estratégica, perfis de stakeholders, sessões de diagnóstico, briefings operacionais e propostas de advisory.

**Status atual (07/06/2026):** ✅ **Advisory CONTRATADO** — contrato iniciado 01/05/2026. Execução plena em andamento. Funil 1 anti-noshow com JSONs prontos em `../processo-comercial-7dias/02-cadencias/` (aguardando implantação). Funções da equipe lab formalizadas em 29/05: Débora=agenda, Ilana=lab, Aline=relacionamento médico.

> **Ao abrir esta pasta:** Verifique se existem `sessao-acompanhamento-aline-30-04-2026.md` e `sessao-acompanhamento-aline-01-05-2026.md` — esses registros do piloto/go-no-go são críticos para entender o estado atual antes de agir.

---

## Objetivo do subprojeto

Transformar a conversão do laboratório de **32% → 70%** através de:
1. Estrutura de comissionamento (prova: 37% em fevereiro com meta)
2. Script padronizado de abordagem ativa
3. Desenvolvimento de Ilana como líder de recepção (liberando Aline para vendas)
4. Dashboard de acompanhamento + cadência n8n

**ROI estimado:** +R$27k/mês de receita adicional no laboratório (break-even em 2 meses).

---

## Mapa dos documentos

### 📋 Documentos de Fundação (Diagnóstico & Proposta)

| Arquivo | Propósito | Status |
|---|---|---|
| `perfil-aline-souza.md` | Perfil comportamental da gestora. Superpoderes, demandas, âncora motivacional (buffet) | ✅ Fonte de verdade |
| `sessao-diagnostico-aline-23-04-2026.md` | Entrevista de diagnóstico (23/04). Dados brutos: conversão 32%, prova 37% com comissão | ✅ Histórico |
| `proposta-advisory-frente-laboratorio.md` | Argumento de fechamento: ROI das duas frentes, investimento, payback | ✅ Histórico |

### 📆 Documentos de Execução (Gerados em 29/04)

| Arquivo | Propósito | Status |
|---|---|---|
| `briefing-madip-aline-29-04-2026.md` | Briefing executivo: papel Aline no MADIP, scripts 3-fases, cadência 7-toques, dashboard, comissão | ✅ Referência principal |
| `cartao-scripts-consulta-aline.md` | Cartão físico com 3 scripts prontos (abordagem, objeção, fechamento) — imprimir e usar | ✅ Em uso |
| `1-PAGINA-resumo-visual-aline.md` | Resumo 1-página: cronograma, scripts, metas, comissão para comunicação rápida | ✅ Referência |

### 📊 Documentos de Acompanhamento Diário

Use padrão `sessao-acompanhamento-aline-DD-MM-AAAA.md`. Arquivos esperados (verificar se existem):

| Arquivo esperado | Evento | Existe? |
|---|---|---|
| `sessao-acompanhamento-aline-30-04-2026.md` | Piloto dia 1 — métricas e bloqueadores | ❓ Verificar |
| `sessao-acompanhamento-aline-01-05-2026.md` | Go/No-Go + lançamento oficial | ❓ Verificar |
| `sessao-acompanhamento-aline-02-05-2026.md` | Execução plena — dia atual | ⬜ Criar se necessário |

Conteúdo de cada sessão:
- Dashboard diário (conversão %, senhas agendadas, receita)
- Bloqueadores identificados + ações corretivas
- Feedback de Aline ou Ilana
- Decisões ou ajustes operacionais

---

## Contexto integrado

Este subprojeto é **parte do Advisory SST maior** que inclui duas frentes:

| Frente | Responsável | ROI | Status |
|---|---|---|---|
| SST Card | Karine + Raquel | +R$15k/mês (reativação Tenex, Bairro da Paz) | 🟢 Em execução (contrato 01/05) |
| **Laboratório** | **Aline** | **+R$27k/mês (conversão 32% → 70%)** | 🟢 Piloto concluído — execução plena 01/05+ |

**Decisão de Advisory:** ✅ **JÁ TOMADA (29/04/2026)** — Rogério aprovou as duas frentes. Início de contrato: 01/05/2026.

Leia [[perfil-rogerio-diretor]] e [[contexto_projeto]] no diretório pai para entender dinâmica com sponsor.

---

## Convenções de documentação

**Frontmatter obrigatório:**
```yaml
---
title: Título do Documento
tags: [sst, laboratorio, tag-contexto, #status-tag]
aliases: [nomes alternativos]
related: [[arquivo-relacionado]]
criado: YYYY-MM-DD
atualizado: YYYY-MM-DD
---
```

**Padrão de estrutura interna:**
1. Resumo executivo (leitura em 60s)
2. Tabelas para dados estruturados (lado a lado com Obsidian)
3. Evidências e protos de conceito
4. Próximas ações ou perguntas em aberto
5. Links bidirecionais com wiki-links `[[arquivo]]`

**Idioma:** Português exclusivamente (vide CLAUDE.md no nível superior).

**Padrão de arquivo de acompanhamento diário:**
Usar `sessao-acompanhamento-aline-DD-MM-AAAA.md` para documentar:
```markdown
## Métricas do Dia

| Métrica | Valor | Meta | Status |
|---|---|---|---|
| Conversão | X% | 70% | 🟢/🟡/🔴 |
| Senhas agendadas | N | 12+ | 🟢/🟡/🔴 |
| Receita estimada | R$Y | — | — |

## Bloqueadores / Ajustes

- [ ] Bloqueador 1 — Ação corretiva
- [ ] Bloqueador 2 — Responsável + prazo

## Feedback de Aline / Ilana

- Observação 1
- Observação 2

## Decisão / Escalação

- [ ] Precisa comunicar Rogério?
- [ ] Ajuste operacional necessário?
```

---

## Dados-chave a manter

**Indicadores do laboratório:**
- Conversão atual: **32%** (verificado 23/04/2026)
- Meta Aline: **70–80%** em 6 meses
- Senhas/dia sem foco: 4–5
- Senhas/dia com foco: 12+ (prova: 23/04/2026)
- Receita mensal lab: ~R$75k
- Ganho potencial: +R$27k/mês (conversão 70%)

**Prova de conceito:**
- Jan/Fev 2026: Rogério implementou comissão → resultado 37% em 1 mês
- 1,5 ano anterior: nunca ultrapassou 33% sem comissão

---

## Estado Atual e Próximos Passos (07/06/2026)

**Fase concluída (29/04–01/05):**
- ✅ Reunião Aline + Mayko (29/04) — scripts e dashboard alinhados
- ✅ Treinamento Ilana no Script 1 (29/04)
- ✅ Piloto 30/04 executado — ver `sessao-acompanhamento-aline-30-04-2026.md`
- ✅ Go/No-Go 01/05 — Advisory aprovado para execução plena

**Fase concluída (maio–jun):**
- ✅ Reunião diagnóstico 15/05 — Aline alavanca (+20,53pp S1→S2), Débora bloqueador crítico
- ✅ Funil 1 anti-noshow (Typebot + n8n) — JSONs prontos em `../processo-comercial-7dias/02-cadencias/`
- ✅ Funções formalizadas em 29/05: Débora=agenda, Ilana=lab, Aline=relacionamento médico
- ✅ Grande Automação MADIP — 9 automações mapeadas (05/06), A4/A5 cobrem anti-noshow

**Últimos dados de conversão (27/05):**
| Atendente | Conversão | Status |
|---|---|---|
| Atendente anônima | 38,43% | 🟢 Identificar e replicar |
| Aline | 12,72% | 🟡 Abaixo do padrão |
| Débora | 0% | 🔴 CRÍTICO — linha vermelha |
| **Total** | ~18% | 🔴 Meta: 40% |

**Fase atual (jun/2026):**
- [ ] Implantar Funil 1 anti-noshow (JSONs em `02-cadencias/` — usar `guia-implantacao-automacoes.html`)
- [ ] Acompanhar resultado Débora — GO/NO-GO: ≥20% mantém, <10% por 3 dias → reallocation
- [ ] Identificar atendente anônima 38% e replicar comportamento para equipe
- [ ] Reunião com Ronivaldo para formalizar funções (Rogério solicitou após áudio 29/05)
- [ ] Acompanhar conversão diária (meta: 40% jun → 60% jul → 70% ago)

---

## Matriz de Escalação

Decida quando enviar info para Rogério vs. Aline vs. manter localmente:

| Situação | Escalar para | Formato | Urgência |
|---|---|---|---|
| Conversão semanal acima de 60% | **Rogério** + Aline | WhatsApp + número | 🟢 Rotina semanal |
| Bloqueador técnico (n8n parou, TI não responde) | **Rogério** + Aline | Chat + escalação | 🔴 Imediato |
| Feedback de Aline sobre script (ajuste textual) | Aline | Chat / Reunião | 🟡 Próximas 24h |
| Métricas diárias (conversão, senhas) | — | `sessao-acompanhamento-*` local | 🟢 Documentar |
| Conversão cair abaixo de 32% por 3 dias seguidos | **Rogério** + Aline | Reunião 30 min | 🔴 Diagnóstico urgente |
| Ilana precisar de re-treino | Aline | Chat/call 15 min | 🟡 Próximas 24h |
| Decisão sobre comissão ou contratação de recepcionista | **Rogério** | Reunião estruturada | 🟠 Decisão crítica |

---

## Integração com sistemas externos

| Sistema | Uso | Onde registrar |
|---|---|---|
| **Notion** | Pipeline de advisory, métricas de Rogério | Links nos documentos de contexto |
| **Google Meet** | Sessões de entrevista/diagnóstico, reuniões operacionais | Mencionar em `sessao-*` |
| **WhatsApp Business** | Comunicação com Aline, Rogério (escalações críticas) | Referências em próximas ações |
| **n8n** | Automação de follow-up (D+1, D+3, D+7) | Configurado por TI, documentar em [[02-cadencias/]] |

---

## Regras de modificação de arquivo

Antes de editar ou criar um documento neste diretório:

1. **Leia estado atual** — `briefing-madip-aline-29-04-2026.md` contém decisões mais recentes
2. **Não sobrescreva fonte de verdade** — dados de 23/04 ou 29/04 são históricos; apenas aumente com novos dados
3. **Formatar novos dados como tabelas** — facilita comparação lado a lado no Obsidian
4. **Atualizar frontmatter `related:`** — se criar novo doc, linque para documentos relacionados
5. **Registrar escalações** — se comunicar com Rogério, documentar a decisão no histórico (sessão-acompanhamento-*) para audit
6. **Sincronizar com Notion** — após criar um doc importante (briefing, proposta, etc.), adicionar link/sumário na página SST no Notion

---

## Leitura recomendada (ordem)

### Para entender o projeto (primeira vez):
1. **Desta pasta:**
   - `perfil-aline-souza.md` — quem é Aline
   - `sessao-diagnostico-aline-23-04-2026.md` — diagnóstico bruto
   - `proposta-advisory-frente-laboratorio.md` — business case

2. **Do diretório pai:**
   - `RETOMADA.md` — status atual de todas as frentes (LEIA PRIMEIRO)
   - `perfil-rogerio-diretor.md` — dinâmica com sponsor
   - `CLAUDE.md` — contexto SST Card + laboratório

### Para execução diária (01/05 em diante):
1. **Desta pasta:**
   - `briefing-madip-aline-29-04-2026.md` — guia de execução (scripts, dashboard, comissão)
   - `cartao-scripts-consulta-aline.md` — referência rápida de scripts
   - `1-PAGINA-resumo-visual-aline.md` — resumo gráfico

2. **Dashboard diário:**
   - Criar `sessao-acompanhamento-aline-DD-MM-AAAA.md` cada dia (padrão de template acima)
   - Registrar métricas, bloqueadores, feedback

### Documentação global:
- `consultoria-comercial/CLAUDE.md` — regras linguísticas e convenções globais

---

## Métricas e KPIs a Acompanhar

**Dashboard diário esperado (template em `sessao-acompanhamento-*`):**

| Métrica | Baseline | Mês 1 (Mai) | Mês 2 (Jun) | Mês 3 (Jul) |
|---|---|---|---|---|
| Conversão (%) | 32% | 50% | 60% | 70% |
| Senhas agendadas/dia | 4–5 | 10+ | 12+ | 15+ |
| Receita incremental | — | +R$9k/mês | +R$18k/mês | +R$27k/mês |

**Bloqueadores comuns a monitorar:**
- [ ] Ilana não conseguiu usar script (treino insuficiente?)
- [ ] n8n não está enviando follow-ups (TI bloqueio?)
- [ ] Aline em overload (delegação para Ilana não funcionou?)
- [ ] Pacientes recusando (objeção não mapeada?)

---

Última atualização: 07/06/2026
