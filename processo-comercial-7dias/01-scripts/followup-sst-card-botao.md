---
title: Follow-up SST Card — Quem clicou no botão "Quero o SST Card"
tags: [sst, whatsapp-api, follow-up, sst-card, #em-progresso]
criado: 2026-06-02
atualizado: 2026-06-02
---

# Follow-up: "💳 Quero o SST Card"

> **Trigger:** contato clicou no botão da campanha de pediatria.  
> **Objetivo:** qualificar o plano ideal e fechar a adesão.  
> **Quem executa:** Karine (manual) ou Typebot (automatizado).  
> **Janela:** dentro de 24h do clique — pode responder com texto livre.

---

## Fluxo em 4 passos

```
Passo 1 — Acolhimento + ancoragem (automático/imediato)
Passo 2 — Qualificação: tamanho da família (1 pergunta)
Passo 3 — Oferta do plano certo
Passo 4 — Fechamento
```

---

## PASSO 1 — Acolhimento (enviar imediatamente ao clicar)

```
Boa escolha! 😊

O SST Card dá desconto em consultas, exames 
e procedimentos — e você já viu hoje como funciona 
na prática.

Deixa eu te mostrar o plano certo pra sua família.

Você mora sozinho ou tem família?
```

**Botões Quick Reply:**
- 👤 Só eu
- 👨‍👩‍👧 Tenho família

---

## PASSO 2A — Se clicar "Só eu"

```
Perfeito. O plano Individual é feito pra você:

👤 *SST Card Individual*
✅ R$34,90/mês
✅ Consultas com desconto (como a de hoje)
✅ Exames laboratoriais
✅ Sem carência

Taxa de adesão: R$40,00 (única vez)

Na consulta de hoje você já economizou R$50. 
O cartão se paga no primeiro uso. 💡

Quer ativar agora?
```

**Botões:**
- ✅ Quero ativar
- ❓ Tenho uma dúvida

---

## PASSO 2B — Se clicar "Tenho família"

```
Quantas pessoas na sua família, incluindo você?
```

**Botões Quick Reply:**
- 👨‍👩‍👧 2 a 5 pessoas
- 👨‍👩‍👧‍👦 6 ou mais

---

## PASSO 3A — Família de 2 a 5 pessoas

```
Pra uma família de até 5 pessoas, o melhor plano é esse:

👨‍👩‍👧 *SST Card Família*
✅ R$65,00/mês (toda a família)
✅ Consultas com desconto pra todos
✅ Exames laboratoriais
✅ Sem carência

Dá menos de R$13 por pessoa.
Numa única consulta com pediatra já pagou o mês inteiro. 💡

Taxa de adesão: R$40,00 (única vez)

Quer ativar pra sua família?
```

**Botões:**
- ✅ Quero ativar
- ❓ Tenho uma dúvida

---

## PASSO 3B — Família de 6 ou mais

```
Pra famílias maiores, temos o plano estendido:

👨‍👩‍👧‍👦 *SST Card Família Estendida*
✅ R$109,90/mês (até 10 pessoas)
✅ Consultas com desconto pra todos
✅ Exames laboratoriais
✅ Sem carência

Menos de R$11 por pessoa por mês. 💡

Taxa de adesão: R$40,00 (única vez)

Quer ativar?
```

**Botões:**
- ✅ Quero ativar
- ❓ Tenho uma dúvida

---

## PASSO 4 — Fechamento (quem clicou "Quero ativar")

```
Ótimo! 🎉

Pra ativar seu SST Card, preciso só de:

1️⃣ Nome completo
2️⃣ CPF
3️⃣ Data de nascimento

Me manda aqui que eu já cadastro. 👇
```

> **Se for Karine atendendo:** após receber os dados, cadastrar no sistema e confirmar o pagamento da taxa de adesão (R$40,00) via Pix ou presencialmente.

---

## PASSO 4B — Fechamento alternativo (se quiser direcionar pro presencial)

```
Ótimo! 🎉

Você pode ativar de duas formas:

📲 *Agora pelo WhatsApp* — me manda nome, CPF e data de nascimento
🏥 *Na clínica amanhã* — já aproveita que você vai à consulta

Como prefere?
```

**Botões:**
- 📲 Pelo WhatsApp agora
- 🏥 Na clínica amanhã

---

## Tratamento de Dúvidas (quem clicou "Tenho uma dúvida")

### Dúvida mais comum 1 — "Onde posso usar?"

```
O SST Card funciona aqui na SST Clínica, 
com desconto em consultas, exames e procedimentos.

Tudo aqui perto, sem precisar de plano de saúde. 😊

Ficou mais claro? Quer ativar?
```

### Dúvida mais comum 2 — "Tem carência?"

```
Não tem carência nenhuma. ✅

Você ativa hoje e já usa amanhã.
Foi exatamente o que aconteceu na consulta de hoje.

Quer ativar?
```

### Dúvida mais comum 3 — "Posso cancelar?"

```
Pode, sem multa. É mensal.

Mas a maioria dos nossos clientes fica porque 
uma consulta já paga o mês inteiro.

Quer experimentar por 1 mês?
```

---

## Resumo dos Planos (referência rápida)

| Plano | Pessoas | Mensalidade | Adesão |
|---|---|---|---|
| Individual | 1 | R$34,90 | R$40,00 |
| Família | até 5 | R$65,00 | R$40,00 |
| Família Estendida | até 10 | R$109,90 | R$40,00 |

---

## Implementação

**Opção 1 — Manual (Karine):** usar este script como roteiro. Começar pelo Passo 1 assim que o contato clicar no botão.

**Opção 2 — Typebot:** importar este fluxo como bot de qualificação. Os passos 1–3 são automatizados; o Passo 4 (dados pessoais) pode transferir para atendimento humano no Chatwoot.

Referência: [[campanha-pediatria-50pct-03-06-2026]] | [[typebot-funis-clinica-madip]]
