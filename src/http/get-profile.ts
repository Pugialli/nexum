import type { GetProfileResponse } from '@/app/api/auth/profile/[id]/get-profile'
import { decrypt } from '@/utils/crypto'

import { api } from './api-client'

export async function getProfile(token: string) {
  const idProfile = decrypt(token)

  const result = await api
    .get(`auth/profile/${idProfile}`)
    .json<GetProfileResponse>()

  return result
}
