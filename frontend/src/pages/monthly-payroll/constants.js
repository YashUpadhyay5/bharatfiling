/**
 * Constants for Online Payroll Management System Module
 * Based on Vakilsearch / Zolvit Payroll Management System
 */

export const PAYROLL_HERO = {
  hindiNotice: 'Now you can read this page in Hindi. Change language to हिन्दी',
  badge: 'Only ISO 27001 Certified Platform in 🇮🇳',
  festiveBadge: 'Diwali Festive Sale Offer',
  title: 'Payroll Management System Online',
  cardTitle: 'Payroll Management System',
  bullets: [
    'Error-free payroll processing with accurate, on-time payments and compliance.',
    'Run payroll securely with our 100% online system and track live status on the go',
    'Get reports in one click and boost efficiency with professional payroll management.',
  ],
  guideLinkText: 'Complete guide on Payroll Management',
  breadCrumbs: [
    { title: 'Home', href: '/' },
    { title: 'Compliance', href: '/services' },
    { title: 'Online Payroll Management', href: '/services/monthly-payroll' },
  ],
  pricingNote: {
    original: 3999,
    current: 1999,
    unit: 'per month (up to 10 employees)',
  },
};

export const TRUSTED_PARTNERS = [
  { name: 'Amazon Web Services', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' },
  { name: 'RazorpayX Payroll Partner', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg' },
  { name: 'HDFC Corporate Banking', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/28/HDFC_Bank_Logo.svg' },
  { name: 'ICICI Bank iProcess', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/12/ICICI_Bank_Logo.svg' },
  { name: 'Zoho Books Certified', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/71/Zoho_Corporation_2019_logo.svg' },
  { name: 'EPFO & ESIC Compliant', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg' },
];

export const CORE_FEATURES = [
  {
    id: 1,
    title: 'Automated Monthly Salary Computation',
    desc: 'Flawless calculation of gross pay, basic, HRA, special allowances, overtime, loss-of-pay (LOP), and net salary disbursal with zero manual errors.',
    icon: 'Calculator',
  },
  {
    id: 2,
    title: 'Complete Statutory Labor Compliance',
    desc: 'Auto-deduction and monthly ECR generation for Provident Fund (EPF), ESI, Professional Tax (PT across all states), and Labour Welfare Fund (LWF).',
    icon: 'ShieldCheck',
  },
  {
    id: 3,
    title: 'TDS on Salary & Form 16 / 24Q Filing',
    desc: 'Accurate tax deduction under old and new income tax regimes, quarterly 24Q e-filing, and bulk generation of digitally signed Form 16 (Part A & B).',
    icon: 'FileSpreadsheet',
  },
  {
    id: 4,
    title: '1-Click Digital Payslip Distribution',
    desc: 'Confidential password-protected PDF payslips auto-emailed to employees every month with customizable company branding and complete deduction breakdown.',
    icon: 'Mail',
  },
  {
    id: 5,
    title: 'Bank Advice & Direct Disbursal Files',
    desc: 'Generate pre-formatted NEFT/RTGS batch payout files compatible with all major Indian corporate net banking systems (HDFC, ICICI, SBI, Axis, Kotak).',
    icon: 'Landmark',
  },
  {
    id: 6,
    title: 'Dedicated Payroll & Labor Law Specialist',
    desc: 'Direct WhatsApp and phone access to an assigned senior payroll specialist to manage bonuses, incentives, gratuity computations, and full & final (F&F) settlements.',
    icon: 'Users',
  },
];

export const WHO_NEEDS_PAYROLL = [
  {
    title: 'Startups & Early Ventures (1–15 Employees)',
    desc: 'Eliminate tedious manual spreadsheet math, keep salary records organized from Day 1, and ensure full compliance without hiring an expensive in-house HR manager.',
    icon: 'Rocket',
    badge: 'Popular for Startups',
  },
  {
    title: 'Growing MSMEs & SMEs (15–50+ Employees)',
    desc: 'Seamlessly cross mandatory EPF and ESI registration thresholds with automated monthly returns, compliance challans, and accurate labor law adherence.',
    icon: 'TrendingUp',
    badge: 'Automated Compliance',
  },
  {
    title: 'Tech & Remote-First Teams',
    desc: 'Manage multi-state Professional Tax (PT) calculations, variable remote allowances, and digital self-service onboarding for employees across India.',
    icon: 'Laptop',
    badge: 'Multi-State Tax',
  },
  {
    title: 'Retail Chains & Multi-Branch Outlets',
    desc: 'Handle dynamic shift attendances, hourly wages, overtime pay, and biometric check-in sync across multiple store branches and regional warehouses.',
    icon: 'Store',
    badge: 'Shift Management',
  },
  {
    title: 'Manufacturing & Industrial Units',
    desc: 'Strict compliance with Factories Act, Minimum Wages Act, bonus acts, daily wage registers, and statutory inspection readiness.',
    icon: 'Factory',
    badge: 'Factory Act Ready',
  },
  {
    title: 'Professional Agencies & Consultancies',
    desc: 'Effortlessly manage dual pay structures for full-time salaried staff alongside 194J TDS deductions for freelance retainers and contractual consultants.',
    icon: 'Briefcase',
    badge: 'Contractor + Staff',
  },
];

export const PAYROLL_WORKFLOW = [
  {
    step: '01',
    title: 'Share Monthly Attendance & Variable Inputs',
    desc: 'Upload your simple attendance sheet, new joiner details, leave deductions, and performance bonuses on or before the 25th of the month.',
  },
  {
    step: '02',
    title: 'Automated Salary & Statutory Computation',
    desc: 'Our system calculates gross pay, PF (12%), ESI (0.75%), PT, and TDS deductions based on the employee’s declared income tax regime.',
  },
  {
    step: '03',
    title: 'Draft Payroll Review & Employer Approval',
    desc: 'You receive a comprehensive payroll reconciliation sheet, variance report, and payout summary for one-click management review and sign-off.',
  },
  {
    step: '04',
    title: '1-Click Direct Salary Disbursement',
    desc: 'Download the pre-formatted bank advice file to disburse salaries directly through your bank portal or authorize automated payment processing.',
  },
  {
    step: '05',
    title: 'Digital Payslips Emailed to Employees',
    desc: 'Secure, password-protected PDF payslips with itemized earnings, deductions, and YTD tax figures are delivered straight to employee inboxes.',
  },
  {
    step: '06',
    title: 'Statutory ECR Filing & Challan Generation',
    desc: 'Our payroll compliance experts file your monthly PF ECR, ESIC challans, and deposit PT by the statutory 15th deadline.',
  },
];

export const MANUAL_VS_BHARATFILING = [
  {
    feature: 'Monthly Salary Calculation',
    manual: 'Prone to formula breaks, manual errors, and time-consuming Excel lookups',
    bharatfiling: '100% automated computation based on verified attendance and tax regimes',
  },
  {
    feature: 'PF, ESI & PT Compliance',
    manual: 'Manual challan prep; risk of missed 15th deadlines and heavy penalty interest',
    bharatfiling: 'Auto-generated ECR and return files prepared and filed on time every month',
  },
  {
    feature: 'Income Tax TDS (Old vs New Regime)',
    manual: 'Complex manual slab calculations and error-prone investment declaration tracking',
    bharatfiling: 'Automated regime comparison, quarterly 24Q filing, and 1-click Form 16 generation',
  },
  {
    feature: 'Payslip Distribution',
    manual: 'Creating individual Word/Excel files and sending manually one by one',
    bharatfiling: 'Encrypted, branded digital PDF payslips auto-dispatched to employee emails',
  },
  {
    feature: 'Bank Salary Transfer Advice',
    manual: 'Typing individual account numbers and IFSC codes manually into net banking',
    bharatfiling: 'Ready-to-upload batch files formatted for HDFC, ICICI, SBI, Axis, and all major banks',
  },
  {
    feature: 'Full & Final (F&F) Settlement',
    manual: 'Complicated leave encashment, notice period pay, and gratuity calculations',
    bharatfiling: 'Instant standardized F&F statement with all statutory dues clearly settled',
  },
];

export const PRICING_PLANS = [
  {
    id: 'starter',
    name: 'Starter Payroll',
    badge: 'Most Popular for Startups',
    price: 1999,
    originalPrice: 3999,
    period: 'per month',
    employeeLimit: 'Up to 10 Employees',
    description: 'Perfect for early-stage companies and small offices seeking professional payroll setup.',
    features: [
      'Monthly payroll processing for up to 10 employees',
      'Automated gross-to-net salary calculations',
      'Encrypted digital payslips emailed to employees',
      'Bank payment advice file (NEFT/RTGS format)',
      'Basic leave & attendance tracking',
      'Quarterly TDS on salary computation',
      'Dedicated payroll executive support via WhatsApp',
    ],
    cta: 'Get Started with Starter',
    popular: true,
  },
  {
    id: 'growth',
    name: 'Growth & Compliance',
    badge: 'Complete Labor Law Pack',
    price: 3999,
    originalPrice: 6999,
    period: 'per month',
    employeeLimit: 'Up to 30 Employees',
    description: 'Comprehensive payroll management combined with mandatory monthly PF & ESI filings.',
    features: [
      'Everything in Starter Payroll',
      'Payroll processing for up to 30 employees',
      'Monthly PF (ECR) generation and portal filing',
      'Monthly ESIC contribution calculation and challans',
      'Professional Tax (PT) compliance across Indian states',
      'Reimbursement and expense claim approvals',
      'Year-end Form 16 (Part A & B) preparation',
      'Priority phone & video conference support',
    ],
    cta: 'Choose Growth Plan',
    popular: false,
  },
  {
    id: 'enterprise',
    name: 'Enterprise HR Retainer',
    badge: 'Custom Corporate Suite',
    price: 7999,
    originalPrice: 14999,
    period: 'per month',
    employeeLimit: '30 to 100+ Employees',
    description: 'End-to-end payroll outsourcing with dedicated Senior Payroll Manager & HR compliance audit.',
    features: [
      'Everything in Growth & Compliance',
      'Custom employee count (scale up to 500+ employees)',
      'Full & Final (F&F) settlement & gratuity computation',
      'Quarterly 24Q e-filing directly with Income Tax Department',
      'Custom CTC restructuring to maximize tax savings for staff',
      'Annual labor compliance health audit by Senior CS/CA',
      'Dedicated Senior Account Manager & SLA guarantee',
    ],
    cta: 'Contact for Enterprise',
    popular: false,
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Vikramaditya Rao',
    company: 'Zenith Logistics Tech Pvt Ltd',
    role: 'Founder & CEO',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face',
    review:
      'We scaled from 6 to 34 employees in 9 months. BharatFiling’s online payroll system took all the headache away. Salaries are credited on the 1st without fail, PF challans are generated automatically, and our staff loves the clean digital payslips.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Ananya Mehra',
    company: 'BloomCraft D2C Apparel',
    role: 'Managing Partner',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=face',
    review:
      'Calculating multi-state Professional Tax and reconciling attendance used to take our accountant 4 days every month. With BharatFiling, we just upload our attendance sheet, review the draft in 5 minutes, and upload the bank file. Super seamless!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Karthik Subbaraj',
    company: 'CloudByte Digital Labs',
    role: 'Co-Founder & COO',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face',
    review:
      'The best part is year-end tax compliance and Form 16 generation. In our previous agency, Form 16 took 3 months of chasing. With BharatFiling, all Form 16s were generated and signed within a week of 24Q filing.',
    rating: 5,
  },
];

export const FAQS = [
  {
    question: 'What is an Online Payroll Management System?',
    answer:
      'An Online Payroll Management System is a comprehensive digital solution that manages every aspect of employee compensation. It calculates gross salaries, statutory deductions (Provident Fund, ESI, Professional Tax, TDS), net pay, generates encrypted digital payslips, prepares bank transfer advice files, and ensures compliance with Indian labor laws and tax regulations.',
  },
  {
    question: 'How does BharatFiling process our company payroll every month?',
    answer:
      'The process is straightforward: 1) You share your monthly attendance and any salary adjustments (bonuses, LOP, reimbursements) by the 25th. 2) Our system and payroll experts compute gross pay, deductions, and tax withholding. 3) You approve the reconciliation statement. 4) You disburse salaries via the ready-to-upload bank advice file. 5) Digital payslips are emailed to employees, and we file your statutory PF/ESI returns.',
  },
  {
    question: 'Which statutory labor compliances are covered under the payroll service?',
    answer:
      'We manage all key Indian statutory employee compliances including: Employees Provident Fund (EPF/ECR filing), Employee State Insurance (ESIC contribution filing), Professional Tax (PT deductions across state regulations), Labour Welfare Fund (LWF), and Tax Deducted at Source on salaries (TDS under Section 192).',
  },
  {
    question: 'Can you handle both the Old and New Income Tax regimes for employees?',
    answer:
      'Yes. Our payroll engine allows each employee to select their preferred tax regime (Old Tax Regime with 80C, 80D, HRA deductions, or the default New Tax Regime under Section 115BAC). Monthly TDS is computed accurately to ensure neither excess tax is deducted nor is there a shortfall at year-end.',
  },
  {
    question: 'How do employees receive their payslips?',
    answer:
      'Payslips are automatically generated as password-protected, tamper-proof PDF documents featuring your company logo, CTC breakdown, leave balance, PF UAN, ESI IP number, and PAN. They are sent directly to each employee’s registered email address upon approval.',
  },
  {
    question: 'What documents or inputs do we need to provide to get started?',
    answer:
      'To onboard your company, we only need: 1) Your company incorporation details and PAN, 2) Existing employee master data (Name, PAN, Bank Details, Salary Structure, Joining Date), 3) PF, ESI, and PT registration codes (if applicable), and 4) Your monthly attendance register.',
  },
  {
    question: 'How does direct bank salary payout work?',
    answer:
      'We generate a standardized bulk payment file (compatible with HDFC, ICICI, SBI, Axis, Kotak, and other corporate banks). You simply log into your corporate net banking, upload the batch file, authorize with OTP/token, and salaries are instantly credited to employee accounts in a single click.',
  },
  {
    question: 'What is the pricing for Monthly Payroll Management?',
    answer:
      'Our Starter Payroll plan begins at just ₹1,999/month for up to 10 employees. For businesses requiring statutory PF/ESI return filing, the Growth plan is ₹3,999/month for up to 30 employees. Larger teams can opt for our Enterprise plan at ₹7,999/month with dedicated account management.',
  },
  {
    question: 'Can you assist with Full and Final (F&F) settlement for exiting employees?',
    answer:
      'Yes. Whenever an employee resigns or is relieved, we compute their exact pro-rata working days, unavailed earned leave encashment, notice period recovery/pay, gratuity eligibility, bonus, and deduction of final TDS to issue a clear, legally compliant Full & Final Settlement statement.',
  },
  {
    question: 'Do you help generate Form 16 for employees at the end of the financial year?',
    answer:
      'Yes. At the close of each financial year and after quarterly Form 24Q returns are reconciled with TRACES, we generate Part A and Part B of Form 16 for all eligible employees with digital signature support.',
  },
  {
    question: 'Is our company and employee salary data secure?',
    answer:
      'Absolutely. BharatFiling operates on bank-grade 256-bit SSL encryption and strict ISO 27001 data security compliance. Employee bank details, PAN numbers, and salary information are confidential, isolated, and never shared with any third party.',
  },
  {
    question: 'What if we have employees working remotely across multiple Indian states?',
    answer:
      'Our payroll engine is equipped with state-wise Professional Tax (PT) rules for all 28 states and union territories (e.g., Maharashtra, Karnataka, Telangana, Tamil Nadu, West Bengal, Gujarat). The system automatically applies the correct state slabs based on the employee’s work location.',
  },
];
