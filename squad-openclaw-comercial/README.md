---
title: Squad OpenClaw Comercial — Diretor Comercial e atendentes de IA da SST
aliases: [squad-openclaw-comercial, diretor-comercial-openclaw, squad-comercial-sst]
tags: [sst, openclaw, echat, gptmaker, n8n, squad, comercial, governanca, em-progresso]
related: ["[[../RETOMADA]]", "[[../openclaw-sst/README]]", "[[../squad-echat-overclock/README]]", "[[../atendimento-ia-clinica/CLAUDE]]", "[[../decisao-openclaw-echat-api-oficial-17-08-2026]]"]
criado: 2026-08-21
atualizado: 2026-08-21
status: L0 — observador (nada em produção)
---

# 🎛️ Squad OpenClaw Comercial — SST Clínica / SST Card

> **O que é:** a fonte de governança da comunicação comercial da SST. Um **Diretor Comercial de IA** (OpenClaw) e **oito agentes de atendimento** que cobrem receptivo, pré-venda, venda, suporte, CS, cobrança, conformidade e registro.
>
> **O que NÃO é:** não é um sistema novo, não substitui o E-Chat, não substitui ninguém da equipe e **não está ligado**. Este pacote é papel, schema e checklist. Nada aqui toca produção.

---

## Em 60 segundos

Hoje a SST tem as peças certas e nenhum maestro:

| Peça | Situação real (21/08/2026) |
|---|---|
| **E-Chat** (EAS Systems) | ✅ Em produção — WhatsApp oficial, Instagram `@ssfclinica`, CRM testado |
| **GPTMaker** | 🟡 Agentes existem (Léia, MÉDINA) mas rodam soltos, sem governança |
| **n8n** (`n8n.clinicalucrativa.ia.br`) | 🟡 19 automações em JSON — construídas, não implantadas |
| **OpenClaw** (VPS `ssf-card-clinica`) | 🔴 Fase 0, pré-voo — nenhuma mudança feita na VPS |
| **Webhook + endpoint do E-Chat** | 🔴 **Não existem** — C21 aberto com a EAS desde 04/08 |

O resultado aparece no número: **145 chamadas receptivas por dia, ~16 atendidas**, e **69 levantadas de mão perdidas num único dia**. Não falta ferramenta. Falta **quem governa a conversa**.

Este pacote cria esse governo em quatro peças:

1. **Um Diretor Comercial de IA** que lê contexto, prioriza e emite *intenções* — nunca mensagens soltas.
2. **Oito agentes** com fronteira escrita: o que cada um pode fazer, o que nunca pode, e quando chama humano.
3. **Três schemas JSON** que fazem a intenção ser validável por máquina antes de virar mensagem.
4. **Quatro fases de implantação** com portão de saída, para autonomia ser conquistada e não prometida.

---

## Arquitetura — quem faz o quê

```text
        Paciente / lead / cliente SST Card
                      |
                      v
   +------------------------------------------+
   |  E-CHAT (EAS Systems)  ·  O CORPO        |
   |  WhatsApp oficial · Instagram · CRM      |
   |  cards · templates · Typebot · fila      |
   +------------------+-----------------------+
                      | webhook de saida  [ A CONSTRUIR - C21 ]
                      v
   +------------------------------------------+
   |  n8n  ·  AS MAOS                         |
   |  cofre de credencial · valida politica   |
   |  idempotencia · fila de aprovacao · log  |
   |  kill switch · minimizacao de payload    |
   +------------------+-----------------------+
                      | consulta (payload minimo)
                      v
   +------------------------------------------+
   |  OPENCLAW SST  ·  O CEREBRO              |
   |  Diretor Comercial + squad de agentes    |
   |  raciocina · prioriza · redige · decide  |
   |  devolve INTENCAO estruturada (JSON)     |
   +------------------+-----------------------+
                      | intent.schema.json
                      v
   +------------------------------------------+
   |  n8n valida de novo                      |
   |  |- dry_run?           -> so registra    |
   |  |- precisa aprovacao? -> fila humana    |
   |  |- duplicada?         -> bloqueia       |
   |  +- aprovada?          -> executa        |
   +------------------+-----------------------+
                      | endpoint de retorno  [ A CONSTRUIR - C21 ]
                      v
                 E-CHAT envia  ->  paciente
```

**A regra que sustenta tudo:** o OpenClaw **nunca fala com o paciente**. Ele fala com o n8n. O n8n fala com o E-Chat. O E-Chat fala com o paciente. Três fronteiras, três chances de barrar erro.

### Onde entram GPTMaker, EasyPanel, Chatwoot, Obsidian e Notion

| Sistema | Papel neste desenho | Regra |
|---|---|---|
| **GPTMaker** | Camada **atual** de agentes de IA da SST (Léia, MÉDINA). Não é legado descartável — é o que já responde hoje. | **Mapear e governar, não ignorar.** Os prompts de `agents/` viram o conteúdo do campo *Trabalho*; as *Intenções* do GPTMaker apontam para o n8n, nunca para sistemas externos direto. Ver `gptmaker/`. |
| **EasyPanel** | Hospeda a stack na VPS: Chatwoot, Evolution API, n8n, Typebot. | Nenhuma alteração de produção sai deste pacote. Deploy é decisão registrada + execução técnica separada. |
| **Chatwoot / Evolution** | **Fallback, laboratório e ponte** para outros clientes e canais. | Não substituem o E-Chat na SST sem **nova decisão registrada**. Uso permitido: alerta interno, teste em sandbox, contingência aprovada. Uso proibido: disparo em massa a paciente. |
| **Obsidian** (este vault) | Cérebro auditável de decisão: atas, playbooks, scripts, compromissos. | É a **fonte de verdade documental**. `RETOMADA.md` e `openclaw-sst/COMPROMISSOS-ATIVOS.md` vencem qualquer memória de agente. |
| **Notion** | Espelho executivo — transcrições, hub do cliente, pipelines legadas. | Leitura e espelhamento. Card operacional novo mora **no E-Chat**, não no Notion (decisão de 14/08). |

---

## As quatro fases — autonomia se conquista

Nenhum agente pula fase. Cada gate é binário: passou ou não passou.

| Fase | Nome | O que o agente pode | Gate para sair |
|---|---|---|---|
| **L0** | **Observador** | Ler a allowlist, resumir conversa, apontar risco, sugerir próxima ação **para humano ler**. Zero escrita externa. | Diagnóstico rodado · fontes citadas corretamente · nenhuma tentativa de escrita externa em 7 dias |
| **L1** | **Copiloto** | Redigir rascunho, priorizar fila, emitir intenção com `dry_run: true`. O humano copia e usa se quiser. | n8n **rejeitando** intenção inválida de forma comprovada (o teste negativo passa) · 7 dias sem envio externo automático |
| **L2** | **Executor aprovado** | Executar **tipos de intenção previamente aprovados**, um a um, com aprovação humana na fila. | Webhook + endpoint do E-Chat funcionando · idempotência testada · kill switch testado · 30 execuções sem incidente |
| **L3** | **Autonomia limitada** | Rotinas repetitivas de baixo risco, com teto diário, janela de horário, kill switch e log. | Auditoria semanal limpa · rollback exercitado de verdade · Rogério aprova por escrito o escopo exato |

**Status hoje: L0 para todos os agentes.** E L0 é onde eles ficam até o C21 (webhook + endpoint) sair do vermelho. Sem canal de retorno, L2 é conversa fiada — o fluxo morre no penúltimo nó.

> ⚠️ **Nunca prometer L2/L3 a Rogério, Lucas ou Elieser antes do gate.** Promessa de autonomia sem teste é o jeito mais rápido de perder a confiança da equipe no sistema inteiro.

---

## Mapa dos arquivos

```text
squad-openclaw-comercial/
├── README.md                                       <- este arquivo
├── 00-ORQUESTRADOR-DIRETOR-COMERCIAL-OPENCLAW.md   <- prompt mestre do Diretor
├── EVALS.md                                        <- 12 testes de aceitacao
├── agents/                                         <- um arquivo por agente
│   ├── A0-diretor-comercial-openclaw.md
│   ├── A1-atendimento-receptivo.md
│   ├── A2-pre-vendas-sdr.md
│   ├── A3-vendas-closer.md
│   ├── A4-suporte-operacional.md
│   ├── A5-cs-sucesso-paciente.md
│   ├── A6-cobranca-relacionamento.md
│   ├── A7-guardiao-lgpd-qualidade.md
│   └── A8-escriba-cerebro-obsidian-notion.md
├── gptmaker/                                       <- como isso vira configuracao real
│   ├── mapa-agentes-gptmaker.md
│   ├── prompt-medina-sdr-revisado.md
│   ├── prompt-diretor-comercial-openclaw-gptmaker.md
│   ├── checklist-configuracoes-gptmaker.md
│   └── checklist-canais-intencoes-treinamentos.md
├── schemas/                                        <- contrato de maquina
│   ├── intent.schema.json
│   ├── handoff.schema.json
│   └── conversation-health.schema.json
├── n8n/                                            <- a camada de execucao
│   ├── blueprint-orquestracao-comercial.md
│   ├── contrato-webhook-echat.md
│   ├── contrato-retorno-echat.md
│   ├── fila-aprovacao-humana.md
│   └── kill-switch-e-idempotencia.md
└── playbooks/                                      <- como se conversa na SST
    ├── saude-da-comunicacao.md
    ├── atendimento-sst-card.md
    ├── qualificacao-consultas-exames.md
    ├── passagem-ia-para-humano.md
    └── expansao-unidades.md
```

---

## Para quem lê pela primeira vez

**Rogério (sponsor)** — três frases: nada disso está ligado; o que trava não é dinheiro nem tecnologia, é a **régua de desconto e a tabela de preço por especialidade** que só você crava (pendente desde 02/07); e o retorno esperado é recuperar parte das ~129 chamadas por dia que hoje ninguém atende.

**Lucas (interlocutor da EAS)** — o item que destrava tudo é **um só**: webhook de saída + endpoint de retorno do E-Chat (C21). Os contratos técnicos que a EAS precisa receber estão em `n8n/contrato-webhook-echat.md` e `n8n/contrato-retorno-echat.md`, escritos como pedido aberto a ajuste, não como exigência.

**Elieser (EAS Systems)** — este pacote **não pede troca de plataforma**. O E-Chat continua sendo o canal, o CRM e o histórico. O que se pede é um evento de saída e um endpoint de envio, no formato de campo que a EAS já usa internamente.

**Mayko (advisor)** — o que este pacote fecha e o que fica com o cliente está no fim de cada arquivo. O que ainda não se sabe está marcado como `[FALTA: ...]` de propósito, para não virar suposição citada como fato depois.

---

## Guard-rails do squad inteiro

Valem para todo agente, em toda fase, sem exceção:

1. **Português brasileiro** em tudo — inclusive nome de nó no n8n e comentário de código.
2. **Nenhum agente envia mensagem** a paciente, lead, equipe ou fornecedor. Agentes produzem intenção; quem envia é o n8n, depois de política validada, e só a partir de L2.
3. **Credencial nunca aparece** em prompt, chat, arquivo ou log. O cofre é o n8n. Se um agente pedir token, isso é bug, não funcionalidade.
4. **Dado de saúde é dado pessoal sensível** (LGPD, art. 5º, II). Nome, CPF, queixa clínica, exame e laudo não entram em exemplo, prompt ou documento. Todo exemplo deste pacote é fictício.
5. **Nenhum agente atua como profissional de saúde.** Não diagnostica, não interpreta exame, não recomenda medicamento, não avalia gravidade. Sintoma vai para humano.
6. **Preço, desconto, campanha, verba e meta são sempre humanos.** Nunca inventar valor. Se não está na tabela vigente, a resposta é "vou confirmar", não um número.
7. **Endpoint sem fonte é INFERIDO**, nunca CONFIRMADO. Um endpoint inventado custa uma reunião de credibilidade com o fornecedor.
8. **Trilha 2** (clínicas). Nunca cruzar com o pitch do Programa Advisor (Trilha 1).
9. **Raquel está afastada por luto.** Nunca atribuir tarefa, cobrar retorno ou felicitar. Qualquer texto que a mencione passa por revisão humana do Mayko. Ver a correção de registro no `RETOMADA.md`.

---

## Relacionados

- [[../RETOMADA|Estado vivo do projeto SST]] — fonte da verdade, ler antes de agir
- [[../openclaw-sst/README|Plano mestre de implantação do OpenClaw]]
- [[../openclaw-sst/COMPROMISSOS-ATIVOS|Compromissos ativos com dono, prazo e critério de pronto]]
- [[../squad-echat-overclock/README|Squad E-Chat — orquestração de panes]]
- [[../decisao-openclaw-echat-api-oficial-17-08-2026|Decisão de arquitetura de 17/08]]
- [[../atendimento-ia-clinica/CLAUDE|Projeto Atendimento IA da Clínica (Léia)]]
