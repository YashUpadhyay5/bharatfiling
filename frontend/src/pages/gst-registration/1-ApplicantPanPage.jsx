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
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Account authentication prompt if not logged in */}
      {!isAuthenticated && (
        <div className="p-3.5 rounded-lg bg-[#EFF8FF] border border-[#B2DDFF] text-[#155EEF] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <Lock className="w-4 h-4 text-[#155EEF] shrink-0" />
            <span className="text-xs font-semibold truncate">
              Sign in or register required to file application
            </span>
          </div>
          <button
            type="button"
            onClick={onOpenAuthModal}
            className="px-3 py-1.5 rounded-lg bg-[#155EEF] text-white text-xs font-semibold hover:bg-[#1048C6] shrink-0 cursor-pointer shadow-xs transition"
          >
            Sign In / Register
          </button>
        </div>
      )}

      {/* Name Input */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-[#252B36]">
          Name <span className="text-rose-500">*</span>
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => onInputChange('name', e.target.value)}
          placeholder="e.g. Ramesh Kumar"
          className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E5E7EB] text-[#252B36] text-sm font-medium focus:outline-hidden focus:border-[#155EEF] focus:ring-1 focus:ring-[#155EEF] transition"
        />
      </div>

      {/* Phone Number with +91 */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-[#252B36]">
          Phone Number <span className="text-rose-500">*</span>
        </label>
        <div className="flex rounded-lg border border-[#E5E7EB] focus-within:border-[#155EEF] focus-within:ring-1 focus-within:ring-[#155EEF] overflow-hidden transition bg-white">
          <div className="px-3 py-2.5 bg-[#F8F9FB] border-r border-[#E5E7EB] flex items-center gap-1.5 text-xs font-bold text-[#252B36] shrink-0">
            <span>🇮🇳</span>
            <span>+91</span>
          </div>
          <input
            type="tel"
            maxLength={10}
            value={formData.phone}
            onChange={(e) => onInputChange('phone', e.target.value.replace(/\D/g, ''))}
            placeholder="9876543210"
            className="w-full px-3.5 py-2.5 text-[#252B36] text-sm font-medium focus:outline-hidden"
          />
        </div>
      </div>

      {/* PAN Card Input with Real-Time Validation */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-[#252B36]">
            PAN <span className="text-rose-500">*</span>
          </label>
          {formData.pan.length > 0 && (
            <span
              className={`text-[10px] font-mono ${
                formData.pan.length === 10
                  ? panAuth.isValid
                    ? 'text-[#027A48] font-bold'
                    : 'text-rose-500 font-bold'
                  : 'text-[#667085]'
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
          className={`w-full px-3.5 py-2.5 rounded-lg bg-white text-sm font-mono font-bold tracking-wider transition uppercase focus:outline-hidden ${
            formData.pan.length === 10
              ? panAuth.isValid
                ? 'border-2 border-[#12B76A] text-[#027A48]'
                : 'border-2 border-rose-500 text-rose-950 bg-rose-50/20'
              : 'border border-[#E5E7EB] text-[#252B36] focus:border-[#155EEF] focus:ring-1 focus:ring-[#155EEF]'
          }`}
        />

        <PanVerificationBadge pan={formData.pan} panAuth={panAuth} />
      </div>

      {/* Continue Button */}
      <div className="pt-2">
        <button
          type="submit"
          className="w-full py-3 px-6 rounded-lg bg-[#155EEF] hover:bg-[#1048C6] text-white font-semibold text-sm shadow-xs transition flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
