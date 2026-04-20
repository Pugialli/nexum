import { CreateAssuntoForm } from './assunto-form'

export default function CadastroAssuntoPage() {
  return (
    <div className="min-h-screen w-full items-center justify-start p-4 space-y-4">
      <h1 className="font-bold">Cadastrar assunto</h1>
      <CreateAssuntoForm />
    </div>
  )
}