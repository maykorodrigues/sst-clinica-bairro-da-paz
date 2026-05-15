---
aliases: [Cadência Cobrança n8n SST, Automação Inadimplência]
tags: [sst, n8n, automacao, cobranca]
---

# 02 — Cadência de Cobrança Automatizada (n8n)
**Implementa:** Mayko | **Ferramenta:** n8n + Evolution API + Google Sheets

## Como usar em 60 segundos
Esse arquivo é o manual técnico para Mayko configurar a automação. Karine não precisa fazer nada depois que estiver rodando — só tratar as respostas que chegarem no WhatsApp.

---

## Estrutura de colunas necessárias no Google Sheets

| Coluna | Tipo | Exemplo | Obrigatório |
|---|---|---|---|
| `nome_membro` | Texto | João da Silva | Sim |
| `whatsapp` | Texto | 5571999990000 | Sim |
| `valor_mensalidade` | Número | 49.90 | Sim |
| `data_vencimento` | Data | 2026-04-01 | Sim |
| `status_pagamento` | Texto | vencido / em_dia / pago / renegociado | Sim |
| `fase_cobranca` | Texto | D3 / D7 / D15 / encerrado | Sim |
| `data_ultimo_contato` | Data | 2026-04-05 | Sim |
| `canal_contato` | Texto | whatsapp / ligacao / presencial | Sim |
| `log_disparo` | Texto | D3_enviado_16abr | Sim |

---

## Fluxo n8n — Workflow "SST Cobrança Automática"

### Trigger
- **Tipo:** Cron
- **Horário:** 9h00, de segunda a sábado
- **Ação:** Ler Google Sheets aba "Cobranças"

### Nó 1 — Filtrar inadimplentes elegíveis
```
Condição: status_pagamento = "vencido"
AND data_vencimento < hoje
AND fase_cobranca != "encerrado"
Resultado: lista de registros elegíveis
```

### Nó 2 — Calcular fase da cobrança
```
dias_atraso = hoje - data_vencimento

SE dias_atraso >= 3 AND fase_cobranca = "" → fase = D3
SE dias_atraso >= 7 AND fase_cobranca = "D3" → fase = D7
SE dias_atraso >= 15 AND fase_cobranca = "D7" → fase = D15
SE dias_atraso > 15 AND fase_cobranca = "D15" → fase = encerrado (escalar para Karine)
```

### Nó 3 — Selecionar mensagem correta
```
SE fase = D3 → usar template "script-cobranca-mensalidade.md" → Variante A D+3
SE fase = D7 → usar template D+7
SE fase = D15 → usar template D+15
Substituir {{nome_membro}} e {{valor_mensalidade}} com dados do registro
```

### Nó 4 — Enviar via Evolution API
```
Endpoint: POST /message/sendText
Body:
{
  "number": "{{whatsapp}}",
  "text": "{{mensagem_formatada}}",
  "delay": 1200
}
Limite: máximo 100 mensagens/dia para não suspender o número
Intervalo entre mensagens: mínimo 60 segundos
```

### Nó 5 — Atualizar Google Sheets
```
Após envio bem-sucedido:
- Atualizar coluna fase_cobranca com fase atual
- Atualizar data_ultimo_contato com data de hoje
- Atualizar log_disparo com "D3_enviado_16abr" (exemplo)
```

### Nó 6 — Registrar no Notion
```
Database: "Ações & Chamados SST"
Novo registro:
- Tipo: cobrança automática
- Membro: nome_membro
- Fase: D3/D7/D15
- Data: hoje
- Status: enviado
```

### Nó 7 — Aguardar e verificar pagamento
```
Após D+3: verificar em 4 dias se status_pagamento mudou para "pago"
SE pagou → encerrar cadência (fase = "encerrado", status = "pago")
SE não pagou → aguardar até D+7 e disparar próxima fase
```

---

## Regras de segurança do workflow

- **Limite diário:** 100 mensagens (Evolution API pode suspender números acima disso)
- **Horário de disparo:** 9h–11h (máxima taxa de abertura em WhatsApp)
- **Cooldown entre mensagens:** mínimo 60 segundos por envio
- **Blacklist:** criar coluna `nao_contatar` no Sheets — se = TRUE, pular o registro
- **Erro handling:** se Evolution API retornar erro, registrar no Notion + notificar Karine via Telegram

---

## Teste antes de ativar em produção

1. Criar 3 registros de teste no Sheets com números próprios
2. Simular datas de vencimento com 3, 7 e 15 dias atrás
3. Rodar o workflow manualmente (não pelo cron)
4. Confirmar que os 3 números receberam as mensagens corretas
5. Verificar que o Notion registrou os 3 disparos
6. Só então ativar o cron para produção
