---
title: Playbook — Passagem de IA para humano
tags: [sst, playbook, escalada, handoff, human-in-the-loop, lgpd]
related: ["[[../schemas/handoff.schema.json]]", "[[../agents/A1-atendimento-receptivo]]", "[[saude-da-comunicacao]]"]
criado: 2026-08-21
---

# Playbook — Passagem de IA para humano

> A operação mais importante de todo o sistema. **Uma IA que escala bem é infinitamente melhor que uma IA que resolve muito e erra pouco** — porque o pouco que ela erra, num contexto de saúde, é o que machuca.

---

## O princípio

> **Na dúvida, humano.**

Não existe custo de escalar demais que se compare ao custo de escalar de menos. Escalada excessiva gera trabalho; escalada faltante gera dano.

Se um agente hesita, a resposta já é humano.

---

## Os três tipos de escalada

| Tipo | Quando | Velocidade |
|---|---|---|
| **CRÍTICA** | Risco à pessoa ou risco jurídico | **Imediata** — fura a fila |
| **NORMAL** | Fora do escopo, precisa de decisão | Na fila, ≤ 2h |
| **PREVENTIVA** | Ainda dá para continuar, mas é melhor não | Na fila |

---

## Escalada crítica — para tudo

Sem tentar resolver, sem qualificar antes, sem "só um minutinho":

### Saúde

| Gatilho | Exemplo (fictício) |
|---|---|
| Dor ou sintoma | "estou com dor no peito", "febre há 3 dias" |
| Urgência declarada | "preciso hoje", "estou passando mal agora" |
| Sangramento, falta de ar, desmaio | qualquer menção |
| Gravidez com queixa | qualquer menção |
| Criança pequena doente, idoso acamado | qualquer menção |
| Resultado, laudo, exame | "o que significa esse resultado?" |
| Medicação | "posso tomar esse remédio?" |
| **Saúde mental em crise, autolesão** | qualquer menção |

### Jurídico e reputacional

| Gatilho |
|---|
| Procon, advogado, "vou processar" |
| Ameaça de exposição pública |
| Reclamação formal |
| Alegação de cobrança indevida |
| "Não foi isso que me venderam" |

### Humano

| Gatilho |
|---|
| Óbito, luto, acidente |
| Pessoa chorando ou em crise |
| Hostilidade, agressividade |
| Pedido explícito de falar com alguém |

---

## O caso mais delicado: saúde mental

Se surgir menção a autolesão, ideação suicida ou desespero:

1. **Escala imediatamente.** Nenhum agente conduz essa conversa.
2. **Não minimiza, não aconselha, não tenta acalmar.** "Vai passar", "pensa positivo", "você tem tanta coisa boa" — todos causam dano.
3. O **humano** orienta procurar atendimento presencial ou o **CVV — 188, ligação gratuita, 24 horas**.
4. Registra o encaminhamento, **sem detalhar conteúdo no vault**.

Esta é a única situação em que a velocidade importa mais do que qualquer outra regra do sistema.

---

## Escalada normal

| Situação | Agente reconhece e passa |
|---|---|
| Preço de consulta ou exame | Tabela não existe |
| Desconto ou negociação de valor | Régua não aprovada |
| Agendamento com data e hora | Klingo não integrado |
| Alteração de cadastro | Sempre humano |
| Cancelamento de contrato | Sempre humano |
| SST Card corporativo | Outro processo |
| Áudio ou imagem recebidos | Plataforma não transcreve nem lê |
| Terceira mensagem sem entender | Não force a quarta |

---

## Escalada preventiva

O agente **pode** continuar, mas é melhor não:

- Conversa emocionalmente carregada, mesmo sem crise.
- Pessoa idosa com dificuldade de acompanhar.
- Cliente que já reclamou antes.
- Assunto que mistura três temas ao mesmo tempo.
- Suspeita de que a pessoa entendeu errado algo importante.

---

## Como se escala — o texto para a pessoa

**Uma frase honesta, e a passagem acontece de verdade.**

| ✅ | ❌ |
|---|---|
| "Vou chamar alguém da equipe agora pra te ajudar com isso, tá bom?" | "Vou verificar e já te retorno" (e sumir) |
| "Isso aqui é melhor uma pessoa te explicar direitinho — só um instante" | "Não posso te ajudar com isso" |
| "Deixa eu passar você pra Karine, que resolve isso rapidinho" | "Isso está fora do meu escopo" |

**Nunca prometer prazo que não se controla.** "Ela te responde em 5 minutos" só se pode dizer se alguém garantiu.

---

## Como se escala — o que o humano recebe

Conforme `handoff.schema.json`. O essencial cabe em três linhas:

```text
QUEM E ......... contato novo, primeira vez no canal
O QUE QUER ..... consulta com [especialidade], pra ela mesma
ONDE PAROU ..... perguntou o preco; agente qualificou mas nao
                 informou valor (sem tabela aprovada)

JA PROMETIDO ... foi dito que alguem da equipe entra em contato
PROXIMA ACAO ... Karine informa o valor e propoe agendamento
URGENCIA ....... normal
```

**A pessoa não pode ter que repetir tudo.** Repetir a história é o que faz o atendimento automatizado parecer pior do que não ter atendimento nenhum.

---

## O que nunca acontece numa escalada

- ❌ A conversa fica órfã — sem dono, esperando.
- ❌ O humano recebe só "atende aí", sem contexto.
- ❌ O agente escala e **continua respondendo** por cima.
- ❌ O agente promete algo antes de escalar.
- ❌ Dado sensível vai junto no handoff. Vai o ID técnico, não o laudo.
- ❌ A escalada morre porque ninguém aceitou. **Handoff não aceito volta ao emissor** — nunca fica no limbo.

---

## Volta do humano para a IA

Acontece, mas com regra:

| Pode voltar | Não pode voltar |
|---|---|
| Dúvida operacional depois de resolvido o principal | Qualquer conversa que envolveu saúde |
| Follow-up combinado | Conversa que teve reclamação |
| Régua de CS depois de uma venda | Cliente que pediu para falar só com pessoa |

**Uma vez escalada por risco clínico, a conversa não volta para IA nesse ciclo.**

---

## Quem recebe o quê

| Tipo | Dono | Substituto |
|---|---|---|
| Clínico e urgência | Equipe da clínica / Débora | Rogério |
| Comercial e preço | **Karine** | Lucas |
| Cobrança e financeiro | **Sabrina** | Karine |
| Suporte e cadastro | **Lucas** | Karine |
| Reclamação e jurídico | **Mayko** → Rogério | — |
| Fornecedor (EAS) | **Lucas** | Mayko |

Fora do horário comercial: registra, marca como pendente e avisa na abertura. **Não deixa a pessoa achando que alguém está a caminho às 23h.**

---

## Métricas

| Métrica | Meta |
|---|---|
| Escalada clínica correta | **100%** — verificação total, não amostral |
| Handoff aceito | 100% |
| Handoff órfão > 30 min | **0** |
| Pessoa teve que repetir a história | ≤ 10% |
| Escalada desnecessária | ≤ 20% — **e isso é aceitável** |
| Escalada faltante | **0** — falha crítica |

> Escalar demais custa tempo. Escalar de menos custa uma pessoa. **A assimetria é o ponto**, e é por isso que a meta de escalada desnecessária é generosa e a de escalada faltante é zero.

---

Parte de [[../README|Squad OpenClaw Comercial]]
