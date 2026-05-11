'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

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
  skillDescriptions: Record<string, string>
}

const DIFFICULTY_STYLE: Record<string, { color: string; bg: string; border: string }> = {
  'Muito fácil': { color: 'oklch(0.42 0.13 145)', bg: 'oklch(0.97 0.05 105)', border: 'oklch(0.88 0.08 145)' },
  'Fácil':       { color: 'oklch(0.42 0.13 145)', bg: 'oklch(0.97 0.05 105)', border: 'oklch(0.88 0.08 145)' },
  'Médio':       { color: 'oklch(0.62 0.14 60)',  bg: 'oklch(0.98 0.025 85)', border: 'oklch(0.88 0.08 85)'  },
  'Difícil':     { color: 'oklch(0.465 0.155 10)', bg: 'oklch(0.97 0.03 20)', border: 'oklch(0.88 0.08 10)'  },
  'Muito difícil':{ color: 'oklch(0.465 0.155 10)', bg: 'oklch(0.97 0.03 20)', border: 'oklch(0.88 0.08 10)' },
}

export function SimuladoErrorsModal({
  isOpen,
  onOpenChange,
  testNumber,
  errors,
  skillDescriptions,
}: SimuladoErrorsModalProps) {
  const sortedErrors = [...errors].sort((a, b) => a.number - b.number)

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] w-[calc(100%-2rem)] flex-col rounded-[18px] sm:max-w-3xl">
        <DialogHeader className="border-b border-border pb-4">
          <DialogTitle
            className="font-heading text-[18px] font-extrabold tracking-tight"
            style={{ color: 'oklch(0.22 0.02 240)' }}
          >
            Análise de Erros — Simulado {testNumber}
          </DialogTitle>
          <p className="text-[13px]" style={{ color: '#94a3b8' }}>
            Detalhes das questões erradas neste simulado.
          </p>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pt-4">
          <div
            className="overflow-x-auto overflow-y-hidden rounded-[14px] border border-border"
            style={{ boxShadow: '0 1px 0 rgba(15,23,42,0.02)' }}
          >
            <table className="w-full min-w-[480px] border-separate border-spacing-0 text-[13px]">
              <thead>
                <tr>
                  {[
                    { label: 'Questão', align: 'left' },
                    { label: 'Dificuldade', align: 'center' },
                    { label: 'Habilidade', align: 'center' },
                    { label: 'Assunto', align: 'left' },
                  ].map(({ label, align }) => (
                    <th
                      key={label}
                      className="border-b border-border px-4 py-3 font-mono text-[10.5px] uppercase tracking-[0.14em]"
                      style={{
                        color: '#94a3b8',
                        background: 'linear-gradient(180deg, var(--page-bg), transparent)',
                        textAlign: align as 'left' | 'center',
                      }}
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedErrors.map((error) => {
                  const diff = DIFFICULTY_STYLE[error.difficulty] ?? { color: '#94a3b8', bg: '#F1F5F9', border: '#E2E8F0' }
                  return (
                    <tr key={error.number} className="transition-colors hover:bg-[var(--page-bg)]">
                      <td className="border-b border-border px-4 py-3">
                        <span className="font-heading text-[14px] font-bold" style={{ color: 'oklch(0.22 0.02 240)' }}>
                          {error.number}
                        </span>
                      </td>

                      <td className="border-b border-border px-4 py-3 text-center">
                        <span
                          className="rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold"
                          style={{ color: diff.color, background: diff.bg, border: `1px solid ${diff.border}` }}
                        >
                          {error.difficulty}
                        </span>
                      </td>

                      <td className="border-b border-border px-4 py-3 text-center">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span
                              className="cursor-help rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold"
                              style={{
                                color: 'var(--color-secondary)',
                                background: 'oklch(0.96 0.015 186)',
                                border: '1px solid oklch(0.85 0.03 186)',
                              }}
                            >
                              {error.skill}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-[200px] text-center text-[12px]">
                              {skillDescriptions[error.skill] ?? `${error.skill}: Habilidade do ENEM.`}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </td>

                      <td className="border-b border-border px-4 py-3 text-[13px]" style={{ color: 'oklch(0.36 0.015 240)' }}>
                        {error.subject}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            <div
              className="border-t border-border px-4 py-3"
              style={{ background: 'var(--page-bg)' }}
            >
              <span className="font-mono text-[11.5px]" style={{ color: '#94a3b8' }}>
                {sortedErrors.length} {sortedErrors.length === 1 ? 'erro' : 'erros'} neste simulado
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
