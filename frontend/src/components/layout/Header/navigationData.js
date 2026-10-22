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
import { CATEGORIES, formatFee, servicePath, servicesInCategory } from '../../../data/serviceCatalog.js';

/**
 * Single source of truth for the site header: contact details, primary links
 * and the Services mega-menu catalogue (used by both desktop and mobile navigation).
 */

export { SUPPORT } from '../../../config/support.js';

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
 * Services catalogue for the mega-menu, generated from `data/serviceCatalog.js` so the header,
 * detail pages, directory and pricing page can never disagree. `col1` / `col2` render as the two
 * columns of the mega-menu panel. `isLive` marks services that can be filed end-to-end today.
 */
const CATEGORY_ICONS = {
  startup: Rocket,
  registrations: BadgeCheck,
  trademark: Stamp,
  gst: Receipt,
  'income-tax': Landmark,
  mca: Building2,
  compliance: ClipboardCheck,
  consultation: Headset,
};

export const SERVICE_CATEGORIES = CATEGORIES.map((category) => {
  const items = servicesInCategory(category.key).map((svc) => ({
    name: svc.name,
    path: servicePath(svc),
    price: formatFee(svc),
    isLive: svc.status === 'live',
  }));
  const half = Math.ceil(items.length / 2);
  return {
    key: category.key,
    label: category.label,
    icon: CATEGORY_ICONS[category.key],
    blurb: category.blurb,
    col1: items.slice(0, half),
    col2: items.slice(half),
  };
});
