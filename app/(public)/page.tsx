import type { Metadata } from "next";
import HomeClient from "./HomeClient";


/* ── Prabodhika Homepage ──────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Awaken Understanding – Free Academic Hub for Indian Students",
  description:
    "Join Prabodhika – upload notes, ask questions, and find trusted study resources. Built for Indian colleges. Completely free.",
  openGraph: {
    title: "Prabodhika – Free Academic Hub for Indian Students",
    description:
      "The smart way to study: notes, Q&A, and discussions tailored to your syllabus.",
    url: "https://prabodhika.com",
    images: [{ url: "/og-home.jpg" }],
  },
  twitter: {
    title: "Prabodhika – Free Academic Hub",
    description: "Study smarter with community notes and Q&A.",
    images: ["/og-home.jpg"],
  },
  alternates: {
    canonical: "https://prabodhika.com",
  },
};

export default function Page() {
  return (
    <HomeClient />
  );
}