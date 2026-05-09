"use client"

import { Area, AreaChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"

interface ChartDataItem {
  ano: string
  gcp: number
  score: number
}

interface TooltipPayloadItem { payload: ChartDataItem }
interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipPayloadItem[]
  label?: string
}

const chartConfig = {
  gcp: { label: "GCP", color: "var(--color-secondary)" },
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div
      className="rounded-[12px] border border-border bg-white p-3"
      style={{ boxShadow: '0 4px 24px -4px rgba(15,23,42,0.12)' }}
    >
      <p className="font-heading text-[13px] font-bold" style={{ color: 'oklch(0.22 0.02 240)' }}>
        Simulado {label}
      </p>
      <div className="mt-2 flex flex-col gap-1">
        <p className="flex justify-between gap-6 font-mono text-[11px]">
          <span style={{ color: '#94a3b8' }}>GCP</span>
          <span className="font-semibold" style={{ color: 'var(--color-secondary)' }}>{d.gcp}%</span>
        </p>
        <p className="flex justify-between gap-6 font-mono text-[11px]">
          <span style={{ color: '#94a3b8' }}>Acertos</span>
          <span style={{ color: 'oklch(0.22 0.02 240)' }}>{d.score}</span>
        </p>
      </div>
    </div>
  )
}

export function GcpLineChart({ data }: { data: ChartDataItem[] }) {
  return (
    <div
      className="overflow-hidden rounded-[18px] border border-border bg-white"
      style={{ boxShadow: '0 1px 0 rgba(15,23,42,0.02)' }}
    >
      {/* Header */}
      <div className="border-b border-border px-5 py-4">
        <h3
          className="font-heading text-[15px] font-bold tracking-tight"
          style={{ color: 'oklch(0.22 0.02 240)' }}
        >
          Indicador GCP
        </h3>
        <p className="mt-0.5 text-[12px]" style={{ color: '#94a3b8' }}>
          Aproveitamento nos últimos {data.length} simulados
        </p>
      </div>

      {/* Chart */}
      <div className="px-4 pb-4 pt-2">
        <ChartContainer config={chartConfig} className="h-[170px] w-full sm:h-[190px]">
          <AreaChart data={data} accessibilityLayer margin={{ left: 16, right: 16, top: 20, bottom: 0 }}>
            <defs>
              <linearGradient id="gcpGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-secondary)" stopOpacity={0.18} />
                <stop offset="95%" stopColor="var(--color-secondary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="oklch(0.93 0.005 240)" />
            <XAxis
              dataKey="ano"
              tickLine={false}
              tickMargin={8}
              axisLine={false}
              tick={{ fontSize: 11, fontFamily: 'var(--font-mono)', fill: '#94a3b8' }}
            />
            <YAxis hide domain={[0, 100]} />
            <ChartTooltip cursor={false} content={<CustomTooltip />} />
            <Area
              dataKey="gcp"
              type="monotone"
              stroke="var(--color-secondary)"
              strokeWidth={2.5}
              fill="url(#gcpGrad)"
              dot={{
                fill: 'var(--color-secondary)',
                stroke: '#ffffff',
                strokeWidth: 2,
                r: 4,
              }}
              activeDot={{
                fill: 'var(--color-secondary)',
                stroke: '#ffffff',
                strokeWidth: 2,
                r: 5,
              }}
            >
              <LabelList
                dataKey="gcp"
                position="top"
                offset={8}
                style={{ fontSize: 11, fontFamily: 'var(--font-mono)', fill: '#94a3b8', fontWeight: 600 }}
                formatter={(v: number) => `${v}%`}
              />
            </Area>
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  )
}
