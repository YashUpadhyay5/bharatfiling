import express from 'express';
import { db } from '../database/db.js';
import { authenticate, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Enforce Admin role
router.use(authenticate, requireRole(['ADMIN']));

// GET Admin KPIs & Platform Analytics
router.get('/analytics', (req, res) => {
  try {
    const users = db.getUsers();
    const apps = db.getApplications();
    const orders = db.getOrders();
    const tickets = db.getSupportTickets();
    const auditLogs = db.getAuditLogs();

    const paidOrders = orders.filter((o) => o.status === 'PAID');
    const totalRevenue = paidOrders.reduce((sum, o) => sum + (o.amount || 0), 0);

    const analytics = {
      total_customers: users.filter((u) => u.role === 'CUSTOMER').length,
      total_cas: users.filter((u) => u.role === 'CA').length,
      total_applications: apps.length,
      active_applications: apps.filter((a) => a.internal_status !== 'COMPLETED' && a.internal_status !== 'REJECTED').length,
      completed_registrations: apps.filter((a) => a.internal_status === 'COMPLETED').length,
      pending_ca_reviews: apps.filter((a) => a.internal_status === 'CA_REVIEW' || a.internal_status === 'AI_PRECHECK').length,
      clarifications_active: apps.filter((a) => a.internal_status === 'CLARIFICATION_REQUIRED').length,
      total_revenue_inr: totalRevenue,
      open_support_tickets: tickets.filter((t) => t.status === 'OPEN').length,
      recent_audit_actions: auditLogs.slice(-10).reverse(),
    };

    res.json({
      success: true,
      analytics,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to retrieve analytics.', error: err.message });
  }
});

// GET all users
router.get('/users', (req, res) => {
  try {
    const users = db.getUsers().map((u) => ({
      id: u.id,
      email: u.email,
      phone: u.phone,
      role: u.role,
      full_name: u.full_name,
      created_at: u.created_at,
    }));
    res.json({
      success: true,
      users,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to retrieve users.', error: err.message });
  }
});

// GET system audit logs
router.get('/audit-logs', (req, res) => {
  try {
    const logs = db.getAuditLogs();
    res.json({
      success: true,
      logs: logs.slice(-50).reverse(),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to retrieve audit logs.', error: err.message });
  }
});

export default router;
