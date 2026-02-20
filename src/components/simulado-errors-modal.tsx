'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

export interface SimuladoError {
  number: number
  difficulty: 'Muito fácil' | 'Fácil' | 'Médio' | 'Difícil' | 'Muito difícil'
  skill: string
  subject: string
}

interface SimuladoErrorsModalProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  testNumber: string | null
  errors: SimuladoError[]
}

const skillDescriptions: Record<string, string> = {
  H1: "Reconhecer no contexto social diferentes formas de registro de números.",
  H5: "Avaliar propostas de intervenção na realidade utilizando conhecimentos numéricos.",
  H12: "Uma habilidade normalmente relativa a identificação de números inteiros.",
  H18: "Resolver situação-problema envolvendo a variação de grandezas, direta ou inversamente proporcionais.",
  H25: "Resolver problema que envolva noções de probabilidade de ocorrência de um evento.",
  H30: "Avaliar propostas de intervenção na realidade utilizando conhecimentos de estatística e probabilidade.",
}

function getSkillDescription(skill: string) {
  return skillDescriptions[skill] || `${skill}: Descrição detalhada desta habilidade no contexto do ENEM.`
}

export function SimuladoErrorsModal({
  isOpen,
  onOpenChange,
  testNumber,
  errors,
}: SimuladoErrorsModalProps) {
  const sortedErrors = [...errors].sort((a, b) => a.number - b.number)

  const getDifficultyStyles = (difficulty: SimuladoError['difficulty']) => {
    switch (difficulty) {
      case 'Muito fácil':
        return 'bg-red-500/20 text-red-700 border-red-300'
      case 'Fácil':
        return 'bg-orange-500/20 text-orange-700 border-orange-300'
      case 'Médio':
        return 'bg-yellow-400/30 text-yellow-800 border-yellow-400'
      case 'Difícil':
        return 'bg-lime-400/30 text-lime-800 border-lime-400'
      case 'Muito difícil':
        return 'bg-green-700/20 text-green-800 border-green-300'
      default:
        return ''
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">Análise de Erros - Simulado {testNumber}</DialogTitle>
          <DialogDescription className="font-sans">
            Aqui estão os detalhes das questões que você errou neste simulado.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto mt-4 border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent bg-muted/50">
                <TableHead className="w-[100px] font-bold text-foreground">Questão</TableHead>
                <TableHead className="font-bold text-foreground text-center">Dificuldade</TableHead>
                <TableHead className="font-bold text-foreground text-center">Habilidade</TableHead>
                <TableHead className="font-bold text-foreground">Assunto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedErrors.map((error) => (
                <TableRow key={error.number} className="group transition-colors">
                  <TableCell className="font-bold text-muted-foreground group-hover:text-foreground">
                    #{error.number}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge 
                      variant="outline"
                      className={cn(
                        "px-2 py-0.5 text-[9px] uppercase font-black tracking-widest rounded-full transition-all border shadow-none", 
                        getDifficultyStyles(error.difficulty)
                      )}
                    >
                      {error.difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="font-mono text-xs font-semibold bg-muted px-2 py-1 rounded-sm border cursor-help">
                          {error.skill}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-[200px] text-center">
                          {getSkillDescription(error.skill)}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="text-sm font-medium">
                    {error.subject}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  )
}
