---
title: Playbook — Expansão para novas unidades
tags: [sst, playbook, expansao, unidades, bairro-da-paz, escala]
related: ["[[saude-da-comunicacao]]", "[[../README]]", "[[../schemas/conversation-health.schema.json]]"]
criado: 2026-08-21
---

# Playbook — Expansão para novas unidades

> Como levar este sistema para uma unidade nova sem repetir tudo do zero — e sem levar junto os problemas da primeira.

---

## O contexto

| Unidade | Situação |
|---|---|
| **Simões Filho** | Matriz. Operação original, onde os processos nasceram |
| **Bairro da Paz** (Salvador) | 2ª filial, inaugurada em **01/07/2026**. Em operação |
| **Odontologia** | Serviço novo dentro do Bairro da Paz (fusão de duas salas) |
| **Próximas** | Rogério discute expansão para 4 andares e um administrador regional (Denilson) |

A expansão **já começou**. Este playbook existe porque a terceira unidade é onde os atalhos da segunda cobram a conta.

---

## O que se replica e o que se refaz

| Camada | Replica? | Por quê |
|---|---|---|
| **Prompts dos agentes** | ✅ Sim, com ajuste de endereço e horário | O tom e as regras são da marca |
| **Schemas** (intenção, handoff, saúde) | ✅ Sim, sem mudança | São contrato de máquina |
| **Playbooks de conversa** | ✅ Sim | SPIN, escalada e produto não mudam |
| **Guard-rails e LGPD** | ✅ Sim, integralmente | Não negociável |
| **Catálogo de especialidades** | ❌ Refaz | Cada unidade tem os seus |
| **Preços** | ❌ Refaz ou confirma | Podem variar |
| **Fila e roteamento** | ❌ Refaz | Depende de quem trabalha lá |
| **Canal do E-Chat** | ❌ Novo | Número, funil e cards próprios |
| **Métricas** | ✅ Estrutura, ❌ metas | Unidade nova não nasce com meta de madura |

> **Regra:** o que é da marca replica; o que é do lugar se refaz. Copiar catálogo e preço de uma unidade para outra é como se cria "mas a moça do outro lado falou outro valor".

---

## Checklist de abertura de unidade

### Antes de abrir o canal

- [ ] Número oficial na BM do Rogério, não do fornecedor
- [ ] Canal criado no E-Chat, vinculado ao agente certo
- [ ] Funis do CRM com quadros próprios da unidade
- [ ] Catálogo de especialidades da unidade, confirmado com a gestão
- [ ] Tabela de preços confirmada — **ou o bloqueio de preço explícito no prompt**
- [ ] Endereço, horário e ponto de referência revisados
- [ ] Equipe da unidade mapeada: quem atende, quem fecha, quem cobra
- [ ] Fila de escalada apontando para pessoas **daquela unidade**

### Na primeira semana

- [ ] **Modo observador (L0)** — a IA não responde, só registra
- [ ] Painel de saúde da comunicação rodando desde o dia 1
- [ ] Auditoria diária, não semanal
- [ ] Perguntas mais frequentes coletadas — elas são diferentes por bairro

### Para ligar a IA

- [ ] 7 dias de observação sem incidente
- [ ] FAQ da unidade treinado
- [ ] Casos do `EVALS.md` rodados com o contexto da unidade
- [ ] Equipe local sabe como assumir uma conversa
- [ ] Kill switch testado **por alguém da unidade**

> **A última linha é a que costuma ser pulada.** Se quem está na ponta não sabe apagar a luz, não há freio de verdade — há um freio que só o consultor alcança.

---

## O que a experiência do Bairro da Paz ensinou

| Lição | Consequência |
|---|---|
| Inaugurar não é operar | O foco muda de "abrir" para "vender" no dia seguinte, e ninguém está pronto para isso |
| Equipe nova não herda o processo | O que a Karine sabe de cabeça não está escrito. Este pacote é a tentativa de escrever |
| Sistema novo traz problema novo | O BOOM inativou ativos e falhou em cobrança de cartão. Testar cobrança **antes** de escalar base |
| Recrutamento sem perfil comercial vira gargalo | Decisão de 14/08: perfil comercial passa a ser exigência em todo recrutamento |
| Infraestrutura importa mais do que parece | Máquina lenta, sem SSD, sem fone, sem segunda internet — cada uma derruba a operação um dia inteiro |

---

## Escala sem perder o cuidado

O risco real da expansão não é técnico. É **a conversa virar linha de produção**.

| Sinal de alerta | O que fazer |
|---|---|
| Tempo médio de resposta cai, satisfação também | Volume subiu antes da capacidade. Freia o disparo |
| Mais cards, menos motivo de perda registrado | A equipe está no automático |
| Mesma resposta para contextos diferentes | Treinamento genérico demais |
| Escalada caindo | Ou a IA melhorou, ou parou de reconhecer risco. **Auditar antes de comemorar** |
| Reclamações subindo em uma unidade só | É gente, não sistema. Vai para a gestão |

> A linha sobre escalada caindo é a mais traiçoeira. Queda de escalada parece progresso e pode ser o contrário: o agente aprendendo a "resolver" o que deveria passar adiante.

---

## Métricas por unidade

O `conversation-health.schema.json` tem o campo `referencia.unidade` justamente para isso.

| Métrica | Unidade madura | Unidade nova (90 dias) |
|---|---|---|
| Primeira resposta | ≤ 5 min | ≤ 15 min |
| Sem resposta > 24h | 0 | 0 |
| Card completo | ≥ 90% | ≥ 70% |
| Escalada clínica correta | 100% | 100% |
| Autonomia da IA | L2 | **L0 por 7 dias, depois L1** |

**Duas linhas não têm desconto para unidade nova:** escalada clínica e conversa sem resposta. As outras podem amadurecer.

---

## Quando NÃO expandir o sistema

- Enquanto o **webhook e o endpoint do E-Chat** não existirem (C21) — expandir sem eles é multiplicar trabalho manual.
- Enquanto a **tabela de preços** não estiver cravada — cada unidade nova multiplica a lacuna.
- Enquanto o incidente das **conversas sumidas** (C23) não tiver explicação — não se escala sobre sistema que perde conversa.
- Enquanto **parte da cobrança rodar fora do canal oficial** (C33) — a unidade nova nasceria já sem rastreabilidade.

> Essas quatro travas não impedem a unidade de abrir. Impedem que **este sistema** seja levado até ela. É uma distinção importante para dizer ao Rogério: a clínica pode crescer; a automação só cresce depois de fechada.

---

Parte de [[../README|Squad OpenClaw Comercial]]
