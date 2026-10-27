import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Landmark,
  Printer,
  Send,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { api } from '../../services/api.js';
import BrandLogo from './BrandLogo.jsx';
import { answerSummary } from './answers.js';
import { computeQuote } from './quote.js';

const PAYMENT_TABS = [
  { id: 'upi', label: 'UPI', sub: 'Gpay, PhonePe, Paytm & more', Icon: Send },
  { id: 'card', label: 'Credit/Debit/ATM Card', sub: 'Visa, MasterCard, Rupay & more', Icon: CreditCard },
  { id: 'netbanking', label: 'Net Banking', sub: 'Pay using all Indian banks', Icon: Landmark },
];

const UPI_APPS = [
  { id: 'gpay', label: 'Google pay', badge: <span className="font-black text-sm text-[#4285F4]">G</span>, hint: 'Pay through the Google Pay app on your phone' },
  { id: 'phonepe', label: 'PhonePe', badge: <span className="w-full h-full rounded-full bg-[#6739B7] text-white font-bold flex items-center justify-center text-sm">पे</span>, hint: 'Pay through the PhonePe pay app on your phone' },
  { id: 'paytm', label: 'Paytm', badge: <span className="text-[10px] font-black text-[#00BAF2]">paytm</span>, hint: 'Pay through the Paytm app on your phone' },
  { id: 'other', label: 'Other UPI ID', badge: <span className="text-[9px] font-black text-slate-600 italic">UPI</span>, hint: null },
];

const BANKS = ['HDFC', 'ICICI', 'SBI', 'Axis', 'Kotak', 'PNB'];
const UPI_ID_RE = /^[\w.-]+@[\w.-]+$/;

export default function PaymentPage({ config, formData, onBack, onPaymentSuccess }) {
  const { isAuthenticated } = useAuth();
  const { showSuccess } = useToast();
  const plan = config.plans.items.find((p) => p.id === formData.plan);
  const unit = plan.unit || config.plans.unit;
  const answers = answerSummary(config.questionnaire.questions, formData.answers);

  const [includeLabourWelfare, setIncludeLabourWelfare] = useState(true);
  const [isTaxesOpen, setIsTaxesOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('upi');
  const [upiApp, setUpiApp] = useState('phonepe');
  const [customUpiId, setCustomUpiId] = useState('');
  const [bank, setBank] = useState('HDFC');
  const [isProcessing, setIsProcessing] = useState(false);
  const [payError, setPayError] = useState('');
  const [pendingOrder, setPendingOrder] = useState(null);
  const [receipt, setReceipt] = useState(null);

  const quote = computeQuote(plan.price, includeLabourWelfare);

  const handlePay = async () => {
    setPayError('');
    if (activeTab === 'upi' && upiApp === 'other' && !UPI_ID_RE.test(customUpiId.trim())) {
      setPayError('Please enter a valid UPI ID (e.g. name@bank).');
      return;
    }
    setIsProcessing(true);
    try {
      // A failed payment is retried against the same order unless the amount has changed.
      const orderKey = `${plan.id}|${includeLabourWelfare}`;
      let order = pendingOrder?.key === orderKey ? pendingOrder : null;
      if (!order) {
        const draft = await api.createGstServiceOrder(config.slug, {
          email: formData.email,
          phone: formData.phone,
          cityPincode: formData.cityPincode,
          whatsappOptIn: formData.whatsappOptIn,
          plan: plan.id,
          includeLabourWelfare,
          ...formData.answers,
        });
        order = { key: orderKey, id: draft.order.id, applicationNumber: draft.applicationNumber };
        setPendingOrder(order);
      }
      const paid = await api.payGstServiceOrder(config.slug, order.id, {
        paymentMethod: activeTab,
        upiApp: activeTab === 'upi' ? upiApp : null,
      });
      setReceipt({
        orderNumber: paid.order.order_number,
        applicationNumber: order.applicationNumber,
        transactionId: paid.transactionId,
        amount: paid.order.amount,
      });
      showSuccess(`Payment successful! Your ${config.name} order is confirmed.`);
      onPaymentSuccess();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setPayError(err.message || 'Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (receipt) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 font-sans">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-9">
          <div className="text-center pb-6 border-b border-slate-100">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <Check className="w-8 h-8 stroke-[3]" aria-hidden="true" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Payment Successful!</h1>
            <p className="text-sm text-slate-500 mt-1">
              Your <strong>{config.name} ({plan.name})</strong> order has been placed.
            </p>
          </div>

          <dl className="py-6 space-y-4 text-sm border-b border-slate-100">
            {[
              ['Order Number', receipt.orderNumber],
              ['Application Number', receipt.applicationNumber],
              ...answers.map((a) => [a.label, a.value]),
              ['Total Paid (Incl. Taxes)', `₹${receipt.amount.toLocaleString('en-IN')}`],
              ['Transaction ID', receipt.transactionId],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4">
                <dt className="text-slate-500">{k}:</dt>
                <dd className="font-semibold text-slate-800 text-right">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="bg-blue-50/50 rounded-xl p-5 my-5 border border-blue-100">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-800">What happens next</h2>
            <ol className="mt-3 space-y-2 text-sm text-slate-700 list-decimal list-inside">
              <li>Your order is now with our GST expert desk.</li>
              <li>An expert will contact you on {formData.phone} to collect the documents needed.</li>
              <li>Track every update on your dashboard.</li>
            </ol>
            {!isAuthenticated && (
              <p className="mt-3 text-xs text-slate-500">
                Log in or sign up with <strong>{formData.email}</strong> to see this order on your dashboard.
              </p>
            )}
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 border border-slate-300 text-slate-700 px-4 py-2.5 rounded-lg text-xs font-semibold hover:bg-slate-50 cursor-pointer"
            >
              <Printer className="w-4 h-4" aria-hidden="true" />
              <span>Print Receipt</span>
            </button>
            <Link
              to={`/dashboard?app=${receipt.applicationNumber}`}
              className="inline-flex items-center gap-1.5 bg-[#002B49] text-white px-5 py-2.5 rounded-lg text-xs font-semibold hover:bg-[#001D38]"
            >
              Track on Dashboard &rarr;
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const payButton = (
    <button
      type="button"
      onClick={handlePay}
      disabled={isProcessing}
      className="w-full bg-[#002B49] hover:bg-[#001D38] disabled:opacity-60 text-white font-bold py-3.5 px-4 rounded-lg shadow-md transition cursor-pointer text-base"
    >
      {isProcessing ? 'Processing...' : `PAY ₹${quote.totalAmount}`}
    </button>
  );

  return (
    <div className="min-h-screen bg-white font-sans py-8 sm:py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#002B49] transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back to Plans</span>
        </button>
        <BrandLogo />
      </div>

      <div className="max-w-6xl mx-auto mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Choose Payment Method</h1>
        <p className="text-base font-semibold text-slate-800 mt-5">Payment Options</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 rounded-lg border border-slate-200 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[460px]">
          <div className="md:col-span-5 bg-slate-100/80" role="tablist" aria-label="Payment methods">
            {PAYMENT_TABS.map(({ id, label, sub, Icon }) => {
              const active = activeTab === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setActiveTab(id);
                    setPayError('');
                  }}
                  className={`relative w-full text-left px-6 py-5 flex items-center justify-between transition cursor-pointer ${
                    active ? 'bg-white' : 'hover:bg-slate-100'
                  }`}
                >
                  {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#002B49]" />}
                  <div className="flex items-center gap-4">
                    <Icon className="w-5 h-5 text-slate-600 shrink-0" aria-hidden="true" />
                    <div>
                      <div className="text-sm font-bold text-slate-900">{label}</div>
                      <div className="text-[11px] text-slate-600">{sub}</div>
                    </div>
                  </div>
                  {active && <div className="w-0 h-0 border-y-[9px] border-y-transparent border-l-[10px] border-l-[#002B49]" />}
                </button>
              );
            })}
          </div>

          <div className="md:col-span-7 p-6 sm:p-8" role="tabpanel">
            {activeTab === 'upi' && (
              <div>
                <h2 className="text-lg font-bold text-slate-900 pb-4 border-b border-slate-200">Pay with UPI</h2>
                <p className="text-sm text-slate-500 mt-6">Select UPI App</p>
                <div className="grid grid-cols-4 gap-3 mt-5">
                  {UPI_APPS.map((app) => {
                    const selected = upiApp === app.id;
                    return (
                      <button
                        key={app.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setUpiApp(app.id)}
                        className="flex flex-col items-center gap-2 cursor-pointer"
                      >
                        <span
                          className={`relative w-12 h-12 rounded-full bg-white shadow flex items-center justify-center p-1 ${
                            selected ? 'ring-2 ring-[#002B49]' : 'border border-slate-100'
                          }`}
                        >
                          {app.badge}
                          {selected && (
                            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#002B49] text-white flex items-center justify-center">
                              <Check className="w-3 h-3 stroke-[3]" aria-hidden="true" />
                            </span>
                          )}
                        </span>
                        <span className="text-xs font-semibold text-slate-800 text-center">{app.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8 min-h-[44px]">
                  {upiApp === 'other' ? (
                    <input
                      type="text"
                      placeholder="e.g. yourname@okhdfcbank"
                      aria-label="UPI ID"
                      value={customUpiId}
                      onChange={(e) => setCustomUpiId(e.target.value)}
                      className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:border-[#002B49]"
                    />
                  ) : (
                    <p className="text-sm text-slate-600">{UPI_APPS.find((a) => a.id === upiApp).hint}</p>
                  )}
                </div>
                <div className="mt-4">{payButton}</div>
              </div>
            )}

            {activeTab === 'card' && (
              <div>
                <h2 className="text-lg font-bold text-slate-900 pb-4 border-b border-slate-200">Pay with Card</h2>
                <p className="text-sm text-slate-600 mt-6 mb-8">
                  You will enter your card details on our secure payment partner's page. We never store your card information.
                </p>
                {payButton}
              </div>
            )}

            {activeTab === 'netbanking' && (
              <div>
                <h2 className="text-lg font-bold text-slate-900 pb-4 border-b border-slate-200">Pay with Net Banking</h2>
                <div className="grid grid-cols-3 gap-2 mt-6 mb-8">
                  {BANKS.map((b) => (
                    <button
                      key={b}
                      type="button"
                      aria-pressed={bank === b}
                      onClick={() => setBank(b)}
                      className={`p-3 text-xs font-semibold rounded-lg border transition cursor-pointer ${
                        bank === b ? 'border-[#002B49] bg-blue-50/40 text-[#002B49]' : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {b} Bank
                    </button>
                  ))}
                </div>
                {payButton}
              </div>
            )}

            {payError && (
              <div role="alert" className="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                <span>
                  {payError}{' '}
                  <Link to={`/contact?service=${encodeURIComponent(config.name)}`} className="font-semibold underline">
                    Contact support
                  </Link>
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-lg border border-slate-200">
            <div className="text-center border-b border-slate-200 py-5 px-4">
              <h3 className="text-lg font-bold text-slate-900">{config.name}</h3>
              <p className="text-xs text-slate-500 mt-1">
                {plan.name} plan{unit ? ` · ${unit}` : ''}
              </p>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 mb-4">
                <span className="w-6 h-6 rounded-full border border-slate-500 flex items-center justify-center text-xs" aria-hidden="true">₹</span>
                <span>Price details</span>
              </div>

              <div className="flex justify-between text-sm py-2 px-2">
                <span className="text-slate-700">Professional Fees</span>
                <span className="text-slate-900">₹{quote.professionalFee}</span>
              </div>

              <button
                type="button"
                aria-expanded={isTaxesOpen}
                onClick={() => setIsTaxesOpen(!isTaxesOpen)}
                className="w-full flex justify-between items-center text-sm text-slate-700 py-2 px-2 cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  {isTaxesOpen ? <ChevronUp className="w-4 h-4" aria-hidden="true" /> : <ChevronDown className="w-4 h-4" aria-hidden="true" />}
                  Taxes &amp; Charges
                </span>
                <span className="text-slate-900">₹{quote.taxesAndCharges}</span>
              </button>

              {isTaxesOpen && (
                <div className="bg-slate-100 rounded px-2 py-2 space-y-3 text-sm text-slate-600 mt-1">
                  <div className="flex justify-between">
                    <span>GST on professional fee (18%)</span>
                    <span>₹{quote.gstOnFee}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      Labour Welfare Endowment
                      <button
                        type="button"
                        onClick={() => setIncludeLabourWelfare(!includeLabourWelfare)}
                        className={`border text-xs px-1.5 py-0.5 rounded cursor-pointer ${
                          includeLabourWelfare
                            ? 'border-red-400 text-red-500 hover:bg-red-50'
                            : 'border-emerald-500 text-emerald-600 hover:bg-emerald-50'
                        }`}
                      >
                        {includeLabourWelfare ? 'Remove' : 'Add'}
                      </button>
                    </span>
                    <span>₹{quote.labourWelfare}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST on labour welfare (18%)</span>
                    <span>₹{quote.gstOnLabour}</span>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-baseline mt-5 px-2">
                <span className="text-lg font-bold text-slate-900">Total Amount</span>
                <span className="text-xl font-bold text-slate-900">₹{quote.totalAmount}</span>
              </div>
            </div>
          </div>

          <div className="flex items-start justify-around text-xs font-semibold text-slate-800">
            <div className="flex flex-col items-center gap-2">
              <span className="font-black text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded text-[11px]">PCI</span>
              <span>100% Secure Payment</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-base leading-none" aria-hidden="true">🛡️</span>
              <span>Guaranteed Satisfaction</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
