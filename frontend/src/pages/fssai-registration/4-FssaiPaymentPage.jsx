import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  CreditCard,
  Landmark,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Loader2,
  Check,
  ArrowRight,
  Download,
  Lock,
  BadgeCheck,
  CircleDollarSign,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext.jsx';
import { getFssaiPlan } from './constants.js';

const NET_BANKS = [
  'State Bank of India',
  'HDFC Bank',
  'ICICI Bank',
  'Axis Bank',
  'Kotak Mahindra Bank',
  'Punjab National Bank',
  'Bank of Baroda',
  'IDFC FIRST Bank',
];

export default function FssaiPaymentPage({
  planId: propPlanId,
  formData = {},
  onPaymentSuccess,
}) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();

  const selectedPlanKey =
    propPlanId || searchParams.get('plan') || formData.plan || 'standard';
  const currentPlan = getFssaiPlan(selectedPlanKey);

  // Pricing Model matching 1:1 Vakilsearch Reference Screenshot:
  // In Screenshot:
  // Professional Fees: ₹3812
  // GST on fee (18%): ₹687 (3812 + 687 = ₹4499 plan price)
  // Labour Welfare Endowment: ₹229
  // GST on labour welfare (18%): ₹42 (229 + 42 = ₹271)
  // Total Amount = ₹4770
  const planPrice = currentPlan.price || 3999;
  const basePrice = Math.round(planPrice / 1.18);
  const gstOnFee = planPrice - basePrice;

  // Labour Welfare toggle (default: true matching screenshot)
  const [includeLabourWelfare, setIncludeLabourWelfare] = useState(true);
  const labourWelfareAmount = includeLabourWelfare
    ? (planPrice <= 1000 ? 77 : 229)
    : 0;
  const gstOnLabour = includeLabourWelfare
    ? Math.round(labourWelfareAmount * 0.18)
    : 0;

  const totalTaxes = gstOnFee + labourWelfareAmount + gstOnLabour;
  const totalAmount = basePrice + totalTaxes;

  // Taxes breakdown dropdown state (open by default per screenshot)
  const [isTaxesExpanded, setIsTaxesExpanded] = useState(true);

  // Active payment method tab: 'upi' | 'card' | 'netbanking' | 'emi'
  const [activeTab, setActiveTab] = useState('upi');

  // Selected UPI app: 'phonepe' | 'gpay' | 'paytm' | 'other'
  const [selectedUpiApp, setSelectedUpiApp] = useState('phonepe');
  const [customUpiId, setCustomUpiId] = useState('');

  // Card Inputs
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');

  // Net banking
  const [selectedBank, setSelectedBank] = useState('State Bank of India');

  // EMI Tenure
  const [selectedEmiTenure, setSelectedEmiTenure] = useState(
    '3 Months - ₹' + Math.round(totalAmount / 3) + '/mo'
  );

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  const getUpiAppName = () => {
    switch (selectedUpiApp) {
      case 'gpay':
        return 'Google pay';
      case 'phonepe':
        return 'PhonePe';
      case 'paytm':
        return 'Paytm';
      default:
        return 'UPI';
    }
  };

  const handlePay = async (e) => {
    if (e) e.preventDefault();

    if (activeTab === 'upi' && selectedUpiApp === 'other' && !customUpiId.includes('@')) {
      showError('Please enter a valid UPI ID (e.g. yourname@okaxis)');
      return;
    }

    if (activeTab === 'card') {
      if (cardNumber.replace(/\s/g, '').length < 16) {
        showError('Please enter a valid 16-digit card number');
        return;
      }
      if (!cardExpiry || !cardCvv) {
        showError('Please enter card expiry and CVV');
        return;
      }
    }

    setIsProcessing(true);

    try {
      // Simulate authentic secure payment processing
      await new Promise((res) => setTimeout(res, 1600));

      const txId = 'FSSAI-' + Math.floor(100000 + Math.random() * 900000);
      setTransactionId(txId);
      setIsSuccess(true);
      setIsProcessing(false);

      if (onPaymentSuccess) {
        onPaymentSuccess();
      }

      confetti({
        particleCount: 130,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch {
      setIsProcessing(false);
      showError('Payment processing failed. Please try again.');
    }
  };

  // --------------------------------------------------------------------------
  // SUCCESS RECEIPT VIEW
  // --------------------------------------------------------------------------
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center py-12 px-4 sm:px-6 font-sans">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl max-w-lg w-full p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <Check className="w-8 h-8 stroke-[3]" />
          </div>

          <div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
              Payment Confirmed
            </span>
            <h1 className="text-2xl font-black text-[#002B49] mt-2">
              FSSAI Application Order Placed!
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Transaction ID: <span className="font-mono font-bold text-slate-800">{transactionId}</span>
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Plan:</span>
              <span className="font-bold text-slate-900">{currentPlan.name} Plan</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Entity:</span>
              <span className="font-semibold text-slate-800">{formData.businessName || 'Food Business Operator'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Amount Paid:</span>
              <span className="font-bold text-emerald-700 font-mono text-sm">₹{totalAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Government Portal:</span>
              <span className="font-mono text-blue-700 font-semibold">FoSCoS Central Desk</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Your dedicated Food Licensing Advocate has been assigned. You will receive an onboarding call and WhatsApp confirmation within 15 minutes.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="flex-1 py-3 px-5 rounded-xl bg-[#002B49] hover:bg-[#001D32] text-white font-bold text-xs transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Go to My Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => showSuccess('Tax Invoice downloaded to your device.')}
              className="py-3 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Receipt</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // MAIN PAYMENT DESK (1:1 VAKILSEARCH MATCH OF MEDIA_1793000553617_BEC7ADF9.PNG)
  // --------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#FAFBFD] font-sans py-6 sm:py-8 px-4 sm:px-8 text-slate-800">
      
      {/* Top Brand Logo */}
      <header className="max-w-6xl mx-auto mb-6">
        <div className="inline-flex items-center gap-2 select-none cursor-pointer" onClick={() => navigate(-1)}>
          <img
            src="/bharatfiling-brand-icon.png"
            alt="BharatFiling"
            className="h-8 sm:h-9 w-auto shrink-0 object-contain"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/bharatfiling-horizontal-transparent.png';
            }}
          />
          <span className="flex select-none items-baseline text-lg sm:text-xl font-extrabold leading-none tracking-tight">
            <span className="text-[#111827]">Bharat</span>
            <span className="text-[#F26522]">Filing</span>
          </span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto space-y-4">
        
        {/* Page Headings */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Choose Payment Method
          </h1>
          <p className="text-sm font-bold text-slate-800 mt-2">
            Payment Options
          </p>
        </div>

        {/* 2-Column Split: Payment Desk (Left) & Order Summary Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start pt-2">
          
          {/* ============================================================== */}
          {/* LEFT CONTAINER: White Card with 2-Column Tabs & Content        */}
          {/* ============================================================== */}
          <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12">
            
            {/* Left Vertical Tabs (col-span-5) */}
            <div className="md:col-span-5 border-r border-slate-200/80 bg-slate-50/50 flex flex-col divide-y divide-slate-100">
              
              {/* Tab 1: UPI */}
              <button
                type="button"
                onClick={() => setActiveTab('upi')}
                className={`py-4 px-4 sm:px-5 text-left transition flex items-center justify-between cursor-pointer select-none relative ${
                  activeTab === 'upi'
                    ? 'bg-white border-l-4 border-[#002B49]'
                    : 'hover:bg-slate-100/70'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Stylized UPI Outline Icon */}
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-[#002B49]">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.24L18.76 8 12 11.76 5.24 8 12 4.24zM5 9.47l6 3.33v6.73l-6-3.33V9.47zm8 10.06v-6.73l6-3.33v6.73l-6 3.33z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 leading-tight">UPI</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Gpay, PhonePe, Paytm &amp; more</p>
                  </div>
                </div>

                {activeTab === 'upi' && (
                  <span className="text-[#002B49] text-xs font-black">▶</span>
                )}
              </button>

              {/* Tab 2: Credit/Debit/ATM Card */}
              <button
                type="button"
                onClick={() => setActiveTab('card')}
                className={`py-4 px-4 sm:px-5 text-left transition flex items-center justify-between cursor-pointer select-none relative ${
                  activeTab === 'card'
                    ? 'bg-white border-l-4 border-[#002B49]'
                    : 'hover:bg-slate-100/70'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-slate-500">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 leading-tight">Credit/Debit/ATM Card</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Visa, MasterCard, Rupay &amp; more</p>
                  </div>
                </div>

                {activeTab === 'card' && (
                  <span className="text-[#002B49] text-xs font-black">▶</span>
                )}
              </button>

              {/* Tab 3: Net Banking */}
              <button
                type="button"
                onClick={() => setActiveTab('netbanking')}
                className={`py-4 px-4 sm:px-5 text-left transition flex items-center justify-between cursor-pointer select-none relative ${
                  activeTab === 'netbanking'
                    ? 'bg-white border-l-4 border-[#002B49]'
                    : 'hover:bg-slate-100/70'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-slate-500">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 leading-tight">Net Banking</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Pay using all Indian banks</p>
                  </div>
                </div>

                {activeTab === 'netbanking' && (
                  <span className="text-[#002B49] text-xs font-black">▶</span>
                )}
              </button>

              {/* Tab 4: EMI option */}
              <button
                type="button"
                onClick={() => setActiveTab('emi')}
                className={`py-4 px-4 sm:px-5 text-left transition flex items-center justify-between cursor-pointer select-none relative ${
                  activeTab === 'emi'
                    ? 'bg-white border-l-4 border-[#002B49]'
                    : 'hover:bg-slate-100/70'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-slate-700 border border-slate-400 px-1 py-0.5 rounded-xs">
                      EMI
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 leading-tight">EMI option</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Pay using credit card &amp; Debit card</p>
                  </div>
                </div>

                {activeTab === 'emi' && (
                  <span className="text-[#002B49] text-xs font-black">▶</span>
                )}
              </button>

            </div>

            {/* Right Interactive Area (col-span-7) */}
            <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              
              {/* TAB 1: PAY WITH UPI (1:1 Screenshot Match) */}
              {activeTab === 'upi' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 pb-4 border-b border-slate-100">
                      Pay with UPI
                    </h2>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-600 mb-3.5">
                      Select UPI App
                    </p>

                    {/* 4 App Cards Row */}
                    <div className="grid grid-cols-4 gap-3 text-center">
                      
                      {/* 1. Google Pay */}
                      <div
                        onClick={() => setSelectedUpiApp('gpay')}
                        className="flex flex-col items-center gap-2 cursor-pointer group"
                      >
                        <div
                          className={`w-14 h-14 rounded-full flex items-center justify-center p-2.5 transition-all shadow-xs border ${
                            selectedUpiApp === 'gpay'
                              ? 'border-2 border-[#002B49] bg-blue-50/40 ring-2 ring-[#002B49]/10'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <svg className="w-7 h-7" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"/>
                            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                          </svg>
                        </div>
                        <span className="text-[11px] font-semibold text-slate-700">
                          Google pay
                        </span>
                      </div>

                      {/* 2. PhonePe (Selected in Screenshot with Top-Right Check Badge) */}
                      <div
                        onClick={() => setSelectedUpiApp('phonepe')}
                        className="flex flex-col items-center gap-2 cursor-pointer group"
                      >
                        <div className="relative">
                          <div
                            className={`w-14 h-14 rounded-full flex items-center justify-center p-2.5 transition-all shadow-xs border ${
                              selectedUpiApp === 'phonepe'
                                ? 'border-2 border-[#002B49] bg-blue-50/40 ring-2 ring-[#002B49]/10'
                                : 'border-slate-200 bg-white hover:border-slate-300'
                            }`}
                          >
                            {/* Purple PhonePe Logo */}
                            <div className="w-10 h-10 rounded-full bg-[#5f259f] flex items-center justify-center text-white font-bold text-lg select-none">
                              पे
                            </div>
                          </div>

                          {/* Selected Checkmark Bubble on Top Right */}
                          {selectedUpiApp === 'phonepe' && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#002B49] text-white flex items-center justify-center shadow-xs">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          )}
                        </div>
                        <span className="text-[11px] font-bold text-slate-900">
                          PhonePe
                        </span>
                      </div>

                      {/* 3. Paytm */}
                      <div
                        onClick={() => setSelectedUpiApp('paytm')}
                        className="flex flex-col items-center gap-2 cursor-pointer group"
                      >
                        <div
                          className={`w-14 h-14 rounded-full flex items-center justify-center p-2.5 transition-all shadow-xs border ${
                            selectedUpiApp === 'paytm'
                              ? 'border-2 border-[#002B49] bg-blue-50/40 ring-2 ring-[#002B49]/10'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <span className="text-xs font-black tracking-tighter text-[#002970]">
                            pay<span className="text-[#00BAF2]">tm</span>
                          </span>
                        </div>
                        <span className="text-[11px] font-semibold text-slate-700">
                          Paytm
                        </span>
                      </div>

                      {/* 4. Other UPI ID */}
                      <div
                        onClick={() => setSelectedUpiApp('other')}
                        className="flex flex-col items-center gap-2 cursor-pointer group"
                      >
                        <div
                          className={`w-14 h-14 rounded-full flex items-center justify-center p-2.5 transition-all shadow-xs border ${
                            selectedUpiApp === 'other'
                              ? 'border-2 border-[#002B49] bg-blue-50/40 ring-2 ring-[#002B49]/10'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <div className="border border-slate-400 rounded-sm px-1.5 py-0.5 text-[10px] font-bold text-slate-700 tracking-tighter">
                            UPI ▷
                          </div>
                        </div>
                        <span className="text-[11px] font-semibold text-slate-700">
                          Other UPI ID
                        </span>
                      </div>

                    </div>
                  </div>

                  {/* Input field if "Other UPI ID" is selected */}
                  {selectedUpiApp === 'other' ? (
                    <div className="pt-2">
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Enter UPI VPA / ID
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. mobile@upi or username@okhdfcbank"
                        value={customUpiId}
                        onChange={(e) => setCustomUpiId(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#002B49]"
                      />
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 pt-2">
                      Pay through the {getUpiAppName()} pay app on your phone
                    </p>
                  )}

                  {/* Big PAY Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={handlePay}
                      className="w-full sm:max-w-xs py-3.5 px-8 rounded-lg bg-[#002B49] hover:bg-[#001D32] text-white font-extrabold text-sm sm:text-base transition shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Contacting UPI Gateway...</span>
                        </>
                      ) : (
                        <span>PAY ₹{totalAmount.toLocaleString('en-IN')}</span>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: CREDIT / DEBIT CARD */}
              {activeTab === 'card' && (
                <div className="space-y-4">
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 pb-4 border-b border-slate-100">
                    Pay with Card
                  </h2>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      placeholder="4532 •••• •••• 8910"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => {
                        const v = e.target.value.replace(/\D/g, '').slice(0, 16);
                        setCardNumber(v.replace(/(\d{4})/g, '$1 ').trim());
                      }}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#002B49]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        placeholder="12/28"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#002B49]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">CVV</label>
                      <input
                        type="password"
                        placeholder="•••"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#002B49]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="Full name as printed on card"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#002B49]"
                    />
                  </div>

                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={handlePay}
                    className="w-full sm:max-w-xs py-3.5 px-8 rounded-lg bg-[#002B49] hover:bg-[#001D32] text-white font-extrabold text-sm sm:text-base transition shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    <span>PAY ₹{totalAmount.toLocaleString('en-IN')}</span>
                  </button>
                </div>
              )}

              {/* TAB 3: NET BANKING */}
              {activeTab === 'netbanking' && (
                <div className="space-y-4">
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 pb-4 border-b border-slate-100">
                    Net Banking
                  </h2>
                  <div className="grid grid-cols-2 gap-2.5">
                    {NET_BANKS.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setSelectedBank(b)}
                        className={`p-3 rounded-lg border text-left text-xs font-semibold transition cursor-pointer flex items-center gap-2 ${
                          selectedBank === b
                            ? 'border-[#002B49] bg-blue-50/50 text-[#002B49] font-bold'
                            : 'border-slate-200 text-slate-700 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <Landmark className="w-4 h-4 text-slate-400 shrink-0" />
                        <span className="truncate">{b}</span>
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={handlePay}
                    className="w-full sm:max-w-xs py-3.5 px-8 rounded-lg bg-[#002B49] hover:bg-[#001D32] text-white font-extrabold text-sm sm:text-base transition shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    <span>PAY ₹{totalAmount.toLocaleString('en-IN')}</span>
                  </button>
                </div>
              )}

              {/* TAB 4: EMI OPTION */}
              {activeTab === 'emi' && (
                <div className="space-y-4">
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 pb-4 border-b border-slate-100">
                    Credit / Debit Card EMI
                  </h2>
                  <div className="space-y-2">
                    {[
                      `3 Months - ₹${Math.round(totalAmount / 3)}/mo (No Cost)`,
                      `6 Months - ₹${Math.round(totalAmount / 6)}/mo`,
                      `9 Months - ₹${Math.round(totalAmount / 9)}/mo`,
                    ].map((tenure) => (
                      <label
                        key={tenure}
                        className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-white cursor-pointer text-xs font-medium text-slate-800"
                      >
                        <input
                          type="radio"
                          name="emiTenure"
                          checked={selectedEmiTenure === tenure}
                          onChange={() => setSelectedEmiTenure(tenure)}
                          className="text-[#002B49] focus:ring-[#002B49]"
                        />
                        <span>{tenure}</span>
                      </label>
                    ))}
                  </div>

                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={handlePay}
                    className="w-full sm:max-w-xs py-3.5 px-8 rounded-lg bg-[#002B49] hover:bg-[#001D32] text-white font-extrabold text-sm sm:text-base transition shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    <span>PAY ₹{totalAmount.toLocaleString('en-IN')}</span>
                  </button>
                </div>
              )}

            </div>

          </div>

          {/* ============================================================== */}
          {/* RIGHT CONTAINER: FSSAI License Order Summary Card (1:1 CLONE) */}
          {/* ============================================================== */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* White Receipt Card */}
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden">
              
              {/* Card Title Header */}
              <div className="text-center py-4 border-b border-slate-100">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  FSSAI License
                </h3>
              </div>

              {/* Price Details Body */}
              <div className="p-5 sm:p-6 space-y-4 text-xs">
                
                {/* Price details title with icon */}
                <div className="flex items-center gap-1.5 text-slate-800 font-bold">
                  <div className="w-4 h-4 rounded-full border border-slate-800 flex items-center justify-center text-[10px] font-bold">
                    ₹
                  </div>
                  <span>Price details</span>
                </div>

                {/* Professional Fees */}
                <div className="flex justify-between items-center text-slate-700 font-medium">
                  <span>Professional Fees</span>
                  <span className="font-mono font-bold text-slate-900">₹{basePrice}</span>
                </div>

                {/* Taxes & Charges Dropdown */}
                <div className="border-t border-slate-100 pt-3">
                  <div
                    onClick={() => setIsTaxesExpanded(!isTaxesExpanded)}
                    className="flex justify-between items-center text-slate-700 font-medium cursor-pointer select-none py-1"
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="text-[10px] text-slate-400">
                        {isTaxesExpanded ? '▲' : '▼'}
                      </span>
                      <span>Taxes &amp; Charges</span>
                    </span>
                    <span className="font-mono font-bold text-slate-900">₹{totalTaxes}</span>
                  </div>

                  {isTaxesExpanded && (
                    <div className="space-y-2.5 pt-2 pl-3 text-slate-600 text-[11px]">
                      
                      {/* GST on professional fee */}
                      <div className="flex justify-between items-center">
                        <span>GST on professional fee (18%)</span>
                        <span className="font-mono">₹{gstOnFee}</span>
                      </div>

                      {/* Labour Welfare Endowment with [Remove] / [Add] button */}
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-2">
                          <span>Labour Welfare Endowment</span>
                          {includeLabourWelfare ? (
                            <button
                              type="button"
                              onClick={() => setIncludeLabourWelfare(false)}
                              className="border border-red-300 text-red-600 hover:bg-red-50 text-[10px] px-1.5 py-0.5 rounded-sm transition cursor-pointer"
                            >
                              Remove
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setIncludeLabourWelfare(true)}
                              className="border border-blue-300 text-blue-600 hover:bg-blue-50 text-[10px] px-1.5 py-0.5 rounded-sm transition cursor-pointer"
                            >
                              Add
                            </button>
                          )}
                        </span>
                        <span className="font-mono">₹{labourWelfareAmount}</span>
                      </div>

                      {/* GST on labour welfare */}
                      {includeLabourWelfare && (
                        <div className="flex justify-between items-center">
                          <span>GST on labour welfare (18%)</span>
                          <span className="font-mono">₹{gstOnLabour}</span>
                        </div>
                      )}

                    </div>
                  )}
                </div>

                {/* Total Amount Row */}
                <div className="border-t-2 border-slate-200 pt-4 flex justify-between items-baseline">
                  <span className="text-base font-extrabold text-slate-900">
                    Total Amount
                  </span>
                  <span className="text-2xl font-black text-slate-900 font-mono">
                    ₹{totalAmount}
                  </span>
                </div>

              </div>

            </div>

            {/* Bottom Security & Satisfaction Badges (1:1 with Screenshot) */}
            <div className="flex items-center justify-around py-3 text-center">
              
              {/* PCI 100% Secure Payment */}
              <div className="flex flex-col items-center gap-1">
                <div className="inline-flex items-center gap-0.5 bg-emerald-700 text-white text-[9px] font-black px-1.5 py-0.5 rounded-xs select-none">
                  PCI
                </div>
                <span className="text-[11px] font-bold text-slate-800">
                  100% Secure Payment
                </span>
              </div>

              {/* Guaranteed Satisfaction */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-[11px] font-bold text-slate-800">
                  Guaranteed Satisfaction
                </span>
              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}
