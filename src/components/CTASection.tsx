"use client";
import { useState, useRef } from "react";

export default function CTASection() {
  const [submitted, setSubmitted] = useState(false);
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
  }

  return (
    <section className="section" id="waitlist">
      <div className="container">
        <div className="cta-box fu">
          <span className="section-label">Limited Early Access</span>
          <h2 className="cta-h2">
            Join the waitlist.
            <br />
            Be first in.
          </h2>
          <p className="cta-sub">
            Early access traders get Pro features free for 3 months. No credit
            card required.
          </p>
          {!submitted ? (
            <>
              <div className="cta-form">
                <input
                  ref={emailRef}
                  type="email"
                  className="input-field"
                  placeholder="Your email address"
                  style={{ background: "rgba(240,246,252,.05)" }}
                />
                <button className="btn-primary btn-primary-lg" onClick={submit}>
                  Claim Your Spot
                </button>
              </div>
              <div className="cta-disc">
                No spam. Unsubscribe anytime. We&apos;ll only email you when
                GroovX launches.
              </div>
            </>
          ) : (
            <div
              className="form-success show"
              style={{ justifyContent: "center", marginTop: 8 }}
            >
              <span style={{ fontSize: 20 }}>✓</span> You&apos;re on the
              waitlist! We&apos;ll reach out soon.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
