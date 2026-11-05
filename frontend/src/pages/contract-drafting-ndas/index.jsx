import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

import ContractDraftingLandingPage from './1-ContractDraftingLandingPage.jsx';
import ContractDraftingPaymentPage from './2-ContractDraftingPaymentPage.jsx';

export {
  ContractDraftingLandingPage,
  ContractDraftingPaymentPage,
};

export default function ContractDraftingModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();

  const stepParam = searchParams.get('step');
  const initialStep = stepParam ? parseInt(stepParam, 10) : 1;
  const currentStep = initialStep === 2 ? 2 : 1;

  const getInitialDraft = () => {
    try {
      const saved = localStorage.getItem('bharatfiling_contract_drafting_draft');
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
      selectedPlanId: 'starter',
      selectedPlanPrice: 1499,
      totalAmount: 525,
      orderNumber: `#CON-${Math.floor(100000 + Math.random() * 900000)}`,
    };
  };

  const [formData, setFormData] = useState(getInitialDraft);

  // Sync draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        'bharatfiling_contract_drafting_draft',
        JSON.stringify(formData)
      );
    } catch {
      // Ignore storage error
    }
  }, [formData]);

  // Step 1: Submit lead or click "Get Started" -> Advance to Step 2 (Checkout)
  const handleLeadSubmit = async (leadData) => {
    const updated = {
      ...formData,
      ...leadData,
    };
    setFormData(updated);

    try {
      // Record lead in backend API
      await fetch('/api/v1/contract-drafting-ndas/lead', {
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

  // Step 1: Select Plan from pricing section -> Advance to Step 2
  const handleSelectPlan = (planId) => {
    let price = 1499;
    if (planId === 'growth') price = 2999;
    if (planId === 'enterprise') price = 5999;

    setFormData((prev) => ({
      ...prev,
      selectedPlanId: planId,
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

  // Step 2: Payment completed callback
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
      {/* Page 1: Custom Contract Drafting & NDAs Landing Page */}
      {currentStep === 1 && (
        <ContractDraftingLandingPage
          initialData={formData}
          onSubmitLead={handleLeadSubmit}
          onSelectPlan={handleSelectPlan}
        />
      )}

      {/* Page 2: Checkout / Payment Method Selection */}
      {currentStep === 2 && (
        <ContractDraftingPaymentPage
          formData={formData}
          orderId={formData.orderNumber}
          onBack={handleBackToStep1}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </main>
  );
}
