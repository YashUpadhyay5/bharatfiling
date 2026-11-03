import { FORM_NOTE } from '../itr-services/common.js';

export const inr = (n) => `₹${n.toLocaleString('en-IN')}`;
export const plural = (noun, n) => `${n} ${noun}${n === 1 ? '' : 's'}`;

export const COMPANY_TYPE_OPTIONS = [
  { value: 'private-limited', label: 'Private Limited Company' },
  { value: 'opc', label: 'One Person Company (OPC)' },
  { value: 'public-unlisted', label: 'Unlisted Public Company' },
  { value: 'section-8', label: 'Section 8 Company' },
];

export const companyTypeQuestion = {
  id: 'companyType',
  type: 'select',
  summaryLabel: 'Type of company',
  label: 'What type of company is it?',
  options: COMPANY_TYPE_OPTIONS,
};

// A quantity billed per unit, from 1 to max. Anything larger is quoted by the team, so it stops at a review.
export const countOptions = (noun, max, stop) => [
  ...Array.from({ length: max }, (_, i) => ({ value: String(i + 1), label: plural(noun, i + 1), units: i + 1 })),
  { value: 'more', label: `More than ${plural(noun, max)}`, stop },
];

export const DSC_DOCUMENT = {
  title: 'Digital Signature (DSC)',
  desc: 'A valid DSC of the director or partner who signs. We can arrange one if yours has expired.',
};

export const GOVERNMENT_FEES_FAQ = {
  q: 'Are government fees included?',
  a: 'No. Our fee is the professional fee plus 18% GST. MCA fees, stamp duty and any late fee are paid at actuals, and our expert confirms the amount before anything is filed.',
};

// The first value an answer sets, such as the units or the fee it bills.
const optionValue = (questions, answers, key) =>
  questions.map((q) => q.options.find((o) => o.value === answers[q.id])?.[key]).find((value) => value !== undefined);

/**
 * Fills in what every MCA page shares. Each answer in a questionnaire can carry:
 *   units  - the quantity it bills        fee    - the fee it bills, when the route sets the price
 *   filing - forms it adds to the plan    note   - a warning shown before payment
 *   stop   - why this case is reviewed by the team instead of paying online
 * units, fee and stop are mirrored in backend/src/routes/registrations/mca-services/service.js.
 */
export function defineService({ hero, payment, ...config }) {
  const { questions } = config.questionnaire;
  const uses = (key) => questions.some((q) => q.options.some((o) => o[key] !== undefined));
  return {
    ...config,
    hero: { formNote: FORM_NOTE, ...hero },
    payment: { feeLabel: 'Professional Fee', booked: 'order has been placed', desk: 'company law', ...payment },
    ...(uses('units') ? { unitsOf: (answers) => optionValue(questions, answers, 'units') } : {}),
    ...(uses('fee') ? { feeOf: (answers) => optionValue(questions, answers, 'fee') } : {}),
  };
}
