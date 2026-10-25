import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';

// Modular Step Pages
import UdyamLandingPage from './1-UdyamLandingPage.jsx';
import EnterpriseDetailsPage from './2-EnterpriseDetailsPage.jsx';
import UdyamCheckoutPage from './3-UdyamCheckoutPage.jsx';
import UdyamPaymentPage from './4-UdyamPaymentPage.jsx';

export {
  UdyamLandingPage,
  EnterpriseDetailsPage,
  UdyamCheckoutPage,
  UdyamPaymentPage,
};

export default function UdyamRegistrationModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();

  const stepParam = parseInt(searchParams.get('step') || '1', 10);
  const currentStep = [1, 2, 3, 4].includes(stepParam) ? stepParam : 1;

  const initialPlan = searchParams.get('plan') || 'standard';

  const getInitialDraft = () => {
    try {
      const saved = localStorage.getItem('bharatfiling_udyam_draft');
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
      annualTurnover: '10 lakhs - 1 crore',
      majorActivity: 'Services',
      pan: '',
      aadhaar: '',
      state: 'Karnataka',
      plan: initialPlan,
    };
  };

  const [formData, setFormData] = useState(getInitialDraft);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bharatfiling_udyam_draft', JSON.stringify(formData));
    } catch {
      // Ignore
    }
  }, [formData]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Step 1: Lead capture on landing page -> Proceed to Step 2 directly (No login required)
  const handleStep1GetStarted = (leadData) => {
    setFormData((prev) => ({
      ...prev,
      ...leadData,
    }));
    setSearchParams({ step: '2', plan: formData.plan || initialPlan });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 2: Enterprise questionnaire -> Proceed to Step 3
  const handleStep2Submit = (e) => {
    if (e) e.preventDefault();
    if (!formData.organizationType) {
      showError('Please select your entity type');
      return;
    }

    setSearchParams({ step: '3', plan: formData.plan || initialPlan });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 3: Package tier selection -> Proceed to Step 4
  const handleStep3Proceed = (planId) => {
    setFormData((prev) => ({ ...prev, plan: planId }));
    setSearchParams({ step: '4', plan: planId });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Step 1: Landing Page (Exact clone of Vakilsearch Hero & Deep Sections) */}
      {currentStep === 1 && (
        <UdyamLandingPage
          initialData={formData}
          onGetStarted={handleStep1GetStarted}
        />
      )}

      {/* Step 2: Enterprise Details Questionnaire (Exact clone with Entity Type and Annual Turnover) */}
      {currentStep === 2 && (
        <EnterpriseDetailsPage
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

      {/* Step 3: Package & Plan Selection */}
      {currentStep === 3 && (
        <UdyamCheckoutPage
          formData={formData}
          selectedPlanId={formData.plan || initialPlan}
          onSelectPlan={(id) => setFormData((prev) => ({ ...prev, plan: id }))}
          onProceedToPayment={handleStep3Proceed}
          onBack={() => {
            setSearchParams({ step: '2', plan: formData.plan || initialPlan });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* Step 4: Payment Desk with Dynamic Pricing & Instant Confirmation */}
      {currentStep === 4 && (
        <UdyamPaymentPage
          planId={formData.plan || initialPlan}
          formData={formData}
          onPaymentSuccess={() => {
            showSuccess('Payment confirmed! Udyam registration is being drafted.');
          }}
        />
      )}
    </main>
  );
}
