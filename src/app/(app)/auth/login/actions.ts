'use server'

import { HTTPError } from 'ky'
import { cookies } from 'next/headers'
import { z } from 'zod'

import { signInWithPassword } from '@/http/sign-in-with-password'

const signInSchema = z.object({
  email: z.string().email({ error: 'Email inválido' }),
  password: z.string().min(1, { error: 'Senha inválida' }),
})

export async function signInWithEmailAndPassword(data: FormData) {
  console.log('FormData recebido:', Object.fromEntries(data)) // <- Debug

  const result = signInSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = z.flattenError(result.error).fieldErrors
    console.log('Erros de validação:', errors) // <- Debug
    return { success: false, message: null, errors }
  }

  const { email, password } = result.data
  console.log('Dados validados:', { email, password }) // <- Debug

  try {
    const { token } = await signInWithPassword({
      email,
      password,
    })

    ;(await cookies()).set('nexum-token', token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
  } catch (err) {
    if (err instanceof HTTPError) {
      const { statusText, status } = err.response
      console.error('Erro HTTP:', status, statusText) // <- Debug
      
      try {
        const errorBody = await err.response.json()
        console.error('Body do erro:', errorBody) // <- Debug
        return { success: false, message: errorBody.message || statusText, errors: null }
      } catch {
        return { success: false, message: statusText, errors: null }
      }
    }

    console.error('Erro desconhecido:', err) // <- Debug
    return {
      success: false,
      message: 'Erro inesperado, tente novamente em alguns minutos',
      errors: null,
    }
  }

  return { success: true, message: null, errors: null }
}