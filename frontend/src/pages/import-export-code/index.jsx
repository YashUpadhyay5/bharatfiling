import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';

// Modular Step Pages
import IecLandingPage from './1-IecLandingPage.jsx';
import BusinessDetailsPage from './2-BusinessDetailsPage.jsx';
import IecCheckoutPage from './3-IecCheckoutPage.jsx';
import IecPaymentPage from './4-IecPaymentPage.jsx';

export {
  IecLandingPage,
  BusinessDetailsPage,
  IecCheckoutPage,
  IecPaymentPage,
};

export default function IecRegistrationModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();

  const stepParam = parseInt(searchParams.get('step') || '1', 10);
  const currentStep = [1, 2, 3, 4].includes(stepParam) ? stepParam : 1;

  const initialPlan = searchParams.get('plan') || 'standard';

  const getInitialDraft = () => {
    try {
      const saved = localStorage.getItem('bharatfiling_iec_draft');
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return {
      email: user?.email || '',
      phone: user?.phone || '',
      cityPincode: '',
      whatsappOptIn: true,
      enterpriseName: '',
      organizationType: 'Sole Proprietorship',
      exportActivity: 'Merchant Exporter (Trading of physical goods)',
      annualTurnover: '10 lakhs - 1 crore',
      pan: '',
      plan: initialPlan,
    };
  };

  const [formData, setFormData] = useState(getInitialDraft);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bharatfiling_iec_draft', JSON.stringify(formData));
    } catch {
      // Ignore
    }
  }, [formData]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Step 1: Lead capture on landing page -> Proceed to Step 2 (No blocker auth modals)
  const handleStep1GetStarted = (leadData) => {
    setFormData((prev) => ({
      ...prev,
      ...leadData,
    }));
    setSearchParams({ step: '2', plan: formData.plan || initialPlan });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 2: Business questionnaire -> Proceed to Step 3
  const handleStep2Submit = (e) => {
    if (e) e.preventDefault();
    if (!formData.organizationType) {
      showError('Please select your business entity type');
      return;
    }
    if (!formData.pan || formData.pan.length < 10) {
      showError('Please enter a valid 10-character PAN number');
      return;
    }

    setSearchParams({ step: '3', plan: formData.plan || initialPlan });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 3: Package selection -> Proceed to Step 4
  const handleStep3Proceed = (planId) => {
    setFormData((prev) => ({ ...prev, plan: planId }));
    setSearchParams({ step: '4', plan: planId });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Step 1: Landing Page (Exact clone of Vakilsearch Hero & Deep Sections) */}
      {currentStep === 1 && (
        <IecLandingPage
          initialData={formData}
          onGetStarted={handleStep1GetStarted}
        />
      )}

      {/* Step 2: Business Details Questionnaire */}
      {currentStep === 2 && (
        <BusinessDetailsPage
          formData={formData}
          onInputChange={handleInputChange}
          onBack={() => {
            setSearchParams({ step: '1' });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSubmit={handleStep2Submit}
          isSubmitting={isSubmitting}
        />
      )}

      {/* Step 3: Plan Selection (With embedded direct Pay button on each card) */}
      {currentStep === 3 && (
        <IecCheckoutPage
          formData={formData}
          onSelectPlan={handleStep3Proceed}
          onBack={() => {
            setSearchParams({ step: '2', plan: formData.plan });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* Step 4: Payment Desk (Vakilsearch Clone with UPI/PhonePe, Taxes & Labour Welfare) */}
      {currentStep === 4 && (
        <IecPaymentPage
          planId={formData.plan}
          formData={formData}
          onPaymentSuccess={() => {
            try {
              localStorage.removeItem('bharatfiling_iec_draft');
            } catch {
              // Ignore
            }
          }}
        />
      )}
    </main>
  );
}
