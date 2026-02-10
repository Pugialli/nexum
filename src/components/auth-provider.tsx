'use client'

import type { GetProfileResponse } from '@/app/api/auth/profile/[id]/get-profile'
import { createContext, useContext, type ReactNode } from 'react'

interface AuthContextType {
  user: GetProfileResponse | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ 
  children, 
  user 
}: { 
  children: ReactNode
  user: GetProfileResponse | null 
}) {
  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}