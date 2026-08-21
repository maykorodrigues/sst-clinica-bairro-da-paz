---
title: Checklist de canais, intenções e treinamentos no GPTMaker
tags: [sst, gptmaker, checklist, canais, intencoes, treinamentos, mcp]
related: ["[[checklist-configuracoes-gptmaker]]", "[[mapa-agentes-gptmaker]]", "[[../n8n/blueprint-orquestracao-comercial]]"]
criado: 2026-08-21
---

# Checklist de canais, intenções e treinamentos

> As três telas que definem **por onde** o agente fala, **o que** ele consegue acionar e **o que** ele sabe. Erro aqui não aparece no teste — aparece na conversa com o cliente.

---

## Parte 1 · Canais

### A regra de arquitetura

Na SST, o canal oficial de paciente é o **E-Chat**. Isso foi decidido em 04/08/2026 e reafirmado em 17/08.

| Canal | Uso | Regra |
|---|---|---|
| **E-Chat** (WhatsApp oficial) | Paciente, lead, cliente | ✅ Canal principal |
| **Instagram `@ssfclinica`** | Mensagem direta | ✅ Já conectado ao E-Chat (18/08) |
| **Widget do site** | Visitante do site | 🟡 Avaliar; se ligar, roteia para a mesma fila |
| **Evolution / não oficial** | Alerta interno, sandbox, contingência | 🟡 Nunca para paciente em massa |
| **Chatwoot** | Laboratório e outros clientes | 🟡 Não é o canal da SST |

### Checklist por canal

- [ ] O canal está vinculado ao agente **certo** — A1 no receptivo, A2 no de campanha
- [ ] O número é o **oficial**, na BM do Rogério
- [ ] **Nenhum canal vinculado ao A0**
- [ ] Horário de funcionamento configurado
- [ ] Mensagem de fora do horário revisada — é o que a pessoa lê às 22h
- [ ] Mensagem de encerramento por inatividade revisada
- [ ] Fila de transferência humana apontando para quem realmente atende

### 🔴 Duas pendências de canal

**1. Cobrança fora do canal (C33).** Parte da cobrança ainda roda por um número Meta "reserva", fora do CRM. Enquanto isso durar não há rastreabilidade, e sem rastreabilidade não há automação de cobrança. Não é detalhe: é o que impede o A6 de existir de verdade.

**2. Mensagem de encerramento automático.** O E-Chat fecha conversa por inatividade com uma mensagem padrão, **customizável** (confirmado com Elieser em 14/08). Hoje ela soa como despedida. Deve virar **toque de reengajamento**:

> ❌ *"Seu atendimento foi encerrado por inatividade."*
> ✅ *"Vou fechar nosso atendimento por aqui, mas é só me chamar de novo quando quiser — tô por aqui 😊"*

---

## Parte 2 · Intenções

### A regra de ouro

> **Toda intenção aponta para o n8n. Nenhuma aponta direto para sistema externo.**

O n8n é onde vivem cofre, política, idempotência, kill switch e log. Intenção que fura o n8n fura os cinco.

### Configuração de uma intenção

Campos reais da API (`create_intention`):

| Campo | Valor |
|---|---|
| `description` | O que o agente deve entender que aciona isto |
| `type_` | Webhook |
| `http_method` | `POST` |
| `url` | Sempre o n8n — nunca Asaas, BOOM, Klingo ou E-Chat direto |
| `headers` | Autenticação — **valor vem do cofre**, não digitado no campo |
| `auto_generate_body` | `false` — o corpo segue o `intent.schema.json` |
| `request_body` | Estrutura fixa, com os campos do schema |
| `instructions` | Quando **não** acionar. Mais importante que quando acionar |

### Intenções previstas

| # | Intenção | Agente | Destino | Estado |
|---|---|---|---|---|
| I1 | `criar_card_echat` | A1, A2 | n8n → E-Chat | 🔴 Depende do C21 |
| I2 | `atualizar_card_echat` | A1, A2, A4, A5 | n8n → E-Chat | 🔴 C21 |
| I3 | `transferir_para_humano` | todos | n8n → E-Chat | 🔴 C21 |
| I4 | `consultar_status_leitura` | A4 | n8n → sistema, read-only | 🟡 Depende de acesso |
| I5 | `solicitar_segunda_via` | A4 | n8n → Asaas/BOOM | 🟡 Depende de acesso |
| I6 | `registrar_qualificacao` | A2 | n8n → card | 🔴 C21 |
| I7 | `sinalizar_risco` | todos | n8n → alerta interno | 🟢 **Pode ser feita já** |
| I8 | `agendar_followup` | A2, A5 | n8n → fila | 🟡 — |

> 💡 **I7 é a única que pode ser construída hoje**, porque só manda alerta interno e não depende do E-Chat. É um bom primeiro exercício: prova o caminho GPTMaker → n8n de ponta a ponta, com risco praticamente zero.

### Checklist por intenção

- [ ] A URL aponta para o n8n
- [ ] `instructions` diz claramente **quando não acionar**
- [ ] O corpo segue o `intent.schema.json`
- [ ] `dry_run: true` no corpo padrão
- [ ] Nenhum token digitado no campo de header — vem do cofre
- [ ] Testada com payload falso antes de ligar
- [ ] O n8n **rejeita** payload inválido (teste negativo)
- [ ] A intenção aparece no log com `intent_id`

---

## Parte 3 · Treinamentos

### Tipos disponíveis

| Tipo | Uso na SST | Cuidado |
|---|---|---|
| **Texto** | Playbooks, FAQ, catálogo, regras | ✅ Principal — versionado neste pacote |
| **Website** | Site da clínica, página de benefícios | 🟡 Reindexa; se o site mudar, o agente muda sem ninguém saber |
| **Documento** | PDF de catálogo | 🟡 **Nunca** documento com dado de paciente |
| **Vídeo** | — | ❌ Sem uso previsto |

### O que treinar por agente

| Agente | Treinamentos |
|---|---|
| **A1** | Horário e endereço · catálogo de especialidades (sem preço) · FAQ receptivo · playbook de passagem para humano |
| **A2** | Benefícios e preços **do cartão** · método SPIN · régua de objeções · playbook de qualificação |
| **A4** | FAQ operacional · como usar o cartão · como cadastrar dependente · o que é chamado humano |
| **A5** | Régua de ativação · benefícios · motivos comuns de cancelamento |
| **A0** | README do pacote · saúde da comunicação · resumo dos 8 agentes · estado vivo |

### Regras duras

1. **Nenhum treinamento com dado de paciente.** Nem transcrição real, nem print de conversa, nem planilha de cliente. Exemplo é fictício, sempre.
2. **Nenhum treinamento com preço de consulta** enquanto a tabela não existir.
3. **Treinamento por website reindexa sozinho.** Se o site mudar, o agente passa a dizer outra coisa sem que ninguém tenha decidido. Preferir texto colado e versionado.
4. **Todo treinamento tem origem neste pacote.** Conteúdo que só existe dentro do GPTMaker não é auditável nem restaurável.
5. **Data no fim de todo treinamento de texto:** `Atualizado em DD/MM/AAAA`. É como se descobre que a informação envelheceu.

### Checklist de treinamento

- [ ] Origem versionada neste pacote
- [ ] Sem dado pessoal ou de saúde
- [ ] Sem preço não aprovado
- [ ] Com data de atualização
- [ ] Dono definido para a revisão
- [ ] Testado: pergunte ao agente algo que **só** esse treinamento responde

---

## Parte 4 · Servidores MCP

O GPTMaker permite conectar servidores MCP, dando ferramentas externas ao agente.

### Postura: restritiva

| Situação | Decisão |
|---|---|
| MCP para consulta read-only auditada | 🟡 Avaliar caso a caso |
| MCP com poder de escrita em sistema externo | ❌ **Não.** Escrita passa pelo n8n |
| MCP de terceiro não auditado | ❌ Não |
| MCP que acessa dado de paciente | ❌ Não |

**Por quê:** cada MCP é um caminho que **não passa pela política do n8n**. Um agente com MCP de escrita é um agente que pode agir sem kill switch, sem idempotência e sem log. Isso desmonta a arquitetura inteira.

### Se algum MCP for ligado

- [ ] Ferramentas listadas com `list_mcp_tools` e revisadas uma a uma
- [ ] Apenas as necessárias ativadas (`activate_mcp_tool`) — as demais **desativadas**
- [ ] Nenhuma ferramenta de escrita em sistema de produção
- [ ] Registrado neste pacote, com data e motivo
- [ ] Revisão mensal — MCP sincroniza ferramenta nova sem avisar (`sync_mcp_tools`)

---

## Ordem de execução

| # | Passo | Bloqueia? |
|---|---|---|
| 1 | Levantar o estado real (`get_workspace_summary`, `audit_agent`) | Não |
| 2 | Rodar `monitor_channel_health` | Não |
| 3 | Atualizar treinamentos do A1 e do A2 | Não |
| 4 | Aplicar os prompts revisados | Não |
| 5 | Revisar configurações da tela Configurações | Não |
| 6 | Construir a intenção I7 (`sinalizar_risco`) | Não |
| 7 | Construir I1, I2, I3 | 🔴 **Sim — C21** |
| 8 | Ligar canal do A4 | Depois de 3–6 |

**Os passos 1 a 6 podem acontecer esta semana, sem depender da EAS.** É a resposta honesta para "o que dá para fazer enquanto o fornecedor não responde".

---

Parte de [[../README|Squad OpenClaw Comercial]]
