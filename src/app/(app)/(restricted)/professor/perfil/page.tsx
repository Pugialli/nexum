import { loggedUser } from "@/auth/auth"
import { getProfessor } from "@/http/get-professor"
import { ProfessorProfileForm } from "./professor-profile-form"

export default async function EditProfilePage() {
  const user = await loggedUser()
  const professorData = await getProfessor(user!.slug)

  return (
    <div className="flex min-h-screen items-center justify-center">
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