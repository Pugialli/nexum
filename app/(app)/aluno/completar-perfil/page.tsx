import { CompleteProfileForm } from "@/components/complete-profile-form";

// Note: This page requires a <SessionProvider> from "next-auth/react"
// to be wrapped around the application, for example in your root layout.
export default function CompleteProfilePage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <CompleteProfileForm />
    </div>
  );
}
