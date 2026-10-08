import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link, useParams } from 'react-router-dom';
import { CreditCard } from 'lucide-react';
import { api } from '../../services/api.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import AuthRequiredModal from '../../components/common/AuthRequiredModal.jsx';
import { validateIndianPAN } from '../../utils/panValidator.js';

// Module Components & Screens
import OnboardingHero from './components/OnboardingHero.jsx';
import TrustFooter from './components/TrustFooter.jsx';
import ApplicantPanPage from './1-ApplicantPanPage.jsx';
import BusinessJurisdictionPage from './2-BusinessJurisdictionPage.jsx';

export { default as ApplicantPanPage } from './1-ApplicantPanPage.jsx';
export { default as BusinessJurisdictionPage } from './2-BusinessJurisdictionPage.jsx';
export { default as OrderCheckoutPage } from './3-OrderCheckoutPage.jsx';

const SERVICE_CONFIGS = {
  gst: {
    type: 'GST',
    slug: 'gst',
    badge: 'Fast-Track 2026 Portal Filing',
    title: 'Start Your GST Registration Instantly',
    desc: 'Get your business GST-ready quickly with BharatFiling. Certified Chartered Accountants prepare and submit your statutory filing with complete accuracy.',
    priceLabel: '₹1,769 All-Inclusive',
    bullets: [
      'Complete Form REG-01 preparation & CA review',
      'Instant TRN generation & identity check',
      '15-Digit statutory ARN filing desk',
      'Official Form REG-06 GST Certificate delivery',
      'Lifetime compliance & filing dashboard access',
    ],
  },
  'company-registration': {
    type: 'COMPANY',
    slug: 'company-registration',
    badge: 'MCA SPICe+ Fast Track',
    title: 'Incorporate Private Limited Company',
    desc: 'Fast-track corporate incorporation on Ministry of Corporate Affairs portal. Includes RUN name approval, DIN, PAN, TAN, and Certificate of Incorporation.',
    priceLabel: '₹4,999 All-Inclusive',
    bullets: [
      'RUN Company name reservation check',
      'Director DSC & DIN allotment',
      'MOA & AOA charter drafting by Corporate CA',
      'MCA SPICe+ filing & COI issuance',
      'Corporate Bank Account setup assistance',
    ],
  },
  'income-tax': {
    type: 'ITR',
    slug: 'income-tax',
    badge: 'AY 2026-27 Direct Tax Desk',
    title: 'Income Tax Return (ITR) Filing',
    desc: 'Expert CA-assisted ITR-1 to ITR-4 filing. We compute capital gains, business profits, reconcile AIS & 26AS, and claim all eligible legal tax deductions.',
    priceLabel: '₹999 All-Inclusive',
    bullets: [
      'Form 16 & AIS/26AS tax credit reconciliation',
      'Profit & Loss and balance sheet review',
      'Maximized Section 80C/80D legal deductions',
      'Instant ITD Acknowledgement Number issuance',
      'ITR-V Verification & CPC Bangalore intimation',
    ],
  },
  trademark: {
    type: 'TRADEMARK',
    slug: 'trademark',
    badge: 'Brand Intellectual Property (IPR)',
    title: 'Trademark Registration & Protection',
    desc: 'Protect your brand name, logo, or slogan across 45 trademark classes with certified IP Attorneys and comprehensive search reports.',
    priceLabel: '₹1,999 All-Inclusive',
    bullets: [
      'Comprehensive IP India public search report',
      'Nice Class determination & Form TM-A drafting',
      'Statutory Trademark Application Number allotment',
      'Legal examination & attorney reply assistance',
      'Official Trademark Registration Certificate',
    ],
  },
  'llp-registration': {
    type: 'LLP',
    slug: 'llp-registration',
    badge: 'MCA FiLLiP Fast Track',
    title: 'Limited Liability Partnership (LLP)',
    desc: 'Incorporate an LLP with limited liability protection and zero statutory audit requirements up to ₹40 Lakhs turnover.',
    priceLabel: '₹3,999 All-Inclusive',
    bullets: [
      'Designated Partner DPIN & DSC allotment',
      'RUN-LLP Name approval & reservation',
      'Customized LLP Agreement deed drafting',
      'MCA Form FiLLiP statutory submission',
      'ROC Certificate of Incorporation with LLPIN',
    ],
  },
};

export default function GstRegistrationModule() {
  const { serviceSlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { showError, showSuccess } = useToast();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Determine active service configuration
  const rawKey = (serviceSlug || searchParams.get('service') || 'gst').toLowerCase();
  const configKey = Object.keys(SERVICE_CONFIGS).find((k) => rawKey.includes(k) || k.includes(rawKey)) || 'gst';
  const serviceMeta = SERVICE_CONFIGS[configKey];

  // Automatically prompt auth modal if user visits without login/register
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      setAuthModalOpen(true);
    }
  }, [authLoading, isAuthenticated]);

  // Route-driven step: 1 or 2
  const stepParam = parseInt(searchParams.get('step') || '1', 10);
  const currentStep = stepParam === 2 ? 2 : 1;

  // Retrieve cached draft from localStorage for refresh recovery
  const getInitialState = () => {
    try {
      const saved = localStorage.getItem(`bharatfiling_${serviceMeta.slug}_draft`);
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore parse error
    }
    return {
      name: '',
      phone: '',
      pan: '',
      state: 'Karnataka',
      businessType: serviceMeta.type === 'COMPANY' ? 'Private Limited Company' : 'Proprietorship',
    };
  };

  const [formData, setFormData] = useState(getInitialState);
  const [panAuth, setPanAuth] = useState(() => validateIndianPAN(getInitialState().pan, getInitialState().name));
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill form from user account once authenticated
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.full_name || '',
        phone: prev.phone || user.phone || '',
      }));
    }
  }, [user]);

  // Update PAN validation whenever PAN or Name changes
  useEffect(() => {
    if (formData.pan) {
      const auth = validateIndianPAN(formData.pan, formData.name);
      setPanAuth(auth);
    } else {
      setPanAuth(validateIndianPAN('', ''));
    }
  }, [formData.pan, formData.name]);

  // Persist draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bharatfiling_gst_draft', JSON.stringify(formData));
    } catch {
      // Ignore quota error
    }
  }, [formData]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleStep1Continue = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setAuthModalOpen(true);
      return;
    }

    if (!formData.name.trim()) {
      showError('Please enter your full name as per PAN');
      return;
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      showError('Please enter a valid 10-digit mobile number');
      return;
    }

    if (!formData.pan.trim()) {
      showError('Please enter your 10-character PAN card number');
      return;
    }

    const auth = validateIndianPAN(formData.pan, formData.name);
    if (!auth.isValid) {
      showError(auth.message || 'Please check and enter a valid PAN number');
      return;
    }

    // Advance to step 2 with URL update for refresh persistence
    setSearchParams({ step: '2' });
  };

  const handleStep2Submit = async (e) => {
    e.preventDefault();
    if (!formData.state) {
      showError('Please select your state or union territory');
      return;
    }
    if (!formData.businessType) {
      showError('Please select nature of business');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await api.createOnboardingQuote({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        pan: formData.pan.trim().toUpperCase(),
        state: formData.state,
        businessType: formData.businessType,
        serviceSlug: serviceMeta.slug,
        serviceType: serviceMeta.type,
      });

      if (res.success && res.orderId) {
        showSuccess('Quotation generated successfully!');
        // Route to Screen 3: Order Checkout
        navigate(`/checkout/${res.orderId}`);
      } else {
        showError(res.message || 'Failed to generate quotation. Please try again.');
      }
    } catch (err) {
      showError(err.message || 'Network error while generating quotation');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50/60 via-white to-slate-50 font-sans pb-16">
      {/* 1. TOP AUTOPAY PROMO BANNER */}
      <div className="bg-[#EBF3FF] border-b border-blue-100 py-3 px-4 text-center">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-slate-700">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-blue-200 text-[#111827] font-bold text-[11px] shadow-2xs">
            <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
            UPI AUTOPAY
          </span>
          <span className="font-medium">
            Professional Filing Package for {serviceMeta.title} from{' '}
            <strong className="text-slate-900 font-bold">{serviceMeta.priceLabel}</strong>
          </span>
          <Link
            to="/pricing"
            className="text-blue-600 hover:text-blue-800 font-bold underline inline-flex items-center gap-0.5 ml-1"
          >
            View Pricing &rarr;
          </Link>
        </div>
      </div>

      {/* 2. MAIN CONTAINER */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
        <div className="bg-white rounded-3xl shadow-[0_16px_50px_rgba(17,24,39,0.07)] border border-slate-200/90 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
            {/* Left Hero */}
            <OnboardingHero currentStep={currentStep} serviceMeta={serviceMeta} />

            {/* Right Interactive Form: Screen 1 or Screen 2 */}
            <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-center">
              {currentStep === 1 ? (
                <ApplicantPanPage
                  formData={formData}
                  panAuth={panAuth}
                  onInputChange={handleInputChange}
                  onSubmit={handleStep1Continue}
                  isAuthenticated={isAuthenticated}
                  onOpenAuthModal={() => setAuthModalOpen(true)}
                />
              ) : (
                <BusinessJurisdictionPage
                  formData={formData}
                  onInputChange={handleInputChange}
                  onBack={() => setSearchParams({ step: '1' })}
                  onSubmit={handleStep2Submit}
                  isSubmitting={isSubmitting}
                />
              )}
            </div>
          </div>

          {/* Bottom Trust Bar */}
          <TrustFooter />
        </div>
      </div>

      {/* Auth Modal */}
      <AuthRequiredModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        title="Account Required to File GST Application"
        subtitle="Sign in or register your BharatFiling account to proceed with PAN verification and government registration."
      />
    </div>
  );
}
