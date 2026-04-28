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
