import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import {
  Share2,
  Calendar,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Mail,
  User,
  Phone,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { api } from '../../services/api.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import DirectPaymentModal from './components/DirectPaymentModal.jsx';
import { UDYAM_PRICING } from './constants.js';

export default function UdyamCheckoutPage() {
  const { orderId: paramOrderId } = useParams();
  const [searchParams] = useSearchParams();
  const orderId = paramOrderId || searchParams.get('generator') || searchParams.get('orderId');
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeliverables, setShowDeliverables] = useState(true);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [businessNameInput, setBusinessNameInput] = useState('');

  useEffect(() => {
    const loadOrder = async () => {
      try {
        setLoading(true);
        if (orderId) {
          const res = await api.getUdyamCheckoutOrder(orderId);
          if (res.success && res.order) {
            setOrder(res.order);
            setBusinessNameInput(res.order.enterprise_name || res.order.business_type || '');
            return;
          }
        }

        // Fallback: Check local storage draft
        const draftStr = localStorage.getItem('bharatfiling_udyam_draft');
        const draft = draftStr ? JSON.parse(draftStr) : {};
        setOrder({
          id: orderId || `est${Date.now()}f1b`,
          order_number: `#${orderId || 'est1791262017350202692f1b'}`,
          service_name: UDYAM_PRICING.serviceName,
          subtotal: UDYAM_PRICING.basePrice,
          gst_amount: UDYAM_PRICING.gstAmount,
          amount: UDYAM_PRICING.totalAmount,
          customer_name: draft.name || draft.enterpriseName || user?.full_name || 'Yash Updhyay',
          customer_phone: draft.phone || user?.phone || '7668976193',
          customer_email: user?.email || 'yashupdhyay486@gmail.com',
          state: draft.state || 'Karnataka',
          business_type: draft.organizationType || 'Proprietorship',
          created_at: new Date().toISOString(),
        });
      } catch (err) {
        showError('Loaded order quotation from local session.');
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderId, user]);

  const maskEmail = (email) => {
    if (!email || !email.includes('@')) return 'ya********************com';
    const [namePart, domain] = email.split('@');
    if (namePart.length <= 2) return `${namePart}****@${domain}`;
    return `${namePart.slice(0, 2)}${'*'.repeat(Math.max(4, namePart.length - 2))}@${domain}`;
  };

  const maskPhone = (phone) => {
    if (!phone) return '+91-*******193';
    const clean = phone.replace(/\D/g, '');
    if (clean.length < 10) return `+91-${phone}`;
    return `+91-*******${clean.slice(-3)}`;
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showSuccess('Quotation link copied to clipboard!');
  };

  if (loading && !order) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-8">
        <div className="w-8 h-8 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  const currentDateStr = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-slate-50/70 font-sans pb-16">
      {/* Top Company Header matching screenshot */}
      <div className="bg-white border-b border-slate-200 py-4 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black text-slate-900 tracking-tight">
              Bharat<span className="text-blue-600">Filing</span>
            </span>
          </div>
          <div className="text-right text-[11px] text-slate-500 leading-tight hidden sm:block">
            <div className="font-bold text-slate-700">BharatFiling Compliance Private Limited</div>
            <div>Central Compliance Centre, Bengaluru - 560001</div>
            <div>CIN: U74140KA2026PTC098978 | GSTIN: 29AADCB16142F1ZX</div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-6 space-y-6">
        {/* Order Summary Title & Reference */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-700">Order Summary</h2>
            <div className="text-xs font-mono font-bold text-emerald-700 mt-0.5">
              # {order?.order_number?.replace('#', '') || 'est1791262017350202692f1b'}
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{currentDateStr}</span>
            </div>
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition cursor-pointer"
              title="Share quotation"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2-Column Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Product Card & Deliverables */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                <div className="space-y-1">
                  <h3 className="text-base font-extrabold text-slate-900">
                    {order?.service_name || 'UDYAM Registration (UDYAM + LEDGERS)'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Get UDYAM registration for your business with the LEDGERS platform to track compliance.
                  </p>
                </div>
                <div className="text-left sm:text-right shrink-0">
                  <div className="text-base font-extrabold text-slate-900">2,899 INR</div>
                </div>
              </div>

              {/* Deliverables Accordion */}
              <div className="border-t border-slate-100 pt-3">
                <button
                  type="button"
                  onClick={() => setShowDeliverables(!showDeliverables)}
                  className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer"
                >
                  <span>Deliverables</span>
                  {showDeliverables ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </button>

                {showDeliverables && (
                  <div className="mt-3 space-y-2 text-xs text-slate-700 animate-fade-in pl-1">
                    {UDYAM_PRICING.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quantity Stepper & Search */}
              <div className="border-t border-slate-100 pt-3 flex items-center justify-end gap-3 text-xs text-slate-600">
                <span className="font-semibold text-slate-400">Qty</span>
                <div className="inline-flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                  <button type="button" className="px-2.5 py-1 text-slate-400 cursor-not-allowed">
                    -
                  </button>
                  <span className="px-2 font-bold text-slate-800">1</span>
                  <button type="button" className="px-2.5 py-1 text-slate-400 cursor-not-allowed">
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Notes & Support Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3 text-xs text-slate-600">
              <div>
                <strong className="text-slate-800 block mb-0.5">Notes:</strong>
                <p>
                  Invoices will be issued and service will be initiated on receipt of payment. Read our
                  terms of service & refund policy online.
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <strong className="text-slate-800 block mb-0.5">Support:</strong>
                <div className="flex items-center gap-1.5 text-blue-600 font-semibold">
                  <Mail className="w-3.5 h-3.5" />
                  <span>billing@bharatfiling.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Customer Card, Billing Breakdown & Pay Online */}
          <div className="lg:col-span-4 space-y-4">
            {/* Customer Information Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h4 className="text-xs font-bold text-slate-800">Customer</h4>
                <button
                  type="button"
                  onClick={handleShare}
                  className="text-slate-400 hover:text-slate-600"
                  title="Share link"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-semibold text-slate-900">
                    {order?.customer_name || 'Yash Updhyay'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-mono text-slate-600 break-all">
                    {maskEmail(order?.customer_email || 'yashupdhyay486@gmail.com')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-mono text-slate-600">
                    {maskPhone(order?.customer_phone || '7668976193')}
                  </span>
                </div>
              </div>

              {/* GSTIN / Business Name Input */}
              <div className="pt-2">
                <input
                  type="text"
                  value={businessNameInput}
                  onChange={(e) => setBusinessNameInput(e.target.value)}
                  placeholder="GSTIN or Business Name"
                  className="w-full px-3 py-2 text-xs bg-[#F0FDF4] border border-emerald-200 rounded-xl text-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Billing Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3 text-xs">
              <h4 className="text-xs font-bold text-slate-800 border-b border-slate-100 pb-2">
                Billing
              </h4>

              <div className="space-y-2 text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800">2,899 INR</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18%)</span>
                  <span className="font-semibold text-slate-800">522 INR</span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex justify-between items-center text-sm font-extrabold text-slate-900">
                  <span>TOTAL DUE</span>
                  <span className="text-emerald-600">3,421 INR</span>
                </div>
              </div>

              {/* Payment Method Badge */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Payment Method</span>
                <span className="font-black text-slate-800 tracking-wider">CC Avenue</span>
              </div>

              {/* Pay Online Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsPaymentModalOpen(true)}
                  className="w-full py-3 px-4 rounded-xl bg-[#00C853] hover:bg-[#00B248] text-white font-extrabold text-sm shadow-md hover:shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                  <span>Pay Online 3,421 INR</span>
                </button>
                <div className="text-[10px] text-slate-400 text-center mt-2">
                  By clicking Pay, you agree to the{' '}
                  <span className="text-blue-600 underline cursor-pointer">Terms</span> and{' '}
                  <span className="text-blue-600 underline cursor-pointer">Privacy</span>.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Direct Payment Gateway Modal (NO AUTOPAY) */}
      <DirectPaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        order={order}
        onPaymentSuccess={() => {
          setIsPaymentModalOpen(false);
          navigate('/dashboard');
        }}
      />
    </div>
  );
}
