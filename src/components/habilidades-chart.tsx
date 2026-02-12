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
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { skill: "H12", errorRate: 92 },
  { skill: "H25", errorRate: 85 },
  { skill: "H5", errorRate: 78 },
  { skill: "H18", errorRate: 72 },
  { skill: "H30", errorRate: 65 },
]

const chartConfig = {
  errorRate: {
    label: "Erro (%)",
    color: "hsl(var(--destructive))",
  },
}

export function HabilidadesChart() {
  return (
    <Card className="flex h-full w-full flex-col">
      <CardHeader>
        <CardTitle>Habilidades mais defasadas</CardTitle>
        <CardDescription>
          Top 5 habilidades com maior percentual de erro
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
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
            <YAxis
              dataKey="skill"
              type="category"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <XAxis
              type="number"
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
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
