'use server'

import { api } from './api-client'

export async function archiveAluno(slug: string) {
  await api.patch(`aluno/${slug}`, { json: { action: 'arquivar' } })
}
