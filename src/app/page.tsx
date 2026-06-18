import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturesSection from "@/components/FeaturesSection";
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
              { num: "01", tag: "FAKE RESULTS", title: "Fake Trades", text: "Anyone can post P&L screenshots — cropped, edited, or straight from a demo account. Without verification, there's no way to know who's real and who's performing.", d: 0.1 },
              { num: "02", tag: "NO TRADING LAYER", title: "No Trading Layer", text: "Entry, exit, SL/TP, RR ratio — a trade carries data that matters. But everywhere you post it, that data disappears into a screenshot with no structure and no context.", d: 0.2 },
              { num: "03", tag: "ZERO LOCAL SIGNAL", title: "No Local Network", text: "Thousands of traders in your city with no way to find each other. The map has been empty — until now.", d: 0.3 },
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

      <FeaturesSection />

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
            <a href="https://x.com/trademates_" target="_blank" className="footer-x">𝕏</a>
          </div>
        </div>
      </footer>
    </>
  );
}
