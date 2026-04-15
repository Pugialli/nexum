import { prisma } from '@/lib/prisma'

export interface DeleteProvaResponse {
  message: string
  idProva: string
  idUser: string
}

export async function deleteProvaAluno(slug: string, id: string): Promise<DeleteProvaResponse | null> {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      slug,
    }
  })

  const provaAluno = await prisma.provaAluno.deleteMany({
    where: {
      idAluno: user.id,
      idProva: id,
    },
  })

  if (provaAluno.count === 0) {
  throw new Error('Prova não encontrada para o aluno especificado')
}

  return {
    message: 'Prova deletada com sucesso',
    idUser: user.id,
    idProva: id,
  }


}