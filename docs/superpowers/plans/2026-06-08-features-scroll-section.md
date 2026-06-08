# Features Scroll Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the 3×2 feature card grid + Mapbox globe with a scroll-driven storytelling section: sticky left timeline nav + animated right panels, pure CSS globe, no Mapbox.

**Architecture:** A 600vh scroll container holds a `position:sticky` inner at 100vh. Framer Motion `useScroll` tracks progress and drives both the active panel state (via `useMotionValueEvent`) and globe drift (via `useTransform`). `AnimatePresence mode="wait"` handles panel transitions.

**Tech Stack:** Next.js App Router, Framer Motion 12, CSS custom properties, Next.js `<Image>` for phone screenshots.

---

## File Map

| File | Action |
|------|--------|
| `src/components/CSSGlobe.tsx` | **Create** — pure CSS animated globe, accepts scroll-driven `driftX` MotionValue |
| `src/components/FeaturesSection.tsx` | **Create** — scroll container, sticky layout, left nav, panel switcher |
| `src/app/globals.css` | **Modify** — remove `.feat-grid-*` and `.feat-globe-*` (lines 665–843), add new `.features-*` and `.feat-nav-*` and `.feat-panel-*` classes |
| `src/app/page.tsx` | **Modify** — swap imports and JSX |
| `src/components/FeatureCards.tsx` | **Delete** |
| `src/components/FeaturesGlobe.tsx` | **Delete** |
| `src/components/TradersMap.tsx` | **Delete** |

---

## Task 1: Create CSSGlobe component

**Files:**
- Create: `src/components/CSSGlobe.tsx`

- [ ] **Step 1: Create the file**

```tsx
"use client";
import { motion, MotionValue } from "framer-motion";

const ACCENT = "#2DD4BF";

const CITIES = [
  { name: "New York", x: "26%", y: "37%", count: "1,240" },
  { name: "London",   x: "44%", y: "29%", count: "980"   },
  { name: "Prague",   x: "49%", y: "26%", count: "340"   },
  { name: "Dubai",    x: "59%", y: "43%", count: "590"   },
  { name: "Tokyo",    x: "73%", y: "32%", count: "760"   },
  { name: "Sydney",   x: "75%", y: "64%", count: "420"   },
];

interface Props {
  driftX: MotionValue<string>;
}

export default function CSSGlobe({ driftX }: Props) {
  return (
    <div className="css-globe-outer">
      <div className="css-globe">
        {/* Latitude/longitude grid — drifts on scroll */}
        <motion.div className="css-globe-grid" style={{ x: driftX }} />

        {/* City dots + labels — move with grid */}
        <motion.div className="css-globe-cities" style={{ x: driftX }}>
          {CITIES.map(({ name, x, y, count }) => (
            <div key={name} className="css-globe-city" style={{ left: x, top: y }}>
              <div className="css-globe-city-halo" />
              <div className="css-globe-city-dot" />
              <div className="css-globe-city-label">{name} · {count}</div>
            </div>
          ))}
        </motion.div>

        {/* Depth atmosphere — static overlay */}
        <div className="css-globe-atmo" />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify it compiles**

```bash
cd groovx-web && npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
cd groovx-web
git add src/components/CSSGlobe.tsx
git commit -m "feat: add pure CSS animated globe component"
```

---

## Task 2: Add CSS for CSSGlobe

**Files:**
- Modify: `src/app/globals.css` (append before final `}` of last `@media` block or at end of file)

- [ ] **Step 1: Append globe CSS to globals.css**

Add this block at the end of `globals.css`, before any closing media query or at the very bottom:

```css
/* ── CSS GLOBE ── */
.css-globe-outer {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.css-globe {
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: radial-gradient(circle at 32% 32%, #1a3d52 0%, #0d1f2d 45%, #0d1117 100%);
  border: 1.5px solid rgba(45,212,191,0.3);
  box-shadow:
    0 0 60px rgba(45,212,191,0.12),
    0 0 120px rgba(45,212,191,0.05),
    inset -12px -12px 30px rgba(0,0,0,0.6);
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
}

.css-globe-grid {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background:
    repeating-linear-gradient(
      0deg, transparent, transparent 22px,
      rgba(45,212,191,0.08) 22px, rgba(45,212,191,0.08) 23px
    ),
    repeating-linear-gradient(
      90deg, transparent, transparent 28px,
      rgba(45,212,191,0.06) 28px, rgba(45,212,191,0.06) 29px
    );
  /* scroll-driven drift applied via Framer Motion style.x */
}

.css-globe-cities {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  overflow: hidden;
}

.css-globe-city {
  position: absolute;
  transform: translate(-50%, -50%);
}

.css-globe-city-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #2DD4BF;
  box-shadow: 0 0 8px #2DD4BF, 0 0 16px rgba(45,212,191,0.4);
  position: relative;
  z-index: 2;
}

.css-globe-city-halo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1.5px solid rgba(45,212,191,0.4);
  animation: globe-pulse 2.5s ease-out infinite;
}

@keyframes globe-pulse {
  0%   { transform: translate(-50%,-50%) scale(0.5); opacity: 0.8; }
  100% { transform: translate(-50%,-50%) scale(2.2); opacity: 0; }
}

.css-globe-city-label {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  font-family: var(--font-space-mono), monospace;
  font-size: 9px;
  font-weight: 600;
  color: #2DD4BF;
  background: rgba(13,17,23,0.88);
  border: 1px solid rgba(45,212,191,0.25);
  border-radius: 20px;
  padding: 2px 7px;
  pointer-events: none;
}

.css-globe-atmo {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background:
    radial-gradient(circle at 28% 28%, rgba(45,212,191,0.07) 0%, transparent 55%),
    radial-gradient(circle at 75% 72%, rgba(0,0,0,0.7) 0%, transparent 55%);
  pointer-events: none;
}
```

- [ ] **Step 2: Verify CSS is valid (dev server starts)**

```bash
cd groovx-web && npm run dev &
sleep 4 && curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
```
Expected: `200`

- [ ] **Step 3: Kill dev server and commit**

```bash
kill %1 2>/dev/null; cd groovx-web
git add src/app/globals.css
git commit -m "feat: add CSS globe styles"
```

---

## Task 3: Create FeaturesSection component

**Files:**
- Create: `src/components/FeaturesSection.tsx`

- [ ] **Step 1: Create the file**

```tsx
"use client";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import CSSGlobe from "./CSSGlobe";
import FadeIn from "./FadeIn";

type PanelVisual = "phone" | "phone-zoom" | "globe" | "badge";

type Panel = {
  num: string;
  title: string;
  desc: string;
  badgeText?: string;
  visual: PanelVisual;
  src?: string;
  cities?: { name: string; count: string }[];
};

const PANELS: Panel[] = [
  {
    num: "01",
    title: "Trade Cards",
    desc: "Not just text posts. Structured trade data with instrument, entry, exit, SL/TP, RR ratio and chart screenshot. Every trade tells the full story.",
    badgeText: "Not just text posts",
    visual: "phone",
    src: "/feed.PNG",
  },
  {
    num: "02",
    title: "Verified Trades",
    desc: "Connect your MyFXBook account and every imported trade gets a verification badge. No more fake results.",
    badgeText: "✓ MyFXBook verified",
    visual: "phone-zoom",
    src: "/tradecard_detail.PNG",
  },
  {
    num: "03",
    title: "Traders Map",
    desc: "Discover traders near you on an interactive globe. See who's trading in your city. Ghost Mode keeps you invisible if you prefer.",
    visual: "globe",
    cities: [
      { name: "New York", count: "1,240" },
      { name: "London",   count: "980"   },
      { name: "Tokyo",    count: "760"   },
      { name: "Dubai",    count: "590"   },
      { name: "Sydney",   count: "420"   },
      { name: "Prague",   count: "340"   },
    ],
  },
  {
    num: "04",
    title: "Funded Trader Badge",
    desc: "Upload your prop firm certificate and payout proof. We verify it manually. Your profile shows the world you're the real deal.",
    badgeText: "Manually verified",
    visual: "badge",
  },
  {
    num: "05",
    title: "Communities",
    desc: "Create or join trading communities. Public or private. Built-in chat, bias polls and moderator roles.",
    badgeText: "Public & private",
    visual: "phone",
    src: "/community.PNG",
  },
  {
    num: "06",
    title: "Profile Stats",
    desc: "Your trading track record on your profile. Average R, profit factor, trade count. Stats that actually mean something.",
    badgeText: "Real track record",
    visual: "phone",
    src: "/prifle.PNG",
  },
];

const TRANSITION = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.28 } },
};

function PhoneVisual({ src, zoom }: { src: string; zoom?: boolean }) {
  return (
    <div className={`feat-panel-phone ${zoom ? "feat-panel-phone--zoom" : ""}`}>
      <Image src={src} alt="" fill sizes="160px" style={{ objectFit: "cover", objectPosition: zoom ? "center" : "top" }} />
    </div>
  );
}

function BadgeVisual() {
  return (
    <div className="feat-panel-badge-visual">
      <div className="feat-panel-badge-circle">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2DD4BF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="7"/>
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
        </svg>
      </div>
      <div className="feat-panel-badge-label">FTMO · $100k FUNDED</div>
      <div className="feat-panel-badge-sub">Manually verified</div>
    </div>
  );
}

export default function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePanel, setActivePanel] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Globe drift: as panel 3 (index 2) scrolls in, shift grid by 140px
  const driftX = useTransform(scrollYProgress, [2 / 6, 3 / 6], ["0px", "-140px"]);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      setActivePanel(Math.min(5, Math.floor(v * 6)));
    });
  }, [scrollYProgress]);

  const panel = PANELS[activePanel];

  return (
    <section className="section" id="features">
      {/* Normal-flow header */}
      <div className="container">
        <FadeIn><span className="section-label">Features</span></FadeIn>
        <FadeIn delay={0.1}>
          <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, maxWidth: 680, letterSpacing: "-0.03em" }}>
            Everything you need.<br />Nothing you don&apos;t.
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p style={{ fontSize: 17, color: "var(--text-secondary)", maxWidth: 520, marginTop: 16, lineHeight: 1.7 }}>
            Built specifically for prop firm and futures traders — not a generic social network.
          </p>
        </FadeIn>
      </div>

      {/* Scroll container — 600vh tall */}
      <div className="features-scroll" ref={containerRef}>
        {/* Sticky inner */}
        <div className="features-sticky">
          <div className="features-layout container">

            {/* Left: timeline nav */}
            <nav className="feat-nav" aria-label="Features navigation">
              {PANELS.map((p, i) => (
                <div key={p.num} className={`feat-nav-item${i === activePanel ? " feat-nav-item--active" : ""}`}>
                  <div className="feat-nav-track">
                    <div className="feat-nav-dot" />
                    {i < PANELS.length - 1 && (
                      <div className={`feat-nav-line${i < activePanel ? " feat-nav-line--filled" : ""}`} />
                    )}
                  </div>
                  <div className="feat-nav-text">
                    <span className="feat-nav-num">{p.num}</span>
                    {p.title}
                  </div>
                </div>
              ))}
            </nav>

            {/* Right: animated panel */}
            <div className="feat-panel">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePanel}
                  className="feat-panel-inner"
                  initial={TRANSITION.initial}
                  animate={TRANSITION.animate}
                  exit={TRANSITION.exit}
                >
                  {/* Visual */}
                  <div className="feat-panel-visual">
                    {panel.visual === "phone" && panel.src && (
                      <PhoneVisual src={panel.src} />
                    )}
                    {panel.visual === "phone-zoom" && panel.src && (
                      <PhoneVisual src={panel.src} zoom />
                    )}
                    {panel.visual === "globe" && (
                      <CSSGlobe driftX={driftX} />
                    )}
                    {panel.visual === "badge" && <BadgeVisual />}
                  </div>

                  {/* Text */}
                  <div className="feat-panel-text">
                    <span className="feat-panel-num">{panel.num} / 06</span>
                    <h3 className="feat-panel-title">{panel.title}</h3>
                    <p className="feat-panel-desc">{panel.desc}</p>
                    {panel.badgeText && (
                      <div className="feat-panel-tag">
                        <span className="feat-panel-tag-dot" />
                        {panel.badgeText}
                      </div>
                    )}
                    {panel.cities && (
                      <div className="feat-panel-chips">
                        {panel.cities.map(({ name, count }) => (
                          <div key={name} className="feat-panel-chip">
                            <span className="feat-panel-chip-dot" />
                            {name} · {count}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: TypeScript check**

```bash
cd groovx-web && npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
cd groovx-web
git add src/components/FeaturesSection.tsx
git commit -m "feat: add scroll-driven FeaturesSection component"
```

---

## Task 4: Add FeaturesSection CSS to globals.css

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Append FeaturesSection styles to globals.css**

Add at the end of `globals.css`:

```css
/* ── FEATURES SCROLL SECTION ── */
.features-scroll {
  height: 600vh;
  position: relative;
  margin-top: 64px;
}

.features-sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  border-top: 1px solid var(--border);
}

.features-layout {
  display: flex;
  gap: 56px;
  align-items: center;
  width: 100%;
}

/* ── Left nav ── */
.feat-nav {
  display: flex;
  flex-direction: column;
  width: 200px;
  flex-shrink: 0;
}

.feat-nav-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.feat-nav-track {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.feat-nav-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--text-tertiary);
  border: 1.5px solid transparent;
  flex-shrink: 0;
  margin-top: 2px;
  transition: background 0.3s, box-shadow 0.3s, border-color 0.3s;
}

.feat-nav-item--active .feat-nav-dot {
  background: var(--accent);
  border-color: rgba(45,212,191,0.4);
  box-shadow: 0 0 12px rgba(45,212,191,0.6);
}

.feat-nav-line {
  width: 1px;
  height: 32px;
  background: var(--border);
  margin: 3px 0;
  transition: background 0.3s;
}

.feat-nav-line--filled {
  background: rgba(45,212,191,0.35);
}

.feat-nav-text {
  font-size: 13px;
  color: var(--text-tertiary);
  padding-bottom: 32px;
  line-height: 1.4;
  transition: color 0.3s;
}

.feat-nav-item--active .feat-nav-text {
  color: var(--text-primary);
  font-weight: 500;
}

.feat-nav-num {
  display: block;
  font-family: var(--font-space-mono), monospace;
  font-size: 10px;
  color: var(--text-tertiary);
  margin-bottom: 2px;
}

/* ── Right panel ── */
.feat-panel {
  flex: 1;
  min-height: 340px;
  display: flex;
  align-items: center;
}

.feat-panel-inner {
  display: flex;
  gap: 48px;
  align-items: center;
  width: 100%;
}

.feat-panel-visual {
  width: 160px;
  height: 320px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feat-panel-phone {
  width: 160px;
  height: 320px;
  border-radius: 20px;
  border: 2px solid rgba(255,255,255,0.1);
  background: var(--bg-card);
  overflow: hidden;
  position: relative;
  box-shadow: 0 24px 56px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05);
}

.feat-panel-phone--zoom img {
  transform: scale(1.25);
  transform-origin: center center;
}

.feat-panel-text {
  flex: 1;
}

.feat-panel-num {
  display: block;
  font-family: var(--font-space-mono), monospace;
  font-size: 11px;
  color: var(--text-tertiary);
  margin-bottom: 12px;
  letter-spacing: .06em;
}

.feat-panel-title {
  font-family: var(--font-manrope), sans-serif;
  font-size: clamp(24px, 3vw, 36px);
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 16px;
  letter-spacing: -0.03em;
  line-height: 1.15;
}

.feat-panel-desc {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.75;
  max-width: 420px;
}

.feat-panel-tag {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-top: 20px;
  font-size: 12px;
  font-weight: 600;
  color: var(--accent);
  background: rgba(45,212,191,0.08);
  border: 1px solid rgba(45,212,191,0.22);
  border-radius: 20px;
  padding: 5px 14px;
}

.feat-panel-tag-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--accent);
  flex-shrink: 0;
}

.feat-panel-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 20px;
}

.feat-panel-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: var(--font-space-mono), monospace;
  font-size: 10px;
  font-weight: 600;
  color: var(--accent);
  background: rgba(45,212,191,0.07);
  border: 1px solid rgba(45,212,191,0.2);
  border-radius: 20px;
  padding: 3px 10px;
}

.feat-panel-chip-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--accent);
}

/* Funded badge visual */
.feat-panel-badge-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 160px;
}

.feat-panel-badge-circle {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #1a3a2a, #0d1117);
  border: 2px solid rgba(45,212,191,0.35);
  box-shadow: 0 0 40px rgba(45,212,191,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
}

.feat-panel-badge-label {
  font-family: var(--font-space-mono), monospace;
  font-size: 11px;
  font-weight: 700;
  color: var(--accent);
  text-align: center;
  letter-spacing: .06em;
}

.feat-panel-badge-sub {
  font-size: 12px;
  color: var(--text-tertiary);
}

/* Mobile: collapse sticky layout */
@media (max-width: 768px) {
  .features-scroll { height: auto; }
  .features-sticky { position: relative; height: auto; border: none; padding: 0; }
  .features-layout { flex-direction: column; gap: 0; }
  .feat-nav { display: none; }
  .feat-panel { width: 100%; }
  .feat-panel-inner { flex-direction: column; gap: 28px; }
  .feat-panel-visual { width: 140px; height: 280px; }
  .feat-panel-phone { width: 140px; height: 280px; }
  .css-globe { width: 160px; height: 160px; }
}
```

- [ ] **Step 2: Commit**

```bash
cd groovx-web
git add src/app/globals.css
git commit -m "feat: add FeaturesSection scroll layout CSS"
```

---

## Task 5: Remove old feat-grid and feat-globe CSS

**Files:**
- Modify: `src/app/globals.css` (lines 665–843)

- [ ] **Step 1: Delete old CSS blocks**

Open `src/app/globals.css`. Find and delete the entire blocks:
- `/* ── FEATURE GRID CARDS ── */` through `.feat-grid-desc { ... }` (approx lines 665–756)
- `/* ── FEATURES GLOBE — full-width breakout ── */` through `.feat-globe-chip-dot { ... }` (approx lines 758–834)
- Also remove the responsive overrides in `@media (max-width: 900px)`:
  - `.feat-grid { grid-template-columns: repeat(2, 1fr); }`
- And in `@media (max-width: 600px)`:
  - `.feat-grid { grid-template-columns: 1fr; }`
  - `.feat-globe-map { height: 360px; }`

Use Grep to find exact line numbers first:
```bash
grep -n "FEATURE GRID CARDS\|FEATURES GLOBE\|feat-grid\|feat-globe" groovx-web/src/app/globals.css
```

- [ ] **Step 2: TypeScript + CSS check**

```bash
cd groovx-web && npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
cd groovx-web
git add src/app/globals.css
git commit -m "chore: remove old feat-grid and feat-globe CSS"
```

---

## Task 6: Update page.tsx

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Update imports**

Replace:
```tsx
import FeatureCards from "@/components/FeatureCards";
import FeaturesGlobe from "@/components/FeaturesGlobe";
```
With:
```tsx
import FeaturesSection from "@/components/FeaturesSection";
```

- [ ] **Step 2: Replace the features section JSX**

Replace this entire block:
```tsx
{/* ── FEATURES ── */}
<section className="section" id="features">
  <div className="container">
    <FadeIn><span className="section-label">Features</span></FadeIn>
    <FadeIn delay={0.1}>
      <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, maxWidth: 680, letterSpacing: "-0.03em" }}>
        Everything you need.<br />Nothing you don&apos;t.
      </h2>
    </FadeIn>
    <FadeIn delay={0.2}>
      <p style={{ fontSize: 17, color: "var(--text-secondary)", maxWidth: 520, marginTop: 16, lineHeight: 1.7 }}>
        Built specifically for prop firm and futures traders — not a generic social network.
      </p>
    </FadeIn>

    <FeatureCards />
  </div>

  {/* Full-width globe — outside container */}
  <FeaturesGlobe />
</section>
```

With:
```tsx
<FeaturesSection />
```

- [ ] **Step 3: TypeScript check**

```bash
cd groovx-web && npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
cd groovx-web
git add src/app/page.tsx
git commit -m "feat: wire FeaturesSection into page"
```

---

## Task 7: Delete old components and uninstall Mapbox

**Files:**
- Delete: `src/components/FeatureCards.tsx`
- Delete: `src/components/FeaturesGlobe.tsx`
- Delete: `src/components/TradersMap.tsx`

- [ ] **Step 1: Delete files**

```bash
cd groovx-web
rm src/components/FeatureCards.tsx
rm src/components/FeaturesGlobe.tsx
rm src/components/TradersMap.tsx
```

- [ ] **Step 2: Uninstall mapbox-gl**

```bash
cd groovx-web
npm uninstall mapbox-gl @types/mapbox-gl
```

- [ ] **Step 3: TypeScript check — no orphan imports**

```bash
cd groovx-web && npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 4: Verify dev server loads**

```bash
cd groovx-web && npm run dev &
sleep 5 && curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
kill %1
```
Expected: `200`

- [ ] **Step 5: Commit**

```bash
cd groovx-web
git add -A
git commit -m "chore: remove FeatureCards, FeaturesGlobe, TradersMap, mapbox-gl"
```

---

## Task 8: Final push

- [ ] **Step 1: Push to origin**

```bash
cd groovx-web && git push
```

---

## Self-Review

**Spec coverage check:**
- ✅ 600vh scroll container → Task 3 (FeaturesSection), Task 4 (CSS)
- ✅ Sticky 100vh inner → Task 4 `.features-sticky`
- ✅ Left nav with 6 dots + lines → Task 3 `feat-nav` markup, Task 4 CSS
- ✅ Active dot glows teal on scroll → Task 3 `useMotionValueEvent`, Task 4 `.feat-nav-item--active .feat-nav-dot`
- ✅ AnimatePresence panel transitions → Task 3 `TRANSITION` + `AnimatePresence mode="wait"`
- ✅ 6 panels with correct screenshots → Task 3 `PANELS` array
- ✅ CSS Globe — sphere, grid, city dots, drift on scroll → Tasks 1+2
- ✅ driftX tied to globe panel scroll range → Task 3 `useTransform([2/6, 3/6])`
- ✅ City chips on globe panel → Task 3 `panel.cities` JSX
- ✅ Funded badge visual → Task 3 `BadgeVisual` component
- ✅ Mapbox removed → Task 7
- ✅ Old CSS removed → Task 5
- ✅ Mobile collapses sticky → Task 4 `@media (max-width: 768px)`

**No placeholders found.**

**Type consistency:** `driftX: MotionValue<string>` defined in Task 3, consumed in Task 1 — matches. `Panel.visual` union used in Task 3 JSX switch — all 4 cases covered.
