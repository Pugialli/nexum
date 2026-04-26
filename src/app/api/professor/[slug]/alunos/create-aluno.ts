import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { createSlug } from '@/utils/create-slug'

export interface CreateAlunoProps {
  nome: string
  email: string
  slugProfessor: string
}

export async function createAluno({
  nome,
  email,
  slugProfessor,
}: CreateAlunoProps) {
  const slug = createSlug(email)

  const professor = await prisma.user.findUnique({
    where: { slug: slugProfessor },
  })

  if (!professor) {
    throw new Error('Professor não encontrado')
  }

  const result = await auth.api.signUpEmail({
    body: {
      email,
      password: 'nexum123',
      name: nome,
      slug,
      role: 'ALUNO',
      resetPassword: true,
    },
  })

  if (!result.user) {
    throw new Error('Erro ao criar aluno')
  }

  await prisma.aluno.create({
    data: {
      idUser: result.user.id,
      idProfessor: professor.id,
    },
  })

  return result.user
}