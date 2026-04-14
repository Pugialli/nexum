'use server'

import type { ProvaSchema } from '@/lib/validators/prova'
import { api } from './api-client'

export async function updateProva(id: string, data: ProvaSchema) {
  await api.put(`prova/${id}`, { json: data })
}