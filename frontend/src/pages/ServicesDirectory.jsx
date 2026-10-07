import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Building2, Receipt, FileCheck2, Calculator, Scale, Award } from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';

export default function ServicesDirectory() {
  const serviceCategories = [
    {
      category: 'Company & Business Incorporation',
      icon: Building2,
      items: [
        {
          title: 'Private Limited Company Incorporation',
          path: '/services/company-registration',
          badge: 'Startup Favorite',
          desc: 'Complete MCA SPICe+ filing, DIN, DSC, MOA, AOA, PAN, TAN & corporate bank account setup.',
          price: '₹4,999 + Govt Fees',
        },
        {
          title: 'Limited Liability Partnership (LLP)',
          path: '/services/llp-registration',
          badge: 'Low Compliance',
          desc: 'LLP agreement drafting, designated partner DPIN, and statutory ROC registration.',
          price: '₹3,999 + Govt Fees',
        },
        {
          title: 'One Person Company (OPC)',
          path: '/services/company-registration',
          badge: 'Solo Founders',
          desc: 'Ideal for solo entrepreneurs looking for corporate status, limited liability, and credibility.',
          price: '₹4,499 + Govt Fees',
        },
      ],
    },
    {
      category: 'Chartered Accountant & Direct Tax',
      icon: Receipt,
      items: [
        {
          title: 'Business & Professional ITR Filing',
          path: '/services/income-tax',
          badge: 'Tax Season',
          desc: 'ITR-3, ITR-4 (Presumptive 44AD/ADA) filed with expert tax calculation and deduction optimization.',
          price: 'From ₹999',
        },
        {
          title: 'Corporate Tax Audit (Section 44AB)',
          path: '/services/income-tax',
          badge: 'CA Certified',
          desc: 'Complete tax audit preparation, Form 3CD reporting, and statutory filing by certified CAs.',
          price: 'From ₹7,999',
        },
        {
          title: 'TDS & TCS Quarterly Returns',
          path: '/services/income-tax',
          badge: 'Statutory',
          desc: 'Form 24Q, 26Q, and 27Q quarterly return preparation with Form 16/16A generation.',
          price: 'From ₹1,499/qtr',
        },
      ],
    },
    {
      category: 'Goods & Services Tax (GST)',
      icon: FileCheck2,
      items: [
        {
          title: 'GST Registration Online',
          path: '/services/gst-registration',
          badge: 'Fast-Track',
          desc: 'End-to-end registration with AI document OCR and dedicated CA filing across all 36 States & UTs.',
          price: '₹1,499 + GST',
        },
        {
          title: 'GSTR-1 & GSTR-3B Monthly Returns',
          path: '/services/gst-return',
          badge: 'Monthly Plan',
          desc: 'Monthly return filing with automated GSTR-2B input tax credit reconciliation and zero penalty guarantee.',
          price: 'From ₹799/mo',
        },
        {
          title: 'GST Annual Return (GSTR-9 & 9C)',
          path: '/services/gst-return',
          badge: 'Annual Audit',
          desc: 'Comprehensive annual compliance audit and reconciliation to avoid scrutiny notices.',
          price: 'From ₹2,999',
        },
      ],
    },
    {
      category: 'Accounting & Virtual CFO',
      icon: Calculator,
      items: [
        {
          title: 'Monthly Bookkeeping & Accounting',
          path: '/services/legal',
          badge: 'Tally & Zoho',
          desc: 'Full ledger bookkeeping, vendor reconciliations, and expense management.',
          price: 'From ₹2,999/mo',
        },
        {
          title: 'Monthly P&L and Balance Sheet',
          path: '/services/legal',
          badge: 'Management MIS',
          desc: 'Periodic financial statements, cash flow reviews, and investor-ready reporting.',
          price: 'Included in CFO',
        },
        {
          title: 'Payroll & Statutory Deductions',
          path: '/services/legal',
          badge: 'PF, ESIC & PT',
          desc: 'Monthly payroll processing, payslip distribution, and provident fund compliances.',
          price: 'From ₹1,999/mo',
        },
      ],
    },
    {
      category: 'MCA ROC & Secretarial Compliance',
      icon: Scale,
      items: [
        {
          title: 'Annual ROC Filing (AOC-4 & MGT-7)',
          path: '/services/llp-registration',
          badge: 'Mandatory',
          desc: 'Annual filing of audited financial statements and annual returns with Ministry of Corporate Affairs.',
          price: 'From ₹3,499/yr',
        },
        {
          title: 'Director KYC (DIR-3 KYC)',
          path: '/services/llp-registration',
          badge: 'Annual',
          desc: 'Annual digital KYC filing for all active DIN holders to avoid ₹5,000 government penalty.',
          price: 'From ₹499/dir',
        },
        {
          title: 'Change in Directors / Registered Office',
          path: '/services/llp-registration',
          badge: 'ROC Filing',
          desc: 'Drafting board resolutions, filing Form DIR-12 or INC-22 on MCA portal.',
          price: 'From ₹1,999',
        },
      ],
    },
    {
      category: 'Trademark & Legal Contracts',
      icon: Award,
      items: [
        {
          title: 'Trademark Registration & IPR',
          path: '/services/trademark',
          badge: 'Brand Protection',
          desc: 'Brand name, logo, and slogan search, Nice classification, drafting TM-A by IP Advocates.',
          price: '₹1,999 + Govt Fees',
        },
        {
          title: 'Founder Agreements & NDAs',
          path: '/services/legal',
          badge: 'Legal Drafting',
          desc: 'Custom drafted co-founder equity agreements, employee contracts, and non-disclosure agreements.',
          price: 'From ₹2,499',
        },
        {
          title: 'Trademark Hearing & Examination Reply',
          path: '/services/trademark',
          badge: 'Advocate Support',
          desc: 'Drafting replies to Trademark Examination objections and Advocate appearance at hearings.',
          price: 'From ₹2,999',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Breadcrumbs items={[{ label: 'All Services' }]} />
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#111827] bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            Full-Stack Directory
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            All CA, Finance & Legal Services
          </h1>
          <p className="text-sm text-slate-600">
            Explore our end-to-end corporate, tax, and accounting catalog. All services are reviewed and certified by licensed Chartered Accountants.
          </p>
        </div>

        <div className="space-y-12">
          {serviceCategories.map((cat, idx) => {
            const IconComp = cat.icon;
            return (
              <div key={idx} className="space-y-4">
                <div className="flex items-center gap-2.5 border-b border-slate-200 pb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#111827] text-white flex items-center justify-center">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">
                    {cat.category}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {cat.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-[#111827] hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-[#111827] border border-slate-200">
                            {item.badge}
                          </span>
                          <span className="text-xs font-black text-slate-900">{item.price}</span>
                        </div>
                        <h3 className="font-extrabold text-base text-slate-900">{item.title}</h3>
                        <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                      </div>

                      <div className="pt-5 mt-4 border-t border-slate-100">
                        <Link
                          to={item.path}
                          className="text-xs font-bold text-[#111827] hover:text-[#1F2937] flex items-center justify-between group"
                        >
                          <span>View Service & Consult CA</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
