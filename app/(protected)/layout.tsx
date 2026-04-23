import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  // 🔐 Not logged in
  if (!session) {
    redirect("/login");
  }

  // 🔥 Email not verified
  if (!session.user.email_verified) {
    redirect("/verify-email");
  }

  // 🔥 Profile not completed
  if (!session.user.profile_completed) {
    redirect("/complete-profile");
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      {children}
    </div>
  );
}