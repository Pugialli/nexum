'use server'

import type { ReactNode } from 'react'

import { requireAuth } from '@/auth/auth'
import { ProfessorSidebar } from '@/components/professor-sidebar'
import { Sheet } from '@/components/ui/sheet'
import { redirect } from 'next/navigation'

interface AdminLayoutProps {
  children: ReactNode
  sheet: ReactNode
}

export default async function ProfessorLayout({ children, sheet }: AdminLayoutProps) {
  const user = await requireAuth()

  if (user.role !== 'PROFESSOR') {
    redirect('/aluno')
  }

  return (
    <div className="flex min-h-screen">
      <ProfessorSidebar nome={user.nome} />

      <main
        className="flex min-h-screen flex-1 flex-col overflow-y-auto"
        style={{
          backgroundColor: 'var(--page-bg)',
          backgroundImage: 'var(--dot-grid)',
          backgroundSize: 'var(--dot-size)',
        }}
      >
        <Sheet>
          {children}
        </Sheet>
        {sheet}
      </main>
    </div>
  )
}
