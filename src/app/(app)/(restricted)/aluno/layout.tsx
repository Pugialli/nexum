import { auth } from '@/auth/auth';
import { redirect } from 'next/navigation';

export default async function AlunoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await auth()

  if (user.role === 'PROFESSOR') {
    redirect('/professor')
  }

  return <>{children}</>
}