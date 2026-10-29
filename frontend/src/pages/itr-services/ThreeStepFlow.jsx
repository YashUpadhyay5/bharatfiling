import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { isAnswered } from '../gst-services/answers.js';
import QuestionnairePage from '../gst-services/QuestionnairePage.jsx';
import LandingPage from './LandingPage.jsx';

const draftKey = (slug) => `bharatfiling_${slug}`;

function loadDraft(config, user) {
  const fresh = {
    email: user?.email || '',
    phone: user?.phone || '',
    cityPincode: '',
    whatsappOptIn: true,
    answers: {},
  };
  try {
    const saved = JSON.parse(localStorage.getItem(draftKey(config.slug)) || 'null');
    if (!saved || typeof saved !== 'object') return fresh;
    return { ...fresh, ...saved, answers: { ...saved.answers } };
  } catch {
    return fresh;
  }
}

/**
 * Landing page -> questionnaire -> payment, driven by a service config. The payment screen differs per
 * product, so the caller passes its PaymentPage. The URL carries the step (?step=1|2|3).
 */
export default function ThreeStepFlow({ config, PaymentPage }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const [formData, setFormData] = useState(() => loadDraft(config, user));
  const extra = config.hero.extraField;

  useEffect(() => {
    try {
      localStorage.setItem(draftKey(config.slug), JSON.stringify(formData));
    } catch {
      // storage unavailable (private mode); the flow still works for this visit
    }
  }, [config.slug, formData]);

  const requested = parseInt(searchParams.get('step') || '1', 10);
  // A step reached by URL is only shown once the data it depends on exists.
  const hasLead = Boolean(formData.email && formData.phone && (!extra || formData[extra.id]));
  const hasAnswers = config.questionnaire.questions.every((q) => isAnswered(q, formData.answers[q.id]));
  let step = [1, 2, 3].includes(requested) ? requested : 1;
  if (step > 1 && !hasLead) step = 1;
  else if (step > 2 && !hasAnswers) step = 2;

  const goTo = (n) => {
    setSearchParams({ step: String(n) });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const merge = (patch) => setFormData((prev) => ({ ...prev, ...patch }));

  return (
    <main className="min-h-screen bg-white">
      {step === 1 && (
        <LandingPage
          config={config}
          initialData={formData}
          onGetStarted={(lead) => {
            merge(lead);
            goTo(2);
          }}
        />
      )}
      {step === 2 && (
        <QuestionnairePage
          config={config}
          answers={formData.answers}
          onSubmit={(answers) => {
            merge({ answers });
            goTo(3);
          }}
        />
      )}
      {step === 3 && (
        <PaymentPage
          config={config}
          formData={formData}
          onBack={() => goTo(2)}
          onPaymentSuccess={() => {
            try {
              localStorage.removeItem(draftKey(config.slug));
            } catch {
              // storage unavailable
            }
          }}
        />
      )}
    </main>
  );
}
