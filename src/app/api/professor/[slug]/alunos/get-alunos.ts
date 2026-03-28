import { prisma } from '@/lib/prisma'

interface GetAlunosProps {
  slug: string
}

export interface GetAlunosWithTreinoResponse {
  id: string
  slug: string
  nome: string
  idProfessor: string
}

export async function getAlunos({ slug }: GetAlunosProps) {
  return await prisma.user.findMany({
    where: {
      slug,
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
