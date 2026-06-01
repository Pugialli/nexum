import { AlunoProfileForm } from "./aluno-profile-form"

export default function CompleteProfilePage() {
  return (
    <div className="mx-auto w-full max-w-150 px-4 py-6 sm:px-7 sm:py-8">
      <AlunoProfileForm mode="complete" />
    </div>
  )
}
