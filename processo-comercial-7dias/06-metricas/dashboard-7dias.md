---
aliases: [Dashboard SST 7 Dias]
tags: [sst, metricas, em-progresso]
---

# 06 — Dashboard 7 Dias — SST Clínica

## Como usar em 60 segundos
Esse é o único painel que importa. Karine preenche pelo celular. Rogério lê pelo celular. Mayko ajusta pelo celular. Sem planilha complexa — só essa tabela.

---

## Painel principal (atualizar diariamente)

| Indicador | Onde registrar | Quem registra | Frequência | Meta 7 dias | Hoje |
|---|---|---|---|---|---|
| Novas adesões SST Card | Google Sheets aba "Adesões" | Karine | Diário (17h) | 30 | — |
| Taxa conversão lab | Google Sheets aba "Lab" | Karine | Por turno (12h e 17h) | 60% | — |
| Inadimplentes contatados | Google Sheets aba "Cobranças" | Karine | Diário (17h) | 100% da lista | — |
| Inadimplentes reativados | Google Sheets aba "Cobranças" | Karine | Diário (17h) | 20 | — |
| Posts publicados | Notion > SST > Conteúdo | Raquel | Semanal (sex) | 7 posts | — |
| Leads capturados (digital) | Google Sheets aba "Leads" | Raquel | Diário (17h) | 70 total | — |
| Cobranças D+3 disparadas | n8n log ou Notion | Automação | Automático | 100% dos elegíveis | — |
| Cobranças D+7 disparadas | n8n log ou Notion | Automação | Automático | 100% dos elegíveis | — |
| Cobranças D+15 disparadas | n8n log ou Notion | Automação | Automático | 100% dos elegíveis | — |

---

## Como Karine registra pelo celular (passo a passo)

**Adesões — 30 segundos:**
1. Abrir Google Sheets (aba "Adesões")
2. Nova linha: nome do membro + data + forma de pagamento + origem (lab / campo / WhatsApp)
3. A coluna "Total" já soma automaticamente

**Conversão lab — 1 minuto por turno:**
1. Abrir Google Sheets (aba "Lab")
2. Marcar `A` em cada paciente abordado
3. Marcar `C` em cada paciente que virou membro
4. Taxa calcula sozinha (C ÷ A × 100)

**Cobrança — 30 segundos:**
1. Abrir aba "Cobranças"
2. Quando ligar ou mandar mensagem: marcar `C` na coluna "Contato feito"
3. Quando pagar: marcar `P` na coluna "Pagamento"

---

## Como Raquel registra pelo celular

**Posts — 1 minuto:**
1. Notion > SST Card > Conteúdo > nova linha
2. Preencher: data, formato (reels/story/feed), link do post, status (publicado/agendado)

**Leads capturados:**
1. Quando alguém manda mensagem pedindo info do SST Card
2. Adicionar no Sheets aba "Leads": nome + WhatsApp + origem (Instagram/indicação/campo)

---

## Coluna de status da planilha de cobranças

| Coluna | O que significa |
|---|---|
| `status_pagamento` | `em_dia` / `vencido` / `pago` / `renegociado` |
| `data_vencimento` | Data que a mensalidade venceu |
| `data_ultimo_contato` | Última vez que Karine falou com esse membro |
| `fase_cobranca` | `D3` / `D7` / `D15` / `encerrado` |
| `canal_contato` | `whatsapp` / `ligacao` / `presencial` |

---

## Semáforo semanal — para Rogério ler às 18h de sexta

```
🟢 Verde = negócio crescendo
🟡 Amarelo = ajuste necessário
🔴 Vermelho = reunião de emergência com Mayko
```

**Gatilho verde:** 25+ adesões na semana + taxa lab ≥ 50%
**Gatilho amarelo:** 15–24 adesões ou taxa lab 40–49%
**Gatilho vermelho:** < 15 adesões ou taxa lab < 40% ou 0 reativações
