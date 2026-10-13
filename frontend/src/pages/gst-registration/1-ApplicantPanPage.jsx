import React from 'react';
import { ArrowRight, Lock } from 'lucide-react';
import PanVerificationBadge from './components/PanVerificationBadge.jsx';

export default function ApplicantPanPage({
  formData,
  panAuth,
  onInputChange,
  onSubmit,
  isAuthenticated,
  onOpenAuthModal,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Account authentication prompt if not logged in */}
      {!isAuthenticated && (
        <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-900 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <Lock className="w-4 h-4 text-amber-700 shrink-0" />
            <span className="text-xs font-semibold truncate">
              Sign in or register required to file application
            </span>
          </div>
          <button
            type="button"
            onClick={onOpenAuthModal}
            className="px-3 py-1.5 rounded-xl bg-[#111827] text-white text-xs font-bold hover:bg-[#1F2937] shrink-0 cursor-pointer shadow-xs transition"
          >
            Sign In / Register
          </button>
        </div>
      )}

      {/* Name Input */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-700">
          Name <span className="text-rose-500">*</span>
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => onInputChange('name', e.target.value)}
          placeholder="e.g. Yash Upadhyay"
          className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-300 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#111827]/30 focus:border-[#111827] transition"
        />
      </div>

      {/* Phone Number with +91 */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-700">
          Phone Number <span className="text-rose-500">*</span>
        </label>
        <div className="flex rounded-2xl border border-slate-300 focus-within:ring-2 focus-within:ring-[#111827]/30 focus-within:border-[#111827] overflow-hidden transition bg-white">
          <div className="px-3 py-3 bg-slate-50 border-r border-slate-200 flex items-center gap-1.5 text-xs font-bold text-slate-700 shrink-0">
            <span>🇮🇳</span>
            <span>+91</span>
          </div>
          <input
            type="tel"
            maxLength={10}
            value={formData.phone}
            onChange={(e) => onInputChange('phone', e.target.value.replace(/\D/g, ''))}
            placeholder="7668976193"
            className="w-full px-4 py-3 text-slate-900 text-sm font-medium focus:outline-none"
          />
        </div>
      </div>

      {/* PAN Card Input with Real-Time Validation */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-slate-700">
            PAN <span className="text-rose-500">*</span>
          </label>
          {formData.pan.length > 0 && (
            <span
              className={`text-[10px] font-mono ${
                formData.pan.length === 10
                  ? panAuth.isValid
                    ? 'text-emerald-600 font-bold'
                    : 'text-rose-500 font-bold'
                  : 'text-slate-400'
              }`}
            >
              {formData.pan.length}/10
            </span>
          )}
        </div>

        <input
          type="text"
          maxLength={10}
          value={formData.pan}
          onChange={(e) => onInputChange('pan', e.target.value.toUpperCase())}
          placeholder="ABCDE1234F"
          className={`w-full px-4 py-3 rounded-2xl bg-white text-sm font-mono font-bold tracking-wider transition uppercase focus:outline-none ${
            formData.pan.length === 10
              ? panAuth.isValid
                ? 'border-2 border-emerald-500 text-emerald-950 focus:ring-2 focus:ring-emerald-200'
                : 'border-2 border-rose-500 text-rose-950 bg-rose-50/20 focus:ring-2 focus:ring-rose-200'
              : 'border border-slate-300 text-slate-900 focus:ring-2 focus:ring-[#111827]/30 focus:border-[#111827]'
          }`}
        />

        <PanVerificationBadge pan={formData.pan} panAuth={panAuth} />
      </div>

      {/* Continue Button */}
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
  );
}
