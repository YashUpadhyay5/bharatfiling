import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';

import ProducerCompanyLandingPage from './1-ProducerCompanyLandingPage.jsx';
import ProducerCompanyOnboardingPage from './2-ProducerCompanyOnboardingPage.jsx';
import ProducerCompanyPreBundlePage from './3-ProducerCompanyPreBundlePage.jsx';
import ProducerCompanyPaymentPage from './4-ProducerCompanyPaymentPage.jsx';

export {
  ProducerCompanyLandingPage,
  ProducerCompanyOnboardingPage,
  ProducerCompanyPreBundlePage,
  ProducerCompanyPaymentPage,
};

export default function ProducerCompanyModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();

  const stepParam = searchParams.get('step');
  const initialStep = stepParam ? parseInt(stepParam, 10) : 1;
  const currentStep = [1, 2, 3, 4].includes(initialStep) ? initialStep : 1;

  const getInitialDraft = () => {
    try {
      const saved = localStorage.getItem('bharatfiling_producer_company_draft');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore parse errors
    }
    return {
      email: user?.email || 'kisan.agro@gmail.com',
      phone: user?.phone || '+91 9822019482',
      cityPincode: 'Nagpur, 440001',
      language: 'English',
      whatsappUpdates: true,
      proposedCompanyName: 'krishisamriddhi',
      businessAge: 'Less than 1 year',
      producerActivity: 'farming',
      numberOfDirectors: 5,
      numberOfMembers: 10,
      packageId: 'standard_producer_co',
      packageName: 'Standard Incorporation',
      professionalFee: 19999,
      onlineDiscount: 1000,
      totalAmount: 23658,
      orderNumber: `#FPO-${Math.floor(100000 + Math.random() * 900000)}`,
    };
  };

  const [formData, setFormData] = useState(getInitialDraft);

  // Sync draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bharatfiling_producer_company_draft', JSON.stringify(formData));
    } catch {
      // Ignore storage errors
    }
  }, [formData]);

  // Step 1: Lead capture submit -> Advances to Step 2 (Onboarding Questionnaire)
  const handleLeadSubmit = (leadData) => {
    setFormData((prev) => ({
      ...prev,
      ...leadData,
    }));
    setSearchParams({ step: '2' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 1: Package chosen from pricing section -> Advances to Step 2
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

  // Step 2: Onboarding proceed -> Advances to Step 3 (Pre-bundle Plan Confirmation)
  const handleOnboardingProceed = (onboardingData) => {
    setFormData((prev) => ({
      ...prev,
      ...onboardingData,
    }));
    setSearchParams({ step: '3' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 3: Back to Step 2
  const handleBackToStep2 = () => {
    setSearchParams({ step: '2' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 3: Pre-bundle proceed -> Advances to Step 4 (Payment Desk)
  const handlePreBundleProceed = (plan) => {
    setFormData((prev) => ({
      ...prev,
      packageId: plan.id,
      packageName: plan.name,
      professionalFee: plan.price,
      onlineDiscount: plan.discountAmount,
      totalAmount: Math.round(plan.price * 1.18) + 59,
    }));
    setSearchParams({ step: '4' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 4: Back to Step 3
  const handleBackToStep3 = () => {
    setSearchParams({ step: '3' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 4: Payment verified
  const handlePaymentSuccess = (receiptData) => {
    setFormData((prev) => ({
      ...prev,
      ...receiptData,
      status: 'paid',
    }));
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Page 1: Producer Company Landing Page */}
      {currentStep === 1 && (
        <ProducerCompanyLandingPage
          initialData={formData}
          onSubmitLead={handleLeadSubmit}
          onSelectPlan={handleSelectPlan}
        />
      )}

      {/* Page 2: Producer Company Onboarding Questionnaire */}
      {currentStep === 2 && (
        <ProducerCompanyOnboardingPage
          formData={formData}
          onBack={handleBackToStep1}
          onProceed={handleOnboardingProceed}
        />
      )}

      {/* Page 3: Pre-bundle Plan Confirmation */}
      {currentStep === 3 && (
        <ProducerCompanyPreBundlePage
          formData={formData}
          onBack={handleBackToStep2}
          onProceed={handlePreBundleProceed}
        />
      )}

      {/* Page 4: Checkout & Payment Desk */}
      {currentStep === 4 && (
        <ProducerCompanyPaymentPage
          formData={formData}
          orderId={formData.orderNumber}
          onBack={handleBackToStep3}
          onChangePlan={() => setSearchParams({ step: '3' })}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </main>
  );
}
