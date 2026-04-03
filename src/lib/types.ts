// Types for the French energy electrification dashboard

export type EnergyType =
  | 'electricite'
  | 'gaz_naturel'
  | 'produits_petroliers'
  | 'energies_renouvelables'
  | 'charbon'
  | 'chaleur_reseaux'
  | 'autres';

export interface EnergyShare {
  energyType: EnergyType;
  label: string;
  consumption: number; // TWh
  consumptionMtep: number; // Mtep
  percentage: number; // 0-100
  color: string;
}

export interface Sector {
  id: string;
  label: string;
  icon: string; // icon key (e.g. 'home', 'building', 'factory', 'truck', 'tractor')
  totalConsumption: number; // TWh
  totalConsumptionMtep: number; // Mtep
  percentOfTotal: number; // 0-100
  electricityShare: number; // 0-100
  color: string;
  subsectorIds: string[];
  year: number;
}

export interface Subsector {
  id: string;
  sectorId: string;
  label: string;
  totalConsumption: number; // TWh
  totalConsumptionMtep: number; // Mtep
  percentOfSector: number; // 0-100
  electricityShare: number; // 0-100
  energyMix: EnergyShare[];
}

export interface SankeyNode {
  name: string;
  depth: number; // 0 = energy source, 1 = sector, 2 = subsector
}

export interface SankeyLink {
  source: number | string; // index into nodes or node name
  target: number | string; // index into nodes or node name
  value: number; // TWh
}

export interface SankeyData {
  nodes: SankeyNode[];
  links: SankeyLink[];
}

export interface ElectrificationTimeseries {
  sectorId: string;
  dataPoints: {
    year: number;
    electricityShare: number; // 0-100
  }[];
}
