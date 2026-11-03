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

export default function TrustPaymentPage({
  formData = {},
  orderId = '',
  onBack,
  onChangePlan,
  onPaymentSuccess,
}) {
  const navigate = useNavigate();

  // Resolve active plan based on formData.packageId or default to 'standard' (₹9,999)
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
  const [isTaxesOpen, setIsTaxesOpen] = useState(true);

  // 15-minute countdown timer
  const [secondsLeft, setSecondsLeft] = useState(900);

  // Processing & Success State
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 15-min countdown timer
  useEffect(() => {
    if (secondsLeft <= 0 || isSuccess) return;
    const timer = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft, isSuccess]);

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Pricing calculations matching Image 2 (media_1793688203157_972f522c.png)
  const originalFee = currentPlan.originalPrice || (currentPlan.price === 999 ? 1499 : currentPlan.price * 2);
  const planDiscount = currentPlan.discountAmount || (originalFee - currentPlan.price) || (couponApplied ? couponDiscount : 0);
  const subTotalAmount = currentPlan.price || 999;
  const statutoryGst = Math.round(subTotalAmount * 0.18);
  const labourWelfare = includeLabourWelfare ? 50 : 0;
  const gstOnLabour = includeLabourWelfare ? 9 : 0;
  const totalAmountPayable = subTotalAmount + statutoryGst + labourWelfare + gstOnLabour;

  const resolvedOrderId =
    orderId ||
    formData.orderNumber ||
    `#TRST-${Math.floor(100000 + Math.random() * 900000)}`;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode || couponCode.trim().length === 0) return;
    if (
      couponCode.toUpperCase() === 'FESTIVE500' ||
      couponCode.toUpperCase() === 'BHARAT500'
    ) {
      setCouponApplied(true);
      setCouponDiscount(500);
      setErrorMessage('');
    } else {
      setCouponApplied(false);
      setErrorMessage('Invalid coupon code. Try FESTIVE500');
    }
  };

  const handlePay = () => {
    setErrorMessage('');
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
    setTimeout(() => {
      const generatedTxnId = `BFP-TRST-${Date.now().toString().slice(-8)}`;
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
          trustName:
            formData.trustName || 'Vidya Jyoti Educational Trust',
        });
      }
    }, 1800);
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
            Official Public Charitable / Religious Trust Filing Desk
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* =========================================================
              LEFT COLUMN: PAYMENT OPTIONS & SELECTION TABS
          ========================================================= */}
          <div className="lg:col-span-8 bg-white rounded-2xl shadow-sm border border-slate-200/90 overflow-hidden">
            {/* Header & Ribbon */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 px-6 py-4 gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                Payment Options
              </span>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200/60">
                <span>🎉</span>
                <span>Hooray! ₹500 Discount Unlocked!</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 min-h-[440px]">
              {/* Payment Methods Side-Tabs */}
              <div className="md:col-span-5 border-r border-slate-100 bg-slate-50/50 p-3 space-y-2">
                {/* Tab 1: UPI */}
                <button
                  type="button"
                  onClick={() => setActiveMethod('upi')}
                  className={`w-full p-4 rounded-xl text-left transition-all flex items-center justify-between cursor-pointer ${
                    activeMethod === 'upi'
                      ? 'bg-white shadow-sm border border-slate-200 text-[#002244] font-bold border-l-4 border-l-[#002244]'
                      : 'text-slate-600 hover:bg-slate-100/70 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-blue-600" />
                    <div>
                      <span className="block text-sm font-bold">UPI</span>
                      <span className="block text-[11px] text-slate-400 font-normal">
                        Gpay, PhonePe, Paytm &amp; more
                      </span>
                    </div>
                  </div>
                  {activeMethod === 'upi' && (
                    <span className="text-blue-600 font-bold">▸</span>
                  )}
                </button>

                {/* Tab 2: Credit / Debit Card */}
                <button
                  type="button"
                  onClick={() => setActiveMethod('card')}
                  className={`w-full p-4 rounded-xl text-left transition-all flex items-center justify-between cursor-pointer ${
                    activeMethod === 'card'
                      ? 'bg-white shadow-sm border border-slate-200 text-[#002244] font-bold border-l-4 border-l-[#002244]'
                      : 'text-slate-600 hover:bg-slate-100/70 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-indigo-600" />
                    <div>
                      <span className="block text-sm font-bold">
                        Credit/Debit/ATM Card
                      </span>
                      <span className="block text-[11px] text-slate-400 font-normal">
                        Visa, MasterCard, Rupay &amp; more
                      </span>
                    </div>
                  </div>
                  {activeMethod === 'card' && (
                    <span className="text-blue-600 font-bold">▸</span>
                  )}
                </button>

                {/* Tab 3: Net Banking */}
                <button
                  type="button"
                  onClick={() => setActiveMethod('netbanking')}
                  className={`w-full p-4 rounded-xl text-left transition-all flex items-center justify-between cursor-pointer ${
                    activeMethod === 'netbanking'
                      ? 'bg-white shadow-sm border border-slate-200 text-[#002244] font-bold border-l-4 border-l-[#002244]'
                      : 'text-slate-600 hover:bg-slate-100/70 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Landmark className="w-5 h-5 text-amber-600" />
                    <div>
                      <span className="block text-sm font-bold">Net Banking</span>
                      <span className="block text-[11px] text-slate-400 font-normal">
                        Pay using all Indian banks
                      </span>
                    </div>
                  </div>
                  {activeMethod === 'netbanking' && (
                    <span className="text-blue-600 font-bold">▸</span>
                  )}
                </button>
              </div>

              {/* Payment Methods Interactive Form Content */}
              <div className="md:col-span-7 p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  {/* Countdown Timer Alert Bar */}
                  <div className="flex items-center gap-2 text-xs font-bold text-rose-600 bg-rose-50 px-3.5 py-2 rounded-lg border border-rose-100 mb-6">
                    <Clock className="w-4 h-4 animate-pulse" />
                    <span>
                      ₹500 discount expires in{' '}
                      <span className="font-mono text-sm">{formatTimer(secondsLeft)}</span>{' '}
                      minutes
                    </span>
                  </div>

                  {errorMessage && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-600 font-medium mb-4">
                      {errorMessage}
                    </div>
                  )}

                  {/* -------------------- 1. UPI METHOD -------------------- */}
                  {activeMethod === 'upi' && (
                    <div className="space-y-6 animate-in fade-in duration-200">
                      <div>
                        <h3 className="text-base font-bold text-slate-900">
                          Pay with UPI
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Instant verification with zero transaction convenience fee
                        </p>
                      </div>

                      {/* Select UPI App Buttons */}
                      <div className="space-y-2">
                        <span className="text-xs font-semibold text-slate-600 block">
                          Select UPI App
                        </span>
                        <div className="grid grid-cols-4 gap-2.5">
                          {[
                            { id: 'gpay', name: 'Google pay', icon: '🟢' },
                            { id: 'phonepe', name: 'PhonePe', icon: '🟣' },
                            { id: 'paytm', name: 'Paytm', icon: '🔷' },
                            { id: 'other', name: 'Other UPI ID', icon: '⚡' },
                          ].map((app) => (
                            <button
                              key={app.id}
                              type="button"
                              onClick={() => {
                                setSelectedUpiApp(app.id);
                                setShowQrCode(false);
                              }}
                              className={`p-3 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                                selectedUpiApp === app.id
                                  ? 'border-[#002244] bg-blue-50/50 ring-2 ring-[#002244]'
                                  : 'border-slate-200 hover:border-slate-300 bg-white'
                              }`}
                            >
                              <span className="text-xl">{app.icon}</span>
                              <span className="text-[11px] font-bold text-slate-800">
                                {app.name}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Dynamic instruction or custom VPA input */}
                      {selectedUpiApp === 'phonepe' && (
                        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>
                            Pay through the <strong>PhonePe</strong> app on your
                            phone. A collect request will be triggered.
                          </span>
                        </div>
                      )}

                      {selectedUpiApp === 'gpay' && (
                        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>
                            Pay through <strong>Google Pay</strong> using linked
                            bank account or RuPay credit card.
                          </span>
                        </div>
                      )}

                      {selectedUpiApp === 'paytm' && (
                        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>
                            Pay seamlessly via <strong>Paytm UPI</strong> or Paytm
                            Wallet balance.
                          </span>
                        </div>
                      )}

                      {selectedUpiApp === 'other' && (
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Enter Virtual Payment Address (VPA / UPI ID)
                          </label>
                          <input
                            type="text"
                            value={customVpa}
                            onChange={(e) => setCustomVpa(e.target.value)}
                            placeholder="username@okhdfcbank / mobile@upi"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                          />
                        </div>
                      )}

                      {/* QR Code Quick Toggle Option */}
                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={() => setShowQrCode((prev) => !prev)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 cursor-pointer"
                        >
                          <QrCode className="w-4 h-4" />
                          <span>
                            {showQrCode
                              ? 'Hide QR Code'
                              : 'Or scan static UPI QR Code to pay'}
                          </span>
                        </button>

                        {showQrCode && (
                          <div className="mt-3 p-4 bg-white rounded-xl border border-slate-200 text-center space-y-2">
                            <div className="w-36 h-36 mx-auto bg-slate-100 rounded-lg flex items-center justify-center border border-slate-300">
                              <QrCode className="w-24 h-24 text-slate-800" />
                            </div>
                            <p className="text-[11px] text-slate-500 font-medium">
                              Scan with any UPI app • UPI ID:{' '}
                              <code className="font-bold text-slate-800">
                                bharatfiling@icici
                              </code>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* -------------------- 2. CARD METHOD -------------------- */}
                  {activeMethod === 'card' && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                      <div>
                        <h3 className="text-base font-bold text-slate-900">
                          Debit / Credit Card
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          All Indian &amp; International cards accepted with 3D Secure
                          OTP
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Card Number
                          </label>
                          <input
                            type="text"
                            maxLength={19}
                            value={cardDetails.number}
                            onChange={(e) =>
                              setCardDetails({
                                ...cardDetails,
                                number: e.target.value
                                  .replace(/\D/g, '')
                                  .replace(/(.{4})/g, '$1 ')
                                  .trim(),
                              })
                            }
                            placeholder="4532 •••• •••• 8921"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs font-mono font-semibold text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Cardholder Name
                          </label>
                          <input
                            type="text"
                            value={cardDetails.name}
                            onChange={(e) =>
                              setCardDetails({
                                ...cardDetails,
                                name: e.target.value,
                              })
                            }
                            placeholder="Name as printed on card"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              maxLength={5}
                              value={cardDetails.expiry}
                              onChange={(e) =>
                                setCardDetails({
                                  ...cardDetails,
                                  expiry: e.target.value,
                                })
                              }
                              placeholder="MM/YY"
                              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs font-mono font-semibold text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              CVV / CVC
                            </label>
                            <input
                              type="password"
                              maxLength={4}
                              value={cardDetails.cvv}
                              onChange={(e) =>
                                setCardDetails({
                                  ...cardDetails,
                                  cvv: e.target.value,
                                })
                              }
                              placeholder="•••"
                              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs font-mono font-semibold text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* -------------------- 3. NET BANKING -------------------- */}
                  {activeMethod === 'netbanking' && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                      <div>
                        <h3 className="text-base font-bold text-slate-900">
                          Net Banking
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Select from 50+ supported Indian retail and corporate banks
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        {POPULAR_BANKS.map((b) => (
                          <button
                            key={b.code}
                            type="button"
                            onClick={() => setSelectedBank(b.name)}
                            className={`p-3 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1 cursor-pointer ${
                              selectedBank === b.name
                                ? 'border-[#002244] bg-blue-50/50 ring-2 ring-[#002244]'
                                : 'border-slate-200 hover:border-slate-300 bg-white'
                            }`}
                          >
                            <span className="text-lg">{b.icon}</span>
                            <span className="text-[11px] font-bold text-slate-800 truncate w-full">
                              {b.code}
                            </span>
                          </button>
                        ))}
                      </div>

                      <div className="pt-2">
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Or Select Other Bank
                        </label>
                        <select
                          value={selectedBank}
                          onChange={(e) => setSelectedBank(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 cursor-pointer"
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

                {/* Big Action Pay Button */}
                <div className="pt-8">
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={handlePay}
                    className="w-full py-4 px-6 rounded-xl bg-[#002244] hover:bg-[#00172e] text-white font-black text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 transform active:scale-[0.99]"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Verifying with Banking Gateway...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>PAY ₹{totalAmountPayable.toLocaleString('en-IN')}</span>
                      </>
                    )}
                  </button>

                  <div className="mt-3 flex items-center justify-center gap-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>256-Bit Bank Grade Encryption</span>
                    </span>
                    <span>•</span>
                    <span>Instant Order Receipt</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================
              RIGHT COLUMN: ORDER SUMMARY SIDEBAR (1:1 with Partnership UI)
          ========================================================= */}
          <div className="lg:col-span-4 bg-white rounded-2xl shadow-sm border border-slate-200/90 p-6 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-base font-extrabold text-[#0B1528] tracking-tight">
                Trust Registration
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Plan:{' '}
                <strong className="text-slate-800 font-bold">
                  {currentPlan.name}
                </strong>
                {onChangePlan && (
                  <button
                    type="button"
                    onClick={onChangePlan}
                    className="text-blue-600 hover:underline ml-2 cursor-pointer text-[11px] font-semibold"
                  >
                    Change plan
                  </button>
                )}
              </p>
            </div>

            {/* Price Details Breakdown */}
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-slate-700">
                <Tag className="w-3.5 h-3.5 text-blue-600" />
                <span>Price details</span>
              </div>

              <div className="flex items-center justify-between text-slate-600">
                <span>Professional Fees</span>
                <span className="font-semibold text-slate-900">
                  ₹{originalFee.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex items-center justify-between text-emerald-600 font-semibold">
                <span>Online Discount</span>
                <span>-₹{planDiscount.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex items-center justify-between text-slate-800 font-bold pt-2 border-t border-slate-100">
                <span>Sub Total Amount</span>
                <span>₹{subTotalAmount.toLocaleString('en-IN')}</span>
              </div>

              {/* Taxes & Charges Accordion */}
              <div className="pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsTaxesOpen((prev) => !prev)}
                  className="w-full flex items-center justify-between text-slate-700 font-semibold cursor-pointer"
                >
                  <span className="flex items-center gap-1">
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${
                        isTaxesOpen ? 'rotate-180' : ''
                      }`}
                    />
                    <span>Taxes &amp; Charges</span>
                  </span>
                  <span className="font-bold text-slate-900">
                    ₹{(statutoryGst + labourWelfare + gstOnLabour).toLocaleString('en-IN')}
                  </span>
                </button>

                {isTaxesOpen && (
                  <div className="mt-2.5 pl-4 pr-1 space-y-2 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <div className="flex items-center justify-between">
                      <span>GST on professional fee (18%)</span>
                      <span className="font-semibold text-slate-800">
                        ₹{statutoryGst.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span>Labour Welfare Endowment</span>
                        <button
                          type="button"
                          onClick={() =>
                            setIncludeLabourWelfare((prev) => !prev)
                          }
                          className="text-[10px] text-rose-600 font-bold border border-rose-200 px-1.5 py-0.2 rounded hover:bg-rose-50 cursor-pointer"
                        >
                          {includeLabourWelfare ? 'Remove' : 'Add'}
                        </button>
                      </div>
                      <span className="font-semibold text-slate-800">
                        ₹{labourWelfare}
                      </span>
                    </div>

                    {includeLabourWelfare && (
                      <div className="flex items-center justify-between">
                        <span>GST on labour welfare (18%)</span>
                        <span className="font-semibold text-slate-800">
                          ₹{gstOnLabour}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Total Payable Line */}
              <div className="pt-3 border-t-2 border-slate-200 flex items-center justify-between text-sm sm:text-base font-black text-slate-900">
                <span>Total Amount</span>
                <span className="text-xl font-extrabold text-[#002244]">
                  ₹{totalAmountPayable.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Coupon Application Box matching Partnership */}
            <form onSubmit={handleApplyCoupon} className="pt-2 border-t border-slate-100 space-y-2">
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                Apply Promo Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="e.g. FESTIVE500"
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono font-bold uppercase focus:outline-none focus:border-[#002B49]"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {couponApplied && (
                <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Coupon FESTIVE500 applied: ₹500 saved!</span>
                </p>
              )}
            </form>

            {/* Quick Guarantees Box */}
            <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200/60 space-y-2 text-xs">
              <span className="font-bold text-blue-950 block">
                Included with your order:
              </span>
              <ul className="space-y-1.5 text-blue-900 text-[11px]">
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />
                  <span>Custom Trust Deed drafted by High Court advocates</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />
                  <span>Sub-Registrar appointment &amp; execution guidance</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />
                  <span>Dedicated Trust PAN &amp; TAN cards allotment</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* =============================================================
          PAYMENT SUCCESS MODAL & OFFICIAL ACKNOWLEDGEMENT SLIP
      ============================================================= */}
      {isSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                Payment Verified
              </span>
              <h2 className="text-2xl font-extrabold text-[#0B1528] pt-2">
                Trust Registration Order Confirmed!
              </h2>
              <p className="text-xs text-slate-500">
                Your Trust registration file has been opened with our senior legal
                workbench.
              </p>
            </div>

            {/* Official Order Receipt Card */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-left space-y-2.5 text-xs">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Order Reference:</span>
                <strong className="font-mono text-slate-900 font-bold">
                  {resolvedOrderId}
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Transaction ID:</span>
                <span className="font-mono text-slate-700">{transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Proposed Trust:</span>
                <span className="font-semibold text-slate-900">
                  {formData.trustName || 'Vidya Jyoti Educational Trust'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Registered Plan:</span>
                <span className="font-semibold text-emerald-700">
                  {currentPlan.name} Plan
                </span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-200 text-sm font-bold text-slate-900">
                <span>Amount Paid (incl. Taxes):</span>
                <span className="text-[#002244]">
                  ₹{totalAmountPayable.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Next Steps Notification */}
            <div className="p-3.5 bg-blue-50/70 rounded-xl border border-blue-200/60 text-left text-xs text-blue-900 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong>Next Step:</strong> Our Senior Advocate will reach out via
                WhatsApp within 15 minutes to review your Trustee KYC documents and
                share the first Trust Deed draft.
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 py-3 px-4 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Receipt</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('/customer/dashboard')}
                className="flex-1 py-3 px-4 rounded-xl bg-[#002244] text-white text-xs font-bold hover:bg-[#00172e] transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                <span>Go to CA Workbench</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
