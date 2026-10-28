import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';

import ApedaLandingPage from './1-ApedaLandingPage.jsx';

export { ApedaLandingPage };

export default function ApedaRegistrationModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const { showSuccess } = useToast();

  const stepParam = searchParams.get('step');
  const initialStep = stepParam ? parseInt(stepParam, 10) : 1;
  const currentStep = [1, 2, 3].includes(initialStep) ? initialStep : 1;

  const getInitialDraft = () => {
    try {
      const saved = localStorage.getItem('bharatfiling_apeda_draft');
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
      language: 'English',
      whatsappUpdates: true,
    };
  };

  const [formData, setFormData] = useState(getInitialDraft);

  // Sync draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bharatfiling_apeda_draft', JSON.stringify(formData));
    } catch {
      // Ignore storage errors
    }
  }, [formData]);

  const handleConsultExpert = (leadData) => {
    setFormData((prev) => ({
      ...prev,
      ...leadData,
    }));
    showSuccess('Details submitted! A Senior APEDA & DGFT Consultant will call you shortly.');
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Page 1: APEDA Landing Page (matches media_1793178528760_b8177ea9.png & Vakilsearch) */}
      {currentStep === 1 && (
        <ApedaLandingPage
          initialData={formData}
          onConsultExpert={handleConsultExpert}
        />
      )}
    </main>
  );
}
