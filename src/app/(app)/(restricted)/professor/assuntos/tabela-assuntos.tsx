'use client'

import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { deleteAssunto } from "@/http/delete-assunto"
import type { Assunto } from "@/http/get-assuntos"
import { updateAssunto } from "@/http/update-assunto"
import { Check, Loader2, Pencil, Plus, Search, Trash2, X } from "lucide-react"
import Link from "next/link"
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

  // ── Search ──
  const [search, setSearch] = useState('')

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
    onAtualizarAssunto(value, labelEditada.trim())
    try {
      await updateAssunto({ data: { value, label: labelEditada.trim() } })
      toast.success('Assunto atualizado.')
      setEditando(null)
    } catch {
      onAtualizarAssunto(value, labelAnterior)
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
    onRemoverAssunto(assuntoParaDeletar.value)
    try {
      await deleteAssunto(assuntoParaDeletar.value)
      toast.success('Assunto removido.')
    } catch {
      onRestaurarAssunto(assuntoParaDeletar)
      toast.error('Erro ao remover assunto.')
    } finally {
      setDeletando(false)
      setAlertAberto(false)
      setAssuntoParaDeletar(null)
    }
  }

  const filtered = assuntos.filter((a) =>
    a.label.toLowerCase().includes(search.toLowerCase()) ||
    a.value.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      {/* Section header */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <h2
            className="font-heading text-[18px] font-extrabold tracking-tight"
            style={{ color: 'oklch(0.22 0.02 240)' }}
          >
            Assuntos
          </h2>
          <span
            className="rounded-full border px-2 py-0.5 font-mono text-[11px] font-semibold"
            style={{
              color: 'var(--color-secondary)',
              background: 'oklch(0.96 0.015 186)',
              borderColor: 'oklch(0.85 0.03 186)',
            }}
          >
            {assuntos.length} TOTAL
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Search */}
          <div
            className="flex h-9 flex-1 items-center gap-2 rounded-[10px] border border-border bg-white px-3 text-[13px] sm:flex-none"
            style={{ color: '#94a3b8', minWidth: 'min(220px, 100%)' }}
          >
            <Search size={13} className="shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nome ou ID…"
              className="flex-1 border-0 bg-transparent outline-none"
              style={{ color: 'oklch(0.22 0.02 240)', fontFamily: 'inherit' }}
            />
          </div>

          {/* Novo assunto */}
          <Link
            href="/professor/cadastro-assunto"
            className="flex h-9 shrink-0 items-center gap-2 rounded-[10px] px-3.5 text-[13.5px] font-semibold text-white transition-all hover:opacity-90"
            style={{
              background: 'linear-gradient(180deg, var(--color-primary) 0%, oklch(0.58 0.19 35) 100%)',
              boxShadow: '0 1px 0 rgba(255,255,255,0.25) inset, 0 8px 22px -10px var(--color-primary)',
            }}
          >
            <Plus size={14} strokeWidth={2.5} />
            Novo assunto
          </Link>
        </div>
      </div>

      {/* Table */}
      <div
        className="overflow-x-auto rounded-[18px] border border-border bg-white"
        style={{ boxShadow: '0 1px 0 rgba(15,23,42,0.02)' }}
      >
        <table className="w-full min-w-[560px] border-separate border-spacing-0 text-[13.5px]">
          <thead>
            <tr>
              {[
                { label: 'ID', align: 'left' },
                { label: 'Nome', align: 'left' },
                { label: 'Questões', align: 'left' },
                { label: 'Ações', align: 'right' },
              ].map(({ label, align }) => (
                <th
                  key={label}
                  className="whitespace-nowrap border-b border-border px-[18px] py-3.5 font-mono text-[10.5px] uppercase tracking-[0.14em]"
                  style={{
                    color: '#94a3b8',
                    background: 'linear-gradient(180deg, var(--page-bg), transparent)',
                    textAlign: align as 'left' | 'right',
                  }}
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((assunto) => (
              <tr
                key={assunto.value}
                className="transition-colors hover:bg-[var(--page-bg)]"
              >
                {/* ID */}
                <td className="border-b border-border px-[18px] py-3.5" style={{ width: 180 }}>
                  <span className="font-mono text-[12px]" style={{ color: '#94a3b8' }}>
                    {assunto.value}
                  </span>
                </td>

                {/* Nome — inline edit */}
                <td className="border-b border-border px-[18px] py-3.5">
                  {editando === assunto.value ? (
                    <input
                      value={labelEditada}
                      onChange={(e) => setLabelEditada(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') salvarEdicao(assunto.value)
                        if (e.key === 'Escape') cancelarEdicao()
                      }}
                      className="h-8 max-w-xs rounded-[8px] border border-border bg-white px-2.5 font-[inherit] text-[13.5px] outline-none ring-0 focus:border-[var(--color-secondary)]"
                      style={{ color: 'oklch(0.22 0.02 240)' }}
                      autoFocus
                    />
                  ) : (
                    <span
                      className="text-[13.5px]"
                      style={{ color: 'oklch(0.22 0.02 240)' }}
                    >
                      {assunto.label}
                    </span>
                  )}
                </td>

                {/* Questões */}
                <td className="border-b border-border px-[18px] py-3.5">
                  <span
                    className="rounded-full px-2.5 py-1 font-mono text-[11px] font-semibold"
                    style={
                      assunto.numQuestoes > 0
                        ? {
                            color: 'oklch(0.42 0.13 145)',
                            background: 'oklch(0.97 0.05 105)',
                            border: '1px solid oklch(0.88 0.08 145)',
                          }
                        : {
                            color: '#94a3b8',
                            background: '#F1F5F9',
                            border: '1px solid #E2E8F0',
                          }
                    }
                  >
                    {assunto.numQuestoes}
                  </span>
                </td>

                {/* Ações */}
                <td className="border-b border-border px-[18px] py-3.5">
                  <div className="flex justify-end gap-1.5">
                    {editando === assunto.value ? (
                      <>
                        <button
                          onClick={() => salvarEdicao(assunto.value)}
                          disabled={salvando}
                          title="Salvar"
                          className="flex h-8 w-8 items-center justify-center rounded-[9px] border border-border bg-white transition-all hover:border-[var(--color-secondary)] hover:bg-[oklch(0.96_0.015_186)] hover:text-[var(--color-secondary)] disabled:opacity-50"
                          style={{ color: '#94a3b8' }}
                        >
                          {salvando
                            ? <Loader2 size={14} className="animate-spin" />
                            : <Check size={14} />}
                        </button>
                        <button
                          onClick={cancelarEdicao}
                          disabled={salvando}
                          title="Cancelar"
                          className="flex h-8 w-8 items-center justify-center rounded-[9px] border border-border bg-white transition-all hover:border-red-300 hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
                          style={{ color: '#94a3b8' }}
                        >
                          <X size={14} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => iniciarEdicao(assunto)}
                          title="Editar"
                          className="flex h-8 w-8 items-center justify-center rounded-[9px] border border-border bg-white transition-all hover:border-[var(--color-secondary)] hover:bg-[oklch(0.96_0.015_186)] hover:text-[var(--color-secondary)]"
                          style={{ color: '#94a3b8' }}
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => abrirConfirmacaoDeletar(assunto)}
                          title="Remover"
                          className="flex h-8 w-8 items-center justify-center rounded-[9px] border border-border bg-white transition-all hover:border-red-300 hover:bg-red-50 hover:text-red-500"
                          style={{ color: '#94a3b8' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          className="flex items-center justify-between border-t border-border px-[18px] py-3"
          style={{ background: 'var(--page-bg)' }}
        >
          <span className="font-mono text-[11.5px]" style={{ color: '#94a3b8' }}>
            Mostrando {filtered.length} de {assuntos.length} assuntos
          </span>
        </div>
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
                ? <Loader2 className="mr-2 size-4 animate-spin" />
                : <Trash2 className="mr-2 size-4" />}
              Confirmar remoção
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
