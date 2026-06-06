"use client";

function scrollToWaitlist() {
  document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
}

const freeTier = ["10 trade cards / month", "5 direct messages / day", "Join public communities", "Basic profile stats", "Traders Map access"];
const proTier = ["Unlimited trade cards", "CSV & MyFXBook import", "Ghost Mode (private browsing)", "Create & manage communities", "Advanced analytics", "Priority support"];
const eliteTier = ["Everything in Pro", "API-verified funded badge", "Elite ⚡ profile badge", "Paid community creation", "Institutional analytics"];

export default function PricingSection() {
  return (
    <section className="section" id="pricing">
      <div className="container">
        <div style={{ textAlign: "center" }}>
          <span className="section-label fu">Pricing</span>
          <h2
            className="fu"
            style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, transitionDelay: "100ms" }}
          >
            Simple pricing. No surprises.
          </h2>
          <p
            className="fu"
            style={{ fontSize: 14, color: "var(--text-tertiary)", marginTop: 10, transitionDelay: "200ms" }}
          >
            Pricing announced at launch — join the waitlist for an exclusive early bird deal.
          </p>
        </div>
        <div className="pricing-grid">
          {/* FREE */}
          <div className="price-card fu">
            <div className="price-tier" style={{ color: "var(--text-secondary)" }}>Free</div>
            <div className="price-desc">Perfect for getting started and building your profile.</div>
            <div className="price-main">$0</div>
            <div className="price-note">forever free</div>
            <ul className="price-feats">
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
          </div>

          {/* PRO */}
          <div className="price-card featured fu" style={{ transitionDelay: "100ms" }}>
            <div className="price-popular">Most Popular ⭐</div>
            <div className="price-tier" style={{ color: "var(--accent)" }}>Pro</div>
            <div className="price-desc">For serious traders who want unlimited access and full privacy.</div>
            <div className="price-main" style={{ color: "var(--accent)" }}>Early Bird</div>
            <div className="price-note">3 months free for waitlist members</div>
            <ul className="price-feats">
              {proTier.map((f) => (
                <li key={f} className="pf">
                  <div className="pf-check">✓</div>
                  {f}
                </li>
              ))}
            </ul>
            <button className="btn-price featured" onClick={scrollToWaitlist}>
              Get Early Access
            </button>
          </div>

          {/* ELITE */}
          <div className="price-card fu" style={{ transitionDelay: "200ms" }}>
            <div className="price-tier" style={{ color: "var(--purple)" }}>Elite 🔥</div>
            <div className="price-desc">For funded traders who want maximum credibility and monetisation.</div>
            <div className="price-main" style={{ color: "var(--purple)" }}>Early Bird</div>
            <div className="price-note">exclusive rate for early adopters</div>
            <ul className="price-feats">
              {eliteTier.map((f) => (
                <li key={f} className="pf">
                  <div className="pf-check pur">✓</div>
                  {f}
                </li>
              ))}
            </ul>
            <button className="btn-price" onClick={scrollToWaitlist}>
              Join Waitlist
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
