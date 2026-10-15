import React, { useState } from 'react';
import { HelpCircle, ChevronDown, CheckCircle2 } from 'lucide-react';

const FAQS = [
  {
    q: 'Which tax regime is better for me: Old or New?',
    a: 'Under current tax laws, the New Tax Regime (Section 115BAC) is the default and is better for most salaried employees earning up to ₹15 Lakh unless you have high deductions. If your total eligible deductions under Old Regime (HRA u/s 10(13A) + Home Loan Interest u/s 24(b) + Section 80C + Section 80D) exceed ₹3.75 Lakh to ₹4.25 Lakh, the Old Regime usually results in lower tax.',
  },
  {
    q: 'What is the Standard Deduction for FY 2025-26 and FY 2026-27?',
    a: 'Under the New Tax Regime, the Standard Deduction is ₹75,000 for salaried employees and pensioners (hiked from ₹50,000). Under the Old Tax Regime, the Standard Deduction remains ₹50,000. Additionally, the deduction on family pension under the New Regime is ₹25,000 (or 1/3rd of pension, whichever is lower).',
  },
  {
    q: 'How does the Section 87A rebate and Marginal Relief work under New Regime?',
    a: 'Under Section 115BAC, resident individuals with total taxable income up to ₹7,00,000 receive a tax rebate of up to ₹25,000, reducing their tax to ₹0 (combined with the ₹75,000 standard deduction, salary income up to ₹7.75 Lakh is completely tax-free). Furthermore, if your taxable income marginally exceeds ₹7,00,000 (up to ₹7,22,222), marginal relief ensures that the tax payable does not exceed the income earned above ₹7,00,000.',
  },
  {
    q: 'Can salaried individuals switch between Old and New regimes every year?',
    a: 'Yes! Salaried employees and individuals with NO income from business or profession can freely switch between the Old Regime and the New Regime every financial year while filing their ITR before the due date under Section 139(1). Form 10-IEA is NOT required for salaried taxpayers.',
  },
  {
    q: 'When is Form 10-IEA mandatory?',
    a: 'Form 10-IEA is mandatory ONLY for individuals who have income from Business or Profession (filing ITR-3 or ITR-4) who wish to opt out of the default New Regime and choose the Old Regime. It must be filed before the due date under Section 139(1). Note: Business taxpayers can switch back to the New Regime only ONCE in their lifetime and cannot opt out again.',
  },
  {
    q: 'Which deductions are allowed under the New Tax Regime (Section 115BAC)?',
    a: 'Under the New Tax Regime, almost all deductions under Chapter VI-A (80C, 80D, 80E, 80G) and Section 24(b) home loan interest are disallowed. However, Section 80CCD(2) (Employer’s contribution to NPS up to 10% or 14% of salary) and Section 80JJAA (employment generation) ARE allowed in addition to the ₹75,000 standard deduction.',
  },
  {
    q: 'How are Capital Gains taxed post July 2024 Budget?',
    a: 'Short-Term Capital Gains under Section 111A (listed equity and equity mutual funds) are taxed at 20% (up from 15%). Long-Term Capital Gains under Section 112A are taxed at 12.5% (up from 10%), with the annual exemption limit increased from ₹1,00,000 to ₹1,25,000. Other LTCG is taxed at 12.5% without indexation.',
  },
  {
    q: 'What is the difference between Financial Year (FY) and Assessment Year (AY)?',
    a: 'Financial Year (FY) is the 12-month period in which you earn your income (e.g., April 1, 2025 to March 31, 2026 is FY 2025-26). Assessment Year (AY) is the immediate next financial year in which that income is evaluated and tax return is filed (AY 2026-27 is the assessment year for FY 2025-26).',
  },
];

export default function IncomeTaxFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 mt-12 mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#F26522]">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-[#111827]">
            Frequently Asked Questions & CA Guidance
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Expert insights on Indian income tax slabs, rebates, exemptions, and compliance
          </p>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="py-4">
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between text-left font-bold text-sm sm:text-base text-[#111827] hover:text-[#F26522] transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 ml-3 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#F26522]' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed pl-1">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
