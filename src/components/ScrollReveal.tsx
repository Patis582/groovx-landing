"use client";
import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("vis");
        }),
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );

    const els = document.querySelectorAll(".fu");
    els.forEach((el) => obs.observe(el));

    // Immediately reveal hero elements
    document.querySelectorAll(".hero .fu").forEach((el) => {
      setTimeout(() => el.classList.add("vis"), 80);
    });

    return () => obs.disconnect();
  }, []);

  return null;
}
