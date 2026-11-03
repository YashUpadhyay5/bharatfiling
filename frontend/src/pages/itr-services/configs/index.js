import advanceTaxComputation from './advance-tax-computation.js';
import businessItr from './business-itr.js';
import capitalGainsAdvisory from './capital-gains-advisory.js';
import form15ca15cb from './form-15ca-15cb.js';
import form16Generation from './form-16-generation.js';
import itrFiling from './itr-filing.js';
import itrSoleProprietorship from './itr-sole-proprietorship.js';

export const ITR_SERVICE_CONFIGS = [
  itrFiling,
  itrSoleProprietorship,
  businessItr,
  form15ca15cb,
  capitalGainsAdvisory,
  advanceTaxComputation,
  form16Generation,
];

export const getItrServiceConfig = (slug) => ITR_SERVICE_CONFIGS.find((c) => c.slug === slug);
