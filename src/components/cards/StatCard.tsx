interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

export function StatCard({
  title,
  value,
  unit,
  subtitle,
  trend,
  className = "",
}: StatCardProps) {
  return (
    <div
      className={`bg-white rounded-xl border border-wavestone-deep/5 shadow-sm p-5 flex flex-col gap-1 ${className}`}
    >
      <span className="text-sm text-wavestone-deep/60 font-medium">{title}</span>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-wavestone-deep tabular-nums">
          {value}
        </span>
        <span className="text-base text-wavestone-deep/50 font-medium">{unit}</span>
        {trend && trend !== "neutral" && (
          <span
            className={`flex items-center text-sm font-semibold ${
              trend === "up" ? "text-green-600" : "text-red-500"
            }`}
          >
            {trend === "up" ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 4l4 5H4l4-5z" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 12l4-5H4l4 5z" />
              </svg>
            )}
          </span>
        )}
      </div>
      {subtitle && (
        <span className="text-xs text-wavestone-deep/40 mt-1">{subtitle}</span>
      )}
    </div>
  );
}
