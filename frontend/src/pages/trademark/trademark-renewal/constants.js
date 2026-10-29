/**
 * Constants and statutory data for Trademark Renewal Module.
 * Governed by Section 25 of Trade Marks Act, 1999 & Rule 57 of Trade Marks Rules, 2017.
 */

export const RENEWAL_STATUTORY_HIGHLIGHTS = [
  'Trademark renewals handled by senior IP lawyers with deep expertise.',
  'Applications filed accurately, compliantly, and with strategic timing.',
  'Fast, efficient processing to ensure your Trademark is valid for next 10 years.',
];

export const TESTIMONIALS = [
  {
    quote:
      'Excellent service and support. BharatFiling Team is very supportive and professional. I Really appreciate the service and support from the team.',
    author: 'Rachna Pathania',
    role: 'Founder & CEO of SchnellTek Software Pvt. Ltd.',
    rating: 5,
  },
  {
    quote:
      'Our registered trademark was 2 months past its expiry date. BharatFiling immediately filed Form TM-R with surcharge, avoiding abandonment. Highly recommended!',
    author: 'Sunil Aggarwal',
    role: 'Managing Director, Horizon Retail Solutions',
    rating: 5,
  },
  {
    quote:
      'Seamless online renewal process. Form TM-48 and TM-R were filed within 24 hours of submitting our registration certificate. Received the 10-year renewal endorsement letter smoothly.',
    author: 'Kavita Menon',
    role: 'Director, Aura Organic Botanicals',
    rating: 5,
  },
];

export const TRUSTED_PARTNERS = [
  { name: 'Swiggy', color: '#FC8019' },
  { name: 'CaratLane', color: '#DE57E5' },
  { name: 'mCaffeine', color: '#1B1B1B' },
  { name: 'Vaya', color: '#D9232D' },
  { name: 'CavinKare', color: '#004A99' },
];

export const RENEWAL_WINDOWS = [
  {
    id: 'timely',
    title: 'Standard Renewal Window',
    timeline: '6 Months Prior to Expiry',
    statutorySection: 'Section 25(1) & Rule 57',
    govtFeePerClass: 9000,
    surcharge: 0,
    status: 'Optimal Timing',
    description:
      'Filing Form TM-R within the 6-month window prior to expiry ensures continuous, uninterrupted trademark protection without penalty.',
    badge: 'Standard Govt Fee',
  },
  {
    id: 'late',
    title: 'Renewal with Surcharge',
    timeline: 'Within 6 Months Post-Expiry',
    statutorySection: 'Section 25(3) & Rule 58',
    govtFeePerClass: 9000,
    surcharge: 4500,
    status: 'Grace Period',
    description:
      'If renewal is missed before the expiry date, Registry permits renewal with a statutory late fee surcharge of ₹4,500 per class.',
    badge: 'Late Surcharge Applicable',
  },
  {
    id: 'restoration',
    title: 'Restoration & Renewal',
    timeline: '6 Months to 1 Year Post-Expiry',
    statutorySection: 'Section 25(4) & Rule 60',
    govtFeePerClass: 9000,
    surcharge: 5000,
    status: 'Removal Prevention',
    description:
      'If the mark is removed from the e-Register for non-renewal, Form TM-R for Restoration and Renewal can be filed within 1 year from expiry.',
    badge: 'Restoration Filing Required',
  },
];

export const RENEWAL_PACKAGES = [
  {
    id: 'standard',
    name: 'Standard Renewal',
    price: 1999,
    originalPrice: 2999,
    discountBadge: '33% off',
    tagline: 'Ideal for timely renewal filed within 6 months before expiry date',
    popular: true,
    features: [
      'Registry status & validity audit on IP India portal',
      'Form TM-R drafting by Senior IP Advocate',
      'Power of Attorney (Form TM-48) preparation & stamping',
      'Instant electronic filing on IP India gateway',
      'Official government receipt generation within 24 hours',
      'Renewal endorsement tracking until 10-year validity update',
    ],
  },
  {
    id: 'late_renewal',
    name: 'Renewal with Late Surcharge',
    price: 3499,
    originalPrice: 4999,
    discountBadge: '30% off',
    tagline: 'For trademarks within 6 months after expiry during grace period',
    popular: false,
    features: [
      'Everything in Standard Renewal',
      'Surcharge calculation & compliance under Rule 58',
      'Urgent priority drafting & e-filing within 12 hours',
      'Affidavit of continuous commercial use drafting',
      'Dedicated IP Legal Manager support',
      'Prevent trademark abandonment on the e-Register',
    ],
  },
  {
    id: 'restoration',
    name: 'Restoration & Renewal',
    price: 5999,
    originalPrice: 8999,
    discountBadge: '33% off',
    tagline: 'For trademarks removed or between 6 months to 1 year post-expiry',
    popular: false,
    features: [
      'Comprehensive case assessment & grounds for restoration drafting',
      'Joint application for Restoration & Renewal under Section 25(4)',
      'Detailed legal statement outlining reasons for delayed renewal',
      'Representation before Registrar if Show Cause hearing issued',
      'Official restoration gazette tracking',
      'Guaranteed reinstatement support by High Court IP Counsel',
    ],
  },
];

export const RENEWAL_STEPS = [
  {
    step: '01',
    title: 'Registry Expiry Audit',
    desc: 'Our IP team retrieves your trademark details from the IP India e-Register to verify current validity, classes, and proprietor records.',
  },
  {
    step: '02',
    title: 'Form TM-R Drafting',
    desc: 'Senior IP advocate prepares Form TM-R along with Form TM-48 (Power of Attorney) ensuring precise statutory adherence.',
  },
  {
    step: '03',
    title: 'Verification & E-Signature',
    desc: 'You review the drafted renewal application and digitally sign the authorization securely via OTP or e-Sign.',
  },
  {
    step: '04',
    title: 'Official Gateway E-Filing',
    desc: 'Application is submitted on the IP India trademark portal. You receive an official government acknowledgement receipt immediately.',
  },
  {
    step: '05',
    title: '10-Year Validity Extension',
    desc: 'The Registrar records the renewal in the Trade Marks Journal and issues the renewal endorsement letter extending protection for 10 years.',
  },
];

export const REQUIRED_DOCUMENTS = [
  {
    title: 'Trademark Registration Certificate / Number',
    desc: 'Copy of initial Form TM-A certificate or 7-digit registered trademark number.',
    essential: true,
  },
  {
    title: 'Power of Attorney (Form TM-48)',
    desc: 'Authorizing our Senior Trademark Attorney to act on your behalf (prepared by BharatFiling).',
    essential: true,
  },
  {
    title: 'Identity & Address Proof',
    desc: 'PAN Card and Aadhaar/Passport of the applicant or authorized signatory.',
    essential: true,
  },
  {
    title: 'Business Registration Proof (For Entities)',
    desc: 'Certificate of Incorporation, Partnership Deed, or GST Certificate for non-individual applicants.',
    essential: false,
  },
  {
    title: 'Proof of Continued Commercial Use (Optional)',
    desc: 'Recent invoices, domain records, or marketing brochures if name or address has changed.',
    essential: false,
  },
];

export const RENEWAL_FAQS = [
  {
    q: 'How long is a trademark valid in India, and when should it be renewed?',
    a: 'Under Section 25 of the Trade Marks Act, 1999, a registered trademark is valid for a period of 10 years from the date of filing. It can be renewed indefinitely every 10 years. You should initiate the renewal process within 6 months prior to the expiration date.',
  },
  {
    q: 'What is Form TM-R?',
    a: 'Form TM-R is the statutory form prescribed under the Trade Marks Rules, 2017, for all renewal applications, including renewal with surcharge and restoration of an expired trademark.',
  },
  {
    q: 'What happens if I miss the trademark renewal deadline?',
    a: 'If you miss renewing before the expiry date, you have a grace period of 6 months post-expiry to renew with a statutory late fee surcharge. If 6 months have passed (between 6 months and 1 year), you can apply for Restoration & Renewal under Section 25(4). After 1 year, the trademark is permanently removed from the register.',
  },
  {
    q: 'What is the government fee for renewing a trademark online in India?',
    a: 'The official government fee for e-filing Form TM-R is ₹9,000 per class for standard timely renewal. In case of late renewal during the 6-month post-expiry grace period, an additional statutory surcharge of ₹4,500 per class applies.',
  },
  {
    q: 'Can I make changes to my trademark during renewal?',
    a: 'No. Trademark renewal only extends the validity of the registered mark as originally registered. If you wish to amend applicant details, address, or trade description, separate Form TM-M or Form TM-P must be filed.',
  },
  {
    q: 'Can an individual applicant avail MSME or Startup discount on renewal fees?',
    a: 'Unlike initial trademark registration (Form TM-A) where individuals and MSMEs receive a 50% rebate, the Trade Marks Rules specify a uniform government fee of ₹9,000 per class for Form TM-R across all applicant categories.',
  },
  {
    q: 'How long does it take for the renewal to reflect on the IP India portal?',
    a: 'Upon e-filing Form TM-R, the government receipt and renewal filing number are generated immediately. The Trade Marks Registry typically updates the status to "Renewed" and issues the official endorsement within 2 to 4 months.',
  },
  {
    q: 'Do I get a new Trademark Certificate upon renewal?',
    a: 'The Trade Marks Registry does not issue a completely new certificate. Instead, they issue an official "Renewal Intimation / Endorsement Letter" confirming that the registered trademark validity has been extended for another 10 years.',
  },
];
