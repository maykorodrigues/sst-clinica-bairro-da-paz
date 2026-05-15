---
title: Agentamento da Equipe SST — Aquisição de Competências com IA
tags: [sst, agentamento, equipe, ia, treinamento, em-progresso]
criado: 2026-04-16
responsavel: Mayko Rodrigues
status: em-progresso
relacionados:
  - "[[followup-sst-rogerio-abr2026]]"
  - "[[proposta-advisor-sst-rogerio]]"
  - "[[contexto_projeto]]"
---

# Agentamento da Equipe SST

> **Objetivo:** Transformar cada membro da equipe em um **agente aumentado por IA** — capaz de fazer mais, com menos esforço manual, gerando dados confiáveis e tomando decisões baseadas em processo.

Este documento é vivo. Cada sessão de agentamento gera atualizações aqui.

---

## O que é agentamento

Agentamento não é só usar IA. É o processo de:

1. **Mapear a rotina real** da pessoa (o que ela faz hoje, como faz, onde trava)
2. **Identificar onde a IA substitui esforço manual** sem tirar autonomia
3. **Treinar o uso prático** com ferramentas reais no contexto dela
4. **Criar loops de feedback** para a pessoa melhorar o uso ao longo do tempo

Resultado esperado: cada pessoa da equipe tem um **assistente de IA próprio** para sua função.

---

## Equipe SST — Mapa de Agentamento

| Pessoa | Função real | WhatsApp | Sprint | Sessão | Status |
|---|---|---|---|---|---|
| Karine Santana | Closer + Financeiro + Cancelamentos | +55 71 8684-4401 | Sprint 1 | ✅ 17/abr 11h | Confirmada — email: Karineeuamojesus05@gmail.com |
| Raquel | Marketing | +55 71 8255-5752 | Sprint 1 | ✅ 17/abr 13h | Confirmada — Meet: meet.google.com/pfx-mgsq-pnk |
| Lucas Cardoso | Sucesso do Cliente | +55 71 9271-2271 | Sprint 2 | ⏸️ Aguardando | Cirurgia na mão — vai alinhar com Rogério antes |
| Rogério Ferreira | Diretor / Dono | — | Ongoing | A agendar | Após formalizar advisory |

---

## Karine Santana — Lab + Reconciliação/Cobranças

### Perfil atual (antes do agentamento)

Com base nas observações da operação:

- Envia listas de reconciliação manualmente via WhatsApp (prints de planilhas)
- Controla cobranças em planilha sem automação de notificação
- Realiza o processo de conversão do lab de forma não padronizada (sem script, sem dados)
- Gasta tempo elevado em tarefas operacionais repetitivas (digitação, envio de mensagens)

### Competências-alvo

| Competência | Nível atual | Nível alvo | Ferramenta |
|---|---|---|---|
| Registro estruturado de reconciliação | Manual / print | Planilha + relatório automático | Google Sheets + n8n |
| Comunicação de cobranças | Manual, pontual | Cadência automatizada (D+3, D+7, D+15) | n8n + WhatsApp Business |
| Abordagem de conversão no lab | Intuitiva | Script de oferta com IA de suporte | ChatGPT / Claude (prompt treinado) |
| Leitura de indicadores | Nenhuma | Dashboard simples (taxa de conversão) | Google Sheets / Notion |
| Uso de IA para criar mensagens | Não usa | Prompts para cobranças, retorno, oferta | ChatGPT / Claude |

### Rotina atual → Rotina aumentada

**Reconciliação:**
- Antes: exporta planilha → tira print → envia no grupo
- Depois: atualiza planilha → sistema gera resumo automático → envia pelo n8n

**Cobranças:**
- Antes: liga ou manda mensagem individual manualmente
- Depois: lista de inadimplentes gerada automaticamente → mensagem personalizada com IA → envio em lote via n8n

**Conversão no lab:**
- Antes: abordagem informal baseada no feeling
- Depois: script de 3 etapas (rapport → dor → oferta SST Card) com respostas de objeção prontas

### Pauta da sessão — ✅ 17/abr 11h (confirmada)

**Duração:** 1h

**Bloco 1 — Diagnóstico (15 min)**
- O que você faz num dia típico? (pedir para ela descrever passo a passo)
- Onde você perde mais tempo?
- O que te trava ou te estresa no trabalho?

**Bloco 2 — Demonstração prática (25 min)**
- Mostrar o que a IA consegue fazer com a lista de reconciliação dela
- Pegar uma lista real e gerar um resumo, mensagem de cobrança e relatório ao vivo
- Deixar ela testar: "me manda uma situação real, a gente resolve agora"

**Bloco 3 — Compromisso e próximo passo (20 min)**
- Definir 1 tarefa que ela vai fazer diferente a partir de hoje (pequena, viável)
- Documentar o processo novo no bloco abaixo
- Combinar check-in em 7 dias

### Processos documentados (atualizar após cada sessão)

> *Preencher após sessão de 17/abr*

- [ ] Processo de reconciliação (novo fluxo)
- [ ] Script de cobrança (mensagens modelo)
- [ ] Script de conversão no lab
- [ ] Prompt da Karine (personalizado para o contexto dela)

### Histórico de sessões

| Data | Tema | O que foi feito | Próximo passo |
|---|---|---|---|
| 17/abr 11h | Diagnóstico + demonstração prática | — | Preencher após sessão |

---

## Lucas Cardoso — Cartão SST + Reconciliação

### Perfil atual

- Responsável por vendas do cartão SST e reconciliação financeira
- Processo de vendas não documentado
- Reconciliação feita em planilha manual

### Competências-alvo

| Competência | Nível atual | Nível alvo | Ferramenta |
|---|---|---|---|
| Pipeline de vendas | Informal | Registro diário no CRM/Notion | Notion ou planilha estruturada |
| Abordagem de vendas | Intuitiva | Script com etapas claras + objeções mapeadas | Claude (prompt de vendas) |
| Reconciliação financeira | Manual | Relatório automático semanal | Google Sheets + n8n |
| Follow-up de prospectos | Nenhum | Cadência D+1, D+3, D+7 | n8n + WhatsApp |

### Pauta da sessão — ⏸️ Adiada (cirurgia na mão)

**Bloco 1 — Mapeamento do processo de venda (20 min)**
- Como você aborda alguém? Qual é o argumento?
- Quantas pessoas você fala por dia? Quantas fecham?
- Quais as objeções mais comuns?

**Bloco 2 — Construção do script ao vivo (25 min)**
- Criar com ele o script de vendas do cartão SST (usando IA para refinar)
- Simular uma abordagem: ele faz o papel do vendedor, Mayko faz o papel do cliente

**Bloco 3 — Acordo operacional (15 min)**
- Definir como ele vai registrar as vendas e prospectos a partir de agora
- Combinar formato de relatório semanal

### Processos documentados

> *Preencher após sessão de 18/abr*

- [ ] Script de vendas SST Card
- [ ] Objeções mapeadas + respostas
- [ ] Modelo de registro de prospectos
- [ ] Formato do relatório semanal

### Histórico de sessões

| Data | Tema | O que foi feito | Próximo passo |
|---|---|---|---|
| 16/abr | Contato inicial | Lucas em recuperação de cirurgia na mão — vai alinhar com Rogério antes de confirmar nova data | Aguardar retorno |

---

## Raquel — Marketing

### Perfil atual

- Responsável pelo marketing da SST Card/Clínica
- Produz conteúdo de vídeo (confirmado no grupo — vídeo de divulgação SST Card)
- Processo de criação e publicação de conteúdo não documentado
- Sem integração com funil comercial (leads, captação)

### Competências-alvo

| Competência | Nível atual | Nível alvo | Ferramenta |
|---|---|---|---|
| Criação de copy para posts/vídeos | Manual/intuitivo | Prompts de copy com IA em 5 min | Claude / ChatGPT |
| Calendário de conteúdo | Sem estrutura | Planejamento semanal com IA | Notion + Claude |
| Integração marketing → vendas | Desconectada | Leads do conteúdo entram no funil | n8n + WhatsApp |
| Relatório de alcance/resultado | Nenhum | Resumo semanal de métricas | Instagram Insights + resumo IA |

### Pauta da sessão — ✅ 17/abr 13h | meet.google.com/pfx-mgsq-pnk

**Bloco 1 — Diagnóstico (15 min)**
- Como você cria os conteúdos hoje? Qual é o processo?
- Quanto tempo leva para criar um post/vídeo?
- O que te trava mais — ideia, texto, edição ou publicação?

**Bloco 2 — Demonstração prática (25 min)**
- Pegar um tema real e criar roteiro + legenda + CTA ao vivo com IA
- Mostrar como transformar um vídeo em 5 formatos de conteúdo

**Bloco 3 — Compromisso (20 min)**
- Definir 1 processo novo a partir de hoje
- Montar calendário da próxima semana com IA ao vivo

### Processos documentados

> *Preencher após sessão*

- [ ] Processo de criação de conteúdo (novo fluxo com IA)
- [ ] Prompt padrão da Raquel (copy SST Card)
- [ ] Calendário modelo semanal

### Histórico de sessões

| Data | Tema | O que foi feito | Próximo passo |
|---|---|---|---|
| — | — | — | Agendar sessão |

---

## Indicadores do Agentamento (acompanhar mensalmente)

| Pessoa | Indicador | Antes | Depois | Data medição |
|---|---|---|---|---|
| Karine | Taxa de conversão lab | ~33% | meta 60% | — |
| Karine | Tempo gasto em reconciliação/cobranças | — | — | — |
| Lucas | Vendas SST Card/mês | — | — | — |
| Lucas | Taxa de follow-up ativo | 0% | — | — |
| Aline | Cancelados reativados/mês | 0 | meta 20+ | — |

---

## Materiais de apoio

- Prompts criados durante as sessões → documentar em `03-recursos/prompts-equipe-sst/`
- Scripts de abordagem → documentar em cada seção acima
- Workflows n8n criados → registrar em `03-recursos/workflows-n8n.md`

---

Voltar para [[followup-sst-rogerio-abr2026]] | [[contexto_projeto]] | [[Consultoria Comercial]]
