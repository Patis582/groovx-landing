"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

type Feature = { icon: ReactNode; num: string; title: string; desc: string };

const Icon = ({ children }: { children: ReactNode }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const FEATURES: Feature[] = [
  {
    num: "01",
    icon: <Icon>
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
    </Icon>,
    title: "Trade Cards",
    desc: "Not just text posts. Structured trade data with instrument, entry, exit, SL/TP, RR ratio and chart screenshot. Every trade tells the full story.",
  },
  {
    num: "02",
    icon: <Icon>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <polyline points="9 12 11 14 15 10"/>
    </Icon>,
    title: "Verified Trades",
    desc: "Connect your MyFXBook account and every imported trade gets a verification badge. No more fake results.",
  },
  {
    num: "03",
    icon: <Icon>
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </Icon>,
    title: "Traders Map",
    desc: "Discover traders near you on an interactive globe. See who's trading in your city. Ghost Mode keeps you invisible if you prefer.",
  },
  {
    num: "04",
    icon: <Icon>
      <circle cx="12" cy="8" r="7"/>
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
    </Icon>,
    title: "Funded Trader Badge",
    desc: "Upload your prop firm certificate and payout proof. We verify it manually. Your profile shows the world you're the real deal.",
  },
  {
    num: "05",
    icon: <Icon>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </Icon>,
    title: "Communities",
    desc: "Create or join trading communities. Public or private. Built-in chat, bias polls and moderator roles.",
  },
  {
    num: "06",
    icon: <Icon>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
      <polyline points="17 6 23 6 23 12"/>
    </Icon>,
    title: "Profile Stats",
    desc: "Your trading track record on your profile. Average R, profit factor, trade count. Stats that actually mean something.",
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function FeatureCards() {
  return (
    <motion.div
      className="feat-grid"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {FEATURES.map((f) => (
        <motion.div
          key={f.title}
          className="feat-grid-card"
          variants={item}
          whileHover={{
            y: -4,
            boxShadow: "0 24px 56px rgba(0,0,0,.55), 0 0 0 1px rgba(45,212,191,.35), 0 0 28px rgba(45,212,191,.08)",
            transition: { type: "spring", stiffness: 320, damping: 28 },
          }}
        >
          <span className="feat-grid-num">{f.num}</span>
          <div className="feat-grid-icon">{f.icon}</div>
          <h3 className="feat-grid-title">{f.title}</h3>
          <p className="feat-grid-desc">{f.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
