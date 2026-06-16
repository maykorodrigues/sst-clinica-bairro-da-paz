---
title: Campanha Perdão de Dívida — Plano de Arrecadação 2ª Quinzena Junho/2026
tags: [sst, cobranca, perdao-divida, campanha, automacao, #em-progresso]
aliases: [Plano 20k quinzena, Estratégia cobrança junho]
related: [[RETOMADA]], [[05-agentamento-karine-ia/03-workflow-n8n-cobranca]], [[01-scripts/script-cobranca-mensalidade]]
criado: 2026-06-16
atualizado: 2026-06-16
meta_arrecadacao: 20000
prazo: 30/06/2026
---

# 🎯 Campanha Perdão de Dívida — Meta R$ 20k na 2ª Quinzena de Junho

> **Resumo em 60s:** Rogério (15/06, áudio) pede estratégia: recebeu só **R$ 2.600** da campanha, meta mínima **R$ 20.000** (cobre a despesa do mês), ideal **R$ 40.000** (dobrar). O print do Asaas mostra **R$ 9.749 já emitidos e não pagos** (226 boletos aguardando + 32 vencidas) — esse é o combustível mais quente. Somado à base **Tenex (761 inadimplentes)** com oferta de quitação à vista, é possível fechar os R$ 20k até 30/06 com execução agressiva em 4 frentes.

---

## 1. O que o Rogério disse (áudio 15/06 10h01)

| Ponto | Conteúdo |
|---|---|
| Recebido até agora | **R$ 2.600** (da campanha) |
| Meta mínima | **R$ 20.000** — "pelo menos pagar a despesa do mês" |
| Meta esticada | **R$ 40.000** — "para dobrar" |
| Diagnóstico dele | "Está longe" — pede estratégia clara |
| Postura | Quer **participar mais ativamente** com Mayko, mesmo focado no Bairro da Paz |
| Frase-chave | *"Não pode sair de nada aqui, porque é aqui que vai ser o chamado para a gente entender isso"* → Simões Filho é o laboratório de validação antes de escalar para BP |

## 2. O que o print do Asaas mostra ("Este mês")

| Status | Valor bruto | Líquido | Clientes | Cobranças |
|---|---|---|---|---|
| 🟢 **Recebidas** | R$ 17.660,37 | R$ 17.525,94 | 64 | 73 |
| 🔵 **Confirmadas** (liquidando) | R$ 2.069,70 | R$ 1.977,22 | 55 | 63 |
| 🟠 **Aguardando pagamento** | **R$ 8.532,70** | R$ 8.121,14 | 226 | **226** |
| 🔴 **Vencidas** | **R$ 1.217,00** | R$ 1.156,67 | 31 | **32** |
| **TOTAL potencial mês** | **R$ 29.479,77** | — | — | — |

### ✅ Leitura confirmada (Mayko, 16/06): R$ 2.600 = 2ª QUINZENA
- A **1ª quinzena** já trouxe ~**R$ 15k** (mensalidades recorrentes, vencimentos dia 5/10 → cor verde "Recebidas" R$ 17.660 do mês).
- A **2ª quinzena** (16–30/06) começou em **R$ 2.600**. Meta da quinzena = **R$ 20.000**.
- **GAP REAL a arrecadar até 30/06 = R$ 20.000 − R$ 2.600 = `R$ 17.400`** (meta esticada R$ 40k → gap R$ 37.400).

> Os R$ 8.532 aguardando + R$ 1.217 vencidas **vencem dentro desta quinzena** → convertê-los conta direto para o gap. É o caminho mais curto.

## 3. O combustível para os R$ 20k (de onde sai o dinheiro)

| Fonte | Valor disponível | Conversão realista | Caixa estimado | Como atacar |
|---|---|---|---|---|
| **A. Boletos aguardando** (226) | R$ 8.532 | 60% | **~R$ 5.100** | Lembrete ativo D+0/D+3/D+7 — boleto já existe, só falta pagar |
| **B. Vencidas recentes** (32) | R$ 1.217 | 55% | **~R$ 670** | Cobrança ativa Karine + 2ª via |
| **C. Confirmadas** (liquidando) | R$ 2.069 | 100% | **~R$ 2.069** | Já entra — só aguardar compensação |
| **D. Base Tenex legado** (761) | alto (5+ parc) | 8% de 400 disparos | **~R$ 8.000** | Perdão 50% **à vista** → caixa imediato |
| **E. Novas adesões** (Karine) | — | ~17 contratos | **~R$ 2.000** | Adesão R$35 + 1ª mensalidade |
| **TOTAL REALISTA** | | | **~R$ 17.800–20.000** | |

> **Insight central:** o maior gerador de caixa imediato é a **frente D (Tenex à vista)** + a **frente A (226 boletos parados)**. As duas juntas valem ~R$ 13k em caixa novo. É aí que a energia da quinzena tem que ir.

---

## 4. PLANO DE IMPLEMENTAÇÃO — 4 Frentes

### Frente 1 — Marketing/Comunicação + Disparos de Cobrança
**Objetivo:** colocar a oferta de perdão na frente de 400+ inadimplentes na quinzena.

| Ação | Ferramenta | Status | Prazo |
|---|---|---|---|
| Exportar base Tenex 761 + os 226 aguardando do Asaas (CSV: nome, WhatsApp, valor, parcelas) | Asaas + Tenex | ⏳ Rogério/Lucas | 17/06 |
| Validar CSV antes de importar | `scripts/validar_csv.py` | ✅ pronto | 17/06 |
| Importar no Notion CRM cobrança (campo Origem = "Tenex 5+ parc" / "Asaas aguardando") | `gerar_notas_md.py` / Notion | ⏳ | 17/06 |
| Ativar Workflow 1 — Disparo Perdão Dívida (50–150/dia) | `05-agentamento-karine-ia/03-workflow-n8n-cobranca.md` (JSON pronto) | ⏳ importar | 18/06 |
| Cadência de cobrança D+0/D+3/D+7 já redigida (3 toques) | `01-scripts/script-cobranca-mensalidade.md` | ✅ pronto | — |
| Criativo único da campanha ("Quite com 50% à vista até 30/06") | Raquel/Canva | ⏳ | 17/06 |

**Oferta da campanha (decisão Rogério):** quitação à vista com **50% de desconto** OU migração para plano ativo (R$39,90) zerando o passado. À vista = caixa imediato (prioridade para a meta de quinzena).

### Frente 2 — SDR / Qualificadora de Cobrança
**Objetivo:** filtrar quem respondeu e separar "quer pagar à vista" de "quer renegociar" antes de cair na mão da Karine.

| Ação | Ferramenta | Status |
|---|---|---|
| Webhook Chatwoot → classifica resposta (Positivo / Negocia / Recusa) | Workflow 2 (JSON pronto) | ⏳ importar |
| Typebot de quitação: identifica por CPF → busca dívida no Asaas → oferta 50% → gera 2ª via Pix na hora | `02-cadencias/typebot-quitacao-perdao-divida.json` | ✅ pronto — importar + trocar SEU_N8N_URL |
| Webhook 1 — busca dívida no Asaas por CPF (responde valor + 50%) | `02-cadencias/n8n-asaas-quitacao-buscar.json` | ✅ pronto — importar + env ASAAS_* |
| Webhook 2 — gera 2ª via Pix no Asaas (cobrança com desconto + QR copia-e-cola) | `02-cadencias/n8n-asaas-quitacao-gerar-2via.json` | ✅ pronto — importar + env ASAAS_* |
| Webhook 3 — registra evento no Notion + notifica Karine só nos quentes | `02-cadencias/n8n-asaas-quitacao-evento.json` | ✅ pronto — importar + env NOTION/EVOLUTION/KARINE_WHATSAPP |
| Notificar Karine no Telegram só nos "quentes" (quer pagar) | Workflow 2 nó Telegram | ⏳ |
| Follow-up D+3/D+5/D+7 automático para quem não respondeu | Workflow 3 (JSON pronto) | ⏳ importar |

> Regra: a IA qualifica e gera o boleto/2ª via; **Karine só toca o que está quente**. Isso multiplica a capacidade dela sem aumentar carga.

### Frente 3 — CRM / Closer (Karine)
**Objetivo:** Karine fecha os qualificados e mantém o pipeline limpo. Ela é o gargalo — proteger o tempo dela.

| Métrica diária Karine (2ª quinzena) | Meta/dia |
|---|---|
| Contatos quentes trabalhados (vindos do SDR IA) | 15 |
| Quitações à vista fechadas | ≥ 4 |
| Renegociações fechadas | ≥ 3 |
| Novas adesões | ≥ 2 |

- Dashboard de cobrança da Karine: `05-agentamento-karine-ia/05-dashboard-metricas-karine.md`
- Pipeline no Notion CRM (status: Para Contatar → Enviado → Respondeu → Em Negociação → **Recuperado** → Recusou/Sem Resposta).
- **Âncora motivacional Karine:** isso é o treino do sistema que ela vai levar pro buffet dela — vender bem o método, não só cobrar.

### Frente 4 — Plataforma Marcos (CFO Autônomo)
**Objetivo:** dar ao Rogério visibilidade de caixa em tempo real (ele pediu "participar mais") e fechar o loop de conciliação.

| Ação | Status | Prazo (RETOMADA) |
|---|---|---|
| Finalizar agente IA CFO "Marcos" (integração Conta Azul/Bling **+ Asaas**) | 🔄 em desenvolvimento Mayko | **30/06** |
| Conectar Asaas → Marcos puxa "Recebidas/Aguardando/Vencidas" automaticamente | ⏳ | 30/06 |
| Relatório diário de caixa no WhatsApp do Rogério (entrou hoje X, falta Y para os R$ 20k) | ⏳ | a partir de 20/06 |
| Skill de instalação disponível | `/cfo-autonomo-openclaw` | ✅ |

> Marcos resolve a dor do áudio: hoje o Rogério não enxerga o caixa em tempo real (R$ 2.600 vs R$ 17.660). Com Marcos, ele recebe todo dia 18h: *"Quinzena: R$ X arrecadado · faltam R$ Y para a meta · Z boletos aguardando."*

---

## 5. Cronograma da quinzena (16–30/06)

| Data | Marco |
|---|---|
| **16/06 (hoje)** | Apresentar este plano ao Rogério + confirmar oferta (50% à vista) + confirmar discrepância R$2.600 vs R$17.660 |
| **17/06** | Exportar bases (Tenex + Asaas) · validar CSV · importar Notion · criar criativo |
| **18/06** | Importar 3 workflows n8n · teste com 10 contatos · primeiro disparo (50) |
| **19–27/06** | Disparo escalonado 100–150/dia · SDR IA qualifica · Karine fecha quentes · acompanhamento diário |
| **20/06** | Marcos começa a enviar caixa diário ao Rogério |
| **30/06** | Fechamento da quinzena · RMAR parcial · GO/NO-GO sobre escalar modelo para BP |

## 6. Checklist binário (pré-disparo)
- [ ] Oferta aprovada por Rogério (50% à vista / migração plano)
- [ ] Base Tenex 761 + 226 Asaas exportadas em CSV
- [ ] CSV validado (`validar_csv.py`)
- [ ] Notion CRM cobrança populado
- [ ] 3 workflows n8n importados e credenciais validadas (Chatwoot/Notion/Claude/Evolution)
- [ ] Teste com 10 contatos OK
- [ ] Karine briefada no novo fluxo (só toca quentes)
- [ ] Marcos conectado ao Asaas

## 7. Riscos e contingências
| Risco | Mitigação |
|---|---|
| Rogério travado no BP, sem aprovar oferta | Mandar áudio curto hoje pedindo só 1 decisão: "50% à vista, pode?" |
| Base sem WhatsApp limpo | Fallback: Karine trabalha os 226 do Asaas (já têm contato) primeiro |
| Disparo em massa derruba número (Evolution) | Aquecer: 50 → 100 → 150/dia, nunca tudo de uma vez |
| R$ 20k não fechar | Frente D (Tenex à vista) é o lever — se travar, dobrar volume de disparo nela |

---

Voltar para [[RETOMADA]] · [[CLAUDE]]
