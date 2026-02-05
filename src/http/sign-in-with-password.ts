import type { SignInRequestResponse } from '@/app/api/auth/signin-request/signin-request'
import { api } from './api-client'

interface SignInWithPasswordRequest {
  email: string
  password: string
}

export async function signInWithPassword({
  email,
  password,
}: SignInWithPasswordRequest) {
  const result = await api
    .post('auth/signin-request', {
      json: {
        email,
        password,
      },
    })
    .json<SignInRequestResponse>()

  return result
}
