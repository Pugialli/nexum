'use client'

import type { ProvaSumary } from '@/app/api/prova/get-provas'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  Dialog, DialogContent, DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { archiveAluno } from '@/http/archive-aluno'
import { deleteProvaAluno } from '@/http/delete-prova-aluno'
import type { GetAlunosProfessor } from '@/http/get-alunos'
import { getProvas } from '@/http/get-provas'
import { resetAlunoPassword } from '@/http/reset-aluno-password'
import {
  BarChart3, FileText, LayoutGrid, List,
  Loader2, MoreHorizontal, Pencil, Plus, RotateCcw, Search, Trash2, UserX,
} from 'lucide-react'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

export interface TabelaAlunosProps {
  alunos: GetAlunosProfessor[]
}

interface ProvaComStatus extends ProvaSumary {
  gcp: number | null
  realizada: boolean
}

// ── Helpers ────────────────────────────────────────────────────────────────

function initials(nome: string) {
  const parts = nome.trim().split(' ')
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

const AVATAR_GRADIENT = 'linear-gradient(135deg, oklch(0.465 0.155 10), oklch(0.635 0.195 35))'

const AVATAR_GRADIENTS = [
  'linear-gradient(135deg, oklch(0.465 0.155 10), oklch(0.635 0.195 35))',
  'linear-gradient(135deg, oklch(0.38 0.10 186), oklch(0.55 0.14 186))',
  'linear-gradient(135deg, oklch(0.52 0.17 50), oklch(0.68 0.15 85))',
]

const RING_COLORS = [
  'oklch(0.465 0.155 10)',
  'oklch(0.42 0.13 186)',
  'oklch(0.58 0.19 35)',
]

function getGcpColors(gcp: number, hasProvas: boolean) {
  if (!hasProvas) return { color: '#94a3b8', trackColor: '#E2E8F0' }
  if (gcp >= 60) return { color: 'oklch(0.42 0.13 145)', trackColor: 'oklch(0.94 0.06 145)' }
  if (gcp >= 40) return { color: 'oklch(0.58 0.19 35)',  trackColor: 'oklch(0.93 0.08 35)' }
  return          { color: 'oklch(0.465 0.155 10)',       trackColor: 'oklch(0.96 0.02 10)' }
}

function buildSparkline(provas: Array<{ gcp: number }>) {
  if (provas.length === 0) return null
  const pts = provas.map((p, i) => ({
    x: provas.length === 1 ? 100 : 2 + (i / (provas.length - 1)) * 196,
    y: 2 + 24 * (1 - Math.max(0, Math.min(100, p.gcp)) / 100),
  }))
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')
  const fill = line + ` L ${pts[pts.length - 1].x.toFixed(1)} 28 L ${pts[0].x.toFixed(1)} 28 Z`
  return { line, fill, last: pts[pts.length - 1] }
}

function getStatus(gcpMedio: number, provasCount: number) {
  if (provasCount === 0) {
    return { label: 'Sem provas', color: '#94a3b8', bg: '#F1F5F9', border: '#E2E8F0' }
  }
  if (gcpMedio >= 60) {
    return {
      label: '▲ Em alta',
      color: 'oklch(0.42 0.13 145)',
      bg: 'oklch(0.97 0.05 105)',
      border: 'oklch(0.88 0.08 145)',
    }
  }
  if (gcpMedio >= 40) {
    return {
      label: '● Atenção',
      color: 'oklch(0.58 0.19 35)',
      bg: 'oklch(0.95 0.08 35)',
      border: 'oklch(0.80 0.12 35)',
    }
  }
  return {
    label: '▼ Crítico',
    color: 'oklch(0.465 0.155 10)',
    bg: 'oklch(0.96 0.02 10)',
    border: 'oklch(0.80 0.10 10)',
  }
}

// ── GCP Ring ───────────────────────────────────────────────────────────────

function GcpRing({ gcp, color, trackColor }: { gcp: number; color: string; trackColor: string }) {
  const r = 36
  const circumference = 2 * Math.PI * r
  const offset = circumference * (1 - Math.max(0, Math.min(100, gcp)) / 100)

  return (
    <div className="relative flex h-[84px] w-[84px] shrink-0 items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 84 84">
        <circle cx="42" cy="42" r={r} fill="none" stroke={trackColor} strokeWidth="8" />
        <circle
          cx="42"
          cy="42"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="text-center">
        <p
          className="font-heading text-[22px] font-extrabold leading-none"
          style={{ color }}
        >
          {Math.round(gcp)}
        </p>
        <p
          className="font-mono text-[9px] uppercase tracking-[0.12em]"
          style={{ color: '#94a3b8' }}
        >
          GCP
        </p>
      </div>
    </div>
  )
}

// ── Aluno Card ─────────────────────────────────────────────────────────────

interface AlunoCardProps {
  aluno: GetAlunosProfessor
  onProvas: (aluno: GetAlunosProfessor) => void
  onRemove: (aluno: GetAlunosProfessor) => void
  onResetSenha: (slug: string, nome: string) => void
  resetting: boolean
}

function AlunoCard({ aluno, onProvas, onRemove, onResetSenha, resetting }: AlunoCardProps) {
  const status = getStatus(aluno.gcpMedio ?? 0, aluno.provas.length)
  const ultimaProva = aluno.provas[aluno.provas.length - 1]
  const { color: ringColor, trackColor: ringTrack } = getGcpColors(aluno.gcpMedio ?? 0, aluno.provas.length > 0)
  const sparkline = buildSparkline(aluno.provas)

  return (
    <article
      className="group relative overflow-hidden rounded-[20px] border border-border bg-white p-[18px] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)]"
      style={{ '--accent': ringColor } as React.CSSProperties}
    >
      {/* Radial glow corner */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{
          background: `radial-gradient(120% 60% at 100% 0%, ${ringColor}22 0%, transparent 60%)`,
        }}
      />

      {/* Card header */}
      <div className="mb-4 flex items-center gap-3">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] text-[14px] font-extrabold text-white"
          style={{
            background: AVATAR_GRADIENT,
            boxShadow: '0 8px 18px -10px oklch(0.7 0.18 20 / 0.6)',
          }}
        >
          {initials(aluno.nome)}
        </div>
        <div className="min-w-0 flex-1">
          <p
            className="truncate text-[15px] font-bold leading-[1.2]"
            style={{ color: 'oklch(0.22 0.02 240)' }}
          >
            {aluno.nome}
          </p>
          <p className="mt-0.5 font-mono text-[11px] tracking-[0.04em]" style={{ color: '#94a3b8' }}>
            INGRESSO · {aluno.dataIngresso}
          </p>
        </div>
        <span
          className="shrink-0 rounded-full px-2 py-1 text-[11px] font-semibold"
          style={{
            color: status.color,
            background: status.bg,
            border: `1px solid ${status.border}`,
          }}
        >
          {status.label}
        </span>
      </div>

      {/* GCP block */}
      <div
        className="flex min-h-[112px] gap-4 rounded-[14px] border p-3.5"
        style={{
          background: 'linear-gradient(180deg, var(--page-bg) 0%, transparent 100%)',
          borderColor: 'var(--color-border)',
          borderStyle: 'dashed',
        }}
      >
        {aluno.provas.length > 0 && sparkline ? (
          <>
            <GcpRing gcp={aluno.gcpMedio ?? 0} color={ringColor} trackColor={ringTrack} />
            <div className="flex flex-1 flex-col justify-center">
              <p
                className="mb-1 font-mono text-[10.5px] uppercase tracking-[0.12em]"
                style={{ color: '#94a3b8' }}
              >
                Evolução · {aluno.provas.length} {aluno.provas.length === 1 ? 'prova' : 'provas'}
              </p>
              <svg className="w-full" height="28" viewBox="0 0 200 28" preserveAspectRatio="none">
                <path d={sparkline.fill} fill={ringColor} fillOpacity=".1" />
                <path
                  d={sparkline.line}
                  fill="none"
                  stroke={ringColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx={sparkline.last.x} cy={sparkline.last.y} r="2.5" fill={ringColor} />
              </svg>
            </div>
          </>
        ) : (
          <div className="flex w-full items-center justify-center">
            <p className="text-[13px]" style={{ color: '#94a3b8' }}>
              Nenhuma prova realizada ainda
            </p>
          </div>
        )}
      </div>

      {/* Mini stats */}
      <div className="mt-3.5 grid grid-cols-2 gap-2.5">
        <div
          className="rounded-xl border border-border bg-white px-3 py-2.5"
        >
          <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: '#94a3b8' }}>
            Provas
          </p>
          <p className="font-heading text-[17px] font-bold tracking-tight" style={{ color: 'oklch(0.22 0.02 240)' }}>
            {aluno.provas.length}
            <small className="ml-1 font-mono text-[11px] font-medium" style={{ color: '#94a3b8' }}>
              {aluno.provas.length === 1 ? 'realizada' : 'realizadas'}
            </small>
          </p>
        </div>
        <div className="rounded-xl border border-border bg-white px-3 py-2.5">
          <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: '#94a3b8' }}>
            Última Prova
          </p>
          <p className="font-heading text-[17px] font-bold tracking-tight" style={{ color: 'oklch(0.22 0.02 240)' }}>
            {ultimaProva ? (
              <>
                {ultimaProva.nome}
                <small className="ml-1 font-mono text-[11px] font-medium" style={{ color: '#94a3b8' }}>
                  · GCP {ultimaProva.gcp}
                </small>
              </>
            ) : (
              <span className="font-mono text-[13px]" style={{ color: '#94a3b8' }}>—</span>
            )}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-3.5 flex gap-2">
        <Link
          href={`/professor/aluno/${aluno.slug}/dashboard`}
          className="flex flex-1 h-9 items-center justify-center gap-1.5 rounded-[10px] border border-border bg-white text-[12.5px] font-semibold transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
          style={{ color: 'oklch(0.36 0.015 240)' }}
        >
          <BarChart3 size={13} />
          Dashboard
        </Link>
        <button
          onClick={() => onProvas(aluno)}
          className="flex flex-1 h-9 cursor-pointer items-center justify-center gap-1.5 rounded-[10px] border border-border bg-white text-[12.5px] font-semibold transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
          style={{ color: 'oklch(0.36 0.015 240)' }}
        >
          <FileText size={13} />
          Provas
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-[10px] border border-border bg-white transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
              style={{ color: '#94a3b8' }}
            >
              <MoreHorizontal size={15} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[180px]" style={{ width: 180 }}>
            <DropdownMenuItem
              className="cursor-pointer"
              disabled={resetting}
              onClick={() => onResetSenha(aluno.slug, aluno.nome)}
            >
              {resetting
                ? <Loader2 size={13} className="animate-spin" />
                : <RotateCcw size={13} />}
              Resetar senha
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/professor/aluno/${aluno.slug}/editar`} className="flex items-center gap-2">
                <Pencil size={13} />
                Editar perfil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              className="cursor-pointer"
              onClick={() => onRemove(aluno)}
            >
              <UserX size={13} />
              Remover da turma
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </article>
  )
}

// ── Main component ─────────────────────────────────────────────────────────

export function TabelaAlunos({ alunos }: TabelaAlunosProps) {
  const [alunosLocal, setAlunosLocal] = useState(alunos)
  useEffect(() => { setAlunosLocal(alunos) }, [alunos])

  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards')
  const [search, setSearch] = useState('')

  // Modais de provas
  const [modalAberto, setModalAberto] = useState(false)
  const [alertAberto, setAlertAberto] = useState(false)
  const [alunoSelecionado, setAlunoSelecionado] = useState<GetAlunosProfessor | null>(null)
  const [provasModal, setProvasModal] = useState<ProvaComStatus[]>([])
  const [carregandoProvas, setCarregandoProvas] = useState(false)
  const [deletando, setDeletando] = useState(false)
  const [provaParaDeletar, setProvaParaDeletar] = useState<{
    provaId: string
    nomeProva: string
  } | null>(null)

  // Reset de senha
  const [resetandoSlug, setResetandoSlug] = useState<string | null>(null)

  // Modal de remoção
  const [removendoAluno, setRemovendoAluno] = useState<GetAlunosProfessor | null>(null)
  const [arquivando, setArquivando] = useState(false)

  const filtered = alunosLocal.filter((a) =>
    a.nome.toLowerCase().includes(search.toLowerCase())
  )

  const handleResetSenha = async (slug: string, nome: string) => {
    setResetandoSlug(slug)
    try {
      await resetAlunoPassword(slug)
      toast.success(`Senha de ${nome} resetada para nexum123.`)
    } catch {
      toast.error(`Erro ao resetar a senha de ${nome}.`)
    } finally {
      setResetandoSlug(null)
    }
  }

  const confirmarRemocao = async () => {
    if (!removendoAluno) return
    setArquivando(true)
    try {
      await archiveAluno(removendoAluno.slug)
      setAlunosLocal((prev) => prev.filter((a) => a.slug !== removendoAluno.slug))
      setRemovendoAluno(null)
      toast.success('Aluno removido da turma.')
    } catch {
      toast.error('Erro ao remover o aluno.')
    } finally {
      setArquivando(false)
    }
  }

  const abrirModalProvas = useCallback(async (aluno: GetAlunosProfessor) => {
    setAlunoSelecionado(aluno)
    setModalAberto(true)
    setCarregandoProvas(true)
    try {
      const { provas: todasProvas } = await getProvas()
      const idsRealizadas = new Set(aluno.provas.map((p) => p.id))
      const provasComStatus: ProvaComStatus[] = todasProvas.map((prova) => ({
        ...prova,
        gcp: aluno.provas.find((p) => p.id === prova.id)?.gcp || null,
        realizada: idsRealizadas.has(prova.id),
      }))
      setProvasModal(provasComStatus)
    } catch {
      toast.error('Erro ao carregar provas.')
    } finally {
      setCarregandoProvas(false)
    }
  }, [])

  const abrirConfirmacaoDeletar = (provaId: string, nomeProva: string) => {
    setProvaParaDeletar({ provaId, nomeProva })
    setAlertAberto(true)
  }

  const confirmarDeletar = async () => {
    if (!provaParaDeletar || !alunoSelecionado) return
    setDeletando(true)
    try {
      await deleteProvaAluno(alunoSelecionado.slug, provaParaDeletar.provaId)
      setProvasModal((prev) =>
        prev.map((p) =>
          p.id === provaParaDeletar.provaId ? { ...p, realizada: false, gcp: null } : p
        )
      )
      toast.success('Prova removida com sucesso.')
    } catch {
      toast.error('Erro ao remover a prova.')
    } finally {
      setDeletando(false)
      setAlertAberto(false)
      setProvaParaDeletar(null)
    }
  }

  const alunosComGcp = alunosLocal.filter((a) => a.gcpMedio != null && a.provas.length > 0)
  const gcpMedio =
    alunosComGcp.length > 0
      ? alunosComGcp.reduce((acc, a) => acc + (a.gcpMedio ?? 0), 0) / alunosComGcp.length
      : null
  const totalProvas = alunosLocal.reduce((acc, a) => acc + a.provas.length, 0)

  return (
    <>
      {/* ── Stat cards ── */}
      <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Total de alunos */}
        <div className="relative overflow-hidden rounded-[18px] border border-border bg-white p-5">
          <div className="absolute inset-x-0 top-0 h-[3px]" style={{ background: 'var(--color-primary)' }} />
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.14em]" style={{ color: '#94a3b8' }}>
                Total de alunos
              </p>
              <p className="font-heading text-[36px] font-extrabold leading-none tracking-tight" style={{ color: 'var(--color-primary)' }}>
                {alunosLocal.length}
                <small className="ml-2 font-mono text-[11px] font-semibold tracking-[0.04em]" style={{ color: '#94a3b8' }}>
                  cadastrados
                </small>
              </p>
            </div>
            <svg className="shrink-0" width="76" height="56" viewBox="0 0 76 56" fill="none" style={{ color: 'var(--color-primary)' }}>
              <path d="M2 44 L14 36 L26 40 L38 24 L50 30 L62 14 L74 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 44 L14 36 L26 40 L38 24 L50 30 L62 14 L74 20 L74 56 L2 56 Z" fill="currentColor" fillOpacity=".1" />
              <circle cx="74" cy="20" r="3" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* GCP médio */}
        <div className="relative overflow-hidden rounded-[18px] border border-border bg-white p-5">
          <div className="absolute inset-x-0 top-0 h-[3px]" style={{ background: 'var(--color-secondary)' }} />
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.14em]" style={{ color: '#94a3b8' }}>
                GCP médio da turma
              </p>
              <p className="font-heading text-[36px] font-extrabold leading-none tracking-tight" style={{ color: 'var(--color-secondary)' }}>
                {gcpMedio != null ? gcpMedio.toFixed(1).replace('.', ',') : '—'}
                {gcpMedio != null && (
                  <small className="ml-2 font-mono text-[11px] font-semibold tracking-[0.04em]" style={{ color: '#94a3b8' }}>
                    / 100
                  </small>
                )}
              </p>
            </div>
            <svg className="shrink-0" width="76" height="56" viewBox="0 0 76 56" fill="none" style={{ color: 'var(--color-secondary)' }}>
              <rect x="2"  y="34" width="8" height="22" rx="2" fill="currentColor" fillOpacity=".25" />
              <rect x="14" y="26" width="8" height="30" rx="2" fill="currentColor" fillOpacity=".4" />
              <rect x="26" y="20" width="8" height="36" rx="2" fill="currentColor" fillOpacity=".55" />
              <rect x="38" y="14" width="8" height="42" rx="2" fill="currentColor" fillOpacity=".7" />
              <rect x="50" y="22" width="8" height="34" rx="2" fill="currentColor" fillOpacity=".85" />
              <rect x="62" y="10" width="8" height="46" rx="2" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Provas realizadas */}
        <div className="relative overflow-hidden rounded-[18px] border border-border bg-white p-5">
          <div className="absolute inset-x-0 top-0 h-[3px]" style={{ background: 'oklch(0.465 0.155 10)' }} />
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.14em]" style={{ color: '#94a3b8' }}>
                Provas realizadas
              </p>
              <p className="font-heading text-[36px] font-extrabold leading-none tracking-tight" style={{ color: 'oklch(0.465 0.155 10)' }}>
                {totalProvas}
                <small className="ml-2 font-mono text-[11px] font-semibold tracking-[0.04em]" style={{ color: '#94a3b8' }}>
                  no total
                </small>
              </p>
            </div>
            <svg className="shrink-0" width="76" height="56" viewBox="0 0 76 56" fill="none" style={{ color: 'oklch(0.465 0.155 10)' }}>
              <circle cx="38" cy="28" r="20" fill="none" stroke="currentColor" strokeOpacity=".18" strokeWidth="6" />
              <path d="M38 8 a 20 20 0 0 1 17.32 30" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Section header ── */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <h2
            className="font-heading text-[18px] font-extrabold tracking-tight"
            style={{ color: 'oklch(0.22 0.02 240)' }}
          >
            Alunos
          </h2>
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
              placeholder="Buscar por nome…"
              className="flex-1 border-0 bg-transparent outline-none"
              style={{ color: 'oklch(0.22 0.02 240)', fontFamily: 'inherit' }}
            />
          </div>

          {/* View toggle */}
          <div
            className="flex rounded-[10px] border border-border p-0.5"
            style={{ background: 'var(--page-bg)' }}
          >
            {[
              { mode: 'cards' as const, icon: LayoutGrid },
              { mode: 'table' as const, icon: List },
            ].map(({ mode, icon: Icon }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className="flex h-7 w-8 cursor-pointer items-center justify-center rounded-[7px] transition-all"
                style={{
                  background: viewMode === mode ? 'white' : 'transparent',
                  color: viewMode === mode ? 'oklch(0.22 0.02 240)' : '#94a3b8',
                  boxShadow: viewMode === mode
                    ? '0 1px 0 rgba(15,23,42,0.04), inset 0 0 0 1px var(--color-border)'
                    : 'none',
                }}
              >
                <Icon size={14} />
              </button>
            ))}
          </div>

          {/* Cadastrar */}
          <Link
            href="/professor/cadastro-aluno"
            className="flex h-9 shrink-0 items-center gap-2 whitespace-nowrap rounded-[10px] px-3.5 text-[13.5px] font-semibold text-white transition-all hover:opacity-90"
            style={{
              background: 'linear-gradient(180deg, var(--color-primary) 0%, oklch(0.58 0.19 35) 100%)',
              boxShadow: '0 1px 0 rgba(255,255,255,0.25) inset, 0 8px 22px -10px var(--color-primary)',
            }}
          >
            <Plus size={14} strokeWidth={2.5} />
            Cadastrar aluno
          </Link>
        </div>
      </div>

      {/* ── Cards view ── */}
      {viewMode === 'cards' && (
        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
          {filtered.map((aluno) => (
            <AlunoCard
              key={aluno.slug}
              aluno={aluno}
              onProvas={abrirModalProvas}
              onRemove={setRemovendoAluno}
              onResetSenha={handleResetSenha}
              resetting={resetandoSlug === aluno.slug}
            />
          ))}

          {/* Add card */}
          <Link
            href="/professor/cadastro-aluno"
            className="flex min-h-[280px] flex-col items-center justify-center gap-3 rounded-[20px] border border-dashed p-7 text-center transition-colors hover:border-primary/40 hover:bg-primary/[0.02]"
            style={{ borderColor: 'oklch(0.635 0.195 35 / 0.3)', background: 'white' }}
          >
            <div
              className="flex h-11 w-11 items-center justify-center rounded-[14px] text-white"
              style={{
                background: 'var(--color-primary)',
                boxShadow: '0 10px 24px -10px var(--color-primary)',
              }}
            >
              <Plus size={20} strokeWidth={2.5} />
            </div>
            <div>
              <p className="mb-1 text-[15px] font-bold" style={{ color: 'oklch(0.22 0.02 240)' }}>
                Adicionar novo aluno
              </p>
              <p className="text-[12.5px]" style={{ color: '#94a3b8' }}>
                Crie as credenciais de acesso agora.
              </p>
            </div>
          </Link>
        </div>
      )}

      {/* ── Table view ── */}
      {viewMode === 'table' && (
        <div
          className="overflow-x-auto rounded-[18px] border border-border bg-white"
          style={{ boxShadow: '0 1px 0 rgba(15,23,42,0.02)' }}
        >
          <table className="w-full min-w-[680px] border-separate border-spacing-0 text-[13.5px]">
            <thead>
              <tr>
                {['Aluno', 'GCP médio', 'Nº de provas', 'Ingresso', 'Status', 'Ações'].map((h, i) => (
                  <th
                    key={h}
                    className="whitespace-nowrap border-b border-border px-[18px] py-3.5 text-left font-mono text-[10.5px] uppercase tracking-[0.14em]"
                    style={{
                      color: '#94a3b8',
                      background: 'linear-gradient(180deg, var(--page-bg), transparent)',
                      textAlign: i === 5 ? 'right' : 'left',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((aluno, i) => {
                const idx = i % 3
                const status = getStatus(aluno.gcpMedio ?? 0, aluno.provas.length)
                return (
                  <tr
                    key={aluno.slug}
                    className="transition-colors hover:bg-[var(--page-bg)]"
                    style={{ borderBottom: '1px solid var(--color-border)' }}
                  >
                    {/* Aluno */}
                    <td className="border-b border-border px-[18px] py-3.5">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] text-[12px] font-extrabold text-white"
                          style={{ background: AVATAR_GRADIENTS[idx] }}
                        >
                          {initials(aluno.nome)}
                        </div>
                        <p
                          className="font-semibold"
                          style={{ color: 'oklch(0.22 0.02 240)' }}
                        >
                          {aluno.nome}
                        </p>
                      </div>
                    </td>

                    {/* GCP */}
                    <td className="border-b border-border px-[18px] py-3.5">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="font-heading text-[18px] font-extrabold tracking-tight"
                          style={{
                            color: aluno.provas.length > 0 ? RING_COLORS[idx] : '#CBD5E1',
                            width: 32,
                          }}
                        >
                          {aluno.provas.length > 0 ? (aluno.gcpMedio ?? 0) : '—'}
                        </span>
                        <div
                          className="relative h-1.5 flex-1 overflow-hidden rounded-full"
                          style={{ maxWidth: 110, background: 'var(--page-bg)' }}
                        >
                          {aluno.provas.length > 0 && (
                            <div
                              className="absolute inset-y-0 left-0 rounded-full"
                              style={{
                                width: `${aluno.gcpMedio ?? 0}%`,
                                background: `linear-gradient(90deg, ${RING_COLORS[idx]}, ${RING_COLORS[(idx + 1) % 3]})`,
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Provas */}
                    <td className="border-b border-border px-[18px] py-3.5">
                      <span className="font-bold" style={{ color: 'oklch(0.22 0.02 240)' }}>
                        {aluno.provas.length}
                      </span>
                      <span className="ml-1.5 font-mono text-[11px]" style={{ color: '#94a3b8' }}>
                        {aluno.provas.length === 1 ? 'realizada' : 'realizadas'}
                      </span>
                    </td>

                    {/* Ingresso */}
                    <td className="border-b border-border px-[18px] py-3.5">
                      <span className="font-mono text-[12.5px]" style={{ color: 'oklch(0.36 0.015 240)' }}>
                        {aluno.dataIngresso}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="border-b border-border px-[18px] py-3.5">
                      <span
                        className="rounded-full px-2 py-1 text-[11px] font-semibold"
                        style={{
                          color: status.color,
                          background: status.bg,
                          border: `1px solid ${status.border}`,
                        }}
                      >
                        {status.label}
                      </span>
                    </td>

                    {/* Ações */}
                    <td className="border-b border-border px-[18px] py-3.5">
                      <div className="flex justify-end gap-1.5">
                        <Link
                          href={`/professor/aluno/${aluno.slug}/dashboard`}
                          title="Dashboard"
                          className="flex h-8 w-8 items-center justify-center rounded-[9px] border border-border bg-white transition-all hover:border-[var(--color-secondary)] hover:bg-[oklch(0.96_0.015_186)] hover:text-[var(--color-secondary)]"
                          style={{ color: '#94a3b8' }}
                        >
                          <BarChart3 size={14} />
                        </Link>
                        <button
                          title="Provas"
                          onClick={() => abrirModalProvas(aluno)}
                          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[9px] border border-border bg-white transition-all hover:border-[var(--color-secondary)] hover:bg-[oklch(0.96_0.015_186)] hover:text-[var(--color-secondary)]"
                          style={{ color: '#94a3b8' }}
                        >
                          <FileText size={14} />
                        </button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[9px] border border-border bg-white transition-all hover:border-[var(--color-secondary)] hover:bg-[oklch(0.96_0.015_186)] hover:text-[var(--color-secondary)]"
                              style={{ color: '#94a3b8' }}
                            >
                              <MoreHorizontal size={14} />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-[180px]" style={{ width: 180 }}>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() => handleResetSenha(aluno.slug, aluno.nome)}
                              disabled={resetandoSlug === aluno.slug}
                            >
                              <RotateCcw size={13} className={resetandoSlug === aluno.slug ? 'animate-spin' : ''} />
                              {resetandoSlug === aluno.slug ? 'Resetando...' : 'Resetar senha'}
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/professor/aluno/${aluno.slug}/editar`} className="flex items-center gap-2">
                                <Pencil size={13} />
                                Editar perfil
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              variant="destructive"
                              className="cursor-pointer"
                              onClick={() => setRemovendoAluno(aluno)}
                            >
                              <UserX size={13} />
                              Remover da turma
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          <div
            className="flex items-center justify-between border-t border-border px-[18px] py-3"
            style={{ background: 'var(--page-bg)' }}
          >
            <span className="font-mono text-[11.5px]" style={{ color: '#94a3b8' }}>
              Mostrando {filtered.length} de {alunos.length} alunos
            </span>
          </div>
        </div>
      )}

      {/* ── Modal de provas ── */}
      <Dialog open={modalAberto} onOpenChange={setModalAberto}>
        <DialogContent className="gap-0 overflow-hidden rounded-[22px] border-border p-0 shadow-[0_24px_64px_-12px_rgba(15,23,42,0.22)] sm:max-w-[480px]">
          {/* Header */}
          <div className="border-b border-border px-6 pb-5 pr-12 pt-6">
            <p
              className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.14em]"
              style={{ color: '#94a3b8' }}
            >
              Provas do aluno
            </p>
            <DialogTitle className="font-heading text-[20px] font-bold leading-tight" style={{ color: 'oklch(0.22 0.02 240)' } as React.CSSProperties}>
              {alunoSelecionado?.nome}
            </DialogTitle>
            <DialogDescription className="mt-1 text-[13px] leading-[1.5]" style={{ color: 'oklch(0.58 0.04 186)' } as React.CSSProperties}>
              Remova uma prova caso deseje que o aluno possa refazê-la.
            </DialogDescription>
          </div>

          {/* List */}
          <div className="max-h-[58vh] overflow-y-auto px-4 py-4">
            {carregandoProvas ? (
              <div className="flex items-center justify-center gap-2 py-10" style={{ color: '#94a3b8' }}>
                <Loader2 className="size-5 animate-spin" />
                <span className="text-[13px]">Carregando provas...</span>
              </div>
            ) : provasModal.length === 0 ? (
              <p className="py-8 text-center text-[13px]" style={{ color: '#94a3b8' }}>
                Nenhuma prova cadastrada.
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                {provasModal.map((prova) => {
                  const { color: gcpColor } = getGcpColors(prova.gcp ?? 0, prova.gcp != null)
                  return (
                    <div
                      key={prova.id}
                      className="flex items-center justify-between rounded-[14px] border border-border p-3.5"
                      style={{ background: prova.realizada ? 'var(--page-bg)' : 'white' }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-border"
                          style={{ background: 'white' }}
                        >
                          <FileText size={15} style={{ color: prova.realizada ? 'var(--color-secondary)' : '#94a3b8' }} />
                        </div>
                        <div>
                          <p className="font-heading text-[14px] font-bold leading-tight" style={{ color: 'oklch(0.22 0.02 240)' }}>
                            {prova.ano}
                          </p>
                          <div className="mt-1 flex items-center gap-2">
                            {prova.realizada ? (
                              <span
                                className="rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold"
                                style={{
                                  color: 'oklch(0.42 0.13 145)',
                                  background: 'oklch(0.94 0.06 145)',
                                  border: '1px solid oklch(0.88 0.08 145)',
                                }}
                              >
                                Realizada
                              </span>
                            ) : (
                              <span
                                className="rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold"
                                style={{ color: '#94a3b8', background: '#F1F5F9', border: '1px solid #E2E8F0' }}
                              >
                                Não realizada
                              </span>
                            )}
                            {prova.gcp != null && (
                              <span className="font-mono text-[10.5px] font-semibold" style={{ color: gcpColor }}>
                                GCP {prova.gcp}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {prova.realizada && (
                        <button
                          className="flex cursor-pointer items-center gap-1.5 rounded-[10px] border px-3 py-1.5 text-[12px] font-semibold transition-all hover:bg-[oklch(0.465_0.155_10)] hover:text-white"
                          style={{
                            color: 'oklch(0.465 0.155 10)',
                            borderColor: 'oklch(0.80 0.10 10)',
                            background: 'oklch(0.96 0.02 10)',
                          }}
                          onClick={() => abrirConfirmacaoDeletar(prova.id, prova.ano)}
                        >
                          <Trash2 size={12} />
                          Remover
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {!carregandoProvas && provasModal.length > 0 && (
            <div className="border-t border-border px-6 py-3">
              <p className="text-center font-mono text-[10.5px]" style={{ color: '#94a3b8' }}>
                {provasModal.filter(p => p.realizada).length} de {provasModal.length}{' '}
                {provasModal.length === 1 ? 'prova realizada' : 'provas realizadas'}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ── Modal de remoção ── */}
      <Dialog open={!!removendoAluno} onOpenChange={(open) => { if (!open && !arquivando) setRemovendoAluno(null) }}>
        <DialogContent className="gap-0 overflow-hidden rounded-[22px] border-border p-0 shadow-[0_24px_64px_-12px_rgba(15,23,42,0.22)] sm:max-w-[420px]">
          <div className="border-b border-border px-6 pb-5 pr-12 pt-6">
            <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: '#94a3b8' }}>
              Remover aluno
            </p>
            <DialogTitle className="font-heading text-[20px] font-bold leading-tight" style={{ color: 'oklch(0.22 0.02 240)' } as React.CSSProperties}>
              {removendoAluno?.nome}
            </DialogTitle>
            <DialogDescription className="mt-2 text-[13px] leading-[1.6]" style={{ color: 'oklch(0.45 0.02 240)' } as React.CSSProperties}>
              Este aluno será movido para ex-aluno e não aparecerá mais na sua turma. A ação pode ser revertida manualmente.
            </DialogDescription>
          </div>
          <div className="flex gap-2 px-6 py-4">
            <button
              onClick={() => setRemovendoAluno(null)}
              disabled={arquivando}
              className="flex flex-1 h-9 cursor-pointer items-center justify-center rounded-[10px] border border-border bg-white text-[13px] font-semibold transition-all hover:bg-[var(--page-bg)] disabled:opacity-50"
              style={{ color: 'oklch(0.36 0.015 240)' }}
            >
              Cancelar
            </button>
            <button
              onClick={confirmarRemocao}
              disabled={arquivando}
              className="flex flex-1 h-9 cursor-pointer items-center justify-center gap-2 rounded-[10px] text-[13px] font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
              style={{
                background: 'linear-gradient(180deg, oklch(0.465 0.155 10) 0%, oklch(0.38 0.13 10) 100%)',
                boxShadow: '0 1px 0 rgba(255,255,255,0.15) inset',
              }}
            >
              {arquivando
                ? <Loader2 size={14} className="animate-spin" />
                : <><UserX size={14} /> Remover</>
              }
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Alert de confirmação de remoção de prova ── */}
      <AlertDialog open={alertAberto} onOpenChange={setAlertAberto}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover prova?</AlertDialogTitle>
            <AlertDialogDescription>
              Você está prestes a remover o vínculo de{' '}
              <strong>{provaParaDeletar?.nomeProva}</strong> para{' '}
              <strong>{alunoSelecionado?.nome}</strong>. Todas as respostas serão apagadas e o
              aluno poderá refazer a prova.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deletando}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmarDeletar}
              disabled={deletando}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deletando ? (
                <Loader2 className="mr-2 size-4 animate-spin" />
              ) : (
                <Trash2 className="mr-2 size-4" />
              )}
              Confirmar remoção
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
