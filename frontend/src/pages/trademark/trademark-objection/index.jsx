import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';

import TrademarkObjectionLandingPage from './1-TrademarkObjectionLandingPage.jsx';
import TrademarkObjectionCheckoutPage from './2-TrademarkObjectionCheckoutPage.jsx';
import TrademarkObjectionPlansPage from './3-TrademarkObjectionPlansPage.jsx';
import TrademarkObjectionPaymentPage from './3-TrademarkObjectionPaymentPage.jsx';

export {
  TrademarkObjectionLandingPage,
  TrademarkObjectionCheckoutPage,
  TrademarkObjectionPlansPage,
  TrademarkObjectionPaymentPage,
};

export default function TrademarkObjectionModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();

  const stepParam = searchParams.get('step');
  const initialStep = stepParam ? parseInt(stepParam, 10) : 1;
  const currentStep = [1, 2, 3, 4].includes(initialStep) ? initialStep : 1;

  const getInitialDraft = () => {
    try {
      const saved = localStorage.getItem('bharatfiling_trademark_objection_draft');
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
      applicationNumber: 'i7q3r7325',
      brandName: 'i7q3r7325',
      objectionType: 'section_11',
      hasDocuments: 'no',
      packageId: 'premium',
      packageName: 'Premium Plan',
      professionalFee: 13999,
      onlineDiscount: 500,
      totalAmount: 15929,
      orderNumber: `#TM-OBJ-${Math.floor(100000 + Math.random() * 900000)}`,
    };
  };

  const [formData, setFormData] = useState(getInitialDraft);

  // Sync draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        'bharatfiling_trademark_objection_draft',
        JSON.stringify(formData)
      );
    } catch {
      // Ignore storage errors
    }
  }, [formData]);

  // Page 1: Lead captured -> Navigate to Page 2 (Onboarding questions)
  const handleLeadSubmit = (leadData) => {
    setFormData((prev) => ({
      ...prev,
      ...leadData,
    }));
    setSearchParams({ step: '2' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Page 1: Plan picked from landing footer -> Navigate to Page 2
  const handleSelectPlan = (packageId) => {
    setFormData((prev) => ({
      ...prev,
      packageId,
    }));
    setSearchParams({ step: '2' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Page 2: Back to Page 1
  const handleBackToStep1 = () => {
    setSearchParams({ step: '1' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Page 2: Onboarding Questions Complete -> Navigate to Page 3 (Plans Page)
  const handleOnboardingComplete = (onboardingData) => {
    setFormData((prev) => ({
      ...prev,
      ...onboardingData,
    }));
    setSearchParams({ step: '3' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Page 3: Back to Page 2
  const handleBackToStep2 = () => {
    setSearchParams({ step: '2' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Page 3: Plan Selected -> Navigate to Page 4 (Payment Desk)
  const handlePlanSelected = (planData) => {
    setFormData((prev) => ({
      ...prev,
      ...planData,
    }));
    setSearchParams({ step: '4' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Page 4: Back to Page 3
  const handleBackToStep3 = () => {
    setSearchParams({ step: '3' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Page 4: Payment Success
  const handlePaymentSuccess = (paymentResult) => {
    setFormData((prev) => ({
      ...prev,
      ...paymentResult,
      status: 'SUBMITTED',
    }));
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Page 1: Trademark Objection Landing Page (matches media_1793253405946_1d5cb863.png) */}
      {currentStep === 1 && (
        <TrademarkObjectionLandingPage
          initialData={formData}
          onSubmitLead={handleLeadSubmit}
          onSelectPlan={handleSelectPlan}
        />
      )}

      {/* Page 2: Onboarding 3-Step Flow (matches media_1793257125351_a8d786bc.png & media_1793257284316_a774657a.png) */}
      {currentStep === 2 && (
        <TrademarkObjectionCheckoutPage
          formData={formData}
          onBack={handleBackToStep1}
          onProceedToPayment={handleOnboardingComplete}
        />
      )}

      {/* Page 3: Plan Selection (matches media_1793257941620_593b2a96.png "Right plan for for Brand Protection") */}
      {currentStep === 3 && (
        <TrademarkObjectionPlansPage
          formData={formData}
          onBack={handleBackToStep2}
          onSelectPlanAndProceed={handlePlanSelected}
        />
      )}

      {/* Page 4: Final Payment Desk (UPI PhonePe default, ₹500 Discount, Countdown Timer, Card, NetBanking) */}
      {currentStep === 4 && (
        <TrademarkObjectionPaymentPage
          formData={formData}
          onBack={handleBackToStep3}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </main>
  );
}
