import { prisma } from '@/lib/prisma'
import { getAlunoSlug } from '../get-aluno'

export interface AvailableProva {
  id: string
  ano: string
}

export async function getProvasDisponiveis(alunoSlug: string): Promise<AvailableProva[]> {
  const aluno = await getAlunoSlug(alunoSlug)

  if (!aluno) {
    throw new Error('Aluno não encontrado')
  }

  const provasDisponiveis = await prisma.prova.findMany({
    where: {
      provaAlunos: {
        none: {
          idAluno: aluno.id,
        },
      },
    },
    select: {
      id: true,
      ano: true,
      statusProva: true,
    },
    orderBy: {
      ano: 'desc',
    },
  })

  const availableProvas: AvailableProva[] = provasDisponiveis.filter(prova => prova.statusProva)

  return availableProvas
}