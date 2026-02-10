import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getProfile } from '@/http/get-profile'

export async function isAuthenticated() {
  return !!(await cookies()).get('nexum-token')?.value
}

export async function logUserOut() {
  ; (await cookies()).delete('nexum-token')
}

export async function loggedUser() {
  const token = (await cookies()).get('nexum-token')?.value

  if (!token) return null

  return await getProfile(token)
}

export async function auth() {
  const token = (await cookies()).get('nexum-token')?.value

  if (!token) {
    redirect('/auth/login')
  }

  try {
    const user = await getProfile(token)

    return user
  } catch (err) {
    console.log(err)
    redirect('/api/auth/sign-out')
  }
}
