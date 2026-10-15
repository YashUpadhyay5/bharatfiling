import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

export default function FrontpageTaxTools() {
  const tools = [
    {
      id: 'gstin-checker',
      badge: 'Free Tool',
      badgeType: 'green',
      title: 'GSTIN Checker',
      description:
        'Verify GSTIN details and check taxpayer information instantly. Get accurate and up-to-date GST registration status.',
      features: [
        'GSTIN format validation',
        'Taxpayer verification',
        'Registration status & details',
      ],
      featureColor: 'blue',
      buttonStyle: 'solid-blue',
      linkTo: '/services/gst-registration',
      borderColor: 'border-blue-100 hover:border-blue-300',
      glowColor: 'bg-blue-50/30',
      illustration: (
        <svg
          viewBox="0 0 160 160"
          className="w-full h-full drop-shadow-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Circular backdrop */}
          <circle cx="80" cy="80" r="70" fill="#E0F2FE" />
          {/* Document Sheet */}
          <rect
            x="36"
            y="28"
            width="68"
            height="96"
            rx="8"
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
            fontSize="13"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="0.5"
          >
            GSTIN
          </text>
          {/* Horizontal lines */}
          <rect x="48" y="62" width="44" height="4" rx="2" fill="#DBEAFE" />
          <rect x="48" y="72" width="44" height="4" rx="2" fill="#DBEAFE" />
          <rect x="48" y="82" width="30" height="4" rx="2" fill="#DBEAFE" />
          <rect x="48" y="92" width="38" height="4" rx="2" fill="#DBEAFE" />
          {/* Magnifying Glass */}
          <circle
            cx="104"
            cy="86"
            r="26"
            fill="#EFF6FF"
            fillOpacity="0.85"
            stroke="#1D4ED8"
            strokeWidth="6"
          />
          <path
            d="M92 74 A 18 18 0 0 1 116 74"
            stroke="#93C5FD"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M123 105 L138 122"
            stroke="#1D4ED8"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Green Checkmark Badge on document */}
          <circle cx="50" cy="116" r="14" fill="#10B981" />
          <path
            d="M44 116 L48 120 L56 112"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: 'hra-calculator',
      badge: 'Free Tool',
      badgeType: 'green',
      title: 'HRA Calculator',
      description:
        'Calculate your House Rent Allowance exemption under the old tax regime. Get a detailed breakdown of your eligible HRA and taxable amount.',
      features: [
        'Monthly & annual calculations',
        'Metro & non-metro cities',
        'Detailed breakdown',
      ],
      featureColor: 'orange',
      buttonStyle: 'outline-blue',
      linkTo: '/tools/hra-calculator',
      borderColor: 'border-amber-100 hover:border-amber-300',
      glowColor: 'bg-amber-50/30',
      illustration: (
        <svg
          viewBox="0 0 160 160"
          className="w-full h-full drop-shadow-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Circular backdrop */}
          <circle cx="80" cy="80" r="70" fill="#FFEDD5" />
          {/* Rent receipt sheet behind house */}
          <rect
            x="76"
            y="38"
            width="54"
            height="74"
            rx="6"
            fill="#FFFFFF"
            stroke="#CBD5E1"
            strokeWidth="2.5"
          />
          <rect x="88" y="52" width="30" height="3" rx="1.5" fill="#E2E8F0" />
          <rect x="88" y="60" width="30" height="3" rx="1.5" fill="#E2E8F0" />
          <rect x="88" y="68" width="22" height="3" rx="1.5" fill="#E2E8F0" />
          <rect x="88" y="76" width="26" height="3" rx="1.5" fill="#E2E8F0" />
          {/* House Roof */}
          <path
            d="M26 68 L62 38 L98 68"
            stroke="#003B73"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Chimney */}
          <rect x="76" y="44" width="8" height="12" rx="1" fill="#003B73" />
          {/* House walls */}
          <rect
            x="36"
            y="66"
            width="52"
            height="46"
            rx="4"
            fill="#FFFFFF"
            stroke="#38BDF8"
            strokeWidth="3"
          />
          {/* 4-pane window */}
          <rect
            x="46"
            y="74"
            width="14"
            height="14"
            rx="2"
            fill="#E0F2FE"
            stroke="#38BDF8"
            strokeWidth="1.5"
          />
          <line x1="53" y1="74" x2="53" y2="88" stroke="#38BDF8" strokeWidth="1.5" />
          <line x1="46" y1="81" x2="60" y2="81" stroke="#38BDF8" strokeWidth="1.5" />
          {/* Front door */}
          <rect x="66" y="84" width="14" height="28" rx="2" fill="#38BDF8" />
          {/* Golden Rupee Coin */}
          <circle cx="106" cy="108" r="20" fill="#FBBF24" stroke="#F59E0B" strokeWidth="3" />
          <text
            x="106"
            y="115"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="18"
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
      badgeType: 'green',
      title: 'ITR Slab Checker',
      description:
        'Compare old and new tax regimes and calculate your estimated income tax liability. Get a complete breakdown with deductions, rebates and cess.',
      features: [
        'Old vs New regime comparison',
        'Deductions & exemptions',
        'Detailed tax breakdown',
      ],
      featureColor: 'green',
      buttonStyle: 'solid-green',
      linkTo: '/tools/income-tax-calculator',
      borderColor: 'border-emerald-100 hover:border-emerald-300',
      glowColor: 'bg-emerald-50/30',
      illustration: (
        <svg
          viewBox="0 0 160 160"
          className="w-full h-full drop-shadow-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Circular backdrop */}
          <circle cx="80" cy="80" r="70" fill="#D1FAE5" />
          {/* Tax Document Sheet */}
          <rect
            x="36"
            y="28"
            width="66"
            height="96"
            rx="8"
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
            fontSize="14"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="0.5"
          >
            TAX
          </text>
          {/* Document lines */}
          <rect x="48" y="64" width="42" height="4" rx="2" fill="#A7F3D0" />
          <rect x="48" y="74" width="42" height="4" rx="2" fill="#A7F3D0" />
          <rect x="48" y="84" width="28" height="4" rx="2" fill="#A7F3D0" />
          {/* Calculator */}
          <rect
            x="88"
            y="58"
            width="44"
            height="66"
            rx="8"
            fill="#1E293B"
            stroke="#0F172A"
            strokeWidth="2.5"
          />
          {/* Screen */}
          <rect x="94" y="66" width="32" height="12" rx="3" fill="#64748B" />
          {/* Buttons */}
          <rect x="95" y="84" width="8" height="7" rx="2" fill="#38BDF8" />
          <rect x="106" y="84" width="8" height="7" rx="2" fill="#38BDF8" />
          <rect x="117" y="84" width="8" height="7" rx="2" fill="#38BDF8" />
          <rect x="95" y="95" width="8" height="7" rx="2" fill="#38BDF8" />
          <rect x="106" y="95" width="8" height="7" rx="2" fill="#38BDF8" />
          <rect x="117" y="95" width="8" height="7" rx="2" fill="#38BDF8" />
          <rect x="95" y="106" width="19" height="7" rx="2" fill="#10B981" />
          <rect x="117" y="106" width="8" height="7" rx="2" fill="#F59E0B" />
          {/* Green Rupee Coin */}
          <circle cx="48" cy="118" r="16" fill="#10B981" stroke="#059669" strokeWidth="2.5" />
          <text
            x="48"
            y="124"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="15"
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
      badgeType: 'green',
      title: 'Firm Name Availability Checker',
      description:
        'Check if your proposed company, LLP or business name is available. Search MCA records, trademark databases and get suggestions for alternative names.',
      features: [
        'MCA name search',
        'Trademark conflict check',
        'Alternative name suggestions',
      ],
      featureColor: 'purple',
      buttonStyle: 'solid-purple',
      linkTo: '/services/company-registration',
      borderColor: 'border-purple-100 hover:border-purple-300',
      glowColor: 'bg-purple-50/30',
      illustration: (
        <svg
          viewBox="0 0 160 160"
          className="w-full h-full drop-shadow-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Circular backdrop */}
          <circle cx="80" cy="80" r="70" fill="#EDE9FE" />
          {/* Document Sheet */}
          <rect
            x="36"
            y="28"
            width="68"
            height="96"
            rx="8"
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
          <rect x="48" y="62" width="44" height="4" rx="2" fill="#E9D5FF" />
          <rect x="48" y="70" width="44" height="4" rx="2" fill="#E9D5FF" />
          {/* Building Silhouettes */}
          <rect x="48" y="82" width="14" height="34" rx="2" fill="#7C3AED" />
          <rect x="66" y="88" width="12" height="28" rx="2" fill="#A78BFA" />
          <rect x="52" y="86" width="2" height="3" fill="#FFFFFF" />
          <rect x="58" y="86" width="2" height="3" fill="#FFFFFF" />
          <rect x="52" y="93" width="2" height="3" fill="#FFFFFF" />
          <rect x="58" y="93" width="2" height="3" fill="#FFFFFF" />
          <rect x="52" y="100" width="2" height="3" fill="#FFFFFF" />
          <rect x="58" y="100" width="2" height="3" fill="#FFFFFF" />
          {/* Purple Magnifying glass */}
          <circle
            cx="106"
            cy="86"
            r="26"
            fill="#FAF5FF"
            fillOpacity="0.85"
            stroke="#4C1D95"
            strokeWidth="6"
          />
          <path
            d="M94 74 A 18 18 0 0 1 118 74"
            stroke="#C4B5FD"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M125 105 L140 122"
            stroke="#4C1D95"
            strokeWidth="8"
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
        return 'bg-[#1D4ED8] hover:bg-[#1E40AF] text-white';
      case 'outline-blue':
        return 'border border-[#2563EB] text-[#2563EB] hover:bg-blue-50';
      case 'solid-green':
        return 'bg-[#059669] hover:bg-[#047857] text-white';
      case 'solid-purple':
        return 'bg-[#5B21B6] hover:bg-[#4C1D95] text-white';
      default:
        return 'bg-blue-600 text-white';
    }
  };

  return (
    <section className="py-14 sm:py-20 bg-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Matching Screenshot Exactly */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center px-4 py-1 rounded-full bg-[#EFF6FF] text-[#2563EB] text-xs font-bold uppercase tracking-wider">
            FREE TOOLS
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111827] tracking-tight">
            Smart Tools for Your Tax & Business Needs
          </h2>
          <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Useful calculators and checkers to help you make informed decisions, save time and stay compliant.
          </p>
        </div>

        {/* 4 Cards in 2x2 Grid Matching Screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className={`bg-white rounded-2xl border ${tool.borderColor} p-6 sm:p-7 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group relative overflow-hidden`}
            >
              {/* Card Inner Grid: Illustration Left | Content Right */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {/* Left Illustration */}
                <div className="shrink-0 w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  {tool.illustration}
                </div>

                {/* Right Content */}
                <div className="flex-1 text-left space-y-3">
                  {/* Top Badge */}
                  <div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#DCFCE7] text-[#15803D]">
                      <span className="w-3.5 h-3.5 rounded-full bg-[#15803D] text-white flex items-center justify-center text-[9px] font-bold">
                        ✓
                      </span>
                      <span>{tool.badge}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                    {tool.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {tool.description}
                  </p>

                  {/* 3 Checkmark Bullet Points */}
                  <ul className="space-y-1.5 pt-1">
                    {tool.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 font-medium"
                      >
                        <span
                          className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${getCheckmarkColor(
                            tool.featureColor
                          )}`}
                        >
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Use Tool Button */}
                  <div className="pt-3">
                    <Link
                      to={tool.linkTo}
                      className={`inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-95 shadow-xs cursor-pointer ${getButtonClass(
                        tool.buttonStyle
                      )}`}
                    >
                      <span>Use Tool</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
