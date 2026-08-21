---
title: Histórico de ações - Squad E-Chat Overclock
tags: [sst, echat, crm, historico, acoes, em-progresso]
criado: 2026-08-18
atualizado: 2026-08-21
---

# Histórico de Ações — Squad E-Chat Overclock

## 2026-08-21 — Pacote de governança `squad-openclaw-comercial/` criado

**Contexto:** faltava a camada que liga E-Chat, GPTMaker, n8n e OpenClaw sob uma direção única. Cada peça existia isolada; nenhuma tinha fronteira escrita.

**O que foi criado:** `squad-openclaw-comercial/` — 30 arquivos.
- Prompt mestre do **Diretor Comercial OpenClaw** (colável no OpenClaw ou no GPTMaker).
- **8 agentes** com identidade, missão, entradas, saídas, quando escalar, o que nunca fazer e métricas: A1 receptivo · A2 SDR · A3 closer · A4 suporte · A5 CS · A6 cobrança · A7 guardião LGPD · A8 escriba.
- **3 schemas JSON** (`intent`, `handoff`, `conversation-health`) — validados em Draft 2020-12, exemplos passando.
- **5 documentos n8n**: blueprint, contrato de webhook, contrato de retorno, fila de aprovação humana, kill switch e idempotência.
- **5 documentos GPTMaker**: mapa das 8 telas, prompt MÉDINA revisado, prompt do Diretor, 2 checklists.
- **5 playbooks** e **12 casos de teste** (`EVALS.md`).

**Decisões fixadas:** E-Chat é o corpo · n8n são as mãos (nenhuma ação externa sai sem passar por lá) · OpenClaw é o cérebro e nunca fala com paciente · GPTMaker é governado, não ignorado · autonomia em 4 gates (L0→L3), hoje **L0 para todos**.

**Correções aplicadas:** prompt da MÉDINA de 06/05 prometia "até 75% de desconto" (fora de qualquer régua aprovada), citava estrutura de equipe inexistente e trazia preços de consulta fixos — tudo removido.

**O que NÃO foi feito, de propósito:** nenhum workflow JSON (sem endpoint confirmado do E-Chat, seria endpoint inventado) · nenhuma mensagem enviada · nenhuma credencial tocada · nenhuma alteração em produção.

**Status:** aguardando decisão humana em 6 pendências — ver bloco de 21/08 no `RETOMADA.md`.

**Critério de pronto do próximo gate:** C15 (preços + régua) cravado pelo Rogério e C21 (webhook + endpoint) respondido pela EAS.

---

## 2026-08-19 ~12h12 — Ata final da reunião: cobrança ainda parcialmente fora do E-Chat, bug de R$28,00 achado no BOOM

**Contexto:** encerramento da reunião "Aquisição de Competências Financeiro" (10h00–~12h12). Auditoria ao vivo do BOOM (`financeiro > contas a receber`) com Karine/Sabrina compartilhando tela.

**Achado direto sobre o E-Chat/CRM:**
- O CRM de cobrança da Sabrina só foi **ativado ontem à tarde (18/08)**, junto com Lucas — antes disso ela não estava usando.
- Parte da cobrança ainda roda pelo **número Meta "reserva"**, fora do card/CRM do E-Chat — o número que estava sendo usado até ontem no Meta virou reserva depois que o novo número foi conectado ao E-Chat.
- Ligação por computador/E-Chat ainda não funciona na prática — falta microfone/fone (pedido há ~15 dias, não comprado). Karine chegou a usar celular pessoal para ligar por WhatsApp, o que gerou contatos de clientes fora de hora (madrugada) — risco a monitorar.
- Instagram segue com dificuldade de integração — Lucas vai retomar contato com Alessia (lado fornecedor/EAS).
- Typebots precisam ser criados dentro da própria plataforma E-Chat (não há import de JSON pronto) — Mayko já mandou mensagem ao suporte. Formulário de cadastro de dependentes foi criado ao vivo em `Ferramentas > Typebot Leads` como demonstração pedagógica.

**Não avançou nesta reunião:** IA de atendimento ativa (C19), funis/cards por especialidade (C20), webhook de saída + endpoint de retorno (C21) — nenhum desses foi mencionado ou testado hoje. Seguem exatamente como em 18/08.

**Decisão de processo:** Rogério instruiu que toda próxima reunião prática comece com infraestrutura pronta (tela, sistema, internet, computador, ligação) — cobrança direta a Lucas/Railane.

**Status:** ata completa, decisões e pendências registradas em `../RETOMADA.md` e `02-areas/historico-acoes.md` (vault raiz). Compromissos novos lançados em `../openclaw-sst/COMPROMISSOS-ATIVOS.md`.

---

## 2026-08-19 10h00 — Pauta financeira pós-ativação preparada

**Contexto:** reunião Notion `SSF CARD - Aquisição de Competências Financeiro` marcada para 19/08/2026 10h BRT, um dia após confirmação de número novo, Instagram @ssfclinica e CRM funcionando no E-Chat.

**Ação:** criada a pauta `../pauta-aquisicao-competencias-financeiro-19-08-2026.md`, conectando a energia da matinal com os gates objetivos: financeiro pendente desde 02/07 e pós-ativação E-Chat/CRM.

**Leitura aplicada:** a ativação técnica não encerra a frente; ainda faltam confirmações de IA de atendimento, funis/cards, webhook de saída, endpoint de retorno, rotina Karine/Sabrina e resolução das conversas sumidas.

**Status:** pauta pronta para condução. Saída esperada da reunião: cada pendência com **o que falta · dono · prazo · critério de pronto**.

---

## 2026-08-18 12h23 — Áudio pós-ativação enviado ao grupo SST × EAS

**Contexto:** após confirmação no grupo de que o número novo está em produção, o Instagram da clínica está conectado e o CRM já aceita teste, Mayko enviou áudio para alinhar o que ainda falta para a automação comercial avançar.

**Marco confirmado pelo print:**
- WhatsApp/número novo ativo em produção no E-Chat.
- Instagram **@ssfclinica** conectado.
- CRM em produção e teste solicitado/concluído.
- Confirmação operacional no grupo: **"Funcionando"**.

**Intenção do áudio:** sair da pauta de ativação técnica e abrir checklist de pós-ativação com dono, prazo e critério de pronto.

**Checklist pedido no grupo:**
1. IA de atendimento ativa ou pendente de chave/configuração/liberação.
2. CRM/funis prontos para cards com origem, interesse e próxima ação.
3. Webhook de saída e endpoint de retorno do E-Chat para n8n/OpenClaw.
4. Pendências operacionais de Karine/Sabrina: lista, disparo, cards, permissão, treinamento ou regra.
5. Resolução das conversas sumidas: explicação, recuperação de contatos e relatório de inatividade.

**Status:** aguardando respostas objetivas dos responsáveis no grupo.

**Critério de pronto do próximo gate:** cada pendência respondida com **o que falta · dono · prazo · critério de pronto**.
