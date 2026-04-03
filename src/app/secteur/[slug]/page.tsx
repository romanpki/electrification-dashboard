import { getSectors, getSector, getSubsectors, getTimeseries } from "@/lib/data";
import { SectorPageClient } from "./SectorPageClient";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getSectors().map((s) => ({ slug: s.id }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const sector = getSector(slug);
  if (!sector) return {};
  return {
    title: `${sector.label} | Électrification France`,
    description: `Analyse de la consommation énergétique et du taux d'électrification du secteur ${sector.label} en France`,
  };
}

export default async function SectorPage({ params }: { params: Params }) {
  const { slug } = await params;
  const sector = getSector(slug);
  if (!sector) notFound();

  const subsectors = getSubsectors(slug);
  const timeseries = getTimeseries().filter((t) => t.sectorId === slug);

  return (
    <SectorPageClient
      sector={sector}
      subsectors={subsectors}
      timeseries={timeseries}
    />
  );
}
