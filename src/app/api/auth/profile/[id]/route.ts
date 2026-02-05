import { NextResponse } from 'next/server'

import { getProfile } from './get-profile'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const profile = await getProfile({ id: (await params).id })

  if (profile instanceof NextResponse) {
    return profile
  }

  return NextResponse.json(profile.user)
}
