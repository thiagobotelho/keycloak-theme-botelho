#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VERSION="${VERSION:-1.2.5}"
OUTPUT="$ROOT_DIR/target/rhbk-theme-botelho-$VERSION.jar"
CHECKSUM="$OUTPUT.sha256"

mkdir -p "$ROOT_DIR/target"
rm -f "$OUTPUT" "$CHECKSUM"

(
  cd "$ROOT_DIR/src/main/resources"
  if command -v jar >/dev/null 2>&1; then
    jar --create --file "$OUTPUT" .
  else
    zip -qr "$OUTPUT" .
  fi
)

list_archive() {
  if command -v jar >/dev/null 2>&1; then
    jar tf "$OUTPUT"
  else
    unzip -Z1 "$OUTPUT"
  fi
}

list_archive | grep -q '^META-INF/keycloak-themes.json$'
list_archive | grep -q '^theme/botelho/login/theme.properties$'
list_archive | grep -q '^theme/botelho/login/footer.ftl$'
list_archive | grep -q '^theme/botelho/login/resources/css/brand-1.2.5.css$'
list_archive | grep -q '^theme/botelho/login/resources/js/brand-1.2.5.js$'
list_archive | grep -q '^theme/botelho/admin/theme.properties$'
list_archive | grep -q '^theme/botelho/admin/resources/css/admin-1.2.3.css$'

(
  cd "$ROOT_DIR/target"
  sha256sum "$(basename "$OUTPUT")" > "$(basename "$CHECKSUM")"
)

echo "Artefato criado: $OUTPUT"
echo "Checksum criado: $CHECKSUM"
