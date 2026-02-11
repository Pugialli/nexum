import { api } from './api-client'

interface CreateAlunoRequest {
  nome: string
  email: string
  slugProfessor: string
}

type CreateAlunoResponse = void

export async function createAluno({
  nome,
  email,
  slugProfessor,
}: CreateAlunoRequest): Promise<CreateAlunoResponse> {
  await api.post(`professor/${slugProfessor}/alunos`, {
    json: {
      nome,
      email,
      slugProfessor,
    },
  })
}
