import React, { useState } from 'react';
import {
  Users,
  Check,
  ShieldCheck,
  ArrowRight,
  PhoneCall,
} from 'lucide-react';

export default function IecCheckoutPage({
  formData = {},
  onSelectPlan,
  onBack,
}) {
  // Selected option: 'iec_registration' (default) or 'talk_to_expert'
  const [selectedOption, setSelectedOption] = useState('iec_registration');
  const [showExpertSuccess, setShowExpertSuccess] = useState(false);

  const handleProceed = () => {
    if (selectedOption === 'iec_registration') {
      if (onSelectPlan) {
        onSelectPlan('starter'); // Maps to ₹1499 plan in constants.js
      }
    } else {
      setShowExpertSuccess(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col justify-between py-6 sm:py-10 px-4 sm:px-6">
      
      {/* Top Header */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between pb-6">
        <div className="flex items-center gap-2">
          <img
            src="/bharatfiling-user-logo.png"
            alt="BharatFiling"
            className="h-8 sm:h-9 w-auto object-contain cursor-pointer"
            onClick={onBack}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/bharatfiling-horizontal-transparent.png';
            }}
          />
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>100% Secure DGFT Processing</span>
        </div>
      </header>

      {/* Main Centered White Card (1:1 VAKILSEARCH CLONE OF MEDIA_1792938513512_9a26cc3f.PNG) */}
      <main className="max-w-md w-full mx-auto my-auto">
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl p-6 sm:p-8 space-y-6">
          
          {/* Centered Brand Logo */}
          <div className="flex justify-center">
            <img
              src="/bharatfiling-user-logo.png"
              alt="BharatFiling"
              className="h-8 sm:h-9 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/bharatfiling-horizontal-transparent.png';
              }}
            />
          </div>

          {/* Page Title */}
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-black text-[#002B49] tracking-tight">
              IEC registration
            </h1>
          </div>

          {/* Option 1: Start my IEC registration (Recommended Card) */}
          <div className="pt-2">
            {/* Gold Recommended Badge */}
            <div className="inline-block bg-[#E5B54F] text-slate-900 text-[11px] font-bold px-2.5 py-0.5 rounded-t-md shadow-2xs select-none">
              ★ Recommended
            </div>

            {/* Card Frame */}
            <div
              onClick={() => setSelectedOption('iec_registration')}
              className={`rounded-xl border-2 transition-all p-5 sm:p-6 bg-white cursor-pointer select-none space-y-4 ${
                selectedOption === 'iec_registration'
                  ? 'border-[#002B49] ring-1 ring-[#002B49]/15 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Header with Title and Radio */}
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-base font-bold text-slate-900">
                  Start my IEC registration
                </h2>
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                    selectedOption === 'iec_registration'
                      ? 'border-[#002B49]'
                      : 'border-slate-400'
                  }`}
                >
                  {selectedOption === 'iec_registration' && (
                    <div className="w-2 h-2 rounded-full bg-[#002B49]" />
                  )}
                </div>
              </div>

              {/* Price row */}
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-semibold text-slate-400 line-through">
                  ₹1999
                </span>
                <span className="text-2xl sm:text-3xl font-black text-[#002B49]">
                  ₹1499
                </span>
              </div>

              {/* Green discount badge */}
              <div>
                <span className="inline-block bg-[#22C55E] text-white text-[11px] font-extrabold px-2.5 py-1 rounded shadow-2xs">
                  Exclusive ₹500 off for online payment
                </span>
              </div>

              {/* Checkpoints list */}
              <div className="space-y-2 pt-1 text-xs text-slate-700">
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-slate-700 shrink-0 mt-0.5 stroke-[2.5]" />
                  <span>Quick IEC registration in 7 days</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-slate-700 shrink-0 mt-0.5 stroke-[2.5]" />
                  <span>Fully online registration process</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-slate-700 shrink-0 mt-0.5 stroke-[2.5]" />
                  <span>Track application progress update anytime, anywhere</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-slate-700 shrink-0 mt-0.5 stroke-[2.5]" />
                  <span>Get started with statutory requirements</span>
                </div>
              </div>

              {/* Bottom Social Proof Bar */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-slate-800">
                <Users className="w-4 h-4 text-slate-600" />
                <span>50+ customers preferred this today</span>
              </div>
            </div>
          </div>

          {/* Option 2: Talk to an expert first */}
          <div
            onClick={() => setSelectedOption('talk_to_expert')}
            className={`rounded-xl border transition-all p-4 bg-white flex items-center justify-between cursor-pointer select-none ${
              selectedOption === 'talk_to_expert'
                ? 'border-[#002B49] bg-blue-50/20 ring-1 ring-[#002B49]'
                : 'border-slate-300 hover:border-slate-400'
            }`}
          >
            <span className="text-sm font-bold text-slate-900">
              Talk to an expert first
            </span>
            <div
              className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                selectedOption === 'talk_to_expert'
                  ? 'border-[#002B49]'
                  : 'border-slate-400'
              }`}
            >
              {selectedOption === 'talk_to_expert' && (
                <div className="w-2 h-2 rounded-full bg-[#002B49]" />
              )}
            </div>
          </div>

          {/* Expert Call confirmation notice if chosen */}
          {showExpertSuccess && selectedOption === 'talk_to_expert' && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in">
              <PhoneCall className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Our IEC Senior Advisor will call you shortly on your provided mobile number.
              </span>
            </div>
          )}

          {/* Terms note */}
          <div className="text-center pt-2">
            <p className="text-[11px] text-slate-500">
              By continuing you agree to our{' '}
              <a
                href="/terms"
                target="_blank"
                rel="noreferrer"
                className="underline text-slate-700 hover:text-slate-900 font-medium"
              >
                T&amp;C
              </a>
            </p>
          </div>

          {/* Action CTA Button */}
          <div>
            <button
              type="button"
              onClick={handleProceed}
              className="w-full py-3.5 px-6 rounded-md bg-[#002B49] hover:bg-[#073866] active:scale-[0.99] text-white font-black text-sm sm:text-base tracking-wide transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>
                {selectedOption === 'iec_registration'
                  ? 'Proceed to Pay'
                  : 'Request Call with Expert'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </main>

      {/* Footer subtle text */}
      <footer className="max-w-6xl w-full mx-auto text-center pt-8 text-[11px] text-slate-400">
        &copy; {new Date().getFullYear()} BharatFiling &bull; ISO 27001 Certified Statutory Filing Desk &bull; All Rights Reserved
      </footer>

    </div>
  );
}
