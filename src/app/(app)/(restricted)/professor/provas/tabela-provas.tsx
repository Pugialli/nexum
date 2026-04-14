'use client'

import type { ProvaSumary } from "@/app/api/prova/get-provas"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { updateProvaStatus } from "@/http/update-prova-status"
import { Pencil } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export interface TabelaProvasProps {
  provas: ProvaSumary[]
}

export function TabelaProvas({ provas }: TabelaProvasProps) {
  const [statusMap, setStatusMap] = useState<Record<string, boolean>>(
    () => Object.fromEntries(provas.map((p) => [p.id, p.statusProva]))
  )

  const handleStatusChange = async (id: string, novoStatus: boolean) => {
    setStatusMap((prev) => ({ ...prev, [id]: novoStatus }))

    try {
      await updateProvaStatus({ provaId: id })
    } catch (error) {
      setStatusMap((prev) => ({ ...prev, [id]: !novoStatus }))
      console.error("Erro ao atualizar status da prova:", error)
    }
  }

  const formatarData = (data: Date) => {
    return new Date(data).toLocaleDateString("pt-BR")
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ano</TableHead>
            <TableHead>Nota Mínima</TableHead>
            <TableHead>Nota Máxima</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Data de Criação</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {provas.map((prova) => (
            <TableRow key={prova.id}>
              <TableCell className="font-medium">{prova.ano}</TableCell>
              <TableCell>{prova.notaMinima}</TableCell>
              <TableCell>{prova.notaMaxima}</TableCell>
              <TableCell>
                <Checkbox
                  checked={statusMap[prova.id]}
                  onCheckedChange={(checked) => handleStatusChange(prova.id, checked as boolean)}
                />
              </TableCell>
              <TableCell>{formatarData(prova.dataCriacao)}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm" asChild title="Editar prova">
                  <Link href={`/professor/provas/${prova.id}/edit`}>
                    <Pencil className="size-4" />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}