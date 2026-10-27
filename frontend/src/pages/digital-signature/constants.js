// Class 3 Digital Signature Certificate (DSC) Constants
// Statutory compliance: Information Technology Act, 2000 & Controller of Certifying Authorities (CCA), MeitY

export const DSC_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi (हिंदी)' },
  { code: 'mr', name: 'Marathi (मराठी)' },
  { code: 'ta', name: 'Tamil (தமிழ்)' },
  { code: 'te', name: 'Telugu (తెలుగు)' },
  { code: 'kn', name: 'Kannada (ಕನ್ನಡ)' },
  { code: 'bn', name: 'Bengali (বাংলা)' },
  { code: 'gu', name: 'Gujarati (ગુજરાતી)' },
];

export const CERTIFYING_AUTHORITIES = [
  { id: 'emudhra', name: 'eMudhra Limited', licenseNo: 'CCA/eMudhra/2026', fipsCertified: true },
  { id: 'capricorn', name: 'Capricorn Identity Services', licenseNo: 'CCA/Capricorn/2026', fipsCertified: true },
  { id: 'vsign', name: 'VSign (Verasys Technologies)', licenseNo: 'CCA/VSign/2026', fipsCertified: true },
  { id: 'sify', name: 'Sify Safescrypt', licenseNo: 'CCA/Sify/2026', fipsCertified: true },
  { id: 'pantasign', name: 'Pantasign CA', licenseNo: 'CCA/Panta/2026', fipsCertified: true },
];

export const DSC_CATEGORIES = [
  {
    id: 'individual',
    name: 'Individual DSC',
    badge: 'Most Popular for Professionals',
    description: 'Issued to a specific person in their personal name or as Director, Partner, or Proprietor.',
    useCases: ['Income Tax (ITR, Tax Audit)', 'MCA/ROC (SPICe+, DIR-3 KYC, Annual Filings)', 'GST Portal', 'EPFO & ICEGATE'],
  },
  {
    id: 'organization',
    name: 'Organization DSC',
    badge: 'Mandatory for Corporate Bids',
    description: 'Issued in the name of the Authorized Signatory alongside the Company / Organization name.',
    useCases: ['GeM & Central Public Procurement (CPPP)', 'State e-Tenders & Railways/IRCTC', 'Defense & PSU e-Procurement', 'High-Value Commercial Bids'],
  },
];

export const DSC_TYPES = [
  {
    id: 'signing',
    name: 'Signing Only (Class 3A)',
    description: 'Used for signing electronic documents, tax filings, MCA forms, and PDF contracts. Proves signer identity and document integrity.',
    suitableFor: 'Income Tax, MCA/ROC, GST, EPFO, Trade Marks, IEC',
  },
  {
    id: 'combo',
    name: 'Signing & Encryption Combo (Class 3B)',
    description: 'Contains two cryptographic certificates in one token: one for digital signature and one for public key encryption of confidential bid data.',
    suitableFor: 'e-Tendering, GeM, CPPP, State e-Procurement, Indian Railways, ONGC',
  },
];

export const DSC_VALIDITIES = [
  { years: 2, label: '2 Years Validity', description: 'Standard statutory validity period recommended for most businesses.' },
  { years: 3, label: '3 Years Validity', description: 'Extended validity to avoid annual renewal hassle and save up to 30% on renewal costs.' },
];

export const DSC_TOKENS = [
  {
    id: 'epass2003',
    name: 'ePass 2003 Auto',
    rating: 'FIPS 140-2 Level 2 Certified',
    description: 'Industry-standard plug-and-play cryptographic USB token with onboard driver installer.',
    recommended: true,
  },
  {
    id: 'proxkey',
    name: 'Watchdata ProxKey',
    rating: 'FIPS 140-2 Level 2 Certified',
    description: 'High-security dual-interface token with driver-less auto-run capability for Windows & Mac.',
    recommended: false,
  },
  {
    id: 'mtoken',
    name: 'mToken CryptoID',
    rating: 'FIPS 140-2 Level 2 Certified',
    description: 'Ultra-durable casing with 64KB memory for holding multiple signing & encryption key pairs.',
    recommended: false,
  },
  {
    id: 'own_token',
    name: 'I already have a compatible USB Token',
    rating: 'Token Download Only',
    description: 'We will download the fresh Class 3 certificate remotely into your existing compliant token.',
    recommended: false,
  },
];

export const DSC_PLANS = [
  {
    id: 'signing',
    alias: 'class_3_signing',
    name: 'Class 3 Signing (Individual)',
    subtitle: 'Standard signing certificate for ROC, Tax, GST & PF',
    originalPrice: 2499,
    discountLabel: '₹1,000 off',
    discountPercent: 40,
    price: 1499,
    govtFee: 0,
    gstRate: 0.18,
    validity: '2 Years',
    hasEmi: false,
    recommended: false,
    tokenIncluded: true,
    features: [
      'Class 3 Signing Certificate (2 Years)',
      'FIPS 140-2 Level 2 USB Token Included',
      'Doorstep Delivery across India (Free Courier)',
      '10-Second Paperless Video KYC guidance',
      'Valid for MCA, ROC, Income Tax & GST',
      'Compatible with Windows 10/11 & macOS',
      'Dedicated RA Officer assistance',
    ],
  },
  {
    id: 'combo',
    alias: 'class_3_combo',
    name: 'Class 3 Combo (Signing + Encryption)',
    subtitle: 'Mandatory for e-Tendering, GeM, CPPP & Auctions',
    originalPrice: 3999,
    discountLabel: '37% off',
    discountPercent: 37,
    price: 2499,
    govtFee: 0,
    gstRate: 0.18,
    validity: '2 Years',
    hasEmi: true,
    recommended: true,
    tokenIncluded: true,
    features: [
      'Class 3 Signing + Encryption (2 Certificates)',
      'Pre-configured FIPS 140-2 Cryptographic USB Token',
      'Mandatory for GeM, CPPP & State e-Tenders',
      'Valid for Indian Railways (IREPS) & Defense bids',
      'Free Express Doorstep Delivery (Tracked)',
      'Same-Day Video KYC & CCA Approval',
      'Dedicated CA & RA Officer Priority Support',
      'Free Remote Installation & Java Configuration',
    ],
  },
  {
    id: 'organization',
    alias: 'org_express',
    name: 'Organization Combo (Express)',
    subtitle: 'Complete corporate authorized signatory package',
    originalPrice: 5999,
    discountLabel: '33% off',
    discountPercent: 33,
    price: 3999,
    govtFee: 0,
    gstRate: 0.18,
    validity: '2 Years',
    hasEmi: true,
    recommended: false,
    tokenIncluded: true,
    features: [
      'Organization Signing + Encryption Certificates',
      'Issued in Company Name + Signatory Name',
      'FIPS 140-2 Level 2 USB Token with Hard Case',
      'Company Document Vetting by Senior CA',
      'Drafting of Board Resolution / Authorization Letter',
      'Priority 4-Hour Express Issuance Guarantee',
      'Doorstep Express Courier Dispatch with Tracking',
      'Free Corporate IT Desk Integration & Support',
    ],
  },
];

export const HERO_TESTIMONIALS = [
  {
    name: 'Siddharth Rao',
    role: 'Director of InnovEdge Technologies',
    city: 'Bengaluru',
    rating: 5,
    quote:
      "A supportive and efficient team to work with. Always prompt, clear, and respectful in communication. The 10-second video KYC was remarkably simple, and we received our FIPS USB token in Bengaluru within 24 hours.",
  },
  {
    name: 'Meenakshi Sundaram',
    role: 'Founder, Apex Logistics & Freight',
    city: 'Chennai',
    rating: 5,
    quote:
      "Got our Class 3 Combo DSC for GeM tendering right before an important procurement deadline. BharatFiling's team assisted with the encryption certificate setup and remote token configuration without any delay.",
  },
  {
    name: 'Amit Verma',
    role: 'CFO, TechCraft Solutions Pvt Ltd',
    city: 'Mumbai',
    rating: 5,
    quote:
      "Excellent service for our MCA annual filings and director KYC renewals. Renewed 4 director digital signatures seamlessly. Truly India's most dependable legal-tech partner.",
  },
];

export const STATUTORY_PORTALS = [
  { name: 'Ministry of Corporate Affairs (MCA21 / SPICe+)', badge: 'Mandatory', icon: 'building' },
  { name: 'Income Tax Department (ITR & Tax Audits)', badge: 'Mandatory', icon: 'file' },
  { name: 'GST Portal (Registration & Return Verification)', badge: 'Mandatory', icon: 'percent' },
  { name: 'GeM (Government e-Marketplace)', badge: 'Combo Required', icon: 'shopping-cart' },
  { name: 'CPPP (Central Public Procurement Portal)', badge: 'Combo Required', icon: 'shield' },
  { name: 'ICEGATE (Customs & Export-Import Filings)', badge: 'Mandatory', icon: 'globe' },
  { name: 'EPFO (Employees Provident Fund Organization)', badge: 'Mandatory', icon: 'users' },
  { name: 'Trade Marks & Patent Registry (IP India)', badge: 'Mandatory', icon: 'award' },
];

export const DSC_BENEFITS = [
  {
    title: '100% Legal & Court Admissible',
    description:
      'Recognized under Sections 5 and 10A of the Information Technology Act, 2000, possessing identical legal status as physical wet-ink signatures.',
    icon: 'scale',
  },
  {
    title: 'Paperless Aadhaar e-KYC',
    description:
      'No need to print, sign, or courier physical application documents. Complete identity verification remotely in under 2 minutes.',
    icon: 'zap',
  },
  {
    title: '10-Second Live Video KYC',
    description:
      'Record a quick 10-second video on your smartphone or webcam reading your displayed verification code. Approved within hours.',
    icon: 'video',
  },
  {
    title: 'FIPS 140-2 Level 2 USB Token',
    description:
      'Certificates are downloaded into tamper-proof, military-grade hardware tokens (ePass 2003 / ProxKey), preventing digital theft or unauthorized duplication.',
    icon: 'lock',
  },
  {
    title: 'SHA-256 Bit Encryption',
    description:
      'Built upon SHA-256 hashing and RSA 2048-bit asymmetric cryptographic keys, guaranteeing zero forgery or tampering of signed files.',
    icon: 'shield-check',
  },
  {
    title: 'Doorstep Courier Delivery',
    description:
      'Your pre-loaded hardware token is dispatched securely via express tracked courier to your home or office address across any Indian pincode.',
    icon: 'truck',
  },
];

export const DSC_DOCUMENTS = {
  individual: {
    title: 'Documents for Individual DSC',
    description: 'For directors, partners, professionals, and individual taxpayers.',
    items: [
      { name: 'PAN Card', desc: 'Self-attested copy of applicant PAN card (mandatory for identity verification).' },
      { name: 'Aadhaar Card / Address Proof', desc: 'Aadhaar card with updated mobile number for instant paperless e-KYC.' },
      { name: 'Passport Size Photograph', desc: 'Recent colour passport photograph with white background.' },
      { name: 'Active Mobile & Email', desc: 'Mobile number and email address for Aadhaar OTP and CCA verification.' },
    ],
  },
  organization: {
    title: 'Documents for Organization DSC',
    description: 'For companies, LLPs, trusts, societies, and government undertakings.',
    items: [
      { name: 'Company / Entity PAN Card', desc: 'Self-attested PAN card copy of the company, LLP, or registered firm.' },
      { name: 'Certificate of Incorporation (COI)', desc: 'COI issued by ROC, or Partnership Deed, or Trust / Society Registration Deed.' },
      { name: 'Board Resolution / Auth Letter', desc: 'Board resolution or letter of authorization on company letterhead authorizing the applicant.' },
      { name: 'Authorized Signatory PAN & Aadhaar', desc: 'Identity and address proof of the designated authorized signatory.' },
      { name: 'List of Directors / Partners', desc: 'Form 32 / DIR-12 or latest MCA filing list of directors with DIN.' },
      { name: 'Bank Statement / Cancelled Cheque', desc: 'Company bank statement (last 3 months) or cancelled cheque bearing the company name.' },
    ],
  },
  foreign: {
    title: 'Documents for Foreign Nationals / NRIs',
    description: 'For non-resident directors and foreign investors.',
    items: [
      { name: 'Foreign Passport (Apostilled / Consularized)', desc: 'Valid passport copy attested by Indian Embassy or Apostilled under Hague Convention.' },
      { name: 'Proof of Foreign Address', desc: 'Bank statement, driving licence, or utility bill in English (duly apostilled).' },
      { name: 'Applicant Photograph', desc: 'Clear passport photo taken within the last 30 days.' },
      { name: 'Authorization Letter', desc: 'Parent company authorization for foreign director representation.' },
    ],
  },
};

export const DSC_PROCEDURE_STEPS = [
  {
    step: '01',
    title: 'Submit Basic Details & Select Plan',
    desc: 'Fill your contact information, select applicant category (Individual vs Organization), certificate type (Signing vs Combo), and preferred validity.',
  },
  {
    step: '02',
    title: 'Paperless Aadhaar e-KYC',
    desc: 'Complete instant verification via Aadhaar OTP or PAN paperless mode. No physical paperwork or courier is required.',
  },
  {
    step: '03',
    title: '10-Second Live Video KYC',
    desc: 'Click the camera link sent to your phone, show your original PAN card on screen, and read the 3-digit verification code aloud.',
  },
  {
    step: '04',
    title: 'CCA Issuance & Token Courier',
    desc: 'The licensed Certifying Authority approves and downloads your certificate into an encrypted FIPS USB token, couriered to your doorstep.',
  },
];

export const DSC_FAQS = [
  {
    question: 'What is a Class 3 Digital Signature Certificate (DSC)?',
    answer:
      'A Class 3 Digital Signature Certificate is the highest level of cryptographic digital identity recognized under the Information Technology Act, 2000. It is issued by licensed Certifying Authorities (CAs) under the Controller of Certifying Authorities (CCA). It provides the highest degree of security and data integrity for all statutory online filings, e-tenders, ROC compliance, and tax submissions.',
  },
  {
    question: 'Can I still use or renew a Class 2 DSC?',
    answer:
      'No. As per the statutory directive issued by the Controller of Certifying Authorities (CCA), Ministry of Electronics and Information Technology (MeitY), Class 2 digital signatures have been completely discontinued. All existing Class 2 certificates must be upgraded to Class 3 upon expiry. Today, Class 3 is the mandatory standard for all government portals.',
  },
  {
    question: 'What is the difference between Class 3 Signing and Class 3 Combo (Signing + Encryption)?',
    answer:
      'A Signing-Only certificate (Class 3A) is used solely to authenticate and sign electronic forms (MCA, Income Tax, GST, EPFO). A Combo certificate (Class 3B) contains two independent digital certificates stored inside the same USB token: one for digital signing and another for 2048-bit encryption. The encryption certificate is legally mandatory for e-Tendering (GeM, CPPP, State e-Procurement) so that confidential tender bids cannot be read by anyone before the formal bid opening date.',
  },
  {
    question: 'Why do I need a cryptographic USB token? Can I download the DSC directly onto my computer?',
    answer:
      'Under CCA guidelines, Digital Signature Certificates cannot be exported as software files (.pfx or .p12) to prevent unauthorized copying. The certificate private key must be safely generated and sealed inside a FIPS 140-2 Level 2 certified cryptographic hardware USB token (such as ePass 2003 Auto or Watchdata ProxKey). This guarantees that nobody can duplicate your digital signature.',
  },
  {
    question: 'How does the 10-second Paperless Video KYC work?',
    answer:
      'Once you complete your Aadhaar OTP verification, you will receive an SMS and email with a secure video link. Open the link on any smartphone or laptop webcam. You will simply show your original PAN card to the camera, display your face clearly, and read the 3-digit numeric code shown on the screen. The entire recording takes only 10 to 15 seconds.',
  },
  {
    question: 'What is the validity period of a Class 3 Digital Signature?',
    answer:
      'Class 3 Digital Signatures can be issued with either 2 Years or 3 Years of validity. We recommend the 3-year option for ongoing businesses and company directors to prevent yearly renewal fees and avoid unexpected filing rejections caused by expired signatures.',
  },
  {
    question: 'Which government portals mandate Class 3 Digital Signatures?',
    answer:
      'Class 3 DSC is mandatory on: Ministry of Corporate Affairs (MCA21 / SPICe+ / DIR-3 KYC), Income Tax Department (ITR-V signing, Tax Audit Reports), Goods and Services Tax Network (GSTN), Government e-Marketplace (GeM), Central Public Procurement Portal (CPPP), Indian Railways e-Procurement System (IREPS), Employee Provident Fund (EPFO), ICEGATE customs, and the Trade Marks & Patents Registry (IP India).',
  },
  {
    question: 'Is Aadhaar mandatory for obtaining a Digital Signature?',
    answer:
      'Aadhaar is the fastest and easiest method because paperless Aadhaar e-KYC enables approval in under 30 minutes. However, if your mobile number is not linked to Aadhaar, you can still apply using our PAN-based paperless verification route with alternative address proofs (Passport, Voter ID, or Driving Licence).',
  },
  {
    question: 'Can a Foreign National or NRI obtain an Indian Class 3 DSC?',
    answer:
      'Yes. Foreign nationals and NRIs who are directors or authorized signatories in Indian companies can obtain a Class 3 DSC. The applicant must submit an apostilled or consularized copy of their valid passport and foreign address proof along with the standard application.',
  },
  {
    question: 'How quickly will my USB token be delivered?',
    answer:
      'Once your video KYC is approved, your digital signature is generated within 2 hours. The cryptographic USB token is pre-loaded, packaged, and dispatched via express courier (Bluedart, DTDC, or Speed Post) with SMS tracking. Delivery takes 24 to 48 hours in metro cities and 2 to 4 business days in other regions.',
  },
  {
    question: 'Can multiple people use the same USB token?',
    answer:
      'No. A Digital Signature Certificate is legally tied to a unique individual (even for Organization DSCs, where the individual represents the company). Sharing your token or PIN with unauthorized persons compromises your legal identity and may attract penal liabilities under the Information Technology Act, 2000.',
  },
  {
    question: 'What happens if I forget my USB token password or enter the wrong PIN?',
    answer:
      'FIPS USB tokens have a security lock mechanism: entering an incorrect PIN 5 to 10 consecutive times permanently blocks the token to prevent brute-force attacks. Our technical support desk can help you initialize and unlock the token using the Master Admin PIN before it locks permanently.',
  },
];
