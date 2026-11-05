import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

import MonthlyPayrollLandingPage from './1-MonthlyPayrollLandingPage.jsx';
import MonthlyPayrollPaymentPage from './2-MonthlyPayrollPaymentPage.jsx';

export {
  MonthlyPayrollLandingPage,
  MonthlyPayrollPaymentPage,
};

export default function MonthlyPayrollModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();

  const stepParam = searchParams.get('step');
  const initialStep = stepParam ? parseInt(stepParam, 10) : 1;
  const currentStep = initialStep === 2 ? 2 : 1;

  const getInitialDraft = () => {
    try {
      const saved = localStorage.getItem('bharatfiling_monthly_payroll_draft');
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
      selectedPlanPrice: 1999,
      totalAmount: 525,
      orderNumber: `#PAY-${Math.floor(100000 + Math.random() * 900000)}`,
    };
  };

  const [formData, setFormData] = useState(getInitialDraft);

  // Sync draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        'bharatfiling_monthly_payroll_draft',
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
      await fetch('/api/v1/monthly-payroll/lead', {
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
    let price = 1999;
    if (planId === 'growth') price = 3999;
    if (planId === 'enterprise') price = 7999;

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
      {/* Page 1: Online Payroll Management Landing Page */}
      {currentStep === 1 && (
        <MonthlyPayrollLandingPage
          initialData={formData}
          onSubmitLead={handleLeadSubmit}
          onSelectPlan={handleSelectPlan}
        />
      )}

      {/* Page 2: Checkout / Payment Method Selection (from screenshot media_1793854344708_66ad8e6e.png) */}
      {currentStep === 2 && (
        <MonthlyPayrollPaymentPage
          formData={formData}
          orderId={formData.orderNumber}
          onBack={handleBackToStep1}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </main>
  );
}
