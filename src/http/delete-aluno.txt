'use server'

import { revalidateTag } from 'next/cache'

import type { GetAlunoResponse } from '@/app/api/alunos/[slug]/get-aluno'

import { api } from './api-client'

export async function deleteAluno(alunoSlug: string) {
  return await api
    .delete(`alunos/${alunoSlug}`, {})
    .json<GetAlunoResponse>()
    .then((aluno) => {
      revalidateTag(`${aluno.idProfessor}/alunos`)
    })
}
