'use client'

import { useEffect, useState } from 'react'

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
    <TabelaAssuntos
      assuntos={assuntos}
      onRemoverAssunto={removerAssunto}
      onRestaurarAssunto={restaurarAssunto}
      onAtualizarAssunto={atualizarAssunto}
    />
  )
}
