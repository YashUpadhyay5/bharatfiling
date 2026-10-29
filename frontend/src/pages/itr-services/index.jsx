import React from 'react';
import { Navigate } from 'react-router-dom';
import { getItrServiceConfig } from './configs/index.js';
import PaymentPage from './PaymentPage.jsx';
import ThreeStepFlow from './ThreeStepFlow.jsx';

export default function ItrServiceModule({ slug }) {
  const config = getItrServiceConfig(slug);
  if (!config) return <Navigate to="/services" replace />;
  return <ThreeStepFlow config={config} PaymentPage={PaymentPage} />;
}
