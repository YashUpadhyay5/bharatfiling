import { supabase } from '../src/database/supabaseClient.js';
import dotenv from 'dotenv';

dotenv.config();

const SERVICES = [
  // Incorporation & Business Setup
  {
    id: 'pvt-ltd-company',
    title: 'Private Limited Company Incorporation',
    slug: 'company-registration',
    category: 'INCORPORATION',
    badge: 'Startup Favorite',
    base_fee: 4999.00,
    govt_fee: 1000.00,
    gst_rate: 18.00,
    description: 'Complete MCA SPICe+ filing, DIN, MOA, AOA, PAN, TAN & corporate bank account setup with dedicated CA assistance.',
    features: ['Name Approval (RUN)', 'Digital Signature Certificate (DSC)', 'Articles & Memorandum of Association', 'Corporate Bank Account Opening'],
    keywords: ['pvt ltd', 'company', 'incorporation', 'private limited', 'mca', 'spice+', 'startup'],
    is_active: true,
  },
  {
    id: 'llp-registration',
    title: 'Limited Liability Partnership (LLP)',
    slug: 'llp-registration',
    category: 'INCORPORATION',
    badge: 'Low Compliance',
    base_fee: 3999.00,
    govt_fee: 500.00,
    gst_rate: 18.00,
    description: 'LLP agreement drafting, designated partner DPIN, and statutory ROC registration for professional firms.',
    features: ['DPIN for 2 Partners', 'Name Reservation (RUN-LLP)', 'LLP Agreement Drafting', 'Zero Audit until 40L Turnover'],
    keywords: ['llp', 'partnership', 'limited liability', 'firm', 'partners', 'agreement'],
    is_active: true,
  },
  {
    id: 'opc-registration',
    title: 'One Person Company (OPC)',
    slug: 'opc-registration',
    category: 'INCORPORATION',
    badge: 'Solo Founders',
    base_fee: 4499.00,
    govt_fee: 1000.00,
    gst_rate: 18.00,
    description: 'Ideal for solo entrepreneurs looking for corporate status, limited liability, and credibility.',
    features: ['1 Director & 1 Nominee', 'DSC & DIN Allotment', 'SPICe+ Incorporation', 'PAN & TAN Generation'],
    keywords: ['opc', 'one person', 'solo', 'company', 'founder'],
    is_active: true,
  },

  // GST & Indirect Tax
  {
    id: 'gst-registration',
    title: 'GST Registration Online',
    slug: 'gst-registration',
    category: 'GST',
    badge: 'Fast-Track',
    base_fee: 1499.00,
    govt_fee: 0.00,
    gst_rate: 18.00,
    description: 'End-to-end registration with AI document OCR, Form REG-01 preparation, and dedicated CA filing across all 36 States & UTs.',
    features: ['Free Document AI Check', 'Form REG-01 Preparation', 'Notice REG-03 Clarifications Included', 'REG-06 Certificate Allotment'],
    keywords: ['gst', 'gstin', 'registration', 'tax', 'indirect tax', 'reg-01', 'arn'],
    is_active: true,
  },
  {
    id: 'gst-return-filing',
    title: 'Monthly GSTR-1 & GSTR-3B Filing',
    slug: 'gst-return',
    category: 'GST',
    badge: 'Monthly Plan',
    base_fee: 799.00,
    govt_fee: 0.00,
    gst_rate: 18.00,
    description: 'Monthly return filing with automated GSTR-2B input tax credit reconciliation and zero penalty guarantee.',
    features: ['Sales Invoices Reconciliation', 'ITC Optimization via 2B', 'GSTR-1 & 3B Submission', 'Challan Payment Assistance'],
    keywords: ['gstr-1', 'gstr-3b', 'returns', 'gst return', 'itc', 'compliance'],
    is_active: true,
  },
  {
    id: 'gst-annual-return',
    title: 'GST Annual Return (GSTR-9 & 9C)',
    slug: 'gst-annual-return',
    category: 'GST',
    badge: 'Annual Audit',
    base_fee: 2999.00,
    govt_fee: 0.00,
    gst_rate: 18.00,
    description: 'Comprehensive annual compliance audit and reconciliation to avoid scrutiny notices.',
    features: ['Full Year Books vs GST Reconciliation', 'GSTR-9 Form Preparation', 'CA Audit Certification (9C)', 'Demand Assessment'],
    keywords: ['gstr-9', 'gstr-9c', 'annual return', 'gst audit', 'reconciliation'],
    is_active: true,
  },

  // Income Tax & Corporate Advisory
  {
    id: 'income-tax-filing',
    title: 'Business & Professional ITR Filing',
    slug: 'income-tax',
    category: 'INCOME_TAX',
    badge: 'Tax Season',
    base_fee: 999.00,
    govt_fee: 0.00,
    gst_rate: 18.00,
    description: 'ITR-3, ITR-4 (Presumptive 44AD/ADA) filed with expert tax calculation and deduction optimization.',
    features: ['AIS & 26AS Reconciliation', 'Capital Gains Computations', 'Maximum Tax Deductions', 'E-Verification Support'],
    keywords: ['itr', 'income tax', 'tax return', 'itr-3', 'itr-4', '44ad', 'audit'],
    is_active: true,
  },
  {
    id: 'tds-quarterly-return',
    title: 'TDS & TCS Quarterly Returns',
    slug: 'tds-return',
    category: 'INCOME_TAX',
    badge: 'Statutory',
    base_fee: 1499.00,
    govt_fee: 0.00,
    gst_rate: 18.00,
    description: 'Form 24Q, 26Q, and 27Q quarterly return preparation with Form 16/16A generation.',
    features: ['Challan Verification on TRACES', 'FVU File Generation', 'Form 16/16A Issuance', 'Zero Default Notice Guarantee'],
    keywords: ['tds', 'tcs', 'traces', '26q', '24q', 'form 16'],
    is_active: true,
  },

  // Trademark & Intellectual Property
  {
    id: 'trademark-registration',
    title: 'Trademark Registration Online',
    slug: 'trademark',
    category: 'TRADEMARK',
    badge: 'Brand Protection',
    base_fee: 1999.00,
    govt_fee: 4500.00,
    gst_rate: 18.00,
    description: 'Protect your brand name, logo, and slogan nationwide with IP attorney representation and class classification.',
    features: ['Free Trademark Search Report', 'Class Selection (1 to 45)', 'Form TM-A Filing', 'Immediate Use of TM Symbol'],
    keywords: ['trademark', 'tm', 'brand', 'logo', 'copyright', 'ipr'],
    is_active: true,
  },
];

async function seed() {
  console.log('Seeding services catalog to Supabase...');
  try {
    for (const service of SERVICES) {
      const { data, error } = await supabase
        .from('services')
        .upsert(service, { onConflict: 'id' });

      if (error) {
        console.error(`Error inserting ${service.id}:`, error.message);
      } else {
        console.log(`✓ Seeded: ${service.title}`);
      }
    }
    console.log('🎉 Services catalog seed complete!');
  } catch (err) {
    console.error('Seed exception:', err);
  }
}

seed();
