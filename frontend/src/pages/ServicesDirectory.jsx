import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  Receipt,
  FileCheck2,
  Scale,
  Award,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Check,
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
      badge: 'Statutory Filing',
      icon: FileCheck2,
      desc: 'Complete Form REG-01 preparation with dedicated CA review and official REG-06 certificate issuance.',
    },
    {
      title: 'Udyam / MSME Registration',
      subtitle: 'Ministry of MSME Portal Allotment',
      slug: 'udyam',
      applyPath: '/apply/udyam',
      price: '₹2,899 + GST',
      badge: 'MSME License',
      icon: Award,
      desc: 'Instant Aadhaar verification, accurate 3-tier NIC classification, and official Udyam Certificate.',
    },
    {
      title: 'Pvt Ltd Company Incorporation',
      subtitle: 'MCA SPICe+ & CIN Issuance',
      slug: 'company-registration',
      applyPath: '/apply/company-registration',
      price: '₹4,999 + Govt Fees',
      badge: 'Startup Formation',
      icon: Building2,
      desc: 'MCA RUN name approval, DIN, DSC, MOA/AOA drafting, and Certificate of Incorporation (COI).',
    },
    {
      title: 'Income Tax Return (ITR)',
      subtitle: 'Direct Tax & Scrutiny Prevention',
      slug: 'income-tax',
      applyPath: '/apply/income-tax',
      price: 'From ₹999',
      badge: 'Tax Advisory',
      icon: Receipt,
      desc: 'ITR-1 to ITR-4 filing, capital gains computation, AIS/26AS reconciliation, and ITR-V verification.',
    },
    {
      title: 'LLP Incorporation',
      subtitle: 'MCA FiLLiP & ROC Allotment',
      slug: 'llp-registration',
      applyPath: '/apply/llp-registration',
      price: '₹3,999 + Govt Fees',
      badge: 'Corporate Secretarial',
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
          desc: 'Setup an LLP with limited liability protection and lower compliance burden than a private company.',
          price: '₹3,999 + Govt Fees',
        },
        {
          title: 'One Person Company (OPC)',
          path: '/services/company-registration',
          applyPath: '/apply/company-registration',
          badge: 'Solo Founder',
          desc: 'Corporate structure for solo entrepreneurs with limited liability protection and single shareholder.',
          price: '₹4,499 + Govt Fees',
        },
        {
          title: 'Partnership Firm Registration',
          path: '/services/company-registration',
          applyPath: '/apply/company-registration',
          badge: 'Traditional Firm',
          desc: 'Drafting of formal Partnership Deed, notary notarization, and ROF portal registration.',
          price: '₹2,499 + Stamp Duty',
        },
        {
          title: 'Section 8 Non-Profit Company',
          path: '/services/company-registration',
          applyPath: '/apply/company-registration',
          badge: 'NGO & Trust',
          desc: 'Incorporate a non-profit organization under Section 8 of the Companies Act with 12A & 80G tax exemptions.',
          price: '₹8,999 + Govt Fees',
        },
      ],
    },
    {
      category: 'Taxation, GST & Accounting',
      icon: Receipt,
      items: [
        {
          title: 'GST Registration Online',
          path: '/services/gst-registration',
          applyPath: '/apply/gst',
          badge: 'Statutory License',
          desc: 'New GST number allotment for proprietorships, partnerships, LLPs, and companies with CA review.',
          price: '₹1,499 + GST',
        },
        {
          title: 'GST Return Filing (GSTR-1 & 3B)',
          path: '/services/gst-return',
          applyPath: '/apply/gst-return',
          badge: 'Monthly / Quarterly',
          desc: 'Automated 2B Input Tax Credit reconciliation, sales ledger reconciliation, and zero penalty filing.',
          price: '₹999 / month',
        },
        {
          title: 'Income Tax Return (ITR) Filing',
          path: '/services/income-tax',
          applyPath: '/apply/income-tax',
          badge: 'Direct Tax',
          desc: 'Comprehensive personal & business ITR computation with AIS/26AS tax credit reconciliation.',
          price: 'From ₹999',
        },
        {
          title: 'Virtual CFO & Bookkeeping',
          path: '/services/legal',
          applyPath: '/apply/legal',
          badge: 'Full Operations',
          desc: 'Full-stack bookkeeping on Tally/Zoho, monthly P&L and Balance Sheet, and payroll TDS deductions.',
          price: '₹2,999 / month',
        },
      ],
    },
    {
      category: 'Intellectual Property & Trademarks',
      icon: Award,
      items: [
        {
          title: 'Trademark Registration (TM)',
          path: '/services/trademark',
          applyPath: '/apply/trademark',
          badge: 'Brand Protection',
          desc: 'Search report across 45 Nice classes, advocate drafting of Form TM-A, and TM number allotment.',
          price: '₹1,999 + Govt Fees',
        },
        {
          title: 'Trademark Objection Reply',
          path: '/services/trademark',
          applyPath: '/apply/trademark',
          badge: 'Legal Representation',
          desc: 'Drafting professional legal response to Examination Reports issued by the Trademark Registrar.',
          price: '₹2,499',
        },
        {
          title: 'Copyright Registration',
          path: '/services/trademark',
          applyPath: '/apply/trademark',
          badge: 'Creative IP',
          desc: 'Protect original artistic, musical, literary works, and computer software source code.',
          price: '₹3,499 + Govt Fees',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <Breadcrumbs items={[{ label: 'Services Directory' }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#155EEF] uppercase tracking-wider">
            Comprehensive Statutory Catalog
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#252B36] tracking-tight">
            Corporate, Taxation & Compliance Services
          </h1>
          <p className="text-sm text-[#667085] leading-relaxed">
            Every statutory filing is reviewed and certified by licensed Chartered Accountants. Transparent fixed pricing with zero hidden costs.
          </p>
        </div>

        {/* Fast-Track 3-Screen Statutory Filings Grid */}
        <div className="bg-[#F8F9FB] rounded-xl p-6 sm:p-8 border border-[#E5E7EB] space-y-5">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-[#155EEF] uppercase tracking-wider">Fast-Track Setup</span>
            <h2 className="text-lg sm:text-xl font-bold text-[#252B36]">
              Instant Statutory Registrations (3-Screen Application)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {fastTrackFilings.map((filing, fIdx) => {
              const IconComp = filing.icon;
              return (
                <div
                  key={fIdx}
                  className="bg-white border border-[#E5E7EB] hover:border-[#155EEF] rounded-xl p-5 flex flex-col justify-between transition-colors shadow-xs group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-lg bg-[#EFF8FF] text-[#155EEF] flex items-center justify-center border border-[#D1E9FF]">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#F8F9FB] text-[#667085] border border-[#E5E7EB]">
                        {filing.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-sm text-[#252B36] group-hover:text-[#155EEF] transition-colors leading-snug">
                        {filing.title}
                      </h3>
                      <p className="text-[11px] text-[#667085] mt-0.5">
                        {filing.subtitle}
                      </p>
                    </div>

                    <p className="text-xs text-[#667085] leading-relaxed">
                      {filing.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#E5E7EB] space-y-2">
                    <div className="text-xs font-extrabold text-[#252B36]">
                      {filing.price}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSelectService({ ...filing, path: filing.applyPath }, true)}
                      className="w-full py-2 px-3 rounded-lg bg-[#155EEF] hover:bg-[#1048C6] text-white text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Apply Online</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Categories Catalog */}
        <div className="space-y-10">
          {serviceCategories.map((cat, idx) => {
            const IconComp = cat.icon;
            return (
              <div key={idx} className="space-y-4">
                <div className="flex items-center gap-2.5 border-b border-[#E5E7EB] pb-3">
                  <div className="w-7 h-7 rounded-lg bg-[#EFF8FF] text-[#155EEF] flex items-center justify-center border border-[#D1E9FF]">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-[#252B36]">
                    {cat.category}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {cat.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="p-5 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#155EEF] transition-colors flex flex-col justify-between shadow-xs"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#EFF8FF] text-[#155EEF] border border-[#D1E9FF]">
                            {item.badge}
                          </span>
                          <span className="text-xs font-bold text-[#252B36]">{item.price}</span>
                        </div>
                        <h3 className="font-bold text-sm text-[#252B36] hover:text-[#155EEF] transition-colors">{item.title}</h3>
                        <p className="text-xs text-[#667085] leading-relaxed">{item.desc}</p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-[#E5E7EB] flex items-center gap-2">
                        {item.applyPath ? (
                          <>
                            <button
                              type="button"
                              onClick={() => handleSelectService(item, true)}
                              className="flex-1 py-2 px-3 rounded-lg bg-[#155EEF] hover:bg-[#1048C6] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                            >
                              <span>Apply (3 Steps)</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleSelectService(item, false)}
                              className="px-3 py-2 rounded-lg bg-[#F8F9FB] hover:bg-white text-[#252B36] border border-[#E5E7EB] text-xs font-semibold transition-colors cursor-pointer"
                            >
                              Details
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleSelectService(item, false)}
                            className="w-full text-xs font-semibold text-[#155EEF] hover:underline flex items-center justify-between cursor-pointer py-1"
                          >
                            <span>View Details & Consult CA</span>
                            <ArrowRight className="w-3.5 h-3.5" />
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

        {/* Trust Guarantees */}
        <div className="pt-6 pb-2 flex flex-wrap items-center justify-center gap-6 text-xs text-[#667085] border-t border-[#E5E7EB] max-w-3xl mx-auto">
          <div className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-[#027A48]" /> 40+ CA & Legal Services
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-[#027A48]" /> 100% Online & Paperless
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-[#027A48]" /> Licensed CA & Advocate Review
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-[#027A48]" /> Bank-Grade 256-Bit Security
          </div>
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
