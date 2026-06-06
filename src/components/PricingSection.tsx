"use client";
import { motion } from "framer-motion";

function scrollToWaitlist() {
  document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
}

const freeTier = [
  "10 trade cards / month",
  "5 direct messages / day",
  "Join public communities",
  "Basic profile stats",
  "Traders Map access",
];

const proTier = [
  "Unlimited trade cards",
  "CSV & MyFXBook import",
  "Ghost Mode (private browsing)",
  "Create & manage communities",
  "Advanced analytics & equity curve",
  "API-verified funded badge",
  "Priority support",
];

export default function PricingSection() {
  return (
    <section className="section" id="pricing">
      <div className="container">
        <div style={{ textAlign: "center" }}>
          <motion.span
            className="section-label"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            What You Get
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 800 }}
          >
            Join early. Lock in Pro free.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            style={{ fontSize: 14, color: "var(--text-tertiary)", marginTop: 10 }}
          >
            The first 100 traders get Pro forever — no price, no card, no expiry.
          </motion.p>
        </div>
        <div className="pricing-grid-2">
          {/* FREE */}
          <motion.div
            className="price-card"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <div className="price-tier" style={{ color: "var(--text-secondary)" }}>Free</div>
            <div className="price-desc">Everything you need to get started and build your trading identity.</div>
            <div className="price-main" style={{ fontSize: 17, fontFamily: "inherit", fontWeight: 700 }}>
              Always free
            </div>
            <ul className="price-feats" style={{ marginTop: 20 }}>
              {freeTier.map((f) => (
                <li key={f} className="pf">
                  <div className="pf-check">✓</div>
                  {f}
                </li>
              ))}
            </ul>
            <button className="btn-price" onClick={scrollToWaitlist}>
              Join Waitlist
            </button>
          </motion.div>

          {/* PRO */}
          <motion.div
            className="price-card featured"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <div className="price-popular">First 100 get this free forever ⚡</div>
            <div className="price-tier" style={{ color: "var(--accent)" }}>Pro</div>
            <div className="price-desc">Unlimited everything, full privacy, and verified trader status.</div>
            <div className="price-main" style={{ fontSize: 17, fontFamily: "inherit", fontWeight: 700, color: "var(--accent)" }}>
              Free for the first 100
            </div>
            <ul className="price-feats" style={{ marginTop: 20 }}>
              {proTier.map((f) => (
                <li key={f} className="pf">
                  <div className="pf-check">✓</div>
                  {f}
                </li>
              ))}
            </ul>
            <button className="btn-price featured" onClick={scrollToWaitlist}>
              Join waitlist to lock in free Pro forever →
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
