import React, { useEffect, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { getGstServiceConfig } from './configs/index.js';
import { isAnswered } from './answers.js';
import LandingPage from './LandingPage.jsx';
import QuestionnairePage from './QuestionnairePage.jsx';
import PlansPage from './PlansPage.jsx';
import PaymentPage from './PaymentPage.jsx';

const draftKey = (slug) => `bharatfiling_gst_service_${slug}`;

function loadDraft(config, user) {
  const fresh = {
    email: user?.email || '',
    phone: user?.phone || '',
    cityPincode: '',
    whatsappOptIn: true,
    answers: {},
    plan: config.plans.defaultPlan,
  };
  try {
    const saved = JSON.parse(localStorage.getItem(draftKey(config.slug)) || 'null');
    if (!saved || typeof saved !== 'object') return fresh;
    const draft = { ...fresh, ...saved, answers: { ...saved.answers } };
    if (!config.plans.items.some((p) => p.id === draft.plan)) draft.plan = config.plans.defaultPlan;
    return draft;
  } catch {
    return fresh;
  }
}

function GstServiceFlow({ config }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const [formData, setFormData] = useState(() => loadDraft(config, user));

  useEffect(() => {
    try {
      localStorage.setItem(draftKey(config.slug), JSON.stringify(formData));
    } catch {
      // storage unavailable (private mode); the flow still works for this visit
    }
  }, [config.slug, formData]);

  const requested = parseInt(searchParams.get('step') || '1', 10);
  // A step reached by URL is only shown once the data it depends on exists.
  const hasLead = Boolean(formData.email && formData.phone);
  const hasAnswers = config.questionnaire.questions.every((q) => isAnswered(q, formData.answers[q.id]));
  let step = [1, 2, 3, 4].includes(requested) ? requested : 1;
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
        <PlansPage
          config={config}
          answers={formData.answers}
          onBack={() => goTo(2)}
          onSelectPlan={(plan) => {
            merge({ plan });
            goTo(4);
          }}
        />
      )}
      {step === 4 && (
        <PaymentPage
          config={config}
          formData={formData}
          onBack={() => goTo(3)}
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

export default function GstServiceModule({ slug }) {
  const config = getGstServiceConfig(slug);
  if (!config) return <Navigate to="/services" replace />;
  return <GstServiceFlow config={config} />;
}
