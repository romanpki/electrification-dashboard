interface ElectrificationBadgeProps {
  percentage: number;
  size?: "sm" | "md" | "lg";
}

const SIZES = {
  sm: { outer: "w-12 h-12", text: "text-xs", ring: 3 },
  md: { outer: "w-16 h-16", text: "text-sm", ring: 4 },
  lg: { outer: "w-20 h-20", text: "text-base", ring: 5 },
} as const;

function getBadgeColor(pct: number): string {
  if (pct >= 60) return "#1A3FBF";
  if (pct >= 40) return "#00C853";
  if (pct >= 20) return "#F59E0B";
  return "#EF4444";
}

export function ElectrificationBadge({
  percentage,
  size = "md",
}: ElectrificationBadgeProps) {
  const config = SIZES[size];
  const color = getBadgeColor(percentage);
  const clamped = Math.min(Math.max(percentage, 0), 100);

  // SVG circular progress
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - clamped / 100);

  return (
    <div
      className={`relative ${config.outer} flex items-center justify-center`}
      title={`${percentage.toFixed(1)} %`}
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full -rotate-90">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#E8EDFB"
          strokeWidth={config.ring}
        />
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={config.ring}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700"
        />
      </svg>
      <span className={`${config.text} font-bold`} style={{ color }}>
        {Math.round(clamped)}%
      </span>
    </div>
  );
}
