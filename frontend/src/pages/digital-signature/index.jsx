import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';

// Modular Step Pages
import DscLandingPage from './1-DscLandingPage.jsx';
import DscDetailsPage from './2-DscDetailsPage.jsx';
import DscCheckoutPage from './3-DscCheckoutPage.jsx';
import DscPaymentPage from './4-DscPaymentPage.jsx';

export { DscLandingPage, DscDetailsPage, DscCheckoutPage, DscPaymentPage };

export default function DigitalSignatureModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const { showSuccess } = useToast();

  const stepParam = parseInt(searchParams.get('step') || '1', 10);
  const currentStep = [1, 2, 3, 4].includes(stepParam) ? stepParam : 1;
  const initialPlan = searchParams.get('plan') || 'combo';

  const getInitialDraft = () => {
    try {
      const saved = localStorage.getItem('bharatfiling_dsc_draft');
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return {
      email: user?.email || '',
      phone: user?.phone || '',
      cityPincode: '',
      preferredLanguage: 'en',
      whatsappOptIn: true,
      applicantCategory: 'individual',
      certificateType: 'combo',
      validityYears: 2,
      tokenChoice: 'epass2003',
      fullName: '',
      panNumber: '',
      plan: initialPlan,
    };
  };

  const [formData, setFormData] = useState(getInitialDraft);

  // Sync draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bharatfiling_dsc_draft', JSON.stringify(formData));
    } catch {
      // Ignore
    }
  }, [formData]);

  // Step 1: Lead capture on landing page -> Proceed to Payment (Step 4)
  const handleStep1GetStarted = (leadData) => {
    setFormData((prev) => ({
      ...prev,
      ...leadData,
    }));
    setSearchParams({ step: '4', plan: formData.plan || initialPlan });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showSuccess('Details captured! Proceeding to Payment.');
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Step 2: Questionnaire submit -> Proceed to Step 3
  const handleStep2Submit = (step2Data) => {
    if (step2Data) {
      setFormData((prev) => ({ ...prev, ...step2Data }));
    }
    setSearchParams({ step: '3', plan: formData.plan || initialPlan });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 3: Plan selection -> Proceed to Step 4
  const handleStep3Proceed = (planId) => {
    setFormData((prev) => ({ ...prev, plan: planId }));
    setSearchParams({ step: '4', plan: planId });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromStep4 = () => {
    // If user arrived directly from Step 1, go back to Step 1; else Step 3
    setSearchParams({ step: '1' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToStep2 = () => {
    setSearchParams({ step: '2', plan: formData.plan || initialPlan });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToStep1 = () => {
    setSearchParams({ step: '1' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Step 1: Landing Page (Exact 1:1 match of Screenshot 1 media_1793076544803_d56fffbc.png) */}
      {currentStep === 1 && (
        <DscLandingPage
          initialData={formData}
          onGetStarted={handleStep1GetStarted}
        />
      )}

      {/* Step 2: DSC Questionnaire & Parameters */}
      {currentStep === 2 && (
        <DscDetailsPage
          formData={formData}
          onInputChange={handleInputChange}
          onBack={handleBackToStep1}
          onSubmit={handleStep2Submit}
        />
      )}

      {/* Step 3: Plan Selection & Pricing */}
      {currentStep === 3 && (
        <DscCheckoutPage
          formData={formData}
          onSelectPlan={handleStep3Proceed}
          onBack={handleBackToStep2}
        />
      )}

      {/* Step 4: Payment Page (Exact 1:1 match of Screenshot media_1793079880114_335c03a3.png) */}
      {currentStep === 4 && (
        <DscPaymentPage
          formData={formData}
          onBack={handleBackFromStep4}
          onPaymentSuccess={() => {
            // Optional callback
          }}
        />
      )}
    </main>
  );
}
