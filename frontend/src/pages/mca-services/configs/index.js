import addRemoveDirector from './add-remove-director.js';
import changeRegisteredOffice from './change-registered-office.js';
import chargeSatisfaction from './charge-satisfaction-chg-1.js';
import companyAnnualRocFiling from './company-annual-roc-filing.js';
import directorKyc from './director-kyc-dir-3.js';
import increaseAuthorizedCapital from './increase-authorized-capital.js';
import llpForm11Form8 from './llp-form-11-form-8.js';
import moaAoaAmendment from './moa-aoa-amendment.js';
import strikeOffCompany from './strike-off-company.js';
import strikeOffLlp from './strike-off-llp.js';

export const MCA_SERVICE_CONFIGS = [
  companyAnnualRocFiling,
  llpForm11Form8,
  directorKyc,
  addRemoveDirector,
  increaseAuthorizedCapital,
  changeRegisteredOffice,
  moaAoaAmendment,
  strikeOffCompany,
  strikeOffLlp,
  chargeSatisfaction,
];

export const getMcaServiceConfig = (slug) => MCA_SERVICE_CONFIGS.find((c) => c.slug === slug);
