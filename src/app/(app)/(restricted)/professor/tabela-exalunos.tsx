'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { deleteAluno } from '@/http/delete-aluno'
import type { GetAlunosProfessor } from '@/http/get-alunos'
import { restoreAluno } from '@/http/restore-aluno'
import { BarChart3, LayoutGrid, List, Loader2, MoreHorizontal, Search, Trash2, Undo2 } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export interface TabelaExAlunosProps {
  exAlunos: GetAlunosProfessor[]
}

function initials(nome: string) {
  const parts = nome.trim().split(' ')
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

const AVATAR_GRADIENTS = [
  'linear-gradient(135deg, #94a3b8, #64748b)',
  'linear-gradient(135deg, #9ca3af, #6b7280)',
  'linear-gradient(135deg, #a8a29e, #78716c)',
]

// ── Ex-Aluno Card ──────────────────────────────────────────────────────────

interface ExAlunoCardProps {
  exAluno: GetAlunosProfessor
  onRestore: (exAluno: GetAlunosProfessor) => void
  onDelete: (exAluno: GetAlunosProfessor) => void
}

function ExAlunoCard({ exAluno, onRestore, onDelete }: ExAlunoCardProps) {
  const ultimaProva = exAluno.provas[exAluno.provas.length - 1]

  return (
    <article className="group relative overflow-hidden rounded-[20px] border border-border bg-white p-[18px] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-22px_rgba(15,23,42,0.14)]">
      {/* Card header */}
      <div className="mb-4 flex items-center gap-3">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] text-[14px] font-extrabold text-white"
          style={{ background: 'linear-gradient(135deg, #94a3b8, #64748b)' }}
        >
          {initials(exAluno.nome)}
        </div>
        <div className="min-w-0 flex-1">
          <p
            className="truncate text-[15px] font-bold leading-[1.2]"
            style={{ color: 'oklch(0.22 0.02 240)' }}
          >
            {exAluno.nome}
          </p>
          <p className="mt-0.5 font-mono text-[11px] tracking-[0.04em]" style={{ color: '#94a3b8' }}>
            INGRESSO · {exAluno.dataIngresso}
          </p>
        </div>
        <span
          className="shrink-0 rounded-full px-2 py-1 text-[11px] font-semibold"
          style={{ color: '#64748b', background: '#F1F5F9', border: '1px solid #E2E8F0' }}
        >
          Ex-aluno
        </span>
      </div>

      {/* Stats block */}
      <div
        className="flex min-h-[72px] items-center gap-6 rounded-[14px] border px-4 py-3"
        style={{
          background: 'linear-gradient(180deg, var(--page-bg) 0%, transparent 100%)',
          borderColor: 'var(--color-border)',
          borderStyle: 'dashed',
        }}
      >
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: '#94a3b8' }}>
            Provas
          </p>
          <p className="font-heading text-[20px] font-bold" style={{ color: 'oklch(0.22 0.02 240)' }}>
            {exAluno.provas.length}
          </p>
        </div>
        <div
          className="h-8 w-px"
          style={{ background: 'var(--color-border)' }}
        />
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: '#94a3b8' }}>
            GCP médio
          </p>
          <p className="font-heading text-[20px] font-bold" style={{ color: exAluno.provas.length > 0 ? 'oklch(0.22 0.02 240)' : '#CBD5E1' }}>
            {exAluno.provas.length > 0 ? exAluno.gcpMedio : '—'}
          </p>
        </div>
        {ultimaProva && (
          <>
            <div className="h-8 w-px" style={{ background: 'var(--color-border)' }} />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: '#94a3b8' }}>
                Última prova
              </p>
              <p className="font-heading text-[14px] font-bold leading-tight" style={{ color: 'oklch(0.22 0.02 240)' }}>
                {ultimaProva.nome}
                <span className="ml-1 font-mono text-[11px] font-normal" style={{ color: '#94a3b8' }}>
                  · {ultimaProva.gcp}
                </span>
              </p>
            </div>
          </>
        )}
      </div>

      {/* Actions */}
      <div className="mt-3.5 flex gap-2">
        <Link
          href={`/professor/aluno/${exAluno.slug}/dashboard`}
          className="flex flex-1 h-9 items-center justify-center gap-1.5 rounded-[10px] border border-border bg-white text-[12.5px] font-semibold transition-all hover:border-slate-400 hover:text-slate-600"
          style={{ color: 'oklch(0.36 0.015 240)' }}
        >
          <BarChart3 size={13} />
          Dashboard
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-[10px] border border-border bg-white transition-all hover:border-slate-400"
              style={{ color: '#94a3b8' }}
            >
              <MoreHorizontal size={15} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" style={{ width: 190 }}>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => onRestore(exAluno)}
            >
              <Undo2 size={13} />
              Restaurar aluno
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              className="cursor-pointer"
              onClick={() => onDelete(exAluno)}
            >
              <Trash2 size={13} />
              Excluir permanentemente
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </article>
  )
}

// ── Main component ─────────────────────────────────────────────────────────

export function TabelaExAlunos({ exAlunos }: TabelaExAlunosProps) {
  const [listaLocal, setListaLocal] = useState(exAlunos)
  useEffect(() => { setListaLocal(exAlunos) }, [exAlunos])

  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards')
  const [search, setSearch] = useState('')

  const [restaurando, setRestaurando] = useState<GetAlunosProfessor | null>(null)
  const [salvandoRestaurar, setSalvandoRestaurar] = useState(false)

  const [excluindo, setExcluindo] = useState<GetAlunosProfessor | null>(null)
  const [salvandoExcluir, setSalvandoExcluir] = useState(false)

  const filtered = listaLocal.filter((a) =>
    a.nome.toLowerCase().includes(search.toLowerCase()),
  )

  const confirmarRestaurar = async () => {
    if (!restaurando) return
    setSalvandoRestaurar(true)
    try {
      await restoreAluno(restaurando.slug)
      setListaLocal((prev) => prev.filter((a) => a.slug !== restaurando.slug))
      setRestaurando(null)
      toast.success(`${restaurando.nome} foi restaurado para a turma.`)
    } catch {
      toast.error('Erro ao restaurar o aluno.')
    } finally {
      setSalvandoRestaurar(false)
    }
  }

  const confirmarExcluir = async () => {
    if (!excluindo) return
    setSalvandoExcluir(true)
    try {
      await deleteAluno(excluindo.slug)
      setListaLocal((prev) => prev.filter((a) => a.slug !== excluindo.slug))
      setExcluindo(null)
      toast.success(`${excluindo.nome} foi excluído permanentemente.`)
    } catch {
      toast.error('Erro ao excluir o aluno.')
    } finally {
      setSalvandoExcluir(false)
    }
  }

  return (
    <>
      {/* ── Stat card ── */}
      <div className="mb-7">
        <div className="relative overflow-hidden rounded-[18px] border border-border bg-white p-5" style={{ maxWidth: 300 }}>
          <div className="absolute inset-x-0 top-0 h-[3px]" style={{ background: '#94a3b8' }} />
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.14em]" style={{ color: '#94a3b8' }}>
                Ex-alunos
              </p>
              <p className="font-heading text-[36px] font-extrabold leading-none tracking-tight" style={{ color: '#64748b' }}>
                {listaLocal.length}
                <small className="ml-2 font-mono text-[11px] font-semibold tracking-[0.04em]" style={{ color: '#94a3b8' }}>
                  arquivados
                </small>
              </p>
            </div>
            <svg width="76" height="56" viewBox="0 0 76 56" fill="none" style={{ color: '#94a3b8' }}>
              <circle cx="24" cy="28" r="14" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" />
              <path d="M38 28 H58 M52 22 L58 28 L52 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Section header ── */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2
          className="font-heading text-[18px] font-extrabold tracking-tight"
          style={{ color: 'oklch(0.22 0.02 240)' }}
        >
          Ex-alunos
        </h2>

        <div className="flex items-center gap-2">
          <div
            className="flex h-9 flex-1 items-center gap-2 rounded-[10px] border border-border bg-white px-3 text-[13px] sm:flex-none"
            style={{ color: '#94a3b8', minWidth: 'min(220px, 100%)' }}
          >
            <Search size={13} className="shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nome…"
              className="flex-1 border-0 bg-transparent outline-none"
              style={{ color: 'oklch(0.22 0.02 240)', fontFamily: 'inherit' }}
            />
          </div>

          <div
            className="flex rounded-[10px] border border-border p-0.5"
            style={{ background: 'var(--page-bg)' }}
          >
            {([
              { mode: 'cards' as const, icon: LayoutGrid },
              { mode: 'table' as const, icon: List },
            ] as const).map(({ mode, icon: Icon }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className="flex h-7 w-8 cursor-pointer items-center justify-center rounded-[7px] transition-all"
                style={{
                  background: viewMode === mode ? 'white' : 'transparent',
                  color: viewMode === mode ? 'oklch(0.22 0.02 240)' : '#94a3b8',
                  boxShadow:
                    viewMode === mode
                      ? '0 1px 0 rgba(15,23,42,0.04), inset 0 0 0 1px var(--color-border)'
                      : 'none',
                }}
              >
                <Icon size={14} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Empty state ── */}
      {listaLocal.length === 0 && (
        <div
          className="flex flex-col items-center justify-center rounded-[20px] border border-dashed py-16 text-center"
          style={{ borderColor: '#CBD5E1', background: 'white' }}
        >
          <div
            className="mb-4 flex h-12 w-12 items-center justify-center rounded-[16px]"
            style={{ background: '#F1F5F9' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: '#94a3b8' }}>
              <circle cx="9" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
              <path d="M14 12 H20 M17 9 L20 12 L17 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-[15px] font-bold" style={{ color: 'oklch(0.22 0.02 240)' }}>
            Nenhum ex-aluno encontrado
          </p>
          <p className="mt-1 text-[13px]" style={{ color: '#94a3b8' }}>
            Alunos removidos da turma aparecerão aqui.
          </p>
        </div>
      )}

      {/* ── Cards view ── */}
      {viewMode === 'cards' && filtered.length > 0 && (
        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
          {filtered.map((exAluno) => (
            <ExAlunoCard
              key={exAluno.slug}
              exAluno={exAluno}
              onRestore={setRestaurando}
              onDelete={setExcluindo}
            />
          ))}
        </div>
      )}

      {/* ── Table view ── */}
      {viewMode === 'table' && filtered.length > 0 && (
        <div
          className="overflow-x-auto rounded-[18px] border border-border bg-white"
          style={{ boxShadow: '0 1px 0 rgba(15,23,42,0.02)' }}
        >
          <table className="w-full min-w-[600px] border-separate border-spacing-0 text-[13.5px]">
            <thead>
              <tr>
                {['Aluno', 'GCP médio', 'Nº de provas', 'Ingresso', 'Ações'].map((h, i) => (
                  <th
                    key={h}
                    className="whitespace-nowrap border-b border-border px-[18px] py-3.5 text-left font-mono text-[10.5px] uppercase tracking-[0.14em]"
                    style={{
                      color: '#94a3b8',
                      background: 'linear-gradient(180deg, var(--page-bg), transparent)',
                      textAlign: i === 4 ? 'right' : 'left',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((exAluno, i) => (
                <tr
                  key={exAluno.slug}
                  className="transition-colors hover:bg-[var(--page-bg)]"
                >
                  <td className="border-b border-border px-[18px] py-3.5">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] text-[12px] font-extrabold text-white"
                        style={{ background: AVATAR_GRADIENTS[i % 3] }}
                      >
                        {initials(exAluno.nome)}
                      </div>
                      <p className="font-semibold" style={{ color: 'oklch(0.22 0.02 240)' }}>
                        {exAluno.nome}
                      </p>
                    </div>
                  </td>
                  <td className="border-b border-border px-[18px] py-3.5">
                    <span className="font-heading text-[18px] font-extrabold tracking-tight" style={{ color: exAluno.provas.length > 0 ? '#64748b' : '#CBD5E1' }}>
                      {exAluno.provas.length > 0 ? exAluno.gcpMedio : '—'}
                    </span>
                  </td>
                  <td className="border-b border-border px-[18px] py-3.5">
                    <span className="font-bold" style={{ color: 'oklch(0.22 0.02 240)' }}>
                      {exAluno.provas.length}
                    </span>
                    <span className="ml-1.5 font-mono text-[11px]" style={{ color: '#94a3b8' }}>
                      {exAluno.provas.length === 1 ? 'realizada' : 'realizadas'}
                    </span>
                  </td>
                  <td className="border-b border-border px-[18px] py-3.5">
                    <span className="font-mono text-[12.5px]" style={{ color: 'oklch(0.36 0.015 240)' }}>
                      {exAluno.dataIngresso}
                    </span>
                  </td>
                  <td className="border-b border-border px-[18px] py-3.5">
                    <div className="flex justify-end gap-1.5">
                      <Link
                        href={`/professor/aluno/${exAluno.slug}/dashboard`}
                        title="Dashboard"
                        className="flex h-8 w-8 items-center justify-center rounded-[9px] border border-border bg-white transition-all hover:border-slate-400 hover:text-slate-600"
                        style={{ color: '#94a3b8' }}
                      >
                        <BarChart3 size={14} />
                      </Link>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[9px] border border-border bg-white transition-all hover:border-slate-400"
                            style={{ color: '#94a3b8' }}
                          >
                            <MoreHorizontal size={14} />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" style={{ width: 190 }}>
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => setRestaurando(exAluno)}
                          >
                            <Undo2 size={13} />
                            Restaurar aluno
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            variant="destructive"
                            className="cursor-pointer"
                            onClick={() => setExcluindo(exAluno)}
                          >
                            <Trash2 size={13} />
                            Excluir permanentemente
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
              Mostrando {filtered.length} de {listaLocal.length} ex-alunos
            </span>
          </div>
        </div>
      )}

      {/* ── Modal de restauração ── */}
      <Dialog
        open={!!restaurando}
        onOpenChange={(open) => { if (!open && !salvandoRestaurar) setRestaurando(null) }}
      >
        <DialogContent className="gap-0 overflow-hidden rounded-[22px] border-border p-0 shadow-[0_24px_64px_-12px_rgba(15,23,42,0.22)] sm:max-w-[420px]">
          <div className="border-b border-border px-6 pb-5 pr-12 pt-6">
            <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: '#94a3b8' }}>
              Restaurar aluno
            </p>
            <DialogTitle
              className="font-heading text-[20px] font-bold leading-tight"
              style={{ color: 'oklch(0.22 0.02 240)' } as React.CSSProperties}
            >
              {restaurando?.nome}
            </DialogTitle>
            <DialogDescription
              className="mt-2 text-[13px] leading-[1.6]"
              style={{ color: 'oklch(0.45 0.02 240)' } as React.CSSProperties}
            >
              Este aluno será restaurado para a sua turma e voltará a aparecer normalmente. Todo o
              histórico de provas e caderno de erros será mantido.
            </DialogDescription>
          </div>
          <div className="flex flex-col gap-2 px-6 py-4">
            <button
              onClick={confirmarRestaurar}
              disabled={salvandoRestaurar}
              className="flex w-full h-10 cursor-pointer items-center justify-center gap-2.5 rounded-[10px] text-[13px] font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
              style={{
                background: 'linear-gradient(180deg, var(--color-secondary) 0%, oklch(0.38 0.10 186) 100%)',
                boxShadow: '0 1px 0 rgba(255,255,255,0.15) inset',
              }}
            >
              {salvandoRestaurar
                ? <Loader2 size={14} className="animate-spin" />
                : <><Undo2 size={14} /> Restaurar</>}
            </button>
            <button
              onClick={() => setRestaurando(null)}
              disabled={salvandoRestaurar}
              className="flex w-full h-9 cursor-pointer items-center justify-center rounded-[10px] border border-border bg-white text-[13px] font-semibold transition-all hover:bg-[var(--page-bg)] disabled:opacity-50"
              style={{ color: 'oklch(0.36 0.015 240)' }}
            >
              Cancelar
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Modal de exclusão permanente ── */}
      <Dialog
        open={!!excluindo}
        onOpenChange={(open) => { if (!open && !salvandoExcluir) setExcluindo(null) }}
      >
        <DialogContent className="gap-0 overflow-hidden rounded-[22px] border-border p-0 shadow-[0_24px_64px_-12px_rgba(15,23,42,0.22)] sm:max-w-[420px]">
          <div className="border-b border-border px-6 pb-5 pr-12 pt-6">
            <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: 'oklch(0.465 0.155 10)' }}>
              Exclusão permanente
            </p>
            <DialogTitle
              className="font-heading text-[20px] font-bold leading-tight"
              style={{ color: 'oklch(0.22 0.02 240)' } as React.CSSProperties}
            >
              {excluindo?.nome}
            </DialogTitle>
            <DialogDescription
              className="mt-2 text-[13px] leading-[1.6]"
              style={{ color: 'oklch(0.45 0.02 240)' } as React.CSSProperties}
            >
              Esta ação é <strong>irreversível</strong>. O aluno será excluído do banco de dados
              junto com todo o histórico de provas, respostas e caderno de erros. Não será possível
              recuperar os dados.
            </DialogDescription>
          </div>
          <div className="flex flex-col gap-2 px-6 py-4">
            <button
              onClick={confirmarExcluir}
              disabled={salvandoExcluir}
              className="flex w-full h-10 cursor-pointer items-center justify-center gap-2.5 rounded-[10px] text-[13px] font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
              style={{
                background: 'linear-gradient(180deg, oklch(0.465 0.155 10) 0%, oklch(0.38 0.13 10) 100%)',
                boxShadow: '0 1px 0 rgba(255,255,255,0.15) inset',
              }}
            >
              {salvandoExcluir
                ? <Loader2 size={14} className="animate-spin" />
                : <><Trash2 size={14} /> Excluir permanentemente</>}
            </button>
            <button
              onClick={() => setExcluindo(null)}
              disabled={salvandoExcluir}
              className="flex w-full h-9 cursor-pointer items-center justify-center rounded-[10px] border border-border bg-white text-[13px] font-semibold transition-all hover:bg-[var(--page-bg)] disabled:opacity-50"
              style={{ color: 'oklch(0.36 0.015 240)' }}
            >
              Cancelar
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
