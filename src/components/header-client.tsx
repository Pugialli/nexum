'use client'

import type { GetProfileResponse } from '@/app/api/auth/profile/[id]/get-profile'
import { signOut } from '@/auth/actions'
import { getInitials } from '@/utils/get-initials'
import { getRingColor } from '@/utils/ring-color'
import Link from 'next/link'
import { useState } from 'react'
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
    <div className="bg-orange-400 w-auto p-4 text-white font-bold text-2xl flex items-center justify-between">
      <div>Nexum</div>

      <div className="relative">
        {user ? (
          <div>
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
                    Update Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Log Out
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <Link
            href="/auth/login"
            className="bg-white text-orange-400 px-6 py-2 rounded-lg text-base font-semibold hover:bg-orange-50 transition-colors"
          >
            Logar
          </Link>
        )}
      </div>
    </div>
  )
}