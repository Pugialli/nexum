import { api } from './api-client'

export interface AvailableProva {
  id: string
  ano: string
}

export async function getAvailableProvas(alunoSlug: string) {
  const result = await api
    .get(`aluno/${alunoSlug}/provas-disponiveis`)
    .json<AvailableProva[]>()

  return result
}