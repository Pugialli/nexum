"use client"

import { useState } from "react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart"
import type { ProvaResult } from "@/http/get-dashboard"
import type { Habilidade } from "@/http/get-habilidades"
import { SimuladoErrorsModal, type SimuladoError } from "./simulado-errors-modal"

const chartConfig = {
  score: {
    label: "Acertos",
    color: "hsl(var(--primary))",
  },
}

interface TooltipPayloadItem {
  payload: ProvaResult
}

interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipPayloadItem[]
  label?: string
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="rounded-lg border bg-background p-3 text-sm shadow-sm">
        <p className="mb-2 font-medium">Simulado {label}</p>
        <div className="space-y-1">
          <p className="flex justify-between gap-4">
            <span>Data da prova:</span>
            <span className="font-semibold">{data.date}</span>
          </p>
          <p className="flex justify-between gap-4">
            <span>Acertos:</span>
            <span className="font-semibold">{data.score}</span>
          </p>
          <p className="flex justify-between gap-4">
            <span>Nota:</span>
            <span className="font-semibold">{data.gcp}</span>
          </p>
        </div>
      </div>
    )
  }
  return null
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
    const errors = errosPorProva[item.test] ?? []
    setSelectedTest({ test: item.ano, errors })
    setIsModalOpen(true)
  }

  return (
    <>
      <Card className="flex h-full w-full flex-col py-2 gap-2">
        <CardHeader className="pb-0">
          <CardTitle>Desempenho nos Simulados</CardTitle>
          <CardDescription>
            Número de acertos nos últimos 10 simulados
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 pb-0">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <BarChart data={data} accessibilityLayer>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="ano"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis hide />
              <ChartTooltip cursor={false} content={<CustomTooltip />} />
              <Bar dataKey="score" fill="var(--color-primary)" radius={8} onClick={handleBarClick} className="cursor-pointer">
                <LabelList dataKey="score" position="top" />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
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