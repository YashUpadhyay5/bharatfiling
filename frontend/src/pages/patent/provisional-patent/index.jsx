import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';

import ProvisionalPatentLandingPage from './1-ProvisionalPatentLandingPage.jsx';
import ProvisionalPatentJurisdictionSelection from './2-ProvisionalPatentJurisdictionSelection.jsx';
import ProvisionalPatentPaymentPage from './3-ProvisionalPatentPaymentPage.jsx';

export {
  ProvisionalPatentLandingPage,
  ProvisionalPatentJurisdictionSelection,
  ProvisionalPatentPaymentPage,
};

export default function ProvisionalPatentModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();

  const stepParam = searchParams.get('step');
  const initialStep = stepParam ? parseInt(stepParam, 10) : 1;
  const currentStep = [1, 2, 3].includes(initialStep) ? initialStep : 1;

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
      packageName: 'Provisional Patent Application Filing Advisory',
      professionalFee: 499,
      onlineDiscount: 0,
      totalAmount: 619,
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

  // Step 2: Proceed from Jurisdiction Selection to Step 3 (Payment Desk)
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

  const handleBackToStep2 = () => {
    setSearchParams({ step: '2' });
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

      {/* Page 3: Payment Desk (1:1 with media_1793359209528_791e525d.png) */}
      {currentStep === 3 && (
        <ProvisionalPatentPaymentPage
          formData={formData}
          orderId={formData.orderNumber}
          onBack={handleBackToStep2}
        />
      )}
    </main>
  );
}
