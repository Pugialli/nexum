'use server'

import type { GetProfessorResponse } from '@/app/api/professor/[id]/get-professor'

import { api } from './api-client'

export async function getProfessor(id: string) {
  const result = await api
    .get(`professor/${id}`, {
      next: {
        tags: [`professor/${id}`],
      },
    })
    .json<GetProfessorResponse>()

  return result
}
