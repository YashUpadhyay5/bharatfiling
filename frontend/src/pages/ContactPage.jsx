import React, { useState } from 'react';
import { useToast } from '../context/ToastContext.jsx';
import { Phone, Mail, MapPin, MessageCircle, Clock, ShieldCheck, Send } from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';

export default function ContactPage() {
  const { showSuccess } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', query: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    showSuccess('Message received. Our compliance advisory desk will reach out shortly.');
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <Breadcrumbs items={[{ label: 'Contact Us' }]} />
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#155EEF] bg-[#EFF8FF] px-2.5 py-0.5 rounded border border-[#D1E9FF]">
            Customer Support & Advisory
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#252B36] tracking-tight">
            We Are Here to Assist Your Business
          </h1>
          <p className="text-sm text-[#667085]">
            Consult qualified Chartered Accountants or get instant help through WhatsApp and phone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Contact Details Cards */}
          <div className="space-y-4 text-xs">
            <div className="p-6 rounded-xl bg-white border border-[#E5E7EB] shadow-xs space-y-4">
              <h3 className="font-bold text-sm text-[#252B36]">Official Helplines</h3>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#EFF8FF] text-[#155EEF] border border-[#D1E9FF]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-[#252B36] text-xs">1800-890-8800 (Toll Free)</div>
                  <div className="text-[#667085] text-[11px]">Direct CA & compliance consultation desk (Mon - Sat)</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#EFF8FF] text-[#155EEF] border border-[#D1E9FF]">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-[#252B36] text-xs">+91 1800 890 8800 (WhatsApp)</div>
                  <div className="text-[#667085] text-[11px]">Instant document checks & statutory query resolution</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#EFF8FF] text-[#155EEF] border border-[#D1E9FF]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-[#252B36] text-xs">compliance@bharatfiling.org</div>
                  <div className="text-[#667085] text-[11px]">Notice responses & corporate legal desk</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white border border-[#E5E7EB] shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-[#252B36]">Registered Corporate Office</h3>
              <div className="text-[#667085] leading-relaxed">
                BharatFiling Technologies Private Limited <br />
                Tower 4, Level 7, EPIP Tech Park, Whitefield, <br />
                Bengaluru, Karnataka 560066, India.
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-6 sm:p-8 rounded-xl bg-white border border-[#E5E7EB] shadow-xs space-y-4">
            <h3 className="font-bold text-base text-[#252B36]">Send an Advisory Inquiry</h3>
            {submitted ? (
              <div className="p-5 rounded-lg bg-[#ECFDF3] border border-[#A6F4C5] text-center space-y-1.5 text-xs text-[#027A48]">
                <div className="font-bold text-sm">Inquiry Received</div>
                <p>A compliance specialist has been assigned to your query and will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-[#252B36] mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Verma"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7EB] bg-white focus:outline-none focus:border-[#155EEF] focus:ring-1 focus:ring-[#155EEF]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#252B36] mb-1">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="official@company.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7EB] bg-white focus:outline-none focus:border-[#155EEF] focus:ring-1 focus:ring-[#155EEF]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#252B36] mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="10-digit mobile number"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7EB] bg-white focus:outline-none focus:border-[#155EEF] focus:ring-1 focus:ring-[#155EEF]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#252B36] mb-1">How can we assist you? *</label>
                  <textarea
                    rows={3}
                    value={formData.query}
                    onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                    placeholder="Describe your corporate registration or tax filing requirement..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7EB] bg-white focus:outline-none focus:border-[#155EEF] focus:ring-1 focus:ring-[#155EEF]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-[#155EEF] hover:bg-[#1048C6] text-white font-semibold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" /> Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
