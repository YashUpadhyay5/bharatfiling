import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { ShieldCheck, Users, CreditCard, Activity, RefreshCw, Clock } from 'lucide-react';
import NotificationBell from '../components/common/NotificationBell.jsx';

export default function AdminDashboardPage() {
  const { user, isAdmin, isAuthenticated, loading: authLoading } = useAuth();
  const { showError } = useToast();
  const navigate = useNavigate();

  const [analytics, setAnalytics] = useState(null);
  const [users, setUsers] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const [anaRes, userRes, logRes] = await Promise.all([
        api.getAdminAnalytics().catch(() => ({})),
        api.getAdminUsers().catch(() => ({})),
        api.getAdminAuditLogs().catch(() => ({})),
      ]);

      if (anaRes.success) setAnalytics(anaRes.analytics);
      if (userRes.success) setUsers(userRes.users || []);
      if (logRes.success) setAuditLogs(logRes.logs || []);
    } catch (err) {
      showError('Failed to load admin analytics.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading && !user) return;
    if (!isAuthenticated) {
      navigate('/login?redirect=/admin', { replace: true });
      return;
    }
    if (!isAdmin && user?.role !== 'ADMIN') {
      navigate('/dashboard', { replace: true });
      return;
    }
    fetchAdminData();
  }, [authLoading, isAuthenticated, user, isAdmin]);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <span className="bg-blue-500/20 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-500/30">
              System Administration
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold mt-1">Platform Operations & Analytics</h1>
          </div>
          <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
            <NotificationBell />
            <Link
              to="/"
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold flex items-center gap-1.5 border border-slate-700 text-slate-300 hover:text-white transition"
            >
              ← Public Home
            </Link>
            <button
              onClick={fetchAdminData}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold flex items-center gap-2 border border-slate-700 transition cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </button>
          </div>
        </div>

        {/* Analytics KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Revenue (INR)</div>
            <div className="text-lg sm:text-2xl font-extrabold text-emerald-400 mt-1 break-all">
              ₹{(analytics?.total_revenue_inr || 0).toLocaleString()}
            </div>
          </div>
          <div className="p-3.5 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Applications</div>
            <div className="text-lg sm:text-2xl font-extrabold text-white mt-1">{analytics?.total_applications || 0}</div>
          </div>
          <div className="p-3.5 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Registered Customers</div>
            <div className="text-lg sm:text-2xl font-extrabold text-blue-400 mt-1">{analytics?.total_customers || 0}</div>
          </div>
          <div className="p-3.5 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Certified CAs</div>
            <div className="text-lg sm:text-2xl font-extrabold text-amber-400 mt-1">{analytics?.total_cas || 0}</div>
          </div>
        </div>

        {/* User Registry & Audit Logs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Users List */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 sm:p-5 space-y-3">
            <h3 className="font-bold text-sm text-white">Platform Users</h3>
            <div className="overflow-y-auto max-h-80 space-y-2">
              {users.map((u) => (
                <div key={u.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-white truncate">{u.full_name}</div>
                    <div className="text-[11px] text-slate-400 truncate">{u.email} · {u.phone}</div>
                  </div>
                  <span className="font-bold text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 shrink-0">
                    {u.role}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* System Audit Logs */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 sm:p-5 space-y-3">
            <h3 className="font-bold text-sm text-white">Security & Regulatory Audit Logs</h3>
            <div className="overflow-y-auto max-h-80 space-y-2 text-xs">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between font-bold text-white flex-wrap gap-1">
                    <span className="text-emerald-400 font-mono text-[11px] break-all">{log.action}</span>
                    <span className="text-[10px] text-slate-500 shrink-0">{new Date(log.created_at).toLocaleTimeString()}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 break-words">
                    Actor: {log.actor_role} ({log.actor_id}) on {log.resource_type}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
