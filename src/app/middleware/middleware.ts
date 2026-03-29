import { auth } from '@/auth'
import { headers } from 'next/headers'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const { pathname } = request.nextUrl

  if (!session) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  const userRole = session.user.role

  if (pathname.startsWith('/aluno')) {
    if (userRole !== 'ALUNO') {
      return NextResponse.redirect(new URL('/professor', request.url))
    }
  }

  if (pathname.startsWith('/professor')) {
    if (userRole !== 'PROFESSOR') {
      return NextResponse.redirect(new URL('/aluno', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/aluno/:path*', '/professor/:path*'],
}