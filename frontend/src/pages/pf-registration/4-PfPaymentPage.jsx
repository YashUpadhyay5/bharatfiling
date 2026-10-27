import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CreditCard,
  Building,
  CheckCircle2,
  Lock,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Download,
  Printer,
  Sparkles,
  ArrowLeft,
  Check,
  Smartphone,
  Info,
  UserCheck,
  FileText,
  BadgeCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useToast } from '../../context/ToastContext.jsx';
import { PF_PLANS } from './constants.js';

export default function PfPaymentPage({
  formData = {},
  orderId = '',
  onBack,
  onPaymentSuccess,
}) {
  const { showSuccess, showError } = useToast();

  const selectedPlanId = formData.plan || 'standard';
  const selectedPlan = PF_PLANS.find((p) => p.id === selectedPlanId) || PF_PLANS[1];
  const professionalFee = selectedPlan.price;

  // 18% GST on Professional Fee
  const gstOnFee = Math.round(professionalFee * 0.18);

  // Welfare Endowment = ₹120 with interactive toggle
  const [includeLabourWelfare, setIncludeLabourWelfare] = useState(true);
  const labourWelfare = includeLabourWelfare ? 120 : 0;
  const gstOnLabour = includeLabourWelfare ? 22 : 0;

  const totalTaxes = gstOnFee + labourWelfare + gstOnLabour;
  const totalAmount = professionalFee + totalTaxes;

  // UI payment selection state
  const [activePaymentTab, setActivePaymentTab] = useState('upi'); // 'upi' | 'card' | 'netbanking'
  const [selectedUpiApp, setSelectedUpiApp] = useState('phonepe');
  const [customUpiId, setCustomUpiId] = useState('');
  const [isTaxesOpen, setIsTaxesOpen] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [paidDetails, setPaidDetails] = useState(null);

  // Card form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Netbanking state
  const [selectedBank, setSelectedBank] = useState('HDFC');

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // Ignore if confetti library fails
    }
  };

  const handlePay = async (e) => {
    if (e) e.preventDefault();
    setIsProcessing(true);

    try {
      const simulatedOrderId = orderId || `EPF-${Math.floor(100000 + Math.random() * 900000)}`;
      const simulatedTxn = `BFP-EPF-${Math.floor(100000 + Math.random() * 900000)}`;
      const simulatedAppNo = `EPFO2026-${Math.floor(10000 + Math.random() * 90000)}`;

      try {
        await fetch(`/api/v1/pf/checkout/${simulatedOrderId}/pay`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paymentMethod: activePaymentTab.toUpperCase(),
            upiApp: selectedUpiApp,
            transactionId: simulatedTxn,
            amount: totalAmount,
          }),
        });
      } catch {
        // Fallback for offline simulation
      }

      const receipt = {
        orderId: simulatedOrderId,
        transactionId: simulatedTxn,
        applicationNumber: simulatedAppNo,
        amount: totalAmount,
        professionalFee,
        totalTaxes,
        gstOnFee,
        labourWelfare,
        gstOnLabour,
        planName: selectedPlan.name,
        businessName: formData.businessName || formData.cinGstin || 'Business Establishment',
        email: formData.email || 'applicant@example.com',
        phone: formData.phone || '+91 98765 43210',
        date: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
        caAssigned: 'CS Rajesh Varma (Sr. Labour Law Officer)',
      };

      setPaidDetails(receipt);
      setIsPaid(true);
      triggerConfetti();
      showSuccess('Payment Successful! Your EPF Application has been dispatched to CA desk.');

      if (onPaymentSuccess) {
        onPaymentSuccess(receipt);
      }
    } catch (err) {
      showError('Payment processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // SUCCESS STATE (Post Payment Receipt & Desk Assignment)
  if (isPaid && paidDetails) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 font-sans">
        <div className="max-w-2xl mx-auto">
          {/* Success Banner */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
              Payment Completed
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-[#002B49] mt-3">
              Application Dispatched to EPFO CA Desk!
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-md mx-auto">
              Your payment of <strong className="text-slate-900">₹{paidDetails.amount.toLocaleString('en-IN')}</strong> has been confirmed. Your EPF Establishment Registration is in progress.
            </p>

            {/* Quick Summary Pill Bar */}
            <div className="mt-6 p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex flex-wrap items-center justify-around gap-4 text-xs">
              <div>
                <span className="text-slate-500 block">Application No.</span>
                <span className="font-extrabold text-[#002B49] font-mono">{paidDetails.applicationNumber}</span>
              </div>
              <div className="hidden sm:block w-px h-8 bg-blue-200" />
              <div>
                <span className="text-slate-500 block">Assigned Officer</span>
                <span className="font-extrabold text-[#002B49]">{paidDetails.caAssigned}</span>
              </div>
              <div className="hidden sm:block w-px h-8 bg-blue-200" />
              <div>
                <span className="text-slate-500 block">Estimated Code Delivery</span>
                <span className="font-extrabold text-slate-900">3-5 Working Days</span>
              </div>
            </div>
          </div>

          {/* Tax Invoice Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h3 className="font-black text-base text-[#002B49]">Tax Invoice / Receipt</h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">Txn ID: {paidDetails.transactionId}</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 cursor-pointer"
                  title="Print Receipt"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-600 mb-6">
              <div className="flex justify-between">
                <span>Plan Package:</span>
                <span className="font-bold text-slate-900">{paidDetails.planName}</span>
              </div>
              <div className="flex justify-between">
                <span>Business / Establishment:</span>
                <span className="font-bold text-slate-900">{paidDetails.businessName}</span>
              </div>
              <div className="flex justify-between">
                <span>Professional Filing Fee:</span>
                <span className="font-bold text-slate-900">₹{paidDetails.professionalFee.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (18% on Professional Services):</span>
                <span className="font-bold text-slate-900">₹{paidDetails.gstOnFee.toLocaleString('en-IN')}</span>
              </div>
              {paidDetails.labourWelfare > 0 && (
                <div className="flex justify-between">
                  <span>Labour Welfare &amp; Documentation Fund:</span>
                  <span className="font-bold text-slate-900">
                    ₹{(paidDetails.labourWelfare + paidDetails.gstOnLabour).toLocaleString('en-IN')}
                  </span>
                </div>
              )}
              <div className="border-t border-slate-100 pt-3 flex justify-between items-baseline text-sm">
                <span className="font-black text-[#002B49]">Total Amount Paid:</span>
                <span className="text-xl font-black text-[#002B49]">₹{paidDetails.amount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                to="/dashboard"
                className="w-full py-3 bg-[#002B49] hover:bg-[#073866] text-white font-bold rounded-xl shadow-xs transition flex items-center justify-center gap-2 text-xs"
              >
                <span>Track Application in Dashboard</span>
              </Link>
              <Link
                to="/"
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition flex items-center justify-center text-xs"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // DEFAULT PAYMENT SELECTION VIEW
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 sm:py-16 text-slate-800 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Plans &amp; Configuration</span>
        </button>

        <div className="mb-8">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#002B49] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
            Step 4 of 4 • Final Payment
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] mt-3">
            Secure Payment Gateway
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Complete payment to initiate Shram Suvidha filing and DSC authorization.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Payment Method Tabs (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
            {/* Tabs */}
            <div className="flex border-b border-slate-200 overflow-x-auto gap-4 text-xs font-bold">
              <button
                type="button"
                onClick={() => setActivePaymentTab('upi')}
                className={`pb-3 px-1 border-b-2 transition whitespace-nowrap cursor-pointer ${
                  activePaymentTab === 'upi'
                    ? 'border-[#002B49] text-[#002B49]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                UPI (GPay / PhonePe / QR)
              </button>
              <button
                type="button"
                onClick={() => setActivePaymentTab('card')}
                className={`pb-3 px-1 border-b-2 transition whitespace-nowrap cursor-pointer ${
                  activePaymentTab === 'card'
                    ? 'border-[#002B49] text-[#002B49]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Credit / Debit Card
              </button>
              <button
                type="button"
                onClick={() => setActivePaymentTab('netbanking')}
                className={`pb-3 px-1 border-b-2 transition whitespace-nowrap cursor-pointer ${
                  activePaymentTab === 'netbanking'
                    ? 'border-[#002B49] text-[#002B49]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Net Banking
              </button>
            </div>

            {/* UPI View */}
            {activePaymentTab === 'upi' && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {['phonepe', 'gpay', 'paytm'].map((app) => (
                    <div
                      key={app}
                      onClick={() => setSelectedUpiApp(app)}
                      className={`p-3 rounded-xl border-2 text-center cursor-pointer transition ${
                        selectedUpiApp === app
                          ? 'border-[#002B49] bg-slate-50/70 font-bold'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-xs uppercase font-extrabold">{app}</span>
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Or Enter UPI ID (VPA)
                  </label>
                  <input
                    type="text"
                    value={customUpiId}
                    onChange={(e) => setCustomUpiId(e.target.value)}
                    placeholder="e.g. mobile@upi or username@okhdfcbank"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-[#002B49] focus:ring-1 focus:ring-[#002B49]"
                  />
                </div>
              </div>
            )}

            {/* Card View */}
            {activePaymentTab === 'card' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Card Number</label>
                  <input
                    type="text"
                    maxLength={19}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4532 •••• •••• ••••"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-[#002B49] focus:ring-1 focus:ring-[#002B49] font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-[#002B49] focus:ring-1 focus:ring-[#002B49]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">CVV</label>
                    <input
                      type="password"
                      maxLength={4}
                      placeholder="•••"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-[#002B49] focus:ring-1 focus:ring-[#002B49] font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Netbanking View */}
            {activePaymentTab === 'netbanking' && (
              <div className="space-y-4">
                <label className="block text-xs font-bold text-slate-700 mb-1">Select Bank</label>
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-[#002B49] focus:ring-1 focus:ring-[#002B49] bg-white"
                >
                  <option value="HDFC">HDFC Bank</option>
                  <option value="ICICI">ICICI Bank</option>
                  <option value="SBI">State Bank of India (SBI)</option>
                  <option value="AXIS">Axis Bank</option>
                  <option value="KOTAK">Kotak Mahindra Bank</option>
                </select>
              </div>
            )}

            {/* Pay Button */}
            <button
              type="button"
              onClick={handlePay}
              disabled={isProcessing}
              className="w-full py-3.5 bg-[#002B49] hover:bg-[#073866] active:scale-[0.99] text-white font-bold rounded-xl shadow-md transition-all cursor-pointer text-sm flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <span>Authorizing Payment...</span>
              ) : (
                <span>Pay ₹{totalAmount.toLocaleString('en-IN')} Securely</span>
              )}
            </button>
          </div>

          {/* Right: Bill Breakdown (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-xl space-y-4">
            <h3 className="font-extrabold text-base text-[#002B49] pb-3 border-b border-slate-100">
              Payment Summary
            </h3>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>{selectedPlan.name}:</span>
                <span className="font-bold text-slate-900">₹{professionalFee.toLocaleString('en-IN')}</span>
              </div>

              {/* Taxes Accordion */}
              <div className="border border-slate-100 rounded-xl p-3 bg-slate-50/50">
                <div
                  onClick={() => setIsTaxesOpen(!isTaxesOpen)}
                  className="flex justify-between items-center cursor-pointer font-bold text-slate-800"
                >
                  <span>Taxes &amp; Compliance Fees:</span>
                  <div className="flex items-center gap-1">
                    <span>₹{totalTaxes.toLocaleString('en-IN')}</span>
                    {isTaxesOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </div>
                </div>

                {isTaxesOpen && (
                  <div className="mt-2.5 pt-2 border-t border-slate-200/60 space-y-1.5 text-[11px] text-slate-500">
                    <div className="flex justify-between">
                      <span>• GST (18% on Fee):</span>
                      <span>₹{gstOnFee}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <span>• Labour Welfare Endowment:</span>
                        <button
                          type="button"
                          onClick={() => setIncludeLabourWelfare(!includeLabourWelfare)}
                          className="text-[10px] text-rose-600 underline font-semibold ml-1 cursor-pointer"
                        >
                          {includeLabourWelfare ? '[Remove]' : '[Add back]'}
                        </button>
                      </div>
                      <span>₹{labourWelfare}</span>
                    </div>

                    {includeLabourWelfare && (
                      <div className="flex justify-between">
                        <span>• GST on Welfare:</span>
                        <span>₹{gstOnLabour}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex justify-between text-emerald-600 font-medium">
                <span>Government Fee:</span>
                <span>₹0 (Zero)</span>
              </div>
            </div>

            <div className="pt-3 border-t-2 border-slate-200 flex justify-between items-baseline">
              <div>
                <span className="text-xs font-bold text-slate-500">Total Payable:</span>
                <p className="text-2xl font-black text-[#002B49]">₹{totalAmount.toLocaleString('en-IN')}</p>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Inclusive of Taxes
              </span>
            </div>

            <div className="p-3 rounded-xl bg-blue-50/60 text-[11px] text-[#002B49] flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                Your 15-digit EPF Establishment Code will be processed directly under Shram Suvidha portal standards.
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
