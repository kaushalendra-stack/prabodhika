"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function VerifyEmailClient() {
  const params = useSearchParams();
  const email = params.get("email") || "";

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);



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
