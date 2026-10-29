import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Check,
  Lock,
  Upload,
  FileText,
  AlertTriangle,
  Scale,
  Clock,
  Sparkles,
} from 'lucide-react';

import { OBJECTION_PACKAGES, OBJECTION_GROUNDS } from './constants.js';

export default function TrademarkObjectionCheckoutPage({
  formData = {},
  onBack,
  onProceedToPayment,
}) {
  const [selectedPackageId, setSelectedPackageId] = useState(
    formData.packageId || 'substantive'
  );
  const [applicationNumber, setApplicationNumber] = useState(
    formData.applicationNumber || ''
  );
  const [objectionType, setObjectionType] = useState(
    formData.objectionType || 'section_11'
  );
  const [reportFile, setReportFile] = useState(null);

  const selectedPkg =
    OBJECTION_PACKAGES.find((p) => p.id === selectedPackageId) ||
    OBJECTION_PACKAGES[1];

  const professionalFee = selectedPkg.price;
  const gstOnFee = Math.round(professionalFee * 0.18);
  const totalAmount = professionalFee + gstOnFee;

  const handleContinue = (e) => {
    if (e) e.preventDefault();
    if (onProceedToPayment) {
      onProceedToPayment({
        ...formData,
        packageId: selectedPackageId,
        packageName: selectedPkg.name,
        applicationNumber: applicationNumber.trim(),
        objectionType,
        professionalFee,
        gstOnFee,
        totalAmount,
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Overview</span>
          </button>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-2xs">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit SSL Encrypted Legal Portal</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Configuration Form (8 of 12 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Step 1: Application Details */}
            <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200 space-y-4">
              <h2 className="text-lg font-black text-[#002B49] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-bold">
                  1
                </span>
                <span>Trademark Application &amp; Notice Details</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Trademark Application Number (7 Digits)
                  </label>
                  <input
                    type="text"
                    value={applicationNumber}
                    onChange={(e) =>
                      setApplicationNumber(e.target.value.replace(/\D/g, '').slice(0, 8))
                    }
                    placeholder="e.g. 5839201"
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm font-mono tracking-wider focus:ring-2 focus:ring-[#002B49] focus:outline-none"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Found on your original Form TM-A acknowledgment receipt or IP India status.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Primary Grounds of Objection (from Examination Report)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setObjectionType('section_9')}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        objectionType === 'section_9'
                          ? 'border-[#002B49] ring-2 ring-[#002B49] bg-blue-50/20'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-900">Section 9</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        Lacks distinctiveness / Descriptive
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setObjectionType('section_11')}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        objectionType === 'section_11'
                          ? 'border-[#002B49] ring-2 ring-[#002B49] bg-blue-50/20'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-900">Section 11</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        Similar conflicting marks cited
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setObjectionType('both')}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        objectionType === 'both'
                          ? 'border-[#002B49] ring-2 ring-[#002B49] bg-blue-50/20'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-900">Both (Sec 9 &amp; 11)</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        Compound absolute + relative grounds
                      </div>
                    </button>
                  </div>
                </div>

                {/* Upload Examination Report (Optional) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Upload Examination Report (PDF/Image - Optional)
                  </label>
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-5 text-center bg-slate-50 hover:bg-slate-100/60 transition-colors cursor-pointer">
                    <input
                      type="file"
                      id="report-file"
                      className="hidden"
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={(e) => setReportFile(e.target.files[0])}
                    />
                    <label htmlFor="report-file" className="cursor-pointer block space-y-1">
                      <Upload className="w-6 h-6 text-slate-400 mx-auto" />
                      <div className="text-xs font-bold text-slate-700">
                        {reportFile ? reportFile.name : 'Click to upload Examination Report'}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        PDF, JPG, or PNG up to 10MB (Our team can also download directly from IP India portal)
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Choose Legal Package Tier */}
            <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200 space-y-4">
              <h2 className="text-lg font-black text-[#002B49] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-bold">
                  2
                </span>
                <span>Select Legal Objection Defense Tier</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {OBJECTION_PACKAGES.map((pkg) => {
                  const isSel = selectedPackageId === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPackageId(pkg.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                        isSel
                          ? 'border-emerald-600 ring-2 ring-emerald-600 bg-emerald-50/10 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="space-y-2">
                        {pkg.popular && (
                          <span className="inline-block bg-emerald-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">
                            Recommended
                          </span>
                        )}
                        <h3 className="font-bold text-sm text-slate-900">{pkg.name}</h3>
                        <div className="text-xl font-black text-[#002B49]">₹{pkg.price}</div>
                        <p className="text-[11px] text-slate-500 leading-tight">{pkg.tagline}</p>
                      </div>

                      <div className="pt-3 mt-3 border-t border-slate-100 text-[11px] font-bold text-emerald-700">
                        {isSel ? '✓ Selected Tier' : 'Select'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Summary Desk (4 of 12 cols) */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200 space-y-5 sticky top-6">
              <h3 className="text-lg font-black text-[#002B49] border-b border-slate-100 pb-3">
                Defense Order Summary
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Legal Drafting Fee ({selectedPkg.name})</span>
                  <span className="font-bold text-slate-900">₹{professionalFee}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>18% GST</span>
                  <span className="font-bold text-slate-900">₹{gstOnFee}</span>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                  <span className="font-bold text-sm text-slate-900">Total Payable</span>
                  <span className="text-2xl font-black text-[#002B49]">₹{totalAmount}</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>30-Day Statutory Clock Guaranteed</span>
                </div>
                <p className="text-[11px] text-emerald-700 leading-tight">
                  Drafted by Senior High Court IP Advocates within 24 hours to prevent abandonment.
                </p>
              </div>

              <button
                type="button"
                onClick={handleContinue}
                className="w-full bg-[#002B49] hover:bg-[#001f35] text-white font-bold py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <span>Proceed to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-[11px] text-slate-500 font-medium">
                🔒 Safe &amp; Secure Checkout • 100% On-Time Filing Guarantee
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
