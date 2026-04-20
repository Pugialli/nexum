'use server'

import { loggedUser } from '@/auth/auth'
import { updateRevisaoCaderno } from '@/http/update-revisao-caderno'
import { HTTPError } from 'ky'

export async function updateRevisaoAction(
  idProvaAluno: string,
  idQuestao: string,
  revisao1: boolean,
  revisao2: boolean,
  revisao3: boolean,
) {
  const user = await loggedUser()

  if (!user) {
    return {
      success: false,
      message: 'Usuário não autenticado',
      errors: null,
    }
  }

  try {
    await updateRevisaoCaderno({
      idProvaAluno,
      idQuestao,
      revisao1,
      revisao2,
      revisao3,
    })

    return {
      success: true,
      message: 'Revisão atualizada com sucesso!',
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
      message: 'Erro inesperado ao atualizar revisão',
      errors: null,
    }
  }
}