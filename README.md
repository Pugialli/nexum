## Nexum
Este projeto foi desenvolvido para um cliente que é professor de matemática que tem um objetivo de criar uma plataforma que consiga mostrar aos seus alunas o seu progresso nos estudos para o enem.

## Legenda
F - Frontend feito; B - Backend feito ; X - Completo

## Casos de uso para o professor
- [X] deve poder cadastrar um novo aluno com suas informações básicas
- [ ] deve poder ver o dashboard de seus alunos

## Casos de uso para o aluno
- [F] deve poder cadastrar as respostas de uma prova no cartao resposta
- [X] deve poder completar seu cadastro após o registro inicial

### Autenticação
- [F] logar (com opção de visualizar senha);
- [ ] deslogar;

### Aluno
- [ ] ⁠editar seu perfil;

## Pontos de correção antes do go-live
- A parte de autenticação ainda não está funcionando.
- As fontes estão fazendo requisições constantes e estão falhando com 404
- As chamadas de API nos formulários de cadastro e login estão comentadas para desenvolvimento do frontend.

## Versions
# 0.1.7
- Corrigidos erros de build do Prisma atualizando caminhos de importação.
- Realizado downgrade dos pacotes do Prisma para a versão `5.16.1` para garantir compatibilidade com o ambiente Node.js.

# 0.1.6
- Implementado o fluxo de cadastro de aluno em duas etapas (Frontend e Backend).
- Adicionado o `<SessionProvider>` do NextAuth para envolver o layout principal da aplicação.
- Adicionada a dependência `next-auth`.

# 0.1.5
- Melhorias de UI/UX:
  - Adicionado `cursor-pointer` para botões e radio buttons.
  - Redesenhado os radio buttons na página de cartão-resposta.
  - Adicionada funcionalidade de visualizar/ocultar senha na página de login e de completar perfil.

# 0.1.4
- Estrutura de pastas.
- Criação da tela de cadastro de aluno (frontend inicial).

# 0.1.3
- Criação das páginas de Login e Cartão-Resposta.

# 0.1.2
- Adicionado Firebase ao projeto.

# 0.1.1
- Integração do Prisma e Neon.

# 0.1.0
- Criação do projeto Next.js.

<!-- ❌ -->
