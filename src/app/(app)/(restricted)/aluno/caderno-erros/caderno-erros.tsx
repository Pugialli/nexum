"use client"

import type { GetCadernoErrosResponse } from "@/app/api/caderno-erros/[slug]/get-erros"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { CadernoAssuntoGroup } from "./caderno-assunto-group"

interface CadernoErrosProps {
  erros: GetCadernoErrosResponse[]
}

export function CadernoErros({ erros: initialErros }: CadernoErrosProps) {
  const [erros, setErros] = useState(initialErros)
  const [showDone, setShowDone] = useState(true)

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
      const filtered = showDone
        ? items
        : items.filter((e) => !(e.revisao1 && e.revisao2 && e.revisao3))

      if (filtered.length > 0) acc[assunto] = filtered
      return acc
    },
    {}
  )

  const totalDone = erros.filter((e) => e.revisao1 && e.revisao2 && e.revisao3).length
  const isEmpty = Object.keys(filteredGroups).length === 0

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {totalDone}/{erros.length} questões revisadas
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowDone((v) => !v)}
          className="gap-2"
        >
          {showDone ? (
            <>
              <EyeOff className="h-4 w-4" />
              Ocultar concluídos
            </>
          ) : (
            <>
              <Eye className="h-4 w-4" />
              Mostrar concluídos
            </>
          )}
        </Button>
      </div>

      {isEmpty ? (
        <div className="rounded-xl border border-dashed border-border/50 py-16 text-center">
          <p className="text-sm text-muted-foreground">
            {erros.length === 0
              ? "Nenhum erro registrado ainda."
              : "Todos os erros foram revisados! 🎉"}
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