import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import AuthRequiredModal from '../../components/common/AuthRequiredModal.jsx';
import { api } from '../../services/api.js';

// Screen Components
import OnboardingHero from './components/OnboardingHero.jsx';
import TrustFooter from './components/TrustFooter.jsx';
import UdyamBasicDetailsPage from './1-UdyamBasicDetailsPage.jsx';
import EnterpriseDetailsPage from './2-EnterpriseDetailsPage.jsx';
import UdyamCheckoutPage from './3-UdyamCheckoutPage.jsx';

export { default as UdyamBasicDetailsPage } from './1-UdyamBasicDetailsPage.jsx';
export { default as EnterpriseDetailsPage } from './2-EnterpriseDetailsPage.jsx';
export { default as UdyamCheckoutPage } from './3-UdyamCheckoutPage.jsx';

export default function UdyamRegistrationModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { showError, showSuccess } = useToast();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const stepParam = parseInt(searchParams.get('step') || '1', 10);
  const currentStep = stepParam === 2 ? 2 : 1;

  // Initial State from local storage draft or user profile
  const getInitialState = () => {
    try {
      const saved = localStorage.getItem('bharatfiling_udyam_draft');
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return {
      pan: 'AOOPU9849P',
      aadhaar: '829930219289',
      nicDivision: 'A - Agriculture, Forestry And Fishing',
      nicSubDivision: '01 - Crop And Animal Production, Hunting',
      nicSubClass: '01112 - Growing Of Jowar, Bajra And Millets',
      name: '',
      enterpriseName: 'Yash Agro Tech Solutions',
      organizationType: 'Proprietorship',
      majorActivity: 'Services',
      plantAddress: 'Sector 62, Electronic City',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560100',
      bankAccountNo: '50100234918231',
      bankIfsc: 'HDFC0001234',
    };
  };

  const [formData, setFormData] = useState(getInitialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill user data
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.full_name || '',
        phone: prev.phone || user.phone || '7668976193',
      }));
    }
  }, [user]);

  // Persist draft to local storage
  useEffect(() => {
    try {
      localStorage.setItem('bharatfiling_udyam_draft', JSON.stringify(formData));
    } catch {
      // Ignore quota
    }
  }, [formData]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Step 1 Validation & Transition
  const handleStep1Continue = (e) => {
    e.preventDefault();

    if (!formData.pan.trim()) {
      showError('Please enter PAN or GSTIN');
      return;
    }

    if (!formData.aadhaar.trim() || formData.aadhaar.replace(/\D/g, '').length !== 12) {
      showError('Please enter a valid 12-digit Aadhaar number');
      return;
    }

    if (!formData.nicDivision) {
      showError('Please select NIC Division');
      return;
    }

    // Advance to Step 2
    setSearchParams({ step: '2' });
  };

  // Step 2 Submission & Order Generation
  const handleStep2Submit = async (e) => {
    e.preventDefault();

    if (!formData.enterpriseName.trim()) {
      showError('Please enter legal enterprise name');
      return;
    }

    if (!formData.plantAddress.trim()) {
      showError('Please enter plant or office address');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await api.createUdyamQuote({
        ...formData,
        name: formData.name || user?.full_name || 'Yash Updhyay',
        phone: formData.phone || user?.phone || '7668976193',
        email: user?.email || 'yashupdhyay486@gmail.com',
      });

      if (res.success && res.orderId) {
        showSuccess('Udyam quotation generated successfully!');
        navigate(`/checkout/${res.orderId}`);
      } else {
        showError(res.message || 'Failed to generate quotation.');
      }
    } catch (err) {
      showError(err.message || 'Network error while generating quotation.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/40 via-white to-slate-50 font-sans pb-16">
      {/* Auth Modal */}
      <AuthRequiredModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        title="Sign In to Complete Udyam Registration"
        subtitle="Save your Udyam application and track real-time CA filing progress."
      />

      <div className="max-w-5xl mx-auto px-3 sm:px-6 pt-5 sm:pt-10">
        {/* Main Card matching screenshots */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-lg p-4 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Hero & Benefits */}
            <div className="lg:col-span-5">
              <OnboardingHero />
            </div>

            {/* Right Column: Screen 1 or Screen 2 Form */}
            <div className="lg:col-span-7 bg-slate-50/50 p-4 sm:p-6 lg:p-8 rounded-2xl border border-slate-100">
              <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Step {currentStep} of 3
                </span>
                <span className="text-xs font-semibold text-blue-600">
                  {currentStep === 1 ? 'Applicant & NIC Code' : 'Enterprise & Bank Setup'}
                </span>
              </div>

              {currentStep === 1 && (
                <UdyamBasicDetailsPage
                  formData={formData}
                  onInputChange={handleInputChange}
                  onSubmit={handleStep1Continue}
                  isSubmitting={isSubmitting}
                  isAuthenticated={isAuthenticated}
                  onOpenAuthModal={() => setAuthModalOpen(true)}
                />
              )}

              {currentStep === 2 && (
                <EnterpriseDetailsPage
                  formData={formData}
                  onInputChange={handleInputChange}
                  onSubmit={handleStep2Submit}
                  onBack={() => setSearchParams({ step: '1' })}
                  isSubmitting={isSubmitting}
                />
              )}
            </div>
          </div>

          {/* 4-Item Trust Footer */}
          <TrustFooter />
        </div>
      </div>
    </div>
  );
}
