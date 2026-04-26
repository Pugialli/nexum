import { prisma } from '@/lib/prisma'

export interface GetProfessorResponse {
  id: string
  nome: string
  email: string
  slug: string
  avatarUrl: string | null
  resetPassword: boolean
  professor: {
    telefone: string | null
    formacao: string | null
  } | null
}

export async function getProfessor(slug: string): Promise<GetProfessorResponse> {
  return prisma.user.findUniqueOrThrow({
    where: { slug: slug },
    select: {
      id: true,
      nome: true,
      email: true,
      slug: true,
      avatarUrl: true,
      resetPassword: true,
      professor: {
        select: {
          telefone: true,
          formacao: true,
        }
      }
    },
  })
}