import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

import MonthlyPayrollLandingPage from './1-MonthlyPayrollLandingPage.jsx';

export {
  MonthlyPayrollLandingPage,
};

export default function MonthlyPayrollModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();

  const stepParam = searchParams.get('step');
  const initialStep = stepParam ? parseInt(stepParam, 10) : 1;
  const currentStep = initialStep || 1;

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
      totalAmount: 1999,
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

  // Step 1: Submit lead or click "Get Started"
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

    // Set step 2 in searchParams for when page 2 is introduced
    setSearchParams({ step: '2' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 1: Select Plan from pricing section
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

      {/* Placeholder for Page 2 (waiting for user's screenshot) */}
      {currentStep > 1 && (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-blue-50 text-[#002B49] flex items-center justify-center text-2xl font-black">
            2
          </div>
          <h2 className="text-2xl font-black text-[#002B49]">
            Payroll Details & Onboarding Step
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md">
            Step 1 lead submitted for <strong>{formData.email || 'your business'}</strong> ({formData.cityPincode || 'Pincode provided'}). Ready for Step 2.
          </p>
          <button
            type="button"
            onClick={() => setSearchParams({ step: '1' })}
            className="px-6 py-2.5 rounded-lg bg-[#002B49] text-white text-xs font-bold transition hover:bg-[#001f35] cursor-pointer"
          >
            ← Back to Landing Page
          </button>
        </div>
      )}
    </main>
  );
}
