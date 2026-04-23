import type { Metadata } from "next";
import CompleteProfileClient from "./CompleteProfileClient";

export const metadata: Metadata = {
  title: "Complete Your Profile – Prabodhika",
  description:
    "Tell us about your university, course, and interests to personalise your experience.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Profile Setup",
    description: "Finish your account to get tailored content.",
    url: "https://prabodhika.com/complete-profile",
    images: [{ url: "/og-profile.jpg" }],
  },
  alternates: {
    canonical: "https://prabodhika.com/complete-profile",
  },
};

export default function Page() {
  // This will be your client component (e.g., <CompleteProfileClient />)
  return <CompleteProfileClient />;
}