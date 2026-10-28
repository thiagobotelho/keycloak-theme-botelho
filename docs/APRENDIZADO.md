# Tema sem substituir autenticação


theme.properties define herança e recursos de CSS/JS. O tema muda apresentação; autenticação, reset de senha e MFA continuam sob controle do Keycloak. Valide teclado, foco, contraste, erro de login, recuperação e IdP em um ambiente descartável antes de promover o JAR.

## Integração com o servidor

Mantenha a instalação do servidor e a seleção do tema no projeto de implantação do Keycloak; este projeto entrega o artefato visual. Após trocar o JAR, verifique cache de recursos e o nome do tema selecionado antes de investigar autenticação. Teste a mesma versão do servidor usada no destino.
