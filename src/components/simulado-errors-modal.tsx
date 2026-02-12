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

export interface SimuladoError {
  number: number
  difficulty: 'Fácil' | 'Médio' | 'Difícil'
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
                  <TableCell>{error.number}</TableCell>
                  <TableCell>{error.difficulty}</TableCell>
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
