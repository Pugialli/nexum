import { getAssuntos } from '@/http/get-assuntos'
import { getHabilidades } from '@/http/get-habilidades'
import { ProvaForm } from './prova-form'

export default async function CadastroProvaPage() {
  const [habilidades, assuntos] = await Promise.all([
    getHabilidades(),
    getAssuntos(),
  ])

  return (
    <div className="mx-auto w-full max-w-[1100px] px-3 py-6 sm:px-4 sm:py-8">
      <ProvaForm habilidades={habilidades} assuntos={assuntos} />
    </div>
  )
}
