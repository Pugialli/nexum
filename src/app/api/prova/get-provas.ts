import type { GetProvasResponse } from '@/http/get-provas'
import { prisma } from '@/lib/prisma'

export interface ProvaSumary {
  id: string
  ano: string
  notaMinima: number
  notaMaxima: number
  statusProva: boolean
  dataCriacao: Date
}

export async function getProvas(): Promise<GetProvasResponse> {
  const provas = await prisma.prova.findMany({
    select: {
      id: true,
      ano: true,
      notaMinima: true,
      notaMaxima: true,
      statusProva: true,
      dataCriacao: true,
    },
    orderBy: {
      ano: 'asc',
    }
  })

  return { provas }
}
