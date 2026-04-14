import { getAssuntos } from '@/http/get-assuntos'
import { getHabilidades } from '@/http/get-habilidades'
import { ProvaForm } from './prova-form'

export default async function CadastroProvaPage() {
  const [habilidades, assuntos] = await Promise.all([
    getHabilidades(),
    getAssuntos(),
  ])

  return (
    <div className="space-y-8 p-8">
      <h1 className="text-2xl font-bold">Nova Prova</h1>
      <ProvaForm habilidades={habilidades} assuntos={assuntos} />
    </div>
  )
}