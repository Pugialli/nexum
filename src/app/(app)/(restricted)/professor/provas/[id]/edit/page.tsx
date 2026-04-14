import { getAssuntos } from "@/http/get-assuntos"
import { getHabilidades } from "@/http/get-habilidades"
import { getProva } from "@/http/get-prova"
import { ProvaForm } from "../../cadastro-prova/prova-form"

interface EditProvaPageProps {
  params: Promise<{ id: string }>
}

export default async function EditProvaPage({ params }: EditProvaPageProps) {
  const { id } = await params

  const [habilidades, assuntos, prova] = await Promise.all([
    getHabilidades(),
    getAssuntos(),
    getProva(id),
  ])

  return (
    <div className="space-y-8 p-8">
      <h1 className="text-2xl font-bold">Editar Prova</h1>
      <ProvaForm habilidades={habilidades} assuntos={assuntos} prova={prova} />
    </div>
  )
}