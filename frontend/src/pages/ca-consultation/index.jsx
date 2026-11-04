import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import CAConsultationLandingPage from './1-CAConsultationLandingPage.jsx';

export { CAConsultationLandingPage };

export default function CAConsultationModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

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
      email: user?.email || '',
      phone: user?.phone || '',
      language: 'English',
      problemType: 'Business Structure Consultation',
      whatsappUpdates: true,
      selectedPlanId: 'starter',
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

  // Lead submit handler
  const handleLeadSubmit = async (leadData) => {
    const updated = {
      ...formData,
      ...leadData,
    };
    setFormData(updated);

    try {
      // Send lead to backend API
      await fetch('/api/v1/ca/consultation/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
      });
    } catch {
      // Continue gracefully even if network is offline
    }

    alert(
      `Thank you! A verified Chartered Accountant specialized in "${leadData.problemType}" has been notified. You will receive an instant callback at ${leadData.phone}.`
    );
  };

  // Select Plan handler
  const handleSelectPlan = (planId) => {
    setFormData((prev) => ({
      ...prev,
      selectedPlanId: planId,
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-white">
      <CAConsultationLandingPage
        initialData={formData}
        onSubmitLead={handleLeadSubmit}
        onSelectPlan={handleSelectPlan}
      />
    </main>
  );
}
