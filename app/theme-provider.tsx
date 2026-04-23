"use client";

import { useEffect } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    document.documentElement.classList.toggle("dark", saved === "dark");
  }, []);

  return <>{children}</>;
}
