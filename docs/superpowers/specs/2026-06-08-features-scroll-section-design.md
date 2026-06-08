# Features Section — Scroll-Driven Design

**Date:** 2026-06-08  
**Status:** Approved

## Overview

Replace the current 3×2 card grid + Mapbox globe with a full scroll-driven storytelling section. As the user scrolls, each feature is presented one at a time with a sticky layout: left side shows a vertical timeline nav, right side animates between feature panels.

Mapbox is removed entirely. The globe is replaced with a pure CSS animated sphere.

---

## Layout

The section has a tall scroll container (`height: 600vh`) so scrolling through it takes time. Inside, a sticky inner container (`position: sticky; height: 100vh`) holds two columns:

- **Left column (220px):** Vertical timeline with 6 dots connected by lines. The active dot glows teal. Text labels for each feature. Stays sticky while the right panel changes.
- **Right column (flex: 1):** Displays the current feature panel. Transitions with Framer Motion `AnimatePresence` (fade + slight vertical slide).

---

## The 6 Panels

| # | Feature | Visual | Key detail |
|---|---------|--------|------------|
| 01 | Trade Cards | `feed.PNG` in phone mockup | Shows the feed with structured trade cards |
| 02 | Verified Trades | `tradecard_detail.PNG` zoomed in | Verification badge highlighted, MyFXBook logo |
| 03 | Traders Map | CSS Globe (see below) | Globe rotates based on scroll progress, city chips |
| 04 | Funded Trader Badge | Trophy icon + prop firm label | Certificate upload illustration |
| 05 | Communities | `community.PNG` in phone mockup | Chat screenshot |
| 06 | Profile Stats | `prifle.PNG` in phone mockup | Stats: avg R, profit factor, trade count |

Each panel has: feature number, title, description text, teal badge/tag line, and a visual on the left.

---

## Scroll Mechanics

- Use Framer Motion `useScroll` with `target` ref on the tall container.
- `scrollYProgress` (0→1) maps to 6 panels: `Math.floor(progress * 6)` = active panel index (clamped 0–5).
- Active panel index drives: left nav dot highlight, right panel content swap via `AnimatePresence`.
- Globe rotation: `useTransform(scrollYProgress, [2/6, 3/6], [0, 360])` — rotates 360° as panel 3 scrolls into and out of view.

---

## CSS Globe

Pure CSS, no dependencies. Renders inside the panel 3 visual slot.

**Structure:**
```
.globe (sphere shape via border-radius:50%, radial-gradient background)
  .globe-grid (repeating-linear-gradient lines — latitude/longitude, animates translateX for drift)
  .globe-atmosphere (radial overlay for depth/shadow)
  [city dots] (absolute positioned teal dots with pulse animation)
```

**Rotation on scroll:** A `style` prop from `useTransform` applies `rotateY` or a `translateX` on the grid layer to simulate rotation tied to scroll progress.

**Cities shown:** New York, London, Tokyo, Dubai, Sydney, Prague — each as a teal dot with a chip label showing trader count.

---

## Components

### New / Changed

| File | Action | Purpose |
|------|--------|---------|
| `src/components/FeaturesSection.tsx` | Create | Main scroll-driven section — replaces FeatureCards + FeaturesGlobe |
| `src/components/CSSGlobe.tsx` | Create | Pure CSS animated globe, accepts `rotationProgress` prop (0–1) |
| `src/app/page.tsx` | Update | Swap `<FeatureCards/>` + `<FeaturesGlobe/>` for `<FeaturesSection/>` |
| `src/app/globals.css` | Update | Add styles for `.features-scroll`, `.feat-nav`, `.feat-panel`; remove old `.feat-grid-*` and `.feat-globe-*` |

### Removed

- `src/components/FeatureCards.tsx` — deleted
- `src/components/FeaturesGlobe.tsx` — deleted
- `src/components/TradersMap.tsx` — deleted (was already unused)
- `mapbox-gl` package — uninstalled

---

## Panel Transition Animation

```
initial:  { opacity: 0, y: 20 }
animate:  { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22,1,0.36,1] } }
exit:     { opacity: 0, y: -20, transition: { duration: 0.3 } }
```

Wrapped in `AnimatePresence mode="wait"` so panels don't overlap during transition.

---

## Mobile Behavior

Below 768px: sticky layout collapses. Left nav dots become a horizontal progress bar at the top. Each panel stacks vertically (normal scroll, no sticky). Globe is smaller (80px diameter).

---

## Dependencies

- Framer Motion — already installed
- No new packages needed
- `mapbox-gl` removed from `package.json`
