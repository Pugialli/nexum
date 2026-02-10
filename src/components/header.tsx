import { loggedUser } from "@/auth/auth"
import { HeaderAmanda } from "./temp"

export async function Header() {
  const user = await loggedUser()

  // return <HeaderClient user={user} />
  return <HeaderAmanda user={user} />
}
