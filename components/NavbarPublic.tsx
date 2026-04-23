"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export function NavbarPublic() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
            background: scrolled || menuOpen ? "rgba(255,251,245,.97)" : "transparent",
            backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
            boxShadow: scrolled || menuOpen ? "0 1px 20px rgba(0,0,0,.07)" : "none",
            transition: "all .3s ease",
            padding: "0 24px",
        }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", height: 70, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Link href="/" onClick={closeMenu} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
                    <Image src="/logo.svg" width={225} height={100} alt="Prabodhika" />
                </Link>

                <div className="desktop-nav" style={{ display: "flex", gap: 32, alignItems: "center" }}>
                    <Link href="/about" className="nav-link">About</Link>
                    <Link href="/#features" className="nav-link">Features</Link>
                    <Link href="/#how-it-works" className="nav-link">How It Works</Link>
                    <Link href="/#audience" className="nav-link">For Students</Link>
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
