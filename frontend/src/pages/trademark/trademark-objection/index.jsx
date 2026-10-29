import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';
import { useToast } from '../../../context/ToastContext.jsx';

import TrademarkObjectionLandingPage from './1-TrademarkObjectionLandingPage.jsx';
import TrademarkObjectionCheckoutPage from './2-TrademarkObjectionCheckoutPage.jsx';
import TrademarkObjectionPaymentPage from './3-TrademarkObjectionPaymentPage.jsx';

export {
  TrademarkObjectionLandingPage,
  TrademarkObjectionCheckoutPage,
  TrademarkObjectionPaymentPage,
};

export default function TrademarkObjectionModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const { showSuccess } = useToast();

  const stepParam = searchParams.get('step');
  const initialStep = stepParam ? parseInt(stepParam, 10) : 1;
  const currentStep = [1, 2, 3].includes(initialStep) ? initialStep : 1;

  const getInitialDraft = () => {
    try {
      const saved = localStorage.getItem('bharatfiling_trademark_objection_draft');
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
      whatsappUpdates: true,
      applicationNumber: '',
      objectionType: 'section_11',
      packageId: 'substantive',
      orderNumber: `#TM-OBJ-${Math.floor(100000 + Math.random() * 900000)}`,
    };
  };

  const [formData, setFormData] = useState(getInitialDraft);

  // Sync draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        'bharatfiling_trademark_objection_draft',
        JSON.stringify(formData)
      );
    } catch {
      // Ignore storage errors
    }
  }, [formData]);

  // Step 1: Lead capture -> Step 2
  const handleLeadSubmit = (leadData) => {
    setFormData((prev) => ({
      ...prev,
      ...leadData,
    }));
    setSearchParams({ step: '2' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showSuccess('Lead recorded! Please configure your objection details.');
  };

  // Step 1: Package chosen directly from landing pricing section
  const handleSelectPlan = (packageId) => {
    setFormData((prev) => ({
      ...prev,
      packageId,
    }));
    setSearchParams({ step: '2' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 2: Back to Step 1
  const handleBackToStep1 = () => {
    setSearchParams({ step: '1' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 2: Proceed to Payment -> Step 3
  const handleProceedToPayment = (checkoutData) => {
    setFormData((prev) => ({
      ...prev,
      ...checkoutData,
    }));
    setSearchParams({ step: '3' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showSuccess('Order generated! Please select payment mode.');
  };

  // Step 3: Back to Step 2
  const handleBackToStep2 = () => {
    setSearchParams({ step: '2' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 3: Payment Success
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
      {/* Page 1: Trademark Objection Landing Page (matches media_1793253405946_1d5cb863.png) */}
      {currentStep === 1 && (
        <TrademarkObjectionLandingPage
          initialData={formData}
          onSubmitLead={handleLeadSubmit}
          onSelectPlan={handleSelectPlan}
        />
      )}

      {/* Page 2: Trademark Objection Details & Package Configuration */}
      {currentStep === 2 && (
        <TrademarkObjectionCheckoutPage
          formData={formData}
          onBack={handleBackToStep1}
          onProceedToPayment={handleProceedToPayment}
        />
      )}

      {/* Page 3: Payment Desk matching exact 1:1 format */}
      {currentStep === 3 && (
        <TrademarkObjectionPaymentPage
          formData={formData}
          onBack={handleBackToStep2}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </main>
  );
}
