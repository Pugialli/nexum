import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'

const INFO_ITEMS = [
  'Simulados no formato ENEM — 45 questões',
  'Dashboard de desempenho por área',
  'Caderno de erros estruturado',
  'Acompanhamento em tempo real',
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
              {/* Page header */}
              <div
                className="flex shrink-0 items-center justify-between px-5"
                style={{ height: 44, background: 'white', borderBottom: '1px solid #E2E8F0' }}
              >
                <span className="text-sm font-bold" style={{ fontFamily: "'Tango Sans', sans-serif", color: 'oklch(0.45 0.08 186)' }}>
                  Dashboard
                </span>
                <div className="flex h-6 items-center rounded px-2.5 text-[10px] font-bold text-white" style={{ background: 'oklch(0.635 0.195 35)' }}>
                  Fazer nova prova
                </div>
              </div>

              <div className="flex-1 overflow-hidden p-3">
                {/* Stat cards */}
                <div className="mb-2 grid grid-cols-3 gap-1.5">
                  {/* GCP Médio */}
                  <div className="relative overflow-hidden rounded-lg p-2" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
                    <div className="absolute inset-x-0 top-0 h-[2px]" style={{ background: 'oklch(0.635 0.195 35)' }} />
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="mb-0.5 text-[7px] font-semibold uppercase tracking-[0.08em]" style={{ color: '#94a3b8' }}>GCP Médio</p>
                        <p className="font-mono text-sm font-bold leading-none" style={{ color: 'oklch(0.635 0.195 35)' }}>
                          78,4 <span className="text-[7px] font-normal" style={{ color: '#94a3b8' }}>pts</span>
                        </p>
                      </div>
                      <svg width="32" height="24" viewBox="0 0 76 56" fill="none" style={{ color: 'oklch(0.635 0.195 35)', flexShrink: 0 }}>
                        <path d="M2 44 L14 36 L26 40 L38 24 L50 30 L62 14 L74 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 44 L14 36 L26 40 L38 24 L50 30 L62 14 L74 20 L74 56 L2 56 Z" fill="currentColor" fillOpacity=".1" />
                        <circle cx="74" cy="20" r="3" fill="currentColor" />
                      </svg>
                    </div>
                  </div>

                  {/* Provas realizadas */}
                  <div className="relative overflow-hidden rounded-lg p-2" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
                    <div className="absolute inset-x-0 top-0 h-[2px]" style={{ background: 'oklch(0.495 0.075 186)' }} />
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="mb-0.5 text-[7px] font-semibold uppercase tracking-[0.08em]" style={{ color: '#94a3b8' }}>Provas realizadas</p>
                        <p className="font-mono text-sm font-bold leading-none" style={{ color: 'oklch(0.495 0.075 186)' }}>
                          6 <span className="text-[7px] font-normal" style={{ color: '#94a3b8' }}>simulados</span>
                        </p>
                      </div>
                      <svg width="32" height="24" viewBox="0 0 76 56" fill="none" style={{ color: 'oklch(0.495 0.075 186)', flexShrink: 0 }}>
                        <rect x="2"  y="34" width="8" height="22" rx="2" fill="currentColor" fillOpacity=".25" />
                        <rect x="14" y="26" width="8" height="30" rx="2" fill="currentColor" fillOpacity=".4" />
                        <rect x="26" y="20" width="8" height="36" rx="2" fill="currentColor" fillOpacity=".55" />
                        <rect x="38" y="14" width="8" height="42" rx="2" fill="currentColor" fillOpacity=".7" />
                        <rect x="50" y="22" width="8" height="34" rx="2" fill="currentColor" fillOpacity=".85" />
                        <rect x="62" y="10" width="8" height="46" rx="2" fill="currentColor" />
                      </svg>
                    </div>
                  </div>

                  {/* Erros no caderno */}
                  <div className="relative overflow-hidden rounded-lg p-2" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
                    <div className="absolute inset-x-0 top-0 h-[2px]" style={{ background: 'oklch(0.465 0.155 10)' }} />
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="mb-0.5 text-[7px] font-semibold uppercase tracking-[0.08em]" style={{ color: '#94a3b8' }}>Erros no caderno</p>
                        <p className="font-mono text-sm font-bold leading-none" style={{ color: 'oklch(0.465 0.155 10)' }}>
                          23 <span className="text-[7px] font-normal" style={{ color: '#94a3b8' }}>pendentes</span>
                        </p>
                      </div>
                      <svg width="32" height="24" viewBox="0 0 76 56" fill="none" style={{ color: 'oklch(0.465 0.155 10)', flexShrink: 0 }}>
                        <circle cx="38" cy="28" r="20" fill="none" stroke="currentColor" strokeOpacity=".18" strokeWidth="6" />
                        <path d="M38 8 a 20 20 0 0 1 17.32 30" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Desempenho nos Simulados — bar chart */}
                <div className="mb-2 overflow-hidden rounded-lg" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
                  <div className="flex items-center justify-between px-2.5 py-1.5" style={{ borderBottom: '1px solid #E2E8F0' }}>
                    <div>
                      <p className="text-[9px] font-bold" style={{ color: 'oklch(0.22 0.02 240)' }}>Desempenho nos Simulados</p>
                      <p className="text-[7px]" style={{ color: '#94a3b8' }}>Acertos por simulado — clique para ver erros</p>
                    </div>
                    <span className="rounded-full px-1.5 py-0.5 text-[7px] font-semibold" style={{ color: 'oklch(0.635 0.195 35)', background: 'oklch(0.97 0.02 50)', border: '1px solid oklch(0.88 0.06 50)' }}>6 provas</span>
                  </div>
                  <div className="px-2 pb-1 pt-1">
                    <svg width="100%" height="72" viewBox="0 0 330 72" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="mBarGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="oklch(0.635 0.195 35)" stopOpacity="1" />
                          <stop offset="100%" stopColor="oklch(0.58 0.19 35)" stopOpacity="1" />
                        </linearGradient>
                      </defs>
                      <line x1="0" y1="12" x2="330" y2="12" stroke="#E2E8F0" strokeWidth="1" />
                      <line x1="0" y1="28" x2="330" y2="28" stroke="#E2E8F0" strokeWidth="1" />
                      <line x1="0" y1="44" x2="330" y2="44" stroke="#E2E8F0" strokeWidth="1" />
                      <line x1="0" y1="60" x2="330" y2="60" stroke="#E2E8F0" strokeWidth="1" />
                      {/* 2019: 28/45 */}
                      <rect x="11" y="30" width="32" height="30" rx="3" fill="url(#mBarGrad)" />
                      <text x="27" y="26" textAnchor="middle" fontSize="8" fill="#94a3b8" fontFamily="monospace">28</text>
                      <text x="27" y="70" textAnchor="middle" fontSize="7" fill="#94a3b8">2019</text>
                      {/* 2020: 31/45 */}
                      <rect x="66" y="27" width="32" height="33" rx="3" fill="url(#mBarGrad)" />
                      <text x="82" y="23" textAnchor="middle" fontSize="8" fill="#94a3b8" fontFamily="monospace">31</text>
                      <text x="82" y="70" textAnchor="middle" fontSize="7" fill="#94a3b8">2020</text>
                      {/* 2021: 33/45 */}
                      <rect x="121" y="25" width="32" height="35" rx="3" fill="url(#mBarGrad)" />
                      <text x="137" y="21" textAnchor="middle" fontSize="8" fill="#94a3b8" fontFamily="monospace">33</text>
                      <text x="137" y="70" textAnchor="middle" fontSize="7" fill="#94a3b8">2021</text>
                      {/* 2022: 30/45 */}
                      <rect x="176" y="28" width="32" height="32" rx="3" fill="url(#mBarGrad)" />
                      <text x="192" y="24" textAnchor="middle" fontSize="8" fill="#94a3b8" fontFamily="monospace">30</text>
                      <text x="192" y="70" textAnchor="middle" fontSize="7" fill="#94a3b8">2022</text>
                      {/* 2023: 34/45 */}
                      <rect x="231" y="24" width="32" height="36" rx="3" fill="url(#mBarGrad)" />
                      <text x="247" y="20" textAnchor="middle" fontSize="8" fill="#94a3b8" fontFamily="monospace">34</text>
                      <text x="247" y="70" textAnchor="middle" fontSize="7" fill="#94a3b8">2023</text>
                      {/* 2024: 38/45 */}
                      <rect x="286" y="19" width="32" height="41" rx="3" fill="url(#mBarGrad)" />
                      <text x="302" y="15" textAnchor="middle" fontSize="8" fill="#94a3b8" fontFamily="monospace">38</text>
                      <text x="302" y="70" textAnchor="middle" fontSize="7" fill="#94a3b8">2024</text>
                    </svg>
                  </div>
                </div>

                {/* 2-col: GCP line + Habilidades */}
                <div className="grid grid-cols-2 gap-1.5">
                  {/* Indicador GCP */}
                  <div className="overflow-hidden rounded-lg" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
                    <div className="px-2.5 py-1.5" style={{ borderBottom: '1px solid #E2E8F0' }}>
                      <p className="text-[9px] font-bold" style={{ color: 'oklch(0.22 0.02 240)' }}>Indicador GCP</p>
                      <p className="text-[7px]" style={{ color: '#94a3b8' }}>Últimos 6 simulados</p>
                    </div>
                    <div className="px-1.5 pb-1 pt-0.5">
                      <svg width="100%" height="72" viewBox="0 0 200 72" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="mGcpGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="oklch(0.495 0.075 186)" stopOpacity="0.18" />
                            <stop offset="95%" stopColor="oklch(0.495 0.075 186)" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <line x1="0" y1="10" x2="200" y2="10" stroke="#E2E8F0" strokeWidth="1" />
                        <line x1="0" y1="26" x2="200" y2="26" stroke="#E2E8F0" strokeWidth="1" />
                        <line x1="0" y1="42" x2="200" y2="42" stroke="#E2E8F0" strokeWidth="1" />
                        <line x1="0" y1="58" x2="200" y2="58" stroke="#E2E8F0" strokeWidth="1" />
                        <path d="M 0 32 L 40 28 L 80 26 L 120 29 L 160 24 L 200 19 L 200 58 L 0 58 Z" fill="url(#mGcpGrad)" />
                        <path d="M 0 32 L 40 28 L 80 26 L 120 29 L 160 24 L 200 19" fill="none" stroke="oklch(0.495 0.075 186)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="0"   cy="32" r="2.5" fill="oklch(0.495 0.075 186)" stroke="white" strokeWidth="1.5" />
                        <circle cx="40"  cy="28" r="2.5" fill="oklch(0.495 0.075 186)" stroke="white" strokeWidth="1.5" />
                        <circle cx="80"  cy="26" r="2.5" fill="oklch(0.495 0.075 186)" stroke="white" strokeWidth="1.5" />
                        <circle cx="120" cy="29" r="2.5" fill="oklch(0.495 0.075 186)" stroke="white" strokeWidth="1.5" />
                        <circle cx="160" cy="24" r="2.5" fill="oklch(0.495 0.075 186)" stroke="white" strokeWidth="1.5" />
                        <circle cx="200" cy="19" r="2.5" fill="oklch(0.495 0.075 186)" stroke="white" strokeWidth="1.5" />
                        <text x="0"   y="27" textAnchor="middle" fontSize="7" fill="#94a3b8" fontFamily="monospace">62%</text>
                        <text x="40"  y="23" textAnchor="middle" fontSize="7" fill="#94a3b8" fontFamily="monospace">69%</text>
                        <text x="80"  y="21" textAnchor="middle" fontSize="7" fill="#94a3b8" fontFamily="monospace">73%</text>
                        <text x="120" y="24" textAnchor="middle" fontSize="7" fill="#94a3b8" fontFamily="monospace">67%</text>
                        <text x="160" y="19" textAnchor="middle" fontSize="7" fill="#94a3b8" fontFamily="monospace">76%</text>
                        <text x="200" y="14" textAnchor="middle" fontSize="7" fill="#94a3b8" fontFamily="monospace">84%</text>
                        <text x="0"   y="70" textAnchor="middle" fontSize="6.5" fill="#94a3b8">2019</text>
                        <text x="40"  y="70" textAnchor="middle" fontSize="6.5" fill="#94a3b8">2020</text>
                        <text x="80"  y="70" textAnchor="middle" fontSize="6.5" fill="#94a3b8">2021</text>
                        <text x="120" y="70" textAnchor="middle" fontSize="6.5" fill="#94a3b8">2022</text>
                        <text x="160" y="70" textAnchor="middle" fontSize="6.5" fill="#94a3b8">2023</text>
                        <text x="200" y="70" textAnchor="middle" fontSize="6.5" fill="#94a3b8">2024</text>
                      </svg>
                    </div>
                  </div>

                  {/* Habilidades com mais erros */}
                  <div className="overflow-hidden rounded-lg" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
                    <div className="px-2.5 py-1.5" style={{ borderBottom: '1px solid #E2E8F0' }}>
                      <p className="text-[9px] font-bold" style={{ color: 'oklch(0.22 0.02 240)' }}>Habilidades com mais erros</p>
                      <p className="text-[7px]" style={{ color: '#94a3b8' }}>Top 5 habilidades</p>
                    </div>
                    <div className="flex flex-col gap-1.5 px-2.5 py-2">
                      {[
                        { h: 'H5',  v: 85 },
                        { h: 'H3',  v: 72 },
                        { h: 'H8',  v: 68 },
                        { h: 'H12', v: 61 },
                        { h: 'H2',  v: 55 },
                      ].map(({ h, v }) => (
                        <div key={h} className="flex items-center gap-1.5">
                          <span className="w-6 shrink-0 font-mono text-[7px] font-semibold" style={{ color: 'oklch(0.22 0.02 240)' }}>{h}</span>
                          <div className="h-1.5 flex-1 rounded-full" style={{ background: '#F1F5F9' }}>
                            <div className="h-1.5 rounded-full" style={{ width: `${v}%`, background: 'oklch(0.465 0.155 10)' }} />
                          </div>
                          <span className="w-5 shrink-0 text-right font-mono text-[7px]" style={{ color: '#94a3b8' }}>{v}%</span>
                        </div>
                      ))}
                    </div>
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
      className="flex min-h-screen min-w-[900px] flex-col"
      style={{
        backgroundColor: 'var(--page-bg)',
        backgroundImage: 'var(--dot-grid)',
        backgroundSize: 'var(--dot-size)',
      }}
    >
      {/* Navbar */}
      <nav className="fixed left-0 right-0 top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-white px-10">
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
        <section className="mx-auto w-full max-w-[960px] px-10 pb-10 pt-[72px] text-center">
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
        <AppMockup />

        {/* Info strip */}
        <div className="flex items-center justify-center gap-12 border-y border-border bg-white px-10 py-6">
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
              {i < INFO_ITEMS.length - 1 && <div className="h-5 w-px bg-border" />}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}
