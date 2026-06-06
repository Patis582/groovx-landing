"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FeatureCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function FeatureCard({ children, delay = 0, className = "" }: FeatureCardProps) {
  return (
    <motion.div
      className={`feat-sc-card ${className}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      whileHover={{
        y: -6,
        boxShadow: "0 32px 64px rgba(0,0,0,.45), 0 0 0 1px var(--accent), 0 0 32px rgba(0,212,172,.15)",
      }}
    >
      {children}
    </motion.div>
  );
}
