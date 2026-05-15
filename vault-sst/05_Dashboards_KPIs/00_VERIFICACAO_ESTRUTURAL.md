---
title: Verificação Estrutural — Fase 0
tags: [dashboard, fase0, validacao]
criado: 2026-05-02
---

# Verificação Estrutural do Vault — Fase 0

> Execute este arquivo no Obsidian após criar a estrutura PARA para confirmar
> que as queries Dataview respondem corretamente.

---

## Teste 1 — Leads no Inbox (espera "No results" se vazio)

```dataview
TABLE tipo AS "Tipo", status AS "Status", data_entrada AS "Entrada"
FROM "00_Inbox"
WHERE tipo = "lead"
SORT data_entrada DESC
LIMIT 10
```

---

## Teste 2 — Todos os Leads do Pipeline

```dataview
TABLE
  status AS "Estágio",
  owner AS "SDR",
  origem AS "Origem",
  data_entrada AS "Data Entrada"
FROM "02_Pipeline_Comercial"
WHERE tipo = "lead"
SORT data_entrada DESC
LIMIT 20
```

---

## Teste 3 — Contratos Ativos

```dataview
TABLE
  cliente_ref AS "Cliente",
  valor_mensal AS "Mensalidade",
  status_contrato AS "Status"
FROM "03_Contratos_Recorrentes"
WHERE tipo = "contrato_recorrente"
```

---

## Checklist Fase 0

- [ ] Pastas PARA criadas (00_Inbox até 99_Arquivo_Geral)
- [ ] Teste 1 executa sem erro de sintaxe (pode retornar "No results")
- [ ] Teste 2 executa sem erro de sintaxe
- [ ] Teste 3 executa sem erro de sintaxe
- [ ] Pelo menos 1 lead de teste criado com template correto
- [ ] `scripts/auditar_yaml.py` executado sem erros críticos
- [ ] CSV histórico (Tenex/Blingo) validado com `scripts/validar_csv.py`
- [ ] Dados históricos importados via `scripts/gerar_notas_md.py`

**Quando todos os itens estiverem marcados → Fase 0 concluída → iniciar Fase 1.**
