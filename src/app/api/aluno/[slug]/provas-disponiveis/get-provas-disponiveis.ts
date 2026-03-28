// app/api/aluno/[alunoId]/provas-disponiveis/route.ts
import { prisma } from '@/lib/prisma'
import { getAlunoSlug } from '../get-aluno'

export async function getProvasDisponiveis(alunoSlug: string) {
  const aluno = await getAlunoSlug(alunoSlug)
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

  // Busca provas que o aluno já respondeu
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

  // Extrai IDs únicos das provas respondidas
  const idsProvasRespondidas = new Set(
    provasRespondidas
      .map((r) => r.questao.idProva)
      .filter((id): id is string => id !== null)
  )

  // Filtra provas disponíveis (não respondidas)
  const provasDisponiveis = todasProvas.filter(
    (prova) => !idsProvasRespondidas.has(prova.id)
  )

  return provasDisponiveis
}