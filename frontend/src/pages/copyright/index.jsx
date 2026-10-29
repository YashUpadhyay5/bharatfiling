import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

import CopyrightLandingPage from './1-CopyrightLandingPage.jsx';
import CopyrightTypeSelection from './2-CopyrightTypeSelection.jsx';
import CopyrightPlansPage from './3-CopyrightPlansPage.jsx';
import CopyrightPaymentPage from './4-CopyrightPaymentPage.jsx';

export {
  CopyrightLandingPage,
  CopyrightTypeSelection,
  CopyrightPlansPage,
  CopyrightPaymentPage,
};

export default function CopyrightRegistrationModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();

  const stepParam = searchParams.get('step');
  const initialStep = stepParam ? parseInt(stepParam, 10) : 1;
  const currentStep = [1, 2, 3, 4].includes(initialStep) ? initialStep : 1;

  const getInitialDraft = () => {
    try {
      const saved = localStorage.getItem('bharatfiling_copyright_draft');
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
      category: 'software',
      categoryTitle: 'Software/Website/Apps',
      workTitle: 'Proprietary Software Source Code & Database',
      packageId: 'registration',
      packageName: 'Copyright Registration',
      professionalFee: 2999,
      onlineDiscount: 1049,
      totalAmount: 3539,
      orderNumber: `#CR-${Math.floor(100000 + Math.random() * 900000)}`,
    };
  };

  const [formData, setFormData] = useState(getInitialDraft);

  // Sync draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bharatfiling_copyright_draft', JSON.stringify(formData));
    } catch {
      // Ignore storage errors
    }
  }, [formData]);

  // Step 1: Lead capture -> Proceed to Step 2
  const handleLeadSubmit = (leadData) => {
    setFormData((prev) => ({
      ...prev,
      ...leadData,
    }));
    setSearchParams({ step: '2' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 1: Package chosen from pricing section
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

  // Step 2: Proceed from Type Selection to Step 3 (Plans)
  const handleProceedToPlans = (typeData) => {
    setFormData((prev) => ({
      ...prev,
      ...typeData,
    }));
    setSearchParams({ step: '3' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 3: Back to Step 2
  const handleBackToStep2 = () => {
    setSearchParams({ step: '2' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 3: Plan chosen -> Proceed to Step 4 (Payment)
  const handleSelectPlanAndProceed = (planData) => {
    setFormData((prev) => ({
      ...prev,
      ...planData,
    }));
    setSearchParams({ step: '4' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 4: Back to Step 3
  const handleBackToStep3 = () => {
    setSearchParams({ step: '3' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 4: Payment Success
  const handlePaymentSuccess = (paymentResult) => {
    setFormData((prev) => ({
      ...prev,
      ...paymentResult,
      status: 'SUBMITTED',
    }));
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Page 1: Copyright Registration Landing Page (1:1 with media_1793296043057_1cd6525c.png) */}
      {currentStep === 1 && (
        <CopyrightLandingPage
          initialData={formData}
          onSubmitLead={handleLeadSubmit}
          onSelectPlan={handleSelectPlan}
        />
      )}

      {/* Page 2: Copyright Type of Work Selection (1:1 with media_1793296763791_c0b8c808.png) */}
      {currentStep === 2 && (
        <CopyrightTypeSelection
          formData={formData}
          onBack={handleBackToStep1}
          onProceed={handleProceedToPlans}
        />
      )}

      {/* Page 3: Right plan to protect your work (1:1 with media_1793299512438_010db9f1.png) */}
      {currentStep === 3 && (
        <CopyrightPlansPage
          formData={formData}
          onBack={handleBackToStep2}
          onSelectPlan={handleSelectPlanAndProceed}
        />
      )}

      {/* Page 4: Final Payment Desk (UPI PhonePe default, NetBanking, Cards, EMI, 18% GST) */}
      {currentStep === 4 && (
        <CopyrightPaymentPage
          formData={formData}
          onBack={handleBackToStep3}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </main>
  );
}
