"use client";

const ITEMS = [
  { p: "EUR/USD", c: "+0.23%", up: true },
  { p: "GBP/JPY", c: "-0.41%", up: false },
  { p: "NAS100", c: "+1.12%", up: true },
  { p: "XAU/USD", c: "+0.67%", up: true },
  { p: "BTC/USD", c: "-0.89%", up: false },
  { p: "USD/CHF", c: "+0.15%", up: true },
  { p: "SPX500", c: "+0.34%", up: true },
  { p: "EUR/GBP", c: "-0.12%", up: false },
  { p: "US30", c: "+0.56%", up: true },
  { p: "AUD/USD", c: "-0.28%", up: false },
];

export default function Ticker() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="ticker">
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <div key={i} className="ticker-item">
            <span>{item.p}</span>
            <span className={item.up ? "up" : "down"}>{item.c}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
