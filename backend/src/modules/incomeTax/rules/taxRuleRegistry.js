/**
 * BharatFiling - Tax Rule Registry
 * Resolves tax rules based on Financial Year with safe fallback.
 */

import { FY_2024_25 } from './fy2024_25.js';
import { FY_2025_26 } from './fy2025_26.js';
import { FY_2026_27 } from './fy2026_27.js';

export const SUPPORTED_FINANCIAL_YEARS = [
  { id: '2026-27', label: 'FY 2026-27 (AY 2027-28)', rules: FY_2026_27 },
  { id: '2025-26', label: 'FY 2025-26 (AY 2026-27)', rules: FY_2025_26 },
  { id: '2024-25', label: 'FY 2024-25 (AY 2025-26)', rules: FY_2024_25 },
];

export function getTaxRulesForYear(fy) {
  if (!fy) return FY_2025_26; // Default to current FY
  const normalized = fy.trim().replace(/^FY\s*/i, '');
  const entry = SUPPORTED_FINANCIAL_YEARS.find((y) => y.id === normalized);
  return entry ? entry.rules : FY_2025_26;
}

export default {
  SUPPORTED_FINANCIAL_YEARS,
  getTaxRulesForYear,
};
