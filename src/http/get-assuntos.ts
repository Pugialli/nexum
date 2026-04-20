'use server'

import { api } from './api-client'

export interface Assunto {
  value: string
  label: string
  numQuestoes: number
}

export async function getAssuntos(): Promise<Assunto[]> {
  const result = await api
    .get('domains/assuntos', { next: { tags: ['assuntos'] } })
    .json<Assunto[]>()

  return result
}