---
tipo: lead
status: qualificacao
owner: <% tp.system.prompt("SDR responsável (ex: Karine)") %>
closer: null
origem: <% tp.system.suggester(["inbound_meta_ads","inbound_google","indicacao","reativacao","outbound_sdr"], ["inbound_meta_ads","inbound_google","indicacao","reativacao","outbound_sdr"]) %>
data_entrada: <% tp.date.now("YYYY-MM-DD") %>
data_reuniao: null
valor_estimado: 0.00
cac_estimado: 0.00
ltv_historico: 0.00
id_anonimo: <% "ID_" + tp.date.now("YYMMDDHHmm") %>
tags:
  - lead/b2c
  - prioridade/media
---

## Histórico de Contato

| Data | Canal | Observação |
|------|-------|-----------|
| <% tp.date.now("DD/MM/YYYY") %> | WhatsApp | Primeiro contato |

## Próxima Ação

- [ ] Qualificar necessidade
- [ ] Agendar reunião/consulta

---
*Criado em <% tp.date.now("DD/MM/YYYY HH:mm") %> por Templater*
