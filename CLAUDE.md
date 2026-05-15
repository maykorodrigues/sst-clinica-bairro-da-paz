# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## O que é este projeto

Consultoria comercial ativa para **Rogério Ferreira** (SST Clínica / SST Card), focada em estruturar e executar a máquina de vendas da 2ª filial (Bairro da Paz, Salvador/BA). O produto central é o **SST Card** — benefício de saúde (R$34,90–199,90/mês) voltado a trabalhadores informais de baixa renda.

O consultor é **Mayko Rodrigues**. O trabalho é documentado neste diretório em Markdown, espelhado no Notion e executado via WhatsApp + n8n.

**Leia sempre `RETOMADA.md` antes de agir** — é o "estado do projeto": decisões tomadas, documentos criados e próximos passos. Não repita o que já está lá.

## Mapa dos documentos

| Arquivo / Pasta | Para que serve |
|---|---|
| `RETOMADA.md` | Status atual, próximos documentos a criar — **ler primeiro** |
| `contexto_projeto.md` | Visão estratégica completa (diagnóstico, fases, riscos) |
| `reuniao-10-04-2026.md` | Ata da reunião-chave com Rogério (deal quente R$30k) |
| `estrategia_comercial/viabilidade_card.md` | Modelo financeiro, break-even (430 membros), CAC, pricing |
| `estrategia_comercial/plano_lancamento.md` | Plano 90 dias em 3 fases com budget (R$4.150 mês 1) |
| `processo-comercial-7dias/00-plano-execucao-7dias.md` | Playbook diário do sprint — o documento operacional principal |
| `processo-comercial-7dias/RESUMO-EXECUTIVO-SST.md` | 5 movimentos críticos em 72h (prioridades do sprint) |
| `processo-comercial-7dias/BRIEFING-ROGERIO-SPONSOR.md` | Briefing para Rogério como sponsor |
| `processo-comercial-7dias/CARTA-SPONSOR-ROGERIO.md` | Carta explicando o sprint e critérios de decisão |
| `processo-comercial-7dias/01-scripts/` | Scripts de conversão, cobrança, objeções, abordagem, reativação |
| `processo-comercial-7dias/02-cadencias/` | Workflows n8n: cobrança D+3/7/15, onboarding, reativação |
| `processo-comercial-7dias/03-agentamento/` | Prompts e guias rápidos de IA por função (Karine, Raquel) |
| `processo-comercial-7dias/04-dia-sst-saude/` | Blueprint do evento de lançamento (08/05/2026) |
| `processo-comercial-7dados/05-bairro-da-paz/` | Estratégia específica da nova filial |
| `processo-comercial-7dias/06-metricas/` | Dashboard diário e cálculo de metas |
| `agentamento-equipe-sst.md` | Mapa de capacitação IA da equipe (roadmap por pessoa) |
| `perfil-rogerio-diretor.md` | Como trabalhar com Rogério (perfil comportamental + proposta) |
| `perfil-karine-entrevista-nov2025.md` | Perfil Karine (vendas/financeiro) — âncora motivacional: buffet |
| `perfil-raquel-agentamento.md` | Perfil Raquel (marketing) — 20 anos, SDR sem saber |
| `sessao-agentamento-*.md` | Relatórios das sessões de capacitação (17/04/2026) |

## Personas-chave

| Pessoa | Papel | Fator crítico |
|---|---|---|
| **Rogério** | Dono/Sponsor | Aceita R$30k de investimento; decidido na reunião 10/04. Ritual: responder GO/NO-GO às 9h |
| **Karine** | Comercial/Financeiro | Gargalo central — tudo passa por ela. Motivação real: aprender para o negócio próprio (buffet) |
| **Raquel** | Marketing | 20 anos, logística, funciona como SDR. Cadência atual: 2 toques → abandonar (precisa de 7) |
| **Lucas** | Atendimento/Onboarding | Afastado por saúde — bloqueia ativação de novos membros |

## Modelo financeiro de referência

- **Break-even:** 430 membros ativos (R$26k/mês de custo operacional)
- **Ticket médio:** R$61/membro (mix assinatura + uso)
- **Meta sprint 7 dias:** ≥20 novas adesões + ≥20 reativações
- **Potencial Tenex (legado):** 761 contas em atraso → R$6k/mês de recuperação se 20% reativarem
- **Gap lab:** conversão 33% → 60% = +R$55k/mês potencial

**Gate decision (23/04/2026):**
- ≥20 adesões + ≥20 reativações → contrato de advisory + início Bairro da Paz
- 10–19 adesões → extensão 15 dias + ajustes de equipe
- <10 adesões → diagnóstico + plano corretivo

## Convenções de documentos

**Frontmatter padrão:**
```yaml
---
title: Título do Documento
tags: [sst, tag-contexto, #em-progresso]
aliases: [nomes alternativos]
related: [[arquivo-relacionado]]
criado: YYYY-MM-DD
atualizado: YYYY-MM-DD
---
```

**Prefixos de arquivo:**
- `perfil-` → stakeholder/pessoa
- `script-` → roteiro de abordagem/mensagem
- `cadencia-` → workflow automatizado (n8n)
- `blueprint-` → planejamento de evento/estrutura
- `sessao-` → relatório de sessão de capacitação
- `prompt-` → prompts de IA por função

**Estrutura interna de todo documento:**
1. Resumo executivo (leitura em 60s)
2. Tabelas para dados estruturados
3. Checklists binários (feito / não feito)
4. Contingências e planos de risco
5. Links relacionados com wiki-links `[[arquivo]]`

Usar sempre português. Datas no formato DD/MM/AAAA.

## Stack de integração

| Plataforma | Uso | Onde documentado |
|---|---|---|
| **Notion** | Pipeline, métricas, tracking de equipe | Links nos documentos de cadência |
| **Google Sheets** | Operações diárias da Karine (adesões, cobranças) | `cadencia-cobranca-automatizada.md` |
| **n8n** | Automação de cobrança, notificações de evento | `02-cadencias/` |
| **WhatsApp Business** | Canal primário (Evolution API) | Scripts em `01-scripts/` |
| **Blingo** | Sistema de membros atual | Mencionado nos perfis |
| **Tenex** | Sistema legado com 761 contas a recuperar | `sessao-agentamento-karine-17-04-2026.md` |
| **Meta Business Suite** | Agendamento Instagram/Facebook (pendente setup) | `perfil-raquel-agentamento.md` |

## Ao criar novos documentos

1. Verificar `RETOMADA.md` para confirmar que o documento não existe ainda
2. Seguir os prefixos de nomenclatura do projeto
3. Usar o frontmatter padrão
4. Linkar bidirecionalmente para documentos relacionados
5. Após criar: atualizar `RETOMADA.md` (seção "Documentos criados") e registrar ação em `02-areas/historico-acoes.md` no vault raiz

---

## Arquivos Técnicos e Código

### Lucas CS — Apresentação Interativa (GitHub Pages)

Localização: `lucas-cs/`

Projeto web para apresentação de Customer Success (dashboards, KPIs de retenção) feito em HTML/CSS/JavaScript, deployado em GitHub Pages.

**Arquivos principais:**
- `apresentacao-sucesso-cliente-2026.html` — Apresentação interativa com gráficos (revise dados antes de compartilhar com Rogério)
- `README.md` — Instruções de navegação e uso
- `GITHUB-SETUP.md` — Guia passo-a-passo para ativar GitHub Pages (usar se for fazer deploy)

**Comandos úteis:**
```powershell
# Validar sintaxe HTML
cd lucas-cs
# Abrir no navegador localmente (duplo-clique em .html)

# Deploy para GitHub Pages (ler GITHUB-SETUP.md primeiro)
git push origin main
```

**Quando editar:**
- Números de KPI, metas, cancelamentos → busque `data` no HTML
- Cores do tema → busque `#1987c3` (azul primário)
- Slides/seções → modifique HTML mantendo estrutura

---

### Scripts Python — Validação e Auditoria

Localização: `.claude/skills/cerebro-ia-clinica-lucrativa/scripts/`

Ferramentas para processar dados históricos do SST (CSV Tenex/Blingo) e validar estrutura do vault Obsidian.

**Scripts disponíveis:**
| Script | Uso |
|--------|-----|
| `validar_csv.py` | Validar CSV histórico antes de importar (detecta datas inválidas, campos faltantes, duplicatas) |
| `auditar_yaml.py` | Auditar frontmatter YAML de arquivos `.md` (detecção de erros de sintaxe) |
| `gerar_notas_md.py` | Converter CSV validado em arquivos `.md` prontos para o vault |

**Exemplos de uso:**
```powershell
# Validar CSV antes de importar base Tenex
python scripts/validar_csv.py planilha-tenex.csv

# Auditar erros de YAML no vault
python scripts/auditar_yaml.py vault-sst/

# Gerar arquivos .md a partir de CSV validado
python scripts/gerar_notas_md.py dados-limpos.csv -o vault-sst/00_Inbox/
```

**Hook de auditoria (automático):**
- `.claude/skills/cerebro-ia-clinica-lucrativa/scripts/hook_audit_log.sh` — registra logs IA em `99_Arquivo_Geral/IA_Logs/log_YYYY-MM-DD.json`

---

### Vault SST — Dashboards e Pipeline Obsidian

Localização: `vault-sst/`

Estrutura PARA do Obsidian para documentação estruturada da clínica. Contém pipeline comercial (qualificação → agendado → compareceu → fechamento → no-show → perdido) e dashboards Dataview.

**Pasta-chave:**
- `00_Inbox/` — Leads e atendimentos recém-chegados (formato: `LEAD - YYYY-MM-DD - [Nome].md`)
- `02_Pipeline_Comercial/` — Leads segmentados por stage (01_Qualificacao até 06_Perdido)
- `05_Dashboards_KPIs/` — Queries Dataview DQL para métricas (conversão, no-show, LTV)
- `99_Arquivo_Geral/IA_Logs/` — Logs JSON de processamento (auditoria)

**Frontmatter obrigatório (leia SKILL.md para templates completos):**
```yaml
---
tipo: lead  # ou: atendimento, contrato_recorrente
status: qualificacao  # estados válidos documentados em SKILL.md
data_entrada: YYYY-MM-DD
owner: ""
---
```

**Quando usar:**
- Importar base histórica Tenex/Blingo → rodar `validar_csv.py` → `gerar_notas_md.py` → `vault-sst/00_Inbox/`
- Auditar estrutura → skill `/cerebro-ia-clinica-lucrativa` (ativa queries DQL, calcula conversão/LTV)
- Gerar relatório de churn → query em `05_Dashboards_KPIs/00_VERIFICACAO_ESTRUTURAL.md`

---

### Skill: cerebro-ia-clinica-lucrativa

Skill customizada para operar sobre o vault Obsidian (Fase 0: engenharia estrutural; Fases 1–2: automação futura).

**Quando ativar:** Use `/cerebro-ia-clinica-lucrativa` quando precisar:
- Estruturar novo vault de clínica cliente (criar pastas PARA)
- Validar/auditar YAML frontmatter
- Gerar queries Dataview para dashboards
- Processar CSV histórico (Tenex, Blingo)
- Calcular KPIs: conversão, no-show, LTV, CAC

**Exemplo de comando:**
```
/cerebro-ia-clinica-lucrativa Auditar vault-sst/ — validar YAML de todos os leads e retornar relatório de erros
```

**Leia:** `.claude/skills/cerebro-ia-clinica-lucrativa/SKILL.md` para referência completa (templates, fases, riscos operacionais).

---

### Projetos Secundários

| Pasta | Descrição | CLAUDE.md Local |
|-------|-----------|---|
| `aline-laboratorio/` | Consultoria para laboratório MADIP (Aline Souza) — sessão ativa 06/05 | `aline-laboratorio/CLAUDE.md` |
| `estrategia_comercial/` | Modelos financeiros, plano de lançamento | Documentado no CLAUDE.md principal |
| `processo-comercial-7dias/` | Sprint 7 dias operacional (scripts, cadências n8n, prompts IA) | Documentado no CLAUDE.md principal |

Leia CLAUDE.md local antes de trabalhar em subprojeto.
