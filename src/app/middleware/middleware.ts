import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const { pathname } = request.nextUrl

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const userRole = token.role

  if (pathname.startsWith('/(restricted)/aluno')) {
    if (userRole !== 'ALUNO') {
      return NextResponse.redirect(new URL('/(restricted)/professor', request.url));
    }
  }

  // Proteção das rotas de PROFESSOR
  if (pathname.startsWith('/(restricted)/professor')) {
    if (userRole !== 'PROFESSOR') {
      return NextResponse.redirect(new URL('/(restricted)/aluno', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/(restricted)/:path*'],
};