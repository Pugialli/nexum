import { auth } from '@/auth'
import { createSlug } from '@/utils/create-slug'

export interface CreateUserProps {
  nome: string
  email: string
  dataNascimento: string
  password: string
}

export async function createUser({
  nome,
  email,
  dataNascimento,
  password,
}: CreateUserProps) {
  const slug = createSlug(email)

  const result = await auth.api.signUpEmail({
    body: {
      email,
      password,
      name: nome,
      nome,
      slug,
      dataNascimento: new Date(dataNascimento),
    },
  })

  if (!result.user) {
    throw new Error('Erro ao criar usuário')
  }

  return result.user
}