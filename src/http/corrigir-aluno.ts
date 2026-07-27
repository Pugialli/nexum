'use server'

import { api } from './api-client'

export async function corrigirAluno(slug: string, nome: string, email: string) {
  await api.patch(`aluno/${slug}`, { json: { action: 'corrigir', nome, email } })
}
