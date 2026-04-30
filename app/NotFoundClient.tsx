// app/NotFoundClient.tsx
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

function NotFoundIllustration() {
    return (
        <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="200" cy="150" r="120" fill="var(--warm-bg)" opacity={0.3} />
            <circle cx="200" cy="150" r="90" fill="var(--amber)" opacity={0.2} />
            <circle cx="200" cy="150" r="80" fill="none" stroke="var(--saffron)" strokeWidth={3} />
            <circle cx="175" cy="130" r="8" fill="var(--saffron)" />
            <circle cx="225" cy="130" r="8" fill="var(--saffron)" />
            <path d="M 170 170 Q 200 190 230 170" stroke="var(--saffron)" strokeWidth={3} fill="none" strokeLinecap="round" />
            <rect x="280" y="80" width="60" height="80" fill="white" stroke="var(--saffron)" strokeWidth={2} transform="rotate(15 310 120)" />
            <path d="M 305 100 L 325 100 L 325 120 L 315 120 L 305 110 Z" fill="var(--saffron)" opacity={0.5} />
            <line x1="295" y1="130" x2="325" y2="130" stroke="var(--saffron)" strokeWidth={2} />
            <line x1="295" y1="145" x2="320" y2="145" stroke="var(--saffron)" strokeWidth={2} />
            <text x="80" y="200" fontSize="60" fontWeight="bold" fill="var(--saffron)" opacity={0.3}>?</text>
        </svg>
    );
}

export default function NotFoundClient() {
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
        .page-404 {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px 24px;
          background: var(--cream);
          font-family: var(--font-body);
        }
        .page-404 .card {
          max-width: 1000px;
          width: 100%;
          background: var(--white);
          border-radius: 32px;
          padding: 48px 40px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(232, 96, 10, 0.1);
        }
        .dark .page-404 .card {
          background: #23201c;
          border-color: rgba(232, 96, 10, 0.2);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }
        .page-404 .title {
          font-family: var(--font-display);
          font-size: 80px;
          font-weight: 400;
          background: linear-gradient(120deg, var(--saffron), var(--amber));
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 8px;
        }
        .page-404 .subtitle {
          font-family: var(--font-display);
          font-size: 28px;
          color: var(--indigo);
          margin-bottom: 16px;
        }
        .dark .page-404 .subtitle {
          color: #e2e8f0;
        }
        .page-404 .text {
          font-size: 16px;
          line-height: 1.6;
          color: var(--muted);
          margin-bottom: 32px;
        }
        .page-404 .actions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .page-404 .actions button,
        .page-404 .actions a {
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
        .page-404 .actions .primary {
          background: linear-gradient(120deg, var(--saffron), var(--amber));
          color: white;
          box-shadow: 0 4px 20px rgba(232, 96, 10, 0.3);
        }
        .page-404 .actions .primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(232, 96, 10, 0.4);
        }
        .page-404 .actions .secondary {
          background: transparent;
          color: var(--indigo);
          border: 2px solid var(--indigo);
        }
        .dark .page-404 .actions .secondary {
          color: #e2e8f0;
          border-color: #e2e8f0;
        }
        .page-404 .actions .secondary:hover {
          background: var(--indigo);
          color: white;
        }
        .dark .page-404 .actions .secondary:hover {
          background: #e2e8f0;
          color: #1c1a17;
        }
        @media (max-width: 768px) {
          .page-404 .card {
            padding: 32px 24px;
          }
          .page-404 .title {
            font-size: 60px;
          }
          .page-404 .subtitle {
            font-size: 24px;
          }
          .page-404 .actions button,
          .page-404 .actions a {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

            <div className="page-404">
                <div className="card">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="flex justify-center">
                            <NotFoundIllustration />
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="title">404</h1>
                            <h2 className="subtitle">Page Not Found</h2>
                            <p className="text">
                                The page you are looking for could not be found. It might have been moved or removed.
                            </p>
                            <div className="actions">
                                <button onClick={goBack} className="primary">
                                    ← Go Back
                                </button>
                                <Link href="/login" className="secondary">
                                    Sign In →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}