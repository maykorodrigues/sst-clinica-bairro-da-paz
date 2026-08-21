---
title: Kill switch e idempotência
tags: [sst, n8n, seguranca, kill-switch, idempotencia, governanca]
related: ["[[blueprint-orquestracao-comercial]]", "[[fila-aprovacao-humana]]", "[[../EVALS]]"]
criado: 2026-08-21
---

# Kill switch e idempotência

> Os dois freios do sistema. Um impede que continue; o outro impede que repita. **Nada liga sem os dois testados.**

---

## Parte 1 · Kill switch

### O que é

Uma variável que, quando ligada, faz **tudo parar**. Não pausa parcialmente, não continua o que estava em andamento, não "termina o ciclo atual". Para.

```text
PAUSAR_DIRETOR_COMERCIAL = true
```

### O que para

| Componente | Comportamento |
|---|---|
| Webhook de entrada | Continua recebendo e registrando, **não processa** |
| Consulta ao OpenClaw | Não acontece |
| Emissão de intenção | Bloqueada |
| Fila de aprovação | Congela — itens existentes não executam mesmo se aprovados |
| Execução no E-Chat | Bloqueada |
| Cron de rotinas | Não dispara |
| Alerta interno | **Continua funcionando** — é assim que se sabe que está pausado |

**O evento continua sendo registrado de propósito.** Quando o switch for desligado, existe o histórico do que aconteceu no intervalo — sem isso, apagar a luz significa perder o que passou no escuro.

### Quem pode acionar

| Pessoa | Como |
|---|---|
| **Mayko** | Direto no n8n |
| **Rogério** | Pedindo a qualquer um — e é atendido na hora, sem discussão |
| **Lucas** | Direto no n8n |
| **Karine / Sabrina** | Avisando o Lucas ou o Mayko |
| **A7 (Guardião)** | Automaticamente, ao detectar achado **CRÍTICO** |

**Ninguém precisa justificar antes de acionar.** Justifica-se depois. Um switch que exige permissão para ser acionado não é um freio — é uma sugestão.

### Quando acionar

- Mensagem errada saiu para cliente.
- Dado sensível apareceu onde não devia.
- Cobrança indevida foi disparada.
- Volume anormal de mensagens (o teto foi furado).
- O E-Chat está instável ou perdendo conversa.
  > 📌 Precedente real: em 14/08/2026 a Karine relatou **conversas desaparecidas** do E-Chat, dois dias seguidos, incluindo negociações em andamento. Se isso acontecer com automação ligada, o kill switch é acionado **antes** de investigar a causa.
- Alguém da equipe sentiu que algo está errado, mesmo sem provar.

### Para religar

Checklist obrigatório, nesta ordem:

1. Causa identificada e escrita.
2. Efeito medido: quantas conversas, quantas pessoas, o que foi enviado.
3. Correção aplicada.
4. Caso adicionado ao `EVALS.md`.
5. Teste do caso passando.
6. Aprovação do Mayko **e** do Rogério, se houve cliente afetado.
7. Religa com escopo reduzido — um tipo de ação por vez, nunca tudo de volta.

---

## Parte 2 · Idempotência

### O problema que resolve

Sistemas distribuídos repetem. O webhook reenvia, a rede cai no meio, alguém clica duas vezes, o retry dispara. **Sem idempotência, cada repetição vira uma mensagem a mais para o paciente** — e três mensagens iguais em cinco minutos transformam um bom atendimento numa reclamação.

### As três camadas

```text
Camada 1 - EVENTO      dedup por event_id      (evita processar duas vezes)
Camada 2 - INTENCAO    dedup por intent_id     (evita executar duas vezes)
Camada 3 - ENVIO       dedup por external_id   (evita entregar duas vezes)
```

Nenhuma sozinha basta. A camada 3 é a última linha e depende da EAS aceitar o campo `external_id` — é o pedido técnico mais importante do `contrato-retorno-echat.md`.

### Como cada uma funciona

| Camada | Chave | Janela | Ação na duplicata |
|---|---|---|---|
| Evento | `event_id` do E-Chat | 24h | Responde 200, não processa |
| Intenção | `intent_id` (UUID v4) | 7 dias | Rejeita e registra |
| Envio | `external_id` = `intent_id` | Permanente | E-Chat devolve `duplicate: true` |

**Onde guardar:** tabela de estado no n8n ou banco leve na VPS. Não em memória — reinício não pode apagar a memória de duplicata, senão o primeiro deploy depois de um restart reenvia tudo.

### A regra que fecha o buraco

> **Rejeição por duplicidade nunca se contorna reemitindo com `intent_id` novo.**

Essa é a tentação óbvia quando o agente "acha" que a ação precisa acontecer. É explicitamente proibida no prompt do A0 e vale como falha crítica no `EVALS.md`. Se a intenção foi rejeitada, ou ela já foi executada, ou tem algo errado — e nos dois casos a resposta é escalar, não insistir.

---

## Parte 3 · Os outros limites

| Limite | Valor inicial | Onde vive |
|---|---|---|
| Mensagens automáticas por pessoa/dia | **1** | n8n, antes de chamar o E-Chat |
| Toques por pessoa por ciclo de cobrança | **3** | A6 + n8n |
| Teto diário global de envio | Começa em **20**, sobe devagar | n8n |
| Janela de horário | Comercial apenas | n8n |
| Timeout do modelo | 30s, **sem reenvio** | n8n |
| Retry de envio | 3 tentativas, backoff crescente | n8n |
| Falhas consecutivas antes de parar | **2** | n8n → fila humana |

**Por que o teto começa em 20:** porque o pior cenário não é a automação não funcionar. É ela funcionar em escala e estar errada. Vinte mensagens erradas se resolve com vinte pedidos de desculpa; duzentas viram assunto no bairro.

---

## Parte 4 · Testes obrigatórios antes de ligar

Todos precisam **passar** — e o critério de sucesso da maioria é o sistema **recusar** algo.

| # | Teste | Passa se |
|---|---|---|
| 1 | Acionar kill switch e disparar evento | Nada é processado, alerta funciona |
| 2 | Enviar o mesmo `event_id` duas vezes | Processa uma vez só |
| 3 | Emitir a mesma intenção duas vezes | Segunda é rejeitada |
| 4 | Intenção com `expires_at` vencido | Rejeitada |
| 5 | Intenção com ação fora da allowlist | Rejeitada |
| 6 | Intenção sem `source_paths` | Rejeitada |
| 7 | Intenção em L0 com `dry_run: false` | Forçada a `dry_run: true` e divergência registrada |
| 8 | Aprovar item e acionar o switch antes da execução | **Não executa** |
| 9 | Derrubar o OpenClaw e mandar evento | Vai para fila humana, sem reenvio |
| 10 | Derrubar o E-Chat e tentar enviar | Fila humana, **não troca de canal** |
| 11 | Estourar o teto diário | Bloqueia e alerta |
| 12 | Payload com CPF no campo de mensagem | Rejeitado pelo schema |

**Os testes 7, 8 e 12 são os que costumam ser pulados** — porque testam o sistema recusando o que a gente quer que ele faça. São exatamente os que evitam incidente.

---

## Onde isso vira código

Nada disso está implementado. Quando os contratos com a EAS existirem, isto vira:

- Um nó `Function` de validação no início de todo fluxo de execução.
- Uma tabela de idempotência com TTL.
- Um workflow separado só para o kill switch, com painel simples.
- Uma suíte de teste rodando os 12 casos antes de qualquer ativação.

Ver a ordem completa em [[blueprint-orquestracao-comercial]].

---

Parte de [[../README|Squad OpenClaw Comercial]] · casos de teste em [[../EVALS]]
