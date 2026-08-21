---
title: Playbook — Saúde da comunicação
tags: [sst, playbook, comunicacao, qualidade, metricas]
related: ["[[../00-ORQUESTRADOR-DIRETOR-COMERCIAL-OPENCLAW]]", "[[../schemas/conversation-health.schema.json]]", "[[../agents/A7-guardiao-lgpd-qualidade]]"]
criado: 2026-08-21
---

# Playbook — Saúde da comunicação

> Como se mede se a comunicação da SST está boa. Não por volume — por **cuidado, produtividade, integração, rastreabilidade e escala**.

---

## Por que isso existe

O número que abre este projeto: **145 chamadas receptivas por dia, cerca de 16 atendidas**. E **69 levantadas de mão perdidas** num único dia.

Nenhuma delas foi um problema de tecnologia. Foram problemas de **processo de conversa**: ninguém respondeu, ou respondeu com um preço seco, ou respondeu texto para quem mandou áudio, ou respondeu e nunca mais voltou.

Automação sobre um processo doente amplifica a doença. Este playbook define o que é saúde, para que o remédio seja o certo.

---

## Eixo 1 · Cuidado

**Pergunta:** a pessoa se sentiu atendida?

| Verificação | Padrão | Reprova |
|---|---|---|
| Primeira resposta | ≤ 5 min em horário comercial | > 30 min |
| Conversa sem resposta | **zero** acima de 24h | qualquer uma |
| Canal espelhado | áudio ↔ áudio, texto ↔ texto | responder áudio com texto |
| Toques por dia | máximo 1 | 2 ou mais |
| Tom | neutro, acolhedor, sem pressão | constrangimento, urgência falsa, culpa |
| Pedido de humano | atendido na hora | ignorado ou adiado |

### O que reprova na hora

- `"Olá, bom dia"` + link de pagamento. **Proibido** desde 19/08/2026.
- Emoji de comemoração em conversa sobre doença.
- "Você não está aproveitando seu cartão" — culpabiliza.
- "Últimas vagas", "só hoje", "vai acabar" — escassez falsa.
- Mensagem que expõe condição de saúde na notificação da tela travada.

### O teste da tela travada

> *Se essa notificação aparecer na tela do celular e outra pessoa vir, alguém se prejudica?*

Por isso lembrete de consulta **nunca cita a especialidade**:

| ❌ | ✅ |
|---|---|
| "Lembrando da sua consulta com o psiquiatra amanhã às 14h" | "Lembrando da sua consulta amanhã às 14h" |
| "Seu resultado de exame chegou" | "Temos uma novidade sobre seu atendimento, pode falar agora?" |

---

## Eixo 2 · Produtividade comercial

**Pergunta:** a conversa foi a algum lugar?

Uma conversa saudável termina em **um destes quatro estados**, e nenhum outro:

| Estado | O que é |
|---|---|
| **Avançou** | Mudou de estágio no funil, com card atualizado |
| **Agendou** | Data, especialidade e pagamento definidos por humano |
| **Escalada** | Passou a humano com contexto mastigado |
| **Fechada com motivo** | O "não" está escrito, com a razão |

Qualquer outro final é **`aberta_sem_avanco`** — dívida operacional. Acima de 48h, entra na fila do dia seguinte **com prioridade acima de lead novo**.

> **Por que contato velho ganha de lead novo:** o lead novo ainda não foi decepcionado. O contato de três dias já foi. Recuperar confiança perdida vale mais do que somar um nome à lista.

### O motivo da perda vale mais que a perda

Motivo de perda registrado é o insumo mais barato de melhoria que existe. Perdeu por preço? Por prazo de agenda? Porque ninguém respondeu? Cada um aponta para uma correção diferente — e sem o registro, todos viram "não converteu".

---

## Eixo 3 · Integração

**Pergunta:** isso existe em algum lugar além da cabeça de alguém?

| Verificação | Padrão |
|---|---|
| Card no E-Chat | existe |
| Campos mínimos | **origem · interesse · próxima ação** — os três |
| Canal | oficial, nunca número reserva |
| Duplicidade | nenhuma |
| Local do card | **E-Chat**, não Notion (decisão de 14/08) |

### A lição que custou caro

Em 14/08/2026 a Karine relatou que **conversas desapareceram do E-Chat**, dois dias seguidos — não tickets encerrados, mas negociações em andamento, com números que ela não tinha mais como recuperar.

Duas conclusões:

1. **Nada pode viver só em um lugar.** Conversa que só existe no canal é conversa que se perde quando o canal falha.
2. **O incidente ainda não foi explicado** (C23, aberto). Escalar volume sobre um sistema que perde conversa é construir sobre areia — exigir explicação e relatório antes de aumentar disparo.

---

## Eixo 4 · Rastreabilidade

**Pergunta:** dá para saber quem fez, quando e por quê?

| Verificação | Padrão |
|---|---|
| `intent_id` | presente em toda ação automatizada |
| Fonte citada | presente em toda recomendação |
| Dono humano | nomeado |
| Log completo | entrada, saída e erro |
| Gravação | ligações de cobrança, desde 19/08/2026 |

**Se não dá para auditar, não aconteceu.** É a regra que permite responder "quem mandou essa mensagem?" sem depender da memória de ninguém.

Gravação de ligação alimenta o cérebro do processo — **sempre anonimizada** antes de entrar no vault.

---

## Eixo 5 · Escala

**Pergunta:** isso vai crescer sem quebrar?

| Sinal | Ação |
|---|---|
| Mesma pergunta 3× na semana | Vira treinamento ou FAQ |
| Mesma objeção 3× | Vira bloco de resposta no playbook |
| Mesmo erro 2× | Vira regra dura no prompt **e caso no `EVALS.md`** |
| Exceção que exige julgamento | **Continua humana** |

### Escala não é automatizar tudo

A pergunta certa não é "isto pode ser automatizado?", e sim **"isto deve?"**.

| Deve automatizar | Deve continuar humano |
|---|---|
| Horário e endereço | Sintoma, dor, exame |
| Como usar o cartão | Negociação de valor |
| Cadastro de dependente | Cliente insatisfeito |
| Lembrete neutro de consulta | Óbito, luto, notícia grave |
| Aviso de falha de cartão recorrente | Cobrança de quem está em dificuldade |

Forçar automação na coluna da direita é o jeito mais rápido de a equipe perder a confiança no sistema — e uma vez perdida, ela não volta com um ajuste de prompt.

---

## Painel diário

Preenchido pelo n8n conforme `conversation-health.schema.json`.

```text
SAUDE DA COMUNICACAO - DD/MM/AAAA

CUIDADO ............ nota | 1a resposta: __min | sem resposta 24h: __
PRODUTIVIDADE ...... nota | avancou __ | agendou __ | escalada __
                          | fechada c/ motivo __ | aberta s/ avanco __
INTEGRACAO ......... nota | cards completos __% | fora do canal: __
RASTREABILIDADE .... nota | acoes com intent_id __% | sem dono: __
ESCALA ............. nota | assunto recorrente: ______ (__x)

VEREDITO: SAUDAVEL / ATENCAO / DOENTE / INCIDENTE

ACHADOS
  [severidade] [eixo] descricao -> acao

O QUE TRAVOU HOJE
  - ...
```

| Veredito | Critério |
|---|---|
| **SAUDÁVEL** | Todos os eixos ≥ 7 e nenhum achado ALTO/CRÍTICO |
| **ATENÇÃO** | Algum eixo entre 5 e 7, ou achado MÉDIO |
| **DOENTE** | Eixo abaixo de 5, ou achado ALTO |
| **INCIDENTE** | Qualquer achado CRÍTICO → kill switch |

> A média geral é informativa. **O veredito manda**, porque uma média boa esconde um eixo crítico — e é justamente o eixo crítico que causa o incidente.

---

## Ritual semanal

| Quando | O quê | Quem |
|---|---|---|
| Segunda, 08h | Ler o painel da semana anterior | Mayko + Lucas |
| Segunda, 08h15 | Escolher **um** eixo para melhorar | Mayko |
| Durante a semana | A7 audita 20 conversas | A7 |
| Sexta, 17h | Achados viram caso no `EVALS.md` | A8 |
| Sexta, 17h30 | Atualizar `RETOMADA.md` | A8 |

**Um eixo por semana.** Tentar consertar os cinco de uma vez não conserta nenhum.

---

Parte de [[../README|Squad OpenClaw Comercial]]
