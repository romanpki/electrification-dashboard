"use client";

import { getSankeyData } from "@/lib/data";
import { SankeyDiagram } from "@/components/charts/SankeyDiagram";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import Link from "next/link";

export default function SankeyPage() {
  const sankeyData = getSankeyData();

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-wavestone-deep to-wavestone-blue py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Flux énergétiques" },
            ]}
          />
          <h1 className="text-3xl sm:text-4xl font-bold text-white mt-4">
            Diagramme de Sankey
          </h1>
          <p className="text-blue-200 mt-2">
            Flux d&apos;énergie des sources primaires vers les secteurs de
            consommation en France
          </p>
        </div>
      </section>

      <section className="py-8 px-4 sm:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <SankeyDiagram data={sankeyData} height={600} />
        </div>
      </section>

      <section className="py-8 px-4 sm:px-8 bg-wavestone-gray">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600 mb-4">
            Ce diagramme illustre les flux énergétiques depuis les sources
            d&apos;énergie primaires vers les secteurs de consommation finale en
            France.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-wavestone-blue text-white rounded-lg hover:bg-wavestone-deep transition-colors"
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Retour à l&apos;accueil
          </Link>
        </div>
      </section>
    </div>
  );
}
