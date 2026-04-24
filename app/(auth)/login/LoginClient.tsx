"use client";

import { signIn, useSession } from "next-auth/react";
import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginClient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/home");
    }
  }, [status, router]);

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

  const handleLogin = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    if (loading) return;
    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Incorrect email or password. Please try again.");
        return;
      }

      const sessionRes = await fetch("/api/auth/session", {
        cache: "no-store",
      });

      const session = await sessionRes.json();

      if (!session?.user) {
        setError("Login failed. Please try again.");
        return;
      }

      if (!session.user.email_verified) {
        router.push(`/verify-email?email=${encodeURIComponent(email)}`);
        return;
      }

      if (!session.user.profile_completed) {
        router.push("/complete-profile");
        return;
      }

      router.push("/home");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    if (loading) return;
    setLoading(true);
    try {
      await signIn(provider, { callbackUrl: "/home" });
    } finally {
      setLoading(false);
    }
  };

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
          0%,100% { transform: scale(1); opacity: 0.55; }
          50%     { transform: scale(1.15); opacity: 0.85; }
        }
        @keyframes lp-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes lp-shake {
          0%,100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }

        .lp-shell {
          min-height: 100svh;
          background: var(--color-cream);
          display: grid;
          place-items: center;
          padding: 24px 16px;
          position: relative;
          overflow-x: hidden;
          isolation: isolate;
          font-family: var(--font-body);
          transition: background 0.3s;
        }

        .lp-orb-1 {
          position: fixed;
          top: -150px;
          right: -110px;
          width: 480px;
          height: 480px;
          border-radius: 50%;
          background: conic-gradient(
            from 0deg,
            rgba(232,96,10,0.08),
            rgba(245,158,11,0.11),
            rgba(232,96,10,0.05),
            rgba(245,158,11,0.11)
          );
          animation: orb-spin 26s linear infinite;
          pointer-events: none;
          z-index: 0;
        }

        .lp-orb-2 {
          position: fixed;
          bottom: -90px;
          left: -70px;
          width: 360px;
          height: 360px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(232,96,10,0.10) 0%, transparent 68%);
          animation: orb-pulse 8s ease-in-out infinite;
          pointer-events: none;
          z-index: 0;
        }

        .lp-card {
          position: relative;
          z-index: 10;
          pointer-events: auto;
          width: 100%;
          max-width: 440px;
          background: #ffffff;
          border-radius: var(--radius-card);
          padding: 44px 40px;
          border: 1px solid rgba(232,96,10,0.10);
          box-shadow: 0 1px 0 rgba(232,96,10,0.08), 0 8px 48px rgba(0,0,0,0.08);
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

        .lp-error {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(220,38,38,.08);
          border: 1px solid rgba(220,38,38,.22);
          border-radius: 12px;
          padding: 11px 14px;
          margin-bottom: 16px;
          font-size: 13.5px;
          color: #DC2626;
          font-weight: 500;
          animation: lp-shake 0.38s ease;
        }

        .dark .lp-error {
          background: rgba(220,38,38,.12);
          border-color: rgba(220,38,38,.3);
          color: #F87171;
        }

        .lp-error svg { flex-shrink: 0; }

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
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--color-muted);
          pointer-events: none;
          display: flex;
          align-items: center;
          transition: color 0.2s;
          z-index: 1;
        }

        .lp-input {
          width: 100%;
          padding: 13px 44px 13px 46px;
          border-radius: var(--radius-input);
          border: 1.5px solid #e7e5e4;
          background: var(--color-warm-bg);
          font-family: var(--font-body);
          font-size: 16px;
          color: #1c1917;
          outline: none;
          -webkit-appearance: none;
          appearance: none;
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

        .lp-input--error {
          border-color: #DC2626 !important;
        }

        .lp-eye {
          position: absolute;
          right: 13px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: var(--color-muted);
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 40px;
          min-height: 40px;
          border-radius: 9999px;
          transition: color 0.2s, background 0.2s;
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
          z-index: 2;
        }

        .lp-eye:hover { color: #E8600A; }

        .lp-eye:active {
          background: rgba(232,96,10,0.08);
        }

        .lp-forgot {
          display: block;
          text-align: right;
          font-size: 13px;
          color: #E8600A;
          text-decoration: none;
          font-weight: 500;
          margin-bottom: 22px;
          transition: opacity 0.2s;
          padding: 4px 0;
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }

        .lp-forgot:hover { opacity: 0.72; }

        .lp-btn-primary,
        .lp-btn-social {
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
          -webkit-appearance: none;
          appearance: none;
        }

        .lp-btn-primary {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: linear-gradient(120deg, #E8600A, #F59E0B);
          color: #fff;
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 16px;
          padding: 15px;
          border-radius: var(--radius-pill);
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 24px rgba(232,96,10,0.30);
          transition: transform 0.22s, box-shadow 0.22s, opacity 0.2s;
          margin-bottom: 20px;
          min-height: 50px;
          position: relative;
        }

        .lp-btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(232,96,10,0.42);
        }

        .lp-btn-primary:active:not(:disabled) {
          transform: translateY(0);
          box-shadow: 0 4px 16px rgba(232,96,10,0.30);
        }

        .lp-btn-primary:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .lp-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 18px;
        }

        .lp-divider-line {
          flex: 1;
          height: 1px;
          background: #e7e5e4;
          transition: background 0.3s;
        }

        .dark .lp-divider-line { background: #3d352e; }

        .lp-divider-text {
          font-size: 12px;
          color: var(--color-muted);
          white-space: nowrap;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .lp-socials {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 28px;
        }

        .lp-btn-social {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: transparent;
          color: #44403c;
          font-family: var(--font-body);
          font-weight: 500;
          font-size: 15px;
          padding: 12px;
          border-radius: var(--radius-pill);
          border: 1.5px solid #e7e5e4;
          cursor: pointer;
          min-height: 48px;
          transition: border-color 0.2s, background 0.2s, color 0.2s, transform 0.2s;
        }

        .dark .lp-btn-social {
          border-color: #3d352e;
          color: #c5bfb8;
        }

        .lp-btn-social:hover {
          border-color: #E8600A;
          background: rgba(232,96,10,0.05);
          color: #E8600A;
          transform: translateY(-1px);
        }

        .lp-btn-social:active {
          transform: translateY(0);
        }

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

        .lp-footer a:hover {
          text-decoration: underline;
        }

        .lp-spinner {
          width: 18px;
          height: 18px;
          border: 2.5px solid rgba(255,255,255,0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: lp-spin 0.7s linear infinite;
        }

        @media (max-width: 480px) {
          .lp-card {
            padding: 36px 24px;
          }

          .lp-title {
            font-size: 26px;
          }

          .lp-brand-name {
            font-size: 20px;
          }
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
            Welcome <span className="lp-grad">back</span>
          </h1>
          <p className="lp-sub">Sign in to continue your journey</p>

          {error && (
            <div className="lp-error" role="alert" aria-live="assertive">
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} autoComplete="on">
            <div className="lp-fields">
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
                  className={`lp-input${error ? " lp-input--error" : ""}`}
                  value={email}
                  autoComplete="email"
                  inputMode="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                />
              </div>

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
                  className={`lp-input${error ? " lp-input--error" : ""}`}
                  value={password}
                  autoComplete="current-password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                />
                <button
                  type="button"
                  className="lp-eye"
                  onClick={() => setShowPw((v) => !v)}
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
            </div>

            <a href="/forgot-password" className="lp-forgot">
              Forgot password?
            </a>

            <button
              type="submit"
              className="lp-btn-primary"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? (
                <span className="lp-spinner" />
              ) : (
                <>
                  Sign In
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="lp-divider">
            <div className="lp-divider-line" />
            <span className="lp-divider-text">or continue with</span>
            <div className="lp-divider-line" />
          </div>

          <div className="lp-socials">
            <button
              type="button"
              className="lp-btn-social"
              onClick={() => handleSocialLogin("google")}
              disabled={loading}
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
              onClick={() => handleSocialLogin("github")}
              disabled={loading} style={{ zIndex: 999 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              Continue with GitHub
            </button>
          </div>

          <p className="lp-footer">
            Don&apos;t have an account?{" "}
            <a href="/register">Create one free</a>
          </p>
        </div>
      </div>
    </>
  );
}