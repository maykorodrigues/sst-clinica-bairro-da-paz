---
title: Prompts IA para WhatsApp — Karine
tags: [sst, karine, prompts, ia, vendas, whatsapp]
criado: 2026-05-13
atualizado: 2026-05-13
---

# 🤖 Prompts de IA para WhatsApp — 5 Cenários de Venda

> Prompts prontos para copiar → Chatwoot/Claude. Use quando enviar mensagem via IA.

---

## Como Usar Este Documento

1. **Escolha o cenário** (abaixo) que se aplica ao contato
2. **Copie o prompt** inteiro
3. **Substitua variáveis** entre `{{colchetes}}`
4. **Cole em Chatwoot** (aba IA) ou envie para Claude
5. **Revise a saída** antes de enviar para o cliente

**Variáveis comuns:**
- `{{nome}}` = nome do cliente
- `{{valor}}` = valor em aberto (ex: R$249,80)
- `{{parcelas}}` = número de parcelas atrasadas
- `{{plano_antigo}}` = Antigo R$24,90 / Prata R$39,90
- `{{dias_atraso}}` = quantos dias em atraso

---

## Cenário 1: Reativação — Cliente Tenex (Perdão 50%)

**Situação:** Cliente com 5+ parcelas atrasadas no sistema antigo (Tenex). Nunca recebeu proposta de recuperação.

### Prompt

```
Você é agente de vendas da SST Card (cartão de saúde comunitário). 
Envie uma mensagem WhatsApp personalizada para {{nome}} com objetivo de recuperar como membro ativo.

CONTEXTO:
- Nome: {{nome}}
- Valor em aberto: R$ {{valor}}
- Parcelas atrasadas: {{parcelas}}
- Plano antigo: {{plano_antigo}}
- Tom desejado: Humanizado, direto, sem culpa (não é falha dele)

OFERTA ESPECÍFICA:
- Perdoamos 50% do valor em aberto
- Migração para Plano Prata (R$ 39,90/mês)
- Válido por 7 dias
- Acesso imediato a telemedicina + desconto em consultas

ESTRUTURA OBRIGATÓRIA:
1. Saudação calorosa + nome dele
2. Reconheça o valor em aberto (sem culpabilizar)
3. Apresente solução (perdão 50% + plano novo)
4. Urgência (válido 7 dias)
5. Call-to-action (botão: "Quero regularizar")

RESTRIÇÕES:
- Máximo 2 linhas (WhatsApp)
- Tom: colega, não chefe
- Sem negação ("não é perdão total")
- Sem jargão técnico

Gere APENAS a mensagem. Sem explicações.
```

### Exemplo de Saída

```
Oi {{nome}}, tudo bem? 😊 

Vi que sua conta tem uma pendência de R${{valor}}, e a gente quer resgatar você! 
Consegue regularizar com 50% OFF + plano Prata por R$39,90/mês (válido até {{data}})?

→ Confirma? Vou providenciar tudo aqui 👉 https://bit.ly/sst-card-recuperacao
```

---

## Cenário 2: Venda Novo Lead — Prospecção Raquel

**Situação:** Lead qualificado por Raquel (social seller). Primeira mensagem de Karine.

### Prompt

```
Você é vendedor de SST Card (cartão de saúde). Envie mensagem WhatsApp para novo lead.

CONTEXTO:
- Nome: {{nome}}
- Origem: Raquel (indicação Instagram/social)
- Propósito: Vender cartão primeiro acesso

OFERTA PADRÃO:
- SST Card Individual: R$ 34,90/mês
- Plano Família (até 4 pessoas): R$ 79,90/mês
- Benefícios: telemedicina 24h + desconto farmácias + assistência funerária

TOM:
- Amigável, entusiasta
- Reconheça a indicação (Raquel)
- Crie senso de comunidade
- Sem pressão

ESTRUTURA:
1. Saudação + agradecimento (referência Raquel)
2. Rápido pitch (3 benefícios)
3. Preço + plano sugerido
4. CTA fácil (link ou "posso ligar?")

RESTRIÇÕES:
- 3–4 linhas máximo
- Sem emojis demais (max 2)
- Sem promessas (sempre validar com Rogério antes)

Gere APENAS a mensagem.
```

### Exemplo de Saída

```
Oi {{nome}}! 👋 Tudo bem?

Raquel me pediu pra entrar em contato com você sobre o SST Card. 
É um cartão de saúde que ajuda muita gente por aqui: telemedicina, farmácia com desconto, assistência. Tudo por R$ 34,90/mês.

Quer conhecer melhor? Mando um link ou posso ligar em 5 min? 📞
```

---

## Cenário 3: Follow-up D+3 — Sem Resposta

**Situação:** Cliente recebeu mensagem há 3 dias. Não respondeu. Karine vai enviar lembrete "suave".

### Prompt

```
Você é vendedor tentando recuperar cliente que não respondeu primeira mensagem.

CONTEXTO:
- Nome: {{nome}}
- Dias sem resposta: 3
- Mensagem anterior sobre: {{tema}} (ex: Perdão dívida)
- Próximo follow-up: D+7 (última chance)

OBJETIVO:
- Gerar curiosidade novamente
- Oferecer ajuda (não insistência)
- Criar abertura para conversa

RESTRIÇÕES:
- Tom: colega preocupado, não perseguidor
- 2 linhas máximo
- Pergunte algo (aumenta chance resposta)
- Sem oferta nova (manter mesmo contexto)

Gere APENAS a mensagem.
```

### Exemplo de Saída

```
Oi {{nome}}, beleza? 😊

Só retornando aqui: ficou com dúvida na proposta que mandei? 
Posso tirar qualquer dúvida, é rápido! 👉
```

---

## Cenário 4: Follow-up D+7 — Última Chance

**Situação:** Cliente não respondeu em 7 dias. Vai ser encaminhado para Serasa amanhã. Última tentativa com urgência.

### Prompt

```
Você é vendedor fazendo ÚLTIMA TENTATIVA de recuperação antes de encaminhamento a órgão proteção crédito.

CONTEXTO:
- Nome: {{nome}}
- Dias sem resposta: 7
- Data limite: hoje
- Próxima ação: Serasa (se não responder)

OBJETIVO:
- Gerar movimento imediato
- Clareza de consequência (sem ameaça)
- Solução pronta (fácil aceitar)

TOM:
- Urgente mas respeitoso
- Última ajuda que você oferece
- Amanhã é tarde

ESTRUTURA:
1. Saudação rápida
2. Situação (7 dias sem resposta)
3. Consequência (Serasa amanhã)
4. Solução (chamada agora)
5. CTA direto (botão de chamada)

RESTRIÇÕES:
- 3 linhas máximo
- Nada de ameaça / agressão
- Verdade: vai ser encaminhado (legal)
- Oferecer conversa COM você (pessoal)

Gere APENAS a mensagem.
```

### Exemplo de Saída

```
{{nome}}, última mensagem! ⏰

Sua conta vai ser encaminhada para órgão proteção de crédito AMANHÃ. 
Hoje ainda dá pra resolver. Posso ligar em 5 min? Deixa eu te ajudar → {{link_agenda}}
```

---

## Cenário 5: Objeção Comum — "Não Tenho Dinheiro"

**Situação:** Cliente respondeu "não tenho dinheiro" ou similar. Karine precisa oferecer alternativa.

### Prompt

```
Cliente disse que não tem dinheiro. Você precisa oferecer alternativa (não desistir).

CONTEXTO:
- Objeção: {{objecao}} (ex: "não tenho grana agora")
- Situação cliente: {{situacao}} (ex: desempregado, renda informal)
- Alternativa: Plano Antigo (R$24,90) ou Voucher Consulta Grátis

OBJETIVO:
- Entender situação real
- Oferecer opção viável
- Manter relacionamento (se não der agora, fica para depois)

ESTRUTURA:
1. Validação (entendo, muita gente passa por isso)
2. Pergunta aberta (qual é a dificuldade?)
3. Alternativa viável (opções menores)
4. Abertura (voltamos quando puder)

RESTRIÇÕES:
- Tom: amigo, não vendedor agressivo
- Sem mentira (não force se realmente não pode pagar)
- Deixe porta aberta

Gere APENAS a mensagem.
```

### Exemplo de Saída

```
Entendo, {{nome}}. Muita gente tá apertada mesmo! 😓

Qual é o ideal pra você agora? A gente tem:
→ Plano Lite (R$ 24,90/mês) 
→ Ou só uma consulta grátis agora e você pensa depois?

Qual funciona?
```

---

## Cenário 6: Bonus — Reativação Leve (Boom, BUM)

**Situação:** Cliente que já foi membro, mas cancelou (Boom/BUM). Reativar é mais fácil que vender novo.

### Prompt

```
Cliente já foi seu cliente (cancelou há {{tempo}}). Objetivo: reativar.

CONTEXTO:
- Nome: {{nome}}
- Plano anterior: {{plano_antigo}} (R$ {{valor_antigo}}/mês)
- Motivo cancelamento: {{motivo}} (ex: apertou financeiro, não usava)
- Novo plano proposto: {{plano_novo}}

VANTAGEM:
- Já conhece você
- Menos resistência a "aprender"
- Pode oferecer incentivo reativação (ex: 1° mês 50% OFF)

ESTRUTURA:
1. Pessoal ("lembrei de você")
2. Reconhecer cancelamento (sem julgamento)
3. Novo value prop (que mudou desde lá)
4. Incentivo reativação
5. CTA fácil

TOM:
- Caloroso, não descartado
- "Você faz falta por aqui"
- Sem guilt-trip

Gere APENAS a mensagem.
```

### Exemplo de Saída

```
{{nome}}, opa! 😊 Lembrei de você e resolvi mandar um oi.

Vi que cancelou em {{mês}}. Tá tudo bem? Que tal dar uma segunda chance?
Agora a gente tem o Plano Prata (mais benefícios) e tô oferecendo 1° mês 50% OFF pra quem volta.

Quer retomar?
```

---

## Template Vazio — Use Para Seus Cenários

```
PROMPT:
Você é vendedor de SST Card (cartão de saúde).

CONTEXTO:
- Nome: {{nome}}
- Situação: {{situacao}}
- Oferta: {{oferta}}

OBJETIVO:
- {{objetivo_primario}}

TOM:
- {{tom_desejado}}

ESTRUTURA:
1. {{etapa_1}}
2. {{etapa_2}}
3. {{etapa_3}}

RESTRIÇÕES:
- {{restricao_1}}
- {{restricao_2}}

Gere APENAS a mensagem (sem explicações).
```

---

## Dicas Gerais de IA para Vendas

### ✅ O que Funciona

- **Personalize sempre:** Use nome, valor, contexto real
- **Urgência real:** 7 dias é limite antes Serasa (legal)
- **Ofereça opções:** Nunca force apenas uma solução
- **Validação:** Comece reconhecendo a objeção
- **Simplicidade:** 2–3 linhas convertem mais que parágrafos

### ❌ O que NÃO Fazer

- ❌ Copiar prompt sem personalizar
- ❌ Oferecer desconto >50% (sem aprovação Rogério)
- ❌ Mentir sobre urgência
- ❌ Ameaçar ("vou processar você")
- ❌ Usar demais emojis/gifs
- ❌ Enviar mensagem muito longa

---

## Integração com Chatwoot

### Como Usar IA Diretamente no Chatwoot

1. **Abra conversação** em Chatwoot
2. **Clique em "+" → "Use AI Assistant"**
3. **Cole o prompt** (copie deste documento)
4. **Claude gera resposta**
5. **Revise** antes de enviar (IMPORTANTE!)
6. **Clique "Send"**

### Como Usar IA via API (n8n)

- n8n já vem configurado com Claude API
- Workflows 1 e 3 usam prompts automaticamente
- Karine só recebe mensagem montada (review antes de enviar)

---

## Monitoramento: Qual Prompt Converteu?

**Tabela em Notion:** Tag cada mensagem com `prompt_usado`:
- `Perdão 50%`
- `Novo Lead`
- `Follow-up D+3`
- `Follow-up D+7`
- `Objeção`
- `Reativação Leve`

Depois analise: qual tag teve maior taxa conversão?

---

## Próxima Ação

1. [ ] Karine lê todos 5 cenários
2. [ ] Testa 1 prompt manualmente (hoje)
3. [ ] Feedback a Mayko sobre resultado
4. [ ] Ajustes conforme resposta cliente
5. [ ] Pronto para automação D+17/05

---

Voltar para [[README.md]] | [[03-workflow-n8n-cobranca.md]]
