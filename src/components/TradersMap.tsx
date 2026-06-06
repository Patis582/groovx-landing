"use client";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const TRADERS = [
  { name: "New York",  lng: -74.006,  lat: 40.7128,  count: "1,240" },
  { name: "London",    lng: -0.1276,  lat: 51.5074,  count: "980"   },
  { name: "Tokyo",     lng: 139.6917, lat: 35.6895,  count: "760"   },
  { name: "Sydney",    lng: 151.2093, lat: -33.8688, count: "420"   },
  { name: "Dubai",     lng: 55.2708,  lat: 25.2048,  count: "590"   },
];

const ACCENT = "#2DD4BF";

export default function TradersMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const rafRef = useRef<number>(0);
  const rotatingRef = useRef(true);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token || !containerRef.current) return;

    mapboxgl.accessToken = token;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      projection: "globe" as unknown as mapboxgl.Projection,
      zoom: 1.4,
      center: [20, 30],
      interactive: true,
      attributionControl: false,
      logoPosition: "bottom-right",
    });
    mapRef.current = map;

    map.on("style.load", () => {
      // Subtle atmosphere
      map.setFog({
        color: "rgba(13,17,23,0.6)",
        "high-color": "#0D1117",
        "horizon-blend": 0.03,
        "space-color": "#0D1117",
        "star-intensity": 0.25,
      });

      // Add pulsing dot source + layers for each city
      TRADERS.forEach(({ name, lng, lat }) => {
        const id = name.replace(/\s/g, "_").toLowerCase();

        map.addSource(id, {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [{
              type: "Feature",
              geometry: { type: "Point", coordinates: [lng, lat] },
              properties: { name },
            }],
          },
        });

        // Glow halo
        map.addLayer({
          id: `${id}_halo`,
          type: "circle",
          source: id,
          paint: {
            "circle-radius": 14,
            "circle-color": ACCENT,
            "circle-opacity": 0.12,
            "circle-blur": 1,
          },
        });

        // Core dot
        map.addLayer({
          id: `${id}_dot`,
          type: "circle",
          source: id,
          paint: {
            "circle-radius": 5,
            "circle-color": ACCENT,
            "circle-opacity": 0.95,
            "circle-stroke-width": 1.5,
            "circle-stroke-color": "rgba(255,255,255,0.3)",
          },
        });
      });

      // Animate halo pulse
      let t = 0;
      const pulse = () => {
        t += 0.025;
        const r = 10 + Math.sin(t) * 6;
        const o = 0.08 + Math.sin(t) * 0.06;
        TRADERS.forEach(({ name }) => {
          const id = `${name.replace(/\s/g, "_").toLowerCase()}_halo`;
          if (map.getLayer(id)) {
            map.setPaintProperty(id, "circle-radius", r);
            map.setPaintProperty(id, "circle-opacity", o);
          }
        });
        rafRef.current = requestAnimationFrame(pulse);
      };
      pulse();
    });

    // Auto-rotate
    const rotate = () => {
      if (!rotatingRef.current) return;
      map.easeTo({ bearing: map.getBearing() + 0.15, duration: 0, easing: (x) => x });
      rafRef.current = requestAnimationFrame(rotate);
    };
    map.on("load", () => requestAnimationFrame(rotate));

    // Stop rotation on interaction
    const stopRotate = () => { rotatingRef.current = false; };
    const resumeRotate = () => {
      rotatingRef.current = true;
      requestAnimationFrame(rotate);
    };
    map.on("mousedown", stopRotate);
    map.on("touchstart", stopRotate);
    map.on("mouseup", resumeRotate);
    map.on("touchend", resumeRotate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      map.remove();
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
          minHeight: 340,
        }}
      />
      {/* Trader count chips */}
      <div style={{
        position: "absolute",
        bottom: 14,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        gap: 6,
        flexWrap: "wrap",
        padding: "0 12px",
        pointerEvents: "none",
      }}>
        {TRADERS.map(({ name, count }) => (
          <div key={name} style={{
            background: "rgba(13,17,23,0.8)",
            border: "1px solid rgba(45,212,191,0.22)",
            backdropFilter: "blur(8px)",
            borderRadius: 20,
            padding: "3px 10px",
            fontSize: 10,
            fontWeight: 600,
            color: ACCENT,
            fontFamily: "var(--font-space-mono), monospace",
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: ACCENT, display: "inline-block" }} />
            {name} · {count}
          </div>
        ))}
      </div>
    </div>
  );
}
