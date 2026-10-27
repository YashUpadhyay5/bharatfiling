// PF (EPF) Registration Constants
// Statutory compliance: Employees' Provident Funds and Miscellaneous Provisions Act, 1952 & EPFO

export const PF_PLANS = [
  {
    id: 'starter',
    alias: 'basic',
    name: 'Starter (EPF Allotment)',
    subtitle: 'Get 15-digit EPF Establishment Code for your business',
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
      '15-Digit EPF Establishment Code Allotment',
      'Shram Suvidha & EPFO Portal Registration',
      'Digital Signature (DSC) linking on employer portal',
      'Eligibility & employee threshold vetting by CA',
      'Guidance on Form 5A & digital approval',
      'Zero balance salary account opening assistance',
    ],
  },
  {
    id: 'standard',
    alias: 'express',
    name: 'Standard (EPF + 3 Months ECR)',
    subtitle: 'EPF Allotment + 3 Months Monthly Return (ECR) Filing',
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
      '15-Digit EPF Establishment Code Allotment',
      'UAN (Universal Account Number) generation for employees',
      'Member KYC linking (Aadhaar & PAN mapping)',
      'Monthly ECR preparation & return filing (3 Months)',
      'EPF Challan generation & payment guidance',
      'Dedicated Labour Law CA Compliance Officer',
      'Priority express portal submission',
    ],
  },
  {
    id: 'combo',
    alias: 'all_in_one',
    name: 'PF + ESI Compliance Combo',
    subtitle: 'Simultaneous EPF Code + 17-Digit ESIC Employer Code',
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
      '15-Digit EPF Code + 17-Digit ESIC Code',
      'Unified Shram Suvidha registration for both codes',
      'Employee salary structuring (₹15,000 & ₹21,000 ceilings)',
      'UAN generation + ESI Pehchan card registration',
      '3 Months monthly filing assistance for both PF & ESI',
      'Dedicated Senior Labour Law Specialist',
      'Save 30% compared to individual applications',
    ],
  },
];

export const PF_VS_ESI_DIFFERENCES = [
  {
    parameter: 'Governing Act',
    pf: "Employees' Provident Funds & Misc. Provisions Act, 1952",
    esi: "Employees' State Insurance Act, 1948",
  },
  {
    parameter: 'Governing Body',
    pf: 'EPFO (Ministry of Labour & Employment)',
    esi: 'ESIC (Employees State Insurance Corporation)',
  },
  {
    parameter: 'Mandatory Threshold',
    pf: '20 or more employees (Voluntary available for <20)',
    esi: '10 or more employees (in factories & specified shops)',
  },
  {
    parameter: 'Employee Wage Limit',
    pf: 'Mandatory for Basic + DA up to ₹15,000/month',
    esi: 'Gross monthly salary up to ₹21,000/month (₹25,000 for PwD)',
  },
  {
    parameter: 'Employee Contribution',
    pf: '12% of (Basic Salary + DA)',
    esi: '0.75% of Gross Wages',
  },
  {
    parameter: 'Employer Contribution',
    pf: '12% (3.67% EPF + 8.33% EPS Pension + 0.5% EDLI + 0.5% Admin)',
    esi: '3.25% of Gross Wages (Total combined = 4.0%)',
  },
  {
    parameter: 'Primary Objective',
    pf: 'Long-term retirement corpus, wealth accumulation & pension',
    esi: 'Medical healthcare, hospitalisation, maternity & sickness cash cover',
  },
  {
    parameter: 'Allotted Code Format',
    pf: '15-digit alphanumeric (e.g. DL/CPM/0012345/000)',
    esi: '17-digit numeric (e.g. 11-00-123456-000-0101)',
  },
  {
    parameter: 'Monthly Due Date',
    pf: '15th of every following month (via Unified Portal)',
    esi: '15th of every following month (via ESIC Portal)',
  },
];

export const EPF_CONTRIBUTION_BREAKDOWN = [
  {
    account: 'EPF Account No. 1 (Provident Fund)',
    employeeShare: '12.0%',
    employerShare: '3.67%',
    description: 'Accumulates in the member account with annual interest (current rate ~8.25% p.a.).',
  },
  {
    account: 'EPS Account No. 10 (Employees Pension Scheme)',
    employeeShare: '0.0%',
    employerShare: '8.33%',
    description: 'Provides lifelong monthly pension post age 58 (statutory cap on ₹15,000 = ₹1,250/month).',
  },
  {
    account: 'EDLI Account No. 21 (Deposit Linked Insurance)',
    employeeShare: '0.0%',
    employerShare: '0.50%',
    description: 'Life insurance cover up to ₹7,00,000 for registered employees in case of demise during service.',
  },
  {
    account: 'EPF Admin Charges Account No. 2',
    employeeShare: '0.0%',
    employerShare: '0.50%',
    description: 'Administrative processing fee payable to EPFO (minimum ₹500/month per establishment).',
  },
];

export const STATUTORY_EPF_FORMS = [
  {
    form: 'Form 19',
    purpose: 'Final PF Settlement',
    description: 'Submitted by an employee to withdraw the entire accumulated provident fund corpus upon leaving employment.',
  },
  {
    form: 'Form 10C',
    purpose: 'Pension (EPS) Withdrawal / Scheme Certificate',
    description: 'Used to claim pension withdrawal benefit (if service < 10 years) or scheme certificate (if service > 10 years).',
  },
  {
    form: 'Form 31',
    purpose: 'Partial / Advance PF Withdrawal',
    description: 'Non-refundable advance during service for medical emergency, marriage, education, or house construction.',
  },
  {
    form: 'Form 11',
    purpose: 'Declaration by New Employee',
    description: 'Filled by every new employee upon joining to declare previous UAN or register as a fresh EPF member.',
  },
  {
    form: 'Form 2',
    purpose: 'Nomination & Family Declaration',
    description: 'Statutory nomination form determining legal beneficiaries in case of unfortunate demise of the member.',
  },
  {
    form: 'Form 5A',
    purpose: 'Return of Ownership',
    description: 'Employer declaration detailing company owners, partners, directors, and authorized signatories.',
  },
  {
    form: 'Monthly ECR',
    purpose: 'Electronic Challan cum Return',
    description: 'Monthly electronic filing containing employee-wise salary, PF deductions, and challan payment receipt.',
  },
];

export const PENALTY_SLABS = [
  { period: 'Less than 2 Months delay', damages: '5% per annum on arrears', interest: '12% p.a. under Sec 7Q' },
  { period: '2 to 4 Months delay', damages: '10% per annum on arrears', interest: '12% p.a. under Sec 7Q' },
  { period: '4 to 6 Months delay', damages: '15% per annum on arrears', interest: '12% p.a. under Sec 7Q' },
  { period: 'Over 6 Months delay', damages: '25% per annum on arrears', interest: '12% p.a. under Sec 7Q' },
];

export const PF_DOCUMENTS = {
  proprietorship: {
    title: 'Proprietorship Firm',
    items: [
      { name: 'PAN Card of Proprietor', desc: 'Self-attested PAN card copy.' },
      { name: 'Aadhaar Card of Proprietor', desc: 'Identity and address verification of owner.' },
      { name: 'Shop Act / GST / Udyam Certificate', desc: 'Proof of commercial activity / establishment license.' },
      { name: 'Cancelled Cheque', desc: 'Bank statement or cancelled cheque bearing the firm name.' },
      { name: 'Employee Details List', desc: 'Name, date of joining, salary, and Aadhaar numbers of employees.' },
    ],
  },
  partnership: {
    title: 'Partnership / LLP',
    items: [
      { name: 'Partnership Deed / LLP Agreement', desc: 'Copy of registered deed or LLP agreement.' },
      { name: 'PAN Card of Firm / LLP', desc: 'Entity PAN card copy.' },
      { name: 'PAN & Aadhaar of Designated Partners', desc: 'KYC of all partners and designated partners.' },
      { name: 'Electricity Bill / Rent Agreement', desc: 'Proof of registered office address with landlord NOC.' },
      { name: 'Authorization Letter', desc: 'Consent letter authorizing managing partner for EPF signing.' },
    ],
  },
  company: {
    title: 'Private Limited / Public Company',
    items: [
      { name: 'Certificate of Incorporation (COI)', desc: 'Incorporation certificate issued by ROC / MCA.' },
      { name: 'MOA & AOA', desc: 'Memorandum and Articles of Association.' },
      { name: 'Company PAN Card', desc: 'PAN card of the corporate entity.' },
      { name: 'Board Resolution for EPF', desc: 'Board resolution appointing the authorized signatory.' },
      { name: 'Director List with DIN', desc: 'Latest MCA Form DIR-12 or director master data.' },
      { name: 'Digital Signature (DSC)', desc: 'Class 3 DSC of director for online portal authorization.' },
    ],
  },
};

export const PF_PROCEDURE_STEPS = [
  {
    step: '01',
    title: 'Submit Basic Details & Employee Strength',
    desc: 'Enter your business name, contact details, total employee count, and choose voluntary or mandatory registration.',
  },
  {
    step: '02',
    title: 'Document Upload & CA Verification',
    desc: 'Our Labour Law CA verifies your business registration, PAN, bank proof, and employee wage registers.',
  },
  {
    step: '03',
    title: 'Online Filing on Shram Suvidha Portal',
    desc: 'We prepare Form 5A and submit the statutory establishment application to EPFO with Class 3 DSC authentication.',
  },
  {
    step: '04',
    title: '15-Digit EPF Code Allotment',
    desc: 'Receive your official 15-digit EPF Establishment Code letter, login credentials, and initial UAN allotment support.',
  },
];

export const PF_FAQS = [
  {
    question: 'Is EPF (PF) registration mandatory for all businesses in India?',
    answer:
      "EPF registration is mandatory for any factory or commercial establishment employing 20 or more persons. However, businesses with fewer than 20 employees can also register voluntarily under Section 1(4) of the EPF Act if the employer and employees mutually agree. Voluntary registration is popular for startups and IT firms to offer retirement benefits and attract top talent.",
  },
  {
    question: 'What is the difference between PF registration and ESI registration?',
    answer:
      "EPF (Provident Fund) is a long-term retirement savings and pension scheme governed by EPFO for businesses with 20+ employees (12% employee + 12% employer contribution). ESI (Employee State Insurance) is a healthcare and sickness insurance scheme governed by ESIC for businesses with 10+ employees earning up to ₹21,000/month (0.75% employee + 3.25% employer contribution). Both can be applied for separately or together via our Combo package.",
  },
  {
    question: 'What is the salary ceiling for mandatory EPF deductions?',
    answer:
      "Under EPFO guidelines, statutory EPF contribution is mandatory for employees whose Basic Salary + Dearness Allowance (DA) is up to ₹15,000 per month. For employees earning more than ₹15,000, EPF deduction is optional, or the contribution can be voluntarily capped at ₹15,000 (meaning 12% of ₹15,000 = ₹1,800/month).",
  },
  {
    question: 'How is the employer 12% contribution split across different accounts?',
    answer:
      "The employer's 12% contribution is split as: 3.67% into the employee's EPF account, 8.33% into the Employees' Pension Scheme (EPS Account 10, capped at ₹1,250/month), 0.50% towards Deposit Linked Insurance (EDLI Account 21 for life cover up to ₹7 Lakh), and 0.50% towards EPFO administrative charges (Account 2).",
  },
  {
    question: 'What is an EPF Establishment Code?',
    answer:
      "An EPF Establishment Code is a unique 15-digit alphanumeric code allotted by EPFO to registered businesses (e.g. DL/CPM/0012345/000). It identifies the regional office, establishment code, and sub-code for all online challan payments and monthly ECR filings.",
  },
  {
    question: 'What is UAN and who generates it?',
    answer:
      "UAN stands for Universal Account Number. It is a 12-digit permanent number allotted by EPFO that links multiple Member IDs allotted to a single individual by different employers. Once your establishment code is allotted, our CA desk helps you generate fresh UANs for new employees or link existing UANs for new hires.",
  },
  {
    question: 'What is the monthly due date for depositing PF contributions?',
    answer:
      "Every registered employer must deposit the monthly PF deductions and upload the Electronic Challan cum Return (ECR) on the EPFO Unified Portal on or before the 15th of the following month (e.g. PF for April must be paid by May 15th).",
  },
  {
    question: 'What are the penalties for delayed PF payments?',
    answer:
      "Delay in paying PF attracts two charges under the EPF Act: (1) Penal damages under Section 14B ranging from 5% to 25% per annum based on delay duration, and (2) Compulsory simple interest under Section 7Q at the rate of 12% per annum from the due date until the actual date of payment.",
  },
  {
    question: 'Can an establishment register for EPF voluntarily with fewer than 20 employees?',
    answer:
      "Yes. Under Section 1(4) of the EPF Act, 1952, an employer and the majority of employees can agree to voluntary coverage. Once voluntarily registered, all statutory provisions of the Act apply normally, allowing employees to earn statutory interest (~8.25% p.a.) and pension benefits.",
  },
  {
    question: 'Is Digital Signature Certificate (DSC) mandatory for EPF registration?',
    answer:
      "Yes. For private limited companies, LLPs, and societies, a Class 3 Digital Signature Certificate (DSC) of the authorized director/partner is mandatory to digitally sign Form 5A and approve employee KYC on the EPFO employer portal. BharatFiling can arrange both your DSC and EPF registration seamlessly.",
  },
  {
    question: 'How long does it take to obtain the EPF Establishment Code?',
    answer:
      "With complete and compliant documents, the online application is submitted within 24 hours on Shram Suvidha. The EPFO system typically issues the 15-digit Establishment Code letter within 3 to 5 working days.",
  },
  {
    question: 'Can I apply for both PF and ESI together?',
    answer:
      "Yes! Our PF + ESI Compliance Combo package covers both registrations simultaneously on the Unified Shram Suvidha Portal, structuring your employee salary registers and saving you over 30% in professional fees.",
  },
];

export const TRUST_STATS = [
  { value: '4.6 ★★★★★', label: 'Verified Reviews', badge: 'check' },
  { value: '15+ Years', label: 'of Experience', badge: 'trophy' },
  { value: '2 Lakh+', label: 'Customers Trusted across India', badge: 'users' },
  { value: 'App Tracking', label: 'Live status updates', badge: 'pin' },
];
