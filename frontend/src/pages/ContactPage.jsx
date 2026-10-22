import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useToast } from '../context/ToastContext.jsx';
import { SUPPORT, whatsappLink } from '../config/support.js';
import { PageHero, Section, Card, Button, INK } from '../components/ui/kit.jsx';

const inputCls =
  'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-[#111827] focus:outline-hidden focus:ring-4 focus:ring-slate-900/5';

export default function ContactPage() {
  const { showSuccess } = useToast();
  const [searchParams] = useSearchParams();
  const requestedService = searchParams.get('service');
  const [formData, setFormData] = useState({
    name: searchParams.get('name') || '',
    email: '',
    phone: searchParams.get('phone') || '',
    query: requestedService ? `I would like to request: ${requestedService}.` : '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    showSuccess('Message received. Our compliance desk will reach out shortly.');
    setSubmitted(true);
  };

  const set = (field) => (e) => setFormData({ ...formData, [field]: e.target.value });

  const channels = [
    { icon: Phone, label: 'Call us (toll free)', value: SUPPORT.phoneDisplay, href: SUPPORT.phoneTel, note: 'CA and compliance consultation desk' },
    { icon: MessageCircle, label: 'WhatsApp', value: SUPPORT.whatsappDisplay, href: whatsappLink(), note: 'Document checks and quick questions', external: true },
    { icon: Mail, label: 'Email', value: SUPPORT.email, href: `mailto:${SUPPORT.email}`, note: 'Notices, proposals and legal queries' },
  ];

  return (
    <div className="bg-white font-sans">
      <PageHero
        eyebrow="Contact"
        title="Talk to a compliance expert"
        subtitle={
          requestedService
            ? `Tell us a little about your business and we will get back to you about ${requestedService}.`
            : 'Reach a Chartered Accountant or legal expert by phone, WhatsApp or email, or send us your question below.'
        }
      />

      <Section align="left">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          <div className="space-y-4">
            {channels.map(({ icon: Icon, label, value, href, note, external }) => (
              <Card key={label} className="flex items-start gap-4 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-500">{label}</p>
                  <a
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    className={`block truncate text-[15px] font-semibold ${INK} hover:text-emerald-700`}
                  >
                    {value}
                  </a>
                  <p className="mt-0.5 text-[13px] text-slate-500">{note}</p>
                </div>
              </Card>
            ))}

            <Card className="space-y-3 p-5">
              <p className="flex items-center gap-2 text-sm text-slate-700">
                <Clock className="h-4 w-4 text-slate-400" aria-hidden="true" /> {SUPPORT.hours}
              </p>
              <p className="flex items-start gap-2 text-sm leading-relaxed text-slate-700">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                <span>
                  BharatFiling Technologies Private Limited
                  <br />
                  Tower 4, Level 7, EPIP Tech Park, Whitefield,
                  <br />
                  Bengaluru, Karnataka 560066, India
                </span>
              </p>
            </Card>
          </div>

          <Card className="p-6 sm:p-8">
            <h2 className={`text-xl font-semibold ${INK}`}>Send us your question</h2>
            <p className="mt-1 text-sm text-slate-500">We reply during business hours.</p>

            {submitted ? (
              <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
                <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-600" aria-hidden="true" />
                <p className={`mt-3 text-base font-semibold ${INK}`}>Thank you, we have your message</p>
                <p className="mt-1 text-sm text-slate-600">A compliance specialist will contact you by email or phone.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-[13px] font-medium text-slate-700">Full name</span>
                    <input type="text" value={formData.name} onChange={set('name')} placeholder="Rahul Verma" autoComplete="name" className={inputCls} required />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[13px] font-medium text-slate-700">Mobile number</span>
                    <input type="tel" inputMode="tel" autoComplete="tel" value={formData.phone} onChange={set('phone')} placeholder="10-digit mobile number" className={inputCls} required />
                  </label>
                </div>
                <label className="block">
                  <span className="mb-1.5 block text-[13px] font-medium text-slate-700">Email address</span>
                  <input type="email" inputMode="email" autoComplete="email" value={formData.email} onChange={set('email')} placeholder="you@company.com" className={inputCls} required />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[13px] font-medium text-slate-700">How can we help?</span>
                  <textarea rows={4} value={formData.query} onChange={set('query')} placeholder="Tell us about your business and what you need" className={inputCls} required />
                </label>
                <Button type="submit" className="w-full">
                  <Send className="h-4 w-4" aria-hidden="true" /> Send message
                </Button>
              </form>
            )}
          </Card>
        </div>
      </Section>
    </div>
  );
}
