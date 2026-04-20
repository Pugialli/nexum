"use client"

import { cn } from "@/lib/utils"
import { useTransition } from "react"
import { updateRevisaoAction } from "./actions"

interface CadernoErroCardProps {
  idProvaAluno: string
  idQuestao: string
  questaoNumero: number
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

export function CadernoErroCard({
  idProvaAluno,
  idQuestao,
  questaoNumero,
  provaAno,
  revisao1,
  revisao2,
  revisao3,
  onRevisaoChange,
}: CadernoErroCardProps) {
  const [isPending, startTransition] = useTransition()

  const rev = [revisao1, revisao2, revisao3]
  const isDone = revisao1 && revisao2 && revisao3

  function handleCheck(idx: number) {
    const next = [...rev]
    next[idx] = !next[idx]

    if (idx === 0 && !next[0]) {
      next[1] = false
      next[2] = false
    }
    if (idx === 1 && !next[1]) {
      next[2] = false
    }

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
        "grid grid-cols-[1fr_auto_auto_auto] items-center gap-x-6",
        "rounded-lg border border-border/50 bg-card px-4 py-3",
        "transition-opacity duration-300",
        isDone && "opacity-35",
        isPending && "pointer-events-none"
      )}
    >
      {/* Questão */}
      <div className="min-w-0">
        <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
          Questão
        </p>
        <p className={cn("truncate text-sm text-foreground", isDone && "line-through text-muted-foreground")}>
          {questaoNumero}
        </p>
      </div>

      {/* Prova */}
      <div className="hidden sm:block">
        <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
          Prova
        </p>
        <p className={cn("text-sm text-foreground whitespace-nowrap", isDone && "line-through text-muted-foreground")}>
          {provaAno}
        </p>
      </div>

      {/* Revisão */}
      <div>
        <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground mb-1">
          Revisão
        </p>
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((idx) => (
            <label
              key={idx}
              className={cn(
                "flex items-center gap-1 cursor-pointer select-none",
                isDisabled(idx) && "cursor-not-allowed opacity-40"
              )}
            >
              <input
                type="checkbox"
                className="h-3.5 w-3.5 rounded accent-primary"
                checked={rev[idx]}
                disabled={isDisabled(idx)}
                onChange={() => handleCheck(idx)}
              />
              <span className="text-xs text-muted-foreground">{idx + 1}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}