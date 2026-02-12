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

// Mock data for errors
const mockErrors: { [key: string]: SimuladoError[] } = {
  "1": Array.from({ length: 13 }, (_, i) => ({
    number: Math.floor(Math.random() * 45) + 1,
    difficulty: ['Fácil', 'Médio', 'Difícil'][Math.floor(Math.random() * 3)] as any,
    skill: `H${Math.floor(Math.random() * 30) + 1}`,
    subject: ['Matemática', 'Física', 'Química', 'Biologia'][Math.floor(Math.random() * 4)],
  })),
  "2": Array.from({ length: 17 }, (_, i) => ({
    number: Math.floor(Math.random() * 45) + 1,
    difficulty: ['Fácil', 'Médio', 'Difícil'][Math.floor(Math.random() * 3)] as any,
    skill: `H${Math.floor(Math.random() * 30) + 1}`,
    subject: ['Matemática', 'Física', 'Química', 'Biologia'][Math.floor(Math.random() * 4)],
  })),
  "3": Array.from({ length: 4 }, (_, i) => ({
    number: Math.floor(Math.random() * 45) + 1,
    difficulty: ['Fácil', 'Médio', 'Difícil'][Math.floor(Math.random() * 3)] as any,
    skill: `H${Math.floor(Math.random() * 30) + 1}`,
    subject: ['Matemática', 'Física', 'Química', 'Biologia'][Math.floor(Math.random() * 4)],
  })),
  "4": Array.from({ length: 10 }, (_, i) => ({
    number: Math.floor(Math.random() * 45) + 1,
    difficulty: ['Fácil', 'Médio', 'Difícil'][Math.floor(Math.random() * 3)] as any,
    skill: `H${Math.floor(Math.random() * 30) + 1}`,
    subject: ['Matemática', 'Física', 'Química', 'Biologia'][Math.floor(Math.random() * 4)],
  })),
  "5": Array.from({ length: 3 }, (_, i) => ({
    number: Math.floor(Math.random() * 45) + 1,
    difficulty: ['Fácil', 'Médio', 'Difícil'][Math.floor(Math.random() * 3)] as any,
    skill: `H${Math.floor(Math.random() * 30) + 1}`,
    subject: ['Matemática', 'Física', 'Química', 'Biologia'][Math.floor(Math.random() * 4)],
  })),
  "6": Array.from({ length: 15 }, (_, i) => ({
    number: Math.floor(Math.random() * 45) + 1,
    difficulty: ['Fácil', 'Médio', 'Difícil'][Math.floor(Math.random() * 3)] as any,
    skill: `H${Math.floor(Math.random() * 30) + 1}`,
    subject: ['Matemática', 'Física', 'Química', 'Biologia'][Math.floor(Math.random() * 4)],
  })),
  "7": Array.from({ length: 8 }, (_, i) => ({
    number: Math.floor(Math.random() * 45) + 1,
    difficulty: ['Fácil', 'Médio', 'Difícil'][Math.floor(Math.random() * 3)] as any,
    skill: `H${Math.floor(Math.random() * 30) + 1}`,
    subject: ['Matemática', 'Física', 'Química', 'Biologia'][Math.floor(Math.random() * 4)],
  })),
  "8": Array.from({ length: 16 }, (_, i) => ({
    number: Math.floor(Math.random() * 45) + 1,
    difficulty: ['Fácil', 'Médio', 'Difícil'][Math.floor(Math.random() * 3)] as any,
    skill: `H${Math.floor(Math.random() * 30) + 1}`,
    subject: ['Matemática', 'Física', 'Química', 'Biologia'][Math.floor(Math.random() * 4)],
  })),
  "9": Array.from({ length: 12 }, (_, i) => ({
    number: Math.floor(Math.random() * 45) + 1,
    difficulty: ['Fácil', 'Médio', 'Difícil'][Math.floor(Math.random() * 3)] as any,
    skill: `H${Math.floor(Math.random() * 30) + 1}`,
    subject: ['Matemática', 'Física', 'Química', 'Biologia'][Math.floor(Math.random() * 4)],
  })),
  "10": Array.from({ length: 7 }, (_, i) => ({
    number: Math.floor(Math.random() * 45) + 1,
    difficulty: ['Fácil', 'Médio', 'Difícil'][Math.floor(Math.random() * 3)] as any,
    skill: `H${Math.floor(Math.random() * 30) + 1}`,
    subject: ['Matemática', 'Física', 'Química', 'Biologia'][Math.floor(Math.random() * 4)],
  })),
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
