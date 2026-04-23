// components/FooterPublic.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

const C = {
    indigo: "#1E1B4B",
    saffron: "#E8600A",
    amber: "#F59E0B",
    white: "#FFFFFF",
};

export function FooterPublic() {
    const linkStyle = {
        color: "rgba(255,255,255,.6)",
        textDecoration: "none",
        fontSize: "14px",
        transition: "color 0.2s",
        display: "inline-block",
        marginBottom: "10px",
    };

    const socialIconStyle = {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        backgroundColor: "rgba(255,255,255,0.08)",
        transition: "all 0.2s",
        color: "rgba(255,255,255,0.7)",
    };

    return (
        <>
            <style>
                {`
          @media (max-width: 768px) {
            .footer-grid { flex-direction: column !important; gap: 2rem !important; }
            .footer-columns { flex-wrap: wrap !important; gap: 2rem !important; }
          }
          @media (max-width: 480px) {
            .footer-bottom { flex-direction: column; text-align: center; gap: 1rem; }
          }
        `}
            </style>

            <footer style={{ background: C.indigo, padding: "64px 32px 32px", color: "rgba(255,255,255,.7)" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <div className="footer-grid" style={{ display: "flex", justifyContent: "space-between", gap: "3rem", flexWrap: "wrap", paddingBottom: "48px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>

                        {/* Brand column */}
                        <div style={{ flex: "1.5", minWidth: "300px" }}>
                            <div style={{ marginBottom: "20px" }}>
                                <Image src="/logo-light.svg" width={200} height={80} alt="Prabodhika" />
                            </div>
                            <p style={{ lineHeight: 1.6, fontSize: "14px", marginBottom: "24px", color: "rgba(255,255,255,.7)" }}>
                                Your Academic Hub — awakening understanding for students across India. Quality first, community driven, and always free.
                            </p>
                            <div style={{ display: "flex", gap: "12px" }}>
                                {[
                                    { name: "Facebook", icon: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
                                    { name: "Twitter", icon: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" },
                                    { name: "Instagram", icon: "M16 3H8a5 5 0 0 0-5 5v8a5 5 0 0 0 5 5h8a5 5 0 0 0 5-5V8a5 5 0 0 0-5-5zm-4 13a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm5.5-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" },
                                    { name: "LinkedIn", icon: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" },
                                ].map((social) => (
                                    <a
                                        key={social.name}
                                        href="#"
                                        style={socialIconStyle}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = C.saffron;
                                            e.currentTarget.style.color = C.white;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)";
                                            e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                                        }}
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d={social.icon} />
                                        </svg>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Links columns */}
                        {/* <div className="footer-columns" style={{ display: "flex", gap: "3rem", flex: "2", flexWrap: "wrap" }}>
                            {[
                                {
                                    title: "Platform",
                                    links: [
                                        { name: "Content Hub", href: "/content-hub" },
                                        { name: "Community Q&A", href: "/qa" },
                                        { name: "Smart Search", href: "/search" },
                                        { name: "Dashboard", href: "/dashboard" },
                                        { name: "Bookmarks", href: "/bookmarks" },
                                    ],
                                },
                                {
                                    title: "Resources",
                                    links: [
                                        { name: "Blog", href: "/blog" },
                                        { name: "Study Tips", href: "/tips" },
                                        { name: "Exam Prep", href: "/exams" },
                                        { name: "Success Stories", href: "/stories" },
                                        { name: "Help Center", href: "/help" },
                                    ],
                                },
                                {
                                    title: "Company",
                                    links: [
                                        { name: "About Us", href: "/about" },
                                        { name: "Contact", href: "/contact" },
                                        { name: "Careers", href: "/careers" },
                                        { name: "Privacy Policy", href: "/privacy" },
                                        { name: "Terms of Use", href: "/terms" },
                                    ],
                                },
                            ].map((col) => (
                                <div key={col.title} style={{ minWidth: "140px" }}>
                                    <h4 style={{ color: C.white, fontWeight: 700, marginBottom: "20px", fontSize: "14px", letterSpacing: "1.5px", textTransform: "uppercase" }}>
                                        {col.title}
                                    </h4>
                                    {col.links.map((link) => (
                                        <div key={link.name} style={{ marginBottom: "8px" }}>
                                            <Link
                                                href={link.href}
                                                style={linkStyle}
                                                onMouseEnter={(e) => (e.currentTarget.style.color = C.white)}
                                                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,.6)")}
                                            >
                                                {link.name}
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div> */}
                    </div>

                    {/* Bottom bar */}
                    <div className="footer-bottom" style={{ paddingTop: "32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
                        <span style={{ fontSize: "13px", color: "rgba(255,255,255,.5)" }}>
                            © 2025 Prabodhika. Made with ❤️ for Indian students.
                        </span>
                        <div style={{ display: "flex", gap: "24px" }}>
                            {/* <Link href="#" style={{ color: "rgba(255,255,255,.5)", fontSize: "13px", textDecoration: "none" }}>
                                Instagram
                            </Link>
                            <Link href="/terms" style={{ color: "rgba(255,255,255,.5)", fontSize: "13px", textDecoration: "none" }}>
                                Terms
                            </Link>
                            <Link href="#" style={{ color: "rgba(255,255,255,.5)", fontSize: "13px", textDecoration: "none" }}>
                                Twitter
                            </Link> */}
                            <span style={{ fontSize: "13px", color: "rgba(255,255,255,.5)" }}>
                                Powered and Managed by <a href="https://orvexa.com" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,.6)", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#E8600A"} onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,.6)"}>Orvexa.com</a>
                            </span>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}