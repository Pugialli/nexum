'use server'

import { api } from './api-client'

export interface Habilidade {
  value: number
  descricao: string
}

export async function getHabilidades(): Promise<Habilidade[]> {
  const result = await api
    .get('domains/habilidades', { next: { tags: ['habilidades'] } })
    .json<Habilidade[]>()

  return result
}