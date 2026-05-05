import { GraduationCap, ArrowRight, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'

const INFO_ITEMS = [
  'Simulados no formato ENEM — 45 questões',
  'Dashboard de desempenho por área',
  'Caderno de erros estruturado',
  'Acompanhamento em tempo real',
]

const PROFESSOR_FEATURES = [
  'Criar e configurar simulados',
  'Abrir e fechar provas por turma',
  'Ver tabela de resultados dos alunos',
  'Analisar habilidades defasadas',
]

const ALUNO_FEATURES = [
  'Responder provas com cartão digital',
  'Acompanhar GCP e histórico de provas',
  'Revisar erros no caderno em 3 etapas',
  'Ver habilidades com maior dificuldade',
]

const BAR_DATA = [
  { h: 55, label: 'CN' },
  { h: 78, label: 'CH' },
  { h: 65, label: 'LC' },
  { h: 42, label: 'MT' },
  { h: 88, label: 'R1' },
  { h: 70, label: 'R2' },
]

function AppMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[880px] px-10 pb-16">
      <div
        className="absolute left-10 right-10 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, oklch(0.635 0.195 35 / 0.3), transparent)' }}
      />
      <div className="relative">
        {/* Browser window */}
        <div
          className="relative overflow-hidden rounded-xl"
          style={{
            background: '#0B1120',
            border: '1px solid rgba(255,255,255,0.09)',
            boxShadow:
              '0 2px 0 rgba(255,255,255,0.06) inset, 0 24px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.08)',
          }}
        >
          {/* Scan line */}
          <div
            className="pointer-events-none absolute left-0 right-0 z-10 h-0.5"
            style={{
              background: 'linear-gradient(90deg, transparent, oklch(0.635 0.195 35 / 0.35), transparent)',
              animation: 'scan-line 3.5s linear infinite',
            }}
          />

          {/* Title bar */}
          <div
            className="flex h-9 items-center gap-1.5 px-3.5"
            style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="h-2.5 w-2.5 rounded-full" style={{ background: '#ff5f57' }} />
            <div className="h-2.5 w-2.5 rounded-full" style={{ background: '#febc2e' }} />
            <div className="h-2.5 w-2.5 rounded-full" style={{ background: '#28c840' }} />
            <div
              className="mx-3.5 flex h-5 flex-1 items-center justify-center rounded text-[10px]"
              style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.22)', fontFamily: 'monospace' }}
            >
              nexum.academy/aluno/dashboard
            </div>
          </div>

          {/* App body */}
          <div className="flex" style={{ height: 420 }}>
            {/* Mini sidebar */}
            <div
              className="flex shrink-0 flex-col"
              style={{ width: 190, background: '#0B1120', borderRight: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="px-3.5 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <Image
                  src="/images/horizontal_gray_orange.svg"
                  alt="Nexum"
                  width={80}
                  height={17}
                  style={{ filter: 'brightness(10)', opacity: 0.85 }}
                />
              </div>
              <div className="flex-1 p-1.5">
                <p
                  className="px-2 pb-1 pt-2.5 text-[8px] font-semibold uppercase tracking-[0.12em]"
                  style={{ color: 'rgba(255,255,255,0.22)' }}
                >
                  Principal
                </p>
                {[
                  { label: 'Dashboard', active: true },
                  { label: 'Cartão de Resposta', active: false },
                  { label: 'Caderno de Erros', active: false },
                ].map(({ label, active }) => (
                  <div
                    key={label}
                    className="mb-px flex items-center gap-2 rounded px-2 py-1.5 text-[11px]"
                    style={{
                      background: active ? 'rgba(232,86,37,0.18)' : 'transparent',
                      color: active ? 'oklch(0.635 0.195 35)' : 'rgba(255,255,255,0.4)',
                      fontWeight: active ? 700 : 400,
                    }}
                  >
                    <div
                      className="h-3.5 w-3.5 shrink-0 rounded-sm"
                      style={{ background: 'currentColor', opacity: 0.6 }}
                    />
                    {label}
                  </div>
                ))}
              </div>
              <div
                className="flex items-center gap-2 p-2.5"
                style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white"
                  style={{ background: 'oklch(0.635 0.195 35)' }}
                >
                  AL
                </div>
                <div>
                  <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.45)' }}>Ana Lima</p>
                  <p className="text-[8px]" style={{ color: 'rgba(255,255,255,0.25)' }}>Aluno</p>
                </div>
              </div>
            </div>

            {/* Mini content */}
            <div
              className="flex flex-1 flex-col overflow-hidden"
              style={{
                backgroundColor: '#F7F9FC',
                backgroundImage: 'radial-gradient(circle, #CBD5E1 1px, transparent 1px)',
                backgroundSize: '22px 22px',
              }}
            >
              <div
                className="flex shrink-0 items-center justify-between px-5"
                style={{ height: 44, background: 'white', borderBottom: '1px solid #E2E8F0' }}
              >
                <span
                  className="text-sm font-bold"
                  style={{ fontFamily: "'Tango Sans', sans-serif", color: 'oklch(0.45 0.08 186)' }}
                >
                  Dashboard
                </span>
                <div
                  className="flex h-6 items-center rounded px-2.5 text-[10px] font-bold text-white"
                  style={{ background: 'oklch(0.635 0.195 35)' }}
                >
                  Fazer nova prova
                </div>
              </div>

              <div className="flex-1 overflow-hidden p-4">
                <div className="mb-3 grid grid-cols-3 gap-2">
                  {[
                    { label: 'GCP Médio', value: '78.4', color: 'oklch(0.635 0.195 35)', bar: 'oklch(0.635 0.195 35)' },
                    { label: 'Nº de Provas', value: '12', color: 'oklch(0.495 0.075 186)', bar: 'oklch(0.495 0.075 186)' },
                    { label: 'Erros revisados', value: '34/51', color: 'oklch(0.45 0.08 186)', bar: 'oklch(0.835 0.145 105)' },
                  ].map(({ label, value, color, bar }) => (
                    <div
                      key={label}
                      className="relative overflow-hidden rounded-lg p-2.5"
                      style={{ background: 'white', border: '1px solid #E2E8F0' }}
                    >
                      <div className="absolute inset-x-0 top-0 h-0.5" style={{ background: bar }} />
                      <p
                        className="mb-1 text-[8px] font-semibold uppercase tracking-[0.08em]"
                        style={{ color: '#94a3b8' }}
                      >
                        {label}
                      </p>
                      <p className="font-mono text-xl font-semibold leading-none" style={{ color }}>
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="rounded-lg p-2.5" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
                  <p
                    className="mb-2.5 text-[9px] font-semibold uppercase tracking-[0.06em]"
                    style={{ color: 'oklch(0.45 0.08 186)' }}
                  >
                    Desempenho por área
                  </p>
                  <div className="flex items-end gap-1" style={{ height: 64 }}>
                    {BAR_DATA.map(({ h, label }) => (
                      <div key={label} className="flex flex-1 flex-col items-center">
                        <div
                          className="w-full rounded-t-sm"
                          style={{ height: `${h}%`, background: 'oklch(0.635 0.195 35)', opacity: 0.85 }}
                        />
                        <p className="mt-1 text-[7px]" style={{ color: '#94a3b8' }}>{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating badge 1 */}
        <div
          className="absolute flex items-center gap-2.5 rounded-xl bg-white px-3 py-2"
          style={{
            bottom: -18,
            left: -20,
            border: '1px solid #E2E8F0',
            boxShadow: '0 8px 28px rgba(0,0,0,0.1)',
            animation: 'float 3.5s ease-in-out infinite',
            whiteSpace: 'nowrap',
          }}
        >
          <div
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
            style={{ background: 'oklch(0.495 0.075 186 / 0.1)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="oklch(0.495 0.075 186)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 7 13.5 15.5l-5-5L2 17" /><path d="M16 7h6v6" />
            </svg>
          </div>
          <div>
            <p className="text-[11px] font-bold" style={{ color: 'oklch(0.45 0.08 186)' }}>GCP aumentou +12 pts</p>
            <p className="mt-px text-[10px]" style={{ color: '#94a3b8' }}>Ana Lima · última semana</p>
          </div>
        </div>

        {/* Floating badge 2 */}
        <div
          className="absolute flex items-center gap-2.5 rounded-xl bg-white px-3 py-2"
          style={{
            top: 48,
            right: -22,
            border: '1px solid #E2E8F0',
            boxShadow: '0 8px 28px rgba(0,0,0,0.1)',
            animation: 'float 4.5s 1.2s ease-in-out infinite',
            whiteSpace: 'nowrap',
          }}
        >
          <div
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
            style={{ background: 'oklch(0.635 0.195 35 / 0.1)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="oklch(0.635 0.195 35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4 12 14.01l-3-3" />
            </svg>
          </div>
          <div>
            <p className="text-[11px] font-bold" style={{ color: 'oklch(0.45 0.08 186)' }}>Prova finalizada</p>
            <p className="mt-px text-[10px]" style={{ color: '#94a3b8' }}>32/45 questões certas</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LandingPage() {
  return (
    <div
      className="flex min-h-screen flex-col"
      style={{
        backgroundColor: 'var(--page-bg)',
        backgroundImage: 'var(--dot-grid)',
        backgroundSize: 'var(--dot-size)',
      }}
    >
      {/* Navbar */}
      <nav className="fixed left-0 right-0 top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-white px-4 sm:px-10">
        <Image
          src="/images/horizontal_gray_orange.svg"
          alt="Nexum Academy"
          width={90}
          height={20}
          priority
        />
        <Link
          href="/auth/login"
          className="inline-flex h-[34px] items-center rounded-md px-[18px] text-[13px] font-black text-white transition-colors hover:opacity-90"
          style={{ background: 'var(--color-primary)' }}
        >
          Entrar
        </Link>
      </nav>

      <div className="flex flex-col pt-14">
        {/* Hero */}
        <section className="mx-auto w-full max-w-[960px] px-4 pb-10 pt-[72px] text-center sm:px-10">
          <h1
            className="mb-4 text-balance"
            style={{ fontSize: 'clamp(30px, 3.5vw, 46px)', lineHeight: 1.15 }}
          >
            Bem-vindo ao{' '}
            <span style={{ color: 'var(--color-primary)' }}>Nexum Academy</span>
          </h1>
          <p
            className="mx-auto mb-10 max-w-[520px] text-base leading-[1.7]"
            style={{ color: 'oklch(0.58 0.04 186)' }}
          >
            Plataforma de simulados para o ENEM. Professores criam e acompanham provas; alunos
            respondem, revisam erros e monitoram sua evolução.
          </p>
          <Link
            href="/auth/login"
            className="inline-flex h-[42px] items-center gap-2 rounded-md px-6 text-sm font-black text-white transition-colors hover:opacity-90"
            style={{ background: 'var(--color-primary)' }}
          >
            Entrar na plataforma
            <ArrowRight size={15} />
          </Link>
        </section>

        {/* App mockup */}
        <div className="hidden sm:block">
          <AppMockup />
        </div>

        {/* Info strip */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-y border-border bg-white px-6 py-5 sm:gap-12 sm:px-10 sm:py-6">
          {INFO_ITEMS.map((text, i) => (
            <Fragment key={i}>
              <div
                className="flex items-center gap-2.5 text-[13px]"
                style={{ color: 'oklch(0.58 0.04 186)' }}
              >
                <div
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: i % 2 === 0 ? 'var(--color-primary)' : 'var(--color-secondary)' }}
                />
                {text}
              </div>
              {i < INFO_ITEMS.length - 1 && <div className="hidden h-5 w-px bg-border sm:block" />}
            </Fragment>
          ))}
        </div>

        {/* Role cards */}
        <div className="mx-auto grid w-full max-w-[960px] grid-cols-1 gap-4 px-4 pb-20 pt-10 sm:grid-cols-2 sm:px-10">
          {/* Professor */}
          <div className="flex flex-col gap-5 rounded-xl border border-border bg-white p-5 transition-shadow hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] sm:p-8">
            <div className="flex items-center gap-3.5">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px]"
                style={{ background: 'oklch(0.495 0.075 186 / 0.1)' }}
              >
                <Users size={20} style={{ color: 'var(--color-secondary)' }} />
              </div>
              <div>
                <p
                  className="mb-0.5 text-[10px] font-black uppercase tracking-[0.1em]"
                  style={{ color: 'oklch(0.58 0.04 186)' }}
                >
                  Acesso
                </p>
                <p className="font-heading text-lg font-bold">Professor</p>
              </div>
            </div>
            <p className="text-sm leading-[1.65]" style={{ color: 'oklch(0.58 0.04 186)' }}>
              Crie provas, gerencie turmas e acompanhe o desempenho de cada aluno com dados por área
              e habilidade do ENEM.
            </p>
            <div className="flex flex-col gap-2.5">
              {PROFESSOR_FEATURES.map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-[13px]">
                  <div
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: 'var(--color-secondary)' }}
                  />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Aluno */}
          <div className="flex flex-col gap-5 rounded-xl border border-border bg-white p-5 transition-shadow hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] sm:p-8">
            <div className="flex items-center gap-3.5">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px]"
                style={{ background: 'oklch(0.635 0.195 35 / 0.1)' }}
              >
                <GraduationCap size={20} style={{ color: 'var(--color-primary)' }} />
              </div>
              <div>
                <p
                  className="mb-0.5 text-[10px] font-black uppercase tracking-[0.1em]"
                  style={{ color: 'oklch(0.58 0.04 186)' }}
                >
                  Acesso
                </p>
                <p className="font-heading text-lg font-bold">Aluno</p>
              </div>
            </div>
            <p className="text-sm leading-[1.65]" style={{ color: 'oklch(0.58 0.04 186)' }}>
              Responda simulados no formato ENEM, veja seu GCP, identifique suas dificuldades e
              revise os erros de forma estruturada.
            </p>
            <div className="flex flex-col gap-2.5">
              {ALUNO_FEATURES.map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-[13px]">
                  <div
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: 'var(--color-primary)' }}
                  />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-auto flex items-center justify-between border-t border-border bg-white px-4 py-6 sm:px-10">
          <Image
            src="/images/horizontal_gray_orange.svg"
            alt="Nexum Academy"
            width={70}
            height={16}
            style={{ opacity: 0.5 }}
          />
          <p className="text-xs" style={{ color: '#94a3b8' }}>© 2026 Nexum Academy</p>
        </footer>
      </div>
    </div>
  )
}
