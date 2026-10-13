import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { RefreshCw, Users, ShieldCheck, Activity } from 'lucide-react';
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
    } catch {
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
    <div className="min-h-screen bg-[#F8F9FB] text-[#252B36] font-sans">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl p-5 border border-[#E5E7EB] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="bg-[#EFF8FF] text-[#155EEF] text-[10px] font-bold px-2 py-0.5 rounded border border-[#B2DDFF]">
              Platform Administration
            </span>
            <h1 className="text-xl sm:text-2xl font-bold mt-1 text-[#252B36]">
              System Operations & Compliance Analytics
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <NotificationBell />
            <Link
              to="/"
              className="px-3.5 py-2 rounded-lg bg-white hover:bg-[#F8F9FB] text-xs font-semibold flex items-center gap-1.5 border border-[#E5E7EB] text-[#252B36] transition"
            >
              ← Public Home
            </Link>
            <button
              onClick={fetchAdminData}
              className="px-3.5 py-2 rounded-lg bg-[#155EEF] hover:bg-[#1048C6] text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Analytics KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-white border border-[#E5E7EB] shadow-xs">
            <div className="text-[10px] uppercase font-bold text-[#667085] tracking-wider">Total Revenue (INR)</div>
            <div className="text-2xl font-bold text-[#027A48] mt-1">
              ₹{(analytics?.total_revenue_inr || 0).toLocaleString()}
            </div>
          </div>
          <div className="p-5 rounded-xl bg-white border border-[#E5E7EB] shadow-xs">
            <div className="text-[10px] uppercase font-bold text-[#667085] tracking-wider">Total Applications</div>
            <div className="text-2xl font-bold text-[#252B36] mt-1">{analytics?.total_applications || 0}</div>
          </div>
          <div className="p-5 rounded-xl bg-white border border-[#E5E7EB] shadow-xs">
            <div className="text-[10px] uppercase font-bold text-[#155EEF] tracking-wider">Registered Customers</div>
            <div className="text-2xl font-bold text-[#155EEF] mt-1">{analytics?.total_customers || 0}</div>
          </div>
          <div className="p-5 rounded-xl bg-white border border-[#E5E7EB] shadow-xs">
            <div className="text-[10px] uppercase font-bold text-[#667085] tracking-wider">Certified CAs</div>
            <div className="text-2xl font-bold text-[#252B36] mt-1">{analytics?.total_cas || 0}</div>
          </div>
        </div>

        {/* User Registry & Audit Logs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Users List */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
              <h3 className="font-bold text-sm text-[#252B36] flex items-center gap-2">
                <Users className="w-4 h-4 text-[#155EEF]" />
                <span>Platform Users</span>
              </h3>
              <span className="text-xs text-[#667085] font-medium">{users.length} Registered</span>
            </div>
            <div className="overflow-y-auto max-h-80 space-y-2">
              {users.length === 0 ? (
                <div className="text-xs text-[#667085] py-4 text-center">No platform users found.</div>
              ) : (
                users.map((u) => (
                  <div key={u.id} className="p-3 rounded-lg bg-[#F8F9FB] border border-[#E5E7EB] flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-[#252B36]">{u.full_name}</div>
                      <div className="text-[11px] text-[#667085]">{u.email} {u.phone ? `· +91 ${u.phone}` : ''}</div>
                    </div>
                    <span className={`font-semibold text-[10px] px-2 py-0.5 rounded border ${
                      u.role === 'ADMIN'
                        ? 'bg-[#FEF0C7] text-[#B54708] border-[#FEDF89]'
                        : u.role === 'CA'
                        ? 'bg-[#EFF8FF] text-[#155EEF] border-[#B2DDFF]'
                        : 'bg-white text-[#252B36] border-[#E5E7EB]'
                    }`}>
                      {u.role}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* System Audit Logs */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
              <h3 className="font-bold text-sm text-[#252B36] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#027A48]" />
                <span>Security & Regulatory Audit Logs</span>
              </h3>
              <span className="text-xs text-[#667085] font-medium">{auditLogs.length} Entries</span>
            </div>
            <div className="overflow-y-auto max-h-80 space-y-2 text-xs">
              {auditLogs.length === 0 ? (
                <div className="text-xs text-[#667085] py-4 text-center">No system audit logs recorded.</div>
              ) : (
                auditLogs.map((log) => (
                  <div key={log.id} className="p-3 rounded-lg bg-[#F8F9FB] border border-[#E5E7EB] space-y-1">
                    <div className="flex items-center justify-between font-medium text-[#252B36]">
                      <span className="text-[#155EEF] font-mono text-[11px] font-semibold">{log.action}</span>
                      <span className="text-[10px] text-[#667085]">{new Date(log.created_at).toLocaleTimeString('en-IN')}</span>
                    </div>
                    <div className="text-[11px] text-[#667085]">
                      Actor: <span className="font-medium text-[#252B36]">{log.actor_role}</span> ({log.actor_id}) on <span className="font-medium text-[#252B36]">{log.resource_type}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
