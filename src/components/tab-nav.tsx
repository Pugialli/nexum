'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface TabNavProps {
  tabs: {
    href: string
    label: string
  }[]
}

export function TabNav({ tabs }: TabNavProps) {
  const pathname = usePathname()

  return (
    <div className="flex items-center gap-4">
      {tabs.map((tab) => {
        const isCurrent = tab.href === pathname
        
        return (
          <div key={tab.href} className="relative">
            <Link
              href={tab.href}
              className={`block p-3 transition-colors ${
                isCurrent 
                  ? 'text-foreground font-bold' 
                  : 'text-muted-foreground'
              }`}
            >
              {tab.label}
            </Link>
            {isCurrent && (
              <>
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-foreground" />
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-foreground" />
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}