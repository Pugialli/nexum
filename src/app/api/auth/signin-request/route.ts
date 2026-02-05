import { NextRequest, NextResponse } from 'next/server'

import { signInRequest } from './signin-request'

interface SignInWithPasswordRequest {
  email: string
  password: string
}

export async function POST(request: NextRequest) {
  console.log('Received sign-in request')
  const credendials: SignInWithPasswordRequest = await request.json()
  console.log('API sign-in request with', credendials)

  const userToken = await signInRequest(credendials)

  if (userToken instanceof NextResponse) {
    return userToken
  }

  return NextResponse.json(userToken, { status: 200 })
}
