import { prisma } from '@/lib/prisma'
import { getAlunoSlug } from '../get-aluno'

export async function getProvasDisponiveis(alunoSlug: string) {
  const aluno = await getAlunoSlug(alunoSlug)

  if (!aluno) {
    throw new Error('Aluno não encontrado')
  }

  const alunoId = aluno.id

  const todasProvas = await prisma.prova.findMany({
    select: {
      id: true,
      ano: true,
    },
    orderBy: {
      ano: 'desc',
    },
  })

  const provasRespondidas = await prisma.resposta.findMany({
    where: {
      idAluno: alunoId,
    },
    select: {
      questao: {
        select: {
          idProva: true,
        },
      },
    },
    distinct: ['idQuestao'],
  })

  const idsProvasRespondidas = new Set(
    provasRespondidas
      .map((r) => r.questao.idProva)
      .filter((id): id is string => id !== null)
  )

  const provasDisponiveis = todasProvas.filter(
    (prova) => !idsProvasRespondidas.has(prova.id)
  )

  return provasDisponiveis
}