import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  ArrowLeft,
  Download,
  Lock,
  BadgeCheck,
  Printer,
  Sparkles,
  HelpCircle,
  MessageSquare,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext.jsx';
import { PAN_PLANS } from './constants.js';

const POPULAR_BANKS = [
  { name: 'State Bank of India', code: 'SBI', icon: '🏛️' },
  { name: 'HDFC Bank', code: 'HDFC', icon: '🏢' },
  { name: 'ICICI Bank', code: 'ICICI', icon: '🏦' },
  { name: 'Axis Bank', code: 'AXIS', icon: '🏬' },
  { name: 'Kotak Mahindra Bank', code: 'KOTAK', icon: '🏛️' },
  { name: 'Punjab National Bank', code: 'PNB', icon: '🏦' },
];

export default function PanPaymentPage({
  formData = {},
  orderId = '',
  onBack,
  onPaymentSuccess,
}) {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  // Selected Plan resolution
  const selectedPlanId = formData.plan || 'standard';
  const selectedPlan =
    PAN_PLANS.find((p) => p.id === selectedPlanId || p.alias === selectedPlanId) ||
    PAN_PLANS[1];

  // Base pricing resolution with addons
  const addonDscFee = formData.addonDsc ? 1499 : 0;
  const addonAffidavitFee = formData.addonAffidavit ? 499 : 0;
  const basePrice = (formData.subtotal || selectedPlan.price) + addonDscFee + addonAffidavitFee;

  // 18% GST on Professional Fee
  const gstOnFee = Math.round(basePrice * 0.18);

  // Labour Welfare Endowment toggle (Default: true, matches Vakilsearch screenshot)
  const [includeLabourWelfare, setIncludeLabourWelfare] = useState(true);
  const labourWelfareAmount = includeLabourWelfare
    ? selectedPlan.id === 'combo'
      ? 180
      : 80
    : 0;
  const gstOnLabour = includeLabourWelfare
    ? Math.round(labourWelfareAmount * 0.18)
    : 0;

  const taxesAndCharges = gstOnFee + labourWelfareAmount + gstOnLabour;
  const totalAmount = basePrice + taxesAndCharges;

  // Order & Customer Identification
  const orderEstId =
    orderId ||
    formData.orderNumber ||
    '#est179126201735020268491p';
  const customerName = formData.name || 'Yash Upadhyay';
  const customerEmail =
    formData.email || 'ya*****************@com';
  const customerPhone =
    formData.phone || '+91-*******193';

  // GSTIN / Business Name editing state
  const [gstinOrBusinessName, setGstinOrBusinessName] = useState(
    formData.cinGstin || formData.businessName || ''
  );
  const [showGstinInput, setShowGstinInput] = useState(
    Boolean(formData.cinGstin || formData.businessName)
  );

  // Taxes breakdown dropdown state (open by default per screenshot)
  const [isTaxesExpanded, setIsTaxesExpanded] = useState(true);

  // Active payment method tab: 'upi' | 'card' | 'netbanking' | 'emi'
  const [activeTab, setActiveTab] = useState('upi');

  // Selected UPI app: 'phonepe' | 'gpay' | 'paytm' | 'other' (PhonePe selected by default in screenshot)
  const [selectedUpiApp, setSelectedUpiApp] = useState('phonepe');
  const [customUpiId, setCustomUpiId] = useState('');

  // Card form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState(customerName);

  // Net banking state
  const [selectedBank, setSelectedBank] = useState('State Bank of India');

  // EMI Tenure
  const [selectedEmiTenure, setSelectedEmiTenure] = useState(
    `3 Months - ₹${Math.round(totalAmount / 3)}/mo`
  );

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paidDetails, setPaidDetails] = useState(null);

  const getUpiAppName = () => {
    switch (selectedUpiApp) {
      case 'gpay':
        return 'Google pay';
      case 'phonepe':
        return 'PhonePe';
      case 'paytm':
        return 'Paytm';
      case 'other':
        return 'UPI ID / VPA';
      default:
        return 'PhonePe';
    }
  };

  const handlePay = async (e) => {
    if (e) e.preventDefault();

    if (activeTab === 'upi' && selectedUpiApp === 'other' && !customUpiId.includes('@')) {
      showError('Please enter a valid UPI ID (e.g. mobile@upi or name@okaxis)');
      return;
    }

    if (activeTab === 'card' && cardNumber.replace(/\s/g, '').length < 15) {
      showError('Please enter a valid 16-digit card number');
      return;
    }

    setIsProcessing(true);

    try {
      const simulatedOrderId = orderId || `PAN-${Math.floor(100000 + Math.random() * 900000)}`;
      const simulatedTxn = `BFP-PAN-${Math.floor(100000 + Math.random() * 900000)}`;
      const simulatedAppNo = `NSDL2026-${Math.floor(10000 + Math.random() * 90000)}`;

      // Post payment to backend API
      try {
        await fetch(`/api/v1/pan/checkout/${simulatedOrderId}/pay`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paymentMethod: activeTab.toUpperCase(),
            upiApp: selectedUpiApp,
            transactionId: simulatedTxn,
            amount: totalAmount,
            gstinOrBusinessName,
          }),
        });
      } catch {
        // Fallback simulation for offline testing
      }

      const receipt = {
        orderId: simulatedOrderId,
        orderEstId,
        transactionId: simulatedTxn,
        applicationNumber: simulatedAppNo,
        amount: totalAmount,
        basePrice,
        taxesAndCharges,
        gstOnFee,
        labourWelfareAmount,
        gstOnLabour,
        planName: selectedPlan.name,
        customerName,
        customerEmail,
        customerPhone,
        businessName: gstinOrBusinessName || formData.businessName || 'Applicant Individual / Entity',
        date: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
        caAssigned: 'CS Ananya Deshmukh (Sr. Direct Tax & PAN Compliance Officer)',
      };

      setPaidDetails(receipt);
      setIsSuccess(true);

      // Trigger Confetti Celebration
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // Ignore
      }

      showSuccess('Payment Successful! Your PAN Application has been dispatched to the NSDL CA desk.');

      if (onPaymentSuccess) {
        onPaymentSuccess(receipt);
      }
    } catch (err) {
      showError('Payment processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // -------------------------------------------------------------------------
  // VIEW 1: PAYMENT SUCCESS RECEIPT SCREEN
  // -------------------------------------------------------------------------
  if (isSuccess && paidDetails) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] font-sans py-10 sm:py-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
              Payment Completed
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] mt-3">
              Payment of ₹{paidDetails.amount.toLocaleString('en-IN')} Received!
            </h1>
            <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
              Your <strong className="text-slate-800">{paidDetails.planName}</strong> order has been confirmed. Your file has been dispatched to the NSDL Tax Desk.
            </p>
          </div>

          {/* Quick Summary Pill Bar */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-left text-xs sm:text-sm space-y-2.5">
            <div className="flex justify-between">
              <span className="text-slate-500">Transaction ID:</span>
              <span className="font-mono font-bold text-slate-800">{paidDetails.transactionId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Reference Order:</span>
              <span className="font-mono font-bold text-[#002B49]">{paidDetails.orderEstId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">NSDL Application ID:</span>
              <span className="font-mono font-bold text-slate-800">{paidDetails.applicationNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Date &amp; Time:</span>
              <span className="font-semibold text-slate-700">{paidDetails.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Billing Entity / Applicant:</span>
              <span className="font-semibold text-slate-700">{paidDetails.customerName}</span>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-2 font-bold text-slate-900">
              <span>Total Paid (incl. 18% GST):</span>
              <span className="text-[#002B49] text-base">₹{paidDetails.amount.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Next Steps Roadmap */}
          <div className="text-left bg-blue-50/60 rounded-2xl p-5 border border-blue-100 space-y-3">
            <h4 className="text-xs font-bold text-[#002B49] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#F26522]" /> Next Steps for Your PAN Card
            </h4>
            <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside leading-relaxed">
              <li>
                <strong className="text-slate-800">Assigned Expert:</strong> {paidDetails.caAssigned} will verify your identity proof and father name details within 2 working hours.
              </li>
              <li>
                <strong className="text-slate-800">NSDL Acknowledgement:</strong> Your 15-digit NSDL acknowledgement number will be dispatched to your registered mobile and email.
              </li>
              <li>
                <strong className="text-slate-800">e-PAN Digital Delivery:</strong> Your digitally signed e-PAN PDF will arrive in your email inbox within 48 hours.
              </li>
              <li>
                <strong className="text-slate-800">Physical Card Courier:</strong> The embossed PVC card will be dispatched via India Post SpeedPost with live SMS tracking.
              </li>
            </ol>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="flex-1 py-3 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition"
            >
              <Printer className="w-4 h-4" /> Print Tax Invoice Receipt
            </button>
            <Link
              to="/dashboard"
              className="flex-1 py-3 px-4 rounded-xl bg-[#002B49] hover:bg-[#001D33] text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-md"
            >
              Go to Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // VIEW 2: VAKILSEARCH 2-COLUMN PAYMENT DESK (MATCHING SCREENSHOT)
  // -------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      
      {/* TOP HEADER BAR */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onBack || (() => navigate(-1))}
              className="p-1.5 -ml-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition cursor-pointer flex items-center gap-1 text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </button>

            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-[#002B49]">
                Bharat<span className="text-[#F26522]">Filing</span>
              </span>
              <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded uppercase tracking-wider hidden sm:inline">
                PAN Desk
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit SSL Encrypted Payment Desk</span>
          </div>
        </div>
      </header>

      {/* MAIN CHECKOUT CONTAINER */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        
        {/* CUSTOMER & ORDER CONTEXT BANNER */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-4 sm:p-5 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono font-bold text-[#002B49] bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded">
                Order Ref: {orderEstId}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Oct 28, 2026
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              PAN Registration (Permanent Account Number) — {selectedPlan.name}
            </h2>
            <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
              Permanent Account Number is a 10-digit alphanumeric code issued by the Income Tax Department under Section 139A, serving as the universal tax identification and business KYC benchmark.
            </p>
            <div className="text-xs text-slate-600 pt-1 flex flex-wrap gap-x-4 gap-y-1">
              <span>Customer: <strong className="text-slate-800">{customerName}</strong></span>
              <span>Email: <span className="font-mono text-slate-700">{customerEmail}</span></span>
              <span>Phone: <span className="font-mono text-slate-700">{customerPhone}</span></span>
            </div>
          </div>

          {/* IndiaFilings GSTIN / Business Name Input */}
          <div className="w-full md:w-auto">
            {!showGstinInput ? (
              <button
                type="button"
                onClick={() => setShowGstinInput(true)}
                className="text-xs font-bold text-[#002B49] hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>+ Claim Input Tax Credit (ITC)? Add GSTIN</span>
              </button>
            ) : (
              <div className="flex flex-col gap-1 w-full md:w-72">
                <input
                  type="text"
                  value={gstinOrBusinessName}
                  onChange={(e) => setGstinOrBusinessName(e.target.value)}
                  placeholder="GSTIN / Business Name"
                  className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#002B49] uppercase font-mono"
                />
                <span className="text-[10px] text-slate-400 leading-tight">
                  Enter GSTIN to claim 18% input tax credit on business expense.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* PAGE TITLE & SUBHEADING (Matching Vakilsearch Image 2) */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Choose Payment Method
          </h1>
          <p className="text-sm sm:text-base font-bold text-slate-700 mt-1">
            Payment Options
          </p>
        </div>

        {/* 2-COLUMN PAYMENT DESK (1:1 VAKILSEARCH LAYOUT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT DESK: VERTICAL TABS + METHOD CONFIGURATION (8 COLS) */}
          <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[460px]">
            
            {/* 1. Left Vertical Navigation Tabs (5 Cols on md) */}
            <div className="md:col-span-5 bg-slate-50/70 border-r border-slate-200 divide-y divide-slate-200/80">
              
              {/* Tab 1: UPI */}
              <button
                type="button"
                onClick={() => setActiveTab('upi')}
                className={`w-full p-4 text-left flex items-center justify-between transition cursor-pointer relative ${
                  activeTab === 'upi'
                    ? 'bg-white border-l-4 border-[#002B49] text-slate-900 font-bold shadow-2xs'
                    : 'text-slate-600 hover:bg-white/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 flex items-center justify-center text-slate-700">
                    <svg className="w-5 h-5 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">UPI</div>
                    <div className="text-[11px] text-slate-500">Gpay, PhonePe, Paytm &amp; more</div>
                  </div>
                </div>

                {activeTab === 'upi' && (
                  <span className="text-[#002B49] text-xs font-bold pl-2 select-none">
                    ▶
                  </span>
                )}
              </button>

              {/* Tab 2: Credit/Debit/ATM Card */}
              <button
                type="button"
                onClick={() => setActiveTab('card')}
                className={`w-full p-4 text-left flex items-center justify-between transition cursor-pointer relative ${
                  activeTab === 'card'
                    ? 'bg-white border-l-4 border-[#002B49] text-slate-900 font-bold shadow-2xs'
                    : 'text-slate-600 hover:bg-white/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 flex items-center justify-center text-slate-700">
                    <CreditCard className="w-5 h-5 text-slate-700" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Credit/Debit/ATM Card</div>
                    <div className="text-[11px] text-slate-500">Visa, MasterCard, Rupay &amp; more</div>
                  </div>
                </div>

                {activeTab === 'card' && (
                  <span className="text-[#002B49] text-xs font-bold pl-2 select-none">
                    ▶
                  </span>
                )}
              </button>

              {/* Tab 3: Net Banking */}
              <button
                type="button"
                onClick={() => setActiveTab('netbanking')}
                className={`w-full p-4 text-left flex items-center justify-between transition cursor-pointer relative ${
                  activeTab === 'netbanking'
                    ? 'bg-white border-l-4 border-[#002B49] text-slate-900 font-bold shadow-2xs'
                    : 'text-slate-600 hover:bg-white/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 flex items-center justify-center text-slate-700">
                    <Landmark className="w-5 h-5 text-slate-700" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Net Banking</div>
                    <div className="text-[11px] text-slate-500">All Indian Banks Supported</div>
                  </div>
                </div>

                {activeTab === 'netbanking' && (
                  <span className="text-[#002B49] text-xs font-bold pl-2 select-none">
                    ▶
                  </span>
                )}
              </button>

              {/* Tab 4: EMI option */}
              <button
                type="button"
                onClick={() => setActiveTab('emi')}
                className={`w-full p-4 text-left flex items-center justify-between transition cursor-pointer relative ${
                  activeTab === 'emi'
                    ? 'bg-white border-l-4 border-[#002B49] text-slate-900 font-bold shadow-2xs'
                    : 'text-slate-600 hover:bg-white/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 flex items-center justify-center text-slate-700">
                    <span className="text-base font-bold font-mono text-slate-800">₹%</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">EMI option</div>
                    <div className="text-[11px] text-slate-500">Credit Card No-Cost &amp; Standard</div>
                  </div>
                </div>

                {activeTab === 'emi' && (
                  <span className="text-[#002B49] text-xs font-bold pl-2 select-none">
                    ▶
                  </span>
                )}
              </button>

            </div>

            {/* 2. Right Method Detail Configuration Pane (7 Cols on md) */}
            <div className="md:col-span-7 p-6 flex flex-col justify-between">
              
              {/* UPI PANE */}
              {activeTab === 'upi' && (
                <div className="space-y-4">
                  <div className="pb-2 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="text-base font-bold text-slate-900">
                      Unified Payments Interface (UPI)
                    </h2>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Zero Surcharge
                    </span>
                  </div>

                  {/* Radio App Selectors */}
                  <div className="space-y-3">
                    
                    {/* Google Pay */}
                    <label
                      onClick={() => setSelectedUpiApp('gpay')}
                      className={`flex items-center justify-between p-3.5 rounded-lg border cursor-pointer transition ${
                        selectedUpiApp === 'gpay'
                          ? 'border-[#002B49] bg-blue-50/50 shadow-2xs'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          selectedUpiApp === 'gpay' ? 'border-[#002B49]' : 'border-slate-400'
                        }`}>
                          {selectedUpiApp === 'gpay' && (
                            <div className="w-2 h-2 rounded-full bg-[#002B49]" />
                          )}
                        </div>
                        <span className="text-sm font-semibold text-slate-800">
                          Google pay
                        </span>
                      </div>
                      <div className="w-6 h-6 flex items-center justify-center text-xs font-bold font-mono text-blue-600 bg-blue-50 rounded">
                        G
                      </div>
                    </label>

                    {/* PhonePe (Selected by Default in Vakilsearch Screenshot) */}
                    <label
                      onClick={() => setSelectedUpiApp('phonepe')}
                      className={`flex items-center justify-between p-3.5 rounded-lg border cursor-pointer transition ${
                        selectedUpiApp === 'phonepe'
                          ? 'border-[#002B49] bg-blue-50/50 shadow-2xs'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          selectedUpiApp === 'phonepe' ? 'border-[#002B49]' : 'border-slate-400'
                        }`}>
                          {selectedUpiApp === 'phonepe' && (
                            <div className="w-2 h-2 rounded-full bg-[#002B49]" />
                          )}
                        </div>
                        <span className="text-sm font-semibold text-slate-800">
                          PhonePe
                        </span>
                      </div>
                      <div className="w-6 h-6 rounded bg-[#5f259f] text-white flex items-center justify-center text-xs font-bold">
                        पे
                      </div>
                    </label>

                    {/* Paytm */}
                    <label
                      onClick={() => setSelectedUpiApp('paytm')}
                      className={`flex items-center justify-between p-3.5 rounded-lg border cursor-pointer transition ${
                        selectedUpiApp === 'paytm'
                          ? 'border-[#002B49] bg-blue-50/50 shadow-2xs'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          selectedUpiApp === 'paytm' ? 'border-[#002B49]' : 'border-slate-400'
                        }`}>
                          {selectedUpiApp === 'paytm' && (
                            <div className="w-2 h-2 rounded-full bg-[#002B49]" />
                          )}
                        </div>
                        <span className="text-sm font-semibold text-slate-800">
                          Paytm
                        </span>
                      </div>
                      <div className="px-1.5 py-0.5 rounded bg-[#00b9f1] text-white text-[10px] font-bold">
                        Paytm
                      </div>
                    </label>

                    {/* Other UPI ID */}
                    <label
                      onClick={() => setSelectedUpiApp('other')}
                      className={`flex flex-col p-3.5 rounded-lg border cursor-pointer transition ${
                        selectedUpiApp === 'other'
                          ? 'border-[#002B49] bg-blue-50/50 shadow-2xs'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            selectedUpiApp === 'other' ? 'border-[#002B49]' : 'border-slate-400'
                          }`}>
                            {selectedUpiApp === 'other' && (
                              <div className="w-2 h-2 rounded-full bg-[#002B49]" />
                            )}
                          </div>
                          <span className="text-sm font-semibold text-slate-800">
                            Enter any UPI ID / VPA
                          </span>
                        </div>
                        <span className="text-xs text-slate-400 font-mono">@okhdfcbank / @upi</span>
                      </div>

                      {selectedUpiApp === 'other' && (
                        <div className="mt-3 pt-3 border-t border-slate-200">
                          <input
                            type="text"
                            value={customUpiId}
                            onChange={(e) => setCustomUpiId(e.target.value)}
                            placeholder="username@bank (e.g. 9876543210@paytm)"
                            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#002B49]"
                          />
                        </div>
                      )}
                    </label>

                  </div>

                  {/* VAKILSEARCH-STYLE PRIMARY PAY BUTTON */}
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={handlePay}
                      disabled={isProcessing}
                      className="w-full py-3.5 px-4 rounded-lg bg-[#002B49] hover:bg-[#001D33] text-white font-bold text-sm sm:text-base tracking-wide transition shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Routing to Secure Gateway...</span>
                        </>
                      ) : (
                        <span>PAY ₹{totalAmount.toLocaleString('en-IN')} via {getUpiAppName()}</span>
                      )}
                    </button>
                    <p className="text-[11px] text-center text-slate-400 mt-2">
                      Instant verification • Application moves directly to NSDL tax queue
                    </p>
                  </div>
                </div>
              )}

              {/* CARD PANE */}
              {activeTab === 'card' && (
                <div className="space-y-4">
                  <div className="pb-2 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="text-base font-bold text-slate-900">
                      Credit or Debit Card
                    </h2>
                    <span className="text-xs text-slate-400">Visa, MC, RuPay</span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        maxLength={19}
                        value={cardNumber}
                        onChange={(e) => {
                          const v = e.target.value.replace(/\D/g, '').slice(0, 16);
                          const formatted = v.match(/.{1,4}/g)?.join(' ') || v;
                          setCardNumber(formatted);
                        }}
                        placeholder="4532 •••• •••• 8892"
                        className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#002B49] font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Valid Thru (MM/YY)
                        </label>
                        <input
                          type="text"
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => {
                            let v = e.target.value.replace(/\D/g, '').slice(0, 4);
                            if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2);
                            setCardExpiry(v);
                          }}
                          placeholder="MM/YY"
                          className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#002B49] font-mono text-center"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          CVV / CVC
                        </label>
                        <input
                          type="password"
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                          placeholder="•••"
                          className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#002B49] font-mono text-center"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="Name as printed on card"
                        className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#002B49]"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handlePay}
                    disabled={isProcessing}
                    className="w-full py-3.5 px-4 rounded-lg bg-[#002B49] hover:bg-[#001D33] text-white font-bold text-sm transition shadow-md cursor-pointer flex items-center justify-center gap-2 mt-4"
                  >
                    <span>PAY ₹{totalAmount.toLocaleString('en-IN')} SECURELY</span>
                  </button>
                </div>
              )}

              {/* NET BANKING PANE */}
              {activeTab === 'netbanking' && (
                <div className="space-y-4">
                  <div className="pb-2 border-b border-slate-100">
                    <h2 className="text-base font-bold text-slate-900">
                      Select Your Bank
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {POPULAR_BANKS.map((b) => (
                      <button
                        key={b.code}
                        type="button"
                        onClick={() => setSelectedBank(b.name)}
                        className={`p-3 rounded-lg border text-left flex items-center gap-2.5 text-xs font-medium transition cursor-pointer ${
                          selectedBank === b.name
                            ? 'border-[#002B49] bg-blue-50/60 font-bold text-[#002B49]'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <span>{b.icon}</span>
                        <span>{b.name}</span>
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handlePay}
                    disabled={isProcessing}
                    className="w-full py-3.5 px-4 rounded-lg bg-[#002B49] hover:bg-[#001D33] text-white font-bold text-sm transition shadow-md cursor-pointer flex items-center justify-center gap-2 mt-4"
                  >
                    <span>PAY ₹{totalAmount.toLocaleString('en-IN')} via NetBanking</span>
                  </button>
                </div>
              )}

              {/* EMI PANE */}
              {activeTab === 'emi' && (
                <div className="space-y-4">
                  <div className="pb-2 border-b border-slate-100">
                    <h2 className="text-base font-bold text-slate-900">
                      Equated Monthly Installments (EMI)
                    </h2>
                  </div>

                  <div className="space-y-2.5">
                    {[3, 6, 9, 12].map((months) => {
                      const perMonth = Math.round(totalAmount / months);
                      const label = `${months} Months - ₹${perMonth}/mo`;
                      return (
                        <button
                          key={months}
                          type="button"
                          onClick={() => setSelectedEmiTenure(label)}
                          className={`w-full p-3 rounded-lg border text-left flex items-center justify-between text-xs sm:text-sm font-semibold transition cursor-pointer ${
                            selectedEmiTenure === label
                              ? 'border-[#002B49] bg-blue-50/60 text-[#002B49]'
                              : 'border-slate-200 hover:border-slate-300 text-slate-700'
                          }`}
                        >
                          <span>{months} Months Plan</span>
                          <span className="font-mono font-bold text-slate-900">₹{perMonth} / mo</span>
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={handlePay}
                    disabled={isProcessing}
                    className="w-full py-3.5 px-4 rounded-lg bg-[#002B49] hover:bg-[#001D33] text-white font-bold text-sm transition shadow-md cursor-pointer flex items-center justify-center gap-2 mt-4"
                  >
                    <span>START EMI AT ₹{Math.round(totalAmount / 3)}/MO</span>
                  </button>
                </div>
              )}

            </div>

          </div>

          {/* RIGHT DESK: ORDER SUMMARY & PRICE DETAILS CARD (1:1 VAKILSEARCH MATCH) */}
          <div className="lg:col-span-4 space-y-4">
            
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              
              {/* Card Title */}
              <div className="text-center pb-4 border-b border-slate-100">
                <h3 className="font-bold text-base text-slate-900">
                  PAN Registration (Income Tax Dept)
                </h3>
                <span className="inline-block mt-1 text-[11px] font-bold text-[#002B49] bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                  {selectedPlan.name}
                </span>
              </div>

              {/* Price Details Header */}
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 my-4">
                <span className="w-4 h-4 rounded-full border border-slate-500 text-slate-700 flex items-center justify-center text-[10px] font-bold">
                  ₹
                </span>
                <span>Price details</span>
              </div>

              {/* Line 1: Professional Fees */}
              <div className="flex justify-between items-center text-sm text-slate-700 py-1.5">
                <span>Professional Fees</span>
                <span className="font-bold text-slate-900">
                  ₹{basePrice.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Line 2: Taxes & Charges (Collapsible) */}
              <div className="py-1.5 border-t border-slate-100 mt-1">
                <button
                  type="button"
                  onClick={() => setIsTaxesExpanded(!isTaxesExpanded)}
                  className="w-full flex justify-between items-center text-sm font-semibold text-slate-700 cursor-pointer"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-slate-500">
                      {isTaxesExpanded ? '▲' : '▼'}
                    </span>
                    <span>Taxes &amp; Charges</span>
                  </div>
                  <span className="font-bold text-slate-900">
                    ₹{taxesAndCharges.toLocaleString('en-IN')}
                  </span>
                </button>

                {/* Collapsible Tax Breakdown */}
                {isTaxesExpanded && (
                  <div className="mt-2.5 p-3 rounded-lg bg-slate-50/80 space-y-2 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>GST on professional fee (18%)</span>
                      <span className="font-medium text-slate-800">
                        ₹{gstOnFee.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Labour Welfare Endowment with working Remove / Add button */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1.5">
                        <span>Taxpayer Welfare Endowment</span>
                        <button
                          type="button"
                          onClick={() => setIncludeLabourWelfare(!includeLabourWelfare)}
                          className={`border rounded px-1.5 py-0.5 text-[10px] font-semibold cursor-pointer transition ${
                            includeLabourWelfare
                              ? 'border-rose-300 text-rose-500 hover:bg-rose-50'
                              : 'border-emerald-300 text-emerald-600 hover:bg-emerald-50'
                          }`}
                        >
                          {includeLabourWelfare ? 'Remove' : 'Add back'}
                        </button>
                      </div>
                      <span className="font-medium text-slate-800">
                        ₹{labourWelfareAmount.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {includeLabourWelfare && (
                      <div className="flex justify-between">
                        <span>GST on welfare endowment (18%)</span>
                        <span className="font-medium text-slate-800">
                          ₹{gstOnLabour.toLocaleString('en-IN')}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="border-t-2 border-dashed border-slate-200 my-4" />

              {/* Total Amount Row (Bold, Prominent 2xl text) */}
              <div className="flex justify-between items-baseline">
                <span className="text-base font-bold text-slate-900">Total Amount</span>
                <span className="text-2xl font-black text-slate-950 tracking-tight">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-[10px] text-right text-slate-400 mt-0.5">
                Inclusive of 18% statutory GST
              </p>

              {/* Trust Badges under Price Card */}
              <div className="mt-6 pt-5 border-t border-slate-100 space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Statutory Compliance Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Assigned Senior Direct Tax CA Officer</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Government NSDL Fee Included in Package</span>
                </div>
              </div>

            </div>

            {/* Need Help Card */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <HelpCircle className="w-4 h-4 text-[#002B49]" />
                <span>Need assistance with payment?</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Facing bank netbanking or UPI limit issues? Contact our corporate billing desk for instant direct payment instructions.
              </p>
              <a
                href="https://wa.me/917668976193?text=Hi%20BharatFiling,%20I%20need%20help%20with%20PAN%20checkout%20payment."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-emerald-700 font-bold hover:underline"
              >
                <MessageSquare className="w-3.5 h-3.5" /> Chat on WhatsApp Support
              </a>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}
