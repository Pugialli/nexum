import type { UpdateProfessorProps } from '@/app/api/professor/[slug]/update-professor'
import { api } from './api-client'

interface UpdateProfessorRequest {
  slug: string
  nome: string
  email: string
  password?: string
  formacao?: string
  telefone?: string
}

type UpdateProfessorResponse = void

export async function updateProfessor({
  nome,
  password,
  email,
  formacao,
  telefone,
  slug,
}: UpdateProfessorRequest): Promise<UpdateProfessorResponse> {
  const body: UpdateProfessorProps = {
    slug,
    nome,
    email,
    formacao,
    telefone,
  }

  if (password) {
    body.password = password
    body.resetPassword = false
  }

  await api.put(`professor/${slug}`, {
    json: body,
  })
}