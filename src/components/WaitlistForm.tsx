"use client";
import { useState, useEffect, useRef } from "react";

type Status = "idle" | "loading" | "success" | "error" | "duplicate";

export default function WaitlistForm({ variant = "hero" }: { variant?: "hero" | "cta" }) {
  const [status, setStatus] = useState<Status>("idle");
  const [proLocked, setProLocked] = useState<boolean | null>(null);
  const [spots, setSpots] = useState<{ count: number; total: number } | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/spots")
      .then((r) => r.json())
      .then(setSpots)
      .catch(() => {});
  }, []);

  async function submit() {
    const email = emailRef.current?.value.trim() ?? "";
    if (!email || !email.includes("@")) {
      emailRef.current?.classList.add("input-error");
      emailRef.current?.focus();
      setTimeout(() => emailRef.current?.classList.remove("input-error"), 1600);
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setProLocked(data.proLocked ?? null);
        setSpots((s) => (s ? { ...s, count: Math.min(s.count + 1, s.total) } : s));
      } else if (res.status === 409) {
        setStatus("duplicate");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const taken = spots?.count ?? 0;
  const total = spots?.total ?? 100;
  const pct = Math.min(100, Math.round((taken / total) * 100));
  const remaining = total - taken;

  if (status === "success") {
    return (
      <div className="form-success show" style={{ flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 20 }}>✓</span>
          {proLocked
            ? "You're in the first 100 — Pro is yours, free forever."
            : "You're on the waitlist — we'll be in touch at launch."}
        </div>
        {proLocked && (
          <span style={{ fontSize: 13, color: "var(--text-tertiary)", paddingLeft: 30 }}>
            Check your inbox for confirmation.
          </span>
        )}
      </div>
    );
  }

  if (status === "duplicate") {
    return (
      <div className="form-success show" style={{ color: "var(--text-secondary)" }}>
        <span>ℹ</span> That email is already on the list.
      </div>
    );
  }

  return (
    <div className="wl-wrap">
      <div className={variant === "hero" ? "hero-form" : "cta-form"}>
        <input
          ref={emailRef}
          type="email"
          className="input-field"
          placeholder="Enter your email address"
          disabled={status === "loading"}
          style={variant === "cta" ? { background: "rgba(240,246,252,.05)" } : undefined}
          onKeyDown={(e) => e.key === "Enter" && submit()}
        />
        <button
          className="btn-primary btn-primary-lg"
          onClick={submit}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Joining…" : "Join Waitlist"}
        </button>
      </div>
      {status === "error" && (
        <p style={{ fontSize: 13, color: "var(--red)", marginTop: 8 }}>
          Something went wrong — please try again.
        </p>
      )}
      {spots && (
        <div className="spots-wrap">
          <div className="spots-bar-wrap">
            <div className="spots-bar-fill" style={{ width: `${pct}%` }} />
          </div>
          <div className="spots-text">
            <span className="spots-taken">{taken}</span>
            <span> / {total} Pro spots taken</span>
            {remaining > 0 && remaining <= 30 && (
              <span className="spots-urgent"> — only {remaining} left!</span>
            )}
            {remaining === 0 && (
              <span className="spots-urgent"> — all Pro spots claimed</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
