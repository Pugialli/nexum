import { CreateAlunoForm } from "./aluno-form";

export default function RegisterPage() {
  return (
    <div className="min-h-screen w-full items-center justify-start p-4 space-y-4">
      <h1 className="font-bold">Cadastrar aluno</h1>
      <CreateAlunoForm />
    </div>
  )
}
