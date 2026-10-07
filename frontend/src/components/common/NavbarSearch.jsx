import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  X,
  ArrowRight,
  Sparkles,
  Receipt,
  Building2,
  Scale,
  Award,
  Calculator,
  ShieldCheck,
  FileText,
  PhoneCall,
  CreditCard,
  LayoutDashboard,
  HelpCircle,
  CornerDownLeft,
} from 'lucide-react';

// Comprehensive search index of all offerings, filings, tools & core pages
const SEARCH_DIRECTORY = [
  // 1. GST & TAX REGISTRATION
  {
    id: 'gst-apply',
    title: 'GST Registration (Online Fast-Track Apply)',
    category: 'GST',
    categoryColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    path: '/apply/gst',
    badge: 'Instant Apply',
    badgeColor: 'bg-emerald-600 text-white',
    desc: '4-stage paperless GSTIN application with real-time PAN check & CA filing',
    icon: Receipt,
    keywords: ['gst', 'gst registration', 'gstin', 'apply', 'new business', 'proprietorship', 'trn', 'tax', 'fast track', 'online gst', 'gst apply', 'apply gst', 'goods and services tax'],
  },
  {
    id: 'gst-overview',
    title: 'GST Registration Overview & Eligibility',
    category: 'GST',
    categoryColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    path: '/services/gst-registration',
    badge: 'Guide',
    badgeColor: 'bg-slate-100 text-slate-700',
    desc: 'Statutory rules, mandatory document checklist, and threshold limits',
    icon: FileText,
    keywords: ['gst documents', 'gst eligibility', 'gst turnover', 'gst guide', 'gst rules', '40 lakhs', '20 lakhs'],
  },
  {
    id: 'gst-return-filing',
    title: 'GSTR-1 & GSTR-3B Monthly Return Filing',
    category: 'GST',
    categoryColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    path: '/services/gst-return',
    badge: 'Return Filing',
    badgeColor: 'bg-blue-50 text-blue-700',
    desc: 'Monthly & quarterly return filing with zero late-fee compliance guarantee',
    icon: Receipt,
    keywords: ['gstr1', 'gstr-1', 'gstr3b', 'gstr-3b', 'gst return', 'sales return', 'monthly filing', 'quarterly filing', 'iff'],
  },
  {
    id: 'gst-annual-return',
    title: 'GSTR-9 Annual Return & Compliance Audit',
    category: 'GST',
    categoryColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    path: '/services/gst-return',
    badge: 'Annual',
    badgeColor: 'bg-blue-50 text-blue-700',
    desc: 'Consolidated annual reconciliation to safeguard against departmental audit',
    icon: Receipt,
    keywords: ['gstr 9', 'gstr-9', 'gstr 9c', 'gstr-9c', 'annual return', 'gst audit', 'annual compliance'],
  },
  {
    id: 'gst-2b-reconciliation',
    title: 'GSTR-2B Input Tax Credit (ITC) Reconciliation',
    category: 'GST',
    categoryColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    path: '/services/gst-return',
    badge: 'ITC Matching',
    badgeColor: 'bg-indigo-50 text-indigo-700',
    desc: 'Match purchase invoices with vendor filings to claim maximum eligible ITC',
    icon: Receipt,
    keywords: ['gstr 2b', 'gstr-2b', 'itc', 'input tax credit', 'purchase reconciliation', 'vendor matching', 'itc claim'],
  },
  {
    id: 'gst-lut-export',
    title: 'GST LUT (Letter of Undertaking for Exporters)',
    category: 'GST',
    categoryColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    path: '/services/gst-registration',
    badge: 'Exporters',
    badgeColor: 'bg-slate-100 text-slate-700',
    desc: 'Export goods and services outside India with 0% GST payment under RFD-11',
    icon: Receipt,
    keywords: ['lut', 'letter of undertaking', 'export without tax', 'rfd 11', 'rfd-11', 'export gst', 'zero rated supply'],
  },
  {
    id: 'gst-notice-clarification',
    title: 'GST Notice Response (Form REG-03 Clarification)',
    category: 'GST',
    categoryColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    path: '/services/gst-registration',
    badge: 'Legal',
    badgeColor: 'bg-rose-50 text-rose-700',
    desc: 'CA drafting and affidavit submission for officer query and rejection notices',
    icon: Scale,
    keywords: ['reg-03', 'reg 03', 'reg-04', 'notice', 'clarification', 'query reply', 'gst rejection', 'show cause'],
  },
  {
    id: 'gst-cancellation-revocation',
    title: 'GST Cancellation & Revocation of Cancellation',
    category: 'GST',
    categoryColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    path: '/services/gst-registration',
    badge: 'Revocation',
    badgeColor: 'bg-slate-100 text-slate-700',
    desc: 'Surrender inactive GST number or restore suo-moto cancelled GSTIN',
    icon: Receipt,
    keywords: ['gst surrender', 'cancel gst', 'revocation of cancellation', 'reactivate gst', 'reg-21'],
  },

  // 2. COMPANY & STARTUP INCORPORATION
  {
    id: 'company-pvt-ltd',
    title: 'Private Limited Company Incorporation (Pvt Ltd)',
    category: 'Startup',
    categoryColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    path: '/services/company-registration',
    badge: 'Popular',
    badgeColor: 'bg-indigo-600 text-white',
    desc: 'MCA SPICe+ filing, DIN, DSC, MOA, AOA, PAN, TAN & corporate bank account',
    icon: Building2,
    keywords: ['pvt ltd', 'private limited', 'company incorporation', 'register company', 'spice+', 'mca', 'startup', 'din', 'dsc', 'roc'],
  },
  {
    id: 'company-llp',
    title: 'Limited Liability Partnership (LLP) Registration',
    category: 'Startup',
    categoryColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    path: '/services/llp-registration',
    badge: 'Partnership',
    badgeColor: 'bg-blue-50 text-blue-700',
    desc: 'FiLLiP filing, LLP agreement drafting, DPIN issuance and ROC registration',
    icon: Building2,
    keywords: ['llp', 'limited liability partnership', 'partnership', 'partners', 'fillip', 'dpin', 'llp agreement'],
  },
  {
    id: 'company-opc',
    title: 'One Person Company (OPC) Registration',
    category: 'Startup',
    categoryColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    path: '/services/company-registration',
    badge: 'Solo Founder',
    badgeColor: 'bg-slate-100 text-slate-700',
    desc: 'Corporate status and limited liability protection for solo entrepreneurs',
    icon: Building2,
    keywords: ['opc', 'one person company', 'solo founder', 'single director', 'single member company'],
  },
  {
    id: 'company-proprietorship',
    title: 'Sole Proprietorship Registration',
    category: 'Startup',
    categoryColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    path: '/apply/gst',
    badge: 'Fast Setup',
    badgeColor: 'bg-emerald-50 text-emerald-700',
    desc: 'Instant business identity via GST & Udyam for individual business owners',
    icon: Building2,
    keywords: ['proprietorship', 'sole proprietorship', 'proprietor', 'individual firm', 'small trade'],
  },
  {
    id: 'company-section-8',
    title: 'Section 8 Company Registration (NGO & Non-Profit)',
    category: 'Startup',
    categoryColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    path: '/services/company-registration',
    badge: 'NGO',
    badgeColor: 'bg-slate-100 text-slate-700',
    desc: 'Incorporate charitable company with Section 8 license, 12A & 80G tax exemptions',
    icon: Building2,
    keywords: ['section 8', 'ngo', 'non profit', 'charity', 'foundation', '12a', '80g', 'trust'],
  },
  {
    id: 'company-public-ltd',
    title: 'Public Limited Company Registration',
    category: 'Startup',
    categoryColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    path: '/services/company-registration',
    badge: 'Corporate',
    badgeColor: 'bg-slate-100 text-slate-700',
    desc: 'For large businesses aiming for broad shareholding and future public listing',
    icon: Building2,
    keywords: ['public limited', 'plc', 'shares', 'ipo', 'large enterprise'],
  },

  // 3. INCOME TAX & DIRECT TAX
  {
    id: 'itr-filing-individual',
    title: 'Income Tax Return Filing (ITR 1–4)',
    category: 'Income Tax',
    categoryColor: 'bg-amber-50 text-amber-700 border-amber-200',
    path: '/services/income-tax',
    badge: 'ITR Season',
    badgeColor: 'bg-amber-500 text-white',
    desc: 'Salaried, capital gains & presumptive business returns (Old vs New Regime tax savings)',
    icon: Calculator,
    keywords: ['itr', 'itr filing', 'itr-1', 'itr-2', 'itr-3', 'itr-4', 'income tax return', 'salary tax', 'tax refund', '44ad', '44ada'],
  },
  {
    id: 'itr-filing-business',
    title: 'Corporate & Partnership Business Tax Return (ITR 5–7)',
    category: 'Income Tax',
    categoryColor: 'bg-amber-50 text-amber-700 border-amber-200',
    path: '/services/income-tax',
    badge: 'Corporate',
    badgeColor: 'bg-slate-100 text-slate-700',
    desc: 'Company, LLP, firm and trust ITR filings audited by experienced CAs',
    icon: Calculator,
    keywords: ['itr-5', 'itr-6', 'itr-7', 'corporate tax return', 'company itr', 'firm tax return'],
  },
  {
    id: 'tds-returns',
    title: 'TDS Return Filing (Form 24Q & 26Q)',
    category: 'Income Tax',
    categoryColor: 'bg-amber-50 text-amber-700 border-amber-200',
    path: '/services/income-tax',
    badge: 'Quarterly',
    badgeColor: 'bg-blue-50 text-blue-700',
    desc: 'Quarterly salary & vendor tax deduction returns with TRACES Form 16/16A generation',
    icon: Calculator,
    keywords: ['tds', 'tds return', '24q', '26q', 'traces', 'form 16', 'form 16a', 'withholding tax'],
  },
  {
    id: 'tax-notice-response',
    title: 'Income Tax Notice Response & Scrutiny Advisory',
    category: 'Income Tax',
    categoryColor: 'bg-amber-50 text-amber-700 border-amber-200',
    path: '/services/income-tax',
    badge: 'Scrutiny',
    badgeColor: 'bg-rose-50 text-rose-700',
    desc: 'Legal responses for 143(1) intimation, 148 reassessment and defective return notices',
    icon: Scale,
    keywords: ['tax notice', 'income tax notice', '143(1)', 'section 148', 'defective return', 'scrutiny assessment'],
  },
  {
    id: 'form-15ca-15cb',
    title: 'Form 15CA / 15CB CA Foreign Remittance Certification',
    category: 'Income Tax',
    categoryColor: 'bg-amber-50 text-amber-700 border-amber-200',
    path: '/services/income-tax',
    badge: 'Forex',
    badgeColor: 'bg-slate-100 text-slate-700',
    desc: 'Statutory CA certificate required by banks for outward foreign remittances',
    icon: Calculator,
    keywords: ['15ca', '15cb', 'foreign remittance', 'outward remittance', 'dtaa', 'ca certificate'],
  },

  // 4. TRADEMARK & INTELLECTUAL PROPERTY
  {
    id: 'trademark-registration',
    title: 'Trademark (TM) Registration Online',
    category: 'Trademark',
    categoryColor: 'bg-rose-50 text-rose-700 border-rose-200',
    path: '/services/trademark',
    badge: 'Brand Shield',
    badgeColor: 'bg-rose-600 text-white',
    desc: 'Protect brand name, logo and tagline across all 45 classes with IP attorney representation',
    icon: Award,
    keywords: ['trademark', 'tm', 'brand name', 'logo registration', 'brand protection', 'tm-a', 'trademark filing', 'ipr'],
  },
  {
    id: 'trademark-search',
    title: 'Free Trademark Search & NICE Classification',
    category: 'Trademark',
    categoryColor: 'bg-rose-50 text-rose-700 border-rose-200',
    path: '/services/trademark',
    badge: 'Free Tool',
    badgeColor: 'bg-emerald-50 text-emerald-700',
    desc: 'Verify brand name availability and phonetic conflicts before spending government fees',
    icon: Award,
    keywords: ['trademark search', 'tm search', 'brand search', 'check brand name', 'nice class', 'trademark availability'],
  },
  {
    id: 'trademark-objection',
    title: 'Trademark Objection Reply (Sec 9 & Sec 11)',
    category: 'Trademark',
    categoryColor: 'bg-rose-50 text-rose-700 border-rose-200',
    path: '/services/trademark',
    badge: 'Legal Reply',
    badgeColor: 'bg-rose-50 text-rose-700',
    desc: 'Draft comprehensive advocate reply to examination reports issued by TM registry',
    icon: Scale,
    keywords: ['tm objection', 'trademark objection', 'examination report', 'section 9', 'section 11', 'reply to objection'],
  },
  {
    id: 'copyright-patent',
    title: 'Copyright & Patent Registration',
    category: 'Trademark',
    categoryColor: 'bg-rose-50 text-rose-700 border-rose-200',
    path: '/services/trademark',
    badge: 'IP Rights',
    badgeColor: 'bg-slate-100 text-slate-700',
    desc: 'Copyright for software code, creative works & provisional patent filing for inventions',
    icon: Award,
    keywords: ['copyright', 'patent', 'software copyright', 'provisional patent', 'invention', 'intellectual property'],
  },

  // 5. MCA & ROC SECRETARIAL COMPLIANCE
  {
    id: 'mca-annual-filing',
    title: 'Company Annual ROC Filing (AOC-4 & MGT-7)',
    category: 'MCA',
    categoryColor: 'bg-purple-50 text-purple-700 border-purple-200',
    path: '/services/llp-registration',
    badge: 'Mandatory',
    badgeColor: 'bg-purple-600 text-white',
    desc: 'Mandatory annual financial statements and directors report filing to avoid ₹100/day fine',
    icon: Scale,
    keywords: ['roc filing', 'mca filing', 'aoc-4', 'mgt-7', 'annual compliance', 'balance sheet roc'],
  },
  {
    id: 'mca-dir3-kyc',
    title: 'Director KYC (DIR-3 KYC Web / e-Form)',
    category: 'MCA',
    categoryColor: 'bg-purple-50 text-purple-700 border-purple-200',
    path: '/services/llp-registration',
    badge: 'Director DIN',
    badgeColor: 'bg-slate-100 text-slate-700',
    desc: 'Annual KYC verification to prevent director DIN deactivation and ₹5,000 penalty',
    icon: ShieldCheck,
    keywords: ['dir-3 kyc', 'dir 3 kyc', 'director kyc', 'din kyc', 'din reactivate'],
  },
  {
    id: 'mca-add-remove-director',
    title: 'Add or Remove Director (DIR-12)',
    category: 'MCA',
    categoryColor: 'bg-purple-50 text-purple-700 border-purple-200',
    path: '/services/llp-registration',
    badge: 'Secretarial',
    badgeColor: 'bg-slate-100 text-slate-700',
    desc: 'Appoint new director, process board resignation and update MCA records',
    icon: Building2,
    keywords: ['add director', 'remove director', 'dir-12', 'director resignation', 'appointment of director'],
  },
  {
    id: 'mca-strike-off',
    title: 'Strike Off / Close Inactive Company or LLP (STK-2)',
    category: 'MCA',
    categoryColor: 'bg-purple-50 text-purple-700 border-purple-200',
    path: '/services/llp-registration',
    badge: 'Closure',
    badgeColor: 'bg-rose-50 text-rose-700',
    desc: 'Legally shut down defunct companies and stop recurring statutory compliance obligations',
    icon: Scale,
    keywords: ['strike off', 'close company', 'close llp', 'stk-2', 'surrender company', 'dissolve company'],
  },

  // 6. LICENSES & REGISTRATIONS
  {
    id: 'reg-msme-udyam',
    title: 'MSME / Udyam Registration Certificate',
    category: 'Registrations',
    categoryColor: 'bg-teal-50 text-teal-700 border-teal-200',
    path: '/services',
    badge: 'Govt Subsidy',
    badgeColor: 'bg-emerald-50 text-emerald-700',
    desc: 'Avail priority bank loans, lower patent fees, and government procurement tenders',
    icon: ShieldCheck,
    keywords: ['msme', 'udyam', 'udyam registration', 'msme certificate', 'small business loan', 'priority sector lending'],
  },
  {
    id: 'reg-fssai-food',
    title: 'FSSAI Food Safety License & Registration',
    category: 'Registrations',
    categoryColor: 'bg-teal-50 text-teal-700 border-teal-200',
    path: '/services',
    badge: 'Food License',
    badgeColor: 'bg-blue-50 text-blue-700',
    desc: 'Mandatory 14-digit FoSCoS license for restaurants, food brands, cloud kitchens & distributors',
    icon: ShieldCheck,
    keywords: ['fssai', 'food license', 'foscos', 'restaurant license', 'cloud kitchen', 'food safety'],
  },
  {
    id: 'reg-iec-code',
    title: 'Import Export Code (IEC) by DGFT',
    category: 'Registrations',
    categoryColor: 'bg-teal-50 text-teal-700 border-teal-200',
    path: '/services',
    badge: 'Exim',
    badgeColor: 'bg-indigo-50 text-indigo-700',
    desc: '10-digit DGFT license code needed for clearing customs and receiving international wire payments',
    icon: ShieldCheck,
    keywords: ['iec', 'import export code', 'dgft', 'customs', 'export license', 'import license'],
  },
  {
    id: 'reg-dsc-token',
    title: 'Digital Signature Certificate (DSC Class 3)',
    category: 'Registrations',
    categoryColor: 'bg-teal-50 text-teal-700 border-teal-200',
    path: '/services',
    badge: 'Digital Token',
    badgeColor: 'bg-slate-100 text-slate-700',
    desc: 'FIPS-compliant Class 3 USB cryptographic token for MCA, GST, Income Tax and E-tendering',
    icon: ShieldCheck,
    keywords: ['dsc', 'digital signature', 'class 3 dsc', 'usb token', 'emsigner', 'epass2003'],
  },

  // 7. CONSULTATIONS & LEGAL
  {
    id: 'consult-talk-ca',
    title: 'Talk to Chartered Accountant (1-on-1 Consultation)',
    category: 'Consultation',
    categoryColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    path: '/contact',
    badge: 'Expert CA',
    badgeColor: 'bg-cyan-600 text-white',
    desc: 'Book personalized strategic session for business structuring, taxes, and accounting',
    icon: PhoneCall,
    keywords: ['talk to ca', 'ca consultation', 'chartered accountant', 'tax advice', 'ca call', 'consult accountant', 'consult ca'],
  },
  {
    id: 'consult-lawyer',
    title: 'Legal Consultation with Advocate',
    category: 'Consultation',
    categoryColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    path: '/contact',
    badge: 'Advocate',
    badgeColor: 'bg-slate-100 text-slate-700',
    desc: 'Legal opinion on agreements, investor dispute resolution, and commercial litigation',
    icon: Scale,
    keywords: ['lawyer', 'advocate', 'legal consultation', 'legal opinion', 'contract dispute', 'nda'],
  },

  // 8. CORE PLATFORM ACTIONS
  {
    id: 'core-pricing',
    title: 'Pricing Plans & Transparent Packages',
    category: 'Billing',
    categoryColor: 'bg-slate-100 text-slate-700 border-slate-200',
    path: '/pricing',
    badge: 'Plans',
    badgeColor: 'bg-slate-900 text-white',
    desc: 'Complete fee structure for GST, ITR, Company registration, and annual retainers',
    icon: CreditCard,
    keywords: ['pricing', 'plans', 'cost', 'fees', 'charges', 'packages', 'subscription', 'rates'],
  },
  {
    id: 'core-dashboard',
    title: 'Customer Dashboard & Track Application Status',
    category: 'Account',
    categoryColor: 'bg-slate-100 text-slate-700 border-slate-200',
    path: '/dashboard',
    badge: 'My Orders',
    badgeColor: 'bg-blue-600 text-white',
    desc: 'Track active filings, download REG-06 certificates, and review uploaded dossier documents',
    icon: LayoutDashboard,
    keywords: ['dashboard', 'track', 'status', 'my orders', 'filing status', 'trn status', 'profile', 'dossier'],
  },
  {
    id: 'core-services',
    title: 'All Compliance Services Directory',
    category: 'Directory',
    categoryColor: 'bg-slate-100 text-slate-700 border-slate-200',
    path: '/services',
    badge: 'All Services',
    badgeColor: 'bg-slate-100 text-slate-700',
    desc: 'Browse entire catalog of business registrations, licensing, and secretarial solutions',
    icon: FileText,
    keywords: ['services', 'all services', 'directory', 'catalog', 'compliance list'],
  },
  {
    id: 'core-faq',
    title: 'Frequently Asked Questions & Knowledge Base',
    category: 'Support',
    categoryColor: 'bg-slate-100 text-slate-700 border-slate-200',
    path: '/faq',
    badge: 'Help',
    badgeColor: 'bg-slate-100 text-slate-700',
    desc: 'Clear answers to mandatory compliance questions, timelines, and legal penalties',
    icon: HelpCircle,
    keywords: ['faq', 'questions', 'help', 'doubts', 'answers', 'support', 'queries'],
  },
];

// Highlight matched query substring cleanly
function HighlightMatch({ text, query }) {
  if (!query || !query.trim()) return <span>{text}</span>;
  const trimmed = query.trim();
  const index = text.toLowerCase().indexOf(trimmed.toLowerCase());
  if (index === -1) return <span>{text}</span>;

  const before = text.slice(0, index);
  const match = text.slice(index, index + trimmed.length);
  const after = text.slice(index + trimmed.length);

  return (
    <span>
      {before}
      <span className="bg-amber-100 text-slate-900 font-extrabold px-0.5 rounded">
        {match}
      </span>
      {after}
    </span>
  );
}

export default function NavbarSearch({ className = '', isMobile = false, onCloseMobile }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Instant real-time filtering & scoring
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      // Return 5 curated popular suggestions when empty & focused
      return SEARCH_DIRECTORY.filter((item) =>
        ['gst-apply', 'company-pvt-ltd', 'itr-filing-individual', 'trademark-registration', 'core-pricing'].includes(item.id)
      );
    }

    const tokens = q.split(/\s+/).filter(Boolean);

    const scored = SEARCH_DIRECTORY.map((item) => {
      let score = 0;
      const titleLower = item.title.toLowerCase();
      const descLower = item.desc.toLowerCase();
      const catLower = item.category.toLowerCase();
      const allKeywords = item.keywords.join(' ').toLowerCase();

      // Exact title match gets utmost priority
      if (titleLower.startsWith(q)) score += 120;
      else if (titleLower.includes(q)) score += 80;

      // Category match
      if (catLower.startsWith(q)) score += 60;

      // Token matching across all metadata
      tokens.forEach((token) => {
        if (titleLower.includes(token)) score += 40;
        if (item.keywords.some((k) => k.includes(token))) score += 35;
        if (descLower.includes(token)) score += 15;
      });

      return { ...item, score };
    });

    return scored
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8); // Top 8 most relevant matches
  }, [query]);

  // Reset active selection when query changes
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  // Global keyboard shortcut: Ctrl+K / Cmd+K or '/' to focus search instantly
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      } else if (e.key === '/' && document.activeElement !== inputRef.current) {
        const tagName = document.activeElement?.tagName;
        if (tagName !== 'INPUT' && tagName !== 'TEXTAREA') {
          e.preventDefault();
          inputRef.current?.focus();
          setIsOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Execution: Instantly redirect to destination
  const handleSelect = (item) => {
    if (!item) return;
    setIsOpen(false);
    setQuery('');
    if (onCloseMobile) onCloseMobile();
    navigate(item.path);
  };

  // Keyboard navigation inside search tab
  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % searchResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + searchResults.length) % searchResults.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (searchResults.length > 0) {
        const target = searchResults[activeIndex] || searchResults[0];
        handleSelect(target);
      } else {
        // Fallback to directory
        navigate('/services');
        setIsOpen(false);
        if (onCloseMobile) onCloseMobile();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const isQueryActive = query.trim().length > 0;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Search Input Tab */}
      <div className="relative flex items-center">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none transition-colors" />
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={isMobile ? "Search any service (e.g. GST, ITR, Company)..." : "Search services (e.g. GST, ITR, Company)..."}
          className={`w-full pl-9 pr-16 py-2 text-xs md:text-[13px] bg-slate-100/90 hover:bg-slate-100 focus:bg-white text-slate-900 placeholder:text-slate-400 rounded-full border border-slate-200/90 focus:border-[#0B1E36] focus:outline-none focus:ring-2 focus:ring-[#0B1E36]/15 transition-all duration-200 font-medium ${
            !isMobile ? 'w-48 xl:w-64 focus:w-80' : 'w-full'
          }`}
          aria-label="Search compliance services"
        />

        {/* Clear Button or Quick Shortcut Indicator */}
        <div className="absolute right-2.5 flex items-center gap-1">
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            !isMobile && (
              <kbd className="hidden xl:inline-flex items-center text-[10px] text-slate-400 bg-white border border-slate-200 rounded px-1.5 py-0.5 font-mono shadow-[0_1px_1px_rgba(0,0,0,0.05)] pointer-events-none">
                ⌘K
              </kbd>
            )
          )}
        </div>
      </div>

      {/* Real-Time Dropdown Results Modal */}
      {isOpen && (
        <div
          className={`absolute z-50 bg-white rounded-2xl shadow-[0_16px_50px_rgba(11,30,54,0.16)] border border-slate-200/90 overflow-hidden animate-in fade-in zoom-in-95 duration-150 ${
            isMobile
              ? 'left-0 right-0 top-full mt-2 w-full max-h-[60vh] overflow-y-auto'
              : 'right-0 top-full mt-2 w-[420px] sm:w-[480px]'
          }`}
        >
          {/* Header Status */}
          <div className="px-4 py-2.5 bg-slate-50/90 border-b border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              {isQueryActive ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-[#F26522]" />
                  <span>Found <strong>{searchResults.length}</strong> matching option{searchResults.length !== 1 ? 's' : ''}</span>
                </>
              ) : (
                <span className="text-slate-600 font-semibold">Popular & Recommended Services</span>
              )}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-slate-400 font-mono">
              <CornerDownLeft className="w-3 h-3 text-slate-400" /> Press Enter to go
            </span>
          </div>

          {/* Results List */}
          <div className="max-h-[380px] overflow-y-auto py-1 divide-y divide-slate-50">
            {searchResults.length > 0 ? (
              searchResults.map((item, index) => {
                const IconComponent = item.icon || FileText;
                const isSelected = index === activeIndex;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`w-full text-left px-4 py-3 flex items-start gap-3 transition-colors cursor-pointer group ${
                      isSelected ? 'bg-blue-50/60' : 'hover:bg-slate-50/80'
                    }`}
                  >
                    {/* Category Icon */}
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border transition ${
                        isSelected
                          ? 'bg-[#0B1E36] text-white border-[#0B1E36]'
                          : 'bg-slate-100 text-[#0B1E36] border-slate-200'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>

                    {/* Service Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className="text-xs font-bold text-slate-900 group-hover:text-[#0B1E36] transition leading-snug">
                          <HighlightMatch text={item.title} query={query} />
                        </span>

                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${
                            item.categoryColor || 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {item.category}
                        </span>

                        {item.badge && (
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                              item.badgeColor || 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-slate-500 line-clamp-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    {/* Instant Arrow Redirect Indicator */}
                    <div className="shrink-0 self-center pl-1">
                      <ArrowRight
                        className={`w-4 h-4 transition-transform duration-150 ${
                          isSelected
                            ? 'text-[#F26522] translate-x-1'
                            : 'text-slate-300 group-hover:text-slate-500'
                        }`}
                      />
                    </div>
                  </button>
                );
              })
            ) : (
              /* Zero Results Fallback */
              <div className="p-8 text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">
                    No exact service matching "{query}"
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Try searching for keywords like <strong>GST</strong>, <strong>ITR</strong>, <strong>Pvt Ltd</strong>, or <strong>Trademark</strong>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/services');
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0B1E36] text-white text-xs font-bold hover:bg-[#142C4F] transition shadow-xs"
                >
                  <span>Explore All Services</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Footer Shortcuts & Explore Link */}
          <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline">
                <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[9px] font-mono mr-1">↑↓</kbd>
                navigate
              </span>
              <span>
                <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[9px] font-mono mr-1">↵</kbd>
                redirect instantly
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                navigate('/services');
                if (onCloseMobile) onCloseMobile();
              }}
              className="text-xs font-bold text-[#0B1E36] hover:text-[#F26522] transition flex items-center gap-1"
            >
              <span>All 40+ Services</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
