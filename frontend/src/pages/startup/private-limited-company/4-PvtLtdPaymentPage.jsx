import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  CreditCard,
  Landmark,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Lock,
  Loader2,
  ArrowLeft,
  ChevronUp,
  ChevronDown,
  Printer,
  Check,
} from 'lucide-react';

const POPULAR_BANKS = [
  { name: 'State Bank of India', code: 'SBI', icon: '🏛️' },
  { name: 'HDFC Bank', code: 'HDFC', icon: '🏦' },
  { name: 'ICICI Bank', code: 'ICICI', icon: '🏦' },
  { name: 'Axis Bank', code: 'AXIS', icon: '🏦' },
  { name: 'Kotak Mahindra Bank', code: 'KOTAK', icon: '🏛️' },
  { name: 'Punjab National Bank', code: 'PNB', icon: '🏦' },
];

const ALL_NET_BANKS = [
  'Bank of Baroda',
  'Canara Bank',
  'Union Bank of India',
  'Bank of India',
  'IndusInd Bank',
  'Federal Bank',
  'Yes Bank',
  'IDFC FIRST Bank',
  'Central Bank of India',
  'Indian Overseas Bank',
];

export default function PvtLtdPaymentPage({
  formData = {},
  orderId = '',
  onBack,
  onChangePlan,
  onPaymentSuccess,
}) {
  // Active payment method tab: 'upi' | 'card' | 'netbanking'
  const [activeMethod, setActiveMethod] = useState('upi');

  // Selected UPI App (defaults to 'phonepe')
  const [selectedUpiApp, setSelectedUpiApp] = useState('phonepe');
  const [customVpa, setCustomVpa] = useState('');

  // Card details state
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  // Net banking state
  const [selectedBank, setSelectedBank] = useState(POPULAR_BANKS[0].name);

  // Labour Welfare Endowment optional charge (₹50 + ₹9 GST = ₹59)
  const [includeLabourWelfare, setIncludeLabourWelfare] = useState(true);
  const [isTaxesOpen, setIsTaxesOpen] = useState(true);

  // 14:58 minute countdown timer
  const [secondsLeft, setSecondsLeft] = useState(898);

  // Payment processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  // 15-minute timer decrement
  useEffect(() => {
    if (secondsLeft <= 0 || isSuccess) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft, isSuccess]);

  const formatTimer = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Pricing calculations
  const professionalFee = 1499;
  const onlineDiscount = 500;
  const subTotalAmount = professionalFee - onlineDiscount; // 999

  const gstOnFee = 180;
  const labourWelfare = includeLabourWelfare ? 50 : 0;
  const gstOnLabour = includeLabourWelfare ? 9 : 0;
  const totalTaxes = gstOnFee + labourWelfare + gstOnLabour; // 239 or 180

  const totalAmountToPay = subTotalAmount + totalTaxes; // 1238 or 1179

  // Payment simulation
  const handlePayNow = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      const generatedTxnId = `TXN-PVT-${Date.now().toString().slice(-8)}`;
      setTransactionId(generatedTxnId);

      try {
        confetti({
          particleCount: 130,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch {
        // Safe fallback
      }

      if (onPaymentSuccess) {
        onPaymentSuccess({
          transactionId: generatedTxnId,
          amountPaid: totalAmountToPay,
          paidAt: new Date().toISOString(),
          paymentMethod: activeMethod.toUpperCase(),
        });
      }
    }, 1700);
  };

  // SUCCESS CONFIRMATION VIEW
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-10 text-center animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 mb-3">
            Payment Verified • Incorporation In Progress
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
            PVT Ltd Registration Order Placed!
          </h2>
          <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
            Your payment of{' '}
            <strong className="text-slate-900 font-bold">
              ₹{totalAmountToPay.toLocaleString('en-IN')}
            </strong>{' '}
            has been received. Our legal experts have initiated your MCA SPICe+
            filing.
          </p>

          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-left mb-6 space-y-2.5 text-xs sm:text-sm">
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Order Number</span>
              <span className="font-bold text-slate-800">
                {orderId || formData.orderNumber || '#PVT-982144'}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Transaction ID</span>
              <span className="font-mono font-medium text-slate-800">
                {transactionId}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Proposed Company Name</span>
              <span className="font-semibold text-slate-800">
                {formData.proposedCompanyName
                  ? `${formData.proposedCompanyName} Private Limited`
                  : 'ttytr Private Limited'}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Payment Channel</span>
              <span className="font-semibold text-slate-800 uppercase">
                {activeMethod === 'upi' ? `UPI (${selectedUpiApp.toUpperCase()})` : activeMethod}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Amount Paid</span>
              <span className="font-bold text-emerald-700">
                ₹{totalAmountToPay.toLocaleString('en-IN')} (Incl. All Taxes)
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer transition"
            >
              <Printer className="w-4 h-4" />
              <span>Print Tax Invoice</span>
            </button>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#002B49] hover:bg-[#001D32] text-white text-xs font-semibold shadow cursor-pointer transition"
            >
              <span>Go to Client Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFE] relative overflow-hidden font-sans text-slate-800 py-8 px-4 sm:px-6 lg:px-12">
      {/* Decorative festive confetti ribbons in background */}
      <div className="absolute top-12 left-1/4 w-3 h-8 bg-rose-300/40 rotate-45 rounded-sm pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-3 h-8 bg-purple-300/40 -rotate-45 rounded-sm pointer-events-none" />
      <div className="absolute top-48 left-16 w-2 h-6 bg-yellow-400/50 rotate-12 rounded-sm pointer-events-none" />
      <div className="absolute top-72 left-1/3 w-2.5 h-7 bg-amber-400/50 -rotate-12 rounded-sm pointer-events-none" />
      <div className="absolute top-36 right-16 w-2.5 h-6 bg-rose-400/40 45 rounded-sm pointer-events-none" />
      <div className="absolute bottom-28 left-1/2 w-2 h-6 bg-amber-300/40 rotate-45 rounded-sm pointer-events-none" />

      {/* Top Header Bar */}
      <div className="max-w-6xl mx-auto mb-6 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#FFD200] text-slate-950 font-black text-xs tracking-wider uppercase shadow-2xs">
          <span>VAKIL</span>
          <span className="font-semibold text-slate-900">SEARCH</span>
        </div>

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Plan Selection</span>
          </button>
        )}
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto">
        {/* Heading: Choose Payment Method */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-[28px] font-extrabold text-slate-900 tracking-tight">
            Choose Payment Method
          </h1>
          <p className="text-sm font-bold text-slate-800 mt-3">
            Payment Options
          </p>
        </div>

        {/* 2-Column Grid: Left Payment Desk (8 cols), Right Order Summary (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Payment Box with floating green discount pill */}
          <div className="lg:col-span-8 relative">
            {/* Floating Top-Right Green Ribbon */}
            <div className="flex justify-end -mb-px relative z-10 mr-6">
              <div className="bg-[#22C55E] text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-t-2xl inline-flex items-center gap-2 shadow-sm">
                <span>🎉</span>
                <span>Hooray! ₹500 Discount Unlocked!</span>
              </div>
            </div>

            {/* Payment Box Container */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[420px]">
              {/* Payment Methods Vertical Tab List (Left Column) */}
              <div className="md:col-span-5 bg-white border-b md:border-b-0 md:border-r border-slate-200">
                {/* TAB 1: UPI */}
                <button
                  type="button"
                  onClick={() => setActiveMethod('upi')}
                  className={`w-full text-left p-4 sm:p-5 flex items-center justify-between transition cursor-pointer relative border-b border-slate-100 ${
                    activeMethod === 'upi'
                      ? 'bg-slate-50/70 text-slate-900'
                      : 'hover:bg-slate-50/40 text-slate-700'
                  }`}
                >
                  {activeMethod === 'upi' && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#002B49]" />
                  )}

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 text-slate-700">
                      <svg
                        className="w-5 h-5 text-slate-700"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="m5 12 7-7 7 7-7 7Z" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        UPI
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium">
                        Gpay, PhonePe, Paytm &amp; more
                      </p>
                    </div>
                  </div>

                  {activeMethod === 'upi' && (
                    <div className="text-[#002B49] hidden md:block">
                      <svg
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  )}
                </button>

                {/* TAB 2: Credit/Debit/ATM Card */}
                <button
                  type="button"
                  onClick={() => setActiveMethod('card')}
                  className={`w-full text-left p-4 sm:p-5 flex items-center justify-between transition cursor-pointer relative border-b border-slate-100 ${
                    activeMethod === 'card'
                      ? 'bg-slate-50/70 text-slate-900'
                      : 'hover:bg-slate-50/40 text-slate-700'
                  }`}
                >
                  {activeMethod === 'card' && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#002B49]" />
                  )}

                  <div className="flex items-start gap-3">
                    <CreditCard className="w-5 h-5 text-slate-500 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        Credit/Debit/ATM Card
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium">
                        Visa, MasterCard, Rupay &amp; more
                      </p>
                    </div>
                  </div>

                  {activeMethod === 'card' && (
                    <div className="text-[#002B49] hidden md:block">
                      <svg
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  )}
                </button>

                {/* TAB 3: Net Banking */}
                <button
                  type="button"
                  onClick={() => setActiveMethod('netbanking')}
                  className={`w-full text-left p-4 sm:p-5 flex items-center justify-between transition cursor-pointer relative ${
                    activeMethod === 'netbanking'
                      ? 'bg-slate-50/70 text-slate-900'
                      : 'hover:bg-slate-50/40 text-slate-700'
                  }`}
                >
                  {activeMethod === 'netbanking' && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#002B49]" />
                  )}

                  <div className="flex items-start gap-3">
                    <Landmark className="w-5 h-5 text-slate-500 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        Net Banking
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium">
                        Pay using all Indian banks
                      </p>
                    </div>
                  </div>

                  {activeMethod === 'netbanking' && (
                    <div className="text-[#002B49] hidden md:block">
                      <svg
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  )}
                </button>
              </div>

              {/* Active Tab Content (Right Column) */}
              <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  {/* Countdown Timer */}
                  <div className="flex items-center gap-1.5 text-rose-600 text-xs sm:text-sm font-semibold mb-6">
                    <Clock className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>
                      ₹500 discount expires in{' '}
                      <span className="font-mono font-bold text-rose-600">
                        {formatTimer(secondsLeft)}
                      </span>{' '}
                      minutes
                    </span>
                  </div>

                  {/* UPI VIEW */}
                  {activeMethod === 'upi' && (
                    <div className="space-y-6 animate-in fade-in duration-150">
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900">
                          Pay with UPI
                        </h3>
                        <div className="h-px bg-slate-200 mt-3" />
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-slate-700 mb-4">
                          Select UPI App
                        </p>

                        {/* 4 UPI Apps row */}
                        <div className="grid grid-cols-4 gap-3 sm:gap-4">
                          {/* 1. Google Pay */}
                          <div
                            onClick={() => setSelectedUpiApp('gpay')}
                            className="flex flex-col items-center gap-2 cursor-pointer group"
                          >
                            <div
                              className={`w-14 h-14 rounded-full flex items-center justify-center transition border bg-white shadow-2xs relative ${
                                selectedUpiApp === 'gpay'
                                  ? 'border-[#002B49] ring-2 ring-[#002B49]/20'
                                  : 'border-slate-300 group-hover:border-slate-400'
                              }`}
                            >
                              <svg className="w-7 h-7" viewBox="0 0 48 48">
                                <path
                                  fill="#4285F4"
                                  d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.5 30.3 0 24 0 14.6 0 6.6 5.5 2.6 13.5l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"
                                />
                                <path
                                  fill="#34A853"
                                  d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.5c-.5 2.8-2.1 5.2-4.5 6.8l7.2 5.6c4.2-3.9 6.9-9.6 6.9-16.9z"
                                />
                                <path
                                  fill="#FBBC05"
                                  d="M10.5 28.4c-.5-1.5-.8-3.1-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C.9 16.5 0 20.1 0 24s.9 7.5 2.6 11.1l7.9-6.7z"
                                />
                                <path
                                  fill="#EA4335"
                                  d="M24 48c6.5 0 12-2.1 16-5.8l-7.2-5.6c-2.2 1.5-5 2.4-8.8 2.4-6.3 0-11.6-4.1-13.5-10.1l-7.9 6.1C6.6 42.5 14.6 48 24 48z"
                                />
                              </svg>
                              {selectedUpiApp === 'gpay' && (
                                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#002B49] text-white flex items-center justify-center">
                                  <Check className="w-3 h-3 stroke-[3]" />
                                </div>
                              )}
                            </div>
                            <span className="text-[11px] font-semibold text-slate-800 text-center">
                              Google pay
                            </span>
                          </div>

                          {/* 2. PhonePe */}
                          <div
                            onClick={() => setSelectedUpiApp('phonepe')}
                            className="flex flex-col items-center gap-2 cursor-pointer group"
                          >
                            <div
                              className={`w-14 h-14 rounded-full flex items-center justify-center transition border bg-[#5F259F] text-white shadow-2xs relative ${
                                selectedUpiApp === 'phonepe'
                                  ? 'border-[#002B49] ring-2 ring-[#002B49]/30'
                                  : 'border-transparent'
                              }`}
                            >
                              <span className="text-xl font-bold font-serif">पे</span>
                              {selectedUpiApp === 'phonepe' && (
                                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#002B49] text-white flex items-center justify-center border-2 border-white shadow">
                                  <Check className="w-3 h-3 stroke-[3]" />
                                </div>
                              )}
                            </div>
                            <span className="text-[11px] font-bold text-slate-900 text-center">
                              PhonePe
                            </span>
                          </div>

                          {/* 3. Paytm */}
                          <div
                            onClick={() => setSelectedUpiApp('paytm')}
                            className="flex flex-col items-center gap-2 cursor-pointer group"
                          >
                            <div
                              className={`w-14 h-14 rounded-full flex items-center justify-center transition border bg-white shadow-2xs relative ${
                                selectedUpiApp === 'paytm'
                                  ? 'border-[#002B49] ring-2 ring-[#002B49]/20'
                                  : 'border-slate-300 group-hover:border-slate-400'
                              }`}
                            >
                              <span className="text-[12px] font-black text-[#002E6E] tracking-tight">
                                Pay<span className="text-[#00BAF2]">tm</span>
                              </span>
                              {selectedUpiApp === 'paytm' && (
                                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#002B49] text-white flex items-center justify-center">
                                  <Check className="w-3 h-3 stroke-[3]" />
                                </div>
                              )}
                            </div>
                            <span className="text-[11px] font-semibold text-slate-800 text-center">
                              Paytm
                            </span>
                          </div>

                          {/* 4. Other UPI ID */}
                          <div
                            onClick={() => setSelectedUpiApp('other')}
                            className="flex flex-col items-center gap-2 cursor-pointer group"
                          >
                            <div
                              className={`w-14 h-14 rounded-full flex items-center justify-center transition border bg-white shadow-2xs relative ${
                                selectedUpiApp === 'other'
                                  ? 'border-[#002B49] ring-2 ring-[#002B49]/20'
                                  : 'border-slate-300 group-hover:border-slate-400'
                              }`}
                            >
                              <span className="text-[11px] font-bold text-slate-700 tracking-wider">
                                UPI
                              </span>
                              {selectedUpiApp === 'other' && (
                                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#002B49] text-white flex items-center justify-center">
                                  <Check className="w-3 h-3 stroke-[3]" />
                                </div>
                              )}
                            </div>
                            <span className="text-[11px] font-semibold text-slate-800 text-center">
                              Other UPI ID
                            </span>
                          </div>
                        </div>

                        {/* Helper text */}
                        <div className="mt-6">
                          {selectedUpiApp === 'other' ? (
                            <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-slate-700 block">
                                Enter your Virtual Payment Address (VPA)
                              </label>
                              <input
                                type="text"
                                placeholder="e.g. mobile@upi or username@okhdfcbank"
                                value={customVpa}
                                onChange={(e) => setCustomVpa(e.target.value)}
                                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#002B49]"
                              />
                            </div>
                          ) : (
                            <p className="text-xs text-slate-500 font-normal">
                              Pay through the{' '}
                              <strong className="text-slate-700 capitalize">
                                {selectedUpiApp === 'gpay'
                                  ? 'Google Pay'
                                  : selectedUpiApp === 'phonepe'
                                    ? 'PhonePe'
                                    : 'Paytm'}
                              </strong>{' '}
                              pay app on your phone
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* CARD VIEW */}
                  {activeMethod === 'card' && (
                    <div className="space-y-4 animate-in fade-in duration-150">
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900">
                          Credit / Debit Card
                        </h3>
                        <div className="h-px bg-slate-200 mt-3" />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          maxLength={19}
                          placeholder="4532 •••• •••• 8892"
                          value={cardDetails.number}
                          onChange={(e) =>
                            setCardDetails({ ...cardDetails, number: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#002B49]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          placeholder="YASH UPADHYAY"
                          value={cardDetails.name}
                          onChange={(e) =>
                            setCardDetails({ ...cardDetails, name: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#002B49]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Expiry (MM/YY)
                          </label>
                          <input
                            type="text"
                            maxLength={5}
                            placeholder="12/28"
                            value={cardDetails.expiry}
                            onChange={(e) =>
                              setCardDetails({ ...cardDetails, expiry: e.target.value })
                            }
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#002B49]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            CVV
                          </label>
                          <input
                            type="password"
                            maxLength={4}
                            placeholder="•••"
                            value={cardDetails.cvv}
                            onChange={(e) =>
                              setCardDetails({ ...cardDetails, cvv: e.target.value })
                            }
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#002B49]"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* NET BANKING VIEW */}
                  {activeMethod === 'netbanking' && (
                    <div className="space-y-4 animate-in fade-in duration-150">
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900">
                          Net Banking
                        </h3>
                        <div className="h-px bg-slate-200 mt-3" />
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        {POPULAR_BANKS.map((b) => (
                          <button
                            key={b.code}
                            type="button"
                            onClick={() => setSelectedBank(b.name)}
                            className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer truncate ${
                              selectedBank === b.name
                                ? 'border-[#002B49] bg-blue-50/50 text-[#002B49] font-bold'
                                : 'border-slate-200 text-slate-700 hover:border-slate-300'
                            }`}
                          >
                            <span>{b.icon}</span>
                            <span className="truncate">{b.code}</span>
                          </button>
                        ))}
                      </div>

                      <div className="pt-2">
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Or select your bank
                        </label>
                        <select
                          value={selectedBank}
                          onChange={(e) => setSelectedBank(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#002B49]"
                        >
                          {ALL_NET_BANKS.map((bank) => (
                            <option key={bank} value={bank}>
                              {bank}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                {/* Primary Action Button: "PAY ₹1238" */}
                <div className="pt-6 mt-6">
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={handlePayNow}
                    className="w-full py-3.5 px-6 rounded-lg bg-[#002B49] hover:bg-[#001D32] text-white text-base font-bold tracking-wide shadow-md hover:shadow-lg transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>PROCESSING...</span>
                      </>
                    ) : (
                      <span>PAY ₹{totalAmountToPay}</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Order Summary Card ("PVT Registration") */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-7">
              {/* Header Title: PVT Registration */}
              <h3 className="text-base font-bold text-slate-900 text-center pb-3 border-b border-slate-100">
                PVT Registration
              </h3>

              {/* Price details section heading */}
              <div className="pt-4 pb-2 flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border border-blue-600 text-blue-600 flex items-center justify-center text-[10px] font-bold">
                  ₹
                </div>
                <h4 className="text-xs font-bold text-slate-800">
                  Price details
                </h4>
              </div>

              {/* Cost Rows */}
              <div className="py-2 space-y-3 text-xs">
                {/* Professional Fees */}
                <div className="flex items-center justify-between text-slate-700">
                  <span>Professional Fees</span>
                  <span className="font-medium">₹{professionalFee}</span>
                </div>

                {/* Online Discount (Green) */}
                <div className="flex items-center justify-between text-emerald-600 font-semibold">
                  <span>Online Discount</span>
                  <span>-₹{onlineDiscount}</span>
                </div>

                {/* Sub Total Amount */}
                <div className="flex items-center justify-between text-slate-900 font-bold pt-1">
                  <span>Sub Total Amount</span>
                  <span>₹{subTotalAmount}</span>
                </div>

                {/* Taxes & Charges Collapsible Accordion */}
                <div className="pt-2">
                  <div
                    onClick={() => setIsTaxesOpen(!isTaxesOpen)}
                    className="flex items-center justify-between text-slate-800 font-bold cursor-pointer py-1 select-none"
                  >
                    <div className="flex items-center gap-1.5">
                      {isTaxesOpen ? (
                        <ChevronUp className="w-3.5 h-3.5 text-blue-900" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-blue-900" />
                      )}
                      <span>Taxes &amp; Charges</span>
                    </div>
                    <span>₹{totalTaxes}</span>
                  </div>

                  {/* Expanded grey breakdown box matching screenshot */}
                  {isTaxesOpen && (
                    <div className="mt-2 bg-[#F8FAFC] rounded-lg p-3 space-y-2.5 border border-slate-100 text-[11px] text-slate-600 animate-in fade-in duration-100">
                      <div className="flex items-center justify-between">
                        <span>GST on professional fee (18%)</span>
                        <span className="font-medium text-slate-800">
                          ₹{gstOnFee}
                        </span>
                      </div>

                      {/* Labour Welfare Endowment with [Remove] red button */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span>Labour Welfare Endowment</span>
                          {includeLabourWelfare ? (
                            <button
                              type="button"
                              onClick={() => setIncludeLabourWelfare(false)}
                              className="px-2 py-0.5 rounded border border-rose-400 text-rose-500 hover:bg-rose-50 text-[10px] font-medium cursor-pointer transition"
                            >
                              Remove
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setIncludeLabourWelfare(true)}
                              className="px-2 py-0.5 rounded border border-emerald-500 text-emerald-600 hover:bg-emerald-50 text-[10px] font-medium cursor-pointer transition"
                            >
                              Add
                            </button>
                          )}
                        </div>
                        <span className="font-medium text-slate-800">
                          ₹{labourWelfare}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span>GST on labour welfare (18%)</span>
                        <span className="font-medium text-slate-800">
                          ₹{gstOnLabour}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Final Total Amount */}
              <div className="pt-4 mt-3 border-t border-slate-200 flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900">
                  Total Amount
                </span>
                <span className="text-2xl font-black text-slate-900 tracking-tight">
                  ₹{totalAmountToPay}
                </span>
              </div>
            </div>

            {/* Security assurance */}
            <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>256-Bit Bank Grade SSL Encrypted Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
