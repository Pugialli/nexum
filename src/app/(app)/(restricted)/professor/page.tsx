import { loggedUser } from '@/auth/auth'
import { getExAlunos } from '@/http/get-exalunos'
import { getAlunos } from '@/http/get-alunos'
import { Suspense } from 'react'

import { TabSwitcher } from './tab-switcher'
import { TabelaAlunos } from './tabela-alunos'
import { TabelaExAlunos } from './tabela-exalunos'

interface PageProps {
  searchParams: Promise<{ tab?: string }>
}

export default async function Home({ searchParams }: PageProps) {
  const { tab } = await searchParams
  const user = await loggedUser()
  const isExAlunos = tab === 'exalunos'

  const [alunos, exAlunos] = await Promise.all([
    !isExAlunos && user ? getAlunos(user.slug) : Promise.resolve([]),
    isExAlunos && user ? getExAlunos(user.slug) : Promise.resolve([]),
  ])

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-6 sm:px-7 sm:py-8">
      <Suspense>
        <TabSwitcher />
      </Suspense>
      {isExAlunos
        ? <TabelaExAlunos exAlunos={exAlunos} />
        : <TabelaAlunos alunos={alunos} />}
    </div>
  )
}
