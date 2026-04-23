// app/(public)/forgot-password/page.tsx
import type { Metadata } from "next";
import ForgotPasswordClient from "./ForgotPasswordClient";

export const metadata: Metadata = {
  title: "Reset Your Password – Prabodhika",
  description:
    "Request a password reset link to regain access to your account.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Forgot Password",
    description: "We'll help you reset it quickly.",
    url: "https://prabodhika.com/forgot-password",
    images: [{ url: "/og-reset.jpg" }],
  },
  alternates: {
    canonical: "https://prabodhika.com/forgot-password",
  },
};

export default function Page() {
  return <ForgotPasswordClient />;
}