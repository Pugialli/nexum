import { Header } from "@/components/header";

export default function CenteredLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
