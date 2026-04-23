// app/(public)/reset-password/page.tsx
import type { Metadata } from "next";
import ResetPasswordClient from "./ResetPasswordClient";


export const metadata: Metadata = {
  title: "Set New Password – Prabodhika",
  description: "Create a new strong password for your account.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Reset Password",
    description: "Choose a new password to secure your account.",
    url: "https://prabodhika.com/reset-password",
    images: [{ url: "/og-reset.jpg" }],
  },
  alternates: {
    canonical: "https://prabodhika.com/reset-password",
  },
};

export default function Page() {
  return <ResetPasswordClient />;
}