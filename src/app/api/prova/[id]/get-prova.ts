import { prisma } from '@/lib/prisma'

export interface ProvaDetalhada {
  id: string
  ano: string
  notaMinima: number
  notaMaxima: number
  peso1: number
  peso2: number
  peso3: number
  peso4: number
  peso5: number
  statusProva: boolean
  dataCriacao: Date
  questoes: {
    numero: number
    gabarito: string
    dificuldade: number
    habilidadeValue: number
    assuntoValue: string
  }[]
}

export async function getProva(id: string): Promise<ProvaDetalhada> {
  return await prisma.prova.findUniqueOrThrow({
    where: { id },
    select: {
      id: true,
      ano: true,
      notaMinima: true,
      notaMaxima: true,
      peso1: true,
      peso2: true,
      peso3: true,
      peso4: true,
      peso5: true,
      statusProva: true,
      dataCriacao: true,
      questoes: {
        select: {
          numero: true,
          gabarito: true,
          dificuldade: true,
          habilidadeValue: true,
          assuntoValue: true,
        },
        orderBy: { numero: 'asc' },
      },
    },
  })
}