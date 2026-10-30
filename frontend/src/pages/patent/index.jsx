import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

import PatentLandingPage from './1-PatentLandingPage.jsx';
import PatentJurisdictionSelection from './2-PatentJurisdictionSelection.jsx';
import PatentPlansPage from './3-PatentPlansPage.jsx';

export {
  PatentLandingPage,
  PatentJurisdictionSelection,
  PatentPlansPage,
};

export default function PatentRegistrationModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();

  const stepParam = searchParams.get('step');
  const initialStep = stepParam ? parseInt(stepParam, 10) : 1;
  const currentStep = [1, 2, 3, 4].includes(initialStep) ? initialStep : 1;

  const getInitialDraft = () => {
    try {
      const saved = localStorage.getItem('bharatfiling_patent_draft');
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
      jurisdictionType: 'specific',
      targetCountry: 'India',
      category: 'standard',
      categoryTitle: 'Standard Patent Search & Drafting',
      inventionTitle: 'Novel Method & System for Automated Compliance',
      packageId: 'standard',
      packageName: 'Standard',
      professionalFee: 9999,
      originalPrice: 24999,
      discountBadge: '60% off',
      totalAmount: 11799,
      orderNumber: `#PAT-${Math.floor(100000 + Math.random() * 900000)}`,
    };
  };

  const [formData, setFormData] = useState(getInitialDraft);

  // Sync draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bharatfiling_patent_draft', JSON.stringify(formData));
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

  // Step 2: Proceed from Jurisdiction to Step 3
  const handleProceedToStep3 = (jurisdictionData) => {
    setFormData((prev) => ({
      ...prev,
      ...jurisdictionData,
    }));
    setSearchParams({ step: '3' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 3: Back to Step 2
  const handleBackToStep2 = () => {
    setSearchParams({ step: '2' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 3: Proceed to Step 4 (Payment Desk)
  const handleSelectPlanAndProceed = (planData) => {
    setFormData((prev) => ({
      ...prev,
      ...planData,
    }));
    setSearchParams({ step: '4' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Page 1: Patent Registration Landing Page (1:1 with media_1793335856897_1cea0a8e.png) */}
      {currentStep === 1 && (
        <PatentLandingPage
          initialData={formData}
          onSubmitLead={handleLeadSubmit}
          onSelectPlan={handleSelectPlan}
        />
      )}

      {/* Page 2: Jurisdiction Selection (1:1 with media_1793337695538_5f490a93.png) */}
      {currentStep === 2 && (
        <PatentJurisdictionSelection
          formData={formData}
          onBack={handleBackToStep1}
          onProceed={handleProceedToStep3}
        />
      )}

      {/* Page 3: Right plan for Patent Filing (1:1 with media_1793337748002_17de5977.png) */}
      {currentStep === 3 && (
        <PatentPlansPage
          formData={formData}
          onBack={handleBackToStep2}
          onSelectPlan={handleSelectPlanAndProceed}
        />
      )}

      {/* Placeholder for Step 4 until user provides final payment desk screenshot */}
      {currentStep > 3 && (
        <div className="max-w-3xl mx-auto py-16 px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-[#002B49] text-xs font-semibold mb-4">
            Step 4: Payment Desk Desk
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Selected Plan: {formData.packageName || 'Standard'} (₹{(formData.professionalFee || 9999).toLocaleString('en-IN')})
          </h2>
          <p className="text-sm text-slate-600 mb-6">
            Jurisdiction: <span className="font-semibold">{formData.targetCountry || 'India'}</span> | Lead: <span className="font-semibold">{formData.email}</span>
          </p>
          <button
            type="button"
            onClick={() => setSearchParams({ step: '3' })}
            className="px-5 py-2.5 bg-[#002B49] text-white text-xs font-semibold rounded-lg hover:bg-[#001D3D]"
          >
            ← Return to Step 3 (Plans)
          </button>
        </div>
      )}
    </main>
  );
}
