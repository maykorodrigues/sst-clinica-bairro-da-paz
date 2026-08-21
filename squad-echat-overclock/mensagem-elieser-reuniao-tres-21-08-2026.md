---
title: Mensagem ao Elieser — pedido de reunião a três (21/08/2026)
tags: [sst, echat, eassystems, elieser, mensagem, em-progresso]
related: ["[[cobranca-elieser-14-08-2026]]", "[[../openclaw-sst/COMPROMISSOS-ATIVOS]]", "[[historico-acoes]]"]
criado: 2026-08-21
status: rascunho — Mayko revisa e envia
---

# Mensagem ao Elieser — reunião Rogério + Elieser + Mayko

## Contexto

Em 21/08, 09h13, Mayko pediu no grupo: acesso ADM confirmado e **onde mexer no comportamento da IA**. Resposta do Elieser (09h16–09h18):

> *"Como funciona hoje no nosso produto: enviamos para o cliente a engenharia de prompt, o cliente ajusta, aprova e nos envia para colocarmos em produção. Essa etapa de ajuste no ecossistema da IA é parametrizado por nós com aprovação do cliente. A equipe está à sua disposição das 06:30h às 18:20h de segunda a sexta e sábado das 07h às 13h."*

**O que isso significa na prática:** o ciclo de mudança é `nós escrevemos → eles aplicam → nós testamos → repete`. Cada volta gasta pelo menos um dia. Disponibilidade de horário não resolve isso — o gargalo é o número de voltas, não o horário do time deles.

**O atraso, com data:** a IA no número novo era esperada para **sexta 08/08** e depois para **sexta 15/08**. Hoje é quinta **21/08** e a próxima é **22/08**. São **duas sextas perdidas** em cima de um item que o próprio Elieser classificou como o de maior valor.

**Estratégia da mensagem:** não cobrar o Elieser pessoalmente — ele tem respondido. Cobrar o **modelo de trabalho**, que é o que está atrasando. E puxar o Rogério para a mesa, porque decisão de processo com fornecedor é do sponsor, não do consultor.

---

## Mensagem — versão para enviar

```text
Elieser, obrigado pelo retorno e por deixar a equipe disponível — isso
conta muito.

Uma pergunta antes: o Rogério chegou a te falar de sentarmos os três?
Eu, você e ele, uma conversa curta, de 30 minutos.

Vou ser direto sobre o porquê, porque acho que vale mais que rodeio.

O modelo de vocês funciona: a gente escreve, vocês parametrizam, a gente
aprova. O problema não é a qualidade — é o número de voltas. Cada ajuste
fino de comportamento (uma regra de transferência, um conflito de foto,
o marcador de fechamento) vira um ciclo de ida e volta de pelo menos um
dia. E ajuste fino de IA não são três mudanças, são trinta.

O efeito prático a gente já tem medido: a IA no número novo estava
prevista pra sexta 08/08, depois pra sexta 15/08, e hoje é 21. São duas
sextas. Não é falta de disposição de ninguém — é o desenho do processo
que não acompanha o ritmo que essa fase exige.

Por isso a conversa a três. Três coisas pra fechar:

1. Um caminho pra eu conseguir iterar o prompt sem consumir a agenda de
   vocês a cada ajuste — mesmo que seja ambiente de homologação, acesso
   limitado, ou uma janela fixa de aplicação por dia. O que for viável
   pra vocês.
2. Webhook de saída e endpoint de retorno — você pediu que eu desenhasse
   o fluxo. Está desenhado, com os campos e os cenários de erro. Levo
   pronto pra call, é só validar o que bate com o sistema de vocês.
3. Prazo real, com data. Prefiro uma data mais longa e verdadeira do que
   uma curta que escorrega de novo.

Do meu lado eu já resolvo o que é meu: o prompt revisado sai hoje pro
Lucas, com as correções que a gente levantou nos testes.

Me diz o melhor dia pra você que eu falo com o Rogério e fecho.
```

---

## Versão curta (se o grupo estiver movimentado)

```text
Elieser, valeu pelo retorno.

O Rogério chegou a te falar de sentarmos os três? 30 minutos.

Motivo, direto: o modelo de "a gente manda, vocês aplicam" funciona, mas
cada ajuste fino vira um ciclo de um dia — e ajuste fino de IA são
dezenas, não três. Na prática, a IA no número novo estava prevista pra
sexta 08/08, depois pra 15/08, e hoje é 21.

Queria fechar três pontos com o Rogério junto: um caminho pra eu iterar
o prompt sem travar a agenda de vocês, o webhook/endpoint (levo o
desenho pronto) e uma data real.

O prompt revisado eu mando hoje pro Lucas. Me diz o dia que fica bom.
```

---

## O que NÃO entrou na mensagem, e por quê

| Deixado de fora | Motivo |
|---|---|
| As conversas sumidas (C23) | Assunto grave demais para virar item de lista. Merece a call inteira ou mensagem própria |
| Custo de transcrição de áudio (C13) | Não trava a reunião. Entra depois |
| Contradição sobre a janela de 24h (C11) | Fica para a call técnica, com o desenho na tela |
| Cobrar o Elieser pessoalmente | Ele respondeu 2 de 6 pendências em 14/08 e liberou painel. O gargalo é o processo |

## Depois de enviar

- [ ] Alinhar com o Rogério **antes** de o Elieser propor data — o sponsor precisa saber que foi convocado
- [ ] Levar para a call: `n8n/contrato-webhook-echat.md` e `n8n/contrato-retorno-echat.md` (em PDF — Rogério não abre artifact)
- [ ] Registrar o resultado em `COMPROMISSOS-ATIVOS.md` com dono, prazo e critério de pronto

---

Voltar para [[README|Squad E-Chat]] · [[../RETOMADA|RETOMADA]]
