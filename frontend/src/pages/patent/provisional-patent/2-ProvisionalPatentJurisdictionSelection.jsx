import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Check } from 'lucide-react';
import {
  PROVISIONAL_PATENT_ONBOARDING_LEFT_BENEFITS,
  PATENT_COUNTRIES_LIST,
} from './constants.js';

export default function ProvisionalPatentJurisdictionSelection({
  formData = {},
  onBack,
  onProceed,
}) {
  // In screenshot media_1793358166819_dfe8a923.png, 'international' is selected by default!
  const [jurisdictionType, setJurisdictionType] = useState(
    formData.jurisdictionType || 'international'
  );

  // Selected country: empty by default until specific country is selected
  const [selectedCountry, setSelectedCountry] = useState(
    formData.targetCountry || 'India'
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCountries = PATENT_COUNTRIES_LIST.filter((c) =>
    c.name.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const handleNext = (e) => {
    if (e) e.preventDefault();
    if (jurisdictionType === 'specific' && !selectedCountry) {
      return;
    }
    if (!jurisdictionType) {
      return;
    }

    if (onProceed) {
      onProceed({
        ...formData,
        jurisdictionType,
        targetCountry:
          jurisdictionType === 'specific'
            ? selectedCountry
            : 'International (PCT/WIPO)',
        step: 3,
      });
    }
  };

  const isFormValid =
    jurisdictionType === 'international' ||
    (jurisdictionType === 'specific' && Boolean(selectedCountry));

  return (
    <div className="min-h-screen bg-[#F6F8FA] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-10 relative overflow-hidden font-sans selection:bg-[#002B49] selection:text-white">
      
      {/* Decorative Stepped Corner Accents (1:1 with Screenshot) */}
      <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none opacity-25">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-slate-300">
          <path d="M100 0 H60 V20 H40 V40 H20 V60 H0 V100 H100 Z" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-32 h-32 pointer-events-none opacity-25">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-slate-300">
          <path d="M0 100 H40 V80 H60 V60 H80 V40 H100 V0 H0 Z" fill="currentColor" />
        </svg>
      </div>

      {/* Main Centered Onboarding Box (1:1 with media_1793358166819_dfe8a923.png) */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-sm border border-slate-200/90 overflow-hidden relative z-10 my-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[490px]">
          
          {/* ========================================================= */}
          {/* LEFT COLUMN: 1 Lakh+ Applications & Value Props (5 cols)  */}
          {/* ========================================================= */}
          <div className="md:col-span-5 p-8 sm:p-10 flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-100 bg-white">
            <h1 className="text-2xl sm:text-[25px] font-extrabold text-[#002B49] tracking-tight leading-snug mb-1">
              1 Lakh+ <span className="text-slate-600 font-bold text-xl sm:text-2xl">Successful Provisional Applications Filed</span>
            </h1>
            <p className="text-sm text-slate-600 mb-8 font-normal">
              {PROVISIONAL_PATENT_ONBOARDING_LEFT_BENEFITS.subheading}
            </p>

            <ul className="space-y-6">
              {PROVISIONAL_PATENT_ONBOARDING_LEFT_BENEFITS.bullets.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3.5">
                  <div className="shrink-0 mt-0.5">
                    <div className="w-5 h-5 rounded-full border-[1.5px] border-[#0275d8] text-[#0275d8] flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-800 leading-tight">
                      {item.title}
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Question & Selection Box (7 cols)           */}
          {/* ========================================================= */}
          <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-center bg-white relative">
            
            {/* Scroll Indicator Arrow Up at top-right (matching screenshot) */}
            <div className="absolute top-8 right-8 text-slate-400 select-none text-xs">
              ▲
            </div>

            <div className="w-full max-w-md mx-auto">
              {/* Inner Card Container */}
              <div className="rounded-xl border border-slate-200/90 p-6 sm:p-7 shadow-2xs relative bg-white">
                
                {/* Brand Logo Banner: VAKIL SEARCH matching screenshot */}
                <div className="flex items-center justify-center mb-6 select-none">
                  <div className="flex items-center">
                    <span className="bg-[#FECB00] text-black font-extrabold px-2 py-0.5 tracking-tight text-sm leading-none rounded-xs">
                      VAKIL
                    </span>
                    <span className="text-black font-extrabold ml-1 tracking-tight text-sm leading-none">
                      SEARCH
                    </span>
                  </div>
                </div>

                {/* Question Title (1:1 with Screenshot) */}
                <h2 className="text-sm sm:text-[15px] font-bold text-slate-900 leading-snug mb-5">
                  Are you looking for international patent protection or just within a specific country or region?
                </h2>

                {/* Radio Option 1: International (Selected by default in screenshot) */}
                <div
                  onClick={() => {
                    setJurisdictionType('international');
                    setIsDropdownOpen(false);
                  }}
                  className={`p-3.5 rounded-lg border transition-all cursor-pointer flex items-center gap-3.5 mb-3.5 ${
                    jurisdictionType === 'international'
                      ? 'border-[1.8px] border-[#002B49] bg-[#eef4f8] shadow-2xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      jurisdictionType === 'international'
                        ? 'border-[1.8px] border-[#002B49]'
                        : 'border-[1.5px] border-slate-300'
                    }`}
                  >
                    {jurisdictionType === 'international' && (
                      <div className="w-2 h-2 rounded-full bg-[#002B49]" />
                    )}
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">
                    International
                  </span>
                </div>

                {/* Radio Option 2: Specific Country */}
                <div
                  onClick={() => {
                    setJurisdictionType('specific');
                  }}
                  className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                    jurisdictionType === 'specific'
                      ? 'border-[1.8px] border-[#002B49] bg-white shadow-2xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className={`flex items-center gap-3.5 ${jurisdictionType === 'specific' ? 'mb-2.5' : ''}`}>
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        jurisdictionType === 'specific'
                          ? 'border-[1.8px] border-[#002B49]'
                          : 'border-[1.5px] border-slate-300'
                      }`}
                    >
                      {jurisdictionType === 'specific' && (
                        <div className="w-2 h-2 rounded-full bg-[#002B49]" />
                      )}
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-800">
                      Specific Country
                    </span>
                  </div>

                  {/* Dropdown Field appears when Specific Country is clicked */}
                  {jurisdictionType === 'specific' && (
                    <div className="pl-7 relative" ref={dropdownRef}>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsDropdownOpen(!isDropdownOpen);
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-md text-slate-800 hover:border-slate-400 focus:outline-none focus:ring-1 focus:ring-[#002B49] transition-all cursor-pointer"
                      >
                        <span className="truncate">
                          {selectedCountry ? (
                            <span className="font-medium text-slate-800">
                              {selectedCountry}
                            </span>
                          ) : (
                            <span className="text-slate-400 font-normal">
                              Search or select country
                            </span>
                          )}
                        </span>
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                      </button>

                      {/* Dropdown Menu */}
                      {isDropdownOpen && (
                        <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-30 max-h-56 overflow-y-auto">
                          <div className="p-2 border-b border-slate-100 sticky top-0 bg-white z-10">
                            <div className="relative">
                              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                              <input
                                type="text"
                                value={countrySearch}
                                onChange={(e) => setCountrySearch(e.target.value)}
                                placeholder="Search country..."
                                className="w-full pl-8 pr-2 py-1 text-xs border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-[#002B49]"
                                autoFocus
                              />
                            </div>
                          </div>
                          <div className="py-1">
                            {filteredCountries.map((c) => (
                              <button
                                key={c.id}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedCountry(c.name);
                                  setIsDropdownOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#F5FAFF] transition-colors cursor-pointer ${
                                  selectedCountry === c.name
                                    ? 'bg-blue-50/60 font-semibold text-[#002B49]'
                                    : 'text-slate-700'
                                }`}
                              >
                                <span>{c.name}</span>
                                {selectedCountry === c.name && (
                                  <Check className="w-3.5 h-3.5 text-[#002B49]" />
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

              </div>

              {/* Bottom Actions Row with Next Button matching screenshot */}
              <div className="mt-6 flex items-center justify-between">
                {onBack ? (
                  <button
                    type="button"
                    onClick={onBack}
                    className="text-xs text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
                  >
                    ← Back
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!isFormValid}
                  className={`py-3 px-8 rounded-lg text-sm font-bold tracking-wide transition-all shadow-md flex items-center gap-2 cursor-pointer ${
                    isFormValid
                      ? 'bg-[#002B49] hover:bg-[#001D33] text-white hover:shadow-lg'
                      : 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
                  }`}
                >
                  <span>Next</span>
                  <span>→</span>
                </button>
              </div>

            </div>

            {/* Scroll Indicator Arrow Down at bottom-right (matching screenshot) */}
            <div className="absolute bottom-8 right-8 text-slate-400 select-none text-xs">
              ▼
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
