---
aliases: [CRM SST Clínica, Notion Chatwoot SST]
tags: [urgente, planejado, crm, automacao]
status: planejado
---

# Pendência: Implementar CRM Notion + Chatwoot — SST Clínica

> **Data-alvo:** 13/05/2026
> **Sessão agendada no Google Calendar:** "Implementar CRM Notion + Chatwoot — SST Clínica e SST Card"

## O que é isso

Pipeline automático que transforma cada conversa WhatsApp recebida no Chatwoot em um registro de lead/paciente no Notion CRM, segmentado por atendente (inbox).

```
WhatsApp → Evolution API → Chatwoot → n8n → Notion CRM
```

Cada mensagem nova cria ou atualiza o card do lead automaticamente, sem intervenção manual.

## Workflow base já criado

O workflow está disponível no n8n e pode ser reutilizado/clonado para a SST Clínica:

- **Workflow SST Card:** `CRM SST Card — 01 Message Created` (ID: `j1rOSlxCXafwCU3k`)
- **Pasta n8n:** `Claude_Notion_Automacao`
- **Lógica:** idempotência por `ID Conversa`, append de mensagens, anti-duplicação

## O que precisamos definir para a SST Clínica

- [ ] Qual infraestrutura usar? SST Clínica compartilha o n8n/Chatwoot do SST Card (`ssfcard.ia.br`) ou tem instância própria?
- [ ] Quais inboxes do Chatwoot pertencem à SST Clínica? (ver `agentamento-equipe-sst.md`)
- [ ] Criar database Notion específica para a SST Clínica
- [ ] Definir quem acessa o Notion CRM: Karine, Raquel, Lucas?

## Checklist de ativação (quando decidir prosseguir)

- [ ] Descobrir inbox IDs numéricos das inboxes da Clínica no Chatwoot
- [ ] Criar database Notion com campos: Nome do Lead, Telefone, ID Conversa, Status/Fase, Data 1º Contato, Última msg em, Link Chatwoot
- [ ] Criar Integration Token Notion (`notion.so/my-integrations`)
- [ ] Adicionar env vars no n8n: `CLINICA_INBOX_ID`, `CLINICA_DB_ID`, `CLINICA_NOTION_KEY`
- [ ] Registrar webhook no Chatwoot → evento `Message Created`
- [ ] Ativar workflow e testar

## Referências

- [[pendencia-crm-notion-chatwoot]] — nota espelho no SST Card
- [[agentamento-equipe-sst]] — perfis dos atendentes (Karine, Raquel, Lucas)
- [[perfil-rogerio-diretor]] — decisor para aprovação de ferramentas

Voltar para [[Home]]
