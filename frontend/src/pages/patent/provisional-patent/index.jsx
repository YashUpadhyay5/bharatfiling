import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';

import ProvisionalPatentLandingPage from './1-ProvisionalPatentLandingPage.jsx';
import ProvisionalPatentJurisdictionSelection from './2-ProvisionalPatentJurisdictionSelection.jsx';

export { ProvisionalPatentLandingPage, ProvisionalPatentJurisdictionSelection };

export default function ProvisionalPatentModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();

  const stepParam = searchParams.get('step');
  const initialStep = stepParam ? parseInt(stepParam, 10) : 1;
  const currentStep = [1, 2, 3, 4].includes(initialStep) ? initialStep : 1;

  const getInitialDraft = () => {
    try {
      const saved = localStorage.getItem('bharatfiling_provisional_patent_draft');
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
      jurisdictionType: 'international',
      targetCountry: 'International (PCT/WIPO)',
      inventionTitle: '',
      fieldOfInvention: 'Mechanical / Medical / AI',
      applicantType: 'individual_startup',
      packageId: 'standard',
      packageName: 'Startup / Individual Provisional Patent',
      professionalFee: 7999,
      onlineDiscount: 4000,
      totalAmount: 525,
      orderNumber: `#PPA-${Math.floor(100000 + Math.random() * 900000)}`,
    };
  };

  const [formData, setFormData] = useState(getInitialDraft);

  // Sync draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bharatfiling_provisional_patent_draft', JSON.stringify(formData));
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

  // Step 2: Proceed from Jurisdiction Selection to Step 3
  const handleJurisdictionProceed = (updatedData) => {
    setFormData((prev) => ({
      ...prev,
      ...updatedData,
    }));
    setSearchParams({ step: '3' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToStep1 = () => {
    setSearchParams({ step: '1' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Page 1: Provisional Patent Landing Page (1:1 with media_1793356788090_8e592c5c.png) */}
      {currentStep === 1 && (
        <ProvisionalPatentLandingPage
          initialData={formData}
          onSubmitLead={handleLeadSubmit}
          onSelectPlan={handleSelectPlan}
        />
      )}

      {/* Page 2: Jurisdiction Selection (1:1 with media_1793358166819_dfe8a923.png) */}
      {currentStep === 2 && (
        <ProvisionalPatentJurisdictionSelection
          formData={formData}
          onBack={handleBackToStep1}
          onProceed={handleJurisdictionProceed}
        />
      )}

      {/* Placeholder for subsequent step(s) until user uploads next screenshot */}
      {currentStep > 2 && (
        <div className="max-w-3xl mx-auto py-16 px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-[#002B49] text-xs font-semibold mb-4">
            Step {currentStep} In Progress
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Provisional Patent Application Filing Desk
          </h2>
          <p className="text-sm text-slate-600 mb-2">
            Configured for Lead: <span className="font-semibold">{formData.email}</span> ({formData.phone})
          </p>
          <p className="text-xs text-slate-500 mb-6">
            Protection Jurisdiction: <span className="font-semibold text-slate-800">{formData.targetCountry || formData.jurisdictionType}</span>
          </p>
          <button
            type="button"
            onClick={() => setSearchParams({ step: '2' })}
            className="px-5 py-2.5 bg-[#002B49] text-white text-xs font-semibold rounded-lg hover:bg-[#001D3D] cursor-pointer"
          >
            ← Return to Step 2
          </button>
        </div>
      )}
    </main>
  );
}
