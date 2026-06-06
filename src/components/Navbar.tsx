"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`}>
      <div className="container">
        <div className="nav-inner">
          <Link href="/" className="logo">
            <Image src="/logo.svg" alt="GroovX" width={34} height={34} priority />
            <span className="logo-text">GroovX</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
