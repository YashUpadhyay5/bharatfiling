import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';

import LLPLandingPage from './1-LLPLandingPage.jsx';
import LLPOnboardingPage from './2-LLPOnboardingPage.jsx';
import LLPPlansPage from './3-LLPPlansPage.jsx';
import LLPPaymentPage from './4-LLPPaymentPage.jsx';

export {
  LLPLandingPage,
  LLPOnboardingPage,
  LLPPlansPage,
  LLPPaymentPage,
};

export default function LLPRegistrationModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();

  const stepParam = searchParams.get('step');
  const initialStep = stepParam ? parseInt(stepParam, 10) : 1;
  const currentStep = [1, 2, 3, 4].includes(initialStep) ? initialStep : 1;

  const getInitialDraft = () => {
    try {
      const saved = localStorage.getItem('bharatfiling_llp_draft');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore parse errors
    }
    return {
      email: user?.email || 'yashupadhyay@example.com',
      phone: user?.phone || '+91 7668976193',
      cityPincode: 'Mumbai, 400001',
      language: 'English',
      whatsappUpdates: true,
      proposedLlpName: 'Bharat Innovation Tech LLP',
      businessAge: 'Less than 1 year',
      partnersCount: '2',
      contributionAmount: '10000',
      stateName: 'Maharashtra',
      packageId: 'standard',
      packageName: 'Standard (LLP Incorporation + DSC + DPIN + Form 3)',
      professionalFee: 2499,
      onlineDiscount: 2500,
      totalAmount: 3008, // 2499 + 18% GST (450) + Labour Welfare (59) = 3008
      orderNumber: `#LLP-${Math.floor(100000 + Math.random() * 900000)}`,
    };
  };

  const [formData, setFormData] = useState(getInitialDraft);

  // Sync draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bharatfiling_llp_draft', JSON.stringify(formData));
    } catch {
      // Ignore storage errors
    }
  }, [formData]);

  // Step 1: Lead capture submit -> Advances to Step 2 (Onboarding)
  const handleLeadSubmit = (leadData) => {
    setFormData((prev) => ({
      ...prev,
      ...leadData,
    }));
    setSearchParams({ step: '2' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 1: Package chosen from pricing section -> Advances to Step 2 with selected plan
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

  // Step 2: Onboarding proceed -> Advances to Step 3 (Plan Selection / Confirmation)
  const handleOnboardingProceed = (onboardingData) => {
    setFormData((prev) => ({
      ...prev,
      ...onboardingData,
    }));
    setSearchParams({ step: '3' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 3: Back to Step 2
  const handleBackToStep2 = () => {
    setSearchParams({ step: '2' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 3: Proceed to Payment Page (Step 4)
  const handleProceedToPayment = (plan) => {
    setFormData((prev) => ({
      ...prev,
      packageId: plan.id,
      packageName: plan.name,
      professionalFee: plan.price,
      totalAmount: Math.round(plan.price * 1.18),
    }));
    setSearchParams({ step: '4' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 4: Back to Step 3
  const handleBackToStep3 = () => {
    setSearchParams({ step: '3' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 4: Payment completed callback
  const handlePaymentSuccess = (receiptData) => {
    setFormData((prev) => ({
      ...prev,
      paymentCompleted: true,
      transactionId: receiptData.transactionId,
      paidAt: receiptData.date,
    }));
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Page 1: LLP Registration Landing Page (1:1 with media_1793699920065_cb23d5bb.png & vakilsearch.com/llp-registration) */}
      {currentStep === 1 && (
        <LLPLandingPage
          initialData={formData}
          onSubmitLead={handleLeadSubmit}
          onSelectPlan={handleSelectPlan}
        />
      )}

      {/* Page 2: LLP Onboarding Questionnaire (1:1 with media_1793700248017_f8d82dbe.png & media_1793700264418_1056579e.png) */}
      {currentStep === 2 && (
        <LLPOnboardingPage
          formData={formData}
          onBack={handleBackToStep1}
          onProceed={handleOnboardingProceed}
        />
      )}

      {/* Page 3: LLP Plan Confirmation (1:1 with media_1793688222341_af4052cb.png) */}
      {currentStep === 3 && (
        <LLPPlansPage
          formData={formData}
          onBack={handleBackToStep2}
          onProceedToPayment={handleProceedToPayment}
        />
      )}

      {/* Page 4: LLP Checkout & Bank Payment Gateway (1:1 with Partnership UI) */}
      {currentStep === 4 && (
        <LLPPaymentPage
          formData={formData}
          orderId={formData.orderNumber}
          onBack={handleBackToStep3}
          onChangePlan={handleBackToStep3}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </main>
  );
}
