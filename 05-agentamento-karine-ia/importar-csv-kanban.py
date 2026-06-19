#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Importa a planilha de inadimplentes da Karine (CSV) para o Kanban de Dívidas no Notion.

Pipeline destino: 🎯 Pipeline Ativa — Karine | Cobranças SST Card
  database id     : 138f7d78-0ea6-423d-babc-2f5a1fe0092b

Alinhado ao schema REAL (propriedades provisionadas via MCP em 18/06):
  Nome (title) · Telefone (phone) · CPF (text) · E-mail (email)
  Valor em Aberto (number) · Parcelas em Atraso (number)
  Origem (select) · Responsável (select) · Status (select) · Observações (text)

Uso:
  # 1. Ver o que seria importado, SEM gravar (recomendado primeiro):
  set NOTION_TOKEN=secret_xxx
  python importar-csv-kanban.py "Cobrancas-Karine.csv" --dry-run

  # 2. Importar de verdade:
  python importar-csv-kanban.py "Cobrancas-Karine.csv"

  # Opções:
  #   --db <id>        sobrescreve a database (default: a pipeline da Karine)
  #   --limit N        importa só as N primeiras linhas (teste)
  #   --no-dedupe      não pula linhas cujo CPF/Telefone já existe na pipeline
  #   --responsavel X  define o Responsável (default: Karine)
  #   --map col=Prop   força um mapeamento manual (repetível)

Dependências: pip install requests
"""
import argparse, csv, os, re, sys, unicodedata, time

try:
    import requests
except ImportError:
    sys.exit("Falta a lib 'requests'. Rode: pip install requests")

DB_DEFAULT = "138f7d78-0ea6-423d-babc-2f5a1fe0092b"
NOTION_VERSION = "2022-06-28"
API = "https://api.notion.com/v1"

# Opções válidas de Origem na pipeline (select). Inferidas por parcelas se não vier no CSV.
ORIGEM_POR_PARCELAS = {  # (min, max_incl) -> nome da opção
    (1, 2): "Tenex 1-2 parc",
    (3, 4): "Tenex 3-4 parc",
    (5, 99): "Tenex 5+ parc",
}

# ---------- normalização de texto p/ casar cabeçalhos do CSV ----------
def slug(s):
    s = unicodedata.normalize("NFKD", str(s)).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]", "", s.lower())

# sinônimos de cabeçalho -> propriedade do Notion
HEADER_ALIASES = {
    "Nome":              ["nome", "cliente", "nomecompleto", "paciente", "titular"],
    "CPF":               ["cpf", "documento", "cpfcnpj"],
    "Telefone":          ["telefone", "celular", "whatsapp", "fone", "contato", "tel"],
    "E-mail":            ["email", "e-mail", "mail"],
    "Valor em Aberto":   ["valor", "valoraberto", "valordevido", "divida", "total", "valortotal", "debito"],
    "Parcelas em Atraso":["parcelas", "parcelasatraso", "mesesatraso", "qtdparcelas", "atraso", "meses"],
    "Origem":            ["origem", "base", "sistema"],
    "Observações":       ["observacoes", "obs", "observacao", "anotacoes", "nota", "notas"],
}

def detectar_mapa(headers, manual):
    """Mapeia cabeçalhos do CSV -> propriedades Notion. manual = {csvcol: Prop}."""
    mapa = {}
    usados = set()
    slugs = [(slug(h), h) for h in headers]
    # Passada 1: match exato (slug do header == alias)
    for prop, aliases in HEADER_ALIASES.items():
        for a in aliases:
            real = next((h for s, h in slugs if s == a and h not in usados), None)
            if real:
                mapa[real] = prop; usados.add(real); break
    # Passada 2: substring (header contém o alias), só p/ props ainda não mapeadas
    for prop, aliases in HEADER_ALIASES.items():
        if prop in mapa.values(): continue
        for a in aliases:
            real = next((h for s, h in slugs if a in s and h not in usados), None)
            if real:
                mapa[real] = prop; usados.add(real); break
    # Overrides manuais ganham de tudo
    for csvcol, prop in manual.items():
        real = next((h for h in headers if slug(h) == slug(csvcol)), csvcol)
        mapa[real] = prop
    return mapa

# ---------- parsers de valor ----------
def parse_valor(v):
    if v is None: return None
    s = re.sub(r"[^\d,.-]", "", str(v)).strip()
    if not s: return None
    # formato BR: 1.234,56 -> 1234.56
    if "," in s and "." in s:
        s = s.replace(".", "").replace(",", ".")
    elif "," in s:
        s = s.replace(",", ".")
    try: return float(s)
    except ValueError: return None

def parse_int(v):
    if v is None: return None
    m = re.search(r"-?\d+", str(v))
    return int(m.group()) if m else None

def norm_tel(v):
    if not v: return None
    d = re.sub(r"\D", "", str(v))
    if not d: return None
    if not d.startswith("55"): d = "55" + d
    return "+" + d

def norm_cpf(v):
    if not v: return None
    d = re.sub(r"\D", "", str(v))
    return d or None

def infer_origem(parcelas):
    if parcelas is None: return None
    for (lo, hi), nome in ORIGEM_POR_PARCELAS.items():
        if lo <= parcelas <= hi: return nome
    return None

# ---------- Notion API ----------
def headers_notion(token):
    return {"Authorization": f"Bearer {token}", "Notion-Version": NOTION_VERSION,
            "Content-Type": "application/json"}

def buscar_chaves_existentes(token, db):
    """Retorna sets de CPFs e Telefones já presentes (p/ dedupe)."""
    cpfs, tels = set(), set()
    payload, cursor = {"page_size": 100}, None
    while True:
        if cursor: payload["start_cursor"] = cursor
        r = requests.post(f"{API}/databases/{db}/query", headers=headers_notion(token), json=payload)
        r.raise_for_status()
        d = r.json()
        for pg in d.get("results", []):
            p = pg.get("properties", {})
            cpf = (p.get("CPF", {}).get("rich_text") or [{}])
            cpf = cpf[0].get("plain_text") if cpf else None
            if cpf: cpfs.add(norm_cpf(cpf))
            tel = p.get("Telefone", {}).get("phone_number")
            if tel: tels.add(re.sub(r"\D", "", tel))
        if not d.get("has_more"): break
        cursor = d.get("next_cursor")
    return cpfs, tels

def montar_props(linha, mapa, responsavel):
    props = {}
    valor = parcelas = None
    for csvcol, prop in mapa.items():
        raw = linha.get(csvcol, "")
        if raw is None or str(raw).strip() == "": continue
        if prop == "Nome":
            props["Nome"] = {"title": [{"text": {"content": str(raw)[:200]}}]}
        elif prop == "CPF":
            c = norm_cpf(raw)
            if c: props["CPF"] = {"rich_text": [{"text": {"content": c}}]}
        elif prop == "Telefone":
            t = norm_tel(raw)
            if t: props["Telefone"] = {"phone_number": t}
        elif prop == "E-mail":
            props["E-mail"] = {"email": str(raw).strip()}
        elif prop == "Valor em Aberto":
            valor = parse_valor(raw)
            if valor is not None: props["Valor em Aberto"] = {"number": valor}
        elif prop == "Parcelas em Atraso":
            parcelas = parse_int(raw)
            if parcelas is not None: props["Parcelas em Atraso"] = {"number": parcelas}
        elif prop == "Origem":
            props["Origem"] = {"select": {"name": str(raw).strip()}}
        elif prop == "Observações":
            props["Observações"] = {"rich_text": [{"text": {"content": str(raw)[:1900]}}]}
    # defaults
    if "Origem" not in props:
        og = infer_origem(parcelas)
        if og: props["Origem"] = {"select": {"name": og}}
    props["Responsável"] = {"select": {"name": responsavel}}
    props["Status"] = {"select": {"name": "Para Contatar"}}
    return props, valor, parcelas

def criar_pagina(token, db, props):
    r = requests.post(f"{API}/pages", headers=headers_notion(token),
                      json={"parent": {"database_id": db}, "properties": props})
    if r.status_code >= 300:
        raise RuntimeError(f"{r.status_code}: {r.text[:300]}")
    return r.json().get("id")

# ---------- leitura CSV robusta ----------
def ler_csv(path):
    for enc in ("utf-8-sig", "utf-8", "latin-1"):
        try:
            with open(path, "r", encoding=enc, newline="") as f:
                sample = f.read(4096); f.seek(0)
                delim = ";" if sample.count(";") > sample.count(",") else ","
                return list(csv.DictReader(f, delimiter=delim)), enc, delim
        except UnicodeDecodeError:
            continue
    sys.exit("Não consegui ler o CSV em utf-8/latin-1.")

def main():
    ap = argparse.ArgumentParser(description="Importa CSV de inadimplentes -> Kanban Notion")
    ap.add_argument("csv", help="caminho do arquivo CSV")
    ap.add_argument("--db", default=DB_DEFAULT)
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--limit", type=int, default=0)
    ap.add_argument("--no-dedupe", action="store_true")
    ap.add_argument("--responsavel", default="Karine")
    ap.add_argument("--map", action="append", default=[], help="col=Propriedade (repetível)")
    args = ap.parse_args()

    token = os.environ.get("NOTION_TOKEN")
    if not token and not args.dry_run:
        sys.exit("Defina NOTION_TOKEN no ambiente (ou use --dry-run).")

    manual = {}
    for m in args.map:
        if "=" in m:
            c, p = m.split("=", 1); manual[c.strip()] = p.strip()

    linhas, enc, delim = ler_csv(args.csv)
    if not linhas: sys.exit("CSV vazio.")
    headers = list(linhas[0].keys())
    mapa = detectar_mapa(headers, manual)

    print(f"Arquivo : {args.csv}  (encoding {enc}, separador '{delim}', {len(linhas)} linhas)")
    print("Mapa de colunas detectado:")
    for h in headers:
        print(f"  {h!r:35s} -> {mapa.get(h, '(ignorado)')}")
    if "Nome" not in mapa.values():
        sys.exit("ERRO: nenhuma coluna foi mapeada para 'Nome'. Use --map SuaColuna=Nome")
    print()

    cpfs = tels = set()
    if not args.no_dedupe and not args.dry_run:
        print("Buscando chaves existentes p/ dedupe...")
        cpfs, tels = buscar_chaves_existentes(token, args.db)
        print(f"  {len(cpfs)} CPFs e {len(tels)} telefones já na pipeline.\n")

    criados = pulados = erros = 0
    total_valor = 0.0
    for i, linha in enumerate(linhas, 1):
        if args.limit and criados + pulados >= args.limit: break
        props, valor, parcelas = montar_props(linha, mapa, args.responsavel)
        if "Nome" not in props:
            pulados += 1; continue
        nome = props["Nome"]["title"][0]["text"]["content"]

        # dedupe
        if not args.no_dedupe and not args.dry_run:
            cpf = props.get("CPF", {}).get("rich_text", [{}])[0].get("text", {}).get("content")
            tel = re.sub(r"\D", "", props.get("Telefone", {}).get("phone_number", "") or "")
            if (cpf and norm_cpf(cpf) in cpfs) or (tel and tel in tels):
                print(f"  ↷ pula (já existe): {nome}")
                pulados += 1; continue

        if valor: total_valor += valor
        if args.dry_run:
            print(f"  [{i}] {nome:30s} | R$ {valor or 0:>8.2f} | {parcelas or '-'}p | {props.get('Origem',{}).get('select',{}).get('name','-')}")
            criados += 1
            continue
        try:
            criar_pagina(token, args.db, props)
            criados += 1
            print(f"  ✓ {nome}")
            time.sleep(0.35)  # respeita rate limit Notion (~3 req/s)
        except Exception as e:
            erros += 1
            print(f"  ✗ ERRO em {nome}: {e}")

    print("\n" + "="*50)
    modo = "DRY-RUN (nada gravado)" if args.dry_run else "IMPORTAÇÃO"
    print(f"{modo}: {criados} criados · {pulados} pulados · {erros} erros")
    print(f"Valor total em aberto somado: R$ {total_valor:,.2f}")
    if args.dry_run:
        print("\n→ Tudo certo? Rode de novo SEM --dry-run para gravar no Notion.")

if __name__ == "__main__":
    main()
