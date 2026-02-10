import { NextRequest, NextResponse } from 'next/server'

import { signInRequest } from './signin-request'

interface SignInWithPasswordRequest {
  email: string
  password: string
}

export async function POST(request: NextRequest) {
  const credendials: SignInWithPasswordRequest = await request.json()
  const userToken = await signInRequest(credendials)

  if (userToken instanceof NextResponse) {
    return userToken
  }

  return NextResponse.json(userToken, { status: 200 })
}
