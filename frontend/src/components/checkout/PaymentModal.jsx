import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  QrCode,
  CreditCard,
  Sparkles,
  ArrowRight,
  Clock,
  RefreshCw,
  Smartphone,
  Lock,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { api } from '../../services/api.js';
import { buildUpiIntentUri, generateUpiQrDataUrl } from '../../utils/upiQr.js';

export default function PaymentModal({
  isOpen,
  onClose,
  order,
  onPaymentSuccess,
}) {
  const [activeTab, setActiveTab] = useState('autopay'); // 'autopay' | 'qr'
  const [upiId, setUpiId] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(true);
  const [qrDataUrl, setQrDataUrl] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(600); // 10 minutes
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [showMandateInfo, setShowMandateInfo] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Default UPI ID if customer phone is present
  useEffect(() => {
    if (order?.customer_phone && !upiId) {
      setUpiId(`${order.customer_phone}@ybl`);
    } else if (!upiId) {
      setUpiId('applicant@okhdfcbank');
    }
  }, [order]);

  // Generate UPI QR Code on mount or tab change
  useEffect(() => {
    if (isOpen) {
      const upiUri = buildUpiIntentUri({
        payeeVpa: 'bharatfilings@hdfcbank',
        payeeName: 'BharatFiling Pvt Ltd',
        amount: order?.amount || 1769,
        transactionNote: 'GST Registration & Monthly Compliance',
        referenceId: order?.id || 'EST1791',
      });

      generateUpiQrDataUrl(upiUri, 280).then((url) => {
        setQrDataUrl(url);
      });

      setSecondsLeft(600);
      setIsSuccess(false);
      setErrorMessage('');
    }
  }, [isOpen, order]);

  // Countdown timer for QR code validity
  useEffect(() => {
    if (!isOpen || isSuccess || secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, isSuccess, secondsLeft]);

  if (!isOpen) return null;

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
  };

  const handleVerifyPayment = async (mode = 'AUTOPAY') => {
    try {
      if (mode === 'AUTOPAY' && (!upiId || !upiId.includes('@'))) {
        setErrorMessage('Please enter a valid UPI ID (e.g., yourname@paytm)');
        return;
      }
      if (mode === 'AUTOPAY' && !termsAgreed) {
        setErrorMessage('Please agree to the recurring AutoPay terms to proceed');
        return;
      }

      setIsProcessing(true);
      setErrorMessage('');

      const res = await api.verifyUpiPayment({
        order_id: order?.id,
        upi_id: upiId || 'bharatfiling@upi',
        payment_mode: mode,
        amount: order?.amount || 1769,
      });

      if (res.success) {
        setIsSuccess(true);
        setTransactionId(res.transaction_id || `TXN_${Date.now()}`);

        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0B1E36', '#F26522', '#10B981'],
        });

        setTimeout(() => {
          if (onPaymentSuccess) {
            onPaymentSuccess(res);
          }
        }, 2200);
      } else {
        setErrorMessage(res.message || 'Payment verification failed');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Payment could not be processed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden relative">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0B1E36] text-white flex items-center justify-center shadow-xs">
              {activeTab === 'autopay' ? (
                <CreditCard className="w-5 h-5 text-amber-300" />
              ) : (
                <QrCode className="w-5 h-5 text-amber-300" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-900">
                  {activeTab === 'autopay' ? 'UPI AutoPay Setup' : 'Dynamic UPI QR Code'}
                </h3>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  NPCI Certified
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Subscription payment via UPI | Monthly fee: <strong className="text-slate-900">₹{order?.amount || 1769} INR</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/60 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-100 bg-slate-50/40 p-1.5 gap-1.5">
          <button
            onClick={() => {
              setActiveTab('autopay');
              setErrorMessage('');
            }}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'autopay'
                ? 'bg-white text-[#0B1E36] shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-4 h-4 text-emerald-600" />
            UPI AutoPay (Recommended)
          </button>
          <button
            onClick={() => {
              setActiveTab('qr');
              setErrorMessage('');
            }}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'qr'
                ? 'bg-white text-[#0B1E36] shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <QrCode className="w-4 h-4 text-[#F26522]" />
            Scan Dynamic QR
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {isSuccess ? (
            /* Success State */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xl font-extrabold text-slate-900">Payment & Mandate Confirmed!</h4>
                <p className="text-xs text-slate-600">
                  Your GST registration order <strong className="text-slate-800">#{order?.id}</strong> is active.
                </p>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 inline-block">
                Ref ID: <span className="font-mono font-bold text-slate-800">{transactionId}</span>
              </div>
              <div className="text-xs text-emerald-700 font-semibold flex items-center justify-center gap-1.5 pt-2">
                <Sparkles className="w-4 h-4" />
                Redirecting to Document Upload & Dossier Desk...
              </div>
            </div>
          ) : activeTab === 'autopay' ? (
            /* TAB 1: UPI AutoPay Setup (Matches Image 4) */
            <div className="space-y-4">
              {/* Mandate Details Card */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Subscription Plan</span>
                  <span className="font-bold text-slate-900">GST Registration + Monthly Filing</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Monthly Auto-Debit</span>
                  <span className="font-extrabold text-[#0B1E36] text-sm">₹{order?.amount || 1769} / month</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Next Billing Date</span>
                  <span className="font-semibold text-slate-700">1st of Next Month</span>
                </div>
                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-emerald-600" /> NPCI e-Mandate Protection
                  </span>
                  <button
                    onClick={() => setShowMandateInfo(!showMandateInfo)}
                    className="text-[#0B1E36] hover:underline flex items-center gap-0.5 font-semibold cursor-pointer"
                  >
                    AutoPay FAQs {showMandateInfo ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>
                </div>

                {showMandateInfo && (
                  <div className="pt-2 text-[11px] text-slate-600 border-t border-slate-100 space-y-1">
                    <p>• You can pause or cancel this mandate at any time directly from BharatFiling or inside your UPI app.</p>
                    <p>• Pre-debit SMS alert will be delivered 24 hours prior to any billing.</p>
                  </div>
                )}
              </div>

              {/* UPI ID Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  UPI ID (VPA) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="e.g. yourname@paytm or 9876543210@ybl"
                    className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-300 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0B1E36]/30 focus:border-[#0B1E36]"
                  />
                  <div className="absolute right-3 top-3 flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                    <span>@okaxis</span>
                    <span>@ybl</span>
                    <span>@paytm</span>
                  </div>
                </div>
              </div>

              {/* Recurring Mandate Consent Checkbox */}
              <label className="flex items-start gap-2.5 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={termsAgreed}
                  onChange={(e) => setTermsAgreed(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-[#0B1E36] focus:ring-[#0B1E36]"
                />
                <span className="text-[11px] text-slate-600 leading-snug">
                  By ticking this box, you agree that BharatFiling will automatically continue your monthly subscription and charge the monthly fee until you cancel. You may cancel at any time to avoid future charges.
                </span>
              </label>

              {errorMessage && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => handleVerifyPayment('AUTOPAY')}
                  disabled={isProcessing}
                  className="w-full py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Setting Up AutoPay Mandate...
                    </>
                  ) : (
                    <>
                      Activate AutoPay &bull; ₹{order?.amount || 1769} INR
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Subtle Demo Simulation */}
                <button
                  type="button"
                  onClick={() => handleVerifyPayment('AUTOPAY')}
                  className="w-full py-2 text-center text-[11px] font-semibold text-slate-500 hover:text-[#0B1E36] transition cursor-pointer"
                >
                  ⚡ Instant Demo Test (Bypass Bank Authentication)
                </button>
              </div>
            </div>
          ) : (
            /* TAB 2: Dynamic UPI QR Code */
            <div className="space-y-4 text-center">
              <div className="space-y-1">
                <div className="text-2xl font-black text-slate-900">
                  ₹{order?.amount || 1769}.00
                </div>
                <p className="text-xs text-slate-500">
                  Scan with GPay, PhonePe, Paytm, BHIM, or any UPI App
                </p>
              </div>

              {/* QR Container */}
              <div className="relative inline-block p-4 bg-white rounded-3xl border-2 border-dashed border-slate-300 shadow-inner">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="UPI Dynamic QR Code"
                    className="w-56 h-56 mx-auto rounded-xl object-contain shadow-xs"
                  />
                ) : (
                  <div className="w-56 h-56 flex items-center justify-center bg-slate-50 rounded-xl">
                    <RefreshCw className="w-6 h-6 animate-spin text-slate-400" />
                  </div>
                )}

                {/* BharatFiling Shield in center */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-1.5 rounded-full shadow-md border border-slate-200">
                  <div className="w-7 h-7 rounded-full bg-[#0B1E36] text-[#F26522] flex items-center justify-center font-black text-xs">
                    BF
                  </div>
                </div>
              </div>

              {/* Expiry Timer */}
              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-amber-700 bg-amber-50 py-1.5 px-4 rounded-full border border-amber-200 w-fit mx-auto">
                <Clock className="w-3.5 h-3.5" />
                <span>QR Expires in: {formatTime(secondsLeft)}</span>
              </div>

              {/* Supported UPI Apps Strip */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-4 text-xs font-bold text-slate-600">
                <span className="text-slate-800">Google Pay</span>
                <span>•</span>
                <span className="text-purple-700">PhonePe</span>
                <span>•</span>
                <span className="text-sky-600">Paytm</span>
                <span>•</span>
                <span className="text-emerald-700">BHIM UPI</span>
              </div>

              {errorMessage && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Demo Action Button for QR */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => handleVerifyPayment('UPI_QR')}
                  disabled={isProcessing}
                  className="w-full py-3.5 px-6 rounded-full bg-[#0B1E36] hover:bg-[#142C4F] text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Verifying UPI Network Scan...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      I have scanned & paid (Verify Now)
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleVerifyPayment('UPI_QR')}
                  className="w-full py-1.5 text-center text-[11px] font-semibold text-slate-500 hover:text-[#0B1E36] transition cursor-pointer"
                >
                  ⚡ Instant Demo Test (Simulate Successful Scan)
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Trust Bar */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> 256-Bit Bank Grade Encryption
          </div>
          <span>CIN: U67190TN2014PTC096978</span>
        </div>
      </div>
    </div>
  );
}
