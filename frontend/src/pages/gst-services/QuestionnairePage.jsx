import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, ChevronDown, Lightbulb } from 'lucide-react';
import BrandLogo from './BrandLogo.jsx';
import { isAnswered } from './answers.js';

// Closes a popup on outside click or Escape.
function useDismiss(ref, open, onClose) {
  useEffect(() => {
    if (!open) return undefined;
    const onPointer = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [ref, open, onClose]);
}

function SuggestQuestion({ question, value = '', onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const close = () => setOpen(false);
  useDismiss(ref, open, close);

  const query = value.trim().toLowerCase();
  const matches = question.suggestions.filter((s) => s.toLowerCase().includes(query));

  return (
    <div className="space-y-6">
      <label htmlFor={`gst-q-${question.id}`} className="block text-lg sm:text-xl font-bold text-slate-900">
        {question.label}
      </label>
      <div ref={ref} className="relative">
        <input
          id={`gst-q-${question.id}`}
          type="text"
          autoFocus
          autoComplete="off"
          maxLength={80}
          placeholder={question.placeholder}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(e.target.value.trim().length > 0);
          }}
          className="w-full px-4 py-3.5 rounded-lg border border-slate-400 focus:border-[#002B49] focus:ring-2 focus:ring-blue-100 text-sm text-slate-800 placeholder-slate-400 outline-none transition"
        />
        {open && matches.length > 0 && (
          <ul className="absolute z-20 mt-1 w-full max-h-56 overflow-y-auto bg-white border border-slate-200 rounded-lg shadow-lg py-1">
            {matches.map((item) => (
              <li key={item}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(item);
                    close();
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm text-slate-800 hover:bg-blue-50 cursor-pointer"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {question.hint && (
        <div className="flex items-start gap-3 pt-4">
          <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-600">
            <Lightbulb className="w-5 h-5" aria-hidden="true" />
          </div>
          <p className="text-sm text-slate-500 pt-2">{question.hint}</p>
        </div>
      )}
    </div>
  );
}

function SelectQuestion({ question, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const close = () => setOpen(false);
  useDismiss(ref, open, close);

  const labelId = `gst-q-${question.id}-label`;
  const selected = question.options.find((o) => o.value === value);

  return (
    <div className="space-y-5">
      <p id={labelId} className="text-lg sm:text-xl font-bold text-slate-900">
        {question.label}
      </p>
      <div ref={ref} className="relative">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={labelId}
          onClick={() => setOpen(!open)}
          className={`w-full flex items-center justify-between px-4 py-3.5 rounded-lg border text-sm text-left outline-none transition cursor-pointer ${
            open ? 'border-[#002B49] ring-2 ring-blue-100' : 'border-slate-400'
          }`}
        >
          <span className={selected ? 'text-slate-800' : 'text-slate-400'}>{selected?.label || 'Select option'}</span>
          <ChevronDown className="w-4 h-4 text-slate-700" aria-hidden="true" />
        </button>
        {open && (
          <ul role="listbox" aria-labelledby={labelId} className="absolute z-20 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-lg py-1">
            {question.options.map((o) => (
              <li key={o.value} role="option" aria-selected={value === o.value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(o.value);
                    close();
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm text-slate-800 hover:bg-blue-50 cursor-pointer ${
                    value === o.value ? 'bg-blue-50 font-semibold' : ''
                  }`}
                >
                  {o.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function RadioQuestion({ question, value, onChange }) {
  return (
    <fieldset>
      <legend className="text-lg sm:text-xl font-bold text-slate-900 mb-5">{question.label}</legend>
      <div className="space-y-3">
        {question.options.map((o) => {
          const selected = value === o.value;
          return (
            <label
              key={o.value}
              className={`flex items-center gap-3.5 p-4 rounded-xl border cursor-pointer transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blue-200 ${
                selected ? 'border-[#002B49] bg-blue-50/20' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <input
                type="radio"
                name={`gst-q-${question.id}`}
                value={o.value}
                checked={selected}
                onChange={() => onChange(o.value)}
                className="sr-only"
              />
              <span
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  selected ? 'border-[#002B49]' : 'border-slate-300'
                }`}
              >
                {selected && <span className="w-2.5 h-2.5 rounded-full bg-[#002B49]" />}
              </span>
              <span className="text-sm font-semibold text-slate-800">{o.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function ExtraCheckboxes({ extra, value = [], onChange }) {
  const toggle = (v) => onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);
  return (
    <div className="space-y-2.5 pt-5">
      {extra.options.map((o) => (
        <label key={o.value} className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
          <input
            type="checkbox"
            checked={value.includes(o.value)}
            onChange={() => toggle(o.value)}
            className="w-4 h-4 rounded border-slate-400 accent-[#002B49] cursor-pointer"
          />
          {o.label}
        </label>
      ))}
    </div>
  );
}

const QUESTION_TYPES = { suggest: SuggestQuestion, select: SelectQuestion, radio: RadioQuestion };

export default function QuestionnairePage({ config, answers: savedAnswers, onSubmit }) {
  const { headline, tagline, points, questions } = config.questionnaire;
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState(() => ({ ...savedAnswers }));

  const question = questions[index];
  const QuestionInput = QUESTION_TYPES[question.type];
  const canProceed = isAnswered(question, answers[question.id]);
  const setAnswer = (id, value) => setAnswers((prev) => ({ ...prev, [id]: value }));

  const handleNext = (e) => {
    e.preventDefault();
    if (!canProceed) return;
    if (index < questions.length - 1) {
      setIndex(index + 1);
      return;
    }
    const cleaned = { ...answers };
    questions.forEach((q) => {
      if (q.type === 'suggest') cleaned[q.id] = cleaned[q.id].trim();
    });
    onSubmit(cleaned);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex items-center py-6 sm:py-12 px-4 sm:px-6">
      <main className="max-w-6xl w-full mx-auto bg-white/70 rounded-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center p-4 sm:p-10">
        <div className="lg:col-span-6 space-y-8 pl-2 sm:pl-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight leading-tight">
              {headline[0]} <span className="text-slate-500 font-bold">{headline[1]}</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg font-semibold text-[#002B49]">{tagline}</p>
          </div>

          <div className="space-y-6">
            {points.map((p) => (
              <div key={p.title} className="flex items-start gap-3.5">
                <div className="w-5 h-5 rounded-full border-2 border-[#002B49] text-[#002B49] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[3]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">{p.title}</p>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{p.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl p-6 sm:p-9 min-h-[480px] flex flex-col">
            <div className="flex justify-center mb-6">
              <BrandLogo />
            </div>

            <div className="border border-slate-200 rounded-lg p-4 mb-8">
              <div className="flex items-center justify-between text-xs sm:text-sm mb-3">
                <span className="font-bold text-slate-900">
                  {index}/{questions.length} complete
                </span>
                <span className="text-slate-500">Takes less than 1 min</span>
              </div>
              <div className="flex gap-2" aria-hidden="true">
                {questions.map((q, i) => (
                  <div key={q.id} className={`h-1 flex-1 rounded-full ${i < index ? 'bg-[#22C55E]' : 'bg-slate-200'}`} />
                ))}
              </div>
            </div>

            <form onSubmit={handleNext} className="flex-1 flex flex-col">
              <QuestionInput
                key={question.id}
                question={question}
                value={answers[question.id]}
                onChange={(v) => setAnswer(question.id, v)}
              />
              {question.extra && (
                <ExtraCheckboxes
                  extra={question.extra}
                  value={answers[question.extra.id]}
                  onChange={(v) => setAnswer(question.extra.id, v)}
                />
              )}

              <div className="mt-auto pt-10 grid grid-cols-2 gap-4">
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => setIndex(index - 1)}
                    className="border border-[#002B49] text-[#002B49] hover:bg-slate-50 font-semibold text-sm py-3.5 rounded-lg transition cursor-pointer flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                    <span>Back</span>
                  </button>
                )}
                <button
                  type="submit"
                  disabled={!canProceed}
                  className={`col-start-2 font-semibold text-sm py-3.5 rounded-lg transition flex items-center justify-center gap-2 ${
                    canProceed
                      ? 'bg-[#002B49] hover:bg-[#001D38] text-white shadow-md cursor-pointer'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
