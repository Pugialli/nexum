'use server'

import { auth } from '@/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export async function signOut() {
  await auth.api.signOut({
    headers: await headers(),
  })
  redirect('/auth/login')
}

export async function signInWithEmailAndPassword(data: FormData) {
  const email = data.get('email')?.toString()
  const password = data.get('password')?.toString()

  if (!email || !password) {
    return {
      success: false,
      message: 'Email e senha são obrigatórios.',
      errors: {},
    }
  }

  try {
    await auth.api.signInEmail({
      body: { email, password },
      headers: await headers(),
    })
  } catch {
    return {
      success: false,
      message: 'Email ou senha incorretos.',
      errors: {},
    }
  }

  redirect('/')
}