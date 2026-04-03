// Constants for the French energy electrification dashboard

import type { EnergyType } from './types';

// --- Unit conversion ---
/** 1 Mtep = 11.63 TWh */
export const MTEP_TO_TWH = 11.63;
/** 1 TWh = 1/11.63 Mtep */
export const TWH_TO_MTEP = 1 / MTEP_TO_TWH;

// --- Wavestone brand colors ---
export const WAVESTONE = {
  bleuVibrant: '#1A3FBF',
  bleuFonce: '#0F2A7A',
  bleuClair: '#4F7BE8',
  bleuTresClair: '#D6E4FF',
  orange: '#F28C28',
  vertAccent: '#10B981',
  gris900: '#111827',
  gris700: '#374151',
  gris500: '#6B7280',
  gris300: '#D1D5DB',
  gris100: '#F3F4F6',
  blanc: '#FFFFFF',
} as const;

// --- Energy type labels & colors ---
export const ENERGY_TYPES: Record<
  EnergyType,
  { label: string; color: string }
> = {
  electricite: { label: 'Électricité', color: '#1A3FBF' },
  gaz_naturel: { label: 'Gaz naturel', color: '#F59E0B' },
  produits_petroliers: { label: 'Produits pétroliers', color: '#EF4444' },
  energies_renouvelables: { label: 'EnR thermiques', color: '#10B981' },
  charbon: { label: 'Charbon', color: '#374151' },
  chaleur_reseaux: { label: 'Chaleur réseaux', color: '#8B5CF6' },
  autres: { label: 'Autres', color: '#9CA3AF' },
} as const;

// --- Sector colors (Wavestone-derived palette) ---
export const SECTOR_COLORS: Record<string, string> = {
  residentiel: '#1A3FBF',
  tertiaire: '#4F7BE8',
  industrie: '#F28C28',
  transports: '#EF4444',
  agriculture: '#10B981',
} as const;

// --- Sector metadata ---
export const SECTORS = [
  {
    id: 'residentiel',
    label: 'Résidentiel',
    icon: 'home',
    color: SECTOR_COLORS.residentiel,
  },
  {
    id: 'tertiaire',
    label: 'Tertiaire',
    icon: 'building',
    color: SECTOR_COLORS.tertiaire,
  },
  {
    id: 'industrie',
    label: 'Industrie',
    icon: 'factory',
    color: SECTOR_COLORS.industrie,
  },
  {
    id: 'transports',
    label: 'Transports',
    icon: 'truck',
    color: SECTOR_COLORS.transports,
  },
  {
    id: 'agriculture',
    label: 'Agriculture',
    icon: 'tractor',
    color: SECTOR_COLORS.agriculture,
  },
] as const;

/** Total national final energy consumption (TWh, 2022, source: SDES Bilan énergétique) */
export const TOTAL_CONSUMPTION_TWH = 1543;
