import { Header } from '@/components/header'
import { getProfile } from '@/http/get-profile'

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getProfile()

  return (
    <div className="z-50 h-screen w-auto bg-background">
      <Header user={user} />
      <div className="flex z-40 h-auto bg-background">{children}</div>
    </div>
  )
}