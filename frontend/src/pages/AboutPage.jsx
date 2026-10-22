import React from 'react';
import { ShieldCheck, Award, Sparkles, FileSearch, UserCheck, Send } from 'lucide-react';
import { PageHero, Section, Feature, Card, Button, CtaBand, CheckList, INK } from '../components/ui/kit.jsx';
import { SERVICES } from '../data/serviceCatalog.js';
import { whatsappLink } from '../config/support.js';

const PRINCIPLES = [
  'Fixed professional fee shown before you pay, with government fees listed separately',
  'A qualified professional reviews every filing before it reaches a government portal',
  'Plain-language updates at every stage, not jargon',
];

const HOW = [
  { icon: FileSearch, title: 'Technology does the checking', text: 'Our system reads your documents, extracts PAN and Aadhaar details and flags mismatches before anything is filed.' },
  { icon: UserCheck, title: 'Professionals make the decisions', text: 'Chartered Accountants, company secretaries and advocates prepare, review and sign off every statutory filing.' },
  { icon: Send, title: 'You stay informed', text: 'You see each step in your dashboard and receive certificates and acknowledgements digitally.' },
];

export default function AboutPage() {
  return (
    <div className="bg-white font-sans">
      <PageHero
        eyebrow="About BharatFiling"
        title="Compliance done properly, without the paperwork"
        subtitle="We are building a dependable compliance and taxation platform for Indian businesses, with every filing reviewed by a qualified professional."
      >
        <div className="flex flex-wrap gap-3">
          <Button to="/services">Explore {SERVICES.length} services</Button>
          <Button to="/contact" variant="secondary">Talk to us</Button>
        </div>
      </PageHero>

      <Section align="left">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4">
            <h2 className={`text-2xl sm:text-3xl font-semibold tracking-tight ${INK}`}>Our philosophy</h2>
            <p className="text-[15px] leading-relaxed text-slate-600">
              Starting and running a business in India should not require deciphering tax statutes or dealing with opaque middlemen.
              Technology should do the heavy lifting of extraction and validation, while licensed professionals make the final statutory decisions.
            </p>
            <p className="text-[15px] leading-relaxed text-slate-600">
              We do not believe software should replace professional accountability. It speeds up the work; a professional owns the outcome.
            </p>
          </div>
          <Card className="p-6 sm:p-8">
            <h3 className={`text-base font-semibold ${INK} mb-4`}>What you can expect from us</h3>
            <CheckList items={PRINCIPLES} />
          </Card>
        </div>
      </Section>

      <Section tone="tint" eyebrow="How we work" title="Software for speed, professionals for accuracy">
        <div className="grid gap-5 md:grid-cols-3">
          {HOW.map((h) => (
            <Feature key={h.title} icon={h.icon} title={h.title}>{h.text}</Feature>
          ))}
        </div>
      </Section>

      <Section eyebrow="Why businesses choose us" title="Built around trust">
        <div className="grid gap-5 md:grid-cols-3">
          <Feature icon={ShieldCheck} title="Security and privacy">
            Documents are uploaded over an encrypted connection and kept private to your account.
          </Feature>
          <Feature icon={Award} title="Qualified experts">
            Filings are handled by Chartered Accountants (ICAI), company secretaries and enrolled advocates.
          </Feature>
          <Feature icon={Sparkles} title="One profile, every service">
            Verify your details once. Your verified profile is reused across future compliance services.
          </Feature>
        </div>
      </Section>

      <CtaBand title="Have a compliance question?" subtitle="Speak to our team and get a clear answer, along with a fixed quote if you need us to file.">
        <Button to="/contact" variant="secondary">Contact us</Button>
        <Button href={whatsappLink('Hi BharatFiling Team, I have a question.')} variant="whatsapp" target="_blank" rel="noreferrer">Chat on WhatsApp</Button>
      </CtaBand>
    </div>
  );
}
