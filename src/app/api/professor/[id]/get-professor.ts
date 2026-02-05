import { prisma } from '@/lib/prisma'

interface GetProfessorProps {
  id: string
}

export interface GetProfessorResponse {
  id: string
  nome: string
  email: string
  avatarUrl: string | null
}

export async function getProfessor({ id }: GetProfessorProps) {
  return prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      nome: true,
      avatarUrl: true,
      email: true,
    },
  })
}
