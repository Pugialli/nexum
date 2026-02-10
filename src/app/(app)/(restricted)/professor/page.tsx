import { PlusSquare } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'


export default function Home() {
  return (
    <>
      <div className="space-y-8 p-8">
        <h1 className="text-2xl font-bold">Alunos</h1>


        <Button size="lg" asChild>
          <Link href={`/professor/cadastro-aluno`}>
            <PlusSquare className="size-6" />
            Novo aluno
          </Link>
        </Button>
        <div>Lista de alunos</div>

      </div>
    </>
  )
}
