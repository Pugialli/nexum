'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const TABS = [
  { key: 'alunos', label: 'Alunos', href: '/professor' },
  { key: 'exalunos', label: 'Ex-alunos', href: '/professor?tab=exalunos' },
]

export function TabSwitcher() {
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab') ?? 'alunos'

  return (
    <div
      className="mb-6 flex gap-1 rounded-[12px] border border-border bg-white p-1"
      style={{ width: 'fit-content' }}
    >
      {TABS.map(({ key, label, href }) => {
        const active = tab === key
        return (
          <Link
            key={key}
            href={href}
            className="flex h-8 items-center rounded-[9px] px-4 text-[13px] font-semibold transition-all"
            style={
              active
                ? {
                    background:
                      'linear-gradient(180deg, var(--color-primary) 0%, oklch(0.58 0.19 35) 100%)',
                    color: 'white',
                    boxShadow: '0 1px 0 rgba(255,255,255,0.2) inset',
                  }
                : { color: '#94a3b8' }
            }
          >
            {label}
          </Link>
        )
      })}
    </div>
  )
}
