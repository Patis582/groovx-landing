import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PhoneFrame from "@/components/PhoneFrame";
import TradersMap from "@/components/TradersMap";
import PricingSection from "@/components/PricingSection";
import CTASection from "@/components/CTASection";
import FadeIn from "@/components/FadeIn";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />

      {/* ── PROBLEM ── */}
      <section className="section" id="problem">
        <div className="container">
          <FadeIn><span className="section-label">The Problem</span></FadeIn>
          <FadeIn delay={0.1}>
            <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, maxWidth: 640 }}>
              Trading is full of fake results and empty communities.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p style={{ fontSize: 17, color: "var(--text-secondary)", maxWidth: 560, marginTop: 16, lineHeight: 1.7 }}>
              Screenshots get edited. Results get exaggerated. And finding real
              traders who actually trade? Nearly impossible.{" "}
              <strong style={{ color: "var(--text-primary)" }}>GroovX fixes that.</strong>
            </p>
          </FadeIn>
          <div className="prob-rows">
            {[
              { num: "01", tag: "CREDIBILITY CRISIS", title: "Fake Screenshots", text: "Anyone can edit a P&L screenshot. Real results need verification — not just a post.", d: 0.1 },
              { num: "02", tag: "GHOST COMMUNITIES",  title: "Empty Communities", text: "Discord servers with 10k members, 3 active people, and zero signal. Trading deserves better.", d: 0.2 },
              { num: "03", tag: "ZERO LOCAL SIGNAL",  title: "No Local Network",  text: "Thousands of traders in your city with no way to find each other. The map has been empty — until now.", d: 0.3 },
            ].map((c) => (
              <FadeIn key={c.title} delay={c.d}>
                <div className="prob-row">
                  <div className="prob-row-num" aria-hidden>{c.num}</div>
                  <div className="prob-row-body">
                    <div className="prob-row-tag">{c.tag}</div>
                    <h3 className="prob-row-title">{c.title}</h3>
                    <p className="prob-row-text">{c.text}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="section" id="features">
        <div className="container">
          <FadeIn><span className="section-label">Features</span></FadeIn>
          <FadeIn delay={0.1}>
            <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 800 }}>
              Everything serious traders need.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p style={{ fontSize: 17, color: "var(--text-secondary)", maxWidth: 500, marginTop: 14, lineHeight: 1.7 }}>
              Built from the ground up for traders who care about real data, real connections, and real community.
            </p>
          </FadeIn>

          <div className="feat-rows">

            {/* 01 — Trade Cards */}
            <div className="feat-row" style={{ "--row-glow": "rgba(167,139,250,0.22)" } as React.CSSProperties}>
              <FadeIn className="feat-row-text">
                <div className="feat-row-head">
                  <span className="feat-row-num">01</span>
                  <span className="feat-row-tag">Trade Cards</span>
                </div>
                <h3 className="feat-row-title">Structured, verifiable<br />trade data.</h3>
                <p className="feat-row-desc">Not just screenshots. Entry, exit, R-multiple, direction — every trade in a structured card that anyone can read and verify. No edits, no exaggerations.</p>
              </FadeIn>
              <FadeIn delay={0.15} className="feat-row-visual">
                <PhoneFrame src="/tradecard_detail.PNG" alt="Trade card detail" width={256} height={556} glowVariant="purple" />
              </FadeIn>
            </div>

            {/* 02 — Traders Map */}
            <div className="feat-row feat-row-rev" style={{ "--row-glow": "rgba(45,212,191,0.2)" } as React.CSSProperties}>
              <FadeIn className="feat-row-text">
                <div className="feat-row-head">
                  <span className="feat-row-num">02</span>
                  <span className="feat-row-tag">Traders Map</span>
                </div>
                <h3 className="feat-row-title">Your city is full of<br />traders. Find them.</h3>
                <p className="feat-row-desc">An interactive globe showing verified traders near you. Filter by style, instrument, prop firm. The local trading scene, finally visible.</p>
              </FadeIn>
              <FadeIn delay={0.15} className="feat-row-visual">
                <div className="feat-row-map">
                  <TradersMap />
                </div>
              </FadeIn>
            </div>

            {/* 03 — Funded Badge */}
            <div className="feat-row" style={{ "--row-glow": "rgba(45,212,191,0.2)" } as React.CSSProperties}>
              <FadeIn className="feat-row-text">
                <div className="feat-row-head">
                  <span className="feat-row-num">03</span>
                  <span className="feat-row-tag">Funded Badge</span>
                </div>
                <h3 className="feat-row-title">Verified prop firm status.<br />No fakes.</h3>
                <p className="feat-row-desc">API-connected to FTMO, Apex, TopstepX, and more. Your funded status is on your profile — verified at source, not self-reported.</p>
              </FadeIn>
              <FadeIn delay={0.15} className="feat-row-visual">
                <PhoneFrame src="/prifle.PNG" alt="Funded trader profile" width={256} height={556} />
              </FadeIn>
            </div>

            {/* 04 — Trade Import */}
            <div className="feat-row feat-row-rev" style={{ "--row-glow": "rgba(245,158,11,0.15)" } as React.CSSProperties}>
              <FadeIn className="feat-row-text">
                <div className="feat-row-head">
                  <span className="feat-row-num">04</span>
                  <span className="feat-row-tag">Trade Import</span>
                </div>
                <h3 className="feat-row-title">Your full history,<br />synced automatically.</h3>
                <p className="feat-row-desc">Connect MyFXBook or drop a CSV — GroovX imports your complete trade history and maps every trade to a card. One click, full transparency.</p>
              </FadeIn>
              <FadeIn delay={0.15} className="feat-row-visual">
                <div className="feat-import-mock">
                  <div className="fim-header">
                    <span className="fim-title">MyFXBook Import</span>
                    <span className="fim-status">Syncing</span>
                  </div>
                  <div className="fim-progress">
                    <div className="fim-bar"><div className="fim-fill" style={{ width: "73%" }} /></div>
                    <span className="fim-pct">247 of 338 trades imported</span>
                  </div>
                  <div className="fim-rows">
                    {[
                      { pair: "EURUSD", dir: "LONG",  r: "+2.4R", done: true  },
                      { pair: "GBPUSD", dir: "SHORT", r: "-0.8R", done: true  },
                      { pair: "XAUUSD", dir: "LONG",  r: "+3.1R", done: true  },
                      { pair: "USDJPY", dir: "SHORT", r: "+0.9R", done: true  },
                      { pair: "BTCUSD", dir: "LONG",  r: "—",     done: false },
                    ].map((t) => (
                      <div key={t.pair} className="fim-row">
                        <span className="fim-pair">{t.pair}</span>
                        <span className={`fim-dir ${t.dir.toLowerCase()}`}>{t.dir}</span>
                        <span className={`fim-r${t.r.startsWith("+") ? " pos" : t.r.startsWith("-") ? " neg" : ""}`}>{t.r}</span>
                        <span className={`fim-check ${t.done ? "done" : "loading"}`}>{t.done ? "✓" : "···"}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* 05 — Communities */}
            <div className="feat-row" style={{ "--row-glow": "rgba(167,139,250,0.22)" } as React.CSSProperties}>
              <FadeIn className="feat-row-text">
                <div className="feat-row-head">
                  <span className="feat-row-num">05</span>
                  <span className="feat-row-tag">Communities</span>
                </div>
                <h3 className="feat-row-title">Groups built for<br />real traders.</h3>
                <p className="feat-row-desc">Public or private. Polls, live chat, member roles, and trade feeds. Build a community that actually talks about trading — not just posts screenshots.</p>
              </FadeIn>
              <FadeIn delay={0.15} className="feat-row-visual">
                <PhoneFrame src="/community.PNG" alt="GroovX community" width={256} height={556} />
              </FadeIn>
            </div>

            {/* 06 — Profile Stats */}
            <div className="feat-row feat-row-rev" style={{ "--row-glow": "rgba(45,212,191,0.2)" } as React.CSSProperties}>
              <FadeIn className="feat-row-text">
                <div className="feat-row-head">
                  <span className="feat-row-num">06</span>
                  <span className="feat-row-tag">Profile Stats</span>
                </div>
                <h3 className="feat-row-title">Your trading identity,<br />quantified.</h3>
                <p className="feat-row-desc">Win rate, average R, profit factor — calculated from your verified trade history and shown publicly on your profile. No hiding, no inflating.</p>
              </FadeIn>
              <FadeIn delay={0.15} className="feat-row-visual">
                <div className="feat-stats-mock">
                  <div className="fsm-header">
                    <div className="fsm-av">AF</div>
                    <div>
                      <div className="fsm-name">@alex_funded</div>
                      <div className="fsm-badge">FTMO Verified ✓</div>
                    </div>
                    <div className="fsm-pnl">+$18,420</div>
                  </div>
                  <div className="fsm-bars">
                    {[
                      { label: "Win Rate",      pct: 68, display: "68%"  },
                      { label: "Avg R",         pct: 80, display: "2.4R" },
                      { label: "Profit Factor", pct: 61, display: "1.84" },
                    ].map(({ label, pct, display }) => (
                      <div key={label} className="fsm-bar-row">
                        <div className="fsm-bar-label">{label}</div>
                        <div className="fsm-bar-track"><div className="fsm-bar-fill" style={{ width: `${pct}%` }} /></div>
                        <div className="fsm-bar-val">{display}</div>
                      </div>
                    ))}
                  </div>
                  <div className="fsm-footer">
                    {[{ n: "342", l: "Trades" }, { n: "4.2y", l: "Experience" }, { n: "128", l: "Followers" }].map(({ n, l }) => (
                      <div key={l} className="fsm-stat">
                        <span className="fsm-stat-n">{n}</span>
                        <span className="fsm-stat-l">{l}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>

      <PricingSection />

      <CTASection />

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
              <a href="/" className="logo">
                <Image src="/logo.svg" alt="GroovX" width={28} height={28} />
                <span className="logo-text" style={{ fontSize: 15 }}>GroovX</span>
              </a>
              <span className="footer-copy">© 2025 GroovX. All rights reserved.</span>
            </div>
            <div className="footer-links">
              <a href="#" className="footer-link">Privacy Policy</a>
              <a href="#" className="footer-link">Terms of Service</a>
              <a href="#" className="footer-link">Contact</a>
            </div>
            <a href="#" className="footer-x">𝕏</a>
          </div>
        </div>
      </footer>
    </>
  );
}
