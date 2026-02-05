'use server'

import type { GetAlunosWithTreinoResponse } from '@/app/api/professor/[id]/alunos/get-alunos'

import { api } from './api-client'

export async function getAlunos(idProfessor: string) {
  const result = await api
    .get(`professor/${idProfessor}/alunos`, {
      next: {
        tags: [`${idProfessor}/alunos`],
      },
    })
    .json<GetAlunosWithTreinoResponse[]>()

  return result
}
