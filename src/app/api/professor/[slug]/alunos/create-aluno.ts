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
    throw new Error('Professor not found')
  }

  const result = await auth.api.signUpEmail({
    body: {
      email,
      password: 'nexum123',
      name: nome,
      nome,
      slug,
      idProfessor: professor.id,
      role: 'ALUNO',
    },
  })

  if (!result.user) {
    throw new Error('Erro ao criar aluno')
  }

  return result.user
}