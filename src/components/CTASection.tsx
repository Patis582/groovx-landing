import FadeIn from "./FadeIn";
import WaitlistForm from "./WaitlistForm";

export default function CTASection() {
  return (
    <section className="section" id="waitlist">
      <div className="container">
        <FadeIn>
          <div className="cta-box">
            <span className="section-label">Limited Early Access</span>
            <h2 className="cta-h2">
              Be one of the first 100.
              <br />
              Get Pro free forever.
            </h2>
            <p className="cta-sub">
              The first 100 traders on the waitlist get Pro — free forever. No credit
              card. No expiry. Just Pro, on us.
            </p>
            <WaitlistForm variant="cta" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
