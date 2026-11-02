import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';

import OpcLandingPage from './1-OpcLandingPage.jsx';
import OpcOnboardingPage from './2-OpcOnboardingPage.jsx';

export { OpcLandingPage, OpcOnboardingPage };

export default function OnePersonCompanyModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();

  const stepParam = searchParams.get('step');
  const initialStep = stepParam ? parseInt(stepParam, 10) : 1;
  const currentStep = [1, 2, 3, 4].includes(initialStep) ? initialStep : 1;

  const getInitialDraft = () => {
    try {
      const saved = localStorage.getItem('bharatfiling_opc_draft');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore parse errors
    }
    return {
      email: user?.email || 'yashupadhyay@example.com',
      phone: user?.phone || '+91 7668976193',
      proposedCompanyName: 'yash',
      businessAge: 'Less than 1 year',
      nomineeName: '',
      capitalContribution: '100000',
      whatsappUpdates: true,
      packageId: 'standard_opc',
      packageName: 'Standard Incorporation (SPICe+ Part A & B)',
      professionalFee: 5499,
      onlineDiscount: 0,
      totalAmount: 6489, // 5499 + 18% GST (990) = 6489
      orderNumber: `#OPC-${Math.floor(100000 + Math.random() * 900000)}`,
    };
  };

  const [formData, setFormData] = useState(getInitialDraft);

  // Sync draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bharatfiling_opc_draft', JSON.stringify(formData));
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

  // Step 2: Onboarding proceed -> Updates draft and prepares for Step 3
  const handleOnboardingProceed = (onboardingData) => {
    setFormData((prev) => ({
      ...prev,
      ...onboardingData,
    }));
    setSearchParams({ step: '2' });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Page 1: One Person Company Landing Page (1:1 with media_1793609494674_acaf8785.png) */}
      {currentStep === 1 && (
        <OpcLandingPage
          initialData={formData}
          onSubmitLead={handleLeadSubmit}
          onSelectPlan={handleSelectPlan}
        />
      )}

      {/* Page 2: One Person Company Onboarding Questionnaire (1:1 with media_1793610345669_78960de8.png & media_1793610364903_9a7ee176.png) */}
      {currentStep === 2 && (
        <OpcOnboardingPage
          formData={formData}
          onBack={handleBackToStep1}
          onProceed={handleOnboardingProceed}
        />
      )}
    </main>
  );
}
