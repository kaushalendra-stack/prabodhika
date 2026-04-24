"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export function NavbarPublic() {
    // Always start "light" on server AND first client render to avoid hydration mismatch.
    // useEffect syncs with localStorage / prefers-color-scheme AFTER hydration.
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [theme, setTheme] = useState<"light" | "dark">("light");

    const closeMenu = () => setMenuOpen(false);

    useEffect(() => {
        const saved = localStorage.getItem("theme") as "light" | "dark" | null;
        if (saved) {
            setTheme(saved);
            document.documentElement.classList.toggle("dark", saved === "dark");
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setTheme("dark");
            document.documentElement.classList.add("dark");
        }
    }, []);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const toggleTheme = () => {
        const next = theme === "light" ? "dark" : "light";
        setTheme(next);
        localStorage.setItem("theme", next);
        document.documentElement.classList.toggle("dark", next === "dark");
    };

    return (
        <nav style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
            background: scrolled || menuOpen
                ? (theme === "dark" ? "rgba(28,26,23,.97)" : "rgba(255,251,245,.97)")
                : "transparent",
            backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
            boxShadow: scrolled || menuOpen ? "0 1px 20px rgba(0,0,0,.07)" : "none",
            transition: "all .3s ease",
            padding: "0 24px",
        }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", height: 70, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Link href="/" onClick={closeMenu} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
                    <Image src={theme === "light" ? "/logo.svg" : "/logo-light.svg"} width={225} height={100} alt="Prabodhika" />
                </Link>

                <div className="desktop-nav" style={{ display: "flex", gap: 32, alignItems: "center" }}>
                    <Link href="/about" className="nav-link">About</Link>
                    <Link href="/#features" className="nav-link">Features</Link>
                    <Link href="/#how-it-works" className="nav-link">How It Works</Link>
                    <Link href="/#audience" className="nav-link">For Students</Link>
                    <button
                        type="button"
                        onClick={toggleTheme}
                        aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
                        style={{
                            width: 38, height: 38, borderRadius: 10,
                            border: "1.5px solid #e7e5e4",
                            background: "transparent", cursor: "pointer",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            transition: "border-color .2s, background .2s",
                        }}
                    >
                        {theme === "light" ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#78716c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                            </svg>
                        ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a8a29e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="5" />
                                <line x1="12" y1="1" x2="12" y2="3" />
                                <line x1="12" y1="21" x2="12" y2="23" />
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                                <line x1="1" y1="12" x2="3" y2="12" />
                                <line x1="21" y1="12" x2="23" y2="12" />
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                            </svg>
                        )}
                    </button>
                    <Link href="/login" className="btn-primary" style={{ padding: "10px 26px", fontSize: 14 }}>Get Started</Link>
                </div>

                <button
                    type="button"
                    className={`hamburger${menuOpen ? " open" : ""}`}
                    onClick={() => setMenuOpen((open) => !open)}
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                    aria-controls="public-mobile-menu"
                >
                    <span /><span /><span />
                </button>
            </div>

            {menuOpen && (
                <div id="public-mobile-menu" className="mobile-menu">
                    <Link href="/about" className="mobile-menu-link" onClick={closeMenu}>About</Link>
                    <Link href="/#features" className="mobile-menu-link" onClick={closeMenu}>Features</Link>
                    <Link href="/#how-it-works" className="mobile-menu-link" onClick={closeMenu}>How It Works</Link>
                    <Link href="/#audience" className="mobile-menu-link" onClick={closeMenu}>For Students</Link>
                    <div style={{ marginTop: 10 }}>
                        <button
                            type="button"
                            onClick={() => { toggleTheme(); closeMenu(); }}
                            style={{
                                display: "flex", alignItems: "center", gap: 10,
                                width: "100%", padding: "13px 16px",
                                borderRadius: 12, border: "1.5px solid #e7e5e4",
                                background: "transparent", cursor: "pointer",
                                fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 500,
                                color: "#44403c", marginBottom: 8,
                                transition: "border-color .2s, background .2s",
                            }}
                        >
                            {theme === "light" ? (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                                </svg>
                            ) : (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="5" />
                                    <line x1="12" y1="1" x2="12" y2="3" />
                                    <line x1="12" y1="21" x2="12" y2="23" />
                                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                                    <line x1="1" y1="12" x2="3" y2="12" />
                                    <line x1="21" y1="12" x2="23" y2="12" />
                                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                                </svg>
                            )}
                            {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
                        </button>
                        <Link
                            href="/login"
                            className="btn-primary"
                            onClick={closeMenu}
                            style={{ width: "100%", justifyContent: "center", fontSize: 16, padding: "14px 24px" }}
                        >
                            Get Started - It&apos;s Free
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
