import type { GetAlunoResponse } from '@/http/get-aluno'
import { prisma } from '@/lib/prisma'

export async function getAlunoSlug(slug: string): Promise<GetAlunoResponse | null> {
  const user = await prisma.user.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      nome: true,
      email: true,
      slug: true,
      resetPassword: true,
      avatarUrl: true,
      role: true,
      createdAt: true,
    },
  })

  if (!user) {
    return null
  }

  const aluno = await prisma.aluno.findUnique({
    where: {
      idUser: user.id,
    },
    select: {
      dataNascimento: true,
      telefone: true,
      carreiraValue: true,
      idProfessor: true,
    },
  })

  if (!aluno) {
    return null
  }


  return {
    ...aluno,
    ...user,
    dataNascimento: aluno.dataNascimento?.toISOString().split('T')[0] || null,
    alunoDesde: user.createdAt.toISOString(),
  }


}