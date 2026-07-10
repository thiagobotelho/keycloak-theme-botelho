# Botelho Identity Theme 1.2.0 — RHBK 26.6

Tema corporativo dark-first para **Red Hat build of Keycloak 26.6**, cobrindo Login e Admin Console sem substituir a aplicação React nativa nem os fluxos de autenticação do produto.

## Correções da versão 1.2.0

- Corrige a sobreposição do nome do realm sobre o logotipo no Login.
- Substitui os campos com aparência de linha inferior por controles completos, com borda, ícones, foco e contraste.
- Move idioma e preferência visual para uma área organizada dentro do cartão.
- Redimensiona o logotipo do Admin Console.
- Corrige o masthead preto e o workspace cinza padrão do modo escuro.
- Padroniza sidebar, tabelas, cards, formulários, dropdowns e modais em azul-marinho corporativo.
- Mantém modo claro disponível e usa o modo escuro como padrão visual do Login.

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

Este tema altera a identidade visual. Ele não cria gráficos, KPIs ou novas páginas administrativas. Novas funcionalidades exigem uma Console própria ou aplicação integrada à Admin REST API.

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

Artefato gerado:

```text
target/rhbk-theme-botelho-1.2.0.jar
```

Também é possível usar:

```bash
mvn clean package
```

## Deploy direto

```bash
cp target/rhbk-theme-botelho-1.2.0.jar \
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
  -t registry.example.com/identity/rhbk:26.6-botelho-1.2.0 .
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

## Personalização

- Login: `src/main/resources/theme/botelho/login/resources/css/brand-1.2.0.css`
- Admin: `src/main/resources/theme/botelho/admin/resources/css/admin-1.2.0.css`
- Logo: `src/main/resources/theme/botelho/*/resources/img/botelho-identity-logo.svg`
- Fundo: `src/main/resources/theme/botelho/login/resources/img/identity-wave.svg`
- Textos: `src/main/resources/theme/botelho/login/messages/`
