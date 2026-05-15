#!/usr/bin/env python3
"""
Valida CSV histórico antes de importar para o vault Obsidian.
Uso: python validar_csv.py <arquivo.csv> [--relatorio relatorio.md]
"""

import csv
import sys
import argparse
from datetime import datetime
from pathlib import Path

CAMPOS_OBRIGATORIOS = ["tipo", "status", "data_entrada"]

STATUS_VALIDOS = {
    "qualificacao", "agendado", "compareceu",
    "fechamento", "no_show", "perdido", "ativo"
}

ORIGEM_VALIDA = {
    "inbound_meta_ads", "inbound_google", "indicacao",
    "reativacao", "outbound_sdr"
}


def validar_data_iso(valor: str) -> bool:
    try:
        datetime.strptime(valor.strip(), "%Y-%m-%d")
        return True
    except ValueError:
        return False


def validar_csv(caminho_csv: str) -> dict:
    erros = []
    avisos = []
    vistos = set()
    total = 0

    with open(caminho_csv, newline="", encoding="utf-8") as f:
        leitor = csv.DictReader(f)
        cabecalho = leitor.fieldnames or []

        # Verificar campos obrigatórios no cabeçalho
        for campo in CAMPOS_OBRIGATORIOS:
            if campo not in cabecalho:
                erros.append(f"CABEÇALHO: campo obrigatório ausente — '{campo}'")

        for i, linha in enumerate(leitor, start=2):
            total += 1

            # Campos obrigatórios por linha
            for campo in CAMPOS_OBRIGATORIOS:
                if not linha.get(campo, "").strip():
                    erros.append(f"Linha {i}: campo obrigatório vazio — '{campo}'")

            # Validação de status
            status = linha.get("status", "").strip().lower()
            if status and status not in STATUS_VALIDOS:
                erros.append(
                    f"Linha {i}: status inválido '{status}' "
                    f"(válidos: {', '.join(sorted(STATUS_VALIDOS))})"
                )

            # Validação de data
            data = linha.get("data_entrada", "").strip()
            if data and not validar_data_iso(data):
                erros.append(
                    f"Linha {i}: data_entrada '{data}' não está em ISO-8601 (YYYY-MM-DD)"
                )

            # Validação de origem
            origem = linha.get("origem", "").strip().lower()
            if origem and origem not in ORIGEM_VALIDA:
                avisos.append(
                    f"Linha {i}: origem desconhecida '{origem}' "
                    f"(mapear manualmente)"
                )

            # Detecção de duplicata
            chave = (
                linha.get("nome", "").strip().lower(),
                linha.get("data_entrada", "").strip()
            )
            if chave in vistos and chave != ("", ""):
                avisos.append(f"Linha {i}: possível duplicata — {chave}")
            vistos.add(chave)

    return {
        "total_linhas": total,
        "erros": erros,
        "avisos": avisos,
        "aprovado": len(erros) == 0
    }


def gerar_relatorio_md(resultado: dict, caminho_csv: str) -> str:
    data_hoje = datetime.now().strftime("%Y-%m-%d")
    status_geral = "✅ APROVADO" if resultado["aprovado"] else "❌ REPROVADO"

    linhas = [
        f"# Relatório de Validação CSV — {data_hoje}",
        "",
        f"**Arquivo:** `{caminho_csv}`  ",
        f"**Total de linhas:** {resultado['total_linhas']}  ",
        f"**Status:** {status_geral}  ",
        f"**Erros críticos:** {len(resultado['erros'])}  ",
        f"**Avisos:** {len(resultado['avisos'])}  ",
        "",
    ]

    if resultado["erros"]:
        linhas += ["## Erros Críticos (impedem importação)", ""]
        for e in resultado["erros"]:
            linhas.append(f"- [ ] {e}")
        linhas.append("")

    if resultado["avisos"]:
        linhas += ["## Avisos (revisar antes de importar)", ""]
        for a in resultado["avisos"]:
            linhas.append(f"- [ ] {a}")
        linhas.append("")

    if resultado["aprovado"]:
        linhas += [
            "## Próximo Passo",
            "",
            "CSV válido. Execute `gerar_notas_md.py` para converter em arquivos `.md`",
            "e depositar em `00_Inbox/`.",
        ]

    return "\n".join(linhas)


def main():
    parser = argparse.ArgumentParser(description="Valida CSV para importação Obsidian")
    parser.add_argument("csv", help="Caminho do arquivo CSV")
    parser.add_argument("--relatorio", help="Salvar relatório em arquivo .md")
    args = parser.parse_args()

    if not Path(args.csv).exists():
        print(f"Erro: arquivo '{args.csv}' não encontrado.")
        sys.exit(1)

    resultado = validar_csv(args.csv)
    relatorio = gerar_relatorio_md(resultado, args.csv)

    print(relatorio)

    if args.relatorio:
        Path(args.relatorio).write_text(relatorio, encoding="utf-8")
        print(f"\nRelatório salvo em: {args.relatorio}")

    sys.exit(0 if resultado["aprovado"] else 1)


if __name__ == "__main__":
    main()
