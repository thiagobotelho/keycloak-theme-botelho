#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VERSION="${VERSION:-1.2.0}"
OUTPUT="$ROOT_DIR/target/rhbk-theme-botelho-$VERSION.jar"
CHECKSUM="$OUTPUT.sha256"

mkdir -p "$ROOT_DIR/target"
rm -f "$OUTPUT" "$CHECKSUM"

(
  cd "$ROOT_DIR/src/main/resources"
  jar --create --file "$OUTPUT" .
)

jar tf "$OUTPUT" | grep -q '^META-INF/keycloak-themes.json$'
jar tf "$OUTPUT" | grep -q '^theme/botelho/login/theme.properties$'
jar tf "$OUTPUT" | grep -q '^theme/botelho/login/footer.ftl$'
jar tf "$OUTPUT" | grep -q '^theme/botelho/login/resources/js/brand-1.2.0.js$'
jar tf "$OUTPUT" | grep -q '^theme/botelho/admin/theme.properties$'

(
  cd "$ROOT_DIR/target"
  sha256sum "$(basename "$OUTPUT")" > "$(basename "$CHECKSUM")"
)

echo "Artefato criado: $OUTPUT"
echo "Checksum criado: $CHECKSUM"
