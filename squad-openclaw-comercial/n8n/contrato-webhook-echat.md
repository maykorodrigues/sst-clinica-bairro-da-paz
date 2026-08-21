---
title: Contrato do webhook de saída do E-Chat (proposta para a EAS Systems)
tags: [sst, echat, webhook, contrato, eassystems, inferido]
related: ["[[contrato-retorno-echat]]", "[[blueprint-orquestracao-comercial]]", "[[../../openclaw-sst/COMPROMISSOS-ATIVOS]]"]
criado: 2026-08-21
confianca: INFERIDO — nenhum campo foi confirmado pela EAS
---

# Contrato do webhook de saída do E-Chat

> 🔴 **Status: INFERIDO.** A EAS Systems **não entregou documentação de API**. Em 14/08/2026 o Elieser respondeu que o webhook de saída *"não existe pronto"* e que *"talvez precise um pequeno desenvolvimento"* — e pediu que o Mayko **desenhe o fluxo** e abra uma call técnica separada.
>
> **Este documento é esse desenho.** Nada aqui é afirmação sobre como o E-Chat funciona. É uma proposta de contrato, escrita para ser ajustada pela EAS.

---

## O que se está pedindo, em uma frase

Que o E-Chat **avise um endereço nosso** toda vez que algo relevante acontecer numa conversa — como um sino, não como uma cópia do banco de dados.

---

## Por que isso importa para a SST (e não é capricho técnico)

Sem webhook, toda automação depende de alguém olhar a tela. Com webhook:

| Hoje | Com webhook |
|---|---|
| 145 chamadas/dia, ~16 atendidas | Mensagem sem resposta em 5 min dispara alerta |
| 69 levantadas de mão perdidas num dia | Cada uma vira card com dono |
| Cobrança em número reserva, fora do CRM | Todo contato registrado no mesmo lugar |
| Ninguém sabe quantas conversas fecharam por inatividade | Relatório automático |

**O webhook é o item que destrava tudo o mais.** Ele é o C21 do `COMPROMISSOS-ATIVOS.md`.

---

## Proposta de contrato

### Endereço de destino (nosso lado — pronto quando a EAS quiser testar)

```text
POST  https://{{HOST_N8N_SST}}/webhook/echat/evento
Content-Type: application/json
```

`{{HOST_N8N_SST}}` é fornecido pelo Mayko na hora do teste, junto com o segredo. **O segredo não circula em grupo de WhatsApp** — vai por canal privado direto ao responsável técnico da EAS.

### Autenticação — três opções, da preferida para a aceitável

| # | Método | Como funciona | Preferência |
|---|---|---|---|
| 1 | **HMAC SHA-256** | Header `X-Echat-Signature` com o corpo assinado por um segredo compartilhado | ✅ Preferida |
| 2 | **Token estático** | Header `X-Echat-Token` com valor fixo, rotacionável | 🟡 Aceitável |
| 3 | **Basic Auth** | Usuário e senha no header | 🟡 Aceitável |

Qualquer uma serve. **Sem nenhuma, não serve** — endpoint aberto na internet recebendo evento de paciente é risco de LGPD para a SST e para a EAS.

### Eventos que interessam

| Evento | Quando dispara | Prioridade |
|---|---|---|
| `mensagem.recebida` | Cliente escreve no WhatsApp ou Instagram | 🔴 Essencial |
| `mensagem.enviada` | Atendente ou sistema responde | 🔴 Essencial |
| `conversa.aberta` | Nova conversa iniciada | 🔴 Essencial |
| `conversa.fechada` | Encerrada por atendente ou por inatividade | 🔴 Essencial |
| `card.criado` | Novo card no CRM | 🟡 Importante |
| `card.movido` | Mudou de etapa no funil | 🟡 Importante |
| `atendimento.transferido` | Passou para outro atendente ou fila | 🟢 Desejável |
| `template.enviado` | Disparo ativo por template | 🟢 Desejável |

**Se só um evento for possível de início:** `mensagem.recebida`. Com ele sozinho já se resolve o maior problema — ninguém ficar sem resposta.

### Corpo do evento — proposta

```json
{
  "event_id": "evt_0000000001",
  "event_type": "mensagem.recebida",
  "occurred_at": "2026-08-21T09:14:03-03:00",
  "instance": "sstclinica",
  "channel": {
    "type": "whatsapp_oficial",
    "id": "canal_000",
    "label": "SST Clinica - numero principal"
  },
  "conversation": {
    "id": "conv_000",
    "status": "aberta",
    "assigned_to": null,
    "queue": "comercial"
  },
  "contact": {
    "id": "cont_000",
    "display_name": "Contato de exemplo",
    "is_new": true
  },
  "message": {
    "id": "msg_000",
    "direction": "inbound",
    "type": "text",
    "has_media": false,
    "preview": "texto curto ou vazio, conforme a politica de privacidade acordada"
  },
  "card": {
    "id": "card_000",
    "stage": "novo",
    "board": "comercial"
  }
}
```

> Todos os valores acima são **fictícios e ilustrativos**. Não representam dados reais da SST.

### O que **não** deve vir no webhook

Pedido explícito, por proteção mútua:

- **Conteúdo integral de mensagem com informação de saúde.** O campo `preview` pode vir **vazio** — a SST prefere assim. O ID basta para buscar o necessário depois, com base legal.
- CPF, RG, cartão SUS, dados de pagamento.
- Anexos, imagens de exame, documentos.

Dado de saúde é dado pessoal sensível (LGPD, art. 5º, II) e exige base legal específica (art. 11). Quanto menos trafega, menor o risco — **para a clínica e para a EAS**.

### Comportamento esperado

| Item | Proposta |
|---|---|
| **Retentativa** | 3 tentativas com espera crescente (1min, 5min, 15min) se a resposta não for 2xx |
| **Timeout** | 10 segundos é suficiente — respondemos 200 imediatamente e processamos depois |
| **Ordem** | Não é necessário garantir ordem; usamos `occurred_at` |
| **Duplicata** | Pode acontecer. Deduplicamos por `event_id` — só precisamos que o `event_id` seja **estável** |
| **Volume** | Estimativa: 150–400 eventos/dia hoje |

---

## Perguntas objetivas para a EAS

Escritas para receber **sim/não/número**, não texto longo:

1. O E-Chat consegue chamar uma URL nossa quando chega mensagem? **Sim / Não / Precisa desenvolver**
2. Se precisa desenvolver: qual o esforço e o prazo estimado?
3. Isso está no contrato atual ou tem custo adicional? Se tem, **quanto**?
4. Qual método de autenticação a EAS prefere — HMAC, token ou basic?
5. Os campos propostos existem no sistema ou os nomes são outros? **Pode devolver com os nomes reais** — adaptamos do nosso lado.
6. Dá para configurar por instância (só `sstclinica`) ou é global?
7. Existe painel para ver falhas de entrega do webhook?
8. Dá para começar com **um evento só** (`mensagem.recebida`) e ampliar depois?

> **Tom da conversa:** a EAS não está atrasada por má vontade. O E-Chat foi vendido como plataforma de atendimento, não como plataforma de integração. O pedido é uma extensão, e vale tratá-lo como projeto conjunto — inclusive porque, se funcionar aqui, vira produto para outros clientes deles.

---

## Alternativa se o webhook não for viável

Se a EAS disser que não dá, existe um plano B **inferior mas funcional**: *polling* — o n8n consulta a API do E-Chat a cada N minutos perguntando o que mudou.

| Aspecto | Webhook | Polling |
|---|---|---|
| Latência | Segundos | 1 a 5 minutos |
| Carga no servidor da EAS | Baixa | Alta, constante |
| Complexidade | Baixa | Média |
| Depende de | Desenvolvimento da EAS | Só de um endpoint de listagem já existente |

**Polling exige uma API de leitura**, que também ainda não foi confirmada. Se nem uma nem outra existir, a Fase 2 inteira fica refém de copiar e colar humano — e isso precisa ser dito ao Rogério com essas palavras, porque muda a expectativa de prazo e de retorno do investimento.

---

## Registro de confiança

| Afirmação | Confiança |
|---|---|
| O E-Chat roda a API oficial do WhatsApp na BM do Rogério | **CONFIRMADO** — call de 04/08/2026 |
| O E-Chat tem CRM com cards e funis | **CONFIRMADO** — em produção, testado em 18/08 |
| O E-Chat **não** tem webhook de saída pronto | **CONFIRMADO** — áudio do Elieser, 14/08/2026 |
| A IA do E-Chat não transcreve áudio nem lê imagem | **CONFIRMADO** — Elieser, 14/08/2026 |
| Os nomes de campo deste documento | **INFERIDO** — proposta nossa, zero fonte |
| A URL, o método e os headers | **INFERIDO** — proposta nossa |
| O volume de 150–400 eventos/dia | **INFERIDO** — estimado a partir de 145 chamadas/dia |

---

Parte de [[../README|Squad OpenClaw Comercial]] · complemento: [[contrato-retorno-echat]]
