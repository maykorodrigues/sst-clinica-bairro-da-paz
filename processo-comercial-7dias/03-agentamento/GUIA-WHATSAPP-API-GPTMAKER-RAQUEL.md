---
title: Guia WhatsApp API Oficial via GPTMaker — SST Card (Raquel)
tags: [raquel, whatsapp-api, gptmaker, meta-business, ao-vivo]
aliases: [WhatsApp GPTMaker Setup, API WhatsApp Raquel]
criado: 2026-05-06
---

# 🚀 WhatsApp API Oficial no GPTMaker — Setup Ao Vivo
**Para:** Raquel (Marketing SST Card)  
**Com:** Mayko (Coach)  
**Session:** 06/05/2026 — Google Meet ao vivo  
**Duração esperada:** 15 min

---

## 🎯 O QUE VOCÊS VÃO FAZER

**Objetivo:** Conectar WhatsApp Business API oficial (Meta) no GPTMaker para:
1. Receber leads dos posts de Raquel (CTA → WhatsApp)
2. Responder automático inicial
3. Encaminhar para Karine com contexto

**Fluxo final:**
```
Post Instagram (Raquel)
    ↓
CTA "Envia ZAP" → WhatsApp
    ↓
GPTMaker recebe mensagem
    ↓
Responde automático: "Oi! Bem-vindo SST Card"
    ↓
Encaminha para Karine (WhatsApp ou Telegram)
```

---

## 📋 PASSO 1: Modal GPTMaker (3 min)

Vocês já estão nesta tela. Vejo o modal:

```
┌─────────────────────────────────────────┐
│  Criar canal Whatsapp Meta              │
│                                         │
│  Nome do Canal:                         │
│  [Escolha um nome para o canal]         │
│                                         │
│  Agente (Opcional):                     │
│  [Sem agente (resposta humana)]         │
│                                         │
│  [Criar novo canal]                     │
└─────────────────────────────────────────┘
```

### 1.1 Preencher Nome do Canal

**Campo:** "Nome do Canal"

**Cole isto:**
```
SST Card — Leads Raquel
```

**Por que?** Identifica qual canal é (para não confundir se tiverem mais canais depois)

### 1.2 Selecionar Agente

**Dropdown:** "Agente (Opcional)"

**Manter:** "Sem agente (resposta humana)"

**Por que?** Raquel vai responder manualmente agora. Depois (fase 2) podemos adicionar IA.

### 1.3 Criar Canal

Clicar: **"Criar novo canal"**

**Tempo esperado:** 30s para processar

---

## ✅ PASSO 2: Verificar Conexão Meta (5 min)

Depois que criar o canal, GPTMaker vai pedir permissões Meta.

### 2.1 Autorizar Meta Business

Você vai ver tela:
```
Conectando com Meta...
[Botão azul] "Fazer login com Meta"
```

**Ação:**
1. Clicar "Fazer login com Meta"
2. Usar conta de Rogério (o dono da página)
3. Verificar permissões solicitadas:
   - ✅ WhatsApp Business Account
   - ✅ Phone Number ID
   - ✅ Mensagens (envio/recebimento)
4. Clicar "Autorizar" / "Permitir"

### 2.2 Confirmar Número

GPTMaker vai mostrar:
```
Número conectado: +55 71 XXXX-XXXX
Status: ✅ Ativo
```

**Confirmar:** Este é o número de Raquel ou Karine? (para saber pra onde vão as mensagens)

---

## 🔗 PASSO 3: Conectar CTA dos Posts (3 min)

Agora que o canal está pronto, você precisa conectar os **CTAs dos posts** ao WhatsApp.

### 3.1 Copiar Link do Canal

Dentro do GPTMaker, o canal novo vai ter um link:

```
https://wa.me/[PHONE_NUMBER]?text=SST%20Card
```

**Copie este link** (GPTMaker deve fornecer)

### 3.2 Atualizar Todos os 5 Posts de Raquel

Voltar para **Meta Business Suite** (onde estão agendados os 5 posts).

Para cada post, editar o CTA:

**Antes:**
```
Tá interessado? Envia ZAP pra gente →
```

**Depois:**
```
Tá interessado? Envia ZAP pra gente → [LINK DO CANAL]
```

**Usar link completo:**
```
https://wa.me/[seu-numero]?text=SST%20Card%20—%20Quero%20saber%20mais
```

---

## ⚙️ PASSO 4: Setup Inicial no GPTMaker (4 min)

### 4.1 Criar Resposta Automática

No GPTMaker, clicar em **"SST Card — Leads Raquel"** → Ir para configurações

**Buscar:** "Mensagem de Boas-vindas" ou "Auto-reply"

**Colar isto:**
```
Oi! 👋 Bem-vindo ao SST Card!

Que bom que você se interessou! 💚

Sou a Raquel da equipe SST.

Pra você conhecer melhor nossa solução:
✅ R$1,20/dia (R$34,90/mês)
✅ Acesso 24h (sem fila)
✅ Clínicas aqui perto de você

Qual informação você quer?
1️⃣ Saber mais sobre benefícios
2️⃣ Ver clínicas próximas
3️⃣ Começar agora

Aguardo sua resposta! 🎯
```

### 4.2 Fila de Encaminhamento

**Buscar:** "Encaminhar para..." ou "Transferência"

**Configurar:**
- Quando: Qualquer mensagem não-respondida após 5 min
- Encaminhar para: Karine (+55 71 XXXX-XXXX) via Telegram OU no Blingo

**Por que?** Karine vê todos os leads chegando e responde com closings

---

## 📊 PASSO 5: Integração com Funil (rastreamento)

### 5.1 Rastrear Origem do Lead

**No Blingo (ou sua ferramenta de CRM):**

Adicionar campo "Canal de origem":
- [ ] Instagram (qual post?)
- [ ] WhatsApp direto
- [ ] Indicação
- [ ] Outro

**Usar:** Campo "Nota" para registrar qual post gerou (ex: "Veio do Reel Segunda - Dor/Fila")

### 5.2 Atualizar Tabela de Raquel

A tabela que Raquel criou na sessão anterior:

| Data | Post | Leads (manual) | Status |
|---|---|---|---|
| 08/05 | Reel (fila) | [contar mensagens recebidas] | ✅ |
| 09/05 | Carrossel (preço) | [contar] | ✅ |
| 10/05 | Story (local) | [contar] | ✅ |
| 11/05 | Reel (depoimento) | [contar] | ✅ |
| 12/05 | Post (urgência) | [contar] | ✅ |

**Atualizar diariamente** (Raquel vai ficar com o WhatsApp aberto no GPTMaker)

---

## 🔍 TROUBLESHOOTING COMUM

### ❌ "GPTMaker não conecta com Meta"

**Solução:**
1. Confirmar que Rogério tem Meta Business Account verificada
2. Ir para **facebook.com/business** → Configurações → Segurança
3. Verificar que a conta está verificada (selo ✅)
4. Tentar nova autorização

### ❌ "Mensagens não estão chegando"

**Solução:**
1. Confirmar que o número de Raquel/Karine está correto
2. Testar manualmente: Enviar mensagem via WhatsApp
3. Verificar em **Meta Business Suite > Gerenciador de Contas** que o número está ativo
4. Se tudo OK → pode ser delay de sincronização (esperar 2 min)

### ❌ "CTA não funciona quando clica"

**Solução:**
1. Verificar que o link WhatsApp tem o prefixo correto: `https://wa.me/`
2. Testar link em navegador (deve abrir WhatsApp)
3. Se não abrir → pode ser número inválido ou formatação

**Formato correto:**
```
https://wa.me/5571999887766?text=SST%20Card
```

Não esquecer: `+55` = Brasil, `71` = DDD Salvador, resto = número

---

## 🎯 META DESSA SESSÃO

✅ Raquel sai com:

- [ ] Canal WhatsApp criado no GPTMaker (nome: "SST Card — Leads Raquel")
- [ ] Número conectado e ativo
- [ ] Resposta automática configurada
- [ ] CTAs dos 5 posts atualizados com link WhatsApp
- [ ] Entendimento: cada lead que chegar = potencial cliente para Karine converter

---

## 📞 FLUXO FINAL (quando tudo estiver pronto)

```
SEGUNDA 08h30 → Post Reel "Fila no SUS"
                  ↓
             Pessoa lê + clica CTA
                  ↓
             Abre WhatsApp + manda mensagem
                  ↓
             GPTMaker recebe + responde auto
                  ↓
             Pessoa vê: "Bem-vindo SST Card"
             + "Qual informação você quer? 1/2/3"
                  ↓
             Pessoa responde (ex: "1")
                  ↓
             [Se respondido: Raquel vê e responde]
             [Se não responder em 5 min: Karine recebe]
                  ↓
             LEAD = +1 para a tabela de rastreamento
                  ↓
             Karine converte (closing)
```

---

## ✍️ CHECKLIST — Fim da Configuração

- [ ] Canal criado no GPTMaker
- [ ] Meta Business autorizado
- [ ] Número WhatsApp conectado
- [ ] Resposta automática pronta
- [ ] CTAs dos 5 posts atualizados
- [ ] Raquel sabe que vai receber mensagens no GPTMaker
- [ ] Karine sabe que pode receber encaminhamentos
- [ ] Tabela de rastreamento preparada

---

## 🚀 PRÓXIMA FASE (depois da semana)

Se a semana der bom (≥10 leads):
1. Adicionar **IA no GPTMaker** (responder perguntas automaticamente)
2. Integrar com **n8n** (registrar leads no Notion automaticamente)
3. Criar **templates de resposta** por tipo de pergunta

---

**Sessão:** 06/05/2026  
**Status:** 🔴 Em execução

Voltar para [[checklist-sessao-raquel-06-05-2026]]
