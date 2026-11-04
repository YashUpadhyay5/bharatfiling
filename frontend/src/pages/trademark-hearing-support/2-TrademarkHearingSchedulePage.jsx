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
  Award,
} from 'lucide-react';
import { SCHEDULE_TIME_SLOTS } from './constants.js';

export default function TrademarkHearingSchedulePage({
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
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl sm:text-2xl font-black text-[#002B49] tracking-tight">
              BharatFiling
            </span>
            <span className="hidden sm:inline-block text-[11px] font-bold text-slate-400 border-l border-slate-200 pl-3">
              Trademark Hearing Briefing Slot
            </span>
          </div>

          <button
            type="button"
            onClick={onBack}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Details</span>
          </button>
        </div>
      </header>

      {/* Main Grid View */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden min-h-[640px]">
          {/* =========================================================================
              LEFT BLUE PROMO PANEL (#002B49)
              ========================================================================= */}
          <div className="lg:col-span-5 bg-[#002B49] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
            {/* Background geometric accents */}
            <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-amber-400/10 blur-2xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              {/* Logo / Brand mark */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-black text-amber-400 text-sm">
                  BF
                </div>
                <span className="text-lg font-black tracking-tight text-white">
                  BharatFiling
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  Choose How You'd Like to Start
                </h1>
                <p className="text-xs sm:text-sm text-blue-100 font-normal leading-relaxed">
                  Lock your pre-hearing strategy session with a certified Trademark Agent & High Court IP Counsel.
                </p>
              </div>

              {/* Graphic Mock Card 1: Virtual TMR Conference */}
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 shadow-lg space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-amber-300">
                  <div className="flex items-center gap-1.5">
                    <Video className="w-4 h-4" />
                    <span>TMR Virtual Hearing Defense</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Live
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/50 border border-blue-400/30 flex items-center justify-center text-xl">
                    ⚖️
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-white">
                      Advocate Neha Rajyaguru
                    </div>
                    <div className="text-[11px] text-blue-200">
                      Reg. Trademark Agent & IP Litigator
                    </div>
                    <div className="text-[10px] text-amber-300 font-medium">
                      12+ Yrs TMR Bench Advocacy
                    </div>
                  </div>
                </div>
              </div>

              {/* Graphic Mock Card 2: Legal Dossier Highlights */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Pre-Hearing Submissions Ready</span>
                </div>
                <ul className="text-[11px] text-blue-100/80 space-y-1.5 pl-1">
                  <li>• Form TM-48 Power of Attorney execution</li>
                  <li>• Section 9 user evidence & invoice bundle audit</li>
                  <li>• Section 11 judicial citation & whole mark comparison</li>
                </ul>
              </div>
            </div>

            {/* Bottom trust footer */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-[11px] text-blue-200/80 relative z-10">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Rule 145 Authorized
              </span>
              <span>All 5 Registry Benches</span>
            </div>
          </div>

          {/* =========================================================================
              RIGHT DATE & TIME PICKER PANEL
              ========================================================================= */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-black text-[#002B49]">
                  Select Date & Time Slot
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Choose a convenient time for your 30-minute pre-hearing case conference
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                {/* Left Sub-Column: Calendar */}
                <div className="md:col-span-7 space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <CalendarIcon className="w-4 h-4 text-[#002B49]" />
                      Select Date
                    </span>
                    <span className="text-xs font-bold text-[#002B49]">
                      {monthNames[currentMonth]} {currentYear}
                    </span>
                  </div>

                  {/* Calendar Widget Container */}
                  <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50">
                    {/* Month Navigator */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
                      <button
                        type="button"
                        onClick={handlePrevMonth}
                        className="p-1 rounded-lg hover:bg-slate-200 text-slate-600 transition cursor-pointer"
                        aria-label="Previous Month"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <span className="text-xs font-extrabold text-slate-800">
                        {monthNames[currentMonth]} {currentYear}
                      </span>

                      <button
                        type="button"
                        onClick={handleNextMonth}
                        className="p-1 rounded-lg hover:bg-slate-200 text-slate-600 transition cursor-pointer"
                        aria-label="Next Month"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Day of Week Headers */}
                    <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-slate-400 mb-2">
                      <span>Sun</span>
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                    </div>

                    {/* Day Grid */}
                    <div className="grid grid-cols-7 gap-1 text-center text-xs">
                      {/* Empty padding days */}
                      {Array.from({ length: firstDayIndex }).map((_, i) => (
                        <div key={`empty-${i}`} className="h-8" />
                      ))}

                      {/* Actual Month Days */}
                      {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1;
                        const isSelected = selectedDay === day;
                        const isPast = day < 4 && currentMonth <= 10 && currentYear === 2026;

                        return (
                          <button
                            key={day}
                            type="button"
                            disabled={isPast}
                            onClick={() => handleDaySelect(day)}
                            className={`h-8 w-8 mx-auto rounded-full flex items-center justify-center text-xs font-bold transition cursor-pointer ${
                              isSelected
                                ? 'bg-[#002B49] text-white shadow-md scale-105'
                                : isPast
                                ? 'text-slate-300 cursor-not-allowed'
                                : 'text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right Sub-Column: Time Slot Picker */}
                <div className="md:col-span-5 space-y-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#002B49]" />
                      Select Time
                    </span>
                    <span className="text-[11px] text-slate-400 font-semibold">
                      IST (GMT+5:30)
                    </span>
                  </div>

                  {/* Afternoon Slots */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <Sun className="w-3.5 h-3.5 text-amber-500" />
                      <span>Afternoon</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {SCHEDULE_TIME_SLOTS.Afternoon.map((slot) => (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot.id)}
                          className={`py-2 px-2.5 rounded-xl border text-center text-xs font-bold transition cursor-pointer ${
                            selectedTimeSlot === slot.id
                              ? 'border-[#002B49] bg-blue-50/50 text-[#002B49] ring-1 ring-[#002B49]'
                              : 'border-slate-200 hover:border-slate-300 text-slate-700'
                          }`}
                        >
                          {slot.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Evening Slots */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <Sunset className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Evening</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {SCHEDULE_TIME_SLOTS.Evening.map((slot) => (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot.id)}
                          className={`py-2 px-2.5 rounded-xl border text-center text-xs font-bold transition cursor-pointer ${
                            selectedTimeSlot === slot.id
                              ? 'border-[#002B49] bg-blue-50/50 text-[#002B49] ring-1 ring-[#002B49]'
                              : 'border-slate-200 hover:border-slate-300 text-slate-700'
                          }`}
                        >
                          {slot.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Call Notice Alert */}
              <div className="mt-8 p-4 rounded-xl bg-sky-50 border border-sky-200/80 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center flex-shrink-0 animate-bounce">
                  <Phone className="w-5 h-5" />
                </div>
                <p className="text-xs text-sky-950 leading-relaxed font-medium">
                  <strong>Our registered trademark attorney will call you shortly from 80448 *****</strong> - please answer the call to avoid missing your hearing briefing.
                </p>
              </div>
            </div>

            {/* Next Proceed Button */}
            <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={onBack}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 transition cursor-pointer"
              >
                Back
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={!selectedDay || !selectedTimeSlot}
                className="py-3 px-8 rounded-lg bg-[#002B49] hover:bg-[#001f35] text-white font-extrabold text-sm shadow-md transition-all duration-200 transform active:scale-[0.99] cursor-pointer flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
