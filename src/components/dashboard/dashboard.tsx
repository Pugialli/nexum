import type { DashboardData } from "@/app/api/aluno/[slug]/dashboard/get-dashboard"
import { Habilidade } from "@/http/get-habilidades"
import { GcpLineChart } from "./gcp-line-chart"
import { HabilidadesChart } from "./habilidades-chart"
import { TestsBarChart } from "./tests-bar-chart"

interface DashboardAlunoProps extends DashboardData {
  habilidadesInfo: Habilidade[]
}

export function DashboardAluno({ provas, errosPorProva, habilidades, habilidadesInfo }: DashboardAlunoProps) {

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-4">
      <div className="min-h-0 flex-1">
        <TestsBarChart data={provas} errosPorProva={errosPorProva} habilidadesInfo={habilidadesInfo} />
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-2 gap-4">
        <GcpLineChart data={provas} />
        <HabilidadesChart habilidades={habilidades} habilidadesInfo={habilidadesInfo} />
      </div>
    </div>
  )
}