// app/500/InternalServerErrorClient.tsx
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

function ServerErrorIllustration() {
    return (
        <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="200" cy="150" r="120" fill="var(--warm-bg)" opacity={0.3} />
            <circle cx="200" cy="150" r="90" fill="var(--amber)" opacity={0.2} />
            <circle cx="200" cy="150" r="80" fill="none" stroke="var(--saffron)" strokeWidth={3} />

            <rect x="155" y="120" width="90" height="90" rx="12" fill="var(--white)" stroke="var(--saffron)" strokeWidth={2} />
            <circle cx="200" cy="165" r="20" fill="var(--saffron)" opacity={0.2} />
            <circle cx="200" cy="165" r="10" fill="var(--saffron)" />
            <rect x="185" y="100" width="30" height="30" rx="4" fill="var(--saffron)" opacity={0.6} />
            <line x1="170" y1="210" x2="230" y2="210" stroke="var(--saffron)" strokeWidth={3} strokeLinecap="round" />
            <line x1="180" y1="225" x2="220" y2="225" stroke="var(--saffron)" strokeWidth={3} strokeLinecap="round" />

            <text x="100" y="100" fontSize="48" fontWeight="bold" fill="var(--saffron)" opacity={0.4}>!</text>
            <text x="280" y="220" fontSize="48" fontWeight="bold" fill="var(--saffron)" opacity={0.4}>!</text>

            <circle cx="315" cy="95" r="25" fill="var(--saffron)" opacity={0.15} />
            <path d="M310 88 L320 98 M320 88 L310 98" stroke="var(--saffron)" strokeWidth={3} strokeLinecap="round" />

            <circle cx="85" cy="215" r="20" fill="var(--saffron)" opacity={0.15} />
            <path d="M82 212 L88 218 M88 212 L82 218" stroke="var(--saffron)" strokeWidth={2.5} strokeLinecap="round" />
        </svg>
    );
}

export default function InternalServerErrorClient() {
    const router = useRouter();

    const goBack = () => {
        if (window.history.length > 1) {
            router.back();
        } else {
            router.push("/");
        }
    };

    return (
        <>
            <style jsx>{`
        .page-500 {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px 24px;
          background: var(--cream);
          font-family: var(--font-body);
        }
        .page-500 .card {
          max-width: 1000px;
          width: 100%;
          background: var(--white);
          border-radius: 32px;
          padding: 48px 40px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(232, 96, 10, 0.1);
        }
        .dark .page-500 .card {
          background: #23201c;
          border-color: rgba(232, 96, 10, 0.2);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }
        .page-500 .title {
          font-family: var(--font-display);
          font-size: 80px;
          font-weight: 400;
          background: linear-gradient(120deg, var(--saffron), var(--amber));
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 8px;
        }
        .page-500 .subtitle {
          font-family: var(--font-display);
          font-size: 28px;
          color: var(--indigo);
          margin-bottom: 16px;
        }
        .dark .page-500 .subtitle {
          color: #e2e8f0;
        }
        .page-500 .text {
          font-size: 16px;
          line-height: 1.6;
          color: var(--muted);
          margin-bottom: 32px;
        }
        .page-500 .actions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .page-500 .actions button,
        .page-500 .actions a {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          border-radius: 50px;
          font-weight: 600;
          font-size: 15px;
          text-decoration: none;
          transition: all 0.25s;
          cursor: pointer;
          font-family: inherit;
          border: none;
        }
        .page-500 .actions .primary {
          background: linear-gradient(120deg, var(--saffron), var(--amber));
          color: white;
          box-shadow: 0 4px 20px rgba(232, 96, 10, 0.3);
        }
        .page-500 .actions .primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(232, 96, 10, 0.4);
        }
        .page-500 .actions .secondary {
          background: transparent;
          color: var(--indigo);
          border: 2px solid var(--indigo);
        }
        .dark .page-500 .actions .secondary {
          color: #e2e8f0;
          border-color: #e2e8f0;
        }
        .page-500 .actions .secondary:hover {
          background: var(--indigo);
          color: white;
        }
        .dark .page-500 .actions .secondary:hover {
          background: #e2e8f0;
          color: #1c1a17;
        }
        @media (max-width: 768px) {
          .page-500 .card {
            padding: 32px 24px;
          }
          .page-500 .title {
            font-size: 60px;
          }
          .page-500 .subtitle {
            font-size: 24px;
          }
          .page-500 .actions button,
          .page-500 .actions a {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

            <div className="page-500">
                <div className="card">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="flex justify-center">
                            <ServerErrorIllustration />
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="title">500</h1>
                            <h2 className="subtitle">Server Error</h2>
                            <p className="text">
                                Something went wrong on our end. Please try again later or report the issue if it persists.
                            </p>
                            <div className="actions">
                                <button onClick={goBack} className="primary">
                                    ← Go Back
                                </button>
                                <Link href="/" className="secondary">
                                    Home →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}