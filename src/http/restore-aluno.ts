'use server'

import { api } from './api-client'

export async function restoreAluno(slug: string) {
  await api.patch(`aluno/${slug}`, { json: { action: 'restaurar' } })
}
