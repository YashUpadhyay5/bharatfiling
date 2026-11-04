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
} from 'lucide-react';
import { SCHEDULE_TIME_SLOTS } from './constants.js';

export default function CAConsultationSchedulePage({
  formData = {},
  onBack,
  onProceed,
}) {
  // Calendar state - Defaults to November 2026 as shown in screenshot
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(10); // 0-indexed: 10 = November
  const [selectedDay, setSelectedDay] = useState(
    formData.scheduledDay || 4 // Wednesday 4th as in screenshot
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
          Step 2 of 3 • Choose Date & Time
        </div>
      </div>

      {/* Main 2-Column Full Screen Container (1:1 with media_1793774635144_045925d5.png) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        {/* =========================================================================
            LEFT COLUMN (Navy Blue Background with Zolvit / BharatFiling Graphics)
        ========================================================================= */}
        <div className="lg:col-span-5 bg-[#002B49] text-white p-8 sm:p-12 lg:p-14 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Brand Logo */}
          <div className="relative z-10 space-y-8">
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#FFD200] text-slate-950 font-black text-xs tracking-wider uppercase shadow-2xs">
                <span>BHARAT</span>
                <span className="font-semibold text-slate-900">FILING</span>
              </div>
            </div>

            <div className="space-y-3">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Choose How You&apos;d Like to Start
              </h1>
              <p className="text-xs sm:text-sm text-blue-200 font-normal leading-relaxed">
                Connect directly with a verified Chartered Accountant at a date
                and time convenient for you.
              </p>
            </div>
          </div>

          {/* Center Graphic & Mock Cards matching screenshot 1:1 */}
          <div className="relative my-8 z-10">
            {/* Main Expert Photo Container */}
            <div className="relative mx-auto w-64 h-64 sm:w-72 sm:h-72">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=500&fit=crop&crop=face"
                alt="CA Expert"
                className="w-full h-full object-cover rounded-3xl shadow-2xl border-2 border-white/20"
              />

              {/* Floating Pill: Get Consultation Video Call */}
              <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md text-slate-900 p-3 rounded-2xl shadow-xl border border-white/40 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  <Video className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-900">
                    Get Consultation
                  </div>
                  <div className="text-[9px] text-emerald-600 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>CA Live on Call</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Card: Summary Highlights matching screenshot */}
            <div className="mt-8 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-left text-xs text-white space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#FFD200]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Summary Highlights</span>
              </div>
              <ul className="text-[11px] text-blue-100 space-y-1.5 list-disc pl-4 leading-relaxed font-normal">
                <li>
                  Upload any document or paste query &mdash; get a clear
                  assessment in seconds.
                </li>
                <li>
                  Choose phone, video or screen-share format that fits your
                  schedule.
                </li>
                <li>
                  Share summaries with your CA specialist for faster tax decisions.
                </li>
              </ul>
            </div>
          </div>

          {/* ISO 27001 Security Note at Bottom */}
          <div className="relative z-10 flex items-center gap-2 text-[11px] text-blue-200/80 pt-4 border-t border-white/10">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-300" />
            <span>Bank-Grade 256-Bit SSL Encrypted • Confidential Advisory</span>
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN (White Background: Select Date & Select Time)
        ========================================================================= */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* LEFT SUB-COLUMN: Select Date Calendar */}
              <div className="md:col-span-7 space-y-4">
                <h3 className="text-sm font-bold text-slate-900">Select Date</h3>

                {/* Calendar Card (1:1 with media_1793774635144_045925d5.png) */}
                <div className="rounded-xl border border-slate-300 p-4 bg-white shadow-2xs space-y-4">
                  {/* Month Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-slate-500" />
                      <span className="text-sm font-bold text-slate-900">
                        {monthNames[currentMonth]} {currentYear}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={handlePrevMonth}
                        className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-600 transition cursor-pointer"
                        aria-label="Previous month"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNextMonth}
                        className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-600 transition cursor-pointer"
                        aria-label="Next month"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Day Names Grid */}
                  <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-400">
                    <div>Sun</div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                  </div>

                  {/* Days Matrix */}
                  <div className="grid grid-cols-7 gap-1 text-center text-xs">
                    {/* Empty cells before month start */}
                    {Array.from({ length: firstDayIndex }).map((_, i) => (
                      <div key={`empty-${i}`} className="h-8" />
                    ))}

                    {/* Day numbers */}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const dayNumber = i + 1;
                      const isSelected = selectedDay === dayNumber;

                      return (
                        <button
                          key={dayNumber}
                          type="button"
                          onClick={() => handleDaySelect(dayNumber)}
                          className={`h-8 w-8 mx-auto rounded-full flex items-center justify-center transition-all cursor-pointer font-medium ${
                            isSelected
                              ? 'bg-[#002B49] text-white font-bold shadow-xs'
                              : 'text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {dayNumber}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Callout Notice Box matching screenshot 1:1 */}
                <div className="p-3.5 bg-[#F0F9FF] rounded-xl border border-blue-200/80 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <p className="text-[11px] text-slate-700 leading-snug font-medium">
                    Our legal & tax expert will call you shortly from{' '}
                    <span className="font-bold text-slate-900">80448 *****</span>{' '}
                    &mdash; please answer the call to avoid missing your
                    consultation.
                  </p>
                </div>
              </div>

              {/* RIGHT SUB-COLUMN: Select Time Slot */}
              <div className="md:col-span-5 space-y-5">
                <h3 className="text-sm font-bold text-slate-900">Select Time</h3>

                {/* Afternoon Slots Group */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    <span>Afternoon</span>
                  </div>

                  <div className="space-y-2">
                    {SCHEDULE_TIME_SLOTS.Afternoon.map((slot) => {
                      const isSelected = selectedTimeSlot === slot.id;
                      return (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot.id)}
                          className={`w-full py-2.5 px-3 rounded-lg border text-xs font-semibold transition cursor-pointer text-center ${
                            isSelected
                              ? 'border-[#002B49] bg-blue-50/50 text-[#002B49] ring-2 ring-blue-100 font-bold shadow-2xs'
                              : 'border-slate-300 text-slate-700 hover:border-slate-400 bg-white'
                          }`}
                        >
                          {slot.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Evening Slots Group */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                    <Sunset className="w-3.5 h-3.5 text-orange-500" />
                    <span>Evening</span>
                  </div>

                  <div className="space-y-2">
                    {SCHEDULE_TIME_SLOTS.Evening.map((slot) => {
                      const isSelected = selectedTimeSlot === slot.id;
                      return (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot.id)}
                          className={`w-full py-2.5 px-3 rounded-lg border text-xs font-semibold transition cursor-pointer text-center ${
                            isSelected
                              ? 'border-[#002B49] bg-blue-50/50 text-[#002B49] ring-2 ring-blue-100 font-bold shadow-2xs'
                              : 'border-slate-300 text-slate-700 hover:border-slate-400 bg-white'
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
          </div>

          {/* Bottom Bar with Next Button matching screenshot 1:1 */}
          <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl border border-slate-300 hover:border-slate-500 text-xs font-bold text-slate-700 bg-white transition cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!selectedDay || !selectedTimeSlot}
              className="px-8 py-3.5 rounded-xl bg-[#002B49] hover:bg-[#001D32] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-40"
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
