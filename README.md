# Nexum
Plataforma para professores acompanharem o progresso de alunos nos estudos para o ENEM.

## Status de Desenvolvimento
**Legenda:** F - Frontend | B - Backend | X - Completo

### Auth
- [X] Login (com visualização de senha)
- [X] Logout
- [X] Foto de perfil
- [X] Editar perfil

### Professor
- [X] Cadastrar aluno com informações básicas
- [F] Tabela de alunos

### Aluno
- [X] Puxar a lista de provas disponíveis para realizar
- [X] Cadastrar respostas no cartão resposta
- [X] Completar cadastro após registro inicial
- [F] Dashboard

## Pendências
- Fontes retornando 404
- Reset de senha via email (estrutura pronta, envio não implementado)

## Changelog

### 0.3.0
- Migração Prisma 5 → 7 com driver adapter (`@prisma/adapter-pg`)
- Migração next-auth v4 → Better Auth (sessão por banco, sem OAuth)
- Remoção de tabelas não utilizadas (`Account`, `VerificationToken`)
- Nova tabela `Verification` para suporte futuro a reset de senha via magic link
- Schema limpo: `provider` atualizado para `prisma-client`, `binaryTargets` removido
- Correção de todos os erros de ESLint (`no-explicit-any`, `no-unescaped-entities`, `no-empty-object-type`, `react-hooks/purity`)
- `.eslintignore` migrado para `ignores` no `eslint.config.js`
- Remoção do Firebase (detecção de plataforma e engine manual)
- Tipagem completa nos componentes de gráfico (`CustomTooltip`, props de dados)
- `Math.random()` movido para fora de componentes React (mock data estático)
- Adicionado `"type": "module"` no `package.json`
- Adicionado `BETTER_AUTH_URL` e `BETTER_AUTH_SECRET` nas variáveis de ambiente

### 0.2.0
- Frontend da tabela de alunos concluído

### 0.1.9
- Cartão resposta funcional

### 0.1.8
- Autenticação funcional
- Cadastro de aluno com sheet
- Editar perfil

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