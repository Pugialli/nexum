import { loggedUser } from '@/auth/auth'
import { getAlunos } from '@/http/get-alunos'

import { TabelaAlunos } from './tabela-alunos'

export default async function Home() {
  const user = await loggedUser()
  const alunos = user ? await getAlunos(user.slug) : []

  const alunosComGcp = alunos.filter((a) => a.gcpMedio != null && a.provas.length > 0)
  const gcpMedio =
    alunosComGcp.length > 0
      ? alunosComGcp.reduce((acc, a) => acc + (a.gcpMedio ?? 0), 0) / alunosComGcp.length
      : null
  const totalProvas = alunos.reduce((acc, a) => acc + a.provas.length, 0)

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-6 sm:px-7 sm:py-8">
      {/* Stat cards */}
      <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Total de alunos */}
        <div className="relative overflow-hidden rounded-[18px] border border-border bg-white p-5">
          <div className="absolute inset-x-0 top-0 h-[3px]" style={{ background: 'var(--color-primary)' }} />
          <div className="flex items-start justify-between gap-4">
            <div>
              <p
                className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.14em]"
                style={{ color: '#94a3b8' }}
              >
                Total de alunos
              </p>
              <p
                className="font-heading text-[36px] font-extrabold leading-none tracking-tight"
                style={{ color: 'var(--color-primary)' }}
              >
                {alunos.length}
                <small
                  className="ml-2 font-mono text-[11px] font-semibold tracking-[0.04em]"
                  style={{ color: '#94a3b8' }}
                >
                  cadastrados
                </small>
              </p>
            </div>
            <svg
              className="shrink-0"
              width="76"
              height="56"
              viewBox="0 0 76 56"
              fill="none"
              style={{ color: 'var(--color-primary)' }}
            >
              <path
                d="M2 44 L14 36 L26 40 L38 24 L50 30 L62 14 L74 20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 44 L14 36 L26 40 L38 24 L50 30 L62 14 L74 20 L74 56 L2 56 Z"
                fill="currentColor"
                fillOpacity=".1"
              />
              <circle cx="74" cy="20" r="3" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* GCP médio */}
        <div className="relative overflow-hidden rounded-[18px] border border-border bg-white p-5">
          <div className="absolute inset-x-0 top-0 h-[3px]" style={{ background: 'var(--color-secondary)' }} />
          <div className="flex items-start justify-between gap-4">
            <div>
              <p
                className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.14em]"
                style={{ color: '#94a3b8' }}
              >
                GCP médio da turma
              </p>
              <p
                className="font-heading text-[36px] font-extrabold leading-none tracking-tight"
                style={{ color: 'var(--color-secondary)' }}
              >
                {gcpMedio != null ? gcpMedio.toFixed(1).replace('.', ',') : '—'}
                {gcpMedio != null && (
                  <small
                    className="ml-2 font-mono text-[11px] font-semibold tracking-[0.04em]"
                    style={{ color: '#94a3b8' }}
                  >
                    / 100
                  </small>
                )}
              </p>
            </div>
            <svg
              className="shrink-0"
              width="76"
              height="56"
              viewBox="0 0 76 56"
              fill="none"
              style={{ color: 'var(--color-secondary)' }}
            >
              <rect x="2" y="34" width="8" height="22" rx="2" fill="currentColor" fillOpacity=".25" />
              <rect x="14" y="26" width="8" height="30" rx="2" fill="currentColor" fillOpacity=".4" />
              <rect x="26" y="20" width="8" height="36" rx="2" fill="currentColor" fillOpacity=".55" />
              <rect x="38" y="14" width="8" height="42" rx="2" fill="currentColor" fillOpacity=".7" />
              <rect x="50" y="22" width="8" height="34" rx="2" fill="currentColor" fillOpacity=".85" />
              <rect x="62" y="10" width="8" height="46" rx="2" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Provas realizadas */}
        <div className="relative overflow-hidden rounded-[18px] border border-border bg-white p-5">
          <div
            className="absolute inset-x-0 top-0 h-[3px]"
            style={{ background: 'oklch(0.465 0.155 10)' }}
          />
          <div className="flex items-start justify-between gap-4">
            <div>
              <p
                className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.14em]"
                style={{ color: '#94a3b8' }}
              >
                Provas realizadas
              </p>
              <p
                className="font-heading text-[36px] font-extrabold leading-none tracking-tight"
                style={{ color: 'oklch(0.465 0.155 10)' }}
              >
                {totalProvas}
                <small
                  className="ml-2 font-mono text-[11px] font-semibold tracking-[0.04em]"
                  style={{ color: '#94a3b8' }}
                >
                  no total
                </small>
              </p>
            </div>
            <svg
              className="shrink-0"
              width="76"
              height="56"
              viewBox="0 0 76 56"
              fill="none"
              style={{ color: 'oklch(0.465 0.155 10)' }}
            >
              <circle cx="38" cy="28" r="20" fill="none" stroke="currentColor" strokeOpacity=".18" strokeWidth="6" />
              <path
                d="M38 8 a 20 20 0 0 1 17.32 30"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <TabelaAlunos alunos={alunos} />
    </div>
  )
}
