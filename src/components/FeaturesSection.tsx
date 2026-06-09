"use client";
import { useRef, useCallback, MouseEvent } from "react";
import { motion, useInView } from "framer-motion";
import PhoneFrame from "./PhoneFrame";

const CITIES = [
  { name: "New York", count: "1,240" },
  { name: "London",   count: "980"   },
  { name: "Tokyo",    count: "760"   },
  { name: "Dubai",    count: "590"   },
  { name: "Sydney",   count: "420"   },
  { name: "Prague",   count: "340"   },
];
const FIRMS = ["FTMO", "MFF", "Apex", "E8"];

// 200×414 matches iPhone 1125:2436 ratio with PhoneFrame frame padding — no cropping
const PHONE_W = 200;
const PHONE_H = 414;

function BentoCard({ children, className = "", delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const onMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, []);
  return (
    <motion.div ref={ref} className={`bc ${className}`} onMouseMove={onMove}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay }}>
      {children}
    </motion.div>
  );
}

export default function FeaturesSection() {
  return (
    <section className="section" id="features">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}>
          <span className="section-label">Features</span>
          <h2 className="bento-headline">Everything you need.<br />
            <span className="bento-headline-em">Nothing you don&apos;t.</span></h2>
          <p className="bento-sub">Built for prop firm and futures traders — not a generic social network.</p>
        </motion.div>

        <div className="bento-grid">
          {/* 01 Trade Cards */}
          <BentoCard className="bc-trade" delay={0}>
            <div className="bc-inner">
              <div className="bc-copy">
                <span className="bc-num">01</span>
                <h3 className="bc-title">Trade Cards</h3>
                <p className="bc-desc">Not just screenshots. Structured data with instrument, entry, exit, SL/TP and RR ratio — every trade tells the full story.</p>
                <div className="bc-tag"><span className="bc-tag-dot" />Not just text posts</div>
              </div>
              <div className="bc-phone-wrap">
                <PhoneFrame src="/feed.PNG" alt="Trade feed" width={PHONE_W} height={PHONE_H} />
              </div>
            </div>
          </BentoCard>

          {/* 02 Verified */}
          <BentoCard className="bc-verified" delay={0.08}>
            <div className="bc-inner bc-inner--col">
              <div className="bc-copy">
                <span className="bc-num">02</span>
                <h3 className="bc-title">Verified Trades</h3>
                <p className="bc-desc">MyFXBook sync gives every imported trade a verification badge. No more fake results.</p>
                <div className="bc-verify-badge">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  MyFXBook verified
                </div>
              </div>
              <div className="bc-phone-wrap" style={{ alignSelf: "center" }}>
                <PhoneFrame src="/tradecard_detail.PNG" alt="Trade detail" width={PHONE_W} height={PHONE_H} />
              </div>
            </div>
          </BentoCard>

          {/* 03 Traders Map */}
          <BentoCard className="bc-map" delay={0.14}>
            <div className="bc-map-inner">
              <div className="bc-map-copy">
                <div className="bc-live"><span className="bc-live-dot" />LIVE</div>
                <span className="bc-num">03</span>
                <h3 className="bc-title bc-title--xl">Traders Map</h3>
                <p className="bc-desc bc-desc--wide">Discover traders near you on an interactive globe. See who&apos;s trading in your city. Ghost Mode keeps you invisible.</p>
                <div className="bc-city-chips">
                  {CITIES.map(({ name, count }) => (
                    <div key={name} className="bc-city-chip"><span className="bc-city-dot" />{name}&nbsp;·&nbsp;{count}</div>
                  ))}
                </div>
              </div>
              <div className="bc-map-visual">
                <div className="bc-globe-halo" />
                <PhoneFrame src="/map.PNG" alt="Traders Map" width={PHONE_W} height={PHONE_H} />
              </div>
            </div>
          </BentoCard>

          {/* 04 Funded Badge */}
          <BentoCard className="bc-funded" delay={0.06}>
            <div className="bc-inner bc-inner--col">
              <span className="bc-num">04</span>
              <div className="bc-trophy">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2DD4BF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
                </svg>
              </div>
              <div className="bc-copy">
                <h3 className="bc-title">Funded Trader Badge</h3>
                <p className="bc-desc">Upload your prop firm certificate and payout proof. We verify it manually.</p>
              </div>
              <div className="bc-firms">{FIRMS.map((f) => <span key={f} className="bc-firm">{f}</span>)}</div>
            </div>
          </BentoCard>

          {/* 05 Communities */}
          <BentoCard className="bc-communities" delay={0.12}>
            <div className="bc-inner bc-inner--col">
              <div className="bc-copy">
                <span className="bc-num">05</span>
                <h3 className="bc-title">Communities</h3>
                <p className="bc-desc">Public or private trading communities with built-in chat, bias polls and moderator roles.</p>
                <div className="bc-tag"><span className="bc-tag-dot" />Public &amp; private</div>
              </div>
              <div className="bc-phone-wrap" style={{ alignSelf: "center" }}>
                <PhoneFrame src="/community.PNG" alt="Communities" width={PHONE_W} height={PHONE_H} />
              </div>
            </div>
          </BentoCard>

          {/* 06 Profile Stats */}
          <BentoCard className="bc-stats" delay={0.18}>
            <div className="bc-inner bc-inner--col">
              <div className="bc-copy">
                <span className="bc-num">06</span>
                <h3 className="bc-title">Profile Stats</h3>
                <p className="bc-desc">Average R, profit factor, trade count — your real track record visible on your profile.</p>
              </div>
              <div className="bc-phone-wrap" style={{ alignSelf: "center" }}>
                <PhoneFrame src="/prifle.PNG" alt="Profile stats" width={PHONE_W} height={PHONE_H} />
              </div>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
