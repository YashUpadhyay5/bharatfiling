import React, { useEffect, useRef, useState } from 'react';
import { CalendarDays, Lock, X } from 'lucide-react';
import { api } from '../../services/api.js';
import PaymentMethods from '../itr-services/PaymentMethods.jsx';
import { computeQuote } from './quote.js';
import { formatSlotDate, formatSlotTime } from './slots.js';

// Step 3: the payment dialog drawn over the booking page. Closing it returns to the booking.
export default function PaymentModal({ config, formData, onClose, onPaid }) {
  const quote = computeQuote();
  const dialogRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [payError, setPayError] = useState('');
  const [pendingOrder, setPendingOrder] = useState(null);

  // The page re-renders often, so the handlers read the latest values through refs and the effect runs once.
  const closeRef = useRef(onClose);
  const busyRef = useRef(false);
  closeRef.current = onClose;
  busyRef.current = isProcessing;

  useEffect(() => {
    const opener = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape' && !busyRef.current) closeRef.current();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      opener?.focus?.();
    };
  }, []);

  const handlePay = async ({ paymentMethod, upiApp }) => {
    setPayError('');
    setIsProcessing(true);
    try {
      // A failed payment is retried against the same order.
      let order = pendingOrder;
      if (!order) {
        const draft = await api.createNoticeOrder({
          email: formData.email,
          phone: formData.phone,
          cityPincode: formData.cityPincode,
          whatsappOptIn: formData.whatsappOptIn,
          language: formData.language,
          slotDate: formData.slotDate,
          slotTime: formData.slotTime,
        });
        order = { id: draft.order.id, applicationNumber: draft.applicationNumber };
        setPendingOrder(order);
      }
      const paid = await api.payNoticeOrder(order.id, { paymentMethod, upiApp });
      onPaid({
        orderNumber: paid.order.order_number,
        applicationNumber: order.applicationNumber,
        transactionId: paid.transactionId,
        amount: paid.order.amount,
      });
    } catch (err) {
      setPayError(err.message || 'Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const phone = `+91 ${formData.phone.slice(0, 5)} ${formData.phone.slice(5)}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !isProcessing) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="notice-pay-title"
        tabIndex={-1}
        className="w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-xl bg-white shadow-2xl grid grid-cols-1 md:grid-cols-[17rem_1fr] outline-none"
      >
        <div className="bg-gradient-to-b from-[#001D38] to-[#0B4C8C] text-white p-5 flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 select-none">
            <img src="/bharatfiling-brand-icon.png" alt="" className="h-7 w-auto object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            <span className="text-lg font-extrabold leading-none tracking-tight">
              Bharat<span className="text-[#F26522]">Filing</span>
            </span>
          </div>

          <div className="rounded-lg bg-white text-slate-900 p-4">
            <h3 className="text-sm font-semibold">Price Summary</h3>
            <p className="mt-2 text-3xl font-bold">₹{quote.totalAmount}</p>
            <dl className="mt-3 space-y-1 text-xs text-slate-600">
              <div className="flex justify-between">
                <dt>Consultation fee</dt>
                <dd>₹{quote.consultationFee}</dd>
              </div>
              <div className="flex justify-between">
                <dt>GST @ 18%</dt>
                <dd>₹{quote.gst}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-lg bg-white text-slate-900 p-4 text-xs">
            <p className="flex items-center gap-2 font-semibold text-sm">
              <CalendarDays className="w-4 h-4 text-[#0052CC]" aria-hidden="true" />
              Your consultation
            </p>
            <p className="mt-2 text-slate-700">
              {formatSlotDate(formData.slotDate)}, {formatSlotTime(formData.slotTime)}
            </p>
            <p className="mt-1 text-slate-500">Call on {phone}</p>
            <button
              type="button"
              onClick={onClose}
              disabled={isProcessing}
              className="mt-3 text-[#0052CC] font-semibold underline underline-offset-2 disabled:opacity-50 cursor-pointer"
            >
              Change date or time
            </button>
          </div>

          <p className="mt-auto flex items-center gap-1.5 text-[11px] text-blue-100">
            <Lock className="w-3.5 h-3.5" aria-hidden="true" />
            SSL encrypted checkout
          </p>
        </div>

        <div className="bg-slate-50 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 id="notice-pay-title" className="text-sm font-semibold text-slate-800">{config.payment.title}</h2>
            <button
              type="button"
              aria-label="Close payment options"
              onClick={onClose}
              disabled={isProcessing}
              className="p-1 text-slate-500 hover:text-slate-900 disabled:opacity-50 cursor-pointer"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
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
      </div>
    </div>
  );
}
