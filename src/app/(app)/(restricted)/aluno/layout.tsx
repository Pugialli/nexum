import { requireAuth } from '@/auth/auth'
import { redirect } from 'next/navigation'

export default async function AlunoLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAuth()

  if (user.role === 'PROFESSOR') {
    redirect('/professor')
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
