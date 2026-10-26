import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';

// Modular Step Pages
import ShopLandingPage from './1-ShopLandingPage.jsx';
import BusinessDetailsPage from './2-BusinessDetailsPage.jsx';
import ShopCheckoutPage from './3-ShopCheckoutPage.jsx';
import ShopPaymentPage from './4-ShopPaymentPage.jsx';

export { ShopLandingPage, BusinessDetailsPage, ShopCheckoutPage, ShopPaymentPage };

export default function ShopEstablishmentModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const { showSuccess } = useToast();

  const stepParam = parseInt(searchParams.get('step') || '1', 10);
  const currentStep = [1, 2, 3, 4].includes(stepParam) ? stepParam : 1;
  const initialPlan = searchParams.get('plan') || 'express';

  const getInitialDraft = () => {
    try {
      const saved = localStorage.getItem('bharatfiling_shop_draft');
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return {
      email: user?.email || '',
      phone: user?.phone || '',
      cityPincode: '',
      whatsappOptIn: true,
      companyName: '',
      isCommercialPlace: 'Yes',
      entityType: 'proprietorship',
      operatingState: 'Maharashtra',
      establishmentNature: 'commercial',
      employeeCount: '0',
      plan: initialPlan,
    };
  };

  const [formData, setFormData] = useState(getInitialDraft);

  // Sync draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bharatfiling_shop_draft', JSON.stringify(formData));
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
    showSuccess('Lead captured! Ready for business details.');
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

  const handleBackToStep3 = () => {
    setSearchParams({ step: '3', plan: formData.plan || initialPlan });
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
      {/* Step 1: Landing Page (Exact 1:1 match of Screenshot 1) */}
      {currentStep === 1 && (
        <ShopLandingPage
          initialData={formData}
          onGetStarted={handleStep1GetStarted}
        />
      )}

      {/* Step 2: Business & Establishment Details (Exact 1:1 match of Screenshot 2) */}
      {currentStep === 2 && (
        <BusinessDetailsPage
          formData={formData}
          onInputChange={handleInputChange}
          onBack={handleBackToStep1}
          onSubmit={handleStep2Submit}
        />
      )}

      {/* Step 3: Plan Checkout (Exact 1:1 match of Screenshot 3) */}
      {currentStep === 3 && (
        <ShopCheckoutPage
          formData={formData}
          onSelectPlan={handleStep3Proceed}
          onBack={handleBackToStep2}
        />
      )}

      {/* Step 4: Payment & Invoice (Exact 1:1 match of Screenshot 4) */}
      {currentStep === 4 && (
        <ShopPaymentPage
          formData={formData}
          onBack={handleBackToStep3}
          onPaymentSuccess={() => {
            // Optional callback
          }}
        />
      )}
    </main>
  );
}
