import React, { useState } from 'react';
import { COPYRIGHT_ONBOARDING_TYPES, COPYRIGHT_ATTORNEY_CARD } from './constants.js';

export default function CopyrightTypeSelection({
  formData = {},
  onBack,
  onProceed,
}) {
  // Default selected is 'software' matching media_1793296763791_c0b8c808.png
  const [selectedType, setSelectedType] = useState(
    formData.category || 'software'
  );

  const handleNext = (e) => {
    if (e) e.preventDefault();
    const activeOption =
      COPYRIGHT_ONBOARDING_TYPES.find((t) => t.id === selectedType) ||
      COPYRIGHT_ONBOARDING_TYPES[1];

    if (onProceed) {
      onProceed({
        ...formData,
        category: selectedType,
        categoryTitle: activeOption.title,
        workTitle: formData.workTitle || activeOption.defaultWorkTitle,
        categoryCode: activeOption.categoryCode,
      });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-[#002B49] selection:text-white">
      {/* ========================================================= */}
      {/* 1. TOP HEADER (1:1 with media_1793296763791_c0b8c808.png)  */}
      {/* ========================================================= */}
      <header className="bg-white border-b-2 border-[#0b1c3d] px-4 sm:px-8 py-3.5 z-20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* VAKIL SEARCH Logo */}
          <div className="flex items-center select-none">
            <span className="bg-[#fecb00] text-black font-extrabold px-2 py-0.5 tracking-tight text-base sm:text-lg">
              VAKIL
            </span>
            <span className="text-black font-extrabold ml-1 tracking-tight text-base sm:text-lg">
              SEARCH
            </span>
          </div>

          {/* 1/1 Step Indicator */}
          <div className="text-slate-500 font-medium text-xs sm:text-sm tracking-wide">
            1/1
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. MAIN TWO-COLUMN BODY                                   */}
      {/* ========================================================= */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN: Question & Radio Cards */}
          <div className="lg:col-span-7 xl:col-span-8">
            <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900 tracking-tight leading-snug mb-6">
              Select the{' '}
              <span className="text-[#1d4ed8] font-bold">type of work</span> you
              are trying to copyright
            </h1>

            {/* Radio Options List */}
            <div className="space-y-3.5">
              {COPYRIGHT_ONBOARDING_TYPES.map((type) => {
                const isSelected = selectedType === type.id;
                return (
                  <div
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`p-4 sm:p-5 rounded-lg border transition-all cursor-pointer flex items-start gap-4 ${
                      isSelected
                        ? 'border-2 border-[#1e3a8a] bg-white shadow-sm ring-1 ring-[#1e3a8a]/10'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    {/* Radio circle */}
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isSelected
                          ? 'border-2 border-[#1e3a8a]'
                          : 'border border-slate-300'
                      }`}
                    >
                      {isSelected && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#1e3a8a]" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        {type.title}
                      </h2>
                      <p className="text-xs sm:text-[13px] text-slate-500 mt-1 leading-relaxed">
                        {type.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Expert Attorney Assistance Card */}
          <div className="lg:col-span-5 xl:col-span-4 lg:pt-3">
            <div className="bg-[#F0F7FF] border border-[#BFDBFE] rounded-xl p-5 sm:p-6 relative shadow-sm">
              {/* Subtle top-right upward caret indicator matching screenshot */}
              <div className="absolute top-3 right-3 text-slate-400 opacity-60">
                <svg
                  width="12"
                  height="10"
                  viewBox="0 0 12 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 1L11 9H1L6 1Z" fill="#94A3B8" />
                </svg>
              </div>

              {/* Avatar + Title */}
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0 bg-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80"
                    alt="IP Attorney"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {COPYRIGHT_ATTORNEY_CARD.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {COPYRIGHT_ATTORNEY_CARD.title}
                  </p>
                </div>
              </div>

              {/* Description body */}
              <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed">
                I&apos;m{' '}
                <strong className="font-semibold text-slate-900">
                  {COPYRIGHT_ATTORNEY_CARD.name}
                </strong>
                , your IP Attorney with over{' '}
                <strong className="font-semibold text-slate-900">
                  {COPYRIGHT_ATTORNEY_CARD.experience}
                </strong>{' '}
                in Intellectual Property. I&apos;ll be assisting you with your IP
                registrations process end-to-end . Simply fill in the basic
                details and complete the payment to get started.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* ========================================================= */}
      {/* 3. STICKY BOTTOM ACTION BAR (1:1 with Screenshot)         */}
      {/* ========================================================= */}
      <footer className="sticky bottom-0 bg-white border-t border-slate-200 py-3.5 sm:py-4 px-4 sm:px-12 z-30 flex items-center justify-between">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            ← Back
          </button>
        ) : (
          <div />
        )}

        <button
          type="button"
          onClick={handleNext}
          className="bg-[#0b1c3d] hover:bg-[#152a54] active:scale-[0.99] text-white font-medium text-sm sm:text-[15px] px-8 sm:px-12 py-2.5 rounded transition-all shadow-sm cursor-pointer"
        >
          Next →
        </button>
      </footer>
    </div>
  );
}
