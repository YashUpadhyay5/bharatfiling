import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';

// Modular Step Pages
import FssaiLandingPage from './1-FssaiLandingPage.jsx';
import BusinessDetailsPage from './2-BusinessDetailsPage.jsx';
import FssaiCheckoutPage from './3-FssaiCheckoutPage.jsx';
import FssaiPaymentPage from './4-FssaiPaymentPage.jsx';

export {
  FssaiLandingPage,
  BusinessDetailsPage,
  FssaiCheckoutPage,
  FssaiPaymentPage,
};

export default function FssaiRegistrationModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();

  const stepParam = parseInt(searchParams.get('step') || '1', 10);
  const currentStep = [1, 2, 3, 4].includes(stepParam) ? stepParam : 1;

  const initialPlan = searchParams.get('plan') || 'starter';

  const getInitialDraft = () => {
    try {
      const saved = localStorage.getItem('bharatfiling_fssai_draft');
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return {
      email: user?.email || '',
      phone: user?.phone || '',
      cityPincode: '',
      whatsappOptIn: true,
      businessName: '',
      businessType: 'restaurant_cloud_kitchen',
      turnover: 'under_12_lakh',
      validityYears: 1,
      premiseType: 'rented',
      address: '',
      stateName: 'Maharashtra',
      foodCategory: 'Ready-to-eat savouries & meals',
      plan: initialPlan,
    };
  };

  const [formData, setFormData] = useState(getInitialDraft);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bharatfiling_fssai_draft', JSON.stringify(formData));
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
    const nextPlan = leadData.plan || formData.plan || initialPlan;
    setSearchParams({ step: '2', plan: nextPlan });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 2: Business questionnaire -> Proceed to Step 3
  const handleStep2Submit = (e) => {
    if (e) e.preventDefault();
    setSearchParams({ step: '3', plan: formData.plan || initialPlan });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 3: Package selection -> Proceed to Step 4
  const handleStep3Proceed = (planId, addons) => {
    setFormData((prev) => ({ ...prev, plan: planId, addons }));
    setSearchParams({ step: '4', plan: planId });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Step 1: Landing Page (Exact clone of Vakilsearch Hero & Deep Educational Sections) */}
      {currentStep === 1 && (
        <FssaiLandingPage
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

      {/* Step 3: Plan Selection (Basic ₹1999, State ₹3999, Central ₹7499) */}
      {currentStep === 3 && (
        <FssaiCheckoutPage
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
        <FssaiPaymentPage
          planId={formData.plan}
          formData={formData}
          onPaymentSuccess={() => {
            try {
              localStorage.removeItem('bharatfiling_fssai_draft');
            } catch {
              // Ignore
            }
          }}
        />
      )}
    </main>
  );
}
