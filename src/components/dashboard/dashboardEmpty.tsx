import { BarChart3 } from "lucide-react"

export function DashboardEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[340px] p-8 text-center gap-6">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted">
        <BarChart3 className="w-8 h-8 text-muted-foreground" />
      </div>

      <div className="flex flex-col gap-2 max-w-sm">
        <h2 className="text-lg font-medium">Seu dashboard está a caminho</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Assim que você preencher seu primeiro simulado, seus dados de desempenho aparecerão aqui.
        </p>
      </div>
    </div>
  )
}