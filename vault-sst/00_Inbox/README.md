---
title: Inbox — Quarentena de Leads
tags: [inbox, para]
---

# 00_Inbox — Quarentena

Área de entrada de todos os dados brutos. Leads vindos do n8n/WhatsApp,
transcrições e contatos manuais repousam aqui até qualificação.

**Regra:** Processar semanalmente. Nada permanece aqui por mais de 7 dias.

**Destino após qualificação:**
- Lead qualificado → `02_Pipeline_Comercial/01_Qualificacao/`
- Lead descartado → `99_Arquivo_Geral/`
