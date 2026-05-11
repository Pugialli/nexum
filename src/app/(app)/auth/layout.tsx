import { redirect } from 'next/navigation'

import { loggedUser } from '@/auth/auth'

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await loggedUser()

  if (user) {
    redirect(user.role === 'PROFESSOR' ? '/professor' : '/aluno')
  }

  return <>{children}</>
}
