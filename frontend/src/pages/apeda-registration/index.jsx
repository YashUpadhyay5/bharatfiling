import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';

import ApedaLandingPage from './1-ApedaLandingPage.jsx';
import ApedaPaymentPage from './2-ApedaPaymentPage.jsx';

export { ApedaLandingPage, ApedaPaymentPage };

export default function ApedaRegistrationModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const { showSuccess } = useToast();

  const stepParam = searchParams.get('step');
  const initialStep = stepParam ? parseInt(stepParam, 10) : 1;
  const currentStep = [1, 2].includes(initialStep) ? initialStep : 1;

  const getInitialDraft = () => {
    try {
      const saved = localStorage.getItem('bharatfiling_apeda_draft');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore parse errors
    }
    return {
      email: user?.email || 'yashupadhyay@example.com',
      phone: user?.phone || '+91 7668976193',
      cityPincode: 'Bengaluru, 560001',
      language: 'English',
      whatsappUpdates: true,
      orderNumber: '#est179126201735020268593a',
    };
  };

  const [formData, setFormData] = useState(getInitialDraft);

  // Sync draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bharatfiling_apeda_draft', JSON.stringify(formData));
    } catch {
      // Ignore storage errors
    }
  }, [formData]);

  // Step 1: Lead capture on landing page -> Proceed to Step 2 (Choose Payment Method)
  const handleConsultExpert = (leadData) => {
    setFormData((prev) => ({
      ...prev,
      ...leadData,
    }));
    setSearchParams({ step: '2' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showSuccess('Details recorded! ₹500 Make In India discount unlocked.');
  };

  // Step 2: Back to Step 1
  const handleBackToStep1 = () => {
    setSearchParams({ step: '1' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Page 1: APEDA Landing Page (matches media_1793178528760_b8177ea9.png) */}
      {currentStep === 1 && (
        <ApedaLandingPage
          initialData={formData}
          onConsultExpert={handleConsultExpert}
        />
      )}

      {/* Page 2: APEDA Payment Desk (matches media_1793179244243_9e915d29.png) */}
      {currentStep === 2 && (
        <ApedaPaymentPage
          formData={formData}
          onBack={handleBackToStep1}
          onPaymentSuccess={() => {
            // Optional callback
          }}
        />
      )}
    </main>
  );
}
