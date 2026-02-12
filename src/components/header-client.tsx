'use client'

import type { GetProfileResponse } from '@/app/api/auth/profile/[id]/get-profile'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AlunoTabs } from './aluno-tabs'
import { ProfessorTabs } from './professor-tabs'
import { ProfileButton } from './profile-button'
import { Button } from './ui/button'

interface HeaderClientProps {
  user: GetProfileResponse | null
}

export function HeaderClient({ user }: HeaderClientProps) {
  const pathname = usePathname()

  //retirar na versão final, isso é só pra renderizar as tabs corretas enquanto o sistema de autenticação não está ativo
  const tempRole = pathname.split('/')[1]


  return (
    <header className="w-full border-b">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/images/horizontal_gray_orange.svg"
              alt="Nexum Logo"
              width={90}
              height={45}
            />
          </Link>

          {tempRole === 'professor' ? <ProfessorTabs /> : <AlunoTabs />}
        </div>

        <div className="flex items-center shrink-0">
          {user ? (
            <ProfileButton user={user} />
          ) : (
            <Button size="xl" asChild>
              <Link href="/auth/login">
                Login
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}