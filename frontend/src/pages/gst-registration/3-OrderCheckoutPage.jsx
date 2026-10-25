import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Check, Loader2 } from 'lucide-react';
import { api } from '../../services/api.js';
import { useToast } from '../../context/ToastContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import UdyamCheckoutPage from '../udyam-registration/3-UdyamCheckoutPage.jsx';

export const GST_PRICING_PLANS = [
  {
    id: 'standard',
    name: 'Standard',
    tagline: 'Best for businesses that want GST form filing in 48 hours.',
    originalPrice: 999,
    discountPercent: 60,
    price: 399,
    recommended: false,
    ctaText: 'Proceed to Pay',
    isDark: false,
    features: [
      <span>GST form filing in <strong className="font-bold">48 hours*</strong></span>,
      <span>GST registration support</span>,
      <span><strong className="font-bold">ARN tracking</strong> &amp; status updates</span>,
      <span><strong className="font-bold">GST Registration Certificate</strong></span>,
      <span>Money-back guarantee*</span>,
      <span>Chat support</span>,
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    tagline: 'Best for businesses that need fast-track, error-free GST form filing in 24 hours.',
    originalPrice: 3999,
    discountPercent: 50,
    price: 1999,
    recommended: true,
    ctaText: 'Proceed to Pay',
    isDark: true,
    features: [
      <span>GST form filing in <strong className="font-bold text-white">24 hours*</strong></span>,
      <span>Priority ARN generation</span>,
      <span>Registration under <strong className="font-bold text-white">Rule 14A</strong></span>,
      <span>Error-free documentation</span>,
      <span>GSTIN issuance support</span>,
      <span><strong className="font-bold text-white">GST Registration Certificate</strong></span>,
      <span><strong className="font-bold text-white">MSME Registration</strong></span>,
      <span>GST compliance checklist</span>,
      <span>Dedicated GST expert</span>,
      <span>1-minute query resolution</span>,
    ],
  },
  {
    id: 'elite',
    name: 'Elite',
    tagline: 'GST registration plus 12 months of GST return filing.',
    originalPrice: 7999,
    discountPercent: 35,
    price: 4999,
    recommended: false,
    hasEmi: true,
    ctaText: 'Get Started',
    isDark: false,
    features: [
      <span>Expert-assisted GST registration</span>,
      <span><strong className="font-bold">GST Registration Certificate</strong></span>,
      <span><strong className="font-bold">MSME Registration</strong></span>,
      <span><strong className="font-bold">GST filing for 12 months</strong> (up to 300 transactions and up to ₹20 lakh turnover in the 1st year)</span>,
      <span>Free GST Kithab software (1 year)</span>,
      <span>Quarterly GST health check</span>,
    ],
  },
];

export default function OrderCheckoutPage() {
  const { orderId: paramOrderId } = useParams();
  const [searchParams] = useSearchParams();
  const orderId = paramOrderId || searchParams.get('generator') || searchParams.get('orderId');
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showError } = useToast();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [changingPlan, setChangingPlan] = useState(null);

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
          module_type: 'GST',
          plan: 'standard',
          service_name: 'GST Registration',
          subtotal: 338,
          gst_amount: 61,
          amount: 399,
          customer_name: draft.name || user?.full_name || 'GST Applicant',
          customer_phone: draft.phone || user?.phone || '9876543210',
          customer_email: user?.email || 'applicant@gmail.com',
          created_at: new Date().toISOString(),
        });
      } catch (err) {
        // Fallback session
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderId, user]);

  const handleSelectPlan = async (planId) => {
    try {
      setChangingPlan(planId);
      if (order?.id && order.status === 'CREATED') {
        const res = await api.updateGstCheckoutPlan(order.id, planId);
        if (res.success && res.order) {
          setOrder(res.order);
        }
      }
      navigate(`/checkout/${order?.id || orderId}/pay`);
    } catch (err) {
      navigate(`/checkout/${order?.id || orderId}/pay`);
    } finally {
      setChangingPlan(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F7F8] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-[#022B50] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-500 font-semibold">Loading Plans...</p>
        </div>
      </div>
    );
  }

  if (order?.module_type === 'UDYAM' || order?.service_name?.toLowerCase().includes('udyam')) {
    return <UdyamCheckoutPage />;
  }

  return (
    <div className="min-h-screen bg-[#F5F7F8] font-sans relative overflow-hidden py-10 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-8">
      {/* Decorative Isometric Stepped Blocks in Background Corners (Image 1 motif) */}
      <div className="absolute top-0 right-0 pointer-events-none select-none overflow-hidden opacity-60">
        <svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M220 0H140V40H100V80H60V120H20V160H0V220H220V0Z" fill="#E2E8F0" fillOpacity="0.4" />
          <path d="M220 0H160V30H120V60H80V90H40V120H0V220H220V0Z" fill="#CBD5E1" fillOpacity="0.25" />
          <path d="M220 0H180V20H140V40H100V60H60V80H20V100H0V220H220V0Z" fill="#94A3B8" fillOpacity="0.1" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Main Title: Choose Right Plan For Your Business */}
        <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#042D50] text-center tracking-tight mb-8 sm:mb-12">
          Choose Right Plan For Your Business
        </h1>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {GST_PRICING_PLANS.map((plan) => {
            const isBusy = changingPlan === plan.id;

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-2xl transition-all duration-200 ${
                  plan.isDark
                    ? 'bg-[#04223F] text-white border border-[#0B3A68] shadow-[0_16px_40px_rgba(4,34,63,0.3)]'
                    : 'bg-white text-slate-900 border border-slate-200 shadow-[0_8px_30px_rgba(0,0,0,0.06)]'
                }`}
              >
                {/* Floating Recommended Badge for Premium */}
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-[#FFC107] text-[#0A2540] text-[11px] font-extrabold shadow-xs whitespace-nowrap">
                      ★ Recommended
                    </span>
                  </div>
                )}

                <div className="p-6 sm:p-7 flex flex-col flex-1">
                  {/* Plan Name */}
                  <h3 className={`text-xl font-bold ${plan.isDark ? 'text-white' : 'text-slate-900'}`}>
                    {plan.name}
                  </h3>

                  {/* Plan Description */}
                  <p className={`text-xs sm:text-sm mt-2 leading-relaxed min-h-[38px] ${
                    plan.isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {plan.tagline}
                  </p>

                  {/* Pricing Row */}
                  <div className="mt-5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm text-slate-400 font-semibold line-through">
                        ₹{plan.originalPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
                        {plan.discountPercent}% off
                      </span>
                    </div>

                    <div className={`text-3xl sm:text-4xl font-extrabold tracking-tight mt-1.5 ${
                      plan.isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      ₹{plan.price.toLocaleString('en-IN')}
                    </div>

                    {/* EMI Available Badge if applicable */}
                    {plan.hasEmi && (
                      <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-600 font-medium mt-2">
                        <span className="px-1.5 py-0.2 rounded border border-slate-300 font-bold text-[10px] text-slate-700">
                          EMI
                        </span>
                        <span>EMI option available.</span>
                      </div>
                    )}
                  </div>

                  {/* Action CTA Button */}
                  <div className="mt-5">
                    <button
                      type="button"
                      onClick={() => handleSelectPlan(plan.id)}
                      disabled={isBusy}
                      className={`w-full py-3 rounded-lg text-xs sm:text-sm font-extrabold transition active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 shadow-xs disabled:opacity-70 ${
                        plan.isDark
                          ? 'bg-[#FFC107] hover:bg-[#FFB300] text-[#0A2540] shadow-md'
                          : 'bg-[#022B50] hover:bg-[#073866] text-white'
                      }`}
                    >
                      {isBusy ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <span>{plan.ctaText}</span>
                      )}
                    </button>
                  </div>

                  {/* What You'll Get Title */}
                  <h4 className={`text-xs sm:text-sm font-bold mt-7 mb-4 capitalize ${
                    plan.isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    What {plan.name === 'Elite' ? "you'll get" : "You'll Get"}
                  </h4>

                  {/* Deliverables Checklist */}
                  <ul className="space-y-3 text-xs sm:text-[13px] leading-snug flex-1">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            plan.isDark ? 'text-emerald-400' : 'text-emerald-600'
                          }`}
                        />
                        <span className={plan.isDark ? 'text-slate-200' : 'text-slate-700'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
