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

export default function PartnershipPlansPage({
  formData = {},
  onBack,
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
        orderId: formData.orderNumber || `#PTR-${Math.floor(100000 + Math.random() * 900000)}`,
        planName: selectedPlan.name,
        firmName: formData.firmName || 'Preferred Partnership Firm',
        partnersCount: formData.numberOfPartners || '3-5',
        industry: formData.industryType || 'Technology / General Trading',
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
    }, 1400);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-4 sm:px-6 lg:px-8 font-sans antialiased text-slate-800">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Header matching VAKIL SEARCH style */}
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
          <div className="flex items-center gap-4">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Questionnaire</span>
              </button>
            )}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#FFD200] text-slate-950 font-black text-xs tracking-wider uppercase shadow-2xs">
              <span>BHARAT</span>
              <span className="font-semibold text-slate-900">FILING</span>
            </div>
          </div>

          <div className="text-xs text-slate-400 font-medium hidden sm:block">
            Step 3 of 3 • Plan Selection &amp; Checkout
          </div>
        </div>

        {/* Heading matching screenshot media_1793442667305_e946b79c.png */}
        <div className="text-center space-y-2 pt-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
            Right plan for your business
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            {formData.firmName ? (
              <span>
                Recommended plans for{' '}
                <strong className="text-slate-800 font-semibold">
                  &ldquo;{formData.firmName}&rdquo;
                </strong>{' '}
                ({formData.numberOfPartners || '3-5'} Partners)
              </span>
            ) : (
              'All-inclusive legal packages tailored to your partnership registration requirements.'
            )}
          </p>
        </div>

        {/* 3 Pricing Cards Grid (1:1 with media_1793442667305_e946b79c.png) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 items-stretch pt-4">
          {BUNDLED_PLANS.map((plan) => {
            const isDark = plan.theme === 'dark';

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl flex flex-col justify-between transition-all duration-200 ${
                  isDark
                    ? 'bg-[#0B2545] text-white border-2 border-[#0B2545] shadow-xl md:-translate-y-2'
                    : 'bg-white text-slate-800 border border-slate-200/90 shadow-xs hover:border-slate-300'
                }`}
              >
                {/* Recommended Badge on Top of Standard Plan */}
                {plan.recommended && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                    <div className="inline-flex items-center gap-1 px-3.5 py-0.5 rounded-full bg-[#FFD200] text-slate-950 font-black text-[11px] tracking-wide uppercase shadow-sm">
                      <Star className="w-3 h-3 fill-slate-950" />
                      <span>{plan.badge || 'Recommended'}</span>
                    </div>
                  </div>
                )}

                <div className="p-6 sm:p-7 space-y-5">
                  {/* Header: Name and Subtitle */}
                  <div>
                    <h3
                      className={`text-xl font-bold tracking-tight ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {plan.name}
                    </h3>
                    <p
                      className={`text-xs mt-1 min-h-[32px] leading-relaxed ${
                        isDark ? 'text-slate-300' : 'text-slate-500'
                      }`}
                    >
                      {plan.subtitle}
                    </p>
                  </div>

                  {/* Pricing Row */}
                  <div className="pt-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs line-through ${
                          isDark ? 'text-slate-400' : 'text-rose-400'
                        }`}
                      >
                        ₹{plan.originalPrice.toLocaleString('en-IN')}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isDark
                            ? 'bg-emerald-500 text-white'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {plan.discount}
                      </span>
                    </div>

                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span
                        className={`text-3xl font-black tracking-tight ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        ₹{plan.price.toLocaleString('en-IN')}
                      </span>
                      <span
                        className={`text-[10px] font-medium ${
                          isDark ? 'text-blue-200' : 'text-slate-400'
                        }`}
                      >
                        + Govt Fee
                      </span>
                    </div>

                    {/* EMI Badge matching screenshot */}
                    <div className="flex items-center gap-1.5 mt-2">
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                          isDark
                            ? 'bg-white/10 text-blue-200 border border-white/20'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        EMI
                      </span>
                      <span
                        className={`text-[11px] font-medium ${
                          isDark ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        {plan.emiText}
                      </span>
                    </div>
                  </div>

                  {/* Proceed to Pay Button (Gold on dark card, Navy on light cards) */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => handleSelectPlanAndProceed(plan)}
                      className={`w-full py-3 px-4 rounded-lg font-bold text-sm shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        isDark
                          ? 'bg-[#FFD200] hover:bg-[#FACC15] text-slate-950 hover:shadow-md'
                          : 'bg-[#002B49] hover:bg-[#001D32] text-white hover:shadow-md'
                      }`}
                    >
                      <span>Proceed to Pay</span>
                    </button>
                  </div>

                  {/* Feature Checklist matching screenshot */}
                  <div
                    className={`pt-5 border-t ${
                      isDark ? 'border-white/10' : 'border-slate-100'
                    }`}
                  >
                    <h4
                      className={`text-xs font-bold uppercase tracking-wider mb-3.5 ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      What You&apos;ll Get
                    </h4>
                    <ul className="space-y-3">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Check
                            className={`w-4 h-4 shrink-0 mt-0.5 stroke-[2.2] ${
                              isDark ? 'text-emerald-400' : 'text-emerald-600'
                            }`}
                          />
                          <span
                            className={`text-xs leading-relaxed ${
                              isDark ? 'text-slate-200' : 'text-slate-700'
                            }`}
                          >
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Notes (1:1 with media_1793442667305_e946b79c.png) */}
        <div className="text-center pt-6 space-y-1 text-slate-400 text-xs">
          <p>Please note: GST will be added during checkout</p>
          <p>
            Government and Affiliate charges are additional to the above fee.{' '}
            <span className="text-blue-900 hover:underline cursor-pointer font-medium">
              Refer T&amp;C
            </span>
          </p>
        </div>
      </div>

      {/* =========================================================================
          CHECKOUT & PAYMENT DESK MODAL
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
                    <h3 className="text-base font-bold text-[#002B49]">
                      Checkout: {selectedPlan.name} Plan
                    </h3>
                    <p className="text-xs text-slate-500">
                      Official Partnership Registration Application
                    </p>
                  </div>
                </div>

                {/* Order Summary Breakdown */}
                <div className="bg-slate-50 rounded-xl p-4 space-y-2.5 text-xs text-slate-600 border border-slate-200/80">
                  <div className="flex justify-between">
                    <span>Proposed Firm Name:</span>
                    <strong className="text-slate-900 font-semibold">
                      {formData.firmName || 'Preferred Firm'}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Number of Partners:</span>
                    <strong className="text-slate-900 font-semibold">
                      {formData.numberOfPartners || '3-5'} Partners
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Industry Classification:</span>
                    <strong className="text-slate-900 font-semibold">
                      {formData.industryType || 'Technology / General Trading'}
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
                    <span className="text-base font-extrabold text-[#002B49]">
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
                            ? 'border-[#002B49] bg-blue-50/50 text-[#002B49] ring-1 ring-[#002B49]'
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
                    className="w-full py-3.5 rounded-xl bg-[#002B49] hover:bg-[#001D32] text-white font-bold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Verifying &amp; Initializing Deed Filing...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>
                          Pay ₹{totalPayable.toLocaleString('en-IN')} &amp; Start
                          Registration
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
                    Your partnership registration file has been opened with our CA
                    workbench.
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
                    <span className="text-slate-500">Proposed Firm:</span>
                    <span className="font-semibold text-slate-900">
                      {orderReceipt?.firmName}
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
                    className="flex-1 py-2.5 rounded-xl bg-[#002B49] text-white text-xs font-bold hover:bg-[#001D32] transition flex items-center justify-center gap-1.5 cursor-pointer"
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
