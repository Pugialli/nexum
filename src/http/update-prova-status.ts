import { api } from './api-client'

export interface UpdateProvaStatusRequest {
  provaId: string
}

type UpdateProvaStatusResponse = void

export async function updateProvaStatus({
  provaId,
}: UpdateProvaStatusRequest): Promise<UpdateProvaStatusResponse> {
  await api.patch(`prova/${provaId}/status`)
}