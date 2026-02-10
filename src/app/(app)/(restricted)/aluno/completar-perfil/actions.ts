'use server'

import { HTTPError } from 'ky'

import { loggedUser } from '@/auth/auth'
import { updateAluno } from '@/http/update-aluno'
import { completeProfileSchema } from '@/lib/validators/aluno'

export async function updateAlunoAction(data: FormData) {
  const user = await loggedUser()

  const result = completeProfileSchema.safeParse(Object.fromEntries(data))

  const idProfessor = user!.id

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { nome, email, slug, password, carreira, telefone, dataNascimento } = result.data

  try {
    if (slug) {
      await updateAluno({
        slug,
        nome,
        email,
        dataNascimento,
        telefone,
        password,
        carreira,
      })

      // revalidateTag(`${idProfessor}/alunos`)
    }
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
    message: 'Aluno atualizado com sucesso',
    errors: null,
  }
}
