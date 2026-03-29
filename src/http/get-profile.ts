import type { GetProfileResponse } from '@/app/api/auth/profile/[id]/get-profile'
import { auth } from '@/auth'
import type { Role } from '@/generated'
import { headers } from 'next/headers'

export async function getProfile(): Promise<GetProfileResponse | null> {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) return null

  return {
    nome: session.user.nome,
    slug: session.user.slug,
    email: session.user.email,
    avatarUrl: session.user.avatarUrl ?? null,
    role: session.user.role as Role,
  }
}