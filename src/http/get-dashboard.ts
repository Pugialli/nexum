'use server'

import type { DashboardData } from '@/app/api/aluno/[slug]/dashboard/get-dashboard'
import { api } from './api-client'

export async function getDashboard(slug: string): Promise<DashboardData | null> {
  try {
    return await api
      .get(`aluno/${slug}/dashboard`, { next: { tags: ['dashboard', slug] } })
      .json<DashboardData>()
  } catch {
    return null
  }
}