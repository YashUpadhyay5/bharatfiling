import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';

// Modular Step Pages
import ShopLandingPage from './1-ShopLandingPage.jsx';

// Placeholder / Sub-step components for upcoming pages
const PlaceholderPage = ({ stepNumber, title, description, onBack }) => (
  <div className="min-h-[60vh] bg-slate-50 flex items-center justify-center p-6">
    <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-slate-200 text-center shadow-lg">
      <div className="w-12 h-12 rounded-full bg-blue-100 text-[#002B49] flex items-center justify-center mx-auto mb-4 font-bold text-lg">
        {stepNumber}
      </div>
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <p className="text-sm text-slate-600 mt-2">{description}</p>
      <div className="mt-6">
        <button
          onClick={onBack}
          className="bg-[#002B49] text-white text-xs font-semibold px-4 py-2.5 rounded-lg cursor-pointer hover:bg-slate-800 transition"
        >
          &larr; Back to Step 1
        </button>
      </div>
    </div>
  </div>
);

export { ShopLandingPage };

export default function ShopEstablishmentModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const { showSuccess } = useToast();

  const stepParam = parseInt(searchParams.get('step') || '1', 10);
  const currentStep = [1, 2, 3, 4].includes(stepParam) ? stepParam : 1;
  const initialPlan = searchParams.get('plan') || 'express';

  const getInitialDraft = () => {
    try {
      const saved = localStorage.getItem('bharatfiling_shop_draft');
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return {
      email: user?.email || '',
      phone: user?.phone || '',
      cityPincode: '',
      whatsappOptIn: true,
      entityType: 'proprietorship',
      operatingState: 'Maharashtra',
      establishmentNature: 'commercial',
      employeeCount: '0',
      plan: initialPlan,
    };
  };

  const [formData, setFormData] = useState(getInitialDraft);

  // Sync draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bharatfiling_shop_draft', JSON.stringify(formData));
    } catch {
      // Ignore
    }
  }, [formData]);

  // Step 1: Lead capture on landing page -> Proceed to Step 2
  const handleStep1GetStarted = (leadData) => {
    setFormData((prev) => ({
      ...prev,
      ...leadData,
    }));
    setSearchParams({ step: '2', plan: formData.plan || initialPlan });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showSuccess('Lead captured! Ready for business details.');
  };

  const handleBackToStep1 = () => {
    setSearchParams({ step: '1' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Step 1: Landing Page (Exact 1:1 match of Screenshot 1) */}
      {currentStep === 1 && (
        <ShopLandingPage
          initialData={formData}
          onGetStarted={handleStep1GetStarted}
        />
      )}

      {/* Step 2: Business & Establishment Details (Awaiting Screenshot 2) */}
      {currentStep === 2 && (
        <PlaceholderPage
          stepNumber={2}
          title="Step 2: Business & Establishment Details"
          description="Lead captured successfully! Awaiting your screenshot 2 to build this page 1:1 with your required layout."
          onBack={handleBackToStep1}
        />
      )}

      {/* Step 3: Plan Checkout (Awaiting Screenshot 3) */}
      {currentStep === 3 && (
        <PlaceholderPage
          stepNumber={3}
          title="Step 3: Choose the Right Plan"
          description="Awaiting screenshot 3 for the plan checkout screen."
          onBack={handleBackToStep1}
        />
      )}

      {/* Step 4: Payment & Invoice (Awaiting Screenshot 4) */}
      {currentStep === 4 && (
        <PlaceholderPage
          stepNumber={4}
          title="Step 4: Statutory Payment & CA Allocation"
          description="Awaiting screenshot 4 for the payment screen."
          onBack={handleBackToStep1}
        />
      )}
    </main>
  );
}
