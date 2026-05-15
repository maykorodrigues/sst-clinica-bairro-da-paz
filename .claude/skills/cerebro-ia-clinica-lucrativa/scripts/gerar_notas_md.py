#!/usr/bin/env python3
"""
Converte CSV validado em notas .md com YAML frontmatter para o vault Obsidian.
Deposita os arquivos em 00_Inbox/ da pasta vault informada.
Uso: python gerar_notas_md.py <arquivo.csv> <pasta_vault>
"""

import csv
import sys
import argparse
import hashlib
from datetime import datetime
from pathlib import Path

MAPA_COLUNAS = {
    "tipo": "tipo",
    "status": "status",
    "owner": "owner",
    "closer": "closer",
    "origem": "origem",
    "data_entrada": "data_entrada",
    "data_reuniao": "data_reuniao",
    "valor_estimado": "valor_estimado",
    "cac_estimado": "cac_estimado",
    "ltv_historico": "ltv_historico",
}


def pseudonimizar(nome: str, data_entrada: str) -> str:
    """Gera ID determinístico pseudonimizado para proteger LGPD."""
    entrada = f"{nome.strip().lower()}|{data_entrada.strip()}"
    hash_curto = hashlib.sha256(entrada.encode()).hexdigest()[:6].upper()
    return f"ID_{hash_curto}"


def normalizar_data(valor: str) -> str:
    for fmt in ("%Y-%m-%d", "%d/%m/%Y", "%d-%m-%Y"):
        try:
            return datetime.strptime(valor.strip(), fmt).strftime("%Y-%m-%d")
        except ValueError:
            continue
    return valor.strip()


def linha_para_frontmatter(linha: dict) -> str:
    nome_original = linha.get("nome", "")
    data_entrada = normalizar_data(linha.get("data_entrada", datetime.now().strftime("%Y-%m-%d")))
    id_pseudo = pseudonimizar(nome_original, data_entrada)

    campos = {
        "tipo": linha.get("tipo", "lead").strip().lower(),
        "status": linha.get("status", "qualificacao").strip().lower(),
        "owner": linha.get("owner", "").strip(),
        "closer": linha.get("closer", "null").strip() or "null",
        "origem": linha.get("origem", "").strip().lower(),
        "data_entrada": data_entrada,
        "data_reuniao": normalizar_data(linha.get("data_reuniao", "")) or "null",
        "valor_estimado": linha.get("valor_estimado", "0.00").strip() or "0.00",
        "cac_estimado": linha.get("cac_estimado", "0.00").strip() or "0.00",
        "ltv_historico": linha.get("ltv_historico", "0.00").strip() or "0.00",
        "id_anonimo": id_pseudo,
    }

    tags = ["lead/b2c"]
    interesse = linha.get("interesse", "").strip()
    if interesse:
        tags.append(f"interesse/{interesse.lower()}")
    prioridade = linha.get("prioridade", "media").strip().lower()
    tags.append(f"prioridade/{prioridade}")

    linhas_yaml = ["---"]
    for chave, valor in campos.items():
        linhas_yaml.append(f"{chave}: {valor}")
    linhas_yaml.append("tags:")
    for tag in tags:
        linhas_yaml.append(f"  - {tag}")
    linhas_yaml.append("---")
    return "\n".join(linhas_yaml)


def nome_arquivo(linha: dict, data_entrada: str) -> str:
    nome_original = linha.get("nome", "")
    id_pseudo = pseudonimizar(nome_original, data_entrada)
    return f"LEAD - {data_entrada} - {id_pseudo}.md"


def gerar_conteudo(linha: dict, frontmatter: str) -> str:
    return f"{frontmatter}\n\n## Histórico de Contato\n\n_Importado do CSV histórico em {datetime.now().strftime('%d/%m/%Y')}._\n"


def main():
    parser = argparse.ArgumentParser(description="Converte CSV em notas Obsidian (.md)")
    parser.add_argument("csv", help="Caminho do arquivo CSV validado")
    parser.add_argument("vault", help="Caminho raiz do vault Obsidian")
    parser.add_argument("--destino", default="00_Inbox", help="Subpasta destino (padrão: 00_Inbox)")
    parser.add_argument("--dry-run", action="store_true", help="Simular sem criar arquivos")
    args = parser.parse_args()

    csv_path = Path(args.csv)
    vault_path = Path(args.vault)
    destino = vault_path / args.destino

    if not csv_path.exists():
        print(f"Erro: CSV '{args.csv}' não encontrado.")
        sys.exit(1)

    if not vault_path.exists():
        print(f"Erro: vault '{args.vault}' não encontrado.")
        sys.exit(1)

    destino.mkdir(parents=True, exist_ok=True)

    criados = 0
    pulados = 0

    with open(csv_path, newline="", encoding="utf-8") as f:
        leitor = csv.DictReader(f)
        for linha in leitor:
            data_entrada = normalizar_data(
                linha.get("data_entrada", datetime.now().strftime("%Y-%m-%d"))
            )
            arquivo_nome = nome_arquivo(linha, data_entrada)
            arquivo_destino = destino / arquivo_nome

            if arquivo_destino.exists():
                print(f"  PULADO (já existe): {arquivo_nome}")
                pulados += 1
                continue

            frontmatter = linha_para_frontmatter(linha)
            conteudo = gerar_conteudo(linha, frontmatter)

            if args.dry_run:
                print(f"  [DRY-RUN] Criaria: {arquivo_nome}")
            else:
                arquivo_destino.write_text(conteudo, encoding="utf-8")
                print(f"  CRIADO: {arquivo_nome}")

            criados += 1

    print(f"\nTotal: {criados} criados, {pulados} pulados.")
    if not args.dry_run and criados > 0:
        print(f"Arquivos depositados em: {destino}")
        print("Próximo passo: revisar no Obsidian e mover para 02_Pipeline_Comercial/")


if __name__ == "__main__":
    main()
