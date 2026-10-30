import express from 'express';

const router = express.Router();

const PACKAGE_FEES = {
  consultation: 499,
  provisional_advisory: 499,
  provisional: 9999,
  complete: 24999,
  search: 4999,
  fer_reply: 7999,
};

const STATUTORY_GOVT_FEES = {
  individual_startup: 1600,
  other_entities: 8000,
};

/**
 * POST /quote/calculate
 * Calculates breakdown of patent legal fees, statutory government fees, GST, and Labour Welfare.
 */
router.post('/quote/calculate', (req, res) => {
  try {
    const {
      packageId = 'provisional',
      entityType = 'individual_startup',
      includeGovtFee = false,
      includeLabourWelfare = false,
      coupon = '',
    } = req.body;

    const baseFee = PACKAGE_FEES[packageId] || PACKAGE_FEES.provisional;

    let discount = 0;
    const cleanCoupon = String(coupon).trim().toUpperCase();

    // Discount logic: Only applies to packages with baseFee > 500
    if (baseFee > 500) {
      if (cleanCoupon === 'SAVE40' || cleanCoupon === 'DIWALI') {
        discount = Math.round(baseFee * 0.4);
      } else if (cleanCoupon === 'ONLINE500' || cleanCoupon === 'HOORAY500' || !coupon) {
        discount = 500;
      }
    }

    const professionalFee = Math.max(0, baseFee - discount);
    const gstOnProfessional = Math.round(professionalFee * 0.18);

    const statutoryGovtFee = STATUTORY_GOVT_FEES[entityType] || STATUTORY_GOVT_FEES.individual_startup;

    // Labour welfare endowment logic:
    // If consultation/provisional advisory (base 499): 25 + 5 GST = 30
    // If full filing packages: 399 + 72 GST
    const isConsultationFlow = baseFee <= 500;
    const labourWelfare = includeLabourWelfare ? (isConsultationFlow ? 25 : 399) : 0;
    const gstOnLabour = includeLabourWelfare ? (isConsultationFlow ? 5 : Math.round(399 * 0.18)) : 0;

    const taxesAndCharges = gstOnProfessional + labourWelfare + gstOnLabour;

    const totalPayable = includeGovtFee
      ? professionalFee + taxesAndCharges + statutoryGovtFee
      : professionalFee + taxesAndCharges;

    const quoteObj = {
      packageId,
      entityType,
      baseFee,
      baseProfessionalFee: baseFee,
      discount,
      couponApplied: coupon || (discount > 0 ? 'AUTO500' : null),
      professionalFee,
      gstRate: 0.18,
      gstOnProfessional,
      includeGovtFee,
      statutoryGovtFee: includeGovtFee ? statutoryGovtFee : 0,
      includeLabourWelfare,
      labourWelfareAmount: labourWelfare,
      gstOnLabour,
      taxesAndCharges,
      totalAmount: totalPayable,
      currency: 'INR',
      timestamp: new Date().toISOString(),
    };

    return res.status(200).json({
      success: true,
      message: 'Patent quotation calculated successfully.',
      ...quoteObj,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to calculate patent quotation',
      error: error.message,
    });
  }
});

export default router;
