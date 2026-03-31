import { prisma } from '@/lib/prisma'
import { getAlunoSlug } from '../get-aluno'

export async function getProvasDisponiveis(alunoSlug: string) {
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
    },
    orderBy: {
      ano: 'desc',
    },
  })

  return provasDisponiveis
}