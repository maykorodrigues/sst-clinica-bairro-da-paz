---
title: Status dos Entregáveis — Reunião 27/04/2026
aliases: [Entregáveis 27/04, Bloqueadores Campanha Perdão Dívida]
tags: [sst, entregaveis, em-progresso]
---

# Status dos Entregáveis — Reunião 27/04/2026

> **Última atualização:** 27/04/2026 — após reunião com Karine  
> **Tema:** Campanha agressiva de perdão de dívida (50% desconto) para 761 Tenex

---

## 🔴 CRÍTICO — Bloqueadores de Execução

### 1. [KARINE] Obter Aprovação Rogério para Campanha
**Status:** ⏳ PENDENTE  
**Responsável:** Karine Santos  
**O que precisa:** Agendar call com Rogério para confirmar:
- Campanha de perdão de dívida com até 50% desconto (máximo autorizado)
- Prazo de 7 dias (ex: 27/04 a 03/05/2026)
- Migração plano Antigo → R$9,90 válida para clientes com 3+ parcelas
- Autorização para chatbot e acompanhamento automático no Notion

**Prazo:** até 28/04/2026 (antes de Mayko preparar script)  
**Bloqueadores downstream:** Scripts perdão dívida + automatização CRM

---

## 🟡 ALTA PRIORIDADE — Entregáveis de Dados

### 2. [LUCAS] Fornecer Listagem Tenex Completa
**Status:** ⏳ PENDENTE  
**Responsável:** Lucas Cardoso  
**O que precisa:** Lista de clientes Tenex NÃO presentes no Boom  
**Formato esperado:**
```
nome | whatsapp | valor_atraso | qde_parcelas_atrasadas | status
```

**Prazo:** até 28/04/2026  
**Impacto:** Sem isso, não consegue importar base no Notion para pilotar campanha

---

### 3. [KARINE] Encaminhar Listagem dos 307 Disparos
**Status:** ⏳ PENDENTE  
**Responsável:** Karine Santos  
**O que precisa:** Lista dos 307 contatos que receberam WhatsApp em 27/04  
**Dados mínimos:**
```
nome | whatsapp | respondeu (sim/não) | status_resposta (aceito/recusou/sem_resposta) | data_contato
```

**Prazo:** até 28/04/2026 (turno da manhã)  
**Impacto:** Sem isso, não consegue rastrear conversão no Notion

---

## 🟢 PENDENTE MAS NÃO-CRÍTICO — Entregáveis Mayko

### 4. [MAYKO] Preparar Script Agressivo — Perdão de Dívida Tenex
**Status:** ⏳ BLOQUEADO (aguarda #1)  
**Responsável:** Mayko Rodrigues  
**O que fazer:** Criar arquivo `script-perdao-divida-tenex.md` com:
- Abertura (problema: dívida acumulada + impacto na vida)
- Meio (oferta: 50% desconto + migração R$9,90 + prazo 7 dias)
- Fechamento (CTA: "Vamos resolver isso junto?")
- Variante A: WhatsApp texto (3 versões: primária, follow-up, última chamada)
- Variante B: Roteiro áudio para Karine

**Tom desejado:** Direto, humanizado, sem constranger, urgência clara

**Prazo:** até 29/04/2026 (após aprovação Rogério)  
**Bloqueador:** Aguarda confirmação de Rogério (#1)

---

### 5. [MAYKO] Solicitar Autorização — Automatização CRM Notion
**Status:** ⏳ BLOQUEADO (aguarda #1)  
**Responsável:** Mayko Rodrigues  
**O que fazer:** Conversar com Rogério para ativar:
- Chatbot respostas automáticas no Notion (ex: "Recebemos sua resposta")
- Sistema de acompanhamento automático (ex: lembrete D+3 se não pagou)
- Integração: n8n → Notion → WhatsApp

**Prazo:** até 29/04/2026  
**Bloqueador:** Aguarda confirmação de Rogério (#1)

---

## 📊 Quadro de Dependências

```
Aprovação Rogério (#1)
    ↓
    ├→ Script Perdão Dívida (#4)
    │    ├→ Usar com lista Tenex (Lucas #2)
    │    └→ Usar com lista 307 disparos (Karine #3)
    │
    └→ Automatização CRM (#5)
         └→ Integrar com script para follow-up automático
```

---

## ✅ Checklist de Próxima Reunião (28–29/04)

- [ ] Lucas enviou listagem Tenex
- [ ] Karine enviou lista 307 contatos + status respostas
- [ ] Karine obteve aprovação Rogério com assinatura digital (print de WhatsApp)
- [ ] Mayko preparou script perdão dívida (3 variantes)
- [ ] Mayko configurou automação Notion (se aprovado)
- [ ] Testar script com 10 contatos de teste
- [ ] Definir data início campanha (ex: 28 ou 29/04)

---

## 🔗 Referências

- **Ata reunião:** [[sessao-agentamento-karine-27-04-2026]]
- **Reunião anterior:** [[sessao-agentamento-karine-17-04-2026]] (identificou 761 Tenex)
- **Scripts relacionados:** [[script-reativacao-cancelados]] | [[script-cobranca-mensalidade]]
- **Prompts IA:** [[prompt-karine]] (PROMPT 4 — Renegociação de inadimplente)

---

Voltar para [[RETOMADA]]
