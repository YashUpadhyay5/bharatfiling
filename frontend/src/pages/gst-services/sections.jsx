import React, { useState } from 'react';
import { AlertCircle, Check, ChevronDown, ChevronUp } from 'lucide-react';

const TONES = { white: 'bg-white', tint: 'bg-slate-50' };
const GRID_COLS = { 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4', 5: 'lg:grid-cols-5' };
const STEP_COLS = { 3: 'md:grid-cols-3', 4: 'md:grid-cols-4', 5: 'md:grid-cols-5' };

function Title({ title }) {
  const [before, highlight, after] = title;
  return (
    <h2 className="text-2xl sm:text-3xl font-bold text-[#022B50] tracking-tight">
      {before}
      <span className="text-[#007AFF]">{highlight}</span>
      {after}
    </h2>
  );
}

function TableBody({ section }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full text-left text-xs sm:text-sm">
        <thead className="bg-[#022B50] text-white">
          <tr>
            {section.columns.map((c) => (
              <th key={c} scope="col" className="px-4 py-3 font-semibold">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {section.rows.map((row) => (
            <tr key={row[0]} className="bg-white even:bg-slate-50">
              {row.map((cell, i) => (
                <td
                  key={i}
                  className={i === 0 ? 'px-4 py-3 font-bold text-[#022B50] whitespace-nowrap' : 'px-4 py-3 text-slate-700'}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CardsBody({ section }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 ${GRID_COLS[section.items.length] || 'lg:grid-cols-4'} gap-6`}>
      {section.items.map((item) => (
        <div key={item.title} className="p-5 rounded-xl border border-slate-200 bg-[#F9FBFC]">
          <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}

function DocumentsBody({ section }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {section.items.map((doc, idx) => (
        <div key={doc.title} className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs flex items-start gap-4">
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#0052CC] flex items-center justify-center flex-shrink-0 font-bold">
            {idx + 1}
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">{doc.title}</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">{doc.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function StepsBody({ section }) {
  return (
    <div className={`grid grid-cols-1 ${STEP_COLS[section.items.length] || 'md:grid-cols-5'} gap-4`}>
      {section.items.map((st, i) => (
        <div key={st.title} className="p-5 rounded-xl bg-[#F8FAFD] border border-slate-200">
          <div className="text-3xl font-extrabold text-blue-200">{String(i + 1).padStart(2, '0')}</div>
          <h3 className="text-sm font-bold text-slate-900 mt-2">{st.title}</h3>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">{st.desc}</p>
        </div>
      ))}
    </div>
  );
}

function TracksBody({ section }) {
  const [activeKey, setActiveKey] = useState(section.tracks[0].key);
  const track = section.tracks.find((t) => t.key === activeKey);
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-center mb-6">
        <div className="inline-flex p-1 bg-slate-200 rounded-xl" role="tablist">
          {section.tracks.map((t) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={activeKey === t.key}
              onClick={() => setActiveKey(t.key)}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer ${
                activeKey === t.key ? 'bg-white text-[#022B50] shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.title}
            </button>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 p-6" role="tabpanel">
        <p className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-4">{track.form}</p>
        <ol className="space-y-4">
          {track.steps.map((s, i) => (
            <li key={s} className="flex items-start gap-4">
              <span className="w-8 h-8 rounded-lg bg-blue-50 text-[#0052CC] flex items-center justify-center font-bold text-sm shrink-0">
                {i + 1}
              </span>
              <p className="text-sm text-slate-700 pt-1.5 leading-relaxed">{s}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

// A list of topics on the left; the chosen topic's explanation on the right.
function ExplorerBody({ section }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const item = section.items[activeIndex];
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-5xl mx-auto">
      <div
        className="md:col-span-4 self-start max-h-80 overflow-y-auto rounded-lg border border-slate-300 bg-white"
        role="tablist"
        aria-orientation="vertical"
        aria-label={section.title.join('')}
      >
        {section.items.map((it, i) => {
          const active = i === activeIndex;
          return (
            <button
              key={it.title}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setActiveIndex(i)}
              className={`w-full text-left px-4 py-3 text-sm transition cursor-pointer ${
                active ? 'bg-[#022B50] text-white font-semibold' : 'text-slate-800 hover:bg-blue-50'
              }`}
            >
              {it.title}
            </button>
          );
        })}
      </div>
      <div className="md:col-span-8 bg-white rounded-xl border border-slate-200 p-6" role="tabpanel">
        <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
        <p className="mt-2 text-sm text-slate-700 leading-relaxed">{item.intro}</p>
        <ul className="mt-4 space-y-4">
          {item.points.map((p) => (
            <li key={p.title} className="flex items-start gap-3">
              <Check className="w-4 h-4 mt-1 shrink-0 text-[#022B50]" aria-hidden="true" />
              <p className="text-sm text-slate-700 leading-relaxed">
                <strong className="text-slate-900">{p.title}</strong> {p.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const BODIES = {
  explorer: ExplorerBody,
  table: TableBody,
  cards: CardsBody,
  documents: DocumentsBody,
  steps: StepsBody,
  tracks: TracksBody,
};

export function ContentSection({ section, tone }) {
  const Body = BODIES[section.type];
  return (
    <section id={section.id} className={`scroll-mt-4 py-14 ${TONES[tone]} border-b border-slate-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <Title title={section.title} />
          {section.subtitle && <p className="mt-2 text-sm text-slate-600">{section.subtitle}</p>}
        </div>
        <Body section={section} />
        {section.note && (
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-xs sm:text-sm text-amber-900 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
            <span>{section.note}</span>
          </div>
        )}
      </div>
    </section>
  );
}

export function FaqSection({ faqs, id }) {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section id={id} className="scroll-mt-4 py-14 bg-[#FAFBFD] border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#022B50] tracking-tight text-center mb-10">
          Frequently Asked Questions (FAQs)
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const panelId = `gst-faq-${index}`;
            return (
              <div key={faq.q} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between text-sm sm:text-base font-semibold text-slate-800 hover:text-[#0052CC] cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#0052CC] ml-4 flex-shrink-0" aria-hidden="true" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 ml-4 flex-shrink-0" aria-hidden="true" />
                  )}
                </button>
                {isOpen && (
                  <div id={panelId} className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
