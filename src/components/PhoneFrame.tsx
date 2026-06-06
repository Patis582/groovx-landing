import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  /** flip ambient glow colour for right-side phones */
  glowVariant?: "default" | "purple";
}

const FRAME_PX = 11;   // frame thickness
const OUTER_R  = 54;   // outer corner radius
const INNER_R  = OUTER_R - FRAME_PX;  // screen corner radius
const BASE_W   = 290;  // design width the constants below are built for

export default function PhoneFrame({
  src,
  alt,
  width = 290,
  height = 630,
  className = "",
  style,
  glowVariant = "default",
}: Props) {
  const s = width / BASE_W; // scale factor

  const outerR  = Math.round(OUTER_R  * s);
  const innerR  = Math.round(INNER_R  * s);
  const framePx = Math.round(FRAME_PX * s);
  const btnW    = Math.round(4  * s);
  const btnR    = 3;

  const sideBtn = (
    top: number,
    h: number,
    side: "left" | "right"
  ) => ({
    position: "absolute" as const,
    [side]: -btnW,
    top: Math.round(top * s),
    width: btnW,
    height: Math.round(h * s),
    borderRadius:
      side === "left" ? `${btnR}px 0 0 ${btnR}px` : `0 ${btnR}px ${btnR}px 0`,
    background:
      side === "left"
        ? "linear-gradient(90deg, #242426, #343436)"
        : "linear-gradient(270deg, #242426, #343436)",
    boxShadow:
      side === "left"
        ? "-1px 0 0 rgba(255,255,255,0.07)"
        : "1px 0 0 rgba(255,255,255,0.07)",
  });

  const glowColour =
    glowVariant === "purple"
      ? "rgba(167,139,250,0.18)"
      : "rgba(45,212,191,0.18)";

  return (
    <div
      className={className}
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        ...style,
      }}
    >
      {/* ── ambient glow ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width:  Math.round(width  * 0.85),
          height: Math.round(height * 0.55),
          background: `radial-gradient(ellipse, ${glowColour}, transparent 72%)`,
          filter: "blur(28px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── phone body ── */}
      <div
        style={{
          width,
          height,
          borderRadius: outerR,
          background:
            "linear-gradient(155deg, #3C3C3E 0%, #1A1A1C 52%, #2C2C2E 100%)",
          position: "relative",
          flexShrink: 0,
          zIndex: 1,
          boxShadow: [
            "0 0 0 1.5px rgba(0,0,0,0.9)",
            "0 60px 130px rgba(0,0,0,0.85)",
            "0 20px 50px rgba(0,0,0,0.5)",
            "inset 0 1.5px 0 rgba(255,255,255,0.20)",
            "inset 0 0 0 1px rgba(255,255,255,0.06)",
          ].join(", "),
        }}
      >
        {/* frame shine */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: outerR,
            background:
              "linear-gradient(140deg, rgba(255,255,255,0.09) 0%, transparent 45%)",
            pointerEvents: "none",
            zIndex: 20,
          }}
        />

        {/* ── left buttons ── */}
        {/* silent switch */}
        <div style={sideBtn(96, 26, "left")} />
        {/* volume up */}
        <div style={sideBtn(144, 60, "left")} />
        {/* volume down */}
        <div style={sideBtn(220, 60, "left")} />

        {/* ── right button ── power */}
        <div style={sideBtn(178, 84, "right")} />

        {/* ── screen ── */}
        <div
          style={{
            position: "absolute",
            top:    framePx,
            left:   framePx,
            right:  framePx,
            bottom: framePx,
            borderRadius: innerR,
            overflow: "hidden",
            background: "#000",
          }}
        >

          {/* screenshot */}
          <Image
            src={src}
            alt={alt}
            fill
            style={{ objectFit: "cover", objectPosition: "top" }}
            sizes={`${width}px`}
            priority={src === "/feed.PNG"}
          />
        </div>

        {/* ── bottom hardware ── */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: Math.round(13 * s),
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: Math.round(5 * s),
          }}
        >
          {/* left speaker dots */}
          {[0, 1, 2, 3].map((i) => (
            <div
              key={`sl${i}`}
              style={{
                width:  Math.round(3.5 * s),
                height: Math.round(3.5 * s),
                borderRadius: "50%",
                background: "#0A0A0A",
                boxShadow:
                  "inset 0 1px 1px rgba(0,0,0,0.9), 0 0 0 0.5px rgba(255,255,255,0.09)",
              }}
            />
          ))}

          {/* USB-C port */}
          <div
            style={{
              width:  Math.round(58 * s),
              height: Math.round(6  * s),
              borderRadius: Math.round(3 * s),
              background: "#080808",
              margin: `0 ${Math.round(4 * s)}px`,
              boxShadow:
                "inset 0 2px 3px rgba(0,0,0,0.95), 0 0 0 0.5px rgba(255,255,255,0.08)",
            }}
          />

          {/* right speaker dots */}
          {[0, 1, 2, 3].map((i) => (
            <div
              key={`sr${i}`}
              style={{
                width:  Math.round(3.5 * s),
                height: Math.round(3.5 * s),
                borderRadius: "50%",
                background: "#0A0A0A",
                boxShadow:
                  "inset 0 1px 1px rgba(0,0,0,0.9), 0 0 0 0.5px rgba(255,255,255,0.09)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
