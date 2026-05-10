'use server'

import { api } from './api-client'

export async function renameAluno(slug: string, nome: string) {
  await api.patch(`aluno/${slug}`, { json: { nome } })
}
