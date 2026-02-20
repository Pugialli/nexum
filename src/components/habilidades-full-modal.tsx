'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  ChartContainer,
  ChartTooltip,
} from '@/components/ui/chart'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

interface HabilidadeData {
  skill: string
  errorRate: number
  errorCount: number
}

interface HabilidadesFullModalProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  data: HabilidadeData[]
}

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

export function HabilidadesFullModal({
  isOpen,
  onOpenChange,
  data,
}: HabilidadesFullModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">Ranking Geral de Habilidades</DialogTitle>
          <DialogDescription className="font-sans">
            Desempenho detalhado em todas as 30 habilidades do ENEM, ordenado pelo percentual de erro.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto mt-4 pr-4">
          <ChartContainer config={chartConfig} className="min-h-[1200px] w-full">
            <BarChart
              data={data}
              layout="vertical"
              accessibilityLayer
              margin={{
                left: 10,
                right: 60,
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
                width={40}
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
        </div>
      </DialogContent>
    </Dialog>
  )
}
