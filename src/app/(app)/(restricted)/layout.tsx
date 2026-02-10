'use server'

import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'

import { isAuthenticated } from '@/auth/auth'

interface AdminLayoutProps {
  children: ReactNode
}

export default async function AdminLayout({
  children,
}: AdminLayoutProps) {
  // if (!(await isAuthenticated())) {
  //   redirect('/auth/login')
  // }

  return (
    <div className='w-full'>
      {children}
    </div>
  )
}
