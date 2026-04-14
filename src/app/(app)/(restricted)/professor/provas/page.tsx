import { BadgeCheck, PlusSquare } from 'lucide-react'
import Link from 'next/link'

import { loggedUser } from '@/auth/auth'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { getProvas } from '@/http/get-provas'
import { TabelaProvas } from './tabela-provas'
const messages = {
  created: 'Prova criada com sucesso',
  updated: 'Prova atualizada com sucesso',
}

interface ProvasPageProps {
  searchParams: Promise<{ success?: keyof typeof messages }>
}

export default async function Provas({ searchParams }: ProvasPageProps) {
  const user = await loggedUser()
  const { success } = await searchParams
  const provasProfessor = user && await getProvas()
  const successMessage = success ? messages[success] : null

  return (
    <div className="space-y-8 p-8">
      <h1 className="text-2xl font-bold">Provas</h1>

      {successMessage && (
        <Alert variant="success">
          <BadgeCheck className="size-4" />
          <AlertTitle>Sucesso!</AlertTitle>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      <Button size="lg" asChild>
        <Link href="/professor/provas/cadastro-prova">
          <PlusSquare className="size-6" />
          Nova prova
        </Link>
      </Button>

      {provasProfessor && <TabelaProvas provas={provasProfessor.provas} />}
    </div>
  )
}