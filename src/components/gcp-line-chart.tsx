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
} from "@/components/ui/chart"

const chartConfig = {
  gcp: {
    label: "GCP",
    color: "hsl(var(--secondary))",
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

export function GcpLineChart({ data }: { data: any[] }) {
  return (
    <Card className="flex h-full w-full flex-col">
      <CardHeader className="pb-4">
        <CardTitle>Indicador GCP</CardTitle>
        <CardDescription>
          Percentual de aproveitamento do indicador GCP nos últimos 10 simulados
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 pb-0">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <LineChart
            data={data}
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
            <ChartTooltip cursor={false} content={<CustomTooltip />} />
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
