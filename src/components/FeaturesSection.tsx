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
