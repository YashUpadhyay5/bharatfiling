import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';

// Modular Step Pages
import PfLandingPage from './1-PfLandingPage.jsx';
import PfDetailsPage from './2-PfDetailsPage.jsx';
import PfCheckoutPage from './3-PfCheckoutPage.jsx';
import PfPaymentPage from './4-PfPaymentPage.jsx';

export { PfLandingPage, PfDetailsPage, PfCheckoutPage, PfPaymentPage };

export default function PfRegistrationModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const { showSuccess } = useToast();

  const stepParam = searchParams.get('step');
  const potentialIdParam = searchParams.get('potential_id');
  const initialStep = stepParam ? parseInt(stepParam, 10) : (potentialIdParam ? 4 : 1);
  const currentStep = [1, 2, 3, 4].includes(initialStep) ? initialStep : 1;
  const initialPlan = searchParams.get('plan') || 'standard';

  const getInitialDraft = () => {
    try {
      const saved = localStorage.getItem('bharatfiling_pf_draft');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (potentialIdParam) {
          parsed.orderNumber = parsed.orderNumber || '#est179126201735020264574a';
          parsed.name = parsed.name || 'Yash Upadhyay';
          parsed.email = parsed.email || 'ya*****************@com';
          parsed.phone = parsed.phone || '+91-*******193';
        }
        return parsed;
      }
    } catch {
      // Ignore parse errors
    }
    return {
      name: potentialIdParam ? 'Yash Upadhyay' : (user?.name || user?.full_name || ''),
      email: potentialIdParam ? 'ya*****************@com' : (user?.email || ''),
      phone: potentialIdParam ? '+91-*******193' : (user?.phone || ''),
      orderNumber: potentialIdParam ? '#est179126201735020264574a' : '',
      whatsappOptIn: true,
      businessName: '',
      cinGstin: '',
      wantDbsAccount: 'yes',
      employeeCoverage: 'twenty_plus',
      entityType: 'company',
      coverageType: 'mandatory',
      employeeCount: 20,
      eligibleWageEmployees: 15,
      entityPan: '',
      state: 'Karnataka',
      authorizedSignatory: user?.name || user?.full_name || '',
      signatoryDesignation: 'Director',
      plan: initialPlan,
    };
  };

  const [formData, setFormData] = useState(getInitialDraft);

  // Sync draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bharatfiling_pf_draft', JSON.stringify(formData));
    } catch {
      // Ignore storage errors
    }
  }, [formData]);

  // Step 1: Lead capture on landing page -> Proceed to Step 2 (Establishment Details)
  const handleStep1GetStarted = (leadData) => {
    setFormData((prev) => ({
      ...prev,
      ...leadData,
    }));
    setSearchParams({ step: '2', plan: leadData.plan || formData.plan || initialPlan });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showSuccess('Lead recorded! Please complete your establishment profile.');
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Step 2: Details submit -> Proceed to Step 3 (Plan Selection & Checkout)
  const handleStep2Submit = (step2Data) => {
    if (step2Data) {
      setFormData((prev) => ({ ...prev, ...step2Data }));
    }
    setSearchParams({ step: '3', plan: formData.plan || initialPlan });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 3: Plan selection -> Proceed to Step 4 (Payment)
  const handleStep3Proceed = (planId, checkoutDetails = {}) => {
    setFormData((prev) => ({
      ...prev,
      plan: planId,
      ...checkoutDetails,
    }));
    setSearchParams({ step: '4', plan: planId });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToStep1 = () => {
    setSearchParams({ step: '1' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToStep2 = () => {
    setSearchParams({ step: '2', plan: formData.plan || initialPlan });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToStep3 = () => {
    setSearchParams({ step: '3', plan: formData.plan || initialPlan });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Step 1: Landing Page */}
      {currentStep === 1 && (
        <PfLandingPage
          initialData={formData}
          onGetStarted={handleStep1GetStarted}
        />
      )}

      {/* Step 2: Establishment & Employee Details */}
      {currentStep === 2 && (
        <PfDetailsPage
          formData={formData}
          onInputChange={handleInputChange}
          onBack={handleBackToStep1}
          onSubmit={handleStep2Submit}
        />
      )}

      {/* Step 3: Plan Selection & Addons Checkout */}
      {currentStep === 3 && (
        <PfCheckoutPage
          formData={formData}
          onSelectPlan={handleStep3Proceed}
          onBack={handleBackToStep2}
        />
      )}

      {/* Step 4: Final Payment & Desk Assignment */}
      {currentStep === 4 && (
        <PfPaymentPage
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
