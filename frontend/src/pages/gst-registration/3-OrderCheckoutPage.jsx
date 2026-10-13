import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Check,
  Share2,
  Calendar,
  CreditCard,
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../../services/api.js';
import { useToast } from '../../context/ToastContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import PaymentModal from '../../components/checkout/PaymentModal.jsx';
import UdyamCheckoutPage from '../udyam-registration/3-UdyamCheckoutPage.jsx';

export default function OrderCheckoutPage() {
  const { orderId: paramOrderId } = useParams();
  const [searchParams] = useSearchParams();
  const orderId = paramOrderId || searchParams.get('generator') || searchParams.get('orderId');
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();

  const [order, setOrder] = useState(null);
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
          customer_email: user?.email || 'applicant@bharatfiling.org',
          state: draft.state || 'Karnataka',
          business_type: draft.businessType || 'Retail Trade',
          created_at: new Date().toISOString(),
        });
      } catch {
        showError('Loaded order quotation from local session.');
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderId, user]);

  const maskEmail = (email) => {
    if (!email || !email.includes('@')) return 'user@domain.com';
    const [namePart, domain] = email.split('@');
    if (namePart.length <= 2) return `${namePart}****@${domain}`;
    return `${namePart.slice(0, 2)}${'*'.repeat(Math.max(4, namePart.length - 2))}@${domain}`;
  };

  const maskPhone = (phone) => {
    if (!phone) return '+91-XXXXXX3210';
    const clean = phone.replace(/\D/g, '');
    if (clean.length < 10) return `+91-${phone}`;
    return `+91-XXXXXX${clean.slice(-4)}`;
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showSuccess('Quotation link copied to clipboard.');
  };

  const handlePaymentSuccess = () => {
    setIsPaymentModalOpen(false);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    showSuccess('Payment verified and statutory filing initiated. Redirecting to Dashboard...');
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-[#155EEF] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-[#667085] font-semibold">Loading Order Quotation...</p>
        </div>
      </div>
    );
  }

  if (order?.module_type === 'UDYAM' || order?.service_name?.toLowerCase().includes('udyam')) {
    return <UdyamCheckoutPage />;
  }

  const currentDateFormatted = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-[#F8F9FB] font-sans pb-20">
      {/* Top Banner */}
      <div className="bg-[#EFF8FF] border-b border-[#B2DDFF] py-2.5 px-4 text-center">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-[#252B36]">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white border border-[#B2DDFF] text-[#155EEF] font-semibold text-[11px] shadow-xs">
            <CreditCard className="w-3.5 h-3.5 text-[#155EEF]" />
            UPI AUTOPAY
          </span>
          <span className="font-medium text-[#252B36]">
            Automated recurring filing mandate • Cancel anytime directly from your UPI app
          </span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 md:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT COLUMN: Order Details & Deliverables */}
          <div className="lg:col-span-7 space-y-5">
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-[#252B36] tracking-tight">
                  Quotation & Order Summary
                </h1>
                <div className="font-mono text-xs text-[#667085] font-medium tracking-wide">
                  #{order?.id || orderId}
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-[#667085]">
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-[#667085]" />
                  {currentDateFormatted}
                </span>
                <button
                  onClick={handleShare}
                  title="Copy Quotation Link"
                  className="p-1.5 rounded-lg border border-[#E5E7EB] bg-white hover:bg-[#F8F9FB] text-[#667085] transition cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Service Package Card */}
            <div className="bg-white rounded-xl p-5 sm:p-6 shadow-xs border border-[#E5E7EB] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#E5E7EB] pb-3">
                <h2 className="text-base font-bold text-[#252B36] leading-snug">
                  GST Registration (GST Registration + Monthly Filing)
                </h2>
                <div className="text-lg font-bold text-[#252B36] whitespace-nowrap">
                  ₹1,499 <span className="text-xs font-normal text-[#667085]">INR</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
                Complete online GST registration and monthly return filing ensuring statutory compliance, Form REG-01 preparation, and qualified Chartered Accountant representation.
              </p>

              {/* Deliverables Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowDeliverables(!showDeliverables)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#155EEF] hover:underline transition cursor-pointer"
                >
                  <span>Deliverables</span>
                  {showDeliverables ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {showDeliverables && (
                  <div className="mt-3 p-4 bg-[#F8F9FB] rounded-lg border border-[#E5E7EB] space-y-2 text-xs text-[#252B36]">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#027A48] shrink-0 mt-0.5" />
                      <span>Drafting and filing of Form REG-01 on official GST common portal</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#027A48] shrink-0 mt-0.5" />
                      <span>Instant Temporary Reference Number (TRN) and ARN allocation</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#027A48] shrink-0 mt-0.5" />
                      <span>Handling clarification notices (Form REG-03) with tax authorities</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#027A48] shrink-0 mt-0.5" />
                      <span>Delivery of official GST Certificate (Form REG-06)</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Customer Details Summary */}
            <div className="bg-white rounded-xl p-5 sm:p-6 shadow-xs border border-[#E5E7EB] space-y-3">
              <h3 className="text-xs font-bold text-[#667085] uppercase tracking-wider">
                Applicant Information
              </h3>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[#667085] block">Name:</span>
                  <span className="font-semibold text-[#252B36]">{order?.customer_name || 'GST Applicant'}</span>
                </div>
                <div>
                  <span className="text-[#667085] block">Mobile:</span>
                  <span className="font-semibold text-[#252B36]">{maskPhone(order?.customer_phone)}</span>
                </div>
                <div>
                  <span className="text-[#667085] block">State:</span>
                  <span className="font-semibold text-[#252B36]">{order?.state || 'Karnataka'}</span>
                </div>
                <div>
                  <span className="text-[#667085] block">Business Nature:</span>
                  <span className="font-semibold text-[#252B36]">{order?.business_type || 'Retail Trade'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Subscription Card & CTA */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-xs border border-[#E5E7EB] space-y-5 sticky top-8">
              <div>
                <span className="px-2.5 py-1 rounded-md bg-[#EFF8FF] border border-[#B2DDFF] text-[#155EEF] text-[11px] font-semibold">
                  Monthly Subscription
                </span>
                <h3 className="text-base font-bold text-[#252B36] mt-2">
                  Statutory Compliance Plan
                </h3>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2.5 border-t border-b border-[#E5E7EB] py-4 text-xs">
                <div className="flex justify-between text-[#667085]">
                  <span>GST Registration + Filing</span>
                  <span className="font-semibold text-[#252B36]">₹{order?.subtotal || 1499}</span>
                </div>
                <div className="flex justify-between text-[#667085]">
                  <span>GST (18%)</span>
                  <span className="font-semibold text-[#252B36]">₹{order?.gst_amount || 270}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#252B36] pt-2 border-t border-[#E5E7EB]">
                  <span>Total Monthly Fee</span>
                  <span className="text-[#155EEF]">₹{order?.amount || 1769} INR</span>
                </div>
              </div>

              {/* Included Benefits */}
              <div className="space-y-2 text-xs text-[#667085]">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#027A48] shrink-0" />
                  <span>Cancel anytime from your UPI mobile app</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#027A48] shrink-0" />
                  <span>Dedicated Chartered Accountant assignment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#027A48] shrink-0" />
                  <span>On-time statutory filing and notice assistance</span>
                </div>
              </div>

              {/* CTA Button */}
              <button
                type="button"
                onClick={() => setIsPaymentModalOpen(true)}
                className="w-full py-3.5 px-6 rounded-lg bg-[#155EEF] hover:bg-[#1048C6] text-white font-semibold text-sm shadow-xs transition flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <span>Activate Subscription • ₹{order?.amount || 1769} INR</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#667085] text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-[#027A48]" />
                <span>NPCI Certified • 256-bit Secure Gateway</span>
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
