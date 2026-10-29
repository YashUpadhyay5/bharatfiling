// Checkout definitions for the Income Tax Return (ITR) service flows. The fee, answer values, languages
// and financial years must match frontend/src/pages/itr-services (enforced by tests/itrServicesE2E.test.js).

export const ITR_CONSULTATION_FEE = 2499;
export const ITR_MODULE_TYPE = 'ITR';

export const SOURCES_OF_INCOME = ['salary', 'business-profession', 'house-property', 'capital-gains', 'other-sources'];
export { LANGUAGES } from '../shared/checkout.js';

export const ITR_SERVICES = {
  'itr-filing': { name: 'Income Tax Return Filing' },
  'itr-sole-proprietorship': { name: 'ITR Filing for Sole Proprietorship Firm' },
};

export const getItrService = (slug) => (Object.hasOwn(ITR_SERVICES, slug) ? { slug, ...ITR_SERVICES[slug] } : null);

const YEARS_OFFERED = 4;

// The four most recent completed financial years. Until 31 December of its assessment year a return
// can still be filed as an original, belated or revised return (ITR: sections 139(1), 139(4), 139(5));
// after that only an updated return (ITR-U: section 139(8A)) is possible.
export function filingYears(today = new Date()) {
  const calendarYear = today.getFullYear();
  const latestYearEnd = today.getMonth() >= 3 ? calendarYear : calendarYear - 1; // a financial year ends on 31 March
  return Array.from({ length: YEARS_OFFERED }, (_, i) => {
    const endYear = latestYearEnd - i;
    return {
      value: `${endYear - 1}-${String(endYear).slice(-2)}`,
      returnType: calendarYear === endYear ? 'ITR' : 'ITR-U',
    };
  });
}
