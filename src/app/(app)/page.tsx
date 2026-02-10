import { auth } from "@/auth/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await auth()

  switch (user.role) {
    case 'ALUNO':
      redirect('/aluno')
    case 'PROFESSOR':
      redirect('/professor')
    default:
      redirect('/auth/login')
  }
}
