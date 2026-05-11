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
  const allDone = done === total

  return (
    <div className="overflow-hidden rounded-[14px] border border-border bg-white">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="flex w-full items-center justify-between px-5 py-3.5 text-left transition-colors hover:bg-[var(--page-bg)]"
        style={{ borderBottom: isOpen ? '1px solid var(--border)' : undefined }}
      >
        <div className="flex items-center gap-2.5">
          <span
            className="font-heading text-[14px] font-bold tracking-tight"
            style={{ color: allDone ? '#94a3b8' : 'oklch(0.22 0.02 240)' }}
          >
            {assunto}
          </span>
          <span
            className="rounded-full border px-2 py-0.5 font-mono text-[10.5px] font-semibold"
            style={
              allDone
                ? { color: 'oklch(0.42 0.13 145)', background: 'oklch(0.97 0.05 105)', borderColor: 'oklch(0.88 0.08 145)' }
                : { color: '#94a3b8', background: '#F1F5F9', borderColor: '#E2E8F0' }
            }
          >
            {done}/{total}
          </span>
        </div>
        <ChevronDown
          size={15}
          className={cn("transition-transform duration-200", isOpen && "rotate-180")}
          style={{ color: '#94a3b8' }}
        />
      </button>

      {isOpen && (
        <div className="grid grid-cols-1 gap-2 p-3 sm:grid-cols-2">
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
