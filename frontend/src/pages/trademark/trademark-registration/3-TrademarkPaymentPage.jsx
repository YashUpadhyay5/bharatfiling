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
  FileCheck,
  Award,
} from 'lucide-react';

export default function TrademarkPaymentPage({
  formData = {},
  onBack,
  onPaymentSuccess,
}) {
  const [selectedMethod, setSelectedMethod] = useState('phonepe_upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [upiId, setUpiId] = useState('');

  const professionalFee = formData.professionalFee || 1199;
  const gstOnFee = formData.gstOnFee || Math.round(professionalFee * 0.18);
  const totalGovtFee = formData.totalGovtFee || 4500;
  const totalAmount = formData.totalAmount || professionalFee + gstOnFee + totalGovtFee;

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
    }, 1200);
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

          <div className="p-6 sm:p-8 space-y-8">
            {/* Order Summary Pill Grid */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Order Summary
                </span>
                <span className="text-[11px] font-bold bg-blue-100 text-[#002B49] px-2.5 py-0.5 rounded-full">
                  {formData.planName || 'Standard Plan'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-slate-500 block">Protection Type:</span>
                  <span className="font-bold text-slate-800">
                    {formData.protectionType === 'brand_name_logo'
                      ? 'Brand name + Logo'
                      : formData.protectionType === 'brand_name'
                      ? 'Brand name'
                      : formData.protectionType === 'logo'
                      ? 'Logo only'
                      : 'Brand name + Logo'}
                  </span>
                </div>

                <div>
                  <span className="text-slate-500 block">Selected Classes:</span>
                  <span className="font-bold text-slate-800">
                    {formData.selectedClasses?.map((c) => `Class ${c}`).join(', ') || 'Class 30'}
                  </span>
                </div>

                <div>
                  <span className="text-slate-500 block">Filing Speed:</span>
                  <span className="font-bold text-emerald-700">
                    {formData.planId === 'express' ? '⚡ Within 6 Hours' : '⌛ Within 24 Hours'}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-600">
                <div>Prof. Fee: <strong>₹{professionalFee}</strong></div>
                <div>GST (18%): <strong>₹{gstOnFee}</strong></div>
                <div>Govt. Fee: <strong>₹{totalGovtFee}</strong></div>
                <div className="font-bold text-slate-900">Total: ₹{totalAmount}</div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-4">
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
                      placeholder="e.g. 7668976193@ybl, user@okaxis"
                      className="flex-1 px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#002B49] focus:outline-none"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Or scan the dynamic QR code on the next screen from any UPI app.
                  </p>
                </div>
              )}
            </div>

            {/* Pay Button */}
            <button
              type="button"
              onClick={handlePayNow}
              disabled={isProcessing}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>
                {isProcessing
                  ? 'Processing Secure Payment...'
                  : `Pay ₹${totalAmount} & Complete Trademark Filing`}
              </span>
            </button>

            <div className="text-center text-xs text-slate-500 flex items-center justify-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Secure Transaction via RBI Authorized Gateway • Money-Back Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
