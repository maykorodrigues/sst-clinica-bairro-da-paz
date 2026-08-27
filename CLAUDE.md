# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## O que é este projeto

Consultoria comercial ativa para **Rogério Ferreira** (SST Clínica / SST Card), focada em estruturar e executar a máquina de vendas da 2ª filial (Bairro da Paz, Salvador/BA). O produto central é o **SST Card** — benefício de saúde (R$39,90–R$64,90/mês + taxa de adesão R$35,00) voltado a trabalhadores informais de baixa renda.

O consultor é **Mayko Rodrigues**. O trabalho é documentado neste diretório em Markdown, espelhado no Notion e executado via WhatsApp + n8n.

**Status do Projeto (05/08/2026 — ver `RETOMADA.md` para o estado vivo, este bloco é só orientação rápida):**
- 🎛️ **E-Chat (EAS Systems) virou o canal oficial de atendimento** — já contratado pelo Rogério, roda o WhatsApp API oficial da clínica com CRM, IA de sugestão de resposta e formulários de qualificação parados. Decisão da reunião 04/08 com Elieser: **tocar a partir do E-Chat, sem migrar para Chatwoot/Evolution**. Squad de orquestração (Overclock, panes Claude+Codex) em `squad-echat-overclock/`
- 🖥️ **VPS OpenClaw `ssf-card-clinica` (Hetzner CX33, 62.238.33.111)** é a camada "cérebro" (SDR/cobrança/CS semi-autônomos) por trás do E-Chat "corpo" — ponte via webhook E-Chat → n8n → `chatCompletions`. Ver memory `vps-ssf-card-typebot-quiz-20-07-2026`
- 🤖 **Projeto Atendimento IA Clínica** (kickoff Débora 20/07) — transformar a Léia (GPT Maker) em atendente de agendamento via Klingo/E-Chat/Vidas; gargalo identificado é comercial, não técnico (145 chamadas/dia, ~16 atendidas). Ver `atendimento-ia-clinica/CLAUDE.md`
- ✅ **Advisory assinado** em 01/05/2026 (contrato R$30k validado)
- ✅ **Bairro da Paz — 2ª filial INAUGURADA em 01/07/2026** — foco migrou de abrir para operar/vender. Faixas de rua de lançamento pedidas pelo Rogério em 06/07 (ver `05-bairro-da-paz/faixas-lancamento-06-07-2026.md`) e proposta de Sala de Odontologia (fusão Clínica 03+04, revisão de planta) em `05-bairro-da-paz/proposta-sala-odontologia-06-07-2026.md`
- ✅ **Reunião Mensal 02/07 concluída** (ata: `reuniao-mensal-02-07-2026.md`) — descobriu que **o cartão já se paga** (produção mai+jun R$22.270 > aporte R$11.943). Produção real jun **R$12.144**; adimplência recorrente **54,4%** = R$7,9k/mês parados. **Decisões:** reajuste R$24,90→R$39,90 (julho, +R$13,5–29,5k/ano) · unificar contas · **Karine promovida a Closer Senior** + estrutura (2 juniores + 1 cobrança) · meta julho **56 Prata + 24 Ouro**
- ✅ **Precificação redefinida** (02/06): Individual R$39,90 + Família R$64,90 + Adesão R$35 — ver Decisões Estratégicas no `RETOMADA.md`
- 🔴 **Checklist Semana 1 de Julho — PENDENTE COM ROGÉRIO:** liberar aporte semana 1 (~R$7k) · cravar salários definitivos · GO no reajuste + régua de desconto (10%/40%/50%) · agenda 2×/sem BP. Ver `checklist-semana1-julho-2026.md`
- 🤖 **Automatização dos processos (retomada 06/07)** — as **19 automações existem como JSON** em `02-cadencias/*.json`, mas foram **construídas, não implantadas**. Gargalo nunca foi código: é importar no n8n + env vars + testar + ligar cron. **🔴 BLOQUEADOR ATIVO:** confirmar o que está vivo em `n8n.clinicalucrativa.ia.br` exige autenticar o MCP n8n → **rodar `/mcp` → selecionar "claude.ai n8n"** antes de listar workflows. Ver `RETOMADA.md` (bloco "AO RETOMAR 06/07") e `memory/retomada_automatizacao_processos_06-07-2026.md`
- 🤖 **Agente Kanban de Dívidas (candidato #1 de automação — destrava ~R$7,9k/mês)** — workflow n8n que lê a Pipeline Notion da Karine, sugere oferta/mensagem por card e separa **caixa RECORRENTE (cartão automático) vs ATIVO (cobrança = esforço real)** no resumo das 07h30. JSON pronto (`02-cadencias/n8n-agente-kanban-dividas.json`), spec em `05-agentamento-karine-ia/07-agente-kanban-dividas.md`. Pode ser **importado e testado em modo manual** sem esperar a régua do Rogério (só o cron escalado depende dela). Ver `memory/proxima_tarefa_n8n_agente_kanban.md`
- 📉 **Problema sistêmico "BOOM"** (levantado na matinal 03/07) — sistema inativa ativos, falha na cobrança de cartão e dificulta acesso; uma das 3 prioridades de julho (junto de cobrança multi-canal + relatório com número real)
- 🔄 **Transição PJ equipe** — contratos Lucas/Karine/Raquel em andamento (`processo-comercial-7dias/transicao-pj-equipe-sst.md`)
- 🔄 **VISA Salvador + alvará** — entrada estava prevista 30/05 e venceu o prazo; reconfirmar status com Rogério (ver `memory/pendencias_criticas_09-06-2026.md`)
- 👤 **RH Closer Bairro da Paz** — **Safira Letícia Souza Pereira** é a principal candidata (aprovada na fase comportamental 11/06 → aguarda fase 2 de competências, presencial com Rogério; possível futura gestora). **Já não é única**: desde 15/06 há também **Vanesca Nascimento** (mora no Bairro da Paz, sem experiência no produto) — guia de entrevista + scoring commitados. Etapa decisiva: teste de campo com 2–3 candidatos. Ver `rh-closer/`
- ℹ️ **Roni** — funcionário do RH da SST (irmão e indicação do Rogério); apoia as funções de Recursos Humanos. **NÃO é candidato a closer** (registro histórico de 22/05 foi um mal-entendido)
- 👤 **RH Clínica** — processo seletivo coordenadora clínica em `rh-clinica/` (aprovação salário pendente Rogério)
- 📊 **Playbook web** — https://playbook.ssfcard.ia.br (Vercel + Cloudflare)
- 🧠 **Memory system** — `.claude/projects/.../memory/` — consulte MEMORY.md para contexto persistente

**Leia sempre `RETOMADA.md` antes de agir** — é o "estado do projeto": decisões tomadas, documentos criados e próximos passos. Não repita o que já está lá.


## Registro Operacional — Reuniao Elieser/Rogerio 26/08/2026

Fonte detalhada: `reuniao-elieser-rogerio.md`.

**Contexto:** conversa com Elieser e Rogerio sobre EAS, mudancas da Meta, WhatsApp API oficial, WhatsApp de coexistencia e viabilidade de uma operacao hibrida para a Clinica Bairro da Paz / Clinica Lucrativa IA.

**Tese de trabalho:** usar automacao de forma enxuta para iniciar, aquecer e qualificar conversas pela API oficial da Meta, transferindo para atendimento humano via WhatsApp Business/Web quando fizer sentido economico. O objetivo e preservar margem, reduzir desperdicio de lead e evitar funis longos impagaveis via API.

**Leitura tecnica de Elieser:** a coexistencia, pelo entendimento preliminar dele e discussoes em grupo de CIOs, nao necessariamente muda a cobranca da Meta. A vantagem aparente e reduzir friccao de onboarding para pequenas empresas que precisam entrar no ecossistema oficial: BM validada, site, politica de privacidade, CNPJ, razao social, endereco, dados de pagamento e numero elegivel antes da migracao.

**Prioridades a cobrar do Elieser:**
1. Validar se o fluxo API + coexistencia permite iniciar/qualificar via API e continuar atendimento humano no WhatsApp Business/Web.
2. Confirmar regras de cobranca da Meta: o que cobra, quando cobra, por categoria de conversa e janela.
3. Mapear limites e riscos: bloqueio, qualidade do numero, templates, opt-in, spam, volume e handoff para humano.
4. Entregar checklist fechado de BM/API/WhatsApp para a Clinica Bairro da Paz.
5. Desenhar arquitetura operacional: entrada do lead, disparo, qualificacao, passagem para humano, registro e retorno para automacao.
6. Simular custo comparando 100% API, API + coexistencia e humano sem automacao.
7. Dizer se ha piloto viavel, quais acessos precisa e prazo para validar.

**Cautela obrigatoria:** nao prometer reducao de custo, reducao de imposto ou contorno de regra antes da validacao de Elieser e da documentacao oficial da Meta. Posicionar a solucao como eficiencia comercial, automacao, organizacao de funil e aumento de conversao.

## Projeto Família Cuida de Família × Campanha Casa Cuidada — status 27/08/2026

Fonte detalhada: `familia-cuida-de-familia-triagem-nova-unidade.md`. Fontes: (1) transcrição Notion "Triagem de Nova Unidade" (26/08); (2) `Projeto_Casa_Cuidada_Planilha_V4.xlsx` (5 abas) + `Projeto_Casa_Cuidada_Reuniao_Sexta.pdf` (roteiro de reunião), lidos 27/08; (3) esclarecimento direto do Mayko em 27/08 sobre a relação entre os dois nomes.

**✅ Nomes esclarecidos pelo Mayko (27/08) — duas camadas, não dois nomes do mesmo projeto:**
- **"Família Cuida de Família"** = o **sistema/objetivo estratégico maior**: uma camada de acompanhamento a construir no Notion que cruza informações de cada cliente/família atendida na clínica, para que cada colaborador identifique — dentro da família de quem já é paciente — a possibilidade de (a) estender o cuidado a essa família e (b) usar isso como instrumento de indicação de **outra** família para a SST Clínica. Objetivo comercial explícito: **gerar leads para a equipe de vendas fechar.** O mecanismo social é "famílias indicando famílias", criando consenso cultural de "cuidar da própria família e da família do próximo".
- **"Casa Cuidada"** = a **campanha tática de comissionamento** que existe para fazer a equipe **aderir** a esse sistema — bônus, QR Code, formulário, Planilha V4, reunião de sexta. Rogério tratou isso como "prolongar uma campanha de comissionamento de cuidar dos colaboradores", mas o **pano de fundo que mede o sucesso é o Família Cuida de Família**.
- **Condição de sucesso (dita pelo Mayko):** só funciona se a equipe aderir — a cultura do time da SST Clínica **e** do SST Card precisa incorporar "cuidar de si mesmo primeiro, depois de todas as famílias". Sem adesão da equipe, a campanha Casa Cuidada não sustenta o sistema Família Cuida de Família.
- **Ainda não construído:** o sistema de acompanhamento/cruzamento de dados no Notion (o "Família Cuida de Família" propriamente dito) é um **objetivo declarado**, não algo que já existe — a Planilha V4 e o roteiro de sexta são a camada tática (Casa Cuidada) que roda primeiro.

**O que é a campanha Casa Cuidada (mecânica, confirmada pelos 2 documentos):** ciclo de 3 movimentos — a empresa cuida do funcionário → o funcionário cuida do cliente e da família dele (com consentimento) → só depois o cliente pode indicar até 3 famílias (indicação é sempre voluntária, nunca pressionada — "antes de indicar, cuidar"). Indicador central: **"Cuidou da Casa? SIM/NÃO"** — um NÃO abre recuperação obrigatória (causa + responsável + prazo), não é punição automática.

**Decisões já tomadas (Casa Cuidada):**
- Benefício de alimentação **já estendido** da equipe para toda a casa do colaborador (feito ~1 mês antes).
- Régua de entrega mínima de **70%** por setor, começando pela recepção (40 atendimentos × 70% = 28 formulários; mínimo 2 famílias captadas).
- **Correção importante (27/08) sobre os "3 meses abaixo de 70%":** a Planilha V4 **não automatiza desligamento nem corte de bonificação** — trata primeiro como revisão de desempenho/treinamento/feedback, e qualquer medida precisa passar por **RH/contabilidade/jurídico** antes de executar. Isso substitui o registro de 26/08, que soava como corte automático.

**🔴 Valores financeiros conflitantes — bater o martelo antes de imprimir cartaz ou pagar qualquer bônus:**
| Item | Conflito |
|---|---|
| Cartaz | "R$70"/"R$10" no material vs. R$0,70/R$0,30 na fala — provável erro de casa decimal |
| Bônus por registro elegível | R$0,70 funcionário + R$0,30 coordenadora = R$1,00 total; falta coluna de pagamento da coordenadora na planilha |
| Bônus por contrato fechado (funcionário) | R$10 num trecho, R$8 em outro |
| Bônus por contrato fechado (Aline) | R$5 citado, mas contas conflitantes no áudio original |
| Meta 70% / referência 90% | Denominador, período e se 90% é teto de pagamento ou só faixa de controle — tudo a definir |
| Desconto 1ª consulta (indicado) | Entre 30% e 50%, percentual não escolhido |
| Telemedicina grátis (quem preenche formulário) | Condições, prazo e agendamento não definidos |

**Papéis confirmados:** Gestor responsável = **Rogério**. Coordenadora = **Aline** (⚠️ confirmar se é a mesma Aline Souza do Lab MADIP ou outra pessoa). Período de teste = primeiro mês de implantação.

**Prioridades a cobrar do Rogério:**
1. Confirmar os valores financeiros da tabela acima (cartaz, bônus por registro, bônus por contrato — funcionário e Aline) antes de qualquer impressão/pagamento.
2. Definir denominador/período da meta 70% e o sentido do teto de 90%.
3. Confirmar se "Aline" da Casa Cuidada é a mesma do Lab MADIP.
4. Estender a régua de 70% para call center, closer e marketing.
5. Alinhar como o sistema "Família Cuida de Família" (cruzamento de dados no Notion, geração de leads família→família) vai ser efetivamente construído — hoje é objetivo declarado, sem página/estrutura própria no Notion ainda.

**Próximos passos:** aguardar as respostas de Rogério à tabela de valores conflitantes antes de imprimir o cartaz definitivo ou rodar o primeiro pagamento de bônus; desenhar com o Rogério a estrutura do sistema de acompanhamento Família Cuida de Família no Notion (ainda não existe).

**Notion espelhado:** página CÉU · SSF Clínica (`3c3ad3c00373814c9917e2e097c132c7`) — seções "📥 Inbox" e "🕐 Histórico operacional" atualizadas em 26/08 e 27/08. Conteúdo fica interno (não sobe para Execução Assistida) até valores confirmados e avaliação individual de desempenho removida/anonimizada.

## Mapa dos documentos

| Arquivo / Pasta | Para que serve |
|---|---|
| `RETOMADA.md` | Estado atual, decisões tomadas, próximos passos — **ler primeiro** |
| `familia-cuida-de-familia-triagem-nova-unidade.md` | Sistema **Família Cuida de Família** (objetivo estratégico: gerar leads via indicação família→família) × campanha **Casa Cuidada** (comissionamento tático, Planilha V4 + reunião de sexta) — valores financeiros a confirmar |
| `prd-casa-cuidada-familia-cuida-familia-smart-repeat-chat.md` | PRD para readaptar o repositório GitHub `smart-repeat-chat` (SaaS Lovable existente) e implementar as duas camadas — premissas da reunião, gaps, modelo de dados, telas por persona, plano de construção sessão a sessão no Lovable, fases MVP/V1/V2 |
| `proposta-sistema-casa-cuidada-27-08-2026.html` | Proposta visual para o Rogério (não-técnica) explicando o sistema, o ciclo de 3 movimentos, a tabela de decisões financeiras pendentes e as fases de construção |
| `ritual-de-passagem-casa-cuidada-28-08-2026.md` | Planejamento do evento de lançamento da cultura Casa Cuidada para toda a equipe (28/08, 13h) — estrutura, pilares do fechamento do Rogério, rascunho do bloco de abertura do Mayko |
| `roteiro-ritual-de-passagem-28-08-2026.html` | Roteiro imprimível do evento — blocos, horários, checklist de preparação |
| `contexto_projeto.md` | Visão estratégica completa (diagnóstico, fases, riscos) |
| `reuniao-10-04-2026.md` | Ata da reunião-chave com Rogério (deal R$30k) |
| `CONTRATO-ADVISORY-ROGERIO-01-2026.md` | Contrato de advisory assinado (versão .html para impressão) |
| `RMA-MAIO-2026.md` | Relatório Mensal de Atividades (versão .html/.pptx para apresentação) |
| `estrategia_comercial/viabilidade_card.md` | Modelo financeiro, break-even (364 contratos, atualizado 02/06), CAC, pricing |
| `estrategia_comercial/plano_lancamento.md` | Plano 90 dias em 3 fases com budget (R$4.150 mês 1) |
| `processo-comercial-7dias/00-plano-execucao-7dias.md` | Playbook diário do sprint — o documento operacional principal |
| `processo-comercial-7dias/RESUMO-EXECUTIVO-SST.md` | 5 movimentos críticos em 72h (prioridades do sprint) |
| `processo-comercial-7dias/01-scripts/` | Scripts de conversão, cobrança, objeções, abordagem, reativação |
| `processo-comercial-7dias/02-cadencias/` | Workflows n8n: cobrança D+3/7/15, onboarding, reativação, group-parser |
| `processo-comercial-7dias/03-agentamento/` | Prompts e guias rápidos de IA por função (Karine, Raquel) |
| `processo-comercial-7dias/04-dia-sst-saude/` | Blueprint do evento de lançamento (08/05/2026) |
| `processo-comercial-7dias/05-bairro-da-paz/` | Estratégia específica da nova filial |
| `processo-comercial-7dias/06-metricas/` | Dashboard diário e cálculo de metas |
| `processo-comercial-7dias/01-matinais/` | Resultados diários por data — cada subpasta `DD-MM-YYYY/` contém: `roteiro-matinal`, `cartao-bolso-equipe`, `template-relatorio-12h-15h`, `parcial` |
| `rh-closer/` | Processo seletivo closer Bairro da Paz — tem `CLAUDE.md` local |
| `aline-laboratorio/` | Consultoria laboratório MADIP (Aline Souza) — tem `CLAUDE.md` local |
| `pesquisa-satisfacao-sponsor/` | Pesquisa de satisfação Rogério (Typebot 7 perguntas + n8n semáforo cobrança) — enviada 28/05/2026 |
| `processo-comercial-7dias/transicao-pj-equipe-sst.md` | Documento de transição PJ: proposta, roteiro individual por pessoa, escada de comissões |
| `processo-comercial-7dias/reuniao-transicao-pj-roteiro.html` | Roteiro HTML da reunião de transição PJ → publicado em playbook.ssfcard.ia.br |
| `processo-comercial-7dias/cronograma-inauguracao-01-07-2026.md` | Cronograma detalhado marcos da inauguração Bairro da Paz |
| `reuniao-mensal-02-07-2026.md` | **Ata da Reunião Mensal 02/07** — auditoria financeira (cartão já se paga), decisão de reajuste R$24,90→39,90, Karine → Closer Senior, meta julho 56 Prata + 24 Ouro |
| `checklist-semana1-julho-2026.md` | Checklist Semana 1 de Julho — pendências com Rogério: aporte ~R$7k, salários, GO reajuste, régua de desconto |
| `processo-comercial-7dias/05-bairro-da-paz/faixas-lancamento-06-07-2026.md` | Spec das 3 faixas de rua de lançamento (fachada + 2 ruas teaser sem endereço) — pedido urgente do Rogério 06/07 |
| `processo-comercial-7dias/05-bairro-da-paz/proposta-sala-odontologia-06-07-2026.md` | Proposta de fusão Clínica 03+04 em Sala de Odontologia (~13,17m²) — checklist RDC ANVISA 50/2002 + mensagem para a arquiteta Érica Sobral |
| `processo-comercial-7dias/campanha-perdao-divida-2quinzena-junho-2026.md` | **Plano mestre da Campanha Perdão de Dívida** (4 frentes, funil, cronograma) — frente operacional atual |
| `processo-comercial-7dias/mensagem-rogerio-estrategia-perdao-16-06-2026.md` | Mensagem/áudio pronta para Rogério pedir OK da oferta de quitação + liberar base Tenex/Asaas |
| `processo-comercial-7dias/criativo-perdao-divida-junho-2026.html` | Criativo + 4 copies WhatsApp da campanha (deployado no playbook) |
| `processo-comercial-7dias/02-cadencias/guia-implantacao-perdao-divida.html` | Guia de implantação interativo da campanha (8 fases, dark theme) |
| `05-agentamento-karine-ia/07-agente-kanban-dividas.md` | **Spec + prompt do Agente Kanban de Dívidas** (régua de desconto, lógica recorrente vs ativo) |
| `05-agentamento-karine-ia/importar-csv-kanban.py` | Script CSV (planilha inadimplentes Karine) → Pipeline Notion da Karine; auto-detecta colunas, `--dry-run`, dedupe por CPF/telefone |
| `processo-comercial-7dias/02-cadencias/n8n-agente-kanban-dividas.json` | Workflow n8n do Agente Kanban (8 nós) — lê Notion + Asaas, sugere oferta, resumo matinal 07h30 |
| `processo-comercial-7dias/02-cadencias/n8n-matinal-automatica-grupo.json` | Workflow n8n da matinal automática no grupo WhatsApp (cron 07h50 Seg–Sáb, mensagem dinâmica) |
| `RMA-MAIO-2026-INDICE.md` | Índice do RMA com links para todas as seções |
| `RMA-MAIO-2026-NOTAS-APRESENTADOR.md` | Notas do apresentador slide a slide para RMA ao vivo |
| `RMA-MAIO-2026-RESUMO-EXECUTIVO.md` | Resumo executivo 1 página — decisão rápida do Rogério |
| `agentamento-equipe-sst.md` | Mapa de capacitação IA da equipe (roadmap por pessoa) |
| `perfil-rogerio-diretor.md` | Como trabalhar com Rogério (perfil comportamental + proposta) |
| `perfil-karine-entrevista-nov2025.md` | Perfil Karine (vendas/financeiro) — âncora motivacional: buffet |
| `perfil-raquel-agentamento.md` | Perfil Raquel (marketing) — 20 anos, SDR sem saber |
| `perfil-lucas-agentamento.md` | Perfil Lucas (Customer Success) |
| `sessao-agentamento-*.md` | Relatórios das sessões de capacitação (17/04/2026) |
| `gerar_rmar_sst.py` | Script Python (python-pptx) que gera o RMAR PPTX a partir do template `rmar-temp.pptx` — editar `ADIMPLENCIA` e variáveis no cabeçalho |
| `rmar-slides-preview/` | PNGs dos 18 slides do template RMAR + PPTX original (fevereiro/2025) — referência visual ao editar `gerar_rmar_sst.py` |
| `RMAR-SST-Card-Bairro-da-Paz-ABRIL-MAIO-2026.pptx` | RMAR PPTX gerado pelo script — versão mais recente (gerada 09/06/2026) |
| `99_Arquivo_Geral/IA_Logs/` | Logs diários JSON das sessões Claude (um arquivo por dia `log_YYYY-MM-DD.json`) — referência histórica |
| `Matinais-Maio/` | PDFs das matinais de maio impressas/enviadas (cartão bolso, roteiro, script perdão dívida) |
| `WhatsApp Ptt *.srt/.txt` | Transcrições de áudios de Rogério (Whisper CLI `--language Portuguese --model turbo`) — arquivo mais recente: 08/06/2026 |
| `aline-laboratorio/audio-rogerio-crise-aline-08-06-2026.md` | Transcrição do áudio de Rogério sobre crise na MADIP (08/06) — ver contexto em `aline-laboratorio/CLAUDE.md` |
| `reuniao-estrategica-rogerio-20-07-2026.md` | Ata 20/07 — 4 RCFs assinados (Closer/Marketing/CS/Cobrança), achado das 69 levantadas de mão perdidas na clínica, financeiro ainda não reaberto |
| `reuniao-sucesso-paciente-29-07-2026.md` | Ata Reunião Sucesso do Paciente 29/07 — cross-sell, recuperação de base |
| `processo-comercial-7dias/03-agentamento/documento-canonico-processos-mkt-vendas-05-08-2026.html` | Documento canônico dos processos de MKT & Vendas (checkpoint dos 4 canais, publicado no playbook) |
| `processo-comercial-7dias/03-agentamento/prompts-overclock-typebot-vps-20-07-2026.md` | 3 prompts Overclock da sessão Raquel 20/07 — upgrade VPS 8GB, Typebot no EasyPanel, quiz de qualificação por especialidade |
| `processo-comercial-7dias/rcf-fluxogramas-cargos.html` | Fluxogramas-gabarito dos RCFs (Closer/Marketing/CS/Cobrança) gerados na reunião 20/07 |

## Personas-chave

| Pessoa | Papel | Fator crítico |
|---|---|---|
| **Rogério** | Dono/Sponsor | Aceita R$30k de investimento; decidido na reunião 10/04. Prefere GO/NO-GO direto às 9h — ver `perfil-rogerio-diretor.md` |
| **Karine** | **Closer Senior** (promovida na Reunião Mensal 02/07) + Comercial/Financeiro | Era o gargalo central (tudo passava por ela); a nova estrutura de vendas prevê 2 juniores + 1 cobrança abaixo dela. Motivação real: aprender para o negócio próprio (buffet) |
| **Raquel** | Marketing | 20 anos, logística, funciona como SDR. Cadência atual: 2 toques → abandonar (precisa de 7) |
| **Lucas** | Customer Success/Onboarding | Afastado por saúde — consultoria preparou apresentação CS em `lucas-cs/` |
| **Safira Letícia Souza Pereira** | Closer Bairro da Paz (principal candidata) | Perfil hunter PJ; aprovada na fase comportamental 11/06, aguarda fase 2 (competências). Possível futura gestora. **Não é mais a única** — ver Vanesca abaixo. `rh-closer/` |
| **Vanesca Nascimento** | Closer Bairro da Paz (2ª candidata) | Entrevista 15/06; mora no Bairro da Paz, sem experiência no produto. Guia de entrevista + scoring em `rh-closer/`. Etapa decisiva: teste de campo com 2–3 candidatos. |
| **Roni** | Funcionário do RH (irmão/indicação do Rogério) | Apoia funções de Recursos Humanos. **Não é candidato a closer.** |
| **Aline Souza** | Gestora lab. MADIP | Frente secundária de consultoria — sessões em `aline-laboratorio/` |

## Modelo financeiro de referência

**Precificação atual (decisão 02/06/2026):**
- **Individual:** R$39,90/mês (titular com todos os benefícios + 3 dependentes com acesso à saúde)
- **Família Premium:** R$64,90/mês (4 pessoas com todos os benefícios)
- **Taxa de Adesão:** R$35,00 por contrato
- **Benefícios:** telemedicina + auxílio funeral + assistência veterinária + medicina com custos reduzidos

**Números-chave:**
- **Break-even:** ~~430 membros~~ → **364 contratos** (~mês 3,5) — ticket médio subiu para R$71,40
- **Capital de giro necessário:** R$28.000–35.000 (primeiros 3 meses)
- **Potencial Tenex (legado):** 761 contas em atraso → R$6k/mês se 20% reativarem
- **Gap lab MADIP:** conversão 33% → 60% = +R$55k/mês potencial
- **Pitch âncora:** *"R$25 a mais e todo mundo tem todos os benefícios"* (cross-sell R$39,90 → R$64,90)

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
| **E-Chat (EAS Systems)** | Canal WhatsApp oficial da clínica (CRM, IA de sugestão, formulários) — decisão 04/08 de operar por dentro dele em vez de migrar para Chatwoot | `squad-echat-overclock/README.md` |
| **VPS OpenClaw `ssf-card-clinica`** | Hetzner CX33 (62.238.33.111) — camada "cérebro" de SDR/cobrança/CS semi-autônomos, ponte via webhook E-Chat → n8n | memory `vps-ssf-card-typebot-quiz-20-07-2026` |
| **Klingo / Vidas** | Agenda de consultas/exames (Klingo) e agendamento laboratorial (Vidas) da clínica — credenciais e docs de API pendentes com a Débora | `atendimento-ia-clinica/02-integracoes-api.md` |

## Ao criar novos documentos

1. Verificar `RETOMADA.md` para confirmar que o documento não existe ainda
2. Seguir os prefixos de nomenclatura do projeto
3. Usar o frontmatter padrão
4. Linkar bidirecionalmente para documentos relacionados
5. Após criar: atualizar `RETOMADA.md` (seção "Documentos criados") e registrar ação em `02-areas/historico-acoes.md` no vault raiz

---

## Fluxo Operacional: Matinal Diária

**Quando:** Diariamente após resultado real de venda (tipicamente 14h–15h)

**O que é:** Documento HTML (dark theme, Barlow font) com:
- Resultado planejado vs executado
- 2–5 perguntas críticas para Rogério
- Metas do dia (Karine, Lucas, Raquel, Rogério, Mayko)
- Status das automações n8n
- Lab MADIP conversão (se aplicável)
- Foco operacional por responsável
- "Cantada do dia" (motivação/contexto)

**Workflow:**
1. **08h–09h:** Reunião matinal ao vivo (15 min)
2. **Capturar resultados** do dia anterior via WhatsApp grupo SST Card
3. **Gerar HTML matinal** — copiar template da última matinal e atualizar dados
4. **Template base:** copiar a matinal mais recente em `processo-comercial-7dias/01-matinais/` (mais recentes: `03-07-2026/`, `30-06-2026/`). Nota: as de 30/06 e 03/07 são `.md` (ata/pauta); para o formato HTML deployado, copiar a última matinal `.html` (`19-06-2026/roteiro-matinal-19-06-2026.html`)
5. **Criar pasta:** `processo-comercial-7dias/01-matinais/DD-MM-YYYY/`
6. **Nomear arquivo:** `roteiro-matinal-DD-MM-YYYY.html`
7. **Deploy:** `git add` → `git commit -m "Matinal DD/MM/YYYY"` → `git push origin master` → Vercel deploy automático (<1 min)
8. **Compartilhar:** URL `https://playbook.ssfcard.ia.br/processo-comercial-7dias/01-matinais/DD-MM-YYYY/roteiro-matinal-DD-MM-YYYY.html`

**Dados chave a atualizar por pessoa:**
- **Karine:** contatos, fechamentos, reconciliação, cobrança
- **Lucas:** ativações clínica, ativações app, mensagens totais
- **Raquel:** abordagens, leads qualificados, posts Instagram
- **Lab MADIP:** conversão % por atendente (se aplicável)

---

## Fluxo RMAR: Geração e Apresentação

**Quando:** Mensalmente (últimos dias úteis do mês ou primeiros dias do mês seguinte)

**O que é:** Apresentação PPTX com dados reais de adesões, reativações, receita, adimplência, churn (comparação 2 meses)

**Workflow:**

1. **Preparar dados:**
   - Coletar adesões novas do período (Karine WhatsApp, PDF Raquel, etc.)
   - Coletar reativações Tenex (n8n logs ou relatório Perdão de Dívida)
   - Calcular receita: (adesões × preço médio) + (taxa adesão × qtd)
   - Adimplência: pagantes / ativos do mês
   - Churn: cancelamentos / base inicial

2. **Atualizar script Python** (`gerar_rmar_sst.py`):
   ```python
   MES_REFERENCIA = "05/2026"  # Atualizar mês
   ADIMPLENCIA = [
       ["04/2026", "376", "335", "89,10%"],  # dados históricos
       ["05/2026",  "35",  "28", "80,00%"],  # novo mês
   ]
   CHURN = [
       ["04/2026", "376",  "4", "1,06%"],
       ["05/2026",  "35",  "0", "0,00%"],
   ]
   GRAFICOS = {
       4: {'categories': ['04/2026', '05/2026'], 'series': {...}},  # Adesões
       # ... atualizar valores nos gráficos
   }
   ```

3. **Executar geração:**
   ```powershell
   cd C:\Users\mayko\meu-cerebro\01-projetos\consultoria-comercial\clientes\SST_Clinica_Bairro_da_Paz
   python gerar_rmar_sst.py
   # Saída: RMAR-SST-Card-Bairro-da-Paz-ABRIL-MAIO-2026.pptx (ou novo nome)
   ```

4. **Agendar call com Rogério:**
   - Envio: "Rogério, o RMAR de [mês] está pronto. Quer apresentar hoje 17h ou amanhã?"
   - Guardar link Notion com dados brutos: https://www.notion.so/... (hub SST Clínica)
   - Preparar notas do apresentador se houver pontos polêmicos

5. **Após apresentação:**
   - Atualizar `RETOMADA.md` com decisões do Rogério
   - Registrar em `02-areas/historico-acoes.md` (vault raiz)
   - Arquivar versão anterior do PPTX em `99_Arquivo_Geral/` se necessário

**Dependências Python:**
```powershell
pip install python-pptx lxml
```

---

## Tarefas Periódicas

| Tarefa | Frequência | Quando | Responsável | Onde |
|--------|-----------|--------|------------|------|
| Matinal diária | Diário | 08h–09h (reunião) + 14h–15h (compilar) | Mayko | `01-matinais/DD-MM-YYYY/` |
| RMAR mensais | Mensal | Últimos dias úteis / 1º dia mês seguinte | Mayko | `gerar_rmar_sst.py` → PPTX |
| Relatório diário parcial (14h) | Diário | 14h no grupo WhatsApp | Karine/Lucas/Raquel | grupo SST Card |
| Checklist deploy matinal | Diário | Após criação HTML | Mayko | `git push origin master` |
| Atualizar RETOMADA.md | Semanal / evento | Sexta 16h ou evento crítico | Mayko | RETOMADA.md |
| Implantar automação n8n | Conforme prazo | 10/06 (A6/A8), 13/06 (A9), 15/06 (A7) | Mayko | `02-cadencias/` → n8n prod |
| Memory sync (.claude/.../memory/) | Semanal | Sexta 17h | Mayko | memory/MEMORY.md |
| Reunião lab MADIP | Semanal | Seg–Ter (Aline) | Mayko + Aline | `aline-laboratorio/CLAUDE.md` |
| Conferir Notion CRM | Diário | 09h antes matinal | Mayko/Karine | https://notion.so/337ad3c0037381b39091fb40594bbedc |

---

## Contatos Chave

| Pessoa | Função | Telefone/WhatsApp | Email | Onde localizar |
|--------|--------|----------|-------|---|
| **Rogério Ferreira** | Dono/Sponsor | rogeriorsf15@gmail.com | rogeriorsf15@gmail.com | Pode estar em reuniões; WhatsApp prioritário |
| **Karine** | Comercial/Financeiro | +55 71 8255-5752 | — | Grupo WhatsApp SST Card |
| **Lucas** | Customer Success | +55 71 9271-2271 | — | Grupo SST Card + Google Meet |
| **Raquel** | Marketing/SDR | — | — | Matinais + campo |
| **Aline Souza** | Lab MADIP | — | — | Reuniões lab seg–ter |

**Grup WhatsApp:** "SST Card · Simões Filho/BA" (privado)  
**Notion Hub:** https://www.notion.so/33ead3c0037381b093b3d0c0a41d3c4b  
**Google Calendar:** SST Card · Simões Filho/BA (agendamentos ativos)

---

## Troubleshooting

### Problema: n8n workflow não importa (erro de formato)
**Solução:**
1. Verificar se arquivo `.json` está aberto em UTF-8 (não UTF-16)
2. Validar JSON online: https://jsonlint.com/
3. Se erro de variáveis: copiar template de workflow já importado e adaptar (usar copiar/colar dentro n8n, não importar arquivo novo)

### Problema: Vercel deploy não atualiza (cache)
**Solução:**
1. `git status` para verificar changes
2. `git add processo-comercial-7dias/01-matinais/DD-MM-YYYY/roteiro-matinal-DD-MM-YYYY.html`
3. `git commit -m "Matinal DD/MM"` 
4. `git push origin master` (não push para branch, sempre master)
5. Esperar 1–2 min, recarregar playbook.ssfcard.ia.br com Ctrl+Shift+R (hard refresh)

### Problema: Python script "ModuleNotFoundError: No module named 'pptx'"
**Solução:**
```powershell
pip install python-pptx lxml
# Ou se em environment específico:
python -m pip install python-pptx lxml
```

### Problema: HTML matinal aparece com caracteres quebrados (ç, ã, etc.)
**Solução:**
- Verificar `<meta charset="UTF-8">` no `<head>` do HTML
- Salvar arquivo como UTF-8 (não ANSI)
- Se editor padrão: abrir com VS Code e reselecionar "UTF-8" na barra status

### Problema: Notion database não sincroniza com n8n (webhook silencioso)
**Solução:**
1. Verificar token Notion: https://www.notion.so/my-integrations (não expirou?)
2. Verificar NOTION_TOKEN em variáveis n8n
3. Verificar ID da database (copiar URL Notion completa: `/[ID]?v=[view-id]`, ID = alfanuméricos até `?`)
4. Testar webhook n8n manualmente: abrir workflow → "Test" → disparar manualmente
5. Ver logs n8n: Executions → filtro para errors

### Problema: WhatsApp não envia (Evolution API timeout)
**Solução:**
1. Verificar se n8n tem acesso à URL Evolution: `EVOLUTION_API_URL` (ex: `https://api.evolution.ia.br`)
2. Verificar instância Evolution: `EVOLUTION_INSTANCE` (ex: `sst-card-prod`)
3. Testar call simples em Postman: GET `${EVOLUTION_API_URL}/instance/fetch` com header `apikey: ${EVOLUTION_API_KEY}`
4. Se erro 500: evolução pode estar down; contatar suporte

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
- `processo-comercial-7dias/01-matinais/[DD-MM-YYYY]/roteiro-matinal-*.html` — matinais diárias (subpastas por data; ver `01-matinais/` para as mais recentes)
- `processo-comercial-7dias/reuniao-transicao-pj-roteiro.html` — roteiro reunião PJ
- `processo-comercial-7dias/playbook-sst-assistente-19-05.html` — assistente operacional com checklists por pessoa
- `processo-comercial-7dias/playbook-vivo-20-05-2026.html` — playbook com abas históricas por data
- `aline-laboratorio/matinal-clinica-28-05-2026.html` — matinal clínica 28/05 (lab MADIP)
- `rh-closer/divulgacao-vaga-closer.html` — divulgação da vaga closer

**Ciclo de atualização do playbook:**
1. Após matinal diária (08h–09h), capturar resultados reais
2. Editar ou criar novo arquivo HTML de playbook com comparação planejado vs executado
3. `git commit && git push` → Vercel redeploya em <1 min
4. Gerar PDF via Ctrl+P no navegador para enviar no WhatsApp

---

### Lucas CS — Apresentações e Gerador PPTX

Localização: `lucas-cs/`

> ⚠️ **`lucas-cs/` é um repositório git aninhado** (tem `.git/` próprio) e contém `node_modules/`. Não fazer `git add lucas-cs/` do repo raiz — o subdiretório é gerenciado separadamente.

**`gerar_apresentacao.py`** — Gera o arquivo `.pptx` de Customer Success via `python-pptx`. Paleta SST Card embutida (azul `#1987c3`, vermelho, verde, amarelo).

```powershell
# Instalar dependência (uma vez)
pip install python-pptx

# Gerar apresentação
python lucas-cs/gerar_apresentacao.py
# Saída: lucas-cs/Apresentacao-Sucesso-Cliente-Maio-2026-v2.pptx
```

Para editar KPIs e metas: abrir `gerar_apresentacao.py` e editar os valores na seção de dados. Para alterar cor primária: buscar `#1987c3`.

---

### n8n Workflows (JSON prontos para importar)

Localização: `processo-comercial-7dias/02-cadencias/`

Localização principal: `processo-comercial-7dias/02-cadencias/`

**Plano mestre das 9 automações:** `02-cadencias/GRANDE-AUTOMACAO-MADIP.md`  
**Guia de implantação interativo:** `02-cadencias/guia-implantacao-automacoes.html` (publicado em playbook.ssfcard.ia.br, dark theme, checklists localStorage)

| # | Arquivo JSON | O que faz | Estado |
|---|---|---|---|
| A1 | `n8n-sst-group-parser-v2.json` | **Versão atual** — lê mensagens grupo Chatwoot → Claude → extrai dados → salva Notion (parciais) | ✅ Pronto |
| — | `n8n-sst-group-parser.json` | Versão anterior (referência) | — |
| A2 | `n8n-dashboard-diario-sst.json` | Cron 15h45 → lê Notion "Parciais SST Card" → consolida Karine/Lucas/Raquel → envia WhatsApp grupo | ✅ Pronto |
| A3 | `n8n-cobranca-d3-d7-d15.json` | Cron 9h → lê Sheets "Cobranças" → calcula fase → envia WhatsApp individual → atualiza Sheets | ✅ Pronto |
| A4 | `n8n-funil1-cron-anti-noshow-sst-clinica.json` | **Funil 1 anti-noshow** — cron dispara WhatsApp D-3/D-1/D+1 em torno da consulta | ✅ Pronto |
| A5 | `typebot-funil1-anti-noshow-sst-clinica.json` | Typebot do Funil 1 — bot de confirmação/reagendamento; importar no Typebot self-hosted (Easypanel) | ✅ Pronto |
| A6 | `n8n-onboarding-novos-membros.json` | Onboarding novo membro D+0→D+30 via WhatsApp | ✅ Pronto (implantar 10/06) |
| A7 | `n8n-reativacao-cancelados.json` | Cadência reativação de cancelados | ✅ Pronto (implantar 15/06) |
| A8 | `typebot-qualificacao-lead-bp.json` | Typebot qualificação lead Bairro da Paz — importar no Typebot (10/06) | ✅ Pronto |
| A9 | `n8n-typebot-bp-chatwoot.json` | Webhook Typebot BP → Chatwoot (implantar 13/06) | ✅ Pronto |
| — | `n8n-noshow-cadencia.json` | Cadência no-show laboratório (versão anterior A4) | referência |
| — | `n8n-noshow-webhook-resposta.json` | Webhook de resposta cadência no-show | referência |
| — | `rh-closer/n8n-workflow-candidatura-closer.json` | Recebe candidatura Typebot → notifica Rogério + Mayko via WhatsApp | ✅ |
| — | `pesquisa-satisfacao-sponsor/n8n-workflow-satisfacao-rogerio.json` | Semáforo pós-pesquisa → decide se Mayko liga antes do vencimento | ✅ |

**Campanha Perdão de Dívida (2ª quinzena junho/2026)** — automações em `02-cadencias/`. Guia interativo: `02-cadencias/guia-implantacao-perdao-divida.html` (8 fases). Plano mestre: `processo-comercial-7dias/campanha-perdao-divida-2quinzena-junho-2026.md`.

| Arquivo JSON | O que faz | Estado |
|---|---|---|
| `n8n-perdao-divida-disparo-massa.json` | Disparo em massa WhatsApp com aquecimento 50→100→150/dia sobre as 761 contas Tenex | ✅ Pronto |
| `typebot-quitacao-perdao-divida.json` | Typebot de quitação: CPF → busca Asaas → gera Pix na hora | ✅ Pronto |
| `n8n-asaas-quitacao-buscar.json` | Webhook 1 — busca débito do CPF no Asaas | ✅ Pronto |
| `n8n-asaas-quitacao-gerar-2via.json` | Webhook 2 — gera 2ª via / Pix de quitação 50% | ✅ Pronto |
| `n8n-asaas-quitacao-evento.json` | Webhook 3 — recebe evento Asaas → grava no database Notion "Eventos Quitação" (`65a6dcc6c95f4e23bd14dd1798f2391a`) | ✅ Pronto |

**Agente Kanban de Dívidas + Matinal automática (Máquina de Cobrança, junho/2026):**

| Arquivo JSON | O que faz | Estado |
|---|---|---|
| `n8n-agente-kanban-dividas.json` | Cron 07h30 → lê Pipeline Notion da Karine (`138f7d78-0ea6-423d-babc-2f5a1fe0092b`) + Asaas → sugere `Oferta Sugerida`/`Mensagem Sugerida` por card, move `Status`, separa caixa RECORRENTE (cartão automático) vs ATIVO (cobrança) no resumo do grupo (8 nós) | ✅ Pronto — **importar/testar** |
| `n8n-matinal-automatica-grupo.json` | Cron 07h50 Seg–Sáb → posta a matinal dinâmica no grupo WhatsApp SST Card | ✅ Pronto |

> A régua de desconto do Agente Kanban (10% / 40% / 50% por faixa de atraso) **ainda precisa ser cravada pelo Rogério** antes de escalar o disparo — proposta na seção 3 de `07-agente-kanban-dividas.md`.

**Variáveis de ambiente necessárias (configurar antes de implantar):**
`ANTHROPIC_API_KEY` · `NOTION_TOKEN` · `NOTION_PARCIAIS_DB_ID` · `NOTION_CLINICA_DB_ID` · `NOTION_KANBAN_DB_ID` (`138f7d78-0ea6-423d-babc-2f5a1fe0092b` — Pipeline Karine) · `CHATWOOT_API_KEY` · `EVOLUTION_API_URL` · `EVOLUTION_API_KEY` · `EVOLUTION_INSTANCE` · `SST_CARD_GROUP_CHAT_ID` · `SHEETS_COBRANCA_ID` · `SHEETS_AGENDA_ID` · `ASAAS_API_KEY` · `ASAAS_API_URL` · `KARINE_WHATSAPP` (campanha Perdão de Dívida)

Setup do group-parser: ver `02-cadencias/SETUP-sst-group-parser.md`.

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

**`gerar_rmar_sst.py`** — raiz do projeto — gera o RMAR PPTX do SST Card a partir do template `rmar-temp.pptx`:

```powershell
# Instalar dependência (uma vez)
pip install python-pptx lxml

# Gerar RMAR do mês
python gerar_rmar_sst.py
# Saída: RMAR-SST-Card-Bairro-da-Paz-MAIO-2026.pptx
```

Para atualizar os dados mensais: editar a variável `ADIMPLENCIA` e `MES_REFERENCIA` no cabeçalho do script. Paleta SST Card embutida (azul `#1987c3`).

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
| `rh-clinica/` | Processo seletivo coordenadora clínica (formulário abertura vaga + qualificação HTML + Typebot JSON) | `rh-clinica/CLAUDE.md` |
| `aline-laboratorio/` | Consultoria laboratório MADIP (Aline Souza) — sessões mensais + Funil 1 anti-noshow | `aline-laboratorio/CLAUDE.md` |
| `atendimento-ia-clinica/` | Transformar a Léia (GPT Maker) em atendente de agendamento — stack Klingo + E-Chat + Vidas, kickoff Débora 20/07 | `atendimento-ia-clinica/CLAUDE.md` |
| `squad-echat-overclock/` | Squad de agentes (Overclock: panes Claude Opus/Sonnet/Haiku + Codex) que destrava a integração E-Chat/EAS Systems — orquestrador + handoffs em arquivo, não em chat | `squad-echat-overclock/README.md` (sem CLAUDE.md, o README cumpre esse papel) |
| `05-agentamento-karine-ia/` | Agentização da Karine (cobrança/vendas com IA) — roadmap, prompts WhatsApp, workflow n8n cobrança, dashboard, integrações Chatwoot/Notion, **Agente Kanban de Dívidas (07-...)** + script `importar-csv-kanban.py` | — |
| `Coaching-Emocional/` | Material de apoio do programa de coaching (Método CIS, ferramentas de identidade/metas) — usado nas sessões de coaching (ver `aline-laboratorio/`); só PDFs/imagem, sem notas | — |
| `pesquisa-satisfacao-sponsor/` | Pesquisa de satisfação do Rogério (Typebot JSON + n8n semáforo); sem CLAUDE.md local | — |
| `estrategia_comercial/` | Modelos financeiros, plano de lançamento, implementação 2ª filial | Documentado neste CLAUDE.md |
| `processo-comercial-7dias/` | Sprint operacional (scripts, cadências n8n, prompts IA, matinais, transição PJ) | Documentado neste CLAUDE.md |
| `vault-sst/` | Pipeline Obsidian de leads (Inbox → Pipeline 01–06 → Dashboards Dataview DQL) | Documentado neste CLAUDE.md |
| `lucas-cs/` | Apresentação CS (Python PPTX) — **repositório git aninhado**, não incluir em `git add` | — |
| `analise_mercado/` · `docs/` | Anexos de referência (checklist arquiteta; PPTX original RMAR fev/2025) — só arquivos, não notas | — |

Leia o CLAUDE.md local antes de trabalhar em qualquer subprojeto.

> **Diretórios de ferramentas (não são notas do vault):** `.agents/skills/` (skill local `cerebro-ia-clinica-lucrativa`), `.codex/` (config/hooks do Codex CLI) e `.overclock-app/` (estado de runtime do harness Overclock — `messages.db`, `panes.json`, `session.json`). Não editar manualmente; `.overclock-app/` contém apenas estado de sessão e é candidato a entrar no `.gitignore` se ainda não commitado por engano.

---

## Referência Rápida de Comandos

### Git
```powershell
# Status
git status

# Commitar matinal
git add processo-comercial-7dias/01-matinais/DD-MM-YYYY/roteiro-matinal-DD-MM-YYYY.html
git commit -m "Matinal DD/MM/YYYY — Karine: X, Lucas: Y, Raquel: Z"
git push origin master

# Revert (se push acidentalmente)
git revert HEAD
git push origin master
```

### Python — RMAR
```powershell
# Gerar RMAR depois de atualizar dados
cd C:\Users\mayko\meu-cerebro\01-projetos\consultoria-comercial\clientes\SST_Clinica_Bairro_da_Paz
python gerar_rmar_sst.py
# Saída: RMAR-SST-Card-Bairro-da-Paz-[PERIODO].pptx
```

### Python — Vault/CSV (Tenex)
```powershell
# Validar CSV antes de importar
python .claude/skills/cerebro-ia-clinica-lucrativa/scripts/validar_csv.py arquivo.csv

# Gerar notas markdown
python .claude/skills/cerebro-ia-clinica-lucrativa/scripts/gerar_notas_md.py dados-limpos.csv -o vault-sst/00_Inbox/
```

### Vercel (manual, se necessário)
```powershell
# Setup (primeira vez)
npm i -g vercel
vercel login

# Deploy manual
cd C:\Users\mayko\meu-cerebro\01-projetos\consultoria-comercial\clientes\SST_Clinica_Bairro_da_Paz
vercel deploy --prod  # Requer confirmação

# Normalmente: git push origin master (CI automático)
```

---

## Observações Finais

1. **Memory system:** Não descarta informações de sessão anterior. Se trabalhar em múltiplas sessões, cheque `.claude/projects/.../memory/MEMORY.md` para contexto persistente.
2. **RETOMADA.md é a fonte da verdade:** Sempre consulte antes de assumir estado do projeto. Atualize após mudanças significativas.
3. **WhatsApp grupo é canal oficial:** Matinais, parciais, decisões são comunicadas ali. Manter histórico organizado.
4. **Notion é auditoria:** Todos os leads devem estar em https://www.notion.so/33ead3c0037381b093b3d0c0a41d3c4b (hub SST Clínica) com status e owner.
5. **Playbook Vercel = broadcast:** Qualquer mudança em HTML/JSON faz deploy automático. Validar antes de push.


