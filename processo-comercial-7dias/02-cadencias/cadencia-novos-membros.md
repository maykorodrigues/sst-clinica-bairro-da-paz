---
aliases: [Cadência Novos Membros SST, Onboarding SST Card]
tags: [sst, cadencia, onboarding]
---

# 02 — Cadência de Novos Membros — Onboarding 30 Dias
**Responsável:** automação n8n + Karine (toques humanos) | **Janela:** primeiros 30 dias após adesão

## Como usar em 60 segundos
Todo novo membro entra automaticamente nessa cadência quando Karine marcar "ativo" no Sheets. O objetivo é fazer o membro usar o cartão pelo menos uma vez nos primeiros 30 dias — quem usa, renova. Quem não usa, cancela.

> **Dado crítico:** membro que agenda a primeira consulta dentro de 7 dias da adesão tem taxa de renovação >85%. Quem não usa nos primeiros 30 dias, churn em 60%. O onboarding não é formalidade — é a missão mais importante da semana.

---

## ONBOARDING DE URGÊNCIA — Primeiras 2 horas (obrigatório)

**Trigger:** Karine marca novo membro como "ativo" no Sheets
**Prazo:** mensagem de boas-vindas em até 2 horas do cadastro, sempre

> Oi {{nome_membro}}! Seja bem-vindo(a) à SST Card! 🎉
>
> Seu acesso já tá ativo — pode usar hoje mesmo. É só chegar na SST Clínica com seu CPF.
>
> Uma coisa: você tem alguma consulta ou exame que tá adiando? Porque você já pode marcar agora, de graça, com o cartão. Me fala aqui e eu já deixo reservado pra você ainda essa semana.

*[Meta: agendar a primeira consulta ainda nas primeiras 2 horas. Quem agenda, usa. Quem usa, renova.]*

**Se não responder em 2h:** Karine manda áudio pessoal (30 segundos, informal). Voz > texto para novos membros.

---

## Fluxo de onboarding (30 dias)

### D+0 — Boas-vindas estendidas (automação, imediato)
**Canal:** WhatsApp | **Quem envia:** automação

> Bem-vindo(a) à família SST Card, {{nome_membro}}! 🎉
>
> Seu cartão já tá ativo. Aqui vai o que você tem acesso:
> ✅ Consultas médicas incluídas
> ✅ Laboratório com desconto especial
> ✅ Exames de rotina
>
> Pra usar: é só vir na SST Clínica e apresentar o CPF. Simples assim.
> Qualquer dúvida, me chama aqui. Sou a Karine 😊

---

### D+3 — Primeira dica de uso
**Canal:** WhatsApp | **Quem envia:** automação

> Oi {{nome_membro}}! Karine aqui.
>
> Sabia que consulta de rotina é o melhor jeito de usar o SST Card? Muita gente deixa pra quando tá doente — mas o cartão foi feito pra antes disso.
>
> Você tem algum exame ou consulta atrasada? Posso te ajudar a agendar agora.

---

### D+7 — Convite para usar (urgência leve)
**Canal:** WhatsApp | **Quem envia:** automação

> {{nome_membro}}, já faz uma semana com seu SST Card! 🎊
>
> Você já usou algum serviço? Se não usou ainda, não perde tempo — marque uma consulta essa semana e já aproveita o que é seu.
>
> Agenda pelo WhatsApp: é só me chamar aqui.

---

### D+15 — Toque humano (Karine faz pessoalmente)
**Canal:** Ligação ou WhatsApp personalizado | **Quem envia:** Karine (manual)

> Oi {{nome_membro}}! Aqui é a Karine da SST. Só queria saber como tá indo com o SST Card. Você já usou algum serviço? Tem alguma dúvida ou algo que posso te ajudar?

*[Se não usou ainda: oferecer agendamento imediato na ligação. Se usou: pedir depoimento rápido para Raquel gravar]*

---

### D+25 — Alerta de renovação
**Canal:** WhatsApp | **Quem envia:** automação

> {{nome_membro}}, sua mensalidade do SST Card vence em 5 dias.
>
> Pra não perder o acesso, você pode:
> 💳 Pix: [chave]
> 💳 Débito: presencialmente
>
> Dúvida? Me chama que resolvo agora.

---

### D+30 — Check de satisfação
**Canal:** WhatsApp | **Quem envia:** automação

> {{nome_membro}}, um mês com o SST Card! 🥳
>
> Queria saber: de 1 a 5, qual nota você dá pra nossa clínica?
> Responde aqui com o número — leva 5 segundos e ajuda muito a gente.

*[Respostas 4–5: pedir indicação. Respostas 1–3: Karine trata manualmente para evitar cancelamento.]*

---

## Configuração no n8n

**Trigger:** Nova linha na aba "Membros Ativos" com status = "ativo"
**Ação imediata (≤ 2h):** Notificação para Karine no Telegram: "Novo membro: {{nome_membro}} — manda boas-vindas e agenda primeira consulta agora"
**Ações automáticas:** Fila de mensagens agendadas (D+0 em 2h, D+3, D+7, D+25, D+30)
**D+15:** Não automatizar — gerar alerta no Notion para Karine fazer manualmente
**Parar cadência se:** membro marcar status = "cancelado" ou "inadimplente"

> **Prioridade do onboarding:** O alerta de 2h para Karine é o nó mais crítico do workflow. Se Karine não conseguir atender em 2h (ex: turno ocupado no lab), configurar mensagem automática de boas-vindas como fallback — mas o agendamento da primeira consulta deve ser feito por Karine pessoalmente assim que possível.

---

## Métricas de onboarding

| Indicador | Meta | Como medir |
|---|---|---|
| Membros que usaram em 30 dias | ≥ 70% | Sheets aba "Uso" |
| Taxa de renovação no D+30 | ≥ 80% | Sheets aba "Membros" |
| NPS médio (D+30) | ≥ 4.0 | Sheets aba "NPS" |
| Cancelamentos no 1º mês | ≤ 10% | Sheets aba "Cancelados" |
