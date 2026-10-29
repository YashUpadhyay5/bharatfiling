const YEARS_OFFERED = 4;

// Mirrors backend/src/routes/registrations/itr-services/service.js, which validates the chosen year.
// The four most recent completed financial years. Until 31 December of its assessment year a return
// can still be filed as an original, belated or revised return (ITR: sections 139(1), 139(4), 139(5));
// after that only an updated return (ITR-U: section 139(8A)) is possible.
export function filingYears(today = new Date()) {
  const calendarYear = today.getFullYear();
  const latestYearEnd = today.getMonth() >= 3 ? calendarYear : calendarYear - 1; // a financial year ends on 31 March
  return Array.from({ length: YEARS_OFFERED }, (_, i) => {
    const endYear = latestYearEnd - i;
    const fy = `${endYear - 1}-${endYear}`;
    const ay = `${endYear}-${endYear + 1}`;
    const returnType = calendarYear === endYear ? 'ITR' : 'ITR-U';
    return {
      value: `${endYear - 1}-${String(endYear).slice(-2)}`,
      fy,
      ay,
      returnType,
      label: `FY ${fy} (AY ${ay}) [${returnType}]`,
    };
  });
}
