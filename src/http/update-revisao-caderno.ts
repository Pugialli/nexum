import type { UpdateErroProps } from '@/app/api/caderno-erros/update-erro'
import { api } from './api-client'

export async function updateRevisaoCaderno(data: UpdateErroProps): Promise<void> {
  await api.patch('caderno-erros', { json: data })
}