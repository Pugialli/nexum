import { PlusSquare } from 'lucide-react'
import Link from 'next/link'

import { loggedUser } from '@/auth/auth'
import { Button } from '@/components/ui/button'
import { getAlunos } from '@/http/get-alunos'
import { TabelaAlunos } from './tabela-alunos'

// const alunosEstaticos = [
//   {
//     id: 1,
//     nome: 'João Silva',
//     gcpMedio: '89%',
//     numeroProvas: 3,
//     dataIngresso: '15/03/2024',
//     provas: [
//       { id: 1, nome: '2025.1', concluida: true },
//       { id: 2, nome: '2024.1', concluida: true },
//       { id: 3, nome: '2023.1', concluida: true },
//     ],
//   },
//   {
//     id: 2,
//     nome: 'Maria Santos',
//     gcpMedio: '92%',
//     numeroProvas: 2,
//     dataIngresso: '20/02/2024',
//     provas: [
//       { id: 1, nome: '2025.1', concluida: true },
//       { id: 2, nome: '2024.1', concluida: false },
//       { id: 3, nome: '2023.1', concluida: true },
//     ],
//   },
//   {
//     id: 3,
//     nome: 'Pedro Oliveira',
//     gcpMedio: '78%',
//     numeroProvas: 1,
//     dataIngresso: '05/04/2024',
//     provas: [
//       { id: 1, nome: '2025.1', concluida: false },
//       { id: 2, nome: '2024.1', concluida: false },
//       { id: 3, nome: '2023.1', concluida: true },
//     ],
//   },
// ]

export default async function Home() {
  const user = await loggedUser()
  const alunosProfessor = await getAlunos(user!.slug)

  return (
      <div className="space-y-8 p-8">
        <h1 className="text-2xl font-bold">Alunos</h1>

        <Button size="lg" asChild>
          <Link href={`/professor/cadastro-aluno`}>
            <PlusSquare className="size-6" />
            Novo aluno
          </Link>
        </Button>

        <TabelaAlunos alunos={alunosProfessor} />
      </div>
  )
}