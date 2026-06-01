"use client"

import { useState } from "react"
import { Bar, BarChart, CartesianGrid, Cell, LabelList, XAxis, YAxis } from "recharts"

import type { ProvaResult } from "@/app/api/aluno/[slug]/dashboard/get-dashboard"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import type { Habilidade } from "@/http/get-habilidades"
import { SimuladoErrorsModal, type SimuladoError } from "./simulado-errors-modal"

const chartConfig = {
  nota: { label: "Nota", color: "var(--color-primary)" },
}

interface TooltipPayloadItem { payload: ProvaResult }
interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipPayloadItem[]
  label?: string
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
          <span style={{ color: '#94a3b8' }}>Data</span>
          <span style={{ color: 'oklch(0.22 0.02 240)' }}>{d.date}</span>
        </p>
        <p className="flex justify-between gap-6 font-mono text-[11px]">
          <span style={{ color: '#94a3b8' }}>Acertos</span>
          <span className="font-semibold" style={{ color: 'var(--color-primary)' }}>{d.score}</span>
        </p>
        <p className="flex justify-between gap-6 font-mono text-[11px]">
          <span style={{ color: '#94a3b8' }}>Nota</span>
          <span className="font-semibold" style={{ color: 'var(--color-primary)' }}>
            {d.nota.toFixed(1)}
          </span>
        </p>
        <p className="flex justify-between gap-6 font-mono text-[11px]">
          <span style={{ color: '#94a3b8' }}>GCP</span>
          <span className="font-semibold" style={{ color: 'var(--color-secondary)' }}>{d.gcp}%</span>
        </p>
      </div>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: '#94a3b8' }}>
        clique para ver erros
      </p>
    </div>
  )
}

interface TestsBarChartProps {
  data: ProvaResult[]
  errosPorProva: Record<string, SimuladoError[]>
  habilidadesInfo: Habilidade[]
}

export function TestsBarChart({ data, errosPorProva, habilidadesInfo }: TestsBarChartProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTest, setSelectedTest] = useState<{ test: string; errors: SimuladoError[] } | null>(null)

  const skillDescriptions = Object.fromEntries(
    habilidadesInfo.map((h) => [`H${h.value}`, h.descricao])
  )

  const handleBarClick = (item: ProvaResult) => {
    setSelectedTest({ test: item.ano, errors: errosPorProva[item.provaId] ?? [] })
    setIsModalOpen(true)
  }

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
              Desempenho nos Simulados
            </h3>
            <p className="mt-0.5 text-[12px]" style={{ color: '#94a3b8' }}>
              Nota por simulado — clique em uma barra para ver os erros
            </p>
          </div>
          <span
            className="rounded-full border px-2 py-0.5 font-mono text-[10.5px] font-semibold"
            style={{
              color: 'var(--color-primary)',
              background: 'oklch(0.97 0.02 50)',
              borderColor: 'oklch(0.88 0.06 50)',
            }}
          >
            {data.length} {data.length === 1 ? 'prova' : 'provas'}
          </span>
        </div>

        {/* Chart */}
        <div className="px-4 pb-4 pt-2">
          <ChartContainer config={chartConfig} className="h-[180px] w-full sm:h-[200px]">
            <BarChart data={data} accessibilityLayer barSize={48} margin={{ top: 20, right: 8, left: 8, bottom: 0 }}>
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={1} />
                  <stop offset="100%" stopColor="oklch(0.58 0.19 35)" stopOpacity={1} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="oklch(0.93 0.005 240)" />
              <XAxis
                dataKey="ano"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tick={{ fontSize: 11, fontFamily: 'var(--font-mono)', fill: '#94a3b8' }}
              />
              <YAxis hide domain={[0, 'auto']} />
              <ChartTooltip cursor={{ fill: 'oklch(0.97 0.005 240)', radius: 6 }} content={<CustomTooltip />} />
              <Bar dataKey="nota" fill="url(#barGrad)" radius={[6, 6, 0, 0]} className="cursor-pointer" onClick={handleBarClick}>
                <LabelList
                  dataKey="nota"
                  position="top"
                  style={{ fontSize: 11, fontFamily: 'var(--font-mono)', fill: '#94a3b8', fontWeight: 600 }}
                  formatter={(v: number) => v.toFixed(1)}
                />
                {data.map((entry) => (
                  <Cell key={entry.provaId} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </div>
      </div>

      {selectedTest && (
        <SimuladoErrorsModal
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
          testNumber={selectedTest.test}
          errors={selectedTest.errors}
          skillDescriptions={skillDescriptions}
        />
      )}
    </>
  )
}
