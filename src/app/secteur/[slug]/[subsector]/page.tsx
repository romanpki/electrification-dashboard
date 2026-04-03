import {
  getSectors,
  getSector,
  getSubsectors,
  getSubsector,
  getAllSubsectorParams,
} from "@/lib/data";
import { SubsectorPageClient } from "./SubsectorPageClient";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getAllSubsectorParams();
}

type Params = Promise<{ slug: string; subsector: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug, subsector: subId } = await params;
  const sector = getSector(slug);
  const subsector = getSubsector(slug, subId);
  if (!sector || !subsector) return {};
  return {
    title: `${subsector.label} - ${sector.label} | Électrification France`,
    description: `Mix énergétique et taux d'électrification de ${subsector.label} dans le secteur ${sector.label} en France`,
  };
}

export default async function SubsectorPage({ params }: { params: Params }) {
  const { slug, subsector: subId } = await params;
  const sector = getSector(slug);
  const subsector = getSubsector(slug, subId);
  if (!sector || !subsector) notFound();

  const allSubsectors = getSubsectors(slug);
  const sectors = getSectors();
  const totalNational = sectors.reduce(
    (s, sec) => s + sec.totalConsumption,
    0
  );
  const totalElec = sectors.reduce(
    (s, sec) => s + sec.totalConsumption * (sec.electricityShare / 100),
    0
  );
  const nationalElecRate = (totalElec / totalNational) * 100;

  return (
    <SubsectorPageClient
      sector={sector}
      subsector={subsector}
      sectorElecRate={sector.electricityShare}
      nationalElecRate={nationalElecRate}
    />
  );
}
