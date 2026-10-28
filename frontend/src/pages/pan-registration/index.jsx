import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';

import PanLandingPage from './1-PanLandingPage.jsx';
import PanCheckoutPage from './2-PanCheckoutPage.jsx';
import PanPaymentPage from './3-PanPaymentPage.jsx';

export { PanLandingPage, PanCheckoutPage, PanPaymentPage };

export default function PanRegistrationModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const { showSuccess } = useToast();

  const stepParam = searchParams.get('step');
  const potentialIdParam = searchParams.get('potential_id');
  const initialStep = stepParam ? parseInt(stepParam, 10) : (potentialIdParam ? 3 : 1);
  const currentStep = [1, 2, 3].includes(initialStep) ? initialStep : 1;
  const initialPlan = searchParams.get('plan') || 'standard';

  const getInitialDraft = () => {
    try {
      const saved = localStorage.getItem('bharatfiling_pan_draft');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (potentialIdParam) {
          parsed.orderNumber = parsed.orderNumber || '#est179126201735020268491p';
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
      name: potentialIdParam ? 'Yash Upadhyay' : (user?.name || user?.full_name || 'Yash Upadhyay'),
      email: potentialIdParam ? 'ya*****************@com' : (user?.email || 'ya*****************@com'),
      phone: potentialIdParam ? '+91-*******193' : (user?.phone || '+91 7668976193'),
      orderNumber: potentialIdParam ? '#est179126201735020268491p' : '',
      entityType: 'individual',
      appType: 'new',
      state: 'Karnataka',
      whatsappOptIn: true,
      plan: initialPlan,
    };
  };

  const [formData, setFormData] = useState(getInitialDraft);

  // Sync draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bharatfiling_pan_draft', JSON.stringify(formData));
    } catch {
      // Ignore storage errors
    }
  }, [formData]);

  // Step 1: Lead capture on landing page -> Proceed to Step 2 (Plan Selection)
  const handleStep1GetStarted = (leadData) => {
    setFormData((prev) => ({
      ...prev,
      ...leadData,
    }));
    setSearchParams({ step: '2', plan: leadData.plan || formData.plan || initialPlan });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showSuccess('Lead recorded! Select your PAN delivery package.');
  };

  // Step 2: Plan Selection -> Proceed to Step 3 (Payment Desk)
  const handleStep2SelectPlan = (planId, checkoutDetails = {}) => {
    setFormData((prev) => ({
      ...prev,
      plan: planId,
      ...checkoutDetails,
    }));
    setSearchParams({ step: '3', plan: planId });
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

  return (
    <main className="min-h-screen bg-white">
      {/* Step 1: PAN Landing Page (without pricing, with Hero, Decoder, Matrix, FAQs) */}
      {currentStep === 1 && (
        <PanLandingPage
          initialData={formData}
          onGetStarted={handleStep1GetStarted}
        />
      )}

      {/* Step 2: 3-Column Pricing & Package Selection (matches screenshot media_1793171735368_c0cf7cef.png) */}
      {currentStep === 2 && (
        <PanCheckoutPage
          formData={formData}
          onSelectPlan={handleStep2SelectPlan}
          onBack={handleBackToStep1}
        />
      )}

      {/* Step 3: Vakilsearch 2-Column Payment Desk (matches payment structure) */}
      {currentStep === 3 && (
        <PanPaymentPage
          formData={formData}
          onBack={handleBackToStep2}
          onPaymentSuccess={() => {
            // Optional callback
          }}
        />
      )}
    </main>
  );
}
