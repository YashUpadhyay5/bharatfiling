import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useSocket } from '../../context/SocketContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import {
  Bell,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  Check,
  Trash2,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

export default function NotificationBell() {
  const { user, isAuthenticated } = useAuth();
  const { socket } = useSocket();
  const { showSuccess, showError, showInfo } = useToast();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all' | 'unread'
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  // Format relative time helper
  const getRelativeTime = (isoString) => {
    if (!isoString) return '';
    const diffMs = Date.now() - new Date(isoString).getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) return 'Just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHour < 24) return `${diffHour}h ago`;
    if (diffDay === 1) return 'Yesterday';
    return `${diffDay}d ago`;
  };

  // Fetch initial notifications and unread count
  const fetchNotifications = async () => {
    if (!isAuthenticated) return;
    try {
      setLoading(true);
      const res = await api.getNotifications({ limit: 30 });
      if (res.success) {
        setNotifications(res.notifications || []);
        setUnreadCount(res.total_unread || 0);
      }
    } catch {
      // Graceful offline fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();

    // Re-sync on window focus
    const handleFocus = () => fetchNotifications();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [isAuthenticated]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Real-time Socket.IO Listeners
  useEffect(() => {
    if (!socket || !isAuthenticated) return;

    const handleNewNotification = (notif) => {
      // 1. Prepend to list
      setNotifications((prev) => {
        const exists = prev.some((n) => n.id === notif.id);
        if (exists) return prev;
        return [notif, ...prev];
      });

      // 2. Increment badge
      setUnreadCount((prev) => prev + 1);

      // 3. Playful visual toast alert
      if (notif.severity === 'success') {
        showSuccess(`⚡ ${notif.title}: ${notif.message}`);
      } else if (notif.severity === 'warning') {
        showError(`⚠️ ${notif.title}: ${notif.message}`);
      } else {
        showInfo(`🔔 ${notif.title}: ${notif.message}`);
      }
    };

    const handleCountUpdated = (data) => {
      if (typeof data?.unread_count === 'number') {
        setUnreadCount(data.unread_count);
      }
    };

    socket.on('notification:new', handleNewNotification);
    socket.on('notification:count-updated', handleCountUpdated);

    return () => {
      socket.off('notification:new', handleNewNotification);
      socket.off('notification:count-updated', handleCountUpdated);
    };
  }, [socket, isAuthenticated]);

  const handleMarkAsRead = async (e, notif) => {
    e.stopPropagation();
    if (notif.is_read) return;

    // Optimistic UI update
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, is_read: true } : n))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));

    try {
      await api.markNotificationRead(notif.id);
    } catch {
      // Revert if API fails
      fetchNotifications();
    }
  };

  const handleMarkAllRead = async () => {
    if (unreadCount === 0) return;

    // Optimistic update
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    setUnreadCount(0);

    try {
      await api.markAllNotificationsRead();
    } catch {
      fetchNotifications();
    }
  };

  const handleDelete = async (e, notifId) => {
    e.stopPropagation();

    // Optimistic update
    const target = notifications.find((n) => n.id === notifId);
    setNotifications((prev) => prev.filter((n) => n.id !== notifId));
    if (target && !target.is_read) {
      setUnreadCount((prev) => Math.max(0, prev - 1));
    }

    try {
      await api.deleteNotification(notifId);
    } catch {
      fetchNotifications();
    }
  };

  const handleNotificationClick = async (notif) => {
    if (!notif.is_read) {
      await handleMarkAsRead({ stopPropagation: () => {} }, notif);
    }
    setIsOpen(false);
    if (notif.action_url) {
      navigate(notif.action_url);
    }
  };

  if (!isAuthenticated) return null;

  const filteredNotifs =
    filter === 'unread' ? notifications.filter((n) => !n.is_read) : notifications;

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Bell Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="View notifications"
        className={`relative p-2 rounded-full border transition-all duration-200 flex items-center justify-center ${
          isOpen
            ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
        }`}
      >
        <Bell className="w-4 h-4 transition-transform active:scale-90" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-rose-600 text-[9px] font-black text-white ring-2 ring-white animate-pulse">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Popover Dropdown Inbox */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-[340px] sm:w-[380px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.18)] border border-slate-100 z-50 overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="p-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-slate-900 tracking-tight">Notifications</span>
              {unreadCount > 0 && (
                <span className="bg-rose-100 text-rose-700 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={handleMarkAllRead}
                  className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 transition flex items-center gap-1"
                >
                  <Check className="w-3 h-3" />
                  Mark all read
                </button>
              )}
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex border-b border-slate-100 bg-white px-3 pt-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`pb-2 px-2 font-bold transition border-b-2 ${
                filter === 'all'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('unread')}
              className={`pb-2 px-2 font-bold transition border-b-2 ${
                filter === 'unread'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>

          {/* Notification Items List */}
          <div className="max-h-[360px] overflow-y-auto divide-y divide-slate-100">
            {filteredNotifs.length === 0 ? (
              <div className="p-8 text-center text-slate-400 space-y-2">
                <Sparkles className="w-8 h-8 mx-auto text-slate-300 stroke-[1.5]" />
                <div className="text-xs font-medium text-slate-500">
                  {filter === 'unread'
                    ? 'No unread notifications.'
                    : 'No notifications yet. You are all caught up!'}
                </div>
              </div>
            ) : (
              filteredNotifs.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif)}
                  className={`p-3.5 flex items-start gap-3 cursor-pointer transition text-left group ${
                    notif.is_read
                      ? 'bg-white hover:bg-slate-50/80 text-slate-600'
                      : 'bg-blue-50/40 hover:bg-blue-50/80 text-slate-900 font-medium'
                  }`}
                >
                  {/* Severity Icon Indicator */}
                  <div className="shrink-0 mt-0.5">
                    {notif.severity === 'success' ? (
                      <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    ) : notif.severity === 'warning' ? (
                      <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                        <AlertCircle className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                        <FileText className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <div className="text-xs font-bold truncate text-slate-900 group-hover:text-blue-600 transition">
                        {notif.title}
                      </div>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap">
                        {getRelativeTime(notif.created_at)}
                      </span>
                    </div>

                    <div className="text-[11.5px] text-slate-600 line-clamp-2 mt-0.5 leading-snug">
                      {notif.message}
                    </div>

                    {/* Metadata tags */}
                    {notif.metadata?.arn && (
                      <div className="mt-1 inline-block bg-slate-100 text-slate-700 text-[10px] font-mono px-1.5 py-0.5 rounded">
                        ARN: {notif.metadata.arn}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {!notif.is_read && (
                      <button
                        type="button"
                        onClick={(e) => handleMarkAsRead(e, notif)}
                        title="Mark as read"
                        className="p-1 text-slate-400 hover:text-blue-600 rounded transition"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={(e) => handleDelete(e, notif.id)}
                      title="Dismiss"
                      className="p-1 text-slate-400 hover:text-rose-600 rounded transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-2.5 bg-slate-50/70 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                navigate(
                  user?.role === 'CA'
                    ? '/ca/dashboard'
                    : user?.role === 'ADMIN'
                    ? '/admin'
                    : '/dashboard'
                );
              }}
              className="text-[11px] font-bold text-slate-600 hover:text-slate-900 transition flex items-center justify-center gap-1 mx-auto"
            >
              Open Active Dashboard <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
