'use client'

import { BookOpen, FileText, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { authClient } from '@/auth/client'

const NAV = [
  {
    href: '/professor',
    label: 'Alunos',
    icon: Users,
    active: (p: string) =>
      !p.startsWith('/professor/provas') &&
      !p.startsWith('/professor/assuntos') &&
      !p.startsWith('/professor/perfil'),
  },
  {
    href: '/professor/provas',
    label: 'Provas',
    icon: FileText,
    active: (p: string) => p.startsWith('/professor/provas'),
  },
  {
    href: '/professor/assuntos',
    label: 'Assuntos',
    icon: BookOpen,
    active: (p: string) =>
      p.startsWith('/professor/assuntos') ||
      p.startsWith('/professor/cadastro-assunto'),
  },
]

function initials(nome: string) {
  const parts = nome.trim().split(' ')
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

interface ProfessorSidebarProps {
  nome: string
}

export function ProfessorSidebar({ nome }: ProfessorSidebarProps) {
  const pathname = usePathname()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  async function handleSignOut() {
    await authClient.signOut()
    window.location.href = '/auth/login'
  }

  return (
    <header
      className="sticky top-0 z-30 border-b border-border"
      style={{
        background: 'rgba(255,255,255,0.88)',
        backdropFilter: 'saturate(140%) blur(14px)',
        WebkitBackdropFilter: 'saturate(140%) blur(14px)',
      }}
    >
      <div className="mx-auto flex h-16 max-w-[1280px] items-center gap-7 px-7">
        {/* Logo */}
        <Link href="/professor" className="shrink-0">
          <Image
            src="/images/horizontal_gray_orange.svg"
            alt="Nexum Academy"
            width={100}
            height={22}
            priority
          />
        </Link>

        {/* Segmented tabs */}
        <nav
          className="flex items-center gap-0.5 rounded-full border border-border p-1"
          style={{ background: 'var(--page-bg)' }}
        >
          {NAV.map(({ href, label, icon: Icon, active }) => {
            const isActive = active(pathname)
            return (
              <Link
                key={href}
                href={href}
                className="flex h-[34px] items-center gap-2 rounded-full px-3.5 text-[13.5px] font-semibold transition-all"
                style={{
                  background: isActive ? 'white' : 'transparent',
                  color: isActive ? 'oklch(0.45 0.08 186)' : 'oklch(0.58 0.04 186)',
                  boxShadow: isActive
                    ? '0 1px 0 rgba(15,23,42,0.04), 0 4px 14px -8px rgba(15,23,42,0.15), inset 0 0 0 1px var(--color-border)'
                    : 'none',
                }}
              >
                <Icon
                  size={14}
                  style={{
                    color: isActive ? 'var(--color-primary)' : 'currentColor',
                    opacity: isActive ? 1 : 0.7,
                  }}
                />
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="flex-1" />

        {/* Avatar + dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-[12px] font-bold text-white transition-opacity hover:opacity-90"
            style={{
              background: 'var(--color-primary)',
              boxShadow: '0 0 0 2px white, 0 0 0 3.5px var(--color-primary)',
            }}
          >
            {initials(nome)}
          </button>

          {dropdownOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
              <div className="absolute right-0 top-11 z-20 min-w-[160px] overflow-hidden rounded-xl border border-border bg-white shadow-lg">
                <div className="border-b border-border px-3 py-2.5">
                  <p
                    className="text-[12px] font-semibold"
                    style={{ color: 'oklch(0.45 0.08 186)' }}
                  >
                    {nome}
                  </p>
                  <p className="text-[11px]" style={{ color: '#94a3b8' }}>
                    Professor
                  </p>
                </div>
                <Link
                  href="/professor/perfil"
                  className="flex items-center px-3 py-2 text-[13px] transition-colors hover:bg-[var(--page-bg)]"
                  style={{ color: 'oklch(0.45 0.08 186)' }}
                  onClick={() => setDropdownOpen(false)}
                >
                  Perfil
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex w-full cursor-pointer items-center px-3 py-2 text-[13px] transition-colors hover:bg-[var(--page-bg)]"
                  style={{ color: 'var(--color-destructive)' }}
                >
                  Sair
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
