/**
 * Teste de paridade entre a implementacao TESTADA e a implementacao que RODA.
 *
 * Motivo de existir: a suite run-kill-switch-idempotencia-tests.js roda contra
 * tests/policy-core.js, mas em producao quem executa e o codigo inline dos nos
 * Code dentro dos workflows JSON. Sao duas copias. Um teste verde no policy-core
 * nao prova nada sobre o workflow.
 *
 * Este arquivo compara as duas e falha quando divergem.
 *
 * Uso: node tests/run-paridade-workflow-tests.js
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..');
const N8N = path.join(RAIZ, 'n8n');
const core = require('./policy-core');

const WORKFLOWS = {
  f1: 'sst-f1-entrada-echat.workflow.json',
  f2: 'sst-f2-consulta-cerebro.workflow.json',
  f3: 'sst-f3-politica.workflow.json',
};

function carregar(nome) {
  const p = path.join(N8N, WORKFLOWS[nome]);
  if (!fs.existsSync(p)) throw new Error(`workflow ausente: ${p}`);
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function codigoDosNos(wf) {
  return (wf.nodes || [])
    .map((n) => (n.parameters && (n.parameters.jsCode || n.parameters.functionCode)) || '')
    .join('\n');
}

function todoCodigo() {
  return Object.keys(WORKFLOWS).map((k) => codigoDosNos(carregar(k))).join('\n');
}

/** Extrai os literais de string de um `new Set([...])` chamado ALLOWLIST. */
function allowlistDoWorkflow(codigo) {
  const m = codigo.match(/ALLOWLIST\s*=\s*new Set\(\[([\s\S]*?)\]\)/);
  if (!m) return null;
  return new Set((m[1].match(/'([^']+)'/g) || []).map((s) => s.replace(/'/g, '')));
}

/** Extrai os itens do array `required = [...]`. */
function obrigatoriosDoWorkflow(codigo) {
  const m = codigo.match(/required\s*=\s*\[([\s\S]*?)\]/);
  if (!m) return null;
  return (m[1].match(/'([^']+)'/g) || []).map((s) => s.replace(/'/g, ''));
}

const OBRIGATORIOS_ESPERADOS = [
  'intent_id', 'created_at', 'actor', 'agent', 'action', 'dry_run',
  'target', 'reason', 'source_paths', 'approval', 'payload', 'expires_at',
];

const testes = [
  {
    nome: 'P1. Allowlist do no F3 e identica a do policy-core',
    run() {
      const wfSet = allowlistDoWorkflow(codigoDosNos(carregar('f3')));
      assert.ok(wfSet, 'nao encontrei ALLOWLIST no codigo do F3');
      const soNoCore = [...core.ALLOWLIST].filter((a) => !wfSet.has(a));
      const soNoWorkflow = [...wfSet].filter((a) => !core.ALLOWLIST.has(a));
      assert.deepStrictEqual(soNoCore, [], `acoes so no policy-core: ${soNoCore}`);
      assert.deepStrictEqual(soNoWorkflow, [], `acoes so no workflow: ${soNoWorkflow}`);
    },
  },
  {
    nome: 'P2. Campos obrigatorios do no F3 batem com o schema e o core',
    run() {
      const wf = obrigatoriosDoWorkflow(codigoDosNos(carregar('f3')));
      assert.ok(wf, 'nao encontrei a lista required no F3');
      assert.deepStrictEqual(wf.slice().sort(), OBRIGATORIOS_ESPERADOS.slice().sort());

      const schema = JSON.parse(
        fs.readFileSync(path.join(RAIZ, 'schemas', 'intent.schema.json'), 'utf8'),
      );
      assert.deepStrictEqual(
        schema.required.slice().sort(),
        OBRIGATORIOS_ESPERADOS.slice().sort(),
        'intent.schema.json divergiu da validacao do workflow',
      );
    },
  },
  {
    nome: 'P3. Toda regra do policy-core existe em algum workflow',
    run() {
      const codigo = todoCodigo();
      // Cada regra e representada pelo motivo que ela emite. Se o motivo nao
      // aparece em nenhum workflow, a regra existe so no teste.
      const regras = [
        'kill_switch_ativo',
        'intent_id_duplicado',
        'expires_at_vencido',
        'acao_fora_da_allowlist',
        'source_paths_ausente',
        'payload_com_dado_sensivel',
        'dry_run_false_forcado_para_true_em_L0_L1',
        'aprovacao_humana_pendente',
        'teto_diario_estourado',
      ];
      const ausentes = regras.filter((r) => !codigo.includes(r));
      assert.deepStrictEqual(
        ausentes,
        [],
        `regras testadas no policy-core mas AUSENTES dos workflows: ${ausentes.join(', ')}`,
      );
    },
  },
  {
    nome: 'P4. Webhook do F1 preserva rawBody (senao o HMAC falha sempre)',
    run() {
      const wf = carregar('f1');
      const webhook = (wf.nodes || []).find((n) => String(n.type).toLowerCase().includes('webhook'));
      assert.ok(webhook, 'nao encontrei o no Webhook no F1');
      const opts = (webhook.parameters && webhook.parameters.options) || {};
      assert.strictEqual(
        opts.rawBody,
        true,
        'options.rawBody nao esta true: o codigo cai em JSON.stringify(body), '
          + 'que nao reproduz o corpo original byte a byte, e a assinatura HMAC '
          + 'sera invalida para TODO evento legitimo da EAS',
      );
    },
  },
  {
    nome: 'P5. Nos de banco tratam falha em vez de quebrar o fluxo',
    run() {
      const semTratamento = [];
      for (const chave of Object.keys(WORKFLOWS)) {
        for (const n of carregar(chave).nodes || []) {
          if (!String(n.type).toLowerCase().includes('postgres')) continue;
          const trata = n.onError || n.continueOnFail === true || n.retryOnFail === true;
          if (!trata) semTratamento.push(`${chave}:${n.name}`);
        }
      }
      assert.deepStrictEqual(
        semTratamento,
        [],
        `nos Postgres sem onError/retryOnFail: ${semTratamento.join(', ')}`,
      );
    },
  },
  {
    nome: 'P6. Dedupe nao pode ser fail-open quando o banco devolve vazio',
    run() {
      const codigo = todoCodigo();
      // `banco.inserted === false` trata undefined como "nao duplicado".
      // Numa corrida a CTE pode retornar zero linhas e a duplicata passa.
      const fragil = /===\s*false/.test(codigo) && !/inserted\s*!==\s*true/.test(codigo);
      assert.ok(
        !fragil,
        'a decisao de duplicata usa `inserted === false`; se a query devolver '
          + 'vazio, inserted vira undefined e o item e tratado como NOVO. '
          + 'Usar `inserted !== true` (fail-closed) ou garantir retorno sempre nao vazio',
      );
    },
  },
  {
    nome: 'P7. Nenhum workflow tem caminho de envio externo',
    run() {
      const proibidos = [
        'evolution', 'chatwoot', 'graph.facebook', 'api.whatsapp',
        'sendMessage', 'ECHAT_API_TOKEN', 'ECHAT_API_BASE',
      ];
      const achados = [];
      for (const chave of Object.keys(WORKFLOWS)) {
        const bruto = fs.readFileSync(path.join(N8N, WORKFLOWS[chave]), 'utf8');
        for (const termo of proibidos) {
          if (bruto.toLowerCase().includes(termo.toLowerCase())) achados.push(`${chave}:${termo}`);
        }
      }
      assert.deepStrictEqual(achados, [], `caminho de envio externo encontrado: ${achados}`);
    },
  },
  {
    nome: 'P8. Nenhum segredo literal nos workflows',
    run() {
      const padroes = [
        /sk-[A-Za-z0-9]{16,}/,
        /Bearer\s+[A-Za-z0-9._-]{20,}/,
        /"(password|senha|token|apiKey)"\s*:\s*"[^"{]{8,}"/i,
      ];
      const achados = [];
      for (const chave of Object.keys(WORKFLOWS)) {
        const bruto = fs.readFileSync(path.join(N8N, WORKFLOWS[chave]), 'utf8');
        padroes.forEach((re, i) => {
          if (re.test(bruto)) achados.push(`${chave}:padrao${i}`);
        });
      }
      assert.deepStrictEqual(achados, [], `possivel segredo literal: ${achados}`);
    },
  },
];

let falhas = 0;
for (const t of testes) {
  try {
    t.run();
    console.log(`OK   - ${t.nome}`);
  } catch (e) {
    falhas += 1;
    console.log(`FALHA- ${t.nome}`);
    console.log(`       ${e.message.split('\n')[0]}`);
  }
}

console.log(`\n${testes.length - falhas}/${testes.length} testes de paridade passaram.`);
process.exit(falhas === 0 ? 0 : 1);
