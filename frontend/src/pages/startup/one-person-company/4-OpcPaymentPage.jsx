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
  UserCheck,
  Smartphone,
  ChevronDown,
} from 'lucide-react';
import { OPC_PLANS_FOR_PREBUNDLE } from './3-OpcPreBundlePage.jsx';

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

export default function OpcPaymentPage({
  formData = {},
  orderId = '',
  onBack,
  onChangePlan,
  onPaymentSuccess,
}) {
  const navigate = useNavigate();

  // Resolve active plan based on formData.packageId or default to 'starter_opc'
  const activePlanId = formData.packageId || 'starter_opc';
  const currentPlan = useMemo(() => {
    return (
      OPC_PLANS_FOR_PREBUNDLE.find((p) => p.id === activePlanId) ||
      OPC_PLANS_FOR_PREBUNDLE[0]
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
  const [couponDiscount, setCouponDiscount] = useState(
    currentPlan.discountAmount || 500
  );

  // Dynamic 15-minute timer
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
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft, isSuccess]);

  const formatTimer = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Cost calculations
  const originalPlanPrice = currentPlan.price;
  const appliedDiscount = couponApplied ? couponDiscount : 0;
  const taxableAmount = Math.max(0, originalPlanPrice - appliedDiscount);
  const gstRate = 0.18;
  const gstAmount = Math.round(taxableAmount * gstRate);
  const totalAmountToPay = taxableAmount + gstAmount;

  // Coupon Handler
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (
      couponCode.trim().toUpperCase() === 'FESTIVE500' ||
      couponCode.trim().toUpperCase() === 'OPC500' ||
      couponCode.trim().toUpperCase() === 'DIWALI'
    ) {
      setCouponApplied(true);
      setCouponDiscount(500);
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid coupon code. Try FESTIVE500 or OPC500.');
    }
  };

  const handleRemoveCoupon = () => {
    setCouponApplied(false);
    setCouponDiscount(0);
    setCouponCode('');
  };

  // Simulated Payment Trigger
  const handlePayNow = () => {
    setIsProcessing(true);
    setErrorMessage('');

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      const generatedTxnId = `TXN-OPC-${Date.now().toString().slice(-8)}`;
      setTransactionId(generatedTxnId);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // Safe confetti fallback
      }

      if (onPaymentSuccess) {
        onPaymentSuccess({
          transactionId: generatedTxnId,
          amountPaid: totalAmountToPay,
          paidAt: new Date().toISOString(),
          paymentMethod: activeMethod.toUpperCase(),
        });
      }
    }, 1800);
  };

  // SUCCESS SCREEN
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-10 text-center animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 mb-3">
            Payment Confirmed • Incorporation Initiated
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
            One Person Company Order Placed!
          </h2>
          <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
            Thank you! Your payment of{' '}
            <strong className="text-slate-900 font-bold">
              ₹{totalAmountToPay.toLocaleString('en-IN')}
            </strong>{' '}
            has been securely processed. Our MCA legal team has started your
            incorporation process.
          </p>

          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-left mb-6 space-y-2.5 text-xs sm:text-sm">
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Order Number</span>
              <span className="font-bold text-slate-800">
                {orderId || formData.orderNumber || '#OPC-982144'}
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
                  ? `${formData.proposedCompanyName} (OPC) Private Limited`
                  : 'To be finalized'}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Selected Plan</span>
              <span className="font-semibold text-blue-900">
                {currentPlan.name}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Business Age</span>
              <span className="font-semibold text-slate-800">
                {formData.businessAge || 'Less than 1 year'}
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
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6 lg:px-8 font-sans text-slate-800">
      {/* Top Header / Timer Bar */}
      <div className="max-w-6xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Plan Details</span>
        </button>

        {/* 15-Minute Expiry Countdown */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold shadow-2xs">
          <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
          <span>Offer Expires in:</span>
          <span className="font-mono font-bold text-amber-700">
            {formatTimer(secondsLeft)}
          </span>
        </div>
      </div>

      {/* Main Grid: Left Payment Desk (col-7), Right Order Summary (col-5) */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Payment Methods */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden p-6 sm:p-8">
          <div className="flex items-center justify-between pb-5 border-b border-slate-100">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Payment Desk
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                All transactions are encrypted with 256-bit bank-grade SSL.
              </p>
            </div>
            <div className="flex items-center gap-1 text-slate-400 text-xs">
              <Lock className="w-4 h-4 text-emerald-600" />
              <span className="font-medium text-emerald-700">Safe & Secure</span>
            </div>
          </div>

          {/* Payment Method Selector Tabs */}
          <div className="grid grid-cols-4 gap-2 mt-6">
            <button
              type="button"
              onClick={() => setActiveMethod('upi')}
              className={`py-3 px-2 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1.5 border transition cursor-pointer ${
                activeMethod === 'upi'
                  ? 'border-[#002B49] bg-blue-50/50 text-[#002B49] shadow-2xs'
                  : 'border-slate-200 text-slate-600 hover:border-slate-300 bg-white'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>UPI / QR</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveMethod('card')}
              className={`py-3 px-2 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1.5 border transition cursor-pointer ${
                activeMethod === 'card'
                  ? 'border-[#002B49] bg-blue-50/50 text-[#002B49] shadow-2xs'
                  : 'border-slate-200 text-slate-600 hover:border-slate-300 bg-white'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Cards</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveMethod('netbanking')}
              className={`py-3 px-2 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1.5 border transition cursor-pointer ${
                activeMethod === 'netbanking'
                  ? 'border-[#002B49] bg-blue-50/50 text-[#002B49] shadow-2xs'
                  : 'border-slate-200 text-slate-600 hover:border-slate-300 bg-white'
              }`}
            >
              <Landmark className="w-4 h-4" />
              <span>Net Banking</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveMethod('emi')}
              className={`py-3 px-2 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1.5 border transition cursor-pointer ${
                activeMethod === 'emi'
                  ? 'border-[#002B49] bg-blue-50/50 text-[#002B49] shadow-2xs'
                  : 'border-slate-200 text-slate-600 hover:border-slate-300 bg-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>EMI</span>
            </button>
          </div>

          {/* TAB 1: UPI / QR PAYMENT */}
          {activeMethod === 'upi' && (
            <div className="mt-6 space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">
                  Select UPI Application
                </span>
                <button
                  type="button"
                  onClick={() => setShowQrCode(!showQrCode)}
                  className="text-xs text-blue-900 font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>{showQrCode ? 'Hide QR Code' : 'Scan via QR Code'}</span>
                </button>
              </div>

              {showQrCode && (
                <div className="p-4 bg-slate-50 rounded-xl border border-dashed border-slate-300 flex flex-col items-center text-center">
                  <div className="w-36 h-36 bg-white p-2 rounded-lg border border-slate-200 shadow-2xs flex items-center justify-center">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=upi://pay?pa=bharatfiling@icici&pn=BharatFiling&am=${totalAmountToPay}&cu=INR`}
                      alt="UPI QR Code"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-2">
                    Scan with any UPI App (GPay, PhonePe, Paytm, BHIM)
                  </p>
                </div>
              )}

              {/* UPI App selector chips */}
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'phonepe', name: 'PhonePe', icon: '🟣' },
                  { id: 'gpay', name: 'Google Pay', icon: '🔵' },
                  { id: 'paytm', name: 'Paytm', icon: '🟦' },
                ].map((app) => (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => setSelectedUpiApp(app.id)}
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 transition cursor-pointer ${
                      selectedUpiApp === app.id
                        ? 'border-[#002B49] bg-blue-50/30 text-blue-950 font-bold ring-1 ring-[#002B49]'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <span>{app.icon}</span>
                    <span>{app.name}</span>
                  </button>
                ))}
              </div>

              {/* Custom UPI VPA */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Or Enter UPI ID (e.g. mobile@upi)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customVpa}
                    onChange={(e) => setCustomVpa(e.target.value)}
                    placeholder="name@okaxis / 9876543210@paytm"
                    className="flex-1 px-3.5 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#002B49]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (customVpa) handlePayNow();
                    }}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition cursor-pointer"
                  >
                    Verify & Pay
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CREDIT / DEBIT CARDS */}
          {activeMethod === 'card' && (
            <div className="mt-6 space-y-4 animate-in fade-in duration-200">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Card Number
                </label>
                <div className="relative">
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
                  <CreditCard className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
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
                    Valid Thru (MM/YY)
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

          {/* TAB 3: NET BANKING */}
          {activeMethod === 'netbanking' && (
            <div className="mt-6 space-y-4 animate-in fade-in duration-200">
              <label className="block text-xs font-bold text-slate-700">
                Popular Banks
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {POPULAR_BANKS.map((b) => (
                  <button
                    key={b.code}
                    type="button"
                    onClick={() => setSelectedBank(b.name)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition cursor-pointer ${
                      selectedBank === b.name
                        ? 'border-[#002B49] bg-blue-50/40 text-blue-950 font-bold ring-1 ring-[#002B49]'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <span>{b.icon}</span>
                    <span className="truncate">{b.name}</span>
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Or select another bank
                </label>
                <div className="relative">
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#002B49] appearance-none pr-10"
                  >
                    {ALL_NET_BANKS.map((nb) => (
                      <option key={nb} value={nb}>
                        {nb}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: EMI */}
          {activeMethod === 'emi' && (
            <div className="mt-6 space-y-4 animate-in fade-in duration-200">
              <span className="text-xs font-bold text-slate-700 block">
                Select No-Cost / Low-Cost EMI Tenure
              </span>
              <div className="space-y-2">
                {[
                  {
                    months: 3,
                    emi: Math.round(totalAmountToPay / 3),
                    label: 'No Cost EMI',
                  },
                  {
                    months: 6,
                    emi: Math.round((totalAmountToPay * 1.05) / 6),
                    label: 'Standard EMI (10% p.a.)',
                  },
                ].map((tier) => (
                  <div
                    key={tier.months}
                    onClick={() => setSelectedEmiTenure(tier.months)}
                    className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                      selectedEmiTenure === tier.months
                        ? 'border-[#002B49] bg-blue-50/40 ring-1 ring-[#002B49]'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        ₹{tier.emi.toLocaleString('en-IN')}/month for {tier.months} months
                      </div>
                      <div className="text-[11px] text-slate-500">{tier.label}</div>
                    </div>
                    <span className="text-xs font-bold text-emerald-600">
                      ₹{(tier.emi * tier.months).toLocaleString('en-IN')} Total
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Error Message Display */}
          {errorMessage && (
            <p className="text-xs text-rose-600 mt-4 bg-rose-50 p-2.5 rounded-lg border border-rose-200">
              {errorMessage}
            </p>
          )}

          {/* Pay Button */}
          <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
            <div className="text-xs text-slate-500">
              Total Amount Payable:
              <div className="text-lg font-extrabold text-slate-900">
                ₹{totalAmountToPay.toLocaleString('en-IN')}
              </div>
            </div>

            <button
              type="button"
              disabled={isProcessing}
              onClick={handlePayNow}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-[#002B49] hover:bg-[#001D32] text-white text-sm font-bold shadow-md hover:shadow-lg transition cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing Payment...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Pay ₹{totalAmountToPay.toLocaleString('en-IN')}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Order Summary */}
        <div className="lg:col-span-5 space-y-6">
          {/* Order Details Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-7">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Order Summary
              </h3>
              <span className="text-xs font-mono font-medium text-slate-500">
                {orderId || formData.orderNumber || '#OPC-982144'}
              </span>
            </div>

            {/* Selected Plan Details */}
            <div className="py-4 border-b border-slate-100">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {currentPlan.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    One Person Company (OPC) Registration
                  </p>
                </div>
                {onChangePlan && (
                  <button
                    type="button"
                    onClick={onChangePlan}
                    className="text-xs text-blue-900 font-bold hover:underline cursor-pointer"
                  >
                    Change
                  </button>
                )}
              </div>

              {formData.proposedCompanyName && (
                <div className="mt-2 text-xs text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <span className="text-slate-400">Proposed:</span>{' '}
                  <span className="font-semibold text-slate-800">
                    {formData.proposedCompanyName} (OPC) Pvt Ltd
                  </span>
                </div>
              )}
            </div>

            {/* Coupon Code Section */}
            <div className="py-4 border-b border-slate-100">
              {couponApplied ? (
                <div className="flex items-center justify-between bg-emerald-50/70 border border-emerald-200/80 rounded-xl px-3 py-2">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-emerald-700" />
                    <span className="text-xs font-bold text-emerald-800">
                      {couponCode} (-₹{couponDiscount})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveCoupon}
                    className="text-xs text-slate-500 hover:text-rose-600 cursor-pointer font-bold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="Enter Coupon (e.g. FESTIVE500)"
                    className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#002B49] uppercase font-mono"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg cursor-pointer transition"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="py-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Professional Fee</span>
                <span>₹{originalPlanPrice.toLocaleString('en-IN')}</span>
              </div>
              {couponApplied && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Special Discount</span>
                  <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Standard GST (18%)</span>
                <span>₹{gstAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="pt-2 border-t border-slate-100 flex justify-between text-sm font-extrabold text-slate-900">
                <span>Grand Total</span>
                <span>₹{totalAmountToPay.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* 3 Value bullets */}
            <div className="pt-4 border-t border-slate-100 space-y-2 text-[11px] text-slate-500">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>MCA SPICe+ Part A & Part B Fast-Track Processing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Dedicated Chartered Accountant / CS Assigned</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Money-back Assurance on Non-Performance</span>
              </div>
            </div>
          </div>

          {/* Security Banner */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 flex items-center gap-3 shadow-2xs">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <span className="font-bold text-slate-800 block">
                ISO 27001 Certified Security
              </span>
              <span className="text-slate-500 leading-relaxed block mt-0.5">
                Your personal details, DSC keys, and Aadhaar info are encrypted
                with AES-256 standard.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
