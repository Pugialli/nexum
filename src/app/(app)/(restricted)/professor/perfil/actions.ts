'use server'

import { updateProfessor } from '@/http/update-professor'
import { professorProfileSchema } from '@/lib/validators/professor'
import { HTTPError } from 'ky'

export async function updateProfessorAction(data: FormData) {
  const formData = Object.fromEntries(data)

  if (!formData.password || formData.password === '') {
    delete formData.password
    delete formData.confirmPassword
  }

  const result = professorProfileSchema.safeParse(formData)

  if (!result.success) {
    return { success: false, message: null, errors: result.error.flatten().fieldErrors }
  }

  const { nome, email, slug, password, telefone, formacao } = result.data

  try {
    if (slug) {
      await updateProfessor({ nome, email, telefone, password, formacao, slug })
    }
  } catch (err) {
    if (err instanceof HTTPError) {
      let message = 'Erro interno do servidor'
      try {
        const body = await err.response.text()
        if (body) message = JSON.parse(body).message ?? message
      } catch { }
      return { success: false, message, errors: null }
    }

    console.error(err)
    return { success: false, message: 'Erro inesperado, tente novamente em alguns minutos', errors: null }
  }

  return { success: true, message: 'Perfil atualizado com sucesso', errors: null }
}