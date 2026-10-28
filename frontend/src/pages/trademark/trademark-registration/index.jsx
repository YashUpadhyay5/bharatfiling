import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';
import { useToast } from '../../../context/ToastContext.jsx';

import TrademarkLandingPage from './1-TrademarkLandingPage.jsx';
import TrademarkCheckoutPage from './2-TrademarkCheckoutPage.jsx';
import TrademarkPaymentPage from './3-TrademarkPaymentPage.jsx';

export { TrademarkLandingPage, TrademarkCheckoutPage, TrademarkPaymentPage };

export default function TrademarkRegistrationModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();

  const stepParam = searchParams.get('step');
  const initialStep = stepParam ? parseInt(stepParam, 10) : 1;
  const currentStep = [1, 2, 3].includes(initialStep) ? initialStep : 1;

  const getInitialDraft = () => {
    try {
      const saved = localStorage.getItem('bharatfiling_trademark_draft');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore parse errors
    }
    return {
      email: user?.email || 'yashupadhyay@example.com',
      phone: user?.phone || '+91 7668976193',
      whatsappUpdates: true,
      selectedClassId: 25, // default apparel/clothing
      applicantType: 'individual',
      planId: 'standard',
      brandName: '',
      orderNumber: `#TM-${Math.floor(100000 + Math.random() * 900000)}`,
    };
  };

  const [formData, setFormData] = useState(getInitialDraft);

  // Sync draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bharatfiling_trademark_draft', JSON.stringify(formData));
    } catch {
      // Ignore storage errors
    }
  }, [formData]);

  // Step 1 -> Lead captured -> proceed to checkout / plan selection (Step 2)
  const handleLeadSubmit = (leadData) => {
    setFormData((prev) => ({
      ...prev,
      ...leadData,
    }));
    setSearchParams({ step: '2' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showSuccess('Lead recorded! 40% Diwali discount unlocked.');
  };

  // Step 1 -> Quick plan chosen from landing page pricing section -> Step 2
  const handleSelectPlan = (planId) => {
    setFormData((prev) => ({
      ...prev,
      planId,
    }));
    setSearchParams({ step: '2' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 2 -> Back to Step 1
  const handleBackToStep1 = () => {
    setSearchParams({ step: '1' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 2 -> Proceed to Payment (Step 3)
  const handleProceedToPayment = (checkoutData) => {
    setFormData((prev) => ({
      ...prev,
      ...checkoutData,
    }));
    setSearchParams({ step: '3' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showSuccess('Order generated! Please select payment mode.');
  };

  // Step 3 -> Back to Step 2
  const handleBackToStep2 = () => {
    setSearchParams({ step: '2' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 3 -> Payment completed
  const handlePaymentSuccess = (paymentResult) => {
    showSuccess(`Payment successful! Order ref: ${paymentResult.orderNumber}`);
    setFormData((prev) => ({
      ...prev,
      ...paymentResult,
      status: 'SUBMITTED',
    }));
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Page 1: Trademark Landing Page (matches media_1793180754793_85d07915.png) */}
      {currentStep === 1 && (
        <TrademarkLandingPage
          initialData={formData}
          onSubmitLead={handleLeadSubmit}
          onSelectPlan={handleSelectPlan}
        />
      )}

      {/* Page 2: Trademark Plan Configuration & Checkout */}
      {currentStep === 2 && (
        <TrademarkCheckoutPage
          formData={formData}
          onBack={handleBackToStep1}
          onProceedToPayment={handleProceedToPayment}
        />
      )}

      {/* Page 3: Payment Gateway Desk */}
      {currentStep === 3 && (
        <TrademarkPaymentPage
          formData={formData}
          onBack={handleBackToStep2}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </main>
  );
}
