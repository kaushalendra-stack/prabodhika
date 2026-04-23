import type { Metadata } from "next";
import LoginClient from "./LoginClient";

export const metadata: Metadata = {
  title: "Sign In to Prabodhika",
  description:
    "Access your notes, questions, and dashboard. Sign in with Google, GitHub, or email.",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Sign In – Prabodhika",
    description: "Continue your academic journey.",
    url: "https://prabodhika.com/login",
    images: [{ url: "/og-login.jpg" }],
  },
  alternates: {
    canonical: "https://prabodhika.com/login",
  },
};

export default function Page() {
  return <LoginClient />;
}