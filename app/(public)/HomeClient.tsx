"use client";

import { NavbarPublic } from "@/components/NavbarPublic";
import { HeroIllustration } from "@/components/HeroIllustration";
import Footer from "@/components/Footer";

/* ── Icon SVG Components ─────────────────────────────────────── */
const Icon = ({ name, color = "var(--saffron)", size = 26 }: IconProps) => {
    const paths = ICONS[name];
    if (!Array.isArray(paths)) {
        console.warn("Invalid icon name:", name);
        return null;
    }

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {paths.map((path, i) => (
                <path key={i} d={path} />
            ))}
        </svg>
    );
};

type IconName = keyof typeof ICONS;

type IconProps = {
    name: IconName;
    color?: string;
    size?: number;
};

type Feature = {
    icon: IconName;
    color: string;
    bg: string;
    title: string;
    desc: string;
};

type IconCard = {
    icon: IconName;
    color: string;
    title: string;
    desc: string;
};

type AudienceCard = IconCard & {
    badge: string;
};

const ICONS = {
    hub: ["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", "M14 2v6h6", "M16 13H8", "M16 17H8", "M10 9H8"],
    search: ["M11 19A8 8 0 1 0 11 3a8 8 0 0 0 0 16z", "M21 21l-4.35-4.35", "M8 11h6", "M11 8v6"],
    qa: ["M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", "M8 10h8", "M8 14h5"],
    thread: ["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2", "M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8", "M23 21v-2a4 4 0 0 0-3-3.87", "M16 3.13a4 4 0 0 1 0 7.75"],
    dash: ["M3 3h7v7H3z", "M14 3h7v7h-7z", "M14 14h7v7h-7z", "M3 14h7v7H3z"],
    chart: ["M18 20V10", "M12 20V4", "M6 20v-6"],
    stack: ["M12 2L2 7l10 5 10-5-10-5", "M2 17l10 5 10-5", "M2 12l10 5 10-5"],
    check: ["M20 6L9 17l-5-5"],
    star: ["M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"],
    book: ["M4 19.5A2.5 2.5 0 0 1 6.5 17H20", "M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"],
    bell: ["M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9", "M13.73 21a2 2 0 0 1-3.46 0"],
    lock: ["M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z", "M7 11V7a5 5 0 0 1 10 0v4"],
} as const;

/* ── Geometric Background Mandala ─────────────────────────────── */
function MandalaBg({ opacity = .04 }: { opacity?: number }) {
    const spokes = Array.from({ length: 12 }, (_, i) => i);
    const dots = Array.from({ length: 8 }, (_, i) => i);
    return (
        <svg width="700" height="700" viewBox="0 0 500 500" style={{ opacity, pointerEvents: "none" }}>
            {[200, 155, 110, 70, 35].map(r => (
                <circle key={r} cx="250" cy="250" r={r} fill="none" stroke="var(--saffron)" strokeWidth=".8" />
            ))}
            {spokes.map(i => {
                const a = (i * 30 * Math.PI) / 180;
                return <line key={i} x1="250" y1="250"
                    x2={250 + 200 * Math.cos(a)} y2={250 + 200 * Math.sin(a)}
                    stroke="var(--saffron)" strokeWidth=".5" suppressHydrationWarning />;
            })}
            {dots.map(i => {
                const a = (i * 45 * Math.PI) / 180;
                return <circle key={i} cx={250 + 175 * Math.cos(a)} cy={250 + 175 * Math.sin(a)} r="5" fill="var(--saffron)" />;
            })}
        </svg>
    );
}

/* ── Main Component ──────────────────────────────────────────── */
export default function HomeClient() {
    const features: Feature[] = [
        { icon: "hub", color: "var(--saffron)", bg: "var(--warm-bg)", title: "Study Content Hub", desc: "Upload and discover notes, PDFs, images, and links across every subject. Manual moderation ensures only quality reaches you." },
        { icon: "search", color: "#D97706", bg: "#FFFBEB", title: "Smart Search & Filters", desc: "Keyword search combined with filters for subject, content type, and course level — find exactly what you need in seconds." },
        { icon: "qa", color: "#7C3AED", bg: "#F5F3FF", title: "Community Q&A", desc: "Ask questions, post detailed answers with images, upvote the best responses, and mark 'Best Answers' to help future learners." },
        { icon: "thread", color: "#059669", bg: "#ECFDF5", title: "Threaded Discussions", desc: "Deep, organised conversations under every question and answer. No insight ever gets lost in the noise." },
        { icon: "dash", color: "#2563EB", bg: "#EFF6FF", title: "Personal Dashboard", desc: "Bookmark content, track your uploads, view your question history, and monitor your engagement stats — all in one place." },
    ];

    const checks = [
        "Google, GitHub or Email login",
        "Upload PDFs, notes, images & links",
        "Manual moderation to keep spam out",
        "Bookmark any content or question",
        "Upvote system + Best Answer for Q&A",
        "Threaded comments on every post",
        "Notifications for approvals & upvotes",
        "Dark / Light theme support",
        "Fully responsive on all devices",
    ];

    const audience: AudienceCard[] = [
        { icon: "book", color: "#E8600A", badge: "Most Common", title: "Semester Exam Preppers", desc: "Crunch time? Find chapter-wise notes, past papers, and solved Q&As for your exact syllabus — all moderated for quality." },
        { icon: "stack", color: "#7C3AED", badge: "Contribute", title: "Note Sharers & Toppers", desc: "Already have great notes? Upload them, gain reputation, and help thousands of peers while building your academic profile." },
        { icon: "qa", color: "#059669", badge: "Get Unstuck", title: "Doubt Clearers", desc: "Stuck on a concept at midnight? Post your question and get answers from students who've been through the same syllabus." },
        { icon: "chart", color: "#2563EB", badge: "Beyond Degree", title: "Placement & Exam Aspirants", desc: "Preparing for GATE, CAT, or campus placements? Find structured, peer-curated content alongside your regular coursework." },
    ];

    const steps = [
        { num: "01", emoji: "🎓", title: "Create Your Account", desc: "Sign up in seconds with Google, GitHub, or email. Select your university, college, and courses." },
        { num: "02", emoji: "📖", title: "Discover or Contribute", desc: "Browse thousands of resources tailored to your exact syllabus, or upload your own notes and PDFs." },
        { num: "03", emoji: "🚀", title: "Engage & Grow", desc: "Ask doubts, answer questions, earn upvotes, and build your academic reputation in the community." },
    ];

    const stats = [
        { value: "50K+", label: "Students Joined" },
        { value: "200+", label: "Colleges Listed" },
        { value: "1L+", label: "Resources Shared" },
        { value: "98%", label: "Quality Rate" },
    ];

    const tickerItems = [
        "Study Content Hub", "Community Q&A", "Smart Search", "Threaded Discussions",
        "Personal Dashboard", "Manual Moderation", "Dark Mode", "Fully Responsive", "Bookmark Anything",
    ];

    return (
        <>
            <NavbarPublic />

            {/* ── HERO ─────────────────────────────────────────────── */}
            <section className="hero-section">
                <div style={{ position: "absolute", right: -120, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                    <MandalaBg opacity={.05} />
                </div>
                <div style={{ position: "absolute", left: -200, bottom: -100, pointerEvents: "none" }}>
                    <MandalaBg opacity={.03} />
                </div>

                <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }} className="hero-flex">
                    {/* left */}
                    <div style={{ flex: "1 1 480px" }} className="fade-up">
                        <div className="hero-badge">
                            <span style={{ fontSize: 14, color: "var(--saffron)" }}>★</span>
                            <span style={{ color: "var(--saffron)", fontWeight: 600, fontSize: 14 }}>Built Exclusively for College Students</span>
                        </div>

                        <h1 className="hero-title">
                            Every Student<br />
                            Deserves <span className="grad-text">Better</span><br />
                            Resources
                        </h1>

                        <p className="hero-sub">
                            Prabodhika is designed from the ground up for Indian college students —
                            your notes, your doubts, your community. One clean platform, zero chaos, completely free.
                        </p>

                        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 52 }}>
                            <a href="/login" className="btn-primary">Start Learning Free <span>→</span></a>
                            <a href="#features" className="btn-ghost">Explore Features</a>
                        </div>

                        <div className="hero-stats">
                            {stats.map(s => (
                                <div key={s.value}>
                                    <div className="hero-stat-value">{s.value}</div>
                                    <div className="hero-stat-label">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* right illustration */}
                    <div className="hero-illus float">
                        <HeroIllustration />
                    </div>
                </div>
            </section>

            {/* ── TICKER MARQUEE ──────────────────────────────────── */}
            <div className="ticker">
                <div className="ticker-track">
                    {[...tickerItems, ...tickerItems].map((t, i) => (
                        <span key={i} className="ticker-item">
                            {t}
                            <span className="ticker-sep">◆</span>
                        </span>
                    ))}
                </div>
            </div>

            {/* ── PROBLEM SECTION ──────────────────────────────────── */}
            <section className="section-problem">
                <div style={{ position: "absolute", top: -80, right: -80, width: 350, height: 350, borderRadius: "50%", background: "rgba(232,96,10,.07)" }} />
                <div style={{ position: "absolute", bottom: -120, left: -80, width: 450, height: 450, borderRadius: "50%", background: "rgba(245,158,11,.05)" }} />

                <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
                    <span className="section-eyebrow">The Challenge</span>
                    <h2 className="section-title">
                        The Problem <span className="grad-text">We Solve</span>
                    </h2>
                    <p className="section-sub" style={{ maxWidth: 580, margin: "0 auto 60px" }}>
                        Indian students juggle four platforms just to find one good note.
                        We fix that with one unified hub.
                    </p>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 24 }}>
                        {[
                            { e: "💬", title: "Notes on WhatsApp", desc: "Critical study material buried in group chats — impossible to find when exams loom." },
                            { e: "📁", title: "PDFs on Telegram", desc: "Files scattered across channels with zero organisation, search, or quality control." },
                            { e: "❓", title: "Doubts Everywhere", desc: "Switching between five apps for doubt-clearing wastes precious study hours." },
                            { e: "😰", title: "Exam Stress", desc: "Fragmented resources add unnecessary anxiety right when students need calm." },
                        ].map(p => (
                            <div key={p.title} className="problem-card" style={{ textAlign: "left" }}>
                                <div style={{ fontSize: 34, marginBottom: 18 }}>{p.e}</div>
                                <h3 style={{ color: "white", fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{p.title}</h3>
                                <p style={{ color: "rgba(255,255,255,.48)", fontSize: 14, lineHeight: 1.65 }}>{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FEATURES ────────────────────────────────────────── */}
            <section id="features" className="section-features">
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: 68 }}>
                        <span className="section-eyebrow">Everything You Need</span>
                        <h2 className="section-title">
                            One Platform. <span className="grad-text">Infinite Knowledge.</span>
                        </h2>
                        <p className="section-sub">
                            Five powerful features that transform how 50,000+ students study.
                        </p>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))", gap: 28 }}>
                        {features.map(f => (
                            <div key={f.title} className="feature-card">
                                <div className="feature-icon-wrap" style={{ background: f.bg }}>
                                    <Icon name={f.icon} color={f.color} size={26} />
                                </div>
                                <h3 className="feature-title">{f.title}</h3>
                                <p className="feature-desc">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── HOW IT WORKS ────────────────────────────────────── */}
            <section id="how-it-works" className="section-how">
                <div style={{ maxWidth: 980, margin: "0 auto", textAlign: "center" }}>
                    <span className="section-eyebrow">Simple Process</span>
                    <h2 className="section-title">
                        Up &amp; Running in <span className="grad-text">3 Steps</span>
                    </h2>
                    <p className="section-sub" style={{ maxWidth: 440 }}>
                        Zero friction onboarding — study smarter within minutes.
                    </p>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 48, marginTop: 72, position: "relative" }}>
                        {steps.map((step, idx) => (
                            <div key={step.num} style={{ textAlign: "center", position: "relative" }}>
                                {idx < steps.length - 1 && (
                                    <div className="hiw-step-connector mobile-hide" />
                                )}
                                <div className="hiw-circle">
                                    {step.emoji}
                                </div>
                                <div className="hiw-eyebrow">{step.num}</div>
                                <h3 className="hiw-step-title">{step.title}</h3>
                                <p className="hiw-step-desc">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── WHO IT'S FOR ────────────────────────────────────── */}
            <section id="audience" className="section-audience">
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: 64 }}>
                        <span className="section-eyebrow">Built For Every Student</span>
                        <h2 className="section-title">
                            Whatever Stage <span className="grad-text">You&apos;re At</span>
                        </h2>
                        <p className="section-sub">
                            From first-year orientation week to final-semester placement drives —
                            Prabodhika grows with you.
                        </p>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 26 }}>
                        {audience.map(a => (
                            <div key={a.title} className="audience-card">
                                <div
                                    className="audience-badge"
                                    style={{ color: a.color, background: `${a.color}12`, borderColor: `${a.color}22` }}
                                >
                                    {a.badge}
                                </div>
                                <div className="audience-icon-wrap" style={{ background: `${a.color}10` }}>
                                    <Icon name={a.icon} color={a.color} size={24} />
                                </div>
                                <h3 className="audience-title">{a.title}</h3>
                                <p className="audience-desc">{a.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CHECKLIST STRIP ─────────────────────────────────── */}
            <section className="section-checklist">
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <h2 className="section-checklist-title">
                        Everything Checked Off ✅
                    </h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
                        {checks.map(c => (
                            <div key={c} className="check-row">
                                <div className="check-icon">
                                    <Icon name="check" color="white" size={14} />
                                </div>
                                <span className="check-text">{c}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── VALUES STRIP ────────────────────────────────────── */}
            <section className="section-values">
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: 56 }}>
                        <h2 className="section-title">
                            Our <span className="grad-text">Promise</span>
                        </h2>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
                        {([
                            { icon: "star", color: "#E8600A", title: "Quality First", desc: "Every uploaded resource is reviewed by a human moderator before going live." },
                            { icon: "thread", color: "#7C3AED", title: "Community Driven", desc: "Students help students. The best content rises to the top through upvotes." },
                            { icon: "lock", color: "#059669", title: "Privacy Aware", desc: "We collect only what is necessary and will never sell your data — period." },
                            { icon: "bell", color: "#2563EB", title: "Always Improving", desc: "Built for 100,000+ users with performance and scalability at the core." },
                        ] satisfies IconCard[]).map(v => (
                            <div key={v.title} className="value-card">
                                <div className="value-icon-wrap" style={{ background: `${v.color}12` }}>
                                    <Icon name={v.icon as IconName} color={v.color} size={22} />
                                </div>
                                <h3 className="value-title">{v.title}</h3>
                                <p className="value-desc">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ────────────────────────────────────────────── */}
            <section id="join" className="section-cta">
                <div style={{ position: "absolute", top: -60, left: -60, width: 280, height: 280, borderRadius: "50%", background: "rgba(232,96,10,.06)" }} />
                <div style={{ position: "absolute", bottom: -100, right: -60, width: 380, height: 380, borderRadius: "50%", background: "rgba(245,158,11,.07)" }} />

                <div style={{ maxWidth: 680, margin: "0 auto", position: "relative", zIndex: 1 }}>
                    <div className="cta-emoji">🎓</div>
                    <h2 className="cta-title">
                        Your Degree Is Hard.<br /><span className="grad-text">Finding Notes Shouldn&apos;t Be.</span>
                    </h2>
                    <p className="cta-sub">
                        50,000+ students across India have already ditched the WhatsApp chaos.
                        Join them — upload your first note or ask your first doubt in under two minutes.
                    </p>
                    <div style={{ display: "flex", gap: 18, justifyContent: "center", flexWrap: "wrap" }}>
                        <a href="/login" className="btn-primary" style={{ fontSize: 18, padding: "16px 44px" }}>Find My Notes — It's Free</a>
                        <a href="#features" className="btn-ghost" style={{ fontSize: 18, padding: "15px 44px" }}>See All Features</a>
                    </div>
                    <p className="cta-footnote">
                        No credit card &nbsp;·&nbsp; No ads &nbsp;·&nbsp; Core features free forever
                    </p>
                </div>
            </section>

            {/* ── FOOTER ──────────────────────────────────────────── */}
            <Footer />
        </>
    );
}