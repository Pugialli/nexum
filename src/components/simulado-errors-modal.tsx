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
        return 'bg-red-500/10 text-red-700 border-red-200 hover:bg-red-500/20'
      case 'Fácil':
        return 'bg-orange-500/10 text-orange-700 border-orange-200 hover:bg-orange-500/20'
      case 'Médio':
        return 'bg-yellow-400/20 text-yellow-800 border-yellow-300 hover:bg-yellow-400/30'
      case 'Difícil':
        return 'bg-lime-400/20 text-lime-800 border-lime-300 hover:bg-lime-400/30'
      case 'Muito difícil':
        return 'bg-green-700/10 text-green-800 border-green-200 hover:bg-green-700/20'
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
                    <span className="font-mono text-xs font-semibold bg-muted px-2 py-1 rounded-sm border">
                      {error.skill}
                    </span>
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
