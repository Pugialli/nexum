"use client"

import { cn } from "@/lib/utils"
import { toDifficultyLabel } from "@/utils/dificuldade"
import { useState, useTransition } from "react"
import { updateRevisaoAction } from "./actions"

interface CadernoErroCardProps {
  idProvaAluno: string
  idQuestao: string
  dificuldade: number
  questaoNumero: number
  questaoGabarito: string
  provaAno: string
  revisao1: boolean
  revisao2: boolean
  revisao3: boolean
  onRevisaoChange: (
    idProvaAluno: string,
    idQuestao: string,
    revisao1: boolean,
    revisao2: boolean,
    revisao3: boolean,
  ) => void
}

const DIFFICULTY_STYLE: Record<string, { color: string; bg: string; border: string }> = {
  'Muito fácil': { color: 'oklch(0.42 0.13 145)', bg: 'oklch(0.97 0.05 105)', border: 'oklch(0.88 0.08 145)' },
  'Fácil':       { color: 'oklch(0.42 0.13 145)', bg: 'oklch(0.97 0.05 105)', border: 'oklch(0.88 0.08 145)' },
  'Médio':       { color: 'oklch(0.62 0.14 60)',  bg: 'oklch(0.98 0.025 85)', border: 'oklch(0.88 0.08 85)'  },
  'Difícil':     { color: 'oklch(0.465 0.155 10)', bg: 'oklch(0.97 0.03 20)', border: 'oklch(0.88 0.08 10)'  },
  'Muito difícil':{ color: 'oklch(0.465 0.155 10)', bg: 'oklch(0.97 0.03 20)', border: 'oklch(0.88 0.08 10)' },
}

export function CadernoErroCard({
  idProvaAluno,
  idQuestao,
  dificuldade,
  questaoNumero,
  questaoGabarito,
  provaAno,
  revisao1,
  revisao2,
  revisao3,
  onRevisaoChange,
}: CadernoErroCardProps) {
  const [isPending, startTransition] = useTransition()
  const [showGabarito, setShowGabarito] = useState(false)

  const rev = [revisao1, revisao2, revisao3]
  const isDone = revisao1 && revisao2 && revisao3
  const diffLabel = toDifficultyLabel(dificuldade)
  const diffStyle = DIFFICULTY_STYLE[diffLabel] ?? { color: '#94a3b8', bg: '#F1F5F9', border: '#E2E8F0' }

  function handleCheck(idx: number) {
    const next = [...rev]
    next[idx] = !next[idx]

    if (idx === 0 && !next[0]) { next[1] = false; next[2] = false }
    if (idx === 1 && !next[1]) { next[2] = false }

    onRevisaoChange(idProvaAluno, idQuestao, next[0], next[1], next[2])

    startTransition(async () => {
      await updateRevisaoAction(idProvaAluno, idQuestao, next[0], next[1], next[2])
    })
  }

  const isDisabled = (idx: number) => {
    if (idx === 1) return !revisao1
    if (idx === 2) return !revisao1 || !revisao2
    return false
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-x-4",
        "rounded-[10px] border border-border px-4 py-3 transition-opacity duration-300",
        isDone && "opacity-40",
        isPending && "pointer-events-none"
      )}
      style={{ background: isDone ? 'var(--page-bg)' : 'white' }}
    >
      {/* Linha 1 (mobile) — Questão + Prova */}
      <div className="flex justify-between sm:contents">
        {/* Questão */}
        <div>
          <p className="mb-1 font-mono text-[9.5px] uppercase tracking-[0.14em]" style={{ color: '#94a3b8' }}>Questão</p>
          <p
            className={cn("py-1 font-heading text-[15px] font-bold tracking-tight", isDone && "line-through")}
            style={{ color: isDone ? '#94a3b8' : 'oklch(0.22 0.02 240)' }}
          >
            {questaoNumero}
          </p>
        </div>

        {/* Prova */}
        <div>
          <p className="mb-1 font-mono text-[9.5px] uppercase tracking-[0.14em]" style={{ color: '#94a3b8' }}>Prova</p>
          <p
            className={cn("py-1 text-[13px]", isDone && "line-through")}
            style={{ color: isDone ? '#94a3b8' : 'oklch(0.36 0.015 240)' }}
          >
            {provaAno}
          </p>
        </div>
      </div>

      {/* Linha 2 (mobile) — Nível + Gabarito + Rev */}
      <div className="flex justify-between sm:contents">
        {/* Dificuldade */}
        <div>
          <p className="mb-1 font-mono text-[9.5px] uppercase tracking-[0.14em]" style={{ color: '#94a3b8' }}>Nível</p>
          <span
            className="inline-flex items-center justify-center rounded-full px-2 py-1 font-mono text-[11px] font-semibold"
            style={{ color: diffStyle.color, background: diffStyle.bg, border: `1px solid ${diffStyle.border}` }}
          >
            {diffLabel}
          </span>
        </div>

        {/* Gabarito */}
        <div
          className="cursor-pointer select-none"
          onClick={() => setShowGabarito((v) => !v)}
          title={showGabarito ? 'Ocultar gabarito' : 'Ver gabarito'}
        >
          <p className="mb-1 font-mono text-[9.5px] uppercase tracking-[0.14em]" style={{ color: '#94a3b8' }}>Gabarito</p>
          <span
            className="inline-flex items-center justify-center rounded-full py-1 font-mono text-[11px] font-semibold"
            style={{
              width: '3rem',
              ...(showGabarito
                ? {
                    color: isDone ? '#94a3b8' : 'var(--color-secondary)',
                    background: isDone ? '#F1F5F9' : 'oklch(0.96 0.03 195)',
                    border: `1px solid ${isDone ? '#E2E8F0' : 'oklch(0.82 0.07 195)'}`,
                  }
                : { color: '#cbd5e1', background: 'white', border: '1px solid #E2E8F0' }),
            }}
          >
            {showGabarito ? questaoGabarito : '● ● ●'}
          </span>
        </div>

        {/* Revisão */}
        <div>
          <p className="mb-1.5 font-mono text-[9.5px] uppercase tracking-[0.14em]" style={{ color: '#94a3b8' }}>Rev.</p>
          <div className="flex items-center gap-1.5">
            {[0, 1, 2].map((idx) => (
              <label
                key={idx}
                className={cn(
                  "flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border font-mono text-[10px] font-semibold transition-all select-none",
                  isDisabled(idx) && "cursor-not-allowed opacity-30"
                )}
                style={
                  rev[idx]
                    ? { background: 'var(--color-secondary)', borderColor: 'var(--color-secondary)', color: '#fff' }
                    : { background: 'white', borderColor: '#E2E8F0', color: '#94a3b8' }
                }
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={rev[idx]}
                  disabled={isDisabled(idx)}
                  onChange={() => handleCheck(idx)}
                />
                {idx + 1}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
