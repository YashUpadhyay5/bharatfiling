import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../database/db.js';
import { optionalAuth } from '../../middleware/auth.js';
import { GUEST_USER_ID } from '../../middleware/ownership.js';

const router = express.Router();

/**
 * POST /lead
 * Captures loan inquiry & contact from landing page.
 */
router.post('/lead', optionalAuth, (req, res) => {
  try {
    const {
      email,
      phone,
      name = 'Borrower / Promoter',
      desiredAmount = 1500000,
      cityPincode = '',
      whatsappUpdates = true,
      selectedSchemeId = 'unsecured-business',
      selectedSchemeName = 'Unsecured Business Loan',
    } = req.body;

    if (!email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Email and mobile number are required.',
      });
    }

    const userId = req.user ? req.user.id : GUEST_USER_ID;
    const appId = uuidv4();
    const appNumber = 'LN' + Math.floor(100000 + Math.random() * 900000);

    const newApplication = {
      id: appId,
      application_number: appNumber,
      user_id: userId,
      service_id: 'loans',
      service_name: 'Business & MSME Loans',
      module_type: 'LOANS',
      status: 'LEAD_CAPTURED',
      payment_completed: false,
      assigned_officer: 'Senior Banking & SME Credit Advisor CA Raghavan Srinivasan',
      fields_data: {
        applicant_name: name,
        email,
        phone,
        desired_amount: Number(desiredAmount),
        city_pincode: cityPincode,
        scheme_id: selectedSchemeId,
        scheme_name: selectedSchemeName,
        whatsapp_opt_in: whatsappUpdates,
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const apps = db.getApplications();
    apps.push(newApplication);
    db.saveApplications(apps);

    res.status(201).json({
      success: true,
      message: 'Loan inquiry received. Our credit appraisal desk will connect with you shortly.',
      leadId: appId,
      applicationNumber: appNumber,
      desiredAmount,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to record loan inquiry.',
      error: err.message,
    });
  }
});

/**
 * POST /eligibility
 * Evaluates in-principle match score, EMI, and recommended banks.
 */
router.post('/eligibility', (req, res) => {
  try {
    const {
      amount = 1500000,
      rate = 11.99,
      tenureYears = 3,
      cibilRange = '750_plus',
      isGstRegistered = true,
      schemeId = 'unsecured-business',
    } = req.body;

    const P = Number(amount);
    const r = Number(rate) / (12 * 100);
    const n = Number(tenureYears) * 12;

    let emi = 0;
    if (r > 0 && n > 0) {
      emi = Math.round((P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
    }
    const totalPayable = emi * n;
    const totalInterest = totalPayable - P;

    let matchScore = 75;
    if (cibilRange === '750_plus') matchScore += 15;
    else if (cibilRange === '700_749') matchScore += 10;
    else if (cibilRange === '650_699') matchScore += 0;
    else matchScore -= 10;

    if (isGstRegistered) matchScore += 5;

    const finalScore = Math.min(Math.max(matchScore, 50), 98);

    const recommendedBanks = ['HDFC Bank', 'State Bank of India', 'Bajaj Finserv'];
    if (schemeId === 'mudra-pmmy') {
      recommendedBanks[0] = 'Punjab National Bank';
      recommendedBanks[1] = 'Bank of Baroda';
    } else if (schemeId === 'working-capital-cgtmse') {
      recommendedBanks[0] = 'SIDBI';
      recommendedBanks[1] = 'State Bank of India';
    } else if (schemeId === 'custom-loan-advisory') {
      recommendedBanks[0] = 'State Bank of India (MSME Desk)';
      recommendedBanks[1] = 'SIDBI & Specialized Funds';
      recommendedBanks[2] = 'HDFC Corporate Banking';
    }

    res.json({
      success: true,
      loanAmount: P,
      rate: Number(rate),
      tenureMonths: n,
      monthlyEmi: emi,
      totalInterest,
      totalPayable,
      matchScore: finalScore,
      sanctionProbability: finalScore >= 85 ? 'High' : 'Moderate',
      recommendedBanks,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to calculate loan eligibility.',
      error: err.message,
    });
  }
});

/**
 * POST /profile
 * Stores detailed business financial profile and credit specifications.
 */
router.post('/profile', optionalAuth, (req, res) => {
  try {
    const {
      orderId,
      applicantEmail,
      schemeId,
      schemeName,
      loanAmount,
      loanPurpose,
      entityType,
      businessVintage,
      annualTurnover,
      monthlyCredit,
      isGstRegistered,
      gstin,
      cibilRange,
      matchScore,
      customLoanType = '',
      isCustomAdvisory = false,
    } = req.body;

    const apps = db.getApplications();
    let app = null;
    if (orderId) {
      app = apps.find((a) => a.id === orderId || a.application_number === orderId);
    }
    if (!app && applicantEmail) {
      app = apps.find((a) => a.fields_data?.email === applicantEmail);
    }

    if (app) {
      app.fields_data = {
        ...app.fields_data,
        scheme_id: schemeId || app.fields_data.scheme_id,
        scheme_name: schemeName || app.fields_data.scheme_name,
        loan_amount: loanAmount || app.fields_data.desired_amount,
        loan_purpose: loanPurpose,
        custom_loan_type: customLoanType,
        is_custom_advisory: isCustomAdvisory,
        entity_type: entityType,
        business_vintage: businessVintage,
        annual_turnover: annualTurnover,
        monthly_credit: monthlyCredit,
        is_gst_registered: isGstRegistered,
        gstin,
        cibil_range: cibilRange,
        match_score: matchScore,
      };
      app.updated_at = new Date().toISOString();
      db.saveApplications(apps);
    }

    res.json({
      success: true,
      message: 'Financial profile and loan specifications recorded successfully.',
      schemeId,
      matchScore,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to save loan financial profile.',
      error: err.message,
    });
  }
});

/**
 * POST /payment
 * Settles credit consultation & dossier processing fee (₹525) and confirms specialist session.
 */
router.post('/payment', optionalAuth, (req, res) => {
  try {
    const {
      orderId,
      method = 'UPI',
      subMethod = 'PhonePe',
      amount = 525,
      includeLabourWelfare = true,
      applicantName = 'Borrower',
      applicantEmail = 'borrower@company.com',
      applicantPhone = '',
      schemeId = 'unsecured-business',
      schemeName = 'Unsecured Business Loan',
      loanAmount = 1500000,
      bookedSlot = '4 November 2026 at 2:00 PM',
      customLoanType = '',
      isCustomAdvisory = false,
    } = req.body;

    const generatedTxnId = `BFP-LN-${Date.now().toString().slice(-8)}`;
    const resolvedOrderId = orderId || `#LN-${Math.floor(100000 + Math.random() * 900000)}`;

    const orders = db.getOrders();
    let order = orders.find((o) => o.id === orderId || o.order_number === orderId);

    if (order) {
      order.status = 'PAID';
      order.payment_status = 'PAID';
      order.payment_method = method;
      order.transaction_id = generatedTxnId;
      order.updated_at = new Date().toISOString();
    } else {
      order = {
        id: uuidv4(),
        order_number: resolvedOrderId,
        user_id: req.user ? req.user.id : GUEST_USER_ID,
        service_id: 'loans',
        service_name: 'Business & MSME Loans',
        amount,
        currency: 'INR',
        status: 'PAID',
        payment_status: 'PAID',
        payment_method: method,
        transaction_id: generatedTxnId,
        metadata: {
          applicant_name: applicantName,
          scheme_id: schemeId,
          scheme_name: schemeName,
          loan_amount: loanAmount,
          custom_loan_type: customLoanType,
          is_custom_advisory: isCustomAdvisory,
          booked_slot: bookedSlot,
          include_labour_welfare: includeLabourWelfare,
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      orders.push(order);
    }
    db.saveOrders(orders);

    const apps = db.getApplications();
    let app = null;
    if (orderId) {
      app = apps.find((a) => a.id === orderId || a.application_number === orderId);
    }
    if (!app && order?.application_id) {
      app = apps.find((a) => a.id === order.application_id);
    }
    if (!app && applicantEmail) {
      app = apps.find((a) => a.fields_data?.email === applicantEmail);
    }

    if (app) {
      app.status = 'CONFIRMED';
      app.payment_completed = true;
      app.assigned_officer = 'Senior Banking & SME Credit Advisor CA Raghavan Srinivasan';
      app.updated_at = new Date().toISOString();
      db.saveApplications(apps);
    }

    // Save transaction
    if (typeof db.getTransactions === 'function' && typeof db.saveTransactions === 'function') {
      const txns = db.getTransactions();
      txns.push({
        id: uuidv4(),
        order_id: order.id,
        transaction_id: generatedTxnId,
        amount,
        currency: 'INR',
        status: 'SUCCESS',
        payment_method: method,
        gateway: 'BHARATFILING_MOCK_GATEWAY',
        created_at: new Date().toISOString(),
      });
      db.saveTransactions(txns);
    }

    res.json({
      success: true,
      message: 'Payment verified and Loan Strategy Session activated.',
      transactionId: generatedTxnId,
      orderNumber: resolvedOrderId,
      amount,
      assignedSpecialist: 'Senior Banking & SME Credit Advisor CA Raghavan Srinivasan (Ex-SBI Credit Appraisal Practice)',
      bookedSlot,
      callNotice: 'Our credit advisor will call you shortly from 80448 ***** at your booked slot.',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to settle loan consultation payment.',
      error: err.message,
    });
  }
});

export default router;
