import { loggedUser } from '@/auth/auth'
import { getCadernoErros } from '@/http/get-caderno-erros'
import { CadernoErros } from './caderno-erros'

export default async function Page() {
  const user = await loggedUser()
  const erros = user ? await getCadernoErros(user.slug) : []

  return (
    <div className="mx-auto w-full max-w-[1060px] px-4 py-6 sm:px-7 sm:py-8">
      <CadernoErros erros={erros} />
    </div>
  )
}
