'use client'

import type { GetProfileResponse } from '@/app/api/auth/profile/[id]/get-profile'
import { signOut } from '@/auth/actions'
import { getInitials } from '@/utils/get-initials'
import { getRingColor } from '@/utils/ring-color'
import { PlusIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { AlunoTabs } from './aluno-tabs'
import { ProfessorTabs } from './professor-tabs'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'

interface HeaderClientProps {
  user: GetProfileResponse | null
}

export function HeaderClient({ user }: HeaderClientProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const role = user?.role || ''
  const isDashboard = pathname === '/aluno/dashboard'

  async function handleLogout() {
    setIsDropdownOpen(false)
    await signOut()
    router.refresh()
  }

  return (
    <header className="w-auto p-4 border-b flex items-center justify-between">
      <div className="flex items-center gap-4 w-full">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/horizontal_gray_orange.svg"
            alt="Nexum Logo"
            width={0}
            height={0}
            loading="eager"
            className="w-[90px] h-auto"
          />
        </Link>

        {user && (
          user.role === 'PROFESSOR' ? <ProfessorTabs /> : <AlunoTabs />
        )}
      </div>

      <div className="flex flex-1 items-center justify-end p-4 gap-4">
        {isDashboard && (
          <Button asChild size="sm" className="hidden sm:flex">
            <Link href="/aluno/cartao-resposta">
              <PlusIcon className="mr-2 size-4" />
              Fazer nova prova
            </Link>
          </Button>
        )}

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
                    href={user.role === 'PROFESSOR' ? "professor/perfil" : "aluno/perfil"}
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
          <Button size="xl" asChild>
            <Link href={`/auth/login`}>
              Login
            </Link>
          </Button>
        )}
      </div>
    </header>
  )
}