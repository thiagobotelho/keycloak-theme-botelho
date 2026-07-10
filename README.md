# Botelho Identity Theme 1.2.2 — RHBK 26.6

Tema corporativo dark-first para **Red Hat build of Keycloak 26.6**, cobrindo Login e Admin Console sem substituir a aplicação React nativa nem os fluxos de autenticação do produto.

## Correções da versão 1.2.2

- Remove a faixa azul decorativa no topo do cartão de login.
- Melhora a apresentação das ações nativas do Keycloak:
  recuperação de senha, cadastro quando habilitado, lembrar de mim e provedores
  de identidade.
- Mantém o tema limpo: o visual agrega experiência, mas as permissões e os
  fluxos continuam controlados pelo realm.

As correções anteriores da linha 1.2 permanecem: campos com borda completa,
ícones, foco visível, contraste, seletor de tema, modo claro, Admin Console
customizada e build local com `zip/unzip` quando `jar` não está disponível.

## Escopo

- Login responsivo desktop e mobile.
- Logo, favicon e fundo próprios.
- Português do Brasil e inglês.
- Seletor de idioma quando a internacionalização do realm estiver habilitada.
- Seletor Escuro, Claro e Sistema no Login, com persistência local.
- Tratamento visual para login, cadastro, recuperação de senha, OTP, WebAuthn/passkeys, recovery codes, Identity Providers, consentimento e required actions.
- Admin Console nativa com branding consistente no masthead, navegação, tabelas, cards, formulários e modais.
- Foco visível, contraste, responsividade e redução de movimento.

## Limite funcional

Este tema altera a identidade visual e melhora a experiência dos fluxos nativos.
Ele não habilita sozinho recursos de realm. Para exibir e usar recursos como
“Esqueceu sua senha?”, cadastro, lembrar de mim, verificação de e-mail, OTP ou
Identity Providers, habilite esses recursos no realm do Keycloak.

Ele também não cria gráficos, KPIs ou novas páginas administrativas. Novas
funcionalidades exigem uma Console própria ou aplicação integrada à Admin REST
API.

## Arquitetura

- `parent=keycloak.v2` para Login e Admin.
- Sem cópia do `template.ftl` principal.
- Única extensão FreeMarker: `footer.ftl`, ponto de customização suportado pelo Login.
- JavaScript pequeno, local e sem dependências externas.
- Recursos empacotados em JAR por meio de `META-INF/keycloak-themes.json`.

## Build

```bash
./scripts/validate.sh
./scripts/build.sh
```

O build usa `jar` quando disponível. Em estações sem JDK, usa `zip/unzip` para
gerar o mesmo archive `.jar`, suficiente para distribuição de tema Keycloak.

Artefato gerado:

```text
target/rhbk-theme-botelho-1.2.2.jar
```

Também é possível usar:

```bash
mvn clean package
```

## Deploy direto

```bash
cp target/rhbk-theme-botelho-1.2.2.jar \
  /opt/keycloak/providers/rhbk-theme-botelho.jar

rm -rf /opt/keycloak/data/tmp/kc-gzip-cache
```

Reinicie o RHBK. Depois configure:

1. Realm da aplicação: `Realm settings > Themes > Login theme = botelho`.
2. Realm `master`: `Realm settings > Themes > Admin console theme = botelho`.
3. Habilite internacionalização e os locales `pt-BR` e `en`, quando necessário.
4. Habilite `Dark mode` no realm para que o Admin Console acompanhe a preferência escura do navegador.

Após a atualização, execute uma recarga forçada no navegador para descartar CSS antigo.

## Desenvolvimento local

```bash
bin/kc.sh start-dev \
  --spi-theme--static-max-age=-1 \
  --spi-theme--cache-themes=false \
  --spi-theme--cache-templates=false
```

Não mantenha essas opções em produção.

## OpenShift / Operator

A estratégia recomendada é gerar uma imagem imutável com o JAR incorporado:

```bash
podman build \
  --build-arg RHBK_IMAGE=<imagem-rhbk-26.6-homologada> \
  -f deploy/Containerfile.example \
  -t registry.example.com/identity/rhbk:26.6-botelho-1.2.2 .
```

Arquivos de apoio:

- `deploy/Containerfile.example`
- `deploy/keycloak-cr-image-patch.yaml`
- `scripts/apply-theme.sh`

## Homologação recomendada

- Usuário e senha.
- Recuperação de senha e verificação de e-mail.
- Cadastro e User Profile.
- OTP e recovery codes.
- WebAuthn/passkeys e passwordless.
- Identity Providers e account linking.
- Required actions e consentimento.
- Português, inglês, desktop e mobile.
- Modo escuro, claro e preferência do sistema.
- Admin Console no realm `master`.
- Atualização entre patches da linha RHBK 26.6.

## Recursos nativos que agregam valor

O tema está pronto para apresentar os recursos abaixo quando eles estiverem
habilitados no realm:

- Recuperação de senha: `resetPasswordAllowed=true`.
- Lembrar de mim: `rememberMe=true`.
- Login com e-mail: `loginWithEmailAllowed=true`.
- Cadastro self-service: `registrationAllowed=true`, quando fizer sentido para
  o ambiente.
- Verificação de e-mail: requer SMTP configurado e `verifyEmail=true`.
- Provedores externos: Google, Microsoft, GitHub, LDAP/AD ou outro IdP
  configurado no Keycloak.
- MFA: OTP, WebAuthn/passkeys, recovery codes e required actions.

Observação: se o login estiver no realm `master`, essas opções precisam existir
também no `master`. O tema não força links ou ações que o Keycloak não renderiza
por configuração de segurança.

Manual detalhado: [docs/RECURSOS-DE-LOGIN.md](docs/RECURSOS-DE-LOGIN.md).

## Personalização

- Login: `src/main/resources/theme/botelho/login/resources/css/brand-1.2.2.css`
- Admin: `src/main/resources/theme/botelho/admin/resources/css/admin-1.2.2.css`
- Logo: `src/main/resources/theme/botelho/*/resources/img/botelho-identity-logo.svg`
- Fundo: `src/main/resources/theme/botelho/login/resources/img/identity-wave.svg`
- Textos: `src/main/resources/theme/botelho/login/messages/`
