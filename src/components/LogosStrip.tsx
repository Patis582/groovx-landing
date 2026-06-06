"use client";

const FIRMS = [
  "FTMO",
  "Apex Trader Funding",
  "TopstepX",
  "Earn2Trade",
  "MyFXBook",
  "The Funded Trader",
  "True Forex Funds",
  "Fidelcrest",
];

export default function LogosStrip() {
  const doubled = [...FIRMS, ...FIRMS];
  return (
    <div className="logos-strip">
      <div className="logos-label">Trusted by traders from</div>
      <div className="logos-track-wrap">
        <div className="logos-track">
          {doubled.map((f, i) => (
            <div key={i} className="logo-item">
              {f}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
