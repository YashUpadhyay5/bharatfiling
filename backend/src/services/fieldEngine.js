import { db } from '../database/db.js';

export const getFieldDefinitions = () => {
  return db.getFieldDefinitions();
};

export const getRequirementsForBusinessType = (businessType, state = 'Karnataka') => {
  const normType = (businessType || 'Proprietorship').trim();

  // Base fields required for all applications
  const baseFields = [
    'LEGAL_NAME',
    'BUSINESS_TYPE',
    'PRINCIPAL_ADDRESS_1',
    'CITY',
    'STATE',
    'PINCODE',
    'BUSINESS_ACTIVITY',
    'BANK_ACCOUNT_NO',
    'BANK_IFSC',
  ];

  let specificFields = [];
  let requiredDocs = [];
  let optionalDocs = [];

  switch (normType) {
    case 'Proprietorship':
      specificFields = [
        'CUSTOMER_NAME',
        'FATHER_NAME',
        'DATE_OF_BIRTH',
        'PAN_NUMBER',
        'AADHAAR_NUMBER',
        'MOBILE_NUMBER',
        'EMAIL',
        'TRADE_NAME',
      ];
      requiredDocs = [
        {
          type: 'PAN_CARD',
          title: 'PAN Card of Proprietor',
          description: 'Clear front scan or photo of the proprietor’s 10-digit PAN card',
          mandatory: true,
        },
        {
          type: 'AADHAAR_CARD',
          title: 'Aadhaar Card of Proprietor',
          description: 'Both front and back side or downloaded e-Aadhaar PDF',
          mandatory: true,
        },
        {
          type: 'ADDRESS_PROOF',
          title: 'Electricity Bill / Property Tax Receipt',
          description: 'Latest utility bill (less than 2 months old) for business premises',
          mandatory: true,
        },
        {
          type: 'RENT_AGREEMENT',
          title: 'Rent Agreement / Consent Letter + NOC',
          description: 'If premises is rented or shared, registered rent deed and No Objection Certificate',
          mandatory: true,
        },
        {
          type: 'BANK_PROOF',
          title: 'Cancelled Cheque / Bank Statement',
          description: 'Bank passbook first page or cancelled cheque displaying account holder name, account number & IFSC',
          mandatory: true,
        },
        {
          type: 'PHOTO_PROPRIETOR',
          title: 'Passport Size Photograph',
          description: 'Recent colored passport photograph against a light background',
          mandatory: true,
        },
      ];
      optionalDocs = [
        {
          type: 'TRADE_LICENSE',
          title: 'Shop & Establishment / Trade License',
          description: 'Local municipal trade license (if applicable)',
          mandatory: false,
        },
      ];
      break;

    case 'Partnership':
      specificFields = [
        'PARTNERSHIP_PAN',
        'TRADE_NAME',
        'NUMBER_OF_PARTNERS',
        'AUTHORIZED_PARTNER_NAME',
        'AUTHORIZED_PARTNER_PAN',
        'AUTHORIZED_PARTNER_AADHAAR',
      ];
      requiredDocs = [
        {
          type: 'PAN_CARD_FIRM',
          title: 'PAN Card of Partnership Firm',
          description: 'Permanent Account Number card issued in the name of the firm',
          mandatory: true,
        },
        {
          type: 'PARTNERSHIP_DEED',
          title: 'Registered Partnership Deed',
          description: 'Complete stamped and signed partnership agreement',
          mandatory: true,
        },
        {
          type: 'AUTHORIZATION_LETTER',
          title: 'Partnership Authorization Letter',
          description: 'Declaration on letterhead signed by all partners nominating authorized signatory',
          mandatory: true,
        },
        {
          type: 'PARTNERS_PAN_AADHAAR',
          title: 'PAN & Aadhaar of All Partners',
          description: 'Combined PDF of PAN and Aadhaar for all active partners',
          mandatory: true,
        },
        {
          type: 'ADDRESS_PROOF',
          title: 'Electricity Bill / Land Ownership Proof',
          description: 'Latest electricity bill or municipal tax receipt of principal place of business',
          mandatory: true,
        },
        {
          type: 'RENT_AGREEMENT',
          title: 'Rent Agreement & NOC from Landlord',
          description: 'Valid rent deed along with signed landlord NOC',
          mandatory: true,
        },
        {
          type: 'BANK_PROOF',
          title: 'Firm Bank Statement / Cancelled Cheque',
          description: 'Bank document showing firm account number and IFSC',
          mandatory: true,
        },
      ];
      break;

    case 'LLP':
      specificFields = [
        'LLP_PAN',
        'LLPIN',
        'TRADE_NAME',
        'DESIGNATED_PARTNER_DPIN',
        'AUTHORIZED_SIGNATORY_PAN',
      ];
      requiredDocs = [
        {
          type: 'PAN_CARD_LLP',
          title: 'PAN Card of LLP',
          description: 'Income Tax PAN issued in the name of the LLP',
          mandatory: true,
        },
        {
          type: 'COI_LLP',
          title: 'Certificate of Incorporation (MCA)',
          description: 'ROC Certificate of Incorporation with LLPIN',
          mandatory: true,
        },
        {
          type: 'LLP_AGREEMENT',
          title: 'Registered LLP Agreement',
          description: 'Original LLP agreement with MCA approval receipt',
          mandatory: true,
        },
        {
          type: 'BOARD_RESOLUTION',
          title: 'Board Resolution for Authorized Signatory',
          description: 'Resolution signed by designated partners appointing authorized person',
          mandatory: true,
        },
        {
          type: 'PARTNERS_PAN_AADHAAR',
          title: 'PAN & Aadhaar of Designated Partners',
          description: 'ID proofs of all designated partners',
          mandatory: true,
        },
        {
          type: 'ADDRESS_PROOF',
          title: 'Electricity Bill + NOC of Registered Office',
          description: 'Latest utility bill of the registered office premises',
          mandatory: true,
        },
        {
          type: 'BANK_PROOF',
          title: 'LLP Bank Account Proof',
          description: 'Cancelled cheque or statement in the name of the LLP',
          mandatory: true,
        },
      ];
      break;

    case 'Private Limited Company':
    case 'One Person Company':
    default:
      specificFields = [
        'COMPANY_PAN',
        'CIN_NUMBER',
        'TRADE_NAME',
        'DIRECTOR_DIN',
        'DIRECTOR_PAN',
        'AUTHORIZED_SIGNATORY_NAME',
      ];
      requiredDocs = [
        {
          type: 'PAN_CARD_COMPANY',
          title: 'Company PAN Card',
          description: 'Permanent Account Number card in the name of the Private Limited entity',
          mandatory: true,
        },
        {
          type: 'COI_COMPANY',
          title: 'Certificate of Incorporation (COI)',
          description: 'Certificate issued by Ministry of Corporate Affairs (MCA) with CIN',
          mandatory: true,
        },
        {
          type: 'MOA_AOA',
          title: 'Memorandum & Articles of Association (MOA / AOA)',
          description: 'Charter documents of the company',
          mandatory: true,
        },
        {
          type: 'BOARD_RESOLUTION',
          title: 'Board Resolution for GST Authorization',
          description: 'Resolution on company letterhead authorizing director/signatory with company seal',
          mandatory: true,
        },
        {
          type: 'DIRECTORS_KYC',
          title: 'PAN & Aadhaar of All Directors',
          description: 'Self-attested identity proof of each board director',
          mandatory: true,
        },
        {
          type: 'ADDRESS_PROOF',
          title: 'Registered Office Electricity Bill + NOC',
          description: 'Electricity bill (<2 months) with landlord consent NOC',
          mandatory: true,
        },
        {
          type: 'BANK_PROOF',
          title: 'Company Bank Statement / Cancelled Cheque',
          description: 'Current account cheque leaf or recent statement showing company name',
          mandatory: true,
        },
      ];
      break;
  }

  return {
    business_type: normType,
    state,
    required_fields: [...new Set([...baseFields, ...specificFields])],
    required_documents: requiredDocs,
    optional_documents: optionalDocs,
    summary: `${requiredDocs.length} mandatory documents and ${baseFields.length + specificFields.length} data fields required for ${normType}.`,
  };
};
