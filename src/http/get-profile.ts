import type { GetProfileResponse } from '@/app/api/auth/profile/[id]/get-profile'
import { decrypt } from '@/utils/crypto'
import { getServerApi } from './api-client-server'

export async function getProfile(token: string) {
  const api = await getServerApi()

  const idDecrypted = decrypt(token)

  const result = await api
    .get(`auth/profile/${idDecrypted}`)
    .json<GetProfileResponse>()

  return result
}
