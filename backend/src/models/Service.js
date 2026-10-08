import { supabase } from '../database/supabaseClient.js';

export class ServiceModel {
  static async findAll(activeOnly = true) {
    try {
      let query = supabase.from('services').select('*').order('category', { ascending: true });
      if (activeOnly) {
        query = query.eq('is_active', true);
      }
      const { data, error } = await query;
      if (error) {
        console.warn('Notice: Supabase services table pending migration, using fallback catalog.');
        return ServiceModel.getDefaultServices();
      }
      return (data && data.length > 0) ? data : ServiceModel.getDefaultServices();
    } catch (err) {
      return ServiceModel.getDefaultServices();
    }
  }

  static getDefaultServices() {
    return [
      {
        id: 'pvt-ltd-company',
        title: 'Private Limited Company Incorporation',
        slug: 'company-registration',
        category: 'INCORPORATION',
        badge: 'Startup Favorite',
        base_fee: 4999.00,
        govt_fee: 1000.00,
        gst_rate: 18.00,
        description: 'Complete MCA SPICe+ filing, DIN, DSC, MOA, AOA, PAN, TAN & corporate bank account setup.',
        features: ['Name Approval (RUN)', 'DSC & DIN Allotment', 'SPICe+ Incorporation', 'Current Account Setup'],
        keywords: ['pvt ltd', 'company', 'incorporation', 'startup'],
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
        description: 'LLP agreement drafting, designated partner DPIN, and statutory ROC registration.',
        features: ['DPIN for Partners', 'LLP Agreement Drafting', 'Zero Audit until 40L Turnover'],
        keywords: ['llp', 'partnership', 'firm'],
        is_active: true,
      },
      {
        id: 'gst-registration',
        title: 'GST Registration Online',
        slug: 'gst-registration',
        category: 'GST',
        badge: 'Fast-Track',
        base_fee: 1499.00,
        govt_fee: 0.00,
        gst_rate: 18.00,
        description: 'End-to-end registration with AI document OCR and dedicated CA filing across all 36 States & UTs.',
        features: ['Free Document AI Check', 'Form REG-01 Preparation', 'REG-06 Certificate Allotment'],
        keywords: ['gst', 'gstin', 'registration', 'tax'],
        is_active: true,
      },
      {
        id: 'gst-return',
        title: 'GSTR-1 & GSTR-3B Monthly Returns',
        slug: 'gst-return',
        category: 'GST',
        badge: 'Monthly Plan',
        base_fee: 799.00,
        govt_fee: 0.00,
        gst_rate: 18.00,
        description: 'Monthly return filing with automated GSTR-2B ITC reconciliation and zero penalty guarantee.',
        features: ['Sales Invoices Reconciliation', 'ITC Optimization via 2B', 'Zero Penalty Guarantee'],
        keywords: ['gstr-1', 'gstr-3b', 'returns'],
        is_active: true,
      },
      {
        id: 'income-tax',
        title: 'Business & Professional ITR Filing',
        slug: 'income-tax',
        category: 'INCOME_TAX',
        badge: 'Tax Season',
        base_fee: 999.00,
        govt_fee: 0.00,
        gst_rate: 18.00,
        description: 'ITR-3, ITR-4 filed with expert tax calculation and deduction optimization.',
        features: ['AIS & 26AS Reconciliation', 'Capital Gains Computations', 'Maximum Tax Deductions'],
        keywords: ['itr', 'income tax', 'tax return'],
        is_active: true,
      },
      {
        id: 'trademark',
        title: 'Trademark Registration Online',
        slug: 'trademark',
        category: 'TRADEMARK',
        badge: 'Brand Protection',
        base_fee: 1999.00,
        govt_fee: 4500.00,
        gst_rate: 18.00,
        description: 'Protect your brand name, logo, and slogan nationwide with IP attorney representation.',
        features: ['Free Trademark Search', 'Class Selection (1 to 45)', 'Form TM-A Filing'],
        keywords: ['trademark', 'tm', 'brand', 'logo'],
        is_active: true,
      },
    ];
  }

  static async findById(id) {
    const { data, error } = await supabase.from('services').select('*').eq('id', id).maybeSingle();
    if (error) throw error;
    return data;
  }

  static async findBySlug(slug) {
    const { data, error } = await supabase.from('services').select('*').eq('slug', slug).maybeSingle();
    if (error) throw error;
    return data;
  }

  static async findByCategory(category) {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('category', category)
      .eq('is_active', true);
    if (error) throw error;
    return data || [];
  }

  static async create(serviceData) {
    const { data, error } = await supabase.from('services').insert(serviceData).select().single();
    if (error) throw error;
    return data;
  }
}
