'use client'

import type { GetProfileResponse } from '@/app/api/auth/profile/[id]/get-profile'
import type { ReactNode } from 'react'
import { AuthProvider } from './auth-provider'
import { TooltipProvider } from './ui/tooltip'

interface ProvidersProps {
  children: ReactNode
  user: GetProfileResponse | null
}

export function Providers({ children, user }: ProvidersProps) {
  return (
    <AuthProvider user={user}>
      <TooltipProvider>
        {children}
      </TooltipProvider>
    </AuthProvider>
  )
}
