'use server'

import { api } from './api-client'

export async function resetAlunoPassword(slug: string) {
  await api.patch(`aluno/${slug}`, { json: { action: 'resetar-senha' } })
}
