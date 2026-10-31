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

export default function PartnershipPaymentPage({
  formData = {},
  orderId = '',
  onBack,
  onChangePlan,
}) {
  const navigate = useNavigate();

  // Resolve active plan based on formData.packageId or default to 'standard'
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

  // Coupon state
  const [couponCode, setCouponCode] = useState('FESTIVE500');
  const [couponApplied, setCouponApplied] = useState(true);
  const [couponDiscount, setCouponDiscount] = useState(500);

  // Dynamic 15-minute timer (similar to GST registration payment page)
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

  // Pricing calculations
  const basePrice = currentPlan.price;
  const initialDiscount = currentPlan.originalPrice - currentPlan.price;
  const extraCouponDiscount = couponApplied ? couponDiscount : 0;
  const effectiveBaseFee = Math.max(0, basePrice - extraCouponDiscount);
  const statutoryGst = Math.round(effectiveBaseFee * 0.18);
  const totalAmountPayable = effectiveBaseFee + statutoryGst;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode || couponCode.trim().length === 0) return;
    if (couponCode.toUpperCase() === 'FESTIVE500' || couponCode.toUpperCase() === 'BHARAT500') {
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
      setIsProcessing(false);
      setIsSuccess(true);
      const generatedTxn = `TXN_PTR_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;
      setTransactionId(generatedTxn);

      confetti({
        particleCount: 130,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#042D50', '#FFD200', '#22C55E', '#3B82F6'],
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F5F7F8] font-sans pb-16 antialiased text-slate-800">
      {/* =========================================================================
          TOP HEADER BAR (with BharatFiling Brand Logo & 100% Secure Checkout Badge)
      ========================================================================= */}
      <header className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-8 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Plans</span>
              </button>
            )}

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#FFD200] text-slate-950 font-black text-xs tracking-wider uppercase shadow-2xs select-none">
              <span>BHARAT</span>
              <span className="font-semibold text-slate-900">FILING</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">100% Secure Checkout • 256-Bit SSL</span>
            <span className="sm:hidden text-emerald-700 font-bold">100% Secure</span>
          </div>
        </div>
      </header>

      {/* =========================================================================
          MAIN CONTAINER (8 Cols Payment Desk + 4 Cols Order Summary)
      ========================================================================= */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* =====================================================================
              LEFT SECTION (8 COLS): Payment Options & Active Method Panel
          ===================================================================== */}
          <div className="lg:col-span-8 space-y-4">
            {/* Green Discount Unlocked Floating Tab on top right of payment box */}
            <div className="flex justify-end -mb-px">
              <div className="bg-[#2EAD39] text-white text-xs sm:text-sm font-extrabold px-5 py-2 rounded-t-xl inline-flex items-center gap-2 shadow-xs select-none">
                <Sparkles className="w-4 h-4 text-[#FFD200]" />
                <span>
                  Hooray! ₹{(initialDiscount + extraCouponDiscount).toLocaleString('en-IN')} Discount Unlocked!
                </span>
              </div>
            </div>

            {/* Main Payment Card */}
            <div className="bg-white rounded-2xl rounded-tr-none border border-slate-200 shadow-[0_8px_30px_rgba(0,0,0,0.05)] overflow-hidden">
              {/* Dynamic Red Timer Header matching GST Registration design */}
              <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-rose-50/40 text-[#FF2B32] font-bold text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#FF2B32] shrink-0 animate-pulse" />
                  <span>
                    Special registration offer expires in {formatTimer(secondsLeft)} minutes
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500 hidden sm:inline">
                  Step 4 of 4: Instant Settlement
                </span>
              </div>

              {/* Grid: Left Method Tabs (5 cols) + Right Active Form (7 cols) */}
              <div className="grid grid-cols-1 sm:grid-cols-12 min-h-[420px]">
                {/* Left Method Tabs */}
                <div className="sm:col-span-5 border-r border-slate-100 bg-[#F8FAFC]">
                  <div className="px-4 py-3 border-b border-slate-100 text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Payment Options
                  </div>

                  <div className="divide-y divide-slate-100/80">
                    {/* 1. UPI Tab */}
                    <button
                      type="button"
                      onClick={() => {
                        setActiveMethod('upi');
                        setErrorMessage('');
                      }}
                      className={`w-full flex items-center justify-between p-4 text-left transition cursor-pointer ${
                        activeMethod === 'upi'
                          ? 'bg-white border-l-4 border-l-[#002B49] shadow-2xs'
                          : 'hover:bg-slate-100/70'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center font-bold text-xs shrink-0">
                          ⚡
                        </div>
                        <div>
                          <div className={`text-xs font-bold ${activeMethod === 'upi' ? 'text-slate-900' : 'text-slate-700'}`}>
                            UPI / QR Code
                          </div>
                          <div className="text-[10px] text-slate-400">GPay, PhonePe, Paytm &amp; QR</div>
                        </div>
                      </div>
                      {activeMethod === 'upi' && (
                        <span className="text-[#002B49] font-black text-xs">&gt;</span>
                      )}
                    </button>

                    {/* 2. Credit/Debit Card Tab */}
                    <button
                      type="button"
                      onClick={() => {
                        setActiveMethod('card');
                        setErrorMessage('');
                      }}
                      className={`w-full flex items-center justify-between p-4 text-left transition cursor-pointer ${
                        activeMethod === 'card'
                          ? 'bg-white border-l-4 border-l-[#002B49] shadow-2xs'
                          : 'hover:bg-slate-100/70'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-slate-600 shrink-0" />
                        <div>
                          <div className={`text-xs font-bold ${activeMethod === 'card' ? 'text-slate-900' : 'text-slate-700'}`}>
                            Debit / Credit Card
                          </div>
                          <div className="text-[10px] text-slate-400">Visa, MasterCard, RuPay</div>
                        </div>
                      </div>
                      {activeMethod === 'card' && (
                        <span className="text-[#002B49] font-black text-xs">&gt;</span>
                      )}
                    </button>

                    {/* 3. Net Banking Tab */}
                    <button
                      type="button"
                      onClick={() => {
                        setActiveMethod('netbanking');
                        setErrorMessage('');
                      }}
                      className={`w-full flex items-center justify-between p-4 text-left transition cursor-pointer ${
                        activeMethod === 'netbanking'
                          ? 'bg-white border-l-4 border-l-[#002B49] shadow-2xs'
                          : 'hover:bg-slate-100/70'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Landmark className="w-5 h-5 text-slate-600 shrink-0" />
                        <div>
                          <div className={`text-xs font-bold ${activeMethod === 'netbanking' ? 'text-slate-900' : 'text-slate-700'}`}>
                            Net Banking
                          </div>
                          <div className="text-[10px] text-slate-400">All Major Indian Banks</div>
                        </div>
                      </div>
                      {activeMethod === 'netbanking' && (
                        <span className="text-[#002B49] font-black text-xs">&gt;</span>
                      )}
                    </button>

                    {/* 4. EMI Option Tab */}
                    <button
                      type="button"
                      onClick={() => {
                        setActiveMethod('emi');
                        setErrorMessage('');
                      }}
                      className={`w-full flex items-center justify-between p-4 text-left transition cursor-pointer ${
                        activeMethod === 'emi'
                          ? 'bg-white border-l-4 border-l-[#002B49] shadow-2xs'
                          : 'hover:bg-slate-100/70'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xs shrink-0">
                          ₹
                        </div>
                        <div>
                          <div className={`text-xs font-bold ${activeMethod === 'emi' ? 'text-slate-900' : 'text-slate-700'}`}>
                            EMI Option
                          </div>
                          <div className="text-[10px] text-slate-400">From ₹{Math.round(totalAmountPayable / 3)}/mo</div>
                        </div>
                      </div>
                      {activeMethod === 'emi' && (
                        <span className="text-[#002B49] font-black text-xs">&gt;</span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Right Active Form Area (7 cols) */}
                <div className="sm:col-span-7 p-6 sm:p-7 flex flex-col justify-between bg-white">
                  {errorMessage && (
                    <div className="p-3 mb-4 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                      {errorMessage}
                    </div>
                  )}

                  {/* ----------------- Active: UPI Tab ----------------- */}
                  {activeMethod === 'upi' && (
                    <div className="space-y-5 animate-in fade-in duration-150">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">
                          Select Preferred UPI App
                        </span>
                        <button
                          type="button"
                          onClick={() => setShowQrCode(!showQrCode)}
                          className="text-xs font-bold text-blue-900 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <QrCode className="w-3.5 h-3.5" />
                          <span>{showQrCode ? 'Hide QR' : 'Show QR Code'}</span>
                        </button>
                      </div>

                      {/* UPI App Icons Grid */}
                      <div className="grid grid-cols-2 gap-2.5">
                        {[
                          { id: 'phonepe', name: 'PhonePe', icon: '🟣', vpa: '@ybl' },
                          { id: 'gpay', name: 'Google Pay', icon: '🟢', vpa: '@okaxis' },
                          { id: 'paytm', name: 'Paytm UPI', icon: '🔵', vpa: '@paytm' },
                          { id: 'other', name: 'Other UPI ID', icon: '⚡', vpa: '' },
                        ].map((app) => (
                          <div
                            key={app.id}
                            onClick={() => setSelectedUpiApp(app.id)}
                            className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer transition ${
                              selectedUpiApp === app.id
                                ? 'bg-blue-50/60 border-[#002B49] ring-1 ring-[#002B49]'
                                : 'border-slate-200 hover:border-slate-300 bg-white'
                            }`}
                          >
                            <span className="text-lg">{app.icon}</span>
                            <div className="flex-1">
                              <div className="text-xs font-bold text-slate-900">{app.name}</div>
                              <div className="text-[10px] text-slate-400">
                                {app.id === 'other' ? 'Enter custom ID' : 'Direct Intent'}
                              </div>
                            </div>
                            {selectedUpiApp === app.id && (
                              <CheckCircle2 className="w-4 h-4 text-[#002B49]" />
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Custom UPI ID Input */}
                      {selectedUpiApp === 'other' && (
                        <div className="space-y-1.5 pt-1">
                          <label className="text-xs font-semibold text-slate-700">Enter your UPI ID</label>
                          <input
                            type="text"
                            placeholder="e.g. yourname@okhdfcbank"
                            value={customVpa}
                            onChange={(e) => setCustomVpa(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:border-[#002B49] focus:ring-2 focus:ring-[#002B49]/20 focus:outline-none"
                          />
                        </div>
                      )}

                      {/* QR Code Container if toggled */}
                      {showQrCode && (
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-2">
                          <div className="w-32 h-32 bg-white rounded-lg border border-slate-300 mx-auto flex items-center justify-center p-2 shadow-2xs">
                            {/* Realistic Simulated UPI QR Code SVG */}
                            <svg className="w-full h-full text-slate-900" viewBox="0 0 100 100" fill="currentColor">
                              <path d="M10 10h30v30H10zm5 5v20h20V15zm5 5h10v10H20zm40-10h30v30H60zm5 5v20h20V15zm5 5h10v10H70zM10 60h30v30H10zm5 5v20h20V65zm5 5h10v10H20zm40 5h5v5h-5zm10 0h5v5h-5zm10 0h5v5h-5zm-20 10h10v5H60zm15 0h5v5h-5zm10 0h5v10h-5zm-25 10h5v5h-5zm10 0h10v5H70z" />
                            </svg>
                          </div>
                          <p className="text-[11px] font-bold text-slate-700">Scan using any UPI App</p>
                          <p className="text-[10px] text-slate-400">GPay • PhonePe • Paytm • CRED • BHIM</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ----------------- Active: Card Tab ----------------- */}
                  {activeMethod === 'card' && (
                    <div className="space-y-4 animate-in fade-in duration-150">
                      <span className="text-xs font-bold text-slate-900">Enter Card Details</span>
                      <div className="space-y-3">
                        <div>
                          <label className="text-[11px] font-semibold text-slate-600">Card Number</label>
                          <input
                            type="text"
                            placeholder="4532 8923 1245 9012"
                            maxLength="19"
                            value={cardDetails.number}
                            onChange={(e) => {
                              const v = e.target.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim();
                              setCardDetails({ ...cardDetails, number: v });
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:border-[#002B49] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold text-slate-600">Name on Card</label>
                          <input
                            type="text"
                            placeholder="Yash Upadhyay"
                            value={cardDetails.name}
                            onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:border-[#002B49] focus:outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] font-semibold text-slate-600">Expiry (MM/YY)</label>
                            <input
                              type="text"
                              placeholder="08/28"
                              maxLength="5"
                              value={cardDetails.expiry}
                              onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:border-[#002B49] focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-semibold text-slate-600">CVV</label>
                            <input
                              type="password"
                              placeholder="•••"
                              maxLength="4"
                              value={cardDetails.cvv}
                              onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:border-[#002B49] focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ----------------- Active: Net Banking Tab ----------------- */}
                  {activeMethod === 'netbanking' && (
                    <div className="space-y-4 animate-in fade-in duration-150">
                      <span className="text-xs font-bold text-slate-900">Popular Banks</span>
                      <div className="grid grid-cols-2 gap-2">
                        {POPULAR_BANKS.map((b) => (
                          <div
                            key={b.code}
                            onClick={() => setSelectedBank(b.name)}
                            className={`p-2.5 rounded-lg border flex items-center gap-2 cursor-pointer transition ${
                              selectedBank === b.name
                                ? 'bg-blue-50/60 border-[#002B49] font-bold text-[#002B49]'
                                : 'border-slate-200 hover:border-slate-300 text-slate-700'
                            }`}
                          >
                            <span>{b.icon}</span>
                            <span className="text-xs truncate">{b.name}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-1">
                        <label className="text-[11px] font-semibold text-slate-600">Or Select Other Bank</label>
                        <select
                          value={selectedBank}
                          onChange={(e) => setSelectedBank(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:border-[#002B49] focus:outline-none mt-1 cursor-pointer"
                        >
                          {ALL_NET_BANKS.map((bank, i) => (
                            <option key={i} value={bank}>{bank}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* ----------------- Active: EMI Tab ----------------- */}
                  {activeMethod === 'emi' && (
                    <div className="space-y-4 animate-in fade-in duration-150">
                      <span className="text-xs font-bold text-slate-900">Choose Flexible EMI Tenure</span>
                      <div className="space-y-2.5">
                        {[
                          { months: 3, rate: '0% Interest' },
                          { months: 6, rate: '12% p.a.' },
                          { months: 9, rate: '14% p.a.' },
                        ].map((emi) => (
                          <div
                            key={emi.months}
                            onClick={() => setSelectedEmiTenure(emi.months)}
                            className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                              selectedEmiTenure === emi.months
                                ? 'bg-blue-50/60 border-[#002B49] ring-1 ring-[#002B49]'
                                : 'border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <div>
                              <div className="text-xs font-bold text-slate-900">
                                {emi.months} Months Plan
                              </div>
                              <div className="text-[10px] text-emerald-700 font-semibold">{emi.rate}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-black text-[#002B49]">
                                ₹{Math.round(totalAmountPayable / emi.months).toLocaleString('en-IN')}/mo
                              </div>
                              <div className="text-[10px] text-slate-400">Total: ₹{totalAmountPayable.toLocaleString('en-IN')}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pay Button Action matching GST Registration */}
                  <div className="pt-6 mt-4 border-t border-slate-100 space-y-2">
                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={handlePay}
                      className="w-full py-3.5 px-4 rounded-xl bg-[#002B49] hover:bg-[#001D32] text-white font-bold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Verifying Payment with Gateway...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          <span>Pay ₹{totalAmountPayable.toLocaleString('en-IN')} Now</span>
                        </>
                      )}
                    </button>

                    <div className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>PCI-DSS Compliant • 256-Bit SSL • Instant CA Allocation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =====================================================================
              RIGHT SECTION (4 COLS): Order Summary & Guarantee Highlights
          ===================================================================== */}
          <div className="lg:col-span-4 space-y-4">
            {/* Order Summary Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Order Summary
                </span>
                {onChangePlan && (
                  <button
                    type="button"
                    onClick={onChangePlan}
                    className="text-xs font-bold text-blue-900 hover:underline cursor-pointer"
                  >
                    Change Plan
                  </button>
                )}
              </div>

              {/* Service & Firm Meta */}
              <div className="space-y-2 bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Service:</span>
                  <span className="font-bold text-[#002B49]">Partnership Registration</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Package:</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {currentPlan.name}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Proposed Firm:</span>
                  <span className="font-bold text-slate-900">{formData.firmName || 'yash'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Partners:</span>
                  <span className="font-semibold text-slate-700">{formData.numberOfPartners || '3-5'}</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2.5 text-xs text-slate-600 pt-1">
                <div className="flex justify-between">
                  <span>Standard Professional Fee:</span>
                  <span className="line-through text-slate-400">
                    ₹{currentPlan.originalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Package Online Discount:</span>
                  <span>- ₹{initialDiscount.toLocaleString('en-IN')}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Coupon (FESTIVE500):</span>
                    <span>- ₹{couponDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Net Professional Fee:</span>
                  <span className="font-semibold text-slate-900">
                    ₹{effectiveBaseFee.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Statutory GST (18%):</span>
                  <span className="font-semibold text-slate-900">
                    ₹{statutoryGst.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline text-sm font-bold text-slate-900">
                  <span>Total Amount:</span>
                  <span className="text-xl font-black text-[#002B49]">
                    ₹{totalAmountPayable.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="pt-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Coupon Code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-300 text-xs uppercase font-mono font-bold focus:border-[#002B49] focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-[11px] text-emerald-600 font-semibold mt-1.5 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>Coupon applied! Extra ₹500 off.</span>
                  </p>
                )}
              </form>
            </div>

            {/* Service Delivery Guarantees */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                BharatFiling Guarantees
              </span>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Drafting of Partnership Deed within 2-3 business days</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Dedicated Senior CA &amp; Legal Specialist assigned</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Pan-India Registrar of Firms (RoF) submission support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SUCCESS & CONFIRMATION MODAL OVERLAY
      ========================================================================= */}
      {isSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-black text-slate-900">Payment Successful!</h2>
              <p className="text-xs text-slate-500">
                Your Partnership Registration order is confirmed and dispatched to our CA team.
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 text-left space-y-2.5 text-xs">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Transaction ID:</span>
                <span className="font-mono font-bold text-slate-900">{transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Order Number:</span>
                <span className="font-mono font-bold text-[#002B49]">
                  {orderId || formData.orderNumber || '#PTR-882190'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Proposed Firm:</span>
                <span className="font-bold text-slate-900">{formData.firmName || 'yash'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Plan Selected:</span>
                <span className="font-bold text-emerald-700">{currentPlan.name} Plan</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-200 font-bold text-sm text-slate-900">
                <span>Total Paid:</span>
                <span className="text-emerald-700">₹{totalAmountPayable.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 py-3 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Receipt</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="flex-1 py-3 rounded-xl bg-[#002B49] hover:bg-[#001D32] text-white text-xs font-bold shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Go to Customer Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
