import { requireAuth } from '@/auth/auth'
import { AlunoSidebar } from '@/components/aluno-sidebar'
import { redirect } from 'next/navigation'

export default async function AlunoLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAuth()

  if (user.role === 'PROFESSOR') {
    redirect('/professor')
  }

  return (
    <div className="flex min-h-screen">
      <AlunoSidebar nome={user.nome} />

      <main
        className="flex min-h-screen flex-1 flex-col overflow-y-auto"
        style={{
          backgroundColor: 'var(--page-bg)',
          backgroundImage: 'var(--dot-grid)',
          backgroundSize: 'var(--dot-size)',
        }}
      >
        {children}
      </main>
    </div>
  )
}
