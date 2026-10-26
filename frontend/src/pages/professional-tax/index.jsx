import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';

// Modular Step Pages
import PtLandingPage from './1-PtLandingPage.jsx';
import BusinessDetailsPage from './2-BusinessDetailsPage.jsx';
import PtCheckoutPage from './3-PtCheckoutPage.jsx';
import PtPaymentPage from './4-PtPaymentPage.jsx';

export {
  PtLandingPage,
  BusinessDetailsPage,
  PtCheckoutPage,
  PtPaymentPage,
};

export default function PtRegistrationModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const { showSuccess } = useToast();

  const stepParam = parseInt(searchParams.get('step') || '1', 10);
  const currentStep = [1, 2, 3, 4].includes(stepParam) ? stepParam : 1;
  const initialPlan = searchParams.get('plan') || 'starter';

  const getInitialDraft = () => {
    try {
      const saved = localStorage.getItem('bharatfiling_pt_draft');
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return {
      email: user?.email || '',
      phone: user?.phone || '',
      cityPincode: '',
      whatsappOptIn: true,
      certificateType: 'both',
      operatingState: 'Maharashtra',
      entityType: 'proprietorship',
      employeeCount: 'under_5',
      plan: initialPlan,
    };
  };

  const [formData, setFormData] = useState(getInitialDraft);

  // Sync draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bharatfiling_pt_draft', JSON.stringify(formData));
    } catch {
      // Ignore
    }
  }, [formData]);

  // Step 1: Lead capture on landing page -> Proceed to Step 2
  const handleStep1GetStarted = (leadData) => {
    setFormData((prev) => ({
      ...prev,
      ...leadData,
    }));
    setSearchParams({ step: '2', plan: formData.plan || initialPlan });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showSuccess('Lead captured! Moving to business details.');
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

  // Step 3: Package selection -> Proceed to Step 4
  const handleStep3Proceed = (planId, addons = []) => {
    setFormData((prev) => ({ ...prev, plan: planId, addons }));
    setSearchParams({ step: '4', plan: planId });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Step 1: Landing Page (Exact clone of Vakilsearch Hero & Deep Content) */}
      {currentStep === 1 && (
        <PtLandingPage
          initialData={formData}
          onGetStarted={handleStep1GetStarted}
        />
      )}

      {/* Step 2: Business & Certificate Questionnaire */}
      {currentStep === 2 && (
        <BusinessDetailsPage
          formData={formData}
          onInputChange={handleInputChange}
          onBack={() => {
            setSearchParams({ step: '1' });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSubmit={handleStep2Submit}
        />
      )}

      {/* Step 3: Package & Add-ons Selection */}
      {currentStep === 3 && (
        <PtCheckoutPage
          formData={formData}
          onBack={() => {
            setSearchParams({ step: '2' });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onProceed={handleStep3Proceed}
        />
      )}

      {/* Step 4: Secure Payment Desk */}
      {currentStep === 4 && (
        <PtPaymentPage
          formData={formData}
          onBack={() => {
            setSearchParams({ step: '3' });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}
    </main>
  );
}
