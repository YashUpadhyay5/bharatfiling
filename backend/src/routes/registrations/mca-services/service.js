// Checkout definitions of the MCA service flows. Names, fees, answer values, units and blocked answers must match
// frontend/src/pages/mca-services (enforced by tests/mcaServicesE2E.test.js) and data/serviceCatalog.js.

export const MCA_MODULE_TYPE = 'MCA';

const choice = (label, values, extras = {}) => ({ type: 'choice', label, values, ...extras });

// A quantity billed per unit, from 1 to max. Anything larger is quoted by the team.
const counted = (label, max) => {
  const counts = Array.from({ length: max }, (_, i) => String(i + 1));
  return choice(label, [...counts, 'more'], {
    units: Object.fromEntries(counts.map((n) => [n, Number(n)])),
    blocked: ['more'],
  });
};

const COMPANY_TYPES = ['private-limited', 'opc', 'public-unlisted', 'section-8'];
const companyType = choice('the type of company', COMPANY_TYPES);

// The value a field sets for the chosen answer, such as units or fees.
const pick = (fields, answers, key) =>
  Object.entries(fields)
    .map(([id, spec]) => spec[key]?.[answers[id]])
    .find((value) => value !== undefined);

const define = (name, fee, fields) => {
  const uses = (key) => Object.values(fields).some((spec) => spec[key]);
  return {
    name,
    fee,
    fields,
    ...(uses('units') ? { unitsOf: (answers) => pick(fields, answers, 'units') } : {}),
    ...(uses('fees') ? { feeOf: (answers) => pick(fields, answers, 'fees') } : {}),
  };
};

// A move that needs the Regional Director takes months of notices and hearings, so it costs more.
export const OFFICE_MOVE_FEES = { 'same-city': 3499, 'other-city': 3499, 'other-roc': 9999, 'other-state': 14999 };

export const MCA_SERVICES = {
  'company-annual-roc-filing': define('Company Annual ROC Filing', 3499, {
    companyType,
    years: counted('how many financial years you need to file', 3),
    accountsStatus: choice('the status of your accounts', ['audited', 'audit-pending', 'not-sure']),
  }),
  'llp-form-11-form-8': define('LLP Form 11 & Form 8', 2999, {
    formsDue: choice('which forms are due', ['both', 'form-11', 'form-8', 'not-sure']),
    years: counted('how many financial years you need to file', 3),
    auditStatus: choice('whether your accounts need an audit', ['audit-required', 'no-audit', 'not-sure']),
  }),
  'director-kyc-dir-3': define('Director KYC (DIR-3 KYC)', 499, {
    directors: counted('how many directors need KYC', 5),
    dinStatus: choice('the status of the DIN', ['due', 'deactivated', 'details-changed', 'not-sure']),
  }),
  'add-remove-director': define('Add / Remove Director', 2499, {
    changeType: choice('the change you need', ['appoint', 'resign', 'remove', 'redesignate']),
    directors: counted('how many directors are changing', 3),
    companyType,
  }),
  'increase-authorized-capital': define('Increase Authorized Capital', 2999, {
    companyType,
    increaseSize: choice('the size of the increase', ['upto-10-lakh', '10-lakh-to-1-crore', 'above-1-crore', 'not-sure']),
    articlesAllow: choice('whether your articles allow the increase', ['yes', 'no', 'not-sure']),
  }),
  'change-registered-office': define('Change Registered Office', OFFICE_MOVE_FEES['same-city'], {
    moveType: choice('where the office is moving', Object.keys(OFFICE_MOVE_FEES), { fees: OFFICE_MOVE_FEES }),
    companyType,
  }),
  'moa-aoa-amendment': define('MOA / AOA Amendment', 3999, {
    amendment: choice('what you are changing', ['objects', 'name', 'articles', 'several', 'not-sure'], {
      blocked: ['several'],
    }),
    companyType,
    filingsStatus: choice('whether your annual filings are up to date', ['up-to-date', 'pending', 'not-sure']),
  }),
  'strike-off-company': define('Strike Off Company', 7999, {
    companyType: choice('the type of company', ['private-limited', 'opc', 'public-unlisted', 'section-8', 'listed', 'regulated'], {
      blocked: ['section-8', 'listed', 'regulated'],
    }),
    businessStatus: choice('whether the company is doing business', ['never-started', 'stopped-2-years', 'stopped-recently', 'active'], {
      blocked: ['stopped-recently', 'active'],
    }),
    liabilities: choice('its assets and liabilities', ['nil', 'closing', 'open-matter'], { blocked: ['open-matter'] }),
    filingsStatus: choice('whether your annual filings are up to date', ['up-to-date', 'pending', 'not-sure']),
  }),
  'strike-off-llp': define('Strike Off LLP', 5999, {
    businessStatus: choice('whether the LLP is doing business', ['never-started', 'stopped-1-year', 'stopped-recently', 'active'], {
      blocked: ['stopped-recently', 'active'],
    }),
    liabilities: choice('its assets and liabilities', ['nil', 'closing', 'open-matter'], { blocked: ['open-matter'] }),
    filingsStatus: choice('whether Form 8 and Form 11 are up to date', ['up-to-date', 'pending', 'not-sure']),
  }),
  'charge-satisfaction-chg-1': define('Charge Registration & Satisfaction', 2999, {
    action: choice('what you need to file', ['register', 'register-late', 'satisfy', 'satisfy-late'], {
      blocked: ['register-late', 'satisfy-late'],
    }),
    timing: choice('when the event took place', ['within-30', 'after-30', 'not-sure']),
    chargeHolder: choice('who holds the charge', ['bank', 'nbfc', 'other']),
  }),
};

export const getMcaService = (slug) => (Object.hasOwn(MCA_SERVICES, slug) ? { slug, ...MCA_SERVICES[slug] } : null);
