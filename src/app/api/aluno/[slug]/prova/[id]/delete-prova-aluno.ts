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

  const provaAluno = await prisma.provaAluno.delete({
    where: {
      idAluno_idProva: {
        idAluno: user.id,
        idProva: id,
      },
    },
  })


  return {
    message: 'Prova deletada com sucesso',
    idUser: user.id,
    idProva: provaAluno.idProva,
  }


}