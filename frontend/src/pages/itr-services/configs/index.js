import itrFiling from './itr-filing.js';
import itrSoleProprietorship from './itr-sole-proprietorship.js';

export const ITR_SERVICE_CONFIGS = [itrFiling, itrSoleProprietorship];

export const getItrServiceConfig = (slug) => ITR_SERVICE_CONFIGS.find((c) => c.slug === slug);
