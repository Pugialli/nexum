import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { createSlug } from '@/utils/create-slug'

export interface CreateUserProps {
  nome: string
  email: string
  password: string
}

export async function createUser({
  nome,
  email,
  password,
}: CreateUserProps) {
  const slug = createSlug(email)

  const result = await auth.api.signUpEmail({
    body: {
      email,
      password,
      name: nome,
      slug,
      role: 'PROFESSOR',
    },
  })

  if (!result.user) {
    throw new Error('Erro ao criar usuário')
  }

  await prisma.professor.create({
    data: {
      idUser: result.user.id,
    },
  })

  return result.user
}