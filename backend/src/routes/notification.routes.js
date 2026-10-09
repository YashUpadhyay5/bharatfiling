import express from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  getUserNotifications,
  getUserUnreadCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from '../services/notification.service.js';

const router = express.Router();

/**
 * GET /api/v1/notifications
 * Retrieves notifications for the authenticated user.
 * Query params: ?unread_only=true|false&limit=50&offset=0
 */
router.get('/', authenticate, (req, res) => {
  try {
    const result = getUserNotifications(req.user.id, req.user.role, req.query);
    res.json({
      success: true,
      ...result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve notifications.',
      error: err.message,
    });
  }
});

/**
 * GET /api/v1/notifications/unread-count
 * Returns unread count for badge counters.
 */
router.get('/unread-count', authenticate, (req, res) => {
  try {
    const unreadCount = getUserUnreadCount(req.user.id, req.user.role);
    res.json({
      success: true,
      unread_count: unreadCount,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to get unread notification count.',
      error: err.message,
    });
  }
});

/**
 * PATCH /api/v1/notifications/:id/read
 * Marks a specific notification as read.
 */
router.patch('/:id/read', authenticate, (req, res) => {
  try {
    const { id } = req.params;
    const result = markNotificationAsRead(id, req.user.id, req.user.role);

    if (!result.success) {
      return res.status(403).json(result);
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to mark notification as read.',
      error: err.message,
    });
  }
});

/**
 * PATCH /api/v1/notifications/mark-all-read
 * Marks all notifications as read for current user.
 */
router.patch('/mark-all-read', authenticate, (req, res) => {
  try {
    const result = markAllNotificationsAsRead(req.user.id, req.user.role);
    res.json(result);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to mark all notifications as read.',
      error: err.message,
    });
  }
});

/**
 * DELETE /api/v1/notifications/:id
 * Dismisses/deletes a notification.
 */
router.delete('/:id', authenticate, (req, res) => {
  try {
    const { id } = req.params;
    const result = deleteNotification(id, req.user.id, req.user.role);

    if (!result.success) {
      return res.status(403).json(result);
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete notification.',
      error: err.message,
    });
  }
});

export default router;
