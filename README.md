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
- [X] Tabela de alunos
- [X] Tabela de provas com controle de status
- [X] Cadastrar prova com 45 questões
- [X] Editar prova

### Aluno
- [X] Puxar a lista de provas disponíveis para realizar
- [X] Cadastrar respostas no cartão resposta
- [X] Completar cadastro após registro inicial
- [X] Dashboard

## Pendências
- Reset de senha via email (estrutura pronta, envio não implementado)

## Changelog

### 0.6.0
- [ATUALIZAR]

### 0.5.0
- Tabela de provas com controle de status (abrir/fechar prova via switch/checkbox)
- PATCH `/api/prova/[id]/status` — inverte o `statusProva` no banco sem receber body
- Formulário de criação e edição de provas compartilhado (`ProvaForm`)
- Criação de prova com 45 questões fixas a partir da questão 136 (gabarito, dificuldade, habilidade, assunto)
- Edição de prova carrega questões existentes ordenadas por número
- Nota máxima calculada no backend: `notaMinima + Σ(qtd_dificuldade_n * peso_n)`
- Campo de nota máxima exibido como somente leitura com botão de recalcular manual
- Inputs de pesos e dificuldades migrados para refs (sem re-render reativo)
- Redirecionamento para tabela de provas após create/update com mensagem de sucesso via `searchParams`
- Rotas `POST /api/prova` e `PUT /api/prova/[id]` com validação via Zod
- Validators `provaSchema` e `questaoSchema` em `lib/validators/prova.ts`

### 0.4.2
- Correção na ui do botão de login
- Fix na tabela de alunos

### 0.4.1
- Correção de 401 na Vercel: `api-client` agora injeta o cookie de sessão via hook `beforeRequest` do ky
- Cookie forwarding automático em Server Components — funciona no servidor e é ignorado no cliente

### 0.4.0
- Tabela de alunos buscando as informações do banco
- Dashboard do aluno funcional com dados reais (provas, GCP, habilidades defasadas)
- Rota `/aluno/[slug]/dashboard` — aluno acessa o próprio, professor acessa qualquer aluno
- `/aluno/dashboard` redireciona automaticamente para o dashboard do usuário logado
- API route `GET /api/dashboard/[slug]` retornando histórico de provas, erros por prova e habilidades agregadas
- Cálculo do GCP por dificuldade: acertos ponderados pelos pesos da prova (`peso1`–`peso5`)
- Mock data removido dos charts; `HabilidadesChart`, `GcpLineChart` e `TestsBarChart` recebem dados como props
- `DifficultyLabel` centralizado em `get-dashboard.ts` — conversão de `Int` do banco para label legível
- `peso5` adicionado ao schema da `Prova` para cobrir as 5 faixas de dificuldade

### 0.3.2
- Login migrado para `authClient.signIn.email` no client-side — cookie setado diretamente pelo browser sem passar pelo Next.js
- Header atualizado para refletir estado correto após login/logout via `router.refresh()`
- `signOut` remove redirect — `router.refresh()` no client cuida do redirecionamento via middleware
- Tabs do header ocultadas quando não há usuário logado
- `Header` simplificado para receber `user` como prop em vez de buscar sessão internamente
- Correção de aspect ratio da logo no header (`height: auto`)
- Query de provas disponíveis otimizada: 3 queries → 1 query com filtro aninhado no Prisma
- Removida pendência de fontes 404

### 0.3.1
- Correção do fluxo de autenticação com Better Auth
- Login migrado para fetch direto ao endpoint do Better Auth com repasse manual de cookie
- Removido `passwordHash` do modelo `User` — senha agora gerenciada pelo `Account` do Better Auth
- Seed atualizado para criar `Account` vinculado ao `User` com senha hasheada via bcrypt
- `create-aluno` e `create-user` migrados para `auth.api.signUpEmail`
- Removidas rotas legadas: `signin-request`, `sign-out`, `api-client-server`
- Removido `crypto.ts` (token criptografado não é mais usado)
- Middleware corrigido para usar `request.headers` em vez de `next/headers`
- `auth/actions.ts` corrigido para usar `auth.api.signOut` do Better Auth
- Dashboard adicionado ao status de desenvolvimento (frontend em progresso)

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