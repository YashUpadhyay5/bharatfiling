import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

import LegalConsultationLandingPage from './1-LegalConsultationLandingPage.jsx';
import LegalConsultationSchedulePage from './2-LegalConsultationSchedulePage.jsx';
import LegalConsultationPaymentPage from './3-LegalConsultationPaymentPage.jsx';

export {
  LegalConsultationLandingPage,
  LegalConsultationSchedulePage,
  LegalConsultationPaymentPage,
};

export default function LegalConsultationModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();

  const stepParam = searchParams.get('step');
  const initialStep = stepParam ? parseInt(stepParam, 10) : 1;
  const currentStep = [1, 2, 3].includes(initialStep) ? initialStep : 1;

  const getInitialDraft = () => {
    try {
      const saved = localStorage.getItem('bharatfiling_legal_consultation_draft');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore parse errors
    }
    return {
      email: user?.email || 'yashupadhyay@example.com',
      phone: user?.phone || '9876543210',
      language: 'English',
      problemType: 'Drafting a Legal Notice',
      whatsappUpdates: true,
      scheduledDate: '4 November 2026',
      scheduledDay: 4,
      scheduledMonth: 'November',
      scheduledYear: 2026,
      scheduledTimeSlot: '1:30 PM',
      totalAmount: 799,
      orderNumber: `#LAW-${Math.floor(100000 + Math.random() * 900000)}`,
    };
  };

  const [formData, setFormData] = useState(getInitialDraft);

  // Sync draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        'bharatfiling_legal_consultation_draft',
        JSON.stringify(formData)
      );
    } catch {
      // Ignore storage errors
    }
  }, [formData]);

  // Step 1: Submit lead or book call -> Advance to Step 2 (Schedule Date & Time)
  const handleLeadSubmit = async (leadData) => {
    const updated = {
      ...formData,
      ...leadData,
    };
    setFormData(updated);

    try {
      // Record lead in backend API
      await fetch('/api/v1/legal-consultation/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
      });
    } catch {
      // Fallback continues smoothly
    }

    setSearchParams({ step: '2' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 1: Select Plan -> Advance to Step 2
  const handleSelectPlan = (planId) => {
    setFormData((prev) => ({
      ...prev,
      selectedPlanId: planId,
    }));
    setSearchParams({ step: '2' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 2: Back to Step 1
  const handleBackToStep1 = () => {
    setSearchParams({ step: '1' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 2: Schedule proceed -> Advance to Step 3 (Payment Desk)
  const handleScheduleProceed = (scheduleData) => {
    setFormData((prev) => ({
      ...prev,
      ...scheduleData,
    }));
    setSearchParams({ step: '3' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 3: Back to Step 2
  const handleBackToStep2 = () => {
    setSearchParams({ step: '2' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 3: Payment completed callback
  const handlePaymentSuccess = (receiptData) => {
    setFormData((prev) => ({
      ...prev,
      paymentCompleted: true,
      transactionId: receiptData.transactionId,
      paidAt: receiptData.date,
    }));
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Page 1: Legal Consultation Landing Page */}
      {currentStep === 1 && (
        <LegalConsultationLandingPage
          initialData={formData}
          onSubmitLead={handleLeadSubmit}
          onSelectPlan={handleSelectPlan}
        />
      )}

      {/* Page 2: Date & Time Schedule Page */}
      {currentStep === 2 && (
        <LegalConsultationSchedulePage
          formData={formData}
          onBack={handleBackToStep1}
          onProceed={handleScheduleProceed}
        />
      )}

      {/* Page 3: Payment Desk Page (Talk to a Lawyer @ ₹799) */}
      {currentStep === 3 && (
        <LegalConsultationPaymentPage
          formData={formData}
          orderId={formData.orderNumber}
          onBack={handleBackToStep2}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </main>
  );
}
