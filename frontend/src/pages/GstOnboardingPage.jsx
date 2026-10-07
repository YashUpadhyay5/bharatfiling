import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  FileCheck2,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Smartphone,
  Star,
  Award,
  Users,
  Activity,
  CreditCard,
  Building2,
  Check,
  AlertCircle,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import { api } from '../services/api.js';
import { useToast } from '../context/ToastContext.jsx';
import { validateIndianPAN } from '../utils/panValidator.js';

const INDIAN_STATES = [
  'Andaman and Nicobar Islands',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chandigarh',
  'Chhattisgarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Ladakh',
  'Lakshadweep',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Puducherry',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
];

const BUSINESS_NATURES = [
  'Retail Trade',
  'Wholesale / Distribution',
  'E-Commerce Seller (Amazon, Flipkart, Meesho)',
  'Software & Information Technology',
  'Manufacturing',
  'Professional Services / Freelancer',
  'Works Contract / Construction',
  'Hospitality & Restaurants',
  'Logistics & Transport',
  'Healthcare / Clinic',
  'Export / Import (IEC)',
  'Other Commercial Services',
];

export default function GstOnboardingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();

  // Route-driven step: 1 or 2
  const stepParam = parseInt(searchParams.get('step') || '1', 10);
  const currentStep = stepParam === 2 ? 2 : 1;

  // Retrieve cached draft from localStorage for refresh recovery
  const getInitialState = () => {
    try {
      const saved = localStorage.getItem('bharatfiling_gst_draft');
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore parse error
    }
    return {
      name: '',
      phone: '',
      pan: '',
      state: 'Karnataka',
      businessType: 'Retail Trade',
    };
  };

  const [formData, setFormData] = useState(getInitialState);
  const [panAuth, setPanAuth] = useState(() => validateIndianPAN(getInitialState().pan, getInitialState().name));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({ name: false, phone: false, pan: false });

  // Update PAN authentication whenever PAN or Name changes
  useEffect(() => {
    if (formData.pan) {
      const auth = validateIndianPAN(formData.pan, formData.name);
      setPanAuth(auth);
    } else {
      setPanAuth(validateIndianPAN('', ''));
    }
  }, [formData.pan, formData.name]);

  // Persist every field edit to localStorage for refresh recovery
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
    setTouched({ name: true, phone: true, pan: true });

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
      });

      if (res.success && res.orderId) {
        showSuccess('Quotation generated successfully!');
        // Route to dedicated checkout page matching Image 3
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
      
      {/* 1. TOP AUTOPAY PROMO BANNER (Matches Image 1) */}
      <div className="bg-[#EBF3FF] border-b border-blue-100 py-3 px-4 text-center">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-slate-700">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-blue-200 text-[#0B1E36] font-bold text-[11px] shadow-2xs">
            <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
            UPI AUTOPAY
          </span>
          <span className="font-medium">
            Get GST Registration and Monthly Return Filing from{' '}
            <strong className="text-slate-900 font-bold">₹1,499 /month</strong>
          </span>
          <Link
            to="/pricing"
            className="text-blue-600 hover:text-blue-800 font-bold underline inline-flex items-center gap-0.5 ml-1"
          >
            View Pricing &rarr;
          </Link>
        </div>
      </div>

      {/* 2. MAIN ONBOARDING CONTAINER */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
        <div className="bg-white rounded-3xl shadow-[0_16px_50px_rgba(11,30,54,0.07)] border border-slate-200/90 overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
            
            {/* LEFT COLUMN: Deliverables & Value Props (Matches Image 1 & 2) */}
            <div className="lg:col-span-6 p-6 sm:p-10 bg-gradient-to-br from-white via-slate-50/30 to-blue-50/20 border-b lg:border-b-0 lg:border-r border-slate-100 flex flex-col justify-between">
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[#0B1E36] text-[11px] font-bold">
                    <Sparkles className="w-3 h-3 text-[#F26522]" />
                    Fast-Track 2026 Portal Filing
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                    Start Your GST Registration Instantly
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Get your business GST-ready quickly with BharatFiling. Expert team and advanced software ensure accurate, fully online GST registration anywhere in India.
                  </p>
                </div>

                {/* 5 Distinctive Bullet Items (Matching Image 1) */}
                <div className="space-y-3.5 pt-1 text-xs text-slate-700 font-medium">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 text-[#0B1E36] flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span>Complete application preparation</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 text-[#0B1E36] flex items-center justify-center shrink-0">
                      <FileCheck2 className="w-4 h-4 text-blue-600" />
                    </div>
                    <span>Instant TRN generation</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 text-[#0B1E36] flex items-center justify-center shrink-0">
                      <Activity className="w-4 h-4 text-amber-600" />
                    </div>
                    <span>ARN generation & fast-track desk</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 text-[#0B1E36] flex items-center justify-center shrink-0">
                      <Award className="w-4 h-4 text-purple-600" />
                    </div>
                    <span>Official GST Certificate (Form REG-06)</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 text-[#0B1E36] flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4 text-[#F26522]" />
                    </div>
                    <span>BharatFiling compliance software access</span>
                  </div>
                </div>
              </div>

              {/* Progress indicator */}
              <div className="pt-8 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-slate-700">
                  Step {currentStep} of 2: {currentStep === 1 ? 'Applicant & PAN' : 'Jurisdiction & Business'}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className={`w-6 h-1.5 rounded-full ${currentStep >= 1 ? 'bg-[#0B1E36]' : 'bg-slate-200'}`} />
                  <span className={`w-6 h-1.5 rounded-full ${currentStep === 2 ? 'bg-[#0B1E36]' : 'bg-slate-200'}`} />
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Interactive Form (Step 1 or Step 2) */}
            <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-center">
              
              {currentStep === 1 ? (
                /* SCREEN 1: Name, Phone, PAN (Matches Image 1) */
                <form onSubmit={handleStep1Continue} className="space-y-5">
                  
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="e.g. Yash Updhyay"
                      className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-300 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0B1E36]/30 focus:border-[#0B1E36] transition"
                    />
                  </div>

                  {/* Phone Number with +91 */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="flex rounded-2xl border border-slate-300 focus-within:ring-2 focus-within:ring-[#0B1E36]/30 focus-within:border-[#0B1E36] overflow-hidden transition bg-white">
                      <div className="px-3 py-3 bg-slate-50 border-r border-slate-200 flex items-center gap-1.5 text-xs font-bold text-slate-700 shrink-0">
                        <span>🇮🇳</span>
                        <span>+91</span>
                      </div>
                      <input
                        type="tel"
                        maxLength={10}
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value.replace(/\D/g, ''))}
                        placeholder="7668976193"
                        className="w-full px-4 py-3 text-slate-900 text-sm font-medium focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* PAN Card Input with Real-Time Authentication */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-slate-700">
                        PAN <span className="text-rose-500">*</span>
                      </label>
                      {formData.pan.length > 0 && (
                        <span className="text-[10px] font-mono text-slate-400">
                          {formData.pan.length}/10
                        </span>
                      )}
                    </div>
                    
                    <input
                      type="text"
                      maxLength={10}
                      value={formData.pan}
                      onChange={(e) => handleInputChange('pan', e.target.value.toUpperCase())}
                      placeholder="ABCDE1234F"
                      className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-300 text-slate-900 text-sm font-mono font-bold tracking-wider focus:outline-none focus:ring-2 focus:ring-[#0B1E36]/30 focus:border-[#0B1E36] transition uppercase"
                    />

                    {/* Real-Time PAN Authentication Badge */}
                    {formData.pan.length > 0 && (
                      <div className="pt-1 transition-all">
                        {panAuth.isValid ? (
                          <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-2xl space-y-1 animate-in fade-in duration-200">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span>{panAuth.message}</span>
                            </div>
                            <div className="text-[11px] text-emerald-700 flex flex-wrap items-center gap-x-3 gap-y-1 pl-5">
                              <span>Entity: <strong>{panAuth.entityType}</strong></span>
                              <span>•</span>
                              <span>ITD Status: <strong>ACTIVE</strong></span>
                              <span>•</span>
                              <span>Aadhaar: <strong>LINKED</strong></span>
                            </div>
                          </div>
                        ) : panAuth.isComplete ? (
                          <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-2 text-xs text-amber-800 animate-in fade-in duration-200">
                            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                            <span>{panAuth.message}</span>
                          </div>
                        ) : (
                          <div className="text-[11px] text-slate-400 pl-1">
                            {panAuth.message}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Continue Button (Gradient Purple-Blue matching Image 1) */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#6366F1] to-[#A855F7] hover:from-[#4F46E5] hover:to-[#9333EA] text-white font-bold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </form>
              ) : (
                /* SCREEN 2: State / UT and Nature of Business (Matches Image 2) */
                <form onSubmit={handleStep2Submit} className="space-y-5">
                  
                  {/* State / UT Dropdown */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      State / UT <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className="w-full px-4 py-3.5 rounded-2xl bg-white border border-slate-300 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0B1E36]/30 focus:border-[#0B1E36] transition appearance-none cursor-pointer"
                      >
                        {INDIAN_STATES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                        ▼
                      </div>
                    </div>
                  </div>

                  {/* Nature of Business Dropdown */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Nature of Business <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={formData.businessType}
                        onChange={(e) => handleInputChange('businessType', e.target.value)}
                        className="w-full px-4 py-3.5 rounded-2xl bg-white border border-slate-300 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0B1E36]/30 focus:border-[#0B1E36] transition appearance-none cursor-pointer"
                      >
                        {BUSINESS_NATURES.map((bn) => (
                          <option key={bn} value={bn}>
                            {bn}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                        ▼
                      </div>
                    </div>
                  </div>

                  {/* Get a Quote Action Button (Matches Image 2) */}
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSearchParams({ step: '1' })}
                      className="py-3.5 px-4 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-sm transition cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#6366F1] to-[#A855F7] hover:from-[#4F46E5] hover:to-[#9333EA] text-white font-bold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <span>Generating Quotation...</span>
                      ) : (
                        <>
                          <span>Get a Quote</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}

            </div>

          </div>

          {/* 3. BOTTOM TRUST BAR (Matches Image 2) */}
          <div className="bg-slate-50/80 border-t border-slate-100 p-4 sm:p-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center sm:text-left">
              
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-amber-500 flex items-center justify-center shadow-2xs shrink-0">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900">4.8 ★★★★★</div>
                  <div className="text-[11px] text-slate-500">Verified Reviews</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-[#0B1E36] flex items-center justify-center shadow-2xs shrink-0">
                  <Award className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900">15+ Years</div>
                  <div className="text-[11px] text-slate-500">Industry Leadership</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-emerald-600 flex items-center justify-center shadow-2xs shrink-0">
                  <Users className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900">2 Lakh+ Clients</div>
                  <div className="text-[11px] text-slate-500">Trusted across India</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-blue-600 flex items-center justify-center shadow-2xs shrink-0">
                  <Activity className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900">Live ARN Tracking</div>
                  <div className="text-[11px] text-slate-500">CA Verified Status</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
