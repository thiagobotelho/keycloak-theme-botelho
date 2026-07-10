#!/usr/bin/env bash
set -euo pipefail

: "${KC_URL:?Informe KC_URL, por exemplo https://sso.example.com}"
: "${KC_ADMIN:?Informe KC_ADMIN}"
: "${KC_ADMIN_PASSWORD:?Informe KC_ADMIN_PASSWORD}"

REALM="${REALM:-master}"
THEME="${THEME:-botelho}"
KCADM="${KCADM:-/opt/keycloak/bin/kcadm.sh}"

"$KCADM" config credentials \
  --server "$KC_URL" \
  --realm master \
  --user "$KC_ADMIN" \
  --password "$KC_ADMIN_PASSWORD"

# The main Admin Console is controlled by the admin theme configured in the master realm.
"$KCADM" update realms/master \
  -s "adminTheme=$THEME"

# Apply the login theme and internationalization to the target realm.
"$KCADM" update "realms/$REALM" \
  -s "loginTheme=$THEME" \
  -s 'internationalizationEnabled=true' \
  -s 'supportedLocales=["pt-BR","en"]' \
  -s 'defaultLocale=pt-BR' \
  -s 'attributes.darkMode=true'

echo "Tema '$THEME' aplicado ao realm '$REALM'."
