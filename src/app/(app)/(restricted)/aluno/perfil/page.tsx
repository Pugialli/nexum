// app/(app)/profile/edit/page.tsx
import { loggedUser } from "@/auth/auth";
import { getAluno } from "@/http/get-aluno";
import { AlunoProfileForm } from "../completar-perfil/aluno-profile-form";

export default async function EditProfilePage() {
  const user = await loggedUser()

  const alunoData = await getAluno(user!.slug)

  return (
    <div className="flex min-h-screen items-center justify-center">
      <AlunoProfileForm
        mode="edit"
        initialData={{
          nome: alunoData.nome,
          email: alunoData.email,
          telefone: alunoData.telefone ?? undefined,
          dataNascimento: alunoData.dataNascimento ?? undefined,
          carreira: alunoData.carreiraValue ?? undefined,
          slug: alunoData.slug,
          resetPassword: alunoData.resetPassword,
        }}
      />
    </div>
  );
}