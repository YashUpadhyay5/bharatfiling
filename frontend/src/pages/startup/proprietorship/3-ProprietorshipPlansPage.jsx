import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Check,
  CreditCard,
  Star,
  ArrowLeft,
  ShieldCheck,
  Lock,
  Loader2,
  CheckCircle2,
  X,
  Sparkles,
  Printer,
  Calendar,
  Building2,
  Users,
} from 'lucide-react';
import { BUNDLED_PLANS } from './constants.js';

export default function ProprietorshipPlansPage({
  formData = {},
  onBack,
  onProceedToPayment,
  onPaymentSuccess,
}) {
  const [selectedPlan, setSelectedPlan] = useState(
    BUNDLED_PLANS.find((p) => p.recommended) || BUNDLED_PLANS[1]
  );
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [orderReceipt, setOrderReceipt] = useState(null);

  const handleSelectPlanAndProceed = (plan) => {
    setSelectedPlan(plan);
    if (onProceedToPayment) {
      onProceedToPayment(plan);
    } else {
      setIsPaymentModalOpen(true);
    }
  };

  // Pricing math
  const baseFee = selectedPlan.price;
  const gstAmount = Math.round(baseFee * 0.18);
  const totalPayable = baseFee + gstAmount;

  const handlePayNow = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });

      const receiptData = {
        orderId:
          formData.orderNumber ||
          `#PROP-${Math.floor(100000 + Math.random() * 900000)}`,
        planName: selectedPlan.name,
        tradeName:
          formData.tradeName || formData.firmName || 'My Sole Proprietorship',
        industry: formData.industryType || 'Retail & E-commerce',
        state: formData.stateName || 'Maharashtra',
        baseFee,
        gstAmount,
        totalPayable,
        date: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
      };
      setOrderReceipt(receiptData);

      if (onPaymentSuccess) {
        onPaymentSuccess(receiptData);
      }
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto">
        {/* Top Header */}
        <div className="mb-8">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition mb-4 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Details</span>
          </button>

          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full mb-2">
              Select Your Plan
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0B1528] tracking-tight">
              Transparent Sole Proprietorship Plans
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              No hidden costs. Choose the legal and tax tier that best fits your
              business stage.
            </p>
          </div>
        </div>

        {/* 3-Card Grid Matching Zolvit / Vakilsearch Partnership Design */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4">
          {BUNDLED_PLANS.map((plan) => {
            const isDark = plan.theme === 'dark';

            return (
              <div
                key={plan.id}
                className={`rounded-2xl transition-all duration-200 relative flex flex-col justify-between ${
                  isDark
                    ? 'bg-[#002244] text-white shadow-2xl scale-102 border-2 border-amber-400/80 md:-translate-y-2'
                    : 'bg-white text-slate-800 shadow-lg border border-slate-200/90 hover:shadow-xl'
                }`}
              >
                {/* Recommended Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-[#002244] text-xs font-black uppercase tracking-wider px-4 py-1 rounded-full shadow-md">
                    {plan.badge}
                  </div>
                )}

                <div className="p-7 sm:p-8">
                  {/* Plan Title & Subtitle */}
                  <div className="mb-6">
                    <h3
                      className={`text-2xl font-black tracking-tight ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {plan.name}
                    </h3>
                    <p
                      className={`text-xs mt-1 leading-relaxed ${
                        isDark ? 'text-slate-300' : 'text-slate-500'
                      }`}
                    >
                      {plan.subtitle}
                    </p>
                  </div>

                  {/* Pricing Box */}
                  <div className="mb-6 pb-6 border-b border-slate-200/20">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-xs line-through ${
                          isDark ? 'text-slate-400' : 'text-slate-400'
                        }`}
                      >
                        ₹{plan.originalPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                        {plan.discount}
                      </span>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span
                        className={`text-4xl font-extrabold ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        ₹{plan.price.toLocaleString('en-IN')}
                      </span>
                      <span
                        className={`text-xs ${
                          isDark ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        + Govt. Fee
                      </span>
                    </div>

                    <span
                      className={`text-[11px] block mt-1 ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      {plan.emiText}
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider block mb-2 ${
                        isDark ? 'text-slate-400' : 'text-slate-400'
                      }`}
                    >
                      What's Included:
                    </span>
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                        <Check
                          className={`w-4 h-4 flex-shrink-0 mt-0.5 stroke-[2.5] ${
                            isDark ? 'text-amber-400' : 'text-blue-600'
                          }`}
                        />
                        <span
                          className={`leading-snug ${
                            isDark ? 'text-slate-200' : 'text-slate-700'
                          }`}
                        >
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Select / Proceed Button */}
                <div className="p-7 sm:p-8 pt-0">
                  <button
                    type="button"
                    onClick={() => handleSelectPlanAndProceed(plan)}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer ${
                      isDark
                        ? 'bg-amber-400 hover:bg-amber-300 text-[#002244]'
                        : 'bg-[#002244] hover:bg-[#00172e] text-white'
                    }`}
                  >
                    <span>Get Started</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security / Trust Assurance Footer */}
        <div className="mt-12 bg-white rounded-2xl border border-slate-200/90 p-6 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600 shadow-2xs">
          <div className="flex items-center gap-2 font-semibold text-slate-800">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>100% Money-Back Guarantee if rejected on technical grounds</span>
          </div>
          <div className="flex items-center gap-2 font-semibold text-slate-800">
            <Lock className="w-4 h-4 text-blue-600" />
            <span>Secure 256-bit Encrypted Checkout</span>
          </div>
          <div className="flex items-center gap-2 font-semibold text-slate-800">
            <CreditCard className="w-4 h-4 text-indigo-600" />
            <span>UPI, Debit/Credit Cards & Net Banking Accepted</span>
          </div>
        </div>
      </div>
    </div>
  );
}
