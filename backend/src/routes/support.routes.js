import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../database/db.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Floating GST AI Assistant query
router.post('/chat', (req, res) => {
  try {
    const { query, current_step, business_type = 'Proprietorship', application_id } = req.body;
    if (!query) {
      return res.status(400).json({ success: false, message: 'Query is required.' });
    }

    const q = query.toLowerCase();
    let reply = '';
    let escalateToCA = false;

    if (q.includes('address') || q.includes('electricity') || q.includes('utility') || q.includes('premises')) {
      reply = `According to GST Law (Rule 8), the tax department requires proof of physical possession for your principal place of business. An electricity bill (less than 2 months old) or municipal property tax receipt is the gold standard accepted by GST officers. If the premises is in your family member's or landlord's name, a simple signed NOC (No Objection Certificate) and rent agreement must also be attached.`;
    } else if (q.includes('arn') || q.includes('application reference number')) {
      reply = `An ARN (Application Reference Number) is a unique 15-digit alphanumeric code generated immediately when our Chartered Accountant files your Form REG-01 on the official GST Common Portal (gst.gov.in). You can track real-time government status using your ARN on BharatFiling or directly on the GST portal.`;
    } else if (q.includes('hsn') || q.includes('sac') || q.includes('goods') || q.includes('service')) {
      reply = `HSN (Harmonized System of Nomenclature) applies to physical products, while SAC (Services Accounting Code) applies to services. For GST registration, you only need to select the top 5 primary goods or services your business offers. Our AI and CA team will automatically map your activities to the official 6-digit codes.`;
    } else if (q.includes('time') || q.includes('how long') || q.includes('days') || q.includes('duration')) {
      reply = `Standard GST registration typically takes 3 to 7 working days once submitted on the GST Portal, provided Aadhaar biometric authentication is completed. If the GST officer raises a query (Notice REG-03), our CA team files the response within 24 hours to expedite approval.`;
    } else if (q.includes('cost') || q.includes('price') || q.includes('fee') || q.includes('charge')) {
      reply = `Government portal filing fees for GST Registration are completely NIL (Free). BharatFiling charges an all-inclusive professional fee of ₹1,499 + 18% GST (Total ₹1,769), which includes end-to-end documentation preparation, AI validation, dedicated CA review, filing, and certificate delivery.`;
    } else if (q.includes('pan') || q.includes('aadhaar') || q.includes('mismatch')) {
      reply = `Your PAN card is the master permanent anchor for GST. The legal name entered must match the Income Tax database. If there is a slight spelling variation between PAN and Aadhaar, our Chartered Accountant can attach an affidavit during filing to prevent government rejection.`;
    } else {
      reply = `Thank you for your question. As your business prepares for GST Registration, our platform ensures every detail complies with CBIC guidelines. Would you like a licensed Chartered Accountant to call you directly to discuss this in detail?`;
      escalateToCA = true;
    }

    res.json({
      success: true,
      answer: reply,
      escalate_suggested: escalateToCA,
      step_context: current_step,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'AI chat failed.', error: err.message });
  }
});

// Request CA Phone Callback
router.post('/callback', authenticate, (req, res) => {
  try {
    const { application_id, phone, preferred_time, notes } = req.body;

    const tickets = db.getSupportTickets();
    const newTicket = {
      id: `tkt_${uuidv4().slice(0, 8)}`,
      user_id: req.user.id,
      application_id: application_id || '',
      type: 'PHONE_CALLBACK',
      subject: 'Urgent CA Phone Consultation Request',
      message: notes || 'Customer requested phone callback to review GST requirements.',
      status: 'OPEN',
      phone: phone || req.user.phone,
      preferred_time: preferred_time || 'Next 30 minutes',
      created_at: new Date().toISOString(),
    };

    tickets.push(newTicket);
    db.saveSupportTickets(tickets);

    // If application ID provided, log event
    if (application_id) {
      const events = db.getCaseEvents();
      events.push({
        id: `evt_${uuidv4().slice(0, 8)}`,
        application_id,
        title: 'CA Phone Callback Requested',
        description: `Customer requested expert call to ${newTicket.phone} (${newTicket.preferred_time}). Assigned CA alerted.`,
        actor_role: 'CUSTOMER',
        created_at: new Date().toISOString(),
      });
      db.saveCaseEvents(events);
    }

    res.status(201).json({
      success: true,
      message: 'CA callback scheduled! A senior Chartered Accountant will contact you within your preferred slot.',
      ticket: newTicket,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Callback request failed.', error: err.message });
  }
});

// Create general support inquiry
router.post('/ticket', authenticate, (req, res) => {
  try {
    const { subject, message, application_id } = req.body;
    if (!subject || !message) {
      return res.status(400).json({ success: false, message: 'Subject and message are required.' });
    }

    const tickets = db.getSupportTickets();
    const newTicket = {
      id: `tkt_${uuidv4().slice(0, 8)}`,
      user_id: req.user.id,
      application_id: application_id || '',
      type: 'QUERY',
      subject,
      message,
      status: 'OPEN',
      created_at: new Date().toISOString(),
    };

    tickets.push(newTicket);
    db.saveSupportTickets(tickets);

    res.status(201).json({
      success: true,
      message: 'Support ticket submitted. Our compliance team will respond shortly.',
      ticket: newTicket,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Ticket creation failed.', error: err.message });
  }
});

// GET user's support tickets
router.get('/tickets', authenticate, (req, res) => {
  try {
    const tickets = db.getSupportTickets().filter((t) => t.user_id === req.user.id);
    res.json({
      success: true,
      tickets,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch tickets.', error: err.message });
  }
});

export default router;
