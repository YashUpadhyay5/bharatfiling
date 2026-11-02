import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';

import PvtLtdLandingPage from './1-PvtLtdLandingPage.jsx';
import PvtLtdOnboardingPage from './2-PvtLtdOnboardingPage.jsx';

export { PvtLtdLandingPage, PvtLtdOnboardingPage };

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
      phone: user?.phone || '+91 7668976193',
      cityPincode: 'Chennai, 600001',
      language: 'English',
      whatsappUpdates: true,
      proposedCompanyName: 'ttytr',
      businessAge: 'Less than 1 year',
      numberOfDirectors: 2,
      packageId: 'standard_pvt_ltd',
      packageName: 'Standard Incorporation',
      professionalFee: 4999,
      onlineDiscount: 500,
      totalAmount: 5899, // 4999 + 18% GST (900) = 5899
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

  // Step 2: Onboarding proceed -> Updates draft
  const handleOnboardingProceed = (onboardingData) => {
    setFormData((prev) => ({
      ...prev,
      ...onboardingData,
    }));
    // Keeps user on step 2 with draft saved, ready for the next screen
    setSearchParams({ step: '2' });
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
      {(currentStep === 2 || currentStep >= 3) && (
        <PvtLtdOnboardingPage
          formData={formData}
          onBack={handleBackToStep1}
          onProceed={handleOnboardingProceed}
        />
      )}
    </main>
  );
}
