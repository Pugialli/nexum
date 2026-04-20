'use server'

import type { CreateAssuntoProps } from '@/app/api/domains/assuntos/create-assunto'
import { api } from './api-client'

export async function createAssunto(data: CreateAssuntoProps) {
  await api.post('domains/assuntos', { json: data })
}