// app/(public)/verify-email/page.tsx
import type { Metadata } from "next";
import VerifyEmailClient from "./VerifyEmailClient";

export const metadata: Metadata = {
  title: "Verify Your Email – Prabodhika",
  description:
    "Confirm your email address to activate your account and start using all features.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Email Verification",
    description: "One last step to unlock your academic hub.",
    url: "https://prabodhika.com/verify-email",
    images: [{ url: "/og-verify.jpg" }],
  },
  alternates: {
    canonical: "https://prabodhika.com/verify-email",
  },
};

export default function Page() {
  return <VerifyEmailClient />;
}