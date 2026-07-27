'use server'

import { api } from './api-client'
import type { GetAlunosProfessor } from './get-alunos'

export async function getExAlunos(slugProfessor: string) {
  return api
    .get(`professor/${slugProfessor}/exalunos`, {
      next: { tags: [`${slugProfessor}/exalunos`] },
    })
    .json<GetAlunosProfessor[]>()
}
