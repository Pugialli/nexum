"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import { useState } from "react"

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
import { SimuladoErrorsModal, type SimuladoError } from "./simulado-errors-modal"

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
    );
  }
  return null;
};

// Mock data for errors with expanded difficulty levels
const generateMockErrors = (count: number): SimuladoError[] => {
  const levels: SimuladoError['difficulty'][] = ['Muito fácil', 'Fácil', 'Médio', 'Difícil', 'Muito difícil'];
  return Array.from({ length: count }, (_, i) => ({
    number: Math.floor(Math.random() * 45) + 1,
    difficulty: levels[Math.floor(Math.random() * levels.length)],
    skill: `H${Math.floor(Math.random() * 30) + 1}`,
    subject: ['Matemática', 'Física', 'Química', 'Biologia'][Math.floor(Math.random() * 4)],
  }));
}

const mockErrors: { [key: string]: SimuladoError[] } = {
  "1": generateMockErrors(13),
  "2": generateMockErrors(17),
  "3": generateMockErrors(4),
  "4": generateMockErrors(10),
  "5": generateMockErrors(3),
  "6": generateMockErrors(15),
  "7": generateMockErrors(8),
  "8": generateMockErrors(16),
  "9": generateMockErrors(12),
  "10": generateMockErrors(7),
}

export function TestsBarChart({ data }: { data: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTest, setSelectedTest] = useState<{ test: string; errors: SimuladoError[] } | null>(null)

  const handleBarClick = (data: any) => {
    const testNumber = data.test
    const errors = mockErrors[testNumber] || []
    setSelectedTest({ test: testNumber, errors })
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
                dataKey="test"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => `Sim. ${value}`}
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
        />
      )}
    </>
  )
}
