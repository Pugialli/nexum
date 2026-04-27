'use client'

import type { HabilidadeResult } from '@/app/api/aluno/[slug]/dashboard/get-dashboard'
import {
  ChartContainer,
  ChartTooltip,
} from '@/components/ui/chart'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts'

interface HabilidadesFullModalProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  data: HabilidadeResult[]
  skillDescriptions: Record<string, string>
}

interface TooltipPayloadItem {
  payload: HabilidadeResult
}

interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipPayloadItem[]
  skillDescriptions: Record<string, string>
}

const chartConfig = {
  errorRate: {
    label: 'Erro (%)',
    color: 'hsl(var(--destructive))',
  },
}

const CustomTooltip = ({ active, payload, skillDescriptions }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    const description = skillDescriptions[data.skill] ?? 'Descrição da habilidade no contexto do ENEM.'

    return (
      <div className="rounded-lg border bg-background p-3 text-sm shadow-sm max-w-62.5">
        <p className="mb-1 font-bold text-foreground">Habilidade {data.skill}</p>
        <p className="mb-3 text-xs text-muted-foreground leading-relaxed italic">
          &ldquo;{description}&rdquo;
        </p>
        <div className="space-y-1.5 pt-1 border-t border-border">
          <p className="flex justify-between items-center gap-4">
            <span className="text-muted-foreground">Percentual de erro:</span>
            <span className="font-bold text-destructive">{data.errorRate}%</span>
          </p>
          <p className="flex justify-between items-center gap-4">
            <span className="text-muted-foreground">Itens errados:</span>
            <span className="font-bold text-foreground">{data.errorCount}</span>
          </p>
        </div>
      </div>
    )
  }
  return null
}

export function HabilidadesFullModal({
  isOpen,
  onOpenChange,
  data,
  skillDescriptions,
}: HabilidadesFullModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">
            Ranking Geral de Habilidades
          </DialogTitle>
          <DialogDescription className="font-sans">
            Desempenho detalhado em todas as habilidades do ENEM, ordenado pelo percentual de erro.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto mt-4 pr-4">
          <div className="h-300 w-full">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <BarChart
                data={data}
                layout="vertical"
                accessibilityLayer
                margin={{ left: 10, right: 60 }}
              >
                <CartesianGrid horizontal={false} />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="skill"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  width={40}
                />
                <ChartTooltip
                  cursor={false}
                  content={<CustomTooltip skillDescriptions={skillDescriptions} />}
                />
                <Bar dataKey="errorRate" fill="var(--color-destructive)" radius={5}>
                  <LabelList
                    dataKey="errorRate"
                    position="right"
                    offset={8}
                    formatter={(value: number) => `${value}%`}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}