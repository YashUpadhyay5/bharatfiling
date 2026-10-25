import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  CreditCard,
  Landmark,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Lock,
  Loader2,
  Zap,
} from 'lucide-react';
import { api } from '../../services/api.js';
import { useToast } from '../../context/ToastContext.jsx';
import { GST_PLANS } from './constants.js';

const NET_BANKS = [
  'State Bank of India',
  'HDFC Bank',
  'ICICI Bank',
  'Axis Bank',
  'Kotak Mahindra Bank',
  'Punjab National Bank',
  'Bank of Baroda',
  'IDFC FIRST Bank',
];

export function resolvePlanMeta(planKey, orderAmount) {
  const key = String(planKey || '').toLowerCase();

  if (key === 'premium' || orderAmount === 1999) {
    return {
      id: 'premium',
      name: 'Premium',
      serviceName: 'GST Registration',
      originalPrice: 3999,
      discount: 2000,
      price: 1999,
    };
  }

  if (key === 'elite' || orderAmount === 4999) {
    return {
      id: 'elite',
      name: 'Elite',
      serviceName: 'GST Registration',
      originalPrice: 7999,
      discount: 3000,
      price: 4999,
    };
  }

  // Default Standard Plan
  return {
    id: 'standard',
    name: 'Standard',
    serviceName: 'GST Registration',
    originalPrice: 999,
    discount: 600,
    price: 399,
  };
}

export default function GstPaymentPage() {
  const { orderId } = useParams();
  const [searchParams] = useSearchParams();
  const queryPlan = searchParams.get('plan');
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeMethod, setActiveMethod] = useState('upi');
  const [selectedApp, setSelectedApp] = useState('phonepe'); // PhonePe default as in Image 1
  const [customVpa, setCustomVpa] = useState('');
  const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [selectedBank, setSelectedBank] = useState(NET_BANKS[0]);
  const [secondsLeft, setSecondsLeft] = useState(900); // 15:00 min
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  // 1. Load Order from backend or fallback draft
  useEffect(() => {
    const loadOrder = async () => {
      try {
        setLoading(true);
        if (orderId) {
          const res = await api.getCheckoutOrder(orderId);
          if (res.success && res.order) {
            setOrder(res.order);
            return;
          }
        }

        // Fallback draft from local storage
        const draftStr = localStorage.getItem('bharatfiling_gst_draft');
        const draft = draftStr ? JSON.parse(draftStr) : {};
        setOrder({
          id: orderId || `est${Date.now()}d`,
          order_number: `#${orderId || 'est2026d'}`,
          module_type: 'GST',
          plan: queryPlan || draft.plan || 'standard',
          service_name: 'GST Registration',
          amount: queryPlan === 'premium' ? 1999 : queryPlan === 'elite' ? 4999 : 399,
          customer_phone: draft.phone || '9876543210',
        });
      } catch (err) {
        // Fallback
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderId, queryPlan]);

  // 2. Countdown timer
  useEffect(() => {
    if (secondsLeft <= 0 || isSuccess) return;
    const timer = setInterval(() => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft, isSuccess]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // 3. Dynamically resolve Plan (Standard / Premium / Elite)
  const currentPlan = useMemo(() => {
    return resolvePlanMeta(queryPlan || order?.plan, order?.amount);
  }, [queryPlan, order]);

  // 4. Handle Payment
  const handlePay = async () => {
    if (!order?.id) return;

    let payment_mode = 'UPI_QR';
    let upi_id = '';

    if (activeMethod === 'upi') {
      payment_mode = 'UPI_QR';
      upi_id =
        selectedApp === 'other'
          ? customVpa
          : `${order?.customer_phone || '9876543210'}@${selectedApp === 'phonepe' ? 'ybl' : selectedApp === 'gpay' ? 'okaxis' : 'paytm'}`;
      if (selectedApp === 'other' && (!upi_id || !upi_id.includes('@'))) {
        showError('Please enter a valid UPI ID (e.g. yourname@okhdfcbank)');
        return;
      }
    } else if (activeMethod === 'card') {
      payment_mode = 'CARD';
      if (cardDetails.number.replace(/\s/g, '').length < 12 || cardDetails.cvv.length < 3 || !cardDetails.expiry) {
        showError('Please enter complete card details');
        return;
      }
    } else if (activeMethod === 'netbanking') {
      payment_mode = 'NETBANKING';
    }

    try {
      setIsProcessing(true);
      const payload = {
        order_id: order.id,
        amount: currentPlan.price,
        payment_mode,
        upi_id: upi_id || undefined,
      };

      const res = await api.verifyGstPayment(payload);

      if (res.success) {
        setIsSuccess(true);
        setTransactionId(res.transaction_id || `TXN_${Date.now()}`);
        confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 }, colors: ['#042D50', '#FFD200', '#22C55E'] });
        showSuccess('Payment verified successfully!');
        setTimeout(() => navigate('/dashboard'), 2400);
      } else {
        showError(res.message || 'Payment could not be verified. Please try again.');
      }
    } catch (err) {
      showError(err.message || 'Payment could not be processed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F7F8] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-[#022B50] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-500 font-semibold">Loading Payment Desk...</p>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#F5F7F8] flex items-center justify-center px-4 font-sans">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 sm:p-10 max-w-md w-full text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">Payment Successful!</h2>
          <p className="text-xs text-slate-600">
            Your payment for <strong className="text-slate-800">{currentPlan.serviceName} ({currentPlan.name} Plan)</strong> has been confirmed.
          </p>
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 inline-block font-mono font-bold text-slate-800">
            Ref ID: {transactionId}
          </div>
          <p className="text-xs text-emerald-700 font-semibold">Redirecting to your Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7F8] font-sans pb-16">
      {/* Top Header Bar with VAKIL SEARCH Logo */}
      <header className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="inline-flex items-center gap-1 select-none">
            <span className="bg-[#FFD200] text-black font-black text-xs px-2 py-0.5 rounded-[3px] tracking-wider uppercase">
              VAKIL
            </span>
            <span className="text-black font-black text-xs tracking-wider uppercase">
              SEARCH
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Secure Checkout</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT SECTION (8 COLS): Payment Options & Active Method Panel */}
          <div className="lg:col-span-8">
            {/* Green Discount Unlocked Floating Tab on top right of the payment panel */}
            <div className="flex justify-end -mb-px">
              <div className="bg-[#2EAD39] text-white text-xs sm:text-sm font-extrabold px-5 py-2 rounded-t-xl inline-flex items-center gap-2 shadow-xs select-none">
                <span>🎉</span>
                <span>Hooray! ₹{currentPlan.discount.toLocaleString('en-IN')} Discount Unlocked!</span>
              </div>
            </div>

            {/* Main Payment Card */}
            <div className="bg-white rounded-2xl rounded-tr-none border border-slate-200 shadow-[0_8px_30px_rgba(0,0,0,0.05)] overflow-hidden">
              
              {/* Dynamic Red Timer Header */}
              <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2 text-[#FF2B32] font-bold text-xs sm:text-sm">
                <Clock className="w-4 h-4 text-[#FF2B32] shrink-0" />
                <span>
                  ₹{currentPlan.discount.toLocaleString('en-IN')} discount expires in {formatTime(secondsLeft)} minutes
                </span>
              </div>

              {/* Grid: Left Tabs + Right Active Payment Method Form */}
              <div className="grid grid-cols-1 sm:grid-cols-12 min-h-[380px]">
                
                {/* Left Method Tabs (4 cols on sm) */}
                <div className="sm:col-span-5 border-r border-slate-100 bg-[#F8FAFC]">
                  <div className="px-4 py-3 border-b border-slate-100 text-xs font-bold text-slate-800">
                    Payment Options
                  </div>

                  <div className="divide-y divide-slate-100/60">
                    {/* 1. UPI Tab */}
                    <button
                      type="button"
                      onClick={() => setActiveMethod('upi')}
                      className={`w-full flex items-center justify-between p-4 text-left transition cursor-pointer ${
                        activeMethod === 'upi'
                          ? 'bg-white border-l-4 border-l-[#022B50]'
                          : 'hover:bg-slate-100/70'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Custom UPI Icon */}
                        <div className="w-7 h-7 flex items-center justify-center shrink-0">
                          <svg className="w-5 h-5 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="12 2 22 20 2 20 12 2" />
                          </svg>
                        </div>
                        <div>
                          <div className={`text-xs font-bold ${activeMethod === 'upi' ? 'text-slate-900' : 'text-slate-700'}`}>
                            UPI
                          </div>
                          <div className="text-[10px] text-slate-400">Gpay, PhonePe, Paytm &amp; more</div>
                        </div>
                      </div>
                      {activeMethod === 'upi' && (
                        <span className="text-[#022B50] font-black text-sm">&gt;</span>
                      )}
                    </button>

                    {/* 2. Card Tab */}
                    <button
                      type="button"
                      onClick={() => setActiveMethod('card')}
                      className={`w-full flex items-center justify-between p-4 text-left transition cursor-pointer ${
                        activeMethod === 'card'
                          ? 'bg-white border-l-4 border-l-[#022B50]'
                          : 'hover:bg-slate-100/70'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-slate-500 shrink-0" />
                        <div>
                          <div className={`text-xs font-bold ${activeMethod === 'card' ? 'text-slate-900' : 'text-slate-700'}`}>
                            Credit/Debit/ATM Card
                          </div>
                          <div className="text-[10px] text-slate-400">Visa, MasterCard, Rupay &amp; more</div>
                        </div>
                      </div>
                      {activeMethod === 'card' && (
                        <span className="text-[#022B50] font-black text-sm">&gt;</span>
                      )}
                    </button>

                    {/* 3. Net Banking Tab */}
                    <button
                      type="button"
                      onClick={() => setActiveMethod('netbanking')}
                      className={`w-full flex items-center justify-between p-4 text-left transition cursor-pointer ${
                        activeMethod === 'netbanking'
                          ? 'bg-white border-l-4 border-l-[#022B50]'
                          : 'hover:bg-slate-100/70'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Landmark className="w-5 h-5 text-slate-500 shrink-0" />
                        <div>
                          <div className={`text-xs font-bold ${activeMethod === 'netbanking' ? 'text-slate-900' : 'text-slate-700'}`}>
                            Net Banking
                          </div>
                          <div className="text-[10px] text-slate-400">Pay using all Indian banks</div>
                        </div>
                      </div>
                      {activeMethod === 'netbanking' && (
                        <span className="text-[#022B50] font-black text-sm">&gt;</span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Right Form Area (7 cols on sm) */}
                <div className="sm:col-span-7 p-6 sm:p-7 flex flex-col justify-between">
                  {/* UPI MODE */}
                  {activeMethod === 'upi' && (
                    <div className="space-y-5">
                      <h3 className="text-base font-extrabold text-slate-900">
                        Pay with UPI
                      </h3>

                      <div>
                        <div className="text-xs font-medium text-slate-600 mb-3">
                          Select UPI App
                        </div>

                        {/* 4 Apps row: Google pay, PhonePe, Paytm, Other UPI ID */}
                        <div className="grid grid-cols-4 gap-3 text-center">
                          {/* Google Pay */}
                          <button
                            type="button"
                            onClick={() => setSelectedApp('gpay')}
                            className="flex flex-col items-center gap-1.5 cursor-pointer group"
                          >
                            <div className={`w-12 h-12 rounded-full border flex items-center justify-center bg-white shadow-2xs transition ${
                              selectedApp === 'gpay' ? 'border-[#022B50] ring-2 ring-[#022B50]/20' : 'border-slate-200'
                            }`}>
                              <svg className="w-6 h-6" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z" />
                                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24Z" />
                                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.93 0 12s.45 3.84 1.25 5.42l4.03-3.15Z" />
                                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z" />
                              </svg>
                            </div>
                            <span className="text-[11px] font-medium text-slate-700">Google pay</span>
                          </button>

                          {/* PhonePe (Selected by default) */}
                          <button
                            type="button"
                            onClick={() => setSelectedApp('phonepe')}
                            className="flex flex-col items-center gap-1.5 cursor-pointer group relative"
                          >
                            <div className="relative">
                              <div className={`w-12 h-12 rounded-full bg-[#5F259F] flex items-center justify-center text-white font-extrabold text-xl shadow-2xs transition ${
                                selectedApp === 'phonepe' ? 'ring-2 ring-offset-1 ring-[#5F259F]' : ''
                              }`}>
                                पे
                              </div>
                              {selectedApp === 'phonepe' && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#022B50] text-white flex items-center justify-center text-[10px] font-bold">
                                  ✓
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] font-semibold text-slate-900">PhonePe</span>
                          </button>

                          {/* Paytm */}
                          <button
                            type="button"
                            onClick={() => setSelectedApp('paytm')}
                            className="flex flex-col items-center gap-1.5 cursor-pointer group"
                          >
                            <div className={`w-12 h-12 rounded-full border flex items-center justify-center bg-white shadow-2xs transition ${
                              selectedApp === 'paytm' ? 'border-[#022B50] ring-2 ring-[#022B50]/20' : 'border-slate-200'
                            }`}>
                              <span className="text-[#002E6E] font-black text-xs italic">pay<span className="text-[#00BAF2]">tm</span></span>
                            </div>
                            <span className="text-[11px] font-medium text-slate-700">Paytm</span>
                          </button>

                          {/* Other UPI ID */}
                          <button
                            type="button"
                            onClick={() => setSelectedApp('other')}
                            className="flex flex-col items-center gap-1.5 cursor-pointer group"
                          >
                            <div className={`w-12 h-12 rounded-full border flex items-center justify-center bg-white shadow-2xs transition ${
                              selectedApp === 'other' ? 'border-[#022B50] ring-2 ring-[#022B50]/20' : 'border-slate-200'
                            }`}>
                              <span className="font-extrabold text-xs text-slate-700 tracking-tight">UPI</span>
                            </div>
                            <span className="text-[11px] font-medium text-slate-700">Other UPI ID</span>
                          </button>
                        </div>
                      </div>

                      {/* Instructions / Input */}
                      {selectedApp === 'other' ? (
                        <div className="space-y-1.5 pt-1">
                          <label className="block text-xs font-bold text-slate-700">Enter UPI ID</label>
                          <input
                            type="text"
                            value={customVpa}
                            onChange={(e) => setCustomVpa(e.target.value)}
                            placeholder="e.g. yourname@okhdfcbank"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:ring-1 focus:ring-slate-400"
                          />
                        </div>
                      ) : (
                        <div className="text-xs text-slate-500 pt-1">
                          Pay through the{' '}
                          <strong className="text-slate-800">
                            {selectedApp === 'phonepe' ? 'PhonePe' : selectedApp === 'gpay' ? 'Google pay' : 'Paytm'}
                          </strong>{' '}
                          pay app on your phone
                        </div>
                      )}
                    </div>
                  )}

                  {/* CARD MODE */}
                  {activeMethod === 'card' && (
                    <div className="space-y-3">
                      <h3 className="text-base font-extrabold text-slate-900">Credit / Debit Card</h3>
                      <input
                        type="text"
                        maxLength={19}
                        placeholder="Card Number"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm font-medium"
                      />
                      <input
                        type="text"
                        placeholder="Name on Card"
                        value={cardDetails.name}
                        onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm font-medium"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="MM / YY"
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm font-medium"
                        />
                        <input
                          type="password"
                          maxLength={4}
                          placeholder="CVV"
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm font-medium"
                        />
                      </div>
                    </div>
                  )}

                  {/* NET BANKING MODE */}
                  {activeMethod === 'netbanking' && (
                    <div className="space-y-3">
                      <h3 className="text-base font-extrabold text-slate-900">Net Banking</h3>
                      <p className="text-xs text-slate-500">Select your bank from the list below:</p>
                      <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm font-medium bg-white"
                      >
                        {NET_BANKS.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* CTA BUTTON & HASTE NOTICE */}
                  <div className="pt-6">
                    <button
                      type="button"
                      onClick={handlePay}
                      disabled={isProcessing}
                      className="w-full py-3 sm:py-3.5 rounded-md bg-[#022B50] hover:bg-[#06182B] text-white font-extrabold text-sm sm:text-base tracking-wide transition active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 shadow-xs disabled:opacity-75"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Processing Payment...</span>
                        </>
                      ) : (
                        <span>PAY ₹{currentPlan.price.toLocaleString('en-IN')}</span>
                      )}
                    </button>

                    <div className="mt-4 flex items-center justify-center gap-1.5 text-xs font-bold text-slate-900 text-center">
                      <span className="text-amber-500 text-sm">⚡</span>
                      <span>Hurry! Your Expert will be assigned right after the Payment</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* RIGHT SECTION (4 COLS): Dynamic Price Details & Trust Badges */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.05)] p-6 space-y-4">
              
              {/* Centered Service Name */}
              <h2 className="text-base sm:text-lg font-bold text-slate-900 text-center">
                {currentPlan.serviceName}
              </h2>

              <div className="pt-2">
                {/* Price details title with Rupee Icon */}
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-900 mb-3.5">
                  <span className="w-4 h-4 rounded-full border border-slate-800 flex items-center justify-center text-[10px] font-bold shrink-0">
                    ₹
                  </span>
                  <span>Price details</span>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 text-xs sm:text-sm">
                  {/* Fees */}
                  <div className="flex justify-between text-slate-700">
                    <span>Professional Fees (Inclusive GST)</span>
                    <span className="font-semibold text-slate-900">
                      ₹{currentPlan.originalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Online Discount (Green) */}
                  <div className="flex justify-between text-[#16A34A] font-semibold">
                    <span>Online Discount</span>
                    <span>-₹{currentPlan.discount.toLocaleString('en-IN')}</span>
                  </div>

                  {/* Total Amount */}
                  <div className="border-t border-slate-200 pt-3 flex justify-between items-center text-slate-900">
                    <span className="text-sm font-bold">Total Amount</span>
                    <span className="text-lg sm:text-xl font-extrabold">
                      ₹{currentPlan.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-5 pt-1 text-[11px] text-slate-600 font-semibold select-none">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-[10px] px-1 py-0.5 rounded bg-slate-100 border border-slate-300 text-slate-800 tracking-tighter">
                  PCI
                </span>
                <span>100% Secure Payment</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-bold">
                  ✓
                </span>
                <span>Guaranteed Satisfaction</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
