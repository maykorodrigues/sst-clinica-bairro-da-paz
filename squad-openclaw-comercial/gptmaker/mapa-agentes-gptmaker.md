---
title: Mapa dos agentes no GPTMaker — telas, campos e governança
tags: [sst, gptmaker, mapa, agentes, leia, medina, governanca]
related: ["[[checklist-configuracoes-gptmaker]]", "[[checklist-canais-intencoes-treinamentos]]", "[[../README]]"]
criado: 2026-08-21
---

# Mapa dos agentes no GPTMaker

> O GPTMaker é a camada de IA que a SST **já tem funcionando**. Este pacote não a substitui — dá governança a ela. Ignorar o que já responde ao cliente para construir algo novo do zero é o erro clássico de projeto de automação.

---

## As oito telas e o que cada uma governa

Mapeamento dos campos reais expostos pela API v2 do GPTMaker (fonte: schema do conector MCP `mcp__gptmaker__*`, consultado em 21/08/2026 — **schema CONFIRMADO**; os valores de configuração da SST ainda **não foram lidos** nesta sessão).

| Tela | O que define | Campos reais da API | Quem manda no conteúdo |
|---|---|---|---|
| **Perfil** | Quem o agente é | `name` · `avatar` · `communication_type` · `type_` | `agents/A*.md` — bloco Identidade |
| **Trabalho** | O que ele faz e como | `job_name` · `job_site` · `job_description` · `behavior` | `agents/A*.md` — Missão, regras e limites |
| **Treinamentos** | O que ele sabe | `POST /trainings` — tipos `text`, `website`, `video`, `document` | Catálogo, FAQ, playbooks |
| **Intenções** | O que ele consegue acionar | `description` · `type_` · `http_method` · `url` · `headers` · `params` · `request_body` | **Sempre apontando para o n8n** |
| **Integrações** | Ligações prontas com terceiros | — | Evitar; a ponte é o n8n |
| **Servidores MCP** | Ferramentas externas via MCP | `add_mcp_to_agent` · `list_mcp_tools` · `activate/deactivate_mcp_tool` | Só ferramenta auditada |
| **Canais** | Por onde ele fala | `create_agent_channel` · `update_channel_config` · widget · QR | Decisão de arquitetura, não de agente |
| **Configurações** | Como ele se comporta | 13 campos — ver `checklist-configuracoes-gptmaker.md` | Este pacote |

---

## Os agentes que existem hoje

> ⚠️ **Os IDs reais não foram levantados nesta sessão.** Não se inventa ID. Para preencher, rodar `get_workspace_summary` e `audit_agent` (ambos read-only) e completar a tabela.

| Agente | Papel atual | Corresponde a | Estado | ID |
|---|---|---|---|---|
| **Léia Ferreira** | Atendimento e agendamento da SST Clínica | **A1** | 🟡 Ativo, prompt de 30/05 desatualizado | `[FALTA: levantar]` |
| **MÉDINA** | SDR do funil de social selling | **A2** | 🟡 Prompt de 06/05, estrutura de equipe mudou | `[FALTA: levantar]` |
| **Sofia** | SDR do Cartão de Todos Penha | — | ⚠️ **Outro cliente** — não confundir, não misturar | — |

### Dívidas conhecidas de cada um

**Léia (A1):**
- Preços no prompt estão desatualizados — especialidades que não existem mais, e faltam psiquiatra, pediatra, endócrino (`atendimento-ia-clinica/04-divergencias-catalogo-para-debora.md`).
- Regra de espelhamento de áudio inaplicável: a plataforma não transcreve áudio. Precisa virar regra de escalada.
- Sem intenção ligada — não cria card, não transfere por API.

**MÉDINA (A2):**
- Cita **"até 75% de desconto"**, número fora da régua aprovada. Precisa sair.
- Agenda call com "Consultora Irlana" — estrutura antiga. Hoje o handoff é para a **Karine**.
- Preços de consulta fixos no prompt, sem tabela vigente que os sustente.

---

## Quais agentes deste pacote vão para o GPTMaker

| Agente | Vai? | Como |
|---|---|---|
| **A0** Diretor Comercial | 🟡 Sim, **sem canal** | Análise interna via API. Ligar ao WhatsApp seria erro de arquitetura |
| **A1** Receptivo | ✅ Sim | É a Léia. Atualizar o prompt existente |
| **A2** Pré-Vendas | ✅ Sim | É a MÉDINA. Aplicar o prompt revisado |
| **A3** Vendas | ❌ Não como canal | Copiloto da Karine. IA fechando venda sozinha não está autorizado |
| **A4** Suporte | ✅ Sim | Melhor candidato a autonomia cedo — risco baixo, volume alto |
| **A5** CS | 🟡 Parcial | Régua de ativação pode; detecção de churn é análise, fica no OpenClaw |
| **A6** Cobrança | ❌ Não | Maior risco jurídico da operação. Copiloto da Sabrina |
| **A7** Guardião | ❌ Não | Audita os outros; não conversa |
| **A8** Escriba | ❌ Não | Escreve em arquivo e Notion |

**Três agentes no GPTMaker com canal (A1, A2, A4), um sem canal (A0), e o resto no OpenClaw.** Menos agentes com canal significa menos superfície de erro.

---

## A regra de ouro das Intenções

> **Toda intenção do GPTMaker aponta para o n8n. Nenhuma aponta para sistema externo direto.**

| Errado | Certo |
|---|---|
| Intenção → API do Asaas | Intenção → n8n → Asaas |
| Intenção → banco de dados | Intenção → n8n → consulta read-only |
| Intenção → CRM do E-Chat | Intenção → n8n → valida política → E-Chat |

**Por quê:** o n8n é onde vivem o cofre, a política, a idempotência, o kill switch e o log. Intenção que fura o n8n fura os cinco de uma vez — e o incidente aparece sem rastro.

---

## Como este pacote vira configuração

```text
agents/A1-atendimento-receptivo.md
        |
        +-- Identidade      -> tela Perfil
        +-- Missao/regras   -> tela Trabalho (job_description + behavior)
        +-- Escalada        -> Regras de transferencia + enabled_human_transfer
        +-- Nunca pode      -> tela Trabalho, secao de limites duros
        +-- Metricas        -> painel de auditoria (fora do GPTMaker)
        |
schemas/intent.schema.json
        |
        +-- estrutura       -> corpo das Intencoes (request_body)
        |
playbooks/*.md
        |
        +-- conteudo        -> tela Treinamentos (tipo texto)
```

**A fonte é sempre o Markdown deste pacote.** Alterou no GPTMaker sem alterar aqui? Em duas semanas ninguém sabe qual é a verdade. Regra: **muda aqui, depois lá.**

---

## Levantamento pendente

Para completar este mapa, rodar (tudo read-only, nada altera configuração):

| # | Chamada | O que traz |
|---|---|---|
| 1 | `get_workspace_summary` | Workspace, agentes, canais, créditos |
| 2 | `audit_agent` (Léia) | Diagnóstico completo: settings, treinamentos, intenções, regras, webhooks |
| 3 | `audit_agent` (MÉDINA) | Idem |
| 4 | `monitor_channel_health` | Canais silenciosamente desconectados |
| 5 | `list_agent_behavior_history` | Histórico de mudança de comportamento |
| 6 | `get_agent_credits_spent` | Consumo real, para dimensionar custo |

**Por que não foi feito nesta sessão:** o pedido foi explícito em não mexer em credencial. Executar o levantamento exige `GPTMAKER_API_TOKEN` no ambiente — decisão do Mayko, não do agente.

> 💡 A chamada #4 merece prioridade. **Canal de WhatsApp desconectado silenciosamente** é uma das causas plausíveis para "mensagens que somem", e o `monitor_channel_health` existe exatamente para isso.

---

Parte de [[../README|Squad OpenClaw Comercial]]
