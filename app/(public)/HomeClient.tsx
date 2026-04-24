"use client";

import "../globals.css";
import { NavbarPublic } from "@/components/NavbarPublic";
import { FooterPublic } from "@/components/FooterPublic";
import Footer from "@/components/Footer";

/* ── Prabodhika Homepage ──────────────────────────────────────────────── */
const C = {
  saffron: "#E8600A",
  amber:   "#F59E0B",
  indigo:  "#1E1B4B",
  cream:   "#FFFBF5",
  warmBg:  "#FEF3E8",
  muted:   "#78716c",
  stone:   "#57534e",
  white:   "#FFFFFF",
};

/* ── Icon SVG Components ─────────────────────────────────────── */
const Icon = ({ name, color = "#E8600A", size = 26 }: IconProps) => {
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
  hub:      ["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z","M14 2v6h6","M16 13H8","M16 17H8","M10 9H8"],
  search:   ["M11 19A8 8 0 1 0 11 3a8 8 0 0 0 0 16z","M21 21l-4.35-4.35","M8 11h6","M11 8v6"],
  qa:       ["M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z","M8 10h8","M8 14h5"],
  thread:   ["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2","M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8","M23 21v-2a4 4 0 0 0-3-3.87","M16 3.13a4 4 0 0 1 0 7.75"],
  dash:     ["M3 3h7v7H3z","M14 3h7v7h-7z","M14 14h7v7h-7z","M3 14h7v7H3z"],
  chart:    ["M18 20V10","M12 20V4","M6 20v-6"],
  stack:    ["M12 2L2 7l10 5 10-5-10-5","M2 17l10 5 10-5","M2 12l10 5 10-5"],
  check:    ["M20 6L9 17l-5-5"],
  arrow:    ["M5 12h14","M12 5l7 7-7 7"],
  star:     ["M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"],
  book:     ["M4 19.5A2.5 2.5 0 0 1 6.5 17H20","M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"],
  bell:     ["M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9","M13.73 21a2 2 0 0 1-3.46 0"],
  lock:     ["M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z","M7 11V7a5 5 0 0 1 10 0v4"],
} as const;


/* ── Hero Illustration ─────────────────────────────────────────── */
function HeroIllus() {
  return (
    <svg viewBox="0 0 440 460" width="440" height="460" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8600A"/>
          <stop offset="100%" stopColor="#F59E0B"/>
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E8600A" stopOpacity=".18"/>
          <stop offset="100%" stopColor="#E8600A" stopOpacity="0"/>
        </radialGradient>
        <filter id="cs" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="6" stdDeviation="14" floodColor="#E8600A" floodOpacity=".14"/>
        </filter>
        <filter id="ss" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="3" stdDeviation="8" floodColor="#000" floodOpacity=".08"/>
        </filter>
      </defs>

      {/* ambient glow */}
      <circle cx="220" cy="230" r="190" fill="url(#glow)"/>

      {/* spinning ring decoration */}
      <circle cx="220" cy="230" r="170" fill="none" stroke="#E8600A" strokeWidth=".6" strokeDasharray="8 14" opacity=".18"/>
      <circle cx="220" cy="230" r="130" fill="none" stroke="#F59E0B" strokeWidth=".5" strokeDasharray="5 10" opacity=".12"/>

      {/* ── Main Card — Content Hub ── */}
      <g filter="url(#cs)">
        <rect x="55" y="80" width="210" height="155" rx="20" fill="white"/>
        {/* header stripe */}
        <rect x="55" y="80" width="210" height="38" rx="20" fill="url(#hg1)" opacity=".12"/>
        <rect x="55" y="80" width="210" height="22" rx="11" fill="url(#hg1)"/>
        <text x="75" y="94" fill="white" fontSize="10" fontWeight="700" fontFamily="Outfit,sans-serif">Study Content Hub</text>
        {/* file rows */}
        {[0,1,2,3].map(i => (
          <g key={i} transform={`translate(72, ${116 + i*30})`}>
            <rect width="158" height="22" rx="7" fill={i===0?"#FEF3E8":"#F7F5F2"}/>
            <rect width="7" height="22" rx="3" fill={i===0?"#E8600A":"#D4D4D4"}/>
            <rect x="16" y="6" width={i===0?90:60+i*10} height="4" rx="2" fill={i===0?"#E8600A":"#C4C4C4"} opacity=".55"/>
            <rect x="16" y="13" width={i===0?55:40+i*5} height="3" rx="1.5" fill="#D4D4D4" opacity=".5"/>
            {i===0 && <rect x="118" y="5" width="28" height="12" rx="6" fill="#E8600A" opacity=".15"/>}
            {i===0 && <text x="122" y="14" fill="#E8600A" fontSize="7.5" fontFamily="Outfit,sans-serif" fontWeight="700">PDF</text>}
          </g>
        ))}
      </g>

      {/* ── Q&A Card — top right ── */}
      <g filter="url(#ss)" transform="translate(248,54)">
        <rect width="148" height="112" rx="18" fill="white"/>
        <text x="14" y="22" fill={C.indigo} fontSize="9.5" fontWeight="700" fontFamily="Outfit,sans-serif">Community Q&A</text>
        <rect x="14" y="30" width="120" height="10" rx="3" fill="#1E1B4B" opacity=".06"/>
        <rect x="14" y="44" width="120" height="7" rx="2.5" fill="#F3F3F3"/>
        <rect x="14" y="55" width="90" height="7" rx="2.5" fill="#F3F3F3"/>
        <rect x="14" y="70" width="40" height="14" rx="7" fill="#E8600A" opacity=".12"/>
        <text x="20" y="80" fill="#E8600A" fontSize="7.5" fontFamily="Outfit,sans-serif" fontWeight="700">Best Answer</text>
        {/* upvote */}
        <g transform="translate(104,66)">
          <rect width="30" height="14" rx="7" fill="url(#hg1)"/>
          <text x="7" y="10" fill="white" fontSize="8" fontFamily="Outfit,sans-serif" fontWeight="700">+24</text>
        </g>
        <rect x="14" y="90" width="66" height="7" rx="2.5" fill="#F3F3F3"/>
      </g>

      {/* ── Dashboard mini card ── */}
      <g filter="url(#ss)" transform="translate(32,258)">
        <rect width="160" height="122" rx="18" fill="white"/>
        <text x="14" y="22" fill={C.indigo} fontSize="9.5" fontWeight="700" fontFamily="Outfit,sans-serif">Your Dashboard</text>
        {/* bar chart */}
        {[42,65,38,75,55,88].map((h, i) => (
          <g key={i}>
            <rect x={14+i*22} y={90-h*.52} width="14" height={h*.52} rx="4"
              fill={i===5?"url(#hg1)":"#E8600A"} opacity={i===5?1:0.18+i*0.12}/>
          </g>
        ))}
        <rect x="14" y="92" width="132" height="1" rx=".5" fill="#E7E5E2"/>
        <text x="14" y="110" fill={C.muted} fontSize="8" fontFamily="Outfit,sans-serif">7-day activity</text>
      </g>

      {/* ── Search pill ── */}
      <g filter="url(#ss)" transform="translate(202,290)">
        <rect width="178" height="48" rx="24" fill="white"/>
        <circle cx="24" cy="24" r="14" fill="#FEF3E8"/>
        {/* magnifier */}
        <circle cx="24" cy="23" r="5.5" fill="none" stroke="#E8600A" strokeWidth="1.6"/>
        <line x1="28" y1="27" x2="31.5" y2="30.5" stroke="#E8600A" strokeWidth="1.6" strokeLinecap="round"/>
        <rect x="48" y="17" width="96" height="6" rx="3" fill="#E8600A" opacity=".18"/>
        <rect x="48" y="27" width="64" height="5" rx="2.5" fill="#F0EDEA"/>
      </g>

      {/* ── Notification badge ── */}
      <g filter="url(#ss)" transform="translate(310,196)">
        <rect width="110" height="50" rx="14" fill="white"/>
        <circle cx="20" cy="25" r="12" fill="#FEF3E8"/>
        <text x="15" y="29.5" fontSize="12" fontFamily="sans-serif">🔔</text>
        <text x="38" y="20" fill={C.indigo} fontSize="9" fontWeight="700" fontFamily="Outfit,sans-serif">New Answer</text>
        <text x="38" y="32" fill={C.muted} fontSize="8" fontFamily="Outfit,sans-serif">Physics — Ch.4</text>
        <circle cx="100" cy="14" r="7" fill="url(#hg1)"/>
        <text x="97" y="18" fill="white" fontSize="8" fontWeight="700" fontFamily="sans-serif">3</text>
      </g>

      {/* decorative dots */}
      {[[380,130,5],[28,400,4],[390,370,6],[164,420,3],[400,240,4]].map(([cx,cy,r],i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="#E8600A" opacity={.12+i*.04}/>
      ))}
      <circle cx="58" cy="68" r="3" fill="#F59E0B" opacity=".3"/>
      <circle cx="400" cy="82" r="3" fill="#F59E0B" opacity=".25"/>
    </svg>
  );
}

/* ── Geometric Background Mandala ─────────────────────────────── */
function MandalaBg({ opacity = .04 }) {
  const spokes = Array.from({length:12},(_,i)=>i);
  const dots   = Array.from({length:8},(_,i)=>i);
  return (
    <svg width="700" height="700" viewBox="0 0 500 500" style={{opacity, pointerEvents:"none"}}>
      {[200,155,110,70,35].map(r=>(
        <circle key={r} cx="250" cy="250" r={r} fill="none" stroke="#E8600A" strokeWidth=".8"/>
      ))}
      {spokes.map(i=>{
        const a=(i*30*Math.PI)/180;
        return <line key={i} x1="250" y1="250"
          x2={250+200*Math.cos(a)} y2={250+200*Math.sin(a)}
          stroke="#E8600A" strokeWidth=".5" suppressHydrationWarning />;
      })}
      {dots.map(i=>{
        const a=(i*45*Math.PI)/180;
        return <circle key={i} cx={250+175*Math.cos(a)} cy={250+175*Math.sin(a)} r="5" fill="#E8600A"/>;
      })}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*  Main Component                                                  */
/* ═══════════════════════════════════════════════════════════════ */
export default function HomeClient() {
  const features: Feature[] = [
    { icon: "hub",    color:"#E8600A", bg:"#FEF3E8", title:"Study Content Hub",    desc:"Upload and discover notes, PDFs, images, and links across every subject. Manual moderation ensures only quality reaches you." },
    { icon: "search", color:"#D97706", bg:"#FFFBEB", title:"Smart Search & Filters",desc:"Keyword search combined with filters for subject, content type, and course level — find exactly what you need in seconds." },
    { icon: "qa",    color:"#7C3AED", bg:"#F5F3FF", title:"Community Q&A",         desc:"Ask questions, post detailed answers with images, upvote the best responses, and mark 'Best Answers' to help future learners." },
    { icon: "thread", color:"#059669", bg:"#ECFDF5", title:"Threaded Discussions",  desc:"Deep, organised conversations under every question and answer. No insight ever gets lost in the noise." },
    { icon: "dash",   color:"#2563EB", bg:"#EFF6FF", title:"Personal Dashboard",    desc:"Bookmark content, track your uploads, view your question history, and monitor your engagement stats — all in one place." },
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
    { icon: "book",   color:"#E8600A", badge:"Most Common",    title:"Semester Exam Preppers",   desc:"Crunch time? Find chapter-wise notes, past papers, and solved Q&As for your exact syllabus — all moderated for quality." },
    { icon: "stack",  color:"#7C3AED", badge:"Contribute",      title:"Note Sharers & Toppers",   desc:"Already have great notes? Upload them, gain reputation, and help thousands of peers while building your academic profile." },
    { icon: "qa",     color:"#059669", badge:"Get Unstuck",     title:"Doubt Clearers",           desc:"Stuck on a concept at midnight? Post your question and get answers from students who've been through the same syllabus." },
    { icon: "chart",  color:"#2563EB", badge:"Beyond Degree",   title:"Placement & Exam Aspirants", desc:"Preparing for GATE, CAT, or campus placements? Find structured, peer-curated content alongside your regular coursework." },
  ];

  const steps = [
    { num:"01", emoji:"🎓", title:"Create Your Account",       desc:"Sign up in seconds with Google, GitHub, or email. Select your university, college, and courses." },
    { num:"02", emoji:"📖", title:"Discover or Contribute",    desc:"Browse thousands of resources tailored to your exact syllabus, or upload your own notes and PDFs." },
    { num:"03", emoji:"🚀", title:"Engage & Grow",             desc:"Ask doubts, answer questions, earn upvotes, and build your academic reputation in the community." },
  ];

  const stats = [
    { value:"50K+",  label:"Students Joined" },
    { value:"200+",  label:"Colleges Listed" },
    { value:"1L+",   label:"Resources Shared" },
    { value:"98%",   label:"Quality Rate" },
  ];

  const tickerItems = [
    "Study Content Hub", "Community Q&A", "Smart Search", "Threaded Discussions",
    "Personal Dashboard", "Manual Moderation", "Dark Mode", "Fully Responsive", "Bookmark Anything",
  ];

  return (
    <>
      <NavbarPublic/>
      {/* ── HERO ────────────────────────────────────────────────── */}
      <section style={{
        minHeight:"100vh", display:"flex", alignItems:"center",
        padding:"120px 32px 80px",
        background:`linear-gradient(135deg, ${C.cream} 0%, #FEF3E8 55%, ${C.cream} 100%)`,
        position:"relative", overflow:"hidden",
      }}>
        {/* mandala decoration */}
        <div style={{position:"absolute", right:-120, top:"50%", transform:"translateY(-50%)", pointerEvents:"none"}}>
          <MandalaBg opacity={.05}/>
        </div>
        <div style={{position:"absolute", left:-200, bottom:-100, pointerEvents:"none"}}>
          <MandalaBg opacity={.03}/>
        </div>

        <div style={{maxWidth:1200, margin:"0 auto", width:"100%", display:"flex", alignItems:"center", gap:60, flexWrap:"wrap"}} className="hero-flex">
          {/* left */}
          <div style={{flex:"1 1 480px"}} className="fade-up">
            <div style={{
              display:"inline-flex", alignItems:"center", gap:8,
              background:"rgba(232,96,10,.08)", borderRadius:50,
              padding:"8px 20px", marginBottom:28,
              border:"1px solid rgba(232,96,10,.18)",
            }}>
              <span style={{fontSize:14, color:C.saffron}}>★</span>
              <span style={{color:C.saffron, fontWeight:600, fontSize:14}}>Built Exclusively for College Students</span>
            </div>

            <h1 style={{fontFamily:"var(--font-display)", fontSize:66, lineHeight:1.08, color:C.indigo, marginBottom:24}} className="hero-title">
              Every Student<br/>
              Deserves <span className="grad-text">Better</span><br/>
              Resources
            </h1>

            <p style={{fontSize:18, lineHeight:1.75, color:C.stone, marginBottom:40, maxWidth:490}}>
              Prabodhika is designed from the ground up for Indian college students —
              your notes, your doubts, your community. One clean platform, zero chaos, completely free.
            </p>

            <div style={{display:"flex", gap:16, flexWrap:"wrap", marginBottom:52}}>
              <a href="/login"     className="btn-primary">Start Learning Free <span>→</span></a>
              <a href="#features" className="btn-ghost">Explore Features</a>
            </div>

            {/* stats strip */}
            <div style={{display:"flex", gap:36, flexWrap:"wrap"}}>
              {stats.map(s => (
                <div key={s.value}>
                  <div style={{fontFamily:"var(--font-display)", fontSize:30, color:C.saffron, lineHeight:1}}>{s.value}</div>
                  <div style={{fontSize:13, color:C.muted, fontWeight:500, marginTop:4}}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* right illustration */}
          <div className="hero-illus float" style={{flex:"0 0 440px", display:"flex", justifyContent:"center"}}>
            <HeroIllus/>
          </div>
        </div>
      </section>

      {/* ── TICKER MARQUEE ──────────────────────────────────────── */}
      <div style={{
        background:"linear-gradient(120deg,#E8600A,#F59E0B)",
        padding:"14px 0", overflow:"hidden",
      }}>
        <div style={{display:"flex", whiteSpace:"nowrap"}} className="ticker-track">
          {[...tickerItems,...tickerItems].map((t,i)=>(
            <span key={i} style={{
              color:"white", fontWeight:600, fontSize:14, padding:"0 28px",
              display:"inline-flex", alignItems:"center", gap:12,
            }}>
              {t}
              <span style={{opacity:.5, fontSize:10}}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── PROBLEM SECTION ─────────────────────────────────────── */}
      <section style={{padding:"100px 32px", background:C.indigo, position:"relative", overflow:"hidden"}}>
        {/* orb decorations */}
        <div style={{position:"absolute",top:-80,right:-80,width:350,height:350,borderRadius:"50%",background:"rgba(232,96,10,.07)"}}/>
        <div style={{position:"absolute",bottom:-120,left:-80,width:450,height:450,borderRadius:"50%",background:"rgba(245,158,11,.05)"}}/>

        <div style={{maxWidth:1100, margin:"0 auto", textAlign:"center", position:"relative", zIndex:1}}>
          <span style={{color:C.amber, fontWeight:600, fontSize:13, letterSpacing:3, textTransform:"uppercase"}}>The Challenge</span>
          <h2 style={{fontFamily:"var(--font-display)", fontSize:48, color:"white", margin:"14px 0 18px"}} className="section-title">
            The Problem <span className="grad-text">We Solve</span>
          </h2>
          <p style={{color:"rgba(255,255,255,.55)", fontSize:18, maxWidth:580, margin:"0 auto 60px"}}>
            Indian students juggle four platforms just to find one good note.
            We fix that with one unified hub.
          </p>

          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(230px, 1fr))", gap:24}}>
            {[
              { e:"💬", title:"Notes on WhatsApp",   desc:"Critical study material buried in group chats — impossible to find when exams loom." },
              { e:"📁", title:"PDFs on Telegram",    desc:"Files scattered across channels with zero organisation, search, or quality control." },
              { e:"❓", title:"Doubts Everywhere",   desc:"Switching between five apps for doubt-clearing wastes precious study hours." },
              { e:"😰", title:"Exam Stress",         desc:"Fragmented resources add unnecessary anxiety right when students need calm." },
            ].map(p => (
              <div key={p.title} className="problem-card" style={{textAlign:"left"}}>
                <div style={{fontSize:34, marginBottom:18}}>{p.e}</div>
                <h3 style={{color:"white", fontSize:18, fontWeight:700, marginBottom:10}}>{p.title}</h3>
                <p style={{color:"rgba(255,255,255,.48)", fontSize:14, lineHeight:1.65}}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────────────── */}
      <section id="features" style={{padding:"110px 32px", background:C.cream}}>
        <div style={{maxWidth:1200, margin:"0 auto"}}>
          <div style={{textAlign:"center", marginBottom:68}}>
            <span style={{color:C.saffron, fontWeight:600, fontSize:13, letterSpacing:3, textTransform:"uppercase"}}>Everything You Need</span>
            <h2 style={{fontFamily:"var(--font-display)", fontSize:48, color:C.indigo, margin:"14px 0 18px"}} className="section-title">
              One Platform. <span className="grad-text">Infinite Knowledge.</span>
            </h2>
            <p style={{color:C.muted, fontSize:18, maxWidth:500, margin:"0 auto"}}>
              Five powerful features that transform how 50,000+ students study.
            </p>
          </div>

          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(330px, 1fr))", gap:28}}>
            {features.map(f => (
              <div key={f.title} className="feature-card">
                <div style={{
                  width:54, height:54, borderRadius:16, background:f.bg,
                  display:"flex", alignItems:"center", justifyContent:"center", marginBottom:22,
                }}>
                  <Icon name={f.icon} color={f.color} size={26}/>
                </div>
                <h3 style={{fontSize:20, fontWeight:700, color:C.indigo, marginBottom:12}}>{f.title}</h3>
                <p style={{color:C.muted, fontSize:15, lineHeight:1.72}}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────── */}
      <section id="how-it-works" style={{padding:"110px 32px", background:`linear-gradient(180deg,#FEF3E8 0%,${C.cream} 100%)`}}>
        <div style={{maxWidth:980, margin:"0 auto", textAlign:"center"}}>
          <span style={{color:C.saffron, fontWeight:600, fontSize:13, letterSpacing:3, textTransform:"uppercase"}}>Simple Process</span>
          <h2 style={{fontFamily:"var(--font-display)", fontSize:48, color:C.indigo, margin:"14px 0 16px"}} className="section-title">
            Up &amp; Running in <span className="grad-text">3 Steps</span>
          </h2>
          <p style={{color:C.muted, fontSize:18, maxWidth:440, margin:"0 auto"}}>
            Zero friction onboarding — study smarter within minutes.
          </p>

          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))", gap:48, marginTop:72, position:"relative"}}>
            {steps.map((step, idx) => (
              <div key={step.num} style={{textAlign:"center", position:"relative"}}>
                {idx < steps.length - 1 && (
                  <div className="mobile-hide" style={{
                    position:"absolute", top:38, left:"62%", width:"76%", height:2,
                    background:`linear-gradient(90deg,${C.saffron},transparent)`,
                    zIndex:0,
                  }}/>
                )}
                <div style={{
                  width:80, height:80, margin:"0 auto 28px",
                  background:`linear-gradient(135deg,${C.saffron},${C.amber})`,
                  borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:34, boxShadow:`0 8px 28px rgba(232,96,10,.28)`,
                  position:"relative", zIndex:1,
                }}>
                  {step.emoji}
                </div>
                <div style={{color:C.saffron, fontWeight:800, fontSize:13, letterSpacing:3, marginBottom:10}}>{step.num}</div>
                <h3 style={{fontSize:22, fontWeight:700, color:C.indigo, marginBottom:12}}>{step.title}</h3>
                <p style={{color:C.muted, lineHeight:1.72}}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ────────────────────────────────────────── */}
      <section id="audience" style={{padding:"110px 32px", background:C.cream}}>
        <div style={{maxWidth:1100, margin:"0 auto"}}>
          <div style={{textAlign:"center", marginBottom:64}}>
            <span style={{color:C.saffron, fontWeight:600, fontSize:13, letterSpacing:3, textTransform:"uppercase"}}>Built For Every Student</span>
            <h2 style={{fontFamily:"var(--font-display)", fontSize:48, color:C.indigo, margin:"14px 0"}} className="section-title">
              Whatever Stage <span className="grad-text">You&apos;re At</span>
            </h2>
            <p style={{color:C.muted, fontSize:17, maxWidth:500, margin:"0 auto"}}>
              From first-year orientation week to final-semester placement drives —
              Prabodhika grows with you.
            </p>
          </div>

          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))", gap:26}}>
            {audience.map(a => (
              <div key={a.title} className="audience-card">
                <div style={{
                  display:"inline-block",
                  background:`${a.color}12`,
                  color:a.color,
                  fontSize:11, fontWeight:700, letterSpacing:2, textTransform:"uppercase",
                  padding:"5px 14px", borderRadius:50,
                  marginBottom:20,
                  border:`1px solid ${a.color}22`,
                }}>
                  {a.badge}
                </div>
                <div style={{
                  width:52, height:52, borderRadius:14,
                  background:`${a.color}10`,
                  display:"flex", alignItems:"center", justifyContent:"center", marginBottom:18,
                }}>
                  <Icon name={a.icon} color={a.color} size={24}/>
                </div>
                <h3 style={{fontSize:20, fontWeight:700, color:C.indigo, marginBottom:12}}>{a.title}</h3>
                <p style={{color:C.muted, lineHeight:1.72, fontSize:15}}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHECKLIST STRIP ─────────────────────────────────────── */}
      <section style={{padding:"90px 32px", background:C.indigo}}>
        <div style={{maxWidth:1100, margin:"0 auto"}}>
          <h2 style={{fontFamily:"var(--font-display)", fontSize:38, color:"white", textAlign:"center", marginBottom:50}}>
            Everything Checked Off ✅
          </h2>
          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))", gap:16}}>
            {checks.map(c => (
              <div key={c} className="check-row">
                <div style={{
                  width:30, height:30, borderRadius:"50%", flexShrink:0,
                  background:`linear-gradient(135deg,${C.saffron},${C.amber})`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                }}>
                  <Icon name="check" color="white" size={14}/>
                </div>
                <span style={{color:"rgba(255,255,255,.85)", fontSize:15, fontWeight:500}}>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES STRIP ────────────────────────────────────────── */}
      <section style={{padding:"90px 32px", background:"#FEF3E8"}}>
        <div style={{maxWidth:1100, margin:"0 auto"}}>
          <div style={{textAlign:"center", marginBottom:56}}>
            <h2 style={{fontFamily:"var(--font-display)", fontSize:42, color:C.indigo}} className="section-title">
              Our <span className="grad-text">Promise</span>
            </h2>
          </div>
          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))", gap:24}}>
            {([
              { icon:"star", color:C.saffron, title:"Quality First",      desc:"Every uploaded resource is reviewed by a human moderator before going live." },
              { icon:"thread", color:"#7C3AED", title:"Community Driven", desc:"Students help students. The best content rises to the top through upvotes." },
              { icon:"lock", color:"#059669",  title:"Privacy Aware",     desc:"We collect only what is necessary and will never sell your data — period." },
              { icon:"bell", color:"#2563EB",  title:"Always Improving",  desc:"Built for 100,000+ users with performance and scalability at the core." },
            ] satisfies IconCard[]).map(v => (
              <div key={v.title} style={{
                background:"white", borderRadius:20, padding:"30px 24px",
                border:"1px solid #f0ebe4",
                boxShadow:"0 2px 12px rgba(0,0,0,.04)",
              }}>
                <div style={{
                  width:48, height:48, borderRadius:14,
                  background:`${v.color}12`,
                  display:"flex", alignItems:"center", justifyContent:"center", marginBottom:18,
                }}>
                  <Icon name={v.icon} color={v.color} size={22}/>
                </div>
                <h3 style={{fontSize:18, fontWeight:700, color:C.indigo, marginBottom:10}}>{v.title}</h3>
                <p style={{color:C.muted, fontSize:14, lineHeight:1.7}}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section id="join" style={{
        padding:"130px 32px", textAlign:"center",
        background:C.cream, position:"relative", overflow:"hidden",
      }}>
        <div style={{position:"absolute",top:-60,left:-60,width:280,height:280,borderRadius:"50%",background:"rgba(232,96,10,.06)"}}/>
        <div style={{position:"absolute",bottom:-100,right:-60,width:380,height:380,borderRadius:"50%",background:"rgba(245,158,11,.07)"}}/>

        <div style={{maxWidth:680, margin:"0 auto", position:"relative", zIndex:1}}>
          <div style={{fontSize:52, marginBottom:22}}>🎓</div>
          <h2 style={{fontFamily:"var(--font-display)", fontSize:54, color:C.indigo, lineHeight:1.12, marginBottom:24}} className="section-title">
            Your Degree Is Hard.<br/><span className="grad-text">Finding Notes Shouldn&apos;t Be.</span>
          </h2>
          <p style={{fontSize:18, color:C.stone, marginBottom:52, lineHeight:1.75}}>
            50,000+ students across India have already ditched the WhatsApp chaos.
            Join them — upload your first note or ask your first doubt in under two minutes.
          </p>
          <div style={{display:"flex", gap:18, justifyContent:"center", flexWrap:"wrap"}}>
            <a href="/login" className="btn-primary" style={{fontSize:18, padding:"16px 44px"}}>Find My Notes — It&apos;s Free</a>
            <a href="#features" className="btn-ghost" style={{fontSize:18, padding:"15px 44px"}}>See All Features</a>
          </div>
          <p style={{color:C.muted, fontSize:14, marginTop:28}}>
            No credit card &nbsp;·&nbsp; No ads &nbsp;·&nbsp; Core features free forever
          </p>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <Footer/>
    </>
  );
}
