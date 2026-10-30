import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';

import TrademarkAssignmentLandingPage from './1-TrademarkAssignmentLandingPage.jsx';

export { TrademarkAssignmentLandingPage };

export default function TrademarkAssignmentModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();

  const stepParam = searchParams.get('step');
  const initialStep = stepParam ? parseInt(stepParam, 10) : 1;
  const currentStep = [1, 2, 3, 4].includes(initialStep) ? initialStep : 1;

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
      totalAmount: 5899,
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

  // Step 1: Package chosen from pricing section
  const handleSelectPlan = (packageId) => {
    setFormData((prev) => ({
      ...prev,
      packageId,
    }));
    setSearchParams({ step: '2' });
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

      {/* Placeholder for Step 2 until user uploads Step 2 */}
      {currentStep > 1 && (
        <div className="max-w-3xl mx-auto py-16 px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-[#002B49] text-xs font-semibold mb-4">
            Step {currentStep} In Progress
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Trademark Assignment Information Desk
          </h2>
          <p className="text-sm text-slate-600 mb-6">
            Configured for Lead: <span className="font-semibold">{formData.email}</span> ({formData.phone})
          </p>
          <button
            type="button"
            onClick={() => setSearchParams({ step: '1' })}
            className="px-5 py-2.5 bg-[#002B49] text-white text-xs font-semibold rounded-lg hover:bg-[#001D3D]"
          >
            ← Return to Step 1
          </button>
        </div>
      )}
    </main>
  );
}
