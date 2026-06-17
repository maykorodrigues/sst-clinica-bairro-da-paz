---
tags: [em-progresso]
---
# RETOMADA DO PROJETO — SST Clínica | Bairro da Paz

> Leia este arquivo primeiro ao retomar o projeto. Contém estado atual, decisões tomadas e próximos passos.  
> Última atualização: 16/06/2026 — **Data oficial de inauguração Bairro da Paz: 01/07/2026** (Cenário 2 — com VISA Salvador)

---

## 🔴 PENDENTE PARA 17/06 (manhã) — Alinhar campanha Perdão de Dívida com Rogério

> **CONTEXTO:** Em 15/06 o Rogério mandou áudio cobrando estratégia — a 2ª quinzena estava em **R$ 2.600** e a meta dele é **R$ 20.000** (mínimo, "pagar a despesa do mês"); esticada **R$ 40.000**. Mayko montou a campanha completa, MAS **a reunião marcada para hoje (16/06) não aconteceu — Mayko teve uma urgência e não pôde participar.** A resposta ao Rogério ainda está pendente.

**Ação imediata 17/06 cedo:**
1. **Enviar a mensagem ao Rogério** (já pronta: `processo-comercial-7dias/mensagem-rogerio-estrategia-perdao-16-06-2026.md` — versão texto + áudio) pedindo 2 decisões: (a) aprovar oferta **quitação 50% à vista**; (b) liberar **base Tenex 761** (export Lucas) + acesso Asaas.
2. **Reagendar/realizar o alinhamento** que ficou de hoje.

**Diagnóstico do caixa (print Asaas 15/06):** mês com R$ 17.660 recebidas · **R$ 8.532 em 226 boletos aguardando** · R$ 1.217 em 32 vencidas. Gap da quinzena: **R$ 17.400** até 30/06.

**Campanha JÁ CONSTRUÍDA e commitada (`master`, commits 1856089→b643702) — 4 frentes, falta só execução/config:**
| Entregável | Arquivo | Estado |
|---|---|---|
| Plano mestre (4 frentes, funil, cronograma) | `processo-comercial-7dias/campanha-perdao-divida-2quinzena-junho-2026.md` | ✅ |
| Mensagem/áudio Rogério | `processo-comercial-7dias/mensagem-rogerio-estrategia-perdao-16-06-2026.md` | ✅ pronta p/ enviar |
| Matinal 16/06 (barra meta R$20k) | `01-matinais/16-06-2026/roteiro-matinal-16-06-2026.html` | ✅ deployada |
| Criativo + 4 copies WhatsApp | `processo-comercial-7dias/criativo-perdao-divida-junho-2026.html` | ✅ deployado |
| Disparo em massa (aquecimento 50→100→150/dia) | `02-cadencias/n8n-perdao-divida-disparo-massa.json` | ✅ |
| Typebot de quitação (CPF→Asaas→Pix na hora) | `02-cadencias/typebot-quitacao-perdao-divida.json` | ✅ |
| 3 webhooks Asaas (buscar / gerar 2ª via / evento) | `02-cadencias/n8n-asaas-quitacao-{buscar,gerar-2via,evento}.json` | ✅ |
| Database Notion "Eventos Quitação" | ID `65a6dcc6c95f4e23bd14dd1798f2391a` (hub SST Clínica) | ✅ criado |
| Guia de implantação interativo (8 fases) | `02-cadencias/guia-implantacao-perdao-divida.html` | ✅ deployado |

**Falta só (não é código):** OK do Rogério · credenciais `ASAAS_API_*` + `KARINE_WHATSAPP` no n8n · trocar `SEU_N8N_URL` no Typebot · conectar integração `NOTION_TOKEN` ao database. Seguir o guia de implantação.

**Frente 4 (Marcos-CFO → Asaas):** prazo 30/06 — relatório diário de caixa ao Rogério.

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
