import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Check, CreditCard, Landmark, Send } from 'lucide-react';

const PAYMENT_TABS = [
  { id: 'upi', label: 'UPI', sub: 'Gpay, PhonePe, Paytm & more', Icon: Send },
  { id: 'card', label: 'Credit/Debit/ATM Card', sub: 'Visa, MasterCard, Rupay & more', Icon: CreditCard },
  { id: 'netbanking', label: 'Net Banking', sub: 'Pay using all Indian banks', Icon: Landmark },
  { id: 'emi', label: 'EMI option', sub: 'Pay using credit card & Debit card', iconText: 'EMI' },
];

const UPI_APPS = [
  { id: 'gpay', label: 'Google pay', badge: <span className="font-black text-sm text-[#4285F4]">G</span>, hint: 'Pay through the Google Pay app on your phone' },
  { id: 'phonepe', label: 'PhonePe', badge: <span className="w-full h-full rounded-full bg-[#6739B7] text-white font-bold flex items-center justify-center text-sm">पे</span>, hint: 'Pay through the PhonePe pay app on your phone' },
  { id: 'paytm', label: 'Paytm', badge: <span className="text-[10px] font-black text-[#00BAF2]">paytm</span>, hint: 'Pay through the Paytm app on your phone' },
  { id: 'other', label: 'Other UPI ID', badge: <span className="text-[9px] font-black text-slate-600 italic">UPI</span>, hint: null },
];

const BANKS = ['HDFC', 'ICICI', 'SBI', 'Axis', 'Kotak', 'PNB'];
const UPI_ID_RE = /^[\w.-]+@[\w.-]+$/;

/**
 * The payment-options card of the checkout screen: method tabs on the left, the chosen method's panel on the
 * right. It owns the method choice and calls onPay({ paymentMethod, upiApp }); the page owns the order.
 *
 *  methods   - which of 'upi' | 'card' | 'netbanking' | 'emi' to offer
 *  error     - a payment error from the page, shown under the panel
 */
export default function PaymentMethods({ methods, totalAmount, isProcessing, error, onClearError, supportHref, onPay, className = '' }) {
  const tabs = PAYMENT_TABS.filter((t) => methods.includes(t.id));
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [upiApp, setUpiApp] = useState('phonepe');
  const [customUpiId, setCustomUpiId] = useState('');
  const [bank, setBank] = useState('HDFC');
  const [localError, setLocalError] = useState('');

  const handlePay = () => {
    if (activeTab === 'upi' && upiApp === 'other' && !UPI_ID_RE.test(customUpiId.trim())) {
      setLocalError('Please enter a valid UPI ID (e.g. name@bank).');
      return;
    }
    setLocalError('');
    onPay({ paymentMethod: activeTab, upiApp: activeTab === 'upi' ? upiApp : null });
  };

  const payButton = (
    <button
      type="button"
      onClick={handlePay}
      disabled={isProcessing}
      className="w-full bg-[#002B49] hover:bg-[#001D38] disabled:opacity-60 text-white font-bold py-3.5 px-4 rounded-lg shadow-md transition cursor-pointer text-base"
    >
      {isProcessing ? 'Processing...' : `PAY ₹${totalAmount}`}
    </button>
  );

  const shownError = localError || error;

  return (
    <div className={`rounded-lg border border-slate-200 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[460px] bg-white ${className}`}>
      <div className="md:col-span-5 bg-slate-100/80" role="tablist" aria-label="Payment methods">
        {tabs.map(({ id, label, sub, Icon, iconText }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => {
                setActiveTab(id);
                setLocalError('');
                onClearError?.();
              }}
              className={`relative w-full text-left px-6 py-5 flex items-center justify-between transition cursor-pointer ${
                active ? 'bg-white' : 'hover:bg-slate-100'
              }`}
            >
              {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#002B49]" />}
              <div className="flex items-center gap-4">
                {Icon ? (
                  <Icon className="w-5 h-5 text-slate-600 shrink-0" aria-hidden="true" />
                ) : (
                  <span className="w-5 shrink-0 text-center text-[9px] font-bold text-slate-600 border border-slate-400 rounded-sm leading-4" aria-hidden="true">
                    {iconText}
                  </span>
                )}
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

        {activeTab === 'emi' && (
          <div>
            <h2 className="text-lg font-bold text-slate-900 pb-4 border-b border-slate-200">Pay with EMI</h2>
            <p className="text-sm text-slate-600 mt-6 mb-8">
              EMI is available on eligible credit and debit cards. The instalment options offered by your bank are shown on our secure payment partner's page.
            </p>
            {payButton}
          </div>
        )}

        {shownError && (
          <div role="alert" className="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
            <span>
              {shownError}{' '}
              <Link to={supportHref} className="font-semibold underline">
                Contact support
              </Link>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
