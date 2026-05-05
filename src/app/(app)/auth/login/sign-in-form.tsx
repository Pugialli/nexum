'use client'

import { ArrowRight, Lock, Mail, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { authClient } from '@/auth/client'
import { Input } from '@/components/ui/input'

const BAR_HEIGHTS = [55, 78, 65, 42, 88, 70, 60, 84]

function FloatingCards() {
  return (
    <div className="relative mx-auto" style={{ width: 320, height: 280 }}>
      {/* Card 1 — GCP Médio */}
      <div
        className="absolute rounded-xl bg-white p-4"
        style={{
          top: 0,
          left: 0,
          width: 200,
          border: '1px solid #E2E8F0',
          boxShadow: '0 12px 32px rgba(15,23,42,0.08)',
          animation: 'float 4s ease-in-out infinite',
        }}
      >
        <p
          className="mb-2 text-[9px] font-semibold uppercase tracking-[0.1em]"
          style={{ color: '#94a3b8' }}
        >
          GCP Médio
        </p>
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
            style={{ background: 'oklch(0.635 0.195 35 / 0.12)' }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="oklch(0.635 0.195 35)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
            </svg>
          </div>
          <p
            className="font-mono text-2xl font-semibold leading-none"
            style={{ color: 'oklch(0.635 0.195 35)' }}
          >
            78.4
          </p>
        </div>
        <div
          className="mt-1.5 flex items-center gap-1 text-[10px]"
          style={{ color: '#94a3b8' }}
        >
          <TrendingUp size={10} style={{ color: 'oklch(0.495 0.075 186)' }} />
          <span style={{ color: 'oklch(0.495 0.075 186)', fontWeight: 600 }}>+12 pts</span>
          <span>· última semana</span>
        </div>
      </div>

      {/* Card 2 — Prova finalizada */}
      <div
        className="absolute rounded-xl bg-white p-4"
        style={{
          top: 56,
          right: 0,
          width: 185,
          border: '1px solid #E2E8F0',
          boxShadow: '0 12px 32px rgba(15,23,42,0.08)',
          animation: 'float 4.5s 0.8s ease-in-out infinite',
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
            style={{ background: 'oklch(0.495 0.075 186 / 0.12)' }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="oklch(0.495 0.075 186)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <div>
            <p className="text-[12px] font-black" style={{ color: 'oklch(0.45 0.08 186)' }}>
              Prova finalizada
            </p>
            <p className="text-[10px]" style={{ color: '#94a3b8' }}>
              32/45 questões certas
            </p>
          </div>
        </div>
      </div>

      {/* Card 3 — Barras de desempenho */}
      <div
        className="absolute rounded-xl bg-white p-4"
        style={{
          bottom: 0,
          left: 30,
          width: 220,
          border: '1px solid #E2E8F0',
          boxShadow: '0 12px 32px rgba(15,23,42,0.08)',
          animation: 'float 5s 1.5s ease-in-out infinite',
        }}
      >
        <p
          className="mb-2 text-[9px] font-semibold uppercase tracking-[0.1em]"
          style={{ color: '#94a3b8' }}
        >
          Desempenho por área
        </p>
        <div className="flex items-end gap-0.5" style={{ height: 36 }}>
          {BAR_HEIGHTS.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm"
              style={{ height: `${h}%`, background: 'oklch(0.635 0.195 35)', opacity: 0.85 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export function SignInForm() {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsPending(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')?.toString() ?? ''
    const password = formData.get('password')?.toString() ?? ''

    const { error: signInError } = await authClient.signIn.email({ email, password })

    setIsPending(false)

    if (signInError) {
      setError('Email ou senha incorretos.')
      return
    }

    router.push('/')
    router.refresh()
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* ── Lado visual (desktop only) ── */}
      <div
        className="relative hidden flex-col overflow-hidden border-r border-border lg:flex"
        style={{
          backgroundColor: 'var(--page-bg)',
          backgroundImage: 'var(--dot-grid)',
          backgroundSize: 'var(--dot-size)',
        }}
      >
        {/* Glow laranja */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 40%, oklch(0.635 0.195 35 / 0.08) 0%, transparent 65%)',
          }}
        />

        {/* Logo */}
        <div className="relative z-10 p-10">
          <Image
            src="/images/horizontal_gray_orange.svg"
            alt="Nexum Academy"
            width={110}
            height={24}
          />
        </div>

        {/* Cards flutuantes */}
        <div className="relative z-10 flex flex-1 items-center justify-center px-10 pb-10">
          <FloatingCards />
        </div>

        {/* Tagline */}
        <div className="relative z-10 px-10 pb-10">
          <h2
            className="mb-3 text-balance font-heading text-[26px] font-bold leading-[1.25]"
            style={{ color: 'oklch(0.45 0.08 186)' }}
          >
            Sua plataforma de{' '}
            <span style={{ color: 'var(--color-primary)' }}>simulados ENEM</span>
          </h2>
          <p
            className="max-w-[360px] text-sm leading-[1.6]"
            style={{ color: 'oklch(0.58 0.04 186)' }}
          >
            Acompanhe seu desempenho, revise erros e evolua a cada prova.
          </p>
        </div>
      </div>

      {/* ── Lado formulário ── */}
      <div className="flex flex-col bg-white px-6 py-8 sm:px-12">
        {/* Topo */}
        <div className="flex items-center justify-between">
          {/* Logo — visível só no mobile */}
          <div className="lg:hidden">
            <Image
              src="/images/horizontal_gray_orange.svg"
              alt="Nexum Academy"
              width={90}
              height={20}
            />
          </div>
          <div
            className="ml-auto flex items-center gap-1.5 text-[13px]"
            style={{ color: 'oklch(0.58 0.04 186)' }}
          >
            <span className="hidden sm:inline">Não tem conta?</span>
            <a
              href="mailto:contato@nexumacademy.com.br"
              className="font-black hover:underline"
              style={{ color: 'var(--color-primary)' }}
            >
              Fale com seu professor
            </a>
          </div>
        </div>

        {/* Formulário centralizado */}
        <div className="mx-auto flex w-full max-w-[400px] flex-1 flex-col justify-center py-10">
          {/* Eyebrow */}
          <div
            className="mb-4 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.1em]"
            style={{ color: 'var(--color-primary)' }}
          >
            <span
              className="inline-block h-px w-4"
              style={{ background: 'var(--color-primary)' }}
            />
            Acesso à plataforma
          </div>

          <h1
            className="mb-2.5 font-heading text-[30px] font-bold leading-[1.15]"
            style={{ color: 'oklch(0.45 0.08 186)' }}
          >
            Bem-vindo de volta
          </h1>
          <p className="mb-8 text-sm leading-[1.6]" style={{ color: 'oklch(0.58 0.04 186)' }}>
            Entre com seu e-mail e senha para continuar de onde parou.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* E-mail */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-[12px] font-black"
                style={{ color: 'oklch(0.45 0.08 186)' }}
              >
                E-mail
              </label>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="seu@email.com"
                icon={Mail}
                autoComplete="email"
                required
                aria-invalid={error ? true : undefined}
              />
            </div>

            {/* Senha */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-[12px] font-black"
                  style={{ color: 'oklch(0.45 0.08 186)' }}
                >
                  Senha
                </label>
                <a
                  href="#"
                  className="text-[12px] font-black hover:underline"
                  style={{ color: 'var(--color-primary)' }}
                >
                  Esqueci minha senha
                </a>
              </div>
              <Input
                name="password"
                id="password"
                type="password"
                placeholder="••••••••"
                icon={Lock}
                hidable
                autoComplete="current-password"
                required
                aria-invalid={error ? true : undefined}
              />
            </div>

            {error && (
              <p className="text-xs" style={{ color: 'var(--color-destructive)' }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="mt-1 flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg text-sm font-black text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              style={{ background: 'var(--color-primary)' }}
            >
              {isPending ? (
                <svg
                  className="animate-spin"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              ) : (
                <>
                  Entrar
                  <ArrowRight size={15} strokeWidth={2.5} />
                </>
              )}
            </button>
          </form>

          {/* Help box */}
          <div
            className="mt-6 flex items-start gap-2.5 rounded-lg p-3.5 text-[13px] leading-[1.5]"
            style={{
              background: 'var(--page-bg)',
              border: '1px solid var(--color-border)',
              color: 'oklch(0.58 0.04 186)',
            }}
          >
            <div
              className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full font-heading text-[11px] font-bold"
              style={{
                background: 'oklch(0.495 0.075 186 / 0.1)',
                color: 'var(--color-secondary)',
              }}
            >
              ?
            </div>
            <p>
              Problemas para entrar?{' '}
              <a
                href="mailto:contato@nexumacademy.com.br"
                className="font-black hover:underline"
                style={{ color: 'var(--color-secondary)' }}
              >
                Fale com seu professor
              </a>
              .
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs" style={{ color: '#94a3b8' }}>
          © 2026 Nexum Academy
        </p>
      </div>
    </div>
  )
}
