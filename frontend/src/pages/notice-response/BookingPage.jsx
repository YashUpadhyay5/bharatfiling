import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CalendarDays, ChevronLeft, ChevronRight, PhoneCall, ShieldCheck, Sun, Sunset } from 'lucide-react';
import {
  DAYS_AHEAD,
  WEEKDAYS,
  addDays,
  formatSlotDate,
  formatSlotTime,
  isSlotAvailable,
  istNow,
  monthGrid,
  monthLabel,
  slotTimes,
} from './slots.js';

const POINT_ICONS = [CalendarDays, PhoneCall, ShieldCheck];

const monthIndex = (date) => {
  const [y, m] = date.split('-').map(Number);
  return y * 12 + m;
};

// Step 2: pick the date and time of the call. Step 3 draws the payment dialog (children) over this page.
export default function BookingPage({ config, formData, onSelect, onNext, onBack, children }) {
  const now = new Date();
  const today = istNow(now).date;
  const lastDate = addDays(today, DAYS_AHEAD);
  const times = slotTimes();
  const dayIsOpen = (date) => times.some((t) => isSlotAvailable(date, t, now));
  const firstOpenDate = Array.from({ length: DAYS_AHEAD + 1 }, (_, i) => addDays(today, i)).find(dayIsOpen);

  // The first bookable day is shown until the customer picks another.
  const selectedDate = formData.slotDate && dayIsOpen(formData.slotDate) ? formData.slotDate : firstOpenDate;
  const selectedTime = isSlotAvailable(selectedDate, formData.slotTime, now) ? formData.slotTime : '';
  const canProceed = isSlotAvailable(formData.slotDate, formData.slotTime, now);

  const [view, setView] = useState(() => {
    const [year, month] = selectedDate.split('-').map(Number);
    return { year, month };
  });
  const viewIndex = view.year * 12 + view.month;
  const shiftMonth = (by) => {
    const index = viewIndex - 1 + by;
    setView({ year: Math.floor(index / 12), month: (index % 12) + 1 });
  };

  const pickDate = (date) =>
    onSelect({ slotDate: date, slotTime: isSlotAvailable(date, formData.slotTime, now) ? formData.slotTime : '' });
  const pickTime = (time) => onSelect({ slotDate: selectedDate, slotTime: time });

  const callNumber = `+91 ${formData.phone.slice(0, 5)} *****`;
  const groups = [
    { label: 'Morning', Icon: Sun, slots: times.filter((t) => t < '12:00') },
    { label: 'Afternoon', Icon: Sunset, slots: times.filter((t) => t >= '12:00') },
  ];

  return (
    <div className="min-h-screen bg-white font-sans grid grid-cols-1 lg:grid-cols-2">
      <aside className="relative bg-gradient-to-b from-[#001D38] to-[#0B4C8C] text-white px-6 py-8 lg:px-14 lg:py-12 flex flex-col lg:justify-center">
        <button
          type="button"
          onClick={onBack}
          className="self-start inline-flex items-center gap-1.5 text-xs font-semibold text-blue-100 hover:text-white transition cursor-pointer lg:absolute lg:top-8 lg:left-10"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back</span>
        </button>
        <div className="mt-6 lg:mt-0 lg:max-w-md lg:mx-auto w-full">
          <div className="inline-flex items-center gap-2 select-none">
            <img src="/bharatfiling-brand-icon.png" alt="" className="h-8 w-auto object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            <span className="text-xl font-extrabold leading-none tracking-tight">
              Bharat<span className="text-[#F26522]">Filing</span>
            </span>
          </div>
          <h1 className="mt-6 text-2xl sm:text-3xl font-bold leading-tight">{config.booking.heading}</h1>
          <ul className="mt-8 space-y-5 hidden sm:block">
            {config.booking.points.map((text, i) => {
              const Icon = POINT_ICONS[i];
              return (
                <li key={text} className="flex items-center gap-4">
                  <span className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm sm:text-base text-blue-50">{text}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      <main className="px-4 py-8 sm:px-8 lg:px-14 lg:py-12 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_15rem] gap-8 flex-1">
          <section aria-labelledby="booking-date">
            <h2 id="booking-date" className="text-sm font-medium text-slate-800 mb-3">Select Date</h2>
            <div className="flex items-center justify-between mb-3">
              <div className="inline-flex items-center gap-2 border border-slate-400 rounded px-3 py-2 text-sm font-medium text-slate-900">
                <CalendarDays className="w-4 h-4" aria-hidden="true" />
                <span aria-live="polite">{monthLabel(view.year, view.month)}</span>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Previous month"
                  disabled={viewIndex <= monthIndex(today)}
                  onClick={() => shiftMonth(-1)}
                  className="w-10 h-9 rounded border border-slate-300 flex items-center justify-center text-slate-800 disabled:text-slate-300 disabled:cursor-not-allowed hover:bg-slate-50 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label="Next month"
                  disabled={viewIndex >= monthIndex(lastDate)}
                  onClick={() => shiftMonth(1)}
                  className="w-10 h-9 rounded border border-slate-800 flex items-center justify-center text-slate-900 disabled:border-slate-300 disabled:text-slate-300 disabled:cursor-not-allowed hover:bg-slate-50 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="border border-slate-400 rounded">
              <div className="grid grid-cols-7 text-center text-xs text-slate-400 pt-4 pb-2" aria-hidden="true">
                {WEEKDAYS.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-y-2 px-2 pb-4">
                {monthGrid(view.year, view.month).map((cell) => {
                  const open = cell.inMonth && dayIsOpen(cell.date);
                  const selected = open && cell.date === selectedDate;
                  if (!open) {
                    return (
                      <span key={cell.date} className="w-9 h-9 mx-auto flex items-center justify-center text-sm text-slate-300">
                        {cell.day}
                      </span>
                    );
                  }
                  return (
                    <button
                      key={cell.date}
                      type="button"
                      aria-pressed={selected}
                      aria-label={formatSlotDate(cell.date)}
                      onClick={() => pickDate(cell.date)}
                      className={`w-9 h-9 mx-auto rounded-full flex items-center justify-center text-sm cursor-pointer transition ${
                        selected ? 'bg-[#002B49] text-white font-semibold' : 'text-slate-900 hover:bg-blue-50'
                      }`}
                    >
                      {cell.day}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 flex items-start gap-3 rounded border border-sky-100 bg-sky-50 p-3 text-sm text-slate-800 max-w-md">
              <PhoneCall className="w-5 h-5 mt-0.5 shrink-0 text-[#0052CC]" aria-hidden="true" />
              <p>
                Our tax expert will call you on <strong>{callNumber}</strong> at the time you choose. Please answer the call so you do not miss your consultation.
              </p>
            </div>
          </section>

          <section aria-labelledby="booking-time">
            <h2 id="booking-time" className="text-sm font-medium text-slate-800 mb-3">Select Time</h2>
            <div className="space-y-3 md:max-h-[34rem] md:overflow-y-auto md:pr-1">
              {groups.map(({ label, Icon, slots }) => (
                <div key={label}>
                  <p className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                    <Icon className="w-4 h-4" aria-hidden="true" />
                    {label}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
                    {slots.map((time) => {
                      const available = isSlotAvailable(selectedDate, time, now);
                      const selected = selectedTime === time;
                      return (
                        <button
                          key={time}
                          type="button"
                          disabled={!available}
                          aria-pressed={selected}
                          onClick={() => pickTime(time)}
                          className={`w-full rounded border px-3 py-2.5 text-sm transition ${
                            selected
                              ? 'border-[#002B49] bg-[#002B49] text-white font-semibold cursor-pointer'
                              : available
                              ? 'border-slate-300 text-slate-900 hover:border-[#002B49] cursor-pointer'
                              : 'border-slate-200 text-slate-300 cursor-not-allowed'
                          }`}
                        >
                          {formatSlotTime(time)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <button
          type="button"
          disabled={!canProceed}
          onClick={onNext}
          className={`mt-8 w-full font-semibold text-base py-4 rounded transition flex items-center justify-center gap-2 ${
            canProceed ? 'bg-[#002B49] hover:bg-[#001D38] text-white shadow-md cursor-pointer' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>Next</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </main>

      {children}
    </div>
  );
}
