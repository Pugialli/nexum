import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/auth/auth'

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (await isAuthenticated()) {
    redirect('/')
  }

  return (
    <div
      className="flex min-h-screen w-full flex-col items-center justify-center px-6"
      style={{
        backgroundColor: 'var(--page-bg)',
        backgroundImage: 'var(--dot-grid)',
        backgroundSize: 'var(--dot-size)',
      }}
    >
      {children}
    </div>
  )
}
