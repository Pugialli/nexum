"use client"

import { CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis } from "recharts"

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
  { test: "1", gcp: 58 },
  { test: "2", gcp: 62 },
  { test: "3", gcp: 65 },
  { test: "4", gcp: 70 },
  { test: "5", gcp: 68 },
  { test: "6", gcp: 72 },
  { test: "7", gcp: 75 },
  { test: "8", gcp: 80 },
  { test: "9", gcp: 85 },
  { test: "10", gcp: 88 },
]

const chartConfig = {
  gcp: {
    label: "GCP",
    color: "hsl(var(--secondary))",
  },
}

export function GcpLineChart() {
  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle>Indicador GCP</CardTitle>
        <CardDescription>
          Percentual de aproveitamento do indicador GCP nos últimos 10 simulados
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <LineChart
            data={chartData}
            accessibilityLayer
            margin={{
              left: 12,
              right: 30,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="test"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `Sim. ${value}`}
            />
            <YAxis
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="gcp"
              type="monotone"
              stroke="var(--color-secondary)"
              strokeWidth={2}
              dot={true}
            >
              <LabelList dataKey="gcp" position="top" formatter={(value: number) => `${value}%`} />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
