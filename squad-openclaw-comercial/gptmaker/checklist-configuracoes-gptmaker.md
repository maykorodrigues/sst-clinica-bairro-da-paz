---
title: Checklist de configurações do GPTMaker
tags: [sst, gptmaker, checklist, configuracao, governanca]
related: ["[[mapa-agentes-gptmaker]]", "[[checklist-canais-intencoes-treinamentos]]"]
criado: 2026-08-21
---

# Checklist de configurações do GPTMaker

> Os 13 campos da tela **Configurações**, com o valor recomendado por agente e o motivo. Fonte dos nomes de campo: schema da API v2 (`update_agent_settings`), consultado em 21/08/2026.

---

## Tabela mestra

| Campo | A0 Diretor | A1 Receptivo | A2 SDR | A4 Suporte | A5 CS |
|---|---|---|---|---|---|
| `prefer_model` | raciocínio forte | equilibrado | equilibrado | econômico | econômico |
| `timezone` | America/Sao_Paulo | idem | idem | idem | idem |
| `enabled_human_transfer` | `false` | **`true`** | **`true`** | **`true`** | **`true`** |
| `enabled_reminder` | `false` | `false` | `true` | `false` | **`true`** |
| `split_messages` | `false` | **`true`** | **`true`** | `true` | `true` |
| `enabled_emoji` | `false` | `true` | `true` | `true` | `true` |
| `limit_subjects` | **`true`** | **`true`** | **`true`** | **`true`** | **`true`** |
| `message_grouping_time` | — | 10–15s | 10–15s | 10–15s | 10–15s |
| `sign_messages` | `false` | `false` | `false` | `false` | `false` |
| `max_daily_messages` | — | teto | teto | teto | **teto baixo** |
| `max_daily_messages_limit_action` | — | transferir | transferir | transferir | transferir |
| `knowledge_by_function` | **`true`** | **`true`** | `false` | **`true`** | `true` |
| `on_lack_knowledge` | **dizer que não sabe** | **transferir** | **transferir** | **transferir** | **transferir** |

---

## Campo a campo

### `on_lack_knowledge` — o mais importante da tela

Define o que o agente faz quando não sabe. **É o principal antídoto contra alucinação** num contexto onde inventar preço ou informação de saúde tem consequência real.

| Valor | Efeito | Usar? |
|---|---|---|
| Transferir para humano | Chama a equipe | ✅ Padrão para todo agente de canal |
| Dizer que não sabe | Admite a lacuna | ✅ Para o A0, que não tem canal |
| Responder com o modelo | **Inventa** | ❌ **Nunca.** É como se cria "consulta custa R$ 150" do nada |

### `knowledge_by_function`

Quando `true`, o agente responde a partir do que foi treinado, e não da criatividade do modelo. Ligado em todos os agentes de informação (A1, A4, A0). No **A2 fica `false`**, porque SDR precisa conduzir conversa, não recitar — mas o A2 tem, em compensação, o bloqueio duro de preço no prompt.

### `enabled_human_transfer`

`true` em todo agente que fala com paciente. Sem isso, quem pede para falar com uma pessoa fica preso conversando com IA — a experiência mais frustrante que existe em atendimento automatizado, e a que mais gera reclamação pública.

`false` só no A0, que não tem canal.

### `max_daily_messages` e `max_daily_messages_limit_action`

Teto de dano. Estourou, **transfere para humano** — nunca "para de responder", que deixa o paciente falando sozinho.

Valor inicial: **baixo**. Sobe quando os números provarem que o agente acerta. Errar 20 vezes se conserta; errar 200 vira assunto no bairro.

### `split_messages` e `message_grouping_time`

`split_messages: true` quebra a resposta em mensagens curtas — o jeito de WhatsApp. `message_grouping_time` de 10 a 15 segundos espera a pessoa terminar de digitar antes de responder, evitando três respostas para três mensagens que eram uma frase só.

### `sign_messages`

`false` em todos. Os prompts já se identificam com naturalidade. Assinatura automática soa a sistema e polui a conversa.

### `limit_subjects`

`true` em todos. Impede o agente de virar assistente genérico — respondendo sobre receita de bolo, opinando sobre política, ou pior: **dando orientação de saúde** porque alguém perguntou.

### `enabled_reminder`

`true` só no A2 (follow-up de lead) e no A5 (régua de ativação). No A6 fica `false` mesmo que soe útil: lembrete automático de cobrança é justamente o que se quer evitar.

### `prefer_model`

| Agente | Perfil | Motivo |
|---|---|---|
| A0 | Raciocínio forte | Prioriza, decide, arbitra |
| A1, A2 | Equilibrado | Conversa com nuance |
| A4, A5 | Econômico | Alto volume, resposta padronizada |

Sem nome de modelo fixado aqui de propósito — o catálogo do GPTMaker muda e o custo por crédito varia. Confirmar o disponível no painel na hora de configurar.

---

## Checklist de publicação

Antes de ativar **qualquer** agente:

- [ ] `on_lack_knowledge` **não** está como "responder com o modelo"
- [ ] `enabled_human_transfer` = `true` (exceto A0)
- [ ] `limit_subjects` = `true`
- [ ] `max_daily_messages` definido, com valor baixo
- [ ] `timezone` = `America/Sao_Paulo`
- [ ] Nenhum preço de consulta/exame no prompt
- [ ] Nenhuma promessa de desconto fora da régua aprovada
- [ ] O nome da colaboradora afastada não aparece em lugar nenhum
- [ ] Regras de transferência configuradas (`create_transfer_rule`)
- [ ] Ações de inatividade revisadas (`update_idle_actions`) — o texto de encerramento é o que o cliente lê quando a conversa fecha sozinha
- [ ] Canal correto vinculado — e **nenhum** canal no A0
- [ ] Webhooks conferidos (`get_agent_webhooks`)
- [ ] Casos do `EVALS.md` referentes ao agente rodados e passando

---

## Auditoria periódica

| Quando | O que rodar | Procurar |
|---|---|---|
| Semanal | `audit_agent` em cada agente ativo | Configuração alterada sem versionar |
| Semanal | `monitor_channel_health` | **Canal desconectado silenciosamente** |
| Semanal | `list_agent_behavior_history` | Mudança de comportamento não documentada |
| Mensal | `get_agent_credits_spent` | Custo real por agente |
| Mensal | Amostra de 20 conversas | Tom, veracidade, escalada (A7) |

> 💡 O `monitor_channel_health` é o mais subestimado da lista. Um canal que cai sem avisar produz exatamente o sintoma que a Karine relatou em 14/08 — mensagens que somem — e ninguém percebe até um cliente reclamar.

**Toda alteração feita no painel volta para o Markdown deste pacote no mesmo dia.** Configuração que só existe no painel é configuração que ninguém consegue auditar nem restaurar.

---

Parte de [[../README|Squad OpenClaw Comercial]]
