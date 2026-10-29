import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';

import TrademarkRenewalLandingPage from './1-TrademarkRenewalLandingPage.jsx';
import TrademarkRenewalPlansPage from './2-TrademarkRenewalPlansPage.jsx';
import TrademarkRenewalOnboardingPage from './2-TrademarkRenewalOnboardingPage.jsx';
import TrademarkRenewalPaymentPage from './3-TrademarkRenewalPaymentPage.jsx';

export {
  TrademarkRenewalLandingPage,
  TrademarkRenewalPlansPage,
  TrademarkRenewalOnboardingPage,
  TrademarkRenewalPaymentPage,
};

export default function TrademarkRenewalModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();

  const stepParam = searchParams.get('step');
  const initialStep = stepParam ? parseInt(stepParam, 10) : 1;
  const currentStep = [1, 2, 3].includes(initialStep) ? initialStep : 1;

  const getInitialDraft = () => {
    try {
      const saved = localStorage.getItem('bharatfiling_trademark_renewal_draft');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore parse errors
    }
    return {
      email: user?.email || 'yashupadhyay@example.com',
      phone: user?.phone || '+91 7668976193',
      cityPincode: 'Bengaluru, 560001',
      whatsappUpdates: true,
      trademarkNumber: '',
      renewalTiming: 'timely',
      packageId: 'full_service',
      packageName: 'Full Service & Fulfilment',
      professionalFee: 24999,
      onlineDiscount: 500,
      totalAmount: 28909,
      orderNumber: `#TM-REN-${Math.floor(100000 + Math.random() * 900000)}`,
    };
  };

  const [formData, setFormData] = useState(getInitialDraft);

  // Sync draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        'bharatfiling_trademark_renewal_draft',
        JSON.stringify(formData)
      );
    } catch {
      // Ignore storage errors
    }
  }, [formData]);

  // Step 1: Lead capture -> Step 2
  const handleLeadSubmit = (leadData) => {
    setFormData((prev) => ({
      ...prev,
      ...leadData,
    }));
    setSearchParams({ step: '2' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 1: Package chosen from pricing table
  const handleSelectPlan = (packageId) => {
    setFormData((prev) => ({
      ...prev,
      packageId,
    }));
    setSearchParams({ step: '2' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 2: Back to Step 1
  const handleBackToStep1 = () => {
    setSearchParams({ step: '1' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 2: Plan chosen on Choose the Right Plan -> Proceed to Payment Step 3
  const handleSelectPlanAndProceed = (planData) => {
    setFormData((prev) => ({
      ...prev,
      ...planData,
    }));
    setSearchParams({ step: '3' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 3: Back to Step 2
  const handleBackToStep2 = () => {
    setSearchParams({ step: '2' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 3: Payment Success
  const handlePaymentSuccess = (paymentResult) => {
    setFormData((prev) => ({
      ...prev,
      ...paymentResult,
      status: 'SUBMITTED',
    }));
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Page 1: Trademark Renewal Landing Page (1:1 with media_1793258499278_41608ae2.png) */}
      {currentStep === 1 && (
        <TrademarkRenewalLandingPage
          initialData={formData}
          onSubmitLead={handleLeadSubmit}
          onSelectPlan={handleSelectPlan}
        />
      )}

      {/* Page 2: Trademark Renewal Plans Page (1:1 with media_1793259313274_4d18cdf8.png "Choose the Right Plan") */}
      {currentStep === 2 && (
        <TrademarkRenewalPlansPage
          formData={formData}
          onBack={handleBackToStep1}
          onSelectPlan={handleSelectPlanAndProceed}
        />
      )}

      {/* Page 3: Final Payment Desk (UPI PhonePe default, ₹500 Discount, Countdown Timer, Card, NetBanking) */}
      {currentStep === 3 && (
        <TrademarkRenewalPaymentPage
          formData={formData}
          onBack={handleBackToStep2}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </main>
  );
}
