import {
  Rocket,
  BadgeCheck,
  Stamp,
  Receipt,
  Landmark,
  Building2,
  ClipboardCheck,
  Headset,
} from 'lucide-react';

/**
 * Single source of truth for the site header: contact details, primary links
 * and the Services mega-menu catalogue (used by both desktop and mobile navigation).
 */

export const SUPPORT = {
  phoneDisplay: '1800-890-8800',
  phoneTel: 'tel:18008908800',
  email: 'compliance@bharatfiling.in',
  hours: 'Mon – Sat, 9:00 AM – 7:00 PM IST',
};

/** Top-level links shown next to the logo. `mega: true` opens the Services menu. */
export const PRIMARY_NAV = [
  { key: 'home', label: 'Home', to: '/', isActive: (p) => p === '/' },
  {
    key: 'services',
    label: 'Services',
    to: '/services',
    mega: true,
    isActive: (p) => p.startsWith('/services') || p.startsWith('/apply'),
  },
  { key: 'pricing', label: 'Pricing', to: '/pricing', isActive: (p) => p.startsWith('/pricing') },
  { key: 'about', label: 'About Us', to: '/about', isActive: (p) => p.startsWith('/about') },
  { key: 'contact', label: 'Contact', to: '/contact', isActive: (p) => p.startsWith('/contact') },
];

/** Extra links that only appear in the mobile drawer. */
export const MOBILE_EXTRA_LINKS = [{ key: 'faq', label: 'FAQs', to: '/faq' }];

export const getDashboardPath = (role) =>
  role === 'CA' ? '/ca/dashboard' : role === 'ADMIN' ? '/admin' : '/dashboard';

export const getDashboardLabel = (role) =>
  role === 'CA' ? 'CA Workbench' : role === 'ADMIN' ? 'Admin Portal' : 'Dashboard';

export const getRoleLabel = (role) =>
  role === 'CA' ? 'CA Partner' : role === 'ADMIN' ? 'Administrator' : 'Customer';

/**
 * Services catalogue. `col1` / `col2` render as the two columns of the mega-menu panel.
 * `isLive` marks services that can be filed end-to-end on the platform today.
 */
export const SERVICE_CATEGORIES = [
  {
    key: 'startup',
    label: 'Startup',
    icon: Rocket,
    blurb: 'Choose and incorporate the right business entity.',
    col1: [
      { name: 'Proprietorship', path: '/apply/gst' },
      { name: 'Partnership', path: '/services/company-registration' },
      { name: 'One Person Company', path: '/services/company-registration' },
      { name: 'Limited Liability Partnership', path: '/services/llp-registration' },
      { name: 'Private Limited Company', path: '/services/company-registration' },
    ],
    col2: [
      { name: 'Section 8 Company', path: '/services/company-registration' },
      { name: 'Trust Registration', path: '/services/company-registration' },
      { name: 'Public Limited Company', path: '/services/company-registration' },
      { name: 'Producer Company', path: '/services/company-registration' },
      { name: 'Indian Subsidiary', path: '/services/company-registration' },
    ],
  },
  {
    key: 'registrations',
    label: 'Registrations',
    icon: BadgeCheck,
    blurb: 'Licences and statutory registrations for your business.',
    col1: [
      { name: 'GST Registration', path: '/apply/gst', isLive: true },
      { name: 'MSME / Udyam Registration', path: '/apply/udyam', isLive: true },
      { name: 'Import Export Code (IEC)', path: '/services' },
      { name: 'FSSAI Food License', path: '/services' },
      { name: 'Professional Tax (PT)', path: '/services' },
    ],
    col2: [
      { name: 'Shop & Establishment', path: '/services' },
      { name: 'Digital Signature (DSC)', path: '/services' },
      { name: 'PF & ESI Registration', path: '/services' },
      { name: 'PAN & TAN Registration', path: '/services' },
      { name: 'APEDA Registration', path: '/services' },
    ],
  },
  {
    key: 'trademark',
    label: 'Trademark',
    icon: Stamp,
    blurb: 'Protect your brand, logo and creative work.',
    col1: [
      { name: 'Trademark Registration', path: '/services/trademark' },
      { name: 'Trademark Search', path: '/services/trademark' },
      { name: 'Trademark Objection Reply', path: '/services/trademark' },
      { name: 'Trademark Opposition', path: '/services/trademark' },
      { name: 'Trademark Renewal', path: '/services/trademark' },
    ],
    col2: [
      { name: 'Copyright Registration', path: '/services/trademark' },
      { name: 'Patent Registration', path: '/services/trademark' },
      { name: 'Logo Design & IP Protection', path: '/services/trademark' },
      { name: 'Provisional Patent', path: '/services/trademark' },
      { name: 'Trademark Assignment', path: '/services/trademark' },
    ],
  },
  {
    key: 'gst',
    label: 'GST',
    icon: Receipt,
    blurb: 'Registration, returns and notice handling.',
    col1: [
      { name: 'GST Registration', path: '/apply/gst', isLive: true },
      { name: 'GST Return Filing (GSTR-1 & 3B)', path: '/services/gst-return' },
      { name: 'GSTR-9 Annual Return', path: '/services/gst-return' },
      { name: 'GSTR-2B ITC Reconciliation', path: '/services/gst-return' },
      { name: 'GST LUT for Exporters', path: '/services/gst-registration' },
    ],
    col2: [
      { name: 'Clarification (Notice REG-03)', path: '/services/gst-registration' },
      { name: 'GST Invoicing & E-Way Bill', path: '/services/gst-registration' },
      { name: 'Composition Scheme Opt-in', path: '/services/gst-registration' },
      { name: 'GST Assessment Advisory', path: '/services/gst-registration' },
      { name: 'GST Cancellation & Revocation', path: '/services/gst-registration' },
    ],
  },
  {
    key: 'income-tax',
    label: 'Income Tax',
    icon: Landmark,
    blurb: 'Returns, TDS and tax planning advisory.',
    col1: [
      { name: 'Income Tax Return (ITR 1–4)', path: '/services/income-tax' },
      { name: 'Business Tax Return (ITR 5–7)', path: '/services/income-tax' },
      { name: 'TDS Return Filing (24Q / 26Q)', path: '/services/income-tax' },
      { name: 'Tax Planning Consultation', path: '/services/income-tax' },
    ],
    col2: [
      { name: '15CA / 15CB Certification', path: '/services/income-tax' },
      { name: 'Income Tax Notice Response', path: '/services/income-tax' },
      { name: 'Capital Gains Advisory', path: '/services/income-tax' },
      { name: 'Advance Tax Computation', path: '/services/income-tax' },
      { name: 'Form 16 Generation', path: '/services/income-tax' },
    ],
  },
  {
    key: 'mca',
    label: 'MCA',
    icon: Building2,
    blurb: 'Annual ROC filings and company-law changes.',
    col1: [
      { name: 'Company Annual ROC Filing', path: '/services/llp-registration' },
      { name: 'LLP Form 11 & Form 8', path: '/services/llp-registration' },
      { name: 'Director KYC (DIR-3 KYC)', path: '/services/llp-registration' },
      { name: 'Add / Remove Director', path: '/services/llp-registration' },
      { name: 'Increase Authorized Capital', path: '/services/llp-registration' },
    ],
    col2: [
      { name: 'Change Registered Office', path: '/services/llp-registration' },
      { name: 'MOA / AOA Amendment', path: '/services/llp-registration' },
      { name: 'Strike Off Company', path: '/services/llp-registration' },
      { name: 'Strike Off LLP', path: '/services/llp-registration' },
      { name: 'Charge Satisfaction (CHG-1)', path: '/services/llp-registration' },
    ],
  },
  {
    key: 'compliance',
    label: 'Compliance',
    icon: ClipboardCheck,
    blurb: 'Ongoing payroll, statutory and secretarial compliance.',
    col1: [
      { name: 'Monthly Payroll Management', path: '/services/legal' },
      { name: 'PF & ESI Monthly Returns', path: '/services/legal' },
      { name: 'Statutory TDS Compliance', path: '/services/legal' },
      { name: 'Secretarial Audit & Registers', path: '/services/legal' },
    ],
    col2: [
      { name: 'Shop Act Renewal', path: '/services/legal' },
      { name: 'Factory License Compliance', path: '/services/legal' },
      { name: 'Environmental Consent (PCB)', path: '/services/legal' },
      { name: 'Contract Drafting & NDAs', path: '/services/legal' },
    ],
  },
  {
    key: 'consultation',
    label: 'Consultation',
    icon: Headset,
    blurb: 'One-to-one guidance from Chartered Accountants and advocates.',
    col1: [
      { name: 'CA Consultation', path: '/contact' },
      { name: 'Legal Consultation', path: '/contact' },
      { name: 'Startup Structuring Advisory', path: '/contact' },
    ],
    col2: [
      { name: 'GST Notice Hearing Representation', path: '/contact' },
      { name: 'Income Tax Dispute & Appeals', path: '/contact' },
      { name: 'Trademark Hearing Support', path: '/contact' },
    ],
  },
];
