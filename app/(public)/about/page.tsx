// app/(public)/about/page.tsx
import type { Metadata } from "next";
import { NavbarPublic } from "@/components/NavbarPublic";
import { FooterPublic } from "@/components/FooterPublic";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About - Prabodhika",
  description:
    "Prabodhika is a student-driven academic platform for sharing notes, resources, and knowledge across universities.",
  keywords: [
    "Prabodhika",
    "about prabodhika",
    "student notes platform",
    "university knowledge sharing",
  ],
  openGraph: {
    title: "About Prabodhika",
    description: "Learn about the mission behind Prabodhika",
    url: "https://yourdomain.com/about",
    siteName: "Prabodhika",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  alternates: { canonical: "https://yourdomain.com/about" },
};

// Inline style objects
const colors = {
  saffron: "#E8600A",
  amber: "#F59E0B",
  indigo: "#1E1B4B",
  cream: "#FFFBF5",
  stone: "#57534e",
  muted: "#78716c",
};

const pageStyles = {
  container: {
    minHeight: "100vh",
    background: `linear-gradient(135deg, ${colors.cream} 0%, #FEF3E8 55%, ${colors.cream} 100%)`,
    position: "relative" as const,
  },
  main: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "100px", // offset for fixed navbar
    paddingBottom: "80px",
    paddingLeft: "20px",
    paddingRight: "20px",
    position: "relative" as const,
    zIndex: 2,
  },
  card: {
    maxWidth: "800px",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(12px)",
    borderRadius: "32px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.05), 0 2px 6px rgba(0,0,0,0.02)",
    border: "1px solid rgba(255,255,255,0.6)",
    padding: "48px 40px",
  },
  breadcrumb: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "24px",
    fontSize: "14px",
    color: colors.muted,
  },
  breadcrumbLink: {
    color: colors.saffron,
    textDecoration: "none",
    transition: "color 0.2s",
  },
  title: {
    fontSize: "48px",
    fontWeight: "700",
    fontFamily: "'Yeseva One', Georgia, serif",
    background: `linear-gradient(120deg, ${colors.saffron}, ${colors.amber})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: "32px",
    letterSpacing: "-0.5px",
  },
  paragraph: {
    fontSize: "17px",
    lineHeight: "1.7",
    color: colors.stone,
    marginBottom: "24px",
  },
  highlight: {
    color: colors.saffron,
    fontWeight: 600,
  },
  quote: {
    marginTop: "40px",
    paddingTop: "24px",
    borderTop: "2px solid rgba(232,96,10,0.15)",
    fontStyle: "italic",
    fontSize: "16px",
    color: colors.indigo,
    textAlign: "center" as const,
  },
};

// Simple Mandala decoration (inline SVG)
function MandalaDecoration() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 800 800"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity: 0.04 }}
      >
        <circle cx="400" cy="400" r="300" fill="none" stroke={colors.saffron} strokeWidth="2" />
        <circle cx="400" cy="400" r="220" fill="none" stroke={colors.saffron} strokeWidth="1.5" />
        <circle cx="400" cy="400" r="140" fill="none" stroke={colors.saffron} strokeWidth="1" />
        <circle cx="400" cy="400" r="60" fill="none" stroke={colors.saffron} strokeWidth="0.5" />
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x2 = 400 + 300 * Math.cos(angle);
          const y2 = 400 + 300 * Math.sin(angle);
          return (
            <line
              key={i}
              x1="400"
              y1="400"
              x2={x2}
              y2={y2}
              stroke={colors.saffron}
              strokeWidth="1.2"
            />
          );
        })}
      </svg>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div style={pageStyles.container}>
      <MandalaDecoration />
      <NavbarPublic />
      <main style={pageStyles.main}>
        <div style={pageStyles.card}>
          <div style={pageStyles.breadcrumb}>
            <Link href="/" style={pageStyles.breadcrumbLink}>
              Home
            </Link>
            <span style={{ color: colors.muted }}>/</span>
            <span style={{ fontWeight: 500, color: colors.indigo }}>About</span>
          </div>

          <h1 style={pageStyles.title}>About Prabodhika</h1>

          <p style={pageStyles.paragraph}>
            <span style={pageStyles.highlight}>Prabodhika</span> is a modern academic platform built for students across
            universities. It helps students discover, share, and organize study
            materials like notes, links, and resources in one place.
          </p>

          <p style={pageStyles.paragraph}>
            Our goal is to make learning more accessible and collaborative by
            creating a centralized knowledge hub for college students.
          </p>

          <p style={pageStyles.paragraph}>
            Whether you're preparing for exams, exploring subjects, or sharing
            insights — <span style={pageStyles.highlight}>Prabodhika</span> is designed to support your academic journey.
          </p>

          <div style={pageStyles.quote}>
            “प्रबोधिका — जो समझ जगाती है”
          </div>
        </div>
      </main>
      <FooterPublic />
    </div>
  );
}