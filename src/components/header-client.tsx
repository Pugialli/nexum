// components/header-client.tsx
'use client'

import type { GetProfileResponse } from '@/app/api/auth/profile/[id]/get-profile'
import { signOut } from '@/auth/actions'
import { getInitials } from '@/utils/get-initials'
import { getRingColor } from '@/utils/ring-color'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { AlunoTabs } from './aluno-tabs'
import { ProfessorTabs } from './professor-tabs'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

interface HeaderClientProps {
  user: GetProfileResponse | null
}

export function HeaderClient({ user }: HeaderClientProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const role = user?.role || ''

  const handleLogout = async () => {
    setIsDropdownOpen(false)
    await signOut()
  }

  return (
    <header className="w-auto p-4 border-b flex items-center justify-between">
      <div className="flex items-center gap-4 w-full">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/horizontal_gray_orange.svg"
            alt="Nexum Logo"
            width={90}
            height={45}
          />
        </Link>

        {user && user.role === 'PROFESSOR' ? (
          <ProfessorTabs />
        ) : (
          <AlunoTabs />
        )}

      </div>

      <div className="flex flex-1 items-center justify-end p-4">
        {user ? (
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`rounded-full ring-4 ${getRingColor(role)} cursor-pointer focus:outline-none`}
            >
              <Avatar className="w-10 h-10">
                <AvatarImage src={user.avatarUrl || undefined} alt={user.nome} />
                <AvatarFallback className="bg-orange-600 text-white">
                  {getInitials(user.nome)}
                </AvatarFallback>
              </Avatar>
            </button>

            {isDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-20">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Perfil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sair
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <Link
            href="/auth/login"
            className="bg-orange-400 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-orange-500 transition-colors"
          >
            Login
          </Link>
        )}
      </div>
    </header >
  )
}