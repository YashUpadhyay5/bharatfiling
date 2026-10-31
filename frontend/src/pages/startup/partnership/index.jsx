import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';

import PartnershipLandingPage from './1-PartnershipLandingPage.jsx';
import PartnershipOnboardingPage from './2-PartnershipOnboardingPage.jsx';
import PartnershipPlansPage from './3-PartnershipPlansPage.jsx';

export {
  PartnershipLandingPage,
  PartnershipOnboardingPage,
  PartnershipPlansPage,
};

export default function PartnershipModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();

  const stepParam = searchParams.get('step');
  const initialStep = stepParam ? parseInt(stepParam, 10) : 1;
  const currentStep = [1, 2, 3].includes(initialStep) ? initialStep : 1;

  const getInitialDraft = () => {
    try {
      const saved = localStorage.getItem('bharatfiling_partnership_draft');
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
      stateCode: 'MH',
      stateName: 'Maharashtra',
      firmName: 'yash',
      industryType: 'tech',
      numberOfPartners: '3-5',
      packageId: 'standard',
      packageName: 'Standard (Partnership + GST Registration)',
      professionalFee: 4999,
      onlineDiscount: 0,
      totalAmount: 5899, // 4999 + 18% GST (900) = 5899
      orderNumber: `#PTR-${Math.floor(100000 + Math.random() * 900000)}`,
    };
  };

  const [formData, setFormData] = useState(getInitialDraft);

  // Sync draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bharatfiling_partnership_draft', JSON.stringify(formData));
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

  // Step 2: Onboarding proceed -> Advances to Step 3 (Plan Selection & Checkout)
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

  // Step 3: Payment verified
  const handlePaymentSuccess = (receiptData) => {
    setFormData((prev) => ({
      ...prev,
      ...receiptData,
      status: 'paid',
    }));
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Page 1: Partnership Firm Registration Landing Page (1:1 with media_1793435760325_26064797.png) */}
      {currentStep === 1 && (
        <PartnershipLandingPage
          initialData={formData}
          onSubmitLead={handleLeadSubmit}
          onSelectPlan={handleSelectPlan}
        />
      )}

      {/* Page 2: Partnership Onboarding Questionnaire (1:1 with media_1793437760958_a855c27e.png, media_1793438008589_986a59cd.png, media_1793438026631_c42a93b3.png) */}
      {currentStep === 2 && (
        <PartnershipOnboardingPage
          formData={formData}
          onBack={handleBackToStep1}
          onProceed={handleOnboardingProceed}
        />
      )}

      {/* Page 3: Partnership Plan Selection & Checkout (1:1 with media_1793442667305_e946b79c.png) */}
      {currentStep === 3 && (
        <PartnershipPlansPage
          formData={formData}
          onBack={handleBackToStep2}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </main>
  );
}
