// PAN Registration Constants
// Statutory reference: Income Tax Act, 1961 (Section 139A), Income Tax Rules, 1962 (Rule 114)
// Form 49A (Indian Entities) & Form 49AA (Foreign Entities) via Protean (NSDL) / UTIITSL

export const PAN_PLANS = [
  {
    id: 'starter',
    alias: 'epan',
    name: 'Starter (Instant e-PAN Digital)',
    subtitle: 'Digitally signed e-PAN card delivered directly to your email in 48 hours',
    originalPrice: 499,
    discountLabel: '₹200 off',
    discountPercent: 40,
    price: 299,
    govtFee: 0,
    gstRate: 0.18,
    tat: '2-3 working days',
    hasEmi: false,
    recommended: false,
    features: [
      'Form 49A / Form 49AA online preparation & filing',
      'Instant digital e-PAN PDF with QR code',
      'Income Tax Department valid digital signature',
      'Universally accepted for bank KYC & ITR filing',
      'Assisted document upload & verification by CA',
      'Real-time acknowledgement & NSDL tracking',
    ],
  },
  {
    id: 'standard',
    alias: 'physical',
    name: 'Standard (Physical PVC Card + e-PAN)',
    subtitle: 'High-security embossed PVC card sent to your doorstep + instant digital e-PAN',
    originalPrice: 799,
    discountLabel: '38% off',
    discountPercent: 38,
    price: 499,
    govtFee: 0,
    gstRate: 0.18,
    tat: '2-4 working days (e-PAN) + courier dispatch',
    hasEmi: true,
    recommended: true,
    features: [
      'Physical embossed tamper-proof PVC PAN Card',
      'Dispatched directly to doorstep via SpeedPost',
      'Instant digital e-PAN issued via email in 48 hours',
      'High-security hologram & encrypted biometric QR',
      'Name mismatch & signature alignment support by CA',
      'Aadhaar biometric e-KYC assistance',
      'Dedicated Tax Compliance Officer assignment',
    ],
  },
  {
    id: 'combo',
    alias: 'pan_tan_combo',
    name: 'Business Entity PAN + TAN Combo',
    subtitle: 'Simultaneous 10-Digit Entity PAN + 10-Digit TAN Allotment for TDS compliance',
    originalPrice: 1499,
    discountLabel: '33% off',
    discountPercent: 33,
    price: 999,
    govtFee: 0,
    gstRate: 0.18,
    tat: '3-4 working days',
    hasEmi: true,
    recommended: false,
    features: [
      'Entity PAN allotment (Company / LLP / Firm / Trust)',
      '10-Digit TAN allotment under Section 203A for TDS/TCS',
      'Form 49A (PAN) + Form 49B (TAN) dual filing',
      'TRACES portal registration & activation support',
      'Physical PVC card for entity + official allotment letters',
      'Quarterly TDS compliance guidance session with CA',
      'Priority express portal submission',
    ],
  },
];

export const PAN_ENTITIES = [
  { id: 'individual', label: 'Individual (Indian Citizen)', code: 'P', note: 'Salaried, self-employed, professionals, students, minors' },
  { id: 'proprietorship', label: 'Sole Proprietorship', code: 'P', note: 'Business registered in name of proprietor (uses proprietor PAN)' },
  { id: 'partnership', label: 'Partnership Firm', code: 'F', note: 'Separate legal entity PAN based on registered Partnership Deed' },
  { id: 'llp', label: 'Limited Liability Partnership (LLP)', code: 'F', note: 'LLP PAN based on Certificate of Incorporation & LLP Agreement' },
  { id: 'company', label: 'Private Limited / OPC / Ltd Company', code: 'C', note: 'Corporate entity PAN based on MCA SPICe+ / COI & MOA/AOA' },
  { id: 'huf', label: 'Hindu Undivided Family (HUF)', code: 'H', note: 'Separate tax entity headed by Karta with deed of declaration' },
  { id: 'trust', label: 'Trust / Society / NGO / AOP', code: 'T', note: 'Registered Trust Deed / Bylaws / Society Registration Certificate' },
  { id: 'foreign', label: 'Foreign Citizen / Foreign Entity', code: 'P/C', note: 'Form 49AA with apostilled passport & overseas address proof' },
];

export const APPLICATION_TYPES = [
  { id: 'new', label: 'New PAN Allotment (Never had a PAN)', form: 'Form 49A / 49AA' },
  { id: 'correction', label: 'PAN Correction / Update (Change Name, DOB, Photo, Address)', form: 'CSF / Correction Request' },
  { id: 'reprint', label: 'Reprint / Duplicate PAN Card (Lost, Damaged, or e-PAN to PVC)', form: 'Reprint Request' },
];

export const INDIAN_STATES = [
  'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam',
  'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir',
  'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha',
  'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

export const TRUST_STATS = [
  { value: '4.5 ★★★★★', label: 'Verified Reviews', sublabel: 'Over 18,000+ ratings' },
  { value: '15+ Years', label: 'Of Experience', sublabel: 'Licensed Tax & Legal Firm' },
  { value: '2 Lakh+', label: 'Customers Trusted', sublabel: 'Across all 28 Indian States' },
  { value: 'App Tracking', label: 'Live Status Updates', sublabel: 'Direct NSDL acknowledgement' },
];

export const PAN_DOCUMENTS = [
  {
    category: 'individual',
    title: 'Individual & Sole Proprietorship',
    badge: 'Form 49A',
    documents: [
      { name: 'Proof of Identity (PoI)', options: 'Aadhaar Card (preferred for paperless e-KYC), Passport, Voter ID, Driving Licence, Arms Licence, Ration Card with photo.' },
      { name: 'Proof of Address (PoA)', options: 'Aadhaar Card, Passport, Voter ID, Driving Licence, Electricity Bill (under 3 mos), Bank Account Statement, Post Office Passbook.' },
      { name: 'Proof of Date of Birth (PoD)', options: 'Aadhaar Card, Municipal Birth Certificate, 10th Class Marksheet / Matriculation Certificate, Passport, Driving Licence.' },
      { name: 'Photographs & Signature', options: 'Two passport-size colour photographs (3.5 cm x 2.5 cm) on white background and clear signature / thumb impression on white paper.' },
    ],
  },
  {
    category: 'entity',
    title: 'Partnership Firm & LLP',
    badge: 'Form 49A',
    documents: [
      { name: 'Partnership Deed / LLP Agreement', options: 'Copy of registered Partnership Deed or certified copy of LLP Agreement.' },
      { name: 'Certificate of Registration', options: 'Certificate of Registration issued by Registrar of Firms (for Firms) or Certificate of Incorporation from MCA/ROC (for LLPs).' },
      { name: 'Office Address Proof', options: 'Electricity bill / Telephone bill of registered office (under 3 months old) along with NOC from property owner or rent agreement.' },
      { name: 'Authorised Partner KYC', options: 'PAN, Aadhaar, and passport-size photo of Managing Partner / Designated Partner authorized to sign.' },
    ],
  },
  {
    category: 'company',
    title: 'Private Limited & Public Limited Companies',
    badge: 'Corporate Form 49A',
    documents: [
      { name: 'Certificate of Incorporation (COI)', options: 'Copy of Certificate of Incorporation issued by Registrar of Companies (ROC), Ministry of Corporate Affairs.' },
      { name: 'MOA & AOA', options: 'Memorandum of Association (MOA) and Articles of Association (AOA) of the company.' },
      { name: 'Board Resolution', options: 'Certified extract of Board Resolution authorizing a Director to sign the PAN application.' },
      { name: 'Director Signatory KYC', options: 'PAN and Aadhaar card of the authorized Director along with Director Identification Number (DIN).' },
    ],
  },
  {
    category: 'huf_trust',
    title: 'HUF & Trust / Society / NGO',
    badge: 'Form 49A',
    documents: [
      { name: 'HUF Declaration Deed', options: 'Deed of declaration specifying Karta, names of coparceners, family tree, and date of HUF constitution.' },
      { name: 'Karta KYC Documents', options: 'PAN, Aadhaar, address proof and photograph of the Karta (Head of the family).' },
      { name: 'Trust Deed / Society Registration', options: 'Copy of Trust Deed or Registration Certificate issued by Charity Commissioner / Registrar of Societies.' },
      { name: 'Trustee / Secretary KYC', options: 'Identity and address proof of the Managing Trustee or General Secretary authorized to apply.' },
    ],
  },
];

export const PAN_STRUCTURE_RULES = [
  { position: '1st - 3rd', label: 'Alphabetic Series', example: 'AAA to ZZZ', desc: 'Running alphabetic characters allotted sequentially by the Income Tax Department.' },
  { position: '4th Character', label: 'Taxpayer Status', example: 'P, C, F, H, T, A...', desc: 'Defines entity type: P (Individual), C (Company), F (Firm/LLP), H (HUF), T (Trust), A (AOP), B (BOI).' },
  { position: '5th Character', label: 'Surname / Entity Initial', example: 'U for Upadhyay', desc: 'First letter of individual surname, or first letter of non-individual business name.' },
  { position: '6th - 9th', label: 'Sequential Digits', example: '0001 to 9999', desc: 'Four random sequential numeric digits generated by system.' },
  { position: '10th Character', label: 'Check Digit', example: 'Alphabet (e.g. K)', desc: 'Alphabetic check digit calculated by statutory ITD verification formula.' },
];

export const PAN_STEPS = [
  {
    step: '01',
    title: 'Fill Application & Upload Documents',
    desc: 'Enter applicant details (Name, DOB, Father Name, Address) and upload Aadhaar / Entity proof. Takes under 3 minutes.',
  },
  {
    step: '02',
    title: 'Verification by Tax Experts',
    desc: 'Our Chartered Accountants vet your name spellings, DOB, and address against government records to avoid NSDL objections.',
  },
  {
    step: '03',
    title: 'Instant e-PAN Delivery (48 Hours)',
    desc: 'Income Tax Department allocates your 10-digit PAN and generates a digitally signed e-PAN sent directly to your email.',
  },
  {
    step: '04',
    title: 'Doorstep PVC Card Delivery',
    desc: 'The official embossed PVC physical PAN card is printed and dispatched via India Post SpeedPost with live SMS tracking.',
  },
];

export const PAN_FAQS = [
  {
    q: 'Who is legally required to obtain a PAN Card in India?',
    a: 'Under Section 139A of the Income Tax Act, 1961, every person or entity whose total income exceeds the basic exemption limit, every business or profession whose total turnover/gross receipts exceed ₹5,00,000, anyone wishing to open a bank account, or anyone entering into specified high-value financial transactions must hold a PAN.'
  },
  {
    q: 'What is the statutory difference between an e-PAN and a physical PVC PAN card?',
    a: 'Both e-PAN and the physical card carry identical statutory weight. An e-PAN is a digitally signed PDF with an encrypted QR code issued by the Income Tax Department via email. The physical card is an embossed tamper-proof PVC plastic card with a hologram, delivered by post. Both are valid for all banking, GST, and legal purposes.'
  },
  {
    q: 'Can a minor (under 18 years) apply for a PAN card?',
    a: 'Yes. Minors can apply for a PAN card through their parent or legal guardian who acts as the Representative Assessee. The minor\'s photograph will not be printed on the card; upon turning 18, they can update it to a regular PAN with photo and signature.'
  },
  {
    q: 'What should I do if my name on Aadhaar and PAN is different?',
    a: 'You can apply for PAN Correction / Update using our service. You will need to upload supporting proof (such as a Gazette notification, marriage certificate for female applicants changing surname, or updated Aadhaar card) so our CA desk can align the records and link your Aadhaar seamlessly.'
  },
  {
    q: 'Can an individual hold more than one PAN card?',
    a: 'No. Holding more than one PAN is strictly illegal under Section 272B of the Income Tax Act and attracts a penalty of ₹10,000. If you accidentally have two PANs, you must surrender the duplicate PAN immediately.'
  },
  {
    q: 'How can I check if my PAN is linked with Aadhaar?',
    a: 'All PAN cards issued to individual Indian citizens through our platform are automatically linked with Aadhaar during the e-KYC process. For older PANs, you can verify linkage on the Income Tax e-filing portal.'
  },
  {
    q: 'What is the government fee for a PAN card?',
    a: 'The official processing fee charged by Protean (NSDL) / UTIITSL is ₹107 (including GST) for delivery within India and ₹1,017 for overseas delivery. Our transparent package pricing covers this fee, Form 49A drafting, professional CA vetting, and tracking.'
  },
  {
    q: 'How do I get a replacement for a lost or damaged PAN card?',
    a: 'You can select "PAN Correction / Lost Card Reprint" in our application wizard. We will retrieve your existing PAN details from the Income Tax database and file for a fresh physical PVC card reissue to your address without changing your 10-digit number.'
  },
  {
    q: 'Does a Partnership Firm or LLP need a separate PAN from the partners?',
    a: 'Yes. While a sole proprietorship uses the proprietor\'s personal PAN, a Partnership Firm or LLP is a distinct legal tax assessee and must have its own separate 10-digit entity PAN with "F" as the 4th character.'
  },
  {
    q: 'What is the difference between PAN and TAN?',
    a: 'PAN (Permanent Account Number) is used to track your income and tax payments. TAN (Tax Deduction and Collection Account Number) is required only if your business deducts tax at source (TDS) on salaries, contractor payments, rent, or professional fees under Section 203A.'
  },
];
