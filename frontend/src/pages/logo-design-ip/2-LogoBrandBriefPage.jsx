import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Palette,
  Layers,
  Shapes,
  Type,
  Shield,
  HelpCircle,
  Check,
  Building,
} from 'lucide-react';

import {
  LOGO_STYLES,
  COLOR_PALETTES,
  TRADEMARK_CLASSES,
} from './constants.js';

export default function LogoBrandBriefPage({
  initialData = {},
  onBack,
  onSaveBrief,
}) {
  const [brief, setBrief] = useState({
    brandName: initialData.brandName || '',
    tagline: initialData.tagline || '',
    industry: initialData.industry || 'Tech / SaaS',
    selectedStyle: initialData.selectedStyle || 'combination',
    selectedPalette: initialData.selectedPalette || 'corporate_blue',
    selectedClasses: initialData.selectedClasses || ['Class 9', 'Class 35'],
    inspirationNotes: initialData.inspirationNotes || '',
    isColorProtected: initialData.isColorProtected ?? false, // Black & white vs color filing
  });

  const [errors, setErrors] = useState({});

  const handleClassToggle = (classNum) => {
    setBrief((prev) => {
      const exists = prev.selectedClasses.includes(classNum);
      if (exists) {
        if (prev.selectedClasses.length === 1) return prev; // Keep at least one
        return {
          ...prev,
          selectedClasses: prev.selectedClasses.filter((c) => c !== classNum),
        };
      } else {
        return {
          ...prev,
          selectedClasses: [...prev.selectedClasses, classNum],
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!brief.brandName.trim()) {
      newErrors.brandName = 'Brand name is required';
    }
    if (!brief.industry.trim()) {
      newErrors.industry = 'Industry / Sector is required';
    }
    if (brief.selectedClasses.length === 0) {
      newErrors.selectedClasses = 'Please select at least 1 trademark class';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (onSaveBrief) {
      onSaveBrief(brief);
    }
  };

  const renderStyleIcon = (iconName) => {
    switch (iconName) {
      case 'Type':
        return <Type className="w-5 h-5 text-[#002B49]" />;
      case 'Shapes':
        return <Shapes className="w-5 h-5 text-[#002B49]" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-[#002B49]" />;
      case 'Shield':
        return <Shield className="w-5 h-5 text-[#002B49]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#002B49]" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-16 antialiased">
      {/* Top Stepper Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-black text-[#002B49] tracking-tight">
              BharatFiling
            </span>
            <span className="hidden sm:inline-block text-[11px] font-bold text-slate-400 border-l border-slate-200 pl-3">
              Brand Brief & Trademark Class Intake
            </span>
          </div>

          {/* Stepper Dots */}
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <span className="text-slate-400">Step 1</span>
            <span className="text-slate-300">/</span>
            <span className="text-[#002B49] font-black bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Step 2: Brand Brief
            </span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-400">Step 3</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-400">Step 4</span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#002B49] transition mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Service Overview</span>
          </button>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Card 1: Brand Fundamentals */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-black text-[#002B49]">
                1. Brand Fundamentals & Commercial Sector
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Tell us about your brand name, tagline, and business domain for precise IP searches.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Brand / Trademark Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={brief.brandName}
                  onChange={(e) => setBrief({ ...brief, brandName: e.target.value })}
                  placeholder="e.g. ZenoPay or Keventers"
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002B49] ${
                    errors.brandName ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
                  }`}
                />
                {errors.brandName && (
                  <p className="text-[11px] text-rose-500 font-semibold mt-1">
                    {errors.brandName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tagline / Slogan (Optional)
                </label>
                <input
                  type="text"
                  value={brief.tagline}
                  onChange={(e) => setBrief({ ...brief, tagline: e.target.value })}
                  placeholder="e.g. Finance for the Next Billion"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002B49]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Industry / Business Vertical <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={brief.industry}
                  onChange={(e) => setBrief({ ...brief, industry: e.target.value })}
                  placeholder="e.g. Fintech, Healthcare, D2C Fashion, Cloud Kitchen, EdTech"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002B49]"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Visual Style Preference */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-black text-[#002B49]">
                2. Preferred Logo Design Style
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Select the visual archetype that best embodies your company personality.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {LOGO_STYLES.map((style) => {
                const isSelected = brief.selectedStyle === style.id;
                return (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setBrief({ ...brief, selectedStyle: style.id })}
                    className={`p-4 rounded-xl border text-left transition cursor-pointer relative ${
                      isSelected
                        ? 'border-[#002B49] bg-blue-50/50 ring-1 ring-[#002B49]'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 rounded-lg bg-white shadow-xs border border-slate-100 flex items-center justify-center">
                        {renderStyleIcon(style.icon)}
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-[#002B49] text-white flex items-center justify-center text-[10px]">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-xs font-black text-slate-900">{style.name}</h3>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                      {style.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Card 3: Color Palette & Mood */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-black text-[#002B49]">
                3. Color Palette & Emotional Tone
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Color triggers psychological associations. Pick your brand's primary spectrum.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {COLOR_PALETTES.map((pal) => {
                const isSelected = brief.selectedPalette === pal.id;
                return (
                  <button
                    key={pal.id}
                    type="button"
                    onClick={() => setBrief({ ...brief, selectedPalette: pal.id })}
                    className={`p-4 rounded-xl border text-left transition cursor-pointer ${
                      isSelected
                        ? 'border-[#002B49] bg-blue-50/50 ring-1 ring-[#002B49]'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        {pal.colors.map((c, i) => (
                          <span
                            key={i}
                            className="w-4 h-4 rounded-full border border-black/10 inline-block"
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-[#002B49] text-white flex items-center justify-center text-[9px]">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-xs font-black text-slate-900">{pal.name}</h3>
                    <p className="text-[10px] text-slate-500 mt-1">{pal.vibe}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Card 4: Target Trademark Classes */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
            <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h2 className="text-lg font-black text-[#002B49]">
                  4. Trademark Classes for IP Clearance
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select which Nice Classes you want our attorneys to search and protect against lookalikes.
                </p>
              </div>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
                {brief.selectedClasses.length} class(es) selected
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {TRADEMARK_CLASSES.map((cls) => {
                const isSelected = brief.selectedClasses.includes(cls.classNum);
                return (
                  <button
                    key={cls.classNum}
                    type="button"
                    onClick={() => handleClassToggle(cls.classNum)}
                    className={`p-3 rounded-xl border text-left transition cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? 'border-[#002B49] bg-blue-50/40 text-slate-900'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                        isSelected
                          ? 'bg-[#002B49] border-[#002B49] text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div>
                      <span className="text-xs font-bold block text-slate-900">
                        {cls.classNum}: {cls.name}
                      </span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">
                        {cls.desc}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Card 5: Inspiration Notes & Ideas */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
            <div>
              <h2 className="text-lg font-black text-[#002B49]">
                5. Designer Inspiration & Reference Notes (Optional)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Share any existing logos you like, competitor names to contrast against, or specific visual symbols you want included.
              </p>
            </div>

            <textarea
              rows={3}
              value={brief.inspirationNotes}
              onChange={(e) => setBrief({ ...brief, inspirationNotes: e.target.value })}
              placeholder="e.g. We love the clean geometric aesthetic of Stripe and Notion. We want an energetic bird or lightning symbol, but avoid anything that looks like generic clip art..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002B49]"
            />
          </div>

          {/* Action Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <span className="text-xs text-slate-500 font-medium">
              Next step: Choose your package tier & optional creative add-ons
            </span>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#002B49] hover:bg-[#001f35] text-white font-black text-xs tracking-wide shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Continue to Packages & Add-ons</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
