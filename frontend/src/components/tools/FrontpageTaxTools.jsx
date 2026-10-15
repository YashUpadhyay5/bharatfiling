import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

export default function FrontpageTaxTools() {
  const tools = [
    {
      id: 'gstin-checker',
      badge: 'Free Tool',
      title: 'GSTIN Checker',
      description:
        'Verify GSTIN details and check taxpayer information & filing status instantly.',
      features: [
        'GSTIN format validation',
        'Taxpayer verification',
        'Registration status & details',
      ],
      featureColor: 'blue',
      buttonStyle: 'solid-blue',
      linkTo: '/services/gst-registration',
      borderColor: 'border-blue-100/90 hover:border-blue-300',
      hoverTitleColor: 'group-hover:text-blue-600',
      illustration: (
        <svg
          viewBox="0 0 160 160"
          className="w-full h-full drop-shadow-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Circular backdrop */}
          <circle cx="80" cy="80" r="68" fill="#E0F2FE" />
          {/* Document Sheet */}
          <rect
            x="38"
            y="30"
            width="64"
            height="92"
            rx="7"
            fill="#FFFFFF"
            stroke="#93C5FD"
            strokeWidth="3"
          />
          {/* GSTIN Text */}
          <text
            x="70"
            y="52"
            textAnchor="middle"
            fill="#1D4ED8"
            fontSize="12"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="0.5"
          >
            GSTIN
          </text>
          {/* Horizontal lines */}
          <rect x="48" y="62" width="42" height="3.5" rx="1.75" fill="#DBEAFE" />
          <rect x="48" y="71" width="42" height="3.5" rx="1.75" fill="#DBEAFE" />
          <rect x="48" y="80" width="28" height="3.5" rx="1.75" fill="#DBEAFE" />
          <rect x="48" y="89" width="36" height="3.5" rx="1.75" fill="#DBEAFE" />
          {/* Magnifying Glass */}
          <circle
            cx="102"
            cy="86"
            r="24"
            fill="#EFF6FF"
            fillOpacity="0.88"
            stroke="#1D4ED8"
            strokeWidth="5.5"
          />
          <path
            d="M91 75 A 16 16 0 0 1 113 75"
            stroke="#93C5FD"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M120 104 L134 119"
            stroke="#1D4ED8"
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* Green Checkmark Badge */}
          <circle cx="50" cy="114" r="13" fill="#10B981" />
          <path
            d="M44.5 114 L48.5 118 L55.5 110"
            stroke="#FFFFFF"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: 'hra-calculator',
      badge: 'Free Tool',
      title: 'HRA Calculator',
      description:
        'Calculate your House Rent Allowance exemption under Section 10(13A) & Rule 2A.',
      features: [
        'Monthly & annual calculations',
        'Metro & non-metro cities',
        'Detailed CA breakdown',
      ],
      featureColor: 'orange',
      buttonStyle: 'outline-blue',
      linkTo: '/tools/hra-calculator',
      borderColor: 'border-amber-100/90 hover:border-amber-300',
      hoverTitleColor: 'group-hover:text-amber-600',
      illustration: (
        <svg
          viewBox="0 0 160 160"
          className="w-full h-full drop-shadow-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Circular backdrop */}
          <circle cx="80" cy="80" r="68" fill="#FFEDD5" />
          {/* Rent receipt sheet behind house */}
          <rect
            x="76"
            y="38"
            width="52"
            height="70"
            rx="6"
            fill="#FFFFFF"
            stroke="#CBD5E1"
            strokeWidth="2.5"
          />
          <rect x="86" y="50" width="28" height="3" rx="1.5" fill="#E2E8F0" />
          <rect x="86" y="58" width="28" height="3" rx="1.5" fill="#E2E8F0" />
          <rect x="86" y="66" width="20" height="3" rx="1.5" fill="#E2E8F0" />
          <rect x="86" y="74" width="24" height="3" rx="1.5" fill="#E2E8F0" />
          {/* House Roof */}
          <path
            d="M26 68 L62 38 L98 68"
            stroke="#003B73"
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Chimney */}
          <rect x="76" y="44" width="7" height="11" rx="1" fill="#003B73" />
          {/* House walls */}
          <rect
            x="36"
            y="66"
            width="50"
            height="44"
            rx="4"
            fill="#FFFFFF"
            stroke="#38BDF8"
            strokeWidth="2.8"
          />
          {/* Window */}
          <rect
            x="45"
            y="74"
            width="13"
            height="13"
            rx="2"
            fill="#E0F2FE"
            stroke="#38BDF8"
            strokeWidth="1.5"
          />
          <line x1="51.5" y1="74" x2="51.5" y2="87" stroke="#38BDF8" strokeWidth="1.5" />
          <line x1="45" y1="80.5" x2="58" y2="80.5" stroke="#38BDF8" strokeWidth="1.5" />
          {/* Front door */}
          <rect x="64" y="83" width="13" height="27" rx="2" fill="#38BDF8" />
          {/* Golden Rupee Coin */}
          <circle cx="106" cy="106" r="19" fill="#FBBF24" stroke="#F59E0B" strokeWidth="2.8" />
          <text
            x="106"
            y="113"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="17"
            fontWeight="bold"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            ₹
          </text>
        </svg>
      ),
    },
    {
      id: 'itr-slab-checker',
      badge: 'Free Tool',
      title: 'ITR Slab Checker',
      description:
        'Compare Old vs New tax regimes and estimate your net income-tax liability.',
      features: [
        'Old vs New regime comparison',
        'Deductions & exemptions',
        'Detailed tax breakdown',
      ],
      featureColor: 'green',
      buttonStyle: 'solid-green',
      linkTo: '/tools/income-tax-calculator',
      borderColor: 'border-emerald-100/90 hover:border-emerald-300',
      hoverTitleColor: 'group-hover:text-emerald-600',
      illustration: (
        <svg
          viewBox="0 0 160 160"
          className="w-full h-full drop-shadow-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Circular backdrop */}
          <circle cx="80" cy="80" r="68" fill="#D1FAE5" />
          {/* Tax Document Sheet */}
          <rect
            x="38"
            y="30"
            width="62"
            height="92"
            rx="7"
            fill="#FFFFFF"
            stroke="#86EFAC"
            strokeWidth="3"
          />
          {/* TAX title */}
          <text
            x="68"
            y="54"
            textAnchor="middle"
            fill="#065F46"
            fontSize="13"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="0.5"
          >
            TAX
          </text>
          {/* Document lines */}
          <rect x="48" y="64" width="40" height="3.5" rx="1.75" fill="#A7F3D0" />
          <rect x="48" y="73" width="40" height="3.5" rx="1.75" fill="#A7F3D0" />
          <rect x="48" y="82" width="26" height="3.5" rx="1.75" fill="#A7F3D0" />
          {/* Calculator */}
          <rect
            x="86"
            y="58"
            width="42"
            height="64"
            rx="7"
            fill="#1E293B"
            stroke="#0F172A"
            strokeWidth="2.5"
          />
          {/* Screen */}
          <rect x="92" y="65" width="30" height="11" rx="2.5" fill="#64748B" />
          {/* Buttons */}
          <rect x="93" y="82" width="7" height="6.5" rx="1.5" fill="#38BDF8" />
          <rect x="103" y="82" width="7" height="6.5" rx="1.5" fill="#38BDF8" />
          <rect x="113" y="82" width="7" height="6.5" rx="1.5" fill="#38BDF8" />
          <rect x="93" y="92" width="7" height="6.5" rx="1.5" fill="#38BDF8" />
          <rect x="103" y="92" width="7" height="6.5" rx="1.5" fill="#38BDF8" />
          <rect x="113" y="92" width="7" height="6.5" rx="1.5" fill="#38BDF8" />
          <rect x="93" y="102" width="17" height="6.5" rx="1.5" fill="#10B981" />
          <rect x="113" y="102" width="7" height="6.5" rx="1.5" fill="#F59E0B" />
          {/* Green Rupee Coin */}
          <circle cx="48" cy="116" r="15" fill="#10B981" stroke="#059669" strokeWidth="2.5" />
          <text
            x="48"
            y="122"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="14"
            fontWeight="bold"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            ₹
          </text>
        </svg>
      ),
    },
    {
      id: 'firm-name-checker',
      badge: 'Free Tool',
      title: 'Firm Name Checker',
      description:
        'Check proposed company, LLP or business name availability with MCA & trademark.',
      features: [
        'MCA name search',
        'Trademark conflict check',
        'Alternative name suggestions',
      ],
      featureColor: 'purple',
      buttonStyle: 'solid-purple',
      linkTo: '/tools/firm-name-checker',
      borderColor: 'border-purple-100/90 hover:border-purple-300',
      hoverTitleColor: 'group-hover:text-purple-600',
      illustration: (
        <svg
          viewBox="0 0 160 160"
          className="w-full h-full drop-shadow-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Circular backdrop */}
          <circle cx="80" cy="80" r="68" fill="#EDE9FE" />
          {/* Document Sheet */}
          <rect
            x="38"
            y="30"
            width="64"
            height="92"
            rx="7"
            fill="#FFFFFF"
            stroke="#C4B5FD"
            strokeWidth="3"
          />
          {/* NAME text */}
          <text
            x="70"
            y="52"
            textAnchor="middle"
            fill="#5B21B6"
            fontSize="12"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="0.5"
          >
            NAME
          </text>
          {/* Horizontal lines */}
          <rect x="48" y="62" width="42" height="3.5" rx="1.75" fill="#E9D5FF" />
          <rect x="48" y="70" width="42" height="3.5" rx="1.75" fill="#E9D5FF" />
          {/* Building Silhouettes */}
          <rect x="48" y="81" width="13" height="33" rx="2" fill="#7C3AED" />
          <rect x="65" y="87" width="11" height="27" rx="2" fill="#A78BFA" />
          <rect x="52" y="85" width="2" height="3" fill="#FFFFFF" />
          <rect x="57" y="85" width="2" height="3" fill="#FFFFFF" />
          <rect x="52" y="92" width="2" height="3" fill="#FFFFFF" />
          <rect x="57" y="92" width="2" height="3" fill="#FFFFFF" />
          <rect x="52" y="99" width="2" height="3" fill="#FFFFFF" />
          <rect x="57" y="99" width="2" height="3" fill="#FFFFFF" />
          {/* Purple Magnifying glass */}
          <circle
            cx="104"
            cy="86"
            r="24"
            fill="#FAF5FF"
            fillOpacity="0.88"
            stroke="#4C1D95"
            strokeWidth="5.5"
          />
          <path
            d="M93 75 A 16 16 0 0 1 115 75"
            stroke="#C4B5FD"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M122 104 L136 119"
            stroke="#4C1D95"
            strokeWidth="7"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ];

  const getCheckmarkColor = (color) => {
    switch (color) {
      case 'blue':
        return 'bg-[#2563EB] text-white';
      case 'orange':
        return 'bg-[#EA580C] text-white';
      case 'green':
        return 'bg-[#10B981] text-white';
      case 'purple':
        return 'bg-[#7C3AED] text-white';
      default:
        return 'bg-blue-600 text-white';
    }
  };

  const getButtonClass = (style) => {
    switch (style) {
      case 'solid-blue':
        return 'bg-[#1D4ED8] group-hover:bg-[#1E40AF] text-white';
      case 'outline-blue':
        return 'border border-[#2563EB] text-[#2563EB] group-hover:bg-blue-50 bg-white';
      case 'solid-green':
        return 'bg-[#059669] group-hover:bg-[#047857] text-white';
      case 'solid-purple':
        return 'bg-[#5B21B6] group-hover:bg-[#4C1D95] text-white';
      default:
        return 'bg-blue-600 text-white';
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-white transition-colors border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2.5">
          <div className="inline-flex items-center px-3.5 py-0.5 rounded-full bg-[#EFF6FF] text-[#2563EB] text-[11px] font-bold uppercase tracking-wider">
            FREE TOOLS
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111827] tracking-tight">
            Smart Tools for Your Tax & Business Needs
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
            Useful calculators and checkers to help you make informed decisions, save time and stay compliant.
          </p>
        </div>

        {/* ALL 4 CARDS IN A SINGLE HORIZONTAL ROW ON DESKTOP */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch">
          {tools.map((tool) => (
            <Link
              key={tool.id}
              to={tool.linkTo}
              className={`bg-white rounded-2xl border ${tool.borderColor} p-4 sm:p-5 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden h-full cursor-pointer`}
            >
              <div>
                {/* Top Centered Illustration */}
                <div className="w-20 h-20 sm:w-22 sm:h-22 mx-auto mb-3 transition-transform duration-300 group-hover:scale-108 flex items-center justify-center">
                  {tool.illustration}
                </div>

                {/* Badge */}
                <div className="mb-2">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#DCFCE7] text-[#15803D]">
                    <span className="w-3 h-3 rounded-full bg-[#15803D] text-white flex items-center justify-center text-[8px] font-bold">
                      ✓
                    </span>
                    <span>{tool.badge}</span>
                  </span>
                </div>

                {/* Title */}
                <h3
                  className={`text-base font-bold text-slate-900 tracking-tight mb-1 transition-colors ${tool.hoverTitleColor}`}
                >
                  {tool.title}
                </h3>

                {/* Description */}
                <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed min-h-[34px] line-clamp-2">
                  {tool.description}
                </p>

                {/* 3 Checkmark Bullet Points */}
                <ul className="space-y-1.5 py-3 border-t border-slate-100 my-2.5">
                  {tool.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-1.5 text-[11px] text-slate-600 font-medium"
                    >
                      <span
                        className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${getCheckmarkColor(
                          tool.featureColor
                        )}`}
                      >
                        <Check className="w-2 h-2 stroke-[3]" />
                      </span>
                      <span className="truncate">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Use Tool Button */}
              <div className="pt-2">
                <div
                  className={`w-full py-2 px-3 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 shadow-xs group-hover:shadow-md ${getButtonClass(
                    tool.buttonStyle
                  )}`}
                >
                  <span>Use Tool</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
