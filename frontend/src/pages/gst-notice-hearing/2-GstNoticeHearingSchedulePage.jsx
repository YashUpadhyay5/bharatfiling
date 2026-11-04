import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Phone,
  Video,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Sun,
  Sunset,
  ShieldCheck,
  Scale,
  FileText,
} from 'lucide-react';
import { SCHEDULE_TIME_SLOTS } from './constants.js';

export default function GstNoticeHearingSchedulePage({
  formData = {},
  onBack,
  onProceed,
}) {
  // Calendar state - Defaults to November 2026
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(10); // 0-indexed: 10 = November
  const [selectedDay, setSelectedDay] = useState(
    formData.scheduledDay || 4 // Wednesday 4th
  );

  // Time slot selection
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(
    formData.scheduledTimeSlot || '1:30 PM'
  );

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Generate calendar days
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  const handleDaySelect = (day) => {
    setSelectedDay(day);
  };

  const handleNext = () => {
    if (!selectedDay || !selectedTimeSlot) return;

    const formattedDate = `${selectedDay} ${monthNames[currentMonth]} ${currentYear}`;
    if (onProceed) {
      onProceed({
        scheduledDate: formattedDate,
        scheduledDay: selectedDay,
        scheduledMonth: monthNames[currentMonth],
        scheduledYear: currentYear,
        scheduledTimeSlot: selectedTimeSlot,
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      {/* Top mini-bar */}
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Overview</span>
        </button>
        <div className="text-xs text-slate-400 font-medium">
          Step 2 of 3 • Choose Hearing Date & Slot
        </div>
      </div>

      {/* Main 2-Column Full Screen Container */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        {/* =========================================================================
            LEFT COLUMN: DARK NAVY BRANDING & FEATURES
            ========================================================================= */}
        <div className="lg:col-span-5 bg-[#002B49] text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
          {/* Geometric overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FFD200] rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 space-y-8">
            {/* Brand Header */}
            <div className="flex items-center gap-2">
              <span className="text-[#FFD200] text-2xl font-black tracking-tight">
                BharatFiling
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-blue-900/60 text-blue-200 border border-blue-400/30">
                GST Litigation Desk
              </span>
            </div>

            {/* Headline */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                Choose How You'd Like to Start
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed">
                Schedule your notice hearing briefing and strategy session with an authorized GST Litigator for {formData.problemType || 'your GST notice'}.
              </p>
            </div>

            {/* Visual Feature Cards */}
            <div className="space-y-4 pt-2">
              {/* Card 1 */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/15">
                <div className="flex items-center gap-2 text-xs font-bold text-[#FFD200] mb-2">
                  <Clock className="w-4 h-4" />
                  <span>Pre-Hearing Docket Briefing</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Comprehensive scrutiny of the SCN, reconciliation of tax demands, and evidence assembly.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/15 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center font-bold">
                    <Scale className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Authorized Under Section 116</div>
                    <div className="text-[11px] text-slate-300">Direct representation before Superintendent & AC</div>
                  </div>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping" />
              </div>

              {/* Card 3 */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/15">
                <div className="text-xs font-bold text-[#FFD200] mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Hearing Note & Order Tracking</span>
                </div>
                <ul className="text-[11px] text-slate-300 space-y-1 list-disc list-inside">
                  <li>Written submissions and post-hearing rejoinder filing</li>
                  <li>Ineligible penalty dropping advocacy</li>
                  <li>Tracking until final order in Form DRC-05 / DRC-08</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="relative z-10 pt-8 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
            <span>Client confidentiality guaranteed</span>
            <span>Natural Justice Adjournment Support</span>
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN: DATE & TIME SLOT PICKER
            ========================================================================= */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 flex flex-col justify-between">
          <div className="max-w-2xl mx-auto w-full space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Left Subsection: Select Date Calendar */}
              <div className="md:col-span-7 space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Select Date
                </label>

                {/* Calendar Card */}
                <div className="border border-slate-200 rounded-xl p-4 shadow-sm bg-white">
                  {/* Month header */}
                  <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2.5">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-[#002B49]" />
                      <span className="text-sm font-bold text-[#002B49]">
                        {monthNames[currentMonth]} {currentYear}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={handlePrevMonth}
                        className="p-1 rounded hover:bg-slate-100 text-slate-600 transition cursor-pointer"
                        aria-label="Previous month"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNextMonth}
                        className="p-1 rounded hover:bg-slate-100 text-slate-600 transition cursor-pointer"
                        aria-label="Next month"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Day of Week Headers */}
                  <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                      <span key={d} className="text-[11px] font-semibold text-slate-400">
                        {d}
                      </span>
                    ))}
                  </div>

                  {/* Calendar Days Grid */}
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {Array.from({ length: firstDayIndex }).map((_, i) => (
                      <div key={`blank-${i}`} className="h-8 text-xs text-slate-300 flex items-center justify-center">
                        {28 + i}
                      </div>
                    ))}

                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const dayNum = i + 1;
                      const isSelected = selectedDay === dayNum;
                      return (
                        <button
                          key={dayNum}
                          type="button"
                          onClick={() => handleDaySelect(dayNum)}
                          className={`h-8 w-8 mx-auto rounded-full text-xs font-semibold flex items-center justify-center transition cursor-pointer ${
                            isSelected
                              ? 'bg-[#002B49] text-white shadow-sm ring-2 ring-[#002B49]/30 font-bold'
                              : 'text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {dayNum}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Subsection: Select Time Slots */}
              <div className="md:col-span-5 space-y-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Select Time
                </label>

                {/* Afternoon */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    <span>Afternoon</span>
                  </div>
                  <div className="space-y-1.5">
                    {SCHEDULE_TIME_SLOTS.Afternoon.map((slot) => {
                      const isSelected = selectedTimeSlot === slot.id;
                      return (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot.id)}
                          className={`w-full py-2 px-3 rounded-lg text-xs font-semibold text-center transition cursor-pointer border ${
                            isSelected
                              ? 'bg-[#002B49] text-white border-[#002B49] shadow-sm'
                              : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                          }`}
                        >
                          {slot.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Evening */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                    <Sunset className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Evening</span>
                  </div>
                  <div className="space-y-1.5">
                    {SCHEDULE_TIME_SLOTS.Evening.map((slot) => {
                      const isSelected = selectedTimeSlot === slot.id;
                      return (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot.id)}
                          className={`w-full py-2 px-3 rounded-lg text-xs font-semibold text-center transition cursor-pointer border ${
                            isSelected
                              ? 'bg-[#002B49] text-white border-[#002B49] shadow-sm'
                              : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                          }`}
                        >
                          {slot.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Notification alert banner */}
            <div className="bg-sky-50/80 border border-sky-200/80 rounded-xl p-3.5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white border border-sky-200 flex items-center justify-center text-sky-700 flex-shrink-0">
                <Phone className="w-4 h-4 text-sky-600 animate-bounce" />
              </div>
              <p className="text-xs text-sky-950 leading-relaxed">
                <strong>Our senior GST counsel will call you shortly from 80448 *****</strong> at your booked slot. Please have your notice copy and returns handy.
              </p>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="max-w-2xl mx-auto w-full pt-8 mt-6 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={onBack}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition cursor-pointer"
            >
              Back
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!selectedDay || !selectedTimeSlot}
              className="py-3 px-8 bg-[#002B49] hover:bg-[#001f35] text-white font-bold text-sm rounded-lg shadow-md transition-all duration-200 transform active:scale-[0.99] cursor-pointer flex items-center gap-2"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
