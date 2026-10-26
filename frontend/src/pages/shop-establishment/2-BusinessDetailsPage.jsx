import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  Check,
  ShieldCheck,
  Building,
} from 'lucide-react';

export default function BusinessDetailsPage({
  formData = {},
  onInputChange,
  onBack,
  onSubmit,
}) {
  // Sub-step inside Step 2:
  // Sub-step 1: Enter your company name (media_1793014148218_16d159da.png)
  // Sub-step 2: Do you run business in a commercial place? (media_1793014177025_4ea8413b.png)
  const [subStep, setSubStep] = useState(1);

  // Sub-step 1 State: Company / Shop Name
  const [companyName, setCompanyName] = useState(formData.companyName || '');

  // Sub-step 2 State: Commercial place ('Yes' | 'No' | '')
  const [isCommercialPlace, setIsCommercialPlace] = useState(
    formData.isCommercialPlace !== undefined ? formData.isCommercialPlace : 'Yes'
  );

  const handleNextSubStep1 = (e) => {
    if (e) e.preventDefault();
    if (onInputChange) {
      onInputChange('companyName', companyName.trim());
    }
    setSubStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSkipCompanyName = () => {
    const fallbackName = companyName.trim() || 'My Business (Pending Finalization)';
    setCompanyName(fallbackName);
    if (onInputChange) {
      onInputChange('companyName', fallbackName);
    }
    setSubStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextSubStep2 = (e) => {
    if (e) e.preventDefault();
    if (onSubmit) {
      onSubmit({
        companyName: companyName.trim() || 'My Business',
        isCommercialPlace,
      });
    }
  };

  const handleBack = () => {
    if (subStep === 2) {
      setSubStep(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (subStep === 1) {
      if (onBack) {
        onBack();
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col justify-between py-6 sm:py-12 px-4 sm:px-6 relative overflow-hidden">
      
      {/* Background Decorative Graphic Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-100/60 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main 2-Column Container (1:1 with Screenshots media_1793014148218_16d159da.png & media_1793014177025_4ea8413b.png) */}
      <main className="max-w-5xl w-full mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        
        {/* Left Column: Headlines & 3 Value Checkpoints (Identical across both sub-steps) */}
        <div className="lg:col-span-6 space-y-7 pl-2 sm:pl-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#002B49] tracking-tight leading-tight">
              35,000+{' '}
              <span className="text-slate-500 font-bold block sm:inline">
                Successful Shop &amp; Establishment Registrations
              </span>
            </h1>
          </div>

          <div className="space-y-6 pt-3">
            
            {/* Metric 1 */}
            <div className="flex items-start gap-3.5">
              <div className="w-5 h-5 rounded-full border-2 border-[#002B49] text-[#002B49] flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <div>
                <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  Shop &amp; establishment registration in under 14 days
                </p>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Expand your business without having to wait
                </p>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="flex items-start gap-3.5">
              <div className="w-5 h-5 rounded-full border-2 border-[#002B49] text-[#002B49] flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <div>
                <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  Complete assistance during office verification process
                </p>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Start business from the comfort of your home
                </p>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="flex items-start gap-3.5">
              <div className="w-5 h-5 rounded-full border-2 border-[#002B49] text-[#002B49] flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <div>
                <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  24x7 expert support
                </p>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Minimize challenges &amp; maximize productivity
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Interactive Card Form (Exact 1:1 match of Screenshots) */}
        <div className="lg:col-span-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl p-6 sm:p-9 relative">
            
            {/* Top Brand Logo Banner (BharatFiling branding) */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-1.5 font-extrabold tracking-tight text-[#002B49] text-base">
                <span className="bg-[#FFCC00] text-[#002B49] font-black px-1.5 py-0.5 rounded text-xs uppercase tracking-wider">
                  BHARAT
                </span>
                <span>FILING</span>
              </div>
            </div>

            {/* Progress Header: "1/2 complete" | "Takes less than 1 min" */}
            <div className="space-y-2 mb-8">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>{subStep === 1 ? '1/2 complete' : '2/2 complete'}</span>
                <span className="text-slate-400 font-normal">Takes less than 1 min</span>
              </div>
              
              {/* Green Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`bg-[#22C55E] h-1.5 rounded-full transition-all duration-300 ${
                    subStep === 1 ? 'w-1/2' : 'w-full'
                  }`}
                />
              </div>
            </div>

            {/* SUB-STEP 1: Enter your company name (Screenshot 1: media_1793014148218_16d159da.png) */}
            {subStep === 1 && (
              <form onSubmit={handleNextSubStep1} className="space-y-6">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">
                    Enter your company name
                  </h2>
                  
                  <div className="relative">
                    <input
                      type="text"
                      autoFocus
                      required
                      placeholder="Enter your shop or company name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-lg border border-slate-300 focus:border-[#002B49] focus:ring-2 focus:ring-blue-100 text-sm text-slate-800 placeholder-slate-400 outline-none transition"
                    />
                  </div>
                </div>

                {/* Helper Callout: "Yet to finalize your shop/company name? Don't worry, you can always do this step later! Skip it for now" */}
                <div className="flex items-start gap-3 p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
                  <div className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 mt-0.5 text-amber-500 shadow-2xs">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Yet to finalize your shop/company name? Don't worry, you can always do this step later!{' '}
                    <button
                      type="button"
                      onClick={handleSkipCompanyName}
                      className="text-[#0052CC] font-semibold underline underline-offset-2 hover:text-[#002B49] cursor-pointer"
                    >
                      Skip it for now
                    </button>
                  </p>
                </div>

                {/* Bottom Action: Next Button */}
                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#002B49] hover:bg-[#001D38] text-white font-semibold text-sm px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer flex items-center gap-2"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* SUB-STEP 2: Do you run business in a commercial place? (Screenshot 2: media_1793014177025_4ea8413b.png) */}
            {subStep === 2 && (
              <form onSubmit={handleNextSubStep2} className="space-y-6">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">
                    Do you run business in a commercial place?
                  </h2>

                  <div className="space-y-3">
                    {/* Option 1: Yes */}
                    <label
                      onClick={() => {
                        setIsCommercialPlace('Yes');
                        if (onInputChange) onInputChange('isCommercialPlace', 'Yes');
                      }}
                      className={`flex items-center gap-3.5 p-4 rounded-xl border cursor-pointer transition ${
                        isCommercialPlace === 'Yes'
                          ? 'border-[#002B49] bg-blue-50/20 shadow-2xs'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${
                        isCommercialPlace === 'Yes' ? 'border-[#002B49]' : 'border-slate-300'
                      }`}>
                        {isCommercialPlace === 'Yes' && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#002B49]" />
                        )}
                      </div>
                      <span className="text-sm font-semibold text-slate-800">Yes</span>
                    </label>

                    {/* Option 2: No */}
                    <label
                      onClick={() => {
                        setIsCommercialPlace('No');
                        if (onInputChange) onInputChange('isCommercialPlace', 'No');
                      }}
                      className={`flex items-center gap-3.5 p-4 rounded-xl border cursor-pointer transition ${
                        isCommercialPlace === 'No'
                          ? 'border-[#002B49] bg-blue-50/20 shadow-2xs'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${
                        isCommercialPlace === 'No' ? 'border-[#002B49]' : 'border-slate-300'
                      }`}>
                        {isCommercialPlace === 'No' && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#002B49]" />
                        )}
                      </div>
                      <span className="text-sm font-semibold text-slate-800">No</span>
                    </label>
                  </div>
                </div>

                {/* Bottom Actions: Back and Next Buttons (Exact from Screenshot 2) */}
                <div className="pt-2 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 font-semibold text-sm px-6 py-2.5 rounded-lg transition cursor-pointer flex items-center gap-1.5"
                  >
                    <span>&larr; Back</span>
                  </button>

                  <button
                    type="submit"
                    disabled={!isCommercialPlace}
                    className={`font-semibold text-sm px-8 py-3 rounded-lg shadow-md transition flex items-center gap-2 cursor-pointer ${
                      isCommercialPlace
                        ? 'bg-[#002B49] hover:bg-[#001D38] text-white hover:shadow-lg'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>

      </main>

      {/* Footer Trust Bar */}
      <footer className="max-w-5xl w-full mx-auto text-center pt-6 text-xs text-slate-400">
        <p>🔒 256-Bit Bank-Grade Encryption &bull; Official State Labour Department Filing &bull; ISO 27001 Certified</p>
      </footer>

    </div>
  );
}
