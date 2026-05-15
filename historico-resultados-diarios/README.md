---
title: Histórico de Resultados Diários
tags: [sst, historico, operacional]
aliases: [Arquivo de resultados consolidados]
criado: 2026-05-05
---

# 📊 HISTÓRICO DE RESULTADOS DIÁRIOS
**Projeto:** SST Clínica — Bairro da Paz  
**Turno:** 08h00–15h00  
**Período:** A partir de 05/05/2026

---

## 📁 Estrutura da Pasta

```
historico-resultados-diarios/
├── README.md                    ← Este arquivo
├── ÍNDICE.md                    ← Sumário de todos os dias
├── resultado-05052026.md        ← Dia 05/05/2026
├── resultado-06052026.md        ← Dia 06/05/2026
├── resultado-07052026.md        ← Dia 07/05/2026
└── [continuação...]
```

---

## 📝 Como Usar

### Para Mayko (Consolidação):

1. **Receber relatórios** — 12h e 15h de cada membro (Raquel, Karine, Lucas)
2. **Compilar** — Preencher template CONSOLIDADO (ver `templates-relatorio-08h-15h.md`)
3. **Salvar arquivo** — Criar arquivo `resultado-DDMMYYYY.md` nesta pasta
4. **Atualizar ÍNDICE** — Adicionar linha em `ÍNDICE.md`

### Para a Equipe:

- Enviar relatórios nos horários corretos:
  - **12h00** — Template PARCIAL
  - **15h00** — Template FINAL
- Sempre no **WhatsApp grupo MADIP**

---

## 🗂️ Nome do Arquivo

Usar padrão: `resultado-DDMMYYYY.md`

Exemplos:
- 05/05/2026 → `resultado-05052026.md`
- 10/05/2026 → `resultado-10052026.md`
- 31/05/2026 → `resultado-31052026.md`

---

## 📋 Conteúdo de Cada Arquivo

Cada arquivo `resultado-DDMMYYYY.md` deve conter:

```markdown
---
title: Resultado Consolidado — [DATA]
tags: [sst, resultado, [DDMMYYYY]]
aliases: [Dia [DD/MM/YYYY]]
date: YYYY-MM-DD
---

# CONSOLIDADO — [DATA formatada: 05/05/2026]

⏰ **Turno:** 08h00–15h00

## RAQUEL — Prospecção

| Métrica | Parcial 12h | Final 15h | Total |
|---------|------------|-----------|-------|
| Abordagens | __ | __ | __ |
| Respondidos | __ | __ | __ |
| Qualificados | __ | __ | __ ⭐ |

**Bloqueador:** [descrição]  
**Próximas ações:** [lista]

---

## KARINE — Vendas

| Métrica | Parcial 12h | Final 15h | Total |
|---------|------------|-----------|-------|
| Contatos | __ | __ | __ |
| Conversões | __ | __ | __ ⭐ |
| Valor (R$) | __ | __ | __ |
| Taxa conversão | __% | __% | __% |

**Breakdown:** Individual __, Família __, Empresarial __  
**Cobrança:** __ recuperações | R$ __ em promessas  
**Bloqueador:** [descrição]  
**Próximas ações:** [lista]

---

## LUCAS — Onboarding

| Métrica | Parcial 12h | Final 15h | Total |
|---------|------------|-----------|-------|
| Ativações | __ | __ | __ ⭐ |
| Boas-vindas | __ | __ | __ |
| Usando serviço | __ | __ | __ |

**Serviços utilizados:** Tele __, Clínico __, Especialista __, Balc __  
**Inativos:** __ encontrados | __ contatados  
**Bloqueador:** [descrição]  
**Próximas ações:** [lista]

---

## ⚠️ BLOQUEADORES CRÍTICOS

1. [descrição] — Dono: __ | Prazo: __
2. [descrição] — Dono: __ | Prazo: __
3. [descrição] — Dono: __ | Prazo: __

---

## ✅ DESTAQUES DO DIA

- [maior conquista ou insight]
- [feedback importante]
- [oportunidade identificada]

---

## 📈 ANÁLISE RÁPIDA

**Tendência:** [Em subida / Estável / Queda]  
**KPI crítico:** [qual métrica mais importante do dia]  
**Recomendação para amanhã:** [1-2 ações prioritárias]

---

**Registrado em:** 05/05/2026 às 15h30 | Mayko  
**Status:** ✅ Consolidado
```

---

## 📊 ÍNDICE.md — Mapa de Todos os Dias

O arquivo `ÍNDICE.md` será atualizado daily com:

```markdown
# ÍNDICE — Histórico de Resultados

| Data | Raquel | Karine | Lucas | Bloqueadores | Destaques |
|------|--------|--------|-------|--------------|-----------|
| 05/05 | 4 qual | 3 vendas | 4 ativ | Medina | Conversão 21% |
| 06/05 | __ | __ | __ | __ | __ |
| 07/05 | __ | __ | __ | __ | __ |

[Ver detalhes completos em cada arquivo]
```

---

## 🔍 Como Pesquisar Histórico

### Procurar por data:
```
resultado-05052026.md  ← 05/05/2026
resultado-10052026.md  ← 10/05/2026
```

### Procurar por métrica (via ÍNDICE):
- Vendas altas: procurar "Karine" em ÍNDICE
- Inativos reativados: procurar "Lucas" em ÍNDICE
- Qualificados: procurar "Raquel" em ÍNDICE

### Análise semanal:
- Abrir `ÍNDICE.md`
- Filtrar por coluna "Data" (semana de interesse)
- Calcular médias/tendências

---

## 📈 Análise Mensal (Sugestão)

Ao fim de cada mês, criar um documento `analise-mensal-MMMYYYY.md`:

```
# ANÁLISE MENSAL — Maio/2026

## Resumo Estatístico

| Métrica | Meta | Real | % Atingida |
|---------|------|------|-----------|
| Qualificados Raquel | 35+ | __ | __% |
| Cartões Karine | 60+ | __ | __% |
| Ativações Lucas | 45+ | __ | __% |

## Bloqueadores Recorrentes

- [bloqueador 1]
- [bloqueador 2]

## Recomendações para Junho

- [ação 1]
- [ação 2]
```

---

## 💾 Backup & Segurança

- ✅ Arquivos salvos em formato Markdown (não dependem de software)
- ✅ Sincronizados com Notion (integração via MCP)
- ✅ Histórico conservado indefinidamente
- ✅ Passível de busca/filtro em qualquer editor de texto

---

## 🔗 Relacionados

- [[templates-relatorio-08h-15h]] — Templates vazios para preencher
- [[exemplo-relatorio-08h-15h-preenchido]] — Exemplos de como fica preenchido
- [[matinal-madip-05-05-2026]] — Reunião matinal
- [[RETOMADA]] — Estado geral do projeto

---

**Pasta criada em:** 05/05/2026  
**Responsável por manter atualizado:** Mayko Rodrigues  
**Frequência de atualização:** Diária (após 15h30)
