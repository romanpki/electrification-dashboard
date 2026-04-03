"use client";

import { Sector, Subsector, ElectrificationTimeseries } from "@/lib/types";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { SubsectorBar } from "@/components/charts/SubsectorBar";
import { ElectrificationGauge } from "@/components/charts/ElectrificationGauge";
import { TimeseriesLine } from "@/components/charts/TimeseriesLine";
import { StatCard } from "@/components/cards/StatCard";
import { ElectrificationBadge } from "@/components/cards/ElectrificationBadge";
import { useUnit } from "@/hooks/useUnitToggle";
import { formatTWh, formatMtep, formatPercent } from "@/lib/utils";
import Link from "next/link";

const SECTOR_ICONS: Record<string, string> = {
  residentiel: "🏠",
  tertiaire: "🏢",
  industrie: "🏭",
  transports: "🚗",
  agriculture: "🌾",
};

interface Props {
  sector: Sector;
  subsectors: Subsector[];
  timeseries: ElectrificationTimeseries[];
}

export function SectorPageClient({ sector, subsectors, timeseries }: Props) {
  const { unit } = useUnit();

  const displayValue =
    unit === "TWh" ? sector.totalConsumption : sector.totalConsumptionMtep;
  const formatFn = unit === "TWh" ? formatTWh : formatMtep;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-wavestone-deep to-wavestone-blue py-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: sector.label },
            ]}
          />
          <div className="flex items-center gap-4 mt-6">
            <span className="text-5xl">
              {SECTOR_ICONS[sector.id] || "⚡"}
            </span>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                {sector.label}
              </h1>
              <p className="text-blue-200 mt-1">
                {formatFn(displayValue)} &middot;{" "}
                {formatPercent(sector.percentOfTotal)} de la consommation
                nationale
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key stats */}
      <section className="py-8 px-4 sm:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Consommation totale"
            value={formatFn(displayValue)}
          />
          <StatCard
            title="Part nationale"
            value={formatPercent(sector.percentOfTotal)}
          />
          <StatCard
            title="Taux d'électrification"
            value={formatPercent(sector.electricityShare)}
          />
          <StatCard
            title="Sous-secteurs"
            value={`${subsectors.length}`}
          />
        </div>
      </section>

      {/* Subsector breakdown */}
      <section className="py-12 px-4 sm:px-8 bg-wavestone-gray">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-wavestone-deep mb-2">
            Répartition par sous-secteur
          </h2>
          <p className="text-gray-600 mb-8">
            Cliquez sur un sous-secteur pour voir le détail de son mix
            énergétique
          </p>
          <SubsectorBar subsectors={subsectors} sectorId={sector.id} />
        </div>
      </section>

      {/* Subsector cards grid */}
      <section className="py-12 px-4 sm:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-wavestone-deep mb-8">
            Détail des sous-secteurs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subsectors.map((sub) => {
              const subDisplayValue =
                unit === "TWh" ? sub.totalConsumption : sub.totalConsumptionMtep;
              return (
                <Link
                  key={sub.id}
                  href={`/secteur/${sector.id}/${sub.id}`}
                  className="group block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-wavestone-blue transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-wavestone-deep group-hover:text-wavestone-blue transition-colors">
                      {sub.label}
                    </h3>
                    <ElectrificationBadge
                      percentage={sub.electricityShare}
                      size="sm"
                    />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatFn(subDisplayValue)}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatPercent(sub.percentOfSector)} du secteur
                  </p>
                  <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-wavestone-blue h-2 rounded-full transition-all"
                      style={{ width: `${sub.electricityShare}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Électrification : {formatPercent(sub.electricityShare)}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Electrification gauge + Timeseries */}
      <section className="py-12 px-4 sm:px-8 bg-wavestone-gray">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-wavestone-deep mb-8">
            Électrification du secteur
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center justify-center">
              <ElectrificationGauge
                value={sector.electricityShare}
                title={`Taux d'électrification - ${sector.label}`}
              />
            </div>
            <div className="lg:col-span-2">
              {timeseries.length > 0 && <TimeseriesLine data={timeseries} />}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
