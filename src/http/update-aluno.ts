import { api } from './api-client'

interface UpdateAlunoRequest {
  nome: string
  email: string
  password?: string
  dataNascimento: string
  slug: string
  carreira: string | undefined
  telefone: string | undefined
}

type UpdateAlunoResponse = void

export async function updateAluno({
  nome,
  password,
  dataNascimento,
  email,
  carreira,
  telefone,
  slug,
}: UpdateAlunoRequest): Promise<UpdateAlunoResponse> {
  const body: any = {
    nome,
    dataNascimento,
    email,
    carreira,
    telefone,
    slug,
  }

  if (password) {
    body.password = password
    body.resetPassword = false
  }

  await api.put(`aluno/${slug}`, {
    json: body,
  })
}