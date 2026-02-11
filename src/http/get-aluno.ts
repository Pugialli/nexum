import { api } from './api-client'

export interface GetAlunoResponse {
  id: string
  nome: string
  email: string
  slug: string
  dataNascimento: string | null
  telefone: string | null
  carreiraValue: string | null
  resetPassword: boolean
  avatarUrl: string | null
  role: string
  alunoDesde: string
  idProfessor: string | null
}

export async function getAluno(slug: string) {
  const result = await api
    .get(`aluno/${slug}`)
    .json<GetAlunoResponse>()

  return result
}