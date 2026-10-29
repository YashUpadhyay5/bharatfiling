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

export default function TrademarkRenewalPaymentPage({
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

  const isConsultation = formData.packageId === 'consultation';

  const getBaseFee = () => {
    if (formData.professionalFee) return formData.professionalFee;
    if (formData.packageId === 'consultation') return 499;
    if (formData.packageId === 'full_service') return 24999;
    if (formData.packageId === 'late_renewal') return 3499;
    if (formData.packageId === 'restoration') return 5999;
    return 24999;
  };

  const professionalFees = getBaseFee();
  const onlineDiscount = isConsultation ? 0 : 500;
  const discountedSubtotal = Math.max(0, professionalFees - onlineDiscount);
  const gstAmount = Math.round(discountedSubtotal * 0.18);
  const totalAmount = discountedSubtotal + gstAmount;

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
          totalAmount,
          transactionId: `TXN-TMREN-${Date.now()}`,
          status: 'PAID',
        });
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans p-4 sm:p-8 lg:p-12 selection:bg-[#002B49] selection:text-white">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Navigation & Header */}
        <div>
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#002B49] transition-colors cursor-pointer mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Overview</span>
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
                <span>
                  {isConsultation
                    ? 'Special Offer: ₹500 Off Applied (Introductory Fee: ₹499)!'
                    : 'Hooray! ₹500 Discount Unlocked!'}
                </span>
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
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                        UPI
                      </div>
                      <div>
                        <span className="font-extrabold text-sm sm:text-base text-slate-900 block">
                          UPI
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Google Pay, PhonePe, Paytm
                        </span>
                      </div>
                    </div>
                  </button>

                  {/* Tab 2: Card */}
                  <button
                    type="button"
                    onClick={() => setActiveTab('card')}
                    className={`w-full p-4 sm:p-5 text-left flex items-center justify-between cursor-pointer border-b border-gray-200 transition-colors ${
                      activeTab === 'card'
                        ? 'bg-white border-l-4 border-l-[#002B49]'
                        : 'border-l-4 border-l-transparent bg-[#f9fafb] hover:bg-gray-100/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0">
                        <CreditCard className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <span className="font-extrabold text-sm sm:text-base text-slate-900 block">
                          Debit / Credit Card
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Visa, Mastercard, RuPay
                        </span>
                      </div>
                    </div>
                  </button>

                  {/* Tab 3: NetBanking */}
                  <button
                    type="button"
                    onClick={() => setActiveTab('netbanking')}
                    className={`w-full p-4 sm:p-5 text-left flex items-center justify-between cursor-pointer border-b border-gray-200 transition-colors ${
                      activeTab === 'netbanking'
                        ? 'bg-white border-l-4 border-l-[#002B49]'
                        : 'border-l-4 border-l-transparent bg-[#f9fafb] hover:bg-gray-100/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-xs shrink-0">
                        <Building2 className="w-5 h-5 text-teal-700" />
                      </div>
                      <div>
                        <span className="font-extrabold text-sm sm:text-base text-slate-900 block">
                          Net Banking
                        </span>
                        <span className="text-[11px] text-slate-500">
                          All Indian Major Banks
                        </span>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Left Bottom Offer Countdown Timer */}
                <div className="p-4 bg-red-50/70 border-t border-red-100 m-3 rounded-xl flex items-center gap-2.5 text-xs text-red-700">
                  <Clock className="w-4 h-4 text-red-600 shrink-0 animate-pulse" />
                  <div>
                    <span className="font-bold block">Offer expires soon!</span>
                    <span className="font-mono font-semibold text-red-800">
                      {formatTimer(secondsLeft)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Panel: Content based on Tab */}
              <div className="md:col-span-7 p-6 sm:p-8 space-y-6">
                {activeTab === 'upi' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-bold text-slate-800 mb-3">
                        Choose your preferred UPI application:
                      </h3>

                      <div className="space-y-2.5">
                        {/* PhonePe (Selected by default) */}
                        <label
                          className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                            selectedUpiApp === 'phonepe'
                              ? 'border-[#002B49] bg-blue-50/40 ring-1 ring-[#002B49]'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="upiApp"
                              value="phonepe"
                              checked={selectedUpiApp === 'phonepe'}
                              onChange={() => setSelectedUpiApp('phonepe')}
                              className="accent-[#002B49] w-4 h-4"
                            />
                            <span className="font-bold text-sm text-slate-900">
                              PhonePe (Default)
                            </span>
                          </div>
                          <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                            Recommended
                          </span>
                        </label>

                        {/* Google Pay */}
                        <label
                          className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                            selectedUpiApp === 'gpay'
                              ? 'border-[#002B49] bg-blue-50/40 ring-1 ring-[#002B49]'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="upiApp"
                              value="gpay"
                              checked={selectedUpiApp === 'gpay'}
                              onChange={() => setSelectedUpiApp('gpay')}
                              className="accent-[#002B49] w-4 h-4"
                            />
                            <span className="font-bold text-sm text-slate-900">
                              Google Pay (Tez)
                            </span>
                          </div>
                        </label>

                        {/* Paytm */}
                        <label
                          className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                            selectedUpiApp === 'paytm'
                              ? 'border-[#002B49] bg-blue-50/40 ring-1 ring-[#002B49]'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="upiApp"
                              value="paytm"
                              checked={selectedUpiApp === 'paytm'}
                              onChange={() => setSelectedUpiApp('paytm')}
                              className="accent-[#002B49] w-4 h-4"
                            />
                            <span className="font-bold text-sm text-slate-900">Paytm UPI</span>
                          </div>
                        </label>

                        {/* Other UPI ID */}
                        <label
                          className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                            selectedUpiApp === 'other'
                              ? 'border-[#002B49] bg-blue-50/40 ring-1 ring-[#002B49]'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="upiApp"
                              value="other"
                              checked={selectedUpiApp === 'other'}
                              onChange={() => setSelectedUpiApp('other')}
                              className="accent-[#002B49] w-4 h-4"
                            />
                            <span className="font-bold text-sm text-slate-900">
                              Enter any UPI VPA / ID
                            </span>
                          </div>
                        </label>
                      </div>

                      {selectedUpiApp === 'other' && (
                        <div className="mt-3">
                          <input
                            type="text"
                            value={customUpiId}
                            onChange={(e) => setCustomUpiId(e.target.value)}
                            placeholder="e.g. mobile@upi or username@okhdfcbank"
                            className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#002B49]"
                          />
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={handlePay}
                      disabled={isProcessing}
                      className="w-full bg-[#002B49] hover:bg-[#001f35] text-white font-extrabold py-3.5 rounded-xl text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Lock className="w-4 h-4 text-emerald-400" />
                      <span>
                        {isProcessing ? 'Connecting...' : `PAY ₹${totalAmount}`}
                      </span>
                    </button>
                  </div>
                )}

                {activeTab === 'card' && (
                  <form onSubmit={handlePay} className="space-y-4">
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
                              .replace(/(.{4})/g, '$1 ')
                              .trim()
                          )
                        }
                        placeholder="4532 •••• •••• 8901"
                        className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#002B49]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Valid Thru (MM/YY)
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value.slice(0, 5))}
                          placeholder="12/28"
                          className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#002B49]"
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
                          className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#002B49]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="Name on card"
                        className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#002B49]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full bg-[#002B49] hover:bg-[#001f35] text-white font-extrabold py-3.5 rounded-xl text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 mt-4"
                    >
                      <Lock className="w-4 h-4 text-emerald-400" />
                      <span>
                        {isProcessing ? 'Processing Card...' : `PAY ₹${totalAmount}`}
                      </span>
                    </button>
                  </form>
                )}

                {activeTab === 'netbanking' && (
                  <form onSubmit={handlePay} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">
                        Select your Bank
                      </label>
                      <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#002B49]"
                      >
                        <option value="HDFC">HDFC Bank</option>
                        <option value="ICICI">ICICI Bank</option>
                        <option value="SBI">State Bank of India</option>
                        <option value="AXIS">Axis Bank</option>
                        <option value="KOTAK">Kotak Mahindra Bank</option>
                        <option value="OTHER">Other Indian Bank</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full bg-[#002B49] hover:bg-[#001f35] text-white font-extrabold py-3.5 rounded-xl text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 mt-4"
                    >
                      <Lock className="w-4 h-4 text-emerald-400" />
                      <span>
                        {isProcessing ? 'Connecting...' : `PAY ₹${totalAmount}`}
                      </span>
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
                Trademark Renewal &bull;{' '}
                <span className="text-[#002B49] font-black">
                  {formData.packageName ||
                    (formData.packageId === 'consultation'
                      ? 'Expert Consultation'
                      : formData.packageId === 'late_renewal'
                        ? 'Renewal with Surcharge'
                        : formData.packageId === 'restoration'
                          ? 'Restoration & Renewal'
                          : 'Full Service & Fulfilment')}
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
                  <span>Professional Legal Fee</span>
                  <span className="font-semibold text-slate-900">₹{professionalFees.toLocaleString('en-IN')}</span>
                </div>

                {onlineDiscount > 0 && (
                  <div className="flex justify-between text-[#28A745] font-medium">
                    <span>Online Discount</span>
                    <span className="font-bold">-₹{onlineDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-700">
                  <span>GST @ 18%</span>
                  <span className="font-semibold text-slate-900">₹{gstAmount.toLocaleString('en-IN')}</span>
                </div>

                <div className="border-b border-gray-200 my-2" />

                <div className="flex justify-between items-baseline pt-1">
                  <span className="font-extrabold text-base text-slate-900">Total Amount</span>
                  <span className="text-2xl font-black text-slate-900">₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>

                {isConsultation ? (
                  <p className="text-[11px] text-slate-500 italic pt-2 leading-relaxed border-t border-slate-100">
                    *The ₹499 consultation fee will be fully adjusted against the purchase of the Full Service & Fulfilment package.
                  </p>
                ) : (
                  <p className="text-[11px] text-slate-500 italic pt-2 leading-relaxed border-t border-slate-100">
                    *Statutory Government Fee (₹9,000 / class) payable as applicable upon Form TM-R submission on the IP India Gateway.
                  </p>
                )}
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
                <h3 className="text-xl font-black text-[#002B49]">
                  Trademark Renewal Order Placed!
                </h3>
                <p className="text-xs text-slate-500">
                  Order Ref: <strong className="text-slate-900">{orderNumber}</strong>
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">
                Payment of ₹{totalAmount} confirmed. Form TM-R drafting and IP India e-Register
                filing has been assigned to Senior Trademark Counsel Adv. Lakshita Arya.
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
