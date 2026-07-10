# Recursos do Login

O tema Botelho Identity preserva os fluxos nativos do Keycloak. Ele melhora a
apresentação visual, mas não força recursos que o realm não habilitou.

## Recuperação de senha

Para exibir e usar “Esqueceu sua senha?”:

1. No realm da aplicação, habilite `resetPasswordAllowed`.
2. Configure SMTP no realm.
3. Garanta que os usuários tenham e-mail válido.
4. Valide o fluxo em uma janela anônima.

Sem SMTP, o link pode até aparecer, mas o reset por e-mail não fecha o ciclo de
forma útil.

No `keycloak-gitops`, o realm `observability` já define:

```json
"resetPasswordAllowed": true
```

Se você estiver autenticando no realm `master`, habilite o mesmo recurso no
`master`, pois cada realm tem configuração própria.

## Lembrar de mim

O checkbox aparece quando o realm habilita:

```json
"rememberMe": true
```

Use com cuidado em ambientes compartilhados. Para estações locais/CRC, costuma
ser conveniente; para ambientes corporativos, alinhe com a política de sessão.

## Cadastro self-service

O link de cadastro aparece quando:

```json
"registrationAllowed": true
```

No ambiente de observabilidade, o padrão recomendado é deixar desabilitado e
provisionar usuários/grupos por código ou automação. Habilite cadastro somente
quando existir governança clara de aprovação, domínio de e-mail e permissões.

## Verificação de e-mail

Para exigir confirmação de e-mail:

```json
"verifyEmail": true
```

Também requer SMTP configurado. Sem SMTP, a experiência do usuário fica
incompleta.

## Provedores externos

O tema estiliza os botões de Identity Providers renderizados pelo Keycloak, como:

- Microsoft Entra ID;
- Google;
- GitHub;
- LDAP/AD via federação;
- outros IdPs OIDC/SAML.

Os botões só aparecem quando o IdP está configurado e habilitado no realm.

## MFA e required actions

O CSS cobre os fluxos nativos de:

- OTP;
- WebAuthn/passkeys;
- recovery codes;
- atualização de senha;
- consentimento;
- required actions.

Esses recursos continuam sendo governados pelas políticas e pelos fluxos de
autenticação do Keycloak.
