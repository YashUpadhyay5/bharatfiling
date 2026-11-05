import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

import LogoDesignLandingPage from './1-LogoDesignLandingPage.jsx';
import LogoBrandBriefPage from './2-LogoBrandBriefPage.jsx';
import LogoPlansAddonsPage from './3-LogoPlansAddonsPage.jsx';
import LogoPaymentPage from './4-LogoPaymentPage.jsx';

export {
  LogoDesignLandingPage,
  LogoBrandBriefPage,
  LogoPlansAddonsPage,
  LogoPaymentPage,
};

export default function LogoDesignModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();

  const stepParam = searchParams.get('step');
  const initialStep = stepParam ? parseInt(stepParam, 10) : 1;
  const currentStep = [1, 2, 3, 4].includes(initialStep) ? initialStep : 1;

  const getInitialDraft = () => {
    try {
      const saved = localStorage.getItem('bharatfiling_logo_design_draft');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore parse error
    }
    return {
      email: user?.email || '',
      phone: user?.phone || '',
      cityPincode: '',
      whatsappUpdates: true,
      brandName: '',
      tagline: '',
      industry: 'Tech / SaaS',
      selectedStyle: 'combination',
      selectedPalette: 'corporate_blue',
      selectedClasses: ['Class 9', 'Class 35'],
      inspirationNotes: '',
      isColorProtected: false,
      selectedPlanId: 'starter',
      selectedPlanName: 'Starter Logo & TM Search',
      selectedPlanPrice: 2999,
      selectedAddonIds: [],
      addonsTotal: 0,
      totalAmount: 2525,
      orderNumber: `#LGD-${Math.floor(100000 + Math.random() * 900000)}`,
    };
  };

  const [formData, setFormData] = useState(getInitialDraft);

  // Sync draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        'bharatfiling_logo_design_draft',
        JSON.stringify(formData)
      );
    } catch {
      // Ignore storage error
    }
  }, [formData]);

  // Step 1: Submit lead or click "Get Started" -> Advance to Step 2 (Brand Brief)
  const handleLeadSubmit = async (leadData) => {
    const updated = {
      ...formData,
      ...leadData,
    };
    setFormData(updated);

    try {
      await fetch('/api/v1/logo-design-ip/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
      });
    } catch {
      // Continue gracefully
    }

    setSearchParams({ step: '2' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 1: Select Plan from pricing section -> Save plan & Advance to Step 2
  const handleSelectPlan = (planId) => {
    let name = 'Starter Logo & TM Search';
    let price = 2999;
    if (planId === 'growth') {
      name = 'Growth Kit & TM-A Filing';
      price = 5999;
    } else if (planId === 'enterprise') {
      name = 'Enterprise 360° Brand Protection';
      price = 9999;
    }

    setFormData((prev) => ({
      ...prev,
      selectedPlanId: planId,
      selectedPlanName: name,
      selectedPlanPrice: price,
      totalAmount: price,
    }));
    setSearchParams({ step: '2' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 2: Back to Step 1
  const handleBackToStep1 = () => {
    setSearchParams({ step: '1' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 2: Save Brand Brief -> Advance to Step 3 (Plans & Add-ons)
  const handleSaveBrief = async (briefData) => {
    const updated = {
      ...formData,
      ...briefData,
    };
    setFormData(updated);

    try {
      await fetch('/api/v1/logo-design-ip/brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: formData.orderNumber,
          applicantEmail: formData.email,
          ...briefData,
        }),
      });
    } catch {
      // Continue gracefully
    }

    setSearchParams({ step: '3' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 3: Back to Step 2
  const handleBackToStep2 = () => {
    setSearchParams({ step: '2' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 3: Selected package & addons -> Advance to Step 4 (Checkout & Payment)
  const handleProceedToCheckout = (planAddonsData) => {
    const updated = {
      ...formData,
      ...planAddonsData,
    };
    setFormData(updated);
    setSearchParams({ step: '4' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 4: Back to Step 3
  const handleBackToStep3 = () => {
    setSearchParams({ step: '3' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 4: Payment completed callback
  const handlePaymentSuccess = (receiptData) => {
    setFormData((prev) => ({
      ...prev,
      paymentCompleted: true,
      transactionId: receiptData.transactionId,
      paidAt: receiptData.date,
    }));
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Page 1: Logo Design & IP Protection Landing Page */}
      {currentStep === 1 && (
        <LogoDesignLandingPage
          initialData={formData}
          onSubmitLead={handleLeadSubmit}
          onSelectPlan={handleSelectPlan}
        />
      )}

      {/* Page 2: Brand Brief & Creative Specifications */}
      {currentStep === 2 && (
        <LogoBrandBriefPage
          initialData={formData}
          onBack={handleBackToStep1}
          onSaveBrief={handleSaveBrief}
        />
      )}

      {/* Page 3: Package & Add-on Selection */}
      {currentStep === 3 && (
        <LogoPlansAddonsPage
          initialData={formData}
          onBack={handleBackToStep2}
          onProceedToCheckout={handleProceedToCheckout}
        />
      )}

      {/* Page 4: Checkout & Payment Desk */}
      {currentStep === 4 && (
        <LogoPaymentPage
          formData={formData}
          orderId={formData.orderNumber}
          onBack={handleBackToStep3}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </main>
  );
}
