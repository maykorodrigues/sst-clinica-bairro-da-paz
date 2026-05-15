---
tags: [referencia]
---
# PROMPT ARQUITETADO — Sprint 7 Dias SST Clínica / SST Card
> Copie o bloco abaixo e cole direto no Claude Code terminal dentro de `clientes/SST_Clinica_Bairro_da_Paz/`

---

```
Você é um arquiteto de processo comercial especialista em clínicas de saúde popular,
cartões de benefícios e metodologia Receita Previsível. Seu trabalho é implementar um
processo comercial completo na SST Clínica (Simões Filho, BA) em 7 dias corridos,
preparar a equipe para o Dia SST Saúde (evento de vendas e recuperação de mensalidades),
e criar as bases da expansão para a 2ª filial no Bairro da Paz (Salvador).

## CONTEXTO DA OPERAÇÃO

**Unidade ativa:**
- SST Clínica / SST Card — Simões Filho, BA
- Produto: Cartão de benefícios de saúde com consultas e exames a preços populares
- MRR atual: base existente de membros SST Card (número exato a confirmar com Rogério)
- Lab: taxa de conversão atual 33% → meta 60%

**Equipe ativa:**
- Rogério Ferreira — Diretor / Dono (decisor único)
- Karine Santana — Closer + Financeiro + Cancelamentos (+55 71 8684-4401)
  → Superpoder: comunicação e convencimento. Perfil empreendedor. Sonho: abrir buffet.
  → Rotina atual: reconciliação manual, cobranças individuais sem cadência, conversão no lab sem script
- Raquel — Marketing (+55 71 8255-5752)
  → Produz vídeo e conteúdo para SST Card. Sem calendário editorial. Sem integração com funil comercial.
- Lucas Cardoso — Sucesso do Cliente / Vendas SST Card (+55 71 9271-2271)
  → Em recuperação de cirurgia na mão. Sprint 2. Não incluir nos 7 dias.

**Stack tecnológica ativa:**
- Evolution API + WhatsApp Business
- n8n (automações)
- Chatwoot (atendimento omnichannel)
- Notion (CRM / base de conhecimento)
- Blingo (plataforma de gestão SST Card)
- Google Sheets (controle de membros, inadimplência, reconciliação)

**Metas dos 7 dias:**
1. Aumentar conversão do lab: 33% → meta 60% (Karine com script ativo)
2. Reduzir inadimplência: cadência de cobrança automatizada (D+3, D+7, D+15)
3. Recuperar mensalidades em atraso: mínimo 20 reativações
4. Novas adesões SST Card: 30 novos membros
5. Preparar o "Dia SST Saúde": blueprint completo do evento
6. Preparar a 2ª filial (Bairro da Paz): materiais e scripts de pré-lançamento
7. Agentamento Karine + Raquel: prompts personalizados e novos fluxos documentados

---

## MISSÃO

Crie TODOS os arquivos abaixo dentro da pasta `processo-comercial-7dias/`. Cada arquivo
deve ser um instrumento de trabalho imediato — não teoria, não conceito. Tudo pronto
para usar hoje mesmo.

## ESTRUTURA DE ARQUIVOS A CRIAR

```
processo-comercial-7dias/
├── 00-plano-execucao-7dias.md              — cronograma blocos de 2h, responsável, KPI, contingência
├── 01-scripts/
│   ├── script-conversao-lab.md             — script Karine: 3 etapas (rapport → dor → oferta SST Card)
│   ├── script-cobranca-mensalidade.md      — cadência cobrança D+3, D+7, D+15 com mensagens prontas
│   ├── script-reativacao-cancelados.md     — recuperação de membros cancelados / inativos
│   ├── script-abordagem-ativa-card.md      — abordagem presencial e WhatsApp para novo membro
│   └── script-objecoes-sst.md              — 7 objeções mais comuns + respostas estruturadas
├── 02-cadencias/
│   ├── cadencia-cobranca-automatizada.md   — fluxo n8n D+3/D+7/D+15 para inadimplentes
│   ├── cadencia-reativacao-cancelados.md   — sequência 7 dias para membros cancelados
│   └── cadencia-novos-membros.md           — onboarding + engajamento primeiros 30 dias
├── 03-agentamento/
│   ├── prompt-karine.md                    — prompt personalizado Karine: lab + cobranças + reconciliação
│   ├── prompt-raquel.md                    — prompt personalizado Raquel: criação de conteúdo + calendário
│   ├── guia-rapido-karine.md               — 1 página: 3 erros, 3 movimentos, frases que convertem no lab
│   └── guia-rapido-raquel.md               — 1 página: como usar IA para criar 1 semana de conteúdo em 1h
├── 04-dia-sst-saude/
│   ├── blueprint-evento.md                 — planejamento completo do evento "Dia SST Saúde"
│   ├── roteiro-salao-vendas.md             — como transformar a clínica num salão de vendas no dia D
│   └── script-abordagem-evento.md          — script da equipe durante o evento (cada estação)
├── 05-bairro-da-paz/
│   ├── checklist-pre-lancamento.md         — 30 ações antes de abrir a 2ª filial
│   └── script-embaixador-local.md          — pitch de 60s do embaixador + tabela de comissões
└── 06-metricas/
    ├── dashboard-7dias.md                  — o que medir, onde, como registrar no celular
    └── meta-diaria-calculada.md            — breakdown diário: membros, conversões, receita
```

---

## INSTRUÇÕES DE CRIAÇÃO

### 00-plano-execucao-7dias.md
Cronograma de 7 dias (16/04 Qua a 22/04 Ter) com:
- Blocos de 2h para cada ação
- Responsável (Rogério / Karine / Raquel)
- KPI esperado ao final do dia
- Critério de sucesso binário (sim/não)
- O que fazer se o KPI não foi atingido

**DIA 1 (16/04 — hoje):** Diagnóstico e setup. Karine mapeia inadimplentes. Raquel mapeia leads do conteúdo.
**DIA 2 (17/04):** Sessões de agentamento Karine (11h) + Raquel (13h). Ativar scripts ao vivo.
**DIA 3 (18/04):** Primeiro disparo de cobrança automatizada. Script lab ativo.
**DIA 4 (19/04):** Ação de campo — abordagem ativa de novos membros.
**DIA 5 (20/04):** Review de resultados + ajuste de script.
**DIA 6 (21/04):** Segunda rodada de reativação + montagem do Dia SST Saúde.
**DIA 7 (22/04):** Consolidação + projeção de break-even + envio de update para Rogério.

---

### 01-scripts/script-conversao-lab.md
Script para Karine converter paciente que veio ao laboratório em membro SST Card.

**Etapa 1 — Rapport (30 segundos):**
Enquanto o paciente aguarda o exame, Karine abre conversa natural sobre saúde, histórico, preocupações.

**Etapa 2 — Descoberta da dor (1 minuto):**
3 perguntas que revelam o custo de não ter saúde preventiva acessível.

**Etapa 3 — Oferta SST Card (1 minuto):**
Apresentação em linguagem simples + cálculo de economia na hora.
Incluir: variante A (consulta avulsa vs. SST Card) e variante B (urgência de prazo).
Pergunta de fechamento suave + resposta para "vou pensar".

**Taxa atual: 33% → Meta: 60%**
Crie métricas simples: Karine registra 10 abordagens/dia no Google Sheets → taxa calculada automaticamente.

---

### 01-scripts/script-cobranca-mensalidade.md
Mensagens para cobrança de inadimplência em 3 momentos:

**D+3 (aviso amigável):**
Tom: lembrete amigo. Não menciona inadimplência. Abre com benefício do cartão.

**D+7 (urgência leve):**
Tom: preocupação genuína. Menciona que acesso ao plano está em risco.

**D+15 (urgência real + alternativa):**
Tom: direto e humanizado. Oferta de renegociação / pagamento parcial / pausa temporária.

Cada mensagem: variante A (WhatsApp texto) e variante B (WhatsApp áudio — roteiro para Karine gravar).
Limite: máximo 3 parágrafos. Linguagem: português simples, como amigo falando.

---

### 01-scripts/script-reativacao-cancelados.md
Script para recuperar membros que cancelaram nos últimos 90 dias.

**Segmento A — Cancelou por preço:** Gancho de renegociação + plano menor.
**Segmento B — Cancelou por falta de uso:** Gancho de urgência de saúde + novidade na clínica.
**Segmento C — Cancelou sem motivo declarado:** Gancho de "sentimos sua falta" + oferta de 1ª consulta simbólica.

Cadência: D+0 (1ª mensagem), D+2 (follow-up diferente), D+5 (última tentativa com CTA forte).

---

### 01-scripts/script-objecoes-sst.md
Para cada objeção: reconhecimento + pergunta de clarificação + resposta + retomada do fechamento.

Objeções a cobrir:
1. "Tá caro, prefiro pagar consulta avulsa"
2. "Vou pensar e te falo"
3. "Nunca preciso de médico, não compensa"
4. "Tem plano de saúde pela empresa"
5. "Já fui e o atendimento demorou"
6. "Minha família não tem dinheiro agora"
7. "Não confio nesse tipo de cartão"

---

### 02-cadencias/cadencia-cobranca-automatizada.md
Especificação técnica para Mayko (consultor) implementar no n8n:

- Trigger: Google Sheets coluna "status_pagamento" = "vencido"
- Nó 1: Identificar segmento (D+3 / D+7 / D+15) pela data de vencimento
- Nó 2: Selecionar mensagem correta do script
- Nó 3: Enviar via Evolution API
- Nó 4: Registrar disparo no Notion (database "Ações & Chamados")
- Nó 5: Aguarda X dias → verifica pagamento → dispara próxima etapa se pendente
- Horário de disparo: 9h às 11h (maior taxa de abertura)
- Limite: 100 msg/dia para não suspender o número
- Formato das colunas necessárias no Google Sheets

---

### 03-agentamento/prompt-karine.md
Prompt personalizado para Karine usar no dia a dia com IA (ChatGPT ou Claude):

**Prompt base da Karine — Reconciliação:**
```
Você é minha assistente de reconciliação financeira da SST Clínica. Recebi a lista de pagamentos do dia. 
Aqui está: [COLAR LISTA]. 
Me dê: 1) Total recebido 2) Quem está em atraso e há quantos dias 3) Mensagem de cobrança pronta para cada inadimplente.
```

**Prompt base da Karine — Conversão no Lab:**
```
Você é minha parceira de vendas. Tenho um paciente no lab que é [PERFIL BREVE]. 
Me sugira: 1) Como abrir a conversa naturalmente 2) 2 perguntas para descobrir a dor 3) Como apresentar o SST Card em 1 minuto.
```

**Prompt base da Karine — Tratativa de objeção:**
```
O membro disse: "[OBJEÇÃO EXATA]". Me dê 3 formas diferentes de responder, da mais suave à mais direta.
```

Incluir: instrução de como salvar o prompt no celular, como ajustar para situações reais, erros comuns ao usar IA.

---

### 03-agentamento/prompt-raquel.md
Prompt personalizado para Raquel criar conteúdo SST Card com IA:

**Prompt base da Raquel — Roteiro de vídeo:**
```
Você é minha roteirista de vídeo para SST Card. Tema: [TEMA]. 
Público: moradores do Bairro de Simões Filho, baixa renda, dependentes do SUS. 
Crie: 1) Gancho de 3 segundos 2) Desenvolvimento em 30 segundos 3) CTA final com WhatsApp. Tom: próximo, simples, real.
```

**Prompt base da Raquel — Calendário editorial:**
```
Crie um calendário editorial para a próxima semana do SST Card com 5 posts. 
Inclua: tema, formato (reels/story/feed), gancho, legenda e CTA. 
Foco em: [CAMPANHA ATUAL].
```

**Prompt base da Raquel — Transformar 1 vídeo em múltiplos formatos:**
```
Tenho este roteiro de vídeo: [COLAR ROTEIRO]. 
Transforme em: 1) Legenda para feed 2) Texto para WhatsApp Status 3) Story com 3 slides 4) Mensagem de disparo em lote.
```

---

### 04-dia-sst-saude/blueprint-evento.md
Plano completo do evento "Dia SST Saúde" — um salão de vendas e recuperação de mensalidades.

**Conceito:**
O "Dia SST Saúde" é um evento presencial na clínica onde a comunidade tem acesso a serviços gratuitos ou simbólicos (aferição de pressão, glicemia, orientação de saúde) e a equipe converte essa visita em novas adesões e recuperação de mensalidades.

**Estrutura do evento:**
- Duração: 1 dia (sábado, 8h–13h)
- Estação 1 — Recepção e triagem: Raquel (abordagem de entrada + captação de lead no WhatsApp)
- Estação 2 — Serviços gratuitos: técnico (pressão, glicemia) + apresentação do plano ao final
- Estação 3 — Balcão SST Card: Karine (conversão de novo membro + renegociação de inadimplentes)
- Estação 4 — Depoimentos ao vivo: membros satisfeitos gravam vídeo de 30s para Raquel usar

**Materiais necessários:**
- Faixa "Dia SST Saúde — Entrada gratuita" (1 para frente + 1 para rua)
- Fichas de cadastro impressas (backup se WhatsApp cair)
- Termômetro físico de membros na recepção (atualizado ao vivo)
- Tabela de preços: sem SST Card vs. com SST Card (grande, visível)

**Meta do evento:**
- 15 novas adesões
- 10 inadimplentes renegociados / pagos
- 20 leads capturados para follow-up posterior

**Como divulgar:**
- 3 dias antes: stories e reels da Raquel com contagem regressiva
- 2 dias antes: disparo em lote para base de leads frios via n8n
- 1 dia antes: WhatsApp Status com "amanhã tem Dia SST Saúde"
- No dia: carro de som de manhã cedo (7h–8h) percorrendo o bairro

---

### 04-dia-sst-saude/roteiro-salao-vendas.md
Roteiro hora a hora do evento para cada membro da equipe.

8h00–8h30: Setup das estações + reunião de alinhamento (5 min)
8h30–10h00: Primeiro fluxo de público — pico de conversão
10h00–10h15: Pausa relâmpago — Karine e Raquel trocam dados (quem veio, quem converteu)
10h15–12h00: Segundo fluxo — foco em inadimplentes agendados para o evento
12h00–12h30: Fechamento das conversões abertas — ninguém sai sem resposta
12h30–13h00: Depoimentos em vídeo + contagem final de resultados

Incluir: como lidar com fila longa, como não deixar lead esfriar, o que registrar no Notion em tempo real.

---

### 04-dia-sst-saude/script-abordagem-evento.md
Script para cada estação do evento:

**Estação 1 (Raquel) — Recepção:**
Abordagem ao entrar, captura de WhatsApp, direcionamento para estação de serviço.

**Estação 2 (técnico) — Serviços gratuitos:**
Após o serviço, transição natural para apresentar o SST Card.

**Estação 3 (Karine) — Balcão SST Card:**
Script de nova adesão + script de renegociação de inadimplência (linguagem separada para cada perfil).

---

### 05-bairro-da-paz/checklist-pre-lancamento.md
30 ações necessárias antes de abrir a 2ª filial no Bairro da Paz:

**Semana -4 (ainda não abriu):** Mapeamento de campo, negociação do ponto, licenças.
**Semana -3:** Recrutamento de embaixadores locais, parcerias com igrejas e associações.
**Semana -2:** Infraestrutura comercial (WhatsApp Business, catálogo, scripts, panfletos).
**Semana -1:** Treinar embaixadores, instalar faixas, configurar planilha de membros.
**Semana 0:** Inauguração com impacto (carro de som + panfletagem + Domingo da Saúde).

Responsável por cada ação: Rogério / Karine / Raquel / Embaixador Local.
KPI de cada semana: número de pré-cadastros antes de abrir.

---

### 05-bairro-da-paz/script-embaixador-local.md
Pitch de 60 segundos para o embaixador usar no bairro:

**Abertura (10s):** "Você conhece o SST Card? É o cartão de saúde do povo aqui do bairro..."
**Proposta (30s):** Benefícios em linguagem simples + preço que cabe no bolso.
**Fechamento (20s):** CTA direto + tabela de comissões do embaixador.

Incluir: como lidar com "não tenho dinheiro agora", como fazer o cadastro pelo WhatsApp na hora, o que fazer se a pessoa pedir para pensar.

---

### 06-metricas/dashboard-7dias.md
O que medir, onde e como registrar pelo celular (sem precisar de computador).

| Indicador | Onde registrar | Frequência | Meta 7 dias |
|---|---|---|---|
| Novas adesões SST Card | Google Sheets | Diário | 30 novos |
| Taxa conversão lab | Google Sheets (Karine) | Por turno | 60% |
| Inadimplentes contatados | Notion (Ações & Chamados) | Diário | 100% da lista |
| Inadimplentes reativados | Google Sheets | Diário | 20 reativados |
| Posts publicados (Raquel) | Notion | Semanal | 5 posts/semana |
| Leads capturados (digital) | WhatsApp → Notion | Diário | 10/dia |

Semáforo de performance diário:
- 🟢 Verde: ≥ 100% da meta
- 🟡 Amarelo: 70–99%
- 🔴 Vermelho: < 70% → acionar contingência

---

### 06-metricas/meta-diaria-calculada.md
Com base nas metas dos 7 dias:

**Novas adesões:** 30 membros ÷ 5 dias úteis = 6 novas adesões/dia
**Conversão lab:** 10 abordagens/dia × 60% = 6 conversões/dia
**Inadimplentes:** 100 contatados ÷ 7 dias = 15 cobranças/dia
**Meta de recuperação:** 20 reativações ÷ 7 dias = 3 pagamentos/dia

**Funnel de conversão:**
Contato → Resposta → Proposta → Fechamento
100 → 40% (40) → 60% (24) → 33% (8) = 8 novos membros/dia (meta: 6 ✓)

**O que fazer se o dia fechar vermelho:**
- Menos de 3 adesões: Rogério faz ligação pessoal para os 5 melhores leads do dia
- Taxa lab < 40%: Karine assiste 1 trecho da demonstração prática do agentamento
- Zero reativações: Mudar script de cobrança para o de urgência imediata

---

## ENTREGÁVEIS FINAIS

Após criar todos os arquivos, gere:

1. **RESUMO-EXECUTIVO-SST.md** com os 5 movimentos mais importantes para as próximas 72h

2. **Mensagem WhatsApp para Rogério** (máximo 10 linhas, tom de consultor seguro):
   Resumo do que foi preparado + convite para revisar + próximos passos

3. **Pauta da sessão de agentamento — Karine (17/04 11h):**
   60 minutos estruturados. Anchoring no sonho do buffet. Demonstração ao vivo com lista real.
   Entrega: prompt personalizado dela ao final da sessão.

4. **Pauta da sessão de agentamento — Raquel (17/04 13h):**
   60 minutos estruturados. Pegar último vídeo dela e transformar em 3 formatos ao vivo.
   Entrega: calendário editorial da próxima semana pronto ao final.

5. **Blueprint do "Dia SST Saúde"** já com data sugerida, lista de materiais e divisão de tarefas
   (arquivo `04-dia-sst-saude/blueprint-evento.md` deve ser gerado com datas reais de abril/maio 2026)

---

## RESTRIÇÕES DE QUALIDADE

- Nenhum script pode ter mais de 160 palavras (limite de atenção no WhatsApp)
- Linguagem: português popular da Bahia — não texto corporativo
- Todo script deve ter variável {{nome_membro}} e {{valor_mensalidade}} para personalização
- Todo follow-up deve ter ângulo diferente do toque anterior (nunca repete a mesma mensagem)
- Cada arquivo começa com "Como usar em 60 segundos" antes do conteúdo
- Métricas acompanháveis pelo celular — sem planilha complexa
- Os prompts de Karine e Raquel devem funcionar no ChatGPT gratuito (sem API)
- O blueprint do Dia SST Saúde deve ser executável com R$ 500 ou menos de investimento

---

## CONTEXTO DA PROPOSTA ADVISORY (para calibrar o tom)

- Rogério aceitou verbalmente R$30k de investimento
- Ele propôs 10% da receita do Bairro da Paz para o consultor
- Dor declarada: equipe sem processo, lab com 33% de conversão, expansão parada
- Custo de NÃO agir: R$55k/mês perdidos na conversão do lab
- Prazo autodeclarado por Rogério: formatar equipe até fim de abril
- Urgência real: os 7 dias devem mostrar resultado concreto ANTES de formalizar o contrato

---

Comece por `00-plano-execucao-7dias.md` e `06-metricas/meta-diaria-calculada.md`.
Depois crie os scripts e cadências.
Por último, o agentamento e o Dia SST Saúde.

Execute agora. Não pergunte — crie.
```

---

## Como usar este prompt

1. Abra o Claude Code terminal dentro de `clientes/SST_Clinica_Bairro_da_Paz/`
2. Copie o bloco entre os ``` acima
3. Cole no terminal e pressione Enter
4. O Claude irá criar a pasta `processo-comercial-7dias/` com todos os arquivos

## Personalizações opcionais antes de colar

| Variável | Valor atual | Trocar por |
|---|---|---|
| Meta de adesões | 30 membros/7 dias | Ajustar com Rogério |
| Data do Dia SST Saúde | Sugerido: sábado 26/04 | Confirmar disponibilidade |
| Taxa de conversão lab | 33% → 60% | Confirmar com Karine |
| Limite de disparo | 100 msg/dia | Ajustar conforme número WhatsApp |
| Investimento evento | R$ 500 | Ajustar conforme orçamento Rogério |

## Skills a ativar manualmente após a criação

```
/predictable-revenue    → para calibrar taxas de conversão e cadência SDR
/whatsapp-automation    → para validar especificação técnica do n8n
/copywriting            → para refinar scripts após rascunho inicial
/sales-strategist       → para revisar o plano dos 7 dias e o Dia SST Saúde
/onboarding-new-hires   → para estruturar o agentamento de Karine e Raquel
```

---

*Gerado por Claude Code — 16/abr/2026 | Contexto: SST Clínica Bairro da Paz + Agentamento Equipe*
