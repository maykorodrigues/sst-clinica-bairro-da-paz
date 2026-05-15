#!/usr/bin/env python3
"""
Audita YAML frontmatter de todos os .md no vault.
Detecta frontmatter ausente, campos inválidos e inconsistências de status.
Uso: python auditar_yaml.py <pasta_vault> [--pasta 02_Pipeline_Comercial]
"""

import sys
import re
import argparse
from pathlib import Path
from datetime import datetime

try:
    import yaml
    HAS_YAML = True
except ImportError:
    HAS_YAML = False

CAMPOS_POR_TIPO = {
    "lead": ["tipo", "status", "owner", "origem", "data_entrada"],
    "atendimento": ["tipo", "lead_ref", "status_atendimento", "data_atendimento"],
    "contrato_recorrente": ["tipo", "cliente_ref", "valor_mensal", "data_inicio", "status_contrato"],
}

STATUS_POR_TIPO = {
    "lead": {"qualificacao", "agendado", "compareceu", "fechamento", "no_show", "perdido", "ativo"},
    "atendimento": {"realizado", "cancelado", "no_show", "reagendado"},
    "contrato_recorrente": {"ativo", "cancelado", "inadimplente", "encerrado"},
}

REGEX_FRONTMATTER = re.compile(r"^---\n(.*?)\n---", re.DOTALL)


def extrair_frontmatter(conteudo: str) -> dict | None:
    match = REGEX_FRONTMATTER.match(conteudo)
    if not match:
        return None
    bloco = match.group(1)
    if HAS_YAML:
        try:
            return yaml.safe_load(bloco) or {}
        except yaml.YAMLError:
            return None
    # Fallback simples sem PyYAML
    resultado = {}
    for linha in bloco.splitlines():
        if ":" in linha:
            chave, _, valor = linha.partition(":")
            resultado[chave.strip()] = valor.strip()
    return resultado


def auditar_arquivo(caminho: Path) -> list[str]:
    problemas = []
    conteudo = caminho.read_text(encoding="utf-8")

    fm = extrair_frontmatter(conteudo)
    if fm is None:
        problemas.append("frontmatter ausente ou malformado")
        return problemas

    tipo = fm.get("tipo", "")
    if not tipo:
        problemas.append("campo 'tipo' ausente")
        return problemas

    campos_exigidos = CAMPOS_POR_TIPO.get(tipo, [])
    for campo in campos_exigidos:
        if campo not in fm or fm[campo] in (None, ""):
            problemas.append(f"campo obrigatório vazio: '{campo}'")

    status_validos = STATUS_POR_TIPO.get(tipo, set())
    campo_status = "status" if tipo == "lead" else (
        "status_atendimento" if tipo == "atendimento" else "status_contrato"
    )
    status_atual = str(fm.get(campo_status, "")).strip().lower()
    if status_atual and status_validos and status_atual not in status_validos:
        problemas.append(
            f"status inválido '{status_atual}' para tipo '{tipo}'"
        )

    for campo_data in ["data_entrada", "data_atendimento", "data_inicio", "data_reuniao"]:
        valor = fm.get(campo_data)
        if valor and valor != "null":
            try:
                datetime.strptime(str(valor), "%Y-%m-%d")
            except ValueError:
                problemas.append(f"data inválida em '{campo_data}': {valor}")

    return problemas


def auditar_vault(raiz: Path, subpasta: str | None) -> dict:
    alvo = raiz / subpasta if subpasta else raiz
    if not alvo.exists():
        return {"erro": f"Pasta não encontrada: {alvo}"}

    arquivos_com_erro = {}
    total = 0

    for md in sorted(alvo.rglob("*.md")):
        total += 1
        problemas = auditar_arquivo(md)
        if problemas:
            arquivos_com_erro[str(md.relative_to(raiz))] = problemas

    return {
        "total_arquivos": total,
        "arquivos_com_erro": arquivos_com_erro,
        "aprovado": len(arquivos_com_erro) == 0
    }


def gerar_relatorio(resultado: dict, raiz: str) -> str:
    data_hoje = datetime.now().strftime("%Y-%m-%d")
    status = "✅ VAULT ÍNTEGRO" if resultado.get("aprovado") else "⚠️ PROBLEMAS ENCONTRADOS"

    linhas = [
        f"# Auditoria YAML Frontmatter — {data_hoje}",
        "",
        f"**Vault:** `{raiz}`  ",
        f"**Total de arquivos:** {resultado.get('total_arquivos', 0)}  ",
        f"**Arquivos com problema:** {len(resultado.get('arquivos_com_erro', {}))}  ",
        f"**Status:** {status}  ",
        "",
    ]

    erros = resultado.get("arquivos_com_erro", {})
    if erros:
        linhas.append("## Problemas Detectados")
        linhas.append("")
        for arq, problemas in erros.items():
            linhas.append(f"### `{arq}`")
            for p in problemas:
                linhas.append(f"- [ ] {p}")
            linhas.append("")

    if resultado.get("aprovado"):
        linhas.append("Todos os arquivos possuem frontmatter válido. ✅")

    return "\n".join(linhas)


def main():
    parser = argparse.ArgumentParser(description="Audita YAML frontmatter do vault Obsidian")
    parser.add_argument("vault", help="Caminho raiz do vault Obsidian")
    parser.add_argument("--pasta", help="Auditar apenas esta subpasta (ex: 02_Pipeline_Comercial)")
    parser.add_argument("--relatorio", help="Salvar relatório em arquivo .md")
    args = parser.parse_args()

    raiz = Path(args.vault)
    if not raiz.exists():
        print(f"Erro: vault '{args.vault}' não encontrado.")
        sys.exit(1)

    resultado = auditar_vault(raiz, args.pasta)
    relatorio = gerar_relatorio(resultado, args.vault)

    print(relatorio)

    if args.relatorio:
        Path(args.relatorio).write_text(relatorio, encoding="utf-8")
        print(f"\nRelatório salvo em: {args.relatorio}")

    sys.exit(0 if resultado.get("aprovado") else 1)


if __name__ == "__main__":
    main()
