---
title: Importacao de 22 Clientes Cancelados - CHURN RATE
date: 2026-05-12
tags: [sst, importacao, notion, churn-rate, #concluido]
related: [[RETOMADA.md]]
---

# Importacao CHURN RATE.xlsx - 22 Clientes Cancelados

**Data de Execucao:** 12/05/2026 10:37
**Status:** CONCLUIDO COM SUCESSO

## Resumo Executivo

- **Arquivo:** CHURN RATE.xlsx (Downloads)
- **Total de registros lidos:** 27
- **Registros validos importados:** 22 (81,5%)
- **Registros rejeitados:** 5 (celular vazio)
- **Database Notion:** Master - Clientes SST (7ece4048-33c8-48a3-aa70-349bb67a5a17)
- **Todas as 22 paginas criadas com sucesso**

## Criterios de Validacao

Cada registro foi validado para atender aos requisitos de reativacao via WhatsApp:

✅ **CPF válido** (11 dígitos numéricos)
✅ **Celular preenchido e valido** (mínimo 10 dígitos - OBRIGATORIO)
✅ **Nome não-vazio**
✅ **Data cancelamento válida**

## Registros Rejeitados (5 clientes)

Rejeitados por celular vazio (impossível contato via WhatsApp):

| ID | Nome | Motivo |
|---|---|---|
| 13 | MARIA JOSÉ SANTANA DE LIMA | Celular vazio |
| 14 | LIDIANE CUNHA DOS SANTOS | Celular vazio |
| 22 | CLEMENS FRANCA DOS SANTOS | Celular vazio |
| 25 | VANDA DE OLIVEIRA MACEDO | Celular vazio |
| 26 | CLEONICE NASCIMENTO DE OLIVEIRA | Celular vazio |

**Recomendacao:** Buscar números de telefone alternativos para esses 5 clientes antes de reativação.

## Amostra dos Primeiros 5 Registros Importados

| # | Nome | Celular | Email | Bairro | Cidade | Data Cancelamento |
|---|---|---|---|---|---|---|
| 1 | cancelado - SALOMAO SOUZA DO ROSARIO | (71)98409-4744 | ssouzadorosario@gmail.com | Cristo Rei | Simões Filho | 2026-03-17 |
| 2 | CANCELADA - SELMA NASCIMENTO DA ANUNCIACAO | (71)99959-1652 | selmanasc06@gmail.com | KM 30 | Simões Filho | 2026-04-09 |
| 3 | CANCELADA - LUCIANE DE JESUS CARVALHO | (71)98519-0226 | carvalholucy161@gmail.com | Recanto dos Eucaliptos | Simões Filho | 2026-04-16 |
| 4 | Cancelado - GRIMALDO TELES DOS SANTOS | (71)99187-3748 | g.ts.fox@hotmail.com | Engenho Novo | Simões Filho | 2026-04-30 |
| 5 | CANCELADA - EDIRALVA SILVA SANTOS | (71)98668-0932 | Jcai6352@gmail.com | Coroa da Lagoa | Simões Filho | 2026-04-30 |

## Mapeamento Notion

Os campos foram importados conforme especificado:

| Campo Excel | Campo Notion | Tipo |
|---|---|---|
| nome | Nome | Título |
| cpf | CPF | Auto-increment (gerado auto) |
| celular | Celular | Telefone |
| email | Email | Email |
| bairro | Bairro | Texto |
| cidade | Cidade | Texto |
| deletedAt | Data Cancelamento | Data |
| dataAtivacao | Data Ativacao | Data (optional) |
| idStatus | Status | "Cancelado" |
| origem | Origem | "Tenex" |

## Proximos Passos

1. **Verificar dados no Notion:** Database Master - Clientes SST
2. **Segmentar por bairro:** Maioria em Simões Filho + Salvador (pequena amostra)
3. **Preparar cadencia de reativacao:** Via WhatsApp (n8n workflow)
4. **Definir prioridades:** 5 sem celular (buscar alternativas) vs 22 com celular pronto

---

Voltar para [[RETOMADA.md]]
