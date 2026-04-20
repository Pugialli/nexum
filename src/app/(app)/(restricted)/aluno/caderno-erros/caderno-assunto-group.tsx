"use client"

import type { GetCadernoErrosResponse } from "@/app/api/caderno-erros/[slug]/get-erros"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { CadernoErroCard } from "./caderno-card"

interface CadernoAssuntoGroupProps {
  assunto: string
  erros: GetCadernoErrosResponse[]
  defaultOpen?: boolean
  onRevisaoChange: (
    idProvaAluno: string,
    idQuestao: string,
    revisao1: boolean,
    revisao2: boolean,
    revisao3: boolean,
  ) => void
}

export function CadernoAssuntoGroup({
  assunto,
  erros,
  defaultOpen = true,
  onRevisaoChange,
}: CadernoAssuntoGroupProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const total = erros.length
  const done = erros.filter((e) => e.revisao1 && e.revisao2 && e.revisao3).length

  return (
    <div className="rounded-xl border border-border/50 overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3 bg-muted/40 hover:bg-muted/70 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-foreground">{assunto}</span>
          <span className="rounded-full border border-border/50 bg-background px-2 py-0.5 text-[11px] text-muted-foreground">
            {done}/{total} concluídos
          </span>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2">
          {erros.map((erro) => (
            <CadernoErroCard
              key={`${erro.idProvaAluno}-${erro.idQuestao}`}
              {...erro}
              onRevisaoChange={onRevisaoChange}
            />
          ))}
        </div>
      )}
    </div>
  )
}