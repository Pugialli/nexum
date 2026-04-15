import { DashboardAluno } from "@/components/dashboard/dashboard"
import { getDashboard } from "@/http/get-dashboard"
import { getHabilidades } from "@/http/get-habilidades"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const [data, habilidades] = await Promise.all([
    getDashboard(slug),
    getHabilidades(),
  ])

  if (!data) notFound()

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