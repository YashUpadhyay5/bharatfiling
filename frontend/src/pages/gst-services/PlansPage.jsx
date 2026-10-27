import React from 'react';
import { ArrowLeft, BadgePercent, Check, Info, Star } from 'lucide-react';
import BrandLogo from './BrandLogo.jsx';
import RichText from './RichText.jsx';
import { answerSummary } from './answers.js';

export default function PlansPage({ config, answers, onSelectPlan, onBack }) {
  const { plans } = config;
  const summary = answerSummary(config.questionnaire.questions, answers);
  const hints = plans.hint ? plans.hint(answers) : [];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#002B49] transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back</span>
        </button>
        <BrandLogo />
      </div>

      <div className="text-center mb-10">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#022B50] tracking-tight">
          Choose the Right Plan for Your Business
        </h1>
        {summary.length > 0 && (
          <p className="mt-3 text-xs sm:text-sm text-slate-500">
            {summary.map((s, i) => (
              <span key={s.label}>
                {i > 0 && <span aria-hidden="true"> &middot; </span>}
                {s.label}: <span className="font-semibold text-slate-700">{s.value}</span>
              </span>
            ))}
            <button type="button" onClick={onBack} className="ml-2 text-[#0052CC] font-semibold hover:underline cursor-pointer">
              Edit
            </button>
          </p>
        )}
      </div>

      {hints.length > 0 && (
        <div className="max-w-3xl mx-auto mb-10 space-y-3">
          {hints.map((hint) => (
            <p key={hint} className="flex items-start gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900">
              <Info className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
              <span>{hint}</span>
            </p>
          ))}
        </div>
      )}

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 items-stretch">
        {plans.items.map((plan) => {
          const dark = Boolean(plan.recommended);
          const unit = plan.unit || plans.unit;
          return (
            <div
              key={plan.id}
              className={`relative rounded-xl p-5 sm:p-6 flex flex-col ${
                dark
                  ? 'bg-[#002B49] text-white shadow-2xl'
                  : 'bg-white text-slate-800 shadow-lg border border-slate-200/90'
              }`}
            >
              {dark && (
                <div className="absolute -top-3 left-4 inline-flex items-center gap-1 bg-[#FFCC00] text-[#002B49] text-[11px] font-bold px-2 py-0.5 rounded shadow-sm">
                  <Star className="w-3 h-3 fill-[#002B49]" aria-hidden="true" />
                  <span>Recommended</span>
                </div>
              )}

              <h2 className={`text-xl font-bold ${dark ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h2>
              <p className={`text-xs mt-2 leading-relaxed min-h-[48px] ${dark ? 'text-blue-50' : 'text-slate-600'}`}>
                {plan.subtitle}
              </p>

              <div className="mt-6 flex items-center gap-2">
                <span className={`text-xs line-through ${dark ? 'text-red-300' : 'text-red-500'}`}>
                  ₹{plan.originalPrice.toLocaleString('en-IN')}
                </span>
                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-semibold px-1.5 py-0.5 rounded-full ${
                    dark ? 'bg-white text-emerald-600' : 'bg-emerald-50 text-emerald-600'
                  }`}
                >
                  <BadgePercent className="w-3 h-3" aria-hidden="true" />
                  {plan.discountLabel}
                </span>
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${dark ? 'text-white' : 'text-slate-900'}`}>
                  ₹{plan.price.toLocaleString('en-IN')}
                </span>
                {unit && <span className={`text-xs ${dark ? 'text-blue-100' : 'text-slate-500'}`}>{unit}</span>}
              </div>

              <div className="h-6 mt-1">
                {plan.hasEmi && (
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                        dark ? 'bg-slate-200 text-[#002B49] border-slate-200' : 'border-[#002B49] text-[#002B49]'
                      }`}
                    >
                      EMI
                    </span>
                    <span className={`text-[11px] ${dark ? 'text-blue-50' : 'text-slate-700'}`}>EMI option available.</span>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => onSelectPlan(plan.id)}
                className={`mt-4 w-full py-3 rounded font-semibold text-sm transition cursor-pointer ${
                  dark ? 'bg-[#FFCC00] hover:bg-amber-400 text-[#002B49]' : 'bg-[#022B50] hover:bg-[#001D38] text-white'
                }`}
              >
                Proceed to Pay
              </button>

              <h3 className={`mt-7 text-base font-bold ${dark ? 'text-white' : 'text-slate-900'}`}>What You'll Get</h3>
              <ul className="mt-3 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-xs sm:text-[13px] leading-snug">
                    <Check className={`w-4 h-4 mt-0.5 shrink-0 ${dark ? 'text-emerald-300' : 'text-emerald-600'}`} aria-hidden="true" />
                    <span className={dark ? 'text-blue-50' : 'text-slate-700'}>
                      <RichText text={f} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-10 space-y-1 text-xs text-slate-500">
        <p>
          <span className="font-semibold">Please note:</span> GST will be added during checkout
        </p>
        {plans.notes?.map((note) => (
          <p key={note}>{note}</p>
        ))}
      </div>
    </div>
  );
}
