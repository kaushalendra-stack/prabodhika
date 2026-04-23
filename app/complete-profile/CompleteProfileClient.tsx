"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SearchSelect from "@/components/SearchSelect";
import Image from "next/image";

type ProfileOption = {
    id: string | number;
    name: string;
    [key: string]: unknown;
};

export default function CompleteProfileClient() {
    const { data: session, status } = useSession();
    const router = useRouter();

    // Step management
    const [step, setStep] = useState(1);
    const [university, setUniversity] = useState<ProfileOption | null>(null);
    const [college, setCollege] = useState<ProfileOption | null>(null);
    const [course, setCourse] = useState<ProfileOption | null>(null);
    const [year, setYear] = useState("");
    const [loading, setLoading] = useState(false);

    // Redirect if profile already completed
    useEffect(() => {
        if (status === "loading") return;
        if (session?.user?.profile_completed) {
            router.replace("/home");
        }
    }, [session, status, router]);

    if (status === "loading") {
        return <div className="lp-shell"><div className="lp-card">Loading...</div></div>;
    }

    if (session?.user?.profile_completed) {
        return null;
    }

    const handleNext = () => {
        if (step === 1 && !university) {
            alert("Please select your university");
            return;
        }
        if (step === 2 && !college) {
            alert("Please select your college");
            return;
        }
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const handleSubmit = async () => {
        if (!university || !college || !course || !year) {
            alert("Please fill all fields");
            return;
        }

        setLoading(true);
        const res = await fetch("/api/user/complete-profile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                university_id: university.id,
                college_id: college.id,
                course_id: course.id,
                year,
            }),
        });
        const data = await res.json();
        setLoading(false);

        if (data.success) {
            router.push("/home");
        } else {
            alert(data.error);
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
          background: conic-gradient(from 0deg, rgba(232,96,10,0.08), rgba(245,158,11,0.11), rgba(232,96,10,0.05), rgba(245,158,11,0.11));
          animation: orb-spin 26s linear infinite;
          pointer-events: none; z-index: 0;
        }
        .lp-orb-2 {
          position: fixed; bottom: -90px; left: -70px;
          width: 360px; height: 360px; border-radius: 50%;
          background: radial-gradient(circle, rgba(232,96,10,0.10) 0%, transparent 68%);
          animation: orb-pulse 8s ease-in-out infinite;
          pointer-events: none; z-index: 0;
        }

        .lp-card {
          position: relative; z-index: 1;
          width: 100%; max-width: 520px;
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

        /* Steps indicator */
        .lp-steps {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-bottom: 32px;
        }
        .lp-step {
          width: 32px;
          height: 4px;
          border-radius: 4px;
          background: #e7e5e4;
          transition: background 0.3s;
        }
        .lp-step.active {
          background: linear-gradient(90deg, #E8600A, #F59E0B);
        }
        .lp-step.completed {
          background: #E8600A;
        }

        .lp-fields {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 28px;
        }

        .lp-field {
          position: relative;
        }

        .lp-field-icon {
          position: absolute; left: 15px; top: 50%;
          transform: translateY(-50%);
          color: var(--color-muted);
          pointer-events: none;
          display: flex;
          align-items: center;
        }

        .lp-input, select.lp-input {
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
          appearance: none;
          cursor: pointer;
        }
        .dark .lp-input {
          background: #1a1714;
          border-color: #3d352e;
          color: #e7e5e4;
        }
        .lp-input:focus {
          border-color: #E8600A;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(232,96,10,0.12);
        }
        .dark .lp-input:focus { background: #2a241f; }

        select.lp-input {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2378716c' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 15px center;
        }

        .lp-btn-group {
          display: flex;
          gap: 12px;
          margin-top: 8px;
        }
        .lp-btn-primary {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: linear-gradient(120deg, #E8600A, #F59E0B);
          color: #fff;
          font-weight: 600;
          font-size: 16px;
          padding: 14px;
          border-radius: var(--radius-pill);
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 24px rgba(232,96,10,0.30);
          transition: transform 0.22s, box-shadow 0.22s, opacity 0.2s;
        }
        .lp-btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(232,96,10,0.42);
        }
        .lp-btn-primary:disabled { opacity: 0.65; cursor: not-allowed; }

        .lp-btn-secondary {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: transparent;
          color: #44403c;
          font-weight: 500;
          font-size: 15px;
          padding: 12px;
          border-radius: var(--radius-pill);
          border: 1.5px solid #e7e5e4;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s, color 0.2s, transform 0.2s;
        }
        .dark .lp-btn-secondary { border-color: #3d352e; color: #c5bfb8; }
        .lp-btn-secondary:hover:not(:disabled) {
          border-color: #E8600A;
          background: rgba(232,96,10,0.05);
          color: #E8600A;
          transform: translateY(-1px);
        }

        .lp-spinner {
          width: 18px;
          height: 18px;
          border: 2.5px solid rgba(255,255,255,0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: lp-spin 0.7s linear infinite;
        }
        @keyframes lp-spin { to { transform: rotate(360deg); } }

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
                            <Image src="/logo.svg" width={225} height={100} alt="Prabodhika" />
                        </span>
                    </div>

                    <h1 className="lp-title">
                        Complete <span className="lp-grad">profile</span>
                    </h1>
                    <p className="lp-sub">
                        Tell us about your education
                    </p>

                    {/* Step indicators */}
                    <div className="lp-steps">
                        <div className={`lp-step ${step >= 1 ? 'completed' : ''}`} />
                        <div className={`lp-step ${step >= 2 ? 'completed' : ''}`} />
                        <div className={`lp-step ${step >= 3 ? 'active' : ''}`} />
                    </div>

                    <div className="lp-fields">
                        {step === 1 && (
                            <div className="lp-field">
                                <span className="lp-field-icon">
                                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                    </svg>
                                </span>
                                <SearchSelect
                                    placeholder="Search University"
                                    api="/api/universities"
                                    createApi="/api/universities"
                                    onSelect={(item: ProfileOption) => {
                                        setUniversity(item);
                                        setCollege(null);
                                        setCourse(null);
                                    }}
                                />
                            </div>
                        )}

                        {step === 2 && university && (
                            <div className="lp-field">
                                <span className="lp-field-icon">
                                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                        <rect x="4" y="8" width="16" height="12" rx="1" />
                                        <path d="M8 4v4M16 4v4" />
                                    </svg>
                                </span>
                                <SearchSelect
                                    placeholder="Search College"
                                    api={`/api/colleges?university_id=${university.id}`}
                                    createApi="/api/colleges"
                                    extraData={{ university_id: university.id }}
                                    onSelect={(item: ProfileOption) => setCollege(item)}
                                />
                            </div>
                        )}

                        {step === 3 && university && (
                            <>
                                <div className="lp-field">
                                    <span className="lp-field-icon">
                                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                            <path d="M12 6v12M6 12h12" />
                                            <circle cx="12" cy="12" r="9" />
                                        </svg>
                                    </span>
                                    <SearchSelect
                                        placeholder="Search Course"
                                        api={`/api/courses?university_id=${university.id}`}
                                        createApi="/api/courses"
                                        extraData={{ university_id: university.id }}
                                        onSelect={setCourse}
                                    />
                                </div>

                                <div className="lp-field">
                                    <span className="lp-field-icon">
                                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M12 6v6l4 2" />
                                        </svg>
                                    </span>
                                    <select
                                        className="lp-input"
                                        value={year}
                                        onChange={(e) => setYear(e.target.value)}
                                    >
                                        <option value="">Select Year</option>
                                        <option value="1">1st Year</option>
                                        <option value="2">2nd Year</option>
                                        <option value="3">3rd Year</option>
                                        <option value="4">4th Year</option>
                                    </select>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="lp-btn-group">
                        {step > 1 && (
                            <button type="button" className="lp-btn-secondary" onClick={handleBack}>
                                ← Back
                            </button>
                        )}
                        {step < 3 ? (
                            <button type="button" className="lp-btn-primary" onClick={handleNext}>
                                Next →
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="lp-btn-primary"
                                onClick={handleSubmit}
                                disabled={loading || !university || !college || !course || !year}
                            >
                                {loading ? <span className="lp-spinner" /> : "Save Profile →"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
