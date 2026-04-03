"use client";

import { Sector, Subsector } from "@/lib/types";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { EnergyMixDonut } from "@/components/charts/EnergyMixDonut";
import { StatCard } from "@/components/cards/StatCard";
import { ElectrificationBadge } from "@/components/cards/ElectrificationBadge";
import { useUnit } from "@/hooks/useUnitToggle";
import { formatTWh, formatMtep, formatPercent } from "@/lib/utils";
import { ENERGY_TYPES } from "@/lib/constants";
import ReactECharts from "echarts-for-react";

interface Props {
  sector: Sector;
  subsector: Subsector;
  sectorElecRate: number;
  nationalElecRate: number;
}

export function SubsectorPageClient({
  sector,
  subsector,
  sectorElecRate,
  nationalElecRate,
}: Props) {
  const { unit } = useUnit();
  const formatFn = unit === "TWh" ? formatTWh : formatMtep;
  const displayValue =
    unit === "TWh"
      ? subsector.totalConsumption
      : subsector.totalConsumptionMtep;

  // Comparison bar chart data
  const comparisonOption = {
    tooltip: {
      trigger: "axis" as const,
      formatter: (params: Array<{ name: string; value: number }>) => {
        return params
          .map((p) => `${p.name}: ${p.value.toFixed(1)} %`)
          .join("<br/>");
      },
    },
    grid: {
      left: 20,
      right: 40,
      top: 20,
      bottom: 40,
      containLabel: true,
    },
    xAxis: {
      type: "category" as const,
      data: [subsector.label, `Secteur ${sector.label}`, "National"],
      axisLabel: { fontSize: 12 },
    },
    yAxis: {
      type: "value" as const,
      max: 100,
      axisLabel: { formatter: "{value} %" },
    },
    series: [
      {
        type: "bar",
        data: [
          {
            value: subsector.electricityShare,
            itemStyle: { color: "#1A3FBF" },
          },
          { value: sectorElecRate, itemStyle: { color: "#6B8DD6" } },
          { value: nationalElecRate, itemStyle: { color: "#B0C4E8" } },
        ],
        barWidth: "50%",
        label: {
          show: true,
          position: "top" as const,
          formatter: "{c} %",
          fontWeight: "bold" as const,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-wavestone-deep to-wavestone-blue py-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: sector.label, href: `/secteur/${sector.id}` },
              { label: subsector.label },
            ]}
          />
          <div className="mt-6 flex items-center gap-4">
            <ElectrificationBadge
              percentage={subsector.electricityShare}
              size="lg"
            />
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                {subsector.label}
              </h1>
              <p className="text-blue-200 mt-1">
                {sector.label} &middot; {formatFn(displayValue)} &middot;{" "}
                {formatPercent(subsector.percentOfSector)} du secteur
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key stats */}
      <section className="py-8 px-4 sm:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Consommation"
            value={formatFn(displayValue)}
          />
          <StatCard
            title="Part du secteur"
            value={formatPercent(subsector.percentOfSector)}
          />
          <StatCard
            title="Électrification"
            value={formatPercent(subsector.electricityShare)}
          />
          <StatCard
            title="Types d'énergie"
            value={`${subsector.energyMix.length}`}
          />
        </div>
      </section>

      {/* Donut + Details */}
      <section className="py-12 px-4 sm:px-8 bg-wavestone-gray">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-wavestone-deep mb-8">
            Mix énergétique
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <EnergyMixDonut
              energyMix={subsector.energyMix}
              title={`Mix énergétique - ${subsector.label}`}
            />
            <div>
              <h3 className="font-semibold text-wavestone-deep mb-4">
                Détail par type d&apos;énergie
              </h3>
              <div className="space-y-3">
                {subsector.energyMix
                  .sort((a, b) => b.percentage - a.percentage)
                  .map((em) => {
                    const emDisplayValue =
                      unit === "TWh" ? em.consumption : em.consumptionMtep;
                    return (
                      <div
                        key={em.energyType}
                        className="bg-white rounded-lg p-4 flex items-center gap-4"
                      >
                        <div
                          className="w-4 h-4 rounded-full shrink-0"
                          style={{ backgroundColor: em.color }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900 truncate">
                              {em.label}
                            </span>
                            <span className="font-bold text-gray-900 ml-2">
                              {formatPercent(em.percentage)}
                            </span>
                          </div>
                          <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full transition-all"
                              style={{
                                width: `${em.percentage}%`,
                                backgroundColor: em.color,
                              }}
                            />
                          </div>
                          <span className="text-xs text-gray-500 mt-0.5">
                            {formatFn(emDisplayValue)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-12 px-4 sm:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-wavestone-deep mb-2">
            Comparaison du taux d&apos;électrification
          </h2>
          <p className="text-gray-600 mb-8">
            Sous-secteur vs secteur vs moyenne nationale
          </p>
          <div className="max-w-lg mx-auto">
            <ReactECharts
              option={comparisonOption}
              style={{ height: 300 }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
