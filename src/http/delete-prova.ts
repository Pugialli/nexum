'use server'

import { api } from './api-client'

export async function deleteProva(id: string) {
  await api.delete(`prova/${id}`)
}
