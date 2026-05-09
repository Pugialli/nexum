import { loggedUser } from "@/auth/auth"
import { getProfessor } from "@/http/get-professor"
import { ProfessorProfileForm } from "./professor-profile-form"

export default async function EditProfilePage() {
  const user = await loggedUser()
  const professorData = await getProfessor(user!.slug)

  return (
    <div className="mx-auto w-full max-w-[600px] px-4 py-6 sm:px-7 sm:py-8">
      <ProfessorProfileForm
        initialData={{
          nome: professorData.nome,
          email: professorData.email,
          slug: professorData.slug,
          resetPassword: professorData.resetPassword,
          telefone: professorData.professor?.telefone ?? '',
          formacao: professorData.professor?.formacao ?? '',
        }}
      />
    </div>
  )
}
