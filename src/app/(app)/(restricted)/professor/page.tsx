import { loggedUser } from '@/auth/auth'
import { getAlunos } from '@/http/get-alunos'

import { TabelaAlunos } from './tabela-alunos'

export default async function Home() {
  const user = await loggedUser()
  const alunos = user ? await getAlunos(user.slug) : []

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-6 sm:px-7 sm:py-8">
      <TabelaAlunos alunos={alunos} />
    </div>
  )
}
