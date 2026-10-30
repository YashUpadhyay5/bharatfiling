import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';

import TrademarkAssignmentLandingPage from './1-TrademarkAssignmentLandingPage.jsx';
import TrademarkAssignmentPaymentPage from './2-TrademarkAssignmentPaymentPage.jsx';

export { TrademarkAssignmentLandingPage, TrademarkAssignmentPaymentPage };

export default function TrademarkAssignmentModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();

  const stepParam = searchParams.get('step');
  const initialStep = stepParam ? parseInt(stepParam, 10) : 1;
  const currentStep = [1, 2].includes(initialStep) ? initialStep : 1;

  const getInitialDraft = () => {
    try {
      const saved = localStorage.getItem('bharatfiling_trademark_assignment_draft');
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
      brandName: '',
      assignorName: '',
      assigneeName: '',
      assignmentType: 'with_goodwill',
      packageId: 'standard',
      packageName: 'Trademark Assignment Filing',
      professionalFee: 4999,
      onlineDiscount: 3000,
      totalAmount: 525,
      orderNumber: `#TMA-${Math.floor(100000 + Math.random() * 900000)}`,
    };
  };

  const [formData, setFormData] = useState(getInitialDraft);

  // Sync draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bharatfiling_trademark_assignment_draft', JSON.stringify(formData));
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

  // Step 1: Package chosen from pricing section -> Proceed to Step 2
  const handleSelectPlan = (packageId) => {
    setFormData((prev) => ({
      ...prev,
      packageId,
    }));
    setSearchParams({ step: '2' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToStep1 = () => {
    setSearchParams({ step: '1' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Page 1: Trademark Assignment Landing Page (1:1 with media_1793354434858_ff6852f9.png) */}
      {currentStep === 1 && (
        <TrademarkAssignmentLandingPage
          initialData={formData}
          onSubmitLead={handleLeadSubmit}
          onSelectPlan={handleSelectPlan}
        />
      )}

      {/* Page 2: Trademark Assignment Payment Page (1:1 with media_1793355462422_0d96057f.png) */}
      {currentStep === 2 && (
        <TrademarkAssignmentPaymentPage
          formData={formData}
          orderId={formData.orderNumber}
          onBack={handleBackToStep1}
        />
      )}
    </main>
  );
}
