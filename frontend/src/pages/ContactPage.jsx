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
    <div className="min-h-screen bg-slate-50 font-sans">
      <Breadcrumbs items={[{ label: 'Contact Us' }]} />
      <div className="py-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Reach Out Anytime
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            We Are Here to Assist Your Business
          </h1>
          <p className="text-sm text-slate-600">
            Talk to certified Chartered Accountants or get instant help through WhatsApp and phone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Contact Details Cards */}
          <div className="space-y-4 text-xs">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4">
              <h3 className="font-extrabold text-sm text-slate-900">Official Helplines</h3>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">1800-890-8800 (Toll Free)</div>
                  <div className="text-slate-500 text-[11px]">Direct CA & compliance consultation desk</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">+91 98765 43210 (WhatsApp)</div>
                  <div className="text-slate-500 text-[11px]">Instant document checks & query resolution</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">compliance@bharatfiling.in</div>
                  <div className="text-slate-500 text-[11px]">Notice responses & corporate legal desk</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-3">
              <h3 className="font-extrabold text-sm text-slate-900">Registered Office</h3>
              <div className="text-slate-600 leading-relaxed">
                BharatFiling Technologies Private Limited <br />
                Tower 4, Level 7, EPIP Tech Park, Whitefield, <br />
                Bengaluru, Karnataka 560066, India.
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-5">
            <h3 className="font-extrabold text-base text-slate-900">Send an Inquiry</h3>
            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2 text-xs text-emerald-950">
                <div className="font-black text-sm">Inquiry Received!</div>
                <p>A compliance specialist has been assigned to your query and will contact you via email or phone within 15 minutes.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Verma"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="official@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="10-digit mobile number"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">How can we help? *</label>
                  <textarea
                    rows={3}
                    value={formData.query}
                    onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                    placeholder="Tell us about your business or GST registration query..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> Submit Question
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
