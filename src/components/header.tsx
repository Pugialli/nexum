import { loggedUser } from '@/auth/auth'
import { HeaderClient } from './header-client'

export async function Header() {
  const user = await loggedUser()

  return <HeaderClient user={user} />
}