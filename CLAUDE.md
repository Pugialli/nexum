# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from the `nexum/` directory.

```bash
pnpm dev          # prisma generate + next dev on port 9002
pnpm build        # prisma generate + eslint --fix + next build
pnpm lint         # eslint src --fix (auto-fixes)
pnpm lint:check   # eslint src (no fix, for CI)
pnpm seed         # run prisma/seed.ts via tsx
pnpm studio       # open Prisma Studio
```

Prisma migrations:

```bash
pnpm prisma migrate dev --name <name>   # create and apply a migration
pnpm prisma migrate deploy              # apply pending migrations (prod)
pnpm prisma generate                    # regenerate client after schema changes
```

There are no automated tests. `pnpm build` is the closest thing to a CI check.

## Architecture

### Project layout

This is a Next.js 16 App Router project. The `src/app` tree has two main concerns:

- `(app)/(restricted)/` — authenticated pages, split into `aluno/` and `professor/` sub-trees
- `api/` — REST handlers that live inside the App Router (`route.ts` files)

Each feature area typically has a `route.ts` that delegates to named files (`get-x.ts`, `create-x.ts`, `update-x.ts`, `delete-x.ts`). Server actions used by pages live in co-located `actions.ts` files.

### Data layer

Prisma 7 with a pg driver adapter (`@prisma/adapter-pg`). The generated client output is `prisma/generated/` — import from `@/generated`. The singleton client is at `src/lib/prisma.ts`.

Domain/lookup tables are named with a `@` prefix in the DB (`@assuntos`, `@habilidades`, `@carreiras`) and modeled as `DomainAssuntos`, `DomainHabilidade`, `DomainCarreira`.

Key schema relationships:
- `User` → `Aluno` (1:1, `ALUNO` role) or `User` → `Professor` (1:1, `PROFESSOR` role)
- `Professor` → `Aluno[]` (one professor manages many students)
- `Prova` → `Questao[]` (45 questions, starting from question 136)
- `ProvaAluno` = join between `Prova` and `Aluno`, holds `gcp` score; unique on `(idAluno, idProva)`
- `Resposta` = answer per `(ProvaAluno, Questao)`; bad/unanswered answers automatically spawn `CadernoErro` rows
- `CadernoErro` tracks 3-step review progress per wrong answer

### Authentication

Better Auth (`src/auth.ts`) with email+password, PostgreSQL session storage. The `User` model has extra fields mapped via `user.fields` and `additionalFields`: `slug`, `role` (`PROFESSOR | ALUNO | EXALUNO`), `resetPassword`.

Auth helpers (`src/auth/auth.ts`): `requireAuth()`, `loggedUser()`, `isAuthenticated()` — all server-side, use `next/headers`.

Route protection is enforced in two places:
1. Middleware (`src/app/middleware/middleware.ts`) — redirects unauthenticated users and enforces role-based routing (`/aluno/*` ↔ `ALUNO`, `/professor/*` ↔ `PROFESSOR`)
2. Layout `(restricted)/layout.tsx` — server-side `isAuthenticated()` guard

### HTTP client

`ky` is used as the HTTP client. In Server Components, request cookies are forwarded automatically via a `beforeRequest` hook so session cookies reach the API routes.

### UI

Shadcn/ui components live in `src/components/ui/`. Custom shared components are in `src/components/`. Tailwind v4 with PostCSS. `components.json` controls Shadcn configuration.

One parallel route pattern is used in the professor section: `@sheet` slot with intercepted routes `(.)cadastro-aluno` and `(.)cadastro-assunto` render forms inside a Sheet overlay without a full navigation.

### Validation

Zod schemas are in `src/lib/validators/`. They are used in both API route handlers and forms.

### Environment variables

Required: `DATABASE_URL`, `BETTER_AUTH_URL`, `BETTER_AUTH_SECRET`.
