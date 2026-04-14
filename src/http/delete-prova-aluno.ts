'use server'

import { api } from './api-client'

export async function deleteProvaAluno(alunoSlug: string, provaId: string) {
  await api.delete(`aluno/${alunoSlug}/prova/${provaId}`)
  // revalidateTag(`alunos`)
}