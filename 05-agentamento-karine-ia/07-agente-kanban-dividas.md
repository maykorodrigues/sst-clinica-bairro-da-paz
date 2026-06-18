---
title: Agente IA — Kanban de Dívidas (Perdão de Dívida)
tags: [sst, karine, agentamento, ia, kanban, perdao-divida, n8n, #em-progresso]
aliases: [agente kanban dividas, cambã de dívidas, agente matinal cobrança]
related: [[README]], [[06-integracoes-chatwoot-notion]], [[../processo-comercial-7dias/campanha-perdao-divida-2quinzena-junho-2026]], [[../processo-comercial-7dias/01-matinais/18-06-2026/ata-matinal-18-06-2026]]
criado: 2026-06-18
atualizado: 2026-06-18
workflow_n8n: ../processo-comercial-7dias/02-cadencias/n8n-agente-kanban-dividas.json
---

# 🤖 Agente IA — Kanban de Dívidas

> **O que é:** o agente matinal pedido na matinal de 18/06. Roda todo dia de manhã, lê o kanban de cobrança no Notion, **detecta cards parados, gera a mensagem de abordagem, sugere a oferta certa por faixa de dívida, move os cards e entrega o resumo do dia** para a equipe. É o cérebro que faz a [[../processo-comercial-7dias/maquina-cobranca-perdao-divida|máquina Karine→Lucas→Raquel]] andar sozinha.

> Complementa — **não substitui** — o webhook em tempo real de [[06-integracoes-chatwoot-notion]]. O webhook reage quando o cliente responde; **este agente é proativo de manhã**, varrendo a base inteira e dando um próximo passo a cada nome.

---

## 1. Onde se encaixa na máquina

```
DISPARO  ──▶  [Kanban de Dívidas no Notion]  ◀── webhook Chatwoot (tempo real)
                          │
                  🤖 Agente matinal (cron 07h30)
                          │
   ┌──────────────────────┼───────────────────────┐
 detecta parados     gera abordagem          move cards +
 (sem resposta /     + sugere oferta          resumo do dia
  negociação fria)    por faixa de dívida      pro grupo
        │                   │                      │
   Raquel/Karine       Karine envia          Mayko/Rogério leem
   re-tocam            (1 clique)            o caixa do dia
```

O agente **não envia mensagem sozinho** (decisão de governança): ele **prepara** a mensagem e move o card. Quem aperta "enviar" é a Karine/Lucas/Raquel — mantém o humano no controle e respeita a régua de desconto.

---

## 2. Schema do Kanban (pipeline existente — ✅ provisionado via MCP em 18/06)

Pipeline base: **🎯 Pipeline Ativa — Karine | Cobranças SST Card** (`138f7d78-0ea6-423d-babc-2f5a1fe0092b` · data source `e819fdee-322b-4cd5-a9b5-208bd30f14e1`).

> ⚠️ **Use os nomes REAIS das propriedades** (abaixo) — o workflow n8n já está alinhado a eles. Não invente "Valor devido"/"Dono": a pipeline usa `Valor em Aberto` e `Responsável`.

### Status (coluna `Status`) — fluxo alinhado à máquina

| Etapa | Valor real no Notion | Dono | Significado |
|---|---|---|---|
| 1 | **Para Contatar** | Karine | Entrou na base, ainda não abordado |
| 2 | **Mensagem Enviada** | Karine | 1ª mensagem disparada |
| 3 | **Respondeu** | Karine | Cliente respondeu |
| 4 | **Em Negociação** | Karine | Conversa ativa |
| 5 | **Proposta Enviada** | Karine | Oferta + link enviados |
| 6 | **Recuperado** | Karine | **Caixa!** pagou/reativou (saída ✅) |
| — | **Sem Resposta** | Raquel | Não respondeu → enriquecer |
| 7 | **Processo de Cancelamento** 🆕 | Lucas | 3 tentativas sem evoluir → cobrança/encerramento |
| 8 | **Cancelado / Base Limpa** 🆕 | Lucas | Encerrado (saída 🧹) |
| — | Recusou · Encaminhar Serasa | — | terminais existentes |

> 🆕 = status criados em 18/06 para a lane do Lucas (os demais já existiam).

### Propriedades (nomes reais) — ✅ todas presentes

| Propriedade (real) | Tipo | Uso | Status |
|---|---|---|---|
| Nome | title | — | já existia |
| Telefone | phone_number | canal principal | já existia |
| Valor em Aberto | number | base da régua de oferta | já existia |
| Parcelas em Atraso | number | faixa de dívida | já existia |
| Origem | select | BOOM / Tenex 1-2/3-4/5+ parc / Novo Lead | já existia |
| Responsável | select | Karine / Rogério / Raquel / N8N Bot / **Lucas** 🆕 | Lucas add 18/06 |
| Status | select | ver tabela acima | 2 add 18/06 |
| Data Último Contato | date | detectar "parado" | já existia |
| Tentativas de Contato | number | conta toques (meta 7) | já existia |
| Via Pagamento | select | PIX / Cartão / Dinheiro / Não Pago (mix) | já existia |
| ID Chatwoot | text | liga ao webhook tempo real | já existia |
| Canal · Observações · Oferta Feita · Plano Atual · Próxima Ação | vários | apoio | já existia |
| **CPF** 🆕 | text | chave de enriquecimento + busca Asaas | add 18/06 |
| **E-mail** 🆕 | email | canal secundário | add 18/06 |
| **Oferta Sugerida** 🆕 | text | preenchido pelo agente | add 18/06 |
| **Mensagem Sugerida** 🆕 | text | preenchido pelo agente | add 18/06 |

---

## 3. ⚖️ Régua de oferta (RESOLVE a pendência 10% / 40% / 50%)

> **Proposta para o Rogério cravar** — hoje convivem 3 descontos soltos. A régua abaixo amarra o desconto à dívida (quanto maior a dívida, maior o desconto à vista, porque o alternativo é R$ 0). **Nada disso vai pro disparo antes do "ok" do Rogério.**

| Faixa | Parcelas em atraso | Oferta à vista | Alternativa "traz de volta" |
|---|---|---|---|
| 🟢 Leve | 1–2 | Sem desconto (ou **10%**) | Reativa pagando em dia |
| 🟡 Média | 3–5 | **40% à vista** | Reativa como assinante novo (Boom) |
| 🔴 Alta | 6+ | **50% à vista** (alçada do Lucas) | Reativa Boom + perdoa o legado Tenex |
| ⚫ Legado sem histórico | Tenex sem valor | Entra como **assinante novo Boom** | (não cobra dívida — limpa entrando) |

**Regra de governança:** desconto > 40% só com registro no card (quem autorizou). O agente **sugere** a faixa; quem aplica é a pessoa.

---

## 4. O que o agente faz toda manhã (lógica)

Cron **07h30** (antes da matinal das 08h):

1. **Lê o kanban inteiro** (todas as cards não-finalizadas: status 1 a 5 + 7).
2. **Detecta parados:**
   - `Abordagem enviada` há **> 2 dias** sem resposta → marca 🟠 *re-tocar* (Raquel enriquece se sem contato; senão Karine reenvia).
   - `Em negociação` há **> 3 dias** sem interação → sugere follow-up; se já tem 3 tentativas → propõe mover para `Processo de cancelamento` (Lucas).
   - `Proposta enviada` há **> 2 dias** sem aceite → lembrete "o link expira / a dívida cresce".
3. **Para cada card que precisa de ação:** gera a **mensagem de abordagem personalizada** (nome, valor, faixa de oferta) e grava em `Mensagem sugerida` + `Oferta sugerida`.
4. **Move os cards** conforme a regra (ex.: parado 3x → `Processo de cancelamento`).
5. **Monta o resumo matinal** e envia no grupo WhatsApp (Evolution API) + Telegram do Mayko.

O agente **não dispara** mensagem ao cliente — só prepara. Envio é 1 clique humano.

---

## 5. Formato do resumo matinal (saída do agente)

```
🏭 KANBAN DE DÍVIDAS — {{data}}

💰 Caixa de ontem: R$ {{pagou_ontem}}  ({{qtd}} recuperados)
📊 Pipeline: Triagem {{n}} · Abordagem {{n}} · Negociação {{n}} · Proposta {{n}} · Aceitou {{n}}

🎯 PRIORIDADES DE HOJE
• Karine: {{n}} em negociação parados + {{n}} propostas a cobrar
• Lucas:  {{n}} em processo de cancelamento (ligar e encerrar)
• Raquel: {{n}} em triagem p/ enriquecer (sem contato válido)

🔥 TOP 5 quentes (maior valor + mais perto do sim):
1. {{nome}} — R$ {{valor}} ({{parcelas}}p) — {{acao}}
...

⚠️ {{n}} cards parados há +3 dias → decisão: cobrar ou cancelar
```

---

## 6. Prompt do agente (node IA do n8n)

**System:**
```
Você é o Agente de Cobrança do SST Card, operando o Kanban de Dívidas da campanha
Perdão de Dívida. Seu objetivo é transformar a base inadimplente em caixa OU em base
limpa até o fim do mês, seguindo a regra do Rogério: "ou traz de volta, ou paga".

Princípios:
- Você PREPARA ações (mensagem, oferta, próximo status), você NUNCA envia nada ao cliente.
- Tom: humano, respeitoso, firme. Público C/D, baixa renda. Linguagem simples, sem juridiquês.
- Nunca prometa desconto acima da régua. Régua por parcelas em atraso:
  1-2 parcelas → sem desconto/10% | 3-5 → 40% à vista | 6+ → 50% à vista
  Legado Tenex sem histórico → oferecer entrar como assinante novo (Boom), sem cobrar dívida.
- A mensagem sempre conecta: (1) reconhecimento amigável, (2) o que ela ganha voltando,
  (3) o custo de não resolver (mensalidade segue correndo e crescendo), (4) CTA com link/horário.
- novo_status deve ser um valor EXATO da pipeline: "Mensagem Enviada", "Em Negociação",
  "Proposta Enviada", "Processo de Cancelamento" — ou manter o atual.
- Se o card já teve 3+ tentativas sem evoluir, recomende novo_status = "Processo de Cancelamento".

Responda SEMPRE em JSON:
{ "oferta_sugerida": "...", "mensagem_sugerida": "...", "novo_status": "...",
  "prioridade": "alta|media|baixa", "motivo": "..." }
```

**User (template por card):**
```
Card:
- Nome: {{nome}}
- Valor devido: R$ {{valor_devido}}
- Parcelas em atraso: {{parcelas}}
- Origem: {{origem}}
- Status atual: {{status}}
- Tentativas: {{tentativas}}
- Última interação: {{ultima_interacao}} ({{dias_parado}} dias atrás)
- Histórico: {{observacoes}}

Gere a oferta, a mensagem de WhatsApp e o próximo status.
```

---

## 7. Workflow n8n

Arquivo: `../processo-comercial-7dias/02-cadencias/n8n-agente-kanban-dividas.json`

Nós (todos com lógica em Code + HTTP Request à API do Notion — padrão robusto, evita o nó nativo quebradiço):
1. **Cron** 07h30 (seg–sáb)
2. **HTTP → Notion query** (database `138f7d78...`, filtro status ≠ Pagou/Cancelado)
3. **Code — calcula dias parados** e faixa de dívida
4. **AI Agent** (Claude `claude-opus-4-8` ou GPT) com o prompt acima, 1 chamada por card
5. **Code — parse JSON** das respostas
6. **HTTP → Notion update** (grava oferta/mensagem sugerida + move status)
7. **Code — monta resumo** matinal
8. **HTTP → Evolution API** (envia resumo no grupo) + **Telegram** (Mayko)

### Variáveis de ambiente
`NOTION_TOKEN` · `NOTION_KANBAN_DB_ID` (=`138f7d78-0ea6-423d-babc-2f5a1fe0092b`) · `ANTHROPIC_API_KEY` · `EVOLUTION_API_URL` · `EVOLUTION_API_KEY` · `EVOLUTION_INSTANCE` · `SST_CARD_GROUP_CHAT_ID` · `TELEGRAM_MAYKO_CHAT_ID`

---

## 8. Implantação (passos)

- [ ] **Rogério crava a régua de oferta** (seção 3) — pré-requisito que destrava tudo.
- [x] ~~Provisionar as propriedades na pipeline `138f7d78...`~~ — ✅ feito via MCP em 18/06 (CPF, E-mail, Oferta Sugerida, Mensagem Sugerida + Lucas em Responsável + 2 status da lane do Lucas).
- [ ] Subir as planilhas da Karine (28/04 + anotações) no kanban com `Valor em Aberto` e `Parcelas em Atraso`.
- [ ] Importar `n8n-agente-kanban-dividas.json` no n8n e configurar as env vars.
- [ ] Rodar manual 1x com 5 cards de teste → conferir oferta/mensagem/status.
- [ ] Ligar o cron 07h30 e validar o resumo no grupo.

## 9. Pendências / riscos
- **Régua de desconto:** bloqueia o go-live (precisa do Rogério).
- **Legado Tenex sem valor devido:** depende da planilha 28/04 da Karine como fonte do `Valor devido`.
- **Custo de IA:** 1 chamada por card/dia. Com ~200 cards = ~200 chamadas/dia (barato com Haiku para triagem, Opus só nos quentes — otimização futura).
- **Envio humano:** por governança o agente não dispara; se a equipe não clicar, o card não anda — o resumo matinal cobra isso.

---
*Relacionados:* [[../processo-comercial-7dias/01-matinais/18-06-2026/ata-matinal-18-06-2026|ATA 18/06]] · [[06-integracoes-chatwoot-notion]] · [[../processo-comercial-7dias/maquina-cobranca-perdao-divida|Página da Máquina]]
