"use client";

import { useState, useEffect } from "react";

export function HeroIllustration() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const cardBg    = isDark ? "#1c1a17" : "white";
  const rowBg0    = isDark ? "#2a241f" : "var(--warm-bg)";
  const rowBgN    = isDark ? "#2a241f" : "#F7F5F2";
  const rowLine   = isDark ? "#3d352e" : "#E7E5E2";
  const grey300   = isDark ? "#3d352e" : "#D4D4D4";
  const grey400   = isDark ? "#4a4340" : "#C4C4C4";
  const pillBg    = isDark ? "#2a241f" : "#F0EDEA";
  const cardText  = isDark ? "#E2E8F0" : "var(--indigo)";
  const mutedText = isDark ? "#a8a29e" : "var(--muted)";

  return (
    <svg viewBox="0 0 440 460" width="440" height="460" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--saffron)"/>
          <stop offset="100%" stopColor="var(--amber)"/>
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--saffron)" stopOpacity=".18"/>
          <stop offset="100%" stopColor="var(--saffron)" stopOpacity="0"/>
        </radialGradient>
        <filter id="cs" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="6" stdDeviation="14" floodColor="var(--saffron)" floodOpacity=".14"/>
        </filter>
        <filter id="ss" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="3" stdDeviation="8" floodColor="#000" floodOpacity=".08"/>
        </filter>
      </defs>

      {/* ambient glow */}
      <circle cx="220" cy="230" r="190" fill="url(#glow)"/>

      {/* spinning ring decoration */}
      <circle cx="220" cy="230" r="170" fill="none" stroke="var(--saffron)" strokeWidth=".6" strokeDasharray="8 14" opacity=".18"/>
      <circle cx="220" cy="230" r="130" fill="none" stroke="var(--amber)" strokeWidth=".5" strokeDasharray="5 10" opacity=".12"/>

      {/* Main Card — Content Hub */}
      <g filter="url(#cs)">
        <rect x="55" y="80" width="210" height="155" rx="20" fill={cardBg}/>
        <rect x="55" y="80" width="210" height="38" rx="20" fill="url(#hg1)" opacity=".12"/>
        <rect x="55" y="80" width="210" height="22" rx="11" fill="url(#hg1)"/>
        <text x="75" y="94" fill="white" fontSize="10" fontWeight="700" fontFamily="Outfit,sans-serif">Study Content Hub</text>
        {[0,1,2,3].map(i => (
          <g key={i} transform={`translate(72, ${116 + i*30})`}>
            <rect width="158" height="22" rx="7" fill={i===0 ? rowBg0 : rowBgN}/>
            <rect width="7" height="22" rx="3" fill={i===0 ? "var(--saffron)" : grey300}/>
            <rect x="16" y="6" width={i===0?90:60+i*10} height="4" rx="2" fill={i===0 ? "var(--saffron)" : grey400} opacity=".55"/>
            <rect x="16" y="13" width={i===0?55:40+i*5} height="3" rx="1.5" fill={grey300} opacity=".5"/>
            {i===0 && <rect x="118" y="5" width="28" height="12" rx="6" fill="var(--saffron)" opacity=".15"/>}
            {i===0 && <text x="122" y="14" fill="var(--saffron)" fontSize="7.5" fontFamily="Outfit,sans-serif" fontWeight="700">PDF</text>}
          </g>
        ))}
      </g>

      {/* Q&A Card — top right */}
      <g filter="url(#ss)" transform="translate(248,54)">
        <rect width="148" height="112" rx="18" fill={cardBg}/>
        <text x="14" y="22" fill={cardText} fontSize="9.5" fontWeight="700" fontFamily="Outfit,sans-serif">Community Q&amp;A</text>
        <rect x="14" y="30" width="120" height="10" rx="3" fill={cardText} opacity=".06"/>
        <rect x="14" y="44" width="120" height="7" rx="2.5" fill={rowBgN}/>
        <rect x="14" y="55" width="90" height="7" rx="2.5" fill={rowBgN}/>
        <rect x="14" y="70" width="40" height="14" rx="7" fill="var(--saffron)" opacity=".12"/>
        <text x="20" y="80" fill="var(--saffron)" fontSize="7.5" fontFamily="Outfit,sans-serif" fontWeight="700">Best Answer</text>
        <g transform="translate(104,66)">
          <rect width="30" height="14" rx="7" fill="url(#hg1)"/>
          <text x="7" y="10" fill="white" fontSize="8" fontFamily="Outfit,sans-serif" fontWeight="700">+24</text>
        </g>
        <rect x="14" y="90" width="66" height="7" rx="2.5" fill={rowBgN}/>
      </g>

      {/* Dashboard mini card */}
      <g filter="url(#ss)" transform="translate(32,258)">
        <rect width="160" height="122" rx="18" fill={cardBg}/>
        <text x="14" y="22" fill={cardText} fontSize="9.5" fontWeight="700" fontFamily="Outfit,sans-serif">Your Dashboard</text>
        {[42,65,38,75,55,88].map((h, i) => (
          <g key={i}>
            <rect x={14+i*22} y={90-h*.52} width="14" height={h*.52} rx="4"
              fill={i===5?"url(#hg1)":"var(--saffron)"} opacity={i===5?1:0.18+i*0.12}/>
          </g>
        ))}
        <rect x="14" y="92" width="132" height="1" rx=".5" fill={rowLine}/>
        <text x="14" y="110" fill={mutedText} fontSize="8" fontFamily="Outfit,sans-serif">7-day activity</text>
      </g>

      {/* Search pill */}
      <g filter="url(#ss)" transform="translate(202,290)">
        <rect width="178" height="48" rx="24" fill={cardBg}/>
        <circle cx="24" cy="24" r="14" fill={rowBg0}/>
        <circle cx="24" cy="23" r="5.5" fill="none" stroke="var(--saffron)" strokeWidth="1.6"/>
        <line x1="28" y1="27" x2="31.5" y2="30.5" stroke="var(--saffron)" strokeWidth="1.6" strokeLinecap="round"/>
        <rect x="48" y="17" width="96" height="6" rx="3" fill="var(--saffron)" opacity=".18"/>
        <rect x="48" y="27" width="64" height="5" rx="2.5" fill={pillBg}/>
      </g>

      {/* Notification badge */}
      <g filter="url(#ss)" transform="translate(310,196)">
        <rect width="110" height="50" rx="14" fill={cardBg}/>
        <circle cx="20" cy="25" r="12" fill={rowBg0}/>
        <text x="15" y="29.5" fontSize="12" fontFamily="sans-serif">🔔</text>
        <text x="38" y="20" fill={cardText} fontSize="9" fontWeight="700" fontFamily="Outfit,sans-serif">New Answer</text>
        <text x="38" y="32" fill={mutedText} fontSize="8" fontFamily="Outfit,sans-serif">Physics — Ch.4</text>
        <circle cx="100" cy="14" r="7" fill="url(#hg1)"/>
        <text x="97" y="18" fill="white" fontSize="8" fontWeight="700" fontFamily="sans-serif">3</text>
      </g>

      {/* decorative dots */}
      {[[380,130,5],[28,400,4],[390,370,6],[164,420,3],[400,240,4]].map(([cx,cy,r],i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="var(--saffron)" opacity={.12+i*.04}/>
      ))}
      <circle cx="58" cy="68" r="3" fill="var(--amber)" opacity=".3"/>
      <circle cx="400" cy="82" r="3" fill="var(--amber)" opacity=".25"/>
    </svg>
  );
}
