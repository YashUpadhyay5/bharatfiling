import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Building2,
  Receipt,
  FileCheck2,
  Calculator,
  Scale,
  Award,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../services/api.js';
import AuthRequiredModal from '../components/common/AuthRequiredModal.jsx';

export default function ServicesDirectory() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedServiceForAuth, setSelectedServiceForAuth] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [liveServices, setLiveServices] = useState([]);

  useEffect(() => {
    api
      .getServices()
      .then((res) => {
        if (res.success && res.services) {
          setLiveServices(res.services);
        }
      })
      .catch((err) => {
        console.warn('Dynamic services API fetch note:', err.message);
      });
  }, []);

  const handleSelectService = (item, isApply = false) => {
    const destination = isApply && item.applyPath ? item.applyPath : item.path;
    if (isAuthenticated) {
      navigate(destination);
    } else {
      setSelectedServiceForAuth({
        title: item.title,
        price: item.price,
        path: item.path,
        ctaPath: destination,
      });
      setIsAuthModalOpen(true);
    }
  };

  // Quick 3-screen Statutory Filings
  const fastTrackFilings = [
    {
      title: 'GST Registration',
      subtitle: 'Form REG-01 & 15-Digit GSTIN',
      slug: 'gst',
      applyPath: '/apply/gst',
      price: '₹1,499 + GST',
      badge: 'Most Popular',
      icon: FileCheck2,
      desc: 'Complete Form REG-01 preparation with dedicated CA review and official REG-06 delivery.',
    },
    {
      title: 'Pvt Ltd Company Incorporation',
      subtitle: 'MCA SPICe+ & CIN Issuance',
      slug: 'company-registration',
      applyPath: '/apply/company-registration',
      price: '₹4,999 + Govt Fees',
      badge: 'Startup Favorite',
      icon: Building2,
      desc: 'MCA RUN name approval, DIN, DSC, MOA/AOA drafting, and Certificate of Incorporation (COI).',
    },
    {
      title: 'Income Tax Return (ITR)',
      subtitle: 'Direct Tax & Scrutiny Prevention',
      slug: 'income-tax',
      applyPath: '/apply/income-tax',
      price: 'From ₹999',
      badge: 'Tax Season',
      icon: Receipt,
      desc: 'ITR-1 to ITR-4 filing, capital gains computation, AIS/26AS reconciliation, and ITR-V verification.',
    },
    {
      title: 'Trademark Registration',
      subtitle: 'IP India Form TM-A Protection',
      slug: 'trademark',
      applyPath: '/apply/trademark',
      price: '₹1,999 + Govt Fees',
      badge: 'Brand Protection',
      icon: Award,
      desc: 'Brand search report across 45 classes, advocate drafting, and TM Application Number allotment.',
    },
    {
      title: 'LLP Incorporation',
      subtitle: 'MCA FiLLiP & ROC Allotment',
      slug: 'llp-registration',
      applyPath: '/apply/llp-registration',
      price: '₹3,999 + Govt Fees',
      badge: 'Low Compliance',
      icon: Scale,
      desc: 'DPIN allotment, RUN-LLP name approval, custom LLP deed drafting, and LLPIN certificate.',
    },
  ];

  const serviceCategories = [
    {
      category: 'Company & Business Incorporation',
      icon: Building2,
      items: [
        {
          title: 'Private Limited Company Incorporation',
          path: '/services/company-registration',
          applyPath: '/apply/company-registration',
          badge: 'Startup Favorite',
          desc: 'Complete MCA SPICe+ filing, DIN, DSC, MOA, AOA, PAN, TAN & corporate bank account setup.',
          price: '₹4,999 + Govt Fees',
        },
        {
          title: 'Limited Liability Partnership (LLP)',
          path: '/services/llp-registration',
          applyPath: '/apply/llp-registration',
          badge: 'Low Compliance',
          desc: 'LLP agreement drafting, designated partner DPIN, and statutory ROC registration.',
          price: '₹3,999 + Govt Fees',
        },
        {
          title: 'One Person Company (OPC)',
          path: '/services/company-registration',
          applyPath: '/apply/company-registration',
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
          applyPath: '/apply/income-tax',
          badge: 'Tax Season',
          desc: 'ITR-3, ITR-4 (Presumptive 44AD/ADA) filed with expert tax calculation and deduction optimization.',
          price: 'From ₹999',
        },
        {
          title: 'Corporate Tax Audit (Section 44AB)',
          path: '/services/income-tax',
          applyPath: '/apply/income-tax',
          badge: 'CA Certified',
          desc: 'Complete tax audit preparation, Form 3CD reporting, and statutory filing by certified CAs.',
          price: 'From ₹7,999',
        },
        {
          title: 'TDS & TCS Quarterly Returns',
          path: '/services/income-tax',
          applyPath: '/apply/income-tax',
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
          applyPath: '/apply/gst',
          badge: 'Fast-Track',
          desc: 'End-to-end registration with AI document OCR and dedicated CA filing across all 36 States & UTs.',
          price: '₹1,499 + GST',
        },
        {
          title: 'GSTR-1 & GSTR-3B Monthly Returns',
          path: '/services/gst-return',
          applyPath: '/apply/gst',
          badge: 'Monthly Plan',
          desc: 'Monthly return filing with automated GSTR-2B input tax credit reconciliation and zero penalty guarantee.',
          price: 'From ₹799/mo',
        },
        {
          title: 'GST Annual Return (GSTR-9 & 9C)',
          path: '/services/gst-return',
          applyPath: '/apply/gst',
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
          applyPath: '/apply/llp-registration',
          badge: 'Mandatory',
          desc: 'Annual filing of audited financial statements and annual returns with Ministry of Corporate Affairs.',
          price: 'From ₹3,499/yr',
        },
        {
          title: 'Director KYC (DIR-3 KYC)',
          path: '/services/llp-registration',
          applyPath: '/apply/llp-registration',
          badge: 'Annual',
          desc: 'Annual digital KYC filing for all active DIN holders to avoid ₹5,000 government penalty.',
          price: 'From ₹499/dir',
        },
        {
          title: 'Change in Directors / Registered Office',
          path: '/services/llp-registration',
          applyPath: '/apply/llp-registration',
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
          applyPath: '/apply/trademark',
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
          applyPath: '/apply/trademark',
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
        {/* Top Header */}
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

        {/* Highlight Section: Fast-Track 3-Screen Statutory Filings */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 mb-2">
                <Zap className="w-3.5 h-3.5" /> Direct CA Fast-Track Pipeline
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Start a New Statutory Filing (3-Minute Setup)
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Choose a core statutory service to start the isolated 3-screen registration pipeline with real-time CA filing and live status tracking.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {fastTrackFilings.map((filing, fIdx) => {
              const IconComp = filing.icon;
              return (
                <div
                  key={fIdx}
                  className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-emerald-500/50 rounded-2xl p-5 flex flex-col justify-between transition-all group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-700 text-emerald-300 border border-slate-600">
                        {filing.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-extrabold text-sm text-white group-hover:text-emerald-400 transition-colors">
                        {filing.title}
                      </h3>
                      <p className="text-[11px] font-medium text-slate-400 mt-0.5">
                        {filing.subtitle}
                      </p>
                    </div>

                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {filing.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-700/60 space-y-2">
                    <div className="text-xs font-black text-emerald-400">
                      {filing.price}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSelectService({ ...filing, path: filing.applyPath }, true)}
                      className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Categories Catalog */}
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

                      <div className="pt-5 mt-4 border-t border-slate-100 space-y-2">
                        {item.applyPath ? (
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleSelectService(item, true)}
                              className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                            >
                              <span>Apply Online (3 Steps)</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleSelectService(item, false)}
                              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer"
                              title="View Overview & Details"
                            >
                              Details
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleSelectService(item, false)}
                            className="w-full text-xs font-bold text-[#111827] hover:text-[#1F2937] flex items-center justify-between group cursor-pointer py-1"
                          >
                            <span>View Service & Consult CA</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Authentication Popup Modal */}
      <AuthRequiredModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        service={selectedServiceForAuth}
        onSuccess={() => {
          if (selectedServiceForAuth?.ctaPath) {
            navigate(selectedServiceForAuth.ctaPath);
          } else if (selectedServiceForAuth?.path) {
            navigate(selectedServiceForAuth.path);
          }
        }}
      />
    </div>
  );
}
