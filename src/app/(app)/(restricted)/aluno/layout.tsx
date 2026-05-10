import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export default async function AlunoLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers()
  const session = await auth.api.getSession({ headers: headersList })

  if (!session) redirect('/auth/login')

  const user = session.user

  if (user.role === 'PROFESSOR') {
    redirect('/professor')
  }

  const mustResetPassword = (user as { resetPassword?: boolean }).resetPassword
  const pathname = headersList.get('x-pathname') ?? ''
  if (mustResetPassword && pathname !== '/aluno/completar-perfil') {
    redirect('/aluno/completar-perfil')
  }

  return (
    <main
      className="flex flex-1 flex-col"
      style={{
        backgroundColor: 'var(--page-bg)',
        backgroundImage: 'var(--dot-grid)',
        backgroundSize: 'var(--dot-size)',
      }}
    >
      {children}
    </main>
  )
}
