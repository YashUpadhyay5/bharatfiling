import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Check, Gift, X } from 'lucide-react';
import { useToast } from '../../context/ToastContext.jsx';
import { TRUSTED_PARTNERS } from '../shop-establishment/constants.js';
import { ContentSection, FaqSection } from './sections.jsx';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_RE = /^[6-9]\d{9}$/;

const LEAD_FIELDS = [
  { id: 'email', type: 'email', placeholder: 'Email', autoComplete: 'email' },
  { id: 'phone', type: 'tel', placeholder: 'Mobile Number', autoComplete: 'tel-national', inputMode: 'numeric', maxLength: 10 },
  { id: 'cityPincode', type: 'text', placeholder: 'City/Pincode', autoComplete: 'address-level2' },
];

function validateLead(lead) {
  const errors = {};
  if (!EMAIL_RE.test(lead.email.trim())) errors.email = 'Enter a valid email address';
  if (!MOBILE_RE.test(lead.phone)) errors.phone = 'Enter a valid 10-digit mobile number';
  if (!lead.cityPincode.trim()) errors.cityPincode = 'Enter your city or pincode';
  return errors;
}

export default function LandingPage({ config, initialData, onGetStarted }) {
  const { showError, showSuccess } = useToast();
  const { hero } = config;
  const formRef = useRef(null);

  const [lead, setLead] = useState({
    email: initialData.email || '',
    phone: initialData.phone || '',
    cityPincode: initialData.cityPincode || '',
  });
  const [whatsappOptIn, setWhatsappOptIn] = useState(initialData.whatsappOptIn !== false);
  const [errors, setErrors] = useState({});
  const [showReferModal, setShowReferModal] = useState(false);

  const startingPrice = Math.min(...config.plans.items.map((p) => p.price));

  const updateField = (id, raw) => {
    const value = id === 'phone' ? raw.replace(/\D/g, '') : raw;
    setLead((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validateLead(lead);
    setErrors(nextErrors);
    const firstInvalid = LEAD_FIELDS.find((f) => nextErrors[f.id]);
    if (firstInvalid) {
      document.getElementById(`gst-lead-${firstInvalid.id}`)?.focus();
      return;
    }
    onGetStarted({
      email: lead.email.trim(),
      phone: lead.phone,
      cityPincode: lead.cityPincode.trim(),
      whatsappOptIn,
    });
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    document.getElementById('gst-lead-email')?.focus({ preventScroll: true });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      {/* HERO */}
      <section className="relative bg-gradient-to-b from-[#F7FAFD] via-white to-white pt-8 pb-14 border-b border-slate-200 overflow-hidden">
        <button
          type="button"
          onClick={() => setShowReferModal(true)}
          className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-amber-400 hover:bg-amber-500 text-slate-900 font-semibold px-2 py-4 rounded-l-lg shadow-lg flex-col items-center gap-2 cursor-pointer transition"
          style={{ writingMode: 'vertical-rl' }}
        >
          <Gift className="w-4 h-4 text-slate-900 rotate-90" aria-hidden="true" />
          <span className="text-xs tracking-wider">Refer a friend</span>
        </button>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-slate-700 mb-6">
            <Link to="/" className="underline underline-offset-2 hover:text-[#002B49]">Home</Link>
            <span aria-hidden="true">&gt;</span>
            <Link to="/services/gst-registration" className="underline underline-offset-2 hover:text-[#002B49]">GST</Link>
            <span aria-hidden="true">&gt;</span>
            <span aria-current="page">{config.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2.5 bg-white border border-blue-200 rounded-full px-3.5 py-1.5 shadow-2xs">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-[#0052CC] flex items-center justify-center text-white">
                  <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-800 tracking-tight">
                  Only ISO 27001 Certified Platform in <span className="inline-block text-base">🇮🇳</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#022B50] leading-tight tracking-tight">
                {hero.title}
              </h1>

              {hero.intro && (
                <div className="max-w-2xl rounded-xl border border-slate-200 bg-white p-5 text-sm sm:text-base text-slate-700 leading-relaxed space-y-4">
                  <p>{hero.intro}</p>
                  <p>
                    Reviewed by <span className="text-[#0052CC] font-medium">BharatFiling CA team</span>, GST &amp; compliance experts
                  </p>
                </div>
              )}

              <div className="space-y-3">
                {hero.points.map((line) => (
                  <div key={line} className="flex items-start gap-3">
                    <Check className="w-5 h-5 mt-0.5 stroke-[2.5] text-[#022B50] flex-shrink-0" aria-hidden="true" />
                    <p className="text-sm sm:text-base text-[#002F5F] leading-snug">{line}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 relative mt-4 lg:mt-0" ref={formRef}>
              <div className="absolute -top-4 left-6 z-20 flex items-center gap-1.5 bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 text-white text-[11px] sm:text-xs font-bold px-3 py-1 rounded shadow-md -rotate-1">
                <span className="text-base" aria-hidden="true">🪔</span>
                <span>Diwali Festive Sale Offer</span>
                <span className="text-xs" aria-hidden="true">✨</span>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl p-6 sm:p-8 pt-9">
                <h2 className="text-xl sm:text-2xl font-bold text-[#022B50] text-center mb-5">{hero.formTitle}</h2>
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {LEAD_FIELDS.map((field) => {
                    const error = errors[field.id];
                    return (
                      <div key={field.id}>
                        <input
                          id={`gst-lead-${field.id}`}
                          type={field.type}
                          inputMode={field.inputMode}
                          maxLength={field.maxLength}
                          autoComplete={field.autoComplete}
                          placeholder={field.placeholder}
                          aria-label={field.placeholder}
                          aria-invalid={Boolean(error)}
                          aria-describedby={error ? `gst-lead-${field.id}-error` : undefined}
                          value={lead[field.id]}
                          onChange={(e) => updateField(field.id, e.target.value)}
                          className={`w-full px-4 py-3 rounded-lg border text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:ring-2 ${
                            error
                              ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                              : 'border-slate-300 focus:border-[#002B49] focus:ring-blue-100'
                          }`}
                        />
                        {error && (
                          <p id={`gst-lead-${field.id}-error`} className="mt-1 text-xs text-red-600">
                            {error}
                          </p>
                        )}
                      </div>
                    );
                  })}

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-slate-600 flex items-center gap-1.5">
                      Get easy updates through
                      <span className="text-[#25D366] font-semibold">Whatsapp</span>
                    </span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={whatsappOptIn}
                      aria-label="WhatsApp updates"
                      onClick={() => setWhatsappOptIn(!whatsappOptIn)}
                      className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                        whatsappOptIn ? 'bg-[#25D366]' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transition ${
                          whatsappOptIn ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#022B50] hover:bg-[#001D38] text-white font-semibold py-3.5 px-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer text-base"
                  >
                    Get Started
                  </button>
                  <p className="text-[11px] text-center text-slate-400">
                    🔒 SSL Encrypted &bull; 100% Confidential &bull; ISO 27001 Certified
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED PARTNERS */}
      <section className="py-10 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-[#022B50] tracking-tight mb-8">Trusted Partners</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 opacity-80">
            {TRUSTED_PARTNERS.map((p) => (
              <div key={p.name} className="bg-white py-3 px-4 rounded-lg border border-slate-200 flex items-center justify-center h-14">
                <span className="font-bold text-slate-700 text-sm tracking-wide">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {config.sections.map((section, i) => (
        <ContentSection key={section.title.join('')} section={section} tone={i % 2 ? 'tint' : 'white'} />
      ))}

      <FaqSection faqs={config.faqs} />

      {/* MOBILE CTA */}
      {/* pr-20 keeps the button clear of the site-wide chat bubble in the bottom-right corner */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-3 pr-20 shadow-lg z-30 flex items-center justify-between">
        <div>
          <div className="text-xs font-bold text-slate-900">{config.name}</div>
          <div className="text-[11px] text-emerald-600 font-semibold">Starts @ ₹{startingPrice.toLocaleString('en-IN')}</div>
        </div>
        <button onClick={scrollToForm} className="bg-[#022B50] text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer shadow">
          Get Started
        </button>
      </div>

      {showReferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" role="dialog" aria-modal="true" aria-labelledby="gst-refer-title">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowReferModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-2 text-amber-600">
              <Gift className="w-6 h-6" aria-hidden="true" />
              <h3 id="gst-refer-title" className="text-base font-bold text-slate-900">Refer a Friend</h3>
            </div>
            <p className="text-xs text-slate-600 mb-4">{config.referText}</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  navigator.clipboard
                    .writeText(window.location.origin + window.location.pathname)
                    .then(() => showSuccess('Link copied to clipboard!'))
                    .catch(() => showError('Could not copy the link'));
                }}
                className="border border-slate-300 text-slate-700 text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer"
              >
                Copy Link
              </button>
              <button
                onClick={() => setShowReferModal(false)}
                className="bg-[#022B50] text-white text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
