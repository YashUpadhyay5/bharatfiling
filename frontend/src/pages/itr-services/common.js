import { filingYears } from './years.js';

// Consultation fee in INR before GST. Must match backend/src/routes/registrations/itr-services/service.js
// and the ITR entries in data/serviceCatalog.js (enforced by tests/itrServicesE2E.test.js).
export const ITR_CONSULTATION_FEE = 2499;

export const feeLabel = `₹${ITR_CONSULTATION_FEE.toLocaleString('en-IN')}`;

export const years = filingYears();
export const latestYear = years[0];

// Languages offered on the landing pages that ask for one. Values match the backend list.
export const LANGUAGE_OPTIONS = [
  { value: 'english', label: 'English' },
  { value: 'hindi', label: 'Hindi' },
  { value: 'tamil', label: 'Tamil' },
];

// Payment screen: identical for every ITR service.
export const payment = {
  title: 'Consult an ITR return filing expert',
  feeLabel: 'Consultation Fee',
  note: 'Consultation fee will be adjusted against the final service fee',
};

// The two questions (screens 2 and 3) are identical for every ITR service.
export const questionnaire = {
  headline: ['', 'Expert Assisted ITR Filing'],
  tagline: 'Team of Senior CAs and Tax Specialists for ITR filing',
  points: [
    { title: 'Quick Turnaround', sub: 'ITR filings are submitted promptly, typically within 24 hours' },
    { title: 'Personalized Expertise', sub: 'Receive problem-centric advice and expert input based on your unique tax situation.' },
    { title: 'Compliance Assurance', sub: 'Complete guidance on ITR compliance and regulations.' },
  ],
  questions: [
    {
      id: 'sourceOfIncome',
      type: 'select',
      summaryLabel: 'Source of income',
      label: 'Source of income',
      options: [
        { value: 'salary', label: 'Salary' },
        { value: 'business-profession', label: 'Business/Profession' },
        { value: 'house-property', label: 'House Property' },
        { value: 'capital-gains', label: 'Capital Gains' },
        { value: 'other-sources', label: 'Other Sources' },
      ],
    },
    {
      id: 'financialYear',
      type: 'select',
      summaryLabel: 'Financial year',
      label: 'Select your Financial Year',
      options: years.map(({ value, label }) => ({ value, label })),
    },
  ],
};

// FAQ answers that are the same on every ITR page.
export const FAQ = {
  missedDueDate: {
    q: 'What happens if I miss the due date?',
    a: 'You can still file a belated return until 31 December of the assessment year, but a late fee under section 234F (₹5,000, or ₹1,000 if your total income is up to ₹5 lakh) and interest under section 234A apply. After that, only an updated return (ITR-U) can be filed, with additional tax.',
  },
  consultationFee: {
    q: 'What is the consultation fee and what does it cover?',
    a: `The ${feeLabel} + GST consultation fee gets you a dedicated ITR expert for your case. It is adjusted against the final service fee for filing your return.`,
  },
  updatedReturn: {
    q: 'What is an updated return (ITR-U)?',
    a: 'An updated return under section 139(8A) lets you disclose missed income or correct a return after the belated deadline, within 48 months from the end of the assessment year, on payment of additional tax. It cannot be used to claim a refund or to reduce your tax liability.',
  },
  eVerify: {
    q: 'How do I e-verify my return?',
    a: 'After filing, verify within 30 days using Aadhaar OTP, net banking, an EVC from your bank or demat account, or a digital signature. You can also send a signed ITR-V to CPC Bengaluru. A return that is not verified is treated as not filed.',
  },
};
