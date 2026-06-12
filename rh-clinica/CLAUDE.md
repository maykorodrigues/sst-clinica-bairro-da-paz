---
title: CLAUDE.md — RH Atendente de Clínica · SST Clínica (Bairro da Paz)
tags: [sst, rh, clinica, atendente, bairro-da-paz, em-progresso]
criado: 2026-06-07
atualizado: 2026-06-07
related:
  - "[[../CLAUDE]]"
  - "[[../RETOMADA]]"
  - "[[../rh-closer/CLAUDE]]"
  - "[[../perfil-rogerio-diretor]]"
---

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Propósito deste diretório

Processo seletivo para **Atendente de Clínica — SST Clínica / Filial Bairro da Paz**. Vínculo **CLT** (diferente do Closer, que é PJ), presencial, carga 44h/semana. Cargo de entrada com trilha de crescimento para Coordenadora da Unidade.

Responsáveis: **Rogério Ferreira** (sponsor) + **Mayko Rodrigues** (consultoria).

**Status atual (07/06/2026):**
- 📝 **Vaga em rascunho** — criada em 03/06/2026, aguardando aprovação de Rogério sobre salário base e benefícios antes de divulgar
- ⏳ **Checklist de publicação incompleto** — faltam: aprovação Rogério, CNPJ filial BP definido, WhatsApp dedicado, pipeline Notion
- 🎯 **Prazo crítico:** início desejado até 30/06/2026 (para operação piloto 15–27/06 e inauguração 01/07/2026)

**Antes de agir:** ler `../RETOMADA.md` para o estado atual e `formulario-abertura-vaga-coordenadora-clinica.md` para os dados oficiais da vaga.

Diferença em relação ao `../rh-closer/`:

| Atributo | rh-closer | rh-clinica |
|---|---|---|
| Vínculo | PJ — pró-labore + comissão | **CLT — salário fixo + bônus** |
| Função no funil | Fechamento (vendas) | **Recepção, agenda, onboarding SST Card** |
| Perfil ideal | Hunter experiente | **Entrada com potencial de crescimento** |
| Prazo contratação | Fase 2 com Safira (candidata única) | Até 30/06/2026 |

---

## Mapa de arquivos

| Arquivo | Função | Quando usar |
|---|---|---|
| `formulario-abertura-vaga-coordenadora-clinica.md` | **Fonte de dados da vaga** — cargo, remuneração, requisitos, metas 90 dias, processo seletivo | Referência antes de editar qualquer divulgação; remuneração só daqui após aprovação Rogério |
| `formulario-qualificacao-coordenadora-clinica.html` | Formulário online de auto-qualificação com eliminatórios — compartilhar link antes da entrevista | Enviar para candidatas após triagem inicial |
| `typebot-qualificacao-atendente-clinica.json` | Typebot de qualificação — importar no Typebot self-hosted (Easypanel) para automatizar triagem | Implantar quando vaga for publicada |

---

## Fluxo do processo seletivo

```
Candidata identificada (indicação, grupo WhatsApp, comunidades BP)
  → Compartilhar link formulario-qualificacao-coordenadora-clinica.html (eliminatórios)
  → Entrevista comportamental 30–40 min (Mayko + Rogério ou liderança designada)
  → Simulação prática: role play atendimento de paciente (15 min)
  → Proposta + assinatura contrato CLT (presencial, 1h)
  → Após contratação: atualizar RETOMADA.md + registrar historico-acoes.md do vault raiz
```

**Simulação prática (critério-chave):** "Paciente chegou sem agendamento, está angustiada, diz que está com dor. O médico está com a agenda cheia. O que você faz?" — observar tom, empatia e raciocínio prático.

---

## Remuneração de referência

> ⚠️ **Pendente aprovação Rogério** — não divulgar antes da confirmação.

| Componente | Valor |
|---|---|
| Salário base CLT | R$1.518 – R$1.800/mês |
| VR / VA | R$20–25/dia útil |
| Vale transporte | Incluído |
| Bônus produtividade | +R$150–200 se agenda ≥ 85% ocupação/mês |
| **Total estimado** | R$1.518 – R$2.100/mês |

---

## Editando os arquivos HTML

### `formulario-qualificacao-coordenadora-clinica.html`

Formulário com eliminatórios automáticos. Para editar perguntas ou critérios de corte, buscar no HTML:
- Perguntas → tag `<label>` ou atributo `name=""`
- Critérios eliminatórios → comentários `<!-- ELIMINATORIO -->`

Para usar: abrir no navegador e compartilhar via link ou hospedar no Vercel (já configurado em `../vercel.json`).

---

## Checklist de publicação

- [ ] Rogério aprovou salário base e benefícios
- [ ] CNPJ da filial Bairro da Paz definido (para contrato CLT)
- [ ] WhatsApp dedicado para receber candidaturas definido
- [ ] Link do formulário HTML gerado e testado
- [ ] Divulgação escrita (grupos WhatsApp Salvador, comunidades do Bairro da Paz)
- [ ] Pipeline no Notion criado para acompanhar candidatas

---

## Regras de manipulação

1. **Não divulgar** `formulario-qualificacao-coordenadora-clinica.html` em canais públicos antes da aprovação de Rogério sobre a remuneração.
2. Toda mudança de salário ou benefícios **exige aprovação de Rogério** — o valor oficial é o de `formulario-abertura-vaga-coordenadora-clinica.md`.
3. Após contratação: atualizar `../RETOMADA.md` (seção "Documentos criados") e registrar em `02-areas/historico-acoes.md` do vault raiz.
4. Rogério prefere mensagem curta + fatos — não enviar análise longa; usar GO/NO-GO direto (ver `../perfil-rogerio-diretor.md`).
