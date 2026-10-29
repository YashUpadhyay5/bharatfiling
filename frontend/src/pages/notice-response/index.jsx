import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import LandingPage from '../itr-services/LandingPage.jsx';
import Receipt from '../itr-services/Receipt.jsx';
import BookingPage from './BookingPage.jsx';
import PaymentModal from './PaymentModal.jsx';
import config from './config.js';
import { formatSlotDate, formatSlotTime, isSlotAvailable } from './slots.js';

const DRAFT_KEY = `bharatfiling_${config.slug}`;

function loadDraft(user) {
  const fresh = {
    email: user?.email || '',
    phone: user?.phone || '',
    cityPincode: '',
    language: '',
    whatsappOptIn: false,
    slotDate: '',
    slotTime: '',
  };
  try {
    const saved = JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null');
    return saved && typeof saved === 'object' ? { ...fresh, ...saved } : fresh;
  } catch {
    return fresh;
  }
}

// Landing page -> pick a date and time -> pay (a dialog over the booking page) -> confirmation.
export default function NoticeResponseModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const { showSuccess } = useToast();
  const [formData, setFormData] = useState(() => loadDraft(user));
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(formData));
    } catch {
      // storage unavailable (private mode); the flow still works for this visit
    }
  }, [formData]);

  const requested = parseInt(searchParams.get('step') || '1', 10);
  // A step reached by URL is only shown once the data it depends on exists.
  const hasLead = Boolean(formData.email && formData.phone && formData.language);
  const hasSlot = isSlotAvailable(formData.slotDate, formData.slotTime);
  let step = [1, 2, 3].includes(requested) ? requested : 1;
  if (step > 1 && !hasLead) step = 1;
  else if (step > 2 && !hasSlot) step = 2;

  const goTo = (n) => {
    setSearchParams({ step: String(n) });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const merge = (patch) => setFormData((prev) => ({ ...prev, ...patch }));

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
          ['Consultation', `${formatSlotDate(receipt.slotDate)}, ${formatSlotTime(receipt.slotTime)}`],
          ['Total Paid (Incl. GST)', `₹${receipt.amount.toLocaleString('en-IN')}`],
          ['Transaction ID', receipt.transactionId],
        ]}
        nextSteps={[
          `A tax expert will call you on ${receipt.phone} on ${formatSlotDate(receipt.slotDate)} at ${formatSlotTime(receipt.slotTime)}. Please answer the call.`,
          'Keep your notice and the return it relates to ready for the call.',
          'Track every update on your dashboard.',
        ]}
        applicationNumber={receipt.applicationNumber}
        email={receipt.email}
      />
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {step === 1 ? (
        <LandingPage
          config={config}
          initialData={formData}
          onGetStarted={(lead) => {
            merge(lead);
            goTo(2);
          }}
        />
      ) : (
        <BookingPage config={config} formData={formData} onSelect={merge} onNext={() => goTo(3)} onBack={() => goTo(1)}>
          {step === 3 && (
            <PaymentModal
              config={config}
              formData={formData}
              onClose={() => goTo(2)}
              onPaid={(paid) => {
                // Keep what the confirmation needs, then forget the draft.
                setReceipt({ ...paid, slotDate: formData.slotDate, slotTime: formData.slotTime, phone: formData.phone, email: formData.email });
                try {
                  localStorage.removeItem(DRAFT_KEY);
                } catch {
                  // storage unavailable
                }
                showSuccess(`Payment successful! Your ${config.name} consultation is booked.`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}
        </BookingPage>
      )}
    </main>
  );
}
