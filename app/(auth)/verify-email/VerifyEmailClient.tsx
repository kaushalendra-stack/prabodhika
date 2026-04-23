"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function VerifyEmailClient() {
  const params = useSearchParams();
  const email = params.get("email") || "";

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const handleVerify = async () => {
    if (!code) {
      alert("Please enter the verification code");
      return;
    }
    setLoading(true);

    const res = await fetch("/api/auth/verify-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, code }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      alert("Email verified! You can now log in.");
      window.location.href = "/login";
    } else {
      alert(data.error || "Verification failed");
    }
  };

  const handleResend = async () => {
    setResendLoading(true);

    const res = await fetch("/api/auth/resend-verification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setResendLoading(false);

    if (data.success) {
      alert("Verification email resent successfully");
    } else {
      alert(data.error || "Failed to resend code");
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
          margin-bottom: 16px;
        }
        .lp-btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(232,96,10,0.42);
        }
        .lp-btn-primary:disabled { opacity: 0.65; cursor: not-allowed; }

        /* ─── Secondary button (like social but without icon) ─── */
        .lp-btn-secondary {
          width: 100%;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          background: transparent;
          color: #44403c;
          font-family: var(--font-body);
          font-weight: 500; font-size: 15px;
          padding: 12px;
          border-radius: var(--radius-pill);
          border: 1.5px solid #e7e5e4;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s, color 0.2s, transform 0.2s;
          margin-bottom: 28px;
        }
        .dark .lp-btn-secondary { border-color: #3d352e; color: #c5bfb8; }
        .lp-btn-secondary:hover:not(:disabled) {
          border-color: #E8600A;
          background: rgba(232,96,10,0.05);
          color: #E8600A;
          transform: translateY(-1px);
        }
        .lp-btn-secondary:disabled { opacity: 0.65; cursor: not-allowed; }

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
        .lp-spinner-dark {
          border: 2.5px solid rgba(0,0,0,0.15);
          border-top-color: #E8600A;
        }
        .dark .lp-spinner-dark {
          border-color: rgba(255,255,255,0.2);
          border-top-color: #F59E0B;
        }

        /* ─── Email highlight ─── */
        .lp-email {
          display: inline-block;
          background: rgba(232,96,10,0.08);
          padding: 2px 8px;
          border-radius: 24px;
          font-weight: 500;
          color: #E8600A;
          margin-top: 4px;
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
              <Image src="/logo.svg" width={225} height={100} alt="Prabodhika" />
            </span>
          </div>

          {/* Title */}
          <h1 className="lp-title">
            Verify <span className="lp-grad">email</span>
          </h1>
          <p className="lp-sub">
            We’ve sent a 6-digit code to<br />
            <span className="lp-email">{email}</span>
          </p>

          {/* Fields */}
          <div className="lp-fields">
            {/* Code input */}
            <div className="lp-field">
              <span className="lp-field-icon">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M9 8h6M9 12h6M9 16h4" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Enter verification code"
                className="lp-input"
                value={code}
                autoComplete="off"
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleVerify()}
              />
            </div>
          </div>

          {/* Verify button */}
          <button
            type="button"
            className="lp-btn-primary"
            onClick={handleVerify}
            disabled={loading}
          >
            {loading ? (
              <span className="lp-spinner" />
            ) : (
              <>
                Verify
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </>
            )}
          </button>

          {/* Resend button */}
          <button
            type="button"
            className="lp-btn-secondary"
            onClick={handleResend}
            disabled={resendLoading}
          >
            {resendLoading ? (
              <span className="lp-spinner lp-spinner-dark" />
            ) : (
              "Resend code"
            )}
          </button>

          {/* Footer */}
          <p className="lp-footer">
            Wrong email?{" "}
            <a href="/register">Go back to sign up</a>
          </p>
        </div>
      </div>
    </>
  );
}
