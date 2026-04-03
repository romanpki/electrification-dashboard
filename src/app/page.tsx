"use client";

import { getSectors, getSankeyData, getTimeseries } from "@/lib/data";
import { SectorTreemap } from "@/components/charts/SectorTreemap";
import { ElectrificationGauge } from "@/components/charts/ElectrificationGauge";
import { SankeyDiagram } from "@/components/charts/SankeyDiagram";
import { TimeseriesLine } from "@/components/charts/TimeseriesLine";
import { SectorCard } from "@/components/cards/SectorCard";
import { StatCard } from "@/components/cards/StatCard";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { useUnit } from "@/hooks/useUnitToggle";
import Link from "next/link";

export default function HomePage() {
  const sectors = getSectors();
  const sankeyData = getSankeyData();
  const timeseries = getTimeseries();
  const { unit } = useUnit();

  const totalConsumption = sectors.reduce(
    (sum, s) => sum + s.totalConsumption,
    0
  );
  const totalElectricity = sectors.reduce(
    (sum, s) => sum + s.totalConsumption * (s.electricityShare / 100),
    0
  );
  const nationalElecRate = (totalElectricity / totalConsumption) * 100;

  const displayTotal =
    unit === "TWh" ? totalConsumption : totalConsumption / 11.63;
  const displayUnit = unit;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-wavestone-deep to-wavestone-blue py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Électrification des Usages en France
          </h1>
          <p className="text-lg text-blue-200 mb-12 max-w-2xl">
            Panorama de la consommation énergétique finale par secteur
            d&apos;activité et suivi du taux d&apos;électrification
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
              <p className="text-sm uppercase tracking-wider text-blue-200 mb-2">
                Consommation totale
              </p>
              <div className="text-4xl font-bold">
                <AnimatedCounter
                  value={Math.round(displayTotal)}
                  suffix={` ${displayUnit}`}
                />
              </div>
              <p className="text-sm text-blue-200 mt-1">
                Énergie finale, tous secteurs
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
              <p className="text-sm uppercase tracking-wider text-blue-200 mb-2">
                Taux d&apos;électrification
              </p>
              <div className="text-4xl font-bold">
                <AnimatedCounter
                  value={nationalElecRate}
                  decimals={1}
                  suffix=" %"
                />
              </div>
              <p className="text-sm text-blue-200 mt-1">
                Part de l&apos;électricité dans le mix
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
              <p className="text-sm uppercase tracking-wider text-blue-200 mb-2">
                Secteurs analysés
              </p>
              <div className="text-4xl font-bold">
                <AnimatedCounter value={sectors.length} />
              </div>
              <p className="text-sm text-blue-200 mt-1">
                Résidentiel, Tertiaire, Industrie, Transports, Agriculture
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Treemap + Gauge */}
      <section className="py-12 px-4 sm:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-wavestone-deep mb-2">
            Répartition par secteur
          </h2>
          <p className="text-gray-600 mb-8">
            Cliquez sur un secteur pour explorer ses sous-secteurs et son mix
            énergétique
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <SectorTreemap sectors={sectors} />
            </div>
            <div className="flex flex-col items-center justify-center">
              <ElectrificationGauge
                value={nationalElecRate}
                title="Taux national d'électrification"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sector Cards */}
      <section className="py-12 px-4 sm:px-8 bg-wavestone-gray">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-wavestone-deep mb-8">
            Les 5 secteurs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {sectors.map((sector) => (
              <SectorCard key={sector.id} sector={sector} />
            ))}
          </div>
        </div>
      </section>

      {/* Timeseries */}
      <section className="py-12 px-4 sm:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-wavestone-deep mb-2">
            Évolution du taux d&apos;électrification
          </h2>
          <p className="text-gray-600 mb-8">
            Progression de la part d&apos;électricité dans chaque secteur depuis
            2015
          </p>
          <TimeseriesLine data={timeseries} />
        </div>
      </section>

      {/* Sankey Preview */}
      <section className="py-12 px-4 sm:px-8 bg-wavestone-gray">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-wavestone-deep mb-2">
                Flux énergétiques
              </h2>
              <p className="text-gray-600">
                Diagramme de Sankey : des sources d&apos;énergie vers les
                secteurs
              </p>
            </div>
            <Link
              href="/sankey"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-wavestone-blue text-white rounded-lg hover:bg-wavestone-deep transition-colors"
            >
              Plein écran
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
            </Link>
          </div>
          <SankeyDiagram data={sankeyData} />
        </div>
      </section>
    </div>
  );
}
