import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';

import OpcLandingPage from './1-OpcLandingPage.jsx';

export { OpcLandingPage };

export default function OnePersonCompanyModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();

  const stepParam = searchParams.get('step');
  const initialStep = stepParam ? parseInt(stepParam, 10) : 1;
  const currentStep = [1, 2, 3, 4].includes(initialStep) ? initialStep : 1;

  const getInitialDraft = () => {
    try {
      const saved = localStorage.getItem('bharatfiling_opc_draft');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore parse errors
    }
    return {
      email: user?.email || 'yashupadhyay@example.com',
      phone: user?.phone || '+91 7668976193',
      proposedCompanyName: '',
      industryType: 'Technology / Software',
      nomineeName: '',
      capitalContribution: '100000',
      whatsappUpdates: true,
      packageId: 'standard_opc',
      packageName: 'Standard Incorporation (SPICe+ Part A & B)',
      professionalFee: 5499,
      onlineDiscount: 0,
      totalAmount: 6489, // 5499 + 18% GST (990) = 6489
      orderNumber: `#OPC-${Math.floor(100000 + Math.random() * 900000)}`,
    };
  };

  const [formData, setFormData] = useState(getInitialDraft);

  // Sync draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bharatfiling_opc_draft', JSON.stringify(formData));
    } catch {
      // Ignore storage errors
    }
  }, [formData]);

  // Step 1: Lead capture submit -> Prepares for Step 2
  const handleLeadSubmit = (leadData) => {
    setFormData((prev) => ({
      ...prev,
      ...leadData,
    }));
    // When Page 2 is provided, this will advance to step 2.
    // For now, updates draft and scrolls up.
    setSearchParams({ step: '1' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 1: Package chosen from pricing section
  const handleSelectPlan = (packageId) => {
    setFormData((prev) => ({
      ...prev,
      packageId,
    }));
    setSearchParams({ step: '1' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Page 1: One Person Company Landing Page (1:1 with media_1793609494674_acaf8785.png) */}
      {currentStep === 1 && (
        <OpcLandingPage
          initialData={formData}
          onSubmitLead={handleLeadSubmit}
          onSelectPlan={handleSelectPlan}
        />
      )}
    </main>
  );
}
