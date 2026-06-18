"use client";
import { useRef, useEffect } from "react";
import FadeIn from "./FadeIn";
import PhoneMockup from "./PhoneMockup";
import WaitlistForm from "./WaitlistForm";

const STEP = 56;
const STRENGTH = 22;
const RADIUS = 100;
const SAMPLE = 3;

function smoothstep(t: number) {
  t = Math.max(0, Math.min(1, t));
  return t * t * (3 - 2 * t);
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ tx: -9999, ty: -9999, cx: -9999, cy: -9999 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    function resize() {
      canvas!.width = section!.offsetWidth;
      canvas!.height = section!.offsetHeight;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(section);

    function onMouseMove(e: MouseEvent) {
      const r = section!.getBoundingClientRect();
      mouse.current.tx = e.clientX - r.left;
      mouse.current.ty = e.clientY - r.top;
    }
    function onMouseLeave() {
      mouse.current.tx = -9999;
      mouse.current.ty = -9999;
    }
    section.addEventListener("mousemove", onMouseMove);
    section.addEventListener("mouseleave", onMouseLeave);

    function displace(px: number, py: number, cx: number, cy: number) {
      const dx = px - cx, dy = py - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist >= RADIUS || dist < 0.5) return { x: px, y: py };
      const force = STRENGTH * smoothstep(1 - dist / RADIUS);
      return { x: px + (dx / dist) * force, y: py + (dy / dist) * force };
    }

    function drawLine(pts: { x: number; y: number }[], color: string) {
      if (pts.length < 2) return;
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        const prev = pts[i - 1], curr = pts[i];
        ctx.quadraticCurveTo(prev.x, prev.y, (prev.x + curr.x) / 2, (prev.y + curr.y) / 2);
      }
      ctx.stroke();
    }

    function frame() {
      const m = mouse.current;
      m.cx += (m.tx - m.cx) * (m.cx < -100 ? 1 : 0.1);
      m.cy += (m.ty - m.cy) * (m.cy < -100 ? 1 : 0.1);
      const { cx, cy } = m;
      const W = canvas!.width, H = canvas!.height;

      ctx.clearRect(0, 0, W, H);

      if (cx > 0) {
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 280);
        g.addColorStop(0, "rgba(45,212,191,0.07)");
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }

      for (let x = 0; x <= W + STEP; x += STEP) {
        const pts = [];
        for (let y = -STEP; y <= H + STEP; y += SAMPLE) pts.push(displace(x, y, cx, cy));
        drawLine(pts, "rgba(240,246,252,0.05)");
        if (cx > 0) {
          const d = Math.abs(x - cx);
          if (d < RADIUS + 80) drawLine(pts, `rgba(45,212,191,${(0.22 * smoothstep(1 - d / (RADIUS + 80))).toFixed(3)})`);
        }
      }

      for (let y = 0; y <= H + STEP; y += STEP) {
        const pts = [];
        for (let x = -STEP; x <= W + STEP; x += SAMPLE) pts.push(displace(x, y, cx, cy));
        drawLine(pts, "rgba(240,246,252,0.05)");
        if (cy > 0) {
          const d = Math.abs(y - cy);
          if (d < RADIUS + 80) drawLine(pts, `rgba(45,212,191,${(0.22 * smoothstep(1 - d / (RADIUS + 80))).toFixed(3)})`);
        }
      }

      rafRef.current = requestAnimationFrame(frame);
    }
    rafRef.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      section.removeEventListener("mousemove", onMouseMove);
      section.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <section ref={sectionRef} className="hero" id="home">
      <canvas ref={canvasRef} className="hero-canvas" />
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
