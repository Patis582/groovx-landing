import FadeIn from "./FadeIn";
import PhoneMockup from "./PhoneMockup";
import WaitlistForm from "./WaitlistForm";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-grid" />
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="container">
        <div className="hero-inner">
          <div>
            <FadeIn delay={0}>
              <div className="hero-badge">
                <div className="badge-dot" />
                First 100 get Pro — free forever
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="hero-h1">
                The social network built for{" "}
                <em>serious traders.</em>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="hero-sub">
                Share verified trades, connect with funded traders worldwide, and
                discover your local trading community — all in one place.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <WaitlistForm variant="hero" />
            </FadeIn>
          </div>
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
}
