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
  Award,
  Loader2,
} from 'lucide-react';
import { api } from '../../services/api.js';
import { useToast } from '../../context/ToastContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import SplitGradientButton from '../../components/common/SplitGradientButton.jsx';
import UdyamCheckoutPage from '../udyam-registration/3-UdyamCheckoutPage.jsx';
import { GST_PLANS } from './constants.js';

export default function OrderCheckoutPage() {
  const { orderId: paramOrderId } = useParams();
  const [searchParams] = useSearchParams();
  const orderId = paramOrderId || searchParams.get('generator') || searchParams.get('orderId');
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();

  const [order, setOrder] = useState(null);
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeliverables, setShowDeliverables] = useState(false);
  const [changingPlan, setChangingPlan] = useState(null);

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
          module_type: 'GST',
          plan: 'standard',
          service_name: 'GST Registration (Standard — 48 Hour Filing)',
          subtotal: 338,
          gst_amount: 61,
          amount: 399,
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

  const handleProceedToPay = () => {
    navigate(`/checkout/${order?.id || orderId}/pay`);
  };

  const handleSelectPlan = async (planId) => {
    if (!order?.id || order.status !== 'CREATED') {
      // Fallback / already-paid order: just proceed with whatever plan is already quoted
      handleProceedToPay();
      return;
    }
    try {
      setChangingPlan(planId);
      const res = await api.updateGstCheckoutPlan(order.id, planId);
      if (res.success && res.order) {
        setOrder(res.order);
        navigate(`/checkout/${order.id}/pay`);
      } else {
        showError(res.message || 'Could not switch plans. Please try again.');
      }
    } catch (err) {
      showError(err.message || 'Could not switch plans. Please try again.');
    } finally {
      setChangingPlan(null);
    }
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

  if (order?.module_type === 'UDYAM' || order?.service_name?.toLowerCase().includes('udyam')) {
    return <UdyamCheckoutPage />;
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
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
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

            {/* Plan Tier Picker (GST module only) */}
            {order?.module_type === 'GST' && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Choose Your Plan
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {GST_PLANS.map((plan) => {
                    const isActive = (order?.plan || 'standard') === plan.id;
                    const isBusy = changingPlan === plan.id;
                    return (
                      <div
                        key={plan.id}
                        className={`relative rounded-2xl p-5 flex flex-col transition-all duration-200 ${
                          plan.recommended
                            ? 'bg-[#111827] text-white border border-[#111827] shadow-[0_14px_30px_rgba(17,24,39,0.22)]'
                            : 'bg-white text-slate-900 border border-slate-200 shadow-xs'
                        } ${isActive ? 'ring-2 ring-offset-2 ring-emerald-500' : ''}`}
                      >
                        {plan.recommended && (
                          <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-amber-400 text-[#111827] text-[10px] font-bold shadow-xs flex items-center gap-1 whitespace-nowrap">
                            <Award className="w-3 h-3" /> Recommended
                          </span>
                        )}
                        {isActive && (
                          <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-[10px] font-bold text-emerald-500">
                            <Check className="w-3.5 h-3.5" /> Selected
                          </span>
                        )}

                        <h4 className={`text-sm font-bold ${plan.recommended ? 'text-white' : 'text-slate-900'}`}>
                          {plan.name}
                        </h4>
                        <div className={`text-xl font-extrabold mt-1 ${plan.recommended ? 'text-white' : 'text-slate-900'}`}>
                          ₹{plan.price.toLocaleString('en-IN')}
                        </div>
                        <div className={`text-[11px] mb-3 ${plan.recommended ? 'text-slate-400' : 'text-slate-400'}`}>
                          <span className="line-through mr-1">₹{plan.originalPrice.toLocaleString('en-IN')}</span>
                          {plan.discountPercent}% off
                        </div>

                        <ul className={`space-y-1.5 text-[11px] flex-1 ${plan.recommended ? 'text-slate-200' : 'text-slate-600'}`}>
                          {plan.features.slice(0, 4).map((f) => (
                            <li key={f} className="flex items-start gap-1.5">
                              <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${plan.recommended ? 'text-emerald-400' : 'text-emerald-600'}`} />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>

                        <button
                          type="button"
                          onClick={() => handleSelectPlan(plan.id)}
                          disabled={changingPlan !== null}
                          className={`mt-4 w-full py-2.5 rounded-full text-xs font-bold transition active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-60 ${
                            plan.recommended
                              ? 'bg-amber-400 hover:bg-amber-300 text-[#111827]'
                              : 'bg-[#111827] hover:bg-[#1F2937] text-white'
                          }`}
                        >
                          {isBusy ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : isActive ? (
                            'Proceed to Pay'
                          ) : (
                            'Switch to this Plan'
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Service Package Card */}
            <div className="bg-white rounded-3xl p-6 shadow-[0_8px_25px_rgba(17,24,39,0.04)] border border-slate-200/90 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-slate-100 pb-3">
                <h2 className="text-base font-extrabold text-slate-900 leading-snug">
                  {order?.service_name || 'GST Registration'}
                </h2>
                <div className="text-lg font-extrabold text-slate-900 whitespace-nowrap">
                  {(order?.subtotal ?? 338).toLocaleString('en-IN')} <span className="text-xs font-semibold text-slate-500">INR</span>
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
            <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-[0_8px_25px_rgba(17,24,39,0.04)] border border-slate-200/90 space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Applicant Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs">
                <div>
                  <span className="text-slate-500 block">Name:</span>
                  <span className="font-bold text-slate-900 break-words">{order?.customer_name || 'Yash Upadhyay'}</span>
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
                  {GST_PLANS.find((p) => p.id === order?.plan)?.name || 'Standard'} Plan
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 mt-2">
                  Order Summary
                </h3>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2.5 border-t border-b border-slate-100 py-4 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Professional Fees</span>
                  <span className="font-semibold text-slate-900">₹{order?.subtotal || 338}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>GST (18%)</span>
                  <span className="font-semibold text-slate-900">₹{order?.gst_amount || 61}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-100">
                  <span>Total Amount Payable</span>
                  <span className="text-[#111827]">₹{order?.amount || 399} INR</span>
                </div>
              </div>

              {/* Included Benefits */}
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Pay once via UPI, Card or Net Banking</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Dedicated Chartered Accountant assignment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>On-time filing with due-date reminders</span>
                </div>
              </div>

              {/* CTA Button */}
              <SplitGradientButton
                onClick={handleProceedToPay}
                label={`Proceed to Pay • ₹${order?.amount || 399} INR`}
                fullWidth
              />

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Secure payment over an encrypted connection</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
