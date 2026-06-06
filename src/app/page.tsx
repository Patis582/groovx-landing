import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PhoneFrame from "@/components/PhoneFrame";
import PricingSection from "@/components/PricingSection";
import CTASection from "@/components/CTASection";
import FadeIn from "@/components/FadeIn";
import FeatureCard from "@/components/FeatureCard";

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
            <h2
              style={{
                fontSize: "clamp(28px,4vw,44px)",
                fontWeight: 800,
                maxWidth: 640,
              }}
            >
              Trading is full of fake results and empty communities.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p
              style={{
                fontSize: 17,
                color: "var(--text-secondary)",
                maxWidth: 560,
                marginTop: 16,
                lineHeight: 1.7,
              }}
            >
              Screenshots get edited. Results get exaggerated. And finding real
              traders who actually trade? Nearly impossible.{" "}
              <strong style={{ color: "var(--text-primary)" }}>
                GroovX fixes that.
              </strong>
            </p>
          </FadeIn>
          <div className="prob-rows">
            {[
              {
                num: "01",
                tag: "CREDIBILITY CRISIS",
                title: "Fake Screenshots",
                text: "Anyone can edit a P&L screenshot. Real results need verification — not just a post.",
                d: 0.1,
              },
              {
                num: "02",
                tag: "GHOST COMMUNITIES",
                title: "Empty Communities",
                text: "Discord servers with 10k members, 3 active people, and zero signal. Trading deserves better.",
                d: 0.2,
              },
              {
                num: "03",
                tag: "ZERO LOCAL SIGNAL",
                title: "No Local Network",
                text: "Thousands of traders in your city with no way to find each other. The map has been empty — until now.",
                d: 0.3,
              },
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
            <h2
              style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 800 }}
            >
              Everything serious traders need.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p
              style={{
                fontSize: 17,
                color: "var(--text-secondary)",
                maxWidth: 500,
                marginTop: 14,
                lineHeight: 1.7,
              }}
            >
              Built from the ground up for traders who care about real data, real
              connections, and real community.
            </p>
          </FadeIn>

          <div className="feat-showcase">

            <FeatureCard delay={0}>
              <div className="feat-sc-hdr">
                <span className="feat-sc-num">01</span>
                <h3 className="feat-sc-name">Trade Cards</h3>
                <p className="feat-sc-desc">
                  Structured, verifiable trade data — not just screenshots. Entry, exit,
                  R-multiple, and more in one clean card.
                </p>
              </div>
              <div className="feat-sc-img">
                <PhoneFrame src="/tradecard_detail.PNG" alt="Trade card detail" width={220} height={478} glowVariant="purple" />
              </div>
            </FeatureCard>

            <FeatureCard delay={0.1}>
              <div className="feat-sc-hdr">
                <span className="feat-sc-num">02</span>
                <h3 className="feat-sc-name">Traders Map</h3>
                <p className="feat-sc-desc">
                  Discover traders near you on an interactive globe. Find your local trading
                  community, finally.
                </p>
              </div>
              <div className="feat-sc-img">
                <PhoneFrame src="/map.PNG" alt="Traders map" width={220} height={478} glowVariant="purple" />
              </div>
            </FeatureCard>

            <FeatureCard delay={0.2}>
              <div className="feat-sc-hdr">
                <span className="feat-sc-num">05</span>
                <h3 className="feat-sc-name">Communities</h3>
                <p className="feat-sc-desc">
                  Public and private groups with polls, chat, and roles. Build a niche trading
                  community that actually works.
                </p>
              </div>
              <div className="feat-sc-img">
                <PhoneFrame src="/community.PNG" alt="GroovX community" width={220} height={478} />
              </div>
            </FeatureCard>

            <FeatureCard delay={0.3}>
              <div className="feat-sc-hdr">
                <span className="feat-sc-num">03</span>
                <h3 className="feat-sc-name">Funded Badge</h3>
                <p className="feat-sc-desc">
                  Verified prop firm status that proves you&apos;re the real deal. FTMO, Apex,
                  TopstepX — verified at source.
                </p>
              </div>
              <div className="feat-sc-img">
                <PhoneFrame src="/prifle.PNG" alt="Funded trader profile" width={220} height={478} />
              </div>
            </FeatureCard>

          </div>

          {/* ── 2 mini cards ── */}
          <div className="feat-mini-row">
            <FadeIn delay={0.1}>
              <div className="feat-mini-card">
                <div className="feat-mini-num">04</div>
                <div className="feat-bento-accent" />
                <div className="feat-mini-name">Trade Import</div>
                <div className="feat-mini-desc">
                  Sync from MyFXBook or import CSV automatically. Your full trade history,
                  beautifully organised.
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="feat-mini-card">
                <div className="feat-mini-num">06</div>
                <div className="feat-bento-accent" />
                <div className="feat-mini-name">Profile Stats</div>
                <div className="feat-mini-desc">
                  Average R, profit factor, trade history — all public and verifiable. Your
                  trading identity, quantified.
                </div>
              </div>
            </FadeIn>
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
