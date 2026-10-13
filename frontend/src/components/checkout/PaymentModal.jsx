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
        payeeVpa: import.meta.env.VITE_UPI_VPA || 'bharatfiling@hdfcbank',
        payeeName: import.meta.env.VITE_MERCHANT_NAME || 'BharatFiling Private Limited',
        amount: order?.amount || 1769,
        transactionNote: order?.service_name || 'BharatFiling Compliance Advisory',
        referenceId: order?.order_number || order?.id || `BF${Date.now()}`,
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
          colors: ['#155EEF', '#027A48', '#FF9933'],
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#252B36]/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl max-w-xl w-full shadow-xl border border-[#E5E7EB] overflow-hidden relative">
        {/* Modal Header */}
        <div className="p-5 bg-[#F8F9FB] border-b border-[#E5E7EB] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#EFF8FF] text-[#155EEF] flex items-center justify-center shadow-xs">
              {activeTab === 'autopay' ? (
                <CreditCard className="w-5 h-5 text-[#155EEF]" />
              ) : (
                <QrCode className="w-5 h-5 text-[#155EEF]" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#252B36]">
                  {activeTab === 'autopay' ? 'UPI AutoPay Setup' : 'Dynamic UPI QR Code'}
                </h3>
                <span className="text-[10px] font-semibold text-[#027A48] bg-[#ECFDF3] px-2 py-0.5 rounded border border-[#A6F4C5]">
                  NPCI Certified
                </span>
              </div>
              <p className="text-xs text-[#667085]">
                Subscription payment via UPI | Monthly fee: <strong className="text-[#252B36]">₹{order?.amount || 1769} INR</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white hover:bg-[#F8F9FB] text-[#667085] hover:text-[#252B36] border border-[#E5E7EB] flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#E5E7EB] bg-[#F8F9FB] p-1.5 gap-1.5">
          <button
            onClick={() => {
              setActiveTab('autopay');
              setErrorMessage('');
            }}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'autopay'
                ? 'bg-white text-[#155EEF] shadow-xs border border-[#E5E7EB]'
                : 'text-[#667085] hover:text-[#252B36]'
            }`}
          >
            <Smartphone className="w-4 h-4 text-[#155EEF]" />
            UPI AutoPay (Recommended)
          </button>
          <button
            onClick={() => {
              setActiveTab('qr');
              setErrorMessage('');
            }}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'qr'
                ? 'bg-white text-[#155EEF] shadow-xs border border-[#E5E7EB]'
                : 'text-[#667085] hover:text-[#252B36]'
            }`}
          >
            <QrCode className="w-4 h-4 text-[#155EEF]" />
            Scan Dynamic QR
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {isSuccess ? (
            /* Success State */
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#ECFDF3] text-[#027A48] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-[#252B36]">Payment & Mandate Confirmed!</h4>
                <p className="text-xs text-[#667085]">
                  Your GST registration order <strong className="text-[#252B36]">#{order?.id}</strong> is active.
                </p>
              </div>
              <div className="p-3 bg-[#F8F9FB] rounded-lg border border-[#E5E7EB] text-xs text-[#667085] inline-block">
                Ref ID: <span className="font-mono font-bold text-[#252B36]">{transactionId}</span>
              </div>
              <div className="text-xs text-[#027A48] font-semibold flex items-center justify-center gap-1.5 pt-2">
                <Sparkles className="w-4 h-4" />
                Redirecting to compliance dashboard...
              </div>
            </div>
          ) : activeTab === 'autopay' ? (
            /* TAB 1: UPI AutoPay Setup */
            <div className="space-y-4">
              {/* Mandate Details Card */}
              <div className="bg-[#F8F9FB] rounded-lg p-4 border border-[#E5E7EB] space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#667085]">Subscription Plan</span>
                  <span className="font-semibold text-[#252B36]">GST Registration + Monthly Filing</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#667085]">Monthly Auto-Debit</span>
                  <span className="font-bold text-[#155EEF] text-sm">₹{order?.amount || 1769} / month</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#667085]">Next Billing Date</span>
                  <span className="font-semibold text-[#252B36]">1st of Next Month</span>
                </div>
                <div className="pt-2 border-t border-[#E5E7EB] flex items-center justify-between text-[11px] text-[#667085]">
                  <span className="flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-[#027A48]" /> NPCI e-Mandate Protection
                  </span>
                  <button
                    onClick={() => setShowMandateInfo(!showMandateInfo)}
                    className="text-[#155EEF] hover:underline flex items-center gap-0.5 font-semibold cursor-pointer"
                  >
                    AutoPay FAQs {showMandateInfo ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>
                </div>

                {showMandateInfo && (
                  <div className="pt-2 text-[11px] text-[#667085] border-t border-[#E5E7EB] space-y-1">
                    <p>• You can pause or cancel this mandate at any time directly from BharatFiling or inside your UPI app.</p>
                    <p>• Pre-debit SMS alert will be delivered 24 hours prior to any billing.</p>
                  </div>
                )}
              </div>

              {/* UPI ID Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#252B36]">
                  UPI ID (VPA) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="e.g. yourname@paytm or 9876543210@ybl"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E5E7EB] text-[#252B36] text-xs font-medium focus:border-[#155EEF] focus:outline-hidden"
                  />
                  <div className="absolute right-3 top-2.5 flex items-center gap-1 text-[11px] text-[#667085]">
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
                  className="mt-0.5 rounded border-[#E5E7EB] text-[#155EEF] focus:ring-[#155EEF]"
                />
                <span className="text-[11px] text-[#667085] leading-snug">
                  By ticking this box, you agree that BharatFiling will automatically continue your monthly compliance plan until you cancel. You may cancel at any time directly from your UPI app.
                </span>
              </label>

              {errorMessage && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => handleVerifyPayment('AUTOPAY')}
                  disabled={isProcessing}
                  className="w-full py-3 px-6 rounded-lg bg-[#155EEF] hover:bg-[#1048C6] text-white font-semibold text-xs shadow-xs transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
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

                <button
                  type="button"
                  onClick={() => handleVerifyPayment('AUTOPAY')}
                  className="w-full py-1.5 text-center text-[11px] font-medium text-[#667085] hover:text-[#155EEF] transition cursor-pointer"
                >
                  ⚡ Instant Demo Test (Simulate Payment)
                </button>
              </div>
            </div>
          ) : (
            /* TAB 2: Dynamic UPI QR Code */
            <div className="space-y-4 text-center">
              <div className="space-y-1">
                <div className="text-2xl font-bold text-[#252B36]">
                  ₹{order?.amount || 1769}.00
                </div>
                <p className="text-xs text-[#667085]">
                  Scan with GPay, PhonePe, Paytm, BHIM, or any UPI App
                </p>
              </div>

              {/* QR Container */}
              <div className="relative inline-block p-4 bg-white rounded-xl border border-dashed border-[#E5E7EB]">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="UPI Dynamic QR Code"
                    className="w-52 h-52 mx-auto rounded-lg object-contain"
                  />
                ) : (
                  <div className="w-52 h-52 flex items-center justify-center bg-[#F8F9FB] rounded-lg">
                    <RefreshCw className="w-6 h-6 animate-spin text-[#667085]" />
                  </div>
                )}
              </div>

              {/* Expiry Timer */}
              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#B54708] bg-[#FEF0C7] py-1 px-3.5 rounded-md border border-[#FEDF89] w-fit mx-auto">
                <Clock className="w-3.5 h-3.5" />
                <span>Expires in: {formatTime(secondsLeft)}</span>
              </div>

              {/* Supported UPI Apps Strip */}
              <div className="pt-2 border-t border-[#E5E7EB] flex items-center justify-center gap-4 text-xs font-semibold text-[#667085]">
                <span className="text-[#252B36]">Google Pay</span>
                <span>•</span>
                <span className="text-[#252B36]">PhonePe</span>
                <span>•</span>
                <span className="text-[#252B36]">Paytm</span>
                <span>•</span>
                <span className="text-[#252B36]">BHIM UPI</span>
              </div>

              {errorMessage && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Demo Action Button for QR */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => handleVerifyPayment('UPI_QR')}
                  disabled={isProcessing}
                  className="w-full py-3 px-6 rounded-lg bg-[#155EEF] hover:bg-[#1048C6] text-white font-semibold text-xs shadow-xs transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Verifying UPI Scan...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-white" />
                      I have scanned & paid (Verify Now)
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleVerifyPayment('UPI_QR')}
                  className="w-full py-1.5 text-center text-[11px] font-medium text-[#667085] hover:text-[#155EEF] transition cursor-pointer"
                >
                  ⚡ Instant Demo Test (Simulate Successful Scan)
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Trust Bar */}
        <div className="px-6 py-3 bg-[#F8F9FB] border-t border-[#E5E7EB] flex items-center justify-between text-[11px] text-[#667085]">
          <div className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-[#027A48]" /> 256-Bit Bank Grade Encryption
          </div>
          <span>NPCI Unified Payments Interface</span>
        </div>
      </div>
    </div>
  );
}
