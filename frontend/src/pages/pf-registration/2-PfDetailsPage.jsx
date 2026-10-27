import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2, Building2, Users, FileText, Check, AlertCircle } from 'lucide-react';

const ENTITY_TYPES = [
  { id: 'proprietorship', name: 'Proprietorship', desc: 'Single business owner with Shop Act or Udyam license.' },
  { id: 'partnership', name: 'Partnership / LLP', desc: 'Registered partnership or LLP with Deed/Agreement.' },
  { id: 'company', name: 'Private / Public Limited', desc: 'MCA incorporated entity with DIN and Board Resolution.' },
];

export default function PfDetailsPage({ formData = {}, onInputChange, onBack, onSubmit }) {
  const [businessName, setBusinessName] = useState(formData.businessName || '');
  const [entityType, setEntityType] = useState(formData.entityType || 'company');
  const [coverageType, setCoverageType] = useState(formData.coverageType || 'mandatory'); // 'mandatory' | 'voluntary'
  const [employeeCount, setEmployeeCount] = useState(formData.employeeCount || 20);
  const [eligibleWageEmployees, setEligibleWageEmployees] = useState(formData.eligibleWageEmployees || 15);
  const [entityPan, setEntityPan] = useState(formData.entityPan || '');
  const [state, setState] = useState(formData.state || 'Karnataka');
  const [authorizedSignatory, setAuthorizedSignatory] = useState(formData.authorizedSignatory || formData.name || '');
  const [signatoryDesignation, setSignatoryDesignation] = useState(formData.signatoryDesignation || 'Director');

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (onSubmit) {
      onSubmit({
        businessName: businessName.trim(),
        entityType,
        coverageType,
        employeeCount: Number(employeeCount) || 1,
        eligibleWageEmployees: Number(eligibleWageEmployees) || 1,
        entityPan: entityPan.trim().toUpperCase(),
        state,
        authorizedSignatory: authorizedSignatory.trim(),
        signatoryDesignation,
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 sm:py-16 text-slate-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Landing Page</span>
        </button>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
          <div className="mb-8 pb-4 border-b border-slate-100">
            <span className="text-[11px] font-black uppercase tracking-wider text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
              Step 2 of 4 • Establishment Profile
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3">
              Establishment &amp; Employee Details
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Provide your business registration and workforce parameters for Shram Suvidha &amp; Form 5A filing.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1. Legal Constitution / Entity Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">1. Constitution of Business</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {ENTITY_TYPES.map((type) => (
                  <div
                    key={type.id}
                    onClick={() => {
                      setEntityType(type.id);
                      if (onInputChange) onInputChange('entityType', type.id);
                    }}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      entityType === type.id
                        ? 'border-purple-600 bg-purple-50/40 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="text-xs font-bold text-slate-900">{type.name}</h4>
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          entityType === type.id ? 'border-purple-600 bg-purple-600' : 'border-slate-300'
                        }`}
                      >
                        {entityType === type.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500">{type.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Coverage Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">2. Nature of Registration</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setCoverageType('mandatory')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    coverageType === 'mandatory'
                      ? 'border-purple-600 bg-purple-50/40 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900">Mandatory Coverage (20+ Employees)</span>
                    <span className="w-4 h-4 rounded-full border-2 flex items-center justify-center border-purple-600">
                      {coverageType === 'mandatory' && <div className="w-1.5 h-1.5 rounded-full bg-purple-600" />}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Required by law once workforce reaches 20 employees at any point.
                  </p>
                </div>

                <div
                  onClick={() => setCoverageType('voluntary')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    coverageType === 'voluntary'
                      ? 'border-purple-600 bg-purple-50/40 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900">Voluntary Coverage (Sec 1(4))</span>
                    <span className="w-4 h-4 rounded-full border-2 flex items-center justify-center border-purple-600">
                      {coverageType === 'voluntary' && <div className="w-1.5 h-1.5 rounded-full bg-purple-600" />}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Fewer than 20 employees. Employer &amp; employees mutually agree for benefits.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Employee Strength */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Total Employee Strength <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  min={1}
                  max={5000}
                  value={employeeCount}
                  onChange={(e) => setEmployeeCount(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Employees with Basic &le; ₹15,000/mo
                </label>
                <input
                  type="number"
                  min={0}
                  max={employeeCount}
                  value={eligibleWageEmployees}
                  onChange={(e) => setEligibleWageEmployees(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
            </div>

            {/* 4. Business Name & PAN */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Establishment / Legal Business Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Acme Tech Solutions Pvt Ltd"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Entity PAN Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  maxLength={10}
                  value={entityPan}
                  onChange={(e) => setEntityPan(e.target.value.toUpperCase())}
                  placeholder="e.g. AABCA1234F"
                  className="w-full px-3.5 py-2.5 text-sm font-mono uppercase rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>
            </div>

            {/* 5. Authorized Signatory */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Authorized Signatory Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={authorizedSignatory}
                  onChange={(e) => setAuthorizedSignatory(e.target.value)}
                  placeholder="Primary Director / Partner / Proprietor"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Designation</label>
                <select
                  value={signatoryDesignation}
                  onChange={(e) => setSignatoryDesignation(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white"
                >
                  <option value="Proprietor">Proprietor</option>
                  <option value="Managing Partner">Managing Partner</option>
                  <option value="Director">Director / Managing Director</option>
                  <option value="Authorized Representative">Authorized Representative</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-100">
              <button
                type="button"
                onClick={onBack}
                className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Back
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-2.5 px-6 rounded-xl shadow-md transition-all cursor-pointer text-sm"
              >
                <span>Continue to Plan Selection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
