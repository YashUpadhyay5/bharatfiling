import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';

import PvtLtdLandingPage from './1-PvtLtdLandingPage.jsx';
import PvtLtdOnboardingPage from './2-PvtLtdOnboardingPage.jsx';
import PvtLtdPreBundlePage from './3-PvtLtdPreBundlePage.jsx';
import PvtLtdPaymentPage from './4-PvtLtdPaymentPage.jsx';

export {
  PvtLtdLandingPage,
  PvtLtdOnboardingPage,
  PvtLtdPreBundlePage,
  PvtLtdPaymentPage,
};

export default function PrivateLimitedCompanyModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();

  const stepParam = searchParams.get('step');
  const initialStep = stepParam ? parseInt(stepParam, 10) : 1;
  const currentStep = [1, 2, 3, 4].includes(initialStep) ? initialStep : 1;

  const getInitialDraft = () => {
    try {
      const saved = localStorage.getItem('bharatfiling_pvtltd_draft');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore parse errors
    }
    return {
      email: user?.email || 'yashupadhyay@example.com',
      phone: user?.phone || '',
      cityPincode: 'Chennai, 600001',
      language: 'English',
      whatsappUpdates: true,
      proposedCompanyName: 'ttytr',
      businessAge: 'Less than 1 year',
      numberOfDirectors: 2,
      packageId: 'starter_pvt_ltd',
      packageName: 'Starter',
      professionalFee: 999,
      onlineDiscount: 500,
      totalAmount: 1238, // 999 + 239 (taxes) = 1238
      orderNumber: `#PVT-${Math.floor(100000 + Math.random() * 900000)}`,
    };
  };

  const [formData, setFormData] = useState(getInitialDraft);

  // Sync draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bharatfiling_pvtltd_draft', JSON.stringify(formData));
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

  // Step 1: Package chosen from pricing section -> Advances to Step 2
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

  // Step 2: Onboarding proceed -> Advances to Step 3 (Pre-bundle Plan Confirmation)
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

  // Step 3: Pre-bundle proceed -> Advances to Step 4 (Payment Desk)
  const handlePreBundleProceed = (plan) => {
    setFormData((prev) => ({
      ...prev,
      packageId: plan.id,
      packageName: plan.name,
      professionalFee: plan.price,
      onlineDiscount: plan.discountAmount,
      totalAmount: 1238,
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
      {/* Page 1: Private Limited Company Landing Page (1:1 with media_1793612966359_3ac84746.png) */}
      {currentStep === 1 && (
        <PvtLtdLandingPage
          initialData={formData}
          onSubmitLead={handleLeadSubmit}
          onSelectPlan={handleSelectPlan}
        />
      )}

      {/* Page 2: Private Limited Company Onboarding Questionnaire (1:1 with media_1793614513651_e181bb47.png & media_1793614525557_32c6a9b9.png) */}
      {currentStep === 2 && (
        <PvtLtdOnboardingPage
          formData={formData}
          onBack={handleBackToStep1}
          onProceed={handleOnboardingProceed}
        />
      )}

      {/* Page 3: Pre-Bundle Selected Plan Confirmation (1:1 with media_1793614776593_5a4d37fe.png) */}
      {currentStep === 3 && (
        <PvtLtdPreBundlePage
          formData={formData}
          onBack={handleBackToStep2}
          onProceed={handlePreBundleProceed}
        />
      )}

      {/* Page 4: Final Payment Desk (Motivated by GST & OPC Payment desks) */}
      {currentStep === 4 && (
        <PvtLtdPaymentPage
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
