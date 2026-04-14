'use server'

import type { ProvaSchema } from '@/lib/validators/prova'
import { api } from './api-client'

export async function createProva(data: ProvaSchema) {
  await api.post('prova', { json: data })
}