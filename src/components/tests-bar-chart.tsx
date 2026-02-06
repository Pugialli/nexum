"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

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
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { test: "1", score: 32 },
  { test: "2", score: 28 },
  { test: "3", score: 41 },
  { test: "4", score: 35 },
  { test: "5", score: 42 },
  { test: "6", score: 30 },
  { test: "7", score: 37 },
  { test: "8", score: 29 },
  { test: "9", score: 33 },
  { test: "10", score: 38 },
]

const chartConfig = {
  score: {
    label: "Acertos",
    color: "hsl(var(--primary))",
  },
}

export function TestsBarChart() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Desempenho nos Simulados</CardTitle>
        <CardDescription>
          Número de acertos nos últimos 10 simulados
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart data={chartData} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="test"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => `Sim. ${value}`}
            />
            <YAxis domain={[0, 45]} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="score" fill="var(--color-primary)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
