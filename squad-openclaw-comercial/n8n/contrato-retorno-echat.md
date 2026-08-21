---
title: Contrato do endpoint de retorno do E-Chat (proposta para a EAS Systems)
tags: [sst, echat, endpoint, contrato, eassystems, inferido]
related: ["[[contrato-webhook-echat]]", "[[fila-aprovacao-humana]]", "[[blueprint-orquestracao-comercial]]"]
criado: 2026-08-21
confianca: INFERIDO — nenhum campo foi confirmado pela EAS
---

# Contrato do endpoint de retorno do E-Chat

> 🔴 **Status: INFERIDO.** Assim como o webhook de entrada, o endpoint de envio **não foi documentado pela EAS**. Este é o desenho pedido pelo Elieser em 14/08/2026, para servir de base à call técnica.

---

## O par que fecha o circuito

O webhook é o ouvido. Este endpoint é a boca.

```text
E-Chat --(webhook de saida)--> n8n --> OpenClaw --> n8n --(este endpoint)--> E-Chat --> paciente
```

**Sem os dois, não há automação — há relatório.** Com só o webhook, o sistema vê tudo e não faz nada. Isso ainda tem valor (alerta, painel, fila priorizada), mas não é o que foi prometido ao Rogério, e não deve ser vendido como se fosse.

---

## O que se está pedindo

Que o n8n consiga, **em nome da SST**, mandar uma mensagem dentro de uma conversa que já existe no E-Chat — para que ela apareça no histórico, no card e na tela do atendente como qualquer outra mensagem.

**A palavra-chave é "dentro".** Não se quer um canal paralelo. Se a mensagem sair por fora, o E-Chat deixa de ser a fonte da verdade e a SST volta ao problema que está tentando resolver.

---

## Proposta de contrato

### Enviar mensagem em conversa existente

```text
POST  {{ECHAT_API_BASE}}/conversas/{conversation_id}/mensagens
Authorization: Bearer {{ECHAT_API_TOKEN}}
Content-Type: application/json
```

```json
{
  "type": "text",
  "content": "Texto ja revisado e aprovado pela politica.",
  "sent_by": "automacao_sst",
  "external_id": "3f2a9c1e-7b4d-4e88-9a01-5c6d7e8f9a0b",
  "queue": "comercial"
}
```

| Campo | Para quê |
|---|---|
| `external_id` | **O mais importante.** É o `intent_id` do nosso lado. Serve de chave de idempotência: se a mesma requisição chegar duas vezes, o E-Chat deve devolver a mensagem já criada, **não criar outra** |
| `sent_by` | Deixa claro no histórico que foi automação, não uma pessoa. Transparência com a equipe e com o paciente |
| `queue` | Mantém o roteamento correto no CRM |

### Resposta esperada

```json
{
  "message_id": "msg_000",
  "conversation_id": "conv_000",
  "status": "enviada",
  "created_at": "2026-08-21T09:15:10-03:00",
  "duplicate": false
}
```

O campo `duplicate: true` quando o `external_id` já existia é o que impede mensagem repetida para o paciente. **É o pedido técnico mais importante deste documento.**

### Outras ações desejáveis

| Ação | Método proposto | Prioridade |
|---|---|---|
| Criar card no CRM | `POST /cards` | 🔴 Essencial |
| Atualizar campos do card | `PATCH /cards/{id}` | 🔴 Essencial |
| Mover card de etapa | `POST /cards/{id}/mover` | 🟡 Importante |
| Transferir para atendente humano | `POST /conversas/{id}/transferir` | 🔴 Essencial |
| Adicionar nota interna | `POST /conversas/{id}/notas` | 🟡 Importante |
| Enviar template aprovado | `POST /conversas/{id}/template` | 🟡 Importante |
| Consultar status de leitura | `GET /mensagens/{id}` | 🟢 Desejável |

**Se só uma coisa for possível:** transferir para humano. Parece contraintuitivo, mas é o que permite ligar o sistema com segurança — a IA detecta, e o humano resolve. Isso já é L1 funcionando e já reduz a fila.

### Limites que a SST se impõe (não precisa a EAS impor)

| Limite | Valor | Por quê |
|---|---|---|
| Máximo de mensagens automáticas por conversa/dia | 1 | Regra do squad, não do canal |
| Janela de envio | Horário comercial | Mensagem de madrugada é invasão |
| Teto diário global | Configurável, começa baixo | Erro em escala é o pior cenário |
| Envio a quem pediu opt-out | **Nunca** | Bloqueado antes de chegar aqui |

O n8n aplica esses limites **antes** de chamar o endpoint. Não é responsabilidade da EAS.

---

## Perguntas objetivas para a EAS

1. Existe endpoint para enviar mensagem em conversa existente? **Sim / Não / Precisa desenvolver**
2. Se existe, qual a autenticação — Bearer, API key, outro?
3. Existe campo de **idempotência** (`external_id` ou equivalente)? Se não, dá para incluir?
4. Dá para criar e atualizar card no CRM por API?
5. Dá para transferir uma conversa para atendente humano por API?
6. Há limite de requisições por minuto?
7. Isso está no contrato atual ou tem custo adicional?
8. O envio por API respeita a janela de 24 horas do WhatsApp, ou exige template?
   > 📌 Ponto em aberto desde 14/08: o Elieser afirmou que a janela *"não se perde"*, mas completou *"de uma forma ou de outra você vai ter que enviar um template"*. **São afirmações que se contradizem.** Precisa de resposta por escrito — é o C11.

---

## Sequência de teste proposta

Quando os dois contratos existirem, testar nesta ordem — **cada passo com um número da própria equipe, nunca com paciente real**:

| # | Teste | Passa se |
|---|---|---|
| 1 | Enviar uma mensagem simples | Aparece no histórico do E-Chat com marca de automação |
| 2 | Repetir a mesma requisição com o mesmo `external_id` | **Não** cria segunda mensagem |
| 3 | Enviar com token inválido | Rejeita com 401 |
| 4 | Enviar para conversa inexistente | Erro claro, não 200 silencioso |
| 5 | Transferir conversa para humano | Aparece na fila do atendente |
| 6 | Criar card com os 3 campos | Card visível no funil correto |
| 7 | Acionar o kill switch e tentar enviar | **Nada sai** |
| 8 | Simular E-Chat fora do ar | Vai para fila humana, **não troca de canal** |

**O teste 2 e o teste 7 são os que mais importam.** Falha no 2 significa mensagem duplicada para paciente. Falha no 7 significa que não há freio.

---

## Registro de confiança

| Afirmação | Confiança |
|---|---|
| A EAS precisa desenvolver a ponte de saída | **CONFIRMADO** — Elieser, 14/08/2026 |
| CRM, quadros, automações do CRM e disparo por template estão no contrato atual | **CONFIRMADO** — Elieser, 14/08/2026 |
| IA de atendimento e e-mail marketing têm custo extra | **CONFIRMADO** — Elieser, 14/08/2026 |
| Todos os endpoints, campos e códigos deste documento | **INFERIDO** — proposta nossa |
| Comportamento da janela de 24h por API | **DESCONHECIDO** — respostas contraditórias, C11 aberto |

---

Parte de [[../README|Squad OpenClaw Comercial]] · par: [[contrato-webhook-echat]]
