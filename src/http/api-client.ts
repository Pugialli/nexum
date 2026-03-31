import ky from 'ky'

async function getCookieHeader(): Promise<string> {
  try {
    const { cookies } = await import('next/headers')
    const cookieStore = await cookies()
    return cookieStore.getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join('; ')
  } catch {
    // Contexto client-side ou fora de Server Component — sem cookies
    return ''
  }
}

export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        const cookieHeader = await getCookieHeader()
        if (cookieHeader) {
          request.headers.set('Cookie', cookieHeader)
        }
      },
    ],
  },
})