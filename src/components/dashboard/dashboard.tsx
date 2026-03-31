import { GcpLineChart } from "./gcp-line-chart";
import { HabilidadesChart } from "./habilidades-chart";
import { TestsBarChart } from "./tests-bar-chart";

interface ChartDataItem {
  test: string
  score: number
  date: string
  gcp: number
}

export interface DashboardAlunoProps {
  alunoData: ChartDataItem[]
}

export function DashboardAluno({alunoData}: DashboardAlunoProps) {
  return (
    <div className="flex-1 min-h-0 flex flex-col gap-4">
      <div className="min-h-0 flex-1">
        <TestsBarChart data={alunoData } />
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-2 gap-4">
        <GcpLineChart data={alunoData} />
        <HabilidadesChart />
      </div>
    </div>
  )
}