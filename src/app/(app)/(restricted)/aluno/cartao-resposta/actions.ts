// app/(app)/(restricted)/aluno/cartao-resposta/actions.ts
'use server'

import { loggedUser } from '@/auth/auth'
import { registrarProva } from '@/http/registrar-prova'
import { submitProvaSchema } from '@/lib/validators/prova'
import { HTTPError } from 'ky'

export async function submitProvaAction(data: FormData) {
  const user = await loggedUser()

  if (!user) {
    return {
      success: false,
      message: 'Usuário não autenticado',
      errors: null,
    }
  }

  const provaId = data.get('provaId') as string | null
  
  if (!provaId) {
    return {
      success: false,
      message: 'ID da prova não foi fornecido',
      errors: null,
    }
  }
  
  // Extrai respostas do FormData
  const respostas: { questaoId: string; resposta: string }[] = []
  
  for (const [key, value] of data.entries()) {
    if (key.startsWith('question-') && value) {
      const questaoNumero = key.replace('question-', '')
      respostas.push({
        questaoId: questaoNumero,  // Mantém como string por enquanto
        resposta: value as string,
      })
    }
  }

  // Validação com Zod
  const result = submitProvaSchema.safeParse({
    provaId,
    respostas,
  })

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return {
      success: false,
      message: 'Erro na validação dos dados',
      errors,
    }
  }

  const { provaId: validatedProvaId, respostas: validatedRespostas } = result.data

  // Transforma respostas para o formato da API (converte para número)
  const respostasFormatadas = validatedRespostas.map((r) => ({
    questaoNumero: parseInt(r.questaoId),
    resposta: r.resposta,
  }))

  try {
    await registrarProva({
      alunoSlug: user.slug,
      idProva: validatedProvaId,
      respostas: respostasFormatadas,
    })

    return {
      success: true,
      message: 'Prova enviada com sucesso!',
      errors: null,
    }
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()
      return { success: false, message, errors: null }
    }

    console.error(err)
    return {
      success: false,
      message: 'Erro inesperado ao enviar prova',
      errors: null,
    }
  }
}