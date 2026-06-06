"use client";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const CITIES = [
  { name: "New York", lng: -74.006,  lat: 40.7128,  count: "1,240" },
  { name: "London",   lng: -0.1276,  lat: 51.5074,  count: "980"   },
  { name: "Tokyo",    lng: 139.6917, lat: 35.6895,  count: "760"   },
  { name: "Sydney",   lng: 151.2093, lat: -33.8688, count: "420"   },
  { name: "Dubai",    lng: 55.2708,  lat: 25.2048,  count: "590"   },
  { name: "Prague",   lng: 14.4378,  lat: 50.0755,  count: "340"   },
];

const ACCENT = "#2DD4BF";

export default function FeaturesGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rotatingRef = useRef(true);
  const rafRef = useRef<number>(0);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token || !containerRef.current) return;

    mapboxgl.accessToken = token;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      projection: "globe" as unknown as mapboxgl.Projection,
      zoom: 1.6,
      center: [20, 25],
      interactive: true,
      attributionControl: false,
      logoPosition: "bottom-right",
    });

    map.on("style.load", () => {
      map.setFog({
        color: "rgba(13,17,23,0.6)",
        "high-color": "#0D1117",
        "horizon-blend": 0.03,
        "space-color": "#0D1117",
        "star-intensity": 0.3,
      });

      CITIES.forEach(({ name, lng, lat }) => {
        const id = name.replace(/\s/g, "_").toLowerCase();
        map.addSource(id, {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [{ type: "Feature", geometry: { type: "Point", coordinates: [lng, lat] }, properties: { name } }],
          },
        });
        map.addLayer({ id: `${id}_halo`, type: "circle", source: id, paint: { "circle-radius": 14, "circle-color": ACCENT, "circle-opacity": 0.1, "circle-blur": 1 } });
        map.addLayer({ id: `${id}_dot`,  type: "circle", source: id, paint: { "circle-radius": 5, "circle-color": ACCENT, "circle-opacity": 0.95, "circle-stroke-width": 1.5, "circle-stroke-color": "rgba(255,255,255,0.3)" } });
      });

      let t = 0;
      const pulse = () => {
        t += 0.02;
        const r = 10 + Math.sin(t) * 6;
        const o = 0.06 + Math.sin(t) * 0.05;
        CITIES.forEach(({ name }) => {
          const haloId = `${name.replace(/\s/g, "_").toLowerCase()}_halo`;
          if (map.getLayer(haloId)) {
            map.setPaintProperty(haloId, "circle-radius", r);
            map.setPaintProperty(haloId, "circle-opacity", o);
          }
        });
        requestAnimationFrame(pulse);
      };
      pulse();
    });

    const rotate = () => {
      if (!rotatingRef.current) return;
      map.easeTo({ bearing: map.getBearing() + 0.5, duration: 0, easing: (x) => x });
      rafRef.current = requestAnimationFrame(rotate);
    };

    map.on("load", () => requestAnimationFrame(rotate));

    const stopRotate = () => {
      rotatingRef.current = false;
      cancelAnimationFrame(rafRef.current);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = setTimeout(() => {
        rotatingRef.current = true;
        requestAnimationFrame(rotate);
      }, 3000);
    };

    map.on("mousedown", stopRotate);
    map.on("touchstart", stopRotate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      map.remove();
    };
  }, []);

  return (
    <div className="feat-globe-wrap">
      {/* Label */}
      <div className="feat-globe-label">
        <span className="feat-globe-dot" />
        Live on GroovX
      </div>

      {/* Map */}
      <div ref={containerRef} className="feat-globe-map" />

      {/* City chips */}
      <div className="feat-globe-chips">
        {CITIES.map(({ name, count }) => (
          <div key={name} className="feat-globe-chip">
            <span className="feat-globe-chip-dot" />
            {name} · {count}
          </div>
        ))}
      </div>
    </div>
  );
}
