"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import Image from "next/image";

export default function ResetPasswordClient() {
    const params = useSearchParams();
    const email = params.get("email") || "";
    const [cooldown, setCooldown] = useState(0);

    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [showConfirmPw, setShowConfirmPw] = useState(false);
    const [loading, setLoading] = useState(false);



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




    const handleReset = async () => {
        if (!code || !password || !confirmPassword) {
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

        const res = await fetch("/api/auth/reset-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                code,
                newPassword: password,
            }),
        });

        const data = await res.json();
        setLoading(false);

        if (data.success) {
            alert("Password updated successfully! Please log in.");
            window.location.href = "/login";
        } else {
            alert(data.error || "Failed to reset password");
        }
    };

    const handleResend = async () => {
        if (cooldown > 0) return;

        const res = await fetch("/api/auth/forgot-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (data.success) {
            alert("Code resent");
            setCooldown(60); // 60 sec cooldown
        } else {
            alert(data.error);
        }
    };
    useEffect(() => {
        if (cooldown <= 0) return;

        const timer = setInterval(() => {
            setCooldown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [cooldown]);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Yeseva+One&family=Outfit:wght@300;400;500;600;700&display=swap');

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

        .dark {
          --color-cream:       #1c1a17;
          --color-warm-bg:     #2a241f;
          --color-indigo-deep: #E2E8F0;
          --color-muted:       #a8a29e;
        }

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

        .lp-brand {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 30px;
        }
        .lp-brand-name {
          font-family: var(--font-display);
          font-size: 22px;
          color: var(--color-indigo-deep);
          transition: color 0.3s;
        }

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

        @keyframes lp-spin { to { transform: rotate(360deg); } }
        .lp-spinner {
          width: 18px; height: 18px;
          border: 2.5px solid rgba(255,255,255,0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: lp-spin 0.7s linear infinite;
        }

        @media (max-width: 480px) {
          .lp-card { padding: 36px 24px; }
          .lp-title { font-size: 26px; }
        }
      `}</style>

            <div className="lp-shell">
                <div className="lp-orb-1" />
                <div className="lp-orb-2" />

                <div className="lp-card">
                    <div className="lp-brand">
                        <span className="lp-brand-name">
                            <Image src={logoSrc} width={225} height={100} alt="Prabodhika" />
                        </span>
                    </div>

                    <h1 className="lp-title">
                        Reset <span className="lp-grad">password</span>
                    </h1>
                    <p className="lp-sub">
                        Enter the code sent to {email}
                    </p>

                    <div className="lp-fields">
                        {/* Code field */}
                        <div className="lp-field">
                            <span className="lp-field-icon">
                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                    <rect x="3" y="3" width="18" height="18" rx="2" />
                                    <path d="M9 8h6M9 12h6M9 16h4" />
                                </svg>
                            </span>
                            <input
                                type="text"
                                placeholder="Verification code"
                                className="lp-input"
                                value={code}
                                autoComplete="off"
                                onChange={(e) => setCode(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleReset()}
                            />
                        </div>

                        {/* New password */}
                        <div className="lp-field">
                            <span className="lp-field-icon">
                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                    <rect x="3" y="11" width="18" height="11" rx="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                            </span>
                            <input
                                type={showPw ? "text" : "password"}
                                placeholder="New password"
                                className="lp-input"
                                value={password}
                                autoComplete="new-password"
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleReset()}
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

                        {/* Confirm password */}
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
                                placeholder="Confirm new password"
                                className="lp-input"
                                value={confirmPassword}
                                autoComplete="off"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleReset()}
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

                    <button
                        type="button"
                        className="lp-btn-primary"
                        onClick={handleReset}
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="lp-spinner" />
                        ) : (
                            <>
                                Reset password
                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                                    <path d="M5 12h14M13 6l6 6-6 6" />
                                </svg>
                            </>
                        )}
                    </button>
                    <p className="text-sm text-gray-500">
                        Didn’t receive the code? Check your spam folder. <button type="button" onClick={handleResend} disabled={cooldown > 0} style={{ color: "#E8600A", fontWeight: 600, textDecoration: "none" }}>
                            {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend Code"}
                        </button></p>

                    <p className="lp-footer">
                        Remember your password?{" "}
                        <a href="/login">Sign in</a>
                    </p>
                </div>
            </div>
        </>
    );
}
