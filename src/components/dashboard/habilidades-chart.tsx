"use client"

import { useState } from "react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import type { HabilidadeResult } from "@/app/api/aluno/[slug]/dashboard/get-dashboard"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import type { Habilidade } from "@/http/get-habilidades"
import { HabilidadesFullModal } from "./habilidades-full-modal"

const MAGENTA = 'oklch(0.465 0.155 10)'

const chartConfig = {
  errorRate: { label: "Erro (%)", color: MAGENTA },
}

interface HabilidadesChartProps {
  habilidades: HabilidadeResult[]
  habilidadesInfo: Habilidade[]
}

interface TooltipPayloadItem { payload: HabilidadeResult }
interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipPayloadItem[]
  skillDescriptions: Record<string, string>
}

const CustomTooltip = ({ active, payload, skillDescriptions }: CustomTooltipProps) => {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  const description = skillDescriptions[d.skill] ?? 'Habilidade do ENEM.'
  return (
    <div
      className="max-w-[240px] rounded-[12px] border border-border bg-white p-3"
      style={{ boxShadow: '0 4px 24px -4px rgba(15,23,42,0.12)' }}
    >
      <p className="font-heading text-[13px] font-bold" style={{ color: 'oklch(0.22 0.02 240)' }}>
        Habilidade {d.skill}
      </p>
      <p className="mt-1 text-[11.5px] italic leading-relaxed" style={{ color: '#94a3b8' }}>
        &ldquo;{description}&rdquo;
      </p>
      <div className="mt-2 flex flex-col gap-1 border-t border-border pt-2">
        <p className="flex justify-between gap-4 font-mono text-[11px]">
          <span style={{ color: '#94a3b8' }}>Percentual de erro</span>
          <span className="font-semibold" style={{ color: MAGENTA }}>{d.errorRate}%</span>
        </p>
        <p className="flex justify-between gap-4 font-mono text-[11px]">
          <span style={{ color: '#94a3b8' }}>Itens errados</span>
          <span style={{ color: 'oklch(0.22 0.02 240)' }}>{d.errorCount}</span>
        </p>
      </div>
    </div>
  )
}

export function HabilidadesChart({ habilidades, habilidadesInfo }: HabilidadesChartProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const skillDescriptions = Object.fromEntries(
    habilidadesInfo.map((h) => [`H${h.value}`, h.descricao])
  )

  const topSkillsData = habilidades.slice(0, 5)

  return (
    <>
      <div
        className="overflow-hidden rounded-[18px] border border-border bg-white"
        style={{ boxShadow: '0 1px 0 rgba(15,23,42,0.02)' }}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border px-5 py-4">
          <div>
            <h3
              className="font-heading text-[15px] font-bold tracking-tight"
              style={{ color: 'oklch(0.22 0.02 240)' }}
            >
              Habilidades mais defasadas
            </h3>
            <p className="mt-0.5 text-[12px]" style={{ color: '#94a3b8' }}>
              Top 5 com maior percentual de erro
            </p>
          </div>

          {/* Ver todos */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex h-7 items-center gap-1.5 rounded-full px-3 font-mono text-[10.5px] font-semibold text-white transition-all hover:opacity-90"
            style={{
              background: 'linear-gradient(180deg, var(--color-primary) 0%, oklch(0.58 0.19 35) 100%)',
              boxShadow: '0 4px 12px -4px var(--color-primary)',
            }}
          >
            Ver todos
          </button>
        </div>

        {/* Chart */}
        <div className="px-4 pb-4 pt-2">
          <ChartContainer config={chartConfig} className="h-[170px] w-full sm:h-[190px]">
            <BarChart
              data={topSkillsData}
              layout="vertical"
              accessibilityLayer
              margin={{ left: 4, right: 44, top: 4, bottom: 4 }}
            >
              <defs>
                <linearGradient id="errGrad" x1="0" y1="0" x2="1" y2="0">
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
                width={32}
                tick={{ fontSize: 11, fontFamily: 'var(--font-mono)', fill: '#94a3b8' }}
              />
              <ChartTooltip
                cursor={{ fill: 'oklch(0.97 0.005 240)', radius: 4 }}
                content={<CustomTooltip skillDescriptions={skillDescriptions} />}
              />
              <Bar dataKey="errorRate" fill="url(#errGrad)" radius={[0, 4, 4, 0]}>
                <LabelList
                  dataKey="errorRate"
                  position="right"
                  offset={8}
                  style={{ fontSize: 11, fontFamily: 'var(--font-mono)', fill: '#94a3b8', fontWeight: 600 }}
                  formatter={(v: number) => `${v}%`}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </div>
      </div>

      <HabilidadesFullModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        data={habilidades}
        skillDescriptions={skillDescriptions}
      />
    </>
  )
}
