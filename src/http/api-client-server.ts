import ky from 'ky'
import { cookies } from 'next/headers'

export async function getServerApi() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  return ky.create({
    prefixUrl: process.env.NEXT_PUBLIC_API_URL,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
}