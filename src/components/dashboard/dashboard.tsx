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
    <div className="flex flex-col gap-4">
      <div className="h-[240px]">
        <TestsBarChart data={provas} errosPorProva={errosPorProva} habilidadesInfo={habilidadesInfo} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="h-[220px]">
          <GcpLineChart data={provas} />
        </div>
        <div className="h-[220px]">
          <HabilidadesChart habilidades={habilidades} habilidadesInfo={habilidadesInfo} />
        </div>
      </div>
    </div>
  )
}