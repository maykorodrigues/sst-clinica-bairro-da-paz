---
title: Playbook — Atendimento SST Card
tags: [sst, playbook, sst-card, atendimento, produto]
related: ["[[../agents/A3-vendas-closer]]", "[[../agents/A5-cs-sucesso-paciente]]", "[[../agents/A6-cobranca-relacionamento]]"]
criado: 2026-08-21
---

# Playbook — Atendimento SST Card

> Tudo que um agente pode dizer sobre o produto, e tudo que ele não pode. Este é o documento de verdade sobre o cartão.

---

## O que é o SST Card

Um **clube de benefícios de saúde** para trabalhadores informais e famílias de baixa renda, das regiões de Simões Filho e do Bairro da Paz, em Salvador.

**Não é plano de saúde. Não é convênio. Não é seguro.**

Essa distinção não é jurídica-formal — é a diferença entre um cliente satisfeito e um cliente que se sente enganado quando precisa de internação. Deixar isso ambíguo na venda é criar um cancelamento futuro com reclamação junto.

| Frase correta | Frase proibida |
|---|---|
| "É um clube de benefícios: você paga por mês e tem desconto em consulta, exame, e ainda telemedicina e auxílio funeral" | "É tipo um plano de saúde" |
| "Não cobre internação nem cirurgia. É pra consulta, exame e o dia a dia" | "Cobre tudo" |
| "Você continua pagando a consulta, mas bem mais barato" | "As consultas são de graça" |

---

## Preços — confirmados, podem ser ditos

| Plano | Valor | O que inclui |
|---|---|---|
| **Individual** | R$ 39,90/mês | Titular com todos os benefícios + **3 dependentes com acesso à saúde** |
| **Família Premium** | R$ 64,90/mês | **4 pessoas com todos os benefícios** |
| **Taxa de adesão** | R$ 35,00 | Por contrato, uma vez |

**Benefícios:** telemedicina · auxílio funeral · assistência veterinária · consultas e exames com custo reduzido na rede.

> Decisão de **02/06/2026**. Estes valores estão confirmados e podem ser informados livremente.

### O pitch âncora

> *"R$ 25 a mais e todo mundo da casa tem todos os benefícios."*

É o cross-sell mais natural do produto: quem entra no Individual pensando em si mesmo quase sempre tem família — e a diferença de R$ 25 entre os planos é menor do que a maioria imagina antes de ouvir.

---

## 🔴 Preços que NÃO podem ser ditos

**Consulta e exame por especialidade.** A tabela **não existe em versão aprovada**.

Pendente com o Rogério desde **02/07/2026** (C15), junto com a régua de desconto. Enquanto não sair:

| Situação | O que fazer |
|---|---|
| "Quanto custa a consulta de X?" | Qualificar (SPIN), depois escalar para humano dizer o valor |
| "Com o cartão sai por quanto?" | Idem. Não estimar, não dar faixa, não dizer "em torno de" |
| "O de vocês é mais barato que o da clínica Y?" | Não comparar preço que não se tem. Comparar o que o cartão inclui |

**Um valor inventado vira promessa da clínica.** Se o paciente chega esperando R$ 80 e a consulta é R$ 150, quem perde a credibilidade é a SST — não a IA.

> 📌 **Ao Rogério, com esse nome:** essa lacuna é o que mantém os agentes A2 e A3 em meia potência. Não é limitação técnica. É uma decisão de duas horas parada há mais de um mês.

---

## Como o cartão se usa

| Passo | O que a pessoa faz |
|---|---|
| 1 | Chega na clínica e informa que tem o SST Card |
| 2 | A recepção confirma o cadastro ativo |
| 3 | Paga o valor com desconto, presencialmente |
| 4 | Telemedicina, auxílio funeral e veterinário seguem canais próprios |

**Pagamento é presencial, na clínica.**

---

## Dependentes

| Plano | Regra |
|---|---|
| Individual | Titular tem todos os benefícios; até 3 dependentes com **acesso à saúde** |
| Família Premium | 4 pessoas com **todos** os benefícios |

**A diferença importa e precisa ser dita.** "Acesso à saúde" não é o mesmo que "todos os benefícios". Vender Individual dizendo que a família toda tem tudo é o tipo de mal-entendido que aparece no pior momento possível — quando a pessoa mais precisa.

Cadastro de dependentes tem formulário próprio no E-Chat (a refinar — C30).

---

## Cobrança e recorrência

| Item | Regra |
|---|---|
| Recorrência | Mensal |
| Transparência | **Explicar a cobrança recorrente na venda.** Sempre |
| Cancelamento | Direito do cliente. Registra-se sem barreira, com humano |
| Falha de cartão | Avisa e oferece atualização. **Não é inadimplência de intenção** |
| Atraso real | Ver `agents/A6-cobranca-relacionamento.md` |

**Nunca minimizar a recorrência na venda.** "É só R$ 39,90" sem dizer "todo mês" é o começo de uma reclamação.

---

## Perguntas frequentes

| Pergunta | Resposta |
|---|---|
| "Cobre internação?" | Não. É consulta, exame e o dia a dia |
| "Tem carência?" | `[FALTA: confirmar com a direção]` — não inventar |
| "Posso usar em outra cidade?" | Rede própria da SST. Telemedicina em qualquer lugar |
| "Se eu cancelar, perco a adesão?" | A taxa de adesão não é devolvida |
| "Quantos dependentes posso pôr?" | Ver tabela acima |
| "Atende criança?" | Sim, dentro das especialidades disponíveis |
| "É pra empresa?" | Existe modalidade corporativa. **Escalar** — é outro processo |
| "Como funciona o auxílio funeral?" | `[FALTA: confirmar detalhes de cobertura]` — escalar |

> As linhas com `[FALTA]` estão assim de propósito. Preencher com suposição é pior do que deixar em branco: em branco alguém pergunta; preenchido errado, alguém repete.

---

## Situações que exigem cuidado especial

| Situação | Como agir |
|---|---|
| Pessoa idosa, sozinha, contratando | Explicar devagar, confirmar entendimento, sugerir que alguém da família acompanhe |
| Pessoa comprando logo após diagnóstico | **Primeiro cuidar, depois conversar sobre o cartão.** Vender sob choque é abuso |
| Pessoa em dificuldade financeira declarada | Não empurrar. Oferecer o que cabe, ou nada |
| Pessoa achando que é plano de saúde | Corrigir com clareza, mesmo que perca a venda |
| Cliente que já foi inadimplente e quer voltar | Passa pelo A6 antes do A3 |

**A venda que se perde por honestidade é a única que não volta como problema.**

---

## O que nenhum agente pode fazer

- Prometer cobertura, carência ou benefício que não está aqui.
- Dizer preço de consulta ou exame.
- Conceder desconto ou isenção de adesão.
- Chamar de plano de saúde, convênio ou seguro.
- Vender para quem procurou a clínica com sintoma agudo.
- Minimizar a cobrança recorrente.
- Prometer médico específico ou prazo de agenda.

---

Parte de [[../README|Squad OpenClaw Comercial]]
