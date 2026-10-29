import React, { useState } from 'react';
import { ArrowLeft, Check, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { OBJECTION_PACKAGES } from './constants.js';

export default function TrademarkObjectionPlansPage({
  formData = {},
  onBack,
  onSelectPlanAndProceed,
}) {
  const [selectedPlanId, setSelectedPlanId] = useState(
    formData.packageId || 'premium'
  );

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      subtitle: 'Ideal for objection examination + one-time response filing',
      originalPrice: 3999,
      discountPercent: '25% off',
      price: 3499,
      isRecommended: false,
      isDark: false,
      features: [
        '30 minute consultation with an IP lawyer',
        'Thorough case study on your brand objection',
        'Reply draft for TM Objection (Only Once)',
        'TM reply filing on IP portal(Only Once)',
        'Regular updates on deadlines',
        'TM Certificate*',
      ],
    },
    {
      id: 'standard',
      name: 'Standard',
      subtitle: 'Ideal for objection examination & response filing',
      originalPrice: 9999,
      discountPercent: '20% off',
      price: 7999,
      isRecommended: false,
      isDark: false,
      features: [
        '30 minute consultation with an IP lawyer',
        'Thorough case study on your brand objection',
        'Reply draft for TM Objection(As many times)',
        'TM reply filing on IP portal(As many times)',
        'Regular updates on deadlines',
        'TM Certificate*',
      ],
    },
    {
      id: 'premium',
      name: 'Premium',
      subtitle:
        'Complete solution for handling the trademark objection & hearings',
      originalPrice: 27999,
      discountPercent: '50% off only for online payment',
      price: 13999,
      isRecommended: true,
      isDark: true,
      features: [
        '30-minute expert consultation with a Senior IP lawyer',
        'Dedicated account manager',
        'Thorough case study on your brand objection',
        'Reply draft for TM Objection(As many times)',
        'TM reply filing on IP portal(As many times)',
        'Regular updates on deadlines',
        'Appointed with a senior IP lawyer to handle the hearing (Upto 6 hearings)',
      ],
    },
  ];

  const handleProceed = (plan) => {
    const professionalFee = plan.price;
    const onlineDiscount = 500;
    const discountedFee = Math.max(0, professionalFee - onlineDiscount);
    const gstOnFee = Math.round(discountedFee * 0.18);
    const totalAmount = discountedFee + gstOnFee;

    if (onSelectPlanAndProceed) {
      onSelectPlanAndProceed({
        ...formData,
        packageId: plan.id,
        packageName: plan.name,
        professionalFee,
        onlineDiscount,
        discountedFee,
        gstOnFee,
        totalAmount,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-[#002B49] selection:text-white">
      {/* Top Header Bar */}
      <header className="bg-white border-b border-slate-200/80 px-4 sm:px-8 py-3.5 sticky top-0 z-30 flex items-center justify-between">
        {/* Brand Logo matching Vakilsearch placement */}
        <div className="flex items-center gap-1.5">
          <span className="bg-[#FDB813] text-black font-black text-xs sm:text-sm px-2.5 py-1 rounded-xs tracking-wider uppercase">
            BHARAT
          </span>
          <span className="text-[#002B49] font-black text-sm sm:text-base tracking-tight uppercase">
            FILING
          </span>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#002B49] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Questions</span>
        </button>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
        {/* Page Title (Exact match of screenshot: "Right plan for for Brand Protection") */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-[#002B49] tracking-tight">
            Right plan for for Brand Protection
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-xl mx-auto">
            Choose the defense tier suited to your registry notice. All plans include direct drafting by Senior High Court IP Advocates.
          </p>
        </div>

        {/* 3-Card Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch pt-2">
          {plans.map((plan) => {
            const isDark = plan.isDark;

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl flex flex-col justify-between transition-all duration-200 ${
                  isDark
                    ? 'bg-[#00223A] text-white shadow-xl border-2 border-[#002B49]'
                    : 'bg-white text-slate-800 shadow-sm border border-slate-200/90 hover:shadow-md'
                }`}
              >
                {/* Recommended Badge on Top of Card 3 */}
                {plan.isRecommended && (
                  <div className="absolute -top-3.5 left-6 z-20">
                    <span className="bg-[#FDB813] text-black font-extrabold text-[11px] px-3 py-1 rounded-md shadow-xs inline-flex items-center gap-1 uppercase tracking-wider">
                      ★ Recommended
                    </span>
                  </div>
                )}

                {/* Card Top Section: Plan Name, Tagline, Price & CTA */}
                <div className="p-6 sm:p-7 space-y-4">
                  {/* Title & Tagline */}
                  <div>
                    <h2
                      className={`text-xl sm:text-2xl font-black ${
                        isDark ? 'text-white' : 'text-[#002B49]'
                      }`}
                    >
                      {plan.name}
                    </h2>
                    <p
                      className={`text-xs mt-1 leading-relaxed min-h-[34px] ${
                        isDark ? 'text-slate-300' : 'text-slate-500'
                      }`}
                    >
                      {plan.subtitle}
                    </p>
                  </div>

                  {/* Pricing Box */}
                  <div className="pt-1">
                    {/* Strikethrough Old Price + Discount Pill */}
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-semibold line-through ${
                          isDark ? 'text-red-300' : 'text-red-500/80'
                        }`}
                      >
                        ₹{plan.originalPrice.toLocaleString('en-IN')}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isDark
                            ? 'bg-emerald-100 text-emerald-900 font-extrabold'
                            : 'bg-emerald-50 text-emerald-700'
                        }`}
                      >
                        {plan.discountPercent}
                      </span>
                    </div>

                    {/* Big Price */}
                    <div
                      className={`text-3xl sm:text-4xl font-black tracking-tight mt-1 ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      ₹{plan.price.toLocaleString('en-IN')}
                    </div>

                    {/* EMI Notice */}
                    <div
                      className={`flex items-center gap-1.5 text-[11px] font-medium mt-1.5 ${
                        isDark ? 'text-slate-300' : 'text-slate-500'
                      }`}
                    >
                      <span
                        className={`px-1.5 py-0.5 rounded-xs text-[10px] font-bold ${
                          isDark
                            ? 'bg-white/10 text-white'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        EMI
                      </span>
                      <span>EMI option available.</span>
                    </div>
                  </div>

                  {/* Proceed to Pay Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => handleProceed(plan)}
                      className={`w-full py-3 px-4 font-bold text-sm rounded-md transition-all cursor-pointer shadow-xs ${
                        isDark
                          ? 'bg-[#FDB813] hover:bg-[#e6a50e] text-slate-950 font-black'
                          : 'bg-[#002B49] hover:bg-[#001f35] text-white'
                      }`}
                    >
                      Proceed to Pay
                    </button>
                  </div>
                </div>

                {/* Card Bottom Section: What You'll Get Features */}
                <div
                  className={`px-6 sm:px-7 pb-6 sm:pb-7 pt-4 border-t ${
                    isDark
                      ? 'border-white/10 bg-[#001a2e]/40 rounded-b-2xl'
                      : 'border-slate-100 bg-slate-50/50 rounded-b-2xl'
                  }`}
                >
                  <h3
                    className={`text-xs font-bold uppercase tracking-wider mb-3.5 ${
                      isDark ? 'text-slate-200' : 'text-slate-700'
                    }`}
                  >
                    What You&apos;ll Get
                  </h3>

                  <ul className="space-y-2.5">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs">
                        <span className="text-[#22c55e] font-black shrink-0 text-sm leading-tight">
                          ✓
                        </span>
                        <span
                          className={`leading-relaxed ${
                            isDark ? 'text-slate-200' : 'text-slate-600'
                          }`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
