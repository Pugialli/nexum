import type { GetCadernoErrosResponse } from '@/app/api/caderno-erros/[slug]/get-erros'
import { api } from './api-client'

export async function getCadernoErros(slug: string): Promise<GetCadernoErrosResponse[]> {
  return api.get(`caderno-erros/${slug}`).json()
}