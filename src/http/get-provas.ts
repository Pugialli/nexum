'use server'

import type { ProvaSumary } from '@/app/api/prova/get-provas'
import { api } from './api-client'

export interface GetProvasResponse {
  provas: ProvaSumary[]
}

export async function getProvas() {
  const result = await api
    .get(`prova`, {
      next: {
        tags: [`provas`],
      },
    })
    .json<GetProvasResponse>()

  return result
}
