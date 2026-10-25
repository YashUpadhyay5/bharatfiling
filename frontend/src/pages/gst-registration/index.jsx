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
import { getGstPlan, BUSINESS_NATURES } from './constants.js';

export { default as ApplicantPanPage } from './1-ApplicantPanPage.jsx';
export { default as BusinessJurisdictionPage } from './2-BusinessJurisdictionPage.jsx';
export { default as OrderCheckoutPage } from './3-OrderCheckoutPage.jsx';
export { default as GstPaymentPage } from './4-PaymentPage.jsx';

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
  const isGst = serviceMeta.type === 'GST';

  // Automatically prompt auth modal if user visits without login/register (non-GST only)
  useEffect(() => {
    if (isGst) return;
    if (!authLoading && !isAuthenticated) {
      setAuthModalOpen(true);
    }
  }, [authLoading, isAuthenticated, isGst]);

  // Route-driven step: 1 or 2
  const stepParam = parseInt(searchParams.get('step') || '1', 10);
  const currentStep = stepParam === 2 ? 2 : 1;

  // Retrieve cached draft from localStorage for refresh recovery
  const getInitialState = () => {
    const urlPlan = searchParams.get('plan');
    const urlPhone = (searchParams.get('phone') || '').replace(/\D/g, '').slice(0, 10);
    try {
      const saved = localStorage.getItem(`bharatfiling_${serviceMeta.slug}_draft`);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          propertyType: parsed.propertyType || 'Family Owned Property',
          applyReasons: parsed.applyReasons?.length ? parsed.applyReasons : ['To Start a New Business'],
          ...(urlPlan ? { plan: urlPlan } : {}),
          ...(urlPhone.length === 10 ? { phone: urlPhone } : {}),
        };
      }
    } catch {
      // Ignore parse error
    }
    return {
      name: '',
      phone: urlPhone.length === 10 ? urlPhone : '',
      pan: '',
      state: 'Karnataka',
      businessType: serviceMeta.type === 'COMPANY' ? 'Private Limited Company' : BUSINESS_NATURES[0],
      propertyType: 'Family Owned Property',
      applyReasons: ['To Start a New Business'],
      plan: searchParams.get('plan') || 'standard',
    };
  };

  const [formData, setFormData] = useState(getInitialState);
  const [panAuth, setPanAuth] = useState(() => validateIndianPAN(getInitialState().pan, getInitialState().name));
  const [isSubmitting, setIsSubmitting] = useState(false);

  // GST starts on Step 2 from the landing lead capture
  useEffect(() => {
    if (isGst && currentStep === 1) {
      navigate('/services/gst-registration', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

    setSearchParams({ step: '2' });
  };

  const handleStep2Submit = async (e) => {
    e.preventDefault();

    if (isGst) {
      if (!formData.propertyType) {
        showError('Please select the type of property where your office is located');
        return;
      }
    } else {
      if (!formData.state) {
        showError('Please select your state or union territory');
        return;
      }
      if (!formData.businessType) {
        showError('Please select nature of business');
        return;
      }
    }

    const fallbackName = (formData.name || user?.full_name || 'GST Applicant').trim();
    const cleanPhone = (formData.phone || user?.phone || '9876543210').replace(/\D/g, '');
    const fallbackPan = (formData.pan || 'ABCDE1234F').trim().toUpperCase();

    try {
      setIsSubmitting(true);
      const res = await api.createOnboardingQuote({
        name: fallbackName,
        phone: cleanPhone,
        pan: fallbackPan,
        email: (formData.email || user?.email || '').trim(),
        state: formData.state || 'Karnataka',
        businessType: formData.businessType || 'Retail Trade',
        serviceSlug: serviceMeta.slug,
        serviceType: serviceMeta.type,
        plan: formData.plan || 'standard',
        propertyType: formData.propertyType || 'Family Owned Property',
        applyReasons: formData.applyReasons && formData.applyReasons.length > 0
          ? formData.applyReasons
          : ['To Start a New Business'],
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
    <div className="min-h-screen bg-[#F5F7F8] relative overflow-hidden font-sans flex flex-col justify-center py-6 sm:py-12 md:py-16">
      {/* Decorative Isometric Stepped Blocks in Background Corners (Image 1 motif) */}
      <div className="absolute top-0 right-0 pointer-events-none select-none overflow-hidden opacity-70">
        <svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M220 0H140V40H100V80H60V120H20V160H0V220H220V0Z" fill="#E2E8F0" fillOpacity="0.4" />
          <path d="M220 0H160V30H120V60H80V90H40V120H0V220H220V0Z" fill="#CBD5E1" fillOpacity="0.25" />
          <path d="M220 0H180V20H140V40H100V60H60V80H20V100H0V220H220V0Z" fill="#94A3B8" fillOpacity="0.1" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 pointer-events-none select-none overflow-hidden opacity-70">
        <svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 220H80V180H120V140H160V100H200V60H220V0H0V220Z" fill="#E2E8F0" fillOpacity="0.4" />
          <path d="M0 220H60V190H100V160H140V130H180V100H220V0H0V220Z" fill="#CBD5E1" fillOpacity="0.25" />
          <path d="M0 220H40V200H80V180H120V160H160V140H200V120H220V0H0V220Z" fill="#94A3B8" fillOpacity="0.1" />
        </svg>
      </div>

      {/* Optional Top AutoPay Promo Banner (Non-GST only) */}
      {!isGst && (
        <div className="bg-[#EBF3FF] border-b border-blue-100 py-3 px-4 text-center mb-6">
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
      )}

      {/* Main Center Card */}
      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white rounded-3xl shadow-[0_16px_50px_rgba(17,24,39,0.06)] border border-slate-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px] items-center">
            {/* Left Hero */}
            <OnboardingHero currentStep={currentStep} serviceMeta={serviceMeta} />

            {/* Right Interactive Form: Screen 1 or Screen 2 */}
            <div className="lg:col-span-6 p-4 sm:p-8 lg:p-10 flex flex-col justify-center">
              {currentStep === 1 && !isGst ? (
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
                  panAuth={panAuth}
                  showIdentityFields={false}
                  isGst={isGst}
                  onInputChange={handleInputChange}
                  onBack={() =>
                    isGst
                      ? navigate('/services/gst-registration')
                      : setSearchParams({ step: '1' })
                  }
                  onSubmit={handleStep2Submit}
                  isSubmitting={isSubmitting}
                />
              )}
            </div>
          </div>

          {/* Bottom Trust Bar (Non-GST only) */}
          {!isGst && <TrustFooter />}
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
