---
title: Cadência No-Show — Laboratório SST (n8n)
tags: [sst, n8n, automacao, laboratorio, noshow, aline]
aliases: [Cadência No-Show Lab, Recuperação No-Show SST]
related: [[briefing-madip-aline-29-04-2026]], [[perfil-aline-souza]], [[sessao-acompanhamento-aline-06-05-2026]]
criado: 2026-05-06
atualizado: 2026-05-06
---

# Cadência No-Show — Laboratório SST Clínica
**Implementa:** Mayko | **Ferramenta:** n8n + Evolution API + Google Sheets + Telegram
**Gatilho:** Paciente agendou exame/consulta no laboratório e não compareceu

---

## Por que existe esta cadência

No-show atual: **40%** dos pacientes que agendaram não comparecem.
Esses pacientes **já decidiram comprar** — gastaram energia para agendar.
O motivo do no-show quase sempre é prioridade, não desistência.
**Cada paciente no-show = dinheiro em cima da mesa que já foi trabalhado.**

Exemplo citado por Aline (06/05): orçamento de R$3.000 pode representar apenas 2–4 no-shows.
Resgatar 50% dos no-shows sem nenhum novo lead = +20% de faturamento.

---

## Dados de Configuração

| Parâmetro | Valor |
|---|---|
| Stack | n8n + Evolution API + Google Sheets + Telegram |
| Instância WhatsApp | SST Clínica (número do laboratório) |
| Responsável operacional | Aline Souza |
| Notificações | Telegram da Aline + grupo WhatsApp da operação |
| Horário de disparo | 9h00 — segunda a sábado |
| Limite diário | 80 mensagens (segurança da Evolution API) |

---

## Estrutura de Colunas — Google Sheets (aba "No-Show Lab")

| Coluna | Tipo | Exemplo | Obrigatório |
|---|---|---|---|
| `nome_paciente` | Texto | Maria da Silva | Sim |
| `whatsapp` | Texto | 5571999990000 | Sim |
| `exame_solicitado` | Texto | Ultrassom abdominal | Sim |
| `valor_orcamento` | Número | 280.00 | Sim |
| `data_agendamento` | Data | 2026-05-05 | Sim |
| `data_noshow` | Data | 2026-05-05 | Sim (preenchido quando não compareceu) |
| `status` | Texto | noshow / reagendado / convertido / descartado | Sim |
| `fase_cadencia` | Texto | D1 / D3 / D7 / D14 / encerrado | Sim |
| `data_ultimo_contato` | Data | 2026-05-06 | Sim |
| `respondeu` | Booleano | TRUE / FALSE | Sim |
| `log_disparo` | Texto | D1_enviado_06mai | Sim |
| `observacao` | Texto | "Disse que volta semana que vem" | Não |
| `quem_agendou` | Texto | Aline / Débora / Ilana | Sim |
| `nao_contatar` | Booleano | FALSE | Sim (TRUE = pular) |

> **Como preencher:** Aline ou Débora preenchem as colunas até `data_noshow` e `status = noshow` no mesmo dia do não comparecimento. O n8n cuida do resto.

---

## Fluxo n8n — Workflow "SST No-Show Lab"

### Trigger
- **Tipo:** Cron
- **Horário:** 9h00, segunda a sábado
- **Ação:** Ler Google Sheets aba "No-Show Lab"

---

### Nó 1 — Filtrar no-shows elegíveis
```
Condição:
  status = "noshow"
  AND nao_contatar != TRUE
  AND fase_cadencia != "encerrado"
  AND data_noshow <= hoje

Resultado: lista de pacientes a contatar
```

---

### Nó 2 — Calcular fase da cadência
```
dias_desde_noshow = hoje - data_noshow

SE dias_desde_noshow >= 1  AND fase_cadencia = ""    → fase = D1
SE dias_desde_noshow >= 3  AND fase_cadencia = "D1"  → fase = D3
SE dias_desde_noshow >= 7  AND fase_cadencia = "D3"  → fase = D7
SE dias_desde_noshow >= 14 AND fase_cadencia = "D7"  → fase = D14 (alerta humano)
SE dias_desde_noshow > 14  AND fase_cadencia = "D14" → fase = encerrado
```

---

### Nó 3 — Selecionar mensagem

Usar variáveis: `{{nome}}`, `{{exame}}`, `{{valor}}`

#### Mensagem D+1 (24h — primeiro contato)
```
Oi {{nome}}! Tudo bem? 😊

Sou a Aline, da SST Clínica.

Vi que você tinha um {{exame}} agendado aqui ontem 
mas acabou não conseguindo vir.

Sem problema — acontece! Queria só saber se tá tudo bem 
e se posso te ajudar a reagendar.

Tem um horário que funciona melhor pra você? 🗓️
```

---

#### Mensagem D+3 (72h — reforço de valor)
```
Oi {{nome}}! Aqui é a Aline, SST Clínica novamente. 🙂

Só passando para lembrar: você tinha um {{exame}} marcado 
aqui com a gente.

Esse exame é importante — atrasar pode deixar sem 
o diagnóstico que você precisa.

A gente consegue te encaixar ainda essa semana.
Qual horário funciona: manhã ou tarde?

Qualquer dúvida, me chama. 💪
```

---

#### Mensagem D+7 (7 dias — urgência + oferta)
```
{{nome}}, boa tarde!

Aqui é a Aline, da SST Clínica.

Faz uma semana que você tinha agendado o {{exame}} 
e ainda não conseguiu vir. Quero te ajudar a resolver isso.

Tenho uma condição especial para você reagendar ainda essa semana:
✅ Atendimento prioritário (sem fila)
✅ Parcela no cartão se precisar

É só me mandar um "quero reagendar" que eu resolvo agora. 😊
```

---

#### Alerta D+14 (14 dias — notificação humana, sem mensagem automática)
```
[NÃO ENVIAR MENSAGEM AUTOMÁTICA]

Ação: Notificar Aline no Telegram:

"🔔 No-show D+14: {{nome}}
Exame: {{exame}} | Valor: R${{valor}}
Agendou em: {{data_agendamento}}
Status: não respondeu em 2 semanas

👉 Ação: Fazer ligação pessoal hoje (13h–16h)"
```

---

### Nó 4 — Enviar via Evolution API
```json
POST /message/sendText
{
  "number": "{{whatsapp}}",
  "text": "{{mensagem_formatada}}",
  "delay": 1200
}

Limite: 80 mensagens/dia
Intervalo mínimo entre envios: 90 segundos
Não enviar para números com nao_contatar = TRUE
```

---

### Nó 5 — Atualizar Google Sheets
```
Após envio bem-sucedido:
  → fase_cadencia = fase atual (D1, D3, D7)
  → data_ultimo_contato = hoje
  → log_disparo = "D1_enviado_06mai" (exemplo)
```

---

### Nó 6 — Notificar Aline no Telegram (após cada envio)
```
Mensagem Telegram para Aline:

"📤 Mensagem {{fase}} enviada para {{nome}}
Exame: {{exame}} | Orçamento: R${{valor}}
Se responder, aparece no WhatsApp — trate em até 2h! ⚡"
```

---

### Nó 7 — Webhook de resposta (paciente respondeu)

Quando o paciente responder via WhatsApp (Evolution API → Chatwoot webhook):

```
Trigger: nova mensagem recebida no número da SST Lab

Ação:
  1. Identificar número na aba "No-Show Lab" por whatsapp
  2. SE encontrar:
     → Atualizar respondeu = TRUE
     → Notificar Aline no Telegram:
       "🔥 {{nome}} respondeu!
        Exame: {{exame}} | Orçamento: R${{valor}}
        👉 Abre o WhatsApp e fecha o reagendamento agora!"
  3. Parar cadência automática para esse paciente (não enviar próximos disparos)
```

---

### Nó 8 — Encerramento por status
```
SE status = "reagendado" → fase_cadencia = "encerrado" (sucesso)
SE status = "convertido"  → fase_cadencia = "encerrado" (sucesso)
SE status = "descartado"  → fase_cadencia = "encerrado" (sem potencial)
SE fase = D14 e não respondeu → fase_cadencia = "encerrado" (tentativa humana)
```

---

## Formulário de Diagnóstico IA (pré-qualificação antes da ligação)

> Usar em vez de ligar diretamente para no-shows que não responderam no D+3.
> Objetivo: qualificar quem está disponível para atender antes de Aline gastar tempo ligando.

### Como funciona

1. Após D+3 sem resposta, n8n envia link do formulário
2. Paciente preenche em 30 segundos
3. IA classifica urgência e disponibilidade
4. Aline só liga para quem sinalizou interesse

### Mensagem de envio do formulário (D+4, se D+3 sem resposta)
```
{{nome}}, pode me responder rapidinho uma coisa? 

Leva só 30 segundos e me ajuda a te atender melhor:
👉 [LINK DO FORMULÁRIO]

Qualquer hora você responde — sem compromisso! 😊
```

### Perguntas do formulário (Typeform / Google Forms)
```
1. Você ainda tem interesse em fazer o {{exame}}?
   ( ) Sim, quero reagendar
   ( ) Ainda não decidi
   ( ) Não tenho interesse mais

2. O que te impediu de vir na data agendada?
   ( ) Surgiu um imprevisto
   ( ) Esqueci
   ( ) Não tive dinheiro no momento
   ( ) Outro motivo

3. Qual o melhor horário para eu te ligar?
   ( ) Manhã (8h–12h)
   ( ) Tarde (13h–17h)
   ( ) Não precisa ligar — prefiro resolver pelo WhatsApp

4. Algum recado para a Aline?
   [Campo aberto]
```

### Ação após resposta do formulário
```
SE resposta 1 = "Sim, quero reagendar":
  → Notificar Aline: "🟢 {{nome}} quer reagendar — liga agora no horário que ele pediu!"
  → Marcar respondeu = TRUE no Sheets

SE resposta 1 = "Ainda não decidi":
  → Continuar cadência D+7 normalmente

SE resposta 1 = "Não tenho interesse":
  → Marcar status = "descartado" + fase_cadencia = "encerrado"
  → Não enviar mais mensagens
```

---

## Regras de Segurança

| Regra | Valor | Motivo |
|---|---|---|
| Limite de mensagens/dia | 80 | Evolution API suspende acima de 100 |
| Intervalo entre envios | 90 segundos | Anti-spam |
| Horário de disparo | 9h–11h | Melhor taxa de abertura |
| Nao_contatar = TRUE | Pular completamente | Respeito ao opt-out |
| Encerrar se respondeu | Imediato | Não enviar mais mensagens após resposta |
| Encerrar após D+14 | Automático | Não insistir indefinidamente |

---

## Teste antes de ativar em produção

1. Criar 4 linhas de teste no Sheets com números seus (D+0, D+1, D+3, D+7)
2. Rodar workflow manualmente (não pelo cron)
3. Confirmar que Telegram recebeu as notificações corretas
4. Confirmar que Sheets foi atualizado após envio
5. Simular resposta de um dos números → confirmar notificação de resposta no Telegram
6. Confirmar que o paciente que respondeu não recebeu mensagem posterior
7. Ativar cron apenas após todos os 6 passos validados

---

## Dashboard da Cadência (acompanhar semanalmente)

| Métrica | Como medir | Meta |
|---|---|---|
| No-shows registrados/semana | Sheets — linhas novas com status=noshow | Todos os do dia |
| Taxa de resposta D+1 | respondeu=TRUE ÷ total D+1 enviados | >30% |
| Taxa de reagendamento | status=reagendado ÷ total no-shows | >25% |
| Taxa de conversão final | status=convertido ÷ total no-shows | >15% |
| Receita recuperada | Soma valor_orcamento de convertidos | Referência semanal |

---

## Responsabilidades

| Tarefa | Responsável | Frequência |
|---|---|---|
| Preencher no-show no Sheets (nome, WA, exame, data) | Aline / Débora / Ilana | Diária — no mesmo dia do no-show |
| Responder pacientes que voltam no WhatsApp | Aline (13h–16h) | Diária |
| Ligar para D+14 (notificação Telegram) | Aline | Quando notificada |
| Revisar dashboard semanal | Mayko + Aline | Sexta-feira |
| Manutenção do workflow n8n | Mayko | Sob demanda |

---

## Ligação com outros documentos

- [[briefing-madip-aline-29-04-2026]] — Estratégia de conversão completa
- [[cartao-scripts-consulta-aline]] — Scripts de abordagem presencial
- [[cadencia-novos-membros]] — Onboarding após conversão
- [[sessao-acompanhamento-aline-06-05-2026]] — Reunião onde essa cadência foi definida
