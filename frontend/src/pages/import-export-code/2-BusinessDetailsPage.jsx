import React from 'react';
import {
  Building2,
  Briefcase,
  TrendingUp,
  FileText,
  CreditCard,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import {
  ENTITY_TYPES,
  EXPORT_ACTIVITIES,
  ANNUAL_TURNOVER_OPTIONS,
} from './constants.js';

export default function BusinessDetailsPage({
  formData = {},
  onInputChange,
  onBack,
  onSubmit,
  isSubmitting = false,
}) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-16">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-black text-[#022B50] tracking-tight">
              BharatFiling
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-xs font-semibold text-slate-600">
              IEC Filing Desk
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>DGFT Compliant Filing</span>
          </div>
        </div>
      </header>

      {/* Main Form Container */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        
        {/* Hero Trust Card */}
        <div className="bg-gradient-to-r from-[#022B50] to-[#044782] rounded-2xl p-6 text-white mb-6 shadow-sm">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider mb-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>10,000+ Successful IEC Registrations</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight">
            Tell us about your Import / Export Business
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 mt-1">
            Step 2 of 4: Business Profile &amp; Legal Constitution
          </p>

          {/* Segmented Progress Bar */}
          <div className="mt-4 flex items-center gap-2">
            <div className="h-2 flex-1 rounded-full bg-emerald-400" />
            <div className="h-2 flex-1 rounded-full bg-emerald-400" />
            <div className="h-2 flex-1 rounded-full bg-white/30" />
            <div className="h-2 flex-1 rounded-full bg-white/30" />
          </div>
          <div className="text-[11px] text-blue-200 mt-1.5 text-right font-medium">
            2 / 4 complete
          </div>
        </div>

        {/* Business Questionnaire Card */}
        <form
          onSubmit={onSubmit}
          className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6"
        >
          {/* 1. Entity Type */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800">
              Business Constitution / Entity Type *
            </label>
            <select
              value={formData.organizationType || 'Sole Proprietorship'}
              onChange={(e) => onInputChange('organizationType', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#022B50] focus:ring-1 focus:ring-[#022B50] bg-white transition cursor-pointer"
              required
            >
              {ENTITY_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500">
              Select the constitution under which your PAN is registered.
            </p>
          </div>

          {/* 2. Nature of Activity */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800">
              Primary Nature of Business / Export Activity *
            </label>
            <select
              value={formData.exportActivity || EXPORT_ACTIVITIES[0]}
              onChange={(e) => onInputChange('exportActivity', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#022B50] focus:ring-1 focus:ring-[#022B50] bg-white transition cursor-pointer"
              required
            >
              {EXPORT_ACTIVITIES.map((act) => (
                <option key={act} value={act}>
                  {act}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Expected Annual Turnover */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800">
              Expected Annual Turnover Bracket *
            </label>
            <select
              value={formData.annualTurnover || '10 lakhs - 1 crore'}
              onChange={(e) => onInputChange('annualTurnover', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#022B50] focus:ring-1 focus:ring-[#022B50] bg-white transition cursor-pointer"
              required
            >
              {ANNUAL_TURNOVER_OPTIONS.map((to) => (
                <option key={to} value={to}>
                  {to}
                </option>
              ))}
            </select>
          </div>

          {/* 4. Entity Name as per PAN */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800">
              Entity Name / Trade Name *
            </label>
            <input
              type="text"
              value={formData.enterpriseName || ''}
              onChange={(e) => onInputChange('enterpriseName', e.target.value)}
              placeholder="e.g. Apex Global Traders"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#022B50] focus:ring-1 focus:ring-[#022B50] transition"
              required
            />
          </div>

          {/* 5. PAN Number */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800">
              PAN Number (Proprietor / Firm / Company) *
            </label>
            <input
              type="text"
              maxLength={10}
              value={formData.pan || ''}
              onChange={(e) => onInputChange('pan', e.target.value.toUpperCase())}
              placeholder="ABCDE1234F"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-mono uppercase focus:outline-none focus:border-[#022B50] focus:ring-1 focus:ring-[#022B50] transition"
              required
            />
            <p className="text-[11px] text-slate-500">
              The 10-digit PAN will be permanently mapped to your DGFT IEC number.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={onBack}
              className="px-4 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-lg bg-[#022B50] hover:bg-[#033c70] text-white text-xs sm:text-sm font-bold tracking-wide transition shadow-xs flex items-center gap-2 cursor-pointer disabled:opacity-75"
            >
              <span>Continue to Packages</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
