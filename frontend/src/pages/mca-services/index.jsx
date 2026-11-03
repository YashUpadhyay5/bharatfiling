import React from 'react';
import { Navigate } from 'react-router-dom';
import { api } from '../../services/api.js';
import PaymentPage from '../itr-services/PaymentPage.jsx';
import ThreeStepFlow from '../itr-services/ThreeStepFlow.jsx';
import { getMcaServiceConfig } from './configs/index.js';

const CHECKOUT = { createOrder: api.createMcaOrder, payOrder: api.payMcaOrder };

const McaPaymentPage = (props) => <PaymentPage {...props} checkout={CHECKOUT} />;

export default function McaServiceModule({ slug }) {
  const config = getMcaServiceConfig(slug);
  if (!config) return <Navigate to="/services" replace />;
  return <ThreeStepFlow config={config} PaymentPage={McaPaymentPage} />;
}
