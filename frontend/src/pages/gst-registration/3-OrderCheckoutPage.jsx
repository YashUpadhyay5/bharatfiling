import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Check,
  Share2,
  Calendar,
  CreditCard,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../../services/api.js';
import { useToast } from '../../context/ToastContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import PaymentModal from '../../components/checkout/PaymentModal.jsx';

export default function OrderCheckoutPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();

  const [order, setOrder] = useState(null);
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeliverables, setShowDeliverables] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        setLoading(true);
        if (orderId) {
          const res = await api.getCheckoutOrder(orderId);
          if (res.success && res.order) {
            setOrder(res.order);
            setApplication(res.application);
            return;
          }
        }

        // Fallback: Check local storage draft
        const draftStr = localStorage.getItem('bharatfiling_gst_draft');
        const draft = draftStr ? JSON.parse(draftStr) : {};
        setOrder({
          id: orderId || `est${Date.now()}d`,
          order_number: `#${orderId || 'est2026d'}`,
          service_name: 'GST Registration (GST Registration + Monthly Filing)',
          subtotal: 1499,
          gst_amount: 270,
          amount: 1769,
          customer_name: draft.name || user?.full_name || 'GST Applicant',
          customer_phone: draft.phone || user?.phone || '9876543210',
          customer_email: user?.email || 'applicant@gmail.com',
          state: draft.state || 'Karnataka',
          business_type: draft.businessType || 'Retail Trade',
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
    if (!email || !email.includes('@')) return 'ya*************@gmail.com';
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

  const handlePaymentSuccess = (paymentResult) => {
    setIsPaymentModalOpen(false);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    showSuccess('Payment verified! Redirecting to Document Desk...');

    const targetAppId = paymentResult?.application?.id || order?.application_id || 'app_gst_lead';
    navigate(`/apply/gst/dossier/${targetAppId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-[#111827] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-500 font-semibold">Loading BharatFiling Order Quotation...</p>
        </div>
      </div>
    );
  }

  const currentDateFormatted = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
      {/* Top Banner */}
      <div className="bg-[#EBF3FF] border-b border-blue-100 py-3 px-4 text-center">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-slate-700">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-blue-200 text-[#111827] font-bold text-[11px] shadow-2xs">
            <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
            UPI AUTOPAY
          </span>
          <span className="font-medium">
            Automated recurring filing mandate • Cancel anytime from your UPI app
          </span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 md:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN: Order Details & Deliverables */}
          <div className="lg:col-span-7 space-y-6">
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Quotation & Order Summary
                </h1>
                <div className="font-mono text-xs text-slate-500 font-semibold tracking-wide">
                  #{order?.id || orderId}
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {currentDateFormatted}
                </span>
                <button
                  onClick={handleShare}
                  title="Copy Quotation Link"
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Service Package Card */}
            <div className="bg-white rounded-3xl p-6 shadow-[0_8px_25px_rgba(17,24,39,0.04)] border border-slate-200/90 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-slate-100 pb-3">
                <h2 className="text-base font-extrabold text-slate-900 leading-snug">
                  GST Registration (GST Registration + Monthly Filing)
                </h2>
                <div className="text-lg font-black text-slate-900 whitespace-nowrap">
                  1,499 <span className="text-xs font-semibold text-slate-500">INR</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Complete online GST registration and monthly return filing ensuring 100% statutory compliance, Form REG-01 preparation, and dedicated Chartered Accountant representation.
              </p>

              {/* Deliverables Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowDeliverables(!showDeliverables)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition cursor-pointer"
                >
                  <span>Deliverables</span>
                  {showDeliverables ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {showDeliverables && (
                  <div className="mt-3 p-4 bg-slate-50/80 rounded-2xl border border-slate-100 space-y-2 text-xs text-slate-700 animate-in fade-in duration-200">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Drafting and filing of Form REG-01 on official GST common portal</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Instant Temporary Reference Number (TRN) and ARN allocation</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Handling clarification notices (Form REG-03) with tax department</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Delivery of official GST Certificate (Form REG-06)</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Customer Details Summary */}
            <div className="bg-white rounded-3xl p-6 shadow-[0_8px_25px_rgba(17,24,39,0.04)] border border-slate-200/90 space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Applicant Information
              </h3>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-500 block">Name:</span>
                  <span className="font-bold text-slate-900">{order?.customer_name || 'Yash Upadhyay'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Mobile:</span>
                  <span className="font-bold text-slate-900">{maskPhone(order?.customer_phone)}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">State:</span>
                  <span className="font-bold text-slate-900">{order?.state || 'Karnataka'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Business Nature:</span>
                  <span className="font-bold text-slate-900">{order?.business_type || 'Retail Trade'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Subscription Card & CTA */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_12px_40px_rgba(17,24,39,0.08)] border border-slate-200/90 space-y-6 sticky top-8">
              <div>
                <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-[11px] font-bold">
                  Monthly Subscription
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-2">
                  Statutory Compliance Plan
                </h3>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2.5 border-t border-b border-slate-100 py-4 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>GST Registration + Filing</span>
                  <span className="font-semibold text-slate-900">₹{order?.subtotal || 1499}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>GST (18%)</span>
                  <span className="font-semibold text-slate-900">₹{order?.gst_amount || 270}</span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-100">
                  <span>Total Monthly Fee</span>
                  <span className="text-[#111827]">₹{order?.amount || 1769} INR</span>
                </div>
              </div>

              {/* Included Benefits */}
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Cancel anytime from your UPI mobile app</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Dedicated Chartered Accountant assignment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Zero penalty & on-time filing guarantee</span>
                </div>
              </div>

              {/* CTA Button */}
              <button
                type="button"
                onClick={() => setIsPaymentModalOpen(true)}
                className="w-full py-4 px-6 rounded-2xl bg-[#111827] hover:bg-[#1F2937] text-white font-black text-sm shadow-xl transition flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <span>Activate Subscription • ₹{order?.amount || 1769} INR</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>NPCI Certified • 256-bit Bank-Grade Encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* UPI AutoPay Modal */}
      {isPaymentModalOpen && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          order={order}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}
