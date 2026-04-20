import { getAssuntos } from '@/http/get-assuntos'
import { AssuntosClient } from './assuntos-client'

export default async function Assuntos() {
  const assuntos = await getAssuntos()
  return <AssuntosClient assuntosIniciais={assuntos} />
}