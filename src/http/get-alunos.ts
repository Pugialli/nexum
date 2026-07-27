'use server'

import { api } from './api-client'

export interface GetAlunosProfessor {
  slug: string
  nome: string
  email: string
  resetPassword: boolean
  gcpMedio: number
  dataIngresso: string
  provas: {
    id: string
    nome: string
    gcp: number
  }[]
}

export async function getAlunos(slugProfessor: string) {
  const result = await api
    .get(`professor/${slugProfessor}/alunos`, {
      next: {
        tags: [`${slugProfessor}/alunos`],
      },
    })
    .json<GetAlunosProfessor[]>()

  return result
}
