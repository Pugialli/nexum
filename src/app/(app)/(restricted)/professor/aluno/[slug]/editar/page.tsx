import { AlunoProfileForm } from '@/app/(app)/(restricted)/aluno/completar-perfil/aluno-profile-form'
import { getAluno } from '@/http/get-aluno'
import { notFound } from 'next/navigation'

interface EditAlunoPageProps {
  params: Promise<{ slug: string }>
}

export default async function EditAlunoPage({ params }: EditAlunoPageProps) {
  const { slug } = await params

  let aluno
  try {
    aluno = await getAluno(slug)
  } catch {
    notFound()
  }

  return (
    <div className="mx-auto w-full max-w-[600px] px-4 py-6 sm:px-7 sm:py-8">
      <AlunoProfileForm
        mode="edit"
        redirectTo="/professor"
        initialData={{
          slug: aluno.slug,
          nome: aluno.nome,
          email: aluno.email,
          dataNascimento: aluno.dataNascimento ?? undefined,
          telefone: aluno.telefone ?? undefined,
          carreira: aluno.carreiraValue ?? undefined,
          resetPassword: aluno.resetPassword,
        }}
      />
    </div>
  )
}
