import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { useSocket } from '../context/SocketContext.jsx';
import confetti from 'canvas-confetti';
import {
  FileCheck2,
  Building2,
  User,
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
  Briefcase,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

export default function CustomerDashboard() {
  const { user, isAuthenticated } = useAuth();
  const { showSuccess, showError } = useToast();
  const { socket, joinApplication, joinUser } = useSocket();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'profile', 'businesses', 'applications'
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppIndex, setSelectedAppIndex] = useState(0);

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
      return;
    }
    // Route Chartered Accountants to specialized CA workbench
    if (user?.role === 'CA') {
      navigate('/ca/dashboard', { replace: true });
      return;
    }
    if (user?.role === 'ADMIN') {
      navigate('/admin', { replace: true });
      return;
    }
    fetchDashboardData();
  }, [isAuthenticated, user]);

  const activeApp = applications[selectedAppIndex] || applications[0];
  const moduleType = activeApp?.module_type || 'GST';

  // Real-Time Socket.IO Synchronization with CA Desk
  useEffect(() => {
    if (user?.id) {
      joinUser(user.id);
    }
    if (activeApp?.id) {
      joinApplication(activeApp.id);
    }

    if (socket) {
      const handleStatusUpdated = (data) => {
        if (!activeApp || data.application_id === activeApp.id) {
          showSuccess(`⚡ Live Update from CA: ${data.customer_status || 'Application Updated'}`);
          setApplications((prev) =>
            prev.map((app) =>
              app.id === data.application_id
                ? {
                    ...app,
                    internal_status: data.internal_status,
                    customer_status: data.customer_status,
                    arn: data.arn || app.arn,
                    gstin: data.gstin || app.gstin,
                    certificate_url: data.certificate_url || app.certificate_url,
                  }
                : app
            )
          );
        }
      };

      const handleCertificateDispatched = (data) => {
        if (!activeApp || data.application_id === activeApp.id) {
          confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
          showSuccess('🎉 Congratulations! Your Official Statutory Registration Certificate has been issued!');
          setApplications((prev) =>
            prev.map((app) =>
              app.id === data.application_id
                ? {
                    ...app,
                    internal_status: 'COMPLETED',
                    customer_status: 'Completed',
                    gstin: data.gstin || app.gstin,
                    certificate_url: data.certificate_url || '/sample_gst_certificate.pdf',
                  }
                : app
            )
          );
        }
      };

      socket.on('application:status_updated', handleStatusUpdated);
      socket.on('certificate:dispatched', handleCertificateDispatched);

      return () => {
        socket.off('application:status_updated', handleStatusUpdated);
        socket.off('certificate:dispatched', handleCertificateDispatched);
      };
    }
  }, [socket, activeApp?.id, user?.id]);

  // Stage milestone resolution tailored per module
  const getStep2Info = () => {
    switch (moduleType) {
      case 'COMPANY':
        return { title: '2. Dossier Verified by CA', desc: 'SPICe+ Incorporation Prepared' };
      case 'ITR':
        return { title: '2. Financials Verified by CA', desc: 'Tax Computation Form Prepared' };
      case 'TRADEMARK':
        return { title: '2. Search & Legal Prep', desc: 'Form TM-A Dossier Prepared' };
      case 'LLP':
        return { title: '2. Partner KYC Verified', desc: 'FiLLiP Incorporation Prepared' };
      default:
        return { title: '2. Documents Verified by CA', desc: 'Form REG-01 Prepared' };
    }
  };

  const getStep3Info = () => {
    switch (moduleType) {
      case 'COMPANY':
        return {
          title: '3. Submitted to MCA',
          desc: activeApp?.arn ? `SRN: ${activeApp.arn}` : 'ROC Corporate Verification',
        };
      case 'ITR':
        return {
          title: '3. E-Filed on IT Portal',
          desc: activeApp?.arn ? `Ack No: ${activeApp.arn}` : 'Centralized CPC Processing',
        };
      case 'TRADEMARK':
        return {
          title: '3. Filed on IP India',
          desc: activeApp?.arn ? `TM App: ${activeApp.arn}` : 'Trade Marks Registry Processing',
        };
      case 'LLP':
        return {
          title: '3. Filed on MCA Portal',
          desc: activeApp?.arn ? `SRN: ${activeApp.arn}` : 'Corporate Affairs Verification',
        };
      default:
        return {
          title: '3. Submitted to Govt (ARN)',
          desc: activeApp?.arn ? `ARN: ${activeApp.arn}` : 'Official Tax Officer Verification',
        };
    }
  };

  const getStep4Info = () => {
    switch (moduleType) {
      case 'COMPANY':
        return {
          title: '4. Certificate Ready',
          desc: activeApp?.gstin ? `CIN: ${activeApp.gstin}` : 'COI Allotment Pending',
        };
      case 'ITR':
        return {
          title: '4. Assessment Completed',
          desc: activeApp?.gstin ? `Order: ${activeApp.gstin}` : 'ITR-V Delivery Pending',
        };
      case 'TRADEMARK':
        return {
          title: '4. TM Registered',
          desc: activeApp?.gstin ? `Reg No: ${activeApp.gstin}` : 'TM Certificate Pending',
        };
      case 'LLP':
        return {
          title: '4. LLPIN Allotted',
          desc: activeApp?.gstin ? `LLPIN: ${activeApp.gstin}` : 'COI Delivery Pending',
        };
      default:
        return {
          title: '4. Certificate Ready',
          desc: activeApp?.gstin ? `GSTIN: ${activeApp.gstin}` : 'Form REG-06 Allotted',
        };
    }
  };

  const step2Info = getStep2Info();
  const step3Info = getStep3Info();
  const step4Info = getStep4Info();

  const customerSteps = [
    {
      title: '1. Application & Payment',
      desc: 'Order Confirmed & Logged',
      status: 'done',
    },
    {
      title: step2Info.title,
      desc: step2Info.desc,
      status:
        activeApp?.internal_status === 'CA_REVIEW' ||
        activeApp?.internal_status === 'PAYMENT_CONFIRMED'
          ? 'active'
          : activeApp?.internal_status === 'DOCUMENTS_VERIFIED' ||
            activeApp?.internal_status === 'APPLICATION_PREPARATION' ||
            activeApp?.internal_status === 'GOVERNMENT_PROCESSING' ||
            activeApp?.internal_status === 'GOVERNMENT_APPROVED' ||
            activeApp?.internal_status === 'COMPLETED'
          ? 'done'
          : 'pending',
    },
    {
      title: step3Info.title,
      desc: step3Info.desc,
      status:
        activeApp?.internal_status === 'GOVERNMENT_PROCESSING'
          ? 'active'
          : activeApp?.internal_status === 'GOVERNMENT_APPROVED' ||
            activeApp?.internal_status === 'COMPLETED'
          ? 'done'
          : 'pending',
    },
    {
      title: step4Info.title,
      desc: step4Info.desc,
      status: activeApp?.internal_status === 'COMPLETED' ? 'done' : 'pending',
    },
  ];

  const handleDownloadCertificate = (targetApp = activeApp) => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    showSuccess('Downloading official statutory registration certificate...');

    const certUrl = targetApp?.certificate_url || '/sample_gst_certificate.pdf';
    const link = document.createElement('a');
    link.href = certUrl;
    link.target = '_blank';
    const type = targetApp?.module_type || 'GST';
    const prefix =
      type === 'COMPANY'
        ? 'MCA_COI'
        : type === 'ITR'
        ? 'ITR_V_ACK'
        : type === 'TRADEMARK'
        ? 'TM_CERT'
        : type === 'LLP'
        ? 'LLP_COI'
        : 'GST_REG06';
    link.download = `${prefix}_${targetApp?.gstin || targetApp?.application_number || 'Certificate'}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getModuleBadge = (mod) => {
    switch (mod) {
      case 'COMPANY':
        return { label: 'MCA Company', color: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'ITR':
        return { label: 'Income Tax', color: 'bg-amber-50 text-amber-700 border-amber-200' };
      case 'TRADEMARK':
        return { label: 'Trademark IP', color: 'bg-purple-50 text-purple-700 border-purple-200' };
      case 'LLP':
        return { label: 'MCA LLP', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
      default:
        return { label: 'GST Filing', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
        <div className="text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-slate-700 animate-spin mx-auto" />
          <div className="text-sm font-semibold text-slate-700">Loading Client Compliance Workspace...</div>
        </div>
      </div>
    );
  }

  const activeCount = applications.filter((a) => a.internal_status !== 'COMPLETED').length;
  const completedCount = applications.filter(
    (a) => a.internal_status === 'COMPLETED' || a.certificate_url || a.gstin
  ).length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row text-slate-800">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-5 space-y-6 shrink-0 flex flex-col justify-between">
        <div className="space-y-6">
          {/* User Account Snapshot */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Client Workspace</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                Active
              </span>
            </div>
            <div>
              <div className="font-extrabold text-sm text-slate-900 truncate">{user?.full_name || 'Client'}</div>
              <div className="text-xs text-slate-500 truncate">{user?.email}</div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition text-left cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-slate-900 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <FileCheck2 className="w-4 h-4" />
              Overview & Status
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition text-left cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-slate-900 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <User className="w-4 h-4" />
              Master Profile
              <span className="ml-auto text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold px-1.5 py-0.5 rounded">
                Verified
              </span>
            </button>

            <button
              onClick={() => setActiveTab('businesses')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition text-left cursor-pointer ${
                activeTab === 'businesses'
                  ? 'bg-slate-900 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4" />
              Registered Entities
              <span className="ml-auto text-xs font-bold text-slate-400">{businesses.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('applications')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition text-left cursor-pointer ${
                activeTab === 'applications'
                  ? 'bg-slate-900 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              Statutory Filings
              <span className="ml-auto text-xs font-bold text-slate-400">{applications.length}</span>
            </button>
          </nav>
        </div>

        {/* Assigned CA Advisory Desk Box */}
        <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Assigned Professional</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          </div>
          <div>
            <div className="font-extrabold text-sm text-white">
              {activeApp?.assigned_ca_name || 'Senior CA Review Team'}
            </div>
            <div className="text-[11px] text-slate-400">ICAI Statutory Compliance Desk</div>
          </div>
          <div className="pt-1 flex gap-2">
            <a
              href="https://wa.me/9118008908800"
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-center font-bold text-[11px] text-white transition"
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

      {/* Main Workspace Canvas */}
      <main className="flex-1 p-5 sm:p-7 lg:p-9 max-w-7xl w-full mx-auto space-y-6">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Top Workspace Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white font-black text-base flex items-center justify-center shadow-xs relative shrink-0">
                  {user?.full_name
                    ? user.full_name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)
                        .toUpperCase()
                    : 'BF'}
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white"></span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      {user?.full_name || 'Client Workspace'}
                    </h1>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Client ID:{' '}
                    <span className="font-mono text-slate-700 font-semibold">
                      {user?.id ? user.id.slice(-8).toUpperCase() : 'BF-CLIENT'}
                    </span>{' '}
                    · Centralized Statutory Compliance Portal
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link
                  to="/services"
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Start New Filing
                </Link>
                <a
                  href="https://wa.me/9118008908800"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-200 shadow-2xs transition flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-600" /> CA Desk
                </a>
              </div>
            </div>

            {/* Executive Metric Cards Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Active Filings</span>
                  <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="text-2xl font-black text-slate-900">{activeCount}</div>
                <div className="text-[11px] text-slate-500">Under active CA processing</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Certificates Issued
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="text-2xl font-black text-slate-900">{completedCount}</div>
                <div className="text-[11px] text-emerald-700 font-medium">Verified regulatory credentials</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Dedicated CA</span>
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="text-sm font-extrabold text-slate-900 truncate">
                  {activeApp?.assigned_ca_name || 'Senior CA Review Team'}
                </div>
                <div className="text-[11px] text-slate-500">ICAI Fellow Chartered Accountant</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Standing</span>
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <FileCheck2 className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="text-sm font-extrabold text-emerald-700 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 100% Good Standing
                </div>
                <div className="text-[11px] text-slate-500">Statutory KYC compliant</div>
              </div>
            </div>

            {/* Active Case Tracker OR Clean Empty Workspace */}
            {activeApp ? (
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs space-y-6">
                {/* Multi-App Selector Tabs */}
                {applications.length > 1 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0">
                      Filings ({applications.length}):
                    </span>
                    {applications.map((app, idx) => {
                      const badge = getModuleBadge(app.module_type);
                      return (
                        <button
                          key={app.id || idx}
                          onClick={() => setSelectedAppIndex(idx)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shrink-0 ${
                            selectedAppIndex === idx
                              ? 'bg-slate-900 text-white shadow-xs'
                              : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <span
                            className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-black border ${badge.color}`}
                          >
                            {app.module_type || 'GST'}
                          </span>
                          <span className="font-mono text-[11px]">{app.application_number}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Active Case Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {activeApp.application_number}
                      </span>
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                          getModuleBadge(activeApp.module_type).color
                        }`}
                      >
                        {getModuleBadge(activeApp.module_type).label}
                      </span>
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        {activeApp.customer_status}
                      </span>
                    </div>
                    <h2 className="text-lg font-black text-slate-900">
                      {activeApp.service_name ||
                        activeApp.fields_data?.legal_name ||
                        activeApp.business_type ||
                        'Statutory Compliance Case'}
                    </h2>
                    <div className="text-xs text-slate-500">
                      Jurisdiction: <span className="font-semibold text-slate-700">{activeApp.state}</span> · Registered
                      Applicant: <span className="font-semibold text-slate-700">{user?.full_name}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Assigned to CA Partner Desk
                    </span>
                  </div>
                </div>

                {/* 4-Stage Live Statutory Progress Bar */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <div className="flex items-center gap-2">
                      <span>Statutory Filing Milestones</span>
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                        Live Sync Active
                      </span>
                    </div>
                    <span className="text-emerald-700 font-extrabold">
                      {activeApp.internal_status === 'COMPLETED'
                        ? '100% Completed'
                        : activeApp.internal_status === 'GOVERNMENT_APPROVED'
                        ? '85% In Progress'
                        : activeApp.internal_status === 'GOVERNMENT_PROCESSING'
                        ? '65% In Progress'
                        : activeApp.internal_status === 'DOCUMENTS_VERIFIED' ||
                          activeApp.internal_status === 'APPLICATION_PREPARATION' ||
                          activeApp.internal_status === 'CA_REVIEW'
                        ? '40% In Progress'
                        : '25% Initiated'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {customerSteps.map((step, idx) => {
                      let bg = 'bg-slate-50 text-slate-500 border-slate-200';
                      let icon = idx + 1;

                      if (step.status === 'done') {
                        bg = 'bg-emerald-50/70 text-emerald-950 border-emerald-300 font-bold';
                        icon = '✓';
                      } else if (step.status === 'active') {
                        bg = 'bg-amber-50 text-amber-950 border-amber-300 font-bold animate-pulse';
                        icon = '⏳';
                      }

                      return (
                        <div key={idx} className={`p-3.5 rounded-2xl border text-center space-y-1.5 transition ${bg}`}>
                          <div className="w-6 h-6 rounded-full bg-white mx-auto flex items-center justify-center text-xs font-black shadow-2xs">
                            {icon}
                          </div>
                          <div className="text-xs font-bold leading-tight">{step.title}</div>
                          <div className="text-[10px] opacity-75">{step.desc}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Government Reference & Certificate Download Strip */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs items-center">
                  <div>
                    <div className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                      {moduleType === 'COMPANY'
                        ? 'Corporate SRN'
                        : moduleType === 'ITR'
                        ? 'ITD Ack No'
                        : moduleType === 'TRADEMARK'
                        ? 'TM Application No'
                        : moduleType === 'LLP'
                        ? 'FiLLiP SRN'
                        : 'Government ARN'}
                    </div>
                    <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">
                      {activeApp.arn ? (
                        <span className="text-emerald-700">{activeApp.arn}</span>
                      ) : (
                        <span className="text-slate-400 font-normal italic">Generated upon submission</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                      {moduleType === 'COMPANY'
                        ? 'Corporate CIN'
                        : moduleType === 'ITR'
                        ? 'Assessment Ref'
                        : moduleType === 'TRADEMARK'
                        ? 'Registered TM No'
                        : moduleType === 'LLP'
                        ? 'Allotted LLPIN'
                        : 'Allotted GSTIN'}
                    </div>
                    <div className="font-mono font-bold text-sm mt-0.5">
                      {activeApp.gstin ? (
                        <span className="text-emerald-700 font-black">{activeApp.gstin}</span>
                      ) : (
                        <span className="text-slate-400 font-normal italic">Issued upon final approval</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center sm:justify-end">
                    <button
                      onClick={() => handleDownloadCertificate(activeApp)}
                      disabled={
                        activeApp.internal_status !== 'COMPLETED' && !activeApp.certificate_url && !activeApp.gstin
                      }
                      className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-2xs transition ${
                        activeApp.internal_status === 'COMPLETED' || activeApp.certificate_url || activeApp.gstin
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer active:scale-95 shadow-xs'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <Download className="w-4 h-4" />
                      <span>
                        {moduleType === 'COMPANY'
                          ? 'Download Certificate (COI)'
                          : moduleType === 'ITR'
                          ? 'Download ITR-V Ack'
                          : moduleType === 'TRADEMARK'
                          ? 'Download TM Certificate'
                          : moduleType === 'LLP'
                          ? 'Download LLP Certificate'
                          : 'Download GST Certificate (REG-06)'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Clean, Minimalist Enterprise Empty State */
              <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-2xs text-center space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-700 mx-auto flex items-center justify-center border border-slate-200">
                  <Briefcase className="w-7 h-7" />
                </div>
                <div className="max-w-md mx-auto space-y-2">
                  <h3 className="text-lg font-black text-slate-900 tracking-tight">
                    No Active Statutory Filings in Progress
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Your statutory compliance docket is currently up to date with zero pending actions. You can launch
                    any new filing, corporate registration, or license application directly from the{' '}
                    <strong className="text-slate-700">Services</strong> navigation bar above.
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
                  <Link
                    to="/services"
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-2xs transition flex items-center gap-1.5"
                  >
                    <span>Browse All Services</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}

            {/* Universal Statutory Compliance Docket Table */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-600" />
                    Statutory Filings Docket
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Official record of statutory applications across GST, MCA, Income Tax, and Trademark.
                  </p>
                </div>
                <div className="text-xs text-slate-400 font-semibold">
                  Showing {applications.length} {applications.length === 1 ? 'record' : 'records'}
                </div>
              </div>

              {applications.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] tracking-wider">
                        <th className="py-3 px-3">Service & Filing</th>
                        <th className="py-3 px-3">Application Ref</th>
                        <th className="py-3 px-3">Jurisdiction</th>
                        <th className="py-3 px-3">Stage / Status</th>
                        <th className="py-3 px-3">Govt Ref (ARN/SRN)</th>
                        <th className="py-3 px-3">Allotted Credential</th>
                        <th className="py-3 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {applications.map((app, idx) => {
                        const badge = getModuleBadge(app.module_type);
                        const isCertReady =
                          app.internal_status === 'COMPLETED' || app.certificate_url || app.gstin;

                        return (
                          <tr key={app.id || idx} className="hover:bg-slate-50/70 transition">
                            <td className="py-3.5 px-3">
                              <div className="font-bold text-slate-900">
                                {app.service_name || app.business_type || 'Statutory Filing'}
                              </div>
                              <span
                                className={`inline-block text-[9px] uppercase font-bold px-1.5 py-0.2 rounded border mt-0.5 ${badge.color}`}
                              >
                                {badge.label}
                              </span>
                            </td>
                            <td className="py-3.5 px-3 font-mono font-bold text-slate-800">
                              {app.application_number}
                            </td>
                            <td className="py-3.5 px-3 text-slate-600">{app.state || 'India (Central)'}</td>
                            <td className="py-3.5 px-3">
                              <span className="inline-block text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                                {app.customer_status || 'Under Review'}
                              </span>
                            </td>
                            <td className="py-3.5 px-3 font-mono text-slate-600">
                              {app.arn ? <span className="font-bold text-slate-900">{app.arn}</span> : '—'}
                            </td>
                            <td className="py-3.5 px-3 font-mono text-slate-600">
                              {app.gstin ? (
                                <span className="font-bold text-emerald-700">{app.gstin}</span>
                              ) : (
                                '—'
                              )}
                            </td>
                            <td className="py-3.5 px-3 text-right">
                              {isCertReady ? (
                                <button
                                  onClick={() => handleDownloadCertificate(app)}
                                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs transition cursor-pointer border border-emerald-200"
                                >
                                  <Download className="w-3.5 h-3.5" /> Certificate
                                </button>
                              ) : (
                                <button
                                  onClick={() => setSelectedAppIndex(idx)}
                                  className="inline-flex items-center gap-1 text-slate-700 hover:text-slate-900 font-bold text-xs cursor-pointer"
                                >
                                  <span>View Stage</span>
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-8 text-center text-xs text-slate-400">
                  No statutory records recorded in this account yet. Use the top navigation menu to initiate a new
                  filing.
                </div>
              )}
            </div>
          </div>
        )}

        {/* MASTER PROFILE TAB */}
        {activeTab === 'profile' && profile && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Master Compliance Profile</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Verified statutory identity reused across GST, ITR, MCA Company, and Trademark filings.
                </p>
              </div>
              <span className="bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% Verified Profile
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              {/* Personal Details */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h3 className="font-bold text-slate-900 text-sm">Personal Information</h3>
                <div className="space-y-2 text-slate-700">
                  <div>
                    Full Name: <strong>{profile.personal_info?.full_name}</strong>
                  </div>
                  <div>
                    Father's Name: <strong>{profile.personal_info?.father_name}</strong>
                  </div>
                  <div>
                    Date of Birth: <strong>{profile.personal_info?.dob}</strong>
                  </div>
                  <div>
                    Gender: <strong>{profile.personal_info?.gender || 'Male'}</strong>
                  </div>
                </div>
              </div>

              {/* Identity Details */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h3 className="font-bold text-slate-900 text-sm">Statutory Identity Proofs</h3>
                <div className="space-y-2 text-slate-700">
                  <div className="flex items-center justify-between">
                    <span>
                      PAN Number: <strong>{profile.identity_info?.pan_number}</strong>
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                      ✓ Verified
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>
                      Aadhaar: <strong>XXXX-XXXX-1012</strong>
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                      ✓ Verified
                    </span>
                  </div>
                </div>
              </div>

              {/* Address Details */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 sm:col-span-2">
                <h3 className="font-bold text-slate-900 text-sm">Permanent Registered Address</h3>
                <div className="text-slate-700 leading-relaxed">
                  {profile.address_info?.address_line_1}, {profile.address_info?.address_line_2},{' '}
                  {profile.address_info?.city}, {profile.address_info?.state} — {profile.address_info?.pincode}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* REGISTERED BUSINESSES TAB */}
        {activeTab === 'businesses' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Registered Business Entities</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Manage multiple legal entities and their respective statutory compliance under one master login.
                </p>
              </div>
            </div>

            {businesses.length > 0 ? (
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
                      <div className="text-slate-400 text-[11px]">
                        {biz.address_line_1}, {biz.city}
                      </div>
                    </div>

                    <Link
                      to="/services"
                      className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition"
                    >
                      File Compliance &rarr;
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-slate-400">
                No registered business entities found. Initiate a new business registration from the Services menu.
              </div>
            )}
          </div>
        )}

        {/* ALL APPLICATIONS TAB */}
        {activeTab === 'applications' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">All Statutory Filings</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Complete audit ledger of all corporate, tax, and intellectual property applications.
                </p>
              </div>
              <Link
                to="/services"
                className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" /> New Filing
              </Link>
            </div>

            {applications.length > 0 ? (
              <div className="space-y-3">
                {applications.map((app, idx) => {
                  const badge = getModuleBadge(app.module_type);
                  return (
                    <div
                      key={app.id || idx}
                      className="p-4 rounded-2xl border border-slate-200 flex items-center justify-between text-xs hover:bg-slate-50/50 transition"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 font-mono">{app.application_number}</span>
                          <span
                            className={`text-[9px] uppercase font-bold px-1.5 py-0.2 rounded border ${badge.color}`}
                          >
                            {badge.label}
                          </span>
                        </div>
                        <div className="text-slate-500 mt-0.5">
                          {app.service_name || app.business_type} · {app.state || 'India'}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                          {app.customer_status}
                        </span>
                        <button
                          onClick={() => {
                            setSelectedAppIndex(idx);
                            setActiveTab('overview');
                          }}
                          className="px-3 py-1.5 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition cursor-pointer"
                        >
                          View Track &rarr;
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-slate-400">
                No statutory filings recorded yet.
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
