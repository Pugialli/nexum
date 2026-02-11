'use server'

import { HTTPError } from 'ky'

import { loggedUser } from '@/auth/auth'
import { createAluno } from '@/http/create-aluno'
import { createAlunoSchema } from '@/lib/validators/aluno'

export async function createAlunoAction(data: FormData) {
  const user = await loggedUser()

  const result = createAlunoSchema.safeParse(Object.fromEntries(data))

  const slugProfessor = user!.slug

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { nome, email } = result.data

  try {
    await createAluno({
      nome,
      email,
      slugProfessor,
    })

    // revalidateTag(`${idProfessor}/alunos`)
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      return { success: false, message, errors: null }
    }

    console.error(err)
    return {
      success: false,
      message: 'Erro inesperado, tente novamente em alguns minutos',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'Aluno criado com sucesso',
    errors: null,
  }
}