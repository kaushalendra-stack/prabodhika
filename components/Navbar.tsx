// "use client";

// import { useSession, signOut } from "next-auth/react";
// import Link from "next/link";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useState, useEffect, useRef } from "react";

// export default function Navbar() {
//     const { data: session, status } = useSession();
//     const router = useRouter();
//     const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const dropdownRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//                 setDropdownOpen(false);
//             }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     useEffect(() => {
//         const handleResize = () => {
//             if (window.innerWidth >= 768) {
//                 setMobileMenuOpen(false);
//             }
//         };
//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);

//     if (status === "loading") {
//         return (
//             <div className="navbar-loading">
//                 <div className="navbar-loading-spinner" />
//             </div>
//         );
//     }

//     if (!session) {
//         return null;
//     }

//     const user = session.user;
//     const userInitial = user?.name?.[0] || user?.email?.[0] || "U";

//     const handleLogout = async () => {
//         await signOut({ redirect: false });
//         router.push("/login");
//     };

//     return (
//         <>
//             <style>{`
//                 @import url('https://fonts.googleapis.com/css2?family=Yeseva+One&family=Outfit:wght@400;500;600;700&display=swap');

//                 .navbar {
//                     position: sticky;
//                     top: 0;
//                     z-index: 100;
//                     background: rgba(255, 255, 255, 0.96);
//                     backdrop-filter: blur(10px);
//                     border-bottom: 1px solid rgba(232, 96, 10, 0.12);
//                     font-family: 'Outfit', system-ui, sans-serif;
//                     transition: background 0.2s;
//                 }
//                 .dark .navbar {
//                     background: rgba(28, 26, 23, 0.96);
//                     border-bottom-color: rgba(232, 96, 10, 0.2);
//                 }

//                 .navbar-container {
//                     max-width: 1280px;
//                     margin: 0 auto;
//                     padding: 0 24px;
//                     display: flex;
//                     align-items: center;
//                     justify-content: space-between;
//                     height: 70px;
//                 }

//                 /* Logo */
//                 .navbar-logo {
//                     display: flex;
//                     align-items: center;
//                     text-decoration: none;
//                 }
//                 .navbar-logo svg {
//                     height: 28px;
//                     width: auto;
//                 }

//                 /* Desktop nav links */
//                 .navbar-links {
//                     display: flex;
//                     gap: 28px;
//                     align-items: center;
//                 }
//                 .navbar-link {
//                     text-decoration: none;
//                     font-weight: 500;
//                     color: #44403c;
//                     transition: color 0.2s;
//                     font-size: 15px;
//                 }
//                 .dark .navbar-link {
//                     color: #c5bfb8;
//                 }
//                 .navbar-link:hover {
//                     color: #E8600A;
//                 }

//                 /* User menu (desktop) */
//                 .navbar-user {
//                     position: relative;
//                 }
//                 .navbar-avatar {
//                     display: flex;
//                     align-items: center;
//                     gap: 10px;
//                     cursor: pointer;
//                     padding: 6px 12px 6px 8px;
//                     border-radius: 40px;
//                     background: rgba(232, 96, 10, 0.08);
//                     transition: background 0.2s;
//                 }
//                 .navbar-avatar:hover {
//                     background: rgba(232, 96, 10, 0.15);
//                 }
//                 .avatar-circle {
//                     width: 36px;
//                     height: 36px;
//                     background: linear-gradient(135deg, #E8600A, #F59E0B);
//                     border-radius: 50%;
//                     display: flex;
//                     align-items: center;
//                     justify-content: center;
//                     color: white;
//                     font-weight: 600;
//                     font-size: 16px;
//                     text-transform: uppercase;
//                 }
//                 .avatar-name {
//                     font-weight: 500;
//                     color: #1c1917;
//                 }
//                 .dark .avatar-name {
//                     color: #e7e5e4;
//                 }
//                 .avatar-chevron {
//                     width: 16px;
//                     height: 16px;
//                     stroke: currentColor;
//                     stroke-width: 2;
//                     transition: transform 0.2s;
//                 }
//                 .avatar-chevron.open {
//                     transform: rotate(180deg);
//                 }

//                 /* Dropdown menu */
//                 .navbar-dropdown {
//                     position: absolute;
//                     top: calc(100% + 8px);
//                     right: 0;
//                     width: 220px;
//                     background: #ffffff;
//                     border-radius: 16px;
//                     border: 1px solid rgba(232, 96, 10, 0.12);
//                     box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
//                     overflow: hidden;
//                     z-index: 50;
//                 }
//                 .dark .navbar-dropdown {
//                     background: #23201c;
//                     border-color: rgba(232, 96, 10, 0.2);
//                 }
//                 .dropdown-item {
//                     display: flex;
//                     align-items: center;
//                     gap: 12px;
//                     padding: 12px 16px;
//                     text-decoration: none;
//                     color: #1c1917;
//                     font-size: 14px;
//                     font-weight: 500;
//                     transition: background 0.15s;
//                     cursor: pointer;
//                     border: none;
//                     background: none;
//                     width: 100%;
//                     text-align: left;
//                 }
//                 .dark .dropdown-item {
//                     color: #e7e5e4;
//                 }
//                 .dropdown-item:hover {
//                     background: rgba(232, 96, 10, 0.08);
//                     color: #E8600A;
//                 }
//                 .dropdown-divider {
//                     height: 1px;
//                     background: rgba(232, 96, 10, 0.12);
//                     margin: 4px 0;
//                 }
//                 .dropdown-item svg {
//                     width: 18px;
//                     height: 18px;
//                     stroke: currentColor;
//                     stroke-width: 1.8;
//                 }

//                 /* Mobile menu button */
//                 .navbar-mobile-btn {
//                     display: none;
//                     background: none;
//                     border: none;
//                     cursor: pointer;
//                     padding: 8px;
//                 }
//                 .mobile-icon {
//                     width: 24px;
//                     height: 24px;
//                     stroke: #44403c;
//                     stroke-width: 2;
//                 }
//                 .dark .mobile-icon {
//                     stroke: #c5bfb8;
//                 }

//                 /* Mobile menu overlay */
//                 .navbar-mobile {
//                     position: fixed;
//                     top: 70px;
//                     left: 0;
//                     right: 0;
//                     bottom: 0;
//                     background: rgba(255, 255, 255, 0.98);
//                     backdrop-filter: blur(12px);
//                     z-index: 99;
//                     transform: translateX(100%);
//                     transition: transform 0.3s ease;
//                     padding: 24px;
//                     display: flex;
//                     flex-direction: column;
//                     gap: 16px;
//                 }
//                 .dark .navbar-mobile {
//                     background: rgba(28, 26, 23, 0.98);
//                 }
//                 .navbar-mobile.open {
//                     transform: translateX(0);
//                 }
//                 .mobile-link {
//                     text-decoration: none;
//                     font-size: 18px;
//                     font-weight: 500;
//                     padding: 12px;
//                     color: #44403c;
//                     border-radius: 12px;
//                     transition: background 0.2s;
//                 }
//                 .dark .mobile-link {
//                     color: #c5bfb8;
//                 }
//                 .mobile-link:hover {
//                     background: rgba(232, 96, 10, 0.1);
//                     color: #E8600A;
//                 }
//                 .mobile-user {
//                     display: flex;
//                     align-items: center;
//                     gap: 12px;
//                     padding: 12px;
//                     border-top: 1px solid rgba(232, 96, 10, 0.12);
//                     margin-top: auto;
//                 }

//                 @media (max-width: 768px) {
//                     .navbar-links {
//                         display: none;
//                     }
//                     .navbar-mobile-btn {
//                         display: block;
//                     }
//                     .navbar-user-desktop {
//                         display: none;
//                     }
//                 }

//                 /* Loading state */
//                 .navbar-loading {
//                     height: 70px;
//                     display: flex;
//                     align-items: center;
//                     justify-content: center;
//                     background: rgba(255,255,255,0.96);
//                 }
//                 .navbar-loading-spinner {
//                     width: 24px;
//                     height: 24px;
//                     border: 2px solid rgba(232,96,10,0.2);
//                     border-top-color: #E8600A;
//                     border-radius: 50%;
//                     animation: spin 0.8s linear infinite;
//                 }
//                 @keyframes spin {
//                     to { transform: rotate(360deg); }
//                 }
//             `}</style>

//             <nav className="navbar">
//                 <div className="navbar-container">
//                     {/* Logo - your brand SVG */}
//                     <Link href="/home" className="navbar-logo">
//                         <Image src="/logo.svg" width={225} height={100} alt="Prabodhika" />
//                     </Link>

//                     {/* Desktop Navigation Links */}
//                     <div className="navbar-links">
//                         <Link href="/home" className="navbar-link">Home</Link>
//                         <Link href="/upload" className="navbar-link">Upload</Link>
//                     </div>

//                     {/* Desktop User Menu */}
//                     <div className="navbar-user navbar-user-desktop" ref={dropdownRef}>
//                         <div className="navbar-avatar" onClick={() => setDropdownOpen(!dropdownOpen)}>
//                             <div className="avatar-circle">{userInitial}</div>
//                             <span className="avatar-name">{user?.name || user?.email?.split('@')[0]}</span>
//                             <svg className={`avatar-chevron ${dropdownOpen ? 'open' : ''}`} viewBox="0 0 24 24" fill="none">
//                                 <path d="M6 9l6 6 6-6" stroke="currentColor" strokeLinecap="round" />
//                             </svg>
//                         </div>

//                         {dropdownOpen && (
//                             <div className="navbar-dropdown">
//                                 <Link href="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
//                                     <svg viewBox="0 0 24 24" fill="none">
//                                         <circle cx="12" cy="8" r="4" stroke="currentColor" />
//                                         <path d="M5 20v-2a7 7 0 0 1 14 0v2" stroke="currentColor" strokeLinecap="round" />
//                                     </svg>
//                                     Profile
//                                 </Link>
//                                 <Link href="/settings" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
//                                     <svg viewBox="0 0 24 24" fill="none">
//                                         <circle cx="12" cy="12" r="3" stroke="currentColor" />
//                                         <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.02a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.02a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" />
//                                     </svg>
//                                     Settings
//                                 </Link>
//                                 <div className="dropdown-divider" />
//                                 <button type="button" className="dropdown-item" onClick={handleLogout}>
//                                     <svg viewBox="0 0 24 24" fill="none">
//                                         <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeLinecap="round" />
//                                         <path d="M16 17l4-4-4-4M12 13h8" stroke="currentColor" strokeLinecap="round" />
//                                     </svg>
//                                     Logout
//                                 </button>
//                             </div>
//                         )}
//                     </div>

//                     {/* Mobile menu button */}
//                     <button type="button" className="navbar-mobile-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
//                         <svg className="mobile-icon" viewBox="0 0 24 24" fill="none">
//                             {mobileMenuOpen ? (
//                                 <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeLinecap="round" />
//                             ) : (
//                                 <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeLinecap="round" />
//                             )}
//                         </svg>
//                     </button>
//                 </div>

//                 {/* Mobile menu panel */}
//                 <div className={`navbar-mobile ${mobileMenuOpen ? 'open' : ''}`}>
//                     <Link href="/home" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>
//                     <Link href="/upload" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Upload</Link>
//                     <div className="mobile-user">
//                         <div className="avatar-circle">{userInitial}</div>
//                         <span style={{ fontWeight: 500 }}>{user?.name || user?.email?.split('@')[0]}</span>
//                     </div>
//                     <button type="button" className="mobile-link" onClick={handleLogout} style={{ textAlign: 'left', color: '#E8600A' }}>Logout</button>
//                 </div>
//             </nav>
//         </>
//     );
// }
"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   Inline SVG primitives — no external icon dep
───────────────────────────────────────────── */
const SvgIcon = ({ path, size = 18 }: { path: string | string[]; size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {(Array.isArray(path) ? path : [path]).map((d, i) => <path key={i} d={d} />)}
    </svg>
);

const PATHS = {
    sun:      ["M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42","M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"],
    moon:     ["M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"],
    user:     ["M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2","M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"],
    settings: ["M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z","M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9v.02a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"],
    logout:   ["M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4","M16 17l5-5-5-5","M21 12H9"],
    upload:   ["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4","M17 8l-5-5-5 5","M12 3v12"],
    home:     ["M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z","M9 22V12h6v10"],
    chevron:  ["M6 9l6 6 6-6"],
    search:   ["M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z M21 21l-4.35-4.35"],
};

const getInitialTheme = () => {
    if (typeof window === "undefined") return "light";

    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    if (saved) return saved;

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
export default function Navbar() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [menuOpen,    setMenuOpen]    = useState(false);
    const [dropOpen,    setDropOpen]    = useState(false);
    const [theme,       setTheme]       = useState<"light" | "dark">(getInitialTheme);
    const [scrolled,    setScrolled]    = useState(false);
    const dropRef = useRef<HTMLDivElement>(null);

    /* ── theme ──────────────────────────────── */
    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
    }, [theme]);

    const toggleTheme = () => {
        const next = theme === "light" ? "dark" : "light";
        setTheme(next);
        localStorage.setItem("theme", next);
        document.documentElement.classList.toggle("dark", next === "dark");
    };

    /* ── scroll shadow ──────────────────────── */
    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 8);
        window.addEventListener("scroll", fn, { passive: true });
        return () => window.removeEventListener("scroll", fn);
    }, []);

    /* ── close dropdown outside click / Esc ── */
    useEffect(() => {
        const click = (e: MouseEvent) => {
            if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropOpen(false);
        };
        const esc = (e: KeyboardEvent) => { if (e.key === "Escape") { setDropOpen(false); setMenuOpen(false); } };
        document.addEventListener("mousedown", click);
        document.addEventListener("keydown", esc);
        return () => { document.removeEventListener("mousedown", click); document.removeEventListener("keydown", esc); };
    }, []);

    /* ── body scroll lock for mobile drawer ── */
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    /* ── loading / unauthenticated ──────────── */
    if (status === "loading") return (
        <>
            <style>{STYLES}</style>
            <div className="pb-nav-loading">
                <div className="pb-spinner" />
            </div>
        </>
    );

    if (!session) return null;

    const user     = session.user;
    const initials = (user?.name?.[0] ?? user?.email?.[0] ?? "U").toUpperCase();
    const displayName = user?.name ?? user?.email?.split("@")[0] ?? "Student";
    const logoSrc  = theme === "light" ? "/logo.svg" : "/logo-light.svg";

    const handleLogout = async () => {
        setMenuOpen(false);
        setDropOpen(false);
        await signOut({ redirect: false });
        router.push("/login");
    };

    return (
        <>
            <style>{STYLES}</style>

            <header className={`pb-nav${scrolled ? " pb-nav--scrolled" : ""}`} role="banner">
                <nav className="pb-nav__inner" aria-label="Main navigation">

                    {/* ── Logo ── */}
                    <Link href="/home" className="pb-nav__logo" aria-label="Prabodhika — home"
                        onClick={() => setMenuOpen(false)}>
                        <Image src={logoSrc} width={180} height={80} alt="Prabodhika" priority />
                    </Link>

                    {/* ── Desktop links ── */}
                    <div className="pb-nav__links" role="list">
                        <Link href="/home"   className="pb-nav__link" role="listitem">
                            <SvgIcon path={PATHS.home} size={16} /> Home
                        </Link>
                        <Link href="/upload" className="pb-nav__link" role="listitem">
                            <SvgIcon path={PATHS.upload} size={16} /> Upload
                        </Link>
                        <Link href="/search" className="pb-nav__link" role="listitem">
                            <SvgIcon path={PATHS.search} size={16} /> Search
                        </Link>
                    </div>

                    {/* ── Right cluster ── */}
                    <div className="pb-nav__right">

                        {/* Theme toggle */}
                        <button type="button" className="pb-icon-btn" onClick={toggleTheme}
                            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}>
                            <SvgIcon path={theme === "light" ? PATHS.moon : PATHS.sun} size={18} />
                        </button>

                        {/* Avatar + dropdown */}
                        <div className="pb-user" ref={dropRef}>
                            <button
                                type="button"
                                className={`pb-avatar-btn${dropOpen ? " pb-avatar-btn--open" : ""}`}
                                onClick={() => setDropOpen(v => !v)}
                                aria-expanded={dropOpen}
                                aria-haspopup="true"
                                aria-label="Account menu"
                            >
                                <span className="pb-avatar__circle" aria-hidden="true">{initials}</span>
                                <span className="pb-avatar__name">{displayName}</span>
                                <span className={`pb-avatar__chevron${dropOpen ? " pb-avatar__chevron--open" : ""}`} aria-hidden="true">
                                    <SvgIcon path={PATHS.chevron} size={14} />
                                </span>
                            </button>

                            {dropOpen && (
                                <div className="pb-dropdown" role="menu" aria-label="User options">
                                    {/* User identity header */}
                                    <div className="pb-dropdown__header">
                                        <span className="pb-dropdown__name">{displayName}</span>
                                        {user?.email && <span className="pb-dropdown__email">{user.email}</span>}
                                    </div>
                                    <div className="pb-dropdown__divider" />

                                    <Link href="/profile"  className="pb-dropdown__item" role="menuitem"
                                        onClick={() => setDropOpen(false)}>
                                        <SvgIcon path={PATHS.user} size={16} />
                                        <span>My Profile</span>
                                    </Link>
                                    <Link href="/settings" className="pb-dropdown__item" role="menuitem"
                                        onClick={() => setDropOpen(false)}>
                                        <SvgIcon path={PATHS.settings} size={16} />
                                        <span>Settings</span>
                                    </Link>

                                    <div className="pb-dropdown__divider" />

                                    <button type="button" className="pb-dropdown__item pb-dropdown__item--danger"
                                        onClick={handleLogout} role="menuitem">
                                        <SvgIcon path={PATHS.logout} size={16} />
                                        <span>Sign out</span>
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Hamburger — mobile only */}
                        <button
                            type="button"
                            className={`pb-hamburger${menuOpen ? " pb-hamburger--open" : ""}`}
                            onClick={() => setMenuOpen(v => !v)}
                            aria-expanded={menuOpen}
                            aria-controls="pb-mobile-drawer"
                            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
                        >
                            <span /><span /><span />
                        </button>
                    </div>
                </nav>
            </header>

            {/* ── Backdrop ── */}
            <div
                className={`pb-backdrop${menuOpen ? " pb-backdrop--visible" : ""}`}
                onClick={() => setMenuOpen(false)}
                aria-hidden="true"
            />

            {/* ── Mobile drawer ── */}
            <div
                id="pb-mobile-drawer"
                className={`pb-drawer${menuOpen ? " pb-drawer--open" : ""}`}
                role="dialog"
                aria-modal="true"
                aria-label="Navigation"
            >
                {/* Drawer top — user info */}
                <div className="pb-drawer__profile">
                    <span className="pb-drawer__avatar">{initials}</span>
                    <div>
                        <p className="pb-drawer__uname">{displayName}</p>
                        {user?.email && <p className="pb-drawer__uemail">{user.email}</p>}
                    </div>
                </div>

                <div className="pb-drawer__divider" />

                {/* Nav links */}
                <nav className="pb-drawer__links" aria-label="Mobile navigation">
                    <Link href="/home"   className="pb-drawer__link" onClick={() => setMenuOpen(false)}>
                        <span className="pb-drawer__link-icon"><SvgIcon path={PATHS.home}   size={20} /></span>
                        Home
                    </Link>
                    <Link href="/upload" className="pb-drawer__link" onClick={() => setMenuOpen(false)}>
                        <span className="pb-drawer__link-icon"><SvgIcon path={PATHS.upload} size={20} /></span>
                        Upload
                    </Link>
                    <Link href="/search" className="pb-drawer__link" onClick={() => setMenuOpen(false)}>
                        <span className="pb-drawer__link-icon"><SvgIcon path={PATHS.search} size={20} /></span>
                        Search
                    </Link>
                    <Link href="/profile" className="pb-drawer__link" onClick={() => setMenuOpen(false)}>
                        <span className="pb-drawer__link-icon"><SvgIcon path={PATHS.user}   size={20} /></span>
                        My Profile
                    </Link>
                    <Link href="/settings" className="pb-drawer__link" onClick={() => setMenuOpen(false)}>
                        <span className="pb-drawer__link-icon"><SvgIcon path={PATHS.settings} size={20} /></span>
                        Settings
                    </Link>
                </nav>

                <div className="pb-drawer__spacer" />

                {/* Theme toggle row */}
                <button type="button" className="pb-drawer__theme-row" onClick={toggleTheme}>
                    <span className="pb-drawer__link-icon">
                        <SvgIcon path={theme === "light" ? PATHS.moon : PATHS.sun} size={20} />
                    </span>
                    <span>{theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}</span>
                    <span className={`pb-drawer__theme-badge${theme === "dark" ? " pb-drawer__theme-badge--on" : ""}`}>
                        {theme === "dark" ? "ON" : "OFF"}
                    </span>
                </button>

                <div className="pb-drawer__divider" />

                {/* Logout */}
                <button type="button" className="pb-drawer__logout" onClick={handleLogout}>
                    <SvgIcon path={PATHS.logout} size={18} />
                    Sign out
                </button>
            </div>
        </>
    );
}

/* ─────────────────────────────────────────────
   All styles — isolated under .pb-* namespace
───────────────────────────────────────────── */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');

/* ── tokens ── */
:root {
  --pb-saffron:    #E8600A;
  --pb-amber:      #F59E0B;
  --pb-indigo:     #1E1B4B;
  --pb-cream:      #FFFBF5;
  --pb-cream2:     #FEF3E8;
  --pb-text:       #1C1917;
  --pb-muted:      #78716C;
  --pb-border:     rgba(232,96,10,.14);
  --pb-surface:    #FFFFFF;
  --pb-font:       'Outfit', system-ui, sans-serif;
  --pb-nav-h:      68px;
  --pb-radius:     14px;
  --pb-shadow-sm:  0 1px 3px rgba(0,0,0,.06), 0 1px 8px rgba(0,0,0,.04);
  --pb-shadow-md:  0 4px 20px rgba(0,0,0,.10), 0 1px 4px rgba(0,0,0,.06);
  --pb-transition: .22s cubic-bezier(.4,0,.2,1);
}

.dark {
  --pb-text:    #E7E5E4;
  --pb-muted:   #A8A29E;
  --pb-border:  rgba(232,96,10,.22);
  --pb-surface: #1C1A17;
  --pb-cream:   #1C1A17;
  --pb-cream2:  #241F1A;
}

/* ── keyframes ── */
@keyframes pb-fadeDown {
  from { opacity:0; transform:translateY(-8px); }
  to   { opacity:1; transform:translateY(0); }
}
@keyframes pb-drawerIn {
  from { transform: translateX(100%); }
  to   { transform: translateX(0); }
}
@keyframes pb-spin {
  to { transform: rotate(360deg); }
}

/* ════════════════════════════════
   NAV HEADER
════════════════════════════════ */
.pb-nav {
  position: sticky;
  top: 0;
  z-index: 200;
  height: var(--pb-nav-h);
  font-family: var(--pb-font);
  background: rgba(255,251,245,.88);
  border-bottom: 1px solid transparent;
  backdrop-filter: blur(14px) saturate(160%);
  -webkit-backdrop-filter: blur(14px) saturate(160%);
  transition: border-color var(--pb-transition), box-shadow var(--pb-transition), background var(--pb-transition);
}
.dark .pb-nav {
  background: rgba(28,26,23,.9);
}
.pb-nav--scrolled {
  border-color: var(--pb-border);
  box-shadow: 0 1px 0 var(--pb-border), var(--pb-shadow-sm);
}

.pb-nav__inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 28px;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 0;
}

/* ── logo ── */
.pb-nav__logo {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  text-decoration: none;
  outline-offset: 4px;
}

/* ── desktop links ── */
.pb-nav__links {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 32px;
}

.pb-nav__link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  color: var(--pb-muted);
  text-decoration: none;
  transition: background var(--pb-transition), color var(--pb-transition);
  white-space: nowrap;
}
.pb-nav__link:hover,
.pb-nav__link:focus-visible {
  color: var(--pb-saffron);
  background: rgba(232,96,10,.08);
}
.pb-nav__link svg { flex-shrink:0; opacity:.7; transition: opacity var(--pb-transition); }
.pb-nav__link:hover svg { opacity:1; }

/* ── right cluster ── */
.pb-nav__right {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
}

/* ── icon button (theme toggle) ── */
.pb-icon-btn {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  border: none;
  background: transparent;
  color: var(--pb-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--pb-transition), color var(--pb-transition);
}
.pb-icon-btn:hover {
  background: var(--pb-cream2);
  color: var(--pb-text);
}

/* ════════════════════════════════
   AVATAR BUTTON
════════════════════════════════ */
.pb-user { position: relative; }

.pb-avatar-btn {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 5px 12px 5px 5px;
  border-radius: 40px;
  border: 1.5px solid var(--pb-border);
  background: var(--pb-surface);
  cursor: pointer;
  font-family: var(--pb-font);
  transition: border-color var(--pb-transition), box-shadow var(--pb-transition), background var(--pb-transition);
  outline-offset: 3px;
}
.pb-avatar-btn:hover,
.pb-avatar-btn--open {
  border-color: rgba(232,96,10,.35);
  box-shadow: 0 0 0 3px rgba(232,96,10,.10);
}

.pb-avatar__circle {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: linear-gradient(135deg, #E8600A 0%, #F59E0B 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  letter-spacing: .02em;
}

.pb-avatar__name {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--pb-text);
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.pb-avatar__chevron {
  color: var(--pb-muted);
  display: flex;
  transition: transform var(--pb-transition);
}
.pb-avatar__chevron--open { transform: rotate(180deg); }

/* ════════════════════════════════
   DROPDOWN
════════════════════════════════ */
.pb-dropdown {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  min-width: 230px;
  background: var(--pb-surface);
  border: 1px solid var(--pb-border);
  border-radius: var(--pb-radius);
  box-shadow: var(--pb-shadow-md);
  overflow: hidden;
  animation: pb-fadeDown .18s ease both;
  z-index: 300;
}

.pb-dropdown__header {
  padding: 14px 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.pb-dropdown__name {
  font-size: 13.5px;
  font-weight: 700;
  color: var(--pb-text);
  font-family: var(--pb-font);
}
.pb-dropdown__email {
  font-size: 12px;
  color: var(--pb-muted);
  font-family: var(--pb-font);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.pb-dropdown__divider {
  height: 1px;
  background: var(--pb-border);
  margin: 0;
}

.pb-dropdown__item {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 10px 16px;
  font-size: 13.5px;
  font-weight: 500;
  font-family: var(--pb-font);
  color: var(--pb-text);
  text-decoration: none;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  transition: background var(--pb-transition), color var(--pb-transition);
}
.pb-dropdown__item:hover {
  background: rgba(232,96,10,.07);
  color: var(--pb-saffron);
}
.pb-dropdown__item svg { opacity:.65; flex-shrink:0; transition: opacity var(--pb-transition); }
.pb-dropdown__item:hover svg { opacity:1; }

.pb-dropdown__item--danger { color: #DC2626; }
.pb-dropdown__item--danger:hover { background: rgba(220,38,38,.07); color: #DC2626; }
.pb-dropdown__item--danger svg { opacity:.65; }

/* ════════════════════════════════
   HAMBURGER
════════════════════════════════ */
.pb-hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 38px;
  height: 38px;
  padding: 8px;
  border-radius: 10px;
  border: 1.5px solid var(--pb-border);
  background: var(--pb-surface);
  cursor: pointer;
  transition: border-color var(--pb-transition), background var(--pb-transition);
}
.pb-hamburger:hover {
  border-color: rgba(232,96,10,.35);
  background: var(--pb-cream2);
}
.pb-hamburger span {
  display: block;
  height: 1.5px;
  border-radius: 2px;
  background: var(--pb-text);
  transform-origin: center;
  transition: transform var(--pb-transition), opacity var(--pb-transition), width var(--pb-transition);
}
.pb-hamburger span:nth-child(1) { width: 100%; }
.pb-hamburger span:nth-child(2) { width: 75%; }
.pb-hamburger span:nth-child(3) { width: 100%; }

.pb-hamburger--open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); width:100%; }
.pb-hamburger--open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.pb-hamburger--open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); width:100%; }

/* ════════════════════════════════
   BACKDROP
════════════════════════════════ */
.pb-backdrop {
  position: fixed;
  inset: 0;
  top: var(--pb-nav-h);
  background: rgba(0,0,0,.35);
  backdrop-filter: blur(2px);
  z-index: 198;
  opacity: 0;
  pointer-events: none;
  transition: opacity .3s ease;
}
.pb-backdrop--visible {
  opacity: 1;
  pointer-events: all;
}

/* ════════════════════════════════
   MOBILE DRAWER
════════════════════════════════ */
.pb-drawer {
  position: fixed;
  top: var(--pb-nav-h);
  right: 0;
  bottom: 0;
  width: min(340px, 90vw);
  background: var(--pb-surface);
  border-left: 1px solid var(--pb-border);
  z-index: 199;
  display: flex;
  flex-direction: column;
  padding: 0 0 32px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  transform: translateX(100%);
  transition: transform .3s cubic-bezier(.4,0,.2,1);
  box-shadow: -8px 0 32px rgba(0,0,0,.12);
  pointer-events: none;
}
.pb-drawer--open {
  transform: translateX(0);
  pointer-events: auto;
}

.pb-drawer__profile {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 24px 24px 20px;
}
.pb-drawer__avatar {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: linear-gradient(135deg, #E8600A, #F59E0B);
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-family: var(--pb-font);
}
.pb-drawer__uname {
  font-size: 15px;
  font-weight: 700;
  color: var(--pb-text);
  font-family: var(--pb-font);
  margin: 0;
}
.pb-drawer__uemail {
  font-size: 12px;
  color: var(--pb-muted);
  font-family: var(--pb-font);
  margin: 3px 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 180px;
}

.pb-drawer__divider {
  height: 1px;
  background: var(--pb-border);
  margin: 0 24px;
  flex-shrink: 0;
}

.pb-drawer__links {
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  gap: 2px;
}

.pb-drawer__link {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 12px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 500;
  font-family: var(--pb-font);
  color: var(--pb-text);
  text-decoration: none;
  transition: background var(--pb-transition), color var(--pb-transition);
}
.pb-drawer__link:hover { background: rgba(232,96,10,.08); color: var(--pb-saffron); }

.pb-drawer__link-icon {
  width: 36px;
  height: 36px;
  border-radius: 9px;
  background: var(--pb-cream2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background var(--pb-transition);
}
.pb-drawer__link:hover .pb-drawer__link-icon {
  background: rgba(232,96,10,.12);
  color: var(--pb-saffron);
}

.pb-drawer__spacer { flex: 1; min-height: 16px; }

.pb-drawer__theme-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 28px;
  font-size: 15px;
  font-weight: 500;
  font-family: var(--pb-font);
  color: var(--pb-muted);
  background: none;
  border: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
  transition: color var(--pb-transition);
}
.pb-drawer__theme-row:hover { color: var(--pb-text); }

.pb-drawer__theme-badge {
  margin-left: auto;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .08em;
  padding: 3px 8px;
  border-radius: 20px;
  background: var(--pb-cream2);
  color: var(--pb-muted);
  font-family: var(--pb-font);
}
.pb-drawer__theme-badge--on {
  background: rgba(232,96,10,.12);
  color: var(--pb-saffron);
}

.pb-drawer__logout {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 8px 16px 0;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 14.5px;
  font-weight: 600;
  font-family: var(--pb-font);
  color: #DC2626;
  background: none;
  border: 1.5px solid rgba(220,38,38,.2);
  cursor: pointer;
  width: calc(100% - 32px);
  text-align: left;
  transition: background var(--pb-transition), border-color var(--pb-transition);
}
.pb-drawer__logout:hover {
  background: rgba(220,38,38,.06);
  border-color: rgba(220,38,38,.4);
}

/* ════════════════════════════════
   LOADING STATE
════════════════════════════════ */
.pb-nav-loading {
  height: var(--pb-nav-h);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--pb-surface);
  border-bottom: 1px solid var(--pb-border);
}
.pb-spinner {
  width: 22px;
  height: 22px;
  border: 2px solid rgba(232,96,10,.2);
  border-top-color: #E8600A;
  border-radius: 50%;
  animation: pb-spin .7s linear infinite;
}

/* ════════════════════════════════
   RESPONSIVE
════════════════════════════════ */
@media (max-width: 768px) {
  .pb-nav__links      { display: none; }
  .pb-hamburger       { display: flex; }
  .pb-avatar__name    { display: none; }
  .pb-avatar__chevron { display: none; }
  .pb-avatar-btn      { padding: 4px; border: none; background: transparent; box-shadow: none; }
  .pb-avatar-btn:hover,
  .pb-avatar-btn--open { border: none; box-shadow: none; background: transparent; }
  .pb-avatar__circle  { width: 34px; height: 34px; font-size: 14px; }
}
`;
