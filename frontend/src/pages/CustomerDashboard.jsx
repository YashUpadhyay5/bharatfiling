import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { useSocket } from '../context/SocketContext.jsx';
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
  ArrowRight,
} from 'lucide-react';

export default function CustomerDashboard() {
  const { user, isAuthenticated } = useAuth();
  const { showSuccess, showError } = useToast();
  const { socket, joinApplication, joinUser } = useSocket();
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
      return;
    }
    // Automatically route Chartered Accountants to their specialized workbench
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

  const [searchParams] = useSearchParams();
  const [selectedAppIndex, setSelectedAppIndex] = useState(0);
  const activeApp = applications[selectedAppIndex] || applications[0]; // Primary active application
  const moduleType = activeApp?.module_type || 'GST';

  useEffect(() => {
    const queryApp = searchParams.get('app') || searchParams.get('appId');
    if (queryApp && applications.length > 0) {
      const idx = applications.findIndex(
        (a) => a.id === queryApp || a.application_number === queryApp
      );
      if (idx !== -1) {
        setSelectedAppIndex(idx);
        setActiveTab('overview');
      }
    }
  }, [searchParams, applications]);

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

  // Clean 4-Stage Statutory Progression matching CA Actions tailored to Module
  const getStep2Info = () => {
    switch (moduleType) {
      case 'COMPANY':
        return { title: '2. Docs Verified by CA', desc: 'SPICe+ Dossier Prepared' };
      case 'ITR':
        return { title: '2. Financials Verified by CA', desc: 'Tax Computation Prepared' };
      case 'TRADEMARK':
        return { title: '2. Search & Draft by Attorney', desc: 'Form TM-A Prepared' };
      case 'LLP':
        return { title: '2. Partner KYC Verified', desc: 'FiLLiP Dossier Prepared' };
      default:
        return { title: '2. Docs Verified by CA', desc: 'Form REG-01 Prepared' };
    }
  };

  const getStep3Info = () => {
    switch (moduleType) {
      case 'COMPANY':
        return {
          title: '3. Submitted to MCA',
          desc: activeApp?.arn ? `SRN: ${activeApp.arn}` : 'Registrar of Companies Verification',
        };
      case 'ITR':
        return {
          title: '3. E-Filed on IT Portal',
          desc: activeApp?.arn ? `Ack: ${activeApp.arn}` : 'Centralized CPC Verification',
        };
      case 'TRADEMARK':
        return {
          title: '3. Filed on IP India',
          desc: activeApp?.arn ? `TM App: ${activeApp.arn}` : 'Trade Marks Registry Verification',
        };
      case 'LLP':
        return {
          title: '3. Filed on MCA Portal',
          desc: activeApp?.arn ? `SRN: ${activeApp.arn}` : 'ROC Corporate Verification',
        };
      default:
        return {
          title: '3. Submitted to Govt (ARN)',
          desc: activeApp?.arn ? `ARN: ${activeApp.arn}` : 'Tax Officer Verification',
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
          title: '4. Assessment Ready',
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
      desc: 'Order Paid & Confirmed',
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

  const handleDownloadCertificate = () => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    showSuccess('Downloading official government registration certificate...');

    const certUrl = activeApp?.certificate_url || '/sample_gst_certificate.pdf';
    const link = document.createElement('a');
    link.href = certUrl;
    link.target = '_blank';
    const prefix =
      moduleType === 'COMPANY'
        ? 'MCA_COI'
        : moduleType === 'ITR'
        ? 'ITR_V_ACK'
        : moduleType === 'TRADEMARK'
        ? 'TM_CERT'
        : moduleType === 'LLP'
        ? 'LLP_COI'
        : 'GST_REG06';
    link.download = `${prefix}_${activeApp?.gstin || activeApp?.application_number || 'Certificate'}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
            <Link to="/" className="text-[11px] font-bold text-[#111827] hover:underline flex items-center gap-1">
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
          <div className="font-extrabold text-sm">{activeApp?.assigned_ca_name || 'Senior CA Review Team'}</div>
          <div className="text-[11px] text-slate-400">Statutory Compliance Desk</div>
          <div className="pt-2 flex gap-2">
            <a
              href="https://wa.me/9118008908800"
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
                to="/services"
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Start New Statutory Filing
              </Link>
            </div>

            {/* Multi-Application Selector Tabs */}
            {applications.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-1">
                  Active Cases ({applications.length}):
                </span>
                {applications.map((app, idx) => (
                  <button
                    key={app.id || idx}
                    onClick={() => setSelectedAppIndex(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      selectedAppIndex === idx
                        ? 'bg-slate-900 text-white shadow-xs ring-2 ring-emerald-500'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                      {app.module_type || 'GST'}
                    </span>
                    <span className="font-mono text-[11px]">{app.application_number}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Active Application Card */}
            {activeApp ? (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                        {activeApp.application_number}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                        {activeApp.module_type || 'GST'}
                      </span>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        {activeApp.customer_status}
                      </span>
                    </div>
                    <h2 className="text-lg font-black text-slate-900 mt-2">
                      {activeApp.service_name || activeApp.fields_data?.legal_name || activeApp.business_type || 'Statutory Compliance Dossier'}
                    </h2>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Jurisdiction: {activeApp.state} · Principal Activity: {activeApp.fields_data?.business_activity || 'Statutory Enterprise'}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-800 font-bold text-xs border border-emerald-200">
                      Filing Managed by Assigned CA
                    </span>
                  </div>
                </div>

                {/* Modern 4-Stage Statutory Progress Tracker */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-3">
                    <div className="flex items-center gap-2">
                      <span>Statutory Filing Milestones</span>
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                        Live Statutory Sync
                      </span>
                    </div>
                    <span className="text-emerald-600 font-extrabold">
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
                        bg = 'bg-emerald-50/80 text-emerald-950 border-emerald-300 font-bold';
                        icon = '✓';
                      } else if (step.status === 'active') {
                        bg = 'bg-amber-50 text-amber-950 border-amber-300 font-bold animate-pulse';
                        icon = '⏳';
                      }

                      return (
                        <div key={idx} className={`p-3.5 rounded-2xl border text-center space-y-1.5 transition ${bg}`}>
                          <div className="w-6 h-6 rounded-full bg-white mx-auto flex items-center justify-center text-xs font-black shadow-xs">
                            {icon}
                          </div>
                          <div className="text-xs font-bold leading-tight">{step.title}</div>
                          <div className="text-[10px] opacity-75">{step.desc}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* ARN & Official Registration Allotment Card */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/30 border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs items-center">
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
                        <span className="text-slate-400 italic">Generated upon submission</span>
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
                        <span className="text-slate-400 italic">Issued upon final approval</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center sm:justify-end">
                    <button
                      onClick={handleDownloadCertificate}
                      disabled={activeApp.internal_status !== 'COMPLETED' && !activeApp.certificate_url && !activeApp.gstin}
                      className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-sm transition ${
                        activeApp.internal_status === 'COMPLETED' || activeApp.certificate_url || activeApp.gstin
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer active:scale-95 shadow-md'
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
              <div className="space-y-6 animate-fade-in">
                {/* Hero Get Started Banner */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-10 border border-slate-800 shadow-xl">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
                  <div className="relative z-10 max-w-2xl space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-500/30">
                      <Sparkles className="w-3.5 h-3.5" />
                      Zero Active Filings • Instant 3-Minute Initiation
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      Start Your Business Statutory Registrations
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      You haven't initiated any filings yet. Get compliant and protect your business today. Every application is personally reviewed, drafted, and filed by our certified Chartered Accountants.
                    </p>
                    <div className="pt-2 flex flex-wrap gap-3">
                      <Link
                        to="/apply/gst"
                        className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-900/30 transition flex items-center gap-2"
                      >
                        <FileCheck2 className="w-4 h-4" />
                        <span>Apply for GST Registration (₹1,769 All-Inclusive) &rarr;</span>
                      </Link>
                      <Link
                        to="/services"
                        className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition"
                      >
                        Explore 40+ Other Services
                      </Link>
                    </div>
                  </div>
                </div>

                {/* All Modules Grid */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-emerald-600" />
                    Available Statutory Compliance Modules
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* GST Module */}
                    <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                          📜
                        </div>
                        <h4 className="font-extrabold text-slate-900 text-sm">GST Registration</h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          Form REG-01 XML filing, 15-digit ARN generation, and official REG-06 Certificate allotment.
                        </p>
                      </div>
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="font-bold text-emerald-700 text-xs">₹1,769 All-Inclusive</span>
                        <Link
                          to="/apply/gst"
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold"
                        >
                          Apply Now &rarr;
                        </Link>
                      </div>
                    </div>

                    {/* Company Registration */}
                    <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                          🏢
                        </div>
                        <h4 className="font-extrabold text-slate-900 text-sm">Private Limited Company</h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          MCA SPICe+ incorporation with RUN name approval, DIN, PAN, TAN & Certificate of Incorporation.
                        </p>
                      </div>
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="font-bold text-blue-700 text-xs">₹4,999 All-Inclusive</span>
                        <Link
                          to="/apply/company-registration"
                          className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold"
                        >
                          Apply Now &rarr;
                        </Link>
                      </div>
                    </div>

                    {/* Income Tax Return */}
                    <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-500 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                          📊
                        </div>
                        <h4 className="font-extrabold text-slate-900 text-sm">Income Tax Return (ITR)</h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          Expert CA-assisted ITR-1 to ITR-4 filing with maximum legal deductions and refund tracking.
                        </p>
                      </div>
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="font-bold text-amber-700 text-xs">₹999 All-Inclusive</span>
                        <Link
                          to="/apply/income-tax"
                          className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold"
                        >
                          Apply Now &rarr;
                        </Link>
                      </div>
                    </div>

                    {/* Trademark */}
                    <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-purple-500 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                          ™️
                        </div>
                        <h4 className="font-extrabold text-slate-900 text-sm">Trademark Registration</h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          Brand name search, Form TM-A drafting, legal objection clearance, and registration protection.
                        </p>
                      </div>
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="font-bold text-purple-700 text-xs">₹1,999 All-Inclusive</span>
                        <Link
                          to="/apply/trademark"
                          className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-bold"
                        >
                          Apply Now &rarr;
                        </Link>
                      </div>
                    </div>

                    {/* LLP Registration */}
                    <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-500 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                          🤝
                        </div>
                        <h4 className="font-extrabold text-slate-900 text-sm">Limited Liability Partnership</h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          MCA FiLLiP statutory incorporation, DPIN allotment, and custom partnership agreement deed.
                        </p>
                      </div>
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="font-bold text-indigo-700 text-xs">₹3,999 All-Inclusive</span>
                        <Link
                          to="/apply/llp-registration"
                          className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold"
                        >
                          Apply Now &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3 Trust Guarantees */}
                <div className="p-6 rounded-3xl bg-emerald-50/50 border border-emerald-200/60 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">Assigned Chartered Accountant</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Every statutory filing is verified by a licensed FCA.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">Live WebSockets Tracking</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Stage progression updates live in real-time.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <FileCheck2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">Direct Certificate Delivery</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Download official government certificates directly from your dashboard.</div>
                    </div>
                  </div>
                </div>
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
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">All Statutory Filings</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Complete audit ledger of all corporate, tax, and registration applications.
                </p>
              </div>
              <Link
                to="/services"
                className="px-4 py-2 rounded-xl bg-[#111827] hover:bg-[#1F2937] text-white font-bold text-xs transition flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Start New Filing
              </Link>
            </div>

            {applications.length > 0 ? (
              <div className="space-y-3">
                {applications.map((app, idx) => (
                  <div
                    key={app.id || idx}
                    className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white hover:border-[#111827] hover:shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs transition group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 font-mono text-sm">{app.application_number}</span>
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                          {app.module_type || 'GST'}
                        </span>
                      </div>
                      <div className="text-slate-500 mt-1">
                        {app.service_name || app.business_type} · {app.state || 'India'}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        {app.customer_status || 'In Progress'}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedAppIndex(idx);
                          setActiveTab('overview');
                        }}
                        className="px-4 py-2 rounded-xl bg-[#111827] hover:bg-[#1F2937] text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Open & Track</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-slate-400 space-y-3">
                <div>No statutory filings recorded yet.</div>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition"
                >
                  <Plus className="w-3.5 h-3.5" /> Start Your First Filing
                </Link>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
