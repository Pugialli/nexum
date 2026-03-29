import type { GetAlunoResponse } from '@/http/get-aluno'
import { prisma } from '@/lib/prisma'

export async function getAlunoSlug(slug: string): Promise<GetAlunoResponse | null> {
  const aluno = await prisma.user.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      nome: true,
      email: true,
      slug: true,
      dataNascimento: true,
      telefone: true,
      carreiraValue: true,
      resetPassword: true,
      avatarUrl: true,
      role: true,
      alunoDesde: true,
      idProfessor: true,
    },
  })

  if (!aluno) {
    return null
  }

  return {
    ...aluno,
    dataNascimento: aluno.dataNascimento?.toISOString().split('T')[0] || null,
    alunoDesde: aluno.alunoDesde.toISOString(),
  }


}