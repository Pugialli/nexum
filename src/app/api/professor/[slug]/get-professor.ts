import { prisma } from '@/lib/prisma'

interface GetProfessorProps {
  slug: string
}

export interface GetProfessorResponse {
  id: string
  nome: string
  email: string
  avatarUrl: string | null
}

export async function getProfessor({ slug }: GetProfessorProps) {
  return prisma.user.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      nome: true,
      avatarUrl: true,
      email: true,
    },
  })
}
