'use server'

import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'

import { isAuthenticated } from '@/auth/auth'
import { Header } from '@/components/header'
import { getProfile } from '@/http/get-profile'

interface AdminLayoutProps {
  children: ReactNode
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  if (!(await isAuthenticated())) {
    redirect('/auth/login')
  }

  const user = await getProfile()

  return (
    <div className="w-full">
      <Header user={user} />
      {children}
    </div>
  )
}
