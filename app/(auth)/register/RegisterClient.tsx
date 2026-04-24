"use client";

import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function RegisterClient() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [showConfirmPw, setShowConfirmPw] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [theme, setTheme] = useState<"light" | "dark">("light");
    useEffect(() => {
        const detectTheme = () => {
            const isDark = document.documentElement.classList.contains("dark") ||
                document.body.classList.contains("dark") ||
                localStorage.getItem("theme") === "dark";
            setTheme(isDark ? "dark" : "light");
        };

        detectTheme();

        const observer = new MutationObserver(detectTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
        observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

        window.addEventListener("storage", detectTheme);

        return () => {
            observer.disconnect();
            window.removeEventListener("storage", detectTheme);
        };
    }, []);

    const logoSrc = theme === "light" ? "/logo.svg" : "/logo-light.svg";

    const handleRegister = async () => {
        // Basic validation
        if (!name || !email || !password || !confirmPassword) {
            alert("Please fill in all fields");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        if (password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        setLoading(true);

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();
        setLoading(false);

        if (data.success) {
            router.push(`/verify-email?email=${email}`);
        } else {
            alert(data.error || "Registration failed");
        }
    };

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Yeseva+One&family=Outfit:wght@300;400;500;600;700&display=swap');

        /*
         * Tailwind v4 @theme block — registers custom design tokens
         * as both CSS variables AND Tailwind utility classes.
         * e.g. bg-saffron, text-indigo-deep, font-display, rounded-card
         */
        @theme {
          --color-saffron:     #E8600A;
          --color-amber-warm:  #F59E0B;
          --color-indigo-deep: #1E1B4B;
          --color-cream:       #FFFBF5;
          --color-warm-bg:     #FEF3E8;
          --color-muted:       #78716c;

          --font-display: 'Yeseva One', Georgia, serif;
          --font-body:    'Outfit', system-ui, sans-serif;

          --radius-card:  28px;
          --radius-pill:  9999px;
          --radius-input: 14px;
        }

        /* Dark token overrides — applied by .dark on <html> */
        .dark {
          --color-cream:       #1c1a17;
          --color-warm-bg:     #2a241f;
          --color-indigo-deep: #E2E8F0;
          --color-muted:       #a8a29e;
        }

        /* ─── Keyframes ─── */
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes orb-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes orb-pulse {
          0%,100% { transform: scale(1);    opacity: 0.55; }
          50%     { transform: scale(1.15); opacity: 0.85; }
        }
        @keyframes btn-spin {
          to { transform: rotate(360deg); }
        }

        /* ─── Page shell ─── */
        .lp-shell {
          min-height: 100svh;
          background: var(--color-cream);
          display: grid;
          place-items: center;
          padding: 24px 16px;
          position: relative;
          overflow: hidden;
          font-family: var(--font-body);
          transition: background 0.3s;
        }

        /* ─── Decorative orbs ─── */
        .lp-orb-1 {
          position: fixed; top: -150px; right: -110px;
          width: 480px; height: 480px; border-radius: 50%;
          background: conic-gradient(
            from 0deg,
            rgba(232,96,10,0.08),
            rgba(245,158,11,0.11),
            rgba(232,96,10,0.05),
            rgba(245,158,11,0.11)
          );
          animation: orb-spin 26s linear infinite;
          pointer-events: none; z-index: 0;
        }
        .lp-orb-2 {
          position: fixed; bottom: -90px; left: -70px;
          width: 360px; height: 360px; border-radius: 50%;
          background: radial-gradient(circle,
            rgba(232,96,10,0.10) 0%, transparent 68%
          );
          animation: orb-pulse 8s ease-in-out infinite;
          pointer-events: none; z-index: 0;
        }

        /* ─── Card ─── */
        .lp-card {
          position: relative; z-index: 1;
          width: 100%; max-width: 440px;
          background: #ffffff;
          border-radius: var(--radius-card);
          padding: 44px 40px;
          border: 1px solid rgba(232,96,10,0.10);
          box-shadow:
            0 1px 0   rgba(232,96,10,0.08),
            0 8px 48px rgba(0,0,0,0.08);
          animation: fadeSlideUp 0.65s cubic-bezier(.22,1,.36,1) both;
        }
        .dark .lp-card {
          background: #23201c;
          border-color: rgba(232,96,10,0.15);
          box-shadow: 0 8px 48px rgba(0,0,0,0.35);
        }

        /* ─── Brand ─── */
        .lp-brand {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 30px;
        }
        .lp-brand-icon {
          width: 42px; height: 42px; border-radius: 50%;
          background: linear-gradient(135deg, #E8600A, #F59E0B);
          display: grid; place-items: center;
          font-size: 20px;
          box-shadow: 0 4px 18px rgba(232,96,10,0.32);
          flex-shrink: 0;
        }
        .lp-brand-name {
          font-family: var(--font-display);
          font-size: 22px;
          color: var(--color-indigo-deep);
          transition: color 0.3s;
        }

        /* ─── Headings ─── */
        .lp-title {
          font-family: var(--font-display);
          font-size: 30px;
          color: var(--color-indigo-deep);
          text-align: center;
          margin-bottom: 6px;
          line-height: 1.2;
          transition: color 0.3s;
        }
        .dark .lp-title { color: #f5f0ea; }

        .lp-sub {
          text-align: center;
          font-size: 14px;
          color: var(--color-muted);
          margin-bottom: 32px;
        }

        .lp-grad {
          background: linear-gradient(120deg, #E8600A, #F59E0B);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* ─── Fields ─── */
        .lp-fields {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 18px;
        }

        .lp-field {
          position: relative;
        }

        .lp-field-icon {
          position: absolute; left: 15px; top: 50%;
          transform: translateY(-50%);
          color: var(--color-muted);
          pointer-events: none;
          display: flex; align-items: center;
          transition: color 0.2s;
        }

        .lp-input {
          width: 100%;
          padding: 13px 44px 13px 46px;
          border-radius: var(--radius-input);
          border: 1.5px solid #e7e5e4;
          background: var(--color-warm-bg);
          font-family: var(--font-body);
          font-size: 15px;
          color: #1c1917;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .dark .lp-input {
          background: #1a1714;
          border-color: #3d352e;
          color: #e7e5e4;
        }
        .lp-input::placeholder { color: var(--color-muted); }
        .lp-input:focus {
          border-color: #E8600A;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(232,96,10,0.12);
        }
        .dark .lp-input:focus { background: #2a241f; }

        .lp-eye {
          position: absolute; right: 13px; top: 50%;
          transform: translateY(-50%);
          background: none; border: none; cursor: pointer;
          color: var(--color-muted);
          padding: 4px;
          display: flex; align-items: center;
          transition: color 0.2s;
        }
        .lp-eye:hover { color: #E8600A; }

        /* ─── Primary button ─── */
        .lp-btn-primary {
          width: 100%;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          background: linear-gradient(120deg, #E8600A, #F59E0B);
          color: #fff;
          font-family: var(--font-body);
          font-weight: 600; font-size: 16px;
          padding: 14px;
          border-radius: var(--radius-pill);
          border: none; cursor: pointer;
          box-shadow: 0 4px 24px rgba(232,96,10,0.30);
          transition: transform 0.22s, box-shadow 0.22s, opacity 0.2s;
          margin-bottom: 20px;
        }
        .lp-btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(232,96,10,0.42);
        }
        .lp-btn-primary:disabled { opacity: 0.65; cursor: not-allowed; }

        /* ─── Divider ─── */
        .lp-divider {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 18px;
        }
        .lp-divider-line { flex: 1; height: 1px; background: #e7e5e4; transition: background 0.3s; }
        .dark .lp-divider-line { background: #3d352e; }
        .lp-divider-text {
          font-size: 12px;
          color: var(--color-muted);
          white-space: nowrap;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        /* ─── Social buttons ─── */
        .lp-socials {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 28px;
        }

        .lp-btn-social {
          width: 100%;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          background: transparent;
          color: #44403c;
          font-family: var(--font-body);
          font-weight: 500; font-size: 15px;
          padding: 12px;
          border-radius: var(--radius-pill);
          border: 1.5px solid #e7e5e4;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s, color 0.2s, transform 0.2s;
        }
        .dark .lp-btn-social { border-color: #3d352e; color: #c5bfb8; }
        .lp-btn-social:hover {
          border-color: #E8600A;
          background: rgba(232,96,10,0.05);
          color: #E8600A;
          transform: translateY(-1px);
        }

        /* ─── Footer ─── */
        .lp-footer {
          text-align: center;
          font-size: 14px;
          color: var(--color-muted);
        }
        .lp-footer a {
          color: #E8600A;
          font-weight: 600;
          text-decoration: none;
        }
        .lp-footer a:hover { text-decoration: underline; }

        /* ─── Spinner ─── */
        @keyframes lp-spin { to { transform: rotate(360deg); } }
        .lp-spinner {
          width: 18px; height: 18px;
          border: 2.5px solid rgba(255,255,255,0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: lp-spin 0.7s linear infinite;
        }

        /* ─── Mobile ─── */
        @media (max-width: 480px) {
          .lp-card { padding: 36px 24px; }
          .lp-title { font-size: 26px; }
        }
      `}</style>

            <div className="lp-shell">
                {/* Decorative background orbs */}
                <div className="lp-orb-1" />
                <div className="lp-orb-2" />

                <div className="lp-card">
                    {/* Brand */}
                    <div className="lp-brand">
                        <span className="lp-brand-name">
                            <Image src={logoSrc} width={225} height={100} alt="Prabodhika" />
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="lp-title">
                        Create <span className="lp-grad">account</span>
                    </h1>
                    <p className="lp-sub">Join our community today</p>

                    {/* Fields */}
                    <div className="lp-fields">
                        {/* Name */}
                        <div className="lp-field">
                            <span className="lp-field-icon">
                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </span>
                            <input
                                type="text"
                                placeholder="Full name"
                                className="lp-input"
                                value={name}
                                autoComplete="name"
                                onChange={(e) => setName(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleRegister()}
                            />
                        </div>

                        {/* Email */}
                        <div className="lp-field">
                            <span className="lp-field-icon">
                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                    <rect x="2" y="4" width="20" height="16" rx="3" />
                                    <path d="M2 7l10 7 10-7" />
                                </svg>
                            </span>
                            <input
                                type="email"
                                placeholder="Email address"
                                className="lp-input"
                                value={email}
                                autoComplete="email"
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleRegister()}
                            />
                        </div>

                        {/* Password */}
                        <div className="lp-field">
                            <span className="lp-field-icon">
                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                    <rect x="3" y="11" width="18" height="11" rx="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                            </span>
                            <input
                                type={showPw ? "text" : "password"}
                                placeholder="Password"
                                className="lp-input"
                                value={password}
                                autoComplete="new-password"
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleRegister()}
                            />
                            <button
                                type="button"
                                className="lp-eye"
                                onClick={() => setShowPw((v) => !v)}
                                tabIndex={-1}
                                aria-label={showPw ? "Hide password" : "Show password"}
                            >
                                {showPw ? (
                                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                        <line x1="1" y1="1" x2="23" y2="23" />
                                    </svg>
                                ) : (
                                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                        <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                )}
                            </button>
                        </div>

                        {/* Confirm Password */}
                        <div className="lp-field">
                            <span className="lp-field-icon">
                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                    <rect x="3" y="11" width="18" height="11" rx="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    <path d="M12 16v2" strokeLinecap="round" />
                                </svg>
                            </span>
                            <input
                                type={showConfirmPw ? "text" : "password"}
                                placeholder="Confirm password"
                                className="lp-input"
                                value={confirmPassword}
                                autoComplete="new-password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleRegister()}
                            />
                            <button
                                type="button"
                                className="lp-eye"
                                onClick={() => setShowConfirmPw((v) => !v)}
                                tabIndex={-1}
                                aria-label={showConfirmPw ? "Hide password" : "Show password"}
                            >
                                {showConfirmPw ? (
                                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                        <line x1="1" y1="1" x2="23" y2="23" />
                                    </svg>
                                ) : (
                                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                        <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Register button */}
                    <button
                        type="button"
                        className="lp-btn-primary"
                        onClick={handleRegister}
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="lp-spinner" />
                        ) : (
                            <>
                                Create account
                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                                    <path d="M5 12h14M13 6l6 6-6 6" />
                                </svg>
                            </>
                        )}
                    </button>

                    {/* Divider */}
                    <div className="lp-divider">
                        <div className="lp-divider-line" />
                        <span className="lp-divider-text">or sign up with</span>
                        <div className="lp-divider-line" />
                    </div>

                    {/* Social buttons */}
                    <div className="lp-socials">
                        <button
                            type="button"
                            className="lp-btn-social"
                            onClick={() => signIn("google", { callbackUrl: "/home" })}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Continue with Google
                        </button>

                        <button
                            type="button"
                            className="lp-btn-social"
                            onClick={() => signIn("github", { callbackUrl: "/home" })}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                            Continue with GitHub
                        </button>
                    </div>

                    {/* Footer */}
                    <p className="lp-footer">
                        Already have an account?{" "}
                        <a href="/login">Sign in</a>
                    </p>
                </div>
            </div>
        </>
    );
}
