'use server'

import type { ProvaDetalhada } from '@/app/api/prova/[id]/get-prova'
import { api } from './api-client'

export async function getProva(id: string) {
  const result = await api
    .get(`prova/${id}`, { next: { tags: [`prova-${id}`] } })
    .json<ProvaDetalhada>()

  return result
}