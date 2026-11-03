// Checkout definitions for the income tax service flows that share the ITR engine. Fees, answer values,
// languages and financial years must match frontend/src/pages/itr-services (enforced by
// tests/itrServicesE2E.test.js) and the fees must match data/serviceCatalog.js.

export const ITR_CONSULTATION_FEE = 2499;
export const ITR_MODULE_TYPE = 'ITR';

export const SOURCES_OF_INCOME = ['salary', 'business-profession', 'house-property', 'capital-gains', 'other-sources'];
export { LANGUAGES } from '../shared/checkout.js';

const choice = (label, values) => ({ type: 'choice', label, values });
// One of filingYears(). returnType: also store whether the year is filed as an ITR or an ITR-U.
const year = ({ returnType = false } = {}) => ({ type: 'year', returnType });

const INCOME_RETURN_FIELDS = {
  sourceOfIncome: choice('your source of income', SOURCES_OF_INCOME),
  financialYear: year({ returnType: true }),
};

// Form 16 is priced per batch of up to 10 employees.
export const FORM_16_BATCHES = { 'upto-10': 1, '11-20': 2, '21-30': 3, '31-40': 4, '41-50': 5 };

export const ITR_SERVICES = {
  'itr-filing': { name: 'Income Tax Return Filing', fee: ITR_CONSULTATION_FEE, fields: INCOME_RETURN_FIELDS },
  'itr-sole-proprietorship': {
    name: 'ITR Filing for Sole Proprietorship Firm',
    fee: ITR_CONSULTATION_FEE,
    fields: INCOME_RETURN_FIELDS,
  },
  'business-itr': {
    name: 'Business Tax Return Filing (ITR 5-7)',
    fee: 5999,
    fields: {
      entityType: choice('the type of entity', ['partnership-firm', 'llp', 'private-limited', 'other-company', 'trust-ngo', 'aop-boi']),
      auditStatus: choice('whether your accounts need a tax audit', ['audit-required', 'no-audit', 'not-sure']),
      financialYear: year({ returnType: true }),
    },
  },
  'form-15ca-15cb': {
    name: 'Form 15CA / 15CB Certification',
    fee: 2499,
    fields: {
      remittancePurpose: choice('the purpose of the remittance', [
        'services-fees',
        'royalty-technical',
        'interest-dividend',
        'nri-sale-proceeds',
        'other',
      ]),
      remittanceAmount: choice('the amount you are sending', ['upto-5l', 'above-5l', 'not-sure']),
    },
  },
  'capital-gains-advisory': {
    name: 'Capital Gains Advisory',
    fee: 1999,
    fields: {
      assetType: choice('what you sold or plan to sell', [
        'listed-equity-mf',
        'debt-mf-bonds',
        'property',
        'unlisted-shares-esop',
        'crypto-vda',
        'foreign-assets',
      ]),
      saleStatus: choice('when the sale happens', ['sold-this-year', 'sold-last-year', 'planning']),
    },
  },
  'advance-tax-computation': {
    name: 'Advance Tax Computation',
    fee: 999,
    fields: {
      taxpayerType: choice('how you earn your income', [
        'salaried-other-income',
        'business-profession',
        'presumptive',
        'investor',
        'company-firm',
      ]),
      instalment: choice('the instalment you are preparing for', ['jun-15', 'sep-15', 'dec-15', 'mar-15']),
    },
  },
  'form-16-generation': {
    name: 'Form 16 Generation',
    fee: 999,
    fields: {
      employees: choice('how many employees need Form 16', Object.keys(FORM_16_BATCHES)),
      returnsStatus: choice('the status of your TDS returns', ['all-filed', 'some-pending', 'not-sure']),
      financialYear: year(),
    },
    unitsOf: (answers) => FORM_16_BATCHES[answers.employees],
  },
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

/** Validates the questionnaire answers of a service. Returns { answers } or { error }. */
export function readAnswers(fields, body) {
  const answers = {};
  for (const [key, spec] of Object.entries(fields)) {
    const value = body[key];
    if (spec.type === 'year') {
      const fy = filingYears().find((y) => y.value === value);
      if (!fy) return { error: 'Please choose a valid financial year.' };
      answers[key] = fy.value;
      if (spec.returnType) answers.returnType = fy.returnType;
    } else {
      if (typeof value !== 'string' || !spec.values.includes(value)) return { error: `Please tell us ${spec.label}.` };
      answers[key] = value;
    }
  }
  return { answers };
}
