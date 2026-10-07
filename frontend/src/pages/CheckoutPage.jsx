import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  FileCheck2,
  Share2,
  Calendar,
  ChevronDown,
  ChevronUp,
  User,
  Mail,
  Phone,
  Building,
  ShieldCheck,
  Check,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { api } from '../services/api.js';
import { useToast } from '../context/ToastContext.jsx';
import PaymentModal from '../components/checkout/PaymentModal.jsx';

export default function CheckoutPage() {
  const { orderId: paramOrderId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  const orderId = paramOrderId || searchParams.get('generator') || searchParams.get('orderId') || 'est179126201735020262053d';

  const [order, setOrder] = useState(null);
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeliverables, setShowDeliverables] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [businessNameInput, setBusinessNameInput] = useState('');

  // Fetch or restore order on mount / refresh
  useEffect(() => {
    const loadOrder = async () => {
      try {
        setLoading(true);
        // Try loading draft from localStorage first for instant hydration
        const cachedDraft = localStorage.getItem('bharatfiling_gst_draft');
        let draftObj = null;
        if (cachedDraft) {
          try {
            draftObj = JSON.parse(cachedDraft);
          } catch (e) {
            // ignore JSON parse error
          }
        }

        const res = await api.getCheckoutOrder(orderId);
        if (res.success && res.order) {
          const ord = res.order;
          // Overlay draft details if order has placeholder
          if (draftObj && ord.customer_name === 'GST Applicant') {
            ord.customer_name = draftObj.name || ord.customer_name;
            ord.customer_phone = draftObj.phone || ord.customer_phone;
            ord.customer_pan = draftObj.pan || ord.customer_pan;
            ord.state = draftObj.state || ord.state;
            ord.business_type = draftObj.businessType || ord.business_type;
          }
          setOrder(ord);
          setApplication(res.application);
          if (ord.business_name) setBusinessNameInput(ord.business_name);
        } else {
          // Construct fallback order from local draft
          const fallbackOrder = {
            id: orderId,
            order_number: `#${orderId}`,
            service_name: 'GST Registration (GST Registration + Monthly Filing)',
            amount: 1769,
            subtotal: 1499,
            gst_amount: 270,
            currency: 'INR',
            status: 'CREATED',
            billing_cycle: 'Monthly',
            customer_name: draftObj?.name || 'Yash Updhyay',
            customer_phone: draftObj?.phone || '7668976193',
            customer_pan: draftObj?.pan || '',
            customer_email: draftObj?.email || 'yashupdhyay@gmail.com',
            state: draftObj?.state || 'Karnataka',
            business_type: draftObj?.businessType || 'Proprietorship',
            created_at: new Date().toISOString(),
          };
          setOrder(fallbackOrder);
        }
      } catch (err) {
        showError('Loaded order details from local recovery session.');
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderId]);

  const maskEmail = (email) => {
    if (!email || !email.includes('@')) return 'ya*************@gmail.com';
    const [user, domain] = email.split('@');
    if (user.length <= 2) return `${user}****@${domain}`;
    return `${user.slice(0, 2)}${'*'.repeat(Math.max(4, user.length - 2))}@${domain}`;
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
    showSuccess('Payment verified! Redirecting to filing documents...');
    // If we have an application id, navigate to full dossier, else dashboard
    const targetAppId = paymentResult?.application?.id || order?.application_id;
    if (targetAppId) {
      navigate(`/apply/gst/${targetAppId}`);
    } else {
      navigate('/dashboard');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-[#0B1E36] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-500 font-semibold">Loading BharatFiling Order Quotation...</p>
        </div>
      </div>
    );
  }

  const currentDateFormatted = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 pb-16">
      {/* 1. TOP CORPORATE HEADER (Matches Image 3) */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          {/* BharatFiling Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <img
              src="/bharatfiling-horizontal-transparent.png"
              alt="BharatFiling"
              className="h-8 object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <span className="font-extrabold text-lg text-[#0B1E36] tracking-tight">
              BharatFiling<span className="text-[#F26522]">.com</span>
            </span>
          </Link>

          {/* Corporate Registered Credentials */}
          <div className="text-right hidden sm:block text-[11px] leading-tight text-slate-500">
            <div className="font-bold text-slate-800">BharatFiling Technologies Private Limited</div>
            <div>Whitefield Tech Park, Bengaluru & Chetpet, Chennai - 600031</div>
            <div>CIN: U67190TN2014PTC096978 &bull; GSTIN: 33AADCI6142F1ZX</div>
          </div>
        </div>
      </header>

      {/* 2. ORDER CONTAINER (Two-Column Layout matching Image 3) */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Order Summary & Deliverables */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Header: Order Summary #est... */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Order Summary
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
            <div className="bg-white rounded-3xl p-6 shadow-[0_8px_25px_rgba(11,30,54,0.04)] border border-slate-200/90 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-slate-100 pb-3">
                <h2 className="text-base font-extrabold text-slate-900 leading-snug">
                  GST Registration (GST Registration + Monthly Filing)
                </h2>
                <div className="text-lg font-black text-slate-900 whitespace-nowrap">
                  1,499 <span className="text-xs font-semibold text-slate-500">INR</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Get complete GST registration and monthly filing services, ensuring compliance and smooth processing of GSTR-1 and GSTR-3B with expert support throughout the process.
              </p>

              {/* Deliverables Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowDeliverables(!showDeliverables)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition cursor-pointer"
                >
                  <span>Deliverables</span>
                  {showDeliverables ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </button>

                {showDeliverables && (
                  <div className="mt-3 p-4 bg-slate-50/80 rounded-2xl border border-slate-100 space-y-2 text-xs text-slate-700 animate-in fade-in duration-200">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Drafting and filing of Form REG-01 on official GST common portal</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Instant Temporary Reference Number (TRN) generation and fast-track ARN</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Dedicated CA query response drafting for Clarification Notices (Form REG-03)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Official Form REG-06 GSTIN Certificate issuance delivered to portal</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Full onboarding for first month GSTR-1 and GSTR-3B compliance returns</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Notes Section */}
            <div className="space-y-1.5 text-xs text-slate-500">
              <div className="font-bold text-slate-700">Notes:</div>
              <p>
                Invoices will be issued and service will be initiated on receipt of payment. Read our terms of service & refund policy online.
              </p>
            </div>

            {/* Support Link */}
            <div className="space-y-1 text-xs">
              <div className="font-bold text-slate-700">Support:</div>
              <a
                href="mailto:billing@bharatfilings.in"
                className="text-[#0B1E36] hover:underline font-semibold flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                billing@bharatfilings.in
              </a>
            </div>

            {/* Back Link */}
            <div className="pt-2">
              <Link
                to="/apply/gst?step=2"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#0B1E36] transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Jurisdiction & Business selection
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: Customer, Subscription & Billing Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-[0_12px_36px_rgba(11,30,54,0.06)] border border-slate-200/90 space-y-6">
              
              {/* Customer Profile Section */}
              <div className="space-y-3 border-b border-slate-100 pb-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wide">
                    Customer
                  </h3>
                  <button
                    onClick={handleShare}
                    className="text-slate-400 hover:text-slate-600 transition cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-2 text-xs text-slate-700 font-medium">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-semibold text-slate-900">
                      {order?.customer_name || 'Yash Updhyay'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{maskEmail(order?.customer_email)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{maskPhone(order?.customer_phone)}</span>
                  </div>
                </div>

                {/* Optional GSTIN or Business Name Input */}
                <div className="pt-2">
                  <input
                    type="text"
                    value={businessNameInput}
                    onChange={(e) => setBusinessNameInput(e.target.value)}
                    placeholder="GSTIN or Business Name (Optional)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0B1E36] focus:border-[#0B1E36]"
                  />
                </div>
              </div>

              {/* Subscription Breakdown */}
              <div className="space-y-2.5 border-b border-slate-100 pb-5 text-xs">
                <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wide">
                  Subscription
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Type</span>
                  <span className="font-bold text-slate-800">BharatFiling - GST Compliance</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Start Date</span>
                  <span className="font-semibold text-slate-700">October 2026</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">End Date</span>
                  <span className="font-semibold text-slate-700">November 2026</span>
                </div>
              </div>

              {/* Billing Details */}
              <div className="space-y-2.5 text-xs">
                <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wide">
                  Billing
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-semibold text-slate-800">1,499 INR</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">GST (18%)</span>
                  <span className="font-semibold text-slate-800">270 INR</span>
                </div>
                <div className="flex items-baseline justify-between pt-2 border-t border-slate-200">
                  <span className="font-black text-emerald-700 uppercase tracking-wider text-xs">
                    MONTHLY FEE
                  </span>
                  <span className="text-xl font-black text-emerald-700">
                    1,769 <span className="text-xs font-bold">INR</span>
                  </span>
                </div>
              </div>

              {/* High-Converting CTA Button (Matches Image 3) */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPaymentModalOpen(true)}
                  className="w-full py-4 px-6 rounded-2xl bg-[#00C853] hover:bg-[#00B046] active:scale-[0.99] text-white font-black text-base shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                  <span>Activate Subscription 1,769 INR</span>
                </button>

                <p className="text-[11px] text-center text-slate-400">
                  By clicking Pay, you agree to the{' '}
                  <span className="text-slate-600 underline cursor-pointer">Terms</span> and{' '}
                  <span className="text-slate-600 underline cursor-pointer">Privacy</span>.
                </p>
              </div>

              {/* Bank-Grade Trust Badges */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-4 text-[11px] text-slate-500 font-medium">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 256-Bit SSL Secured
                </span>
                <span>•</span>
                <span>Instant CA Assignment</span>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Screen 4: UPI AutoPay & Dynamic QR Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        order={order}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
