"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function ForgotPasswordClient() {
  const [email, setEmail] = useState("");
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



  const handleSubmit = async () => {
    if (!email) {
      alert("Please enter your email address");
      return;
    }
    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      window.location.href = `/reset-password?email=${encodeURIComponent(email)}`;
    } else {
      alert(data.error || "Failed to send reset code");
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
            Forgot <span className="lp-grad">password?</span>
          </h1>
          <p className="lp-sub">
            Enter your email and we’ll send you a reset code
          </p>

          {/* Fields */}
          <div className="lp-fields">
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
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
            </div>
          </div>

          {/* Send button */}
          <button
            type="button"
            className="lp-btn-primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <span className="lp-spinner" />
            ) : (
              <>
                Send reset code
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </>
            )}
          </button>

          {/* Footer */}
          <p className="lp-footer">
            Remember your password?{" "}
            <a href="/login">Sign in</a>
          </p>
        </div>
      </div>
    </>
  );
}
