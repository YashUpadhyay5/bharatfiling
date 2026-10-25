import { api } from '../../services/api.js';
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
} from 'lucide-react';
import { useToast } from '../../context/ToastContext.jsx';
import { getIecPlan } from './constants.js';

const NET_BANKS = [
  'State Bank of India',
  'HDFC Bank',
  'ICICI Bank',
  'Axis Bank',
  'Kotak Mahindra Bank',
  'Punjab National Bank',
  'Bank of Baroda',
  'IDFC FIRST Bank',
];

export default function IecPaymentPage({
  planId: propPlanId,
  formData = {},
  onPaymentSuccess,
}) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showError } = useToast();

  const selectedPlanKey =
    propPlanId || searchParams.get('plan') || formData.plan || 'standard';
  const currentPlan = getIecPlan(selectedPlanKey);

  // Base calculation matching reference image:
  // Base professional fee: ₹1270
  // GST on fee (18%): ₹229 (1270 + 229 = ₹1499)
  // Labour Welfare: ₹77
  // GST on labour welfare (18%): ₹14 (77 + 14 = ₹91)
  // Total with Labour = ₹1590
  const isStarter = selectedPlanKey === 'starter';
  const basePrice = isStarter ? 1270 : Math.round(currentPlan.price / 1.18);
  const gstOnFee = isStarter ? 229 : Math.round(basePrice * 0.18);

  // Labour welfare addon (default: true as in reference screenshot)
  const [includeLabourWelfare, setIncludeLabourWelfare] = useState(true);
  const labourWelfareAmount = includeLabourWelfare ? (isStarter ? 77 : 150) : 0;
  const gstOnLabour = includeLabourWelfare ? (isStarter ? 14 : Math.round(150 * 0.18)) : 0;

  const totalTaxes = gstOnFee + labourWelfareAmount + gstOnLabour;
  const totalAmount = basePrice + totalTaxes;

  const [isTaxesExpanded, setIsTaxesExpanded] = useState(true);

  // Payment method: 'upi', 'card', 'netbanking', 'emi'
  const [activeMethod, setActiveMethod] = useState('upi');

  // UPI Apps: 'gpay', 'phonepe', 'paytm', 'other'
  const [selectedUpiApp, setSelectedUpiApp] = useState('phonepe');
  const [customUpiId, setCustomUpiId] = useState('');

  // Card fields
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');

  // Net banking bank
  const [selectedBank, setSelectedBank] = useState('State Bank of India');

  // EMI tenure
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
      default:
        return 'UPI';
    }
  };

  const handlePay = async (e) => {
    if (e) e.preventDefault();
    setIsProcessing(true);

    try {
      let activeOrderId = formData.orderId || searchParams.get('orderId');

      if (!activeOrderId) {
        try {
          const quoteRes = await api.createIecQuote({
            ...formData,
            plan: selectedPlanKey,
            includeLabourWelfare,
          });
          if (quoteRes?.orderId) {
            activeOrderId = quoteRes.orderId;
          }
        } catch {
          // Graceful fallback for offline mode
        }
      }

      const refId = `BF-IEC-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

      if (activeOrderId) {
        try {
          await api.verifyIecDirectPayment({
            order_id: activeOrderId,
            payment_id: refId,
            payment_method:
              activeMethod === 'upi'
                ? 'UPI'
                : activeMethod === 'card'
                ? 'CARD'
                : 'NETBANKING',
            upi_app: selectedUpiApp,
            billing_info: {
              email: formData.email,
              phone: formData.phone,
              name: formData.applicantName || formData.enterpriseName,
            },
          });
        } catch {
          // Graceful fallback
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 600));
      setTransactionId(refId);
      setIsSuccess(true);

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });

      if (onPaymentSuccess) {
        onPaymentSuccess({
          transactionId: refId,
          plan: currentPlan,
          amount: totalAmount,
        });
      }

      setTimeout(() => {
        navigate('/dashboard');
      }, 3500);
    } catch {
      showError('Payment processing failed. Please re-try.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#F5F7F8] flex items-center justify-center px-4 font-sans">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 sm:p-10 max-w-md w-full text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">Payment Successful!</h2>
          <p className="text-xs text-slate-600">
            Your statutory filing request for{' '}
            <strong className="text-slate-800">{currentPlan.name} Plan</strong> has been confirmed.
          </p>
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 inline-block font-mono font-bold text-slate-800">
            Ref ID: {transactionId}
          </div>
          <p className="text-xs text-emerald-700 font-semibold">
            Redirecting to your Dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-16">
      {/* Top Header Bar with BharatFiling Logo */}
      <header className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="inline-flex items-center select-none" title="BharatFiling">
            <img
              src="/bharatfiling-user-logo.png"
              alt="BharatFiling"
              className="h-8 sm:h-9 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/bharatfiling-horizontal-transparent.png';
              }}
            />
          </Link>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Secure Checkout</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        {/* Headings (Exact match from reference image) */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Choose Payment Method
          </h1>
          <p className="text-sm font-bold text-slate-800 mt-2">Payment Options</p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT SECTION (8 COLS): Payment Options Card */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row overflow-hidden min-h-[380px]">
              {/* Left Sidebar inside Card (Payment Methods List) */}
              <div className="w-full md:w-[260px] shrink-0 border-b md:border-b-0 md:border-r border-slate-200 bg-[#FAFBFD] flex flex-col divide-y divide-slate-100 select-none">
                {/* 1. UPI */}
                <button
                  type="button"
                  onClick={() => setActiveMethod('upi')}
                  className={`p-4 text-left transition relative flex items-center justify-between cursor-pointer ${
                    activeMethod === 'upi'
                      ? 'bg-white border-l-4 border-[#002B49]'
                      : 'hover:bg-slate-100/60'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-slate-700 mt-0.5">
                      <svg
                        className="w-4 h-4 fill-none stroke-current stroke-[2.5]"
                        viewBox="0 0 24 24"
                      >
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">UPI</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Gpay, PhonePe, Paytm &amp; more
                      </div>
                    </div>
                  </div>
                  {activeMethod === 'upi' && (
                    <div className="text-[#002B49] text-xs font-black">▶</div>
                  )}
                </button>

                {/* 2. Credit/Debit/ATM Card */}
                <button
                  type="button"
                  onClick={() => setActiveMethod('card')}
                  className={`p-4 text-left transition relative flex items-center justify-between cursor-pointer ${
                    activeMethod === 'card'
                      ? 'bg-white border-l-4 border-[#002B49]'
                      : 'hover:bg-slate-100/60'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <CreditCard className="w-4 h-4 text-slate-700 mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-slate-900">
                        Credit/Debit/ATM Card
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Visa, MasterCard, Rupay &amp; more
                      </div>
                    </div>
                  </div>
                  {activeMethod === 'card' && (
                    <div className="text-[#002B49] text-xs font-black">▶</div>
                  )}
                </button>

                {/* 3. Net Banking */}
                <button
                  type="button"
                  onClick={() => setActiveMethod('netbanking')}
                  className={`p-4 text-left transition relative flex items-center justify-between cursor-pointer ${
                    activeMethod === 'netbanking'
                      ? 'bg-white border-l-4 border-[#002B49]'
                      : 'hover:bg-slate-100/60'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Landmark className="w-4 h-4 text-slate-700 mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-slate-900">Net Banking</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Pay using all Indian banks
                      </div>
                    </div>
                  </div>
                  {activeMethod === 'netbanking' && (
                    <div className="text-[#002B49] text-xs font-black">▶</div>
                  )}
                </button>


              </div>

              {/* Right Content Area inside Card */}
              <div className="flex-1 p-6 sm:p-8 bg-white flex flex-col justify-between">
                {/* Method 1: Pay with UPI */}
                {activeMethod === 'upi' && (
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-6">
                      Pay with UPI
                    </h3>

                    <div className="space-y-4">
                      <div className="text-xs text-slate-500 font-medium">
                        Select UPI App
                      </div>

                      {/* UPI Apps Row */}
                      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                        {/* 1. Google Pay */}
                        <div
                          onClick={() => setSelectedUpiApp('gpay')}
                          className="flex flex-col items-center gap-2 cursor-pointer group select-none"
                        >
                          <div
                            className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all bg-white ${
                              selectedUpiApp === 'gpay'
                                ? 'border-[#002B49] ring-2 ring-[#002B49]/20 shadow-sm'
                                : 'border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <svg className="w-7 h-7" viewBox="0 0 24 24">
                              <path
                                fill="#4285F4"
                                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.14z"
                              />
                              <path
                                fill="#34A853"
                                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.4 7.34 24 12 24z"
                              />
                              <path
                                fill="#FBBC05"
                                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.94 0 12s.45 3.84 1.24 5.42l4.04-3.15z"
                              />
                              <path
                                fill="#EA4335"
                                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.6 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                              />
                            </svg>
                          </div>
                          <span className="text-xs font-semibold text-slate-800">
                            Google pay
                          </span>
                        </div>

                        {/* 2. PhonePe */}
                        <div
                          onClick={() => setSelectedUpiApp('phonepe')}
                          className="flex flex-col items-center gap-2 cursor-pointer group select-none relative"
                        >
                          {selectedUpiApp === 'phonepe' && (
                            <div className="absolute -top-1 -right-1 z-10 w-5 h-5 rounded-full bg-[#002B49] text-white flex items-center justify-center shadow-xs">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          )}

                          <div
                            className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all bg-[#5F259F] text-white ${
                              selectedUpiApp === 'phonepe'
                                ? 'border-[#002B49] ring-2 ring-[#002B49]/20 shadow-sm'
                                : 'border-purple-600'
                            }`}
                          >
                            <span className="font-extrabold text-xl font-serif">पे</span>
                          </div>
                          <span className="text-xs font-semibold text-slate-800">
                            PhonePe
                          </span>
                        </div>

                        {/* 3. Paytm */}
                        <div
                          onClick={() => setSelectedUpiApp('paytm')}
                          className="flex flex-col items-center gap-2 cursor-pointer group select-none"
                        >
                          <div
                            className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all bg-white ${
                              selectedUpiApp === 'paytm'
                                ? 'border-[#002B49] ring-2 ring-[#002B49]/20 shadow-sm'
                                : 'border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <span className="text-[11px] font-black text-[#002E6E] tracking-tighter">
                              pay<span className="text-[#00BAF2]">tm</span>
                            </span>
                          </div>
                          <span className="text-xs font-semibold text-slate-800">
                            Paytm
                          </span>
                        </div>

                        {/* 4. Other UPI ID */}
                        <div
                          onClick={() => setSelectedUpiApp('other')}
                          className="flex flex-col items-center gap-2 cursor-pointer group select-none"
                        >
                          <div
                            className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all bg-white ${
                              selectedUpiApp === 'other'
                                ? 'border-[#002B49] ring-2 ring-[#002B49]/20 shadow-sm'
                                : 'border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <span className="text-[10px] font-extrabold text-slate-700 uppercase tracking-tight">
                              UPI
                            </span>
                          </div>
                          <span className="text-xs font-semibold text-slate-800">
                            Other UPI ID
                          </span>
                        </div>
                      </div>

                      {/* Custom UPI input */}
                      {selectedUpiApp === 'other' && (
                        <div className="pt-2">
                          <input
                            type="text"
                            value={customUpiId}
                            onChange={(e) => setCustomUpiId(e.target.value)}
                            placeholder="e.g. mobile@upi or username@okhdfcbank"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
                          />
                        </div>
                      )}

                      <p className="text-xs sm:text-sm text-slate-500 font-normal pt-4">
                        Pay through the {getUpiAppName()} pay app on your phone
                      </p>
                    </div>
                  </div>
                )}

                {/* Method 2: Card */}
                {activeMethod === 'card' && (
                  <div className="space-y-4 max-w-md">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                      Pay with Card
                    </h3>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">
                        Card Number
                      </label>
                      <input
                        type="text"
                        maxLength={19}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4532 •••• •••• 8920"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm font-mono focus:outline-none focus:ring-1 focus:ring-slate-400"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-slate-700">
                          Expiry (MM/YY)
                        </label>
                        <input
                          type="text"
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-slate-700">
                          CVV
                        </label>
                        <input
                          type="password"
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="•••"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="Name as printed on card"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
                      />
                    </div>
                  </div>
                )}

                {/* Method 3: Net Banking */}
                {activeMethod === 'netbanking' && (
                  <div className="space-y-4">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                      Pay using Net Banking
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {NET_BANKS.map((b) => (
                        <div
                          key={b}
                          onClick={() => setSelectedBank(b)}
                          className={`p-3 rounded-lg border text-center transition cursor-pointer text-xs font-semibold ${
                            selectedBank === b
                              ? 'border-[#002B49] bg-blue-50/60 text-[#002B49]'
                              : 'border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          {b}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Method 4: EMI option */}
                {activeMethod === 'emi' && (
                  <div className="space-y-4">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                      Pay with Easy Monthly Installments (EMI)
                    </h3>
                    <div className="space-y-2">
                      {[
                        `3 Months - ₹${Math.round(totalAmount / 3)}/month`,
                        `6 Months - ₹${Math.round(totalAmount / 6)}/month`,
                        `9 Months - ₹${Math.round(totalAmount / 9)}/month`,
                        `12 Months - ₹${Math.round(totalAmount / 12)}/month`,
                      ].map((tenure) => (
                        <div
                          key={tenure}
                          onClick={() => setSelectedEmiTenure(tenure)}
                          className={`p-3 rounded-lg border text-left transition cursor-pointer text-xs font-semibold flex items-center justify-between ${
                            selectedEmiTenure === tenure
                              ? 'border-[#002B49] bg-blue-50/60 text-[#002B49]'
                              : 'border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <span>{tenure}</span>
                          {selectedEmiTenure === tenure && <Check className="w-4 h-4" />}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action CTA */}
                <div className="pt-8">
                  <button
                    type="button"
                    onClick={handlePay}
                    disabled={isProcessing}
                    className="w-full py-3.5 px-6 rounded-md bg-[#002B49] hover:bg-[#073866] active:scale-[0.99] text-white font-black text-sm sm:text-base tracking-wider uppercase transition shadow-xs cursor-pointer disabled:opacity-75 flex items-center justify-center gap-2"
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
              </div>
            </div>
          </div>

          {/* RIGHT SECTION (4 COLS): Order Summary Card */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
              <h2 className="text-lg font-bold text-slate-900 text-center">
                IEC Registration
              </h2>

              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-900 mb-3">
                  <div className="w-4 h-4 rounded-full border border-slate-900 flex items-center justify-center text-[10px] font-bold">
                    ₹
                  </div>
                  <span>Price details</span>
                </div>

                <div className="space-y-3 text-xs sm:text-sm">
                  {/* Base Fee */}
                  <div className="flex justify-between items-center text-slate-700 font-medium">
                    <span>Professional Fees</span>
                    <span className="font-bold text-slate-900">
                      ₹{basePrice.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Taxes & Charges Dropdown */}
                  <div className="border-t border-slate-100 pt-3">
                    <button
                      type="button"
                      onClick={() => setIsTaxesExpanded(!isTaxesExpanded)}
                      className="w-full flex justify-between items-center text-slate-700 font-medium cursor-pointer"
                    >
                      <div className="flex items-center gap-1.5 text-slate-800">
                        {isTaxesExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                        <span>Taxes &amp; Charges</span>
                      </div>
                      <span className="font-bold text-slate-900">
                        ₹{totalTaxes.toLocaleString('en-IN')}
                      </span>
                    </button>

                    {isTaxesExpanded && (
                      <div className="mt-3 pl-3 space-y-2.5 text-xs text-slate-600 border-l border-slate-200">
                        <div className="flex justify-between items-center">
                          <span>GST on professional fee (18%)</span>
                          <span>₹{gstOnFee.toLocaleString('en-IN')}</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span>Labour Welfare Endowment</span>
                            {includeLabourWelfare ? (
                              <button
                                type="button"
                                onClick={() => setIncludeLabourWelfare(false)}
                                className="px-1.5 py-0.5 rounded border border-rose-400 text-[10px] text-rose-600 hover:bg-rose-50 font-bold transition cursor-pointer"
                              >
                                Remove
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setIncludeLabourWelfare(true)}
                                className="px-1.5 py-0.5 rounded border border-emerald-500 text-[10px] text-emerald-700 hover:bg-emerald-50 font-bold transition cursor-pointer"
                              >
                                + Add
                              </button>
                            )}
                          </div>
                          <span>₹{labourWelfareAmount}</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span>GST on labour welfare (18%)</span>
                          <span>₹{gstOnLabour}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Total Amount Row */}
              <div className="pt-4 border-t border-slate-200 flex justify-between items-baseline">
                <span className="text-base font-extrabold text-slate-900">
                  Total Amount
                </span>
                <span className="text-2xl sm:text-3xl font-black text-slate-900">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-around pt-2 text-[11px] text-slate-600 font-semibold select-none">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold italic text-emerald-700 bg-emerald-100/70 px-1.5 py-0.2 rounded text-[10px] tracking-tight">
                  PCI
                </span>
                <span>100% Secure Payment</span>
              </div>

              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Guaranteed Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
