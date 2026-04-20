'use server'

import { api } from './api-client'

export async function deleteAssunto(value: string) {
  await api.delete(`domains/assuntos/${value}`)
}