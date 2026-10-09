import { v4 as uuidv4 } from 'uuid';
import { db } from '../database/db.js';
import {
  emitToUser,
  emitToCADesk,
  emitToApplication,
  getIO,
} from './socket.service.js';

/**
 * Creates, persists, and dispatches a real-time notification
 * across existing Socket.IO rooms with automatic deduplication.
 */
export function createAndDispatchNotification({
  recipient_id = null,
  recipient_role = 'CUSTOMER',
  application_id = null,
  order_id = null,
  type = 'GENERAL_UPDATE',
  title,
  message,
  severity = 'info', // 'info' | 'success' | 'warning' | 'alert'
  action_url = '/dashboard',
  metadata = {},
  dedup_key = null,
}) {
  try {
    const notifications = db.getNotifications();

    // 1. Deduplication Guard: prevent duplicate notifications for retried operations
    if (dedup_key) {
      const existing = notifications.find((n) => n.dedup_key === dedup_key);
      if (existing) {
        return existing;
      }
    }

    // 2. Build Notification Object
    const newNotification = {
      id: `notif_${uuidv4().slice(0, 8)}`,
      recipient_id: recipient_id || null,
      recipient_role: recipient_role || 'CUSTOMER',
      application_id: application_id || null,
      order_id: order_id || null,
      type,
      title: title || 'Application Update',
      message: message || '',
      severity,
      action_url,
      metadata: metadata || {},
      is_read: false,
      read_at: null,
      created_at: new Date().toISOString(),
      dedup_key: dedup_key || null,
    };

    // 3. Persist to Database
    notifications.unshift(newNotification);
    db.saveNotifications(notifications);

    // 4. Calculate unread count for the recipient
    const recipientUnreadCount = notifications.filter(
      (n) =>
        !n.is_read &&
        (n.recipient_id === recipient_id ||
          (!n.recipient_id && n.recipient_role === recipient_role))
    ).length;

    // 5. Real-Time Socket Emission over existing Socket.IO infrastructure
    // A. Direct user targeting
    if (recipient_id) {
      emitToUser(recipient_id, 'notification:new', newNotification);
      emitToUser(recipient_id, 'notification:count-updated', {
        unread_count: recipientUnreadCount,
      });
    }

    // B. Role-based desk broadcasting (Chartered Accountants / Platform Admin)
    if (recipient_role === 'CA' || recipient_role === 'ADMIN') {
      emitToCADesk('notification:new', newNotification);
      emitToCADesk('notification:count-updated', {
        unread_count: recipientUnreadCount,
      });
    }

    // C. Application room targeting for active live tracking
    if (application_id) {
      emitToApplication(application_id, 'notification:new', newNotification);
    }

    return newNotification;
  } catch (err) {
    console.error('Error dispatching notification:', err);
    return null;
  }
}

/**
 * Retrieves notifications for a user based on user ID and role with optional filters.
 */
export function getUserNotifications(userId, userRole, options = {}) {
  const { unread_only = false, limit = 50, offset = 0 } = options;
  const allNotifications = db.getNotifications();

  let userNotifs = allNotifications.filter((n) => {
    // Matches by specific user ID
    if (n.recipient_id && n.recipient_id === userId) return true;
    // Matches role-wide notifications (e.g. CA Desk broadcast)
    if (!n.recipient_id && n.recipient_role === userRole) return true;
    // Platform Admin has visibility into system operational notifications
    if (userRole === 'ADMIN') return true;
    return false;
  });

  const totalUnread = userNotifs.filter((n) => !n.is_read).length;

  if (unread_only === 'true' || unread_only === true) {
    userNotifs = userNotifs.filter((n) => !n.is_read);
  }

  const paginated = userNotifs.slice(Number(offset), Number(offset) + Number(limit));

  return {
    notifications: paginated,
    total_unread: totalUnread,
    total_count: userNotifs.length,
  };
}

/**
 * Gets unread count for badge counters.
 */
export function getUserUnreadCount(userId, userRole) {
  const allNotifications = db.getNotifications();
  return allNotifications.filter((n) => {
    if (n.is_read) return false;
    if (n.recipient_id && n.recipient_id === userId) return true;
    if (!n.recipient_id && n.recipient_role === userRole) return true;
    if (userRole === 'ADMIN') return true;
    return false;
  }).length;
}

/**
 * Marks a single notification as read.
 */
export function markNotificationAsRead(notificationId, userId, userRole) {
  const notifications = db.getNotifications();
  const index = notifications.findIndex((n) => n.id === notificationId);

  if (index === -1) {
    return { success: false, message: 'Notification not found' };
  }

  const notif = notifications[index];
  // Security check: verify ownership
  const isOwner =
    notif.recipient_id === userId ||
    (!notif.recipient_id && notif.recipient_role === userRole) ||
    userRole === 'ADMIN';

  if (!isOwner) {
    return { success: false, message: 'Unauthorized to update this notification' };
  }

  notif.is_read = true;
  notif.read_at = new Date().toISOString();
  notifications[index] = notif;
  db.saveNotifications(notifications);

  const updatedUnreadCount = getUserUnreadCount(userId, userRole);

  // Sync unread count to user's other browser tabs via Socket.IO
  if (userId) {
    emitToUser(userId, 'notification:count-updated', { unread_count: updatedUnreadCount });
  }

  return { success: true, notification: notif, unread_count: updatedUnreadCount };
}

/**
 * Marks all notifications as read for a given user.
 */
export function markAllNotificationsAsRead(userId, userRole) {
  const notifications = db.getNotifications();
  let updatedCount = 0;

  notifications.forEach((n) => {
    const isOwner =
      n.recipient_id === userId ||
      (!n.recipient_id && n.recipient_role === userRole) ||
      userRole === 'ADMIN';

    if (isOwner && !n.is_read) {
      n.is_read = true;
      n.read_at = new Date().toISOString();
      updatedCount += 1;
    }
  });

  if (updatedCount > 0) {
    db.saveNotifications(notifications);
  }

  // Push zero unread count to user's connected tabs
  if (userId) {
    emitToUser(userId, 'notification:count-updated', { unread_count: 0 });
  }

  return { success: true, marked_count: updatedCount, unread_count: 0 };
}

/**
 * Removes a notification from user's list.
 */
export function deleteNotification(notificationId, userId, userRole) {
  const notifications = db.getNotifications();
  const index = notifications.findIndex((n) => n.id === notificationId);

  if (index === -1) {
    return { success: false, message: 'Notification not found' };
  }

  const notif = notifications[index];
  const isOwner =
    notif.recipient_id === userId ||
    (!notif.recipient_id && notif.recipient_role === userRole) ||
    userRole === 'ADMIN';

  if (!isOwner) {
    return { success: false, message: 'Unauthorized to delete this notification' };
  }

  notifications.splice(index, 1);
  db.saveNotifications(notifications);

  const updatedUnreadCount = getUserUnreadCount(userId, userRole);
  if (userId) {
    emitToUser(userId, 'notification:count-updated', { unread_count: updatedUnreadCount });
  }

  return { success: true, message: 'Notification deleted', unread_count: updatedUnreadCount };
}
