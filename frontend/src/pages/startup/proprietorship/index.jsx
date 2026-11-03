import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';

import ProprietorshipLandingPage from './1-ProprietorshipLandingPage.jsx';
import ProprietorshipOnboardingPage from './2-ProprietorshipOnboardingPage.jsx';
import ProprietorshipPlansPage from './3-ProprietorshipPlansPage.jsx';
import ProprietorshipPaymentPage from './4-ProprietorshipPaymentPage.jsx';

export {
  ProprietorshipLandingPage,
  ProprietorshipOnboardingPage,
  ProprietorshipPlansPage,
  ProprietorshipPaymentPage,
};

export default function ProprietorshipModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();

  const stepParam = searchParams.get('step');
  const initialStep = stepParam ? parseInt(stepParam, 10) : 1;
  const currentStep = [1, 2, 3, 4].includes(initialStep) ? initialStep : 1;

  const getInitialDraft = () => {
    try {
      const saved = localStorage.getItem('bharatfiling_proprietorship_draft');
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
      tradeName: 'yash',
      industryType: 'Retail / General Store / Supermarket',
      stateName: 'Maharashtra',
      businessPlaceType: 'owned',
      packageId: 'starter',
      packageName: 'Starter (MSME Udyam Registration)',
      professionalFee: 999,
      onlineDiscount: 1000,
      totalAmount: 1238, // 999 + 18% GST (180) + Labour Welfare (59) = 1238
      orderNumber: `#PROP-${Math.floor(100000 + Math.random() * 900000)}`,
    };
  };

  const [formData, setFormData] = useState(getInitialDraft);

  // Sync draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bharatfiling_proprietorship_draft', JSON.stringify(formData));
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

  // Step 1: Package chosen from pricing section -> Advances to Step 3
  const handleSelectPlan = (packageId) => {
    setFormData((prev) => ({
      ...prev,
      packageId,
    }));
    setSearchParams({ step: '3' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 2: Back to Step 1
  const handleBackToStep1 = () => {
    setSearchParams({ step: '1' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 2: Onboarding proceed -> Advances to Step 3 (Plan Selection)
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

  // Step 3: Plan chosen -> Advances to Step 4 (Checkout Desk)
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

  // Step 4: Payment verified
  const handlePaymentSuccess = (receiptData) => {
    setFormData((prev) => ({
      ...prev,
      ...receiptData,
      status: 'paid',
    }));
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Page 1: Sole Proprietorship Landing Page */}
      {currentStep === 1 && (
        <ProprietorshipLandingPage
          initialData={formData}
          onSubmitLead={handleLeadSubmit}
          onSelectPlan={handleSelectPlan}
        />
      )}

      {/* Page 2: Sole Proprietorship Onboarding Questionnaire */}
      {currentStep === 2 && (
        <ProprietorshipOnboardingPage
          formData={formData}
          onBack={handleBackToStep1}
          onProceed={handleOnboardingProceed}
        />
      )}

      {/* Page 3: Sole Proprietorship Bundled Plans */}
      {currentStep === 3 && (
        <ProprietorshipPlansPage
          formData={formData}
          onBack={handleBackToStep2}
          onProceedToPayment={handleProceedToPayment}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {/* Page 4: Checkout & Payment Desk */}
      {currentStep === 4 && (
        <ProprietorshipPaymentPage
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
