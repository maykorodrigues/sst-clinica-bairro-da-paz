---
title: PRD — Readaptação do smart-repeat-chat para Casa Cuidada + Família Cuida de Família
tags: [sst, casa-cuidada, familia-cuida-de-familia, prd, smart-repeat-chat, "#em-progresso"]
aliases: [PRD Casa Cuidada, PRD Família Cuida de Família]
related: [[familia-cuida-de-familia-triagem-nova-unidade]], [[RETOMADA]]
criado: 2026-08-27
atualizado: 2026-08-27
---

# PRD — Readaptar `smart-repeat-chat` para Casa Cuidada + Família Cuida de Família

## Resumo executivo (60s)

O repositório [`maykorodrigues/smart-repeat-chat`](https://github.com/maykorodrigues/smart-repeat-chat) já é um SaaS multitenant funcional ("Viver de IA — Plataforma de Recorrências e Clube de Assinaturas"): React+Vite+TS+Tailwind no front, Supabase (Postgres/Auth/Edge Functions/Vault) no back, WhatsApp via Evolution API. Já tem cadastro de clientes com LGPD (opt-in/opt-out/consent), motor de cadências e templates de mensagem, cupons de desconto, dashboard de KPIs e disparo automático via cron. **A proposta deste PRD não é construir do zero — é readaptar (remix) esse projeto** para operar as duas camadas do projeto SST Clínica:

- **Casa Cuidada** — campanha tática de comissionamento da equipe (registro diário de atendimento, cuidado à família, bônus).
- **Família Cuida de Família** — motor estratégico de geração de leads via indicação família→família, alimentando o funil comercial (Notion/PipeRun) já em uso.

Aproveitamento estimado: **a maior parte do backend de mensageria, cupom, consentimento e dashboard já existe** — o trabalho principal é modelagem de dados nova (família, indicação, bônus, papéis de equipe) e telas novas (registro diário, painel semanal, aprovação de regras).

## Contexto

Fonte de contexto: `familia-cuida-de-familia-triagem-nova-unidade.md` (reunião 26/08 + Planilha V4 + roteiro de reunião, lidos 27/08). Lá ficou definido:

- **Família Cuida de Família** = sistema estratégico de geração de leads via indicação família→família — hoje só existe como objetivo declarado, sem estrutura no Notion.
- **Casa Cuidada** = campanha tática de comissionamento (Planilha V4, reunião de sexta, QR Code, bônus) que faz a equipe aderir ao sistema acima.
- Há **valores financeiros ainda não confirmados por Rogério** (bônus por registro, por contrato fechado, meta 70%/referência 90%, desconto de 30–50% na 1ª consulta indicada) — este PRD trata esses valores como **parametrizáveis**, nunca hardcoded, justamente porque ainda podem mudar.

## Premissas do projeto (ditas na reunião — base de tudo que segue)

Estas são as regras que vieram diretamente da reunião de 26/08 e da Planilha V4/roteiro de 27/08. O sistema **não pode contrariar nenhuma delas** — são o contrato entre o produto e o que Rogério já comunicou à equipe:

1. **Ordem do ciclo é fixa e não se inverte:** a empresa cuida do funcionário → o funcionário cuida do cliente e da família dele → só depois o cliente pode indicar outra família. "Antes de indicar, cuidar."
2. **Indicação é sempre voluntária.** O sistema nunca pode travar, bloquear ou pressionar um fluxo de atendimento porque o cliente não indicou ninguém.
3. **"Cuidou da Casa? SIM/NÃO" é o indicador central**, não a quantidade de indicações. Um NÃO abre recuperação (causa + responsável + prazo); nunca é escondido para melhorar número, nunca gera punição automática.
4. **Câmbio de 3 meses abaixo da meta é revisão humana, não corte automático de sistema.** Qualquer ação de RH/desligamento passa por gente (RH/contabilidade/jurídico) — o software só sinaliza, nunca decide.
5. **O objetivo comercial final é gerar leads para a equipe de vendas fechar** (nas palavras do Mayko: "família com família... gerar leads pra que a equipe de vendas feche"). O sistema não fecha venda sozinho — ele entrega o lead qualificado ao Close.
6. **Só funciona se a equipe aderir.** A cultura de "cuidar de si mesmo primeiro, depois de todas as famílias" precisa aparecer na experiência do produto (linguagem, tom, feedback), não só nas regras de bônus.
7. **Os valores financeiros (bônus, meta, desconto) ainda não foram fechados por Rogério** — por isso o sistema trata todos como configuração editável por ele, nunca como número fixo no código.

## Objetivo do produto

Dar às duas camadas um sistema real de registro, cálculo e acompanhamento — hoje isso só existe como planilha Excel manual (Planilha V4), o que não escala além de uma unidade nem gera dados cruzáveis para o motor de leads.

**Sucesso = :**
1. A recepção registra o atendimento em segundos (celular/tablet), sem depender de planilha.
2. O bônus de cada colaborador é calculado automaticamente a partir de regras configuráveis (nunca hardcoded).
3. Toda indicação família→família vira um lead rastreável que chega ao funil comercial (Notion/PipeRun) com origem identificada.
4. Rogério e Aline enxergam, em um painel, cobertura de abordagem, cuidado concluído, indicações e bônus da semana — sem depender de planilha compartilhada.

## Stack existente a reaproveitar

| Camada do repo | O que já existe | Reaproveitamento para Casa Cuidada / Família Cuida de Família |
|---|---|---|
| `tenants` | Multitenant nativo | Cada unidade da SST Clínica (Simões Filho, Bairro da Paz, futuras) vira um tenant — já resolve a arquitetura multi-unidade da visão "10 unidades até ago/2027" |
| `customers` + `consent_logs` + `optin_tokens`/`optout_tokens` | Cadastro de cliente com LGPD | Base do cadastro de paciente/família — **estender**, não recriar |
| `products` | Catálogo de produtos/serviços recorrentes | Mapeia para especialidades/serviços da clínica (psiquiatra, cardio, odonto etc.) |
| `recurrences` + `vw_recurrences_perdidas` + `vw_recurrences_with_next` | Consumo recorrente com detecção de recorrência perdida | Pode alimentar alerta de renovação/uso — **não substitui** o sistema financeiro do cartão (BOOM/Asaas), é camada de CRM/engajamento |
| `cadence_rules` + `copy_templates` + `copy_variants` + `copy_generation_prompts` | Motor de cadência de mensagens com geração de copy por IA | Reaproveitar quase 1:1 para: mensagem de reconhecimento pós-atendimento, convite à indicação, follow-up de família indicada, recuperação de "Cuidou da Casa? NÃO" |
| Edge functions `cadence-scheduler` + `whatsapp-sender` + cron `bootstrap-crons` | Disparo automático agendado via Evolution API | Reaproveitar sem alteração estrutural — só novos `cadence_rules` |
| `coupons` + `validar_cupom` + `reverter_validacao_cupom` | Cupom de desconto com validação/reversão | Mapeia quase 1:1 para o desconto de 30–50% na 1ª consulta da família indicada |
| `subscription_plans` / `subscriptions` / `subscription_plan_items` (Clube) | Gestão de planos e assinantes (pagamento já removido, é só gestão interna) | Avaliar se descreve o próprio SST Card (Individual/Família) ou fica fora de escopo — **decisão de produto, não técnica** (ver seção Fora de Escopo) |
| `get_dashboard_kpis`, `get_performance_por_categoria`, `get_performance_por_estagio`, `get_top_variantes`, `get_proximos_disparos` | Funções SQL de dashboard | Base pronta para o Painel Semanal da Casa Cuidada — estender com KPIs de cuidado/indicação |
| `messages` + `whatsapp_send_logs` + `scheduler_runs` | Log de mensagens e execuções de cron | Reaproveitar para auditoria de disparo |
| `evolution-qr-code`, `evolution-status-check`, `validate-evolution-creds` | Pareamento da instância WhatsApp do tenant | **Não confundir** com o QR Code físico de reconhecimento de atendimento da Casa Cuidada — são coisas diferentes (ver Gap 6 abaixo) |

## Gaps — o que precisa ser construído

| # | Gap | Descrição | Prioridade |
|---|---|---|---|
| 1 | **Papéis de equipe (staff/atendente)** | Schema atual não mostra tabela de funcionários/papéis dentro do tenant (recepção, coordenadora, gestor) — precisa existir para atribuir registro, meta e bônus por pessoa. Validar contra `useAuth.ts`/`useTenant.ts` antes de desenhar. | 🔴 Bloqueador do MVP |
| 2 | **Household / vínculo familiar** | `customers` hoje é uma lista plana. Precisa de um conceito de "família" (household) agregando titular + dependentes, para saber quem já foi cuidado e quem pode ser indicado. | 🔴 Bloqueador do MVP |
| 3 | **Cadeia de indicação (referral)** | Precisa de tabela ligando `customer_indicador → customer_indicado`, com status (pendente/contatado/convertido) — é o coração do Família Cuida de Família. | 🔴 Bloqueador da V1 |
| 4 | **Registro Diário digital** | Formulário mobile-first equivalente à aba "Registro Diário" da Planilha V4: tipo de cliente, abordagem, formulário entregue, QR Code apresentado, "Cuidou da Casa? SIM/NÃO", pendência/responsável/prazo, satisfação. | 🔴 Bloqueador do MVP |
| 5 | **Motor de bônus configurável** | Regras de bônus (por registro, por contrato fechado, por papel) precisam ser **parâmetros por tenant**, não valores fixos — os valores atuais (R$0,70/R$0,30/R$10/R$8/R$5) ainda estão em disputa com Rogério. | 🔴 Bloqueador do MVP |
| 6 | **QR Code físico de reconhecimento** | Diferente do QR Code de pareamento do WhatsApp já existente — este é um código (impresso/exibido na recepção) que o cliente escaneia para confirmar que foi atendido/reconhecido. Precisa de rota pública + geração por atendente. | 🟡 V1 |
| 7 | **Handoff de leads para o Close** | Toda indicação convertida em lead precisa sair do smart-repeat-chat e entrar no funil comercial já existente (Notion CRM / PipeRun) — via webhook/integração de saída, não duplicando CRM. | 🟡 V1 |
| 8 | **Painel Semanal Casa Cuidada** | Estender `get_dashboard_kpis` (ou criar função irmã) com: cobertura de abordagem vs. meta configurável, cuidado concluído/pendente, indicações registradas, bônus provisório — espelha a aba "Painel Semanal" da Planilha V4. | 🟡 V1 |
| 9 | **Fluxo "NÃO" com recuperação** | Quando `cuidou_da_casa = NÃO`, abrir obrigatoriamente registro de causa + responsável + prazo, sem gerar punição automática — regra de produto explícita vinda da Planilha V4. | 🟡 V1 |
| 10 | **Métricas do funil família→família** | Taxa de conversão de indicação em lead, de lead em contrato, tempo médio — para medir se o "consenso cultural" de indicação está gerando negócio de verdade. | 🟢 V2 |

## Modelo de dados proposto (novo, complementar ao existente)

| Tabela nova | Campos-chave | Observação |
|---|---|---|
| `staff_members` | tenant_id, nome, papel (recepção/coordenadora/gestor), meta_percentual | Gap 1 |
| `households` | tenant_id, titular_customer_id | Gap 2 |
| `household_members` | household_id, customer_id, relação (titular/dependente) | Gap 2 |
| `daily_care_records` | tenant_id, staff_id, customer_id, data, tipo_cliente, abordagem_realizada, formulario_entregue, qr_apresentado, cuidou_da_casa (SIM/NÃO), evidencia, pendencia, responsavel_recuperacao, prazo_retorno, satisfacao | Gap 4 — substitui a aba "Registro Diário" |
| `family_referrals` | household_id_origem, customer_id_indicado, status (pendente/contatado/convertido/recusado), origem_registro_id, data_indicacao, data_conversao | Gap 3 — coração do Família Cuida de Família |
| `bonus_rules` | tenant_id, tipo (registro/contrato_fechado), papel, valor, vigência_inicio, vigência_fim | Gap 5 — parametrizável, nunca hardcoded |
| `bonus_ledger` | tenant_id, staff_id, daily_care_record_id ou referral_id, regra_aplicada, valor, status (provisório/aprovado/pago) | Gap 5 |

## Telas por persona (o que cada um vê no app)

| Persona | Tela principal | O que faz nela |
|---|---|---|
| **Recepção** (Letícia/Deise) | Registro Diário (mobile) | Identifica cliente → marca abordagem/formulário/QR → registra "Cuidou da Casa? SIM/NÃO" → se SIM, abre convite de indicação (até N famílias, opcional) |
| **Coordenadora** (Aline) | Painel Semanal + Fila de Recuperação | Vê cobertura de abordagem, casos "NÃO" pendentes com prazo vencendo, indicações aguardando contato |
| **Gestor** (Rogério) | Configuração de Regras + Dashboard executivo | Edita `bonus_rules` (valores, metas, vigência) sem precisar de deploy; vê bônus provisório total por unidade/semana; vê funil família→família (indicações → contatadas → convertidas) |
| **Vendas/Close** | Fila de leads recebidos | Recebe o lead com origem "indicado por [família]" — mesma fila que já usam hoje (Notion/PipeRun), só chega com um campo de origem novo |

## Plano de construção no Lovable — sessão a sessão

O `smart-repeat-chat` já é um projeto Lovable — a forma de construir isso é **remixar/editar o projeto existente por prompt**, não abrir um projeto novo do zero (perderíamos cadência, cupom, LGPD e dashboard já prontos). Sugestão de sequência de sessões no Lovable, cada uma pequena o suficiente para revisar antes de seguir:

**Sessão 1 — Modelagem (Gaps 1, 2, 5):**
> "Adicione ao schema: `staff_members` (papel recepção/coordenadora/gestor, vinculado a um tenant), `households` + `household_members` (agregando clientes da mesma família), e `bonus_rules` (tipo, papel, valor, vigência) — sem hardcode de valores, tudo editável. Gere as migrations e a RLS seguindo o padrão já usado em `customers`."

**Sessão 2 — Registro Diário (Gap 4):**
> "Crie a tabela `daily_care_records` com os campos do Registro Diário: tipo de cliente, abordagem realizada, formulário entregue, QR apresentado, cuidou_da_casa (SIM/NÃO), evidência, pendência/responsável/prazo, satisfação. Crie uma tela mobile-first em `/registro` para a recepção preencher em menos de 30 segundos por atendimento, usando o padrão visual dos formulários já existentes (`CustomerFormDialog`, `RecurrenceFormDialog`)."

**Sessão 3 — Motor de bônus (Gap 5):**
> "Ao salvar um `daily_care_record` com cuidou_da_casa = SIM, calcular e gravar em `bonus_ledger` o valor da regra `bonus_rules` vigente para aquele papel/tipo. Criar tela de configuração em `/configuracoes/regras` onde o gestor edita valores e metas sem deploy."

**Sessão 4 — Painel Semanal (Gap 8):**
> "Estenda `get_dashboard_kpis` (ou crie `get_casa_cuidada_kpis`) para trazer: pessoas atendidas, cobertura de abordagem vs. meta, cuidado concluído/pendente, indicações registradas, bônus provisório da semana. Reaproveite o layout de `Dashboard.tsx` e os componentes `KpiCard`."

*(Fim do MVP — demonstrável ao Rogério. As sessões abaixo entram na V1.)*

**Sessão 5 — Indicação família→família (Gap 3):**
> "Crie `family_referrals` ligando household de origem a um cliente indicado, com status pendente/contatado/convertido/recusado. No fluxo de Registro Diário, após cuidou_da_casa = SIM, ofereça (nunca obrigue) o convite de indicação de até N famílias."

**Sessão 6 — Cupom da família indicada (Gap 6 parcial):**
> "Ao criar um `family_referral`, gerar automaticamente um `coupon` (reaproveitando `validar_cupom`) com o percentual de desconto configurado para a 1ª consulta da família indicada."

**Sessão 7 — Handoff para o Close (Gap 7):**
> "Quando um `family_referral` muda para status = convertido, disparar um webhook de saída (edge function nova, ex. `notify-lead-referral`) com os dados do lead e a origem, para o endpoint do CRM comercial (Notion/PipeRun)."

**Sessão 8 — Fluxo de recuperação do NÃO (Gap 9):**
> "Quando `cuidou_da_casa = NÃO`, exigir preenchimento de causa/responsável/prazo antes de salvar. Adicionar à Fila de Recuperação da coordenadora, com alerta quando o prazo vence — sem qualquer ação automática de desligamento ou corte."

## Escopo fechado do MVP (o que dá pra demonstrar ao Rogério no fim da Sessão 4)

- [ ] Recepção registra um atendimento completo em menos de 1 minuto, no celular.
- [ ] "Cuidou da Casa? SIM/NÃO" gravado, com pendência obrigatória em caso de NÃO.
- [ ] Bônus provisório calculado automaticamente, usando valores que o Rogério mesmo configurou na tela de regras (não hardcoded).
- [ ] Painel Semanal mostra cobertura de abordagem vs. meta, cuidado concluído e bônus da semana.
- [ ] Nenhuma indicação, cupom ou envio de lead ainda nesta fase — isso é a V1.

## Fluxos principais

**Fluxo A — Atendimento na recepção (Casa Cuidada):**
Recepção identifica cliente → registra `daily_care_records` → apresenta QR Code de reconhecimento → oferece cuidado à família (household) → registra `cuidou_da_casa` → sistema calcula `bonus_ledger` provisório conforme `bonus_rules` vigente.

**Fluxo B — Indicação família→família (Família Cuida de Família):**
Só após `cuidou_da_casa = SIM` e sem pendência crítica → cliente indica até N famílias (limite configurável, hoje 3) → cria `family_referrals` → cadência de WhatsApp (reaproveitando `cadence_rules`) contata a família indicada → se converte, `bonus_ledger` de contrato fechado é criado → lead sai via webhook para Notion/PipeRun.

**Fluxo C — Recuperação de "NÃO":**
`cuidou_da_casa = NÃO` → obrigatório preencher causa + responsável + prazo → aparece no Painel Semanal como pendência aberta até resolução — nunca vira desligamento automático (regra explícita vinda da Planilha V4).

**Fluxo D — Aprovação de regras (gestão):**
Rogério/Aline editam `bonus_rules` e metas com vigência — histórico preservado, nunca sobrescrito, para auditoria de bônus pago no passado.

## Regras de negócio (herdadas da Planilha V4 — todas com valor "a confirmar")

| Regra | Status | Nota |
|---|---|---|
| Ciclo: empresa cuida → funcionário cuida da família → família indica | ✅ Confirmado | Princípio central, não muda |
| Indicação é sempre voluntária, nunca pressionada | ✅ Confirmado | Regra de conduta obrigatória na UI (nunca travar fluxo se cliente recusar) |
| "Cuidou da Casa? NÃO" não gera punição automática | ✅ Confirmado | Ver Fluxo C |
| 3 meses abaixo da meta → revisão, não corte automático | ✅ Confirmado (correção de 27/08) | Qualquer ação passa por RH/jurídico — o sistema **não deve automatizar** desligamento ou corte |
| Valores de bônus (R$0,70/R$0,30/R$10/R$8/R$5) | 🔴 A confirmar com Rogério | Parametrizar em `bonus_rules`, nunca hardcoded no código |
| Meta mínima 70% / referência 90% | 🔴 A confirmar (denominador e período) | Parametrizar em `staff_members`/config de tenant |
| Desconto 1ª consulta indicada (30–50%) | 🔴 A confirmar | Mapeia para `coupons` já existente |
| Condições da telemedicina grátis | 🔴 A confirmar | Definir antes de automatizar o benefício |

## Fora de escopo (nesta fase)

- **Não substitui o sistema de cobrança/mensalidade do SST Card** (BOOM/Asaas) — o app não deve gerar cobrança de cliente.
- **Não substitui o CRM comercial** (Notion/PipeRun) — apenas alimenta leads a ele via integração de saída.
- **Não reativa o módulo de pagamento** (Stripe/Lovable Payments foi removido do projeto de propósito) — bônus é folha/RH, não checkout.
- Decisão de usar `subscription_plans`/Clube para representar o próprio SST Card fica **fora de escopo até decisão explícita** — risco de duplicar o que já existe no BOOM.

## Requisitos não funcionais

- **LGPD:** dados de família (telefone/parentesco de terceiros) são dado pessoal — reaproveitar `consent_logs`/`optin_tokens`/`optout_tokens` já existentes, estendendo para cobrir consentimento de indicação (o indicador precisa autorizar o contato da família indicada).
- **Multitenant:** cada unidade opera isolada (RLS já existe no schema) — importante para a visão de expansão a múltiplas unidades.
- **Auditabilidade:** `bonus_ledger` e `bonus_rules` precisam manter histórico imutável — bônus pago no passado não pode mudar retroativamente se a regra mudar depois.
- **Mobile-first:** o Registro Diário é preenchido pela recepção durante o atendimento — a tela precisa funcionar bem em celular/tablet.

## Fases sugeridas

| Fase | Entrega | Gaps cobertos |
|---|---|---|
| **MVP — Casa Cuidada roda sozinha** | Papéis de equipe, household, Registro Diário digital, motor de bônus configurável, Painel Semanal básico | 1, 2, 4, 5, 8 (parcial) |
| **V1 — liga ao Família Cuida de Família** | Cadeia de indicação, cupom de desconto, handoff de lead para o Close, fluxo de recuperação do "NÃO" | 3, 6, 7, 9 |
| **V2 — métricas e maturidade** | Funil família→família completo, métricas de conversão, refinamento de cadências de WhatsApp | 10 |

## Pendências de decisão do Rogério (mesmas do documento da reunião — repetidas aqui porque bloqueiam o MVP)

1. Valores de bônus (cartaz, registro, contrato fechado — funcionário e coordenadora).
2. Denominador e período da meta 70% / sentido do teto 90%.
3. Percentual de desconto da 1ª consulta indicada (30–50%).
4. Condições da telemedicina grátis.
5. Quem, na prática, terá papel de "coordenadora" além da Aline — se o modelo é 1 coordenadora por unidade ou por especialidade.

## Fonte

- Repositório: [`maykorodrigues/smart-repeat-chat`](https://github.com/maykorodrigues/smart-repeat-chat) (privado, branch `main`, stack React+Vite+TS+Supabase, projeto Lovable) — inspecionado via `gh api` em 27/08/2026.
- `familia-cuida-de-familia-triagem-nova-unidade.md` — contexto de negócio das duas camadas.
- `Projeto_Casa_Cuidada_Planilha_V4.xlsx` / `Projeto_Casa_Cuidada_Reuniao_Sexta.pdf` — regras de negócio originais.

Voltar para [[RETOMADA]]
