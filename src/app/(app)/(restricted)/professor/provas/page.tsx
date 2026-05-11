import { BadgeCheck } from 'lucide-react'

import { loggedUser } from '@/auth/auth'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
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
  const { provas } = user ? await getProvas() : { provas: [] }
  const successMessage = success ? messages[success] : null

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-6 sm:px-7 sm:py-8">
      {successMessage && (
        <Alert variant="success" className="mb-6">
          <BadgeCheck className="size-4" />
          <AlertTitle>Sucesso!</AlertTitle>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      <TabelaProvas provas={provas} />
    </div>
  )
}
