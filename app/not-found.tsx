// app/not-found.tsx
import { Metadata } from "next";
import NotFoundClient from "./NotFoundClient";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Prabodhika",
  description: "The page you are looking for could not be found. It might have been moved or removed.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return <NotFoundClient />;
}