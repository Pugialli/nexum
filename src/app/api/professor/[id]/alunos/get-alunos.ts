import { prisma } from '@/lib/prisma'

interface GetAlunosProps {
  idProfessor: string
}

export interface GetAlunosWithTreinoResponse {
  id: string
  slug: string
  nome: string
  idProfessor: string
}

export async function getAlunos({ idProfessor }: GetAlunosProps) {
  return await prisma.user.findMany({
    where: {
      idProfessor,
    },
    select: {
      id: true,
      idProfessor: true,
      nome: true,
      slug: true,
    },
    orderBy: {
      nome: 'asc',
    },
  })
}
