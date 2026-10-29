const YEARS_OFFERED = 3;

// Mirrors backend/src/routes/registrations/tds-return-filing/service.js, which validates the chosen year.
// The three most recent completed financial years (a financial year ends on 31 March).
export function financialYears(today = new Date(), count = YEARS_OFFERED) {
  const calendarYear = today.getFullYear();
  const latestYearEnd = today.getMonth() >= 3 ? calendarYear : calendarYear - 1;
  return Array.from({ length: count }, (_, i) => {
    const endYear = latestYearEnd - i;
    return {
      value: `${endYear - 1}-${String(endYear).slice(-2)}`,
      label: `FY ${endYear - 1}-${endYear}`,
    };
  });
}
