import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  CreditCard,
  Landmark,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Printer,
  Clock,
  Phone,
  Sparkles,
  Check,
} from 'lucide-react';

import {
  LOAN_CHECKOUT,
  POPULAR_BANKS,
  ALL_NET_BANKS,
} from './constants.js';

export default function LoanCheckoutPage({
  formData = {},
  orderId = '',
  onBack,
  onPaymentSuccess,
}) {
  const navigate = useNavigate();

  // Active payment method: 'upi' | 'card' | 'netbanking'
  const [activeMethod, setActiveMethod] = useState('upi');

  // Selected UPI App: 'phonepe' | 'gpay' | 'paytm' | 'other'
  const [selectedUpiApp, setSelectedUpiApp] = useState('phonepe');
  const [customVpa, setCustomVpa] = useState('');

  // Card details state
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  // Net banking state
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // Date and Time slot state
  const [selectedDay, setSelectedDay] = useState(4); // Default 4th November 2026
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('2:00 PM');

  // Taxes and charges breakdown collapse
  const [taxesExpanded, setTaxesExpanded] = useState(true);
  const [includeLabourWelfare, setIncludeLabourWelfare] = useState(true);

  // Submission / Loading / Success states
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const resolvedOrderId =
    orderId ||
    formData.orderNumber ||
    `#LN-${Math.floor(100000 + Math.random() * 900000)}`;

  // Price calculations
  const consultationFee = LOAN_CHECKOUT.consultationFee;
  const couponDiscount = LOAN_CHECKOUT.couponDiscount;
  const subTotal = consultationFee - couponDiscount; // 499

  const labourWelfare = includeLabourWelfare ? LOAN_CHECKOUT.labourWelfare : 0;
  const labourWelfareGst = includeLabourWelfare ? LOAN_CHECKOUT.labourWelfareGst : 0;
  const taxesAndCharges = labourWelfare + labourWelfareGst; // 26 or 0
  const totalAmount = subTotal + taxesAndCharges; // 525 or 499

  const handlePayNow = async () => {
    setErrorMessage('');

    if (activeMethod === 'card') {
      const cleanNum = cardDetails.number.replace(/\s/g, '');
      if (cleanNum.length < 12 || !cardDetails.expiry || cardDetails.cvv.length < 3) {
        setErrorMessage('Please enter complete and valid card details');
        return;
      }
    }

    if (activeMethod === 'upi' && selectedUpiApp === 'other' && !customVpa.includes('@')) {
      setErrorMessage('Please enter a valid UPI ID (e.g. founder@okhdfcbank)');
      return;
    }

    setIsProcessing(true);

    try {
      const res = await fetch('/api/v1/loans/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: resolvedOrderId,
          method: activeMethod.toUpperCase(),
          subMethod:
            activeMethod === 'upi'
              ? selectedUpiApp
              : activeMethod === 'card'
              ? 'Card'
              : selectedBank,
          amount: totalAmount,
          includeLabourWelfare,
          applicantName: formData.name || 'Borrower',
          applicantEmail: formData.email,
          applicantPhone: formData.phone,
          schemeId: formData.selectedSchemeId || 'unsecured-business',
          schemeName: formData.selectedSchemeName || 'Unsecured Business Loan',
          loanAmount: formData.loanAmount || formData.desiredAmount || 1500000,
          bookedSlot: `${selectedDay} November 2026 at ${selectedTimeSlot}`,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setTransactionId(data.transactionId);
        setIsSuccess(true);

        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch {
          // Ignore confetti errors
        }

        if (onPaymentSuccess) {
          onPaymentSuccess({
            transactionId: data.transactionId,
            orderId: resolvedOrderId,
            amount: totalAmount,
            date: new Date().toISOString(),
            bookedSlot: `${selectedDay} November 2026 at ${selectedTimeSlot}`,
          });
        }
      } else {
        setErrorMessage(data.message || 'Payment processing failed. Please try again.');
      }
    } catch {
      // Offline fallback simulation
      const mockTxn = `BFP-LN-${Date.now().toString().slice(-8)}`;
      setTransactionId(mockTxn);
      setIsSuccess(true);
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch {
        // Ignore
      }
      if (onPaymentSuccess) {
        onPaymentSuccess({
          transactionId: mockTxn,
          orderId: resolvedOrderId,
          amount: totalAmount,
          date: new Date().toISOString(),
          bookedSlot: `${selectedDay} November 2026 at ${selectedTimeSlot}`,
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  // Render Confirmation Receipt if paid
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-[#002B49] text-white p-8 text-center relative">
            <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-black tracking-tight">
              Application & Strategy Session Confirmed!
            </h1>
            <p className="text-xs text-blue-200 mt-1">
              Your business loan file has been queued for CA credit appraisal.
            </p>
            <div className="mt-4 inline-block bg-white/10 px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider">
              Dossier No: {resolvedOrderId}
            </div>
          </div>

          {/* Details */}
          <div className="p-8 space-y-6">
            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 flex items-start gap-3">
              <Phone className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
              <div className="text-xs text-slate-700 leading-relaxed">
                <span className="font-bold text-slate-900 block mb-0.5">
                  Scheduled Consultation Call
                </span>
                Our Senior Banking & SME Credit Advisor will call you on{' '}
                <span className="font-bold text-[#002B49]">
                  {selectedDay} November 2026 at {selectedTimeSlot}
                </span>{' '}
                from <span className="font-bold text-blue-700">80448 *****</span>. Please keep your current bank statements and GST login ready.
              </div>
            </div>

            {/* Specialist Assignment */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Assigned Credit Specialist
                </span>
                <span className="text-sm font-bold text-slate-900">
                  CA Raghavan Srinivasan
                </span>
                <span className="text-xs text-slate-500 block">
                  Fellow Chartered Accountant & Ex-SBI Credit Appraisal Head
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
                CA
              </div>
            </div>

            {/* Receipt Table */}
            <div className="border border-slate-200 rounded-2xl p-4 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Loan Scheme</span>
                <span className="font-bold text-slate-800">
                  {formData.selectedSchemeName || 'Unsecured Business Loan'}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Requested Loan Limit</span>
                <span className="font-bold text-emerald-600">
                  ₹{Number(formData.loanAmount || formData.desiredAmount || 1500000).toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Transaction ID</span>
                <span className="font-mono font-bold text-slate-700">{transactionId}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Payment Method</span>
                <span className="font-bold text-slate-700">{activeMethod.toUpperCase()}</span>
              </div>
              <div className="flex justify-between py-1.5 pt-2 text-sm font-black">
                <span className="text-slate-900">Total Paid</span>
                <span className="text-[#002B49]">₹{totalAmount}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 py-3 px-4 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Receipt</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="flex-1 py-3 px-4 rounded-xl bg-[#002B49] text-white text-xs font-bold hover:bg-slate-900 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Track Application in Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Active Checkout Screen
  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Top Back bar */}
        <div className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#002B49] transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Financial Profile</span>
          </button>
          <div className="text-xs font-mono text-slate-400 font-semibold">
            Dossier ID: {resolvedOrderId}
          </div>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Date/Time Picker + Payment Methods (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Calendar & Slot Booking */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="border-b border-slate-100 pb-3 mb-4">
                <span className="text-[10px] font-black uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                  Step 1 of 2
                </span>
                <h2 className="text-lg font-black text-[#002B49] mt-1">
                  Choose When You'd Like Your Credit Strategy Call
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Select Date: November 2026 Calendar */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-slate-700">Select Date</span>
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                      November 2026
                    </span>
                  </div>

                  {/* Calendar Grid */}
                  <div className="border border-slate-200 rounded-xl p-3 bg-slate-50/50">
                    <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 mb-2">
                      <span>Sun</span>
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-xs font-semibold">
                      {[1, 2, 3].map((d) => (
                        <div key={d} className="py-2 text-slate-300 text-center">
                          {d}
                        </div>
                      ))}
                      {[4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map((d) => {
                        const isSelected = selectedDay === d;
                        return (
                          <button
                            key={d}
                            type="button"
                            onClick={() => setSelectedDay(d)}
                            className={`py-2 rounded-lg text-center font-bold transition cursor-pointer ${
                              isSelected
                                ? 'bg-[#002B49] text-white shadow-xs'
                                : 'hover:bg-blue-50 text-slate-700'
                            }`}
                          >
                            {d}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Select Time Slots */}
                <div>
                  <span className="text-xs font-bold text-slate-700 block mb-2">
                    Select Time Slot
                  </span>

                  {/* Afternoon */}
                  <div className="mb-3">
                    <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1 mb-1.5">
                      <Clock className="w-3 h-3" /> Afternoon
                    </span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {['1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'].map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`py-1.5 px-2 rounded-lg text-xs font-bold border transition text-center cursor-pointer ${
                            selectedTimeSlot === slot
                              ? 'bg-[#002B49] text-white border-[#002B49]'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Evening */}
                  <div>
                    <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1 mb-1.5">
                      <Clock className="w-3 h-3" /> Evening
                    </span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {['4:00 PM', '4:30 PM', '5:00 PM'].map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`py-1.5 px-2 rounded-lg text-xs font-bold border transition text-center cursor-pointer ${
                            selectedTimeSlot === slot
                              ? 'bg-[#002B49] text-white border-[#002B49]'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Notice Box matching user screenshot */}
              <div className="mt-5 p-3 rounded-xl bg-[#EBF5FB] border border-[#D4E6F1] flex items-center gap-3">
                <span className="text-xl">📱</span>
                <p className="text-xs text-slate-700 leading-snug">
                  Our senior credit advisor will call you shortly from{' '}
                  <span className="font-bold text-[#002B49]">80448 *****</span> - please answer the call to avoid missing your consultation.
                </p>
              </div>
            </div>

            {/* Step 2: Payment Method Selection */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="border-b border-slate-100 pb-3 mb-4">
                <span className="text-[10px] font-black uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                  Step 2 of 2
                </span>
                <h2 className="text-lg font-black text-[#002B49] mt-1">
                  Choose Payment Method
                </h2>
                <span className="text-xs text-slate-500">Payment Options</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 border border-slate-200 rounded-xl overflow-hidden">
                {/* Method Tabs (Left 4 Cols) */}
                <div className="md:col-span-4 bg-slate-50 border-r border-slate-200 flex flex-col">
                  {/* UPI */}
                  <button
                    type="button"
                    onClick={() => setActiveMethod('upi')}
                    className={`p-3.5 text-left text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                      activeMethod === 'upi'
                        ? 'bg-white text-[#002B49] border-l-4 border-l-[#002B49] shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <div>
                      <div className="font-extrabold">UPI</div>
                      <div className="text-[10px] text-slate-400 font-normal">Gpay, PhonePe, Paytm</div>
                    </div>
                    {activeMethod === 'upi' && <ChevronRight className="w-4 h-4 text-[#002B49]" />}
                  </button>

                  {/* Card */}
                  <button
                    type="button"
                    onClick={() => setActiveMethod('card')}
                    className={`p-3.5 text-left text-xs font-bold transition flex items-center justify-between cursor-pointer border-t border-slate-200 ${
                      activeMethod === 'card'
                        ? 'bg-white text-[#002B49] border-l-4 border-l-[#002B49] shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <div>
                      <div className="font-extrabold">Credit/Debit/ATM Card</div>
                      <div className="text-[10px] text-slate-400 font-normal">Visa, Mastercard, Rupay</div>
                    </div>
                    {activeMethod === 'card' && <ChevronRight className="w-4 h-4 text-[#002B49]" />}
                  </button>

                  {/* Net Banking */}
                  <button
                    type="button"
                    onClick={() => setActiveMethod('netbanking')}
                    className={`p-3.5 text-left text-xs font-bold transition flex items-center justify-between cursor-pointer border-t border-slate-200 ${
                      activeMethod === 'netbanking'
                        ? 'bg-white text-[#002B49] border-l-4 border-l-[#002B49] shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <div>
                      <div className="font-extrabold">Net Banking</div>
                      <div className="text-[10px] text-slate-400 font-normal">All Indian Banks</div>
                    </div>
                    {activeMethod === 'netbanking' && <ChevronRight className="w-4 h-4 text-[#002B49]" />}
                  </button>
                </div>

                {/* Tab Content (Right 8 Cols) */}
                <div className="md:col-span-8 p-5 bg-white">
                  {/* UPI Pane */}
                  {activeMethod === 'upi' && (
                    <div className="space-y-4">
                      <div className="text-xs font-bold text-slate-800">Pay with UPI</div>
                      <div className="text-[11px] text-slate-500">Select UPI App</div>

                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { id: 'gpay', name: 'Google pay', icon: '🟢' },
                          { id: 'phonepe', name: 'PhonePe', icon: '🟣' },
                          { id: 'paytm', name: 'Paytm', icon: '🔵' },
                          { id: 'other', name: 'Other UPI ID', icon: '🆔' },
                        ].map((app) => (
                          <button
                            key={app.id}
                            type="button"
                            onClick={() => setSelectedUpiApp(app.id)}
                            className={`p-2 rounded-xl border text-center transition cursor-pointer relative ${
                              selectedUpiApp === app.id
                                ? 'border-[#002B49] bg-blue-50/50 ring-1 ring-[#002B49]'
                                : 'border-slate-200 bg-white hover:bg-slate-50'
                            }`}
                          >
                            {selectedUpiApp === app.id && (
                              <div className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#002B49] text-white rounded-full flex items-center justify-center text-[9px]">
                                ✓
                              </div>
                            )}
                            <div className="text-xl mb-1">{app.icon}</div>
                            <div className="text-[10px] font-bold text-slate-800 truncate">
                              {app.name}
                            </div>
                          </button>
                        ))}
                      </div>

                      {selectedUpiApp === 'other' ? (
                        <div className="mt-2">
                          <input
                            type="text"
                            value={customVpa}
                            onChange={(e) => setCustomVpa(e.target.value)}
                            placeholder="e.g. 9876543210@paytm or name@okhdfcbank"
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs outline-none focus:border-blue-500"
                          />
                        </div>
                      ) : (
                        <div className="text-[11px] text-slate-500 mt-2">
                          Pay through the {selectedUpiApp === 'phonepe' ? 'PhonePe' : selectedUpiApp === 'gpay' ? 'Google Pay' : 'Paytm'} app on your phone.
                        </div>
                      )}
                    </div>
                  )}

                  {/* Card Pane */}
                  {activeMethod === 'card' && (
                    <div className="space-y-3">
                      <div className="text-xs font-bold text-slate-800">Enter Card Details</div>
                      <div>
                        <input
                          type="text"
                          maxLength="19"
                          value={cardDetails.number}
                          onChange={(e) => setCardDetails((p) => ({ ...p, number: e.target.value }))}
                          placeholder="Card Number (16 Digits)"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs outline-none focus:border-blue-500 font-mono"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          maxLength="5"
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails((p) => ({ ...p, expiry: e.target.value }))}
                          placeholder="MM/YY"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs outline-none focus:border-blue-500 font-mono"
                        />
                        <input
                          type="password"
                          maxLength="4"
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails((p) => ({ ...p, cvv: e.target.value }))}
                          placeholder="CVV"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs outline-none focus:border-blue-500 font-mono"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          value={cardDetails.name}
                          onChange={(e) => setCardDetails((p) => ({ ...p, name: e.target.value }))}
                          placeholder="Cardholder Name"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  )}

                  {/* Net Banking Pane */}
                  {activeMethod === 'netbanking' && (
                    <div className="space-y-3">
                      <div className="text-xs font-bold text-slate-800">Popular Banks</div>
                      <div className="grid grid-cols-3 gap-2">
                        {POPULAR_BANKS.map((b) => (
                          <button
                            key={b.id}
                            type="button"
                            onClick={() => setSelectedBank(b.name)}
                            className={`p-2 rounded-lg border text-center text-[11px] font-bold transition cursor-pointer ${
                              selectedBank === b.name
                                ? 'bg-blue-50 border-blue-600 text-blue-900 ring-1 ring-blue-500'
                                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            {b.code}
                          </button>
                        ))}
                      </div>

                      <div className="pt-2">
                        <label className="text-[11px] text-slate-500 block mb-1">
                          Or select any other bank:
                        </label>
                        <select
                          value={selectedBank}
                          onChange={(e) => setSelectedBank(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-700 outline-none"
                        >
                          {ALL_NET_BANKS.map((bnk, i) => (
                            <option key={i} value={bnk}>
                              {bnk}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Order Summary & Pay CTA (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Hooray Discount Ribbon matching screenshot */}
            <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white p-3 rounded-2xl shadow-sm text-center text-xs font-bold flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Hooray! ₹500 Discount Unlocked!</span>
            </div>

            {/* Price Details Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div>
                <h3 className="text-base font-black text-[#002B49]">
                  Consult a Senior Credit Advisor & Bank Loan Specialist
                </h3>
                <div className="space-y-1.5 mt-2.5 text-xs text-slate-600">
                  <div className="flex items-start gap-2">
                    <span className="text-slate-400 font-bold">1.</span>
                    <span>15-minute 1-on-1 strategy call with an ex-bank credit officer & CA.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-400 font-bold">2.</span>
                    <span>Get eligibility guidance on MUDRA, CGTMSE & Unsecured Business Loans.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-400 font-bold">3.</span>
                    <span>Direct matchmaking with 35+ nationalized and private bank branches.</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3 space-y-2.5">
                <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5 text-blue-600" />
                  <span>Price details</span>
                </div>

                <div className="flex justify-between text-xs text-slate-600">
                  <span>Application & Advisory Fee (GST incl)</span>
                  <span className="font-semibold text-slate-900">₹{consultationFee}</span>
                </div>

                <div className="flex justify-between text-xs items-center">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-600 font-mono text-[11px]">{LOAN_CHECKOUT.couponCode}</span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded">
                      expires in 2 days
                    </span>
                  </div>
                  <span className="font-bold text-emerald-600">-₹{couponDiscount}</span>
                </div>

                <div className="flex justify-between text-xs text-slate-700 pt-1 border-t border-slate-100 font-semibold">
                  <span>Sub Total Amount</span>
                  <span>₹{subTotal}</span>
                </div>

                {/* Taxes & Charges Collapsible */}
                <div className="border-t border-slate-100 pt-2">
                  <button
                    type="button"
                    onClick={() => setTaxesExpanded(!taxesExpanded)}
                    className="w-full flex items-center justify-between text-xs text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    <span className="flex items-center gap-1">
                      {taxesExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      Taxes & Charges
                    </span>
                    <span className="font-semibold text-slate-800">₹{taxesAndCharges}</span>
                  </button>

                  {taxesExpanded && (
                    <div className="mt-2 pl-4 pr-1 py-1.5 bg-slate-50 rounded-lg text-[11px] space-y-1.5">
                      <div className="flex justify-between items-center text-slate-600">
                        <span>Labour Welfare Endowment</span>
                        <div className="flex items-center gap-2">
                          {includeLabourWelfare && (
                            <button
                              type="button"
                              onClick={() => setIncludeLabourWelfare(false)}
                              className="text-rose-600 border border-rose-200 bg-white px-1.5 py-0.5 rounded text-[10px] font-bold hover:bg-rose-50"
                            >
                              Remove
                            </button>
                          )}
                          <span>₹{includeLabourWelfare ? 22 : 0}</span>
                        </div>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>GST on labour welfare (18%)</span>
                        <span>₹{includeLabourWelfare ? 4 : 0}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                  <span className="text-sm font-black text-slate-900">Total Amount</span>
                  <span className="text-2xl font-black text-[#002B49]">₹{totalAmount}</span>
                </div>
              </div>

              {/* Error Alert */}
              {errorMessage && (
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                  {errorMessage}
                </div>
              )}

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-2 text-center text-[10px] text-slate-500 pt-1">
                <div className="flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>100% Secure Payment</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Guaranteed Satisfaction</span>
                </div>
              </div>

              {/* Pay Now Button */}
              <button
                type="button"
                onClick={handlePayNow}
                disabled={isProcessing}
                className="w-full py-4 px-6 rounded-xl bg-[#002B49] hover:bg-[#001f35] text-white font-black text-sm tracking-wide shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing ₹{totalAmount}...</span>
                  </>
                ) : (
                  <span>PAY ₹{totalAmount}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
