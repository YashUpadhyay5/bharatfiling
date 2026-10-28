// ESI (ESIC) Registration Constants
// Statutory compliance: Employees' State Insurance Act, 1948 & ESIC Regulations

export const ESI_PLANS = [
  {
    id: 'starter',
    alias: 'basic',
    name: 'Starter (17-Digit ESIC Code)',
    subtitle: 'Get 17-digit ESIC Employer Code for medical and sickness coverage',
    originalPrice: 2999,
    discountLabel: '₹1,000 off',
    discountPercent: 33,
    price: 1999,
    govtFee: 0,
    gstRate: 0.18,
    tat: 'Allotment in 3-5 working days',
    hasEmi: false,
    recommended: false,
    features: [
      '17-Digit ESIC Employer Code Allotment',
      'Shram Suvidha & ESIC Portal Registration',
      'Eligibility & 10+ employee wage vetting by CA',
      'Guidance on Form 01 employer declaration',
      'Pehchan Card (Insurance Card) generation guide',
      'Zero balance salary account opening assistance',
    ],
  },
  {
    id: 'standard',
    alias: 'express',
    name: 'Standard (ESIC Code + 3 Months Monthly Return)',
    subtitle: 'ESIC Code Allotment + 3 Months Monthly Return (Form 5) Filing',
    originalPrice: 4999,
    discountLabel: '40% off',
    discountPercent: 40,
    price: 2999,
    govtFee: 0,
    gstRate: 0.18,
    tat: 'Allotment in 3 working days',
    hasEmi: true,
    recommended: true,
    features: [
      '17-Digit ESIC Employer Code Allotment',
      'Employee insurance number (IP Number) registration',
      'Pehchan Card (Biometric ID) digital generation',
      'Monthly ESI contribution & Form 5 filing (3 Months)',
      'Online ESIC challan generation & payment guidance',
      'Dedicated Labour Law CA Compliance Officer',
      'Priority express portal submission',
    ],
  },
  {
    id: 'combo',
    alias: 'all_in_one',
    name: 'ESI + PF Compliance Combo',
    subtitle: 'Simultaneous 17-Digit ESIC Code + 15-Digit EPF Code Allotment',
    originalPrice: 6999,
    discountLabel: '36% off',
    discountPercent: 36,
    price: 4499,
    govtFee: 0,
    gstRate: 0.18,
    tat: 'Allotment in 4-6 working days',
    hasEmi: true,
    recommended: false,
    features: [
      '17-Digit ESIC Code + 15-Digit EPF Code',
      'Unified Shram Suvidha registration for both codes',
      'Employee salary structuring (₹15,000 & ₹21,000 ceilings)',
      'Pehchan Card registration + UAN generation',
      '3 Months monthly filing assistance for both ESI & PF',
      'Dedicated Senior Labour Law Specialist',
      'Save 30% compared to individual applications',
    ],
  },
];

export const ESI_CONTRIBUTION_BREAKDOWN = [
  {
    category: 'Employee Contribution',
    rate: '0.75%',
    basis: 'Gross Wages',
    description: 'Deducted from the employee’s gross salary every month. Employees earning average daily wage up to ₹176 are exempted.',
  },
  {
    category: 'Employer Contribution',
    rate: '3.25%',
    basis: 'Gross Wages',
    description: 'Paid by the employer towards the social security fund for registered workers.',
  },
  {
    category: 'Total Combined Contribution',
    rate: '4.00%',
    basis: 'Gross Wages',
    description: 'Deposited into the designated ESIC account by the 15th of the following month.',
  },
];

export const ESI_BENEFITS = [
  {
    title: 'Comprehensive Medical Care',
    coverage: '100% Medical Coverage',
    description: 'Full medical care for insured worker and family members from day one of insurable employment across network ESIC hospitals.',
    icon: 'HeartPulse',
  },
  {
    title: 'Sickness Cash Benefit',
    coverage: '70% of Wages for 91 Days',
    description: '70% of average daily wages payable during periods of certified illness for up to 91 days in two consecutive benefit periods.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Maternity Cash Benefit',
    coverage: '100% of Wages for 26 Weeks',
    description: 'Paid maternity leave for 26 weeks, extendable by 1 month on medical advice, subject to 70 days contribution in prior periods.',
    icon: 'Baby',
  },
  {
    title: 'Disablement Benefit',
    coverage: '90% of Wages for Life',
    description: 'Temporary disablement: 90% of wage until recovery. Permanent disablement: 90% of wage payable monthly for lifetime.',
    icon: 'Activity',
  },
  {
    title: 'Dependants’ Pension Benefit',
    coverage: '90% Monthly Family Pension',
    description: 'In the unfortunate demise due to employment injury, dependants receive 90% of wages as monthly pension.',
    icon: 'Users',
  },
  {
    title: 'Funeral Expenses & Confinement',
    coverage: '₹15,000 Cash Support',
    description: 'Lump sum payment of up to ₹15,000 towards funeral costs paid to the eldest surviving member of the family.',
    icon: 'HandHeart',
  },
];

export const ESI_VS_PF_DIFFERENCES = [
  {
    parameter: 'Governing Act',
    esi: "Employees' State Insurance Act, 1948",
    pf: "Employees' Provident Funds & Misc. Provisions Act, 1952",
  },
  {
    parameter: 'Governing Body',
    esi: 'ESIC (Employees State Insurance Corporation)',
    pf: 'EPFO (Ministry of Labour & Employment)',
  },
  {
    parameter: 'Mandatory Threshold',
    esi: '10 or more employees (in factories & specified shops)',
    pf: '20 or more employees (Voluntary available for <20)',
  },
  {
    parameter: 'Employee Wage Limit',
    esi: 'Gross monthly salary up to ₹21,000/month (₹25,000 for PwD)',
    pf: 'Mandatory for Basic + DA up to ₹15,000/month',
  },
  {
    parameter: 'Employee Contribution',
    esi: '0.75% of Gross Wages',
    pf: '12% of (Basic Salary + DA)',
  },
  {
    parameter: 'Employer Contribution',
    esi: '3.25% of Gross Wages (Total combined = 4.0%)',
    pf: '12% (3.67% EPF + 8.33% EPS Pension + 0.5% EDLI + 0.5% Admin)',
  },
  {
    parameter: 'Primary Objective',
    esi: 'Medical healthcare, hospitalisation, maternity & sickness cash cover',
    pf: 'Long-term retirement corpus, wealth accumulation & pension',
  },
  {
    parameter: 'Allotted Code Format',
    esi: '17-digit numeric (e.g. 11-00-123456-000-0101)',
    pf: '15-digit alphanumeric (e.g. DL/CPM/0012345/000)',
  },
  {
    parameter: 'Monthly Due Date',
    esi: '15th of every following month (via ESIC Portal)',
    pf: '15th of every following month (via Unified Portal)',
  },
];

export const STATUTORY_ESIC_FORMS = [
  {
    form: 'Form 01',
    purpose: "Employer's Registration Form",
    description: 'Statutory form submitted by the employer under Regulation 10-B to register the factory or commercial establishment.',
  },
  {
    form: 'Form 1',
    purpose: 'Declaration by New Employee',
    description: 'Filled by each insurable employee upon joining to record personal, family, and nominee details for Pehchan Card generation.',
  },
  {
    form: 'Form 3',
    purpose: 'Return of Declaration Forms',
    description: 'Submitted by employer along with Form 1 declarations of all newly registered employees.',
  },
  {
    form: 'Form 5',
    purpose: 'Half-Yearly Return of Contributions',
    description: 'Submitted half-yearly (by May 11 and Nov 11) declaring branch-wise employee wages, contribution days, and challan payments.',
  },
  {
    form: 'Form 6',
    purpose: 'Register of Employees',
    description: 'Statutory wage and contribution register maintained at the business premises under Regulation 32 for inspection.',
  },
];

export const ESI_DOCUMENTS = {
  proprietorship: {
    title: 'Proprietorship Firm',
    items: [
      { name: 'PAN Card of Proprietor', desc: 'Self-attested copy of proprietor PAN.' },
      { name: 'Aadhaar Card of Proprietor', desc: 'Identity and residential address proof.' },
      { name: 'Shop Act / GST / Udyam Certificate', desc: 'Proof of commercial activity & establishment license.' },
      { name: 'Bank Account Proof', desc: 'Cancelled cheque or bank statement showing business entity name.' },
      { name: 'Employee Salary Register', desc: 'List of employees earning up to ₹21,000 with Aadhaar numbers.' },
    ],
  },
  partnership: {
    title: 'Partnership / LLP',
    items: [
      { name: 'Partnership Deed / LLP Agreement', desc: 'Certified copy of registered deed or LLP agreement.' },
      { name: 'PAN Card of Firm / LLP', desc: 'Entity PAN card copy.' },
      { name: 'PAN & Aadhaar of Designated Partners', desc: 'KYC of all partners and designated partners.' },
      { name: 'Electricity Bill / Rent Agreement', desc: 'Proof of registered office with landlord NOC.' },
      { name: 'Authorization Letter', desc: 'Authority letter appointing authorized partner for ESIC signing.' },
    ],
  },
  company: {
    title: 'Private Limited / Public Company',
    items: [
      { name: 'Certificate of Incorporation (COI)', desc: 'Incorporation certificate issued by ROC / MCA.' },
      { name: 'MOA & AOA', desc: 'Memorandum and Articles of Association.' },
      { name: 'Company PAN Card', desc: 'PAN card of the corporate entity.' },
      { name: 'Board Resolution for ESIC', desc: 'Board resolution appointing the authorized signatory.' },
      { name: 'Director List with DIN', desc: 'Form DIR-12 or latest MCA director master data.' },
      { name: 'Digital Signature (DSC)', desc: 'Class 3 DSC of director for online portal authentication.' },
    ],
  },
};

export const ESI_PROCEDURE_STEPS = [
  {
    step: '01',
    title: 'Submit Basic Details & Employee Count',
    desc: 'Enter business name, contact details, and staff strength earning up to ₹21,000/month for statutory eligibility vetting.',
  },
  {
    step: '02',
    title: 'Document Upload & CA Verification',
    desc: 'Our Labour Law CA checks entity proof, address registration, bank account details, and employee wage registers.',
  },
  {
    step: '03',
    title: 'Online Filing on Unified ESIC Portal',
    desc: 'We prepare Form 01 and complete establishment registration on the Shram Suvidha & ESIC Portal with DSC authorization.',
  },
  {
    step: '04',
    title: '17-Digit ESIC Code Allotment',
    desc: 'Receive your official 17-digit ESIC Employer Code letter, employer login credentials, and digital Pehchan Card generation.',
  },
];

export const ESI_FAQS = [
  {
    question: 'Is ESI registration mandatory for businesses in India?',
    answer:
      "Yes. Under Section 2(12) of the ESI Act, 1948, registration is mandatory for any non-seasonal factory or commercial establishment (shops, restaurants, cinemas, offices, IT firms, road motor transport) employing 10 or more persons where workers earn gross wages up to ₹21,000 per month.",
  },
  {
    question: 'What is the employee wage limit for mandatory ESI coverage?',
    answer:
      "The statutory wage ceiling for ESI coverage is ₹21,000 per month (gross monthly wages). For employees with disabilities (Persons with Disabilities - PwD), the wage ceiling is higher at ₹25,000 per month. If an employee’s wage increases beyond ₹21,000 during a contribution period, they continue to be covered until the end of that period.",
  },
  {
    question: 'What are the current contribution rates for ESI?',
    answer:
      "The statutory contribution rates are: Employee Share = 0.75% of gross wages; Employer Share = 3.25% of gross wages. Total combined contribution is 4.00% of gross wages. Employees whose average daily wages are up to ₹176 are exempted from their 0.75% contribution, but the employer must still pay the 3.25% share.",
  },
  {
    question: 'What is an ESIC Employer Code?',
    answer:
      "The ESIC Employer Code is a unique 17-digit numeric identifier allotted by the Employees' State Insurance Corporation (e.g. 11-00-123456-000-0101). It identifies the regional office, factory/establishment code, and allows you to generate monthly challans and register insured persons.",
  },
  {
    question: 'What is a Pehchan Card (e-Pehchan)?',
    answer:
      "A Pehchan Card is the identity card issued by ESIC to every insured employee containing their Insurance Number (IP Number), photograph, and family details. Workers present this card at ESIC dispensaries and network hospitals to receive free medical outpatient and inpatient treatment.",
  },
  {
    question: 'What is the monthly due date for depositing ESI contributions?',
    answer:
      "Employers must deposit monthly ESI contributions online via the ESIC Portal on or before the 15th of the following month (e.g. ESI for April must be deposited by May 15th). Delay in payment attracts interest and statutory damages.",
  },
  {
    question: 'What are the penalties for non-payment or delayed ESI deposits?',
    answer:
      "Under Regulation 31A of ESI (General) Regulations, 1950, delayed payments attract compulsory simple interest at 12% per annum for each day of default. Additionally, penal damages ranging from 5% to 25% under Section 85B and prosecution under Section 85 can be initiated for deliberate non-compliance.",
  },
  {
    question: 'What medical benefits do employees receive under ESI?',
    answer:
      "Insured workers and their eligible family dependants receive 100% cashless medical treatment from day one of entering employment. Benefits include outpatient treatment, specialist consultation, diagnostic tests, surgeries, cancer care, kidney dialysis, and free medicines across 150+ ESIC hospitals and 1,500+ dispensaries nationwide.",
  },
  {
    question: 'Can a business apply for both PF and ESI together?',
    answer:
      "Yes! Our ESI + PF Compliance Combo package allows businesses to secure both their 17-digit ESIC Code and 15-digit EPF Code simultaneously on the Shram Suvidha portal, ensuring complete labour law compliance and saving over 30% in professional fees.",
  },
  {
    question: 'Is Digital Signature Certificate (DSC) mandatory for ESI registration?',
    answer:
      "For companies, LLPs, and trusts, a Class 3 Digital Signature Certificate (DSC) of the authorized director/partner is required on Shram Suvidha to sign the Form 01 application. BharatFiling can arrange both your DSC and ESI code seamlessly.",
  },
  {
    question: 'How long does it take to obtain the 17-digit ESIC Code?',
    answer:
      "Once complete documents and employee registers are verified by our Labour Law CA, the application is submitted within 24 hours. The official 17-digit code letter is generated within 3 to 5 working days.",
  },
  {
    question: 'What is the difference between ESI and private group health insurance?',
    answer:
      "Unlike private insurance policies that have room rent caps, co-payments, and disease sub-limits, ESI provides unlimited comprehensive cashless healthcare without any sum insured ceiling. It also provides statutory cash compensation during certified sickness, pregnancy (26 weeks), and permanent disablement pensions.",
  },
];

export const TRUST_STATS = [
  { value: '4.5 ★★★★★', label: 'Verified Reviews', badge: 'check' },
  { value: '15+ Years', label: 'of Experience', badge: 'trophy' },
  { value: '2 Lakh+ Customers', label: 'Trusted across India', badge: 'users' },
  { value: 'App Tracking', label: 'Live status updates', badge: 'pin' },
];
