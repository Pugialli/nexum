## Nexum
Plataforma para professores acompanharem o progresso de alunos nos estudos para o ENEM.

## Status de Desenvolvimento
**Legenda:** F - Frontend | B - Backend | X - Completo

### Auth
- [X] Login (com visualização de senha)
- [X] Logout
- [X] Foto de perfil
- [ ] Editar perfil

### Professor
- [X] Cadastrar aluno com informações básicas
- [ ] Tabela de alunos

### Aluno
- [F] Cadastrar respostas no cartão resposta
- [F] Completar cadastro após registro inicial

## Pendências
- Fontes retornando 404
- Chamadas de API comentadas nos formulários

## Changelog

### 0.1.8
- Autenticação funcional
- Cadastro de aluno com sheet

### 0.1.7
- Downgrade Prisma 7.3.0 → 5.22.0 (compatibilidade Node 20.11.1)
- Removido `@prisma/adapter-pg`
- Configurado `binaryTargets` para múltiplos ambientes
- Corrigidos erros de build

### 0.1.6
- Fluxo de cadastro de aluno em duas etapas
- Integração NextAuth

### 0.1.5
- Melhorias UI/UX (cursores, radio buttons, toggle senha)

### 0.1.4
- Estrutura de pastas e tela de cadastro

### 0.1.3
- Páginas Login e Cartão-Resposta

### 0.1.2
- Integração Firebase

### 0.1.1
- Integração Prisma + Neon

### 0.1.0
- Projeto criado