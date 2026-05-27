# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## O que é este projeto

Consultoria comercial ativa para **Rogério Ferreira** (SST Clínica / SST Card), focada em estruturar e executar a máquina de vendas da 2ª filial (Bairro da Paz, Salvador/BA). O produto central é o **SST Card** — benefício de saúde (R$34,90–199,90/mês) voltado a trabalhadores informais de baixa renda.

O consultor é **Mayko Rodrigues**. O trabalho é documentado neste diretório em Markdown, espelhado no Notion e executado via WhatsApp + n8n.

**Status do Projeto (27/05/2026):**
- ✅ **Advisory assinado** em 01/05/2026 (contrato R$30k validado)
- ✅ **Bairro da Paz** — contrato assinado, inauguração oficial **01/07/2026**
- 🔄 **Campanha Perdão de Dívida** — 761 contas Tenex em atraso (foco operacional atual)
- 👤 **RH Closer** — candidato Roni entrevistado em 22/05; processo em `rh-closer/`
- 🔔 **Estrutura PJ equipe** — contratos em transição (prazo 23/05)
- 📊 **Playbook web** — https://playbook.ssfcard.ia.br (Vercel + Cloudflare)

**Leia sempre `RETOMADA.md` antes de agir** — é o "estado do projeto": decisões tomadas, documentos criados e próximos passos. Não repita o que já está lá.

## Mapa dos documentos

| Arquivo / Pasta | Para que serve |
|---|---|
| `RETOMADA.md` | Estado atual, decisões tomadas, próximos passos — **ler primeiro** |
| `contexto_projeto.md` | Visão estratégica completa (diagnóstico, fases, riscos) |
| `reuniao-10-04-2026.md` | Ata da reunião-chave com Rogério (deal R$30k) |
| `CONTRATO-ADVISORY-ROGERIO-01-2026.md` | Contrato de advisory assinado (versão .html para impressão) |
| `RMA-MAIO-2026.md` | Relatório Mensal de Atividades (versão .html/.pptx para apresentação) |
| `estrategia_comercial/viabilidade_card.md` | Modelo financeiro, break-even (430 membros), CAC, pricing |
| `estrategia_comercial/plano_lancamento.md` | Plano 90 dias em 3 fases com budget (R$4.150 mês 1) |
| `processo-comercial-7dias/00-plano-execucao-7dias.md` | Playbook diário do sprint — o documento operacional principal |
| `processo-comercial-7dias/RESUMO-EXECUTIVO-SST.md` | 5 movimentos críticos em 72h (prioridades do sprint) |
| `processo-comercial-7dias/01-scripts/` | Scripts de conversão, cobrança, objeções, abordagem, reativação |
| `processo-comercial-7dias/02-cadencias/` | Workflows n8n: cobrança D+3/7/15, onboarding, reativação, group-parser |
| `processo-comercial-7dias/03-agentamento/` | Prompts e guias rápidos de IA por função (Karine, Raquel) |
| `processo-comercial-7dias/04-dia-sst-saude/` | Blueprint do evento de lançamento (08/05/2026) |
| `processo-comercial-7dias/05-bairro-da-paz/` | Estratégia específica da nova filial |
| `processo-comercial-7dias/06-metricas/` | Dashboard diário e cálculo de metas |
| `processo-comercial-7dias/01-matinais/` | Resultados diários organizados por data (ex: `20-05-2026/`) |
| `rh-closer/` | Processo seletivo closer Bairro da Paz — tem `CLAUDE.md` local |
| `aline-laboratorio/` | Consultoria laboratório MADIP (Aline Souza) — tem `CLAUDE.md` local |
| `agentamento-equipe-sst.md` | Mapa de capacitação IA da equipe (roadmap por pessoa) |
| `perfil-rogerio-diretor.md` | Como trabalhar com Rogério (perfil comportamental + proposta) |
| `perfil-karine-entrevista-nov2025.md` | Perfil Karine (vendas/financeiro) — âncora motivacional: buffet |
| `perfil-raquel-agentamento.md` | Perfil Raquel (marketing) — 20 anos, SDR sem saber |
| `perfil-lucas-cs.md` | Perfil Lucas (Customer Success) |
| `sessao-agentamento-*.md` | Relatórios das sessões de capacitação (17/04/2026) |

## Personas-chave

| Pessoa | Papel | Fator crítico |
|---|---|---|
| **Rogério** | Dono/Sponsor | Aceita R$30k de investimento; decidido na reunião 10/04. Prefere GO/NO-GO direto às 9h — ver `perfil-rogerio-diretor.md` |
| **Karine** | Comercial/Financeiro | Gargalo central — tudo passa por ela. Motivação real: aprender para o negócio próprio (buffet) |
| **Raquel** | Marketing | 20 anos, logística, funciona como SDR. Cadência atual: 2 toques → abandonar (precisa de 7) |
| **Lucas** | Customer Success/Onboarding | Afastado por saúde — consultoria preparou apresentação CS em `lucas-cs/` |
| **Closer (a contratar)** | Fechamento Bairro da Paz | Perfil hunter PJ, processo seletivo ativo em `rh-closer/` |
| **Aline Souza** | Gestora lab. MADIP | Frente secundária de consultoria — sessões em `aline-laboratorio/` |

## Modelo financeiro de referência

- **Break-even:** 430 membros ativos (R$26k/mês de custo operacional)
- **Ticket médio:** R$61/membro (mix assinatura + uso)
- **Potencial Tenex (legado):** 761 contas em atraso → R$6k/mês de recuperação se 20% reativarem
- **Gap lab:** conversão 33% → 60% = +R$55k/mês potencial

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
- `scoring-` → ficha de scoring pós-entrevista RH
- `briefing-entrevista-` → briefing por candidato RH

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
| **n8n** | Automação de cobrança, group-parser Chatwoot→Claude→Notion | `02-cadencias/` |
| **WhatsApp Business** | Canal primário (Evolution API) | Scripts em `01-scripts/` |
| **Typebot** | Qualificação de candidatos closer (self-hosted Easypanel) | `rh-closer/typebot-qualificacao-closer.json` |
| **Chatwoot** | Atendimento omnichannel + parsing de grupos | `02-cadencias/SETUP-sst-group-parser.md` |
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

### Deployment Vercel — Site Principal

**URL:** https://playbook.ssfcard.ia.br (Vercel + Cloudflare)

`vercel.json` na raiz configura deploy estático sem build. O `index.html` é o entry point. Qualquer arquivo HTML na raiz ou em subpastas fica acessível diretamente via URL.

```powershell
# Deploy para produção (requer autenticação prévia)
vercel deploy --prod
# Ou via git push (CI automático configurado no projeto Vercel)
git push origin master
```

**Arquivos HTML publicados** (principais):
- `index.html` — página principal do domínio
- `processo-comercial-7dias/playbook-vivo-20-05-2026.html` — playbook mais recente
- `processo-comercial-7dias/reuniao-transicao-pj-roteiro.html` — roteiro reunião PJ (em staging)
- `rh-closer/divulgacao-vaga-closer.html` — divulgação da vaga closer

**Ciclo de atualização do playbook:**
1. Após matinal diária (08h–09h), capturar resultados reais
2. Editar ou criar novo arquivo HTML de playbook com comparação planejado vs executado
3. `git commit && git push` → Vercel redeploya em <1 min
4. Gerar PDF via Ctrl+P no navegador para enviar no WhatsApp

---

### Lucas CS — Apresentações e Gerador PPTX

Localização: `lucas-cs/`

**`gerar_apresentacao.py`** — Gera o arquivo `.pptx` de Customer Success via `python-pptx`. Paleta SST Card embutida (azul `#1987c3`, vermelho, verde, amarelo).

```powershell
# Instalar dependência (uma vez)
pip install python-pptx

# Gerar apresentação
python lucas-cs/gerar_apresentacao.py
# Saída: lucas-cs/apresentacao-sucesso-cliente-2026.pptx
```

**`apresentacao-sucesso-cliente-2026.html`** — Versão web interativa da apresentação (abrir no navegador, Ctrl+P para PDF).

Para editar KPIs e metas no HTML: buscar por `data` no arquivo. Para alterar cor primária: buscar `#1987c3`.

---

### n8n Workflows (JSON prontos para importar)

Localização: `processo-comercial-7dias/02-cadencias/`

| Arquivo JSON | O que faz |
|---|---|
| `n8n-sst-group-parser.json` | Lê mensagens de grupo Chatwoot → Claude → extrai dados → salva no Notion (parciais) |
| `n8n-noshow-cadencia.json` | Cadência automática para pacientes no-show do laboratório |
| `n8n-noshow-webhook-resposta.json` | Webhook de resposta para a cadência de no-show |
| `rh-closer/n8n-workflow-candidatura-closer.json` | Recebe candidatura do Typebot → notifica Rogério + Mayko via WhatsApp |

Setup do group-parser: ver `02-cadencias/SETUP-sst-group-parser.md` (requer variáveis de ambiente: URL Chatwoot, API key, Notion token).

---

### Scripts Python — Validação e Auditoria

Localização: `.claude/skills/cerebro-ia-clinica-lucrativa/scripts/`

| Script | Uso |
|--------|-----|
| `validar_csv.py` | Valida CSV histórico antes de importar (datas inválidas, campos faltantes, duplicatas) |
| `auditar_yaml.py` | Audita frontmatter YAML de arquivos `.md` |
| `gerar_notas_md.py` | Converte CSV validado em arquivos `.md` prontos para o vault |

```powershell
python scripts/validar_csv.py planilha-tenex.csv
python scripts/auditar_yaml.py vault-sst/
python scripts/gerar_notas_md.py dados-limpos.csv -o vault-sst/00_Inbox/
```

---

### Vault SST — Pipeline Obsidian

Localização: `vault-sst/`

Pipeline comercial: `00_Inbox/` → `02_Pipeline_Comercial/` (stages 01–06: Qualificação → Perdido) → `05_Dashboards_KPIs/` (queries Dataview DQL).

Frontmatter obrigatório nos leads:
```yaml
---
tipo: lead
status: qualificacao  # ver SKILL.md para estados válidos
data_entrada: YYYY-MM-DD
owner: ""
---
```

Importar base Tenex/Blingo: `validar_csv.py` → `gerar_notas_md.py` → `vault-sst/00_Inbox/`.

---

### Skill: cerebro-ia-clinica-lucrativa

Use `/cerebro-ia-clinica-lucrativa` para: estruturar vault, auditar YAML, gerar queries Dataview, processar CSV histórico, calcular KPIs (conversão, no-show, LTV, CAC).

Referência completa: `.claude/skills/cerebro-ia-clinica-lucrativa/SKILL.md`.

---

### Projetos Secundários

| Pasta | Descrição | CLAUDE.md Local |
|-------|-----------|---|
| `rh-closer/` | Processo seletivo closer PJ Bairro da Paz (Typebot + kit entrevista + scoring) | `rh-closer/CLAUDE.md` |
| `aline-laboratorio/` | Consultoria laboratório MADIP (Aline Souza) — sessões mensais | `aline-laboratorio/CLAUDE.md` |
| `estrategia_comercial/` | Modelos financeiros, plano de lançamento | Documentado neste CLAUDE.md |
| `processo-comercial-7dias/` | Sprint operacional (scripts, cadências n8n, prompts IA, matinais) | Documentado neste CLAUDE.md |

Leia o CLAUDE.md local antes de trabalhar em qualquer subprojeto.
