import { PlusSquare } from 'lucide-react'
import Link from 'next/link'

import { loggedUser } from '@/auth/auth'
import { Button } from '@/components/ui/button'
import { getAlunos } from '@/http/get-alunos'
import { TabelaAlunos } from './(alunos)/tabela-alunos'

export default async function Home() {
  const user = await loggedUser()

  const alunosProfessor = user && await getAlunos(user.slug)

  return (
    <div className="space-y-8 p-8">
      <h1 className="text-2xl font-bold">Alunos</h1>

      <Button size="lg" asChild>
        <Link href={`/professor/cadastro-aluno`}>
          <PlusSquare className="size-6" />
          Novo aluno
        </Link>
      </Button>

      {alunosProfessor && <TabelaAlunos alunos={alunosProfessor} />}
    </div>
  )
}