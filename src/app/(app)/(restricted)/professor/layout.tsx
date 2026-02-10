'use server'

import type { ReactNode } from 'react'

import { Sheet } from '@/components/ui/sheet'

interface AdminLayoutProps {
  children: ReactNode
  sheet: ReactNode
}

export default async function ProfessorLayout({
  children,
  sheet,
}: AdminLayoutProps) {
  // const user = await auth()

  // if (user.role !== 'PROFESSOR') {
  //   redirect('/aluno')
  // }
  
  return (
    <div>
      <Sheet>
        {children}
      </Sheet>
      {sheet}
    </div>
  )
}