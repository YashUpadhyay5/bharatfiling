import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

import LoansLandingPage from './1-LoansLandingPage.jsx';
import LoanApplicationPage from './2-LoanApplicationPage.jsx';
import LoanCheckoutPage from './3-LoanCheckoutPage.jsx';

export {
  LoansLandingPage,
  LoanApplicationPage,
  LoanCheckoutPage,
};

export default function LoansModule({ defaultSchemeId = null, forcedStep = null }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const { user } = useAuth();

  // Determine scheme from route path (e.g. /loans/mudra-loan -> mudra-pmmy)
  const pathSchemeMap = {
    '/loans/business-loan': 'unsecured-business',
    '/loans/msme-loan': 'unsecured-business',
    '/loans/mudra-loan': 'mudra-pmmy',
    '/loans/working-capital': 'working-capital-cgtmse',
    '/loans/machinery-loan': 'machinery-equipment',
    '/loans/loan-against-property': 'loan-against-property',
    '/loans/cma-project-report': 'cma-project-report',
  };

  const detectedSchemeId = defaultSchemeId || pathSchemeMap[location.pathname] || null;

  // Determine initial step
  const stepParam = searchParams.get('step');
  let computedStep = 1;
  if (forcedStep) {
    computedStep = forcedStep;
  } else if (location.pathname.endsWith('/apply')) {
    computedStep = 2;
  } else if (location.pathname.endsWith('/checkout')) {
    computedStep = 3;
  } else if (stepParam) {
    const parsed = parseInt(stepParam, 10);
    if ([1, 2, 3].includes(parsed)) computedStep = parsed;
  } else if (detectedSchemeId) {
    // If user clicked a direct scheme route (e.g. /loans/mudra-loan), show Step 2 with that scheme preloaded or landing
    computedStep = 1;
  }

  const [currentStep, setCurrentStep] = useState(computedStep);

  // Load saved draft
  const getInitialDraft = () => {
    try {
      const saved = localStorage.getItem('bharatfiling_loan_application_draft');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore parse error
    }
    return {
      name: '',
      email: user?.email || '',
      phone: user?.phone || '',
      cityPincode: '',
      desiredAmount: 1500000,
      whatsappUpdates: true,
      selectedSchemeId: detectedSchemeId || 'unsecured-business',
      selectedSchemeName: 'Unsecured Business Loan',
      entityType: 'pvt_ltd',
      businessVintage: '3_to_5_years',
      annualTurnover: '50l_to_1cr',
      monthlyCredit: 450000,
      isGstRegistered: true,
      gstin: '',
      cibilRange: '750_plus',
      orderNumber: `#LN-${Math.floor(100000 + Math.random() * 900000)}`,
    };
  };

  const [formData, setFormData] = useState(getInitialDraft);

  // Sync draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        'bharatfiling_loan_application_draft',
        JSON.stringify(formData)
      );
    } catch {
      // Ignore storage error
    }
  }, [formData]);

  // If detectedSchemeId changes via route, update formData
  useEffect(() => {
    if (detectedSchemeId && formData.selectedSchemeId !== detectedSchemeId) {
      setFormData((prev) => ({
        ...prev,
        selectedSchemeId: detectedSchemeId,
      }));
    }
  }, [detectedSchemeId]);

  // Step 1: Submit lead or click "Check Eligibility & Apply"
  const handleLeadSubmit = async (leadData) => {
    const updated = {
      ...formData,
      ...leadData,
    };
    setFormData(updated);

    try {
      await fetch('/api/v1/loans/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
      });
    } catch {
      // Continue gracefully
    }

    setCurrentStep(2);
    setSearchParams({ step: '2' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 1: Click specific scheme card
  const handleSelectScheme = (scheme) => {
    setFormData((prev) => ({
      ...prev,
      selectedSchemeId: scheme.id,
      selectedSchemeName: scheme.name,
    }));
    setCurrentStep(2);
    setSearchParams({ step: '2' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 2: Back to Step 1
  const handleBackToStep1 = () => {
    setCurrentStep(1);
    setSearchParams({ step: '1' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 2: Save Profile & Proceed to Step 3 (Checkout)
  const handleSaveProfile = async (profileData) => {
    const updated = {
      ...formData,
      ...profileData,
    };
    setFormData(updated);

    try {
      await fetch('/api/v1/loans/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: formData.orderNumber,
          applicantEmail: formData.email,
          ...profileData,
        }),
      });
    } catch {
      // Continue gracefully
    }

    setCurrentStep(3);
    setSearchParams({ step: '3' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 3: Back to Step 2
  const handleBackToStep2 = () => {
    setCurrentStep(2);
    setSearchParams({ step: '2' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 3: Payment Success Callback
  const handlePaymentSuccess = (receiptData) => {
    setFormData((prev) => ({
      ...prev,
      paymentCompleted: true,
      transactionId: receiptData.transactionId,
      paidAt: receiptData.date,
      bookedSlot: receiptData.bookedSlot,
    }));
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Page 1: Loans Hub & Schemes Landing Page */}
      {currentStep === 1 && (
        <LoansLandingPage
          initialData={formData}
          onSubmitLead={handleLeadSubmit}
          onSelectScheme={handleSelectScheme}
        />
      )}

      {/* Page 2: Loan Application & Financial Profile */}
      {currentStep === 2 && (
        <LoanApplicationPage
          initialData={formData}
          onBack={handleBackToStep1}
          onSaveProfile={handleSaveProfile}
        />
      )}

      {/* Page 3: Strategy Desk & Checkout */}
      {currentStep === 3 && (
        <LoanCheckoutPage
          formData={formData}
          orderId={formData.orderNumber}
          onBack={handleBackToStep2}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </main>
  );
}
