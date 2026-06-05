---
title: Campanha Pediatria 50% — Disparo WhatsApp API Oficial
tags: [sst, campanha, pediatria, whatsapp-api, #em-progresso]
criado: 2026-06-02
atualizado: 2026-06-02
---

# Campanha: Pediatria com 50% de Desconto — Amanhã 03/06

> **Objetivo:** Encher a agenda do pediatra amanhã (03/06).  
> **Canal:** WhatsApp Business API Oficial (Meta — já ativo com vídeo no BM).  
> **Oferta:** 50% de desconto na consulta pediátrica para quem tem SST Card.  
> **Janela:** Válido SOMENTE amanhã, 03/06/2026.

---

## 1. Estrutura da Campanha (3 disparos sequenciais)

```
Disparo 1 (HOJE 14h) — Vídeo + Texto de Abertura   → abre desejo
Disparo 2 (HOJE 17h) — Texto Escassez              → cria urgência
Disparo 3 (AMANHÃ 07h) — Lembrete Manhã            → converte
```

---

## 2. DISPARO 1 — Vídeo + Mensagem (Hoje 14h)

> **Mídia:** vídeo do BM do Facebook (já aprovado)  
> **Template HSM:** precisa aprovação Meta se for novo template — usar linguagem de notificação

---

### Template HSM — Disparo 1 (com vídeo)

**Nome do template sugerido:** `pediatria_desconto_card_junho`  
**Categoria:** Marketing  
**Idioma:** pt_BR

**Header:** vídeo (já existente no BM)

**Body:**
```
Oi {{1}}, tudo bem? 👋

Seu filho merece o melhor cuidado — e amanhã você pode garantir isso pela metade do preço.

🩺 *Consulta com Pediatra*
📅 Amanhã, 03/06 (vagas limitadas)
💳 50% de desconto pra quem tem SST Card

De R${{2}} por apenas R${{3}}

Quer garantir a vaga do seu filho?
```

**Footer:** `SST Clínica | Simões Filho - BA`

**Botões CTA:**
- [Resposta Rápida] ✅ Quero agendar
- [Resposta Rápida] ❓ Tenho dúvidas

---

### Variáveis para preencher no disparo:
| Variável | Valor |
|---|---|
| `{{1}}` | Nome do contato (da base) |
| `{{2}}` | Preço cheio (ex: R$80) |
| `{{3}}` | Preço com 50% (ex: R$40) |

---

## 3. DISPARO 2 — Escassez (Hoje 17h)

> **Enviar apenas para quem NÃO respondeu o Disparo 1**  
> **Tipo:** mensagem de texto simples (dentro da janela de 24h se já houve contato)

**Template HSM — Escassez:**

**Nome:** `pediatria_ultimas_vagas_junho`

**Body:**
```
{{1}}, só quero avisar antes de fechar a agenda 🗓️

Ainda tem vaga disponível pra consulta com o *pediatra amanhã* com 50% de desconto pra você que tem SST Card.

⚠️ Vagas limitadas — quando encher, acabou.

Quer confirmar agora?
```

**Botões:**
- [Resposta Rápida] ✅ Confirmar minha vaga
- [Resposta Rápida] 📞 Me liga para agendar

---

## 4. DISPARO 3 — Lembrete Manhã (Amanhã 07h)

> **Enviar para quem confirmou interesse mas não finalizou o agendamento**

**Template HSM — Lembrete:**

**Nome:** `pediatria_lembrete_amanha`

**Body:**
```
Bom dia, {{1}}! ☀️

Hoje é o dia — consulta com pediatra com 50% de desconto pra quem tem SST Card.

📍 SST Clínica
🕐 Agendar pelo número abaixo
⏳ Oferta válida apenas hoje, 03/06

Ainda tem vagas — confirma o horário?
```

**Botões:**
- [Resposta Rápida] ✅ Quero agendar agora

---

## 5. Fluxo de Resposta (atendimento humano ou bot)

Quando o contato responder "Quero agendar":

```
"Ótimo! 😊 Me fala o nome e a idade do seu filho, 
e te mando os horários disponíveis."
```

Quando o contato responder "Tenho dúvidas":

```
"Pode perguntar! O desconto de 50% é válido 
pra qualquer criança de 0 a 12 anos, 
mediante apresentação do SST Card na consulta."
```

---

## 6. Segmentação da Base

| Segmento | Ação |
|---|---|
| Base Tenex/Blingo com filhos cadastrados | Disparar todos os 3 waves |
| Contatos do grupo WhatsApp da clínica | Aviso manual (sem API) |
| Base nova — leads quentes do vídeo Meta | Disparo 1 + Disparo 2 |

**Tamanho mínimo recomendado para encher agenda:**
- Agenda com 10 vagas → precisar disparar para pelo menos 100-150 contatos (conversão esperada: 7-10%)

---

## 7. Checklist de Execução (Hoje)

- [ ] Confirmar preço cheio da consulta pediátrica com Rogério
- [ ] Confirmar quantas vagas estão disponíveis amanhã
- [ ] Submeter templates HSM no BM (pode levar 1-4h para aprovar)
- [ ] Exportar base de contatos SST Card com filtro: tem filhos / perfil família
- [ ] Testar 1 disparo piloto (10 contatos) antes do batch completo
- [ ] Designar quem responde os retornos (Karine?)
- [ ] Definir horário de corte: "agenda fechada" (ex: 18h de hoje)

---

## 8. Métricas para acompanhar

| Métrica | Meta |
|---|---|
| Taxa de abertura | >60% |
| Taxa de resposta | >15% |
| Agendamentos confirmados | Encher a agenda (meta: 10+) |
| Custo por agendamento | — |

---

---

## 9. VARIANTE — Particulares (sem SST Card)

> **Objetivo:** Mostrar o valor do SST Card para quem paga particular.  
> **Oferta:** Consulta pediátrica de R$170 por R$120 — somente para portadores do SST Card.  
> **Ângulo:** o cartão **já se paga** na primeira consulta.

---

### Estratégia da variante Particulares

> **Lógica:** Dá o desconto do SST Card ANTES de vender o cartão.  
> Quem experimenta o benefício compra o cartão com muito mais facilidade depois.  
> O gancho central: *"você ganhou o desconto mesmo sem ter o cartão"* — cria surpresa, reciprocidade e abre a porta para a venda.

---

### OPÇÃO A — Ângulo: Presente Surpresa ⭐ RECOMENDADA

**Nome do template:** `pediatria_presente_desconto_junho`

```
Oi {{1}}! 👋

Amanhã você consulta com pediatra na SST Clínica 
com o desconto de quem tem SST Card — 
mesmo sem ter o cartão. 🎁

💰 Particular: R$170
🎁 Seu desconto amanhã: R$120

R$50 de presente nosso pra você conhecer 
o benefício de perto.

📅 Só amanhã, 03/06. Vagas se esgotando.

Quer garantir o horário do seu filho?
```

**Por que funciona:**
- "mesmo sem ter o cartão" → quebra a objeção antes de existir
- "R$50 de presente nosso" → ativa reciprocidade (quem recebe um presente tende a retribuir)
- "conhecer o benefício de perto" → transparência que gera confiança

---

### OPÇÃO B — Ângulo: Acesso VIP por 1 Dia

**Nome do template:** `pediatria_vip_1dia_junho`

```
Oi {{1}}! 

Hoje a gente vai fazer algo diferente. 🎯

Amanhã, 03/06, você consulta com o pediatra 
aqui na SST Clínica pelo preço de quem 
já é cliente SST Card.

Sem precisar ter o cartão.

💰 Preço normal: R$170
✅ Seu preço amanhã: R$120

É uma forma de você ver na prática 
o que o SST Card faz pela sua família.

Quer uma vaga?
```

**Por que funciona:**
- "vou fazer algo diferente" → abre curiosidade
- "ver na prática o que o cartão faz" → posiciona a consulta como demonstração do produto, não caridade

---

### OPÇÃO C — Ângulo: Urgência + Número

**Nome do template:** `pediatria_50reais_amanha_junho`

```
{{1}}, amanhã você economiza R$50 na 
consulta do seu filho. 💰

A SST Clínica vai aplicar o desconto 
do SST Card pra você amanhã — 
mesmo que você ainda não tenha o cartão.

🩺 Pediatra | 03/06 | Vagas limitadas
De R$170 → R$120

Só amanhã. Só quem agendar agora.

Quer garantir?
```

**Por que funciona:**
- Abre direto com o número (R$50) — o cérebro registra perda antes de ler o resto
- "mesmo que você ainda não tenha o cartão" → remove fricção

---

### Follow-up após a consulta (D+1) — Oferta do Cartão

> Enviar para quem compareceu. Esse é o momento de ouro — acabou de experimentar.

```
Oi {{1}}! Tudo bem com o {{2}}? 🩺

Fico feliz que vocês vieram hoje.

Você usou o desconto SST Card na consulta 
sem ter o cartão — agora imagina ter esse 
benefício todo mês, em consultas, exames 
e muito mais.

O SST Card é R$39,90/mês.
Só na consulta de hoje já valeu. 

Quer ativar o cartão da sua família?
```

**Variáveis:** `{{1}}` = nome do pai/mãe | `{{2}}` = nome do filho

---

### Segmento alvo desta variante

- Contatos que já consultaram na clínica como particular (histórico no sistema)
- Leads do vídeo Meta que ainda não têm o cartão

---

## Observações

- Se os templates ainda não estiverem aprovados no BM até 13h, usar a janela de 24h: mandar mensagem de texto livre para quem já tem conversa aberta com a clínica nos últimos 30 dias.
- O vídeo do BM do Facebook pode ser aproveitado como header do template — isso acelera o processo pois já está na biblioteca de mídia da conta.
- Validade da oferta: comunicar "apenas amanhã" cria escassez real e evita demanda que a agenda não comporta.
