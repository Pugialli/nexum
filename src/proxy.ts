import { auth } from '@/auth'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
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

    const mustResetPassword = (session.user as { resetPassword?: boolean }).resetPassword
    if (mustResetPassword && pathname !== '/aluno/completar-perfil') {
      return NextResponse.redirect(new URL('/aluno/completar-perfil', request.url))
    }
  }

  if (pathname.startsWith('/professor')) {
    if (userRole !== 'PROFESSOR') {
      return NextResponse.redirect(new URL('/aluno', request.url))
    }
  }

  // Injeta o pathname como request header para ser lido nos Server Components/layouts
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', pathname)

  return NextResponse.next({
    request: { headers: requestHeaders },
  })
}

export const config = {
  matcher: ['/aluno/:path*', '/professor/:path*'],
}
