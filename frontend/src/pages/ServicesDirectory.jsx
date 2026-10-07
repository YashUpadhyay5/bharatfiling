import React from 'react';
import { Link } from 'react-router-dom';
import { FileCheck2, Building2, Scale, Receipt, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';

export default function ServicesDirectory() {
  const serviceCategories = [
    {
      category: 'Goods & Services Tax (GST)',
      items: [
        {
          title: 'GST Registration Online',
          path: '/services/gst-registration',
          badge: 'Live MVP',
          desc: 'End-to-end registration with AI document OCR and dedicated CA filing. All Indian states covered.',
          price: '₹1,499 + GST',
        },
        {
          title: 'GSTR-1 & GSTR-3B Return Filing',
          path: '/services/gst-return',
          badge: 'Coming Soon',
          desc: 'Monthly and quarterly GST return filing with automated 2B ITC reconciliation.',
          price: 'From ₹499/mo',
        },
        {
          title: 'GST Reconciliation & Annual Return (GSTR-9)',
          path: '/services/gst-return',
          badge: 'Coming Soon',
          desc: 'Comprehensive annual compliance audit to avoid scrutiny notices.',
          price: 'From ₹2,999',
        },
      ],
    },
    {
      category: 'Company & Business Registration',
      items: [
        {
          title: 'Private Limited Company Incorporation',
          path: '/services/company-registration',
          badge: 'Coming Soon',
          desc: 'Complete MCA SPICe+ filing, DIN, DSC, MOA, AOA, PAN, TAN & Bank setup.',
          price: '₹6,999 + Govt Fees',
        },
        {
          title: 'Limited Liability Partnership (LLP)',
          path: '/services/llp-registration',
          badge: 'Coming Soon',
          desc: 'LLP agreement drafting, designated partner DPIN, and ROC registration.',
          price: '₹4,999 + Govt Fees',
        },
        {
          title: 'One Person Company (OPC)',
          path: '/services/company-registration',
          badge: 'Coming Soon',
          desc: 'Ideal for solo entrepreneurs looking for corporate status and limited liability.',
          price: '₹5,999 + Govt Fees',
        },
      ],
    },
    {
      category: 'Income Tax & Corporate Advisory',
      items: [
        {
          title: 'Business & Professional ITR Filing',
          path: '/services/income-tax',
          badge: 'Coming Soon',
          desc: 'ITR-3, ITR-4 (Presumptive 44AD/ADA) filed with expert tax calculation.',
          price: 'From ₹1,499',
        },
        {
          title: 'Trademark Registration & IPR',
          path: '/services/trademark',
          badge: 'Coming Soon',
          desc: 'Brand name protection, TM class search, advocate drafting, and filing.',
          price: '₹1,999 + Govt Fees',
        },
        {
          title: 'Legal Contracts & Advocate Consultation',
          path: '/services/legal',
          badge: 'Coming Soon',
          desc: 'Co-founder agreements, vendor contracts, NDA, and legal opinion.',
          price: 'From ₹2,499',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Breadcrumbs items={[{ label: 'All Services' }]} />
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Compliance Directory
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            All Business Compliance & Legal Services
          </h1>
          <p className="text-sm text-slate-600">
            Explore our end-to-end professional services catalog. All services share our unified Master Customer Profile.
          </p>
        </div>

        <div className="space-y-10">
          {serviceCategories.map((cat, idx) => (
            <div key={idx} className="space-y-4">
              <h2 className="text-lg font-black text-slate-900 border-b border-slate-200 pb-2">
                {cat.category}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cat.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            item.badge === 'Live MVP'
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
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
                        className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center justify-between group"
                      >
                        <span>View Service Details</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
