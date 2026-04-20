'use server'

import { HTTPError } from 'ky'

import type { FormState } from '@/hooks/use-form-state'
import { createAssunto } from '@/http/create-assunto'
import type { Assunto } from '@/http/get-assuntos'
import { createAssuntoSchema } from '@/lib/validators/assunto'

export type CreateAssuntoState = FormState<Assunto>

export async function createAssuntoAction(data: FormData): Promise<CreateAssuntoState> {
  const result = createAssuntoSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    return { success: false, message: null, errors }
  }

  const { value, label } = result.data

  try {
    await createAssunto({ value, label })
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
    message: 'Assunto criado com sucesso',
    errors: null,
    data: { value, label, numQuestoes: 0 },
  }
}