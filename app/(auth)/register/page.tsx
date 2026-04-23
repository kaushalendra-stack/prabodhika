// app/(public)/register/page.tsx
import type { Metadata } from "next";
import RegisterClient from "./RegisterClient";

export const metadata: Metadata = {
  title: "Create Free Account – Prabodhika",
  description:
    "Join thousands of Indian students. Upload notes, ask questions, and access quality study resources – all free.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Join Prabodhika – Free Academic Hub",
    description: "Sign up in seconds. No fees, no spam.",
    url: "https://prabodhika.com/register",
    images: [{ url: "/og-register.jpg" }],
  },
  alternates: {
    canonical: "https://prabodhika.com/register",
  },
};

export default function Page() {
  return <RegisterClient />;
}