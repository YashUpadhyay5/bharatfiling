import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Check,
  Gift,
  ChevronRight,
  User,
  Sparkles,
} from 'lucide-react';
import { TESTIMONIALS } from './constants.js';

export default function UdyamLandingPage({
  initialData = {},
  onGetStarted,
}) {
  const [formData, setFormData] = useState({
    email: initialData.email || '',
    phone: initialData.phone || '',
    cityPincode: initialData.cityPincode || '',
    whatsappOptIn: initialData.whatsappOptIn !== false,
  });

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-rotate testimonials every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    const cleanEmail = (formData.email || '').trim();
    const cleanPhone = (formData.phone || '').replace(/\D/g, '');
    const cleanCity = (formData.cityPincode || '').trim();

    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!cleanPhone || cleanPhone.length !== 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (!cleanCity) {
      newErrors.cityPincode = 'Please enter your city or pincode';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const leadPayload = {
      email: cleanEmail,
      phone: cleanPhone,
      cityPincode: cleanCity,
      whatsappOptIn: formData.whatsappOptIn,
    };

    // Store in draft without forcing any login or registration
    try {
      const existing = localStorage.getItem('bharatfiling_udyam_draft');
      const parsed = existing ? JSON.parse(existing) : {};
      localStorage.setItem(
        'bharatfiling_udyam_draft',
        JSON.stringify({ ...parsed, ...leadPayload })
      );
    } catch {
      // Ignore localStorage quota
    }

    if (onGetStarted) {
      onGetStarted(leadPayload);
    }
  };

  const testimonial = TESTIMONIALS[activeTestimonial] || TESTIMONIALS[0];

  return (
    <div className="relative min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
      {/* Delicate diagonal background stripes in top-right as seen in the clone image */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 w-[55vw] h-[450px] opacity-40 select-none z-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #f1f5f9 0, #f1f5f9 2px, transparent 2px, transparent 18px)',
        }}
      />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-16">
        {/* Breadcrumb Navigation: Home > Udyam Registration */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-slate-900 transition underline-offset-2">
            Home
          </Link>
          <span className="text-slate-400 select-none">&gt;</span>
          <span className="text-slate-800 font-medium select-none">Udyam Registration</span>
        </nav>

        {/* Hero 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          {/* LEFT COLUMN: Headings, ISO Badge, Bullets, Testimonial (7 cols) */}
          <div className="lg:col-span-7 space-y-6 pt-2">
            
            {/* Glowing ISO 27001 Certified Platform Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-50/80 border border-blue-200/80 text-slate-800 shadow-xs">
              <div className="w-5 h-5 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(29,78,216,0.45)]">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <span className="text-xs sm:text-sm font-bold tracking-tight">
                Only ISO 27001 Certified Platform in{' '}
                <span role="img" aria-label="India Flag" className="text-base align-middle">
                  🇮🇳
                </span>
              </span>
            </div>

            {/* Main Page Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#042D50] tracking-tight leading-[1.15]">
              Udyam Registration
            </h1>

            {/* 3 Value Propositions with Blue Checkmarks */}
            <div className="space-y-3.5 pt-1">
              {/* Bullet 1 */}
              <div className="flex items-start gap-3">
                <div className="text-[#0066FF] shrink-0 mt-0.5">
                  <svg className="w-5 h-5 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  Online Udyam registration done by experts with timely delivery of your Udyog Aadhar{' '}
                  <span className="text-blue-600 cursor-pointer underline-offset-2 hover:underline">
                    T&amp;C*
                  </span>
                </p>
              </div>

              {/* Bullet 2 */}
              <div className="flex items-start gap-3">
                <div className="text-[#0066FF] shrink-0 mt-0.5">
                  <svg className="w-5 h-5 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  100% online process with quick filing and processing—save time and avoid hassles
                </p>
              </div>

              {/* Bullet 3 */}
              <div className="flex items-start gap-3">
                <div className="text-[#0066FF] shrink-0 mt-0.5">
                  <svg className="w-5 h-5 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  Get expert support at every step to ensure smooth and compliant registration (T&amp;C apply)
                </p>
              </div>
            </div>

            {/* Testimonial Card Carousel (Exact clone of Image 1) */}
            <div className="pt-4 max-w-xl">
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all">
                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                <div className="mt-4 flex items-center gap-3 pt-3 border-t border-slate-100">
                  <div className="w-9 h-9 rounded-full bg-slate-300 text-slate-600 flex items-center justify-center font-bold text-xs shrink-0 select-none">
                    <User className="w-4 h-4 text-slate-600" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                      {testimonial.name}
                    </div>
                    <div className="text-[11px] text-slate-500 font-normal">
                      {testimonial.role} &bull; {testimonial.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Carousel Indicator Dots */}
              <div className="flex items-center justify-center gap-1.5 mt-3 select-none">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveTestimonial(idx)}
                    aria-label={`Show testimonial ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      activeTestimonial === idx ? 'w-6 bg-slate-700' : 'w-3 bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Lead Intake Card (5 cols) */}
          <div className="lg:col-span-5 relative w-full max-w-[420px] mx-auto lg:ml-auto">
            
            {/* Festive Sale Offer Badge (Overhanging top-left ribbon) */}
            <div className="absolute -top-3.5 left-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-md bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 text-white shadow-md text-[11px] font-extrabold tracking-wide uppercase select-none">
              <span className="text-xs">🪔</span>
              <span>Festive Sale Offer</span>
              <span className="text-xs">✨</span>
            </div>

            {/* The White Elevated Card */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_15px_45px_rgba(0,0,0,0.08)] p-6 sm:p-8 pt-9 relative">
              
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 text-center mb-6">
                Get Legal Assistance
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Field 1: Email */}
                <div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="Email"
                    className={`w-full px-4 py-3 rounded-lg bg-white border text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition ${
                      errors.email
                        ? 'border-rose-500 focus:border-rose-500 ring-1 ring-rose-500'
                        : 'border-slate-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-400'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-[11px] text-rose-600 font-medium">{errors.email}</p>
                  )}
                </div>

                {/* Field 2: Mobile Number */}
                <div>
                  <input
                    type="tel"
                    maxLength={10}
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value.replace(/\D/g, ''))}
                    placeholder="Mobile Number"
                    className={`w-full px-4 py-3 rounded-lg bg-white border text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition ${
                      errors.phone
                        ? 'border-rose-500 focus:border-rose-500 ring-1 ring-rose-500'
                        : 'border-slate-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-400'
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-[11px] text-rose-600 font-medium">{errors.phone}</p>
                  )}
                </div>

                {/* Field 3: City / Pincode */}
                <div>
                  <input
                    type="text"
                    value={formData.cityPincode}
                    onChange={(e) => handleChange('cityPincode', e.target.value)}
                    placeholder="City/Pincode"
                    className={`w-full px-4 py-3 rounded-lg bg-white border text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition ${
                      errors.cityPincode
                        ? 'border-rose-500 focus:border-rose-500 ring-1 ring-rose-500'
                        : 'border-slate-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-400'
                    }`}
                  />
                  {errors.cityPincode && (
                    <p className="mt-1 text-[11px] text-rose-600 font-medium">{errors.cityPincode}</p>
                  )}
                </div>

                {/* WhatsApp Opt-in Row with Green Toggle */}
                <div className="flex items-center justify-between pt-1 select-none">
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 font-normal">
                    <span>Get easy updates through</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-slate-800">
                      <svg className="w-4 h-4 fill-[#25D366]" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                      </svg>
                      Whatsapp
                    </span>
                  </div>

                  {/* Toggle button */}
                  <button
                    type="button"
                    role="switch"
                    aria-checked={formData.whatsappOptIn}
                    onClick={() => handleChange('whatsappOptIn', !formData.whatsappOptIn)}
                    className={`w-10 h-6 rounded-full p-0.5 transition-colors cursor-pointer flex items-center ${
                      formData.whatsappOptIn ? 'bg-[#25D366]' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                        formData.whatsappOptIn ? 'transform translate-x-4' : 'transform translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Primary Button: Get Started (No login or registration popup!) */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-lg bg-[#002B49] hover:bg-[#06385d] active:scale-[0.99] text-white font-bold text-sm sm:text-base tracking-wide transition shadow-sm cursor-pointer disabled:opacity-75 flex items-center justify-center gap-2"
                >
                  <span>{isSubmitting ? 'Starting...' : 'Get Started'}</span>
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Yellow Tab on Viewport Edge: Refer a Friend (as in Image 1) */}
      <aside
        aria-label="Refer a Friend"
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-center gap-2 py-4 px-1.5 bg-[#FFD200] hover:bg-[#FACC15] text-slate-900 rounded-l-lg shadow-lg cursor-pointer transition select-none group"
        onClick={() => {
          navigator.clipboard?.writeText(window.location.href);
          alert('Link copied! Share BharatFiling with friends to earn rewards.');
        }}
      >
        <Gift className="w-4 h-4 text-slate-900 group-hover:scale-110 transition-transform" />
        <span
          className="text-[11px] font-bold tracking-wider uppercase text-slate-900"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Refer a friend
        </span>
      </aside>
    </div>
  );
}
