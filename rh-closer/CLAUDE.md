---
title: CLAUDE.md — RH Closer SST Card (Bairro da Paz)
tags: [sst, rh, closer, bairro-da-paz, em-progresso]
criado: 2026-05-21
atualizado: 2026-06-07
related:
  - "[[../CLAUDE]]"
  - "[[../RETOMADA]]"
  - "[[../perfil-rogerio-diretor]]"
  - "[[../processo-comercial-7dias/00-plano-execucao-7dias]]"
---

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Propósito deste diretório

Processo seletivo para **Closer (Vendedor Líder) — SST Card / Filial Bairro da Paz**. Vínculo PJ, função no fundo do funil (fechamento), produto SST Card (R$39,90–R$64,90/mês + adesão R$35).

Responsáveis: **Rogério Ferreira** (sponsor) + **Mayko Rodrigues** (consultoria).

**Status atual (11/06/2026):**
- ✅ **Safira Letícia Souza Pereira** é a **única e principal candidata** à vaga de Closer Bairro da Paz.
  - Entrevista comportamental (Fase 1) em **11/06/2026** — **APROVADA** culturalmente (score parcial 59/100, simulação não testada).
  - Próximo passo: **Fase 2 presencial (avaliação de competências)** conduzida por Rogério no local, com a candidata — ver `roteiro-fase2-presencial-closer.md` e `scoring-safira-11-06-2026.md`.
  - Possível **futura gestora** da operação se passar na fase de competências.
- ℹ️ **Roni** — funcionário do RH da SST (irmão e indicação do Rogério), apoia as funções de Recursos Humanos. **NÃO é candidato a closer.** O registro histórico de "entrevista Roni 22/05" foi um mal-entendido (ver `briefing-entrevista-roni-22-05-2026.md` com nota de correção).
- ✅ **Comissão CONFIRMADA por Rogério (03/06/2026):**
  - Por adesão: R$20 (representa 57% da taxa de R$35)
  - Por reativação Tenex: R$5
  - Escada progressiva: 80 vendas = R$15–16/adesão · 120 vendas = R$2.000 em comissão
  - Meta inicial: 100 vendas/mês = R$4.000 total (R$2.000 fixo + R$2.000 comissão)
  - **Sem teto de comissão** — política para atrair hunter
- ⚠️ Se Safira não passar na Fase 2: publicar `divulgacao-vaga-closer.html` nos canais para abrir novo pipeline.

**Antes de agir:** ler `../RETOMADA.md` para o estado atual do processo seletivo (candidato em pipeline, pendências, datas).

Diferença crítica em relação ao `clientes/vetviver/rh-sdr/`:

| Atributo | VetViver (rh-sdr) | SST (rh-closer) |
|---|---|---|
| Vínculo | Estágio CIEE | **PJ — pró-labore + comissão** |
| Função no funil | Topo (qualificação) | Fundo (fechamento) |
| Perfil ideal | Júnior treinável | **Hunter experiente** (cartão/plano/seguro) |
| Local | Pq. Santo Amaro/SP | **Bairro da Paz / Salvador-BA** |

---

## Mapa de arquivos

| Arquivo | Função | Quando usar |
|---|---|---|
| `formulario-abertura-vaga-closer-sst.md` | Fonte de dados da vaga: cargo, remuneração, requisitos, checklist de publicação | Referência antes de editar qualquer divulgação; dados de comissão só daqui |
| `divulgacao-vaga-closer.html` | Página de divulgação (paleta azul SST) — fonte para gerar PDF de WhatsApp/LinkedIn | Editar aqui, depois gerar PDF |
| `formulario-qualificacao-closer.html` | Formulário multi-step de auto-qualificação (eliminatórios automáticos) — envia via link | Compartilhar link antes da entrevista para pré-triagem |
| `kit-entrevista-closer-sst.md` | Roteiro completo de 75 min (7 blocos STAR + simulação Dona Maria + ficha de scoring) | Imprimir antes de cada entrevista |
| `briefing-entrevista-[candidato]-[data].md` | Briefing específico por candidato (contexto, riscos, roteiro adaptado, cenários GO/NO-GO) | Criar um por candidato antes da entrevista |
| `scoring-[nome]-[data].md` | Ficha de scoring preenchida pós-entrevista (resultado, decisão, próximos passos) | Criar dentro de 30 min após cada entrevista |

---

## Fluxo do processo seletivo

```
Candidato identificado
  → Criar briefing-[nome]-[data].md (usar briefing-entrevista-roni-22-05-2026.md como modelo)
  → Compartilhar link formulario-qualificacao-closer.html (pré-triagem)
  → Executar entrevista com kit-entrevista-closer-sst.md em mãos
  → Preencher scoring-[nome]-[data].md em até 30 min
  → Decisão: ≥75 GO · 60–74 2ª rodada · <60 NO-GO
  → Comunicar Rogério (template no briefing do candidato)
  → Se GO: dinâmica de campo → proposta → onboarding
  → Se NO-GO: publicar divulgacao-vaga-closer.html nos canais
  → Após contratação: atualizar RETOMADA.md + registrar historico-acoes.md do vault raiz
```

---

## Template — `scoring-[nome]-[data].md`

```markdown
---
title: Scoring — [Nome] · [DD/MM/YYYY]
tags: [sst, rh, closer, scoring]
candidato: [Nome]
data-entrevista: YYYY-MM-DD
score: 0
decisao: pendente  # go | segunda-rodada | no-go
criado: YYYY-MM-DD
---

# Scoring — [Nome]

| Dimensão | Peso | Score (0–10) | Pontos |
|---|---|---|---|
| Experiência real validada (números, fatos) | x3 | | |
| Conhecimento do mercado e público C/D | x2 | | |
| Simulação prática (pediu fechamento, contornou objeções) | x4 | | |
| Fit cultural (propósito, empatia, iniciativa) | x2 | | |
| Estrutura mental (sabe medir, contar, planejar) | x2 | | |
| Postura geral e energia | x1 | | |
| **TOTAL** | | | **__/140 → __/100** |

## Observações por bloco

### Trajetória (Bloco 2)
[anotar fatos concretos — metas, resultados, por que saiu]

### Simulação Dona Maria (Bloco 4)
[frases exatas nas objeções, pediu fechamento? sim/não]

### Fit cultural (Bloco 5)
[resposta à pergunta "bom samaritano", ambição]

## Decisão

**Score:** __/100 · **Decisão:** [GO / 2ª rodada / NO-GO]

**Justificativa:** [2–3 fatos objetivos, não impressão]

**Próximo passo:** [ação concreta + data]

## Mensagem enviada ao Rogério

> [colar o template do briefing preenchido]
```

---

## Editando os arquivos HTML

### `divulgacao-vaga-closer.html`

Editar diretamente no HTML. Valores que mudam com frequência:
- **Comissão/pró-labore** → buscar `R$ 2.000` ou `R$ 20 por`
- **Requisitos** → buscar `≥2 anos`
- **Data/local da entrevista** → buscar `Simões Filho`

Para gerar PDF (WhatsApp / grupos):
```powershell
# Chrome → Ctrl+P → Salvar como PDF (desativar cabeçalho/rodapé)
```

### `formulario-qualificacao-closer.html`

Formulário com eliminatórios automáticos. Para editar perguntas ou critérios de corte, buscar no HTML:
- Perguntas → tag `<label>` ou atributo `name=""`
- Critérios eliminatórios → comentários `<!-- ELIMINATORIO -->`

Para usar: abrir no navegador e compartilhar via link local ou hospedar temporariamente (ex.: GitHub Pages na branch `rh-closer`).

---

## Skills relevantes

| Skill | Quando usar |
|---|---|
| `/preparar-reuniao` | Gerar ou revisar briefing de candidato |
| `/onboarding-new-hires` | Plano 30/60/90 dias após contratação |
| `/predictable-revenue` | Validar separação SDR ≠ Closer ≠ CSM |
| `/sales-strategist` | Ajustar metodologia de qualificação e compensação |
| `revops-saude` | Calcular impacto da contratação no ARR e break-even |
| `/copywriting` | Refinar copy da divulgação para LinkedIn/WhatsApp |

---

## Regras de manipulação

1. A comissão foi **confirmada por Rogério em 03/06/2026** (R$20/adesão, R$5/Tenex, escada progressiva — detalhes no status acima). Qualquer alteração futura exige nova aprovação. O valor oficial para divulgação está em `formulario-abertura-vaga-closer-sst.md`.
2. Não publicar `divulgacao-vaga-closer.html` em canais públicos sem confirmação de Rogério.
3. Criar `scoring-[nome]-[data].md` dentro de 30 min após cada entrevista — usar o template acima.
4. Após contratação: atualizar `RETOMADA.md` (seção "Documentos criados") e registrar em `02-areas/historico-acoes.md` do vault raiz.
5. Rogério prefere mensagem curta + fatos (ver `../perfil-rogerio-diretor.md`) — não enviar análise longa, usar os templates de GO/NO-GO do briefing do candidato.
