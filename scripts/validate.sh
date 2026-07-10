#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

python3 -m json.tool "$ROOT_DIR/src/main/resources/META-INF/keycloak-themes.json" >/dev/null
if command -v node >/dev/null 2>&1; then
  node --check "$ROOT_DIR/src/main/resources/theme/botelho/login/resources/js/brand-1.2.3.js"
else
  echo "[WARN] node não encontrado; validação sintática do JavaScript ignorada." >&2
fi
bash -n "$ROOT_DIR/scripts/build.sh"
bash -n "$ROOT_DIR/scripts/apply-theme.sh"

for required in \
  src/main/resources/theme/botelho/login/theme.properties \
  src/main/resources/theme/botelho/login/footer.ftl \
  src/main/resources/theme/botelho/login/resources/css/brand-1.2.3.css \
  src/main/resources/theme/botelho/login/resources/js/brand-1.2.3.js \
  src/main/resources/theme/botelho/admin/theme.properties \
  src/main/resources/theme/botelho/admin/resources/css/admin-1.2.3.css; do
  test -s "$ROOT_DIR/$required"
done

echo "Validação estática concluída com sucesso."
