'use server'

import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'

import { loggedUser } from '@/auth/auth'
import { AppTopbar } from '@/components/app-topbar'

interface AdminLayoutProps {
  children: ReactNode
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const user = await loggedUser()

  if (!user) {
    redirect('/auth/login')
  }

  return (
    <div className="flex min-h-screen flex-col pb-20 sm:pb-0">
      <AppTopbar nome={user.nome} role={user.role} />
      {children}
    </div>
  )
}
