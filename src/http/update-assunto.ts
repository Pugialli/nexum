import type { UpdateAssuntoProps } from '@/app/api/domains/assuntos/[value]/update-assunto'
import { api } from './api-client'

export interface UpdateAssuntoRequest {
  data: UpdateAssuntoProps
}

type UpdateAssuntoResponse = void

export async function updateAssunto({
  data,
}: UpdateAssuntoRequest): Promise<UpdateAssuntoResponse> {
    await api.patch(`domains/assuntos/${data.value}`, { json: data })
}