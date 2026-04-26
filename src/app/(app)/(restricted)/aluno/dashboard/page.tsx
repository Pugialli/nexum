import { loggedUser } from "@/auth/auth";
import { DashboardAluno } from "@/components/dashboard/dashboard";
import { DashboardEmptyState } from "@/components/dashboard/dashboardEmpty";
import { getDashboard } from "@/http/get-dashboard";
import { getHabilidades } from "@/http/get-habilidades";
import { notFound } from "next/navigation";

export default async function Page() {
  const user = await loggedUser()

  const [data, habilidades] = await Promise.all([
    getDashboard(user!.slug),
    getHabilidades(),
  ])

  if (!data) notFound()

  const semProvas = !data.provas || data.provas.length === 0


  if (semProvas)
    return (
      <DashboardEmptyState />
    )

  return (
    <div className="h-screen w-full p-4 sm:p-10 pt-2 sm:pt-4 flex flex-col gap-4">
      <DashboardAluno
        provas={data.provas}
        errosPorProva={data.errosPorProva}
        habilidades={data.habilidades}
        habilidadesInfo={habilidades}
      />
    </div>
  )
}
