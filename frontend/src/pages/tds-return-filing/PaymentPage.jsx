import React, { useEffect, useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useToast } from '../../context/ToastContext.jsx';
import { api } from '../../services/api.js';
import BrandLogo from '../gst-services/BrandLogo.jsx';
import { answerSummary } from '../gst-services/answers.js';
import PaymentMethods from '../itr-services/PaymentMethods.jsx';
import Receipt from '../itr-services/Receipt.jsx';
import { TDS_COUPON, computeQuote, couponExpiryLabel, isCouponLive } from './quote.js';

// A short burst when the offer is shown. Decoration only, so it never blocks the page.
function celebrate() {
  try {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    confetti({ particleCount: 90, spread: 70, origin: { y: 0.3 } });
  } catch {
    // canvas unavailable
  }
}

export default function PaymentPage({ config, formData, onBack, onPaymentSuccess }) {
  const { showSuccess } = useToast();
  const answers = answerSummary(config.questionnaire.questions, formData.answers);
  const periodField = config.hero.extraField;
  const periodLabel = periodField.options.find((o) => o.value === formData[periodField.id])?.label;

  const [couponLive, setCouponLive] = useState(() => isCouponLive());
  const [includeLabourWelfare, setIncludeLabourWelfare] = useState(true);
  const [isTaxesOpen, setIsTaxesOpen] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [payError, setPayError] = useState('');
  const [pendingOrder, setPendingOrder] = useState(null);
  const [receipt, setReceipt] = useState(null);

  const quote = computeQuote({ couponApplied: couponLive, includeLabourWelfare });

  useEffect(() => {
    if (couponLive) celebrate();
    // once, when the page opens
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePay = async ({ paymentMethod, upiApp }) => {
    setPayError('');
    setIsProcessing(true);
    try {
      // A failed payment is retried against the same order unless the amount has changed.
      const orderKey = `${couponLive}|${includeLabourWelfare}`;
      let order = pendingOrder?.key === orderKey ? pendingOrder : null;
      if (!order) {
        const draft = await api.createTdsOrder({
          email: formData.email,
          phone: formData.phone,
          cityPincode: formData.cityPincode,
          whatsappOptIn: formData.whatsappOptIn,
          [periodField.id]: formData[periodField.id],
          ...formData.answers,
          includeLabourWelfare,
          ...(couponLive ? { couponCode: TDS_COUPON.code } : {}),
        });
        if (draft.quote.totalAmount !== quote.totalAmount) {
          // The offer ended after this page opened. Show the real total and let the customer decide.
          setCouponLive(draft.quote.couponDiscount > 0);
          setPayError(`The ₹${TDS_COUPON.discount} offer has just ended, so your total has changed. Please review it and pay again.`);
          return;
        }
        order = { key: orderKey, id: draft.order.id, applicationNumber: draft.applicationNumber };
        setPendingOrder(order);
      }
      const paid = await api.payTdsOrder(order.id, { paymentMethod, upiApp });
      setReceipt({
        orderNumber: paid.order.order_number,
        applicationNumber: order.applicationNumber,
        transactionId: paid.transactionId,
        amount: paid.order.amount,
      });
      showSuccess(`Payment successful! Your ${config.name} order is confirmed.`);
      onPaymentSuccess();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setPayError(err.message || 'Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (receipt) {
    return (
      <Receipt
        intro={
          <>
            Your <strong>{config.name}</strong> consultation has been booked.
          </>
        }
        rows={[
          ['Order Number', receipt.orderNumber],
          ['Application Number', receipt.applicationNumber],
          ['Return period', periodLabel],
          ...answers.map((a) => [a.label, a.value]),
          ['Total Paid (Incl. Taxes)', `₹${receipt.amount.toLocaleString('en-IN')}`],
          ['Transaction ID', receipt.transactionId],
        ]}
        nextSteps={[
          'Your order is now with our TDS expert desk.',
          `An expert will call you on ${formData.phone} for your 15-minute consultation.`,
          `${config.payment.note.replace(/^\*/, '')}.`,
          'Track every update on your dashboard.',
        ]}
        applicationNumber={receipt.applicationNumber}
        email={formData.email}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans py-8 sm:py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#002B49] transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back</span>
        </button>
        <BrandLogo />
      </div>

      <div className="max-w-6xl mx-auto mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Choose Payment Method</h1>
        <p className="text-base font-semibold text-slate-800 mt-5">Payment Options</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 -mt-9">
          <div className="flex justify-end h-9" aria-live="polite">
            {couponLive && (
              <div className="bg-[#22C55E] text-white font-bold text-sm px-8 flex items-center gap-2 rounded-t-2xl">
                <span aria-hidden="true">🎉</span>
                <span>Hooray! ₹{TDS_COUPON.discount} Discount Unlocked!</span>
              </div>
            )}
          </div>
          <PaymentMethods
            methods={['upi', 'card', 'netbanking']}
            totalAmount={quote.totalAmount}
            isProcessing={isProcessing}
            error={payError}
            onClearError={() => setPayError('')}
            supportHref={`/contact?service=${encodeURIComponent(config.name)}`}
            onPay={handlePay}
          />
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-lg border border-slate-200">
            <div className="border-b border-slate-200 px-5 pt-5 pb-4">
              <h3 className="text-xl font-bold text-slate-900">{config.payment.title}</h3>
              <ol className="mt-3 space-y-1.5 text-xs text-slate-600 list-decimal list-inside">
                {config.payment.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 mb-4">
                <span className="w-6 h-6 rounded-full border border-slate-500 flex items-center justify-center text-xs" aria-hidden="true">₹</span>
                <span>Price details</span>
              </div>

              <div className="flex justify-between text-sm py-2 px-2">
                <span className="text-slate-700">{config.payment.feeLabel}</span>
                <span className="text-slate-900">₹{quote.consultationFee}</span>
              </div>

              {couponLive && (
                <>
                  <div className="flex justify-between items-center text-sm py-2 px-2">
                    <span className="flex items-center gap-2">
                      <span className="text-emerald-600 font-medium">{TDS_COUPON.code}</span>
                      <span className="rounded bg-emerald-50 text-emerald-600 text-xs font-semibold px-2 py-1">{couponExpiryLabel()}</span>
                    </span>
                    <span className="text-emerald-600">-₹{quote.couponDiscount}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-slate-900 py-2 px-2 mt-1">
                    <span>Sub Total Amount</span>
                    <span>₹{quote.subTotal}</span>
                  </div>
                </>
              )}

              <button
                type="button"
                aria-expanded={isTaxesOpen}
                onClick={() => setIsTaxesOpen(!isTaxesOpen)}
                className="w-full flex justify-between items-center text-sm text-slate-700 py-2 px-2 cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  {isTaxesOpen ? <ChevronUp className="w-4 h-4" aria-hidden="true" /> : <ChevronDown className="w-4 h-4" aria-hidden="true" />}
                  Taxes &amp; Charges
                </span>
                <span className="text-slate-900">₹{quote.taxesAndCharges}</span>
              </button>

              {isTaxesOpen && (
                <div className="bg-slate-100 rounded px-2 py-2 space-y-3 text-sm text-slate-600 mt-1">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      Labour Welfare Endowment
                      <button
                        type="button"
                        onClick={() => setIncludeLabourWelfare(!includeLabourWelfare)}
                        className={`border text-xs px-1.5 py-0.5 rounded cursor-pointer ${
                          includeLabourWelfare
                            ? 'border-red-400 text-red-500 hover:bg-red-50'
                            : 'border-emerald-500 text-emerald-600 hover:bg-emerald-50'
                        }`}
                      >
                        {includeLabourWelfare ? 'Remove' : 'Add'}
                      </button>
                    </span>
                    <span>₹{quote.labourWelfare}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-300 pt-3">
                    <span>GST on labour welfare (18%)</span>
                    <span>₹{quote.gstOnLabour}</span>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-baseline mt-5 px-2">
                <span className="text-xl font-bold text-slate-900">Total Amount</span>
                <span className="text-2xl font-bold text-slate-900">₹{quote.totalAmount}</span>
              </div>

              <p className="mt-5 rounded bg-slate-100 px-3 py-2.5 text-xs text-slate-700 text-center">{config.payment.note}</p>
            </div>
          </div>

          <div className="flex items-start justify-around text-xs font-semibold text-slate-800">
            <div className="flex flex-col items-center gap-2">
              <span className="font-black text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded text-[11px]">PCI</span>
              <span>100% Secure Payment</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-base leading-none" aria-hidden="true">🛡️</span>
              <span>Guaranteed Satisfaction</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
