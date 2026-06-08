"use client";
import { motion, MotionValue } from "framer-motion";

const ACCENT = "#2DD4BF";

const CITIES = [
  { name: "New York", x: "26%", y: "37%", count: "1,240" },
  { name: "London",   x: "44%", y: "29%", count: "980"   },
  { name: "Prague",   x: "49%", y: "26%", count: "340"   },
  { name: "Dubai",    x: "59%", y: "43%", count: "590"   },
  { name: "Tokyo",    x: "73%", y: "32%", count: "760"   },
  { name: "Sydney",   x: "75%", y: "64%", count: "420"   },
];

interface Props {
  driftX: MotionValue<string>;
}

export default function CSSGlobe({ driftX }: Props) {
  return (
    <div className="css-globe-outer">
      <div className="css-globe">
        {/* Latitude/longitude grid — drifts on scroll */}
        <motion.div className="css-globe-grid" style={{ x: driftX }} />

        {/* City dots + labels — move with grid */}
        <motion.div className="css-globe-cities" style={{ x: driftX }}>
          {CITIES.map(({ name, x, y, count }) => (
            <div key={name} className="css-globe-city" style={{ left: x, top: y }}>
              <div className="css-globe-city-halo" />
              <div className="css-globe-city-dot" />
              <div className="css-globe-city-label">{name} · {count}</div>
            </div>
          ))}
        </motion.div>

        {/* Depth atmosphere — static overlay */}
        <div className="css-globe-atmo" />
      </div>
    </div>
  );
}
