import { AlunoProfileForm } from "./aluno-profile-form";

export default function CompleteProfilePage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <AlunoProfileForm mode="complete" />
    </div>
  );
}
