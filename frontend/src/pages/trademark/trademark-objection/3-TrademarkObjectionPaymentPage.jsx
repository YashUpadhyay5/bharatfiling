import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  Building2,
  ShieldCheck,
  Check,
  Clock,
  Lock,
  ArrowLeft,
} from 'lucide-react';

export default function TrademarkObjectionPaymentPage({
  formData = {},
  onBack,
  onPaymentSuccess,
}) {
  const [activeTab, setActiveTab] = useState('upi');
  const [selectedUpiApp, setSelectedUpiApp] = useState('phonepe');
  const [customUpiId, setCustomUpiId] = useState('');

  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');

  const [selectedBank, setSelectedBank] = useState('HDFC');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaidSuccess, setIsPaidSuccess] = useState(false);

  // Timer countdown: 15 minutes
  const [secondsLeft, setSecondsLeft] = useState(899);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSec) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const getBaseFee = () => {
    if (formData.professionalFee) return formData.professionalFee;
    if (formData.packageId === 'starter') return 3499;
    if (formData.packageId === 'standard') return 7999;
    return 13999;
  };

  const professionalFees = getBaseFee();
  const onlineDiscount = 500;
  const discountedSubtotal = Math.max(0, professionalFees - onlineDiscount);
  const gstAmount = Math.round(discountedSubtotal * 0.18);
  const totalAmount = discountedSubtotal + gstAmount;

  const orderNumber =
    formData.orderNumber || `#TM-OBJ-${Math.floor(100000 + Math.random() * 900000)}`;

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
          transactionId: `TXN-TMOBJ-${Date.now()}`,
          status: 'PAID',
        });
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans p-4 sm:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Main Title & Subtitle */}
        <div>
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#002B49] transition-colors cursor-pointer mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Plans</span>
            </button>
          )}
          <h1 className="text-2xl sm:text-[28px] font-extrabold text-[#002B49] tracking-tight">
            Choose Payment Method
          </h1>
          <div className="text-sm font-bold text-slate-800 mt-2">Payment Options</div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Center Container: Tabs & Active Panel */}
          <div className="lg:col-span-8 relative">
            {/* Top Green Promo Tab */}
            <div className="flex justify-end pr-2 sm:pr-4">
              <div className="bg-[#28A745] text-white font-extrabold text-xs sm:text-sm px-6 py-2 rounded-t-2xl shadow-xs inline-flex items-center gap-1.5 z-10">
                <span>🎉</span>
                <span>Hooray! ₹500 Discount Unlocked!</span>
              </div>
            </div>

            {/* Main Options Box */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs grid grid-cols-1 md:grid-cols-12">
              {/* Left Vertical Tabs (5 of 12 cols) */}
              <div className="md:col-span-5 border-r border-gray-200 bg-[#fbfbfb] flex flex-col justify-between">
                <div>
                  {/* Tab 1: UPI */}
                  <button
                    type="button"
                    onClick={() => setActiveTab('upi')}
                    className={`w-full p-4 sm:p-5 text-left flex items-center justify-between cursor-pointer border-b border-gray-200 transition-colors ${
                      activeTab === 'upi'
                        ? 'bg-white border-l-4 border-l-[#002B49]'
                        : 'border-l-4 border-l-transparent bg-[#f9fafb] hover:bg-gray-100/60'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 flex items-center justify-center text-slate-800 mt-0.5 shrink-0">
                        <svg className="w-4 h-4 text-slate-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
                        : 'border-l-4 border-l-transparent bg-[#f9fafb] hover:bg-gray-100/60'
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
                    className={`w-full p-4 sm:p-5 text-left flex items-center justify-between cursor-pointer transition-colors ${
                      activeTab === 'netbanking'
                        ? 'bg-white border-l-4 border-l-[#002B49]'
                        : 'border-l-4 border-l-transparent bg-[#f9fafb] hover:bg-gray-100/60'
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
                </div>

                <div className="p-4 text-[11px] text-slate-400 font-medium">
                  🔒 256-Bit SSL Secured
                </div>
              </div>

              {/* Right Active Panel (7 of 12 cols) */}
              <div className="md:col-span-7 p-6 sm:p-7 space-y-5">
                {/* Red Discount Expiry Countdown */}
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-red-500">
                  <Clock className="w-4 h-4 text-red-500 shrink-0 stroke-[2.2]" />
                  <span>
                    ₹500 discount expires in{' '}
                    <span className="font-bold font-mono text-red-600">
                      {formatTimer(secondsLeft)}
                    </span>{' '}
                    minutes
                  </span>
                </div>

                {/* View: Pay with UPI */}
                {activeTab === 'upi' && (
                  <div className="space-y-4">
                    <h3 className="font-bold text-base text-slate-900">Pay with UPI</h3>
                    <div className="border-b border-gray-200 pt-0.5" />
                    <div className="text-xs text-slate-600 font-normal">Select UPI App</div>

                    <div className="grid grid-cols-4 gap-2.5 sm:gap-4 text-center pt-1">
                      {/* Google Pay */}
                      <div
                        onClick={() => setSelectedUpiApp('gpay')}
                        className="flex flex-col items-center gap-2 cursor-pointer group"
                      >
                        <div
                          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border flex items-center justify-center transition-all bg-white relative ${
                            selectedUpiApp === 'gpay'
                              ? 'border-slate-800 shadow-sm ring-2 ring-[#002B49]'
                              : 'border-gray-200 group-hover:border-gray-400'
                          }`}
                        >
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
                        <span className="text-xs font-medium text-slate-800">Google pay</span>
                      </div>

                      {/* PhonePe */}
                      <div
                        onClick={() => setSelectedUpiApp('phonepe')}
                        className="flex flex-col items-center gap-2 cursor-pointer group"
                      >
                        <div
                          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border flex items-center justify-center transition-all bg-[#5f259f] relative ${
                            selectedUpiApp === 'phonepe'
                              ? 'border-[#002B49] shadow-sm ring-2 ring-[#002B49]'
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

                      {/* Paytm */}
                      <div
                        onClick={() => setSelectedUpiApp('paytm')}
                        className="flex flex-col items-center gap-2 cursor-pointer group"
                      >
                        <div
                          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border flex items-center justify-center transition-all bg-white relative ${
                            selectedUpiApp === 'paytm'
                              ? 'border-slate-800 shadow-sm ring-2 ring-[#002B49]'
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
                        <span className="text-xs font-medium text-slate-800">Paytm</span>
                      </div>

                      {/* Other UPI ID */}
                      <div
                        onClick={() => setSelectedUpiApp('other')}
                        className="flex flex-col items-center gap-2 cursor-pointer group"
                      >
                        <div
                          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border flex items-center justify-center transition-all bg-white relative ${
                            selectedUpiApp === 'other'
                              ? 'border-slate-800 shadow-sm ring-2 ring-[#002B49]'
                              : 'border-gray-200 group-hover:border-gray-400'
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
                        <span className="text-xs font-medium text-slate-800">Other UPI ID</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 pt-2 font-normal">
                      {selectedUpiApp === 'phonepe' &&
                        'Pay through the PhonePe pay app on your phone'}
                      {selectedUpiApp === 'gpay' &&
                        'Pay through the Google Pay app on your phone'}
                      {selectedUpiApp === 'paytm' &&
                        'Pay through the Paytm UPI app on your phone'}
                      {selectedUpiApp === 'other' &&
                        'Enter your Virtual Payment Address (e.g. mobile@upi)'}
                    </p>

                    {selectedUpiApp === 'other' && (
                      <div className="space-y-1.5 pt-1">
                        <input
                          type="text"
                          value={customUpiId}
                          onChange={(e) => setCustomUpiId(e.target.value)}
                          placeholder="e.g. 7668976193@ybl"
                          className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#002B49]"
                        />
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handlePay}
                        disabled={isProcessing}
                        className="w-full bg-[#002B49] hover:bg-[#001f35] text-white font-extrabold py-3.5 px-6 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center text-sm sm:text-base tracking-wide cursor-pointer disabled:opacity-60"
                      >
                        {isProcessing ? 'Processing Payment...' : `PAY ₹${totalAmount}`}
                      </button>
                    </div>
                  </div>
                )}

                {/* View: Card */}
                {activeTab === 'card' && (
                  <form onSubmit={handlePay} className="space-y-3.5">
                    <h3 className="font-bold text-base text-slate-900">
                      Credit / Debit / ATM Card
                    </h3>
                    <div className="border-b border-gray-200" />

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
                        className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-[#002B49] focus:outline-none"
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
                      className="w-full bg-[#002B49] hover:bg-[#001f35] text-white font-extrabold py-3.5 px-6 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center text-sm sm:text-base tracking-wide cursor-pointer disabled:opacity-60"
                    >
                      {isProcessing ? 'Authorizing Card...' : `PAY ₹${totalAmount}`}
                    </button>
                  </form>
                )}

                {/* View: Net Banking */}
                {activeTab === 'netbanking' && (
                  <form onSubmit={handlePay} className="space-y-3.5">
                    <h3 className="font-bold text-base text-slate-900">Internet Banking</h3>
                    <div className="border-b border-gray-200" />

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {['HDFC', 'SBI', 'ICICI', 'Axis', 'Kotak', 'PNB'].map((bank) => (
                        <button
                          key={bank}
                          type="button"
                          onClick={() => setSelectedBank(bank)}
                          className={`p-3 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                            selectedBank === bank
                              ? 'border-[#002B49] bg-blue-50/40 ring-1 ring-[#002B49] text-[#002B49]'
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
                      className="w-full bg-[#002B49] hover:bg-[#001f35] text-white font-extrabold py-3.5 px-6 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center text-sm sm:text-base tracking-wide cursor-pointer disabled:opacity-60"
                    >
                      {isProcessing ? 'Connecting...' : `PAY ₹${totalAmount}`}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Price Details Card */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-2xs space-y-4">
              <h2 className="text-center font-bold text-sm sm:text-base text-slate-900 pb-3 border-b border-gray-200">
                Trademark Objection Reply &bull;{' '}
                <span className="text-[#002B49] font-black">
                  {formData.packageName ||
                    (formData.packageId === 'starter'
                      ? 'Starter Plan'
                      : formData.packageId === 'standard'
                        ? 'Standard Plan'
                        : 'Premium Plan')}
                </span>
              </h2>

              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 pt-1">
                <span className="w-4 h-4 rounded-full border border-slate-700 flex items-center justify-center text-[10px] font-bold">
                  ₹
                </span>
                <span>Price details</span>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between text-slate-700">
                  <span>Professional Fees</span>
                  <span className="font-semibold text-slate-900">₹{professionalFees}</span>
                </div>

                <div className="flex justify-between text-[#28A745] font-medium">
                  <span>Online Discount</span>
                  <span className="font-bold">-₹{onlineDiscount}</span>
                </div>

                <div className="flex justify-between text-slate-700">
                  <span>GST @ 18%</span>
                  <span className="font-semibold text-slate-900">₹{gstAmount}</span>
                </div>

                <div className="border-b border-gray-200 my-2" />

                <div className="flex justify-between items-baseline pt-1">
                  <span className="font-extrabold text-base text-slate-900">Total Amount</span>
                  <span className="text-2xl font-black text-slate-900">₹{totalAmount}</span>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
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

              <div className="space-y-1">
                <h3 className="text-xl font-black text-[#002B49]">Objection Defense Order Placed!</h3>
                <p className="text-xs text-slate-500">
                  Order Ref: <strong className="text-slate-900">{orderNumber}</strong>
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">
                Payment of ₹{totalAmount} confirmed. Senior High Court IP Advocate has been assigned to
                review your examination report and draft your statutory reply within 24 hours.
              </p>

              <button
                type="button"
                onClick={() => {
                  window.location.href = '/dashboard';
                }}
                className="w-full bg-[#002B49] text-white font-bold py-3 rounded-lg text-sm hover:bg-[#001f35] transition-all cursor-pointer"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
