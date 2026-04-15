'use server'

import type { ProvaResult } from '@/app/api/aluno/[slug]/dashboard/get-dashboard'
import { api } from './api-client'

export type DifficultyLabel = 'Muito fácil' | 'Fácil' | 'Médio' | 'Difícil' | 'Muito difícil'

export interface SimuladoError {
  number: number
  difficulty: DifficultyLabel
  skill: string
  subject: string
}

export interface HabilidadeResult {
  skill: string
  errorRate: number
  errorCount: number
}

export interface DashboardData {
  provas: ProvaResult[]
  errosPorProva: Record<string, SimuladoError[]>
  habilidades: HabilidadeResult[]
}

export async function getDashboard(slug: string): Promise<DashboardData | null> {
  const result = await api
    .get(`aluno/${slug}/dashboard`, { next: { tags: ['dashboard', slug] } })
    .json<DashboardData>()

  return result
}