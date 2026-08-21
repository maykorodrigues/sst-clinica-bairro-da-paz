---
title: Fila de aprovação humana
tags: [sst, n8n, aprovacao, governanca, human-in-the-loop]
related: ["[[blueprint-orquestracao-comercial]]", "[[kill-switch-e-idempotencia]]", "[[../schemas/intent.schema.json]]"]
criado: 2026-08-21
---

# Fila de aprovação humana

> O ponto onde a máquina para e uma pessoa decide. É o que separa "IA que ajuda" de "IA que causa incidente".

---

## O que sempre passa pela fila

Se a intenção tocar qualquer um destes, `approval.required = true`. Sem exceção, em qualquer nível de autonomia:

| Gatilho | Por quê |
|---|---|
| **Preço** | A tabela por especialidade não existe. Qualquer valor é risco de promessa falsa |
| **Desconto** | A régua 10/40/50% **não foi aprovada** pelo Rogério (C15, desde 02/07) |
| **Campanha** | Envolve verba, marca e volume |
| **Disparo em massa** | Erro em escala é irreversível |
| **Alteração de CRM** | Card errado hoje é decisão errada amanhã |
| **Dado de paciente** | Dado sensível, LGPD art. 11 |
| **Agenda** | Sem Klingo integrado, nenhuma IA confirma horário |
| **Template novo** | Passa por aprovação da Meta e por revisão de tom |
| **Fora do horário comercial** | Mensagem de madrugada é invasão |

---

## Como funciona

```text
Intencao com approval.required = true
        |
        v
  [Fila no n8n]  <- prazo de validade herdado de expires_at
        |
        +--> APROVADO  -> executa -> registra quem aprovou e quando
        |
        +--> RECUSADO  -> registra o motivo -> motivo alimenta ajuste de prompt
        |
        +--> EXPIROU   -> descarta -> alerta: "a fila nao esta sendo olhada"
```

**Item expirado é sinal de processo doente, não de erro técnico.** Se a fila acumula, ou a IA está gerando ruído, ou ninguém tem tempo de olhar. Os dois casos precisam ser ditos ao Rogério com esse nome — e nenhum se resolve aumentando a autonomia.

---

## Onde a fila mora

| Opção | Vantagem | Desvantagem | Recomendação |
|---|---|---|---|
| **Card no CRM do E-Chat** | A equipe já vive lá; zero ferramenta nova | Depende do endpoint de criação de card | ✅ **Preferida** |
| Mensagem no grupo interno | Rápido de montar | Some no meio da conversa; sem estado | Só para alerta CRÍTICO |
| Painel n8n | Auditoria completa | Ninguém da equipe abre n8n | Backup técnico |
| Notion | Já usado | Decisão de 14/08 tirou o operacional do Notion | ❌ Não |

**Decisão:** a fila vive **no E-Chat**, num quadro chamado *"Aprovações pendentes"*. Se a equipe precisa abrir outra ferramenta para aprovar, ela não aprova — e a fila morre de inanição.

---

## Quem aprova o quê

| Tipo de intenção | Aprovador | Substituto |
|---|---|---|
| Resposta a lead / conteúdo comercial | **Karine** | Lucas |
| Cobrança, negociação, valor | **Sabrina** | Karine |
| Suporte operacional, cadastro | **Lucas** | Karine |
| Preço, desconto, campanha, verba | **Rogério** | ninguém |
| Qualquer coisa com dado de paciente | **Mayko** + responsável clínico | ninguém |
| Comunicação com a EAS Systems | **Lucas** | Mayko |

**Regra dura:** quem aprova não é quem pediu. O A0 nunca aprova a própria intenção — nem em L3.

**Sobre nomes nesta tabela:** a Raquel não aparece, e isso é intencional — ela está afastada por luto. Nenhuma fila, tarefa ou lembrete deve nomeá-la.

---

## O que o aprovador vê

Um item de fila cabe em uma tela de celular. Nada mais.

```text
APROVACAO PENDENTE  ·  vence em 1h47

Agente:    A6 (Cobranca)
Acao:      responder_conversa
Contato:   card #000 (contato ficticio de exemplo)

MENSAGEM PROPOSTA
"Dona [Nome], tudo bem? Aqui e a Sabrina, da SST.
 Vi que a senhora vem no Pilates - ta indo tudo certo?
 Reparei que a mensalidade de julho ficou em aberto.
 Quer que eu te mande o link agora ou prefere semana que vem?"

POR QUE AGORA
Fatura vencida ha 12 dias. Cliente ativa, usa o beneficio
toda semana. Sem toque anterior neste ciclo.

FONTE
squad-openclaw-comercial/agents/A6-cobranca-relacionamento.md
squad-openclaw-comercial/playbooks/saude-da-comunicacao.md

[ APROVAR ]   [ RECUSAR + MOTIVO ]   [ EDITAR E APROVAR ]
```

**"Editar e aprovar" é a opção mais valiosa.** Cada edição mostra exatamente onde o prompt erra o tom — é o dado que faz o sistema melhorar de verdade, muito mais do que a taxa de aprovação.

---

## Prazos

| Tipo | Validade | Se expirar |
|---|---|---|
| Resposta em conversa ativa | 2 horas | Descarta — a conversa já esfriou |
| Cobrança | 24 horas | Descarta, volta para a fila do dia seguinte |
| Campanha ou disparo | 72 horas | Escala para o Mayko |
| Qualquer coisa com dado de paciente | 4 horas | Descarta e **alerta** |

---

## Métricas da fila

| Métrica | Meta | O que significa se sair da meta |
|---|---|---|
| Taxa de aprovação | 70–90% | Abaixo de 70%: a IA gera ruído. Acima de 95%: ninguém está lendo de verdade |
| Tempo médio até decisão | ≤ 2h | Acima disso, a fila não é olhada |
| Itens expirados | ≤ 5% | Acima disso, o processo está doente |
| Edições antes de aprovar | Caindo com o tempo | Se não cai, o prompt não está aprendendo |

> A métrica mais reveladora é a **taxa de aprovação acima de 95%**. Ela parece ótima e quase sempre significa que a fila virou carimbo. Quando isso aparecer, o A7 deve inserir um item propositalmente ruim para verificar se alguém percebe.

---

## Como sair da fila (o caminho para L2 e L3)

Um tipo de ação sai da aprovação obrigatória quando cumpre **os quatro**:

1. **30 execuções** aprovadas sem edição relevante.
2. **Zero incidente** naquele tipo de ação em 30 dias.
3. **Caso no `EVALS.md`** cobrindo o cenário, passando.
4. **Aprovação escrita do Rogério**, com o escopo exato e o teto diário.

Mesmo depois disso: **amostragem de 10% continua indo para a fila**, para sempre. Autonomia sem amostragem é autonomia sem termômetro.

---

Parte de [[../README|Squad OpenClaw Comercial]]
