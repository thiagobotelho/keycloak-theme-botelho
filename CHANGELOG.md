# Changelog

## 1.2.3 — 2026-07-10

- Remove explicitamente o pseudo-elemento nativo do PatternFly/Keycloak que
  desenhava a faixa azul no topo do cartão de login.
- Mantém o cartão apenas com a borda corporativa discreta.
- Renomeia CSS/JS para `1.2.3` para evitar cache antigo no navegador e no
  carregamento de recursos do tema.

## 1.2.2 — 2026-07-10

- Remove a faixa azul superior do cartão de login para reduzir ruído visual.
- Destaca melhor o link nativo de recuperação de senha quando o realm permite
  `resetPasswordAllowed`.
- Melhora o bloco de cadastro self-service quando `registrationAllowed` estiver
  habilitado.
- Adiciona detecção leve via JavaScript para marcar páginas com recuperação de
  senha/cadastro sem alterar os fluxos nativos do Keycloak.
- Documenta quais recursos dependem de configuração do realm, como SMTP,
  cadastro, lembrar de mim, IdPs e MFA.

## 1.2.1 — 2026-07-10

- Reduz o espaçamento entre logotipo e cartão no login.
- Destaca a linha superior do cartão sem interferir no título.
- Centraliza o seletor de tema quando o seletor de idioma não está disponível.
- Aplica fundo e contraste próprios também no modo claro.
- Permite gerar o JAR com `zip/unzip` quando o comando `jar` não está
  disponível no ambiente local.
- Permite validação parcial sem `node`, mantendo validações de JSON, Bash e
  presença de recursos obrigatórios.

## 1.2.0 — 2026-07-10

- Corrige sobreposição do nome do realm sobre o logotipo no login.
- Reestrutura os campos do login para bordas completas, ícones, foco e contraste consistentes.
- Atualiza o login para uma experiência dark premium com modo claro opcional.
- Reposiciona seletores de idioma e tema dentro do cartão.
- Amplia e corrige o branding no masthead do Admin Console.
- Reforça os seletores e variáveis PatternFly para evitar o visual preto/cinza padrão.
- Padroniza sidebar, workspace, tabelas, cards, formulários e modais em azul-marinho corporativo.
- Mantém compatibilidade com os templates nativos do RHBK 26.6.

## 1.1.0 — 2026-07-10

- Refined login screen to match the approved centered-card visual.
- Added responsive dark-blue wave background.
- Added accessible light/dark/system selector with local persistence.
- Moved locale selection to the page utility footer.
- Added custom footer through the supported `footer.ftl` extension point.
- Improved social login layout, forms, focus indicators, mobile behavior and dark mode.
- Refined native Admin Console branding, navigation, tables, cards and controls.
- Added static validation, reproducible packaging workflow and preview assets.

## 1.0.0 — 2026-07-10

- Initial Login and Admin Console theme.
