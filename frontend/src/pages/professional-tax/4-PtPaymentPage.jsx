import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  CreditCard,
  Landmark,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Loader2,
  Check,
  ArrowRight,
  ArrowLeft,
  Download,
  Lock,
  BadgeCheck,
  CircleDollarSign,
  Smartphone,
  QrCode,
  FileText,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext.jsx';
import { getPtPlan } from './constants.js';

const POPULAR_BANKS = [
  { name: 'State Bank of India', code: 'SBI', icon: '🏛️' },
  { name: 'HDFC Bank', code: 'HDFC', icon: '🏢' },
  { name: 'ICICI Bank', code: 'ICICI', icon: '🏦' },
  { name: 'Axis Bank', code: 'AXIS', icon: '🏬' },
  { name: 'Kotak Mahindra Bank', code: 'KOTAK', icon: '🏛️' },
  { name: 'Punjab National Bank', code: 'PNB', icon: '🏦' },
];

export default function PtPaymentPage({
  planId: propPlanId,
  formData = {},
  onBack,
  onPaymentSuccess,
}) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();

  const selectedPlanKey =
    propPlanId || searchParams.get('plan') || formData.plan || 'elite';
  const currentPlan = getPtPlan(selectedPlanKey);

  // Exact Pricing Breakdown matching Screenshot media_1793009097721_5d4a8943.png
  // For Elite Plan (₹5,999):
  // Professional Fees: ₹5,083
  // GST on fee (18%): ₹916  (5083 + 916 = 5999)
  // Labour Welfare Endowment: ₹305
  // GST on labour welfare (18%): ₹55 (305 + 55 = 360)
  // Taxes & Charges = 916 + 305 + 55 = ₹1,276
  // Total Amount = 5083 + 1276 = ₹6,359
  const planPrice = currentPlan.price || 5999;
  const isElite = currentPlan.id === 'elite';

  // Base and GST calculations
  const basePrice = isElite ? 5083 : Math.round(planPrice / 1.18);
  const gstOnFee = isElite ? 916 : planPrice - basePrice;

  // Labour Welfare Endowment toggle (default: true matching screenshot)
  const [includeLabourWelfare, setIncludeLabourWelfare] = useState(true);
  const labourWelfareAmount = includeLabourWelfare ? (isElite ? 305 : 200) : 0;
  const gstOnLabour = includeLabourWelfare
    ? (isElite ? 55 : Math.round(labourWelfareAmount * 0.18))
    : 0;

  const taxesAndCharges = gstOnFee + labourWelfareAmount + gstOnLabour;
  const totalAmount = basePrice + taxesAndCharges;

  // Taxes breakdown dropdown state (open by default per screenshot)
  const [isTaxesExpanded, setIsTaxesExpanded] = useState(true);

  // Active payment method tab: 'upi' | 'card' | 'netbanking' | 'emi'
  const [activeTab, setActiveTab] = useState('upi');

  // Selected UPI app: 'phonepe' | 'gpay' | 'paytm' | 'other'
  const [selectedUpiApp, setSelectedUpiApp] = useState('phonepe');
  const [customUpiId, setCustomUpiId] = useState('');
  const [showQrModal, setShowQrModal] = useState(false);

  // Card Inputs
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');

  // Net banking
  const [selectedBank, setSelectedBank] = useState('State Bank of India');

  // EMI Tenure
  const [selectedEmiTenure, setSelectedEmiTenure] = useState(
    '3 Months - ₹' + Math.round(totalAmount / 3) + '/mo'
  );

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  const getUpiAppName = () => {
    switch (selectedUpiApp) {
      case 'gpay':
        return 'Google pay';
      case 'phonepe':
        return 'PhonePe';
      case 'paytm':
        return 'Paytm';
      case 'other':
        return 'UPI ID / VPA';
      default:
        return 'PhonePe';
    }
  };

  const handlePay = () => {
    if (activeTab === 'upi' && selectedUpiApp === 'other' && !customUpiId.includes('@')) {
      showError('Please enter a valid UPI ID (e.g., username@okaxis)');
      return;
    }
    if (activeTab === 'card') {
      if (cardNumber.replace(/\s/g, '').length < 15) {
        showError('Please enter a valid 16-digit card number');
        return;
      }
      if (!cardExpiry || !cardCvv) {
        showError('Please enter card expiry and CVV');
        return;
      }
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      const generatedTxn = 'BFP-PT-' + Math.floor(100000 + Math.random() * 900000);
      setTransactionId(generatedTxn);

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // Ignore
      }

      showSuccess('Payment Successful! Your CA has been assigned.');
      if (onPaymentSuccess) {
        onPaymentSuccess({
          transactionId: generatedTxn,
          amount: totalAmount,
          plan: currentPlan.id,
        });
      }
    }, 1400);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans py-6 sm:py-10 px-4 sm:px-6">
      
      {/* Top Header Bar */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between pb-6 sm:pb-8 border-b border-slate-200/60 mb-6 sm:mb-8">
        <div className="flex items-center gap-4">
          {onBack && !isSuccess && (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#002B49] transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          )}

          <div className="flex items-center gap-2">
            <img
              src="/bharatfiling-brand-icon.png"
              alt="BharatFiling"
              className="h-7 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/bharatfiling-horizontal-transparent.png';
              }}
            />
            <span className="text-xl font-extrabold tracking-tight text-[#111827]">
              Bharat<span className="text-[#F26522]">Filing</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
          <ShieldCheck className="w-4 h-4" />
          <span>256-Bit SSL Encrypted Payment Desk</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl w-full mx-auto">
        
        {/* PAYMENT SUCCESS RECEIPT SCREEN */}
        {isSuccess ? (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-xl text-center space-y-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002B49]">
                Payment of ₹{totalAmount.toLocaleString('en-IN')} Received!
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Your Professional Tax ({currentPlan.name}) Registration order has been placed successfully.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 text-left text-xs sm:text-sm space-y-2.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Transaction ID:</span>
                <span className="font-mono font-bold text-slate-900">{transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Selected Plan:</span>
                <span className="font-bold text-slate-900">{currentPlan.name} Plan</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Business Entity:</span>
                <span className="font-bold text-slate-900">{formData.entityType || 'Pvt. Ltd'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Operating State:</span>
                <span className="font-bold text-slate-900">{formData.operatingState || 'Maharashtra'}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 font-bold text-slate-900">
                <span>Total Amount Paid:</span>
                <span className="text-emerald-700">₹{totalAmount.toLocaleString('en-IN')} (Incl. 18% GST)</span>
              </div>
            </div>

            {/* Next Steps Card */}
            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-left text-xs sm:text-sm text-slate-700 flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-[#0052CC] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-900">Dedicated Compliance Partner Assigned</p>
                <p className="text-slate-600 text-xs mt-0.5">
                  Our Senior Chartered Accountant will call you within 15 minutes to review your PAN and business proofs for state tax portal submission.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="flex-1 py-3 px-4 rounded-lg border border-slate-300 font-bold text-sm text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Tax Invoice</span>
              </button>

              <Link
                to="/dashboard"
                className="flex-1 py-3 px-4 rounded-lg bg-[#002B49] hover:bg-[#001D33] text-white font-bold text-sm text-center flex items-center justify-center gap-2 shadow-md"
              >
                <span>Go to Client Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          /* STANDARD 2-COLUMN PAYMENT DESK (1:1 MATCH OF SCREENSHOT MEDIA_1793009097721_5D4A8943.PNG) */
          <div>
            {/* Title Section (Matching screenshot header) */}
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Choose Payment Method
              </h1>
              <p className="text-sm sm:text-base font-bold text-slate-700 mt-1">
                Payment Options
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT DESK: PAYMENT OPTIONS TABS + METHOD PANE */}
              <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[460px]">
                
                {/* 1. Vertical Navigation Tabs (Left side of desk, 5 columns on md) */}
                <div className="md:col-span-5 bg-slate-50/70 border-r border-slate-200 divide-y divide-slate-200/80">
                  
                  {/* Tab 1: UPI */}
                  <button
                    type="button"
                    onClick={() => setActiveTab('upi')}
                    className={`w-full p-4 text-left flex items-center justify-between transition cursor-pointer relative ${
                      activeTab === 'upi'
                        ? 'bg-white border-l-4 border-[#002B49] text-slate-900 font-bold shadow-2xs'
                        : 'text-slate-600 hover:bg-white/80'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 flex items-center justify-center text-slate-700">
                        {/* Dual Arrows / UPI Icon */}
                        <svg className="w-5 h-5 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">UPI</div>
                        <div className="text-[11px] text-slate-500">Gpay, PhonePe, Paytm &amp; more</div>
                      </div>
                    </div>

                    {/* Active Right Arrow Indicator ▶ */}
                    {activeTab === 'upi' && (
                      <span className="text-[#002B49] text-xs font-bold pl-2 select-none">
                        ▶
                      </span>
                    )}
                  </button>

                  {/* Tab 2: Credit/Debit/ATM Card */}
                  <button
                    type="button"
                    onClick={() => setActiveTab('card')}
                    className={`w-full p-4 text-left flex items-center justify-between transition cursor-pointer relative ${
                      activeTab === 'card'
                        ? 'bg-white border-l-4 border-[#002B49] text-slate-900 font-bold shadow-2xs'
                        : 'text-slate-600 hover:bg-white/80'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 flex items-center justify-center text-slate-700">
                        <CreditCard className="w-5 h-5 text-slate-700" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">Credit/Debit/ATM Card</div>
                        <div className="text-[11px] text-slate-500">Visa, MasterCard, Rupay &amp; more</div>
                      </div>
                    </div>

                    {activeTab === 'card' && (
                      <span className="text-[#002B49] text-xs font-bold pl-2 select-none">
                        ▶
                      </span>
                    )}
                  </button>

                  {/* Tab 3: Net Banking */}
                  <button
                    type="button"
                    onClick={() => setActiveTab('netbanking')}
                    className={`w-full p-4 text-left flex items-center justify-between transition cursor-pointer relative ${
                      activeTab === 'netbanking'
                        ? 'bg-white border-l-4 border-[#002B49] text-slate-900 font-bold shadow-2xs'
                        : 'text-slate-600 hover:bg-white/80'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 flex items-center justify-center text-slate-700">
                        <Landmark className="w-5 h-5 text-slate-700" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">Net Banking</div>
                        <div className="text-[11px] text-slate-500">Pay using all Indian banks</div>
                      </div>
                    </div>

                    {activeTab === 'netbanking' && (
                      <span className="text-[#002B49] text-xs font-bold pl-2 select-none">
                        ▶
                      </span>
                    )}
                  </button>

                  {/* Tab 4: EMI option */}
                  <button
                    type="button"
                    onClick={() => setActiveTab('emi')}
                    className={`w-full p-4 text-left flex items-center justify-between transition cursor-pointer relative ${
                      activeTab === 'emi'
                        ? 'bg-white border-l-4 border-[#002B49] text-slate-900 font-bold shadow-2xs'
                        : 'text-slate-600 hover:bg-white/80'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 flex items-center justify-center text-slate-700">
                        <span className="px-1.5 py-0.5 border border-slate-700 rounded text-[10px] font-bold">
                          EMI
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">EMI option</div>
                        <div className="text-[11px] text-slate-500">Pay using credit card &amp; Debit card</div>
                      </div>
                    </div>

                    {activeTab === 'emi' && (
                      <span className="text-[#002B49] text-xs font-bold pl-2 select-none">
                        ▶
                      </span>
                    )}
                  </button>

                </div>

                {/* 2. Method Configuration Details (Right side of desk, 7 columns on md) */}
                <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                  
                  {/* UPI PANE (Matches Screenshot 1:1) */}
                  {activeTab === 'upi' && (
                    <div className="space-y-6">
                      <div className="pb-3 border-b border-slate-100">
                        <h2 className="text-base font-bold text-slate-900">
                          Pay with UPI
                        </h2>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-slate-500 mb-4">
                          Select UPI App
                        </p>

                        {/* Row of 4 UPI Apps */}
                        <div className="grid grid-cols-4 gap-3 text-center">
                          
                          {/* Google Pay */}
                          <button
                            type="button"
                            onClick={() => setSelectedUpiApp('gpay')}
                            className="flex flex-col items-center gap-2 group cursor-pointer focus:outline-none"
                          >
                            <div
                              className={`w-12 h-12 rounded-full border flex items-center justify-center transition shadow-2xs ${
                                selectedUpiApp === 'gpay'
                                  ? 'border-[#002B49] ring-2 ring-[#002B49]/20 bg-blue-50/50'
                                  : 'border-slate-200 hover:border-slate-300 bg-white'
                              }`}
                            >
                              {/* GPay Stylized Badge */}
                              <span className="font-black text-sm tracking-tighter bg-gradient-to-r from-blue-600 via-red-500 to-yellow-500 bg-clip-text text-transparent">
                                GPay
                              </span>
                            </div>
                            <span className="text-xs font-semibold text-slate-700">Google pay</span>
                          </button>

                          {/* PhonePe (Selected in Screenshot with check badge) */}
                          <button
                            type="button"
                            onClick={() => setSelectedUpiApp('phonepe')}
                            className="flex flex-col items-center gap-2 group cursor-pointer focus:outline-none relative"
                          >
                            <div
                              className={`w-12 h-12 rounded-full border flex items-center justify-center transition shadow-2xs relative ${
                                selectedUpiApp === 'phonepe'
                                  ? 'border-[#002B49] ring-2 ring-[#002B49]/20 bg-purple-50/60'
                                  : 'border-slate-200 hover:border-slate-300 bg-white'
                              }`}
                            >
                              {/* PhonePe 'पे' Icon */}
                              <div className="w-8 h-8 rounded-full bg-[#5f259f] text-white flex items-center justify-center font-bold text-base">
                                पे
                              </div>

                              {/* Selected Check Badge (top right of icon) */}
                              {selectedUpiApp === 'phonepe' && (
                                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#002B49] text-white flex items-center justify-center text-[10px]">
                                  ✓
                                </div>
                              )}
                            </div>
                            <span className="text-xs font-bold text-slate-900">PhonePe</span>
                          </button>

                          {/* Paytm */}
                          <button
                            type="button"
                            onClick={() => setSelectedUpiApp('paytm')}
                            className="flex flex-col items-center gap-2 group cursor-pointer focus:outline-none"
                          >
                            <div
                              className={`w-12 h-12 rounded-full border flex items-center justify-center transition shadow-2xs ${
                                selectedUpiApp === 'paytm'
                                  ? 'border-[#002B49] ring-2 ring-[#002B49]/20 bg-sky-50/50'
                                  : 'border-slate-200 hover:border-slate-300 bg-white'
                              }`}
                            >
                              <span className="font-extrabold text-xs text-[#00b9f5]">
                                paytm
                              </span>
                            </div>
                            <span className="text-xs font-semibold text-slate-700">Paytm</span>
                          </button>

                          {/* Other UPI ID */}
                          <button
                            type="button"
                            onClick={() => setSelectedUpiApp('other')}
                            className="flex flex-col items-center gap-2 group cursor-pointer focus:outline-none"
                          >
                            <div
                              className={`w-12 h-12 rounded-full border flex items-center justify-center transition shadow-2xs ${
                                selectedUpiApp === 'other'
                                  ? 'border-[#002B49] ring-2 ring-[#002B49]/20 bg-slate-100'
                                  : 'border-slate-200 hover:border-slate-300 bg-white'
                              }`}
                            >
                              <span className="font-black text-xs text-slate-700">
                                UPI
                              </span>
                            </div>
                            <span className="text-xs font-semibold text-slate-700">Other UPI ID</span>
                          </button>

                        </div>

                        {/* Custom UPI ID input if 'other' is selected */}
                        {selectedUpiApp === 'other' && (
                          <div className="mt-4 pt-2">
                            <label className="block text-xs font-medium text-slate-600 mb-1">
                              Enter your Virtual Payment Address (VPA)
                            </label>
                            <input
                              type="text"
                              value={customUpiId}
                              onChange={(e) => setCustomUpiId(e.target.value)}
                              placeholder="e.g. mobile@upi or name@okaxis"
                              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#002B49]"
                            />
                          </div>
                        )}

                        {/* Instructional Text matching screenshot */}
                        <p className="text-xs text-slate-500 mt-6 mb-2">
                          Pay through the {getUpiAppName()} pay app on your phone
                        </p>
                      </div>

                      {/* Primary Pay CTA */}
                      <button
                        type="button"
                        onClick={handlePay}
                        disabled={isProcessing}
                        className="w-full py-3.5 px-4 rounded-lg bg-[#002B49] hover:bg-[#001D33] text-white font-bold text-sm transition shadow-md cursor-pointer flex items-center justify-center gap-2"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Processing Payment...</span>
                          </>
                        ) : (
                          <span>PAY ₹{totalAmount.toLocaleString('en-IN')}</span>
                        )}
                      </button>
                    </div>
                  )}

                  {/* CARD PANE */}
                  {activeTab === 'card' && (
                    <div className="space-y-4">
                      <div className="pb-2 border-b border-slate-100">
                        <h2 className="text-base font-bold text-slate-900">
                          Debit or Credit Card
                        </h2>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 mb-1">
                            Card Number
                          </label>
                          <input
                            type="text"
                            maxLength="19"
                            value={cardNumber}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
                              setCardNumber(val);
                            }}
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#002B49]"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">
                              Expiry (MM/YY)
                            </label>
                            <input
                              type="text"
                              maxLength="5"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              placeholder="MM/YY"
                              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#002B49]"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">
                              CVV
                            </label>
                            <input
                              type="password"
                              maxLength="4"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                              placeholder="•••"
                              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#002B49]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-600 mb-1">
                            Name on Card
                          </label>
                          <input
                            type="text"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            placeholder="John Doe"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#002B49]"
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handlePay}
                        disabled={isProcessing}
                        className="w-full py-3.5 px-4 rounded-lg bg-[#002B49] hover:bg-[#001D33] text-white font-bold text-sm transition shadow-md cursor-pointer flex items-center justify-center gap-2 mt-4"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Verifying 3D Secure...</span>
                          </>
                        ) : (
                          <span>PAY ₹{totalAmount.toLocaleString('en-IN')}</span>
                        )}
                      </button>
                    </div>
                  )}

                  {/* NET BANKING PANE */}
                  {activeTab === 'netbanking' && (
                    <div className="space-y-4">
                      <div className="pb-2 border-b border-slate-100">
                        <h2 className="text-base font-bold text-slate-900">
                          Select Your Bank
                        </h2>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        {POPULAR_BANKS.map((b) => (
                          <button
                            key={b.code}
                            type="button"
                            onClick={() => setSelectedBank(b.name)}
                            className={`p-3 rounded-lg border text-left text-xs font-semibold flex items-center gap-2 transition cursor-pointer ${
                              selectedBank === b.name
                                ? 'border-[#002B49] bg-blue-50/60 text-[#002B49]'
                                : 'border-slate-200 hover:border-slate-300 text-slate-700'
                            }`}
                          >
                            <span>{b.icon}</span>
                            <span>{b.name}</span>
                          </button>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={handlePay}
                        disabled={isProcessing}
                        className="w-full py-3.5 px-4 rounded-lg bg-[#002B49] hover:bg-[#001D33] text-white font-bold text-sm transition shadow-md cursor-pointer flex items-center justify-center gap-2 mt-4"
                      >
                        <span>PAY ₹{totalAmount.toLocaleString('en-IN')} via NetBanking</span>
                      </button>
                    </div>
                  )}

                  {/* EMI PANE */}
                  {activeTab === 'emi' && (
                    <div className="space-y-4">
                      <div className="pb-2 border-b border-slate-100">
                        <h2 className="text-base font-bold text-slate-900">
                          Equated Monthly Installments (EMI)
                        </h2>
                      </div>

                      <div className="space-y-2.5">
                        {[3, 6, 9, 12].map((months) => {
                          const perMonth = Math.round(totalAmount / months);
                          const label = `${months} Months - ₹${perMonth}/month`;
                          return (
                            <button
                              key={months}
                              type="button"
                              onClick={() => setSelectedEmiTenure(label)}
                              className={`w-full p-3 rounded-lg border text-left flex items-center justify-between text-xs sm:text-sm font-semibold transition cursor-pointer ${
                                selectedEmiTenure === label
                                  ? 'border-[#002B49] bg-blue-50/60 text-[#002B49]'
                                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
                              }`}
                            >
                              <span>{months} Months Plan</span>
                              <span className="font-mono font-bold text-slate-900">₹{perMonth} / mo</span>
                            </button>
                          );
                        })}
                      </div>

                      <button
                        type="button"
                        onClick={handlePay}
                        disabled={isProcessing}
                        className="w-full py-3.5 px-4 rounded-lg bg-[#002B49] hover:bg-[#001D33] text-white font-bold text-sm transition shadow-md cursor-pointer flex items-center justify-center gap-2 mt-4"
                      >
                        <span>START EMI AT ₹{Math.round(totalAmount / 3)}/MO</span>
                      </button>
                    </div>
                  )}

                </div>

              </div>

              {/* RIGHT DESK: ORDER SUMMARY CARD (1:1 VAKILSEARCH MATCH) */}
              <div className="lg:col-span-4 space-y-4">
                
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                  
                  {/* Card Title */}
                  <h3 className="font-bold text-base text-slate-900 text-center pb-4 border-b border-slate-100">
                    Professional Tax Registration
                  </h3>

                  {/* Price Details Header */}
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 my-4">
                    <span className="w-4 h-4 rounded-full border border-slate-500 text-slate-700 flex items-center justify-center text-[10px] font-bold">
                      ₹
                    </span>
                    <span>Price details</span>
                  </div>

                  {/* Line 1: Professional Fees */}
                  <div className="flex justify-between items-center text-sm text-slate-700 py-1.5">
                    <span>Professional Fees</span>
                    <span className="font-bold text-slate-900">
                      ₹{basePrice.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Line 2: Taxes & Charges (Collapsible) */}
                  <div className="py-1.5 border-t border-slate-100 mt-1">
                    <button
                      type="button"
                      onClick={() => setIsTaxesExpanded(!isTaxesExpanded)}
                      className="w-full flex justify-between items-center text-sm font-semibold text-slate-700 cursor-pointer"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-slate-500">
                          {isTaxesExpanded ? '▲' : '▼'}
                        </span>
                        <span>Taxes &amp; Charges</span>
                      </div>
                      <span className="font-bold text-slate-900">
                        ₹{taxesAndCharges.toLocaleString('en-IN')}
                      </span>
                    </button>

                    {/* Collapsible Tax Items */}
                    {isTaxesExpanded && (
                      <div className="mt-2.5 p-3 rounded-lg bg-slate-50/80 space-y-2 text-xs text-slate-600">
                        <div className="flex justify-between">
                          <span>GST on professional fee (18%)</span>
                          <span className="font-medium text-slate-800">
                            ₹{gstOnFee.toLocaleString('en-IN')}
                          </span>
                        </div>

                        {/* Labour Welfare Endowment with Remove / Add button */}
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-1.5">
                            <span>Labour Welfare Endowment</span>
                            <button
                              type="button"
                              onClick={() => setIncludeLabourWelfare(!includeLabourWelfare)}
                              className={`border rounded px-1.5 py-0.5 text-[10px] font-semibold cursor-pointer transition ${
                                includeLabourWelfare
                                  ? 'border-rose-300 text-rose-500 hover:bg-rose-50'
                                  : 'border-emerald-300 text-emerald-600 hover:bg-emerald-50'
                              }`}
                            >
                              {includeLabourWelfare ? 'Remove' : 'Add back'}
                            </button>
                          </div>
                          <span className="font-medium text-slate-800">
                            ₹{labourWelfareAmount.toLocaleString('en-IN')}
                          </span>
                        </div>

                        {includeLabourWelfare && (
                          <div className="flex justify-between">
                            <span>GST on labour welfare (18%)</span>
                            <span className="font-medium text-slate-800">
                              ₹{gstOnLabour.toLocaleString('en-IN')}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Line 3: Total Amount */}
                  <div className="flex justify-between items-baseline pt-4 mt-3 border-t-2 border-slate-200">
                    <span className="text-base font-extrabold text-slate-900">
                      Total Amount
                    </span>
                    <span className="text-2xl font-black text-slate-900">
                      ₹{totalAmount.toLocaleString('en-IN')}
                    </span>
                  </div>

                </div>

                {/* Trust Badges below Card matching Screenshot 1:1 */}
                <div className="flex items-center justify-around pt-2 px-2 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-[10px]">
                      PCI
                    </div>
                    <span className="text-xs font-semibold text-slate-700">
                      100% Secure Payment
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <div className="w-7 h-7 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs">
                      🛡️
                    </div>
                    <span className="text-xs font-semibold text-slate-700">
                      Guaranteed Satisfaction
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="max-w-6xl w-full mx-auto text-center pt-8 text-xs text-slate-400">
        <p>🔒 Governed under Article 276 Constitution of India • PCI-DSS Level 1 Compliant Payment Gateway</p>
      </footer>

    </div>
  );
}
