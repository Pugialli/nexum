import type { AvailableProva } from '@/app/api/aluno/[slug]/provas-disponiveis/get-provas-disponiveis'
import { api } from './api-client'


export async function getAvailableProvas(alunoSlug: string) {
  const result = await api
    .get(`aluno/${alunoSlug}/provas-disponiveis`)
    .json<AvailableProva[]>()

  return result
}