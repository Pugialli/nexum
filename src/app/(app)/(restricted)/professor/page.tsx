import { Plus } from 'lucide-react'
import Link from 'next/link'

import { loggedUser } from '@/auth/auth'
import { Button } from '@/components/ui/button'
import { getAlunos } from '@/http/get-alunos'
import { TabelaAlunos } from './tabela-alunos'

export default async function Home() {
  const user = await loggedUser()
  const alunos = user ? await getAlunos(user.slug) : []

  const alunosComGcp = alunos.filter((a) => a.gcpMedio != null)
  const gcpMedio =
    alunosComGcp.length > 0
      ? (alunosComGcp.reduce((acc, a) => acc + (a.gcpMedio ?? 0), 0) / alunosComGcp.length)
          .toFixed(1)
          .replace('.', ',')
      : '—'
  const totalProvas = alunos.reduce((acc, a) => acc + a.provas.length, 0)

  return (
    <>
      {/* Page header */}
      <header className="flex h-[52px] shrink-0 items-center justify-between border-b border-border bg-white px-7">
        <h3 className="font-heading text-[17px] font-bold text-foreground">Alunos</h3>
        <Button size="sm" asChild>
          <Link href="/professor/cadastro-aluno">
            <Plus className="size-3.5" />
            Cadastrar aluno
          </Link>
        </Button>
      </header>

      {/* Content */}
      <div className="mx-auto flex w-full max-w-[1060px] flex-col gap-5 p-7">
        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-3.5">
          <div className="relative overflow-hidden rounded-lg border border-border bg-white px-[18px] py-4">
            <div className="absolute inset-x-0 top-0 h-0.5 bg-primary" />
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.07em] text-muted-foreground">
              Total de Alunos
            </p>
            <p className="font-mono text-[26px] font-semibold leading-none text-primary">
              {alunos.length}
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">cadastrados</p>
          </div>

          <div className="relative overflow-hidden rounded-lg border border-border bg-white px-[18px] py-4">
            <div className="absolute inset-x-0 top-0 h-0.5 bg-secondary" />
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.07em] text-muted-foreground">
              GCP Médio da Turma
            </p>
            <p className="font-mono text-[26px] font-semibold leading-none text-secondary">
              {gcpMedio}
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">últimas provas</p>
          </div>

          <div className="relative overflow-hidden rounded-lg border border-border bg-white px-[18px] py-4">
            <div className="absolute inset-x-0 top-0 h-0.5" style={{ background: '#CBD5E1' }} />
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.07em] text-muted-foreground">
              Provas Realizadas
            </p>
            <p className="font-mono text-[26px] font-semibold leading-none text-foreground">
              {totalProvas}
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">no total</p>
          </div>
        </div>

        {/* Table */}
        <div className="flex items-center justify-between">
          <p className="font-heading text-[15px] font-bold text-foreground">Tabela de Alunos</p>
        </div>
        <TabelaAlunos alunos={alunos} />
      </div>
    </>
  )
}
