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
          customer_name: draft.name || draft.enterpriseName || user?.full_name || 'Udyam Applicant',
          customer_phone: draft.phone || user?.phone || '9876543210',
          customer_email: user?.email || 'applicant@bharatfiling.org',
          state: draft.state || 'Karnataka',
          business_type: draft.organizationType || 'Proprietorship',
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
    if (!email || !email.includes('@')) return 'applicant@domain.com';
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

  if (loading && !order) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-8 bg-[#F8F9FB]">
        <div className="w-8 h-8 border-3 border-[#155EEF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const currentDateStr = new Date().toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-[#F8F9FB] font-sans pb-16">
      {/* Top Company Header */}
      <div className="bg-white border-b border-[#E5E7EB] py-3.5 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-[#252B36] tracking-tight">
              Bharat<span className="text-[#155EEF]">filing</span>
            </span>
          </div>
          <div className="text-right text-[11px] text-[#667085] leading-tight hidden sm:block">
            <div className="font-semibold text-[#252B36]">BharatFiling Statutory Compliance Desk</div>
            <div>Central Compliance Centre, Bengaluru - 560001</div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-6 space-y-6">
        {/* Order Summary Title & Reference */}
        <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4">
          <div>
            <h2 className="text-base font-bold text-[#252B36]">Order Summary</h2>
            <div className="text-xs font-mono font-bold text-[#155EEF] mt-0.5">
              # {order?.order_number?.replace('#', '') || 'est1791262017350202692f1b'}
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs text-[#667085]">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{currentDateStr}</span>
            </div>
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg border border-[#E5E7EB] bg-white hover:bg-[#F8F9FB] text-[#667085] transition cursor-pointer"
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
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-[#252B36]">
                    {order?.service_name || 'UDYAM Registration (MSME + Statutory Compliance)'}
                  </h3>
                  <p className="text-xs text-[#667085]">
                    Official MSME Udyam registration with 3-tier NIC code assignment and compliance dashboard access.
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-base font-bold text-[#252B36]">₹2,899 INR</div>
                </div>
              </div>

              {/* Deliverables Accordion */}
              <div className="border-t border-[#E5E7EB] pt-3">
                <button
                  type="button"
                  onClick={() => setShowDeliverables(!showDeliverables)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#155EEF] hover:underline cursor-pointer"
                >
                  <span>Deliverables</span>
                  {showDeliverables ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </button>

                {showDeliverables && (
                  <div className="mt-3 space-y-2 text-xs text-[#252B36] pl-1">
                    {UDYAM_PRICING.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#027A48] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quantity */}
              <div className="border-t border-[#E5E7EB] pt-3 flex items-center justify-end gap-3 text-xs text-[#667085]">
                <span className="font-semibold text-[#667085]">Qty:</span>
                <div className="inline-flex items-center border border-[#E5E7EB] rounded-lg overflow-hidden bg-[#F8F9FB]">
                  <span className="px-3 py-1 font-bold text-[#252B36]">1</span>
                </div>
              </div>
            </div>

            {/* Notes & Support Card */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-xs space-y-3 text-xs text-[#667085]">
              <div>
                <strong className="text-[#252B36] block mb-0.5">Statutory Processing Note:</strong>
                <p>
                  Official tax invoices are generated upon payment confirmation. Service preparation begins immediately upon verification of applicant credentials.
                </p>
              </div>

              <div className="pt-2 border-t border-[#E5E7EB]">
                <strong className="text-[#252B36] block mb-0.5">Support Desk:</strong>
                <div className="flex items-center gap-1.5 text-[#155EEF] font-semibold">
                  <Mail className="w-3.5 h-3.5" />
                  <span>support@bharatfiling.org</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Customer Card, Billing Breakdown & Pay Online */}
          <div className="lg:col-span-4 space-y-4">
            {/* Customer Information Card */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-2">
                <h4 className="text-xs font-bold text-[#252B36]">Customer Details</h4>
                <button
                  type="button"
                  onClick={handleShare}
                  className="text-[#667085] hover:text-[#252B36]"
                  title="Share link"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2 text-xs text-[#252B36]">
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-[#667085] shrink-0" />
                  <span className="font-semibold text-[#252B36]">
                    {order?.customer_name || 'Udyam Applicant'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#667085] shrink-0" />
                  <span className="font-mono text-[#667085]">
                    {maskEmail(order?.customer_email || 'applicant@bharatfiling.org')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#667085] shrink-0" />
                  <span className="font-mono text-[#667085]">
                    {maskPhone(order?.customer_phone || '9876543210')}
                  </span>
                </div>
              </div>

              {/* GSTIN / Business Name Input */}
              <div className="pt-2">
                <input
                  type="text"
                  value={businessNameInput}
                  onChange={(e) => setBusinessNameInput(e.target.value)}
                  placeholder="GSTIN or Business Name (Optional)"
                  className="w-full px-3 py-2 text-xs bg-[#F8F9FB] border border-[#E5E7EB] rounded-lg text-[#252B36] focus:border-[#155EEF] focus:outline-hidden"
                />
              </div>
            </div>

            {/* Billing Card */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-xs space-y-3 text-xs">
              <h4 className="text-xs font-bold text-[#252B36] border-b border-[#E5E7EB] pb-2">
                Billing Summary
              </h4>

              <div className="space-y-2 text-[#667085]">
                <div className="flex justify-between">
                  <span>Professional Fee</span>
                  <span className="font-semibold text-[#252B36]">₹2,899</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18%)</span>
                  <span className="font-semibold text-[#252B36]">₹522</span>
                </div>
                <div className="border-t border-[#E5E7EB] pt-2 flex justify-between items-center text-sm font-bold text-[#252B36]">
                  <span>Total Payable</span>
                  <span className="text-[#155EEF]">₹3,421 INR</span>
                </div>
              </div>

              {/* Payment Method Badge */}
              <div className="pt-2 border-t border-[#E5E7EB] flex items-center justify-between text-xs">
                <span className="text-[#667085]">Payment Gateway</span>
                <span className="font-semibold text-[#252B36]">Instant Online Checkout</span>
              </div>

              {/* Pay Online Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsPaymentModalOpen(true)}
                  className="w-full py-3 px-4 rounded-lg bg-[#155EEF] hover:bg-[#1048C6] text-white font-semibold text-sm shadow-xs transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>Pay Online ₹3,421 INR</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Direct Payment Gateway Modal */}
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
