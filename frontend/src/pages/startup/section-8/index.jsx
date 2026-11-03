import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';

import Section8LandingPage from './1-Section8LandingPage.jsx';
import Section8OnboardingPage from './2-Section8OnboardingPage.jsx';
import Section8PlansPage from './3-Section8PlansPage.jsx';
import Section8PaymentPage from './4-Section8PaymentPage.jsx';

export {
  Section8LandingPage,
  Section8OnboardingPage,
  Section8PlansPage,
  Section8PaymentPage,
};

export default function Section8Module() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();

  const stepParam = searchParams.get('step');
  const initialStep = stepParam ? parseInt(stepParam, 10) : 1;
  const currentStep = [1, 2, 3, 4].includes(initialStep) ? initialStep : 1;

  const getInitialDraft = () => {
    try {
      const saved = localStorage.getItem('bharatfiling_section8_draft');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore parse errors
    }
    return {
      email: user?.email || 'yashupadhyay@example.com',
      phone: user?.phone || '+91 7668976193',
      cityPincode: 'New Delhi, 110001',
      language: 'English',
      whatsappUpdates: true,
      proposedFoundationName: 'Hope India Welfare Foundation',
      charitableObjective: 'Education, Literacy & Skill Development',
      directorsCount: '2',
      authorizedCapital: '0',
      stateName: 'Delhi',
      packageId: 'starter',
      packageName: 'Starter (Section 8 Company Incorporation)',
      professionalFee: 999,
      onlineDiscount: 1000,
      totalAmount: 1238, // 999 + 180 (GST) + 50 (Welfare) + 9 = 1238
      orderNumber: `#SEC8-${Math.floor(100000 + Math.random() * 900000)}`,
    };
  };

  const [formData, setFormData] = useState(getInitialDraft);

  // Sync draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bharatfiling_section8_draft', JSON.stringify(formData));
    } catch {
      // Ignore storage errors
    }
  }, [formData]);

  // Step 1: Lead capture submit -> Advances to Step 2
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

  // Step 2: Onboarding proceed -> Advances to Step 3 (Plan Confirmation)
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
      totalAmount: Math.round(plan.price * 1.18) + 59,
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
      {/* Page 1: Section 8 Landing Page */}
      {currentStep === 1 && (
        <Section8LandingPage
          initialData={formData}
          onSubmitLead={handleLeadSubmit}
          onSelectPlan={handleSelectPlan}
        />
      )}

      {/* Page 2: Onboarding Questionnaire */}
      {currentStep === 2 && (
        <Section8OnboardingPage
          formData={formData}
          onBack={handleBackToStep1}
          onProceed={handleOnboardingProceed}
        />
      )}

      {/* Page 3: Pre-Bundle Plan Confirmation */}
      {currentStep === 3 && (
        <Section8PlansPage
          formData={formData}
          onBack={handleBackToStep2}
          onProceedToPayment={handleProceedToPayment}
        />
      )}

      {/* Page 4: Checkout & Payment Desk */}
      {currentStep === 4 && (
        <Section8PaymentPage
          formData={formData}
          orderId={formData.orderNumber}
          onBack={handleBackToStep3}
          onChangePlan={() => setSearchParams({ step: '3' })}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </main>
  );
}
