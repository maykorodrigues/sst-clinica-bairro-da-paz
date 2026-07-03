---
title: SETUP — Typebots de Candidatura → Notion (n8n)
tags: [sst, rh, n8n, typebot, notion, setup]
criado: 2026-06-19
atualizado: 2026-06-19
related:
  - "[[CLAUDE]]"
  - "[[typebot-qualificacao-closer]]"
  - "[[typebot-qualificacao-junior-sst]]"
---

# SETUP — Candidaturas Typebot → Notion

Workflow único que recebe as candidaturas dos **dois** Typebots (Closer/Líder e Vendedor Júnior) e cria o card na base Notion **👥 RH — Candidatos Vendas SST Card (Sênior & Júnior)**.

- **Arquivo:** `n8n-typebot-candidaturas-notion.json`
- **Base Notion:** `8a821b22-4afb-4a42-aa7f-126b8efe7918` · data source `df0046dd-dd3c-4d37-9d37-4e6e6bb23d1d`
- **Links públicos dos formulários:**
  - Júnior: https://bot.clinicalucrativa.ia.br/qualifica-o-vendedor-j-nior-sst-card-bairro-da-paz-omamxv0
  - Sênior: _(publicar o `typebot-qualificacao-closer.json` e colar o link aqui)_

---

## Como funciona

```
Typebot Sênior  ──POST──►  /webhook/sst-closer-candidatura          ─┐
                                                                     ├─► Code normaliza ─► HTTP POST api.notion.com/v1/pages
Typebot Júnior  ──POST──►  /webhook/sst-vendedor-junior-candidatura ─┘
```

Cada webhook tem um **Code** próprio que traduz o payload do Typebot para o corpo da Notion API. Os dois convergem no mesmo nó **HTTP Request** que cria a página.

### Mapeamento para o Notion

| Propriedade Notion | Sênior | Júnior |
|---|---|---|
| Candidato (title) | `nome` | `nome` |
| Email | `email` | `email` |
| Telefone | `telefone` | `telefone` |
| Idade (number) | `idade` | `idade` |
| Bairro / Cidade | `bairro, cidade` | `bairro, cidade` |
| **Nível** | `Sênior` | `Júnior` |
| **Vaga** | `Closer / Vendedor Líder` | `Vendedor Júnior` |
| Fonte | `Typebot / formulário` | `Typebot / formulário` |
| Status | `Triagem` | `Triagem` |
| Mora no Bairro da Paz (checkbox) | bairro contém "Paz" | resposta "Bairro da Paz" ou bairro contém "Paz" |
| Experiência em vendas | `exp_tempo` (legível) | `exp_vendas` |
| Próximo passo | "contatar em até 5 dias úteis" | idem |
| **Corpo da página** | todas as respostas abertas (SUS, motivo, venda 5+, ganho, visão) | todas (SUS, motivo, convenceu alguém, ganho, sonho) |

`Score`, `Pontos fortes`, `Pontos de atenção`, `Data entrevista` e `Scoring (arquivo)` ficam **em branco** — são preenchidos na triagem/entrevista.

---

## Passo a passo de implantação

1. **Criar a credencial Notion no n8n** (uma vez):
   - n8n → Credentials → New → **Notion API** → colar o Internal Integration Token.
   - Garantir que a integração tem acesso à página/base **RH — Candidatos** (no Notion: `...` → Connections → adicionar a integração).
2. **Importar o workflow:** n8n → Import from File → `n8n-typebot-candidaturas-notion.json`.
3. **Ligar a credencial:** abrir o nó *Criar card no Notion* → selecionar a credencial Notion criada (substitui o placeholder `REPLACE_NOTION_CRED_ID`).
4. **Conferir os paths dos webhooks** (já batem com os Typebots):
   - `sst-closer-candidatura`
   - `sst-vendedor-junior-candidatura`
   - URL completa = `https://n8n.clinicalucrativa.ia.br/webhook/<path>` (produção) — confirmar que é a mesma URL no bloco Webhook de cada Typebot.
5. **Ativar** o workflow (toggle *Active*). Só o webhook de produção responde com o workflow ativo.
6. **Testar de ponta a ponta:**
   - Abrir o link do Typebot Júnior, responder até o fim.
   - Conferir o card novo na base Notion (Nível = Júnior, Vaga = Vendedor Júnior, respostas no corpo).
   - Repetir com o Sênior.

---

## Notas técnicas

- O HTTP Request usa a **Notion API diretamente** (`Notion-Version: 2022-06-28`) em vez do node Notion nativo — mais estável entre versões do n8n e controle total do payload.
- `responseMode: onReceived` → o Typebot recebe **200 na hora**, independente da latência do Notion (melhor UX para o candidato; se o Notion falhar, ver Executions).
- Textos longos são truncados (título 2000, corpo 1800 chars) para respeitar limites da Notion API.
- Se aparecer candidato com Vaga/Nível errados: conferir qual webhook o Typebot está chamando (path trocado é a causa mais comum).

---

## Troubleshooting

| Sintoma | Causa provável | Correção |
|---|---|---|
| Card não aparece no Notion | Integração sem acesso à base | Notion → base → Connections → adicionar integração |
| 401 no nó HTTP | Token Notion errado/expirado | Recriar credencial Notion API |
| 400 "validation_error" no select | Opção não existe na propriedade | Conferir nomes exatos de `Nível`/`Vaga`/`Status` (acentos!) |
| Idade vazia | Typebot mandou texto não-numérico | Code já limpa `\D`; conferir variável `Idade` no Typebot |
| Vaga Júnior não existe | Schema antigo | Já adicionada em 19/06 (opção "Vendedor Júnior", roxa) |

Voltar para [[CLAUDE]] · Typebot júnior: [[typebot-qualificacao-junior-sst]] · Sênior: [[typebot-qualificacao-closer]]
