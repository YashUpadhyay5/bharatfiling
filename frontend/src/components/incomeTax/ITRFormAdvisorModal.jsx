import React from 'react';
import { X, CheckCircle, AlertTriangle, FileText, ArrowRight } from 'lucide-react';
import { recommendITRForm, formatIndianCurrency } from '../../utils/incomeTaxEngine';
import SplitGradientButton from '../common/SplitGradientButton';

export default function ITRFormAdvisorModal({
  isOpen,
  onClose,
  grossTotalIncome = 0,
  hasBusinessIncome = false,
  hasPresumptiveBusiness = false,
  hasCapitalGains = false,
  hasMultipleProperties = false,
}) {
  if (!isOpen) return null;

  const recommendation = recommendITRForm({
    grossTotalIncome,
    hasBusinessIncome,
    hasPresumptiveBusiness,
    hasCapitalGains,
    hasMultipleProperties,
  });

  const formsList = [
    {
      id: 'ITR-1',
      name: 'ITR-1 (Sahaj)',
      desc: 'Resident individuals with total income up to ₹50 Lakh from Salary, One House Property, and Other Sources.',
      active: recommendation.form === 'ITR-1',
    },
    {
      id: 'ITR-2',
      name: 'ITR-2',
      desc: 'Individuals & HUFs NOT having business income, but having Capital Gains, Foreign Assets, or Multiple House Properties.',
      active: recommendation.form === 'ITR-2',
    },
    {
      id: 'ITR-3',
      name: 'ITR-3',
      desc: 'Individuals & HUFs having income from proprietary business, profession, or partnership firm (audited or non-audited).',
      active: recommendation.form === 'ITR-3',
    },
    {
      id: 'ITR-4',
      name: 'ITR-4 (Sugam)',
      desc: 'Resident individuals, HUFs, and firms having presumptive business/professional income u/s 44AD / 44ADA up to ₹50 Lakh.',
      active: recommendation.form === 'ITR-4',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 sm:p-7 overflow-hidden relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#F26522]">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#111827]">
              ITR Form Eligibility Advisor
            </h3>
            <p className="text-xs text-slate-500">
              Automated statutory recommendation based on your income heads
            </p>
          </div>
        </div>

        {/* Highlighted Recommendation */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border border-orange-200/80 mb-6">
          <div className="flex items-start gap-2.5">
            <CheckCircle className="w-5 h-5 text-[#F26522] shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-orange-950 uppercase tracking-wider">
                Recommended Return Form:
              </span>
              <h4 className="text-base sm:text-lg font-extrabold text-[#111827] mt-0.5">
                {recommendation.title}
              </h4>
              <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                {recommendation.reason}
              </p>
            </div>
          </div>
        </div>

        {/* Quick ITR Selection Guide */}
        <div className="space-y-2.5 mb-6">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">
            All Standard ITR Form Categories:
          </p>
          {formsList.map((f) => (
            <div
              key={f.id}
              className={`p-3 rounded-xl border transition-all text-xs ${
                f.active
                  ? 'bg-orange-50/50 border-orange-400 font-medium text-slate-900 ring-2 ring-orange-500/10'
                  : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              <div className="flex items-center justify-between font-bold mb-0.5">
                <span className={f.active ? 'text-[#F26522]' : 'text-slate-800'}>
                  {f.name}
                </span>
                {f.active && (
                  <span className="text-[10px] bg-orange-600 text-white px-2 py-0.5 rounded-full">
                    Your Match
                  </span>
                )}
              </div>
              <p className="text-[11px] leading-relaxed text-slate-600">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Close
          </button>
          <SplitGradientButton
            label="File ITR with BharatFiling CA"
            onClick={() => {
              onClose();
              window.open('/services/income-tax', '_blank');
            }}
          />
        </div>
      </div>
    </div>
  );
}
