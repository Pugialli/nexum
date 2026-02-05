import { api } from './api-client'

interface UpdateAlunoRequest {
  nome: string
  objetivo: string
  alunoSlugo: string
}

type UpdateAlunoResponse = void

export async function updateAluno({
  nome,
  objetivo,
  alunoSlugo,
}: UpdateAlunoRequest): Promise<UpdateAlunoResponse> {
  await api.patch(`alunos/${alunoSlugo}`, {
    json: {
      nome,
      objetivo,
      slug: alunoSlugo,
    },
  })
}
