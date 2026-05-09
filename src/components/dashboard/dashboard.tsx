import type { DashboardData } from "@/app/api/aluno/[slug]/dashboard/get-dashboard"
import type { Habilidade } from "@/http/get-habilidades"
import { GcpLineChart } from "./gcp-line-chart"
import { HabilidadesChart } from "./habilidades-chart"
import { TestsBarChart } from "./tests-bar-chart"

interface DashboardAlunoProps extends DashboardData {
  habilidadesInfo: Habilidade[]
}

export function DashboardAluno({ provas, errosPorProva, habilidades, habilidadesInfo }: DashboardAlunoProps) {
  return (
    <div className="flex flex-col gap-5">
      <TestsBarChart data={provas} errosPorProva={errosPorProva} habilidadesInfo={habilidadesInfo} />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <GcpLineChart data={provas} />
        <HabilidadesChart habilidades={habilidades} habilidadesInfo={habilidadesInfo} />
      </div>
    </div>
  )
}
