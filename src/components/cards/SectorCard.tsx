import Link from "next/link";
import type { Sector } from "@/lib/types";
import { formatPercent } from "@/lib/utils";

const SECTOR_ICONS: Record<string, string> = {
  home: "\uD83C\uDFE0",
  building: "\uD83C\uDFE2",
  factory: "\uD83C\uDFED",
  truck: "\uD83D\uDE9A",
  tractor: "\uD83D\uDE9C",
};

interface SectorCardProps {
  sector: Sector;
}

export function SectorCard({ sector }: SectorCardProps) {
  const icon = SECTOR_ICONS[sector.icon] ?? "\u26A1";

  return (
    <Link
      href={`/secteur/${sector.id}`}
      className="group block bg-white rounded-xl border border-wavestone-deep/5 shadow-sm p-5 transition-all duration-200 hover:shadow-lg hover:scale-[1.02] hover:border-wavestone-blue/20"
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl" role="img" aria-label={sector.label}>
          {icon}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-wavestone-deep text-base group-hover:text-wavestone-blue transition-colors">
            {sector.label}
          </h3>
          <p className="text-sm text-wavestone-deep/50 mt-0.5">
            {sector.totalConsumption.toLocaleString("fr-FR", {
              maximumFractionDigits: 1,
            })}{" "}
            TWh
          </p>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-wavestone-deep/60">Taux d&apos;électrification</span>
          <span className="font-semibold text-wavestone-blue">
            {formatPercent(sector.electricityShare)}
          </span>
        </div>
        <div className="h-2 rounded-full bg-wavestone-light overflow-hidden">
          <div
            className="h-full rounded-full bg-wavestone-blue transition-all duration-500"
            style={{ width: `${Math.min(sector.electricityShare, 100)}%` }}
          />
        </div>
      </div>
    </Link>
  );
}
