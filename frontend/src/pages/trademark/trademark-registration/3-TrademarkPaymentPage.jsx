import React, { useState } from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Lock,
  QrCode,
  CreditCard,
  Building,
  Smartphone,
  Sparkles,
} from 'lucide-react';

export default function TrademarkPaymentPage({
  formData = {},
  onBack,
  onPaymentSuccess,
}) {
  const [selectedMethod, setSelectedMethod] = useState('phonepe_upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [upiId, setUpiId] = useState('');

  const totalAmount = formData.totalAmount || 1199;
  const orderNumber =
    formData.orderNumber || `#TM-${Math.floor(100000 + Math.random() * 900000)}`;

  const handlePayNow = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (onPaymentSuccess) {
        onPaymentSuccess({
          orderNumber,
          paymentMethod: selectedMethod,
          totalAmount,
          transactionId: `TXN-TM-${Date.now()}`,
        });
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back link */}
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Configuration</span>
        </button>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-[#002B49] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-amber-400 font-bold">
                Trademark Registration Filing Order
              </div>
              <h1 className="text-2xl font-black mt-1">Payment Desk</h1>
              <p className="text-xs text-slate-300 mt-1">Order Ref: {orderNumber}</p>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-xs text-slate-300">Amount Due</div>
              <div className="text-3xl font-black text-amber-400">₹{totalAmount}</div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="p-6 sm:p-8 space-y-6">
            <h3 className="font-bold text-slate-900 text-sm">Select Payment Mode</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* PhonePe UPI */}
              <div
                onClick={() => setSelectedMethod('phonepe_upi')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedMethod === 'phonepe_upi'
                    ? 'border-emerald-600 ring-2 ring-emerald-600 bg-emerald-50/20 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                  <Smartphone className="w-5 h-5 text-purple-600" />
                  <span>UPI / QR</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">GPay, PhonePe, Paytm, BHIM</div>
              </div>

              {/* Cards */}
              <div
                onClick={() => setSelectedMethod('card')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedMethod === 'card'
                    ? 'border-emerald-600 ring-2 ring-emerald-600 bg-emerald-50/20 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <span>Credit / Debit Card</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">Visa, Mastercard, RuPay</div>
              </div>

              {/* NetBanking */}
              <div
                onClick={() => setSelectedMethod('netbanking')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedMethod === 'netbanking'
                    ? 'border-emerald-600 ring-2 ring-emerald-600 bg-emerald-50/20 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                  <Building className="w-5 h-5 text-slate-700" />
                  <span>Net Banking</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">All Major Indian Banks</div>
              </div>
            </div>

            {/* UPI Details if selected */}
            {selectedMethod === 'phonepe_upi' && (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <label className="block text-xs font-bold text-slate-700">Enter UPI ID (VPA)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="e.g. mobile@okaxis, user@ybl"
                    className="flex-1 px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#002B49] focus:outline-none"
                  />
                </div>
                <p className="text-[11px] text-slate-500">
                  Or scan the dynamic QR code on the next screen from any UPI app.
                </p>
              </div>
            )}

            {/* Pay Button */}
            <button
              type="button"
              onClick={handlePayNow}
              disabled={isProcessing}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>
                {isProcessing ? 'Processing Secure Payment...' : `Pay ₹${totalAmount} & Complete Filing`}
              </span>
            </button>

            <div className="text-center text-xs text-slate-500 flex items-center justify-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Secure Transaction via RBI Authorized Gateway</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
