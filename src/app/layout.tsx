import { Providers } from "@/components/providerts";
import { getProfile } from "@/http/get-profile";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexum",
  description: "Sua plataforma de aprendizado",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies()).get('nexum-token')?.value;
  let user = null;

  if (token) {
    try {
      user = await getProfile(token);
    } catch (err) {
      // User will be null if token is invalid
    }
  }

  return (
    <html lang="en" className={inter.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers user={user}>{children}</Providers>
      </body>
    </html>
  );
}