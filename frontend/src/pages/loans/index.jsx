import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

import LoansLandingPage from './1-LoansLandingPage.jsx';
import LoanSchemesPage from './2-LoanSchemesPage.jsx';
import LoanProfilePage from './3-LoanProfilePage.jsx';
import LoanCheckoutPage from './4-LoanCheckoutPage.jsx';

// For backward compatibility
import LoanApplicationPage from './2-LoanApplicationPage.jsx';

export {
  LoansLandingPage,
  LoanSchemesPage,
  LoanProfilePage,
  LoanCheckoutPage,
  LoanApplicationPage,
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
    '/loans/custom-loan-advisory': 'custom-loan-advisory',
    '/loans/advisory': 'custom-loan-advisory',
  };

  const detectedSchemeId = defaultSchemeId || pathSchemeMap[location.pathname] || null;

  // Determine initial step (1 to 4)
  const stepParam = searchParams.get('step');
  let computedStep = 1;
  if (forcedStep) {
    computedStep = forcedStep;
  } else if (location.pathname.endsWith('/apply') || location.pathname.endsWith('/schemes')) {
    computedStep = 2;
  } else if (location.pathname.endsWith('/profile')) {
    computedStep = 3;
  } else if (location.pathname.endsWith('/checkout')) {
    computedStep = 4;
  } else if (stepParam) {
    const parsed = parseInt(stepParam, 10);
    if ([1, 2, 3, 4].includes(parsed)) computedStep = parsed;
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

  // Step 1: Submit lead or click "Check Eligibility & Apply" -> Advance to Step 2 (Schemes Selection Page)
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

  // Step 1: Click specific scheme card from Landing Page -> Advance to Step 2 with that scheme
  const handleSelectSchemeFromLanding = (scheme) => {
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

  // Step 2: Selected Scheme confirmed -> Advance to Step 3 (Business & Financial Profile)
  const handleProceedToProfile = (schemeData) => {
    const updated = {
      ...formData,
      ...schemeData,
    };
    setFormData(updated);
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

  // Step 3: Save Profile & Proceed to Step 4 (Checkout Desk)
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

    setCurrentStep(4);
    setSearchParams({ step: '4' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 4: Back to Step 3
  const handleBackToStep3 = () => {
    setCurrentStep(3);
    setSearchParams({ step: '3' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 4: Payment Success Callback
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
          onSelectScheme={handleSelectSchemeFromLanding}
        />
      )}

      {/* Page 2: All Loan Schemes Selection Page (The Next Page with filter tabs and cards) */}
      {currentStep === 2 && (
        <LoanSchemesPage
          initialData={formData}
          onBack={handleBackToStep1}
          onProceedToProfile={handleProceedToProfile}
        />
      )}

      {/* Page 3: Business Financial & Credit Profile */}
      {currentStep === 3 && (
        <LoanProfilePage
          initialData={formData}
          onBack={handleBackToStep2}
          onSaveProfile={handleSaveProfile}
        />
      )}

      {/* Page 4: Strategy Desk & Checkout Desk */}
      {currentStep === 4 && (
        <LoanCheckoutPage
          formData={formData}
          orderId={formData.orderNumber}
          onBack={handleBackToStep3}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </main>
  );
}
