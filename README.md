# Nexum

Plataforma para professores acompanharem o progresso de alunos nos estudos para o ENEM.

## Funcionalidades

### Auth
- Login com visualização de senha
- Logout
- Foto de perfil
- Editar perfil

### Professor
- Cadastrar aluno com informações básicas
- Tabela de alunos
- Tabela de provas com controle de status
- Cadastrar prova com 45 questões
- Editar prova

### Aluno
- Lista de provas disponíveis para realizar
- Cadastro de respostas no cartão resposta
- Completar cadastro após registro inicial
- Dashboard de desempenho

## Pendências

- Reset de senha via e-mail (estrutura pronta, envio não implementado)

## Stack

- **Framework:** Next.js (App Router)
- **Banco de dados:** PostgreSQL via Neon
- **ORM:** Prisma 7
- **Autenticação:** Better Auth
- **HTTP Client:** ky

## Changelog
### 0.7.1
- Correção em páginas do dashboard


### 0.7.0
- Página de assuntos com tabela de listagem, edição inline e remoção com confirmação
- Criação de assunto via sheet interceptado com optimistic update
- Rollback automático na tabela em caso de erro no delete ou edição
- `useFormState` atualizado para passar o estado no callback `onSuccess`
- Comunicação entre rota interceptada e página pai via `CustomEvent`

### 0.6.2
- Toast de sucesso e erro no fluxo de remoção de vínculo de prova (`ProvaAluno`)
- Corrigido status HTTP 204 → 200 no `DELETE /api/aluno/[slug]/prova/[id]`
- Corrigido loop de retry do `ky` que causava dupla execução do delete
- Adicionado `onDelete: Cascade` em `Resposta` → `ProvaAluno` (respostas removidas junto com o vínculo)
- UI da tabela de alunos revalidada via `router.refresh()` após remoção
- Corrigido campo `vinculada` → `realizada` na atualização do estado local do modal

### 0.6.1
- Dados do dashboard buscados do backend via server actions (`getDashboard`, `getHabilidades`)
- `params` do Next.js 15 tratado como Promise com `await` na page
- `HabilidadesChart` e `HabilidadesFullModal` recebem descrições de habilidades via props (removido hardcode)
- Dupla requisição paralelizada com `Promise.all` na page do dashboard
- Corrigido prefixo duplicado `/api/api/` na rota do dashboard
- Eixo X dos gráficos exibe `ano` da prova no lugar do número sequencial
- Corrigido corte do primeiro ponto no `GcpLineChart` (margin left ajustado)

### 0.6.0
- Funcionalidade de deletar vínculo de prova de um aluno (`ProvaAluno`)
- Modal de provas exibe todas as provas cadastradas com status de vínculo por aluno
- Server actions centralizadas em `actions.ts`

### 0.5.0
- Tabela de provas com controle de status (abrir/fechar via switch)
- `PATCH /api/prova/[id]/status` — inverte `statusProva` sem receber body
- Formulário de criação e edição de provas compartilhado (`ProvaForm`)
- Criação de prova com 45 questões fixas a partir da questão 136
- Edição de prova carrega questões existentes ordenadas por número
- Nota máxima calculada no backend: `notaMinima + Σ(qtd_dificuldade_n * peso_n)`
- Campo de nota máxima somente leitura com botão de recalcular
- Inputs de pesos e dificuldades migrados para refs (sem re-render reativo)
- Redirecionamento para tabela de provas após create/update com mensagem de sucesso
- Rotas `POST /api/prova` e `PUT /api/prova/[id]` com validação via Zod

### 0.4.2
- Correção na UI do botão de login
- Fix na tabela de alunos

### 0.4.1
- Correção de 401 na Vercel: `api-client` agora injeta cookie de sessão via hook `beforeRequest` do ky
- Cookie forwarding automático em Server Components

### 0.4.0
- Tabela de alunos com dados reais do banco
- Dashboard do aluno funcional (provas, GCP, habilidades defasadas)
- Rota `/aluno/[slug]/dashboard` — aluno acessa o próprio; professor acessa qualquer aluno
- `/aluno/dashboard` redireciona automaticamente para o dashboard do usuário logado
- `GET /api/dashboard/[slug]` retornando histórico de provas, erros e habilidades agregadas
- Cálculo do GCP por dificuldade com pesos da prova (`peso1`–`peso5`)
- `HabilidadesChart`, `GcpLineChart` e `TestsBarChart` recebem dados reais como props
- `peso5` adicionado ao schema da `Prova`

### 0.3.2
- Login migrado para `authClient.signIn.email` no client-side
- Header atualizado via `router.refresh()` após login/logout
- Tabs do header ocultadas sem usuário logado
- Query de provas disponíveis otimizada: 3 queries → 1 com filtro aninhado no Prisma

### 0.3.1
- Correção do fluxo de autenticação com Better Auth
- Senha gerenciada pelo `Account` do Better Auth (removido `passwordHash` do `User`)
- Seed atualizado para criar `Account` com senha hasheada via bcrypt
- `create-aluno` e `create-user` migrados para `auth.api.signUpEmail`
- Removidas rotas legadas: `signin-request`, `sign-out`, `api-client-server`
- Middleware corrigido para usar `request.headers`

### 0.3.0
- Migração Prisma 5 → 7 com driver adapter (`@prisma/adapter-pg`)
- Migração next-auth v4 → Better Auth (sessão por banco, sem OAuth)
- Nova tabela `Verification` para suporte futuro a reset de senha via magic link
- Remoção do Firebase

### 0.2.0
- Frontend da tabela de alunos concluído

### 0.1.9
- Cartão resposta funcional

### 0.1.8
- Autenticação funcional
- Cadastro de aluno com sheet
- Editar perfil

### 0.1.0–0.1.7
- Setup inicial do projeto
- Integração Prisma + Neon e Firebase
- Estrutura de pastas, telas de login e cartão resposta
- Fluxo de cadastro de aluno em duas etapas
- Downgrade Prisma para compatibilidade com Node 20.11.1
- Migração para Better Auth e correções de build