import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Injeta o pathname como header para ser lido nos Server Components/layouts
export function proxy(request: NextRequest) {
  const response = NextResponse.next()
  response.headers.set('x-pathname', request.nextUrl.pathname)
  return response
}

export const config = {
  matcher: ['/aluno/:path*', '/professor/:path*'],
}
