'use client'

import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import type { Assunto } from '@/http/get-assuntos'
import { TabelaAssuntos } from './tabela-assuntos'

export function AssuntosClient({ assuntosIniciais }: { assuntosIniciais: Assunto[] }) {
  const [assuntos, setAssuntos] = useState<Assunto[]>(assuntosIniciais)

  useEffect(() => {
    function handler(e: Event) {
      const assunto = (e as CustomEvent<Assunto>).detail
      setAssuntos((prev) => [...prev, assunto])
    }

    window.addEventListener('assunto:criado', handler)
    return () => window.removeEventListener('assunto:criado', handler)
  }, [])

  const removerAssunto = (value: string) => {
    setAssuntos((prev) => prev.filter((a) => a.value !== value))
  }

  const restaurarAssunto = (assunto: Assunto) => {
    setAssuntos((prev) => [...prev, assunto])
  }

  const atualizarAssunto = (value: string, label: string) => {
    setAssuntos((prev) =>
      prev.map((a) => (a.value === value ? { ...a, label } : a))
    )
  }

  return (
    <>
      {/* Page header */}
      <header className="flex h-[52px] shrink-0 items-center justify-between border-b border-border bg-white px-7">
        <h3 className="font-heading text-[17px] font-bold text-foreground">Assuntos</h3>
        <Button size="sm" asChild>
          <Link href="/professor/cadastro-assunto">
            <Plus className="size-3.5" />
            Novo assunto
          </Link>
        </Button>
      </header>

      {/* Content */}
      <div className="mx-auto flex w-full max-w-[1060px] flex-col gap-5 p-7">
        <TabelaAssuntos
          assuntos={assuntos}
          onRemoverAssunto={removerAssunto}
          onRestaurarAssunto={restaurarAssunto}
          onAtualizarAssunto={atualizarAssunto}
        />
      </div>
    </>
  )
}
