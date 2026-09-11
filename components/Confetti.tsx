type Shape = "star" | "dot" | "dash" | "triangle";

interface Piece {
  shape: Shape;
  color: string;
  className: string;
  size: number;
  delay: string;
}

const COLORS = {
  violet: "#4E2E8C",
  magenta: "#D91C74",
  teal: "#149385",
  amber: "#E8992C",
};

function ShapeSvg({ shape, color, size }: { shape: Shape; color: string; size: number }) {
  if (shape === "star") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 1.5l2.6 6.6 7.1.4-5.5 4.6 1.9 6.9L12 16.2 5.9 20l1.9-6.9-5.5-4.6 7.1-.4L12 1.5z"
          fill={color}
        />
      </svg>
    );
  }
  if (shape === "dot") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill={color} />
      </svg>
    );
  }
  if (shape === "triangle") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2L22 20H2L12 2z" fill={color} />
      </svg>
    );
  }
  // dash
  return (
    <svg width={size} height={size * 0.35} viewBox="0 0 24 8" fill="none" aria-hidden="true">
      <rect x="0" y="0" width="24" height="8" rx="4" fill={color} />
    </svg>
  );
}

const HERO_PIECES: Piece[] = [
  { shape: "star", color: COLORS.magenta, className: "top-2 right-10 rotate-[-12deg]", size: 22, delay: "0s" },
  { shape: "dot", color: COLORS.teal, className: "top-24 right-0 rotate-0", size: 10, delay: "0.4s" },
  { shape: "dash", color: COLORS.amber, className: "top-0 right-32 rotate-[18deg]", size: 26, delay: "0.2s" },
  { shape: "triangle", color: COLORS.violet, className: "top-40 right-20 rotate-[8deg]", size: 14, delay: "0.6s" },
  { shape: "dot", color: COLORS.magenta, className: "top-14 right-44 rotate-0", size: 7, delay: "0.1s" },
];

const DIVIDER_PIECES: Piece[] = [
  { shape: "dot", color: COLORS.teal, className: "left-0 rotate-0", size: 8, delay: "0s" },
  { shape: "dash", color: COLORS.amber, className: "left-8 rotate-[10deg]", size: 20, delay: "0.3s" },
  { shape: "star", color: COLORS.magenta, className: "left-20 rotate-[-10deg]", size: 14, delay: "0.15s" },
];

export function ConfettiField({ variant = "hero" }: { variant?: "hero" | "divider" }) {
  const pieces = variant === "hero" ? HERO_PIECES : DIVIDER_PIECES;
  return (
    <div className="pointer-events-none absolute inset-0 -z-0" aria-hidden="true">
      {pieces.map((p, i) => (
        <span
          key={i}
          className={`absolute inline-block animate-[drift_7s_ease-in-out_infinite] ${p.className}`}
          style={{ animationDelay: p.delay }}
        >
          <ShapeSvg shape={p.shape} color={p.color} size={p.size} />
        </span>
      ))}
      <style>{`
        @keyframes drift {
          0%, 100% { transform: translateY(0px) rotate(var(--r, 0deg)); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
