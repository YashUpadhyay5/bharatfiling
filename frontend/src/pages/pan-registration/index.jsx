import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { CheckCircle2, ArrowLeft, ArrowRight, ShieldCheck, FileText } from 'lucide-react';

import PanLandingPage from './1-PanLandingPage.jsx';

export { PanLandingPage };

export default function PanRegistrationModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const { showSuccess } = useToast();

  const stepParam = searchParams.get('step');
  const initialStep = stepParam ? parseInt(stepParam, 10) : 1;
  const currentStep = [1, 2, 3, 4].includes(initialStep) ? initialStep : 1;
  const initialPlan = searchParams.get('plan') || 'standard';

  const getInitialDraft = () => {
    try {
      const saved = localStorage.getItem('bharatfiling_pan_draft');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore parse errors
    }
    return {
      name: user?.name || user?.full_name || 'Yash Upadhyay',
      email: user?.email || 'ya*****************@com',
      phone: user?.phone || '+91 7668976193',
      entityType: 'individual',
      appType: 'new',
      state: 'Karnataka',
      whatsappOptIn: true,
      plan: initialPlan,
    };
  };

  const [formData, setFormData] = useState(getInitialDraft);

  // Sync draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bharatfiling_pan_draft', JSON.stringify(formData));
    } catch {
      // Ignore storage errors
    }
  }, [formData]);

  // Step 1: Lead capture on landing page -> Save and move to Step 2
  const handleStep1GetStarted = (leadData) => {
    setFormData((prev) => ({
      ...prev,
      ...leadData,
    }));
    setSearchParams({ step: '2', plan: leadData.plan || formData.plan || initialPlan });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showSuccess('Lead recorded! Application draft saved to your browser.');
  };

  const handleBackToStep1 = () => {
    setSearchParams({ step: '1' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Step 1: Complete Landing Page */}
      {currentStep === 1 && (
        <PanLandingPage
          initialData={formData}
          onGetStarted={handleStep1GetStarted}
        />
      )}

      {/* Step 2 Standby Screen (Awaiting User's Second Page Screenshot) */}
      {currentStep > 1 && (
        <div className="min-h-screen bg-[#F8FAFC] py-16 px-4 sm:px-6 font-sans">
          <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xl text-center space-y-6">
            
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
                Step 1 Completed Successfully
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] mt-3">
                Lead &amp; Application Profile Saved
              </h1>
              <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
                Applicant <strong className="text-slate-800">{formData.name}</strong> ({formData.entityType.toUpperCase()}) profile recorded. Ready for Step 2 applicant details.
              </p>
            </div>

            {/* Lead Summary Card */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-left text-xs sm:text-sm space-y-2.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Applicant Legal Name:</span>
                <span className="font-bold text-slate-800">{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Contact Number:</span>
                <span className="font-mono font-semibold text-slate-700">{formData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Entity Category:</span>
                <span className="font-semibold text-slate-700">{formData.entityType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Selected State:</span>
                <span className="font-semibold text-slate-700">{formData.state}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2">
                <span className="text-slate-500">Selected Plan:</span>
                <span className="font-bold text-[#002B49] uppercase">{formData.plan}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-blue-900 text-left space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-[#002B49]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Ready for Step 2 Layout</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Step 1 is 100% operational. Provide the second screenshot anytime to build the Step 2 details wizard.
              </p>
            </div>

            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={handleBackToStep1}
                className="py-3 px-6 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-2 transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back to PAN Overview
              </button>
            </div>

          </div>
        </div>
      )}
    </main>
  );
}
