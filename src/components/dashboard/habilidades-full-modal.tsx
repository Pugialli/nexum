'use client'

import type { HabilidadeResult } from '@/app/api/aluno/[slug]/dashboard/get-dashboard'
import {
  ChartContainer,
  ChartTooltip,
} from '@/components/ui/chart'
import {
  Dialog,
  DialogContent,
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

const MAGENTA = 'oklch(0.465 0.155 10)'

const chartConfig = {
  errorRate: {
    label: 'Erro (%)',
    color: MAGENTA,
  },
}

const CustomTooltip = ({ active, payload, skillDescriptions }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload
    const description = skillDescriptions[d.skill] ?? 'Descrição da habilidade no contexto do ENEM.'

    return (
      <div
        className="max-w-[260px] rounded-[12px] border border-border bg-white p-3"
        style={{ boxShadow: '0 4px 24px -4px rgba(15,23,42,0.12)' }}
      >
        <p className="font-heading text-[13px] font-bold" style={{ color: 'oklch(0.22 0.02 240)' }}>
          Habilidade {d.skill}
        </p>
        <p className="mt-1 text-[11.5px] italic leading-relaxed" style={{ color: '#94a3b8' }}>
          &ldquo;{description}&rdquo;
        </p>
        <div className="mt-2 border-t border-border pt-2 flex flex-col gap-1">
          <p className="flex items-center justify-between gap-4 font-mono text-[11px]">
            <span style={{ color: '#94a3b8' }}>Percentual de erro</span>
            <span className="font-semibold" style={{ color: 'var(--color-primary)' }}>{d.errorRate}%</span>
          </p>
          <p className="flex items-center justify-between gap-4 font-mono text-[11px]">
            <span style={{ color: '#94a3b8' }}>Itens errados</span>
            <span className="font-semibold" style={{ color: 'oklch(0.22 0.02 240)' }}>{d.errorCount}</span>
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
      <DialogContent className="flex max-h-[90vh] w-[calc(100%-2rem)] flex-col rounded-[18px] sm:max-w-4xl">
        <DialogHeader className="border-b border-border pb-4">
          <DialogTitle
            className="font-heading text-[18px] font-extrabold tracking-tight"
            style={{ color: 'oklch(0.22 0.02 240)' }}
          >
            Ranking Geral de Habilidades
          </DialogTitle>
          <p className="text-[13px]" style={{ color: '#94a3b8' }}>
            Desempenho detalhado em todas as habilidades do ENEM, ordenado pelo percentual de erro.
          </p>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-1 pt-4">
          <div style={{ height: `${data.length * 36 + 16}px`, minHeight: 200 }}>
            <ChartContainer config={chartConfig} className="h-full w-full">
              <BarChart
                data={data}
                layout="vertical"
                accessibilityLayer
                margin={{ left: 4, right: 52, top: 4, bottom: 4 }}
                barSize={18}
              >
                <defs>
                  <linearGradient id="errGradFull" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={MAGENTA} stopOpacity={0.7} />
                    <stop offset="100%" stopColor={MAGENTA} stopOpacity={1} />
                  </linearGradient>
                </defs>
                <CartesianGrid horizontal={false} stroke="oklch(0.93 0.005 240)" />
                <XAxis type="number" hide domain={[0, 100]} />
                <YAxis
                  dataKey="skill"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  width={36}
                  tick={{ fontSize: 11, fontFamily: 'var(--font-mono)', fill: '#94a3b8' }}
                />
                <ChartTooltip
                  cursor={{ fill: 'oklch(0.97 0.005 240)', radius: 4 }}
                  content={<CustomTooltip skillDescriptions={skillDescriptions} />}
                />
                <Bar dataKey="errorRate" fill="url(#errGradFull)" radius={[0, 4, 4, 0]}>
                  <LabelList
                    dataKey="errorRate"
                    position="right"
                    offset={8}
                    style={{ fontSize: 11, fontFamily: 'var(--font-mono)', fill: '#94a3b8', fontWeight: 600 }}
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
