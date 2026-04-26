'use server'

import type { GetProfileResponse } from '@/app/api/auth/profile/[id]/get-profile'
import { auth } from '@/auth'
import type { Role } from '@/generated'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

async function getSession() {
  return auth.api.getSession({ headers: await headers() })
}

export async function isAuthenticated() {
  const session = await getSession()
  return !!session
}

export async function logUserOut() {
  await auth.api.signOut({ headers: await headers() })
}

export async function loggedUser(): Promise<GetProfileResponse | null> {
  const session = await getSession()
  
  if (!session) return null

  return {
    nome: session.user.name,
    slug: session.user.slug,
    email: session.user.email,
    avatarUrl: session.user.image ?? null,
    role: session.user.role as Role,
  }
}

export async function requireAuth(): Promise<GetProfileResponse> {
  const session = await getSession()

  if (!session) {
    redirect('/auth/login')
  }

  return {
    nome: session.user.name,
    slug: session.user.slug,
    email: session.user.email,
    avatarUrl: session.user.image ?? null,
    role: session.user.role as Role,
  }
}