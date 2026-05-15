---
tags: [referencia]
---
# PROMPT v2.0 — Sprint 7 Dias SST Clínica (Rocket Science Edition)
> Versão corrigida com 8 melhorias do diagnóstico pré-voo.
> Cole o bloco abaixo no Claude Code terminal dentro de `clientes/SST_Clinica_Bairro_da_Paz/`

---

```
Você é um arquiteto de processo comercial especialista em clínicas de saúde popular e
cartões de benefícios recorrentes. Implante um processo comercial completo na SST Clínica
(Simões Filho, BA) nos próximos 7 dias com redundância humana, kill switch configurado,
sponsor loop diário e gate de GO numérico para formalização do contrato advisory.

Este sprint é avaliado pelo Rocket Science Checklist — cada arquivo gerado deve eliminar
os pontos únicos de falha e ter critérios binários de GO/NO-GO por dia.

---

## CONTEXTO OPERACIONAL

**Produto:** SST Card — cartão de benefícios de saúde (consultas + exames a preço popular)
**Unidade ativa:** Simões Filho, BA
**2ª filial em preparação:** Bairro da Paz, Salvador

**Equipe e papéis:**
- Rogério Ferreira — Dono / Sponsor (Princípio 4: closer de último recurso às 18h)
- Karine Santana — Closer principal: lab + cobranças + cancelamentos + campo
  → PONTO ÚNICO DE FALHA: definir backup antes de iniciar
  → Superpoder: comunicação e convencimento. Sonho: abrir buffet.
  → Rotina atual: reconciliação manual, cobranças sem cadência, lab sem script
- Raquel — Marketing: conteúdo, redes sociais, divulgação SST Card
  → Produz vídeo, sem calendário editorial, sem integração com funil
- Lucas Cardoso — CS / Vendas SST Card (⏸️ afastado por cirurgia — Sprint 2)

**Stack ativa:** Evolution API + n8n + Chatwoot + Notion + Blingo + Google Sheets

---

## DIAGNÓSTICO PRÉ-VOO (validar no D+1 antes de qualquer disparo)

Antes de qualquer disparo em lote, o D+1 começa com validação obrigatória de 4 premissas:

1. **Taxa real de resposta WhatsApp** — buscar no histórico de disparos anteriores.
   Se não houver histórico: usar taxa conservadora de 15% (não 40%).
   Se a taxa real for < 15%, reformular o canal principal.

2. **Lista de inadimplentes segmentada por tier** (executar no D+1 antes dos scripts):
   - Tier A — ≥ 3 meses ou ≥ R$149 acumulados → Rogério liga pessoalmente
   - Tier B — 2 meses / R$99–R$149 → Karine liga direto (sem WhatsApp primeiro)
   - Tier C — 1 mês / R$49 → Cadência automática n8n D+3/D+7/D+15

3. **Backup da Karine** — quem assume lab e cobranças se ela estiver indisponível?
   Documentar nome + número no plano antes de D+2.

4. **Gate de GO para o contrato** — Rogério deve confirmar AGORA:
   "Se até D+6 (21/04) tivermos ≥ 15 adesões + ≥ 10 reativações, assino o contrato
   advisory no mesmo dia. Se não, revisamos juntos no D+7."
   Registrar a resposta no plano antes de qualquer ação.

---

## METAS DOS 7 DIAS

| Meta | Valor | Observação |
|---|---|---|
| Novas adesões SST Card | 30 | Com curva de aprendizado (ver cronograma) |
| Inadimplentes recuperados | 20 | Tier A: Rogério / B: Karine / C: automação |
| Taxa conversão lab | 33% → 60% | Kill switch no D+2 se < 25% |
| Mini evento D+4 (calçada) | 1 ação de 3h | Ensaio geral do Dia SST Saúde |
| Dia SST Saúde | 08/05 | Evento principal — blueprint pronto no D+6 |
| Agentamento Karine | 17/04 11h ✅ | Prompt personalizado entregue na sessão |
| Agentamento Raquel | 17/04 13h ✅ | Calendário editorial da semana pronto na sessão |
| Gate de GO contrato | D+6 (21/04) | Se ≥ 15+10 → apresentar proposta no D+6 |

---

## RITUAL DIÁRIO DO SPONSOR (obrigatório D+1 a D+7)

Todo dia às 8h, Mayko envia para Rogério:
```
📊 Ontem: [1 número — adesões + reativações]
🎯 Hoje: [1 linha — foco do dia]
🔴 Decisão: [1 coisa que precisa de GO do Rogério]
```
Rogério responde GO ou ajusta. Sem esse ritual, o sponsor perde urgência e o D+7 vai
virar "vou pensar mais".

---

## MISSÃO: ARQUIVOS A CRIAR

Crie toda a estrutura abaixo dentro de `processo-comercial-7dias/`. Cada arquivo começa
com "Como usar em 60 segundos". Tudo pronto para executar agora.

```
processo-comercial-7dias/
├── 00-plano-execucao-7dias.md
├── 01-scripts/
│   ├── script-conversao-lab.md
│   ├── script-cobranca-mensalidade.md
│   ├── script-reativacao-cancelados.md
│   ├── script-abordagem-ativa-card.md
│   └── script-objecoes-sst.md
├── 02-cadencias/
│   ├── cadencia-cobranca-automatizada.md
│   ├── cadencia-reativacao-cancelados.md
│   └── cadencia-onboarding-novo-membro.md
├── 03-agentamento/
│   ├── prompt-karine.md
│   ├── prompt-raquel.md
│   └── guia-rapido-equipe.md
├── 04-dia-sst-saude/
│   ├── blueprint-evento.md
│   ├── roteiro-salao-vendas.md
│   └── script-abordagem-evento.md
├── 05-bairro-da-paz/
│   ├── checklist-pre-lancamento.md
│   └── script-embaixador-local.md
└── 06-metricas/
    ├── dashboard-7dias.md
    └── meta-diaria-calculada.md
```

---

## INSTRUÇÕES POR ARQUIVO

### 00-plano-execucao-7dias.md
Cronograma de 7 dias com estas regras:

**CURVA DE APRENDIZADO nas metas (obrigatório):**
Karine nunca usou script estruturado. Exigir 6 adesões desde o D+2 é como pedir acrobacia
na primeira hora de voo solo. Use esta rampa:
- D+1: 40% da meta diária (setup + diagnóstico)
- D+2: 60% (primeiros scripts ao vivo — modo teste)
- D+3: 80% (ajuste pós-kill switch se necessário)
- D+4: 100% + mini evento calçada
- D+5–D+7: 110–120% (sprint final)

**RITUAL DIÁRIO (adicionar em cada dia):**
- 08h00: Mensagem GO/NO-GO para Rogério (3 linhas)
- 18h00: Karine envia 3 nomes para Rogério ligar

**KILL SWITCH D+2 (adicionar como bloco explícito):**
Se ao final de D+2 (17/04 às 18h) a taxa lab for < 25% OU menos de 4 respostas nas
cobranças → MUDAR IMEDIATAMENTE o ponto de abordagem:
- Lab: de "durante a espera" para "ao receber o resultado" (dor mais vívida)
- Cobrança: de texto para áudio da Karine (mais humanizado)
NÃO esperar D+5.

**PROVA SOCIAL TURBO — D+2 (Raquel):**
Raquel NÃO começa com post educativo. No D+2, após a primeira conversão de Karine no lab,
Raquel fotografa/filma o membro (com permissão) e posta story imediato:
"[Nome] acabou de aderir e economizou R$X no lab hoje."
Esse story alimenta os posts D+3 em diante com prova social real.

**GATE DE GO — D+6:**
Bloco explícito no D+6: verificar o placar. Se ≥ 15 adesões + ≥ 10 reativações →
Mayko entra em contato com Rogério naquele dia para apresentar a proposta.
Não espera D+7.

Formato de cada bloco:
- Horário + duração
- Responsável (+ backup se Karine indisponível)
- Ações específicas
- KPI do bloco
- Critério binário: sim/não
- Contingência se não atingir

---

### 01-scripts/script-conversao-lab.md
Script Karine para converter paciente do lab em membro SST Card.

**3 etapas (máximo 4 minutos no total):**

**Etapa 1 — Rapport (30–60s):** Pergunta natural sobre o exame, o pet, a situação.
Identificar: primeira vez? membro? tem outros da família que usam o serviço?

**Etapa 2 — Dor (60s):** 3 perguntas que revelam o custo de saúde sem previsibilidade.
Exemplos: "Costuma precisar de consulta e não vai por causa do valor?" / "Já deixou de
fazer exame porque era caro?" Não mais de 3 perguntas.

**Etapa 3 — Oferta SST Card (60s):** Apresentação + cálculo de economia ao vivo.
Variante A: "Com o SST Card você teria pago R$X a menos nesse exame."
Variante B (urgência): "A promoção de adesão de [VALOR] termina essa semana."
Pergunta de fechamento suave: "Posso já fazer o seu cadastro enquanto aguarda?"
Resposta para "vou pensar": "Entendo. Quer que eu te mande os detalhes no WhatsApp?"

**Registro obrigatório:** Karine preenche no Google Sheets ao final de cada turno:
abordagens feitas | responderam | aderiram | objeção principal

**Meta:** 10 abordagens/dia × 60% = 6 adesões/dia (após curva de aquecimento)

---

### 01-scripts/script-cobranca-mensalidade.md
Cadência de cobrança em 3 momentos. Cada mensagem com variante texto (WhatsApp)
e variante áudio (roteiro para Karine gravar).

**D+3 — Aviso amigável:**
Tom: lembrete de amigo. Não menciona inadimplência. Abre com benefício do cartão.
Máximo 3 parágrafos. Termina com pergunta aberta (não "você vai pagar?").

**D+7 — Urgência leve:**
Tom: preocupação genuína. Menciona que o acesso ao plano está em risco.
Ângulo diferente do D+3.

**D+15 — Urgência real + alternativa:**
Tom: direto e humanizado. Oferta de 3 alternativas: pagar tudo / pagar parcial /
pausar por 30 dias. Quem tem saída honrada paga mais do que quem se sente encurralado.

**TIER B (Karine liga, não manda mensagem):**
Roteiro de ligação de 3 minutos. Abertura + diagnóstico da situação + proposta de
renegociação + registro imediato no Blingo.

**TIER A (Rogério liga, não Karine):**
Roteiro de 5 minutos. Tom de parceiro, não cobrador. "Rogério aqui da SST — quero
entender o que aconteceu e resolver isso junto com você."

---

### 01-scripts/script-reativacao-cancelados.md
Script para recuperar membros que cancelaram nos últimos 90 dias.

Segmento A — Cancelou por preço: Gancho de renegociação + plano menor ou temporário.
Segmento B — Cancelou por falta de uso: Gancho de urgência de saúde + novidade real.
Segmento C — Cancelou sem motivo declarado: "Sentimos sua falta" + oferta simbólica.

Cadência: D+0 → D+2 (ângulo diferente) → D+5 (última tentativa, CTA direto).
Nunca repetir o mesmo argumento em toques consecutivos.

---

### 01-scripts/script-objecoes-sst.md
Para cada objeção: reconhecimento + pergunta de clarificação + resposta + retomada.

7 objeções a cobrir:
1. "Tá caro, prefiro pagar avulso"
2. "Vou pensar e te falo"
3. "Nunca preciso de médico, não compensa"
4. "Tenho convênio pela empresa"
5. "Já fui e o atendimento demorou"
6. "Não tenho dinheiro agora"
7. "Não confio nesse tipo de cartão"

Linguagem: português popular da Bahia. Sem corporativo.

---

### 02-cadencias/cadencia-cobranca-automatizada.md
Especificação técnica para n8n — somente Tier C:

- Trigger: Google Sheets coluna "dias_atraso" = 3, 7 ou 15
- Nó 1: Ler linha → identificar tier e mensagem correta
- Nó 2: Enviar via Evolution API
- Nó 3: Registrar no Notion (database Ações & Chamados)
- Nó 4: Aguardar X dias → verificar status → próxima etapa se pendente
- Horário: 9h–11h (melhor taxa de abertura)
- Limite: 80 msg/dia
- Colunas necessárias no Google Sheets

---

### 02-cadencias/cadencia-onboarding-novo-membro.md
Fluxo de boas-vindas para todo membro que aderir durante os 7 dias:

- H+2: Mensagem de boas-vindas automática (via n8n) com link de agendamento
- D+3: Follow-up se ainda não agendou — convite para 1ª consulta gratuita
- D+7: Se não usou ainda — "seu cartão está esperando por você"
- D+30: Check-in de satisfação + pedido de indicação

Regra: quem usa na primeira semana renova em 85%+ dos casos.

---

### 03-agentamento/prompt-karine.md
Prompts personalizados para Karine usar no dia a dia (ChatGPT gratuito ou Claude).

**Anchoring:** antes de qualquer instrução técnica, conectar:
"O que você aprende aqui, Karine, serve direto no seu buffet. Gestão de cobrança,
comunicação de vendas, cadência de clientes — é o mesmo processo."

**Prompt 1 — Reconciliação:**
```
Você é minha assistente financeira da SST Clínica. Recebi a lista de pagamentos do dia.
Aqui está: [COLAR LISTA].
Me dê: 1) Total recebido 2) Quem está em atraso e há quantos dias 3) Mensagem de
cobrança pronta para cada inadimplente (D+3, D+7 ou D+15 conforme os dias de atraso).
```

**Prompt 2 — Conversão no lab:**
```
Você é minha parceira de vendas. Tenho um paciente no lab com este perfil: [DESCREVER].
Me dê: 1) Como abrir a conversa naturalmente 2) 2 perguntas para descobrir a dor
3) Como apresentar o SST Card em 1 minuto no máximo.
```

**Prompt 3 — Tratativa de objeção:**
```
O membro disse: "[OBJEÇÃO EXATA]". Me dê 3 formas de responder: 1) suave 2) direta
3) com alternativa concreta. Linguagem simples, como amigo falando.
```

**Como salvar no celular:** instrução passo a passo para fixar no ChatGPT (My GPTs ou
nota fixada) + erro mais comum ao usar IA (copiar a resposta sem adaptar para o contexto real).

---

### 03-agentamento/prompt-raquel.md
Prompts personalizados para Raquel criar conteúdo SST Card com IA.

**Princípio do D+2:** Raquel começa com depoimento real, não post educativo.
Story de "João economizou R$X hoje" converte mais do que 10 posts sobre pressão alta.

**Prompt 1 — Roteiro de vídeo 30s:**
```
Crie um roteiro de vídeo de 30 segundos para SST Card. Público: moradores de Simões Filho,
baixa renda, dependentes do SUS. Tema: [TEMA]. Formato: 1) Gancho (3s) 2) Problema (10s)
3) Solução SST Card (12s) 4) CTA com WhatsApp (5s). Tom: próximo, simples, real.
```

**Prompt 2 — Calendário editorial semanal:**
```
Crie um calendário editorial para 5 posts da semana sobre SST Card. Para cada post:
tema, formato (reel/story/feed), gancho de 1 linha, legenda e CTA. Foco em: [CAMPANHA].
```

**Prompt 3 — 1 vídeo → 4 formatos:**
```
Tenho este roteiro: [COLAR]. Transforme em:
1) Legenda para feed (máx 150 palavras)
2) Texto para WhatsApp Status (máx 2 linhas)
3) Story em 3 slides (texto de cada slide)
4) Mensagem de disparo em lote (máx 1 parágrafo)
```

---

### 04-dia-sst-saude/blueprint-evento.md
Planejamento completo do evento "Dia SST Saúde" — 08/05/2026.

**Conceito:** Transformar a clínica num salão de vendas por 1 dia.
Serviços de triagem gratuita (pressão, glicemia) como porta de entrada →
conversão em novas adesões e renegociação de inadimplentes.

**4 estações:**
1. Recepção (Raquel) — abordagem de entrada + captura de lead no WhatsApp
2. Triagem (técnico) — serviço gratuito + transição natural para oferta SST Card
3. Balcão SST Card (Karine) — nova adesão OU renegociação (scripts separados por perfil)
4. Estúdio de depoimentos (Raquel) — gravar 30s com membros satisfeitos para usar D+1

**Metas:** 15 novas adesões + 10 inadimplentes resolvidos + 20 leads para follow-up

**Orçamento máximo: R$ 500**
Itens essenciais: faixas (2) + panfletos (500) + material de triagem + fichas impressas.
Sem carro de som necessário — visibilidade vem do conteúdo da Raquel nos dias anteriores.

**Divulgação (cronograma reverso):**
- D-5 (29/04): Raquel começa contagem regressiva nos stories
- D-3 (01/05): Disparo em lote para leads frios via n8n
- D-1 (02/05): WhatsApp Status "amanhã tem Dia SST Saúde — entrada gratuita"
- Dia D: Raquel posta ao vivo durante o evento (engajamento em tempo real)

**Ponte D+7 → Evento (23/04 a 02/05 — gap crítico):**
Para não perder o momentum do sprint, criar rotina mínima no gap:
- 3x/semana: Raquel posta depoimento de membro (captado durante o sprint)
- 1x/semana: Karine faz follow-up dos leads abertos que não fecharam
- Diário: onboarding automático (n8n) para novos membros do sprint

---

### 04-dia-sst-saude/roteiro-salao-vendas.md
Roteiro hora a hora do evento para cada membro da equipe:

08h00–08h30: Setup + reunião de alinhamento (5 min de pé, não sentado)
08h30–10h00: Primeiro fluxo de público — pico de conversão
10h00–10h15: Pausa relâmpago — Karine + Raquel trocam dados (converteu quantos? quem veio?)
10h15–12h00: Foco em inadimplentes que foram agendados especificamente para este dia
12h00–12h30: Fechar conversões abertas — ninguém sai sem resposta
12h30–13h00: Depoimentos em vídeo + contagem final + mensagem de encerramento para grupo

Como lidar com fila longa, como não deixar lead esfriar, o que registrar no Notion ao vivo.

---

### 05-bairro-da-paz/checklist-pre-lancamento.md
30 ações para abrir a 2ª filial no Bairro da Paz com impacto, não só estrutura.

**Semana -4:** Negociação do ponto (Rogério), mapeamento de campo, licenças.
**Semana -3:** Recrutar 3 embaixadores locais. Fechar 2 parcerias com igrejas/associações.
**Semana -2:** Infraestrutura comercial (WhatsApp Business, catálogo, scripts, planilha de membros).
**Semana -1:** Treinar embaixadores (pitch 60s + cadastro pelo WhatsApp), instalar faixas.
**Semana 0:** Inauguração com impacto — carro de som + panfletagem + Domingo da Saúde.

Meta de pré-cadastros antes de abrir: 30 membros confirmados no dia 0.
KPI de cada semana documentado.

---

### 05-bairro-da-paz/script-embaixador-local.md
Pitch de 60 segundos para o embaixador usar no bairro.

Abertura (10s): "Você conhece o SST Card? É o cartão de saúde do povo aqui do bairro..."
Proposta (30s): Benefícios em linguagem simples. Preço que cabe no bolso.
Fechamento (20s): CTA direto. Fazer o cadastro pelo WhatsApp na hora.

Objeções frequentes do embaixador + respostas rápidas.
Tabela de comissões: R$15/individual, R$30/família — pago semanalmente.
Como registrar os cadastros + enviar para Karine/Raquel.

---

### 06-metricas/meta-diaria-calculada.md
Metas com curva de aprendizado (não linear desde D+1):

| Dia | Adesões | Reativações | Abordagens lab | Meta acumulada |
|---|---|---|---|---|
| D+1 (16/04) | 2 (setup) | 3 (Tier A — Rogério) | 10 (teste) | 2 / 3 |
| D+2 (17/04) | 4 (60%) | 5 | 15 | 6 / 8 |
| D+3 (18/04) | 5 (80%) | 3 | 15 | 11 / 11 |
| D+4 (19/04) | 6 + mini evento | 3 | 15 | 17 / 14 |
| D+5 (20/04) | 5 | 2 | 15 | 22 / 16 |
| D+6 (21/04) | 5 + GATE DE GO | 3 | 15 | 27 / 19 |
| D+7 (22/04) | 3 | 1 | 10 | 30 / 20 ✓ |

Semáforo diário:
🟢 Verde: ≥ 100% do alvo do dia
🟡 Amarelo: 70–99% → ajustar ângulo, não o produto
🔴 Vermelho: < 70% → kill switch + Rogério fecha 3 nomes às 18h

---

### 06-metricas/dashboard-7dias.md
Registros pelo celular, sem planilha complexa:

| Indicador | Onde | Frequência | Meta |
|---|---|---|---|
| Novas adesões | Google Sheets (1 linha por adesão) | Cada adesão | 30 |
| Taxa conversão lab | Google Sheets (Karine) | Por turno | ≥ 60% |
| Inadimplentes contatados | Notion Ações & Chamados | Diário | 100% da lista |
| Inadimplentes pagos | Google Sheets | Diário | 20 |
| Membros onboardados em 2h | Automação n8n | Automático | 100% |
| Depoimentos captados | Pasta WhatsApp Raquel | Semanal | 3 |

---

## ENTREGÁVEIS FINAIS (gerar após todos os arquivos)

1. **RESUMO-EXECUTIVO-SST-v2.md** — 5 movimentos para as próximas 72h + gate de GO definido

2. **Mensagem WhatsApp para Rogério** (máximo 10 linhas):
   Resumo do que foi preparado + ritual de check-in diário às 8h + confirmação do gate de GO

3. **Pauta sessão Karine — 17/04 11h:**
   Bloco 1: diagnóstico (o que ela faz, onde trava)
   Bloco 2: demonstração ao vivo com lista real de reconciliação ou cobranças
   Bloco 3: prompts personalizados instalados no celular dela
   Anchoring no buffet: conectar cada ferramenta ao negócio dela

4. **Pauta sessão Raquel — 17/04 13h:**
   Bloco 1: diagnóstico do processo atual de criação
   Bloco 2: transformar último vídeo dela em 4 formatos ao vivo com IA
   Bloco 3: calendário editorial da semana pronta ao final

5. **Blueprint Dia SST Saúde** com data 08/05, orçamento de R$500, script de cada estação
   e cronograma reverso de divulgação

---

## RESTRIÇÕES DE QUALIDADE

- Nenhum script com mais de 160 palavras
- Cada arquivo começa com "Como usar em 60 segundos"
- Linguagem: português popular da Bahia — nunca corporativo
- Variáveis {{nome_membro}} e {{valor_mensalidade}} em todos os scripts
- Prompts de agentamento funcionam no ChatGPT gratuito
- Orçamento do evento: máximo R$ 500
- Todo follow-up com ângulo diferente do toque anterior
- Métricas acompanháveis pelo celular

Comece por `00-plano-execucao-7dias.md` (com curva de aprendizado, kill switch D+2,
ritual diário e gate de GO) e `06-metricas/meta-diaria-calculada.md`.
Depois scripts e cadências. Por último, agentamento e Dia SST Saúde.

Execute agora. Não pergunte — crie.
```

---

## Melhorias v1 → v2 (o que mudou)

| # | Falha v1 | Correção v2 |
|---|---|---|
| 1 | Rogério passivo (só D+4 e D+7) | Ritual 8h diário + closer de último recurso às 18h |
| 2 | Ajuste de script no D+5 | Kill switch explícito no D+2 com condição e ação imediata |
| 3 | Todos inadimplentes iguais | Segmentação tier A/B/C antes de qualquer disparo |
| 4 | Karine = ponto único de falha | Backup definido no D+1 antes de começar |
| 5 | Raquel começa com post educativo | Prova social turbo no D+2 (depoimento real primeiro) |
| 6 | Evento apenas em 08/05 | Mini evento D+4 (calçada, 3h) como ensaio geral |
| 7 | Novo membro sem onboarding | Cadência automática: boas-vindas 2h + agendamento 7 dias |
| 8 | Gate de GO vago no D+7 | Critério numérico: ≥15+10 no D+6 → proposta no D+6 |
| + | Metas lineares desde D+1 | Curva de aprendizado 40/60/80/100/110/120% |
| + | Gap D+7 → evento sem plano | Rotina mínima 23/04–02/05 para manter momentum |

---

*Prompt v2.0 | Rocket Science Edition | 16/abr/2026*
*Skill reutilizável: `~/.claude/skills/sprint-comercial-7dias/SKILL.md`*
