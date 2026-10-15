import React, { useState } from 'react';
import { ChevronDown, HelpCircle, BookOpen, AlertCircle, Scale, ShieldCheck } from 'lucide-react';

const FAQ_ITEMS = [
  {
    q: 'How does the MCA approve company and LLP names in India?',
    a: 'Company and LLP names are evaluated by the Central Registration Centre (CRC) of the Ministry of Corporate Affairs (MCA) under Rule 8 and 8A of the Companies (Incorporation) Rules, 2014. A proposed name must not be identical or too nearly resemble any existing registered company, LLP, or registered trademark. Additionally, it must have a distinctive first word and clearly describe the main commercial activity.',
  },
  {
    q: 'What is the difference between SPICe+ Part A and the RUN service?',
    a: 'SPICe+ Part A is the primary integrated web form used to reserve a name for a new company incorporation. It allows proposing up to two names in order of preference. The RUN (Reserve Unique Name) web service is primarily reserved for changing the name of an already existing company or LLP. Names reserved under SPICe+ Part A are valid for 20 days from the date of approval.',
  },
  {
    q: 'Why does a proposed name get rejected under Rule 8(2)(b) for lack of distinctiveness?',
    a: 'Under Rule 8(2)(b), a name is considered undesirable if it consists solely of generic industry descriptors without a unique coined or distinctive prefix (for example, "Software Solutions Private Limited" or "Trading Enterprises Limited"). To avoid rejection, pair a strong coined word (like "Vyom", "Zenith", or "Kavach") with your industry descriptors.',
  },
  {
    q: 'How does an existing Trademark affect MCA company name approval?',
    a: 'Under Section 4(2) of the Companies Act 2013 and Rule 8(1), the CRC officer checks the Trade Marks Registry (CGPDTM). If your proposed name is identical or phonetically similar to a registered trademark or pending mark in the relevant Nice Class, the MCA will reject the name unless you provide a registered Trademark Owner NOC or Board Resolution.',
  },
  {
    q: 'Can a Sole Proprietorship or Partnership Firm use "Private Limited" or "LLP" in its name?',
    a: 'Strictly No. "Private Limited", "Limited", and "LLP" are statutory corporate suffixes legally reserved exclusively for companies and limited liability partnerships incorporated with the MCA. Unincorporated firms like sole proprietorships and partnership firms cannot use these suffixes. Partnerships typically use suffixes like "& Co." or "& Associates".',
  },
  {
    q: 'What happens if the MCA CRC rejects a name application?',
    a: 'When filing SPICe+ Part A, the MCA provides one free resubmission opportunity. If the CRC raises an objection or query, you have 15 days to resubmit with an alternative name or provide supporting documents (such as a trademark NOC, Board resolution, or justification of coined words) without paying a fresh government fee.',
  },
  {
    q: 'Which words require prior approval or high authorized share capital?',
    a: 'Words indicating government patronage (e.g., "National", "Federal", "Governor", "President", "Republic") are strictly restricted under the Emblems and Names (Prevention of Improper Use) Act, 1950. Financial terms like "Bank", "Stock Exchange", "Insurance", or "Mutual Fund" require in-principle approval or NOC from sectoral regulators like RBI, SEBI, or IRDAI. Scale words like "Corporation" or "International" may require higher authorized capital (₹5 Lakh to ₹50 Lakh).',
  },
];

export default function FirmNameFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-100">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Frequently Asked Questions on Business & Firm Name Reservation
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Authoritative statutory guidelines under Companies Act 2013, LLP Act 2008 & Trade Marks Act 1999
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-200 ${
                isOpen ? 'bg-slate-50/70 border-slate-300 shadow-2xs' : 'border-slate-200/70 hover:border-slate-300'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleAccordion(idx)}
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-800 text-[11px] font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  {item.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-purple-600' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100/80">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
