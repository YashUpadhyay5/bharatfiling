import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';

import LLPLandingPage from './1-LLPLandingPage.jsx';

export {
  LLPLandingPage,
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
      partnersCount: '2',
      contributionAmount: '10000',
      stateName: 'Maharashtra',
      packageId: 'standard',
      packageName: 'Standard (LLP Incorporation + DSC + DPIN + Form 3)',
      professionalFee: 4999,
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

  // Step 1: Lead capture submit -> Advances to Step 2 (when available)
  const handleLeadSubmit = (leadData) => {
    setFormData((prev) => ({
      ...prev,
      ...leadData,
    }));
    setSearchParams({ step: '2' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 1: Package chosen from pricing section -> Advances to Step 2 (Questionnaire)
  const handleSelectPlan = (packageId) => {
    setFormData((prev) => ({
      ...prev,
      packageId,
    }));
    setSearchParams({ step: '2' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

      {/* Placeholder / Fallback for subsequent steps until user uploads next page */}
      {currentStep > 1 && (
        <LLPLandingPage
          initialData={formData}
          onSubmitLead={handleLeadSubmit}
          onSelectPlan={handleSelectPlan}
        />
      )}
    </main>
  );
}
