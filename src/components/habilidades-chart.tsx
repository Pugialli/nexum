"use client"

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

const chartData = [
  { skill: "H12", errorRate: 92, errorCount: 41 },
  { skill: "H25", errorRate: 85, errorCount: 38 },
  { skill: "H5", errorRate: 78, errorCount: 35 },
  { skill: "H18", errorRate: 72, errorCount: 32 },
  { skill: "H30", errorRate: 65, errorCount: 29 },
]

const skillDescriptions: Record<string, string> = {
  H1: "Reconhecer no contexto social diferentes formas de registro de números.",
  H5: "Avaliar propostas de intervenção na realidade utilizando conhecimentos numéricos.",
  H12: "Uma habilidade normalmente relativa a identificação de números inteiros.",
  H18: "Resolver situação-problema envolvendo a variação de grandezas, direta ou inversamente proporcionais.",
  H25: "Resolver problema que envolva noções de probabilidade de ocorrência de um evento.",
  H30: "Avaliar propostas de intervenção na realidade utilizando conhecimentos de estatística e probabilidade.",
}

const chartConfig = {
  errorRate: {
    label: "Erro (%)",
    color: "hsl(var(--destructive))",
  },
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const skill = data.skill;
    const description = skillDescriptions[skill] || "Descrição da habilidade no contexto do ENEM.";
    
    return (
      <div className="rounded-lg border bg-background p-3 text-sm shadow-sm max-w-[250px]">
        <p className="mb-1 font-bold text-foreground">Habilidade {skill}</p>
        <p className="mb-3 text-xs text-muted-foreground leading-relaxed italic">
          "{description}"
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
    );
  }
  return null;
};

export function HabilidadesChart() {
  return (
    <Card className="flex h-full w-full flex-col py-2 gap-2">
      <CardHeader className="pb-0">
        <CardTitle>Habilidades mais defasadas</CardTitle>
        <CardDescription>
          Top 5 habilidades com maior percentual de erro
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 pb-0">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart
            data={chartData}
            layout="vertical"
            accessibilityLayer
            margin={{
              left: 10,
              right: 40,
            }}
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
              content={<CustomTooltip />}
            />
            <Bar dataKey="errorRate" fill="var(--color-destructive)" radius={5}>
              <LabelList dataKey="errorRate" position="right" offset={8} formatter={(value: number) => `${value}%`} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
