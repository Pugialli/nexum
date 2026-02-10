import { Header } from "@/components/header";

export default function CenteredLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="z-50 h-screen w-auto bg-background">
        <Header />
        <div className="flex z-40 h-auto bg-background">{children}</div>
      </div>
  )
}
