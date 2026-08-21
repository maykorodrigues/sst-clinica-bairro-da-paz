---
title: Playbook — Qualificação de consultas e exames
tags: [sst, playbook, qualificacao, spin, consultas, exames, quiz]
related: ["[[../agents/A2-pre-vendas-sdr]]", "[[../agents/A1-atendimento-receptivo]]", "[[atendimento-sst-card]]"]
criado: 2026-08-21
---

# Playbook — Qualificação de consultas e exames

> Como transformar **"quanto custa o psiquiatra?"** em uma conversa que ajuda a pessoa e gera receita. É o playbook que ataca as **69 levantadas de mão perdidas**.

---

## O problema, com nome

Hoje o ciclo é:

```text
Paciente: "quanto e a consulta com psiquiatra?"
Clinica:  "R$ 270"
Paciente: [some]
```

Três coisas erradas de uma vez:

1. **Ninguém perguntou por quê.** Quem procura psiquiatra tem uma história, e é a história que sustenta a decisão — não o número.
2. **O preço veio sem alternativa.** Não se mostrou o valor com cartão, e o desconto é justamente o argumento.
3. **Ninguém voltou.** Sem resposta, ninguém retoma. O contato morre.

O SUS demora, o particular pesa, e a pessoa fica no meio — sem saber que existe um caminho de R$ 39,90 por mês que resolve exatamente isso.

---

## O ciclo correto

```text
Paciente: "quanto e a consulta com psiquiatra?"
              |
              v
        ACOLHE + PERGUNTA POR QUE
              |
              v
        ENTENDE HA QUANTO TEMPO / COMO ATRAPALHA
              |
              v
        MOSTRA A IMPLICACAO (sem dramatizar)
              |
              v
        CHEGA NA NECESSIDADE
              |
              v
        APRESENTA PARTICULAR x COM CARTAO, LADO A LADO
              |
              v
        HANDOFF PARA HUMANO FECHAR
```

**A pergunta que muda tudo é a segunda.** Não "qual especialidade", mas *"o que te levou a procurar isso agora?"*.

---

## SPIN aplicado à saúde

| Etapa | Pergunta | Cuidado |
|---|---|---|
| **S — Situação** | "Me conta, o que você tá precisando?" · "É pra você ou pra alguém da família?" | Não pedir detalhe clínico. Só o suficiente para rotear |
| **P — Problema** | "E isso tem te atrapalhado de que jeito no dia a dia?" | Ouvir, não diagnosticar |
| **I — Implicação** | "Você chegou a procurar pelo SUS? Como foi a espera?" · "E nesse tempo esperando, chegou a te impedir de trabalhar?" | **Nunca dramatizar doença.** A implicação é sobre a espera e o custo de não resolver — nunca sobre o risco de saúde |
| **N — Necessidade** | "E se desse pra ser atendido ainda essa semana, já te ajudava?" | A pessoa conclui sozinha |

### A linha que não se cruza

| ✅ Permitido | ❌ Proibido |
|---|---|
| "E isso tem te atrapalhado no trabalho?" | "Isso pode piorar se você não tratar" |
| "Quanto tempo você já tá esperando?" | "Esse sintoma pode ser sério" |
| "Já procurou o SUS? Como foi?" | "É melhor não deixar pra depois, viu?" |

**A implicação legítima é sobre a espera, o transtorno e o custo.** Implicação sobre risco de saúde é opinião clínica — proibida para todo agente, e nada disso vale se houver sintoma agudo: aí escala na hora.

---

## Ancoragem — particular × com cartão

Quando o dinheiro entra na conversa, mostra-se os dois lado a lado, sempre nessa ordem:

```text
"A consulta com [especialidade] fica R$ [X] no particular.
 Com o SST Card ela sai por R$ [Y] - voce economiza R$ [Z]
 so nessa consulta. E o cartao e R$ 39,90 no mes, com
 telemedicina, desconto em exame e auxilio funeral junto.

 Faz sentido pra voce?"
```

> 🔴 **Enquanto a tabela por especialidade não existir**, os colchetes **não são preenchidos**. O agente conduz o SPIN, registra tudo e escala para humano dizer o valor. Pendente com o Rogério desde 02/07 (C15).

Quando a tabela existir, ancorar assim é o que converte — porque a economia numa única consulta costuma ser maior que a mensalidade.

---

## Roteamento por tipo de demanda

| Demanda | Rota | Observação |
|---|---|---|
| Consulta com especialidade disponível | A2 qualifica → humano agenda | Sem Klingo integrado, agenda é humana |
| Consulta com especialidade **não disponível** | Humano | Não prometer o que não existe |
| Exame de imagem | A2 → humano | — |
| Exame laboratorial | A2 → humano (sistema Vidas) | Integração pendente |
| Retorno de consulta | A5 | — |
| Resultado de exame | **Humano, imediato** | Nunca IA |
| Sintoma agudo | **Humano, imediato** | Para tudo |
| Odontologia | A2 → humano | Serviço novo (2026) |

---

## Os quizzes por especialidade

Existem **6 fluxos de quiz** construídos (exames/lab, pediatra, clínico, gineco, cardio, psiquiatra). A decisão de 17/08/2026: **replicar dentro do E-Chat**, não manter Typebot externo.

**Por que dentro do E-Chat:** canal, CRM e histórico precisam morar no mesmo lugar. Quiz fora do canal gera lead que não vira card — que é o problema que se está resolvendo.

Cada quiz precisa terminar com:

- [ ] Card criado com **origem, interesse e próxima ação**
- [ ] Classificação: quente / morno / frio
- [ ] Handoff para humano quando quente
- [ ] Registro do que foi prometido

**Sem card no fim, o quiz é um formulário bonito que perde lead** — exatamente como antes.

---

## Escalada obrigatória

Sem qualificar, sem tentar entender melhor, sem "só um minutinho":

| Gatilho |
|---|
| Dor, febre, sangramento, falta de ar, mal-estar |
| "Preciso hoje", "é urgente", "tô passando mal" |
| Gravidez, criança pequena doente, idoso acamado |
| Resultado de exame, laudo, medicação |
| Saúde mental em crise, menção a autolesão |
| Áudio ou imagem (a plataforma não transcreve nem lê) |
| Pedido explícito de falar com pessoa |

> **Menção a autolesão ou ideação suicida:** escalada imediata para humano, e o humano orienta procurar atendimento presencial ou o **CVV, 188**. Nenhum agente conduz essa conversa. Nenhum agente minimiza, aconselha ou tenta acalmar por conta própria.

---

## Registro no card

O que precisa estar escrito antes do handoff:

```text
ORIGEM ......... instagram / anuncio / indicacao / walk-in / lista
INTERESSE ...... especialidade ou exame
CONTEXTO ....... ha quanto tempo, como atrapalha, ja procurou onde
PRA QUEM ....... titular ou dependente
DINHEIRO ....... o que a pessoa falou sobre isso, se falou
CARTAO ......... ja tem / interessou / nao quis / nao falou
PROMETIDO ...... tudo que ja foi dito a ela
PROXIMA ACAO ... quem faz o que, ate quando
```

**A linha PROMETIDO é a que evita "não foi isso que me falaram".**

---

## Métricas

| Métrica | Meta |
|---|---|
| Perguntas de preço que viram conversa qualificada | ≥ 70% |
| Levantadas de mão sem resposta | **0** |
| Handoff aceito sem devolução | ≥ 85% |
| Card com contexto completo | ≥ 90% |
| Escalada clínica correta | **100%** |
| Preço dito sem autorização | **0** |

---

Parte de [[../README|Squad OpenClaw Comercial]]
