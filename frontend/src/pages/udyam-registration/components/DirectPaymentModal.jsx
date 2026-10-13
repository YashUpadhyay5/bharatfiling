import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  CreditCard,
  Building,
  QrCode,
  Smartphone,
  Lock,
  ChevronDown,
  CheckCircle2,
  X,
} from 'lucide-react';
import { api } from '../../../services/api.js';
import { useToast } from '../../../context/ToastContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function DirectPaymentModal({
  isOpen,
  onClose,
  order,
  onPaymentSuccess,
}) {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  // 15-Minute Live Countdown Timer (900 seconds)
  const [secondsLeft, setSecondsLeft] = useState(891); // ~14:51
  const [activeTab, setActiveTab] = useState('credit_card'); // 'credit_card' | 'debit_card' | 'net_banking' | 'upi'
  const [isProcessing, setIsProcessing] = useState(false);

  // Billing Details (prefilled from order/customer)
  const [billing, setBilling] = useState({
    name: order?.customer_name || 'Yash Updhyay',
    address: order?.plant_address || 'Sector 62, Electronic City',
    zipCode: '560100',
    city: 'Bengaluru',
    state: order?.state || 'Karnataka',
    country: 'India',
    phone: order?.customer_phone || '7668976193',
    email: order?.customer_email || 'yashupdhyay486@gmail.com',
    notes: '',
    differentShipping: false,
  });

  // Card details
  const [card, setCard] = useState({
    number: '',
    expiryMonth: '12',
    expiryYear: '2028',
    cvv: '',
  });

  // Net banking & UPI
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [upiId, setUpiId] = useState('');

  useEffect(() => {
    if (order) {
      setBilling((prev) => ({
        ...prev,
        name: order.customer_name || prev.name,
        phone: order.customer_phone || prev.phone,
        email: order.customer_email || prev.email,
        state: order.state || prev.state,
      }));
    }
  }, [order]);

  // Live Timer Countdown
  useEffect(() => {
    if (!isOpen || secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, secondsLeft]);

  if (!isOpen) return null;

  const formatCountdown = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
  };

  const handleMakePayment = async () => {
    setIsProcessing(true);
    try {
      const payload = {
        order_id: order?.id,
        payment_id: `pay_ccav_${Date.now()}`,
        payment_method: activeTab.toUpperCase(),
        billing_info: billing,
      };

      const res = await api.verifyUdyamDirectPayment(payload);
      if (res.success) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
        showSuccess('Direct payment verified! ₹3,421 paid successfully. Case sent to CA Desk.');
        if (onPaymentSuccess) {
          onPaymentSuccess(res);
        } else {
          onClose();
          navigate('/dashboard');
        }
      } else {
        showError(res.message || 'Payment processing failed. Please try again.');
      }
    } catch (err) {
      showError(err.message || 'Payment network error. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto font-sans">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl overflow-hidden my-auto border border-slate-300">
        {/* 1. TOP GREEN 15-MINUTE COUNTDOWN BAR */}
        <div className="bg-[#5cb85c] text-white py-2 px-4 text-center text-sm font-semibold tracking-wide flex items-center justify-center relative">
          <span>
            Transaction times out in <strong className="font-bold">{formatCountdown(secondsLeft)}</strong> mins
          </span>
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 text-white/80 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 2. SUB-HEADER WITH LANGUAGE SELECTOR */}
        <div className="px-6 py-2 border-b border-slate-200 flex justify-end">
          <div className="inline-flex items-center gap-1.5 text-xs text-slate-700 border border-slate-300 rounded px-2.5 py-1 bg-white">
            <span>English</span>
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </div>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* 3. TWO COLUMN: BILLING INFO & ORDER DETAILS */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left Column: Billing Information */}
            <div className="md:col-span-8 space-y-3.5">
              <h3 className="text-base font-bold text-slate-900">Billing Information</h3>

              {/* Full Name */}
              <div>
                <input
                  type="text"
                  value={billing.name}
                  onChange={(e) => setBilling({ ...billing, name: e.target.value })}
                  placeholder="Full Name"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-[#5cb85c] focus:outline-none text-slate-800"
                />
              </div>

              {/* Address */}
              <div>
                <input
                  type="text"
                  value={billing.address}
                  onChange={(e) => setBilling({ ...billing, address: e.target.value })}
                  placeholder="Address"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-[#5cb85c] focus:outline-none text-slate-800"
                />
              </div>

              {/* Zip Code & City */}
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={billing.zipCode}
                  onChange={(e) => setBilling({ ...billing, zipCode: e.target.value })}
                  placeholder="Zip Code"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-[#5cb85c] focus:outline-none text-slate-800"
                />
                <input
                  type="text"
                  value={billing.city}
                  onChange={(e) => setBilling({ ...billing, city: e.target.value })}
                  placeholder="City"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-[#5cb85c] focus:outline-none text-slate-800"
                />
              </div>

              {/* State & Country */}
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={billing.state}
                  onChange={(e) => setBilling({ ...billing, state: e.target.value })}
                  placeholder="State"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-[#5cb85c] focus:outline-none text-slate-800"
                />
                <select
                  value={billing.country}
                  onChange={(e) => setBilling({ ...billing, country: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-[#5cb85c] focus:outline-none text-slate-800 bg-white"
                >
                  <option value="India">India</option>
                </select>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="tel"
                  value={billing.phone}
                  onChange={(e) => setBilling({ ...billing, phone: e.target.value })}
                  placeholder="Phone"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-[#5cb85c] focus:outline-none text-slate-800"
                />
                <input
                  type="email"
                  value={billing.email}
                  onChange={(e) => setBilling({ ...billing, email: e.target.value })}
                  placeholder="Email"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-[#5cb85c] focus:outline-none text-slate-800"
                />
              </div>

              {/* Notes */}
              <div>
                <input
                  type="text"
                  value={billing.notes}
                  onChange={(e) => setBilling({ ...billing, notes: e.target.value })}
                  placeholder="Notes (Optional)"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-[#5cb85c] focus:outline-none text-slate-800"
                />
              </div>

              {/* Checkbox */}
              <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={billing.differentShipping}
                  onChange={(e) => setBilling({ ...billing, differentShipping: e.target.checked })}
                  className="rounded border-slate-300 text-[#5cb85c] focus:ring-[#5cb85c]"
                />
                <span>My Billing and Shipping address are different</span>
              </label>
            </div>

            {/* Right Column: ORDER DETAILS Card */}
            <div className="md:col-span-4">
              <div className="border border-slate-300 rounded p-4 bg-white space-y-2.5 text-xs text-slate-700">
                <h4 className="font-bold text-slate-900 tracking-wide text-xs uppercase border-b border-slate-200 pb-1.5">
                  Order Details
                </h4>
                <div className="text-[11px] font-mono text-slate-600 break-all">
                  Order #: {order?.order_number?.replace('#', '') || order?.id || 'est1791262017350202692f1b'}
                </div>

                <div className="pt-2 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Order Amount</span>
                    <span className="font-semibold text-slate-800">3421.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Convenience Fee</span>
                    <span className="font-semibold text-slate-800">0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Tax (18.00%)</span>
                    <span className="font-semibold text-slate-800">0.00</span>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-2 flex justify-between items-center text-sm font-bold text-slate-900">
                  <span>Total Amount</span>
                  <span className="text-slate-900">INR 3421.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4. PAYMENT INFORMATION (TABS & FORM) */}
          <div className="space-y-3 pt-2">
            <h3 className="text-base font-bold text-slate-900">Payment Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              {/* Left Tabs */}
              <div className="md:col-span-3 space-y-2">
                {[
                  { id: 'credit_card', label: 'Credit Card' },
                  { id: 'debit_card', label: 'Debit Cards' },
                  { id: 'net_banking', label: 'Net Banking' },
                  { id: 'upi', label: 'UPI' },
                ].map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-left px-4 py-2.5 rounded text-xs font-semibold border transition cursor-pointer ${
                        isActive
                          ? 'bg-[#5cb85c] text-white border-[#5cb85c] shadow-xs'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Right Content Panel */}
              <div className="md:col-span-9 border border-slate-300 rounded p-5 bg-white space-y-4">
                {(activeTab === 'credit_card' || activeTab === 'debit_card') && (
                  <div className="space-y-4 text-xs">
                    {/* We Accept logos */}
                    <div className="flex items-center gap-2 text-slate-600 flex-wrap">
                      <span className="font-semibold">We Accept :</span>
                      <span className="px-2 py-0.5 bg-blue-900 text-white font-black text-[10px] rounded">AMEX</span>
                      <span className="px-2 py-0.5 bg-sky-700 text-white font-bold text-[10px] rounded">Diners Club</span>
                      <span className="px-2 py-0.5 bg-amber-600 text-white font-bold text-[10px] rounded">MasterCard</span>
                      <span className="px-2 py-0.5 bg-emerald-700 text-white font-bold text-[10px] rounded">RuPay</span>
                      <span className="px-2 py-0.5 bg-blue-800 text-white font-bold text-[10px] rounded">VISA</span>
                    </div>

                    {/* Card Number */}
                    <div className="space-y-1">
                      <label className="block text-slate-700 font-semibold">Card Number</label>
                      <div className="relative">
                        <input
                          type="text"
                          maxLength={19}
                          value={card.number}
                          onChange={(e) => setCard({ ...card, number: e.target.value })}
                          placeholder="Card Number"
                          className="w-full px-3 py-2 pr-10 border border-slate-300 rounded focus:border-[#5cb85c] focus:outline-none text-slate-800"
                        />
                        <CreditCard className="w-5 h-5 text-slate-400 absolute right-3 top-2" />
                      </div>
                    </div>

                    {/* Expiry Date & CVV */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-slate-700 font-semibold">Expiry Date</label>
                        <div className="grid grid-cols-2 gap-2">
                          <select
                            value={card.expiryMonth}
                            onChange={(e) => setCard({ ...card, expiryMonth: e.target.value })}
                            className="px-2.5 py-2 border border-slate-300 rounded text-slate-800 bg-white focus:outline-none"
                          >
                            {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map((m) => (
                              <option key={m} value={m}>
                                {m}
                              </option>
                            ))}
                          </select>
                          <select
                            value={card.expiryYear}
                            onChange={(e) => setCard({ ...card, expiryYear: e.target.value })}
                            className="px-2.5 py-2 border border-slate-300 rounded text-slate-800 bg-white focus:outline-none"
                          >
                            {['2026', '2027', '2028', '2029', '2030', '2031'].map((y) => (
                              <option key={y} value={y}>
                                {y}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-slate-700 font-semibold">CVV</label>
                        <div className="relative">
                          <input
                            type="password"
                            maxLength={4}
                            value={card.cvv}
                            onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                            placeholder="CVV"
                            className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#5cb85c] focus:outline-none text-slate-800"
                          />
                          <span className="absolute right-3 top-2 text-[10px] text-slate-400 font-mono">576</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'net_banking' && (
                  <div className="space-y-3 text-xs">
                    <label className="block text-slate-700 font-semibold">Select Your Bank</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank', 'Kotak Bank', 'Punjab National Bank'].map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setSelectedBank(b)}
                          className={`p-2 rounded border text-left text-[11px] font-semibold transition cursor-pointer ${
                            selectedBank === b ? 'border-[#5cb85c] bg-emerald-50 text-emerald-900' : 'border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'upi' && (
                  <div className="space-y-3 text-xs">
                    <label className="block text-slate-700 font-semibold">Enter UPI Virtual Payment Address (VPA)</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. mobile@upi or username@okhdfcbank"
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#5cb85c] focus:outline-none text-slate-800"
                    />
                    <div className="text-[11px] text-slate-500">
                      💡 Direct one-time payment of ₹3,421.00 will be requested on your UPI app.
                    </div>
                  </div>
                )}

                {/* Terms agreement */}
                <p className="text-[11px] text-slate-600 pt-1">
                  I agree with the{' '}
                  <span className="text-blue-600 hover:underline cursor-pointer">Privacy Policy</span> by
                  proceeding with this payment.
                </p>

                {/* Amount Payable */}
                <div className="pt-2">
                  <span className="text-lg font-black text-blue-600">INR 3421.00 </span>
                  <span className="text-xs text-slate-500">(Total Amount Payable)</span>
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-1">
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={handleMakePayment}
                    className="w-full py-2.5 px-4 rounded bg-[#5cb85c] hover:bg-[#4cae4c] text-white font-bold text-sm shadow-xs transition cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isProcessing ? 'Processing Payment...' : 'Make Payment'}
                  </button>
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={onClose}
                      className="text-xs text-blue-600 hover:underline cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
