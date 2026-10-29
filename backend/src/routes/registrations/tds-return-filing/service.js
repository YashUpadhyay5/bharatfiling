// Checkout definition for the TDS return filing flow. The fees, coupon, answer values and financial years
// must match frontend/src/pages/tds-return-filing (enforced by tests/tdsReturnFilingE2E.test.js).

export const TDS_SERVICE = { slug: 'tds-return-filing', name: 'TDS Return Filing', moduleType: 'TDS' };

// What the customer pays up front for a call with an expert, GST included. It is adjusted against the
// professional fee later.
export const TDS_CONSULTATION_FEE = 999;

// Optional add-on the customer can remove at checkout. GST is charged on top of it.
export const LABOUR_WELFARE_FEE = 22;

// Festive offer applied automatically while it is live. The offer ends at the end of 10 Nov 2026, IST.
export const TDS_COUPON = { code: 'MAKEININDIA', discount: 500, expiresAt: '2026-11-10T23:59:59+05:30' };

export const RETURN_PERIODS = ['q1', 'q2', 'q3', 'q4'];
export const FILING_FOR = ['business', 'individual'];

const YEARS_OFFERED = 3;

// The three most recent completed financial years (a financial year ends on 31 March).
export function financialYears(today = new Date(), count = YEARS_OFFERED) {
  const calendarYear = today.getFullYear();
  const latestYearEnd = today.getMonth() >= 3 ? calendarYear : calendarYear - 1;
  return Array.from({ length: count }, (_, i) => {
    const endYear = latestYearEnd - i;
    return { value: `${endYear - 1}-${String(endYear).slice(-2)}` };
  });
}
