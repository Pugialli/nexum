import { loggedUser } from "@/auth/auth"
import { getCadernoErros } from "@/http/get-caderno-erros"
import { CadernoErros } from "./caderno-erros"

export default async function Page() {
  const user = await loggedUser()

  const erros = user ? await getCadernoErros(user.slug) : []

  return (
    <div className="h-screen w-full p-4 sm:p-10 pt-2 sm:pt-4 flex flex-col gap-4">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Caderno de erros de {user?.nome}</h1>
      </div>

      <CadernoErros erros={erros} />
    </div>
  )
}