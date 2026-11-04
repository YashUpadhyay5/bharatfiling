import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

import CAConsultationLandingPage from './1-CAConsultationLandingPage.jsx';
import CAConsultationSchedulePage from './2-CAConsultationSchedulePage.jsx';
import CAConsultationPaymentPage from './3-CAConsultationPaymentPage.jsx';

export {
  CAConsultationLandingPage,
  CAConsultationSchedulePage,
  CAConsultationPaymentPage,
};

export default function CAConsultationModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();

  const stepParam = searchParams.get('step');
  const initialStep = stepParam ? parseInt(stepParam, 10) : 1;
  const currentStep = [1, 2, 3].includes(initialStep) ? initialStep : 1;

  const getInitialDraft = () => {
    try {
      const saved = localStorage.getItem('bharatfiling_ca_consultation_draft');
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
      problemType: 'Business Structure Consultation',
      whatsappUpdates: true,
      scheduledDate: '4 November 2026',
      scheduledDay: 4,
      scheduledMonth: 'November',
      scheduledYear: 2026,
      scheduledTimeSlot: '1:30 PM',
      totalAmount: 499,
      orderNumber: `#CA-${Math.floor(100000 + Math.random() * 900000)}`,
    };
  };

  const [formData, setFormData] = useState(getInitialDraft);

  // Sync draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        'bharatfiling_ca_consultation_draft',
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
      await fetch('/api/v1/ca-consultation/lead', {
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
      {/* Page 1: CA Consultation Landing Page */}
      {currentStep === 1 && (
        <CAConsultationLandingPage
          initialData={formData}
          onSubmitLead={handleLeadSubmit}
          onSelectPlan={handleSelectPlan}
        />
      )}

      {/* Page 2: Date & Time Schedule Page (1:1 with media_1793774635144_045925d5.png) */}
      {currentStep === 2 && (
        <CAConsultationSchedulePage
          formData={formData}
          onBack={handleBackToStep1}
          onProceed={handleScheduleProceed}
        />
      )}

      {/* Page 3: Payment Desk Page (1:1 with media_1793774683308_03149141.png) */}
      {currentStep === 3 && (
        <CAConsultationPaymentPage
          formData={formData}
          orderId={formData.orderNumber}
          onBack={handleBackToStep2}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </main>
  );
}
