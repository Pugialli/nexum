## Nexum
Plataforma para professores acompanharem o progresso de alunos nos estudos para o ENEM.

## Status de Desenvolvimento
**Legenda:** F - Frontend | B - Backend | X - Completo

### Professor
- [X] Cadastrar aluno com informações básicas
- [ ] Dashboard de alunos

### Aluno
- [F] Cadastrar respostas no cartão resposta
- [X] Completar cadastro após registro inicial
- [F] Login (com visualização de senha)
- [ ] Editar perfil
- [ ] Logout

## Pendências
- Autenticação não funcional
- Fontes retornando 404
- Chamadas de API comentadas nos formulários

## Setup

### Requisitos
- Node.js 20.11.1
- Prisma 5.22.0

### Comandos
```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

## Changelog

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