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
  QrCode,
  Lock,
  ArrowRight,
  Download,
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
    propPlanId || searchParams.get('plan') || formData.plan || 'basic';
  const currentPlan = getFssaiPlan(selectedPlanKey);

  // Fee calculation matching Vakilsearch model:
  // Base professional fee + 18% GST = Plan Price
  // e.g. for Basic (₹1,999): Base ~ ₹1,694, GST ~ ₹305
  // Addons if selected in step 3
  const planPrice = currentPlan.price || 1999;
  const basePrice = Math.round(planPrice / 1.18);
  const gstOnFee = planPrice - basePrice;

  // Labour welfare addon (default: true matching Vakilsearch payment desk)
  const [includeLabourWelfare, setIncludeLabourWelfare] = useState(true);
  const labourWelfareAmount = includeLabourWelfare ? 77 : 0;
  const gstOnLabour = includeLabourWelfare ? 14 : 0;

  const totalTaxes = gstOnFee + labourWelfareAmount + gstOnLabour;
  const totalAmount = basePrice + totalTaxes;

  const [isTaxesExpanded, setIsTaxesExpanded] = useState(true);

  // Payment method: 'upi', 'card', 'netbanking', 'emi'
  const [activeMethod, setActiveMethod] = useState('upi');

  // UPI Apps: 'phonepe', 'gpay', 'paytm', 'custom'
  const [selectedUpiApp, setSelectedUpiApp] = useState('phonepe');
  const [customUpiId, setCustomUpiId] = useState('');
  const [showQr, setShowQr] = useState(false);

  // Card fields
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');

  // Net banking bank
  const [selectedBank, setSelectedBank] = useState('State Bank of India');

  // EMI tenure
  const [selectedEmiTenure, setSelectedEmiTenure] = useState(
    '3 Months - ₹' + Math.round(totalAmount / 3) + '/mo'
  );

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  const getUpiAppName = () => {
    switch (selectedUpiApp) {
      case 'gpay':
        return 'Google Pay';
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

    if (activeMethod === 'upi' && selectedUpiApp === 'custom' && !customUpiId.includes('@')) {
      showError('Please enter a valid UPI VPA (e.g. name@okaxis)');
      return;
    }

    if (activeMethod === 'card') {
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
      // Realistic payment processing simulation
      await new Promise((res) => setTimeout(res, 1800));

      const txId = 'FSSAI-' + Math.floor(100000 + Math.random() * 900000);
      setTransactionId(txId);
      setIsSuccess(true);
      setIsProcessing(false);

      if (onPaymentSuccess) {
        onPaymentSuccess();
      }

      // Celebratory confetti explosion
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      setIsProcessing(false);
      showError('Payment failed. Please try again.');
    }
  };

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
              <span className="font-bold text-slate-900">{currentPlan.name}</span>
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
              <span className="font-mono text-blue-700 font-semibold">FoSCoS Central</span>
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

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col justify-between py-6 sm:py-10 px-4 sm:px-6">
      
      {/* Top Header */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between pb-6">
        <div className="flex items-center gap-2">
          <img
            src="/bharatfiling-user-logo.png"
            alt="BharatFiling"
            className="h-8 sm:h-9 w-auto object-contain cursor-pointer"
            onClick={() => navigate(-1)}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/bharatfiling-horizontal-transparent.png';
            }}
          />
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Lock className="w-4 h-4 text-emerald-600" />
          <span>256-Bit SSL Encrypted Statutory Checkout</span>
        </div>
      </header>

      {/* Main 2-Column Payment Container */}
      <main className="max-w-5xl w-full mx-auto my-auto py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Payment Methods */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-900">
                Choose Payment Method
              </h2>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Instant Receipt
              </span>
            </div>

            {/* Payment Method Switcher Tabs */}
            <div className="grid grid-cols-4 gap-2 p-1 bg-slate-100 rounded-xl text-xs font-bold text-center">
              <button
                type="button"
                onClick={() => setActiveMethod('upi')}
                className={`py-2.5 rounded-lg transition cursor-pointer ${
                  activeMethod === 'upi' ? 'bg-[#002B49] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                UPI
              </button>
              <button
                type="button"
                onClick={() => setActiveMethod('card')}
                className={`py-2.5 rounded-lg transition cursor-pointer ${
                  activeMethod === 'card' ? 'bg-[#002B49] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Card
              </button>
              <button
                type="button"
                onClick={() => setActiveMethod('netbanking')}
                className={`py-2.5 rounded-lg transition cursor-pointer ${
                  activeMethod === 'netbanking' ? 'bg-[#002B49] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                NetBanking
              </button>
              <button
                type="button"
                onClick={() => setActiveMethod('emi')}
                className={`py-2.5 rounded-lg transition cursor-pointer ${
                  activeMethod === 'emi' ? 'bg-[#002B49] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                EMI
              </button>
            </div>

            {/* Tab 1: UPI */}
            {activeMethod === 'upi' && (
              <div className="space-y-4 pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Select UPI Application
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'phonepe', name: 'PhonePe', icon: '🟣' },
                    { id: 'gpay', name: 'Google Pay', icon: '🔵' },
                    { id: 'paytm', name: 'Paytm', icon: '🔷' },
                    { id: 'custom', name: 'Other UPI ID', icon: '⚡' },
                  ].map((app) => (
                    <button
                      key={app.id}
                      type="button"
                      onClick={() => {
                        setSelectedUpiApp(app.id);
                        setShowQr(false);
                      }}
                      className={`p-3 rounded-xl border text-center transition cursor-pointer ${
                        selectedUpiApp === app.id
                          ? 'border-[#002B49] bg-blue-50/50 ring-2 ring-[#002B49]/10 font-bold'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <span className="text-xl block mb-1">{app.icon}</span>
                      <span className="text-xs text-slate-800">{app.name}</span>
                    </button>
                  ))}
                </div>

                {selectedUpiApp === 'custom' && (
                  <div className="pt-2">
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Enter UPI ID / VPA
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. mobile@upi or username@okicici"
                      value={customUpiId}
                      onChange={(e) => setCustomUpiId(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#002B49]"
                    />
                  </div>
                )}

                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => setShowQr(!showQr)}
                    className="text-xs font-semibold text-[#0052CC] hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>{showQr ? 'Hide UPI QR Code' : 'Or Scan UPI QR Code on any app'}</span>
                  </button>

                  {showQr && (
                    <div className="mt-3 p-4 bg-slate-50 border border-slate-200 rounded-xl inline-block text-center">
                      <div className="w-40 h-40 bg-white border border-slate-300 rounded-lg p-2 mx-auto flex items-center justify-center">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=bharatfiling@icici%26pn=BharatFiling%26am=${totalAmount}%26cu=INR`}
                          alt="UPI QR Code"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <p className="text-[11px] text-slate-500 mt-2 font-mono">
                        Scan with PhonePe, GPay, Paytm or BHIM
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab 2: Credit / Debit Card */}
            {activeMethod === 'card' && (
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Card Number
                  </label>
                  <div className="relative">
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
                    <CreditCard className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Expiry (MM/YY)
                    </label>
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
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      CVV / CVC
                    </label>
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
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    placeholder="Cardholder full name"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#002B49]"
                  />
                </div>
              </div>
            )}

            {/* Tab 3: NetBanking */}
            {activeMethod === 'netbanking' && (
              <div className="space-y-4 pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Popular Net Banking Portals
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {NET_BANKS.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setSelectedBank(b)}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold transition cursor-pointer flex items-center gap-2 ${
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
              </div>
            )}

            {/* Tab 4: EMI */}
            {activeMethod === 'emi' && (
              <div className="space-y-4 pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Choose No-Cost / Standard EMI Option
                </label>
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
              </div>
            )}

            {/* Pay Button */}
            <div className="pt-4 border-t border-slate-100">
              <button
                type="button"
                disabled={isProcessing}
                onClick={handlePay}
                className="w-full py-4 rounded-xl bg-[#002B49] hover:bg-[#001D32] text-white font-extrabold text-sm sm:text-base transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Contacting FoSCoS Payment Gateway...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Pay Securely ₹{totalAmount.toLocaleString('en-IN')}</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Right Column: Order Summary & Taxes Breakdown (Vakilsearch Clone) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-5">
            
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Statutory Order
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-2">
                {currentPlan.name}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {currentPlan.formType} • TAT: {currentPlan.tat}
              </p>
            </div>

            {/* Breakdown */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-700">
                <span>Professional Legal Fee:</span>
                <span className="font-mono font-semibold">₹{basePrice.toLocaleString('en-IN')}</span>
              </div>

              {/* Expandable Taxes */}
              <div className="pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsTaxesExpanded(!isTaxesExpanded)}
                  className="w-full flex items-center justify-between text-slate-600 font-semibold cursor-pointer py-1"
                >
                  <span className="flex items-center gap-1">
                    <span>Taxes &amp; Statutory Cess</span>
                    {isTaxesExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </span>
                  <span className="font-mono">₹{totalTaxes.toLocaleString('en-IN')}</span>
                </button>

                {isTaxesExpanded && (
                  <div className="pl-3 pr-1 py-2 space-y-2 text-[11px] text-slate-500 bg-slate-50 rounded-lg mt-1.5">
                    <div className="flex justify-between">
                      <span>GST (18% on Professional Fee):</span>
                      <span className="font-mono">₹{gstOnFee}</span>
                    </div>

                    {/* Labour Welfare checkbox (1:1 with reference) */}
                    <div className="flex items-start justify-between gap-2 pt-1 border-t border-slate-200/60">
                      <label className="flex items-start gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={includeLabourWelfare}
                          onChange={() => setIncludeLabourWelfare(!includeLabourWelfare)}
                          className="mt-0.5 text-[#002B49] rounded focus:ring-[#002B49]"
                        />
                        <span>Labour Welfare Contribution:</span>
                      </label>
                      <span className="font-mono">₹{labourWelfareAmount}</span>
                    </div>

                    {includeLabourWelfare && (
                      <div className="flex justify-between pl-5 text-[10px]">
                        <span>GST on Welfare (18%):</span>
                        <span className="font-mono">₹{gstOnLabour}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Total Payable */}
              <div className="pt-4 border-t-2 border-slate-200 flex justify-between items-baseline">
                <div>
                  <span className="text-sm font-black text-slate-900 block">Total Amount:</span>
                  <span className="text-[10px] text-slate-500">Includes all applicable taxes</span>
                </div>
                <span className="text-2xl font-black text-[#002B49] font-mono">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Trust Assurances */}
            <div className="pt-4 border-t border-slate-100 space-y-2 text-[11px] text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Authorized FoSCoS online filing and fee remittance</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero hidden charges • Formal GST tax invoice provided</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Full query handling until digital certificate is issued</span>
              </div>
            </div>

          </div>

        </div>
      </main>

      <footer className="max-w-6xl w-full mx-auto text-center py-4 text-xs text-slate-400">
        © BharatFiling Statutory Facilitation Desk • ISO 27001 Certified System
      </footer>

    </div>
  );
}
