"use client"

import { Plus } from "lucide-react"
import { useState } from "react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart"
import { HabilidadeResult } from "@/http/get-dashboard"
import { Habilidade } from "@/http/get-habilidades"
import { HabilidadesFullModal } from "./habilidades-full-modal"

const chartConfig = {
  errorRate: {
    label: "Erro (%)",
    color: "hsl(var(--destructive))",
  },
}

interface HabilidadesChartProps {
  habilidades: HabilidadeResult[]
  habilidadesInfo: Habilidade[]
}

interface TooltipPayloadItem {
  payload: HabilidadeResult
}

interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipPayloadItem[]
  skillDescriptions: Record<string, string>
}

const CustomTooltip = ({ active, payload, skillDescriptions }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    const description = skillDescriptions[data.skill] ?? "Descrição da habilidade no contexto do ENEM."

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

export function HabilidadesChart({ habilidades, habilidadesInfo }: HabilidadesChartProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const skillDescriptions = Object.fromEntries(
    habilidadesInfo.map((h) => [`H${h.value}`, h.descricao])
  )

  const topSkillsData = habilidades.slice(0, 5)

  return (
    <>
      <Card className="flex h-full w-full flex-col py-2 gap-2 relative">
        <CardHeader className="pb-0">
          <CardTitle>Habilidades mais defasadas</CardTitle>
          <CardDescription>
            Top 5 habilidades com maior percentual de erro
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 pb-0">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <BarChart
              data={topSkillsData}
              layout="vertical"
              accessibilityLayer
              margin={{ left: 10, right: 40 }}
            >
              <CartesianGrid horizontal={false} />
              <XAxis type="number" hide />
              <YAxis
                dataKey="skill"
                type="category"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
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
        </CardContent>
        <CardFooter className="justify-end p-2 pt-0">
          <Button
            variant="default"
            size="icon-sm"
            onClick={() => setIsModalOpen(true)}
            className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full shadow-md hover:scale-110 transition-transform duration-200"
          >
            <Plus className="size-4" />
          </Button>
        </CardFooter>
      </Card>

      <HabilidadesFullModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        data={habilidades}
        skillDescriptions={skillDescriptions}
      />
    </>
  )
}