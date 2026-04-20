'use client'

import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { deleteAssunto } from "@/http/delete-assunto"
import type { Assunto } from "@/http/get-assuntos"
import { updateAssunto } from "@/http/update-assunto"
import { Check, Loader2, Pencil, Trash2, X } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export interface TabelaAssuntosProps {
  assuntos: Assunto[]
  onRemoverAssunto: (value: string) => void
  onRestaurarAssunto: (assunto: Assunto) => void
  onAtualizarAssunto: (value: string, label: string) => void
}

export function TabelaAssuntos({
  assuntos,
  onRemoverAssunto,
  onRestaurarAssunto,
  onAtualizarAssunto,
}: TabelaAssuntosProps) {
  // ── Edição inline ──
  const [editando, setEditando] = useState<string | null>(null)
  const [labelEditada, setLabelEditada] = useState('')
  const [salvando, setSalvando] = useState(false)

  // ── Delete ──
  const [alertAberto, setAlertAberto] = useState(false)
  const [assuntoParaDeletar, setAssuntoParaDeletar] = useState<Assunto | null>(null)
  const [deletando, setDeletando] = useState(false)

  const iniciarEdicao = (assunto: Assunto) => {
    setEditando(assunto.value)
    setLabelEditada(assunto.label)
  }

  const cancelarEdicao = () => {
    setEditando(null)
    setLabelEditada('')
  }

  const salvarEdicao = async (value: string) => {
    if (!labelEditada.trim()) return

    const labelAnterior = assuntos.find((a) => a.value === value)!.label
    setSalvando(true)
    onAtualizarAssunto(value, labelEditada.trim()) // optimistic
    try {
      await updateAssunto({ data: { value, label: labelEditada.trim() } })
      toast.success('Assunto atualizado.')
      setEditando(null)
    } catch {
      onAtualizarAssunto(value, labelAnterior) // rollback
      toast.error('Erro ao atualizar assunto.')
    } finally {
      setSalvando(false)
    }
  }

  const abrirConfirmacaoDeletar = (assunto: Assunto) => {
    setAssuntoParaDeletar(assunto)
    setAlertAberto(true)
  }

  const confirmarDeletar = async () => {
    if (!assuntoParaDeletar) return

    setDeletando(true)
    onRemoverAssunto(assuntoParaDeletar.value) // optimistic
    try {
      await deleteAssunto(assuntoParaDeletar.value)
      toast.success('Assunto removido.')
    } catch {
      onRestaurarAssunto(assuntoParaDeletar) // rollback
      toast.error('Erro ao remover assunto.')
    } finally {
      setDeletando(false)
      setAlertAberto(false)
      setAssuntoParaDeletar(null)
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Questões</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assuntos.map((assunto) => (
              <TableRow key={assunto.value}>
                <TableCell className="font-mono text-sm text-muted-foreground">
                  {assunto.value}
                </TableCell>

                <TableCell>
                  {editando === assunto.value ? (
                    <Input
                      value={labelEditada}
                      onChange={(e) => setLabelEditada(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') salvarEdicao(assunto.value)
                        if (e.key === 'Escape') cancelarEdicao()
                      }}
                      className="h-8 max-w-xs"
                      autoFocus
                    />
                  ) : (
                    <span className="font-medium">{assunto.label}</span>
                  )}
                </TableCell>

                <TableCell>
                  <Badge variant="secondary">{assunto.numQuestoes}</Badge>
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {editando === assunto.value ? (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => salvarEdicao(assunto.value)}
                          disabled={salvando}
                        >
                          {salvando
                            ? <Loader2 className="size-4 animate-spin" />
                            : <Check className="size-4" />}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={cancelarEdicao}
                          disabled={salvando}
                        >
                          <X className="size-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => iniciarEdicao(assunto)}
                          title="Editar"
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => abrirConfirmacaoDeletar(assunto)}
                          title="Remover"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={alertAberto} onOpenChange={setAlertAberto}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover assunto?</AlertDialogTitle>
            <AlertDialogDescription>
              Você está prestes a remover o assunto{' '}
              <strong>{assuntoParaDeletar?.label}</strong>. Essa ação não pode
              ser desfeita e pode afetar questões vinculadas a ele.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deletando}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmarDeletar}
              disabled={deletando}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deletando
                ? <Loader2 className="size-4 mr-2 animate-spin" />
                : <Trash2 className="size-4 mr-2" />}
              Confirmar remoção
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}