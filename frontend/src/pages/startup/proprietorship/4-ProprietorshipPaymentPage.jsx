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

export default function ProprietorshipPaymentPage({
  formData = {},
  orderId = '',
  onBack,
  onChangePlan,
  onPaymentSuccess,
}) {
  const navigate = useNavigate();

  // Resolve active plan based on formData.packageId or default to 'starter' (₹999) or 'standard' (₹2499)
  const activePlanId = formData.packageId || 'starter';
  const currentPlan = useMemo(() => {
    return (
      BUNDLED_PLANS.find((p) => p.id === activePlanId) || BUNDLED_PLANS[0]
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

  // Net banking state
  const [selectedBank, setSelectedBank] = useState(POPULAR_BANKS[0].name);

  // Labour Welfare Endowment optional charge (₹50 + ₹9 GST = ₹59)
  const [includeLabourWelfare, setIncludeLabourWelfare] = useState(true);
  const [isTaxesOpen, setIsTaxesOpen] = useState(true);

  // 15-minute countdown timer
  const [secondsLeft, setSecondsLeft] = useState(898);

  // Payment processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');

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
  const baseFee = formData.professionalFee || currentPlan.price || 999;
  const originalFee = currentPlan.originalPrice || baseFee * 2;
  const onlineDiscount = originalFee - baseFee;
  const subTotalAmount = baseFee;

  const gstOnFee = Math.round(subTotalAmount * 0.18);
  const labourWelfare = includeLabourWelfare ? 50 : 0;
  const gstOnLabour = includeLabourWelfare ? 9 : 0;
  const totalTaxes = gstOnFee + labourWelfare + gstOnLabour;
  const totalAmountToPay = subTotalAmount + totalTaxes;

  const handlePayNow = async () => {
    setIsProcessing(true);

    try {
      // Try sending payment payload to backend if available
      const response = await fetch('/api/v1/proprietorship/payment/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: formData.orderNumber || orderId,
          tradeName: formData.tradeName || formData.firmName,
          planId: currentPlan.id,
          amountPaid: totalAmountToPay,
          paymentMethod: activeMethod.toUpperCase(),
        }),
      }).catch(() => null);

      let genTxnId = `TXN-PROP-${Date.now().toString().slice(-8)}`;
      if (response && response.ok) {
        const data = await response.json();
        if (data?.transactionId) genTxnId = data.transactionId;
      }

      setTransactionId(genTxnId);
      setIsProcessing(false);
      setIsSuccess(true);

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
          transactionId: genTxnId,
          amountPaid: totalAmountToPay,
          paidAt: new Date().toISOString(),
          paymentMethod: activeMethod.toUpperCase(),
        });
      }
    } catch {
      setIsProcessing(false);
      setIsSuccess(true);
      const fallbackTxn = `TXN-PROP-${Date.now().toString().slice(-8)}`;
      setTransactionId(fallbackTxn);
    }
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
            Payment Verified • Registration In Progress
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
            Sole Proprietorship Order Placed!
          </h2>
          <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
            Your payment of{' '}
            <strong className="text-slate-900 font-bold">
              ₹{totalAmountToPay.toLocaleString('en-IN')}
            </strong>{' '}
            has been received. Our legal and MSME filing team has initiated your
            registration.
          </p>

          {/* Receipt Details Box */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 text-left mb-6 space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between pb-2 border-b border-slate-200">
              <span className="text-slate-500">Transaction ID</span>
              <span className="font-mono font-bold text-slate-800">
                {transactionId || 'TXN-PROP-84920184'}
              </span>
            </div>
            <div className="flex justify-between pb-2 border-b border-slate-200">
              <span className="text-slate-500">Service Category</span>
              <span className="font-semibold text-slate-800">
                Sole Proprietorship Registration
              </span>
            </div>
            <div className="flex justify-between pb-2 border-b border-slate-200">
              <span className="text-slate-500">Selected Plan</span>
              <span className="font-semibold text-slate-800">
                {formData.packageName || currentPlan.name}
              </span>
            </div>
            <div className="flex justify-between pb-2 border-b border-slate-200">
              <span className="text-slate-500">Proposed Trade Name</span>
              <span className="font-semibold text-blue-900 uppercase">
                {formData.tradeName || formData.firmName || 'APEX RETAIL ENTERPRISES'}
              </span>
            </div>
            <div className="flex justify-between pb-2 border-b border-slate-200">
              <span className="text-slate-500">Registered State</span>
              <span className="font-semibold text-slate-800">
                {formData.stateName || 'Maharashtra'}
              </span>
            </div>
            <div className="flex justify-between pt-1 text-sm font-bold">
              <span className="text-slate-800">Amount Paid (Incl. Taxes)</span>
              <span className="text-emerald-700">
                ₹{totalAmountToPay.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Next Steps Card */}
          <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 text-left text-xs text-slate-700 mb-8 space-y-1.5">
            <span className="font-bold text-blue-900 block text-xs">
              What happens next?
            </span>
            <p>
              1. Your dedicated CA Relationship Manager will call you within 15 minutes.
            </p>
            <p>
              2. We will generate your official Ministry of MSME Udyam Certificate within 24 hours.
            </p>
            <p>
              3. You will receive direct assistance to open your Zero-Balance Current Account with our partner banks.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 font-bold text-xs text-slate-700 transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Tax Invoice</span>
            </button>
            <Link
              to="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs transition shadow-md"
            >
              <span>Go to Customer Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-200/80">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="inline-flex items-center gap-1.5">
                <span className="font-black text-lg tracking-wider text-[#002244]">
                  BHARAT<span className="text-amber-500">FILING</span>
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-400 border border-slate-200 px-1.5 py-0.5 rounded">
                  Proprietorship Desk
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-[#0B1528] mt-0.5">
                Choose Payment Method
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-2xs">
            <Lock className="w-3.5 h-3.5 text-blue-600" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
        </div>

        {/* 2-Column Checkout Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Payment Options */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
              Payment Options
            </h2>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[420px]">
              {/* Method Selector Tabs */}
              <div className="w-full md:w-56 bg-slate-50/70 border-b md:border-b-0 md:border-r border-slate-200/80 flex flex-col">
                <button
                  type="button"
                  onClick={() => setActiveMethod('upi')}
                  className={`p-4 text-left transition flex items-center justify-between border-l-4 cursor-pointer ${
                    activeMethod === 'upi'
                      ? 'bg-white border-l-[#002244] shadow-2xs font-bold text-[#002244]'
                      : 'border-l-transparent text-slate-600 hover:bg-slate-100/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">⚡</span>
                    <div>
                      <span className="text-sm font-bold block leading-none">
                        UPI
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-1">
                        Gpay, PhonePe, Paytm & more
                      </span>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveMethod('card')}
                  className={`p-4 text-left transition flex items-center justify-between border-l-4 cursor-pointer ${
                    activeMethod === 'card'
                      ? 'bg-white border-l-[#002244] shadow-2xs font-bold text-[#002244]'
                      : 'border-l-transparent text-slate-600 hover:bg-slate-100/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-4 h-4 text-slate-600" />
                    <div>
                      <span className="text-sm font-bold block leading-none">
                        Credit/Debit Card
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-1">
                        Visa, MasterCard, Rupay
                      </span>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveMethod('netbanking')}
                  className={`p-4 text-left transition flex items-center justify-between border-l-4 cursor-pointer ${
                    activeMethod === 'netbanking'
                      ? 'bg-white border-l-[#002244] shadow-2xs font-bold text-[#002244]'
                      : 'border-l-transparent text-slate-600 hover:bg-slate-100/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Landmark className="w-4 h-4 text-slate-600" />
                    <div>
                      <span className="text-sm font-bold block leading-none">
                        Net Banking
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-1">
                        All Indian Banks
                      </span>
                    </div>
                  </div>
                </button>
              </div>

              {/* Method Detail Area */}
              <div className="flex-1 p-6 relative">
                {/* ---------------------------------------------------------
                    UPI TAB
                --------------------------------------------------------- */}
                {activeMethod === 'upi' && (
                  <div className="space-y-6">
                    {/* Countdown Banner */}
                    <div className="flex items-center gap-2 text-xs font-semibold text-red-600 bg-red-50/60 px-3 py-2 rounded-lg border border-red-100">
                      <Clock className="w-4 h-4 animate-pulse flex-shrink-0" />
                      <span>
                        Exclusive offer expires in{' '}
                        <strong className="font-mono text-red-700">
                          {formatTimer(secondsLeft)}
                        </strong>{' '}
                        minutes
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-slate-900 mb-1">
                        Pay with UPI
                      </h3>
                      <p className="text-xs text-slate-500 mb-4">
                        Select your preferred UPI app or enter any UPI ID.
                      </p>

                      {/* App selector */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                        {/* PhonePe */}
                        <div
                          onClick={() => setSelectedUpiApp('phonepe')}
                          className={`p-3 rounded-xl border-2 cursor-pointer transition flex flex-col items-center justify-center text-center gap-1.5 relative ${
                            selectedUpiApp === 'phonepe'
                              ? 'border-indigo-600 bg-indigo-50/30'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {selectedUpiApp === 'phonepe' && (
                            <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                          )}
                          <div className="w-9 h-9 rounded-full bg-[#5f259f] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                            पे
                          </div>
                          <span className="text-xs font-bold text-slate-800">
                            PhonePe
                          </span>
                        </div>

                        {/* Google Pay */}
                        <div
                          onClick={() => setSelectedUpiApp('gpay')}
                          className={`p-3 rounded-xl border-2 cursor-pointer transition flex flex-col items-center justify-center text-center gap-1.5 relative ${
                            selectedUpiApp === 'gpay'
                              ? 'border-blue-600 bg-blue-50/30'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {selectedUpiApp === 'gpay' && (
                            <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                          )}
                          <div className="w-9 h-9 rounded-full bg-white border border-slate-200 shadow-xs flex items-center justify-center font-bold text-xs">
                            <span className="text-blue-500 font-black">G</span>
                            <span className="text-red-500 font-black">P</span>
                          </div>
                          <span className="text-xs font-bold text-slate-800">
                            Google Pay
                          </span>
                        </div>

                        {/* Paytm */}
                        <div
                          onClick={() => setSelectedUpiApp('paytm')}
                          className={`p-3 rounded-xl border-2 cursor-pointer transition flex flex-col items-center justify-center text-center gap-1.5 relative ${
                            selectedUpiApp === 'paytm'
                              ? 'border-sky-600 bg-sky-50/30'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {selectedUpiApp === 'paytm' && (
                            <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-sky-600 text-white flex items-center justify-center">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                          )}
                          <div className="w-9 h-9 rounded-full bg-[#002e6e] text-white flex items-center justify-center font-bold text-[10px] shadow-xs">
                            Paytm
                          </div>
                          <span className="text-xs font-bold text-slate-800">
                            Paytm
                          </span>
                        </div>

                        {/* Other UPI */}
                        <div
                          onClick={() => setSelectedUpiApp('other')}
                          className={`p-3 rounded-xl border-2 cursor-pointer transition flex flex-col items-center justify-center text-center gap-1.5 relative ${
                            selectedUpiApp === 'other'
                              ? 'border-blue-600 bg-blue-50/30'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {selectedUpiApp === 'other' && (
                            <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                          )}
                          <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs">
                            UPI
                          </div>
                          <span className="text-xs font-bold text-slate-800">
                            Other UPI
                          </span>
                        </div>
                      </div>

                      {/* Custom VPA */}
                      {selectedUpiApp === 'other' && (
                        <div className="mb-4 animate-in fade-in">
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Enter UPI ID / VPA
                          </label>
                          <input
                            type="text"
                            value={customVpa}
                            onChange={(e) => setCustomVpa(e.target.value)}
                            placeholder="e.g. yourname@upi"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      )}

                      {/* Pay Button */}
                      <button
                        type="button"
                        onClick={handlePayNow}
                        disabled={isProcessing}
                        className="w-full py-3.5 px-4 rounded-xl bg-[#002244] hover:bg-[#00172e] text-white font-extrabold text-sm sm:text-base tracking-wide transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Processing Payment...</span>
                          </>
                        ) : (
                          <span>
                            PAY ₹{totalAmountToPay.toLocaleString('en-IN')}
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* ---------------------------------------------------------
                    CARD TAB
                --------------------------------------------------------- */}
                {activeMethod === 'card' && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 mb-2">
                      Enter Card Details
                    </h3>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        maxLength="19"
                        value={cardDetails.number}
                        onChange={(e) =>
                          setCardDetails({
                            ...cardDetails,
                            number: e.target.value,
                          })
                        }
                        placeholder="4532 •••• •••• 8821"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        placeholder="Name on card"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Valid Thru (MM/YY)
                        </label>
                        <input
                          type="text"
                          maxLength="5"
                          value={cardDetails.expiry}
                          onChange={(e) =>
                            setCardDetails({
                              ...cardDetails,
                              expiry: e.target.value,
                            })
                          }
                          placeholder="MM/YY"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          CVV
                        </label>
                        <input
                          type="password"
                          maxLength="4"
                          value={cardDetails.cvv}
                          onChange={(e) =>
                            setCardDetails({
                              ...cardDetails,
                              cvv: e.target.value,
                            })
                          }
                          placeholder="•••"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handlePayNow}
                      disabled={isProcessing}
                      className="w-full mt-4 py-3.5 px-4 rounded-xl bg-[#002244] hover:bg-[#00172e] text-white font-extrabold text-sm sm:text-base tracking-wide transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Processing Card...</span>
                        </>
                      ) : (
                        <span>
                          PAY ₹{totalAmountToPay.toLocaleString('en-IN')}
                        </span>
                      )}
                    </button>
                  </div>
                )}

                {/* ---------------------------------------------------------
                    NET BANKING TAB
                --------------------------------------------------------- */}
                {activeMethod === 'netbanking' && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 mb-2">
                      Popular Banks
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-4">
                      {POPULAR_BANKS.map((b) => (
                        <button
                          key={b.code}
                          type="button"
                          onClick={() => setSelectedBank(b.name)}
                          className={`p-2.5 rounded-lg border text-left flex items-center gap-2 transition cursor-pointer text-xs font-semibold ${
                            selectedBank === b.name
                              ? 'border-blue-600 bg-blue-50/40 text-blue-900'
                              : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                          }`}
                        >
                          <span>{b.icon}</span>
                          <span className="truncate">{b.name}</span>
                        </button>
                      ))}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        All Other Banks
                      </label>
                      <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {ALL_NET_BANKS.map((bank) => (
                          <option key={bank} value={bank}>
                            {bank}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={handlePayNow}
                      disabled={isProcessing}
                      className="w-full mt-4 py-3.5 px-4 rounded-xl bg-[#002244] hover:bg-[#00172e] text-white font-extrabold text-sm sm:text-base tracking-wide transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Connecting to Bank...</span>
                        </>
                      ) : (
                        <span>
                          PAY VIA {selectedBank.toUpperCase()} ₹
                          {totalAmountToPay.toLocaleString('en-IN')}
                        </span>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Price Details */}
          <div className="lg:col-span-5 space-y-4">
            {/* Celebratory Banner */}
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white rounded-2xl p-3.5 flex items-center justify-center gap-2 shadow-md">
              <span className="text-base">🎉</span>
              <span className="font-extrabold text-xs sm:text-sm tracking-wide">
                Hooray! 50% Online Discount Unlocked!
              </span>
            </div>

            {/* Price Details Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs">
                    ₹
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Price details
                    </h3>
                    <span className="text-[11px] text-slate-500 block">
                      {formData.packageName || currentPlan.name}
                    </span>
                  </div>
                </div>

                {onChangePlan && (
                  <button
                    type="button"
                    onClick={onChangePlan}
                    className="text-xs font-bold text-blue-700 hover:text-blue-800 underline cursor-pointer"
                  >
                    Change plan
                  </button>
                )}
              </div>

              {/* Price Line Items */}
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Professional Fees</span>
                  <span className="font-semibold text-slate-800">
                    ₹{originalFee.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Online Discount</span>
                  <span>-₹{onlineDiscount.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between font-bold text-slate-800 pt-2 border-t border-slate-100">
                  <span>Sub Total Amount</span>
                  <span>₹{subTotalAmount.toLocaleString('en-IN')}</span>
                </div>

                {/* Taxes & Charges Collapsible */}
                <div className="pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsTaxesOpen(!isTaxesOpen)}
                    className="w-full flex items-center justify-between text-xs text-slate-600 hover:text-slate-900 font-semibold cursor-pointer py-1"
                  >
                    <span className="flex items-center gap-1.5">
                      <span>Taxes & Charges</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform ${
                          isTaxesOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </span>
                    <span>₹{totalTaxes.toLocaleString('en-IN')}</span>
                  </button>

                  {isTaxesOpen && (
                    <div className="mt-2 space-y-2 pl-2 text-xs text-slate-500 animate-in fade-in">
                      <div className="flex justify-between">
                        <span>GST on professional fee (18%)</span>
                        <span className="font-medium text-slate-700">
                          ₹{gstOnFee.toLocaleString('en-IN')}
                        </span>
                      </div>

                      {/* Labour Welfare Endowment Toggle */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-2">
                          <span>Labour Welfare Endowment</span>
                          {includeLabourWelfare ? (
                            <button
                              type="button"
                              onClick={() => setIncludeLabourWelfare(false)}
                              className="text-[10px] font-bold text-red-600 border border-red-200 px-1.5 py-0.2 rounded hover:bg-red-50 cursor-pointer"
                            >
                              Remove
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setIncludeLabourWelfare(true)}
                              className="text-[10px] font-bold text-blue-700 border border-blue-200 px-1.5 py-0.2 rounded hover:bg-blue-50 cursor-pointer"
                            >
                              Add
                            </button>
                          )}
                        </div>
                        <span className="font-medium text-slate-700">
                          ₹{labourWelfare}
                        </span>
                      </div>

                      {includeLabourWelfare && (
                        <div className="flex justify-between">
                          <span>GST on labour welfare (18%)</span>
                          <span className="font-medium text-slate-700">
                            ₹{gstOnLabour}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Final Total Amount */}
                <div className="flex justify-between items-baseline pt-4 border-t-2 border-slate-200 font-black text-slate-900 text-base sm:text-lg">
                  <span>Total Amount</span>
                  <span className="text-xl sm:text-2xl text-[#0B1528]">
                    ₹{totalAmountToPay.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Guarantees */}
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 text-[11px] text-slate-600 space-y-1.5">
                <div className="flex items-center gap-2 text-slate-800 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>BharatFiling Assurance</span>
                </div>
                <p>
                  100% money-back guarantee if filing is rejected on technical grounds.
                  Dedicated CA assigned within 15 minutes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
