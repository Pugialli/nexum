import { BadgeCheck, Plus } from 'lucide-react'
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
    <>
      {/* Page header */}
      <header className="flex h-[52px] shrink-0 items-center justify-between border-b border-border bg-white px-7">
        <h3 className="font-heading text-[17px] font-bold text-foreground">Provas</h3>
        <Button size="sm" asChild>
          <Link href="/professor/provas/cadastro-prova">
            <Plus className="size-3.5" />
            Nova prova
          </Link>
        </Button>
      </header>

      {/* Content */}
      <div className="mx-auto flex w-full max-w-[1060px] flex-col gap-5 p-7">
        {successMessage && (
          <Alert variant="success">
            <BadgeCheck className="size-4" />
            <AlertTitle>Sucesso!</AlertTitle>
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}

        {provasProfessor && <TabelaProvas provas={provasProfessor.provas} />}
      </div>
    </>
  )
}
