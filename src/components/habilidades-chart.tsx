"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import { useState, useMemo } from "react"
import { Plus } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { HabilidadesFullModal } from "./habilidades-full-modal"

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
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Generate mock data for all 30 skills
  const allSkillsData = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      skill: `H${i + 1}`,
      errorRate: Math.floor(Math.random() * 100),
      errorCount: Math.floor(Math.random() * 50),
    })).sort((a, b) => b.errorRate - a.errorRate)
  }, [])

  // Top 5 for the main card
  const topSkillsData = allSkillsData.slice(0, 5)

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
        <CardFooter className="justify-end p-2 pt-0">
          <Button 
            variant="default" 
            size="icon-sm" 
            onClick={() => setIsModalOpen(true)}
            className="rounded-full shadow-md hover:scale-110 transition-transform duration-200"
          >
            <Plus className="size-4" />
          </Button>
        </CardFooter>
      </Card>

      <HabilidadesFullModal 
        isOpen={isModalOpen} 
        onOpenChange={setIsModalOpen} 
        data={allSkillsData} 
      />
    </>
  )
}
