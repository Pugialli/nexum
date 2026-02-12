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

const chartConfig = {
  score: {
    label: "Acertos",
    color: "hsl(var(--primary))",
  },
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-lg border bg-background p-3 text-sm shadow-sm">
        <p className="mb-2 font-medium">Simulado {label}</p>
        <div className="space-y-1">
          <p className="flex justify-between">
            <span>Acertos:</span>
            <span className="ml-4 font-semibold">{data.score}</span>
          </p>
          <p className="flex justify-between">
            <span>GCP:</span>
            <span className="ml-4 font-semibold">{data.gcp}%</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export function TestsBarChart({ data }: { data: any[] }) {
  return (
    <Card className="flex h-full w-full flex-col">
      <CardHeader className="pb-4">
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
              dataKey="test"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => `Sim. ${value}`}
            />
            <YAxis domain={[0, 45]} />
            <ChartTooltip cursor={false} content={<CustomTooltip />} />
            <Bar dataKey="score" fill="var(--color-primary)" radius={8}>
              <LabelList dataKey="score" position="top" />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
