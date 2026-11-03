import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';

import TrustLandingPage from './1-TrustLandingPage.jsx';
import TrustOnboardingPage from './2-TrustOnboardingPage.jsx';
import TrustPlansPage from './3-TrustPlansPage.jsx';
import TrustPaymentPage from './4-TrustPaymentPage.jsx';

export {
  TrustLandingPage,
  TrustOnboardingPage,
  TrustPlansPage,
  TrustPaymentPage,
};

export default function TrustRegistrationModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();

  const stepParam = searchParams.get('step');
  const initialStep = stepParam ? parseInt(stepParam, 10) : 1;
  const currentStep = [1, 2, 3, 4].includes(initialStep) ? initialStep : 1;

  const getInitialDraft = () => {
    try {
      const saved = localStorage.getItem('bharatfiling_trust_draft');
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
      trustName: 'Vidya Jyoti Educational & Charitable Trust',
      trustCategory: 'public_charitable',
      trusteesCount: '3_to_5',
      corpusFund: '10000',
      stateName: 'Delhi NCR',
      officeType: 'rented',
      packageId: 'standard',
      packageName: 'Standard',
      professionalFee: 4999,
      onlineDiscount: 2500,
      totalAmount: 3008, // 2499 + 18% GST (450) + Labour Welfare (59) = 3008
      orderNumber: `#TRST-${Math.floor(100000 + Math.random() * 900000)}`,
    };
  };

  const [formData, setFormData] = useState(getInitialDraft);

  // Sync draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bharatfiling_trust_draft', JSON.stringify(formData));
    } catch {
      // Ignore storage errors
    }
  }, [formData]);

  // Step 1: Lead capture submit -> Advances to Step 2 (Onboarding Questionnaire)
  const handleLeadSubmit = (leadData) => {
    setFormData((prev) => ({
      ...prev,
      ...leadData,
    }));
    setSearchParams({ step: '2' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 1: Package chosen from pricing section -> Advances to Step 2 (Onboarding Questionnaire)
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

  // Step 2: Onboarding proceed -> Advances to Step 3 (Plan Confirmation - Image 1)
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

  // Step 3: Plan chosen -> Advances to Step 4 (Payment Desk - Image 2)
  const handleProceedToPayment = (plan) => {
    const originalFee = plan.originalPrice || (plan.price === 999 ? 1499 : plan.price * 2);
    const subTotal = plan.price;
    const gstOnFee = Math.round(subTotal * 0.18);
    const labourWelfareCharge = 59; // 50 + 9
    const total = subTotal + gstOnFee + labourWelfareCharge;

    setFormData((prev) => ({
      ...prev,
      packageId: plan.id,
      packageName: plan.name,
      professionalFee: originalFee,
      onlineDiscount: plan.discountAmount || (originalFee - subTotal),
      totalAmount: total,
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
      {/* Page 1: Trust Registration Landing Page */}
      {currentStep === 1 && (
        <TrustLandingPage
          initialData={formData}
          onSubmitLead={handleLeadSubmit}
          onSelectPlan={handleSelectPlan}
        />
      )}

      {/* Page 2: Trust Onboarding & Deed Particulars Questionnaire (3 Quick Questions) */}
      {currentStep === 2 && (
        <TrustOnboardingPage
          formData={formData}
          onBack={handleBackToStep1}
          onProceed={handleOnboardingProceed}
        />
      )}

      {/* Page 3: Trust Selected Plan Confirmation & Switcher (1:1 with media_1793688222341_af4052cb.png) */}
      {currentStep === 3 && (
        <TrustPlansPage
          formData={formData}
          onBack={handleBackToStep2}
          onProceedToPayment={handleProceedToPayment}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {/* Page 4: Checkout & Payment Desk (1:1 with media_1793688203157_972f522c.png) */}
      {currentStep === 4 && (
        <TrustPaymentPage
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
