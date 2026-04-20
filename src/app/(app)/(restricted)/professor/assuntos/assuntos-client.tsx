'use client'

import { PlusSquare } from 'lucide-react'
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
      prev.map((a) => a.value === value ? { ...a, label } : a)
    )
  }

  return (
    <div className="space-y-8 p-8">
      <h1 className="text-2xl font-bold">Assuntos</h1>

      <Button size="lg" asChild>
        <Link href="/professor/cadastro-assunto">
          <PlusSquare className="size-6" />
          Novo assunto
        </Link>
      </Button>

      <TabelaAssuntos
        assuntos={assuntos}
        onRemoverAssunto={removerAssunto}
        onRestaurarAssunto={restaurarAssunto}
        onAtualizarAssunto={atualizarAssunto}
      />
    </div>
  )
}