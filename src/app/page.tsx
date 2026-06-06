import Image from "next/image";
import Ticker from "@/components/Ticker";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogosStrip from "@/components/LogosStrip";
import PhoneFrame from "@/components/PhoneFrame";
import PricingSection from "@/components/PricingSection";
import CTASection from "@/components/CTASection";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <Ticker />
      <Navbar />
      <ScrollReveal />
      <Hero />
      <LogosStrip />

      {/* ── PROBLEM ── */}
      <section className="section" id="problem">
        <div className="container">
          <span className="section-label fu">The Problem</span>
          <h2
            className="fu"
            style={{
              fontSize: "clamp(28px,4vw,44px)",
              fontWeight: 800,
              maxWidth: 640,
              transitionDelay: "100ms",
            }}
          >
            Trading is full of fake results and empty communities.
          </h2>
          <p
            className="fu"
            style={{
              fontSize: 17,
              color: "var(--text-secondary)",
              maxWidth: 560,
              marginTop: 16,
              lineHeight: 1.7,
              transitionDelay: "200ms",
            }}
          >
            Screenshots get edited. Results get exaggerated. And finding real
            traders who actually trade? Nearly impossible.{" "}
            <strong style={{ color: "var(--text-primary)" }}>
              GroovX fixes that.
            </strong>
          </p>
          <div className="problem-grid">
            {[
              {
                icon: "🎭",
                title: "Fake Screenshots",
                text: "Anyone can edit a P&L screenshot. Real results need verification — not just a post.",
                d: "100ms",
              },
              {
                icon: "🏜️",
                title: "Empty Communities",
                text: "Discord servers with 10k members, 3 active people, and zero signal. Trading deserves better.",
                d: "200ms",
              },
              {
                icon: "🌐",
                title: "No Local Network",
                text: "Thousands of traders in your city with no way to find each other. The map has been empty — until now.",
                d: "300ms",
              },
            ].map((c) => (
              <div key={c.title} className="prob-card fu" style={{ transitionDelay: c.d }}>
                <div className="prob-icon">{c.icon}</div>
                <div className="prob-title">{c.title}</div>
                <div className="prob-text">{c.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="section" id="features">
        <div className="container">
          <span className="section-label fu">Features</span>
          <h2
            className="fu"
            style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, transitionDelay: "100ms" }}
          >
            Everything serious traders need.
          </h2>
          <p
            className="fu"
            style={{
              fontSize: 17,
              color: "var(--text-secondary)",
              maxWidth: 500,
              marginTop: 14,
              lineHeight: 1.7,
              transitionDelay: "200ms",
            }}
          >
            Built from the ground up for traders who care about real data, real
            connections, and real community.
          </p>
          <div className="features-grid">
            {[
              { icon: "📊", name: "Trade Cards", desc: "Structured, verifiable trade data — not just screenshots. Entry, exit, R-multiple, and more in one clean card.", d: "0ms" },
              { icon: "🌍", name: "Traders Map", desc: "Discover traders near you on an interactive globe. Find your local trading community, finally.", d: "100ms" },
              { icon: "✅", name: "Funded Badge", desc: "Verified prop firm status that proves you're the real deal. FTMO, Apex, TopstepX — verified at source.", d: "200ms" },
              { icon: "📥", name: "Trade Import", desc: "Sync from MyFXBook or import CSV automatically. Your full trade history, beautifully organised.", d: "300ms" },
              { icon: "👥", name: "Communities", desc: "Public and private groups with polls, chat, and roles. Build a niche trading community that actually works.", d: "400ms" },
              { icon: "📈", name: "Profile Stats", desc: "Average R, profit factor, trade history — all public and verifiable. Your trading identity, quantified.", d: "500ms" },
            ].map((f) => (
              <div key={f.name} className="feat-card fu" style={{ transitionDelay: f.d }}>
                <div className="feat-icon">{f.icon}</div>
                <div className="feat-name">{f.name}</div>
                <div className="feat-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPOTLIGHT 1: TRADE CARDS ── */}
      <section style={{ padding: "72px 0" }} id="trade-cards">
        <div className="container">
          <div className="spot-inner">
            <div className="fu">
              <span className="section-label">Trade Cards</span>
              <h2 className="spot-h2">Your trades deserve more than a screenshot.</h2>
              <p className="spot-p">
                Every trade on GroovX is a structured data card — not a cropped image. Entry, exit,
                stop loss, R-multiple, and profit factor all in one verifiable format. No editing. No faking.
              </p>
              <ul className="spot-pts">
                {[
                  "Pair, direction, entry, exit, SL, R-multiple — all structured",
                  "Linked to your broker — verified, not self-reported",
                  "Equity curve generated from your real trade history",
                  "Add notes, tags, and charts for full context",
                ].map((pt) => (
                  <li key={pt} className="spot-pt">
                    <div className="pt-dot" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
            <PhoneFrame
              src="/tradecard_detail.PNG"
              alt="Trade card detail"
              width={290}
              height={630}
              glowVariant="purple"
              className="fu"
              style={{ transitionDelay: "200ms" }}
            />
          </div>
        </div>
      </section>

      {/* ── SPOTLIGHT 2: TRADERS MAP ── */}
      <section style={{ padding: "72px 0" }} id="map">
        <div className="container">
          <div className="spot-inner rev">
            <div className="fu">
              <span className="section-label">Traders Map</span>
              <h2 className="spot-h2">Find traders near you. Anywhere in the world.</h2>
              <p className="spot-p">
                The first interactive map of the global trading community. See where traders are, filter
                by prop firm, strategy, or performance — and connect locally.
              </p>
              <ul className="spot-pts">
                {[
                  "Interactive globe with real trader locations",
                  "Filter by funded status, strategy, or profit factor",
                  "Discover local meetups and trading groups",
                  "Privacy controls — share city, region, or stay hidden",
                ].map((pt) => (
                  <li key={pt} className="spot-pt">
                    <div className="pt-dot" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
            <PhoneFrame
              src="/map.PNG"
              alt="Traders map"
              width={290}
              height={630}
              glowVariant="purple"
              className="fu"
              style={{ transitionDelay: "200ms" }}
            />
          </div>
        </div>
      </section>

      {/* ── SPOTLIGHT 3: COMMUNITIES ── */}
      <section style={{ padding: "72px 0" }} id="communities">
        <div className="container">
          <div className="spot-inner rev">
            <div className="fu">
              <span className="section-label">Communities</span>
              <h2 className="spot-h2">Find your tribe. Build your edge.</h2>
              <p className="spot-p">
                Public and private trading communities built around what matters — instruments, strategies,
                and real accountability. Not signal spam.
              </p>
              <ul className="spot-pts">
                {[
                  "Join communities by instrument, style, or prop firm",
                  "Shared feed of verified trade cards from members",
                  "Polls, discussions, and daily analysis",
                  "Private groups with roles and access control",
                ].map((pt) => (
                  <li key={pt} className="spot-pt">
                    <div className="pt-dot" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
            <PhoneFrame
              src="/community.PNG"
              alt="GroovX community"
              width={290}
              height={630}
              className="fu"
              style={{ transitionDelay: "200ms" }}
            />
          </div>
        </div>
      </section>

      {/* ── SPOTLIGHT 4: FUNDED BADGE / PROFILE ── */}
      <section style={{ padding: "72px 0" }} id="verification">
        <div className="container">
          <div className="spot-inner">
            <div className="fu">
              <span className="section-label">Funded Badge</span>
              <h2 className="spot-h2">Prove you&apos;re the real deal. Once, forever.</h2>
              <p className="spot-p">
                Connect your prop firm account and get a Funded Trader badge that can&apos;t be faked.
                Real-time verification from FTMO, Apex, TopstepX, and more.
              </p>
              <ul className="spot-pts">
                {[
                  "API-linked verification — live, not screenshot-based",
                  "Auto-updated when you pass new challenges",
                  "Elite badge for traders with 3+ funded accounts",
                  "Full stats: Avg R, win rate, payout history — all public",
                ].map((pt) => (
                  <li key={pt} className="spot-pt">
                    <div className="pt-dot" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
            <PhoneFrame
              src="/prifle.PNG"
              alt="Funded trader profile"
              width={290}
              height={630}
              className="fu"
              style={{ transitionDelay: "200ms" }}
            />
          </div>
        </div>
      </section>

      <PricingSection />

      {/* ── TESTIMONIALS ── */}
      <section
        className="section"
        id="community"
        style={{ background: "linear-gradient(180deg,transparent,rgba(45,212,191,.025),transparent)" }}
      >
        <div className="container">
          <div style={{ textAlign: "center" }}>
            <span className="section-label fu">Early Community</span>
            <h2 className="fu" style={{ fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 800, transitionDelay: "100ms" }}>
              From traders, for traders.
            </h2>
          </div>
          <div className="testi-grid">
            <div className="testi-card fu">
              <p className="testi-q">
                &ldquo;Finally a place where my results actually mean something. The verified badge proves I&apos;m a
                real funded trader — not just another screenshot warrior.&rdquo;
              </p>
              <div className="testi-author">
                <div className="testi-av">JK</div>
                <div>
                  <div className="testi-name">@jakub_trades</div>
                  <div className="testi-meta">Funded Trader <span className="testi-firm">FTMO $100K</span></div>
                </div>
              </div>
            </div>
            <div className="testi-card fu" style={{ transitionDelay: "100ms" }}>
              <p className="testi-q">
                &ldquo;I&apos;ve been searching for a serious trading community for 3 years. Every Discord is 90% signal
                spam. GroovX is what we actually needed.&rdquo;
              </p>
              <div className="testi-author">
                <div className="testi-av" style={{ background: "rgba(167,139,250,.1)", color: "var(--purple)" }}>MR</div>
                <div>
                  <div className="testi-name">@mrenko_fx</div>
                  <div className="testi-meta">
                    Funded Trader{" "}
                    <span className="testi-firm" style={{ background: "rgba(167,139,250,.1)", color: "var(--purple)" }}>
                      Apex $200K
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
