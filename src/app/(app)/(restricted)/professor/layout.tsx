'use server'

import type { ReactNode } from 'react'

import { auth } from '@/auth/auth'
import { Sheet } from '@/components/ui/sheet'
import { redirect } from 'next/navigation'

interface AdminLayoutProps {
  children: ReactNode
  sheet: ReactNode
}

export default async function ProfessorLayout({
  children,
  sheet,
}: AdminLayoutProps) {
  const user = await auth()

  if (user.role !== 'PROFESSOR') {
    redirect('/aluno')
  }
  
  return (
    <div>
      <Sheet>
        {children}
      </Sheet>
      {sheet}
    </div>
  )
}