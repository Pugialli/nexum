import { loggedUser } from '@/auth/auth'
import { DashboardAluno } from '@/components/dashboard/dashboard'
import { DashboardEmptyState } from '@/components/dashboard/dashboardEmpty'
import { getDashboard } from '@/http/get-dashboard'
import { getHabilidades } from '@/http/get-habilidades'
import { notFound } from 'next/navigation'

export default async function Page() {
  const user = await loggedUser()

  const [data, habilidades] = await Promise.all([
    getDashboard(user!.slug),
    getHabilidades(),
  ])

  if (!data) notFound()

  const semProvas = !data.provas || data.provas.length === 0

  if (semProvas) {
    return (
      <>
        <header className="flex h-[52px] shrink-0 items-center border-b border-border bg-white px-7">
          <h3 className="font-heading text-[17px] font-bold text-foreground">Dashboard</h3>
        </header>
        <div className="flex flex-1 items-center justify-center p-7">
          <DashboardEmptyState />
        </div>
      </>
    )
  }

  const gcpMedio =
    data.provas.length > 0
      ? (data.provas.reduce((acc, p) => acc + p.gcp, 0) / data.provas.length)
          .toFixed(1)
          .replace('.', ',')
      : '—'
  const totalErros = Object.values(data.errosPorProva).flat().length

  return (
    <>
      {/* Page header */}
      <header className="flex h-[52px] shrink-0 items-center border-b border-border bg-white px-7">
        <h3 className="font-heading text-[17px] font-bold text-foreground">Dashboard</h3>
      </header>

      {/* Content */}
      <div className="mx-auto flex w-full max-w-[1060px] flex-col gap-5 p-7">
        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-3.5">
          <div className="relative overflow-hidden rounded-lg border border-border bg-white px-[18px] py-4">
            <div className="absolute inset-x-0 top-0 h-0.5 bg-primary" />
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.07em] text-muted-foreground">
              GCP Médio
            </p>
            <p className="font-mono text-[26px] font-semibold leading-none text-primary">
              {gcpMedio}
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              últimas {data.provas.length} {data.provas.length === 1 ? 'prova' : 'provas'}
            </p>
          </div>

          <div className="relative overflow-hidden rounded-lg border border-border bg-white px-[18px] py-4">
            <div className="absolute inset-x-0 top-0 h-0.5 bg-secondary" />
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.07em] text-muted-foreground">
              Provas Realizadas
            </p>
            <p className="font-mono text-[26px] font-semibold leading-none text-secondary">
              {data.provas.length}
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">desde o início</p>
          </div>

          <div className="relative overflow-hidden rounded-lg border border-border bg-white px-[18px] py-4">
            <div className="absolute inset-x-0 top-0 h-0.5 bg-accent" />
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.07em] text-muted-foreground">
              Erros no Caderno
            </p>
            <p className="font-mono text-[26px] font-semibold leading-none text-foreground">
              {totalErros}
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">pendentes de revisão</p>
          </div>
        </div>

        {/* Charts */}
        <DashboardAluno
          provas={data.provas}
          errosPorProva={data.errosPorProva}
          habilidades={data.habilidades}
          habilidadesInfo={habilidades}
        />
      </div>
    </>
  )
}
