#!/usr/bin/env bash
# PostToolUse hook — registra toda operação de escrita no vault em IA_Logs.json
# Configurar em .claude/settings.json:
#   "hooks": { "PostToolUse": [{ "matcher": "Write|Edit", "hooks": [{ "type": "command", "command": "bash .claude/skills/cerebro-ia-clinica-lucrativa/scripts/hook_audit_log.sh" }] }] }

VAULT_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
LOG_DIR="$VAULT_ROOT/99_Arquivo_Geral/IA_Logs"
LOG_FILE="$LOG_DIR/log_$(date +%Y-%m-%d).json"

mkdir -p "$LOG_DIR"

# Ler input JSON do stdin (fornecido pelo Claude Code)
INPUT=$(cat)

TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
TOOL=$(echo "$INPUT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('tool_name','unknown'))" 2>/dev/null || echo "unknown")
ARQUIVO=$(echo "$INPUT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('tool_input',{}).get('file_path','') or d.get('tool_input',{}).get('path',''))" 2>/dev/null || echo "")

ENTRADA="{\"ts\":\"$TIMESTAMP\",\"tool\":\"$TOOL\",\"arquivo\":\"$ARQUIVO\"}"

# Acrescentar ao array JSON do dia
if [ -f "$LOG_FILE" ]; then
    python3 -c "
import json, sys
with open('$LOG_FILE') as f:
    logs = json.load(f)
logs.append($ENTRADA)
with open('$LOG_FILE', 'w') as f:
    json.dump(logs, f, indent=2, ensure_ascii=False)
" 2>/dev/null
else
    echo "[$ENTRADA]" > "$LOG_FILE"
fi
