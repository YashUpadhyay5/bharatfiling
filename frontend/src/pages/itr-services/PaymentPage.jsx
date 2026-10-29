import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '../../context/ToastContext.jsx';
import { api } from '../../services/api.js';
import BrandLogo from '../gst-services/BrandLogo.jsx';
import { answerSummary } from '../gst-services/answers.js';
import PaymentMethods from './PaymentMethods.jsx';
import Receipt from './Receipt.jsx';
import { computeQuote } from './quote.js';

export default function PaymentPage({ config, formData, onBack, onPaymentSuccess }) {
  const { showSuccess } = useToast();
  const answers = answerSummary(config.questionnaire.questions, formData.answers);
  const quote = computeQuote(config.fee);
  const extra = config.hero.extraField;

  const [isProcessing, setIsProcessing] = useState(false);
  const [payError, setPayError] = useState('');
  const [pendingOrder, setPendingOrder] = useState(null);
  const [receipt, setReceipt] = useState(null);

  const handlePay = async ({ paymentMethod, upiApp }) => {
    setPayError('');
    setIsProcessing(true);
    try {
      // A failed payment is retried against the same order.
      let order = pendingOrder;
      if (!order) {
        const draft = await api.createItrOrder(config.slug, {
          email: formData.email,
          phone: formData.phone,
          cityPincode: formData.cityPincode,
          whatsappOptIn: formData.whatsappOptIn,
          ...(extra ? { [extra.id]: formData[extra.id] } : {}),
          ...formData.answers,
        });
        order = { id: draft.order.id, applicationNumber: draft.applicationNumber };
        setPendingOrder(order);
      }
      const paid = await api.payItrOrder(config.slug, order.id, { paymentMethod, upiApp });
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
          ...answers.map((a) => [a.label, a.value]),
          ['Total Paid (Incl. GST)', `₹${receipt.amount.toLocaleString('en-IN')}`],
          ['Transaction ID', receipt.transactionId],
        ]}
        nextSteps={[
          'Your order is now with our ITR expert desk.',
          `An expert will contact you on ${formData.phone} to collect Form 16, AIS and your investment proofs.`,
          `${config.payment.note}.`,
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
        <PaymentMethods
          className="lg:col-span-8"
          methods={['upi', 'card', 'netbanking', 'emi']}
          totalAmount={quote.totalAmount}
          isProcessing={isProcessing}
          error={payError}
          onClearError={() => setPayError('')}
          supportHref={`/contact?service=${encodeURIComponent(config.name)}`}
          onPay={handlePay}
        />

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-lg border border-slate-200">
            <div className="text-center border-b border-slate-200 py-5 px-4">
              <h3 className="text-lg font-bold text-slate-900">{config.payment.title}</h3>
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
              <div className="flex justify-between text-sm py-2 px-2">
                <span className="text-slate-700">GST @ 18%</span>
                <span className="text-slate-900">₹{quote.gst}</span>
              </div>

              <div className="flex justify-between items-baseline mt-4 px-2">
                <span className="text-lg font-bold text-slate-900">Total Amount</span>
                <span className="text-xl font-bold text-slate-900">₹{quote.totalAmount}</span>
              </div>

              <p className="mt-5 rounded bg-slate-100 px-3 py-2.5 text-xs text-slate-700">{config.payment.note}</p>
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
