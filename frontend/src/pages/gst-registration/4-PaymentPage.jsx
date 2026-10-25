import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  Smartphone,
  CreditCard,
  Landmark,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Lock,
  RefreshCw,
  Loader2,
  BadgeCheck,
} from 'lucide-react';
import { api } from '../../services/api.js';
import { useToast } from '../../context/ToastContext.jsx';
import { buildUpiIntentUri, generateUpiQrDataUrl } from '../../utils/upiQr.js';
import { getGstPlan } from './constants.js';

const UPI_APPS = [
  { id: 'gpay', label: 'Google Pay', suffix: '@okaxis' },
  { id: 'phonepe', label: 'PhonePe', suffix: '@ybl' },
  { id: 'paytm', label: 'Paytm', suffix: '@paytm' },
  { id: 'other', label: 'Other UPI ID', suffix: '' },
];

const NET_BANKS = [
  'State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank',
  'Punjab National Bank', 'Kotak Mahindra Bank', 'Bank of Baroda', 'IDFC FIRST Bank',
];

const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI', subtitle: 'Gpay, PhonePe, Paytm & more', icon: Smartphone },
  { id: 'card', label: 'Credit/Debit/ATM Card', subtitle: 'Visa, MasterCard, Rupay & more', icon: CreditCard },
  { id: 'netbanking', label: 'Net Banking', subtitle: 'Pay using all Indian banks', icon: Landmark },
];

export default function GstPaymentPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeMethod, setActiveMethod] = useState('upi');
  const [selectedApp, setSelectedApp] = useState('gpay');
  const [customVpa, setCustomVpa] = useState('');
  const [enableAutopay, setEnableAutopay] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState(null);
  const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [bank, setBank] = useState(NET_BANKS[0]);
  const [secondsLeft, setSecondsLeft] = useState(900);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  useEffect(() => {
    const loadOrder = async () => {
      try {
        setLoading(true);
        const res = await api.getCheckoutOrder(orderId);
        if (res.success && res.order) {
          setOrder(res.order);
        } else {
          showError(res.message || 'Order not found. Please start your application again.');
        }
      } catch (err) {
        showError(err.message || 'Could not load your order for payment.');
      } finally {
        setLoading(false);
      }
    };
    if (orderId) loadOrder();
  }, [orderId]);

  useEffect(() => {
    if (secondsLeft <= 0 || isSuccess) return;
    const timer = setInterval(() => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft, isSuccess]);

  useEffect(() => {
    if (!order) return;
    const upiUri = buildUpiIntentUri({
      payeeVpa: import.meta.env.VITE_UPI_VPA || 'bharatfiling@hdfcbank',
      payeeName: import.meta.env.VITE_MERCHANT_NAME || 'BharatFiling Private Limited',
      amount: order.amount,
      transactionNote: order.service_name || 'BharatFiling Compliance Advisory',
      referenceId: order.order_number || order.id,
    });
    generateUpiQrDataUrl(upiUri, 220).then(setQrDataUrl);
  }, [order]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const planMeta = useMemo(() => (order?.module_type === 'GST' ? getGstPlan(order?.plan) : null), [order]);

  const vpaValue = selectedApp === 'other' ? customVpa : `${order?.customer_phone || '9876543210'}${UPI_APPS.find((a) => a.id === selectedApp)?.suffix || '@upi'}`;

  const handlePay = async () => {
    if (!order?.id) return;

    let payment_mode = 'UPI_QR';
    let upi_id = '';

    if (activeMethod === 'upi') {
      payment_mode = enableAutopay ? 'AUTOPAY' : 'UPI_QR';
      upi_id = vpaValue;
      if (!upi_id || !upi_id.includes('@')) {
        showError('Please enter a valid UPI ID, e.g. yourname@paytm');
        return;
      }
    } else if (activeMethod === 'card') {
      payment_mode = 'CARD';
      if (cardDetails.number.replace(/\s/g, '').length < 12 || cardDetails.cvv.length < 3 || !cardDetails.expiry) {
        showError('Please enter complete card details to continue');
        return;
      }
    } else if (activeMethod === 'netbanking') {
      payment_mode = 'NETBANKING';
    }

    try {
      setIsProcessing(true);
      const payload = {
        order_id: order.id,
        upi_id: upi_id || undefined,
        payment_mode,
        amount: order.amount,
      };
      // GST orders settle through the dedicated GST payment screen (Screen 4); every other
      // module (Company, ITR, Trademark, LLP) keeps using the shared payments gateway.
      const res = order.module_type === 'GST'
        ? await api.verifyGstPayment(payload)
        : await api.verifyUpiPayment(payload);

      if (res.success) {
        setIsSuccess(true);
        setTransactionId(res.transaction_id || `TXN_${Date.now()}`);
        confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 }, colors: ['#111827', '#F26522', '#10B981'] });
        showSuccess('Payment verified successfully!');
        setTimeout(() => navigate('/dashboard'), 2200);
      } else {
        showError(res.message || 'Payment verification failed. Please try again.');
      }
    } catch (err) {
      showError(err.message || 'Payment could not be processed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-[#111827] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-500 font-semibold">Loading secure payment desk...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center space-y-3">
          <p className="text-sm font-bold text-slate-900">We couldn't find this order.</p>
          <button
            onClick={() => navigate('/apply/gst')}
            className="px-5 py-2.5 rounded-full bg-[#111827] text-white text-xs font-bold cursor-pointer"
          >
            Start a New Application
          </button>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 sm:p-10 max-w-md w-full text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">Payment Successful!</h2>
          <p className="text-xs text-slate-600">
            Your order <strong className="text-slate-800">{order.order_number}</strong> is confirmed and assigned for CA review.
          </p>
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 inline-block">
            Ref ID: <span className="font-mono font-bold text-slate-800">{transactionId}</span>
          </div>
          <p className="text-xs text-emerald-700 font-semibold">Redirecting to your Dashboard...</p>
        </div>
      </div>
    );
  }

  const discountAmount = planMeta ? planMeta.originalPrice - planMeta.price : 0;

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-16">
      <div className="bg-white border-b border-slate-200 py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#111827] text-amber-300 flex items-center justify-center font-extrabold text-xs shrink-0">
            BF
          </div>
          <span className="font-extrabold text-slate-900 text-sm">BharatFiling</span>
          <span className="text-slate-300">|</span>
          <span className="text-xs font-semibold text-slate-500">Secure Checkout</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-1">
          Choose Payment Method
        </h1>
        <p className="text-xs text-slate-500 mb-6">Order {order.order_number} &bull; {order.service_name}</p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* LEFT: Method List */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              {PAYMENT_METHODS.map((m) => {
                const Icon = m.icon;
                const isActive = activeMethod === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setActiveMethod(m.id)}
                    className={`w-full flex items-center gap-3 px-4 py-4 text-left border-l-4 transition cursor-pointer ${
                      isActive
                        ? 'border-l-[#111827] bg-slate-50'
                        : 'border-l-transparent hover:bg-slate-50/60'
                    }`}
                  >
                    <Icon className={`w-4.5 h-4.5 shrink-0 ${isActive ? 'text-[#111827]' : 'text-slate-400'}`} />
                    <div className="min-w-0">
                      <div className={`text-xs font-bold ${isActive ? 'text-slate-900' : 'text-slate-700'}`}>{m.label}</div>
                      <div className="text-[10px] text-slate-400 truncate">{m.subtitle}</div>
                    </div>
                    {isActive && <ChevronRight className="w-3.5 h-3.5 text-slate-400 ml-auto shrink-0" />}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 hidden lg:flex items-center gap-2 text-[11px] text-slate-400 px-1">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              256-bit encrypted connection
            </div>
          </div>

          {/* CENTER: Active Method Form */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-5">
              {discountAmount > 0 && (
                <div className="rounded-2xl bg-emerald-50 border border-emerald-200 px-4 py-3 flex items-center justify-between gap-3">
                  <span className="text-xs font-bold text-emerald-800">
                    🎉 Hooray! ₹{discountAmount.toLocaleString('en-IN')} discount unlocked!
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-700">
                    <Clock className="w-3.5 h-3.5" />
                    Expires in {formatTime(secondsLeft)}
                  </span>
                </div>
              )}

              {activeMethod === 'upi' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-900">Pay with UPI</h3>
                  <div className="grid grid-cols-4 gap-3">
                    {UPI_APPS.map((app) => (
                      <button
                        key={app.id}
                        type="button"
                        onClick={() => setSelectedApp(app.id)}
                        className={`relative flex flex-col items-center gap-2 p-3 rounded-2xl border transition cursor-pointer ${
                          selectedApp === app.id ? 'border-[#111827] bg-slate-50' : 'border-slate-200 hover:bg-slate-50/60'
                        }`}
                      >
                        {selectedApp === app.id && (
                          <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#111827] text-white flex items-center justify-center">
                            <CheckCircle2 className="w-3 h-3" />
                          </span>
                        )}
                        <Smartphone className="w-5 h-5 text-slate-500" />
                        <span className="text-[10px] font-semibold text-slate-700 text-center leading-tight">{app.label}</span>
                      </button>
                    ))}
                  </div>

                  {selectedApp === 'other' ? (
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">UPI ID (VPA)</label>
                      <input
                        type="text"
                        value={customVpa}
                        onChange={(e) => setCustomVpa(e.target.value)}
                        placeholder="e.g. yourname@okhdfcbank"
                        className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-300 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#111827]/30 focus:border-[#111827]"
                      />
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500">
                      Pay through the <strong className="text-slate-700">{UPI_APPS.find((a) => a.id === selectedApp)?.label}</strong> app on your phone, or scan the QR code below.
                    </p>
                  )}

                  {qrDataUrl && (
                    <div className="flex items-center gap-4 p-3 rounded-2xl border border-dashed border-slate-300 w-fit">
                      <img src={qrDataUrl} alt="UPI QR Code" className="w-20 h-20 rounded-lg" />
                      <div className="text-[11px] text-slate-500">
                        <div className="font-bold text-slate-700">Scan to pay</div>
                        <div>Any UPI app supported</div>
                      </div>
                    </div>
                  )}

                  {order?.module_type === 'GST' && (
                    <label className="flex items-start gap-2.5 cursor-pointer pt-1 border-t border-slate-100">
                      <input
                        type="checkbox"
                        checked={enableAutopay}
                        onChange={(e) => setEnableAutopay(e.target.checked)}
                        className="mt-0.5 rounded border-slate-300 text-[#111827] focus:ring-[#111827]"
                      />
                      <span className="text-[11px] text-slate-600 leading-snug">
                        Also set up <strong>UPI AutoPay</strong> for ongoing monthly GST return filing. You can cancel the mandate anytime from your UPI app.
                      </span>
                    </label>
                  )}
                </div>
              )}

              {activeMethod === 'card' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-900">Pay with Card</h3>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">Card Number</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={19}
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails((p) => ({ ...p, number: e.target.value.replace(/[^\d ]/g, '') }))}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-300 text-slate-900 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#111827]/30 focus:border-[#111827]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">Name on Card</label>
                    <input
                      type="text"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails((p) => ({ ...p, name: e.target.value }))}
                      placeholder="As printed on card"
                      className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-300 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#111827]/30 focus:border-[#111827]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">Expiry</label>
                      <input
                        type="text"
                        maxLength={5}
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails((p) => ({ ...p, expiry: e.target.value }))}
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-300 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#111827]/30 focus:border-[#111827]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">CVV</label>
                      <input
                        type="password"
                        maxLength={4}
                        inputMode="numeric"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails((p) => ({ ...p, cvv: e.target.value.replace(/\D/g, '') }))}
                        placeholder="***"
                        className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-300 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#111827]/30 focus:border-[#111827]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeMethod === 'netbanking' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-900">Pay with Net Banking</h3>
                  <div className="grid grid-cols-2 gap-2.5">
                    {NET_BANKS.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBank(b)}
                        className={`px-3.5 py-3 rounded-xl border text-xs font-semibold text-left transition cursor-pointer ${
                          bank === b ? 'border-[#111827] bg-slate-50 text-slate-900' : 'border-slate-200 text-slate-600 hover:bg-slate-50/60'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Pay Button */}
              <button
                type="button"
                onClick={handlePay}
                disabled={isProcessing}
                className="w-full py-3.5 rounded-full bg-[#111827] hover:bg-[#1F2937] text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Verifying Payment...
                  </>
                ) : (
                  <>PAY ₹{order.amount?.toLocaleString('en-IN')}</>
                )}
              </button>

              {import.meta.env.DEV && (
                <p className="text-center text-[10px] text-slate-400">
                  Demo environment — payment is simulated, no real money is charged.
                </p>
              )}
            </div>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 sticky top-6">
              <h3 className="text-sm font-bold text-slate-900">{order.service_name}</h3>

              <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
                <div className="flex justify-between text-slate-500">
                  <span>Professional Fees {planMeta ? '(Incl. GST)' : ''}</span>
                  <span className="font-semibold text-slate-700">
                    ₹{(planMeta?.originalPrice ?? order.amount).toLocaleString('en-IN')}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Online Discount</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-100">
                  <span>Total Amount</span>
                  <span>₹{order.amount?.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="flex flex-col items-center gap-1 text-[10px] text-slate-500 font-semibold">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  100% Secure Payment
                </div>
                <div className="flex flex-col items-center gap-1 text-[10px] text-slate-500 font-semibold">
                  <BadgeCheck className="w-5 h-5 text-blue-600" />
                  Guaranteed Satisfaction
                </div>
              </div>

              <p className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 leading-snug">
                ⚡ Hurry! Your CA will be assigned right after the payment is confirmed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
