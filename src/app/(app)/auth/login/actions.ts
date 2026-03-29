'use server'

import { cookies } from 'next/headers'

export async function signInWithEmailAndPassword(data: FormData): Promise<{
  success: boolean
  message: string | null
  errors: Record<string, string[]> | null
}> {
  const email = data.get('email')?.toString()
  const password = data.get('password')?.toString()

  if (!email || !password) {
    return {
      success: false,
      message: 'Email e senha são obrigatórios.',
      errors: {},
    }
  }

  const baseURL = process.env.BETTER_AUTH_URL ?? 'http://localhost:9002'

  const response = await fetch(`${baseURL}/api/auth/sign-in/email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Origin': baseURL,
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    return {
      success: false,
      message: 'Email ou senha incorretos.',
      errors: {},
    }
  }

  const setCookieHeader = response.headers.get('set-cookie')
  if (setCookieHeader) {
    const cookieStore = await cookies()
    const parts = setCookieHeader.split(';').map((p) => p.trim())
    const [nameValue, ...attrs] = parts
    const eqIndex = nameValue.indexOf('=')
    const name = nameValue.substring(0, eqIndex)
    // Não decodifica — passa o valor raw para o Next.js não double-encode
    const value = nameValue.substring(eqIndex + 1)

    const maxAge = attrs.find((a) => a.toLowerCase().startsWith('max-age'))?.split('=')[1]
    const path = attrs.find((a) => a.toLowerCase().startsWith('path'))?.split('=')[1]
    const httpOnly = attrs.some((a) => a.toLowerCase() === 'httponly')
    const secure = attrs.some((a) => a.toLowerCase() === 'secure')
    const sameSite = attrs.find((a) => a.toLowerCase().startsWith('samesite'))?.split('=')[1] as 'lax' | 'strict' | 'none' | undefined

    cookieStore.set(name, value, {
      maxAge: maxAge ? parseInt(maxAge) : undefined,
      path: path ?? '/',
      httpOnly,
      secure,
      sameSite,
    })
  }

  return { success: true, message: null, errors: null }
}