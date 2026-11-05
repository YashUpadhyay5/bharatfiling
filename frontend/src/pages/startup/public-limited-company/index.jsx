import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';

import PublicCompanyLandingPage from './1-PublicCompanyLandingPage.jsx';
import PublicCompanyOnboardingPage from './2-PublicCompanyOnboardingPage.jsx';
import PublicCompanyPreBundlePage from './3-PublicCompanyPreBundlePage.jsx';
import PublicCompanyPaymentPage from './4-PublicCompanyPaymentPage.jsx';

export {
  PublicCompanyLandingPage,
  PublicCompanyOnboardingPage,
  PublicCompanyPreBundlePage,
  PublicCompanyPaymentPage,
};

export default function PublicCompanyModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();

  const stepParam = searchParams.get('step');
  const initialStep = stepParam ? parseInt(stepParam, 10) : 1;
  const currentStep = [1, 2, 3, 4].includes(initialStep) ? initialStep : 1;

  const getInitialDraft = () => {
    try {
      const saved = localStorage.getItem('bharatfiling_public_company_draft');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore parse errors
    }
    return {
      email: user?.email || 'yashupadhyay@example.com',
      phone: user?.phone || '',
      cityPincode: 'Mumbai, 400001',
      language: 'English',
      whatsappUpdates: true,
      proposedCompanyName: 'solaria',
      businessAge: 'Less than 1 year',
      numberOfDirectors: 3,
      numberOfMembers: 7,
      packageId: 'standard_public_ltd',
      packageName: 'Standard Incorporation',
      professionalFee: 24999,
      onlineDiscount: 1000,
      totalAmount: 29558,
      orderNumber: `#PLC-${Math.floor(100000 + Math.random() * 900000)}`,
    };
  };

  const [formData, setFormData] = useState(getInitialDraft);

  // Sync draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bharatfiling_public_company_draft', JSON.stringify(formData));
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
      {/* Page 1: Public Limited Company Landing Page */}
      {currentStep === 1 && (
        <PublicCompanyLandingPage
          initialData={formData}
          onSubmitLead={handleLeadSubmit}
          onSelectPlan={handleSelectPlan}
        />
      )}

      {/* Page 2: Public Limited Company Onboarding Questionnaire */}
      {currentStep === 2 && (
        <PublicCompanyOnboardingPage
          formData={formData}
          onBack={handleBackToStep1}
          onProceed={handleOnboardingProceed}
        />
      )}

      {/* Page 3: Pre-Bundle Selected Plan Confirmation */}
      {currentStep === 3 && (
        <PublicCompanyPreBundlePage
          formData={formData}
          onBack={handleBackToStep2}
          onProceed={handlePreBundleProceed}
        />
      )}

      {/* Page 4: Final Payment Desk */}
      {currentStep === 4 && (
        <PublicCompanyPaymentPage
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
