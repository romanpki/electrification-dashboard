// Color mapping functions for the electrification dashboard

import type { EnergyType } from './types';
import { ENERGY_TYPES, SECTOR_COLORS, WAVESTONE } from './constants';

/**
 * Returns the color associated with a sector.
 * Falls back to a neutral grey if the sector ID is unknown.
 */
export function getSectorColor(sectorId: string): string {
  return SECTOR_COLORS[sectorId] ?? WAVESTONE.gris500;
}

/**
 * Returns the color associated with an energy type.
 * Falls back to a neutral grey if the energy type is unknown.
 */
export function getEnergyColor(energyType: EnergyType): string {
  return ENERGY_TYPES[energyType]?.color ?? WAVESTONE.gris500;
}

/**
 * Wavestone theme colors for use in chart configuration and UI components.
 */
export const theme = {
  primary: WAVESTONE.bleuVibrant,
  primaryDark: WAVESTONE.bleuFonce,
  primaryLight: WAVESTONE.bleuClair,
  primaryVeryLight: WAVESTONE.bleuTresClair,
  accent: WAVESTONE.orange,
  success: WAVESTONE.vertAccent,
  background: WAVESTONE.blanc,
  surface: WAVESTONE.gris100,
  border: WAVESTONE.gris300,
  textPrimary: WAVESTONE.gris900,
  textSecondary: WAVESTONE.gris500,
  textMuted: WAVESTONE.gris700,
} as const;
