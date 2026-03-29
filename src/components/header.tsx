import type { GetProfileResponse } from '@/app/api/auth/profile/[id]/get-profile'
import { HeaderClient } from './header-client'

interface HeaderProps {
  user: GetProfileResponse | null
}

export function Header({ user }: HeaderProps) {
  return <HeaderClient user={user} />
}