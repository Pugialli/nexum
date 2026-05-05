'use client'

import { BarChart3, BookOpen, ClipboardList } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  {
    href: '/aluno/dashboard',
    label: 'Dashboard',
    icon: BarChart3,
    active: (p: string) => p === '/aluno' || p === '/aluno/dashboard',
  },
  {
    href: '/aluno/cartao-resposta',
    label: 'Cartão Resposta',
    icon: ClipboardList,
    active: (p: string) => p.startsWith('/aluno/cartao-resposta'),
  },
  {
    href: '/aluno/caderno-erros',
    label: 'Caderno de Erros',
    icon: BookOpen,
    active: (p: string) => p.startsWith('/aluno/caderno-erros'),
  },
]

function initials(nome: string) {
  const parts = nome.trim().split(' ')
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

interface AlunoSidebarProps {
  nome: string
}

export function AlunoSidebar({ nome }: AlunoSidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className="flex h-screen w-[220px] shrink-0 flex-col sticky top-0"
      style={{ background: 'var(--sidebar-bg)' }}
    >
      {/* Logo */}
      <div
        className="px-[18px] py-5"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
        <Image
          src="/images/horizontal_gray_orange.svg"
          alt="Nexum Academy"
          width={120}
          height={22}
          style={{ filter: 'brightness(10)', opacity: 0.9 }}
          priority
        />
      </div>

      {/* Nav */}
      <nav className="flex-1 p-2">
        <p
          className="px-2.5 pb-1.5 pt-3"
          style={{
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)',
          }}
        >
          Navegação
        </p>
        {NAV.map(({ href, label, icon: Icon, active }) => {
          const isActive = active(pathname)
          return (
            <Link
              key={href}
              href={href}
              className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-[9px] text-[13px] transition-colors"
              style={{
                background: isActive ? 'var(--sidebar-active)' : 'transparent',
                color: isActive ? 'var(--color-primary)' : 'rgba(255,255,255,0.55)',
                fontWeight: isActive ? 600 : 400,
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'var(--sidebar-hover)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.85)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.55)'
                }
              }}
            >
              <Icon size={15} className="shrink-0" style={{ opacity: isActive ? 1 : 0.6 }} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* User footer */}
      <div
        className="flex items-center gap-2.5 px-3 py-3.5"
        style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div
          className="flex size-[30px] shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
          style={{
            background: 'var(--color-secondary)',
            boxShadow: '0 0 0 2px var(--color-secondary), 0 0 0 3.5px rgba(255,255,255,0.1)',
          }}
        >
          {initials(nome)}
        </div>
        <div>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>
            {nome}
          </p>
          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>Aluno</p>
        </div>
      </div>
    </aside>
  )
}
