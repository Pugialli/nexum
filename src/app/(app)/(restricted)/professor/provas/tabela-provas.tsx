'use client'

import type { ProvaSumary } from '@/app/api/prova/get-provas'
import { updateProvaStatus } from '@/http/update-prova-status'
import { Pencil, Plus, Search } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export interface TabelaProvasProps {
  provas: ProvaSumary[]
}

function formatarData(data: Date) {
  return new Date(data).toLocaleDateString('pt-BR')
}

export function TabelaProvas({ provas }: TabelaProvasProps) {
  const [statusMap, setStatusMap] = useState<Record<string, boolean>>(
    () => Object.fromEntries(provas.map((p) => [p.id, p.statusProva]))
  )
  const [search, setSearch] = useState('')

  const handleStatusChange = async (id: string) => {
    const novoStatus = !statusMap[id]
    setStatusMap((prev) => ({ ...prev, [id]: novoStatus }))
    try {
      await updateProvaStatus({ provaId: id })
    } catch {
      setStatusMap((prev) => ({ ...prev, [id]: !novoStatus }))
    }
  }

  const filtered = provas.filter((p) =>
    p.ano.toLowerCase().includes(search.toLowerCase())
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
            Provas
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {/* Search */}
          <div
            className="flex h-9 flex-1 items-center gap-2 rounded-[10px] border border-border bg-white px-3 text-[13px] sm:flex-none"
            style={{ color: '#94a3b8', minWidth: 'min(200px, 100%)' }}
          >
            <Search size={13} className="shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por ano…"
              className="flex-1 border-0 bg-transparent outline-none"
              style={{ color: 'oklch(0.22 0.02 240)', fontFamily: 'inherit' }}
            />
          </div>

          {/* Nova prova */}
          <Link
            href="/professor/provas/cadastro-prova"
            className="flex h-9 shrink-0 items-center gap-2 rounded-[10px] px-3.5 text-[13.5px] font-semibold text-white transition-all hover:opacity-90"
            style={{
              background: 'linear-gradient(180deg, var(--color-primary) 0%, oklch(0.58 0.19 35) 100%)',
              boxShadow: '0 1px 0 rgba(255,255,255,0.25) inset, 0 8px 22px -10px var(--color-primary)',
            }}
          >
            <Plus size={14} strokeWidth={2.5} />
            Nova prova
          </Link>
        </div>
      </div>

      {/* Table */}
      <div
        className="overflow-x-auto rounded-[18px] border border-border bg-white"
        style={{ boxShadow: '0 1px 0 rgba(15,23,42,0.02)' }}
      >
        <table className="w-full min-w-[640px] border-separate border-spacing-0 text-[13.5px]">
          <thead>
            <tr>
              {[
                { label: 'Ano', align: 'left' },
                { label: 'Nota Mínima', align: 'left' },
                { label: 'Nota Máxima', align: 'left' },
                { label: 'Status', align: 'left' },
                { label: 'Data de Criação', align: 'left' },
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
            {filtered.map((prova) => {
              const aberta = statusMap[prova.id]
              return (
                <tr
                  key={prova.id}
                  className="transition-colors hover:bg-[var(--page-bg)]"
                >
                  {/* Ano */}
                  <td className="border-b border-border px-[18px] py-3.5">
                    <span
                      className="font-heading text-[15px] font-bold tracking-tight"
                      style={{ color: 'oklch(0.22 0.02 240)' }}
                    >
                      {prova.ano}
                    </span>
                  </td>

                  {/* Nota Mínima */}
                  <td className="border-b border-border px-[18px] py-3.5">
                    <span className="font-mono text-[13px]" style={{ color: 'oklch(0.36 0.015 240)' }}>
                      {prova.notaMinima}
                    </span>
                  </td>

                  {/* Nota Máxima */}
                  <td className="border-b border-border px-[18px] py-3.5">
                    <span className="font-mono text-[13px]" style={{ color: 'oklch(0.36 0.015 240)' }}>
                      {prova.notaMaxima}
                    </span>
                  </td>

                  {/* Status — pill toggle */}
                  <td className="border-b border-border px-[18px] py-3.5">
                    <button
                      onClick={() => handleStatusChange(prova.id)}
                      className="cursor-pointer rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all hover:opacity-80"
                      style={
                        aberta
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
                      {aberta ? '● Aberta' : '○ Fechada'}
                    </button>
                  </td>

                  {/* Data */}
                  <td className="border-b border-border px-[18px] py-3.5">
                    <span className="font-mono text-[12.5px]" style={{ color: 'oklch(0.36 0.015 240)' }}>
                      {formatarData(prova.dataCriacao)}
                    </span>
                  </td>

                  {/* Ações */}
                  <td className="border-b border-border px-[18px] py-3.5">
                    <div className="flex justify-end">
                      <Link
                        href={`/professor/provas/${prova.id}/edit`}
                        title="Editar prova"
                        className="flex h-8 w-8 items-center justify-center rounded-[9px] border border-border bg-white transition-all hover:border-[var(--color-secondary)] hover:bg-[oklch(0.96_0.015_186)] hover:text-[var(--color-secondary)]"
                        style={{ color: '#94a3b8' }}
                      >
                        <Pencil size={14} />
                      </Link>
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
            Mostrando {filtered.length} de {provas.length} provas
          </span>
        </div>
      </div>
    </>
  )
}
