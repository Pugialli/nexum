'use server'

import { revalidatePath } from 'next/cache'
import { api } from './api-client'

export async function deleteAluno(slug: string) {
  await api.delete(`aluno/${slug}`)
  revalidatePath('/professor', 'layout')
}
