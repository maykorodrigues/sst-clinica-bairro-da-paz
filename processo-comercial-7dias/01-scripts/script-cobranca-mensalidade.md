---
aliases: [Script Cobrança SST, Mensalidade Inadimplente]
tags: [sst, script, cobranca]
---

# 01 — Script de Cobrança de Mensalidade
**Responsável:** Karine + automação n8n | **Cadência:** D+3 → D+7 → D+15

## Como usar em 60 segundos
Cada mensagem abaixo é para um momento diferente. Nunca mande a mesma mensagem duas vezes. O tom vai ficando mais direto conforme os dias passam. Variante A = texto. Variante B = roteiro para áudio.

---

## D+3 — Aviso amigável
*Tom: lembrete de amigo. Não menciona inadimplência. Abre pelo benefício.*

**Variante A — WhatsApp texto:**
> Oi {{nome_membro}}! 👋 Aqui é a Karine da SST Clínica.
> 
> Passou uns dias e percebi que a mensalidade de {{valor_mensalidade}} do seu SST Card ainda não foi identificada por aqui. Provavelmente foi só um esquecimento mesmo.
> 
> Quando você puder regularizar, é só me chamar aqui que a gente resolve rapidinho. Seu cartão tá ativo e a gente quer manter assim pra você! 😊

**Variante B — Roteiro para áudio (Karine grava):**
> "Oi {{nome_membro}}, tudo bem? Aqui é a Karine da SST. Passei aqui rapidinho porque não identifiquei o pagamento de {{valor_mensalidade}} do seu cartão esse mês. Deve ter sido esquecimento, acontece com todo mundo. Me manda uma mensagem quando puder e a gente resolve na hora. Um abraço!"

---

## D+7 — Urgência leve
*Tom: preocupação genuína. Menciona risco de perder acesso.*

**Variante A — WhatsApp texto:**
> Oi {{nome_membro}}, a Karine aqui da SST Clínica.
> 
> Queria te avisar com antecedência: sua mensalidade de {{valor_mensalidade}} tá em atraso há uma semana. Não quero que você perca acesso ao seu SST Card num momento que precisar.
> 
> Me fala uma coisa: você consegue regularizar essa semana? Se estiver apertado, a gente pode ver uma alternativa juntos.

**Variante B — Roteiro para áudio:**
> "{{nome_membro}}, oi! A Karine da SST. Olha, tô te ligando porque sua mensalidade já faz uma semana em aberto. Não quero que você fique sem acesso ao seu cartão. Me responde essa mensagem e a gente resolve do jeito que der pra você — tô aqui pra isso. Qualquer coisa, é só falar!"

---

## D+15 — Urgência real + alternativa de renegociação
*Tom: direto e humanizado. Oferece saída concreta.*

**Variante A — WhatsApp texto:**
> {{nome_membro}}, preciso falar com você sobre seu SST Card.
> 
> Sua mensalidade de {{valor_mensalidade}} tá em atraso há 15 dias. Se não conseguirmos resolver até essa sexta, o sistema vai suspender seu acesso automaticamente.
> 
> Mas antes disso acontecer, quero te oferecer uma opção: você pode pagar metade agora e o restante em 15 dias. Ou a gente pausa o plano por 30 dias sem multa.
> 
> Me chama aqui. Prefiro resolver isso junto do que perder você como membro.

**Variante B — Roteiro para áudio:**
> "{{nome_membro}}, aqui é a Karine da SST, e preciso de uma resposta sua hoje. Seu cartão tem 15 dias em atraso e corre risco de suspensão automática. Mas tenho duas opções pra te oferecer antes disso: metade agora e o resto em 15 dias, ou pausa de 30 dias sem multa. Me responde essa mensagem agora e eu resolvo. Conto com você."

---

## Regras de aplicação
- Nunca enviar D+7 antes de D+3
- Nunca repetir a mesma mensagem em dois toques
- D+15 só enviar se D+7 não obteve resposta
- Após pagamento: mandar mensagem de confirmação e encerrar a cadência
- Horário de disparo: entre 9h e 11h (melhor taxa de abertura)
