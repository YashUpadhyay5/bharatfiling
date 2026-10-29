import React from 'react';
import ThreeStepFlow from '../itr-services/ThreeStepFlow.jsx';
import config from './config.js';
import PaymentPage from './PaymentPage.jsx';

export default function TdsReturnFilingModule() {
  return <ThreeStepFlow config={config} PaymentPage={PaymentPage} />;
}
