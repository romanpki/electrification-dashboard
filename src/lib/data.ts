import { Sector, Subsector, SankeyData, ElectrificationTimeseries } from "./types";
import sectorsData from "../../data/processed/sectors.json";
import subsectorsData from "../../data/processed/subsectors.json";
import sankeyData from "../../data/processed/sankey.json";
import timeseriesData from "../../data/processed/timeseries.json";

export function getSectors(): Sector[] {
  return sectorsData as Sector[];
}

export function getSector(slug: string): Sector | undefined {
  return getSectors().find((s) => s.id === slug);
}

export function getSubsectors(sectorId: string): Subsector[] {
  return (subsectorsData as Subsector[]).filter(
    (s) => s.sectorId === sectorId
  );
}

export function getSubsector(
  sectorId: string,
  subsectorId: string
): Subsector | undefined {
  return (subsectorsData as Subsector[]).find(
    (s) => s.sectorId === sectorId && s.id === subsectorId
  );
}

export function getSankeyData(): SankeyData {
  return sankeyData as SankeyData;
}

export function getTimeseries(): ElectrificationTimeseries[] {
  return timeseriesData as ElectrificationTimeseries[];
}

export function getAllSubsectorParams(): { slug: string; subsector: string }[] {
  const sectors = getSectors();
  const allSubsectors = subsectorsData as Subsector[];
  const params: { slug: string; subsector: string }[] = [];

  for (const sector of sectors) {
    const subs = allSubsectors.filter((s) => s.sectorId === sector.id);
    for (const sub of subs) {
      params.push({ slug: sector.id, subsector: sub.id });
    }
  }

  return params;
}
