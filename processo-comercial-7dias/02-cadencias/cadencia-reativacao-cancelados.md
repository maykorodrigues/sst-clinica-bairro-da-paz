---
aliases: [Cadência Reativação Cancelados SST]
tags: [sst, cadencia, reativacao]
---

# 02 — Cadência de Reativação de Membros Cancelados
**Responsável:** Karine (manual) + n8n (semi-automático) | **Janela:** 90 dias pós-cancelamento

## Como usar em 60 segundos
Separe os cancelados por segmento (A, B ou C) antes de começar. Cada segmento tem um ângulo diferente. A cadência dura 7 dias. Depois de D+5 sem resposta, mover para lista de leads frios — não insistir.

---

## Pré-requisito: segmentação dos cancelados

Karine abre o Sheets aba "Cancelados" e preenche:

| Coluna | Como preencher |
|---|---|
| `motivo_cancelamento` | preco / falta_uso / sem_motivo / insatisfacao |
| `segmento_reativacao` | A / B / C |
| `data_cancelamento` | data exata |
| `valor_devia` | se saiu devendo, o valor |
| `ultima_interacao` | última vez que a clínica falou com ele |

**Regra de segmentação:**
- Cancelou mencionando preço → Segmento A
- Cancelou sem usar muito → Segmento B
- Cancelou sem explicar → Segmento C
- Cancelou por insatisfação → escalar para Rogério antes de contatar

---

## Sequência de 7 dias (visão geral)

| Dia | Ação | Canal | Script |
|---|---|---|---|
| D+0 | 1ª mensagem por segmento | WhatsApp | script-reativacao-cancelados.md |
| D+2 | Follow-up (ângulo diferente) | WhatsApp | Mensagem 2 do segmento |
| D+3 | Karine liga para quem viu mas não respondeu | Ligação | Adaptar abertura do script |
| D+5 | Última tentativa por WhatsApp | WhatsApp | Mensagem 3 do segmento |
| D+7 | Mover para lista fria OU marcar como reativado | Sheets | — |

---

## Execução manual (Karine, sem automação)

**Pela manhã (9h–10h):**
1. Abrir Sheets aba "Cancelados"
2. Filtrar pela coluna "fase_reativacao" = vazio (não contactados ainda)
3. Mandar mensagens D+0 para até 10 cancelados por dia
4. Marcar `D0_enviado` na coluna após cada envio

**Após resposta:**
- Se interessado → mover para aba "Pipeline Reativação" + agendar call
- Se não voltará → marcar `nao_retorna` e não contatar mais
- Se quiser negociar → Karine aciona script de renegociação (Segmento A)

---

## Execução semi-automática (n8n)

**Trigger:** Manual (Karine aciona no início de cada rodada)
**Ação:**
1. Ler aba "Cancelados" filtrando por segmento e fase
2. Enviar D+0 via Evolution API para o lote do dia (máximo 30/dia)
3. Registrar no Notion que o contato foi feito
4. Em D+2: verificar se respondeu → se não, dispara mensagem 2

**Importante:** D+3 (ligação) sempre manual — não automatizar ligações.

---

## Meta de reativação

| Segmento | Taxa esperada de retorno | Meta de reativações |
|---|---|---|
| A (preço) | 15–20% | 5–7 |
| B (falta de uso) | 10–15% | 4–6 |
| C (sem motivo) | 20–25% | 8–10 |
| **Total** | ~17% média | **20 reativações** |

**Cálculo:** Para 20 reativações com 17% de taxa, é necessário contatar ≈ 120 cancelados
