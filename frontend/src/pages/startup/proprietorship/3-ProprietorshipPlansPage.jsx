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

  const handleQuickBuyModal = (plan) => {
    setSelectedPlan(plan);
    setIsPaymentModalOpen(true);
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
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition mb-4 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Details</span>
            </button>
          )}

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

                {/* Direct Buy Option Button */}
                <div className="p-7 sm:p-8 pt-0 space-y-2.5">
                  <button
                    type="button"
                    onClick={() => handleSelectPlanAndProceed(plan)}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer transform active:scale-[0.99] ${
                      isDark
                        ? 'bg-amber-400 hover:bg-amber-300 text-[#002244] focus:ring-2 focus:ring-amber-300'
                        : 'bg-[#002244] hover:bg-[#00172e] text-white focus:ring-2 focus:ring-[#002244]'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Buy Now • ₹{plan.price.toLocaleString('en-IN')}</span>
                    <Sparkles className="w-4 h-4 ml-0.5" />
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] font-medium">
                    <Lock className="w-3 h-3 text-emerald-500" />
                    <span className={isDark ? 'text-slate-300' : 'text-slate-500'}>
                      Direct Checkout • Instant UPI &amp; Cards
                    </span>
                  </div>
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
            <span>UPI, Debit/Credit Cards &amp; Net Banking Accepted</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          IN-PAGE QUICK CHECKOUT & PAYMENT MODAL
      ========================================================================= */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-7 shadow-2xl relative border border-slate-200 max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => {
                setIsPaymentModalOpen(false);
                setIsPaid(false);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!isPaid ? (
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#002244]">
                      Checkout: {selectedPlan.name} Plan
                    </h3>
                    <p className="text-xs text-slate-500">
                      Official Sole Proprietorship Registration Application
                    </p>
                  </div>
                </div>

                {/* Order Summary Breakdown */}
                <div className="bg-slate-50 rounded-xl p-4 space-y-2.5 text-xs text-slate-600 border border-slate-200/80">
                  <div className="flex justify-between">
                    <span>Business / Trade Name:</span>
                    <strong className="text-slate-900 font-semibold">
                      {formData.tradeName || formData.firmName || 'My Sole Proprietorship'}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Industry Classification:</span>
                    <strong className="text-slate-900 font-semibold">
                      {formData.industryType || 'Retail & E-commerce'}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Professional Service Fee:</span>
                    <span className="font-semibold text-slate-900">
                      ₹{baseFee.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18% Statutory):</span>
                    <span className="font-semibold text-slate-900">
                      ₹{gstAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold text-slate-900">
                    <span>Total Amount Payable:</span>
                    <span className="text-base font-extrabold text-[#002244]">
                      ₹{totalPayable.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Select Payment Method
                  </span>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { id: 'upi', label: 'UPI / QR', icon: '⚡' },
                      { id: 'card', label: 'Debit / Card', icon: '💳' },
                      { id: 'netbanking', label: 'Net Banking', icon: '🏦' },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id)}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1 ${
                          paymentMethod === m.id
                            ? 'border-[#002244] bg-blue-50/50 text-[#002244] ring-1 ring-[#002244]'
                            : 'border-slate-200 hover:border-slate-300 bg-white text-slate-600'
                        }`}
                      >
                        <span className="text-base">{m.icon}</span>
                        <span>{m.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Simulated UPI / Instant Pay Screen */}
                {paymentMethod === 'upi' && (
                  <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200 text-center space-y-2">
                    <p className="text-xs font-bold text-emerald-900">
                      Instant UPI Payment via Google Pay, PhonePe, Paytm or BHIM
                    </p>
                    <p className="text-[11px] text-emerald-700">
                      UPI ID: <code className="font-bold">bharatfiling@icici</code>
                    </p>
                  </div>
                )}

                {/* Pay Action Button */}
                <div className="pt-2 space-y-2">
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={handlePayNow}
                    className="w-full py-3.5 rounded-xl bg-[#002244] hover:bg-[#00172e] text-white font-bold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Verifying &amp; Initializing Certificate Filing...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>
                          Pay ₹{totalPayable.toLocaleString('en-IN')} &amp; Complete Registration
                        </span>
                      </>
                    )}
                  </button>

                  <div className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>256-Bit Bank-Grade Encryption • Instant Order Slip</span>
                  </div>
                </div>
              </div>
            ) : (
              /* Success & Receipt Screen */
              <div className="space-y-6 text-center py-2 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-extrabold text-slate-900">
                    Payment Successful!
                  </h3>
                  <p className="text-xs text-slate-500">
                    Your Sole Proprietorship registration file has been opened with our CA workbench.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-left space-y-3 text-xs">
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500">Order Reference:</span>
                    <strong className="font-mono text-slate-900 font-bold">
                      {orderReceipt?.orderId}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Trade Name:</span>
                    <span className="font-semibold text-slate-900">
                      {orderReceipt?.tradeName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Selected Plan:</span>
                    <span className="font-semibold text-emerald-700">
                      {orderReceipt?.planName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total Paid (incl. GST):</span>
                    <span className="font-bold text-slate-900">
                      ₹{orderReceipt?.totalPayable?.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Receipt</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsPaymentModalOpen(false);
                      if (onPaymentSuccess) {
                        onPaymentSuccess(orderReceipt);
                      }
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-[#002244] text-white text-xs font-bold hover:bg-[#00172e] transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Go to Dashboard</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
