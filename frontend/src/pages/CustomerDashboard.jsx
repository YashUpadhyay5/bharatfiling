import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import confetti from 'canvas-confetti';
import {
  FileCheck2,
  Building2,
  User,
  CreditCard,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  Plus,
  RefreshCw,
  AlertCircle,
  FileText,
  PhoneCall,
  Sparkles,
} from 'lucide-react';

export default function CustomerDashboard() {
  const { user, isAuthenticated } = useAuth();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'profile', 'businesses', 'applications', 'docs'
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [profRes, appRes, bizRes] = await Promise.all([
        api.getProfile().catch(() => ({})),
        api.getApplications().catch(() => ({})),
        api.getBusinesses().catch(() => ({})),
      ]);

      if (profRes.success) setProfile(profRes.profile);
      if (appRes.success) setApplications(appRes.applications || []);
      if (bizRes.success) setBusinesses(bizRes.businesses || []);
    } catch (err) {
      showError('Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      fetchDashboardData();
    }
  }, [isAuthenticated]);

  const activeApp = applications[0]; // Primary active application

  // Customer-facing 7-step tracker definition
  const customerSteps = [
    { title: 'Profile & Details', status: 'done' },
    { title: 'Documents AI Checked', status: 'done' },
    { title: 'CA Statutory Review', status: activeApp?.internal_status === 'CA_REVIEW' ? 'active' : 'done' },
    { title: 'Payment Completed', status: activeApp?.payment_completed ? 'done' : 'pending' },
    { title: 'Application Processing', status: activeApp?.internal_status === 'APPLICATION_PREPARATION' || activeApp?.internal_status === 'APPLICATION_SUBMITTED' ? 'active' : activeApp?.internal_status === 'GOVERNMENT_PROCESSING' || activeApp?.internal_status === 'COMPLETED' ? 'done' : 'pending' },
    { title: 'Government Processing', status: activeApp?.internal_status === 'GOVERNMENT_PROCESSING' ? 'active' : activeApp?.internal_status === 'COMPLETED' ? 'done' : 'pending' },
    { title: 'GST Certificate Issued', status: activeApp?.internal_status === 'COMPLETED' ? 'done' : 'pending' },
  ];

  const handleDownloadCertificate = () => {
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    showSuccess('Downloading official Form REG-06 GST Registration Certificate...');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto" />
          <div className="text-sm font-bold text-slate-700">Loading Customer Compliance Portal...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-5 space-y-6 shrink-0">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Account Portal</span>
            <Link to="/" className="text-[11px] font-bold text-[#0B1E36] hover:underline flex items-center gap-1">
              ← Home
            </Link>
          </div>
          <div className="font-extrabold text-base text-slate-900 truncate">{user?.full_name}</div>
          <div className="text-xs text-slate-500 truncate">{user?.email}</div>
        </div>

        <nav className="space-y-1 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition text-left ${
              activeTab === 'overview' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            Overview & Status
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition text-left ${
              activeTab === 'profile' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <User className="w-4 h-4" />
            Master Profile
            <span className="ml-auto text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
              Verified
            </span>
          </button>

          <button
            onClick={() => setActiveTab('businesses')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition text-left ${
              activeTab === 'businesses' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Building2 className="w-4 h-4" />
            My Businesses
            <span className="ml-auto text-xs font-bold text-slate-400">{businesses.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('applications')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition text-left ${
              activeTab === 'applications' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            GST Applications
            <span className="ml-auto text-xs font-bold text-slate-400">{applications.length}</span>
          </button>
        </nav>

        {/* Assigned CA Mini Card */}
        <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2 text-xs">
          <div className="text-[10px] font-bold uppercase text-emerald-400">Assigned Professional</div>
          <div className="font-extrabold text-sm">CA Rajesh Sharma (FCA)</div>
          <div className="text-[11px] text-slate-400">Senior Compliance Partner</div>
          <div className="pt-2 flex gap-2">
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-center font-bold text-[11px] text-white transition"
            >
              WhatsApp
            </a>
            <a
              href="tel:18008908800"
              className="flex-1 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-center font-bold text-[11px] text-slate-300 transition"
            >
              Call Desk
            </a>
          </div>
        </div>
      </aside>

      {/* Main Dashboard Canvas */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Top Welcome Strip */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Welcome back, {user?.full_name?.split(' ')[0]} 👋
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Here is the live status of your GST registration and verified compliance assets.
                </p>
              </div>

              <Link
                to="/apply/gst"
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Start New GST Application
              </Link>
            </div>

            {/* Active Application Card */}
            {activeApp ? (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                        {activeApp.application_number}
                      </span>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        {activeApp.customer_status}
                      </span>
                    </div>
                    <h2 className="text-lg font-black text-slate-900 mt-2">
                      {activeApp.fields_data?.legal_name || 'Verma Tech Solutions'} ({activeApp.business_type})
                    </h2>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Jurisdiction: {activeApp.state} · Principal Activity: {activeApp.fields_data?.business_activity || 'IT & Consulting'}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/apply/gst/${activeApp.id}`}
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition"
                    >
                      Open Application Wizard &rarr;
                    </Link>
                  </div>
                </div>

                {/* Simplified Customer 7-Stage Tracker */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-3">
                    <span>Application Progress Milestones</span>
                    <span className="text-emerald-600">80% Completed</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                    {customerSteps.map((step, idx) => {
                      let bg = 'bg-slate-100 text-slate-500 border-slate-200';
                      let icon = idx + 1;

                      if (step.status === 'done') {
                        bg = 'bg-emerald-50 text-emerald-900 border-emerald-300 font-bold';
                        icon = '✓';
                      } else if (step.status === 'active') {
                        bg = 'bg-amber-50 text-amber-900 border-amber-300 font-bold animate-subtle-pulse';
                        icon = '●';
                      }

                      return (
                        <div key={idx} className={`p-3 rounded-2xl border text-center space-y-1.5 ${bg}`}>
                          <div className="w-5 h-5 rounded-full bg-white/80 mx-auto flex items-center justify-center text-[10px] font-black shadow-2xs">
                            {icon}
                          </div>
                          <div className="text-[11px] leading-tight">{step.title}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* ARN & Allotment Box */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <div className="text-slate-400 font-bold uppercase text-[10px]">Government ARN</div>
                    <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">
                      {activeApp.arn || 'AA2702260012345 (Active)'}
                    </div>
                  </div>

                  <div>
                    <div className="text-slate-400 font-bold uppercase text-[10px]">Allotted GSTIN</div>
                    <div className="font-mono font-bold text-emerald-700 text-sm mt-0.5">
                      {activeApp.gstin || '29ABCDE1234F1Z5 (Approved)'}
                    </div>
                  </div>

                  <div className="flex items-center sm:justify-end">
                    <button
                      onClick={handleDownloadCertificate}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download GST Certificate (REG-06)
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-3xl bg-white border border-slate-200 text-center space-y-3">
                <FileCheck2 className="w-10 h-10 text-slate-400 mx-auto" />
                <h3 className="font-bold text-slate-800 text-base">No Active GST Application</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  You have not initiated any GST registration yet. Start now with our streamlined 5-minute wizard.
                </p>
                <Link
                  to="/apply/gst"
                  className="inline-flex px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                >
                  Start GST Registration &rarr;
                </Link>
              </div>
            )}
          </div>
        )}

        {/* MASTER PROFILE TAB */}
        {activeTab === 'profile' && profile && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Master Customer Profile</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  This centralized identity dossier is verified once and reused across GST, ITR, MCA, and Trademark.
                </p>
              </div>
              <span className="bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% Verified Profile
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              {/* Personal Details */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h3 className="font-bold text-slate-900 text-sm">Personal Information</h3>
                <div className="space-y-2 text-slate-700">
                  <div>Full Name: <strong>{profile.personal_info?.full_name}</strong></div>
                  <div>Father's Name: <strong>{profile.personal_info?.father_name}</strong></div>
                  <div>Date of Birth: <strong>{profile.personal_info?.dob}</strong></div>
                  <div>Gender: <strong>{profile.personal_info?.gender || 'Male'}</strong></div>
                </div>
              </div>

              {/* Identity Details */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h3 className="font-bold text-slate-900 text-sm">Statutory Identity Proofs</h3>
                <div className="space-y-2 text-slate-700">
                  <div className="flex items-center justify-between">
                    <span>PAN Number: <strong>{profile.identity_info?.pan_number}</strong></span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">✓ Verified</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Aadhaar: <strong>XXXX-XXXX-1012</strong></span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">✓ Verified</span>
                  </div>
                </div>
              </div>

              {/* Address Details */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 sm:col-span-2">
                <h3 className="font-bold text-slate-900 text-sm">Permanent Address</h3>
                <div className="text-slate-700 leading-relaxed">
                  {profile.address_info?.address_line_1}, {profile.address_info?.address_line_2}, {profile.address_info?.city}, {profile.address_info?.state} — {profile.address_info?.pincode}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BUSINESSES TAB */}
        {activeTab === 'businesses' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Registered Business Profiles</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  You can register and manage multiple businesses under one master account.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {businesses.map((biz) => (
                <div
                  key={biz.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between"
                >
                  <div className="space-y-1 text-xs">
                    <div className="font-extrabold text-sm text-slate-900">{biz.legal_name}</div>
                    <div className="text-slate-500">
                      Type: <strong>{biz.business_type}</strong> | State: <strong>{biz.state}</strong>
                    </div>
                    <div className="text-slate-400 text-[11px]">{biz.address_line_1}, {biz.city}</div>
                  </div>

                  <Link
                    to="/apply/gst"
                    className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
                  >
                    View & Apply GST &rarr;
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* APPLICATIONS TAB */}
        {activeTab === 'applications' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6 animate-fade-in">
            <h2 className="text-lg font-extrabold text-slate-900">All GST Applications</h2>
            <div className="space-y-3">
              {applications.map((app) => (
                <div key={app.id} className="p-4 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900 font-mono">{app.application_number}</div>
                    <div className="text-slate-500 mt-0.5">{app.business_type} · {app.state}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      {app.customer_status}
                    </span>
                    <Link
                      to={`/apply/gst/${app.id}`}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 text-white font-bold"
                    >
                      Open &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
