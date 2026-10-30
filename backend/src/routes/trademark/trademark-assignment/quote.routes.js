import express from 'express';

const router = express.Router();

const PACKAGE_FEES = {
  consultation: 499,
  standard: 4999,
  comprehensive: 9999,
};

const STATUTORY_GOVT_FEES = {
  individual_startup: 9000,
  other_entities: 10000,
};

/**
 * POST /quote/calculate
 * Computes trademark assignment professional fees, statutory Form TM-P fees, and 18% GST.
 */
router.post('/quote/calculate', (req, res) => {
  try {
    const {
      packageId = 'standard',
      entityType = 'individual_startup',
      classesCount = 1,
      includeGovtFee = false,
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

    const feePerClass = STATUTORY_GOVT_FEES[entityType] || STATUTORY_GOVT_FEES.individual_startup;
    const count = Math.max(1, Number(classesCount) || 1);
    const totalGovtFee = feePerClass * count;

    const totalPayable = includeGovtFee
      ? professionalFee + gstOnProfessional + totalGovtFee
      : professionalFee + gstOnProfessional;

    const quoteObj = {
      packageId,
      entityType,
      classesCount: count,
      baseFee,
      baseProfessionalFee: baseFee,
      discount,
      couponApplied: coupon || 'AUTO500',
      professionalFee,
      gstRate: 0.18,
      gstOnProfessional,
      statutoryGovtFee: feePerClass,
      totalGovtFee: includeGovtFee ? totalGovtFee : 0,
      totalAmount: totalPayable,
      totalPayable,
      currency: 'INR',
    };

    return res.json({
      success: true,
      quote: quoteObj,
      ...quoteObj,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to calculate trademark assignment quote',
      error: error.message,
    });
  }
});

export default router;
