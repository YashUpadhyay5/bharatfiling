import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  Building2,
  Smartphone,
  ShieldCheck,
  Check,
  CheckCircle2,
  Clock,
  Lock,
  Award,
  ChevronRight,
  Sparkles,
  Info,
  ArrowLeft,
} from 'lucide-react';

export default function TrademarkPaymentPage({
  formData = {},
  onBack,
  onPaymentSuccess,
}) {
  // Payment tab selection: 'upi' | 'card' | 'netbanking'
  const [activeTab, setActiveTab] = useState('upi');

  // UPI app selection: 'phonepe' | 'gpay' | 'paytm' | 'other'
  const [selectedUpiApp, setSelectedUpiApp] = useState('phonepe');
  const [customUpiId, setCustomUpiId] = useState('');

  // Card details state
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');

  // Net banking selection state
  const [selectedBank, setSelectedBank] = useState('HDFC');

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaidSuccess, setIsPaidSuccess] = useState(false);

  // Countdown timer for 15 minutes (900 seconds)
  const [secondsLeft, setSecondsLeft] = useState(899);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Pricing strictly matching screenshot media_1793184439103_92c3d623.png:
  // Professional Fees: ₹1999
  // Online Discount: -₹500
  // GST @ 18%: ₹270
  // Total Amount: ₹1769
  const professionalFee = 1999;
  const onlineDiscount = 500;
  const gstAt18 = 270;
  const totalAmount = professionalFee - onlineDiscount + gstAt18; // 1769

  const orderNumber =
    formData.orderNumber || `#TM-${Math.floor(100000 + Math.random() * 900000)}`;

  const handlePay = (e) => {
    if (e) e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsPaidSuccess(true);

      if (onPaymentSuccess) {
        onPaymentSuccess({
          orderNumber,
          paymentMethod: activeTab,
          selectedUpiApp: activeTab === 'upi' ? selectedUpiApp : undefined,
          totalAmount,
          transactionId: `TXN-TM-${Date.now()}`,
          status: 'PAID',
        });
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-amber-100 selection:text-amber-900 pb-16">
      {/* =========================================================================
          TOP NAVBAR / HEADER (matches screenshot branding header)
          ========================================================================= */}
      <header className="bg-white border-b border-gray-200 py-3.5 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-slate-900 font-black text-sm px-2.5 py-1 rounded tracking-wider uppercase">
              BHARATFILING
            </span>
            <span className="text-xs text-slate-400 font-semibold hidden sm:inline">
              | Trade Marks Registry Partner
            </span>
          </div>

          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="text-xs text-slate-600 hover:text-slate-900 font-bold flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Plans</span>
            </button>
          )}
        </div>
      </header>

      {/* =========================================================================
          MAIN PAYMENT DESK CONTAINER
          ========================================================================= */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Main Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
            Choose Payment Method
          </h1>
          <div className="text-sm font-bold text-slate-700 mt-2">Payment Options</div>
        </div>

        {/* 2-Column Responsive Layout matching Screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* =====================================================================
              LEFT / CENTER CONTAINER: Tabs & Active Payment Method (~68% width)
              ===================================================================== */}
          <div className="lg:col-span-8 space-y-0 relative">
            {/* Top Green Promo Ribbon (Top Right of container matching screenshot) */}
            <div className="flex justify-end pr-2 sm:pr-4 -mb-px z-10 relative">
              <div className="bg-[#16a34a] text-white font-extrabold text-xs sm:text-sm px-4 py-2 rounded-t-xl shadow-xs flex items-center gap-1.5">
                <span>🎉</span>
                <span>Hooray! ₹500 Discount Unlocked!</span>
              </div>
            </div>

            {/* Main Options Box with Left Tabs and Right Panel */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden grid grid-cols-1 md:grid-cols-12">
              {/* Vertical Payment Method Tabs (Left Col, 5/12) */}
              <div className="md:col-span-5 border-r border-slate-200 bg-slate-50/50">
                {/* Tab 1: UPI */}
                <button
                  type="button"
                  onClick={() => setActiveTab('upi')}
                  className={`w-full p-4 text-left transition-all flex items-center justify-between cursor-pointer border-b border-slate-100 ${
                    activeTab === 'upi'
                      ? 'bg-white border-l-4 border-l-[#002B49] shadow-xs'
                      : 'border-l-4 border-l-transparent hover:bg-slate-100/60'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* UPI Logo / Icon */}
                    <div className="w-6 h-6 flex items-center justify-center text-slate-700 mt-0.5">
                      <svg className="w-5 h-5 text-slate-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-900 leading-tight">UPI</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Gpay, PhonePe, Paytm &amp; more
                      </div>
                    </div>
                  </div>
                  {activeTab === 'upi' && (
                    <span className="text-[#002B49] text-sm font-black">▶</span>
                  )}
                </button>

                {/* Tab 2: Credit/Debit/ATM Card */}
                <button
                  type="button"
                  onClick={() => setActiveTab('card')}
                  className={`w-full p-4 text-left transition-all flex items-center justify-between cursor-pointer border-b border-slate-100 ${
                    activeTab === 'card'
                      ? 'bg-white border-l-4 border-l-[#002B49] shadow-xs'
                      : 'border-l-4 border-l-transparent hover:bg-slate-100/60'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <CreditCard className="w-5 h-5 text-slate-700 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-bold text-sm text-slate-900 leading-tight">
                        Credit/Debit/ATM Card
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Visa, MasterCard, Rupay &amp; more
                      </div>
                    </div>
                  </div>
                  {activeTab === 'card' && (
                    <span className="text-[#002B49] text-sm font-black">▶</span>
                  )}
                </button>

                {/* Tab 3: Net Banking */}
                <button
                  type="button"
                  onClick={() => setActiveTab('netbanking')}
                  className={`w-full p-4 text-left transition-all flex items-center justify-between cursor-pointer ${
                    activeTab === 'netbanking'
                      ? 'bg-white border-l-4 border-l-[#002B49] shadow-xs'
                      : 'border-l-4 border-l-transparent hover:bg-slate-100/60'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-slate-700 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-bold text-sm text-slate-900 leading-tight">
                        Net Banking
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Pay using all Indian banks
                      </div>
                    </div>
                  </div>
                  {activeTab === 'netbanking' && (
                    <span className="text-[#002B49] text-sm font-black">▶</span>
                  )}
                </button>
              </div>

              {/* Active Panel Content (Right Col, 7/12) */}
              <div className="md:col-span-7 p-6 sm:p-7 space-y-6">
                {/* Red Discount Expiry Countdown matching Screenshot */}
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-red-500">
                  <Clock className="w-4 h-4 text-red-500 shrink-0" />
                  <span>
                    ₹500 discount expires in{' '}
                    <span className="font-black font-mono tracking-tight text-red-600">
                      {formatTimer(secondsLeft)}
                    </span>{' '}
                    minutes
                  </span>
                </div>

                {/* -------------------------------------------------------------
                    TAB CONTENT: UPI (Exact match of media_1793184439103_92c3d623.png)
                    ------------------------------------------------------------- */}
                {activeTab === 'upi' && (
                  <div className="space-y-6 animate-in fade-in duration-150">
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900">Pay with UPI</h3>
                      <div className="text-xs font-semibold text-slate-600 mt-1">
                        Select UPI App
                      </div>
                    </div>

                    {/* 4 UPI Apps in Horizontal Row */}
                    <div className="grid grid-cols-4 gap-3 text-center">
                      {/* 1. Google Pay */}
                      <div
                        onClick={() => setSelectedUpiApp('gpay')}
                        className="flex flex-col items-center gap-2 cursor-pointer group"
                      >
                        <div
                          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border flex items-center justify-center transition-all bg-white relative ${
                            selectedUpiApp === 'gpay'
                              ? 'border-slate-800 shadow-md ring-2 ring-[#002B49]'
                              : 'border-slate-200 group-hover:border-slate-400'
                          }`}
                        >
                          {/* Google Pay G Logo */}
                          <svg className="w-7 h-7" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                          </svg>

                          {selectedUpiApp === 'gpay' && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#002B49] text-white flex items-center justify-center text-[10px] shadow-xs">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          )}
                        </div>
                        <span className="text-xs font-semibold text-slate-800">Google pay</span>
                      </div>

                      {/* 2. PhonePe (Default Selected in Screenshot with Top-Right Checkmark) */}
                      <div
                        onClick={() => setSelectedUpiApp('phonepe')}
                        className="flex flex-col items-center gap-2 cursor-pointer group"
                      >
                        <div
                          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border flex items-center justify-center transition-all bg-[#5f259f] relative ${
                            selectedUpiApp === 'phonepe'
                              ? 'border-[#002B49] shadow-md ring-2 ring-[#002B49]'
                              : 'border-slate-200 group-hover:border-slate-400'
                          }`}
                        >
                          {/* PhonePe पे Symbol */}
                          <span className="text-white font-black text-2xl">पे</span>

                          {selectedUpiApp === 'phonepe' && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#002B49] text-white flex items-center justify-center text-[10px] shadow-xs border-2 border-white">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          )}
                        </div>
                        <span className="text-xs font-bold text-slate-900">PhonePe</span>
                      </div>

                      {/* 3. Paytm */}
                      <div
                        onClick={() => setSelectedUpiApp('paytm')}
                        className="flex flex-col items-center gap-2 cursor-pointer group"
                      >
                        <div
                          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border flex items-center justify-center transition-all bg-white relative ${
                            selectedUpiApp === 'paytm'
                              ? 'border-slate-800 shadow-md ring-2 ring-[#002B49]'
                              : 'border-slate-200 group-hover:border-slate-400'
                          }`}
                        >
                          <span className="text-[#002970] font-black text-sm tracking-tighter">
                            pay<span className="text-[#00b9f5]">tm</span>
                          </span>

                          {selectedUpiApp === 'paytm' && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#002B49] text-white flex items-center justify-center text-[10px] shadow-xs">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          )}
                        </div>
                        <span className="text-xs font-semibold text-slate-800">Paytm</span>
                      </div>

                      {/* 4. Other UPI ID */}
                      <div
                        onClick={() => setSelectedUpiApp('other')}
                        className="flex flex-col items-center gap-2 cursor-pointer group"
                      >
                        <div
                          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border flex items-center justify-center transition-all bg-white relative ${
                            selectedUpiApp === 'other'
                              ? 'border-slate-800 shadow-md ring-2 ring-[#002B49]'
                              : 'border-slate-200 group-hover:border-slate-400'
                          }`}
                        >
                          <span className="text-xs font-bold text-slate-700 font-mono tracking-tighter">
                            UPI&gt;
                          </span>

                          {selectedUpiApp === 'other' && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#002B49] text-white flex items-center justify-center text-[10px] shadow-xs">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          )}
                        </div>
                        <span className="text-xs font-semibold text-slate-800">Other UPI ID</span>
                      </div>
                    </div>

                    {/* App Specific Instructions */}
                    <p className="text-xs text-slate-600 font-normal">
                      {selectedUpiApp === 'phonepe' &&
                        'Pay through the PhonePe pay app on your phone'}
                      {selectedUpiApp === 'gpay' &&
                        'Pay through the Google Pay app on your phone'}
                      {selectedUpiApp === 'paytm' &&
                        'Pay through the Paytm UPI app on your phone'}
                      {selectedUpiApp === 'other' &&
                        'Enter any valid Virtual Payment Address (e.g. mobile@upi)'}
                    </p>

                    {/* VPA Input if 'other' is chosen */}
                    {selectedUpiApp === 'other' && (
                      <div className="space-y-1.5 animate-in fade-in duration-150">
                        <label className="block text-xs font-bold text-slate-700">
                          Enter UPI ID (VPA)
                        </label>
                        <input
                          type="text"
                          value={customUpiId}
                          onChange={(e) => setCustomUpiId(e.target.value)}
                          placeholder="e.g. 7668976193@ybl, username@okhdfcbank"
                          className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#002B49]"
                        />
                      </div>
                    )}

                    {/* Submit Pay Button */}
                    <button
                      type="button"
                      onClick={handlePay}
                      disabled={isProcessing}
                      className="w-full bg-[#002B49] hover:bg-[#001f35] text-white font-extrabold py-3.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-base cursor-pointer disabled:opacity-60"
                    >
                      {isProcessing ? (
                        <span>Processing Secure Payment...</span>
                      ) : (
                        <span>PAY ₹{totalAmount}</span>
                      )}
                    </button>
                  </div>
                )}

                {/* -------------------------------------------------------------
                    TAB CONTENT: Card
                    ------------------------------------------------------------- */}
                {activeTab === 'card' && (
                  <form onSubmit={handlePay} className="space-y-4 animate-in fade-in duration-150">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Credit / Debit / ATM Card
                    </h3>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) =>
                          setCardNumber(
                            e.target.value
                              .replace(/\D/g, '')
                              .slice(0, 16)
                              .replace(/(\d{4})/g, '$1 ')
                              .trim()
                          )
                        }
                        placeholder="4532 •••• •••• 8821"
                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm font-mono tracking-wider focus:ring-2 focus:ring-[#002B49] focus:outline-none"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Expiry (MM/YY)
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value.slice(0, 5))}
                          placeholder="MM/YY"
                          className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-[#002B49] focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          CVV / CVC
                        </label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) =>
                            setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))
                          }
                          placeholder="•••"
                          className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-[#002B49] focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="e.g. YASH UPADHYAY"
                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm uppercase focus:ring-2 focus:ring-[#002B49] focus:outline-none"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full bg-[#002B49] hover:bg-[#001f35] text-white font-extrabold py-3.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-base cursor-pointer disabled:opacity-60"
                    >
                      {isProcessing ? (
                        <span>Authorizing with Bank...</span>
                      ) : (
                        <span>PAY ₹{totalAmount}</span>
                      )}
                    </button>
                  </form>
                )}

                {/* -------------------------------------------------------------
                    TAB CONTENT: Net Banking
                    ------------------------------------------------------------- */}
                {activeTab === 'netbanking' && (
                  <form onSubmit={handlePay} className="space-y-4 animate-in fade-in duration-150">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Internet Banking
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {['HDFC', 'SBI', 'ICICI', 'Axis', 'Kotak', 'PNB'].map((bank) => (
                        <button
                          key={bank}
                          type="button"
                          onClick={() => setSelectedBank(bank)}
                          className={`p-3 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                            selectedBank === bank
                              ? 'border-[#002B49] bg-blue-50/30 ring-1 ring-[#002B49] text-[#002B49]'
                              : 'border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          {bank} Bank
                        </button>
                      ))}
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full bg-[#002B49] hover:bg-[#001f35] text-white font-extrabold py-3.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-base cursor-pointer disabled:opacity-60"
                    >
                      {isProcessing ? (
                        <span>Redirecting to {selectedBank} NetBanking...</span>
                      ) : (
                        <span>PAY ₹{totalAmount}</span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* =====================================================================
              RIGHT SIDE SUMMARY CARD: Trademark Registration Price Details (~32% width)
              ===================================================================== */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-5">
              {/* Card Header Title */}
              <h2 className="text-center font-extrabold text-lg text-slate-900 pb-3 border-b border-slate-100">
                Trademark Registration
              </h2>

              {/* Price Details Heading */}
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <span className="w-4 h-4 rounded-full border border-slate-800 flex items-center justify-center text-[10px] font-bold">
                  ₹
                </span>
                <span>Price details</span>
              </div>

              {/* Breakdown Rows */}
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Professional Fees</span>
                  <span className="font-bold text-slate-900">₹{professionalFee}</span>
                </div>

                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Online Discount</span>
                  <span className="font-bold">-₹{onlineDiscount}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>GST @ 18%</span>
                  <span className="font-bold text-slate-900">₹{gstAt18}</span>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                  <span className="font-extrabold text-base text-slate-900">Total Amount</span>
                  <span className="text-2xl font-black text-slate-900">₹{totalAmount}</span>
                </div>
              </div>
            </div>

            {/* Trust Badges matching Screenshot */}
            <div className="flex items-center justify-around py-3 px-2 text-center text-[11px] text-slate-600 font-medium">
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs">
                  PCI
                </div>
                <span>100% Secure Payment</span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <span>Guaranteed Satisfaction</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Success Modal */}
        {isPaidSuccess && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-7 space-y-5 text-center shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-2xl font-black text-[#002B49]">
                  Payment Received!
                </h3>
                <p className="text-xs text-slate-500">
                  Order Ref: <span className="font-mono font-bold text-slate-800">{orderNumber}</span>
                </p>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-left text-xs space-y-2 text-emerald-900">
                <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>Adv. Lakshita Arya Assigned as Legal IP Counsel</span>
                </div>
                <p className="text-emerald-700 leading-relaxed text-[11px]">
                  Your application Form TM-A drafting is in progress. You can start using the ™ symbol
                  as soon as your official IP India filing acknowledgment receipt is generated within
                  24 hours.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  window.location.href = '/dashboard';
                }}
                className="w-full bg-[#002B49] text-white font-bold py-3 rounded-lg text-sm hover:bg-[#001f35] transition-all cursor-pointer"
              >
                Go to Client Dashboard
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
