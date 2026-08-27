---
tags: [em-progresso]
---
# RETOMADA DO PROJETO — SST Clínica | Bairro da Paz

> Leia este arquivo primeiro ao retomar o projeto. Contém estado atual, decisões tomadas e próximos passos.  
> Última atualização: 27/08/2026 — **PRD criado para readaptar o `smart-repeat-chat` (GitHub) e implementar Casa Cuidada + Família Cuida de Família.**

---

## 💻 AO RETOMAR (27/08/2026) — Sistema escolhido: `smart-repeat-chat` (GitHub) + PRD

> **PRD completo:** `prd-casa-cuidada-familia-cuida-familia-smart-repeat-chat.md`

**Sistema:** [`maykorodrigues/smart-repeat-chat`](https://github.com/maykorodrigues/smart-repeat-chat) — repositório privado, projeto Lovable existente ("Viver de IA — Plataforma de Recorrências e Clube de Assinaturas"). Stack: React 18 + Vite + TypeScript + Tailwind no front, Supabase (Postgres/Auth/Edge Functions/Vault) no back, WhatsApp via Evolution API. Já multitenant, já com cadastro de clientes + LGPD (consent/opt-in/opt-out), motor de cadências e templates de copy, cupons de desconto, dashboard de KPIs e cron de disparo automático.

**Decisão de produto:** **readaptar (remix), não construir do zero.** A maior parte do backend de mensageria, cupom, consentimento e dashboard já serve para as duas camadas do projeto:
- **Casa Cuidada** (campanha tática de comissionamento) → precisa de: papéis de equipe (recepção/coordenadora/gestor), vínculo familiar (household), Registro Diário digital, motor de bônus configurável (nunca hardcoded — valores ainda em disputa com Rogério), Painel Semanal.
- **Família Cuida de Família** (motor estratégico de leads) → precisa de: cadeia de indicação família→família, handoff de lead para o Close (Notion/PipeRun), métricas de conversão do funil.

**Gaps identificados (não existem hoje no repo, ver PRD para lista completa com prioridade):** tabela de funcionários/papéis, household, Registro Diário digital, motor de bônus parametrizável, cadeia de indicação, QR Code físico de reconhecimento (diferente do QR de pareamento do WhatsApp que já existe), handoff de leads para o CRM comercial.

**Fora de escopo explícito:** não substitui a cobrança/mensalidade do SST Card (BOOM/Asaas), não substitui o CRM comercial (Notion/PipeRun — só alimenta leads nele), não reativa pagamento (Stripe foi removido do projeto de propósito).

**🔴 Pendências de Rogério que bloqueiam o MVP:** valores de bônus, denominador/período da meta 70%/90%, percentual de desconto na 1ª consulta indicada, condições da telemedicina grátis — mesmas pendências já registradas no bloco Família Cuida de Família × Casa Cuidada abaixo.

**PRD expandido (mesmo dia):** adicionadas as "Premissas do projeto" (7 regras não-negociáveis vindas da reunião), "Telas por persona" e um **plano de construção sessão a sessão no Lovable** (8 prompts prontos, MVP fechado nas 4 primeiras sessões — papéis de equipe, household, Registro Diário, motor de bônus, Painel Semanal). Escopo fechado do MVP listado como checklist demonstrável.

**HTML criado para o Rogério:** `proposta-sistema-casa-cuidada-27-08-2026.html` — proposta visual não-técnica (ciclo de 3 movimentos, o que o sistema entrega, tabela de decisões financeiras pendentes, fases MVP/V1/V2). **Ainda não enviado** — falta decidir o canal de envio.

---

## 👨‍👩‍👧‍👦 AO RETOMAR (27/08/2026) — Família Cuida de Família × Casa Cuidada

> **Documento completo:** `familia-cuida-de-familia-triagem-nova-unidade.md` · **Notion:** página CÉU · SSF Clínica (`3c3ad3c00373814c9917e2e097c132c7`)

**Relação entre os nomes, esclarecida pelo Mayko:**
- **Família Cuida de Família** = sistema estratégico a construir no Notion, que cruza dados de cada família atendida na clínica para que colaboradores identifiquem oportunidades de cuidado **e** de indicação de outra família — objetivo comercial explícito: **gerar leads para a equipe de vendas fechar**. Ainda não existe como estrutura no Notion — é objetivo declarado.
- **Casa Cuidada** = campanha tática de comissionamento (bônus, QR Code, formulário, Planilha V4, reunião de sexta) que existe para fazer a equipe **aderir** ao sistema acima. Condição de sucesso: a cultura do time da SST Clínica **e** do SST Card precisa incorporar "cuidar de si mesmo primeiro, depois de todas as famílias".

**Planilha V4 + roteiro de reunião lidos (27/08):** confirmam o ciclo de 3 movimentos (empresa cuida do funcionário → funcionário cuida do cliente/família → cliente indica até 3 famílias, sempre voluntário) e o indicador "Cuidou da Casa? SIM/NÃO" com recuperação obrigatória em caso de NÃO (não é punição automática).

**🔴 Valores financeiros conflitantes a confirmar com Rogério antes de imprimir o cartaz ou pagar qualquer bônus:** cartaz (R$70/R$10 no material vs. R$0,70/R$0,30 na fala — provável erro de casa decimal), bônus por registro (R$0,70 funcionário + R$0,30 coordenadora), bônus por contrato fechado (funcionário R$10 ou R$8; Aline R$5, valor não fechado), denominador/período da meta 70% e sentido do teto 90%, percentual de desconto na 1ª consulta indicada (30–50%), condições da telemedicina grátis. Ver tabela completa no documento.

**✅ Correção importante:** a regra dos "3 meses abaixo de 70%" **não automatiza corte de bonificação nem desligamento** — qualquer medida passa por RH/contabilidade/jurídico antes de executar. Isso substitui o registro inicial de 26/08.

**⚠️ Confirmar:** se a "Aline" coordenadora da Casa Cuidada é a mesma Aline Souza do Lab MADIP.

---

## 🧭 AO RETOMAR (21/08/2026, tarde) — Estrutura CÉU/TERRA criada + entrevista do Denílson

> **Registro da entrevista:** `entrevista-denilson-gestor-21-08-2026.md` · **Transcrição Notion:** `3c3ad3c003738066b1adccb4964013b6`

### Plataforma de consultoria — par CÉU/TERRA por projeto

Modelo replicado do projeto Montes Claros (Cartão de Todos): **CÉU = fonte de verdade interna** (bastidor, leitura crítica, financeiro, dados pessoais) · **TERRA = execução assistida** (página compartilhável com o cliente). O par foi criado para os **dois projetos separadamente**:

| Projeto | CÉU (interno) | TERRA (cliente) |
|---|---|---|
| **SSF Card** | [CÉU · SSF Card](https://app.notion.com/p/3c3ad3c0037381b2a0d2f3deb60b9d74) | [Execução Assistida · SSF Card](https://app.notion.com/p/3c3ad3c0037381d887b2e5207ba25291) |
| **SSF Clínica** | [CÉU · SSF Clínica](https://app.notion.com/p/3c3ad3c00373814c9917e2e097c132c7) | [Execução Assistida · SSF Clínica](https://app.notion.com/p/3c3ad3c0037381d6abdff4dd19f798bb) |

As duas reuniões de hoje já entraram: **Sucesso do Paciente (10h15)** no par SSF Card · **entrevista do Denílson (tarde)** no par SSF Clínica.

⚠️ **Nenhuma TERRA foi compartilhada ainda** — rodar o checklist de publicação do CÉU antes de dar acesso ao Rogério.

### Entrevista Denílson Ferreira Silva — gestor / sócio de unidade

Dinâmica comportamental de 4 perguntas conduzida pelo Mayko; Rogério fecha a negociação. **Não foi entrevista de colaborador** — a oferta feita foi de **percentual sem aporte financeiro**, no contexto de **10 unidades até agosto/2027** (uma já em construção, sai em outubro).

**Descoberta central:** o sonho dele é **ter a própria clínica** e não tem capital — *"não tem um real para montar uma clínica. Tenho diversos contatos de vários médicos."* A oferta encaixa exatamente no buraco. **É a âncora motivacional dele.**

| Dado | Confirmado |
|---|---|
| Nome / idade | **Denílson Ferreira Silva**, **42 anos** (não "cinquentão" — era piada de futebol) |
| Família | Casado, **3 filhos** · âncora pessoal: tempo com a família |
| Cargo real | **Coordenador administrativo** (o registro de 14/08 dizia "gerente de 3–5 unidades") |
| Bagagem | **Implantou 4 unidades** · treinou recepção, portaria, ECG · **regulatório ANS** |
| Visão de gestão | **Custo + acolhimento** (paciente *e* colaborador) |

🔴 **Tensão a resolver:** disse que faz bem *"tudo o que é **apresentado para eu executar**"* (executor) mas trouxe a fala da ex-gestora *"você tem **olhar de dono**"* (protagonista). O plano do Rogério exige a segunda — diagnosticar unidade sozinho e virar regional. Pergunta que fecha: *"me conta uma vez em que ninguém te pediu nada e você foi lá e fez."*

⚠️ **Risco espelhado:** se a sociedade não for cravada como unidade **dentro da rede**, a SST vira escola — ele aprende o modelo, leva a rede de médicos e abre sozinho.

**Em aberto:** motivo da saída da operadora · nome da operadora (ruído de ASR nas duas sessões) · titularidade da rede de médicos + não-concorrência · gap salarial (ganhava ~R$4k) · o que mediria na 1ª semana no BP.

### Também hoje

- **Guia de Entrevista de Capacidades da Letícia** entregue para a **Aline** conduzir — `rh-clinica/guia-capacidades-leticia-aline-21-08-2026.html` / `.pdf`. Etapa 2 da seleção da recepção BP.
- **Trilha Sucesso do Paciente (10h15)** — auditoria dos 10 compromissos de 07/08: ~70–80% de execução. 8 ligações de cobrança → 3 pagamentos (38%). Ata em `pauta-aquisicao-competencias-sucesso-paciente-21-08-2026.md`.

---

## 🎛️ AO RETOMAR (21/08/2026) — Fonte de governança da comunicação comercial criada

> **Pasta nova:** `squad-openclaw-comercial/` (30 arquivos). Ponto de entrada: `squad-openclaw-comercial/README.md`.

**O que é:** a camada que faltava entre "temos E-Chat, GPTMaker e n8n" e "a comunicação comercial da SST é governada". Um **Diretor Comercial OpenClaw** que prioriza e emite intenção, **oito agentes** com fronteira escrita (receptivo, SDR, closer, suporte, CS, cobrança, guardião LGPD, escriba), **três schemas JSON** validados em Draft 2020-12, e **quatro fases de autonomia com gate** (L0 → L1 → L2 → L3).

**Status: L0 para todos.** Nada foi ativado, nenhuma mensagem enviada, nenhuma credencial tocada, nenhum workflow JSON gerado.

**Decisões arquiteturais fixadas no pacote:**

| Camada | Papel | Regra dura |
|---|---|---|
| **E-Chat** | corpo — canal, CRM, cards, histórico | Canal oficial de paciente; Chatwoot/Evolution não voltam sem nova decisão |
| **n8n** | mãos — cofre, política, idempotência, log, kill switch | **Nenhuma ação externa sai sem passar por aqui** |
| **OpenClaw** | cérebro — raciocina e emite intenção | Nunca fala com paciente; fala com o n8n |
| **GPTMaker** | camada de agentes que já responde (Léia = A1, MÉDINA = A2) | Governar, não ignorar. Toda intenção aponta para o n8n |
| **Humano** | preço, desconto, campanha, risco clínico | Sempre, em qualquer nível de autonomia |

**Três achados que o pacote deixa explícitos:**

1. **A régua de desconto e a tabela de preço por especialidade (C15, desde 02/07) são o que mantém A2 e A3 em meia potência.** Não é limitação técnica — é uma decisão parada há mais de um mês. Enquanto não sair, todo agente responde "vou confirmar", nunca um número.
2. **O webhook + endpoint do E-Chat (C21) é o gargalo único da Fase 2.** Contratos técnicos prontos para entregar à EAS em `n8n/contrato-webhook-echat.md` e `n8n/contrato-retorno-echat.md`, escritos como proposta ajustável e com tudo marcado **INFERIDO**. Nenhum endpoint foi inventado.
3. **Dá para avançar sem a EAS.** Seis passos independentes do C21: levantar o estado real do GPTMaker (`audit_agent`), rodar `monitor_channel_health` (candidato a explicar as conversas sumidas), atualizar treinamentos de Léia e MÉDINA, aplicar os prompts revisados, revisar as configurações e construir a intenção `sinalizar_risco` (só alerta interno).

**Correção aplicada ao prompt da MÉDINA:** o prompt de 06/05 prometia **"até 75% de desconto"** — número que não está em régua aprovada nenhuma —, agendava com uma estrutura de equipe que não existe mais e trazia preços de consulta fixos. Tudo corrigido em `gptmaker/prompt-medina-sdr-revisado.md`.

**🔴 Pendências que este pacote NÃO resolve (e dependem de gente):**

| # | O que falta | Dono | Critério de pronto |
|---|---|---|---|
| 1 | Tabela de preço por especialidade + régua de desconto (C15) | Rogério | Valores escritos e aprovados |
| 2 | Webhook de saída + endpoint de retorno do E-Chat (C21) | Elieser + Lucas | Evento chega ao n8n e retorno volta pelo E-Chat |
| 3 | Explicação das conversas sumidas (C23) | Elieser + Karine | Causa + recuperação sim/não + relatório de inatividade |
| 4 | Cobrança 100% dentro do E-Chat, fora do número reserva (C33) | Lucas | Toda cobrança em card do CRM |
| 5 | Chave da API nomeada, com validade e teto, entregue ao Lucas | Mayko | Lucas confirma repasse à EAS |
| 6 | Levantar IDs e configuração reais dos agentes no GPTMaker | Mayko | `audit_agent` rodado, mapa preenchido |

---

## ✅ AO RETOMAR (19/08/2026, ~12h12) — Ata final: Aquisição de Competências Financeiro

> **Ata completa, decisões e pendências geradas pelo Claude a partir da transcrição Notion:** ver histórico deste dia mais abaixo (bloco 10h00) e `pauta-aquisicao-competencias-financeiro-19-08-2026.md`. Registrado também em `02-areas/historico-acoes.md` e `squad-echat-overclock/historico-acoes.md`.

**Decisões fechadas na reunião:**
- **Bug do BOOM identificado e resolvido ao vivo:** cobrança duplicada de **R$28,00** num cliente já no padrão R$39,90 (duas faturas geradas no mesmo mês) — decisão: **cancelar** a cobrança de R$28. Não era R$24,90 residual em massa, foi um caso pontual de bug de sistema.
- **Sabrina formalizada como auditora da cobrança** — olha padrão no BOOM, detecta anomalia, corrige antes de qualquer disparo.
- **Proibido o modelo "Olá, bom dia + link"** — Rogério classificou como "terminantemente proibido" ao vivo, vendo Karine/Sabrina praticarem esse padrão.
- **Modelo validado — cobrança preventiva no atendimento receptivo:** quando o cliente liga pra usar o benefício (ex.: agendar cardiologista), a equipe verifica o vencimento na hora e manda o link no mesmo contato, sem soar como cobrança.
- **Caso Dona Sílvia:** Rogério ligou ao vivo, usou histórico (Pilates + acupuntura, filha/dependente Lorena), ofereceu novidade (odontologia), mandou link e pediu comprovante. **Rogério acompanha o pagamento ainda hoje.**
- **Gravação de ligações vira obrigatória a partir de hoje** — plugin Audio Recorder (Chrome), todas as chamadas de cobrança gravadas e transcritas para alimentar o "cérebro" do processo.
- **Cobrança segue parcialmente fora do E-Chat** — o CRM de cobrança da Sabrina só foi ativado ontem à tarde (18/08); parte das cobranças ainda roda pelo número Meta "reserva", fora do card/CRM oficial. Decisão: migrar 100% para dentro do E-Chat.
- **Regra nova para toda reunião prática futura:** começar com tela, sistema, internet, computador e ligação já prontos — cobrada diretamente por Rogério a Lucas/Railane.

**⚠️ Não confundir:** esta reunião tratou de financeiro/cobrança/infra — **não tratou** dos gates C19 (IA ativa), C20 (funis/cards por especialidade) e C21 (webhook + endpoint) do pós-ativação E-Chat. Esses seguem exatamente como estavam em 18/08: 🔴 abertos, sem resposta nova.

**Pendências com dono/prazo/critério de pronto (ver ata completa mais abaixo e `openclaw-sst/COMPROMISSOS-ATIVOS.md`):**

| # | O que falta | Dono | Prazo | Critério de pronto |
|---|---|---|---|---|
| 1 | Cancelar cobrança duplicada de R$28,00 | Sabrina | Hoje 19/08 | Cobrança cancelada no BOOM, com print |
| 2 | Resolver fone/microfone para ligar pelo computador/E-Chat | Lucas | Hoje 19/08 | Ligação funcionando pelo E-Chat |
| 3 | Instalar plugin Audio Recorder em todos os PCs da equipe | Lucas | Hoje 19/08 | Plugin ativo e testado em cada máquina |
| 4 | Fazer as 8 ligações de cobrança de vencidos de ontem, gravando | Sabrina + Karine | Hoje 19/08 | 8 ligações feitas, gravadas, resultado registrado |
| 5 | Acompanhar pagamento da Dona Sílvia | Rogério | Hoje 19/08 | Comprovante recebido ou não-pagamento com motivo registrado |
| 6 | Conversar com Aline sobre cancelamento de médicos por falta de agenda | Rogério | Hoje 19/08 | Conversa realizada, decisão registrada |
| 7 | Refinar e enviar formulário Typebot de cadastro de dependentes | Lucas | `[FALTA: data não cravada]` | Formulário revisado, enviado a todos os funcionários |
| 8 | Enviar lista de nomes de familiares para cadastro no benefício | Mayko | Hoje 19/08 (se possível) | Lista enviada ao grupo/Lucas |
| 9 | Verificar se computadores da clínica têm SSD | Lucas | `[FALTA: sem data]` | SSD confirmado ou manutenção feita |
| 10 | Conectar número de WhatsApp correto ao E-Chat, unificar fluxo | Lucas | `[FALTA: sem data, urgente]` | 100% da cobrança passa pelo card/CRM do E-Chat, sem número reserva |
| 11 | Financeiro maior: aporte/caixa, salários definitivos, régua de desconto oficial, verba Google Ads | Rogério | Aberto desde 02/07 | GO/NO-GO explícito registrado — **não avançou nesta reunião** |
| 12 | Gates C19 (IA)/C20 (funis)/C21 (webhook+endpoint) | Lucas + Elieser | `[FALTA: sem data]` | Ver `openclaw-sst/COMPROMISSOS-ATIVOS.md` |

---

## 🟡 AO RETOMAR (19/08/2026, 10h00) — Aquisição de Competências Financeiro

> **Documento de apoio:** `pauta-aquisicao-competencias-financeiro-19-08-2026.md` · **Notion:** `3c1ad3c0037381c890bcdfb0fb0144fc`

**Contexto lido:** a página do Notion da reunião de hoje está com notas manuais vazias e transcrição automática. A abertura capturada é longa, com alinhamento espiritual, reconhecimento do esforço da equipe, tema família/benefícios e chamado para protagonismo. Na atualização das 11h01 BRT, já aparecem fatos operacionais: segundo número ativo e em uso, CRM ativo, Typebots a criar dentro do E-Chat, formulário de beneficiários/dependentes criado como demonstração, base confirmada em R$ 39,90 e discussão de inadimplência.

**Tese da reunião:** aproveitar a energia positiva pós-ativação para fechar decisões objetivas. O E-Chat saiu da fase de "ativar canal" (número novo, Instagram e CRM funcionando), mas isso ainda não prova **IA ativa**, **webhook**, **endpoint de retorno**, **funis por especialidade** nem **rotina de disparo/card**.

**Financeiro que precisa voltar à mesa:** pendências de 02/07 e 20/07 continuam abertas, mas o reajuste mudou de status na fala da Karine: toda a base estaria em R$ 39,90. Validar evidência em sistema/relatório. Seguem como pauta: inadimplência M1/M2/M3, cobrança real, aporte/caixa, salários definitivos, régua de desconto e verba de Google Ads. Ver `checklist-semana1-julho-2026.md` e `reuniao-estrategica-rogerio-20-07-2026.md`.


**Atualização Notion 11h40 BRT:** a reunião avançou para auditoria ao vivo. No BOOM (`financeiro > contas a receber`) apareceu cobrança residual/duplicada de R$ 24,90 em cliente já no padrão R$ 39,90, então o reajuste não deve ser tratado como “zero exceções” até haver relatório limpo. Rogério posicionou Sabrina como auditora da cobrança. Também ficou claro que parte da cobrança ainda roda pelo Meta/WhatsApp Business reserva, fora do E-Chat/CRM; o CRM de cobrança da Sabrina foi criado hoje e precisa virar rotina. O modelo correto validado foi cobrança preventiva no uso/agendamento: cliente SST Card chamou para cardiologista, equipe verificou vencimento, agendou e enviou link no contexto. Caso Dona Sílvia: pedido de acupuntura de 06/08 respondido só em 17/08, cliente já usa Pilates/acupuntura, vencimento em aberto de ontem e Rogério decidiu ligar ao vivo usando histórico. Lucas deve fechar infraestrutura: máquina lenta, SSD/manutenção, backup/formatação, Wi-Fi/repetidor, duas internets e ligação pelo E-Chat.
**Saída obrigatória:** cada item deve sair com **o que falta · dono · prazo · critério de pronto**. Se o Rogério não decidir algo hoje, registrar explicitamente a próxima data de decisão.

**Observação operacional:** a skill de matinal automática não foi executada com KPIs de Notion/Chatwoot porque `NOTION_DATABASE_ID`, `NOTION_TOKEN`, `CHATWOOT_API_TOKEN` e `CHATWOOT_API_URL` não estão configurados no ambiente atual. Não inventar números das últimas 24h.

---

## ✅ AO RETOMAR (18/08/2026, 12h23) — Pós-ativação E-Chat/CRM

> Origem: print do grupo **SST × EAS Systems** anexado no atendimento de 18/08 e áudio enviado por Mayko ao grupo de ativação. Registrar também em `squad-echat-overclock/historico-acoes.md`.

**Marco técnico confirmado no grupo:**
- Número novo do WhatsApp em produção no E-Chat.
- Instagram da clínica **@ssfclinica** conectado/linkado.
- CRM em produção com teste realizado.
- Confirmação operacional no grupo: **"Funcionando"**.

**Mudança de fase:** a conversa deixou de ser "ativar canal" e passou a ser **conferência pós-ativação para automação comercial**. O áudio enviado por Mayko reconhece o avanço e pede respostas binárias sobre o que falta para sair da ativação e entrar em execução recorrente.

**Checklist cobrado no áudio/mensagem de apoio:**
1. **IA de atendimento:** está ativa nesse número ou ainda falta chave/configuração/liberação?
2. **CRM/funis:** os leads já entram como card com origem, interesse e próxima ação, ou falta criar/ajustar funis por especialidade?
3. **Webhook de saída + endpoint de retorno:** o E-Chat já expõe evento para n8n/OpenClaw e retorno de mensagem, ou ainda precisa desenvolvimento?
4. **Operação Karine/Sabrina:** falta lista, disparo, cards, permissão, treinamento ou regra operacional para usar na rotina?
5. **Conversas sumidas:** houve explicação, possibilidade de recuperação dos contatos e relatório de conversas fechadas por inatividade?

**Regra de fechamento daqui para frente:** cada resposta deve trazer **o que falta · dono · prazo · critério de pronto**. Sem isso, o item continua aberto.

**Não confundir com concluído:** número/Instagram/CRM funcionando não prova, sozinho, que a **IA de atendimento**, o **webhook**, o **endpoint de retorno**, os **funis por especialidade** e a **rotina operacional de disparo/card** estejam prontos. Esses são os próximos gates.

---

## 🕯️ CORREÇÃO DE REGISTRO (14/08/2026) — leia antes de escrever qualquer coisa sobre a Raquel

**O registro de 10/08 estava errado.** Ficou escrito aqui "Raquel teve o nascimento do filho" e "licença-maternidade". Na reunião de 14/08 ficou claro que **o bebê não sobreviveu** — a reunião abriu com oração pela perda, e Mayko falou em velório e luto. A Raquel está **afastada por luto**, não em licença-maternidade.

**Regras a partir daqui:**
- Nunca escrever "licença-maternidade", "nascimento" ou qualquer felicitação em mensagem, pauta, documento ou prompt que envolva a Raquel.
- Não atribuir tarefas nem prazos a ela; não cobrar retorno.
- Qualquer comunicação que a mencione passa por revisão humana do Mayko antes de sair.
- O nome do bebê aparece na transcrição ora como "Ravi", ora como "Javi" — **não usar o nome** até o Mayko confirmar.
- Documentos históricos de 10/08 (`pauta-aquisicao-competencia-10-08-2026.md/.html`) foram escritos sob a informação errada. O HTML já está publicado em `playbook.ssfcard.ia.br` — avaliar se vale corrigir ou deixar como registro da época.

---

## 👤 AO RETOMAR (14/08/2026, tarde) — Entrevistas da recepção BP + call com Rogério

> **Ata da call (15h52):** `reuniao-rogerio-14-08-2026.md` · **Registro das entrevistas:** `rh-clinica/registro-entrevistas-recepcao-14-08-2026.md` · **Transcrições Notion:** entrevista `3bcad3c00373807c8c87e6d9d3a07e86` · call `3bcad3c003738074ac55ebd0399aa543`

**Duas candidatas à recepção do Bairro da Paz, as duas aprovadas na fase comportamental — ninguém eliminado.** A decisão passa para a **entrevista de capacidades** (testar prática, não discurso). Só há **uma vaga**.

| Candidata | Leitura | Risco |
|---|---|---|
| **Letícia de Santana França** (21) — Enfermagem UniFTC 6º sem. | Energia **executora**, inovação/IA, **à frente na cultura de agentização**. Sonho não ficou claro | Grade da faculdade × 44h presencial · sai ao se formar (~1,5 ano) |
| **Deise Freitas de Oliveira** (41) — recepção Promédica + Curativo | **Comunicadora/relacionamento**, superpoder conexão, motor financeiro explícito, sonho da **casa própria**. *"Uma Aline do passado vendendo muito cartão"* | Rotatividade recente (3 empresas / ~11 meses cada) |

**Documentos criados:** roteiros de entrevista impressos (HTML + PDF) para o Rogério conduzir sozinho, em `rh-clinica/entrevista-comportamental-{leticia,deise}-14-08-2026.{html,pdf}` — blocos, ficha de nota 0–3 e campo de decisão assinada.

**🔴 Divergência a fechar antes de contratar:** o parecer da RAABE atribui à Deise **10 anos de Promédica (2013–2022)**, curso técnico e CRM — nada disso está no currículo entregue, que cobre só os últimos 3 anos. Hipótese provável: **currículo enxuto** (o parecer fala em "retorno posterior", que bate com jul/2023–ago/2024). O parecer, porém, **se contradiz sozinho** (Técnico em Enfermagem × Gestão Hospitalar), o que reduz seu peso como fonte. **Confirmar com a Edenice.**

**Decisões da call com Rogério:**
- **Perfil comercial vira exigência em todo recrutamento futuro** — pedido à Edenice/RAABE. *"Até quem for limpar o chão tem que ter visão comercial."*
- **Denilson** (ex-gestor de 3–5 unidades de operadora de saúde, ~200 médicos parceiros, desempregado) entra para **administrar a clínica do Bairro da Paz** e depois virar regional. Remuneração a negociar — não dá para pagar os ~R$4–5k anteriores agora. Rogério quer **distribuição de lucro mensal**, não anual.
- Rogério cogita a **Letícia para a clínica de odontologia** (2 recepcionistas, com componente de IA).
- **Tese de execução** trazida do treinamento de franquia (dono de ~1.000 unidades): o gargalo é execução, logo o recrutamento tem que entregar **padrão executivo**. O franqueador **não acredita em IA** — é onde a SST tem vantagem.

⚠️ **Confidencialidade:** os arquivos de `rh-clinica/` desta data contêm dados pessoais das candidatas e a pasta publica em `playbook.ssfcard.ia.br`. Tratar no `.gitignore` antes de qualquer push.

---

## 🔴 AO RETOMAR (14/08/2026) — Reunião relâmpago com Karine, Lucas e Sabrina

> **Transcrição:** Notion `3bcad3c0037381f8be49dadee3e5caa8` · **Protocolo do dia (artifact):** https://claude.ai/code/artifact/4a9ae830-abb8-4620-a9dd-8c561e9e34f1 · **Mensagens:** `squad-echat-overclock/cobranca-elieser-14-08-2026.md`

**🔴 Achado mais grave — levantado pela Karine, não por nós:** conversas **desapareceram do E-Chat**, dois dias seguidos. Não eram só tickets encerrados: eram negociações em andamento, cards prestes a fechar — *"as mensagens desapareceram, os números também, não tenho nem como entrar em contato com essas pessoas."* Perda de contato comercial, não higiene de fila. Exigir explicação e reversão antes de qualquer disparo novo.

**Elieser respondeu 2 das 6 pendências (por áudio, na manhã de 14/08):**
- **Custo:** só **IA de atendimento** e **e-mail marketing** exigem contratação nova. CRM, quadros, automações do CRM e disparo por template **já estão no contrato**.
- **Encerramento automático:** já existe mensagem padrão avisando o cliente, e ela é **customizável** — a EAS altera ou ensina a alterar. → Transformar em toque de reengajamento, não em despedida.
- **Janela de 24h:** ele afirma que não se perde, mas completou *"de uma forma ou de outra você vai ter que enviar um template"* — **contradição a fechar por escrito**.

**Trava da IA é bilateral:** o Elieser acredita que a SST ainda precisa criar conta na Anthropic e cadastrar cartão. **A conta, o cartão e o saldo já existem e estão ociosos.** Falta gerar uma API key nomeada, com validade e teto, e entregá-la ao Lucas. Era para ter rodado na sexta anterior.

**Risco de segurança em aberto:** a EAS pede a senha do Instagram **dentro do grupo** (política deles: nada no privado). São ~3.154 seguidores na clínica e ~3.500 no cartão, num grupo com ex-funcionários não mapeados. Caminho preferido: conectar pela **BM do Rogério** (validada, com CNPJ). Se não houver alternativa, entregar **com responsabilidade registrada por escrito**.

**Estrutura decidida:** **Lucas** é o interlocutor único com o Elieser · **Karine** assume todos os disparos (cobrança + o que era da Raquel) · **Sabrina** move a base para card no CRM · toda conversa vira card **no E-Chat, não mais no Notion** · os três instalam Claude Code com a pasta versionada do cérebro SST.

**Meta declarada da semana:** IA ativa · número do SST Card ativo · Instagram conectado · funil dentro do CRM.

### 🎧 Respostas do Elieser aos 6 pontos (8 áudios, 10h51–10h58 · transcritos com Whisper)

> Transcrições em `squad-echat-overclock/` — origem: `C:\Users\mayko\Downloads\WhatsApp Ptt 2026-08-14 at 10.*.ogg`

| # | Pergunta | Resposta |
|---|---|---|
| 1 | Custo dos módulos | ✅ **Só IA e e-mail marketing** têm custo extra. CRM, automações do CRM **e automação com Instagram** já estão inclusos — *"sem um centavo de aumento"* |
| 2 | Webhook de saída | 🔴 **Não existe pronto.** *"Talvez precise um pequeno desenvolvimento."* Pede que o Mayko **desenhe o fluxo** e abra call técnica separada |
| 3 | Acesso ao painel | ✅ Mandou a equipe criar na hora, envio no privado, perfil admin com relatórios e indicadores |
| 4 | Imagem | 🔴 **A IA não lê nem envia imagem** — trata só texto. Só com desenvolvimento. ⚠️ Não confundir com o envio manual pela atendente, que funciona |
| 5 | Áudio | 🔴 Não transcreve. Desenvolvimento + consumo extra de token; proposta é botão "transcrever" manual. Não priorizou porque *"tudo que envolve custo, o cliente quer correr"* |
| 6 | Implantação/treinamento | **Inverteu a ordem:** Instagram → 2º número na API oficial → CRM/funil/automações → treinamento conjunto. Recomenda **1–2 pessoas dedicadas só ao digital**, não a mesma equipe do atendimento |

**🔑 A trava da IA é bilateral e mais simples do que ele pensa.** Ele afirmou depender do Rogério para *"acessar a console da Anthropic, contratar o serviço, cadastrar o cartão da SST e gerar o token"*. **A conta, o cartão e o saldo já existem e estão ociosos** — basta gerar uma chave nomeada com validade e entregar ao Lucas. Isso tira o Rogério do caminho crítico.

### ✅ Instagram resolvido sem entregar senha (Lucas, 12h15)

O risco de circular a senha do Instagram no grupo **não se concretizou**: o Lucas liberou **acesso total pelo Meta Business** ao Junior. Falta o Elieser confirmar se a liberação basta para linkar as redes ao E-Chat. Elieser havia informado que pedia desde a semana anterior e mandou para a Raquel, sem retorno — a bola estava do nosso lado.

### 💳 2º número (71 98193-9519) — cartão individual por número

Elieser (13h02): *"O cartão está cadastrado no primeiro número; como será ativado um segundo número, precisa cadastrar o cartão no segundo número. Cadastro individual por número na Meta."* Railane confirmou que já existe um cartão cadastrado — **falta cadastrar no segundo número**. Pergunta aberta: os dois números estão na mesma conta do WhatsApp Business? Se estiverem, o meio de pagamento pode já cobrir ambos.

### 📬 Mensagens enviadas ao grupo SST × EAS em 14/08

- **12h59** — mensagem 1: os 7 pontos (IA/chave, Instagram via BM, 2º número, webhook, áudio, imagem, ordem de implantação).
- **13h+** — mensagem 2: cartão encaminhado à Railane + **conversas sumidas (3 exigências)** + copy da mensagem de encerramento + confirmação sobre template dentro da janela de 24h.

Rascunhos e histórico: `squad-echat-overclock/cobranca-elieser-14-08-2026.md`. Compromissos com dono e prazo: `openclaw-sst/COMPROMISSOS-ATIVOS.md`. Checkpoints no Google Calendar (14/08 14h, 15h, 17h30 · 17/08 09h).

---

## 🖥️ AO RETOMAR (12/08/2026) — Funcionário OpenClaw SST em pré-voo

**Pacote canônico criado:** `openclaw-sst/` — plano mestre, contexto operacional curado, identidade da **MarcIA SST**, contrato de autonomia, heartbeat e diagnóstico read-only da VPS.

**Cópia segura para a VPS:** `C:\Users\mayko\cerebros-clientes\sst\entregas\infraestrutura\openclaw-sst\`. Esta é a fonte que pode ser sincronizada pelo GitHub. **Não clonar o `meu-cerebro` inteiro no servidor.**

**Arquitetura preservada:** E-Chat = canal/CRM · n8n = execução/cofre · OpenClaw = raciocínio/intenção. Chatwoot/Evolution não voltam como caminho principal.

**Estado:** nenhuma mudança feita na VPS. GO depende de: (1) validar fingerprint/acesso SSH; (2) rodar `deploy/preflight-readonly.sh`; (3) snapshot + exports; (4) confirmar webhook de saída e endpoint de envio do E-Chat; (5) autenticar runtime sem segredo no Git.

**Autenticação proposta:** Claude Code Pro do Rogério no Warp para operação · ChatGPT Plus via OAuth/provider `openai` como runtime primário · API OpenAI `gpt-5.6-luna` como fallback com teto exclusivo da SST. Claude Pro dentro do runtime fica opcional, após smoke test.

---

## 🟡 AO RETOMAR (10/08/2026) — Reorganização de equipe: Raquel afastada

> ⚠️ **Registro retificado em 14/08** — ver bloco "Correção de registro" no topo. O texto original dizia "nascimento do filho" e "licença-maternidade"; o bebê não sobreviveu e a Raquel está afastada por luto.

**Raquel está afastada** e não participa **hoje nem nas próximas semanas** do processo comercial. Decisão do Rogério (via Mayko): **Karine, Lucas e Sabrina encabeçam** a partir de agora, sem matinal conjunta — sessões **individuais** de acompanhamento com cada um.

**Redistribuição:**
- **Social Selling** (era da Raquel) → passa para a **Karine**, cobrindo o gap
- **Cobrança** (era da Karine) → Karine repassa **gradualmente para a Sabrina**
- **Blog/GMB** (combinado 05/08) → segue com a **Sabrina**

**Prioridade máxima da semana (à frente de tudo o mais):**
1. **Prospecção Ativa dentro do E-Chat** — disparos ativos rodando pela ferramenta (substitui a ideia de montar Typebot à parte, que travou 2 sessões seguidas)
2. **Atendente de IA no WhatsApp oficial da clínica** — Léia respondendo pela API oficial (ver `atendimento-ia-clinica/CLAUDE.md`), com apoio do Lucas

**Karine + Lucas cobram o Elieser (EAS Systems)** para deixar ativos: WhatsApp oficial da Clínica, WhatsApp oficial do SST Card, Instagram da Clínica, Instagram do SST Card — cada um com CRM e Typebot próprios de setor.

**Rogério:** em viagem até sexta-feira — decisões que dependem dele (verba do Google Ads, etc.) ficam represadas até o retorno.

**Pauta enviada ao grupo:** `pauta-aquisicao-competencia-10-08-2026.html` (publicada em https://playbook.ssfcard.ia.br/pauta-aquisicao-competencia-10-08-2026.html).

**Observação:** Karine está absorvendo 3 frentes de uma vez (Social Selling + repasse de cobrança + cobrança do Elieser) — observar se não vira gargalo novo nas próximas sessões.

---

## 🟡 AO RETOMAR (05/08/2026) — Aquisição de Competência MKT & Vendas (checkpoint)

> **Transcrição:** `C:\Users\mayko\Downloads\Aquisição de Competência - MKT & Vendas SSF CARD.txt` (Tactiq, 63min). **Raquel não veio** — reunião coberta por **Lucas Cardoso e Sabrina** (verificar se é troca de responsabilidade ou ausência pontual).

**Canal "Blog" definido** (pergunta que ficou aberta na sessão anterior): é **Google Meu Negócio + SEO do site + blogagem com IA**, não extensão do conteúdo social. GMB teve 3.500 visualizações no mês, nota 4,3 sem resposta às avaliações; concorrentes (Doutor Consulta, Clínica Fares) já pagam Google Ads na região. Ação: Lucas/Sabrina atualizam GMB + logo + criam blog com IA (SEO). **Proposta em aberto:** somar Google Ads ao orçamento de tráfego pago (hoje só R$30/dia Meta) — decisão de verba pendente do Rogério.

**Checkpoint dos 4 canais combinados em 27/07:**

| Canal | Status |
|---|---|
| Tráfego pago → CRM | ✅ Feito |
| Prospecção Ativa (funil Typebot) | ❌ Não feito — Mayko precisa ensinar a construir |
| Social Selling (remarketing 255 engajados) | ❌ Não feito — confundiram com "engajar posts"; é remarketing/visualização no Meta Business |
| Documentar fluxo (prints/scripts) | 🟡 Parcial — feito no Canva, precisa virar **documento canônico** (processo real, não idealizado — conceito recalibrado nesta call para resolver o RCF do Rogério) |

**Decisão do E-Chat (04/08) operacionalizada:** quadros dentro do CRM do E-Chat + Typebot dele, sem ferramenta nova. Instagram e tráfego pago ainda não estão plugados no CRM do E-Chat — Lucas/Sabrina vão verificar com o Elieser. 2º número oficial (SST Card, protocolo 3028061) **ainda aguardando autorização da Meta**; chat template em uso como ponte.

**Sinal de negócio (Rogério):** agenda do Dr. Sérgio — 33 marcados, 19 particulares (>50%, subiu) — quer entender se veio do marketing ou da demanda orgânica antes de escalar investimento.

---

## 🔴 AO RETOMAR (04/08/2026) — Reunião E-Chat · Elieser (EAS Systems)

> **Handoff de decisão:** `squad-echat-overclock/handoffs/H0-decisao-pos-reuniao.md` · **Recon técnico:** `handoffs/H1-recon-echat.md` · **Mensagens de follow-up:** `squad-echat-overclock/mensagens-pos-reuniao-04-08-2026.md` · **Transcrição:** Notion `3b2ad3c003738175b788ec990381518e`

**A premissa virou.** O E-Chat **já está contratado pelo Rogério** e hoje roda **só o WhatsApp da API oficial da clínica**. A plataforma também entrega — e está parado — **IA de atendimento com prompt configurável · sugestão de resposta comercial para a atendente · formulários de qualificação por especialidade (aceita import de JSON) · CRM com múltiplos quadros · disparo ativo por template**. Testado ao vivo na call: consulta com psiquiatra → convênio ou particular → nome e telefone → agendamento confirmado. Funcionou.

**Decisão declarada na call:** *"a gente vai tocar a partir da tua ferramenta, não tem nada que mudar ou acrescentar agora."* **Sem migração para Chatwoot/Evolution.**

**🎉 O maior ganho:** o **WABA da API oficial está na BM do Rogério** — o número não é refém do fornecedor. E as atendentes, que disparavam por WhatsApp Web e tomavam bloqueio (o que travou a Karine), passam para a API oficial.

**🏗️ Arquitetura em duas camadas — o E-Chat não substitui o OpenClaw:**

| Camada | O quê | Papel |
|---|---|---|
| **E-Chat** (contratado) | canal WhatsApp oficial · CRM operacional · templates · tela da equipe | **corpo** — Fase 1, roda já |
| **OpenClaw** na VPS CX33 `ssf-card-clinica` (62.238.33.111) | SDR · cobrança · CS · gestor semi-autônomos 24/7 | **cérebro** — Fase 2 |

Ponte: **webhook de saída do E-Chat → n8n → `chatCompletions`** (Caminho B, validado em 19/07). ⚠️ **A VPS CX33 não está órfã — é a casa do OpenClaw do SST.**

**🔴 O que ficou em aberto (cobrar do Elieser até sexta 08/08):**
1. Os módulos parados estão no contrato atual ou têm custo adicional? E quanto dá o consumo de API (BYOK)?
2. **Webhook de saída + endpoint de envio** — 🔴 requisito crítico da Fase 2, sem ele o OpenClaw não alcança o canal oficial
3. Acesso do Mayko ao painel, com perfil de relatórios
4. Leitura de imagem (guia de exame) e envio de imagem (peças do clube)
5. **Áudio: hoje não transcreve** — é roadmap? tem previsão?
6. Como funciona a implantação e o treinamento da equipe

**Também pendente:** LGPD do fluxo com imagem de exame passando por LLM (não foi tocado na call) · Raquel conectar o Instagram e confirmar o número na BM · treinamento da equipe (o gargalo que o próprio Mayko apontou: *"a ponta solta é o gargalo ser humano"*).

**Grupo novo:** "SST x EAS Systems" (14 membros, criado por Elieser Júnior) — **Mayko entrou como administrador** em 04/08 17h33.

---

## 🖥️ AO RETOMAR (20/07/2026 · 17h) — VPS nova + Typebot + fábrica de quiz

> Sessão de automação de marketing com a Raquel (15h). Prioridade invertida a pedido do Mayko: **antes** do manual de marca e do exercício de fluxo do RCF-002, subir a infra.

**✅ Servidor provisionado:** Hetzner **CX33 `ssf-card-clinica`** — 4 vCPU · **8 GB RAM** · 80 GB · €8,99/mês · Helsinki · IP `62.238.33.111` · projeto SST CARD.

> ⚠️ **Foi criado do zero, não redimensionado.** O runbook do Time 1 assume *resize* — precisa virar plano de **migração**: reinstalar Chatwoot + Evolution API + n8n no EasyPanel do novo host, reconectar as instâncias de WhatsApp, reimportar os workflows n8n. **Confirmar o que ainda roda na máquina antiga antes de desligá-la.**

**A tese que move tudo:** hoje o paciente pergunta "quanto é o psiquiatra?", recebe "R$ 270" e some (69 levantadas de mão perdidas num dia). O quiz Typebot qualifica com SPIN, mostra **particular × com cartão lado a lado**, e o desconto de 30–50% vira o argumento de venda do SSF Card. Lead quente vai em tempo real para a **Karine**.

**13 documentos entregues** pelos 3 times Overclock, em `C:\Users\mayko\cerebros-clientes\sst\entregas\`:

| Time | Onde | O que |
|---|---|---|
| T1 · Infra | `infraestrutura/runbook-resize-vps-typebot-20-07-2026.md` | Runbook resize + instalação Typebot no EasyPanel (adaptar para migração) |
| T2 · Quiz | `processo-comercial-7dias/02-cadencias/` (7 docs) | Fluxo mestre nó a nó · copy · scoring/roteamento · spec Typebot→n8n→Notion · red team 15 casos · prioridade de especialidades · sumário executivo |
| T3 · Disparo | `processo-comercial-7dias/07-maquina-quiz-disparo/` (5 docs) | Anti-bloqueio · campanha Meta R$11/dia · régua de disparo na base parada · painel + rotina semanal da Raquel · visão geral |

Prompts que geraram isso: `processo-comercial-7dias/03-agentamento/prompts-overclock-typebot-vps-20-07-2026.md`.

**Go-live planejado dos quizzes:** **psiquiatra 20–26/07** (primeiro) · clínico+pediatra 27/07–02/08 · cardio 03–09/08 · gineco+exames 10/08+.

**🔴 O que trava o próximo passo:**
- **Preços por especialidade + régua de desconto 30/40/50%** — só o Rogério crava. Pendente desde 02/07. Sem isso o Typebot não é configurado (3–4 dias de setup depois do OK).
- **Migrar a stack** para o servidor novo antes de qualquer publicação.
- **BM da Meta em validação** — sem ela, disparo só por Evolution em base morna.
- **Chip da Karine bloqueado** por disparo; 2º chip em cadastro. Protocolo anti-bloqueio do T3 é obrigatório antes de qualquer volume.
- **Instância Evolution** estava com o Lucas — prometida para 21/07.

**Pendências da Raquel que ficaram para depois:** manual de marca do SSF Card (em andamento, travou no Canva por exigir conta própria) e o exercício de fluxo do RCF-002 para **quarta 22/07**.

---

## 🔴 AO RETOMAR (20/07/2026) — Reunião Estratégica Rogério

> **Ata completa:** `reuniao-estrategica-rogerio-20-07-2026.md`. Espelho Notion: `3a3ad3c00373811c899cfad7ab0b8d0d`.

**O que rolou:** Rogério entregou os **4 RCFs assinados** (Closer, Marketing, CS, Cobrança — R$ 1.650 cada, CLT 44h, emissão 03/07). Decisão: **cada colaborador desenha o próprio fluxo de trabalho e comparamos na quarta 22/07** contra o gabarito. Mayko gerou o fluxograma dos 4 cargos ao vivo (`processo-comercial-7dias/rcf-fluxogramas-cargos.html`).

**Achado forte (clínica/Débora):** **69 levantadas de mão não respondidas.** Atendimento só passa preço, não responde áudio, raramente liga de volta. Proposta: mandar demanda de agendamento clínico para a **Karine (closer)** — vira consulta + pacote + SSF Card.

**🔴 PENDENTE AO RETOMAR:**
- **Enviar o fluxograma em PDF ao Rogério** — ele não conseguiu abrir o artifact (exige conta Claude) e pediu refino ("prompt melhor", referência Miniorbit). **Antes de quarta.**
- **Cobrar Débora** (via Rogério) pelas APIs eChat + Gringo e senhas — prometido para **quarta de manhã**.
- **Karine — Agente Kanban de Dívidas** (conversa era 14h30 de 20/07).
- **19 automações com Raquel.**
- 🔴 **Financeiro NÃO foi aberto por falta de tempo** — aporte semana 1, salários, GO reajuste, régua de desconto seguem pendentes desde 02/07. Ver `checklist-semana1-julho-2026.md`.

**Também na mesa:** expansão para **4 andares** (recomendação: um andar por vez, cuidar do IPTU/embargo, cravar garantias contratuais) · **RH por produtividade** com a Amanda · CLT × PJ vai aos advogados do Rogério.

---

## 🌅 AO RETOMAR AMANHÃ DE MANHÃ (07/07/2026) — ordem de prioridade

> Sessão de 06/07 fechou 3 frentes novas (detalhe de cada uma logo abaixo). Nenhuma está 100% concluída — todas têm uma ação de Mayko e/ou Rogério pendente. Ordem sugerida:

1. **🚩 Faixas de rua (urgente, Rogério cobrou pessoalmente)** — mandar o artifact pro Raquel/Rogério, resolver logo oficial + confirmar WhatsApp + Raquel escolher os 2 pontos no bairro → só depois manda pra gráfica.
2. **🦷 Sala de Odontologia** — enviar a mensagem pronta + checklist técnico pra arquiteta Érica Sobral e aguardar prazo de revisão; confirmar com Rogério se já há dentista CRO-BA definido.
3. **🤖 Automação n8n** — autenticar `/mcp` → "claude.ai n8n" (bloqueador de todos os passos seguintes) e então montar o mapa 🟢/🟡/🔴 dos 19 workflows.
4. **🔴 Ainda em aberto de antes (não esquecer):** checklist Semana 1 de Julho — aporte, salários, GO reajuste, régua de desconto — ver bloco mais abaixo (`checklist-semana1-julho-2026.md`). Nada disso foi resolvido nesta sessão.

---

## 🚩 AO RETOMAR (06/07/2026) — Faixas de rua do lançamento (urgente)

> Rogério pediu, na call de hoje, para produzir com urgência as 3 faixas do item #27 do checklist de inauguração (prazo original 10/06, nunca produzido): 1 na fachada da clínica + 2 em ruas estratégicas do bairro, sem revelar o endereço nas de rua.

**Documentos:** `processo-comercial-7dias/05-bairro-da-paz/faixas-lancamento-06-07-2026.md` + artifact de produção (spec 4×1m, pronta para gráfica/PDF): https://claude.ai/code/artifact/f0d5f361-d350-4d89-997c-84dced585491

**Pendências antes de mandar pra gráfica:** logo oficial vetorial (trocar wordmark placeholder) · confirmar se WhatsApp da Karine aguenta o volume de rua · Raquel escolher os 2 pontos exatos das faixas 2 e 3.

---

## 🦷 AO RETOMAR (06/07/2026) — Proposta Sala de Odontologia (revisão de planta térreo)

> Rogério pediu para unir as salas **Clínica 03** (6,49m²) e **Clínica 04** (6,30m²) da planta térrea (aprovada 08/06/2026, arquiteta Érica Sobral) em uma **Sala de Odontologia** (~13,17m²).

**Documento criado:** `processo-comercial-7dias/05-bairro-da-paz/proposta-sala-odontologia-06-07-2026.md` — comparação antes/depois, checklist regulatório (RDC ANVISA 50/2002 para consultório odontológico) e mensagem pronta para enviar à arquiteta.

**🔴 2 pontos que travam o Rogério antes da obra (não são só de planta):**
1. O projeto já está **aprovado no VISA/CAU** (08/06/2026) — mudar o uso de 2 salas pode exigir **novo protocolo no alvará sanitário**, não só redesenho. Perguntar direto à Érica antes de tocar a obra.
2. Odontologia exige **Responsável Técnico próprio** (cirurgião-dentista CRO-BA), separado do RT médico já existente — confirmar se já há dentista definido antes de formalizar a obra.

**Próximo passo:** Mayko envia a mensagem pronta + checklist para Érica Sobral e aguarda prazo de revisão.

**Atualização (mesmo dia):** Mayko enviou um guia técnico de consultório odontológico (RDC ANVISA 50/2002 + RDC 15/2012). Documento e artifact atualizados com: requisitos completos de piso/parede/teto/mobiliário, checklist de biossegurança e um **achado novo — não há espaço no térreo para sala de esterilização separada**; recomendação é bancada única de fluxo (suja→preparo→estéril) dentro da própria Sala de Odontologia. Artifact pronto para gerar PDF (Ctrl+P): https://claude.ai/code/artifact/26845181-659b-45b8-80f0-5fdce40f8933

**Espelhado no Notion** (hub 🏥 SST Clínica — 2ª Filial | Bairro da Paz): https://app.notion.com/p/395ad3c0037381f48a13ed18c91b53f5

---

## 🤖 AO RETOMAR (06/07/2026) — Automatização dos processos SST

> Mayko pediu **retomar a automatização dos processos da SST**. Escolha da abordagem (via AskUserQuestion): **"Mapa geral + decidir juntos"** (não escolher frente antes de saber o que está de fato no ar) + **"Tentar via MCP n8n"**.

**Diagnóstico até aqui (fato, não documentação):**
- As **19 automações existem fisicamente** como JSON em `processo-comercial-7dias/02-cadencias/*.json` — foram **construídas, não implantadas**. O gargalo nunca foi código: é **importar no n8n + env vars + testar + ligar cron**, mais a **decisão da régua de desconto do Rogério**.
- Ainda **NÃO foi possível confirmar o que está vivo no n8n real** (`n8n.clinicalucrativa.ia.br`), porque o **MCP n8n exige autenticação interativa**.

**🔴 BLOQUEADOR ATIVO — autenticação MCP n8n:**
- `mcp__claude_ai_n8n__authenticate` retorna: *"This is a claude.ai MCP connector. Ask the user to run /mcp and select 'claude.ai n8n' to authenticate."*
- **AÇÃO DO MAYKO ao retomar:** rodar `/mcp` → selecionar **"claude.ai n8n"** → autenticar. Só depois dá pra listar workflows ativos.

**Próximos passos (ordem, ao retomar):**
1. Autenticar o MCP n8n (`/mcp` → "claude.ai n8n").
2. Listar workflows na instância e montar a tabela **🟢 Vivo (importado+ativo+executando) · 🟡 Importado mas parado · 🔴 Só JSON** para os 19.
3. Priorizar por **impacto no caixa** — candidato líder: **Agente Kanban de Dívidas** (destrava ~R$ 7,9k/mês de inadimplência recorrente). Ver bloco "AO RETOMAR (manhã 19/06)" e memória `proxima_tarefa_n8n_agente_kanban.md`.
4. Em paralelo (não bloqueia importar/testar, só escalar): **cobrar do Rogério a régua de desconto oficial** (10% / 40% / 50%).

**Nota:** o Agente Kanban pode ser **importado e testado em modo manual** sem esperar a régua; só o **cron/disparo escalado** depende da decisão do Rogério.

---

## 🆕 AO RETOMAR (03/07/2026) — Matinal/RMA com o time

> **Ata:** `processo-comercial-7dias/01-matinais/03-07-2026/ata-matinal-03-07-2026.md`. Espelho Notion: matinal `392ad3c0037380adb7f7d2ea52305959`.

**O que rolou:** rodada de feedback (continuar/parar/começar) com Lucas, Raquel, Karine. Feedback-chave do Mayko: **parar a "cantada" (nomes de clientes) → reportar número real + resultado financeiro do dia** (isso rege o RMAR "aplicado"). Problema sistêmico: **BOOM** (inativa ativos, falha cobrança de cartão, dificultou acesso).

**3 mudanças de julho:** (1) cobrança multi-canal · (2) resolver BOOM · (3) relatório = número real.

**🔴 PENDENTE AO RETOMAR:**
- Coletar números reais dos 3 (prazo amanhã 12h) → **refazer o RMAR de junho** (trocar estimativas 30 adesões/12 reativações/mix por reais; bater com produção R$ 12.144).
- Montar **template "relatório diário com número real"**.
- Encaminhar as 3 mudanças de julho.
- **Ainda aberto da véspera:** aporte semana 1 (~R$ 7k) · salários · GO reajuste · demandas Aline (lab jun 50,01%, Débora gargalo 9,64%). Ver `checklist-semana1-julho-2026.md`.

---

## AO RETOMAR (02/07/2026) — Reunião Mensal concluída

> **Ata completa:** `reuniao-mensal-02-07-2026.md` (leia para o detalhe). Espelho no Notion: Pipeline "Decisões & Monitoramento" (`c5c9fb1eb5284c5684993207c7acba5b`) + atas 1ª/2ª Parte. **Entregáveis em `Downloads/`:** 5 gráficos + RMAR (PPTX/PDF) + planilha fluxo de caixa.

**Descobertas-chave:** o cartão **já se paga** (produção mai+jun R$ 22.270 > aporte na empresa R$ 11.943, sem o carro). Produção real jun **R$ 12.144** (Asaas R$ 9.811 + dinheiro recepção R$ 2.332). Adimplência recorrente **54,4%** = R$ 7,9k/mês parados.

**Decisões:** reajuste R$ 24,90→39,90 (julho, +R$ 13,5–20,9k/ano) · unificar contas · máquina de vendas (Karine **Closer Senior** + 2 juniores + 1 cobrança) · meta julho 56 Prata + 24 Ouro.

**Julho:** custo R$ 26k · receita (meta) R$ 20k · **aporte ~R$ 11k** (semana 1 concentra R$ 9,6k de sócios/consultor vs caixa R$ 1.228 → aporte urgente ~R$ 7k).

**🔴 PENDENTE DO ROGÉRIO (esta semana):** liberar aporte semana 1 (~R$ 7k) · cravar salários definitivos · GO reajuste + régua de desconto · agenda 2×/sem BP.
**Pendências:** confirmar com Karine adesões/reativações jun + R1 Growth · **blocos da pauta não abertos: Inauguração BP · Closer (Safira × Vanesca)**.

---

## ✅ AO RETOMAR (30/06/2026) — PRÓXIMOS PASSOS, em ordem

> Onde paramos: CLAUDE.md sincronizado (status 29/06, Agente Kanban + Máquina de Cobrança mapeados). Agora a fila de execução, do mais urgente ao estratégico. Cada item linka a seção detalhada abaixo.

**🔴 P0 — Inauguração Bairro da Paz (D-1, é amanhã 01/07):**
1. Confirmar com Rogério o checklist final de inauguração (alvará/VISA Salvador, equipe, ponto). Ver `processo-comercial-7dias/cronograma-inauguracao-01-07-2026.md`.
2. Confirmar quem é o closer em campo no dia 1 (Safira × Vanesca — teste de campo). Ver `rh-closer/`.

**🟠 P1 — Pesquisa de Satisfação v2 + fechar nº de junho (gate do RMAR):**
3. Importar Typebot v2 (`pesquisa-satisfacao-sponsor/typebot-satisfacao-rogerio-v2.json`) + ativar n8n v2 (`...n8n-workflow-satisfacao-rogerio-v2.json`) + **teste 🔴** → publicar link.
4. Fechar a mensagem da Julia (pesquisa + cobrança mensalidade R$ 3.800 — confirmar valor).
5. **Validar total de junho contra o dashboard Asaas do Rogério** ANTES de cravar o RMAR (ele puxa extratos quarta). Receita real jun = R$ 8.613 / +45% (sem aporte).

**🟡 P2 — Máquina de Cobrança / Agente Kanban (destrava caixa recorrente inadimplente R$ 7,9k/mês):**
6. Importar `02-cadencias/n8n-agente-kanban-dividas.json` no n8n + env vars (`NOTION_KANBAN_DB_ID=138f7d78-...` etc.) → teste 5 cards → ligar cron 07h30. Detalhe na seção "AO RETOMAR (manhã 19/06)" abaixo.
7. **Cravar com Rogério a régua de desconto oficial** (hoje convivem 10%/40%/50%) — bloqueador para escalar o disparo.
8. Subir a planilha 28/04 da Karine no kanban Notion (`importar-csv-kanban.py`).

**🟢 P3 — Decisão estratégica de receita (aguarda GO/NO-GO Rogério):**
9. Reajuste de **164 contratos R$ 24,90 → R$ 39,90 = +R$ 2.460/mês / +R$ 29.520/ano**. Confirmar com Karine se há mais 24,90 fora do ciclo de junho.
10. Pendências p/ cravar nº oficial: recepção (espécie/maquininha) entra no Asaas? · inadimplência 327 recorrentes × 178 pagantes bate com o que ele vê?

---

## 💰 29/06 — Panorama financeiro Asaas + Pesquisa de Satisfação v2 (dia do pagamento do advisory)

> Análise consolidada da conta Asaas (4 exports, dedup por Identificador) para mostrar ao Rogério o crescimento real desde o advisory (entrou 01/05). Detalhe na memória `analise_financeira_asaas_29-06-2026.md`.

**⚠️ CORREÇÃO (29/06, fim do dia) — Rogério contestou por áudio e ESTAVA CERTO.** A 1ª versão dava Jun R$ 16.010 / +170%, que não bateu com o caixa real dele ("não tenho nem dinheiro pra pagar o seu e o meu amanhã"). Recalculado **por data de pagamento, sem aporte**: número honesto abaixo. Gráfico PNG, panorama HTML e memória já corrigidos.

**🟢 A narrativa CORRIGIDA (receita real × aporte):**
- Separados os **R$ 21.200 de APORTE do sócio** (Maria Adélia R$10k+R$5k, Rogério R$2k+R$1,8k, SSF-Card R$2,4k) da receita de verdade.
- **Receita real (sem aporte, por data de pgto):** Abr R$ 5.929 → Mai R$ 6.856 → **Jun R$ 8.613 (+45%, não +170%)**. Motor recorrente PAGO: 114 → **188** cobranças (3×). **MRR contratado jun ≈ R$ 13.943** (327 recorrentes), mas **só 178 pagaram → R$ 7,9k/mês não entrou (46% inadimplência)** = maior alvo da Máquina de Cobrança.
- **Em junho o aporte (R$ 15k) ainda foi MAIOR que a operação real (R$ 8,6k)** — é ele que segura o caixa. Foco: crescer a receita real até dispensar o aporte. Bate com a dor do Rogério.
- **Reconciliação com o dashboard dele (junho/vencimento):** Recebidas R$ 19.790 ✓ · Confirmadas R$ 3.391 ✓ · Aguardando R$ 7.506 ✓ · Vencidas R$ 1.436 ✓.

**📈 DECISÃO ESTRATÉGICA (número conservador):** **164 contratos recorrentes** da base ativa de junho ainda em R$ 24,90 (não 294) → migrar p/ **R$ 39,90** (reajuste já programado) = **+R$ 2.460/mês / +R$ 29.520/ano** (≈ 1 advisory/ano). Blindagem: mesmo com 20% churn, ainda +R$ 1.143/mês. Pode haver mais 24,90 fora do ciclo de junho — confirmar com Karine. **Aguarda GO/NO-GO do Rogério.**

**❓ PENDÊNCIA a confirmar com Rogério (trava o número oficial do RMAR):**
1. Aportes (R$ 21,2k) — confirmar que são repasse dele, não venda. (É o que tirei → por isso jun real é R$ 8,6k, não R$ 16k.)
2. **Dinheiro da recepção (espécie/maquininha) entra no Asaas ou fica fora?** Se fica fora, o faturamento real é maior. → virar processo (registrar toda venda presencial).
3. Inadimplência recorrente: 327 contratos, só 178 pagaram — bate com o que ele vê? Rogério vai puxar extratos amanhã/quarta pra cravar o número.

**Artefatos criados/deployados (29/06):**
| Entregável | Arquivo | Estado |
|---|---|---|
| Panorama Receita × Aporte (HTML, 2 gráficos Chart.js) | `processo-comercial-7dias/panorama-receita-x-aporte-29-06-2026.html` | ✅ deployado |
| Gráfico PNG da receita (p/ WhatsApp) | `processo-comercial-7dias/receita-real-x-aporte-29-06-2026.png` | ✅ enviado ao Rogério |
| Pesquisa Satisfação v2 (Typebot, foco receita×custo + nova unidade) | `pesquisa-satisfacao-sponsor/typebot-satisfacao-rogerio-v2.json` + `.flow.yaml` | ✅ criada — Mayko importa |
| n8n v2 (semáforo lê ROI + saúde financeira) | `pesquisa-satisfacao-sponsor/n8n-workflow-satisfacao-rogerio-v2.json` | ✅ criado — Mayko ativa |

**Dinâmica de envio (igual mês passado):** 1º Mayko manda áudio + gráfico PNG em seu nome (confirma receita); depois **Julia (estagiária da equipe)** manda a pesquisa v2 e, após a resposta, a cobrança da mensalidade (R$ 3.800 — confirmar valor). Mensagens prontas na sessão.

**⏳ Próximo:** importar Typebot v2 + ativar n8n v2 + teste 🔴 → publicar link → fechar mensagem da Julia. Validar total de junho contra o dashboard Asaas antes de cravar RMAR.

---

## ▶️ AO RETOMAR (manhã 19/06) — Criar o n8n do Agente Kanban de Dívidas

> **Tarefa nº 1 da manhã (pedido explícito do Mayko em 18/06):** criar o workflow no n8n e seguir com a proposta de automação. **Tudo já está pronto pra isso** — não precisa reconstruir contexto.

**O que já está feito (não refazer):**
- ✅ Pipeline Notion provisionada via MCP: propriedades `CPF`, `E-mail`, `Oferta Sugerida`, `Mensagem Sugerida` + `Lucas` em Responsável + status `Processo de Cancelamento` e `Cancelado / Base Limpa`. DB `138f7d78-0ea6-423d-babc-2f5a1fe0092b` · data source `e819fdee-322b-4cd5-a9b5-208bd30f14e1`.
- ✅ Workflow JSON pronto e alinhado ao schema real: `processo-comercial-7dias/02-cadencias/n8n-agente-kanban-dividas.json` (8 nós, validado).
- ✅ Spec + prompt do agente: `05-agentamento-karine-ia/07-agente-kanban-dividas.md`.
- ✅ Página visual da máquina (deployada) + ATA da matinal 18/06.

**Passos da manhã (ordem):**
1. **Importar** `n8n-agente-kanban-dividas.json` no n8n (`n8n.clinicalucrativa.ia.br`).
2. **Configurar env vars:** `NOTION_TOKEN` · `NOTION_KANBAN_DB_ID=138f7d78-0ea6-423d-babc-2f5a1fe0092b` · `ANTHROPIC_API_KEY` · `EVOLUTION_API_URL` · `EVOLUTION_API_KEY` · `EVOLUTION_INSTANCE` · `SST_CARD_GROUP_CHAT_ID`.
3. **Teste manual** com 5 cards → conferir que grava `Oferta Sugerida`/`Mensagem Sugerida` e move `Status` corretamente.
4. **Ligar o cron 07h30** e validar o resumo no grupo WhatsApp.

**⚠️ Bloqueador a resolver com Rogério (paralelo):** cravar a **régua de desconto oficial** — hoje convivem 10% (Asaas/SULENE), 40% (agente) e 50% (Lucas). Proposta pronta na seção 3 do spec (1-2 parc → 10% · 3-5 → 40% · 6+ → 50% · legado Tenex → entra como assinante novo). Sem isso, não escalar o disparo.

**Insumo pendente:** subir a planilha 28/04 da Karine no kanban (`Valor em Aberto` + `Parcelas em Atraso`) — posso gerar um script CSV→Notion se Mayko pedir.

Detalhe completo na memória do projeto (`.claude/.../memory/proxima_tarefa_n8n_agente_kanban.md`) e na ATA `01-matinais/18-06-2026/ata-matinal-18-06-2026.md`.

---

## 🔎 19/06 — Achado: caixa RECORRENTE vs ATIVO (o "real resultado da Karine")

> Cruzando a transcrição da matinal 19/06 + extrato Asaas (`Cobrancas (1).xlsx`, filtro "Data de recebimento").

As 7 cobranças que "caíram" no Asaas em 19/06 (**R$ 289,30**) eram **todas Cartão de Crédito recorrente, confirmadas em 18/05 e creditadas hoje** (D+30+2) — **caixa de maio que caiu sozinho, não cobrança ativa.** O Asaas em "Data de recebimento" **mistura** 🔵 recorrente (cartão, automático) com 🟢 ativo (Pix/dinheiro/cobrança = esforço real da equipe). Sem separar, o número infla e mascara que a campanha ainda quase não gera caixa novo (esforço ativo de ontem: 180 disparos → 10 respostas → 2 perdões).

**Ações:** ✅ Agente Kanban ajustado p/ separar os 2 baldes no resumo matinal (`02-cadencias/n8n-agente-kanban-dividas.json`, consulta Asaas; regra `recorrente = CREDIT_CARD + subscription`). ⏳ Disparo via **lista de transmissão WhatsApp** (chat caro ~R$200) · enriquecimento (Raquel) **antes** do disparo (taxa resposta 5,5%). Detalhe: ATA 18/06 seção 8.

---

## 🟢 18/06 — Matinal definiu a MÁQUINA de cobrança (ATA completa: `01-matinais/18-06-2026/ata-matinal-18-06-2026.md`)

> **Reunião de 2h44 (08h19) com Rogério + Karine + Lucas + Raquel.** Destravou a verdade do caixa e desenhou o fluxo operacional Karine→Lucas→Raquel para fechar o mês em R$ 20.000.

**🔴 VIRADA FINANCEIRA (o número real):** o Asaas mostrava R$ 18.853 recebidos, mas **R$ 15.000 são aportes do Rogério** (R$ 10k + R$ 5k). **Produção real = R$ 3.853.** E **não haverá mais aportes** ("a aposta acabou — agora vivemos do que produzimos"). Karine produziu R$ 6.287 na 1ª quinzena (Boom). **Gap até R$ 20.000: ~R$ 17.000 até 30/06.** Esticada R$ 40.000.

**📌 DEFINIÇÃO OFICIAL — Perdão de Dívida = limpeza de base com direcionamento:** *"ou traz de volta ou paga"* (Rogério). Não é dar dinheiro de graça; é parar de "fingir que clientes mortos estão ativos" e converter o limbo em caixa OU base limpa.

**A MÁQUINA (fluxo definido):**
1. **Karine** negocia o perdão (3 tentativas). Pagou/reativou → ✅ caixa (classifica Pix/cartão/dinheiro). Não evoluiu → passa pro Lucas. Fonte do valor devido: **planilha Excel 28/04**.
2. **Lucas** faz "reuniões de cancelamento": *"as mensalidades seguem correndo e crescendo até encerrar — pra encerrar, pague aqui"* (link avulso). Receita = encerramentos pagos OU base limpa. **Não terminar o dia sem cancelar.**
3. **Raquel** enriquece (sistema "dados": CPF→telefone/e-mail/parentes) os **~50% que não responderam** → devolve pra Karine. Bônus: gera lead novo do responsável financeiro encontrado.

**Base hoje:** 761 Tenex · 411 ativos · ~350 não migraram · ~170–200 prováveis cancelados · **35 perdões já feitos no mês** (~10% dos 225+181 disparados).

**⚠️ Pendências da matinal:**
- **Régua de desconto sem padrão:** aparecem 10% (cobrança SULENE no Asaas), 40% (agente) e 50% (Lucas casos altos) → **cravar a oficial** antes de escalar.
- **Mayko:** subir planilhas da Karine no Notion + mandar links das pipelines; construir agente IA "cambã de dívidas"; melhorar automações (dependem do ID Chatwoot preenchido).
- **Rogério:** criar acesso Asaas restrito p/ Karine (conciliação).
- **Conciliação:** Karine fecha 3 caixas (dinheiro/cartão/Pix) batendo com Asaas → dinheiro → Hailani. Mix de pagamento entra no RMA semanal.

> **Histórico (16–17/06):** Rogério aprovou em 17/06 a oferta + liberou base Tenex + Asaas (destravou a decisão). A campanha já estava construída/commitada (ver inventário abaixo). A matinal 18/06 transformou isso em processo executável.

**Campanha JÁ CONSTRUÍDA e commitada (`master`, commits 1856089→b643702) — 4 frentes, falta só execução/config:**
| Entregável | Arquivo | Estado |
|---|---|---|
| Plano mestre (4 frentes, funil, cronograma) | `processo-comercial-7dias/campanha-perdao-divida-2quinzena-junho-2026.md` | ✅ |
| Mensagem/áudio Rogério | `processo-comercial-7dias/mensagem-rogerio-estrategia-perdao-16-06-2026.md` | ✅ pronta p/ enviar |
| Matinal 16/06 (barra meta R$20k) | `01-matinais/16-06-2026/roteiro-matinal-16-06-2026.html` | ✅ deployada |
| Matinal 18/06 (modo execução, OK Rogério) | `01-matinais/18-06-2026/roteiro-matinal-18-06-2026.html` | ✅ deployada |
| Criativo + 4 copies WhatsApp | `processo-comercial-7dias/criativo-perdao-divida-junho-2026.html` | ✅ deployado |
| Disparo em massa (aquecimento 50→100→150/dia) | `02-cadencias/n8n-perdao-divida-disparo-massa.json` | ✅ |
| Typebot de quitação (CPF→Asaas→Pix na hora) | `02-cadencias/typebot-quitacao-perdao-divida.json` | ✅ |
| 3 webhooks Asaas (buscar / gerar 2ª via / evento) | `02-cadencias/n8n-asaas-quitacao-{buscar,gerar-2via,evento}.json` | ✅ |
| Database Notion "Eventos Quitação" | ID `65a6dcc6c95f4e23bd14dd1798f2391a` (hub SST Clínica) | ✅ criado |
| Guia de implantação interativo (8 fases) | `02-cadencias/guia-implantacao-perdao-divida.html` | ✅ deployado |

**Falta só (não é código):** OK do Rogério · credenciais `ASAAS_API_*` + `KARINE_WHATSAPP` no n8n · trocar `SEU_N8N_URL` no Typebot · conectar integração `NOTION_TOKEN` ao database. Seguir o guia de implantação.

**Frente 4 (Marcos-CFO → Asaas):** prazo 30/06 — relatório diário de caixa ao Rogério.

---

## Sessão 17/06/2026 — Manutenção do CLAUDE.md (sincronização de estado)

Auditoria do `CLAUDE.md` do projeto via `/init` — correções factuais entre o documentado e o estado real de 17/06. **Commit `1959b6e`, pushed para `origin/master`.**

| Correção | Detalhe |
|---|---|
| Bloco de Status | Data 09/06 → 17/06; inauguração "22 dias" → "14 dias"; RMAR "09/06" → 08/06; Campanha Perdão de Dívida promovida a 🔴 foco atual; VISA marcado como prazo vencido a reconfirmar |
| Personas — Closer | **Safira deixa de ser "única candidata".** Adicionada **Vanesca Nascimento** como 2ª candidata (entrevista 15/06; mora no Bairro da Paz, sem experiência no produto). Etapa decisiva: teste de campo com 2–3 candidatos. Ver `rh-closer/` |
| Workflows n8n | Novo bloco com os 5 JSONs da campanha (disparo em massa, Typebot quitação, 3 webhooks Asaas) + env vars `ASAAS_API_KEY/URL` e `KARINE_WHATSAPP` |
| Mapa de documentos | Adicionados plano mestre da campanha, mensagem Rogério, criativo e guia de implantação |

> **⚠️ Supersede a "CORREÇÃO FACTUAL (11/06)" mais abaixo:** a afirmação de que "Safira é a única e principal candidata" valeu até 14/06. **Desde 15/06 há 2 candidatas no funil** (Safira + Vanesca). A parte sobre Roni (RH, não candidato a closer) permanece válida.

---

## Sessão 14/06/2026 — Manutenção do CLAUDE.md (documentação)

Revisão do `CLAUDE.md` do projeto via `/init` — correções factuais entre o documentado e o estado real do diretório. **Commit `ed67da3`, pushed para `origin/master`.**

| Correção | Detalhe |
|---|---|
| `rh-clinica/` | Coluna "CLAUDE.md Local" corrigida de `—` → `rh-clinica/CLAUDE.md` (o arquivo já existia) |
| Template matinal | Referência fixa `09-06-2026` trocada por "copiar a mais recente" (hoje `11-06-2026`) |
| Pastas mapeadas | Adicionadas ao mapa de Projetos Secundários: `05-agentamento-karine-ia/`, `Coaching-Emocional/`, `analise_mercado/`, `docs/` |

Verificado também que o `.gitignore` (linha 4, `__pycache__/`) **ignora corretamente** o `__pycache__/` do projeto — nenhum `.pyc` rastreado.

---

## Sessão 11/06/2026 — Entrevista Closer Safira (Fase 1 comportamental)

### Resultado
- **Safira Letícia Souza Pereira** entrevistada via Meet (14h) por Mayko + Rogério — metodologia 4 perguntas poderosas.
- **Decisão: aprovada na fase comportamental → 2ª rodada presencial.** Score parcial 59/100 (simulação não testada).
- 🟢 Fortes: comunicação de trator, público C/D igual ao SST (vinha de consignado INSS), mindset de crescimento (quer virar gestora).
- 🟡 Atenção: zero números de venda validados, sem simulação, motivação muito ancorada em dinheiro (fit "bom samaritano" a testar).

### Documentos criados
| Arquivo | Conteúdo |
|---|---|
| `rh-closer/scoring-safira-11-06-2026.md` | Ficha de scoring parcial + decisão + mensagem Rogério |
| `rh-closer/roteiro-fase2-presencial-closer.md` | Roteiro fase 2: simulação Dona Maria + STAR + checklist competências |

### Próximos passos closer
- [ ] Enviar mensagem-resumo ao Rogério (template no scoring)
- [ ] Agendar fase 2 presencial (Bairro da Paz / Simões Filho)
- [ ] Na fase 2: simulação Dona Maria + validar números STAR + confirmar perfil hunter + testar fit cuidado
- [ ] Validar 2 referências de ex-gestores (corte ≥8/10)

> **✅ CORREÇÃO FACTUAL (11/06):** Safira é a **única e principal candidata** à vaga de Closer Bairro da Paz — não há competição no funil. **Roni NÃO é candidato a closer**: ele é funcionário do RH da SST (irmão e indicação do Rogério) que apoia as funções de Recursos Humanos. Todo registro anterior que tratava "Roni" como candidato/entrevista de closer foi um mal-entendido e está corrigido nos `.md` vivos do projeto.

---

## Sessão 11/06/2026 — Reunião Estratégica Rogério + Decisão BPO/Contabilidade

**Reunião ao vivo (09:30 BRT)** — pauta: estratégia B2B para inauguração + decisão de gestão financeira/BPO + agentização IA + coaching Aline.

### Decisão BPO/Contabilidade (FECHADA)

Rogério avaliou 3 propostas do fornecedor Moisés (Orizon):

| Proposta | Valor | Decisão |
|---|---|---|
| Contabilidade Estratégica (folha, tributário, relatórios, distribuição de lucro) | ~R$ 697/mês | ✅ **Fechar** |
| Abertura de CNPJ filial Bairro da Paz (Certificado A1 + abertura) | R$ 1.200 em 2x | ✅ **Fechar** |
| BPO Financeiro completo (conciliação, notas, AP/AR) | R$ 2.000/mês | ⏸️ **Adiado** |

**Modelo recomendado (Mayko) e aprovado:** não terceirizar o financeiro inteiro agora — pilotar gestão interna com **Conta Azul ou Bling (~R$60–360/mês)** + pessoa de confiança (**Hailani**) + agente de IA CFO **"Marco"** (em desenvolvimento por Mayko, integração via Open Cloud com Conta Azul/Bling/Asaas). Referência: experiência anterior com 10 unidades onde 1 pessoa interna + software online (Agiliza) resolveu a gestão centralizada.

Também decidido: avaliar abertura de **CNPJs separados** para odontologia, clínica e SST Card (cartão).

➡️ Itens 113–117 do `processo-comercial-7dias/05-bairro-da-paz/checklist-mestre-inauguracao-01-07-2026.md` (seção 5.2) atualizados com esta decisão.

### Estratégia B2B para Inauguração (Clube SST Card)

Parcerias Ouro/Prata/Bronze com odontologia, estética, academias, PET e nutrição: parceiro dá desconto exclusivo ao portador do SST Card + paga comissão (financia o vendedor B2B) + dono recebe SST Card grátis no período de teste. Meta mínima: **100 vidas/mês**. Rogério chega como autoridade médica selecionando os melhores parceiros da região — conceito de "economia compartilhada local", todos presentes na inauguração.

### Ações registradas no Notion (database criado)

🔗 https://app.notion.com/p/a35e4f2e3a2044d7a36a9245018987a1 — **"📋 Ações & Próximos Passos — Reunião 11/06"** (dentro do hub 2ª Filial Bairro da Paz), 11 itens com Responsável/Status/Categoria/Prazo.

**Mayko Rodrigues:**
| Ação | Prazo |
|---|---|
| Preparar playbook + configurar CRM para visitas B2B do Rogério | 13/06 |
| Concluir automações de CRM, disparos e marketing | 14/06 |
| Finalizar agente IA CFO "Marco" (Conta Azul/Bling/Asaas) | 30/06 |

**Rogério:**
| Ação | Prazo |
|---|---|
| Falar com Lucas sobre processo B2B na região | 13/06 |
| Agendar reunião com Mayko + Hailani (gestão financeira) | 13/06 |
| Fechar contabilidade estratégica + abrir CNPJ filial BP | 16/06 |
| Adiar BPO, pilotar gestão interna (Conta Azul/Bling) | 16/06 |
| Realizar visitas a 4-5 empresas/segmento no Bairro da Paz | 30/06 |
| Abrir CNPJs separados (odonto/clínica/cartão) | 30/06 |
| SST Card grátis em teste para parceiros B2B | 30/06 |

**Equipe Cartão:**
| Ação | Prazo |
|---|---|
| Entregar relatório RMA pendente | 13/06 |

### Coaching Aline — sessão 2 (avanço)

Sessão sobre identidade/autopercepção: Aline teve momento de ressignificação ("agora eu entendi"), usando referência Cristiano Ronaldo + figura do pai. Risco: alta chance de regressão sem reforço. Próxima sessão (~7h, semana seguinte): **autorresponsabilidade**.

---

## Sessão 09/06/2026 — Matinal domingo + RMAR executado + CLAUDE.md v2.0

### Documentos criados e commitados

| Arquivo | Conteúdo | Git Commit | Status |
|---|---|---|---|
| `processo-comercial-7dias/01-matinais/09-06-2026/roteiro-matinal-09-06-2026.html` | Matinal terça 09/06: resultado ontem (Karine 1 cartão, Lucas 11 agendamentos, Raquel 24 contatos), metas hoje, 2 perguntas críticas Rogério | be2318e | ✅ Pronto |
| `RMAR-SST-Card-Bairro-da-Paz-ABRIL-MAIO-2026.pptx` | ✅ GERADO via script Python — RMAR com dados reais de abril (24 adesões) e maio (35 adesões, +45%) · 2 meses comparativos | ec217eb | ✅ Pronto para apresentação |
| `CLAUDE.md` | ✅ v2.0 com 7 novas seções: Fluxo Operacional Matinal, Fluxo RMAR, Tarefas Periódicas, Contatos Chave, Troubleshooting, Referência Rápida | 405b64a | ✅ Committed |
| `gerar_rmar_sst.py` | Script executado: 2 meses (04/2026 + 05/2026), metodologias documentadas | ec217eb | ✅ Executado 09/06 |

### Pendências para retomada

- [ ] **Inserir "Cantada do dia"** na matinal 09/06 (será feito após reiniciar)
- [ ] **Agendar RMAR call** com Rogério (17h hoje ou amanhã 10/06)
- [ ] **Validar Google Calendar**: Sessão comportamental Aline (amanhã 10/06) + Entrevista Rogério (amanhã 10/06)
- [ ] **Implementar automações** A6 (onboarding) e A8 (Typebot BP) até quinta 10/06

### Status Rogério (aguardando respostas críticas hoje)

| Pergunta | Prazo | Status |
|----------|-------|--------|
| VISA/alvará Salvador — status oficial? | 09/06 | 🔴 Aguardando resposta |
| Closer Bairro da Paz — Safira (candidata única) | Fase 2 | ✅ Aprovada na Fase 1 (11/06); agendar Fase 2 presencial. ~~Roni não é candidato — é RH~~ |
| Aprovação salário atendente CLT | ASAP | 🔴 Aguardando resposta |

### Dados extraídos do WhatsApp (Clube SSTCARD)

**Abril/2026 (Boom, Karine 17/04):**
- 376 titulares | 335 pagantes | 41 inadimplentes → adimplência 89,1%
- 24 novas adesões orgânicas | 4 cancelamentos (1,06% churn)
- 0 reativações Tenex (campanha não iniciada)
- Receita novos membros: ~R$1.608

**Maio/2026 (WhatsApp parciais + PDF Raquel):**
- 25 novas adesões + 10 reativações Tenex = 35 total
- Canal: 17 WhatsApp/Instagram + 8 presencial
- Receita: R$1.673 (+4% vs abril)
- Marketing Raquel: 370 pessoas abordadas, 50 interessados, 14,7k views Instagram
- 03/06 (junho): 3 cartões Prata adicionais da Karine (não entram no RMAR maio)

### Pendências críticas abertas (08/06)

| Pendência | Responsável | Prazo | Status |
|---|---|---|---|
| VISA/Alvará Salvador | Rogério | Vencido (30/05) | 🔴 Urgente |
| Closer Bairro da Paz — Safira Fase 2 | Rogério + Mayko | Agendar (presencial) | 🟢 Fase 1 aprovada 11/06 (Roni não é candidato — é RH) |
| Arquiteta — obra prazo 13/06 | Rogério/Arquiteta | 13/06 (5 dias) | 🔴 Crítico |
| Automação A6 onboarding | Mayko | 10/06 (quinta) | 🟡 Pronto, implantar |
| Automação A8 Typebot BP | Mayko | 10/06 (quinta) | 🟡 Pronto, implantar |
| RH Clínica — aprovação salário atendente | Rogério | 30/06 | 🟡 Aguardando |
| RMAR — call de apresentação | Rogério + Mayko | Esta semana | 🟡 Arquivo pronto |

---

## 🗓️ INAUGURAÇÃO OFICIAL — 01/07/2026

**Decisão tomada por Rogério em 22/05/2026.** Cenário com alvará sanitário (VISA Salvador) — espaço prevê consultas/procedimentos no local, não só ponto de vendas.

| Marco | Prazo | Status |
|---|---|---|
| Fechar closer (Safira — candidata única) | Fase 2 | 🟢 Fase 1 aprovada 11/06 |
| Contratos PJ equipe assinados | até 23/05 | 🔄 Em andamento |
| Dar entrada VISA + alvará prefeitura | até 30/05 | ⏳ Pendente |
| Arquiteta finaliza obra | até 13/06 | ⏳ Pendente |
| Operação piloto (clientes reais) | 15–27/06 | ⏳ Pendente |
| **Inauguração oficial** | **01/07/2026** | 🎯 Meta |

#em-progresso

Parte de [[Consultoria Comercial]] | Ver: [[contexto_projeto]] | [[plano_lancamento]] | [[viabilidade_card]] | [[plano-acao-semana-14-18-abr-2026]]

---

## Quem é o Cliente

| Campo | Detalhe |
|---|---|
| Cliente | Rogério Ferreira — SST Clínica/Card |
| Consultor | Mayko Rodrigues |
| Projeto | Abertura da 2ª Filial em Salvador |
| Localização | Bairro da Paz (~21.000 hab., baixa renda, alta dependência do SUS) |
| Produto | SST Card (cartão de benefícios) + consultas/exames populares |
| Status | 🟡 Planejamento — documentação base concluída em Abril/2026 |

---

## 🆕 Frente RH — Contratação Closer Bairro da Paz (21/05/2026)

**Contexto:** Rogério passou indicação do candidato **Roni** via WhatsApp (21/05 17:09). Entrevista marcada **sexta-feira 22/05/2026 às 14h**. Decidido pelo modelo PJ (pró-labore R$2.000 + comissão R$20/R$40/R$80) com perfil hunter experiente em cartão popular.

**Estrutura criada em `rh-closer/`:**

| Arquivo | Conteúdo | Status |
|---|---|---|
| `rh-closer/CLAUDE.md` | Guia da pasta + perfil ideal + skills relevantes | ✅ Pronto |
| `rh-closer/formulario-abertura-vaga-closer-sst.md` | Dados oficiais da vaga + comissão proposta | 🟡 Aguarda aprovação Rogério |
| `rh-closer/divulgacao-vaga-closer.html` | Página HTML LinkedIn/Instagram/WhatsApp (paleta azul SST) | ✅ Pronto |
| `rh-closer/kit-entrevista-closer-sst.md` | Roteiro 75min + simulação Dona Maria + ficha de scoring | ✅ Pronto |
| `rh-closer/formulario-qualificacao-closer.html` | Form online multi-step com eliminatórios (exp ≥2 anos, PJ, presencial Salvador) | ✅ Pronto |
| `rh-closer/briefing-entrevista-roni-22-05-2026.md` | Briefing específico Roni + cenários go/no-go + templates Rogério | ✅ Pronto |

**Próximos passos (até 22/05 manhã):**
- [ ] Confirmar com Rogério aprovação da comissão proposta (R$2.000 + R$20/R$40/R$80 + bônus R$500)
- [ ] Confirmar local da entrevista (matriz Simões Filho / Bairro da Paz / vídeo)
- [ ] Pegar sobrenome + WhatsApp do Roni com Rogério
- [ ] Imprimir Kit Entrevista + Ficha de Scoring + material SST Card
- [ ] Confirmar se Rogério participa do Bloco 5 (fit cultural)

**Cenário pós-entrevista (22/05):**
- Score ≥75 → proposta na semana + dinâmica de campo 23/05 ou 25/05
- Score 60–74 → 2ª rodada com validação de referências antes
- Score <60 → NO-GO educado + publicar `divulgacao-vaga-closer.html` para abrir pipeline maior

---

## O que já foi feito nesta sessão

### Documentos criados — Reunião 29/04/2026 (Aline — Laboratório)

| Arquivo | Conteúdo | Status |
|---|---|---|
| `aline-laboratorio/briefing-madip-aline-29-04-2026.md` | Briefing executivo: papel Aline no MADIP, scripts 3-fases, cadência 7-toques, dashboard diário, comissão | 🟢 Pronto para reunião |
| `aline-laboratorio/cartao-scripts-consulta-aline.md` | Cartão prático com scripts prontos para uso no consultório (imprimir) | 🟢 Pronto para uso |

### Documentos criados — Reunião 27/04/2026 (Karine — Inadimplência ATIVA)

| Arquivo | Conteúdo | Status |
|---|---|---|
| `sessao-agentamento-karine-27-04-2026.md` | Ata reunião: campanha perdão dívida, entregáveis, entregáveis bloqueadores | 🟡 Entregáveis em andamento |
| `script-perdao-divida-tenex.md` | **PRÓXIMO** — Script agressivo 50% desconto para 761 Tenex | ⏳ Bloqueado por aprovação Rogério |

### Documentos criados (localmente em `/estrategia_comercial/`)

| Arquivo | Conteúdo | Status |
|---|---|---|
| `contexto_projeto.md` | Visão geral, perfil de público, 3 passos estratégicos, riscos | ✅ Concluído |
| `estrategia_comercial/viabilidade_card.md` | Tabela avulso vs SST Card, break-even (430 membros), UVPs para carro de som | ✅ Concluído |
| `estrategia_comercial/plano_lancamento.md` | Cronograma semana a semana — 90 dias, orçamento Mês 1 (R$4.150), 5 regras de ouro | ✅ Concluído |

### Publicado no Notion

Estrutura criada dentro de **"Processos Comerciais B2C Clube SST CARD/ CARD"**:

| Página Notion | URL |
|---|---|
| 🏥 Hub — SST Clínica 2ª Filial Bairro da Paz | https://www.notion.so/33ead3c0037381b093b3d0c0a41d3c4b |
| 📊 Contexto & Diagnóstico do Projeto | https://www.notion.so/33ead3c003738107a9edf5716d75f382 |
| 💰 Viabilidade Financeira — SST Card | https://www.notion.so/33ead3c003738103943ddbc65cbe78d9 |
| 🚀 Plano de Lançamento — 90 Dias | https://www.notion.so/33ead3c00373814f84fbc9a3c35d6cab |

---

## Decisões Estratégicas Já Tomadas

> ⚠️ Atualizado em 03/06/2026 — decisão de produto via áudios WhatsApp 02/06 (12:03 e 12:43). Ver Notion: [[Estratégia SST Card - Rogério 03/06]]

1. **Precificação ATUALIZADA (02/06/2026) — DECISÃO ROGÉRIO:**
   - **Individual (entrada):** R$ 39,90/mês — titular com TODOS os benefícios + 3 dependentes com acesso à saúde
   - **Família Premium:** R$ 64,90/mês — 4 pessoas com TODOS os benefícios *(era R$79,90)*
   - **Taxa de Adesão:** R$ 35,00 por contrato *(era R$40)*
   - ❌ **Eliminado:** plano R$79,90 e cobrança por dependente avulso (R$7,90 cada)
   - **Lógica comercial:** R$39,90 = entrada fácil → cross-sell natural para R$64,90 (+R$25)
   - **Famílias grandes (7+):** dois contratos — núcleo (4 pessoas) + avós/netos
   - **Pitch âncora:** *"R$25 a mais e todo mundo tem todos os benefícios"*
   - **Insight-chave (Rogério, dez/2025):** muitos dependentes = ninguém usa. Foco em 4 que realmente vão cuidar.
   - Benefícios incluídos: telemedicina + auxílio funeral + assistência veterinária + medicina com custos reduzidos

2. **Comissão Closer CONFIRMADA (03/06/2026):**
   - Por adesão: **R$ 20** (mantido — agora representa 57% da taxa de R$35)
   - Por reativação Tenex: R$ 5
   - Escada progressiva: 80 vendas = R$15–16/adesão | 120 vendas = R$2.000 em comissão
   - Meta inicial: 100 vendas/mês = R$4.000 total (R$2.000 fixo + R$2.000 comissão)
   - Sem teto de comissão para atrair hunter

3. **Equipe PJ — transição a partir de junho:**
   - Lucas, Karine e Raquel: R$ 1.500 fixo + comissões
   - SST banca primeiros 3 meses de INSS (R$ 25/mês)
   - Apresentar como oportunidade de crescimento — reunião conjunta Mayko + Rogério

4. **Break-even:** ~~430 membros~~ → **364 contratos** (~mês 3,5) — ver `estrategia_comercial/viabilidade_card.md` seção 2.3

5. **Capital de giro necessário:** ~~R$ 35.000–45.000~~ → **R$ 28.000–35.000** (primeiros 3 meses)

6. **Orçamento de marketing Mês 1:** R$ 4.150

7. **UVPs aprovadas (3 frases para carro de som/faixas):**
   - UVP 1: Dor do SUS (fila)
   - UVP 2: R$ 1,25/dia (apelo financeiro) *(atualizado com novo preço)*
   - UVP 3: Pertencimento local

8. **Meta mês 1 de vendas:** 1.000 adesões = R$ 40.000 em taxas de adesão

---

## 🗒️ Ações em Aberto — Reunião 22/05/2026

| Ação | Responsável | Prazo |
|---|---|---|
| Enviar documentos + apresentação PDF para Rogério | Mayko | Hoje |
| Criar documento de transição PJ para Lucas, Karine, Raquel | Mayko | 23/05 |
| Enviar documento de avaliação de competências da equipe | Mayko | 23/05 |
| Agendar reunião conjunta Mayko + Rogério + equipe (transição PJ) | Mayko + Rogério | Até 28/05 |
| Publicar vaga closer + formulário (candidaturas → email Raquel) | Mayko | 23/05 |
| Definir escada de comissões progressiva (closing) | Mayko | 23/05 |
| Rogério acelerar documentação da sala com arquiteta | Rogério | Até 30/05 |
| Dar entrada VISA Salvador + alvará prefeitura | Rogério | Até 30/05 |
| Preparar material de vendas (carteirinhas provisórias + scripts) | Mayko | Até 06/06 |
| Estruturar demonstração de telemedicina para vendas | Mayko | Até 06/06 |
| Orientar novos PJs sobre abertura de MEI com contador | Rogério | Até 06/06 |
| Estruturar sistema de acompanhamento de adesões e comissões | Mayko | Até 13/06 |

---

## Próximas Ações (29/04 em diante)

### Frente Aline (Laboratório) — IMEDIATO

- [ ] Reunião Aline + Mayko (29/04 — hoje) — validar scripts, dashboard, comissão
- [ ] Treinar Ilana no acolhimento com Script 1 (29/04)
- [ ] Configurar n8n automação D+1/D+3/D+7 (29/04 — TI)
- [ ] Iniciar piloto 1 dia medindo dashboard (30/04)
- [ ] Reunião de ajustes Aline + Mayko (01/05)
- [ ] **LANÇAMENTO OFICIAL máquina conversão** (01/05)

### Frente Karine (Inadimplência) — BLOQUEADO

- [ ] Aguardando: Script perdão dívida Tenex (bloqueado por aprovação Rogério)
- [ ] Aguardando: Listagem Tenex completa de Lucas
- [ ] Aguardando: Aprovação Rogério campanha perdão dívida

## Matinal MADIP — 05/05/2026

**Roteiros & Templates Criados (TURNO 08h00–15h00):**

| Documento | Conteúdo | Para |
|-----------|----------|------|
| `matinal-madip-05-05-2026.md` | Reunião 08h-08h15: resultados ontem + bloqueadores + foco hoje | Equipe (8h00) |
| `templates-relatorio-08h-15h.md` | ⭐ **Templates vazios:** Parcial 12h + Final 15h (turno 08h-15h) | Lucas, Karine, Raquel |
| `guia-rapido-08h-15h.md` | Cheat sheet resumido para imprimir e colar na parede | Equipe |
| `exemplo-relatorio-08h-15h-preenchido.md` | Exemplos preenchidos (ficção) mostrando como fica na prática | Referência |

| Pessoa | Resultado Ontem (04/05) | Foco Hoje | Próx. Relatório |
|--------|-------------------------|-----------|--------|
| **Raquel** | 15 respondidos, 3 qualificados | Resgatar 9 sem retorno | **12h** (parcial) + **15h** (final) |
| **Karine** | 24 encaminhados, 16 cobranças | Converter Michele/Lilian/Malcon | **12h** (parcial) + **15h** (final) |
| **Lucas** | *Não reportado* | Ativar + onboarding + checagem Boom | **12h** (parcial) + **15h** (final) |

## Sessão Raquel — 06/05/2026 (Social Seller + Meta Business Suite)

**Objetivo:** Raquel sai com calendário editorial (5 posts seg–sex) + agendados no Meta Business Suite

**Documentos criados para sessão AO VIVO:**

| Arquivo | Conteúdo | Status |
|---------|----------|--------|
| `processo-comercial-7dias/03-agentamento/SESSAO-RAQUEL-06-05-RESUMO-EXEC.md` | Resumo executivo para Mayko durante sessão | 🟢 Pronto |
| `processo-comercial-7dias/03-agentamento/checklist-sessao-raquel-06-05-2026.md` | Checklist passo-a-passo (60 min) | 🟢 Pronto |
| `processo-comercial-7dias/03-agentamento/prompt-2-raquel-calendario-editorial-ia.md` | Guia completo: Prompt 2 + setup Meta Suite | 🟢 Pronto |
| `processo-comercial-7dias/03-agentamento/prompt-executavel-calendario-semanal-raquel.md` | Prompt pronto para copiar-colar na IA | 🟢 Pronto |
| `processo-comercial-7dias/03-agentamento/guia-rapido-meta-business-suite-raquel.md` | Setup rápido (5 min) | 🟢 Pronto |
| `processo-comercial-7dias/03-agentamento/cartao-social-seller-raquel-imprimir.md` | Cartão de referência para imprimir/colar | 🟢 Pronto |

**Resultado esperado:**
- [ ] Raquel entende conceito social seller (cada post = 1 lead)
- [ ] 5 posts agendados no Meta (seg–sex, horários 08h30/12h/17h/08h30/20h)
- [ ] Tabela de rastreamento criada (Notion ou papel)
- [ ] Meta semanal: ≥10 leads (2/dia) para Karine converter

**Próxima reunião:** 07/05/2026 — Revisar resultados (quantos leads cada post gerou?)

---

## Histórico de Resultados Diários

**Pasta criada:** `historico-resultados-diarios/`

| Arquivo | Conteúdo | Para |
|---------|----------|------|
| `README.md` | Guia de como usar a pasta e estrutura | Referência |
| `ÍNDICE.md` | Mapa mensal (tabela de todos os dias + metas semanais) | Rastreamento rápido |
| `TEMPLATE-resultado-diario.md` | Template vazio para copiar e preencher | Uso diário |
| `resultado-05052026.md` | Exemplo preenchido (primeiro dia) | Referência |
| `resultado-DDMMYYYY.md` | Arquivos diários (um por dia, criados a partir de 06/05) | Histórico |

**Fluxo diário:**
1. 15h30 — Compilar dados de Raquel, Karine, Lucas
2. Copiar `TEMPLATE-resultado-diario.md`
3. Preencher e salvar como `resultado-DDMMYYYY.md`
4. Atualizar `ÍNDICE.md`

---

## Sessão 06/05/2026 — Plano de Implementação + Pitch (Mayko + Rogério)

### Documentos criados

| Arquivo | Conteúdo | Status |
|---|---|---|
| `estrategia_comercial/plano-implementacao-2a-filial.md` | **PLANO MESTRE** — Síntese RT 48 + transcrição reunião + todos os dados. Modelo societário progressivo, equity, QIA, cronograma 30 dias, captação de investidores | 🟢 Pronto |
| `processo-comercial-7dias/04-dia-sst-saude/apresentacao-pitch-bairro-da-paz.html` | **APRESENTAÇÃO PITCH** — 13 slides interativos (HTML). Capa, oportunidade, produto, modelo, equipe, financiamento, custos, projeções, cronograma, guerrilha, investidores, KPI/QIA, CTA com checklist | 🟢 Pronto para apresentar |

### Como usar a apresentação
- Abrir o `.html` no navegador (Chrome/Edge) → sem internet necessária
- Navegar: setas do teclado ou botões na tela
- Último slide: checklist interativo clicável
- Compartilhar o arquivo HTML ou imprimir como PDF

### Decisões registradas desta sessão
- **Modelo confirmado:** Adaptar RT 48 (Cartão de TODOS) ao SST Card — transformar trabalhadores em empresários
- **Investimento total:** R$95–100k (Investidor 1: R$50k operacional confirmado; Investidor 2: Gilberto Nálpe — reforma)
- **Prioridade #1 desta semana:** Contratar Coordenador de Vendas ANTES de assinar o aluguel
- **Equity pleno:** 40% Rogério ao atingir 4.800 QIAs em 24 meses
- **Expansão futura:** Santa Amaro + cidades do interior baiano após consolidação

---

## Execução Bairro da Paz — MODO ATIVO (13/05/2026)

> Rogério enviou áudio às 07h30 confirmando: contrato sexta 16/05, arquiteta visita o ponto sexta, layout definido (clínica + telemedicina térreo + SST Card superior). **Saiu do planejamento, entrou na execução.**

| Arquivo | Conteúdo | Status |
|---|---|---|
| `processo-comercial-7dias/05-bairro-da-paz/briefing-arquiteta-16-05-2026.md` | Briefing completo para arquiteta: layout 3 ambientes, requisitos técnicos, perguntas para visita, fases de reforma | 🟢 Pronto — enviar a Rogério hoje |
| `processo-comercial-7dias/05-bairro-da-paz/checklist-execucao-imediata-13-05-2026.md` | 36 ações em 4 semanas: contratação coord. vendas, infraestrutura, pré-lançamento, inauguração | 🟢 Pronto |

**Decisões do áudio (13/05):**
- Contrato advisory assinado **sexta 16/05**
- Arquiteta visita o ponto **sexta 16/05**
- Layout: recepção + telemedicina (térreo) + SST Card (superior)
- Modelo operação dia 1: atender e vender cartões simultaneamente
- **Risco crítico mantido:** contratar Coordenador de Vendas ANTES de assinar aluguel

---

## RMA MAIO/2026 — CRIADO ✅

**Data de Criação:** 12/05/2026

| Documento | Conteúdo | Status |
|-----------|----------|--------|
| `RMA-MAIO-2026.html` | Apresentação interativa (17 slides) — Navegar com setas | 🟢 Pronto |
| `RMA-MAIO-2026.pptx` | PowerPoint (9 slides) — Compatibilidade | 🟢 Pronto |
| `RMA-MAIO-2026.md` | Relatório completo em Markdown | 🟢 Pronto |
| `RMA-MAIO-2026-RESUMO-EXECUTIVO.md` | 1 página — decisão rápida | 🟢 Pronto |

**Como Usar:**
1. **Apresentação ao vivo:** Abrir `RMA-MAIO-2026.html` no navegador → navegar com setas/botões
2. **Impressão/Compartilhamento:** Usar `RMA-MAIO-2026.pptx`
3. **Referência detalhada:** Ler `RMA-MAIO-2026.md`
4. **Decisão rápida:** Ler `RMA-MAIO-2026-RESUMO-EXECUTIVO.md` + assinatura digital

**Dados Incluídos:**
- Semana 1: 05/05/2026 (dia de lançamento MADIP)
- 3 cartões vendidos | 4 ativações | R$ 195 receita | 21% conversão
- 5 bloqueadores críticos + plano ação
- GO/NO-GO gate decision (trigger: 23/05)

---

## Ações Executadas — 07/05/2026 (Campo + Estrutura)

### 🎙️ Áudios do Rogério Transcritos

| Áudio | Conteúdo | Insights |
|---|---|---|
| **Áudio 1** (11s) | Francine aluguel + contador | Financeiro/operacional aguardando (não crítico) |
| **Áudio 2** (43s) | Estrutura 3 planos + decisão Monsílio | **DECISÃO CONFIRMADA:** 3 planos + rollout progressivo |
| **Áudio 3** (41s) | Encontros campo Bairro da Paz | **PROGRESSO REAL:** Médicos identificados, dona restaurante como ponte |

### ✅ Documentos Criados — 07/05

| Documento | Conteúdo | Status | Path |
|---|---|---|---|
| **`briefing-populacao-bairro-da-paz.md`** | 20.509 hab, 57,5% renda 0–1 SM, viabilidade de mercado | 🟢 Para Rogério | projeto SST |
| **`estrutura-3-planos-sst-card.md`** | 3 planos (Individual R$34,90 | Família 4–5 R$65 | Família 10 R$109,90) + modelo financeiro + rollout | 🟢 Para validação Karine | projeto SST |

### 🚀 Progresso de Campo (Rogério — 07/05)

**Visita UPA Bairro da Paz:**
- Mapeamento inicial feito
- Ninguém disponível na UPA

**Encontro Providencial — Restaurante (OURO):**
- ✅ **Doutora Yara** (médica) — contato iniciado
- ✅ **Consuelo** (profissional) — contato
- ✅ **Dentista + assistente** — contatos em confirmação
- ✅ **Dona do Restaurante** — CHAVE (conectora com médicos locais)

**Inteligência Geográfica:**
- Avenida paralela grande perto da clínica
- Vários consultórios/prédios médicos
- Médicos residentes podem ser recrutados

**Timeline:** Rogério quer operação **em MAIO** (não junho)

### 🎯 Decisões Confirmadas (Rogério — 07/05)

| Decisão | Contexto |
|---|---|
| **3 planos estruturados** | Individual (R$34,90) + Família 4–5 (R$65) + Família 10 (R$109,90) |
| **Não mexer em Monsílio agora** | "Se está funcionando lá, deixa como está. Depois que a gente dá certo aqui, a gente volta." |
| **Rollout:** Bairro da Paz → Sucesso → Monsílio otimizado → Interior/Santa Amara | Sequência de validação e expansão |
| **Investor Gilberto entra DEPOIS** | No segundo momento, após case de sucesso consolidado (outubro/2026) |

---

## Matinal MADIP — 15/05/2026 ✅ CRIADA

**D+1 Campanha Perdão Dívida | Sexta-feira | 08h00–08h15 | Status: PRONTO PARA EXECUTAR**

| Documento | Conteúdo | Criado | Status |
|-----------|----------|--------|--------|
| `processo-comercial-7dias/01-matinais/15-05-2026/roteiro-matinal-15-05-2026.md` | Roteiro 15min: abertura + resultado ontem + foco cada pessoa + bloqueador + GO/NO-GO | 15/05 08h33 | ✅ Pronto |
| `processo-comercial-7dias/01-matinais/15-05-2026/script-perdao-divida-karine-15-05.md` | Script Karine: 90s falado + 8 objeções + WhatsApp + fechamento urgência | 15/05 08h34 | ✅ Pronto |
| `processo-comercial-7dias/01-matinais/15-05-2026/cartao-bolso-equipe-15-05.md` | Cartão A5 (imprimir): frase âncora + metas dia + pipeline visual | 15/05 08h34 | ✅ Pronto |
| `processo-comercial-7dias/01-matinais/15-05-2026/template-relatorio-12h-15h-15-05.md` | Templates vazios: parcial 12h (4 linhas) + final 15h (6 linhas + consolidado) | 15/05 08h34 | ✅ Pronto |
| `processo-comercial-7dias/01-matinais/15-05-2026/checklist-arquiteta-16-05.md` | Checklist Rogério para visita arquiteta 16/05 14h: documentos, equipamento, cronograma | 15/05 08h34 | ✅ Pronto |

**Metas do dia (15/05):**
- **Karine:** 15 contatos + 3 fechamentos Prata R$39,90 (≥20% conversão)
- **Lucas:** 50 contatos ativação + finalizar auditoria 27 cancelados + verificar Boom
- **Raquel:** 5 criativos Meta Suite + 100 conversas WhatsApp + 10 leads para Karine em 5min
- **Rogério:** Confirmar 100% checklist para visita arquiteta

**Próxima execução:** 08h00 (Mayko: imprimir cartão A5, ter scripts abertos)**

**Gate decision (23/05):**
- ≥20 adesões + ≥20 reativações → contrato advisory + Bairro da Paz GO
- <20 adesões → extensão 15 dias + ajustes

---

## Execução 15/05/2026 — MATINAL D+1 CONCLUÍDA ✅

**Hora:** 09h00–09h30  
**Participantes:** Rogério, Karine, Lucas, Raquel  
**Status:** Matinal executada. Dados capturados. Dashboard criado e enviado ao grupo.

### Resultados Consolidados

| Pessoa | Métrica | Meta | Realizado | % | Status |
|--------|---------|------|-----------|---|--------|
| **Lucas** | Ativações | 50 | 5 | 10% | 🔴 CRÍTICO |
| **Lucas** | Retenção | — | 10 | — | ✅ |
| **Lucas** | Msgs | — | 23 | — | ✅ |
| **Karine** | Fechamentos | 3 | 1 | 33% | 🟡 ABAIXO |
| **Karine** | Pipeline | — | 2 | — | ⏳ |
| **Raquel** | Leads qualificados | 10 | 25 | 250% | 🟢 EXCELENTE |
| **Raquel** | Fechados (Instagram) | — | 1 | — | 🟢 |

**Síntese:** 3 cartões fechados | 25 leads qualificados | 23 msgs | 58 contatos totais

**Projeção 30/05 (se mantiver ritmo 15 dias):**
- Lucas: 75 ativações (vs 750 meta = 🔴 CRÍTICO)
- Karine: 15 fechamentos (vs 45 = 🔴 CRÍTICO)
- Raquel: 375 leads (vs 150 = 🟢 EXCELENTE)
- **Total esperado:** 45 cartões (CONTRATO GO, Bairro da Paz CONFIRMADO)

### Documentos Criados Hoje

| Arquivo | Conteúdo | Status |
|---------|----------|--------|
| `historico-resultados-diarios/resultado-15-05-2026.md` | Relatório completo com dados, análise, blocadores, projeção | ✅ Criado |
| `dashboard-resultado-diario-sst.html` | Dashboard interativo (tema escuro, responsive) + métricas + projeção | ✅ Enviado ao grupo |
| `processo-comercial-7dias/02-cadencias/automacao-dashboard-diario-n8n.md` | Arquitetura n8n: trigger cron → parsing WhatsApp → cálculo → geração HTML → envio | ✅ Planejado |

### Blocadores Identificados (CRÍTICOS)

| Bloqueador | Impacto | Ação | Prazo |
|-----------|---------|------|-------|
| **Lucas — Acesso Tenex (2 contas)** | Não consegue 50 contatos/dia | Confirmar acesso única conta com Rogério | Segunda 16/05 |
| **Karine — Capacidade alavancagem** | 25 leads de Raquel parados | Implementar handoff 5min (já existe) | Segunda 19/05 |
| **Rogério — Contador (legal)** | Assinatura contrato Bairro da Paz bloqueada | Validar com contador efeitos jurídicos contrato | Até 16/05 |

### Task n8n Criada

**Task #1:** Criar automação n8n para dashboard diário SST Card  
**Objetivo:** Gerar + enviar dashboard resultado diário (15h45) sem intervenção manual  
**Frequência:** Seg–sex 15h45 BRT  
**Timeline:**
- Sexta 15/05: Validação manual (✅ CONCLUÍDO)
- Segunda 19/05: Criar workflow n8n (estrutura básica)
- Terça 20/05: Testar com dados reais
- Quarta 21/05: Agendar Cron + validar automação
- Quinta 22/05+: Rodar automaticamente (monitorar logs)

---

## Matinal SST — 18/05/2026 ✅ CRIADA

**D+3 Campanha Perdão Dívida | Segunda-feira | 08h00–08h15 | Status: PRONTO PARA EXECUTAR**

| Documento | Conteúdo | Criado | Status |
|-----------|----------|--------|--------|
| `processo-comercial-7dias/01-matinais/18-05-2026/roteiro-matinal-18-05-2026.md` | Roteiro 15min: contexto + resultado sexta + bloqueador Lucas + alavancagem Karine | 18/05 | ✅ Pronto |
| `processo-comercial-7dias/01-matinais/18-05-2026/script-alavancagem-karine-18-05.md` | Script Karine: recebe 10 leads Raquel → converte ≥3 em 5 minutos | 18/05 | ✅ Pronto |
| `processo-comercial-7dias/01-matinais/18-05-2026/template-relatorio-12h-15h-18-05.md` | Templates vazios: parcial 12h (4 linhas) + final 15h (6 linhas + consolidado) | 18/05 | ✅ Pronto |
| `processo-comercial-7dias/01-matinais/18-05-2026/cartao-bolso-equipe-18-05.md` | Cartão A5 (imprimir): frase âncora + metas dia + pipeline visual | 18/05 | ✅ Pronto |

**Metas do dia (18/05):**
- **Rogério:** Desbloquear acesso Lucas (até 08h30) + validar alavancagem a cada 2h
- **Karine:** 10 leads alavancagem (Raquel) → ≥3 conversões (5 min) + 15 contatos perdão dívida
- **Lucas:** ≥15 ativações até 12h (vs 5 na sexta — RECUPERAR) + finalizar auditoria 27 cancelados
- **Raquel:** Consolidar 25 leads sexta → passar 10 para Karine + agendar 5 criativos Meta + 100 conversas WhatsApp

**Bloqueador crítico:** Acesso Lucas ao Tenex — DEVE ser resolvido até 08h30 ou usar Google Sheets fallback

**Gate decision:** Se alavancagem (≥3/10) + Lucas (≥15 ativações) funcionarem, terça (19/05) entra em Bairro da Paz com momentum

---

## Próximos Documentos a Criar (Prioridade)

**✅ CONCLUÍDO — 19/05/2026:**
- [x] `processo-comercial-7dias/playbook-sst-assistente-19-05.html` — ✅ v3.0 Assistente Operacional (ações rápidas + checklists personalizados + navegação)
- [x] `processo-comercial-7dias/01-matinais/19-05-2026/resumo-executivo-matinal-19-05.md` — ✅ Ata matinal 19/05 (contexto + resultado 18/05 + novo foco + ações imediatas)
- [x] Playbook deployed em Vercel: https://playbook.ssfcard.ia.br ✅
- [x] `processo-comercial-7dias/playbook-vivo-20-05-2026.html` — ✅ Playbook Vivo com Abas (18/05–20/05) para histórico crescente de Planejado | Resultado | Projeção

**CRÍTICO — Hoje (19/05) ou amanhã (20/05):**
- [ ] `processo-comercial-7dias/02-cadencias/automacao-dashboard-diario-n8n.md` — Workflow n8n: parsing WhatsApp → cálculo → HTML → envio (iniciar segunda-feira próxima se matinal 19/05 confirmar padrão)
- [ ] **n8n Automação Perdão Dívida** — Disparar campanhas WhatsApp em lote (50+ contatos/dia) a partir de 19/05
- [ ] **Validação Tenex Access (Lucas)** — Confirmar se bloqueador persistiu ou foi resolvido

## Matinal SST — 20/05/2026 ✅ CRIADA

**D+2 Campanha Perdão Dívida | Quarta-feira | 08h00–08h15 | Gate Decision em 3 dias (23/05)**

| Documento | Conteúdo | Status |
|-----------|----------|--------|
| `processo-comercial-7dias/01-matinais/20-05-2026/roteiro-matinal-20-05-2026.md` | Roteiro 15min: resultado 19/05 (A PREENCHER) + foco Perdão Dívida D+2 + conta regressiva gate | ✅ Pronto |
| `processo-comercial-7dias/01-matinais/20-05-2026/cartao-bolso-equipe-20-05.md` | Cartão A5: metas + script Karine + horários-chave + gate countdown | ✅ Pronto |

**Metas do dia (20/05):**
- **Karine:** ≥8 reativações Tenex (Perdão de Dívida)
- **Lucas:** ≥20 ativações + Tenex ou Google Sheets aberto até 08h30
- **Raquel:** Se retornou — 50 conversas + 10 leads para Karine até 12h
- **Rogério:** n8n rodando até 10h + check-ins às 10h e 14h

---

**IMPORTANTE — Até 22/05:**
- [ ] `estrategia_comercial/script_vendas_whatsapp.md` — Scripts segmentados por plano (Individual/Família 4–5/Família 10)
- [ ] `prompts-sdr-por-plano.md` — 3 versões de abordagem para Raquel/SDR
- [ ] **Resumo matinal 20/05** — Atualizar playbook com resultado real 19/05 + novo foco

**NORMAL:**
- [ ] `aline-laboratorio/proposta-advisory-frente-laboratorio.md` — Argumento de fechamento para Rogério
- [ ] `analise_mercado/diagnostico_campo-bairro-paz.md` — Mapa de médicos, concorrentes, oportunidades
- [ ] `estrategia_comercial/programa_embaixadores.md` — Regulamento completo + comissões por plano

---

## Contexto do Ecossistema SST Card (projeto Simões Filho)

O cliente já tem outra filial operando em **Simões Filho/BA**, com:
- Stack: WhatsApp Business (Evolution API), n8n, Chatwoot, Notion, Blingo
- Equipe: Rogério (gestor), Karine (vendas), Lucas (CS), Juan (cobrança), Gilson (prospecção)
- Painel de controle: https://www.notion.so/337ad3c0037381b39091fb40594bbedc

Ao sugerir ferramentas e processos para o Bairro da Paz, reutilizar a stack existente sempre que possível.

---

## Playbook Web v3.0 — Assistente Operacional ✅ DEPLOYED

**Data de Criação:** 19/05/2026 — 09h00  
**Status:** 🟢 Live em produção  
**URL Pública:** https://playbook.ssfcard.ia.br/processo-comercial-7dias/playbook-sst-assistente-19-05.html

### O que é

Documento operacional web (HTML/CSS/JavaScript) que funciona como **assistente de execução diária** para a equipe. Substitui matinal em PDF e centraliza:
- Ações imediatas com checkboxes persistentes
- Resultados reais vs planejado (comparação D-1)
- Novo foco operacional (Campanha Perdão de Dívida 761 Tenex)
- Checklists personalizados por pessoa (Karine, Lucas, Raquel, Rogério)
- Links diretos às Centrais de Comando (Notion)
- Navegação fluida com table of contents

### Funcionalidades

| Feature | Detalhe |
|---------|---------|
| **⚡ Ações Rápidas** | Checkboxes top-level (crítica=vermelho, importante=laranja, info=azul) salvos em localStorage |
| **🧭 Navegação** | Sidebar toggle com jump links para todas as seções + colapsa em mobile |
| **👥 Checklists Personalizados** | Cada pessoa (Karine, Lucas, Raquel, Rogério) vê apenas suas tarefas do dia |
| **📊 Resultado 18/05** | Tabela: Planejado vs Executado com status badges (✅/❌) |
| **📢 Novo Foco** | Seção "Perdão de Dívida" com 761 Tenex, meta 20%, script modelo, timing |
| **🔗 Notion Integration** | Banner destacado + footer com 4 Centrais de Comando funcionais |
| **📄 Print Support** | Ctrl+P → salvar como PDF (otimizado para WhatsApp/impressão) |
| **📱 Responsive** | Mobile-first: sidebar oculta em <768px, layout adaptado |

### Como Usar

1. **Abrir no navegador:** Copiar URL acima ou clicar no link no Whatsapp
2. **Conferir Ações Rápidas:** Scroll para o topo, validar itens críticos
3. **Personalizar:** Cada pessoa clica em "Meu Checklist do Dia" com seu nome
4. **Marcar Progresso:** Clicar em checkboxes (salvam automaticamente)
5. **Pular para seção:** Usar sidebar (clicável mesmo em mobile)
6. **Salvar PDF:** Ctrl+P no navegador → "Salvar como PDF" → compartilhar

### Design & Tecnologia

- **Fonts:** IBM Plex Mono (body) + Syne (headings) — operacional, distinto
- **Tema:** Dark mode com alto contraste
- **Paleta:** Verde primário #2ECC71, azul accent #1987c3, vermelho crítico #FF4757, laranja warning #FFA502
- **Estado:** localStorage para persistência (checkboxes sobrevivem reload)
- **Responsividade:** Mobile-first, <768px sidebar desaparece
- **Tamanho:** ~40KB (carrega <1s via CDN Vercel)

### Documentos Relacionados

| Arquivo | Conteúdo |
|---------|----------|
| `processo-comercial-7dias/playbook-sst-assistente-19-05.html` | **ARQUIVO PRINCIPAL** — abrir no navegador |
| `processo-comercial-7dias/01-matinais/19-05-2026/resumo-executivo-matinal-19-05.md` | Markdown completo com ata matinal, decisões, próximas datas |

### Próxima Atualização

O playbook se atualiza via **git push → Vercel auto-deploy** (~30s):
1. Editar dados diários em `playbook-sst-assistente-19-05.html`
2. `git add` + `git commit` + `git push origin master`
3. Vercel redeploya automaticamente
4. URL fica sempre com versão mais recente

---

## Playbook Vivo com Abas por Data ✅ DEPLOYED

**Data de Criação:** 19/05/2026 — 10h00  
**Status:** 🟢 Live em produção  
**URL Pública:** https://playbook.ssfcard.ia.br/processo-comercial-7dias/playbook-vivo-20-05-2026.html

### O que é

**Documento HTML vivo que cresce com o projeto** — mantém histórico de todos os dias com sistema de abas, permitindo que a equipe veja:
- **Planejado** (o que foi definido para o dia)
- **Resultado Real** (números/execução ao final do dia)
- **Projeção Próximos Dias** (tarefas-chave que se repetem)

Cada dia fica preservado como aba navegável. Quando novo dia chega, adiciona-se uma nova aba (18/05, 19/05, 20/05, 21/05, etc.) sem deletar o anterior.

### Estrutura de Abas (Padrão)

**Cada aba contém 3 seções:**

| Seção | Conteúdo | Atualização |
|-------|----------|------------|
| **📋 PLANEJADO** | Metas do dia + tarefas por pessoa + ações críticas | Estático (criado no início do dia) |
| **📊 RESULTADO REAL** | Tabela: Meta vs Realizado + status (✅/❌) + insights | **Preenchido às 15h** do dia |
| **🎯 PROJEÇÃO PRÓXIMOS DIAS** | Checklist de tarefas-chave para dias seguintes | Automático (herda do dia anterior) |

### Abas Criadas (v1.0)

| Aba | Status | Conteúdo |
|-----|--------|----------|
| **18/05 (seg)** | ✅ Completo | Planejado + Resultado real preenchido |
| **19/05 (ter)** | 🔄 Em Progresso | Planejado + Resultado será preenchido às 15h |
| **20/05 (qua)** | ⏳ Planejado | Planejado + Resultado a preencher |

### Funcionalidades

| Feature | Como funciona |
|---------|---|
| **Abas Navegáveis** | Clique em 18/05, 19/05, 20/05 para trocar de dia |
| **Checkboxes Persistentes** | Marca ✓ → localStorage → fecha aba → reabre → ✓ continua |
| **Links Sempre Visíveis** | Header sticky com 5 links Notion (Resumo, Lucas, Karine, Raquel, Rogério) |
| **Status Visual** | Badge mostra status do dia (✅ Concluído, 🔄 Em Progresso, ⏳ Planejado) |
| **Print para PDF** | Ctrl+P → salvar como PDF com todas as abas |
| **Responsive** | Funciona em mobile, desktop, tablet |

### Workflow Diário de Atualização

**Ao final de cada dia (15h):**

1. **Editar arquivo HTML** no VS Code:
   ```javascript
   resultado: `
       <table>
           <tr>
               <td><strong>Karine</strong></td>
               <td>10 alavancagem</td>
               <td>7</td>
               <td style="color: #FF4757;">❌ ABAIXO</td>
           </tr>
       </table>
       <p><strong>Insight:</strong> Bloqueador X impactou, projetamos Y para amanhã</p>
   `
   ```

2. **Commit + Push:**
   ```bash
   git add processo-comercial-7dias/playbook-vivo-20-05-2026.html
   git commit -m "Atualizar resultado 19/05 + projeção 20/05"
   git push origin master
   ```

3. **Vercel redeploya** (<30s) — playbook.ssfcard.ia.br fica sempre atualizado

4. **Compartilhar no WhatsApp:**
   ```
   Pessoal, resultado de hoje em playbook.ssfcard.ia.br
   Confira aba 19/05 e preparem para amanhã (aba 20/05)
   ```

### Adicionando Novos Dias

Quando `21/05` chegar, adicione novo objeto ao array `days` em JavaScript:

```javascript
{
    date: '21-05-2026',
    label: '21/05 (qui)',
    fullDate: '21 de Maio — Quinta-feira',
    status: 'pending',
    planejado: `<!-- metas + tarefas -->`,
    resultado: `<!-- a preencher às 15h -->`,
    projecao: `<!-- checklist 22/05 -->`
}
```

Commit + push → nova aba aparece automaticamente no playbook.ssfcard.ia.br

### Vantagens deste Sistema

✅ **Histórico preservado** — Cada dia fica acessível (não sobrescreve)  
✅ **Documento vivo** — Atualiza conforme você preenche dados reais  
✅ **Prático** — Links Notion sempre visíveis, checklist por pessoa  
✅ **Simples manutenção** — Editar HTML + git push = pronto  
✅ **Base para automação** — Enquanto n8n cresce, esse doc centraliza tudo  
✅ **Auditoria** — Todos os dias com planejado vs executado fica registrado  

### Arquivo Principal

| Arquivo | Localização |
|---------|------------|
| `playbook-vivo-20-05-2026.html` | `processo-comercial-7dias/` |
| URL ao vivo | https://playbook.ssfcard.ia.br/processo-comercial-7dias/playbook-vivo-20-05-2026.html |

### Roadmap Futuro

- [ ] **Integração n8n** — Disparar resultado automático via webhook (bot preenche tabela)
- [ ] **Gráficos dinâmicos** — Chart.js para visualizar trend (Karine, Lucas, Raquel)
- [ ] **Export CSV** — Baixar histórico de 7 dias para análise
- [ ] **Notificação WhatsApp** — Bot envia "Aba 19/05 atualizada!" quando Mayko faz push

---

## Operação 27/05/2026 — Dia Completo ✅

**Participantes:** Mayko (advisor) | SST Card + Lab MADIP  
**Foco:** Matinal SST Card + reunião estratégica clínica + parciais lab + calendário equipe

---

### 🎙️ Áudios do Rogério Transcritos (26/05 15:24 e 15:25)

Ambos transcritos via Whisper CLI (`--language Portuguese --model turbo`). Conteúdo:

| Áudio | Tema | Destaques |
|---|---|---|
| **15:24 (~1min)** | Closer + VISA + inauguração | Roni ainda avaliando; VISA entrada até 30/05; inauguração 01/07 confirmada |
| **15:25 (~45s)** | Parciais semana + time | Raquel ativa (Gabriela + Eugenio fechados); Lucas retomando; semana decisiva |

---

### 📊 Parciais SST Card — 26/05/2026

Dados capturados do grupo WhatsApp:

| Atendente | Contatos | Resultado | Status |
|---|---|---|---|
| **Raquel** | Funil: 27→15→5→2 | ✅ **2 fechados** (Gabriela Ouro R$79,90 + Eugenio Prata R$39,90) | 🟢 EXCELENTE |
| **Lucas** | 33 contatos | 13 ativações + 20 retenções | 🟢 BOM |
| **Karine** | — | Reconciliação 5/16 (31%) + Cobrança 3/17 (18%) + Ref sexta 52% | 🟡 OK |

**Alerta identificado:** Eugenio Prata (R$39,90) — potencial upgrade para Ouro (R$79,90) pela realidade financeira declarada. Fabiana Moura e Ana Luiza pendentes de resposta.

---

### 📊 Parciais Lab MADIP — 27/05/2026

Dados capturados do grupo WhatsApp da clínica:

| Atendente | Conversão | Estimativa convertido | Status |
|---|---|---|---|
| **Atendente anônima** | 38,43% | ~R$766 | 🟢 POTENCIAL ALTO |
| **Aline** | 12,72% | ~R$250 | 🟡 ABAIXO do padrão |
| **Débora** | 0% | R$0 | 🔴 CRÍTICO — linha vermelha |
| **Total** | ~18% | ~R$1.016 / R$~5.600 orçado | 🔴 META: 40% |

**Decisão GO/NO-GO Débora (validar em 28/05):**
- ≥20% → mantém no programa, coaching adicional
- <10% por 3 dias seguidos → reallocation (outra função)

**Atendente anônima:** 38% sem processo ativo estruturado. Com scripts e cadência, estimativa 55–60%. Identificar quem é e replicar comportamento para equipe.

---

### 📄 Documentos Criados — 27/05/2026

| Arquivo | Conteúdo | URL Pública | Status |
|---|---|---|---|
| `processo-comercial-7dias/01-matinais/27-05-2026/roteiro-matinal-27-05-2026.html` | Matinal SST Card — dados reais parciais + seções colapsáveis (dark theme, Barlow) | [playbook.ssfcard.ia.br/processo-comercial-7dias/01-matinais/27-05-2026/roteiro-matinal-27-05-2026.html](https://playbook.ssfcard.ia.br/processo-comercial-7dias/01-matinais/27-05-2026/roteiro-matinal-27-05-2026.html) | ✅ Deployed |
| `processo-comercial-7dias/01-matinais/27-05-2026/roteiro-reuniao-clinica-27-05-2026.html` | Reunião estratégica clínica — loop vicioso vs virtuoso, script balcão, case Tatiana, GO/NO-GO checklist (light theme, DM Serif) | [playbook.ssfcard.ia.br/processo-comercial-7dias/01-matinais/27-05-2026/roteiro-reuniao-clinica-27-05-2026.html](https://playbook.ssfcard.ia.br/processo-comercial-7dias/01-matinais/27-05-2026/roteiro-reuniao-clinica-27-05-2026.html) | ✅ Deployed |
| `aline-laboratorio/matinal-clinica-28-05-2026.html` | Matinal lab 28/05 — barras de progresso animadas, parciais reais, GO/NO-GO Débora (dark theme, Space Grotesk) | [playbook.ssfcard.ia.br/aline-laboratorio/matinal-clinica-28-05-2026.html](https://playbook.ssfcard.ia.br/aline-laboratorio/matinal-clinica-28-05-2026.html) | ✅ Deployed |

**Deploy:** `git push origin master` → Vercel auto-redeploy (<1 min) → todos os HTMLs servidos em `playbook.ssfcard.ia.br`

---

### 📄 Documentos Criados — 28/05/2026

| Arquivo | Conteúdo | Status |
|---|---|---|
| `pesquisa-satisfacao-sponsor/typebot-satisfacao-rogerio.json` | Pesquisa de satisfação do sponsor Rogério (Typebot v6, 7 perguntas, tema azul SST) — enviar ANTES da cobrança da 2ª mensalidade (R$ 3.800, vence 29/05) | ✅ Criado |
| `pesquisa-satisfacao-sponsor/typebot-satisfacao-rogerio.flow.yaml` | Spec do fluxo + design das perguntas + checklist de implantação | ✅ Criado |
| `pesquisa-satisfacao-sponsor/n8n-workflow-satisfacao-rogerio.json` | Webhook → **semáforo** (🔴/🟡/🟢) → WhatsApp Mayko: diz se pode cobrar direto ou se deve ligar antes | ✅ Criado |

**Decisão de processo:** medir satisfação → semáforo decide o tom da cobrança. 🔴 = ligar antes; 🟢 = cobrar com tranquilidade. Base: padrão validado [[padrao-typebot-whatsapp]].

---

### 📅 Eventos Google Calendar Criados — 27/05/2026

| Evento | Data/Hora | Google Meet | Participantes |
|---|---|---|---|
| **Matinal SST Card** | 27/05/2026 12h00 BRT | meet.google.com/tag-ppoq-yvv | Equipe SST Card |
| **Matinal Clínica MADIP** | 28/05/2026 08h00 BRT | meet.google.com/mfw-fmiq-pte | Aline + equipe lab |

---

### 🛠️ Infraestrutura Atualizada

| Item | O que mudou |
|---|---|
| **CLAUDE.md** | Reescrito com status 27/05, frente RH Closer, pasta `rh-closer/`, `01-matinais/`, personas Closer + Aline, correção typo `7dados→7dias`, gate decision removido |
| **`02-areas/historico-acoes.md`** | Entrada `2026-05-27` adicionada (operação completa do dia) |

---

### 🎯 Próximas Ações Prioritárias (28/05+)

| Ação | Responsável | Prazo | Observação |
|---|---|---|---|
| Dar entrada VISA + alvará prefeitura | Rogério | 30/05 | Marco crítico para inauguração 01/07 |
| Validar resultado Débora na matinal 28/05 | Aline + Mayko | 28/05 08h | GO/NO-GO: ≥20% mantém, <10% reallocation |
| Identificar atendente anônima 38% | Aline | 28/05 | Replicar comportamento para equipe |
| Decisão comissão Closer (Rogério aprova) | Rogério | ASAP | Roni em avaliação — comissão ainda pendente |
| Contrato PJ equipe (Lucas, Karine, Raquel) | Rogério | Junho | Transição iniciada em 23/05 |

---

## Grande Automação MADIP — 05/06/2026 ✅ CRIADA

**Escopo:** SST Card + SST Clínica MADIP + Bairro da Paz — 9 automações mapeadas.

| Documento | Conteúdo | Status |
|---|---|---|
| `processo-comercial-7dias/02-cadencias/GRANDE-AUTOMACAO-MADIP.md` | **Plano mestre**: inventário 9 automações, arquitetura global, variáveis de ambiente, cronograma e checklist de implantação | ✅ Criado |
| `processo-comercial-7dias/02-cadencias/n8n-dashboard-diario-sst.json` | Workflow n8n: cron 15h45 → lê Notion "Parciais SST Card" → consolida Karine/Lucas/Raquel → envia texto no grupo WhatsApp | ✅ JSON pronto — importar |
| `processo-comercial-7dias/02-cadencias/n8n-cobranca-d3-d7-d15.json` | Workflow n8n: cron 9h → lê Sheets "Cobranças" → calcula fase → envia WhatsApp individual → atualiza Sheets | ✅ JSON pronto — importar |

**Estado geral das 9 automações (05/06):**

| # | Automação | Estado |
|---|-----------|--------|
| A1 | Group Parser v2 (SST Card + Clínica) | ✅ JSON pronto — **implantar hoje** |
| A2 | Dashboard diário 15h45 | ✅ JSON criado — **implantar hoje** |
| A3 | Cadência cobrança D+3/7/15 | ✅ JSON criado — implantar esta semana |
| A4 | Funil 1 anti-noshow (cron D-3/D-1/D+1) | ✅ JSON pronto — **implantar hoje** |
| A5 | Typebot anti-noshow | ✅ JSON pronto — **importar no Typebot hoje** |
| A6 | Onboarding novos membros D+0→D+30 | ✅ JSON criado — implantar (10/06) |
| A7 | Reativação cancelados | ✅ JSON criado — implantar (15/06) |
| A8 | Typebot qualificação lead Bairro da Paz | ✅ JSON criado — importar no Typebot (10/06) |
| A9 | n8n Typebot BP → Chatwoot | ✅ JSON criado — implantar (13/06) |

**Variáveis de ambiente n8n necessárias (configurar antes de implantar):**
`ANTHROPIC_API_KEY` · `NOTION_TOKEN` · `NOTION_PARCIAIS_DB_ID` · `NOTION_CLINICA_DB_ID` · `CHATWOOT_API_KEY` · `EVOLUTION_API_URL` · `EVOLUTION_API_KEY` · `EVOLUTION_INSTANCE` · `SST_CARD_GROUP_CHAT_ID` · `SHEETS_COBRANCA_ID` · `SHEETS_AGENDA_ID`

**Guia de implantação passo a passo:** `processo-comercial-7dias/02-cadencias/guia-implantacao-automacoes.html` — publicado em playbook.ssfcard.ia.br (dark theme, checklists interativos com persistência localStorage, barra de progresso, troubleshooting por automação). Usar no celular durante a implantação.

---

## Decisão de Produto — 02–03/06/2026

### Áudios Rogério (02/06/2026) — Revisão Estrutura de Preços

Decisão comunicada via WhatsApp (áudios 12:03 e 12:43). Rogério redefiniu a estrutura de produtos do SST Card para o Bairro da Paz com base na experiência de campo de dezembro/2025 (reconciliação com equipe) e análise via IA.

| Produto | Antes | Depois |
|---|---|---|
| Individual | R$34,90 (1 titular) | **R$39,90** (titular todos benefícios + 3 dep. saúde) |
| Família | R$79,90 (até 5 pessoas) | **R$64,90** (4 pessoas todos benefícios) |
| Adesão | R$40,00 | **R$35,00** |
| Dependente avulso | R$7,90 | **Eliminado** |

**Impacto no break-even:** 430 → **364 contratos** (-15%). Ticket médio sobe de R$61 para R$71,40/contrato (+17%).

| Documento atualizado | O que mudou |
|---|---|
| `estrategia_comercial/viabilidade_card.md` | Tabela de produtos, ticket médio, break-even, ramp-up, comparativo |
| `RETOMADA.md` (este arquivo) | Decisões estratégicas item 1 (precificação), item 4 (break-even), item 5 (capital de giro) |
| Notion — Estratégia SST Card Rogério | Transcrições áudios + síntese conversa + break-even revisado |

**Comissão closer confirmada (03/06/2026):** R$20 por adesão mantido. Com adesão de R$35, representa 57% (era 50% quando a adesão era R$40). Decisão favorece atração de hunter sem alterar estrutura já comunicada.

---

## Como retomar com Claude

Cole este prompt ao iniciar nova sessão:

```
Claude, estamos retomando o projeto SST Clínica 2ª Filial / Bairro da Paz.
Leia o arquivo RETOMADA.md em C:/Users/mayko/consultoria-comercial/clientes/SST_Clinica_Bairro_da_Paz/
e me dê um resumo do estado atual antes de continuar.
```
