import { loggedUser } from "@/auth/auth";

export default async function Page() {
  const user = await loggedUser()

  return (
    <div className="h-screen w-full p-4 sm:p-10 pt-2 sm:pt-4 flex flex-col gap-4">
      Caderno de Erros de {user?.nome}
    </div>
  )
}
