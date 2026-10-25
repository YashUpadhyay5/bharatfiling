import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
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
import { UDYAM_PLANS, getUdyamPlan } from './constants.js';

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

export default function UdyamPaymentPage({
  planId: propPlanId,
  formData = {},
  onPaymentSuccess,
}) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();

  const selectedPlanKey =
    propPlanId || searchParams.get('plan') || formData.plan || 'fast-track';
  const currentPlan = getUdyamPlan(selectedPlanKey);

  const basePrice = currentPlan.price;
  const gstAmount = Math.round(basePrice * currentPlan.gstRate);
  const totalAmount = basePrice + gstAmount;
  const discountSaved = currentPlan.originalPrice - currentPlan.price;

  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [selectedUpiApp, setSelectedUpiApp] = useState('gpay');
  const [vpaId, setVpaId] = useState('');
  const [selectedBank, setSelectedBank] = useState('State Bank of India');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  // 15-Minute Urgency Countdown Timer
  const [timeLeft, setTimeLeft] = useState(14 * 60 + 59);
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handlePayNow = async (e) => {
    if (e) e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1400));
      const refId = `BF-UDYAM-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
      setTransactionId(refId);
      setIsSuccess(true);

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });

      if (onPaymentSuccess) {
        onPaymentSuccess({ transactionId: refId, plan: currentPlan, amount: totalAmount });
      }

      setTimeout(() => {
        navigate('/dashboard');
      }, 3500);
    } catch {
      showError('Payment execution failed. Please re-try.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#F5F7F8] flex items-center justify-center px-4 font-sans">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 sm:p-10 max-w-md w-full text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">Payment Successful!</h2>
          <p className="text-xs text-slate-600">
            Your payment for <strong className="text-slate-800">{currentPlan.name} Plan</strong> has been confirmed.
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
      {/* Top Header Bar with BharatFiling Logo */}
      <header className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="inline-flex items-center select-none" title="BharatFiling">
            <img
              src="/bharatfiling-user-logo.png"
              alt="BharatFiling"
              className="h-8 sm:h-9 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/bharatfiling-horizontal-transparent.png';
              }}
            />
          </Link>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Secure Checkout</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT SECTION (8 COLS): Payment Options */}
          <div className="lg:col-span-8">
            {/* Green Discount Unlocked Floating Tab */}
            <div className="flex justify-end -mb-px">
              <div className="bg-[#10B981] text-white text-[11px] font-bold px-3.5 py-1 rounded-t-lg flex items-center gap-1.5 shadow-xs select-none">
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Special Festive Discount Unlocked: ₹{discountSaved.toLocaleString('en-IN')} Saved</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl rounded-tr-none border border-slate-200 shadow-sm overflow-hidden">
              {/* Method Switcher Header */}
              <div className="grid grid-cols-3 border-b border-slate-200 text-xs sm:text-sm font-bold bg-slate-50">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`py-3.5 px-4 text-center transition cursor-pointer flex items-center justify-center gap-2 ${
                    paymentMethod === 'upi'
                      ? 'bg-white text-blue-600 border-b-2 border-blue-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`py-3.5 px-4 text-center transition cursor-pointer flex items-center justify-center gap-2 ${
                    paymentMethod === 'card'
                      ? 'bg-white text-blue-600 border-b-2 border-blue-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Cards</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`py-3.5 px-4 text-center transition cursor-pointer flex items-center justify-center gap-2 ${
                    paymentMethod === 'netbanking'
                      ? 'bg-white text-blue-600 border-b-2 border-blue-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Landmark className="w-4 h-4" />
                  <span>Net Banking</span>
                </button>
              </div>

              {/* Panel Body */}
              <div className="p-6 sm:p-8">
                {paymentMethod === 'upi' && (
                  <div className="space-y-6">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Select UPI Application:
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { id: 'gpay', name: 'Google Pay', badge: 'Fastest' },
                        { id: 'phonepe', name: 'PhonePe', badge: 'Popular' },
                        { id: 'paytm', name: 'Paytm UPI' },
                        { id: 'bhim', name: 'BHIM / CRED' },
                      ].map((app) => (
                        <div
                          key={app.id}
                          onClick={() => setSelectedUpiApp(app.id)}
                          className={`p-3.5 rounded-xl border text-center transition cursor-pointer relative ${
                            selectedUpiApp === app.id
                              ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {app.badge && (
                            <span className="absolute -top-2 right-2 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded">
                              {app.badge}
                            </span>
                          )}
                          <div className="text-xs sm:text-sm font-bold text-slate-800">
                            {app.name}
                          </div>
                          <div className="text-[10px] text-slate-500 mt-0.5">Instant Approval</div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Or Enter UPI ID / VPA
                      </label>
                      <input
                        type="text"
                        value={vpaId}
                        onChange={(e) => setVpaId(e.target.value)}
                        placeholder="e.g. yourname@okhdfcbank"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-4 max-w-md">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">Card Number</label>
                      <input
                        type="text"
                        maxLength={19}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4532 &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 8920"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm font-mono focus:outline-none focus:ring-1 focus:ring-slate-400"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-slate-700">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-slate-700">CVV</label>
                        <input
                          type="password"
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="•••"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">Name on Card</label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="As printed on card"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div className="space-y-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Popular Indian Banks:
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {NET_BANKS.map((b) => (
                        <div
                          key={b}
                          onClick={() => setSelectedBank(b)}
                          className={`p-3 rounded-lg border text-center transition cursor-pointer text-xs font-semibold ${
                            selectedBank === b
                              ? 'border-blue-600 bg-blue-50 text-blue-700'
                              : 'border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          {b}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT SECTION (4 COLS): Order Summary & Dynamic Pay CTA */}
          <div className="lg:col-span-4 space-y-4">
            {/* Urgency Countdown Timer */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center justify-between text-xs text-amber-900 font-semibold">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-700 animate-pulse" />
                <span>Price Reserved For:</span>
              </div>
              <span className="font-mono text-sm font-black text-amber-800">
                {formatTimer(timeLeft)}
              </span>
            </div>

            {/* Order Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Filing Package
                </span>
                <h3 className="text-base font-extrabold text-slate-900">
                  MSME / Udyam Registration
                </h3>
                <div className="inline-block mt-1 px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-bold">
                  {currentPlan.name} Plan ({currentPlan.tat})
                </div>
              </div>

              {/* Line items */}
              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Professional Base Fee</span>
                  <span className="font-semibold text-slate-800 line-through">
                    ₹{currentPlan.originalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Festive Discount ({currentPlan.discountPercent}% OFF)</span>
                  <span>-₹{discountSaved.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Discounted Fee</span>
                  <span className="font-semibold text-slate-800">
                    ₹{basePrice.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Applicable GST (18%)</span>
                  <span className="font-semibold text-slate-800">
                    ₹{gstAmount.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-100 flex justify-between text-sm sm:text-base font-black text-slate-900">
                  <span>Total Amount</span>
                  <span>₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Pay Now Button */}
              <button
                type="button"
                onClick={handlePayNow}
                disabled={isProcessing}
                className="w-full py-3.5 px-4 rounded-xl bg-[#002B49] hover:bg-[#073866] active:scale-98 text-white font-bold text-sm shadow-md transition disabled:opacity-75 cursor-pointer flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing Secure Payment...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Pay ₹{totalAmount.toLocaleString('en-IN')} Securely</span>
                  </>
                )}
              </button>

              <div className="pt-1 flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-Bit SSL Encrypted &bull; RBI Regulated</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
