// Utility functions for the electrification dashboard

import { MTEP_TO_TWH, TWH_TO_MTEP } from './constants';

const frLocale = 'fr-FR';

/**
 * Format a TWh value with French locale (e.g. "475,3 TWh").
 */
export function formatTWh(value: number): string {
  return (
    value.toLocaleString(frLocale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    }) + ' TWh'
  );
}

/**
 * Format a Mtep value with French locale (e.g. "40,8 Mtep").
 */
export function formatMtep(value: number): string {
  return (
    value.toLocaleString(frLocale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    }) + ' Mtep'
  );
}

/**
 * Format a percentage with French locale (e.g. "38,2 %").
 */
export function formatPercent(value: number): string {
  return (
    value.toLocaleString(frLocale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    }) + ' %'
  );
}

/**
 * Convert TWh to Mtep.
 */
export function twhToMtep(twh: number): number {
  return twh * TWH_TO_MTEP;
}

/**
 * Convert Mtep to TWh.
 */
export function mtepToTwh(mtep: number): number {
  return mtep * MTEP_TO_TWH;
}
