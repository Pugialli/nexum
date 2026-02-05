import { api } from './api-client'

interface CreateAlunoRequest {
  nome: string
  email: string
  idProfessor: string
}

type CreateAlunoResponse = void

export async function createAluno({
  nome,
  email,
  idProfessor,
}: CreateAlunoRequest): Promise<CreateAlunoResponse> {
  await api.post(`professor/${idProfessor}/alunos`, {
    json: {
      nome,
      email,
      idProfessor,
    },
  })
}
