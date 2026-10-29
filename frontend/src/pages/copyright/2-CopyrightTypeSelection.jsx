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
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between font-sans selection:bg-[#002B49] selection:text-white">
      {/* ========================================================= */}
      {/* 1. TOP HEADER (1:1 with media_1793296763791_c0b8c808.png)  */}
      {/* ========================================================= */}
      <div>
        <header className="bg-white px-4 sm:px-8 py-3.5 z-20">
          <div className="max-w-[1280px] mx-auto flex items-center justify-between">
            {/* VAKIL SEARCH Logo */}
            <div className="flex items-center select-none cursor-pointer">
              <span className="bg-[#FECB00] text-black font-extrabold px-2.5 py-0.5 tracking-tight text-lg sm:text-[19px] leading-snug">
                VAKIL
              </span>
              <span className="text-black font-extrabold ml-1.5 tracking-tight text-lg sm:text-[19px] leading-snug">
                SEARCH
              </span>
            </div>

            {/* 1/1 Step Indicator */}
            <div className="text-slate-400 font-medium text-xs sm:text-sm tracking-wider">
              1/1
            </div>
          </div>
        </header>

        {/* Full-width dark navy line under navbar */}
        <div className="w-full h-[2.5px] bg-[#0b1c3d]" />

        {/* ========================================================= */}
        {/* 2. MAIN TWO-COLUMN BODY                                   */}
        {/* ========================================================= */}
        <main className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 pt-8 sm:pt-10 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            {/* LEFT COLUMN: Question & Radio Cards */}
            <div className="lg:col-span-7 xl:col-span-7">
              <h1 className="text-2xl sm:text-[27px] font-bold text-slate-900 tracking-tight leading-snug mb-7">
                Select the{' '}
                <span className="text-[#0275d8] font-bold">type of work</span> you
                are trying to copyright
              </h1>

              {/* Radio Options List */}
              <div className="space-y-4">
                {COPYRIGHT_ONBOARDING_TYPES.map((type) => {
                  const isSelected = selectedType === type.id;
                  return (
                    <div
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`p-4 sm:p-5 rounded-md border transition-all cursor-pointer flex items-start gap-4 ${
                        isSelected
                          ? 'border-[1.8px] border-[#0b1c3d] bg-white shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      {/* Radio circle */}
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-1 transition-colors ${
                          isSelected
                            ? 'border-[1.8px] border-[#0b1c3d]'
                            : 'border-[1.5px] border-slate-300'
                        }`}
                      >
                        {isSelected && (
                          <div className="w-2 h-2 rounded-full bg-[#0b1c3d]" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h2 className="text-[15px] font-bold text-slate-900 leading-snug">
                          {type.title}
                        </h2>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                          {type.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT COLUMN: Expert Attorney Assistance Card */}
            <div className="lg:col-span-5 xl:col-span-5 lg:pt-1">
              <div className="bg-[#f0f7ff] border border-[#bfdbfe] rounded-2xl p-6 relative shadow-2xs">
                {/* Subtle top-right upward caret indicator matching screenshot */}
                <div className="absolute top-2.5 right-3 text-slate-400">
                  <span className="text-[11px] leading-none text-slate-400 select-none">
                    ▲
                  </span>
                </div>

                {/* Avatar + Title */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-xs shrink-0 bg-slate-300">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=140&h=140&q=80"
                      alt="IP Attorney"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-tight">
                      {COPYRIGHT_ATTORNEY_CARD.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {COPYRIGHT_ATTORNEY_CARD.title}
                    </p>
                  </div>
                </div>

                {/* Description body (verbatim match with media_1793296763791_c0b8c808.png) */}
                <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed">
                  I&apos;m{' '}
                  <strong className="font-bold text-slate-900">
                    {COPYRIGHT_ATTORNEY_CARD.name}
                  </strong>
                  , your IP Attorney with over{' '}
                  <strong className="font-bold text-slate-900">
                    6+ years of experience!
                  </strong>{' '}
                  in Intellectual Property. I&apos;ll be assisting you with your IP
                  registrations process end-to-end . Simply fill in the basic
                  details and complete the payment to get started.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ========================================================= */}
      {/* 3. STICKY BOTTOM ACTION BAR (1:1 with Screenshot)         */}
      {/* ========================================================= */}
      <footer className="w-full bg-white py-4 px-4 sm:px-12 z-30 flex items-center justify-end">
        <button
          type="button"
          onClick={handleNext}
          className="bg-[#0b1c3d] hover:bg-[#142852] active:scale-[0.99] text-white font-medium text-sm px-11 py-2.5 rounded transition-all shadow-sm cursor-pointer inline-flex items-center gap-2"
        >
          <span>Next</span>
          <span className="text-base leading-none">→</span>
        </button>
      </footer>
    </div>
  );
}
