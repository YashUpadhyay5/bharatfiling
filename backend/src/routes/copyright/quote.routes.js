import express from 'express';

const router = express.Router();

const PACKAGE_FEES = {
  registration: 2999,
  consultation: 499,
  starter: 2499,
  standard: 4999,
  commercial: 8999,
};

const STATUTORY_GOVT_FEES = {
  literary: 500,
  software: 500,
  artistic: 2000,
  musical: 2000,
  cinematograph: 5000,
  sound_recording: 2000,
};

/**
 * POST /quote/calculate
 * Calculates breakdown of copyright legal fees, statutory government fees, GST, and Labour Welfare.
 */
router.post('/quote/calculate', (req, res) => {
  try {
    const {
      packageId = 'standard',
      category = 'literary',
      worksCount = 1,
      includeGovtFee = false,
      includeLabourWelfare = false,
      coupon = '',
    } = req.body;

    const baseFee = PACKAGE_FEES[packageId] || PACKAGE_FEES.standard;

    let discount = 500;
    const cleanCoupon = String(coupon).trim().toUpperCase();
    if (cleanCoupon === 'SAVE40' || cleanCoupon === 'DIWALI') {
      discount = Math.round(baseFee * 0.4);
    } else if (cleanCoupon === 'ONLINE500' || cleanCoupon === 'HOORAY500' || !coupon) {
      discount = 500;
    }

    const professionalFee = Math.max(0, baseFee - discount);
    const gstOnProfessional = Math.round(professionalFee * 0.18);

    const statutoryFeePerWork = STATUTORY_GOVT_FEES[category] || STATUTORY_GOVT_FEES.literary;
    const count = Math.max(1, Number(worksCount) || 1);
    const totalGovtFee = statutoryFeePerWork * count;

    const labourWelfare = includeLabourWelfare ? 399 : 0;
    const gstOnLabour = includeLabourWelfare ? Math.round(399 * 0.18) : 0; // 72

    const taxesAndCharges = gstOnProfessional + labourWelfare + gstOnLabour;

    const totalPayable = includeGovtFee
      ? professionalFee + taxesAndCharges + totalGovtFee
      : professionalFee + taxesAndCharges;

    const quoteObj = {
      packageId,
      category,
      worksCount: count,
      baseFee,
      baseProfessionalFee: baseFee,
      discount,
      couponApplied: coupon || (discount > 0 ? 'AUTO500' : null),
      professionalFee,
      gstRate: 0.18,
      gstOnProfessional,
      statutoryGovtFee: statutoryFeePerWork,
      statutoryFeePerWork,
      totalGovtFee: includeGovtFee ? totalGovtFee : 0,
      labourWelfare,
      gstOnLabour,
      taxesAndCharges,
      totalTaxesAndCharges: taxesAndCharges,
      totalPayable,
      totalAmount: totalPayable,
      savings: discount,
    };

    return res.status(200).json({
      success: true,
      quote: quoteObj,
      data: quoteObj,
    });
  } catch (err) {
    console.error('Error calculating copyright quotation:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to calculate quotation.',
      error: err.message,
    });
  }
});

export default router;
