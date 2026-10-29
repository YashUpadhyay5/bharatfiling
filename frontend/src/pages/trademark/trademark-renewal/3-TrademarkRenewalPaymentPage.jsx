import React, { useState } from 'react';
import {
  CreditCard,
  Building2,
  ShieldCheck,
  Check,
  Lock,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export default function TrademarkRenewalPaymentPage({
  formData = {},
  onBack,
  onPaymentSuccess,
}) {
  const [activeTab, setActiveTab] = useState('upi');
  const [selectedUpiApp, setSelectedUpiApp] = useState('phonepe');
  const [customUpiId, setCustomUpiId] = useState('');

  // Card form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');

  // Net banking state
  const [selectedBank, setSelectedBank] = useState('HDFC');

  // EMI state
  const [selectedEmiBank, setSelectedEmiBank] = useState('HDFC');
  const [selectedEmiTenure, setSelectedEmiTenure] = useState(6);

  // Labour Welfare Endowment toggle (Default: true matching screenshot)
  const [includeLabourWelfare, setIncludeLabourWelfare] = useState(true);
  const [showTaxesDetails, setShowTaxesDetails] = useState(true);

  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaidSuccess, setIsPaidSuccess] = useState(false);

  const isConsultation = formData.packageId === 'consultation';

  // Base Fee determination
  const getBaseFee = () => {
    if (formData.professionalFee) return formData.professionalFee;
    if (formData.packageId === 'consultation') return 499;
    if (formData.packageId === 'late_renewal') return 3499;
    if (formData.packageId === 'restoration') return 5999;
    return 24999;
  };

  const professionalFees = getBaseFee();
  const gstOnFee = Math.round(professionalFees * 0.18);

  // Labour Welfare is optional and removable
  const labourWelfareAmount = includeLabourWelfare ? 399 : 0;
  const gstOnLabour = includeLabourWelfare ? Math.round(399 * 0.18) : 0; // 72

  const taxesAndCharges = gstOnFee + labourWelfareAmount + gstOnLabour;
  const totalAmount = professionalFees + taxesAndCharges;

  const orderNumber =
    formData.orderNumber || `#TM-REN-${Math.floor(100000 + Math.random() * 900000)}`;

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
          includeLabourWelfare,
          totalAmount,
          transactionId: `TXN-TMREN-${Date.now()}`,
          status: 'PAID',
        });
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#002B49] selection:text-white">
      {/* ========================================================= */}
      {/* 1. TOP NAVBAR (1:1 with Screenshot)                       */}
      {/* ========================================================= */}
      <header className="bg-white border-b border-gray-100 px-4 sm:px-8 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1.5 focus:outline-none">
            <span className="bg-[#FDB813] text-slate-950 font-black text-xs sm:text-sm px-2 py-1 rounded tracking-wider uppercase">
              BHARAT
            </span>
            <span className="text-[#002B49] font-black text-base sm:text-lg tracking-tight">
              FILING
            </span>
          </div>

          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#002B49] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Plans</span>
            </button>
          )}
        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. MAIN PAYMENT DESK (1:1 with media_1793260498575_eb574aee.png) */}
      {/* ========================================================= */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
        {/* Main Title & Subtitle */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-[28px] font-extrabold text-[#002B49] tracking-tight">
            Choose Payment Method
          </h1>
          <div className="text-sm font-bold text-slate-800 mt-2">Payment Options</div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ------------------------------------------------------- */}
          {/* Left Column: Payment Options Box (8 of 12 cols)         */}
          {/* ------------------------------------------------------- */}
          <div className="lg:col-span-8 bg-white rounded-lg border border-gray-200 overflow-hidden shadow-2xs grid grid-cols-1 md:grid-cols-12">
            {/* Left Vertical Tabs (5 of 12 cols) */}
            <div className="md:col-span-5 border-r border-gray-200 bg-[#FAFAFA] flex flex-col justify-between">
              <div>
                {/* Tab 1: UPI */}
                <button
                  type="button"
                  onClick={() => setActiveTab('upi')}
                  className={`w-full p-4 sm:p-5 text-left flex items-center justify-between cursor-pointer border-b border-gray-200 transition-colors ${
                    activeTab === 'upi'
                      ? 'bg-white border-l-4 border-l-[#002B49]'
                      : 'border-l-4 border-l-transparent bg-[#FAFAFA] hover:bg-gray-100/70'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 flex items-center justify-center text-slate-800 mt-0.5 shrink-0">
                      <svg
                        className="w-4 h-4 text-slate-800"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-900 leading-tight">UPI</div>
                      <div className="text-[11px] text-slate-500 mt-1">
                        Gpay, PhonePe, Paytm &amp; more
                      </div>
                    </div>
                  </div>
                  {activeTab === 'upi' && (
                    <span className="text-[#002B49] text-xs font-black">▶</span>
                  )}
                </button>

                {/* Tab 2: Credit/Debit/ATM Card */}
                <button
                  type="button"
                  onClick={() => setActiveTab('card')}
                  className={`w-full p-4 sm:p-5 text-left flex items-center justify-between cursor-pointer border-b border-gray-200 transition-colors ${
                    activeTab === 'card'
                      ? 'bg-white border-l-4 border-l-[#002B49]'
                      : 'border-l-4 border-l-transparent bg-[#FAFAFA] hover:bg-gray-100/70'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <CreditCard className="w-5 h-5 text-slate-700 mt-0.5 shrink-0 stroke-[1.8]" />
                    <div>
                      <div className="font-bold text-sm text-slate-900 leading-tight">
                        Credit/Debit/ATM Card
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">
                        Visa, MasterCard, Rupay &amp; more
                      </div>
                    </div>
                  </div>
                  {activeTab === 'card' && (
                    <span className="text-[#002B49] text-xs font-black">▶</span>
                  )}
                </button>

                {/* Tab 3: Net Banking */}
                <button
                  type="button"
                  onClick={() => setActiveTab('netbanking')}
                  className={`w-full p-4 sm:p-5 text-left flex items-center justify-between cursor-pointer border-b border-gray-200 transition-colors ${
                    activeTab === 'netbanking'
                      ? 'bg-white border-l-4 border-l-[#002B49]'
                      : 'border-l-4 border-l-transparent bg-[#FAFAFA] hover:bg-gray-100/70'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-slate-700 mt-0.5 shrink-0 stroke-[1.8]" />
                    <div>
                      <div className="font-bold text-sm text-slate-900 leading-tight">
                        Net Banking
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">
                        Pay using all Indian banks
                      </div>
                    </div>
                  </div>
                  {activeTab === 'netbanking' && (
                    <span className="text-[#002B49] text-xs font-black">▶</span>
                  )}
                </button>

                {/* Tab 4: EMI option */}
                <button
                  type="button"
                  onClick={() => setActiveTab('emi')}
                  className={`w-full p-4 sm:p-5 text-left flex items-center justify-between cursor-pointer transition-colors ${
                    activeTab === 'emi'
                      ? 'bg-white border-l-4 border-l-[#002B49]'
                      : 'border-l-4 border-l-transparent bg-[#FAFAFA] hover:bg-gray-100/70'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 border border-slate-700 rounded text-[9px] font-black flex items-center justify-center text-slate-800 mt-0.5 shrink-0">
                      EMI
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-900 leading-tight">
                        EMI option
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">
                        Pay using credit card &amp; Debit card
                      </div>
                    </div>
                  </div>
                  {activeTab === 'emi' && (
                    <span className="text-[#002B49] text-xs font-black">▶</span>
                  )}
                </button>
              </div>

              <div className="p-4 text-[11px] text-slate-400 font-medium">
                🔒 256-Bit SSL Secured
              </div>
            </div>

            {/* Right Active Panel (7 of 12 cols) */}
            <div className="md:col-span-7 p-6 sm:p-8 space-y-6 bg-white">
              {/* =================================================== */}
              {/* VIEW: Pay with UPI                                  */}
              {/* =================================================== */}
              {activeTab === 'upi' && (
                <div className="space-y-5">
                  <h3 className="font-bold text-base sm:text-lg text-slate-900 pb-3 border-b border-gray-200">
                    Pay with UPI
                  </h3>

                  <div className="text-xs sm:text-sm text-slate-600 font-medium pt-1">
                    Select UPI App
                  </div>

                  {/* 4 UPI Apps (1:1 with Screenshot) */}
                  <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center items-start pt-1">
                    {/* 1. Google Pay */}
                    <div
                      onClick={() => setSelectedUpiApp('gpay')}
                      className="flex flex-col items-center gap-2 cursor-pointer group"
                    >
                      <div
                        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border flex items-center justify-center transition-all bg-white relative ${
                          selectedUpiApp === 'gpay'
                            ? 'border-slate-800 ring-2 ring-[#002B49] shadow-sm'
                            : 'border-gray-200 group-hover:border-gray-400'
                        }`}
                      >
                        <svg className="w-7 h-7" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                          />
                        </svg>
                        {selectedUpiApp === 'gpay' && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#002B49] text-white flex items-center justify-center text-[10px] shadow-xs">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <span className="text-xs font-semibold text-slate-800">Google pay</span>
                    </div>

                    {/* 2. PhonePe (Selected by default) */}
                    <div
                      onClick={() => setSelectedUpiApp('phonepe')}
                      className="flex flex-col items-center gap-2 cursor-pointer group"
                    >
                      <div
                        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border flex items-center justify-center transition-all bg-[#5f259f] relative ${
                          selectedUpiApp === 'phonepe'
                            ? 'border-[#002B49] ring-2 ring-[#002B49] shadow-sm'
                            : 'border-gray-200 group-hover:border-gray-400'
                        }`}
                      >
                        <span className="text-white font-black text-2xl leading-none">पे</span>
                        {selectedUpiApp === 'phonepe' && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#002B49] text-white flex items-center justify-center text-[10px] shadow-xs border border-white">
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
                            ? 'border-slate-800 ring-2 ring-[#002B49] shadow-sm'
                            : 'border-gray-200 group-hover:border-gray-400'
                        }`}
                      >
                        <span className="text-[#002970] font-black text-xs sm:text-sm tracking-tighter">
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
                            ? 'border-slate-800 ring-2 ring-[#002B49] shadow-sm'
                            : 'border-gray-200 group-hover:border-gray-400'
                        }`}
                      >
                        <div className="flex items-center text-slate-800 font-extrabold text-[11px] tracking-tighter">
                          <span className="text-emerald-700">U</span>
                          <span className="text-amber-600">P</span>
                          <span className="text-blue-700">I</span>
                        </div>
                        {selectedUpiApp === 'other' && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#002B49] text-white flex items-center justify-center text-[10px] shadow-xs">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <span className="text-xs font-semibold text-slate-800">Other UPI ID</span>
                    </div>
                  </div>

                  {/* App instruction or Custom UPI ID field */}
                  {selectedUpiApp === 'other' ? (
                    <div className="pt-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Enter UPI ID / VPA
                      </label>
                      <input
                        type="text"
                        value={customUpiId}
                        onChange={(e) => setCustomUpiId(e.target.value)}
                        placeholder="e.g. yourname@okhdfcbank"
                        className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-[#002B49] focus:outline-none"
                      />
                    </div>
                  ) : (
                    <p className="text-xs sm:text-sm text-slate-500 pt-3">
                      Pay through the{' '}
                      <span className="font-semibold text-slate-800">
                        {selectedUpiApp === 'phonepe'
                          ? 'PhonePe pay app'
                          : selectedUpiApp === 'gpay'
                            ? 'Google pay app'
                            : 'Paytm app'}
                      </span>{' '}
                      on your phone
                    </p>
                  )}

                  {/* CTA Button (1:1 with Screenshot) */}
                  <button
                    type="button"
                    onClick={handlePay}
                    disabled={isProcessing}
                    className="w-full bg-[#002B49] hover:bg-[#001D33] active:scale-[0.99] text-white font-extrabold py-3.5 px-6 rounded-lg text-sm sm:text-base tracking-wide transition-all shadow-sm cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2 mt-4"
                  >
                    <Lock className="w-4 h-4 text-emerald-400" />
                    <span>
                      {isProcessing ? 'Processing...' : `PAY ₹${totalAmount}`}
                    </span>
                  </button>
                </div>
              )}

              {/* =================================================== */}
              {/* VIEW: Credit/Debit/ATM Card                         */}
              {/* =================================================== */}
              {activeTab === 'card' && (
                <form onSubmit={handlePay} className="space-y-4">
                  <h3 className="font-bold text-base sm:text-lg text-slate-900 pb-3 border-b border-gray-200">
                    Pay with Card
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
                            .replace(/(\d{4})/g, '$1 ')
                            .trim()
                            .slice(0, 19)
                        )
                      }
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-[#002B49] focus:outline-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value.slice(0, 5))}
                        placeholder="MM/YY"
                        className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-[#002B49] focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="password"
                        value={cardCvv}
                        onChange={(e) =>
                          setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))
                        }
                        placeholder="•••"
                        className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-[#002B49] focus:outline-none"
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
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm uppercase focus:ring-2 focus:ring-[#002B49] focus:outline-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-[#002B49] hover:bg-[#001D33] active:scale-[0.99] text-white font-extrabold py-3.5 px-6 rounded-lg text-sm sm:text-base tracking-wide transition-all shadow-sm cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2 mt-4"
                  >
                    <Lock className="w-4 h-4 text-emerald-400" />
                    <span>
                      {isProcessing ? 'Authorizing Card...' : `PAY ₹${totalAmount}`}
                    </span>
                  </button>
                </form>
              )}

              {/* =================================================== */}
              {/* VIEW: Net Banking                                   */}
              {/* =================================================== */}
              {activeTab === 'netbanking' && (
                <form onSubmit={handlePay} className="space-y-4">
                  <h3 className="font-bold text-base sm:text-lg text-slate-900 pb-3 border-b border-gray-200">
                    Pay with Net Banking
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {['HDFC', 'SBI', 'ICICI', 'Axis', 'Kotak', 'PNB'].map((bank) => (
                      <button
                        key={bank}
                        type="button"
                        onClick={() => setSelectedBank(bank)}
                        className={`p-3 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                          selectedBank === bank
                            ? 'border-[#002B49] bg-blue-50/50 ring-1 ring-[#002B49] text-[#002B49]'
                            : 'border-gray-200 text-slate-700 hover:border-gray-300'
                        }`}
                      >
                        {bank} Bank
                      </button>
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-[#002B49] hover:bg-[#001D33] active:scale-[0.99] text-white font-extrabold py-3.5 px-6 rounded-lg text-sm sm:text-base tracking-wide transition-all shadow-sm cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2 mt-4"
                  >
                    <Lock className="w-4 h-4 text-emerald-400" />
                    <span>
                      {isProcessing ? 'Connecting...' : `PAY ₹${totalAmount}`}
                    </span>
                  </button>
                </form>
              )}

              {/* =================================================== */}
              {/* VIEW: EMI option (1:1 with Screenshot)              */}
              {/* =================================================== */}
              {activeTab === 'emi' && (
                <form onSubmit={handlePay} className="space-y-4">
                  <h3 className="font-bold text-base sm:text-lg text-slate-900 pb-3 border-b border-gray-200">
                    Pay with EMI
                  </h3>
                  <p className="text-xs text-slate-500">
                    Available on major credit &amp; debit cards (HDFC, ICICI, SBI, Axis, Kotak)
                  </p>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-700">
                      Select EMI Tenure
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {[
                        { months: 3, rate: 0.14 },
                        { months: 6, rate: 0.14 },
                        { months: 12, rate: 0.15 },
                      ].map((emi) => {
                        const monthly = Math.round(
                          (totalAmount * (1 + emi.rate)) / emi.months
                        );
                        return (
                          <div
                            key={emi.months}
                            onClick={() => setSelectedEmiTenure(emi.months)}
                            className={`p-3 rounded-lg border text-center cursor-pointer transition-all ${
                              selectedEmiTenure === emi.months
                                ? 'border-[#002B49] bg-blue-50/50 ring-1 ring-[#002B49]'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="font-bold text-sm text-slate-900">
                              {emi.months} Months
                            </div>
                            <div className="text-xs text-slate-600 mt-1">
                              ₹{monthly}/mo
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-[#002B49] hover:bg-[#001D33] active:scale-[0.99] text-white font-extrabold py-3.5 px-6 rounded-lg text-sm sm:text-base tracking-wide transition-all shadow-sm cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2 mt-4"
                  >
                    <Lock className="w-4 h-4 text-emerald-400" />
                    <span>
                      {isProcessing ? 'Processing EMI...' : `PAY VIA EMI ₹${totalAmount}`}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* ------------------------------------------------------- */}
          {/* Right Column: Price Details Card (4 of 12 cols)         */}
          {/* (1:1 matching media_1793260498575_eb574aee.png)         */}
          {/* ------------------------------------------------------- */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-2xs space-y-4">
              {/* Title centered matching screenshot */}
              <h2 className="text-center font-extrabold text-base sm:text-lg text-slate-900 pb-3 border-b border-gray-100">
                TM Renewal
              </h2>

              {/* Price details header with circled ₹ */}
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 pt-1">
                <span className="w-4 h-4 rounded-full border border-slate-700 flex items-center justify-center text-[10px] font-bold">
                  ₹
                </span>
                <span>Price details</span>
              </div>

              {/* Breakdown lines */}
              <div className="space-y-3 text-xs sm:text-sm">
                {/* Professional Fees */}
                <div className="flex justify-between text-slate-700">
                  <span>Professional Fees</span>
                  <span className="font-semibold text-slate-900">
                    ₹{professionalFees}
                  </span>
                </div>

                {/* Taxes & Charges dropdown (with ▲ toggle) */}
                <div>
                  <button
                    type="button"
                    onClick={() => setShowTaxesDetails(!showTaxesDetails)}
                    className="w-full flex justify-between items-center text-slate-700 font-medium hover:text-slate-900 cursor-pointer focus:outline-none"
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="text-[10px] text-slate-600">
                        {showTaxesDetails ? '▲' : '▼'}
                      </span>
                      <span>Taxes &amp; Charges</span>
                    </span>
                    <span className="font-semibold text-slate-900">
                      ₹{taxesAndCharges}
                    </span>
                  </button>

                  {/* Collapsible Details */}
                  {showTaxesDetails && (
                    <div className="mt-2 space-y-2 pl-4 text-xs text-slate-600 bg-slate-50/60 p-2.5 rounded border border-slate-100">
                      {/* GST on professional fee */}
                      <div className="flex justify-between">
                        <span>GST on professional fee (18%)</span>
                        <span className="font-medium text-slate-800">
                          ₹{gstOnFee}
                        </span>
                      </div>

                      {/* Labour Welfare Endowment with [Remove] button */}
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-2">
                          <span>Labour Welfare Endowment</span>
                          <button
                            type="button"
                            onClick={() =>
                              setIncludeLabourWelfare(!includeLabourWelfare)
                            }
                            className={`rounded px-1.5 py-0.5 text-[10px] font-semibold cursor-pointer transition-colors ${
                              includeLabourWelfare
                                ? 'border border-rose-400 text-rose-500 hover:bg-rose-50'
                                : 'border border-slate-300 text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            {includeLabourWelfare ? 'Remove' : '+ Add'}
                          </button>
                        </span>
                        <span className="font-medium text-slate-800">
                          ₹{labourWelfareAmount}
                        </span>
                      </div>

                      {/* GST on labour welfare */}
                      {includeLabourWelfare && (
                        <div className="flex justify-between">
                          <span>GST on labour welfare (18%)</span>
                          <span className="font-medium text-slate-800">
                            ₹{gstOnLabour}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="border-b border-gray-200 my-2" />

                {/* Total Amount */}
                <div className="flex justify-between items-baseline pt-1">
                  <span className="font-extrabold text-base text-slate-900">
                    Total Amount
                  </span>
                  <span className="text-2xl font-black text-slate-900">
                    ₹{totalAmount}
                  </span>
                </div>

                {isConsultation ? (
                  <p className="text-[11px] text-slate-500 italic pt-2 leading-relaxed border-t border-slate-100">
                    *The consultation fee is fully adjustable against the purchase of the Full Service &amp; Fulfilment package.
                  </p>
                ) : (
                  <p className="text-[11px] text-slate-500 italic pt-2 leading-relaxed border-t border-slate-100">
                    *Statutory Government Fee (₹9,000 / class) payable as applicable upon Form TM-R submission on the IP India Gateway.
                  </p>
                )}
              </div>
            </div>

            {/* Trust Badges (1:1 with Screenshot) */}
            <div className="flex items-center justify-around pt-3 text-center text-xs text-slate-700 font-medium">
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-800 flex items-center justify-center font-black text-xs border border-teal-200">
                  PCI
                </div>
                <span className="text-[11px] font-semibold text-slate-800">
                  100% Secure Payment
                </span>
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="text-[11px] font-semibold text-slate-800">
                  Guaranteed Satisfaction
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        {isPaidSuccess && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Payment Authorized Successfully!
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Thank you! Your payment of{' '}
                <span className="font-bold text-slate-900">₹{totalAmount}</span> has been
                recorded. Reference:{' '}
                <span className="font-mono font-bold text-[#002B49]">{orderNumber}</span>.
                A Senior IP Advocate will begin drafting your Form TM-R renewal application within 24 hours.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => (window.location.href = '/dashboard/customer')}
                  className="w-full bg-[#002B49] text-white py-3 rounded-lg text-xs font-bold hover:bg-[#001D33] cursor-pointer"
                >
                  Go to Client Dashboard
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
