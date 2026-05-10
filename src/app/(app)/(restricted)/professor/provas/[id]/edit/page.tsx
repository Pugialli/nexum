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
    <div className="mx-auto w-full max-w-[1100px] px-3 py-6 sm:px-4 sm:py-8">
      <ProvaForm habilidades={habilidades} assuntos={assuntos} prova={prova} />
    </div>
  )
}
