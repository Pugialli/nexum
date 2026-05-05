import { loggedUser } from '@/auth/auth'
import { getCadernoErros } from '@/http/get-caderno-erros'
import { CadernoErros } from './caderno-erros'

export default async function Page() {
  const user = await loggedUser()
  const erros = user ? await getCadernoErros(user.slug) : []

  return (
    <>
      {/* Page header */}
      <header className="flex h-[52px] shrink-0 items-center border-b border-border bg-white px-7">
        <h3 className="font-heading text-[17px] font-bold text-foreground">Caderno de Erros</h3>
      </header>

      {/* Content */}
      <div className="mx-auto flex w-full max-w-[900px] flex-col gap-5 p-7">
        <CadernoErros erros={erros} />
      </div>
    </>
  )
}
