import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Sparkles,
  Printer,
  Check,
  QrCode,
  Tag,
  Building2,
  Users,
  Smartphone,
  ChevronDown,
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

export default function LLPPaymentPage({
  formData = {},
  orderId = '',
  onBack,
  onChangePlan,
  onPaymentSuccess,
}) {
  const navigate = useNavigate();

  // Resolve active plan based on formData.packageId or default to 'standard' (₹2,499)
  const activePlanId = formData.packageId || 'standard';
  const currentPlan = useMemo(() => {
    return (
      BUNDLED_PLANS.find((p) => p.id === activePlanId) || BUNDLED_PLANS[1]
    );
  }, [activePlanId]);

  // Payment method state
  const [activeMethod, setActiveMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking' | 'emi'
  const [selectedUpiApp, setSelectedUpiApp] = useState('phonepe');
  const [customVpa, setCustomVpa] = useState('');
  const [showQrCode, setShowQrCode] = useState(false);

  // Card details state
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  // Bank selection state
  const [selectedBank, setSelectedBank] = useState(POPULAR_BANKS[0].name);

  // EMI tenure state
  const [selectedEmiTenure, setSelectedEmiTenure] = useState(3);

  // Coupon state matching Partnership module
  const [couponCode, setCouponCode] = useState('FESTIVE500');
  const [couponApplied, setCouponApplied] = useState(true);
  const [couponDiscount, setCouponDiscount] = useState(500);

  // Labour Welfare Endowment optional charge (₹50 + ₹9 GST = ₹59)
  const [includeLabourWelfare, setIncludeLabourWelfare] = useState(true);

  // Processing & completion states
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Resolved order identifier
  const resolvedOrderId = useMemo(() => {
    return (
      orderId ||
      formData.orderNumber ||
      `#LLP-${Math.floor(100000 + Math.random() * 900000)}`
    );
  }, [orderId, formData.orderNumber]);

  // Price calculations
  const basePrice = currentPlan.price;
  const grossFee = basePrice;
  const appliedDiscount = couponApplied ? couponDiscount : 0;
  const discountedSubtotal = Math.max(0, grossFee - appliedDiscount);

  const gst18Percent = Math.round(discountedSubtotal * 0.18);
  const labourWelfareCharge = includeLabourWelfare ? 50 : 0;
  const labourWelfareGst = includeLabourWelfare ? 9 : 0;
  const totalAmountPayable =
    discountedSubtotal + gst18Percent + labourWelfareCharge + labourWelfareGst;

  // Monthly EMI estimation
  const monthlyEmi = useMemo(() => {
    const principal = totalAmountPayable;
    const rate = 0.14 / 12; // 14% annual interest rate
    const n = selectedEmiTenure;
    const emi =
      (principal * rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1);
    return Math.round(emi);
  }, [totalAmountPayable, selectedEmiTenure]);

  // Handle coupon application
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setErrorMessage('');
    const clean = couponCode.trim().toUpperCase();
    if (clean === 'FESTIVE500' || clean === 'LLP500' || clean === 'STARTUP500') {
      setCouponApplied(true);
      setCouponDiscount(500);
    } else if (clean === 'DIWALI20' || clean === 'BHARAT20') {
      setCouponApplied(true);
      setCouponDiscount(Math.round(basePrice * 0.2));
    } else {
      setCouponApplied(false);
      setCouponDiscount(0);
      setErrorMessage('Invalid coupon code. Try FESTIVE500');
    }
  };

  const handleRemoveCoupon = () => {
    setCouponApplied(false);
    setCouponDiscount(0);
    setCouponCode('');
  };

  // Card input formatting
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

  // Submit payment handler
  const handlePayNow = async () => {
    setErrorMessage('');

    // Basic validation
    if (activeMethod === 'card') {
      const cleanNum = cardDetails.number.replace(/\s/g, '');
      if (cleanNum.length < 12 || !cardDetails.expiry || cardDetails.cvv.length < 3) {
        setErrorMessage('Please enter complete and valid card details');
        return;
      }
    } else if (activeMethod === 'upi' && selectedUpiApp === 'other') {
      if (!customVpa || !customVpa.includes('@')) {
        setErrorMessage('Please enter a valid UPI ID (e.g., yourname@okhdfcbank)');
        return;
      }
    }

    setIsProcessing(true);

    try {
      // Attempt backend payment record
      await fetch('/api/v1/llp/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: resolvedOrderId,
          paymentMethod: activeMethod.toUpperCase(),
          amount: totalAmountPayable,
          plan: currentPlan.id,
          proposedLlpName: formData.proposedLlpName || 'Bharat Innovation Tech LLP',
          email: formData.email,
          phone: formData.phone,
        }),
      }).catch(() => null);
    } catch {
      // Continue mock settlement
    }

    setTimeout(() => {
      const generatedTxnId = `BFP-LLP-${Date.now().toString().slice(-8)}`;
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
          amountPaid: totalAmountPayable,
          method: activeMethod,
          date: new Date().toISOString(),
          proposedLlpName:
            formData.proposedLlpName || 'Bharat Innovation Tech LLP',
        });
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] font-sans text-slate-800 antialiased">
      {/* -------------------------------------------------------------
          TOP BRANDED NAVBAR (1:1 with Partnership UI)
      ------------------------------------------------------------- */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="text-slate-500 hover:text-slate-900 transition p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
                title="Back to Plans"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}

            <div className="flex items-center gap-2">
              <span className="bg-[#FFD200] text-slate-950 px-2.5 py-1 rounded font-black text-xs sm:text-sm tracking-wider uppercase">
                BHARAT
              </span>
              <span className="font-extrabold text-[#002244] text-xs sm:text-sm tracking-tight">
                FILING
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Safe 256-Bit SSL Checkout</span>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">
                Order ID
              </span>
              <span className="font-mono text-xs font-bold text-slate-800">
                {resolvedOrderId}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* -------------------------------------------------------------
          MAIN CHECKOUT DESK (1:1 with Partnership UI)
      ------------------------------------------------------------- */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1528] tracking-tight">
            Choose Payment Method
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Official Limited Liability Partnership (LLP) Filing Desk • Ministry of Corporate Affairs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* =========================================================
              LEFT COLUMN: PAYMENT OPTIONS (7 cols)
          ========================================================= */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            {/* Payment Method Selector Tabs */}
            <div className="grid grid-cols-4 border-b border-slate-200 bg-slate-50/70 text-xs font-bold text-slate-600">
              <button
                type="button"
                onClick={() => setActiveMethod('upi')}
                className={`py-3.5 px-3 flex flex-col sm:flex-row items-center justify-center gap-1.5 border-r border-slate-200 transition cursor-pointer ${
                  activeMethod === 'upi'
                    ? 'bg-white text-[#002B49] border-b-2 border-b-[#002B49] shadow-2xs font-extrabold'
                    : 'hover:bg-slate-100/70 text-slate-600'
                }`}
              >
                <Smartphone className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>UPI / QR</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMethod('card')}
                className={`py-3.5 px-3 flex flex-col sm:flex-row items-center justify-center gap-1.5 border-r border-slate-200 transition cursor-pointer ${
                  activeMethod === 'card'
                    ? 'bg-white text-[#002B49] border-b-2 border-b-[#002B49] shadow-2xs font-extrabold'
                    : 'hover:bg-slate-100/70 text-slate-600'
                }`}
              >
                <CreditCard className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Cards</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMethod('netbanking')}
                className={`py-3.5 px-3 flex flex-col sm:flex-row items-center justify-center gap-1.5 border-r border-slate-200 transition cursor-pointer ${
                  activeMethod === 'netbanking'
                    ? 'bg-white text-[#002B49] border-b-2 border-b-[#002B49] shadow-2xs font-extrabold'
                    : 'hover:bg-slate-100/70 text-slate-600'
                }`}
              >
                <Landmark className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Net Banking</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMethod('emi')}
                className={`py-3.5 px-3 flex flex-col sm:flex-row items-center justify-center gap-1.5 transition cursor-pointer ${
                  activeMethod === 'emi'
                    ? 'bg-white text-[#002B49] border-b-2 border-b-[#002B49] shadow-2xs font-extrabold'
                    : 'hover:bg-slate-100/70 text-slate-600'
                }`}
              >
                <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                <span>EMI</span>
              </button>
            </div>

            {/* Tab Body */}
            <div className="p-6">
              {/* ---------------------------------------------------
                  TAB 1: UPI & QR CODE
              --------------------------------------------------- */}
              {activeMethod === 'upi' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1">
                      Pay via Instant UPI
                    </h3>
                    <p className="text-xs text-slate-500">
                      Scan QR or approve payment request on your UPI app
                    </p>
                  </div>

                  {/* UPI Apps Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'phonepe', name: 'PhonePe', color: 'bg-purple-50 text-purple-700 border-purple-200' },
                      { id: 'gpay', name: 'Google Pay', color: 'bg-blue-50 text-blue-700 border-blue-200' },
                      { id: 'paytm', name: 'Paytm', color: 'bg-sky-50 text-sky-700 border-sky-200' },
                      { id: 'other', name: 'Other UPI ID', color: 'bg-slate-50 text-slate-700 border-slate-200' },
                    ].map((app) => (
                      <button
                        key={app.id}
                        type="button"
                        onClick={() => setSelectedUpiApp(app.id)}
                        className={`p-3 rounded-xl border text-center transition cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                          selectedUpiApp === app.id
                            ? `${app.color} ring-2 ring-offset-1 ring-blue-600 font-bold shadow-2xs`
                            : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <Smartphone className="w-5 h-5" />
                        <span className="text-xs">{app.name}</span>
                      </button>
                    ))}
                  </div>

                  {/* QR Toggle Button */}
                  <div className="p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700">
                        <QrCode className="w-6 h-6 text-slate-800" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">
                          Scan BharatFiling Dynamic UPI QR
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          Works with Any UPI App (BHIM, Cred, Amazon Pay)
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowQrCode(!showQrCode)}
                      className="px-4 py-2 rounded-lg bg-[#002B49] text-white text-xs font-bold hover:bg-[#001D32] transition cursor-pointer shrink-0"
                    >
                      {showQrCode ? 'Hide QR Code' : 'Show QR Code'}
                    </button>
                  </div>

                  {/* Dynamic QR Display */}
                  {showQrCode && (
                    <div className="p-6 bg-slate-900 rounded-2xl text-center text-white space-y-3 animate-in fade-in">
                      <div className="inline-block p-4 bg-white rounded-xl shadow-lg">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=bharatfiling@icici%26pn=BharatFiling%20LLP%26am=${totalAmountPayable}%26cu=INR`}
                          alt="BharatFiling UPI QR"
                          className="w-40 h-40 mx-auto"
                        />
                      </div>
                      <p className="text-xs text-slate-300">
                        Scan with PhonePe / GPay / Paytm to pay{' '}
                        <strong className="text-[#FFD200]">
                          ₹{totalAmountPayable.toLocaleString('en-IN')}
                        </strong>
                      </p>
                    </div>
                  )}

                  {/* Custom UPI input */}
                  {selectedUpiApp === 'other' && (
                    <div className="space-y-1.5 animate-in fade-in">
                      <label className="text-xs font-bold text-slate-700">
                        Enter UPI Virtual Payment Address (VPA)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. mobile@okaxis or user@ybl"
                        value={customVpa}
                        onChange={(e) => setCustomVpa(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* ---------------------------------------------------
                  TAB 2: DEBIT / CREDIT CARDS
              --------------------------------------------------- */}
              {activeMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1">
                      Credit / Debit Card
                    </h3>
                    <p className="text-xs text-slate-500">
                      All major Indian and International cards accepted (Visa, Mastercard, RuPay, Amex)
                    </p>
                  </div>

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
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Yash Upadhyay"
                        value={cardDetails.name}
                        onChange={(e) =>
                          setCardDetails((prev) => ({ ...prev, name: e.target.value }))
                        }
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          CVV / CVC
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
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------
                  TAB 3: NET BANKING
              --------------------------------------------------- */}
              {activeMethod === 'netbanking' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1">
                      Popular Indian Banks
                    </h3>
                    <p className="text-xs text-slate-500">
                      Direct corporate and retail netbanking integration
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {POPULAR_BANKS.map((b) => (
                      <button
                        key={b.code}
                        type="button"
                        onClick={() => setSelectedBank(b.name)}
                        className={`p-3 rounded-xl border text-left transition cursor-pointer flex items-center gap-2.5 ${
                          selectedBank === b.name
                            ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-600 font-bold text-blue-900 shadow-2xs'
                            : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <span className="text-lg">{b.icon}</span>
                        <span className="text-xs leading-tight">{b.name}</span>
                      </button>
                    ))}
                  </div>

                  <div className="pt-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Or Select from All Banks
                    </label>
                    <div className="relative">
                      <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        {ALL_NET_BANKS.map((bankName) => (
                          <option key={bankName} value={bankName}>
                            {bankName}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-3.5 pointer-events-none" />
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------
                  TAB 4: EMI
              --------------------------------------------------- */}
              {activeMethod === 'emi' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1">
                      Easy Monthly Installments (EMI)
                    </h3>
                    <p className="text-xs text-slate-500">
                      No cost &amp; low interest EMI available via Credit Cards
                    </p>
                  </div>

                  <div className="space-y-2">
                    {[
                      { months: 3, label: '3 Months Plan', badge: 'Zero Cost' },
                      { months: 6, label: '6 Months Plan', badge: 'Standard' },
                      { months: 9, label: '9 Months Plan', badge: 'Flexible' },
                      { months: 12, label: '12 Months Plan', badge: 'Lowest EMI' },
                    ].map((plan) => (
                      <button
                        key={plan.months}
                        type="button"
                        onClick={() => setSelectedEmiTenure(plan.months)}
                        className={`w-full p-3.5 rounded-xl border text-left transition cursor-pointer flex items-center justify-between ${
                          selectedEmiTenure === plan.months
                            ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-600'
                            : 'border-slate-200 bg-white hover:bg-slate-50'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900">
                              {plan.label}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-800">
                              {plan.badge}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-500">
                            14% p.a. standard bank rate
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-extrabold text-[#002B49]">
                            ₹{Math.round(totalAmountPayable / plan.months).toLocaleString('en-IN')}/mo
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Error Alert */}
              {errorMessage && (
                <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700">
                  {errorMessage}
                </div>
              )}

              {/* Pay Now Button */}
              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handlePayNow}
                  className="w-full py-4 px-6 rounded-xl bg-[#002B49] hover:bg-[#001D32] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Connecting Bank Gateway...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-[#FFD200]" />
                      <span>
                        Pay ₹{totalAmountPayable.toLocaleString('en-IN')} Securely
                      </span>
                    </>
                  )}
                </button>
                <div className="mt-2.5 flex items-center justify-center gap-4 text-[11px] text-slate-400">
                  <span>256-Bit SSL Encryption</span>
                  <span>•</span>
                  <span>PCI-DSS Compliant</span>
                  <span>•</span>
                  <span>Instant RoC Tracking</span>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================
              RIGHT COLUMN: ORDER SUMMARY (5 cols)
          ========================================================= */}
          <div className="lg:col-span-5 space-y-5">
            {/* Order Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    LLP Incorporation
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 mt-0.5">
                    {currentPlan.name}
                  </h3>
                </div>
                {onChangePlan && (
                  <button
                    type="button"
                    onClick={onChangePlan}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 transition cursor-pointer"
                  >
                    Change
                  </button>
                )}
              </div>

              {/* Form Details Preview */}
              <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Proposed LLP:</span>
                  <strong className="text-slate-900 font-semibold">
                    {formData.proposedLlpName || 'Bharat Innovation Tech LLP'}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span>Business Age:</span>
                  <strong className="text-slate-900 font-semibold">
                    {formData.businessAge || 'Less than 1 year'}
                  </strong>
                </div>
                {formData.email && (
                  <div className="flex justify-between">
                    <span>Contact:</span>
                    <strong className="text-slate-900 font-semibold">
                      {formData.phone || formData.email}
                    </strong>
                  </div>
                )}
              </div>

              {/* Coupon Section */}
              <div className="pt-1">
                {couponApplied ? (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-emerald-600" />
                      <div className="text-xs">
                        <strong className="text-emerald-900 block font-bold">
                          {couponCode} Applied
                        </strong>
                        <span className="text-emerald-700 text-[11px]">
                          ₹{couponDiscount} discount on professional fee
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="text-xs font-bold text-emerald-800 hover:text-emerald-950 underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter Coupon (e.g. FESTIVE500)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs uppercase font-bold focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>

              {/* Labour Welfare Checkbox */}
              <label className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/60 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeLabourWelfare}
                  onChange={(e) => setIncludeLabourWelfare(e.target.checked)}
                  className="mt-0.5 rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                />
                <div className="text-xs leading-relaxed text-slate-600">
                  <span className="font-bold text-slate-800 block">
                    Labour Welfare Endowment Contribution (₹59)
                  </span>
                  <span>
                    Voluntary contribution towards registered Indian workforce social security.
                  </span>
                </div>
              </label>

              {/* Price Calculation Breakup */}
              <div className="space-y-2.5 pt-3 border-t border-slate-100 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Professional Filing Fee</span>
                  <span className="font-semibold text-slate-800">
                    ₹{basePrice.toLocaleString('en-IN')}
                  </span>
                </div>

                {couponApplied && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount Coupon ({couponCode})</span>
                    <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800">
                    ₹{discountedSubtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>GST (18% on Professional Fee)</span>
                  <span className="font-semibold text-slate-800">
                    ₹{gst18Percent.toLocaleString('en-IN')}
                  </span>
                </div>

                {includeLabourWelfare && (
                  <div className="flex justify-between text-slate-600">
                    <span>Labour Welfare Contribution + GST</span>
                    <span className="font-semibold text-slate-800">₹59</span>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-extrabold text-slate-900 block">
                      Total Payable
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Inclusive of all taxes
                    </span>
                  </div>
                  <span className="text-2xl font-black text-[#002B49]">
                    ₹{totalAmountPayable.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Trust Assurance Card */}
            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 space-y-2 text-xs text-blue-950">
              <div className="flex items-center gap-2 font-bold">
                <ShieldCheck className="w-4 h-4 text-blue-700" />
                <span>BharatFiling 100% Satisfaction Guarantee</span>
              </div>
              <p className="text-[11px] text-blue-800 leading-relaxed">
                Dedicated Company Secretary (CS) and MCA compliance manager assigned
                within 15 minutes of payment. Guaranteed filing with RoC or 100% money back.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* -------------------------------------------------------------
          SUCCESS & TAX INVOICE MODAL
      ------------------------------------------------------------- */}
      {isSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 max-h-[92vh] overflow-y-auto">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-md">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Payment Successful!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Your Limited Liability Partnership (LLP) registration application has been
                officially submitted to our MCA Corporate Compliance Wing.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="mt-6 p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
              <div className="flex justify-between items-center pb-3 border-b border-slate-200">
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
                <span className="text-slate-500">Selected Plan</span>
                <span className="font-bold text-slate-900">
                  {currentPlan.name}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-500">Proposed LLP Name</span>
                <span className="font-bold text-slate-900">
                  {formData.proposedLlpName || 'Bharat Innovation Tech LLP'}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-500">Amount Paid</span>
                <strong className="text-emerald-700 font-extrabold text-sm">
                  ₹{totalAmountPayable.toLocaleString('en-IN')} (Paid)
                </strong>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-500">Assigned MCA Specialist</span>
                <span className="font-semibold text-slate-800">
                  CS Priya Sharma (Senior Corporate Compliance Lead)
                </span>
              </div>
            </div>

            {/* Next Steps */}
            <div className="mt-6 space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                What Happens Next?
              </h4>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    1
                  </div>
                  <span>
                    CS Priya Sharma will call/WhatsApp you within 15 mins to verify partner PAN &amp; Aadhaar KYC.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    2
                  </div>
                  <span>
                    Issuance of Class-3 DSC and RUN-LLP name reservation with Ministry of Corporate Affairs.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    3
                  </div>
                  <span>
                    Certificate of Incorporation (COI) + LLPIN + PAN/TAN delivered in 7-10 business days.
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
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
                  localStorage.removeItem('bharatfiling_llp_draft');
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
