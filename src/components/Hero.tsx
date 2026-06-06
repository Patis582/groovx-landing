"use client";
import { useState, useRef } from "react";
import PhoneMockup from "./PhoneMockup";

export default function Hero() {
  const [submitted, setSubmitted] = useState(false);
  const [count, setCount] = useState(847);
  const emailRef = useRef<HTMLInputElement>(null);

  function submit() {
    const email = emailRef.current?.value.trim() ?? "";
    if (!email || !email.includes("@")) {
      emailRef.current?.classList.add("input-error");
      emailRef.current?.focus();
      setTimeout(() => emailRef.current?.classList.remove("input-error"), 1600);
      return;
    }
    setSubmitted(true);
    setCount((c) => c + 1);
  }

  return (
    <section className="hero" id="home">
      <div className="hero-grid" />
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="container">
        <div className="hero-inner">
          <div>
            <div className="hero-badge fu">
              <div className="badge-dot" />
              Now accepting waitlist applications
            </div>
            <h1 className="hero-h1 fu" style={{ transitionDelay: "100ms" }}>
              The social network built for{" "}
              <em>serious traders.</em>
            </h1>
            <p className="hero-sub fu" style={{ transitionDelay: "200ms" }}>
              Share verified trades, connect with funded traders worldwide, and
              discover your local trading community — all in one place.
            </p>
            <div className="fu" style={{ transitionDelay: "300ms" }}>
              {!submitted ? (
                <div className="hero-form">
                  <input
                    ref={emailRef}
                    type="email"
                    className="input-field"
                    placeholder="Enter your email address"
                  />
                  <button className="btn-primary btn-primary-lg" onClick={submit}>
                    Join Waitlist
                  </button>
                </div>
              ) : (
                <div className="form-success show">
                  <span>✓</span> You&apos;re on the list — we&apos;ll be in touch.
                </div>
              )}
              <div className="social-proof" style={{ marginTop: 16 }}>
                <div className="avatars">
                  <div className="av av1">JK</div>
                  <div className="av av2">MR</div>
                  <div className="av av3">AT</div>
                  <div className="av av4">+</div>
                </div>
                <span>
                  <span className="sp-count">{count}</span> traders already joined
                </span>
              </div>
            </div>
          </div>
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
}
