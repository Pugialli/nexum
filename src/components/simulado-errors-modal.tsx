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
        return 'bg-red-500 text-white hover:bg-red-600 border-transparent shadow-none'
      case 'Fácil':
        return 'bg-orange-500 text-white hover:bg-orange-600 border-transparent shadow-none'
      case 'Médio':
        return 'bg-yellow-400 text-black hover:bg-yellow-500 border-transparent shadow-none'
      case 'Difícil':
        return 'bg-lime-400 text-black hover:bg-lime-500 border-transparent shadow-none'
      case 'Muito difícil':
        return 'bg-green-700 text-white hover:bg-green-800 border-transparent shadow-none'
      default:
        return ''
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Análise de Erros - Simulado {testNumber}</DialogTitle>
          <DialogDescription>
            Aqui estão os detalhes das questões que você errou neste simulado.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Questão</TableHead>
                <TableHead>Dificuldade</TableHead>
                <TableHead>Habilidade</TableHead>
                <TableHead>Assunto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedErrors.map((error) => (
                <TableRow key={error.number}>
                  <TableCell className="font-medium">#{error.number}</TableCell>
                  <TableCell>
                    <Badge className={cn("px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider", getDifficultyStyles(error.difficulty))}>
                      {error.difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell>{error.skill}</TableCell>
                  <TableCell>{error.subject}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  )
}
