import {
  HeartHandshake,
  HardHat,
  ShoppingBag,
  Clapperboard,
  Rocket,
  Building2,
  Stethoscope,
} from 'lucide-react';

/**
 * Industry Solutions carousel content.
 *
 * `path` points at routes that already exist in App.jsx. Pass `onExplore` to the carousel to
 * override navigation (e.g. to open a sign-in dialog first).
 *
 * Accent classes are written out in full so Tailwind can see them at build time.
 */
export const INDUSTRY_SOLUTIONS = [
  {
    id: 'ngo-non-profit',
    number: '01',
    category: 'Social Sector',
    title: 'NGO & Non-Profit Hub',
    short: 'NGO & Non-Profit', // label on the hero deck's side rail
    description:
      'Trust, Society & Section 8 registration, 12A, 80G, FCRA and annual compliance.',
    icon: HeartHandshake,
    path: '/services/company-registration',
    accent: {
      tile: 'bg-rose-50 text-rose-600 ring-rose-100',
      label: 'text-rose-700',
      dot: 'bg-rose-500',
      bar: 'bg-rose-400',
    },
  },
  {
    id: 'contractors-infrastructure',
    number: '02',
    category: 'Infrastructure',
    title: 'Contractors & Infrastructure Hub',
    short: 'Contractors',
    description:
      'GST, tenders, government vendor compliance, contractor taxation and project accounting.',
    icon: HardHat,
    path: '/services/gst-registration',
    accent: {
      tile: 'bg-amber-50 text-amber-600 ring-amber-100',
      label: 'text-amber-700',
      dot: 'bg-amber-500',
      bar: 'bg-amber-400',
    },
  },
  {
    id: 'd2c-ecommerce-retail',
    number: '03',
    category: 'Commerce',
    title: 'D2C, E-Commerce & Retail Sellers',
    short: 'D2C & E-Commerce',
    description:
      'Marketplace GST, e-commerce reconciliation, inventory accounting and taxation.',
    icon: ShoppingBag,
    path: '/services/gst-return',
    accent: {
      tile: 'bg-violet-50 text-violet-600 ring-violet-100',
      label: 'text-violet-700',
      dot: 'bg-violet-500',
      bar: 'bg-violet-400',
    },
  },
  {
    id: 'creators-freelancers',
    number: '04',
    category: 'Digital Professionals',
    title: 'Creators & Freelancers',
    short: 'Creators',
    description:
      'Professional income taxation, GST, foreign income, invoicing and contracts.',
    icon: Clapperboard,
    path: '/services/income-tax',
    accent: {
      tile: 'bg-pink-50 text-pink-600 ring-pink-100',
      label: 'text-pink-700',
      dot: 'bg-pink-500',
      bar: 'bg-pink-400',
    },
  },
  {
    id: 'tech-startups-saas',
    number: '05',
    category: 'Technology',
    title: 'Tech Startups & SaaS Hub',
    short: 'Startups & SaaS',
    description:
      'Startup incorporation, DPIIT, ESOP, funding documentation, ROC and compliance.',
    icon: Rocket,
    path: '/services/company-registration',
    accent: {
      tile: 'bg-indigo-50 text-indigo-600 ring-indigo-100',
      label: 'text-indigo-700',
      dot: 'bg-indigo-500',
      bar: 'bg-indigo-400',
    },
  },
  {
    id: 'real-estate-builders',
    number: '06',
    category: 'Real Estate',
    title: 'Real Estate Builders',
    short: 'Real Estate',
    description:
      'RERA compliance, GST, TDS, property taxation and business accounting.',
    icon: Building2,
    path: '/services/legal',
    accent: {
      tile: 'bg-teal-50 text-teal-600 ring-teal-100',
      label: 'text-teal-700',
      dot: 'bg-teal-500',
      bar: 'bg-teal-400',
    },
  },
  {
    id: 'doctors-healthcare',
    number: '07',
    category: 'Healthcare',
    title: 'Doctors & Healthcare',
    short: 'Healthcare',
    description:
      'Clinic registration guidance, professional taxation, GST, capitalization, payroll, accounting and healthcare business.',
    icon: Stethoscope,
    path: '/services/income-tax',
    accent: {
      tile: 'bg-emerald-50 text-emerald-600 ring-emerald-100',
      label: 'text-emerald-700',
      dot: 'bg-emerald-500',
      bar: 'bg-emerald-400',
    },
  },
];
