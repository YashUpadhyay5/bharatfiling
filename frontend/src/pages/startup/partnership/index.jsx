import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';

import PartnershipLandingPage from './1-PartnershipLandingPage.jsx';

export { PartnershipLandingPage };

export default function PartnershipModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();

  const stepParam = searchParams.get('step');
  const initialStep = stepParam ? parseInt(stepParam, 10) : 1;
  const currentStep = [1, 2, 3].includes(initialStep) ? initialStep : 1;

  const getInitialDraft = () => {
    try {
      const saved = localStorage.getItem('bharatfiling_partnership_draft');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore parse errors
    }
    return {
      email: user?.email || 'yashupadhyay@example.com',
      phone: user?.phone || '+91 7668976193',
      cityPincode: 'Mumbai, 400001',
      language: 'English',
      whatsappUpdates: true,
      stateCode: 'MH',
      stateName: 'Maharashtra',
      firmName: '',
      natureOfBusiness: '',
      capitalContribution: '100000',
      numberOfPartners: '2',
      packageId: 'standard_registration',
      packageName: 'Partnership Registration & PAN',
      professionalFee: 2499,
      onlineDiscount: 0,
      totalAmount: 2949, // 2499 + 18% GST (450) = 2949
      orderNumber: `#PTR-${Math.floor(100000 + Math.random() * 900000)}`,
    };
  };

  const [formData, setFormData] = useState(getInitialDraft);

  // Sync draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bharatfiling_partnership_draft', JSON.stringify(formData));
    } catch {
      // Ignore storage errors
    }
  }, [formData]);

  // Step 1: Lead capture submit
  const handleLeadSubmit = (leadData) => {
    setFormData((prev) => ({
      ...prev,
      ...leadData,
    }));
    // Note: When Step 2 is provided by the user, this will route to step 2.
    // For now, it updates the draft state and smooth scrolls to top or sets searchParams.
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
      {/* Page 1: Partnership Firm Registration Landing Page (1:1 with media_1793435760325_26064797.png) */}
      {currentStep === 1 && (
        <PartnershipLandingPage
          initialData={formData}
          onSubmitLead={handleLeadSubmit}
          onSelectPlan={handleSelectPlan}
        />
      )}
    </main>
  );
}
