---
title: Blueprint da orquestração comercial no n8n
tags: [sst, n8n, blueprint, orquestracao, echat, openclaw]
related: ["[[contrato-webhook-echat]]", "[[contrato-retorno-echat]]", "[[fila-aprovacao-humana]]", "[[kill-switch-e-idempotencia]]", "[[../README]]"]
criado: 2026-08-21
status: desenho — nenhum workflow JSON gerado
---

# Blueprint da orquestração comercial no n8n

> ⚠️ **Nenhum workflow JSON foi criado neste pacote, de propósito.** O endpoint real do E-Chat **não está confirmado** (C21, aberto desde 04/08/2026). Gerar JSON com endpoint inventado produz um arquivo que parece pronto, não importa, e queima credibilidade com o fornecedor.
>
> Este blueprint é a **especificação** para quando o contrato existir. Com os contratos assinados, o JSON sai em horas.

---

## Por que o n8n e não o OpenClaw direto

Três razões, nesta ordem:

1. **Cofre.** Credencial mora no n8n, nunca no prompt, nunca no vault, nunca no runtime do modelo. O OpenClaw pode ser lido; o cofre não.
2. **Política.** Um modelo de linguagem pode ser convencido. Um nó de validação com `if` não pode. As regras duras — dry_run, aprovação, idempotência, kill switch — precisam viver em código determinístico.
3. **Auditoria.** O n8n registra execução, entrada, saída e erro. É o log que sobrevive quando alguém pergunta "quem mandou essa mensagem?".

---

## Os cinco fluxos

### F1 · Entrada — evento do E-Chat

```text
[Webhook: /echat/evento]
   -> Verifica assinatura/segredo do header
   -> Rejeita se origem nao confere            -> 401, log
   -> Deduplica por event_id (janela 24h)      -> 200 "ja processado"
   -> Minimiza payload (remove conteudo bruto) -> mantem so ID, tipo, canal, timestamp
   -> Classifica: precisa de cerebro?
        NAO -> registra e encerra
        SIM -> F2
```

**Regra de minimização:** o que sai do n8n em direção ao modelo é o **menor payload possível**. Nome completo, CPF, telefone, conteúdo clínico e anexo **não atravessam essa fronteira**. O agente trabalha com ID técnico e resumo estruturado.

### F2 · Consulta ao cérebro

```text
[F1] -> Monta contexto minimo
     -> Consulta OpenClaw (rede interna, nunca internet publica)
     -> Timeout de 30s
          estourou -> fila humana, sem reenvio automatico
     -> Recebe intencao JSON
     -> Valida contra intent.schema.json
          invalida -> rejeita, registra, NAO tenta corrigir
     -> F3
```

**Timeout não reenvia.** Reenvio automático de mensagem externa é como se produz mensagem duplicada para o paciente. Estourou, vai para humano.

### F3 · Política e decisão

```text
[F2] -> kill switch ativo?          -> PARA tudo, registra
     -> dry_run = true?             -> registra intencao, NAO executa, fim
     -> autonomy_level L0/L1?       -> forca dry_run, registra divergencia
     -> acao na allowlist?          -> se nao, rejeita
     -> intent_id ja executado?     -> bloqueia duplicata
     -> expires_at vencido?         -> rejeita
     -> approval.required = true?
           SIM -> F4 (fila humana)
           NAO -> F5 (executa)
```

Detalhe da validação em [[kill-switch-e-idempotencia]].

### F4 · Fila de aprovação humana

Ver [[fila-aprovacao-humana]]. Em resumo: a intenção vira item numa fila com prazo. Aprovou, vai para F5. Recusou, registra o motivo — **e o motivo alimenta o ajuste do prompt**. Expirou, morre e vira alerta.

### F5 · Execução e retorno

```text
[F3 ou F4 aprovado]
   -> Chama endpoint de envio do E-Chat        [ CONTRATO INFERIDO - ver contrato-retorno-echat.md ]
   -> Sucesso?
        SIM -> registra intent_id como executado (idempotencia)
            -> atualiza card no CRM
            -> registra metrica de saude
        NAO -> retry com backoff, ate 3 tentativas
            -> 3 falhas: fila humana + alerta, NUNCA troca de canal sozinho
```

**Falha não muda de canal.** Se o E-Chat estiver fora do ar, a operação vai para fila humana. Cair para Evolution/Chatwoot por conta própria seria trocar o canal oficial do paciente sem decisão registrada — proibido.

---

## Rotinas em cron (a implantar depois dos gates)

| Rotina | Horário | Fase mínima | O que faz |
|---|---|---|---|
| Fila priorizada do dia | 07h30, seg–sáb | L1 | A0 monta a fila; ninguém dispara nada |
| Resumo de cobrança | 07h30 | L1 | Separa **recorrente × ativo**, entrega à Sabrina |
| Detecção de conversa parada | 4×/dia | L1 | Marca > 24h sem resposta, sem tocar no cliente |
| Lembrete de compromisso | 08h30 e 17h30, seg–sex | **L2** | Lê `COMPROMISSOS-ATIVOS.md`, um toque por pessoa por dia |
| Régua de ativação CS | diário | **L2** | D+0 · D+7 · D+30 · D+90 |
| Painel de saúde da comunicação | 18h | L1 | Preenche `conversation-health.schema.json` |
| Auditoria do A7 | semanal | L1 | Amostra de 20 conversas |

**Nenhuma dessas rotinas liga hoje.** Todas dependem do C21 e da subida do OpenClaw.

---

## Variáveis de ambiente necessárias

Nomes apenas. **Valores vivem no cofre do n8n** — nunca neste arquivo, nunca no Git, nunca em chat.

| Variável | Para quê |
|---|---|
| `ECHAT_WEBHOOK_SECRET` | Validar assinatura do evento de entrada |
| `ECHAT_API_BASE` | Base do endpoint de envio |
| `ECHAT_API_TOKEN` | Autenticação de saída |
| `OPENCLAW_INTERNAL_URL` | Endereço do cérebro na rede interna |
| `OPENCLAW_INTERNAL_TOKEN` | Autenticação interna |
| `PAUSAR_DIRETOR_COMERCIAL` | Kill switch global |
| `NOTION_TOKEN` | Espelho executivo |
| `ALERTA_INTERNO_DESTINO` | Canal de alerta para Mayko/Lucas |
| `TETO_MENSAGENS_DIA` | Limite duro de envio por dia |
| `JANELA_HORARIO_COMERCIAL` | Faixa em que envio é permitido |

> 🔴 **Lembrete de 14/08/2026:** a chave da API da Anthropic para a IA do E-Chat continua pendente. A conta, o cartão e o saldo **já existem e estão ociosos** — falta gerar uma chave nomeada, com validade e teto, e entregar ao Lucas. Isso tira o Rogério do caminho crítico. Não é bloqueio de dinheiro; é bloqueio de duas pessoas achando que a bola está com a outra.

---

## Ordem de implantação

| # | Passo | Depende de |
|---|---|---|
| 1 | EAS confirma formato do webhook de saída | Elieser (C21) |
| 2 | EAS confirma endpoint de envio | Elieser (C21) |
| 3 | F1 em modo espelho — só registra, não responde | 1 |
| 4 | OpenClaw sobe na VPS e passa no `doctor` | Gates do `openclaw-sst/README.md` |
| 5 | F2 + F3 com `dry_run` forçado | 3, 4 |
| 6 | F4 (fila de aprovação) e teste de rejeição | 5 |
| 7 | F5 em um único tipo de ação, com aprovação humana | 6 + gate L2 |
| 8 | Expandir tipo a tipo, um por semana | 7 |

**Nunca pular do 3 para o 7.** É a tentação natural quando o cliente pressiona por resultado — e é como se produz uma mensagem errada para um paciente real.

---

## O que este blueprint não resolve

- **Áudio e imagem.** A IA do E-Chat não transcreve áudio nem lê imagem (Elieser, 14/08). Enquanto isso valer, esse conteúdo escala para humano — não há workaround seguro.
- **Klingo.** A agenda real ainda não está integrada; credenciais pendentes com a Débora. Sem Klingo, nenhum agente confirma data e hora.
- **Conversas sumidas.** O incidente relatado pela Karine em 14/08 (negociações que desapareceram do E-Chat) **não tem explicação até hoje** (C23). Automatizar sobre um sistema que perde conversa é construir sobre areia — exigir a explicação antes de escalar volume.

---

Parte de [[../README|Squad OpenClaw Comercial]]
