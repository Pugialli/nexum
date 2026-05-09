"use client"

import type { GetCadernoErrosResponse } from "@/app/api/caderno-erros/[slug]/get-erros"
import { toDifficultyLabel, type DifficultyLabel } from "@/utils/dificuldade"
import { ChevronDown, Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { CadernoAssuntoGroup } from "./caderno-assunto-group"

const DIFICULDADES: DifficultyLabel[] = [
  'Muito fácil',
  'Fácil',
  'Médio',
  'Difícil',
  'Muito difícil',
]

interface CadernoErrosProps {
  erros: GetCadernoErrosResponse[]
}

export function CadernoErros({ erros: initialErros }: CadernoErrosProps) {
  const [erros, setErros] = useState(initialErros)
  const [showDone, setShowDone] = useState(true)
  const [dificuldadeFiltro, setDificuldadeFiltro] = useState<DifficultyLabel | null>(null)
  const [filterOpen, setFilterOpen] = useState(false)

  function handleRevisaoChange(
    idProvaAluno: string,
    idQuestao: string,
    revisao1: boolean,
    revisao2: boolean,
    revisao3: boolean,
  ) {
    setErros((prev) =>
      prev.map((e) =>
        e.idProvaAluno === idProvaAluno && e.idQuestao === idQuestao
          ? { ...e, revisao1, revisao2, revisao3 }
          : e
      )
    )
  }

  const groups = erros.reduce<Record<string, GetCadernoErrosResponse[]>>((acc, erro) => {
    if (!acc[erro.assunto]) acc[erro.assunto] = []
    acc[erro.assunto].push(erro)
    return acc
  }, {})

  const filteredGroups = Object.entries(groups).reduce<Record<string, GetCadernoErrosResponse[]>>(
    (acc, [assunto, items]) => {
      let filtered = showDone
        ? items
        : items.filter((e) => !(e.revisao1 && e.revisao2 && e.revisao3))

      if (dificuldadeFiltro) {
        filtered = filtered.filter((e) => toDifficultyLabel(e.dificuldade) === dificuldadeFiltro)
      }

      if (filtered.length > 0) acc[assunto] = filtered
      return acc
    },
    {}
  )

  const totalDone = erros.filter((e) => e.revisao1 && e.revisao2 && e.revisao3).length
  const isEmpty = Object.keys(filteredGroups).length === 0

  return (
    <div className="flex flex-col gap-4 pb-8">
      {/* Section header */}
      <div className="mb-1 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <h2
            className="font-heading text-[18px] font-extrabold tracking-tight"
            style={{ color: 'oklch(0.22 0.02 240)' }}
          >
            Caderno de Erros
          </h2>
          <span
            className="rounded-full border px-2 py-0.5 font-mono text-[11px] font-semibold"
            style={{
              color: 'var(--color-secondary)',
              background: 'oklch(0.96 0.015 186)',
              borderColor: 'oklch(0.85 0.03 186)',
            }}
          >
            {totalDone}/{erros.length} revisadas
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Dificuldade filter */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setFilterOpen((v) => !v)}
              className="flex h-9 items-center gap-2 rounded-[10px] border border-border bg-white px-3.5 text-[13px] font-medium transition-colors hover:bg-[var(--page-bg)]"
              style={{ color: dificuldadeFiltro ? 'var(--color-secondary)' : '#94a3b8' }}
            >
              {dificuldadeFiltro ?? 'Dificuldade'}
              <ChevronDown size={13} />
            </button>

            {filterOpen && (
              <div
                className="absolute right-0 top-[calc(100%+4px)] z-20 min-w-[180px] overflow-hidden rounded-[12px] border border-border bg-white py-1"
                style={{ boxShadow: '0 4px 24px -4px rgba(15,23,42,0.12)' }}
              >
                {DIFICULDADES.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => {
                      setDificuldadeFiltro((prev) => prev === d ? null : d)
                      setFilterOpen(false)
                    }}
                    className="flex w-full items-center justify-between px-3.5 py-2 text-left text-[13px] transition-colors hover:bg-[var(--page-bg)]"
                    style={{ color: dificuldadeFiltro === d ? 'var(--color-secondary)' : 'oklch(0.22 0.02 240)' }}
                  >
                    {d}
                    {dificuldadeFiltro === d && (
                      <span className="font-mono text-[10px]" style={{ color: '#94a3b8' }}>✕</span>
                    )}
                  </button>
                ))}
                {dificuldadeFiltro && (
                  <>
                    <div className="my-1 border-t border-border" />
                    <button
                      type="button"
                      onClick={() => { setDificuldadeFiltro(null); setFilterOpen(false) }}
                      className="flex w-full items-center px-3.5 py-2 text-left text-[13px] transition-colors hover:bg-[var(--page-bg)]"
                      style={{ color: '#94a3b8' }}
                    >
                      Limpar filtro
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Show/hide done */}
          <button
            type="button"
            onClick={() => setShowDone((v) => !v)}
            className="flex h-9 items-center gap-2 rounded-[10px] border border-border bg-white px-3.5 text-[13px] font-medium transition-colors hover:bg-[var(--page-bg)]"
            style={{ color: '#94a3b8' }}
          >
            {showDone ? <EyeOff size={13} /> : <Eye size={13} />}
            {showDone ? 'Ocultar concluídos' : 'Mostrar concluídos'}
          </button>
        </div>
      </div>

      {isEmpty ? (
        <div
          className="rounded-[18px] border border-dashed border-border py-16 text-center"
          style={{ background: 'white' }}
        >
          <p className="font-mono text-[12px] uppercase tracking-[0.12em]" style={{ color: '#94a3b8' }}>
            {erros.length === 0
              ? 'Nenhum erro registrado ainda'
              : dificuldadeFiltro
              ? `Nenhum erro para "${dificuldadeFiltro}"`
              : 'Todos os erros foram revisados'}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {Object.entries(filteredGroups).map(([assunto, items]) => (
            <CadernoAssuntoGroup
              key={assunto}
              assunto={assunto}
              erros={items}
              onRevisaoChange={handleRevisaoChange}
            />
          ))}
        </div>
      )}
    </div>
  )
}
