import { DashboardAluno } from "@/components/dashboard/dashboard"
import { getDashboard } from "@/http/get-dashboard"
import { getHabilidades } from "@/http/get-habilidades"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const [data, habilidades] = await Promise.all([
    getDashboard(slug),
    getHabilidades(),
  ])

  if (!data) notFound()

  const gcpMedio =
    data.provas.length > 0
      ? (data.provas.reduce((acc, p) => acc + p.gcp, 0) / data.provas.length)
          .toFixed(1)
          .replace('.', ',')
      : '—'
  const totalErros = Object.values(data.errosPorProva).flat().length

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-6 sm:px-7 sm:py-8">
      {/* Stat cards */}
      <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="relative overflow-hidden rounded-[18px] border border-border bg-white p-5">
          <div className="absolute inset-x-0 top-0 h-[3px]" style={{ background: 'var(--color-primary)' }} />
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.14em]" style={{ color: '#94a3b8' }}>GCP Médio</p>
              <p className="font-heading text-[36px] font-extrabold leading-none tracking-tight" style={{ color: 'var(--color-primary)' }}>
                {gcpMedio}
                <small className="ml-2 font-mono text-[11px] font-semibold tracking-[0.04em]" style={{ color: '#94a3b8' }}>pontos</small>
              </p>
            </div>
            <svg className="shrink-0" width="76" height="56" viewBox="0 0 76 56" fill="none" style={{ color: 'var(--color-primary)' }}>
              <path d="M2 44 L14 36 L26 40 L38 24 L50 30 L62 14 L74 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 44 L14 36 L26 40 L38 24 L50 30 L62 14 L74 20 L74 56 L2 56 Z" fill="currentColor" fillOpacity=".1" />
              <circle cx="74" cy="20" r="3" fill="currentColor" />
            </svg>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[18px] border border-border bg-white p-5">
          <div className="absolute inset-x-0 top-0 h-[3px]" style={{ background: 'var(--color-secondary)' }} />
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.14em]" style={{ color: '#94a3b8' }}>Provas realizadas</p>
              <p className="font-heading text-[36px] font-extrabold leading-none tracking-tight" style={{ color: 'var(--color-secondary)' }}>
                {data.provas.length}
                <small className="ml-2 font-mono text-[11px] font-semibold tracking-[0.04em]" style={{ color: '#94a3b8' }}>simulados</small>
              </p>
            </div>
            <svg className="shrink-0" width="76" height="56" viewBox="0 0 76 56" fill="none" style={{ color: 'var(--color-secondary)' }}>
              <rect x="2"  y="34" width="8" height="22" rx="2" fill="currentColor" fillOpacity=".25" />
              <rect x="14" y="26" width="8" height="30" rx="2" fill="currentColor" fillOpacity=".4" />
              <rect x="26" y="20" width="8" height="36" rx="2" fill="currentColor" fillOpacity=".55" />
              <rect x="38" y="14" width="8" height="42" rx="2" fill="currentColor" fillOpacity=".7" />
              <rect x="50" y="22" width="8" height="34" rx="2" fill="currentColor" fillOpacity=".85" />
              <rect x="62" y="10" width="8" height="46" rx="2" fill="currentColor" />
            </svg>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[18px] border border-border bg-white p-5">
          <div className="absolute inset-x-0 top-0 h-[3px]" style={{ background: 'oklch(0.465 0.155 10)' }} />
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.14em]" style={{ color: '#94a3b8' }}>Erros no caderno</p>
              <p className="font-heading text-[36px] font-extrabold leading-none tracking-tight" style={{ color: 'oklch(0.465 0.155 10)' }}>
                {totalErros}
                <small className="ml-2 font-mono text-[11px] font-semibold tracking-[0.04em]" style={{ color: '#94a3b8' }}>pendentes</small>
              </p>
            </div>
            <svg className="shrink-0" width="76" height="56" viewBox="0 0 76 56" fill="none" style={{ color: 'oklch(0.465 0.155 10)' }}>
              <circle cx="38" cy="28" r="20" fill="none" stroke="currentColor" strokeOpacity=".18" strokeWidth="6" />
              <path d="M38 8 a 20 20 0 0 1 17.32 30" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      <DashboardAluno
        provas={data.provas}
        errosPorProva={data.errosPorProva}
        habilidades={data.habilidades}
        habilidadesInfo={habilidades}
      />
    </div>
  )
}
