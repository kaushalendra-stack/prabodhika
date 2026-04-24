"use client";
import { useState, useEffect } from "react";
import Image from "next/image";


export default function Footer() {
  const currentYear = new Date().getFullYear();
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
  return (
    <>
      <style>{STYLES}</style>

      <footer className="pb-footer">
        <div className="pb-footer-inner">

          {/* Brand section */}
          <div className="pb-footer-brand">
            <div className="pb-footer-logo">
              <Image src={logoSrc} width={180} height={80} alt="Prabodhika" priority />
            </div>
            <p className="pb-footer-tagline">
              India's student-powered knowledge base. Free forever.
            </p>
          </div>

          {/* Stats / Quick info */}
          <div className="pb-footer-stats">
            <div className="pb-stat">
              <span className="pb-stat-value">50K+</span>
              <span className="pb-stat-label">Students</span>
            </div>
            <div className="pb-stat">
              <span className="pb-stat-value">1L+</span>
              <span className="pb-stat-label">Resources</span>
            </div>
            <div className="pb-stat">
              <span className="pb-stat-value">200+</span>
              <span className="pb-stat-label">Colleges</span>
            </div>
          </div>

          {/* Promise / Values */}
          <div className="pb-footer-values">
            <div className="pb-value">
              <span className="pb-value-icon">✨</span>
              <span className="pb-value-text"><strong>Quality First</strong> — Every upload is reviewed</span>
            </div>
            <div className="pb-value">
              <span className="pb-value-icon">🔒</span>
              <span className="pb-value-text"><strong>Privacy Protected</strong> — Your data is yours alone</span>
            </div>
            <div className="pb-value">
              <span className="pb-value-icon">💚</span>
              <span className="pb-value-text"><strong>Community Driven</strong> — Built by students, for students</span>
            </div>
          </div>

          {/* Divider */}
          <div className="pb-footer-divider" />

          {/* Bottom info */}
          <div className="pb-footer-bottom">
            <p className="pb-footer-credit">
              © {currentYear} Prabodhika. Made with ❤️ for Indian students.
            </p>
            <p className="pb-footer-subtitle">
              "प्रबोधिका — जो समझ जगाती है"<br />
              <em>That which awakens understanding</em>
            </p>
          </div>

        </div>
      </footer>
    </>
  );
}

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');

:root {
  --pb-saffron: #E8600A;
  --pb-amber: #F59E0B;
  --pb-indigo: #1E1B4B;
  --pb-cream: #FFFBF5;
  --pb-cream2: #FEF3E8;
  --pb-text: #1C1917;
  --pb-muted: #78716C;
  --pb-border: #E7E5E2;
  --pb-font: 'Outfit', system-ui, sans-serif;
}

.dark {
  --pb-text: #E7E5E4;
  --pb-muted: #A8A29E;
  --pb-border: #3D352E;
  --pb-cream: #1C1A17;
  --pb-cream2: #241F1A;
}

/* ── Footer ── */
.pb-footer {
  background: var(--pb-cream);
  border-top: 1px solid var(--pb-border);
  padding: 56px 24px 32px;
  font-family: var(--pb-font);
  margin-top: auto;
}

.pb-footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

/* ── Brand section ── */
.pb-footer-brand {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 320px;
}

.pb-footer-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-weight: 700;
  color: var(--pb-indigo);
}

.pb-footer-icon {
  font-size: 28px;
}

.pb-footer-name {
  letter-spacing: 0.5px;
}

.pb-footer-tagline {
  font-size: 14px;
  color: var(--pb-muted);
  line-height: 1.6;
  margin: 0;
}

/* ── Stats ── */
.pb-footer-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 24px;
}

.pb-stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.pb-stat-value {
  font-size: 24px;
  font-weight: 700;
  background: linear-gradient(120deg, #E8600A, #F59E0B);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.pb-stat-label {
  font-size: 13px;
  color: var(--pb-muted);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

/* ── Values ── */
.pb-footer-values {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.pb-value {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  background: rgba(232, 96, 10, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(232, 96, 10, 0.1);
}

.dark .pb-value {
  background: rgba(232, 96, 10, 0.08);
}

.pb-value-icon {
  font-size: 18px;
  flex-shrink: 0;
}

.pb-value-text {
  font-size: 13px;
  color: var(--pb-text);
  line-height: 1.5;
}

.pb-value-text strong {
  color: var(--pb-saffron);
  font-weight: 600;
}

/* ── Divider ── */
.pb-footer-divider {
  height: 1px;
  background: var(--pb-border);
}

/* ── Bottom ── */
.pb-footer-bottom {
  text-align: center;
}

.pb-footer-credit {
  font-size: 14px;
  color: var(--pb-muted);
  margin: 0 0 12px;
  font-weight: 500;
}

.pb-footer-subtitle {
  font-size: 12px;
  color: var(--pb-muted);
  margin: 0;
  line-height: 1.6;
}

.pb-footer-subtitle em {
  font-style: italic;
  color: var(--pb-text);
  opacity: 0.7;
}

/* ── Responsive ── */
@media (max-width: 640px) {
  .pb-footer {
    padding: 40px 20px 28px;
  }

  .pb-footer-inner {
    gap: 32px;
  }

  .pb-footer-stats {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  .pb-stat-value {
    font-size: 20px;
  }

  .pb-stat-label {
    font-size: 11px;
  }

  .pb-footer-values {
    grid-template-columns: 1fr;
  }

  .pb-value {
    gap: 10px;
    padding: 10px;
  }

  .pb-value-icon {
    font-size: 16px;
  }

  .pb-value-text {
    font-size: 12px;
  }

  .pb-footer-credit {
    font-size: 13px;
  }

  .pb-footer-subtitle {
    font-size: 11px;
  }
}
`;