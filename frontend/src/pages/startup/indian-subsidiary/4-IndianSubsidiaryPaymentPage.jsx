import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  CreditCard,
  Landmark,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Loader2,
  ArrowLeft,
  ChevronUp,
  ChevronDown,
  Printer,
  ChevronRight,
} from 'lucide-react';
import { BUNDLED_PLANS } from './constants.js';

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

export default function IndianSubsidiaryPaymentPage({
  formData = {},
  orderId = '',
  onBack,
  onChangePlan,
  onPaymentSuccess,
}) {
  const navigate = useNavigate();

  // Selected plan - defaults to Starter / Standard ₹999 matching screenshot
  const activePlanId = formData.packageId || 'starter';
  const currentPlan = useMemo(() => {
    return (
      BUNDLED_PLANS.find((p) => p.id === activePlanId) ||
      BUNDLED_PLANS.find((p) => p.price === 999) ||
      BUNDLED_PLANS[0]
    );
  }, [activePlanId]);

  // Payment navigation tabs: 'upi' | 'card' | 'netbanking'
  const [activeMethod, setActiveMethod] = useState('upi');

  // UPI App selection: 'phonepe' | 'gpay' | 'paytm' | 'other'
  const [selectedUpiApp, setSelectedUpiApp] = useState('phonepe');
  const [customVpa, setCustomVpa] = useState('');

  // Card details state
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  // Net Banking state
  const [selectedBank, setSelectedBank] = useState(POPULAR_BANKS[0].name);

  // Labour Welfare Endowment toggle (₹50 + ₹9 GST = ₹59)
  const [includeLabourWelfare, setIncludeLabourWelfare] = useState(true);

  // Collapsible Taxes & Charges toggle
  const [isTaxesOpen, setIsTaxesOpen] = useState(true);

  // Live countdown timer matching screenshot "14:58 minutes"
  const [timerSeconds, setTimerSeconds] = useState(14 * 60 + 58);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs} minutes`;
  };

  // Processing & success states
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Resolved order number
  const resolvedOrderId = useMemo(() => {
    return (
      orderId ||
      formData.orderNumber ||
      `#ISUB-${Math.floor(100000 + Math.random() * 900000)}`
    );
  }, [orderId, formData.orderNumber]);

  // Pricing math matching screenshot 1:1
  const professionalFee = currentPlan.originalPrice || 1999;
  const onlineDiscount =
    currentPlan.price === 999
      ? 1000
      : (currentPlan.originalPrice || 4999) - currentPlan.price;
  const subTotalAmount = professionalFee - onlineDiscount;

  // Taxes & Charges
  const gstOnProfessionalFee = Math.round(subTotalAmount * 0.18);
  const labourWelfareFee = includeLabourWelfare ? 50 : 0;
  const gstOnLabourWelfare = includeLabourWelfare ? 9 : 0;
  const totalTaxesAndCharges =
    gstOnProfessionalFee + labourWelfareFee + gstOnLabourWelfare;

  // Final Total Amount (₹1,238 with welfare, ₹1,179 without)
  const totalAmount = subTotalAmount + totalTaxesAndCharges;

  // Card input formatters
  const handleCardNumberChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardDetails((prev) => ({ ...prev, number: formatted }));
  };

  const handleExpiryChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      setCardDetails((prev) => ({
        ...prev,
        expiry: `${raw.slice(0, 2)}/${raw.slice(2)}`,
      }));
    } else {
      setCardDetails((prev) => ({ ...prev, expiry: raw }));
    }
  };

  // Submit payment
  const handlePayNow = async () => {
    setErrorMessage('');

    if (activeMethod === 'card') {
      const cleanNum = cardDetails.number.replace(/\s/g, '');
      if (cleanNum.length < 12 || !cardDetails.expiry || cardDetails.cvv.length < 3) {
        setErrorMessage('Please enter complete and valid card details');
        return;
      }
    } else if (activeMethod === 'upi' && selectedUpiApp === 'other') {
      if (!customVpa || !customVpa.includes('@')) {
        setErrorMessage('Please enter a valid UPI ID (e.g. mobile@okhdfcbank)');
        return;
      }
    }

    setIsProcessing(true);

    try {
      await fetch('/api/v1/indian-subsidiary/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: resolvedOrderId,
          paymentMethod: activeMethod.toUpperCase(),
          amount: totalAmount,
          plan: currentPlan.id,
          proposedSubsidiaryName:
            formData.proposedSubsidiaryName || 'Acme Global Tech (India) Private Limited',
          parentCountry: formData.parentCountry || 'United States',
          email: formData.email,
          phone: formData.phone,
        }),
      }).catch(() => null);
    } catch {
      // Continue mock settlement
    }

    setTimeout(() => {
      const generatedTxnId = `BFP-ISUB-${Date.now().toString().slice(-8)}`;
      setTransactionId(generatedTxnId);
      setIsProcessing(false);
      setIsSuccess(true);

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });

      if (onPaymentSuccess) {
        onPaymentSuccess({
          transactionId: generatedTxnId,
          orderId: resolvedOrderId,
          amountPaid: totalAmount,
          method: activeMethod,
          date: new Date().toISOString(),
          proposedSubsidiaryName:
            formData.proposedSubsidiaryName || 'Acme Global Tech (India) Private Limited',
        });
      }
    }, 1400);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 antialiased relative overflow-hidden">
      {/* Festive background confetti */}
      <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
        <span className="absolute top-24 left-16 w-3 h-8 bg-rose-400 rotate-45 rounded-sm" />
        <span className="absolute top-36 left-48 w-2 h-4 bg-purple-400 -rotate-12 rounded-sm" />
        <span className="absolute top-28 right-72 w-2.5 h-6 bg-amber-400 rotate-12 rounded-sm" />
        <span className="absolute top-44 right-32 w-3 h-5 bg-blue-400 -rotate-45 rounded-sm" />
        <span className="absolute bottom-32 left-72 w-2 h-6 bg-emerald-400 rotate-45 rounded-sm" />
      </div>

      {/* TOP BAR */}
      <header className="bg-white border-b border-slate-200/90 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="text-slate-400 hover:text-slate-800 transition p-1 rounded cursor-pointer"
                title="Back"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#FFD200] text-slate-950 font-black text-xs tracking-wider uppercase shadow-2xs">
              <span>BHARAT</span>
              <span className="font-semibold text-slate-900">FILING</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">100% Safe 256-Bit SSL Checkout</span>
            <span className="font-mono text-slate-700 font-bold">{resolvedOrderId}</span>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 relative z-10">
        <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900 tracking-tight mb-6">
          Choose Payment Method
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: PAYMENT OPTIONS */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
            {/* Top Green Banner & Timer */}
            <div className="relative pt-3 px-6 pb-2">
              <div className="flex justify-end">
                <div className="bg-[#22C55E] text-white text-xs font-bold px-4 py-1.5 rounded-t-xl rounded-bl-xl shadow-xs flex items-center gap-1.5">
                  <span>🎉</span>
                  <span>Hooray! ₹500 Discount Unlocked!</span>
                </div>
              </div>

              <div className="mt-2 text-right">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600">
                  <Clock className="w-3.5 h-3.5 text-rose-600 stroke-[2.5]" />
                  <span>
                    ₹{onlineDiscount} discount expires in{' '}
                    <strong className="font-mono font-bold">
                      {formatTimer(timerSeconds)}
                    </strong>
                  </span>
                </span>
              </div>
            </div>

            {/* Inner Split: Vertical Tabs + Tab Body */}
            <div className="grid grid-cols-1 sm:grid-cols-12 border-t border-slate-200/80 min-h-[360px]">
              {/* Vertical Sidebar */}
              <div className="sm:col-span-5 border-r border-slate-200/80 bg-white">
                <div className="p-4 pb-2 text-xs font-bold text-slate-800 tracking-wide">
                  Payment Options
                </div>

                <nav className="divide-y divide-slate-100">
                  {/* Option 1: UPI */}
                  <button
                    type="button"
                    onClick={() => setActiveMethod('upi')}
                    className={`w-full p-4 text-left transition flex items-center justify-between cursor-pointer relative ${
                      activeMethod === 'upi' ? 'bg-slate-50/80' : 'hover:bg-slate-50/50'
                    }`}
                  >
                    {activeMethod === 'upi' && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#002B49]" />
                    )}
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded flex items-center justify-center shrink-0 mt-0.5 text-slate-700">
                        <svg className="w-5 h-5 text-slate-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polygon points="12 2 2 22 22 22" />
                        </svg>
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-bold text-slate-900">UPI</h4>
                        <p className="text-[11px] text-slate-500 leading-tight">
                          Gpay, PhonePe, Paytm &amp; more
                        </p>
                      </div>
                    </div>
                    {activeMethod === 'upi' && (
                      <ChevronRight className="w-4 h-4 text-[#002B49] stroke-[2.5]" />
                    )}
                  </button>

                  {/* Option 2: Credit/Debit/ATM Card */}
                  <button
                    type="button"
                    onClick={() => setActiveMethod('card')}
                    className={`w-full p-4 text-left transition flex items-center justify-between cursor-pointer relative ${
                      activeMethod === 'card' ? 'bg-slate-50/80' : 'hover:bg-slate-50/50'
                    }`}
                  >
                    {activeMethod === 'card' && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#002B49]" />
                    )}
                    <div className="flex items-start gap-3">
                      <CreditCard className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-bold text-slate-900">
                          Credit/Debit/ATM Card
                        </h4>
                        <p className="text-[11px] text-slate-500 leading-tight">
                          Visa, MasterCard, Rupay &amp; more
                        </p>
                      </div>
                    </div>
                    {activeMethod === 'card' && (
                      <ChevronRight className="w-4 h-4 text-[#002B49] stroke-[2.5]" />
                    )}
                  </button>

                  {/* Option 3: Net Banking */}
                  <button
                    type="button"
                    onClick={() => setActiveMethod('netbanking')}
                    className={`w-full p-4 text-left transition flex items-center justify-between cursor-pointer relative ${
                      activeMethod === 'netbanking' ? 'bg-slate-50/80' : 'hover:bg-slate-50/50'
                    }`}
                  >
                    {activeMethod === 'netbanking' && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#002B49]" />
                    )}
                    <div className="flex items-start gap-3">
                      <Landmark className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-bold text-slate-900">
                          Net Banking
                        </h4>
                        <p className="text-[11px] text-slate-500 leading-tight">
                          Pay using all Indian banks
                        </p>
                      </div>
                    </div>
                    {activeMethod === 'netbanking' && (
                      <ChevronRight className="w-4 h-4 text-[#002B49] stroke-[2.5]" />
                    )}
                  </button>
                </nav>
              </div>

              {/* Active Tab Content */}
              <div className="sm:col-span-7 p-6 flex flex-col justify-between">
                {/* UPI Tab */}
                {activeMethod === 'upi' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        Pay with UPI
                      </h3>
                      <p className="text-xs text-slate-500 mt-2">
                        Select UPI App
                      </p>
                    </div>

                    <div className="grid grid-cols-4 gap-3 text-center">
                      {/* Google Pay */}
                      <button
                        type="button"
                        onClick={() => setSelectedUpiApp('gpay')}
                        className="flex flex-col items-center gap-1.5 cursor-pointer group"
                      >
                        <div
                          className={`w-12 h-12 rounded-full border flex items-center justify-center transition shadow-2xs ${
                            selectedUpiApp === 'gpay'
                              ? 'border-blue-600 ring-2 ring-blue-600 bg-white'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <span className="font-black text-xs">
                            <span className="text-blue-500">G</span>
                            <span className="text-red-500">o</span>
                            <span className="text-amber-500">o</span>
                            <span className="text-blue-500">g</span>
                            <span className="text-green-500">l</span>
                            <span className="text-red-500">e</span>
                          </span>
                        </div>
                        <span className="text-[11px] font-medium text-slate-700">
                          Google pay
                        </span>
                      </button>

                      {/* PhonePe */}
                      <button
                        type="button"
                        onClick={() => setSelectedUpiApp('phonepe')}
                        className="flex flex-col items-center gap-1.5 cursor-pointer group"
                      >
                        <div
                          className={`w-12 h-12 rounded-full border flex items-center justify-center transition shadow-2xs relative ${
                            selectedUpiApp === 'phonepe'
                              ? 'border-[#002B49] ring-2 ring-[#002B49] bg-white'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-full bg-[#5F259F] text-white font-extrabold text-sm flex items-center justify-center">
                            पे
                          </div>
                          {selectedUpiApp === 'phonepe' && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#002B49] text-white flex items-center justify-center">
                              <CheckCircle2 className="w-3.5 h-3.5 text-white stroke-[3]" />
                            </div>
                          )}
                        </div>
                        <span className="text-[11px] font-bold text-slate-900">
                          PhonePe
                        </span>
                      </button>

                      {/* Paytm */}
                      <button
                        type="button"
                        onClick={() => setSelectedUpiApp('paytm')}
                        className="flex flex-col items-center gap-1.5 cursor-pointer group"
                      >
                        <div
                          className={`w-12 h-12 rounded-full border flex items-center justify-center transition shadow-2xs ${
                            selectedUpiApp === 'paytm'
                              ? 'border-blue-600 ring-2 ring-blue-600 bg-white'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <span className="font-black text-xs text-[#002970]">
                            pay<span className="text-[#00BAF2]">tm</span>
                          </span>
                        </div>
                        <span className="text-[11px] font-medium text-slate-700">
                          Paytm
                        </span>
                      </button>

                      {/* Other UPI */}
                      <button
                        type="button"
                        onClick={() => setSelectedUpiApp('other')}
                        className="flex flex-col items-center gap-1.5 cursor-pointer group"
                      >
                        <div
                          className={`w-12 h-12 rounded-full border flex items-center justify-center transition shadow-2xs ${
                            selectedUpiApp === 'other'
                              ? 'border-blue-600 ring-2 ring-blue-600 bg-white'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <span className="font-extrabold text-[10px] text-slate-700 tracking-wider">
                            UPI
                          </span>
                        </div>
                        <span className="text-[11px] font-medium text-slate-700">
                          Other UPI ID
                        </span>
                      </button>
                    </div>

                    {selectedUpiApp === 'other' ? (
                      <div className="space-y-1.5 pt-2 animate-in fade-in">
                        <label className="text-xs font-semibold text-slate-700">
                          Enter your UPI Virtual Payment Address (VPA)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 7668976193@ybl or mobile@okhdfcbank"
                          value={customVpa}
                          onChange={(e) => setCustomVpa(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500 pt-2">
                        {selectedUpiApp === 'phonepe' &&
                          'Pay through the PhonePe pay app on your phone'}
                        {selectedUpiApp === 'gpay' &&
                          'Pay through the Google Pay app on your phone'}
                        {selectedUpiApp === 'paytm' &&
                          'Pay through the Paytm app on your phone'}
                      </p>
                    )}
                  </div>
                )}

                {/* Card Tab */}
                {activeMethod === 'card' && (
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-slate-900">
                      Card Payment
                    </h3>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          maxLength={19}
                          placeholder="4532 •••• •••• 8910"
                          value={cardDetails.number}
                          onChange={handleCardNumberChange}
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Name on Card
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Johnathan Smith"
                          value={cardDetails.name}
                          onChange={(e) =>
                            setCardDetails((prev) => ({ ...prev, name: e.target.value }))
                          }
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            maxLength={5}
                            placeholder="MM/YY"
                            value={cardDetails.expiry}
                            onChange={handleExpiryChange}
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-600"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            CVV
                          </label>
                          <input
                            type="password"
                            maxLength={4}
                            placeholder="•••"
                            value={cardDetails.cvv}
                            onChange={(e) =>
                              setCardDetails((prev) => ({
                                ...prev,
                                cvv: e.target.value.replace(/\D/g, '').slice(0, 4),
                              }))
                            }
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-600"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Net Banking Tab */}
                {activeMethod === 'netbanking' && (
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-slate-900">
                      Net Banking
                    </h3>

                    <div className="grid grid-cols-2 gap-2.5">
                      {POPULAR_BANKS.map((b) => (
                        <button
                          key={b.code}
                          type="button"
                          onClick={() => setSelectedBank(b.name)}
                          className={`p-2.5 rounded-xl border text-left transition cursor-pointer flex items-center gap-2 ${
                            selectedBank === b.name
                              ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-600 font-bold'
                              : 'border-slate-200 bg-white hover:bg-slate-50'
                          }`}
                        >
                          <span>{b.icon}</span>
                          <span className="text-xs">{b.name}</span>
                        </button>
                      ))}
                    </div>

                    <div className="pt-1">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        All Banks
                      </label>
                      <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                      >
                        {ALL_NET_BANKS.map((bankName) => (
                          <option key={bankName} value={bankName}>
                            {bankName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {errorMessage && (
                  <div className="mt-4 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-semibold">
                    {errorMessage}
                  </div>
                )}

                {/* Main Action Button */}
                <div className="mt-8 pt-4">
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={handlePayNow}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#002B49] hover:bg-[#001D32] text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2 uppercase"
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

          {/* RIGHT COLUMN: PRICE DETAILS */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-5">
            <div className="text-center pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                Indian Subsidiary Registration
              </h3>
            </div>

            <div className="flex items-center gap-2 text-slate-700 font-bold text-sm">
              <div className="w-5 h-5 rounded-full border border-slate-400 flex items-center justify-center text-xs">
                ₹
              </div>
              <span>Price details</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center text-slate-700">
                <span>Professional Fees</span>
                <span className="font-bold text-slate-900">
                  ₹{professionalFee.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex justify-between items-center text-emerald-600 font-semibold">
                <span>Online Discount</span>
                <span>-₹{onlineDiscount.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between items-center text-slate-900 font-bold pt-1">
                <span>Sub Total Amount</span>
                <span>₹{subTotalAmount.toLocaleString('en-IN')}</span>
              </div>

              {/* Taxes & Charges Collapsible */}
              <div className="pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsTaxesOpen(!isTaxesOpen)}
                  className="w-full flex justify-between items-center text-slate-700 hover:text-slate-900 cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 font-bold">
                    {isTaxesOpen ? (
                      <ChevronUp className="w-3.5 h-3.5 text-slate-600" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-600" />
                    )}
                    <span>Taxes &amp; Charges</span>
                  </div>
                  <span className="font-bold text-slate-900">
                    ₹{totalTaxesAndCharges.toLocaleString('en-IN')}
                  </span>
                </button>

                {isTaxesOpen && (
                  <div className="mt-2.5 space-y-2 pl-5 text-slate-500 text-[11px] animate-in fade-in">
                    <div className="flex justify-between items-center">
                      <span>GST on professional fee (18%)</span>
                      <span className="font-medium text-slate-700">
                        ₹{gstOnProfessionalFee.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span>Labour Welfare Endowment</span>
                        {includeLabourWelfare ? (
                          <button
                            type="button"
                            onClick={() => setIncludeLabourWelfare(false)}
                            className="px-2 py-0.5 rounded border border-rose-400 text-rose-500 hover:bg-rose-50 text-[10px] font-bold cursor-pointer transition"
                          >
                            Remove
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setIncludeLabourWelfare(true)}
                            className="px-2 py-0.5 rounded border border-emerald-500 text-emerald-600 hover:bg-emerald-50 text-[10px] font-bold cursor-pointer transition"
                          >
                            Add
                          </button>
                        )}
                      </div>
                      <span className="font-medium text-slate-700">
                        ₹{labourWelfareFee.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {includeLabourWelfare && (
                      <div className="flex justify-between items-center">
                        <span>GST on labour welfare (18%)</span>
                        <span className="font-medium text-slate-700">
                          ₹{gstOnLabourWelfare.toLocaleString('en-IN')}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Total Amount */}
              <div className="pt-4 border-t border-slate-200 flex justify-between items-baseline">
                <span className="text-base font-bold text-slate-900">
                  Total Amount
                </span>
                <span className="text-2xl font-black text-slate-950 tracking-tight">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-slate-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Bank-Grade 256-Bit SSL Encrypted Payment</span>
            </div>
          </div>
        </div>
      </main>

      {/* SUCCESS MODAL */}
      {isSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 max-h-[92vh] overflow-y-auto">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-md">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Payment Successful!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Your Indian Subsidiary registration application has been
                officially submitted to our Cross-Border Corporate Law Wing.
              </p>
            </div>

            <div className="mt-6 p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5 text-xs">
              <div className="flex justify-between items-center pb-2.5 border-b border-slate-200">
                <span className="text-slate-500">Order Number</span>
                <strong className="font-mono text-slate-900 text-sm">
                  {resolvedOrderId}
                </strong>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-500">Transaction ID</span>
                <strong className="font-mono text-slate-900">
                  {transactionId}
                </strong>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-500">Entity Structure</span>
                <span className="font-bold text-slate-900">
                  Indian Subsidiary (Wholly Owned Subsidiary / FDI)
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-500">Proposed Name</span>
                <span className="font-bold text-slate-900">
                  {formData.proposedSubsidiaryName || 'Acme Global Tech (India) Private Limited'}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-500">Parent Entity Country</span>
                <span className="font-semibold text-slate-900">
                  {formData.parentCountry || 'United States'}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-500">Amount Paid</span>
                <strong className="text-emerald-700 font-extrabold text-sm">
                  ₹{totalAmount.toLocaleString('en-IN')} (Paid)
                </strong>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-500">Assigned Legal Lead</span>
                <span className="font-semibold text-slate-800">
                  CS Ananya Sen (Cross-Border Corporate Law Specialist, ICSI)
                </span>
              </div>
            </div>

            {/* Next Steps */}
            <div className="mt-5 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                What Happens Next?
              </h4>
              <div className="space-y-1.5 text-xs text-slate-700">
                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    1
                  </div>
                  <span>
                    CS Ananya Sen will reach out within 15 mins to review Parent Entity apostille documents.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    2
                  </div>
                  <span>
                    Class-3 DSC issuance &amp; RUN-MCA name reservation with RoC.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    3
                  </div>
                  <span>
                    Certificate of Incorporation (COI), PAN, TAN, and RBI FC-GPR filing guidance.
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 py-3 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 font-bold text-xs text-slate-700 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Tax Invoice</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  localStorage.removeItem('bharatfiling_subsidiary_draft');
                  navigate('/dashboard');
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-[#002B49] hover:bg-[#001D32] text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Go to Client Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
