import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2, Key, Cpu, Lock, Building, User } from 'lucide-react';
import { DSC_CATEGORIES, DSC_TYPES, DSC_VALIDITIES, DSC_TOKENS } from './constants.js';

export default function DscDetailsPage({ formData = {}, onInputChange, onBack, onSubmit }) {
  const [applicantCategory, setApplicantCategory] = useState(formData.applicantCategory || 'individual');
  const [certificateType, setCertificateType] = useState(formData.certificateType || 'combo');
  const [validityYears, setValidityYears] = useState(formData.validityYears || 2);
  const [tokenChoice, setTokenChoice] = useState(formData.tokenChoice || 'epass2003');
  const [fullName, setFullName] = useState(formData.fullName || '');
  const [panNumber, setPanNumber] = useState(formData.panNumber || '');

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (onSubmit) {
      onSubmit({
        applicantCategory,
        certificateType,
        validityYears,
        tokenChoice,
        fullName: fullName.trim(),
        panNumber: panNumber.trim().toUpperCase(),
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 sm:py-16 text-slate-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Landing Page</span>
        </button>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
          <div className="mb-8 pb-4 border-b border-slate-100">
            <span className="text-[11px] font-black uppercase tracking-wider text-sky-700 bg-sky-100 px-3 py-1 rounded-full">
              Step 2 of 4 • DSC Configuration
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3">
              Configure Your Digital Signature
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select the applicant category, certificate classification, and hardware token for CCA issuance.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Applicant Category */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">1. Applicant Category</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {DSC_CATEGORIES.map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => {
                      setApplicantCategory(cat.id);
                      if (onInputChange) onInputChange('applicantCategory', cat.id);
                    }}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      applicantCategory === cat.id
                        ? 'border-[#002B49] bg-sky-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {cat.id === 'individual' ? (
                          <User className="w-5 h-5 text-[#002B49]" />
                        ) : (
                          <Building className="w-5 h-5 text-[#002B49]" />
                        )}
                        <h4 className="text-sm font-extrabold text-slate-900">{cat.name}</h4>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          applicantCategory === cat.id ? 'border-[#002B49] bg-[#002B49]' : 'border-slate-300'
                        }`}
                      >
                        {applicantCategory === cat.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                    <p className="text-xs text-slate-500">{cat.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certificate Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">2. Certificate Classification</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {DSC_TYPES.map((type) => (
                  <div
                    key={type.id}
                    onClick={() => {
                      setCertificateType(type.id);
                      if (onInputChange) onInputChange('certificateType', type.id);
                    }}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      certificateType === type.id
                        ? 'border-[#002B49] bg-sky-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-extrabold text-slate-900">{type.name}</h4>
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          certificateType === type.id ? 'border-[#002B49] bg-[#002B49]' : 'border-slate-300'
                        }`}
                      >
                        {certificateType === type.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{type.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Validity */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">3. Certificate Validity</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {DSC_VALIDITIES.map((val) => (
                  <div
                    key={val.years}
                    onClick={() => {
                      setValidityYears(val.years);
                      if (onInputChange) onInputChange('validityYears', val.years);
                    }}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      validityYears === val.years
                        ? 'border-[#002B49] bg-sky-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-extrabold text-slate-900">{val.label}</h4>
                      {val.years === 2 && (
                        <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                          Standard
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500">{val.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* USB Token */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">4. Cryptographic USB Token</label>
              <div className="space-y-2.5">
                {DSC_TOKENS.map((token) => (
                  <div
                    key={token.id}
                    onClick={() => {
                      setTokenChoice(token.id);
                      if (onInputChange) onInputChange('tokenChoice', token.id);
                    }}
                    className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                      tokenChoice === token.id
                        ? 'border-[#002B49] bg-sky-50/50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Cpu className="w-5 h-5 text-slate-700" />
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900">{token.name}</h4>
                        <p className="text-[11px] text-slate-500">{token.rating} • {token.description}</p>
                      </div>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${
                        tokenChoice === token.id ? 'border-[#002B49] bg-[#002B49]' : 'border-slate-300'
                      }`}
                    >
                      {tokenChoice === token.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Applicant Basic KYC Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name (As per PAN)</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (onInputChange) onInputChange('fullName', e.target.value);
                  }}
                  placeholder="e.g. Rajesh Kumar Sharma"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#002B49]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">PAN Number</label>
                <input
                  type="text"
                  maxLength={10}
                  value={panNumber}
                  onChange={(e) => {
                    const val = e.target.value.toUpperCase();
                    setPanNumber(val);
                    if (onInputChange) onInputChange('panNumber', val);
                  }}
                  placeholder="ABCDE1234F"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#002B49] uppercase font-mono"
                  required
                />
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={onBack}
                className="px-5 py-3 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 bg-[#002B49] hover:bg-[#003B64] text-white font-extrabold py-3.5 px-6 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 group"
              >
                <span>Proceed to Plan Selection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
