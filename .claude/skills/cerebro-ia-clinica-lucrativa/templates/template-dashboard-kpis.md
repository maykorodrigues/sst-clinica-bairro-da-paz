---
title: Dashboard KPIs Comerciais
tags: [dashboard, kpis, dataview]
atualizado: YYYY-MM-DD
---

# Dashboard Comercial — SST Clínica

> Atualizado automaticamente via Dataview. Não editar manualmente.

---

## Funil Atual (Hoje)

```dataview
TABLE
  status AS "Estágio",
  length(rows) AS "Qtd Leads",
  round(length(rows) / (SELECT length(rows) FROM "02_Pipeline_Comercial" WHERE tipo = "lead") * 100, 1) + "%" AS "% Funil"
FROM "02_Pipeline_Comercial"
WHERE tipo = "lead"
GROUP BY status
SORT length(rows) DESC
```

---

## Leads Estagnados (sem toque há +3 dias)

```dataview
TABLE
  status AS "Estágio",
  owner AS "SDR",
  date(today) - file.mtime AS "Dias parado"
FROM "02_Pipeline_Comercial"
WHERE tipo = "lead"
  AND status != "fechamento"
  AND status != "perdido"
  AND file.mtime <= date(today) - dur(3 days)
SORT file.mtime ASC
LIMIT 20
```

---

## Taxa de Conversão SDR → Closer

```dataview
TABLE
  length(rows) AS "Total Qualificados",
  length(filter(rows, (r) => r.closer != null)) AS "Convertidos",
  round((length(filter(rows, (r) => r.closer != null)) / length(rows)) * 100, 2) + "%" AS "Win Rate"
FROM "02_Pipeline_Comercial"
WHERE tipo = "lead"
GROUP BY owner
SORT length(rows) DESC
```

---

## No-Shows da Semana

```dataview
TABLE
  owner AS "SDR",
  data_reuniao AS "Data Reunião",
  origem AS "Origem"
FROM "02_Pipeline_Comercial/05_No_Show"
WHERE tipo = "lead"
  AND data_reuniao >= date(today) - dur(7 days)
SORT data_reuniao DESC
```

---

## Contratos Ativos e LTV

```dataview
TABLE
  cliente_ref AS "Cliente",
  plano AS "Plano",
  valor_mensal AS "Mensalidade",
  pagamentos_em_atraso AS "Atrasos"
FROM "03_Contratos_Recorrentes"
WHERE tipo = "contrato_recorrente"
  AND status_contrato = "ativo"
SORT pagamentos_em_atraso DESC
```

---

*[[Home]] | [[06_Playbooks/processo-sdr]] | [[04_Rituais_e_Reunioes/matinal-zero]]*
