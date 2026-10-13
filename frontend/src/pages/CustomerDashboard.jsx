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
  ShieldCheck,
  CheckCircle2,
  Clock,
  Download,
  Plus,
  RefreshCw,
  FileText,
  PhoneCall,
  ArrowRight,
  Lock,
} from 'lucide-react';

export default function CustomerDashboard() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { showSuccess, showError } = useToast();
  const { socket, joinApplication, joinUser } = useSocket();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'profile', 'businesses', 'applications'
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdLoading, setPwdLoading] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      showError('Please fill in all password fields.');
      return;
    }
    if (newPassword.length < 6) {
      showError('New password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      showError('New password and confirmation do not match.');
      return;
    }
    setPwdLoading(true);
    try {
      const res = await api.changePassword({
        current_password: currentPassword,
        new_password: newPassword,
      });
      if (res.success) {
        showSuccess('Password updated successfully. A security confirmation was sent to your registered email.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        showError(res.message || 'Failed to update password.');
      }
    } catch (err) {
      showError(err.message || 'Failed to update password. Please check your current password.');
    } finally {
      setPwdLoading(false);
    }
  };

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
    } catch {
      showError('Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading && !user) return;

    if (!isAuthenticated) {
      navigate('/login?redirect=/dashboard', { replace: true });
      return;
    }
    if (user?.role === 'CA') {
      navigate('/ca/dashboard', { replace: true });
      return;
    }
    if (user?.role === 'ADMIN') {
      navigate('/admin', { replace: true });
      return;
    }
    fetchDashboardData();
  }, [isAuthenticated, user, authLoading]);

  const [searchParams] = useSearchParams();
  const [selectedAppIndex, setSelectedAppIndex] = useState(0);
  const activeApp = applications[selectedAppIndex] || applications[0];
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
          showSuccess(`Live Update: ${data.customer_status || 'Application Updated'}`);
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
          showSuccess('Official Statutory Registration Certificate has been issued and is available for download.');
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
      case 'UDYAM':
      case 'MSME':
        return { title: '2. Verified by CA', desc: 'Udyam Dossier & NIC Checked' };
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
      case 'UDYAM':
      case 'MSME':
        return {
          title: '3. Filed on MSME Portal',
          desc: activeApp?.arn ? `Ack: ${activeApp.arn}` : 'Ministry of MSME Verification',
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
      case 'UDYAM':
      case 'MSME':
        return {
          title: '4. Udyam Certificate Ready',
          desc: activeApp?.gstin ? `Udyam: ${activeApp.gstin}` : 'Official MSME e-Certificate',
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
    showSuccess('Downloading official registration certificate...');

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
        : moduleType === 'UDYAM' || moduleType === 'MSME'
        ? 'UDYAM_CERT'
        : 'GST_REG06';
    link.download = `${prefix}_${activeApp?.gstin || activeApp?.application_number || 'Certificate'}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading || (authLoading && !user)) {
    return (
      <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center p-6">
        <div className="text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-[#155EEF] animate-spin mx-auto" />
          <div className="text-sm font-semibold text-[#252B36]">Loading Compliance Portal...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-r border-[#E5E7EB] p-5 space-y-6 shrink-0">
        <div className="space-y-1 pb-4 border-b border-[#E5E7EB]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider">Account Portal</span>
            <Link to="/" className="text-[11px] font-medium text-[#155EEF] hover:underline flex items-center gap-1">
              ← Home
            </Link>
          </div>
          <div className="font-bold text-base text-[#252B36] truncate">{user?.full_name}</div>
          <div className="text-xs text-[#667085] truncate">{user?.email}</div>
        </div>

        <nav className="space-y-1 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition text-left cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[#EFF8FF] text-[#155EEF] border border-[#B2DDFF]'
                : 'text-[#667085] hover:bg-[#F8F9FB] hover:text-[#252B36]'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            Overview & Status
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition text-left cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-[#EFF8FF] text-[#155EEF] border border-[#B2DDFF]'
                : 'text-[#667085] hover:bg-[#F8F9FB] hover:text-[#252B36]'
            }`}
          >
            <User className="w-4 h-4" />
            Master Profile
            <span className="ml-auto text-[10px] bg-[#ECFDF3] text-[#027A48] border border-[#A6F4C5] font-semibold px-1.5 py-0.5 rounded">
              Verified
            </span>
          </button>

          <button
            onClick={() => setActiveTab('businesses')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition text-left cursor-pointer ${
              activeTab === 'businesses'
                ? 'bg-[#EFF8FF] text-[#155EEF] border border-[#B2DDFF]'
                : 'text-[#667085] hover:bg-[#F8F9FB] hover:text-[#252B36]'
            }`}
          >
            <Building2 className="w-4 h-4" />
            My Businesses
            <span className="ml-auto text-xs font-medium text-[#667085]">{businesses.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('applications')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition text-left cursor-pointer ${
              activeTab === 'applications'
                ? 'bg-[#EFF8FF] text-[#155EEF] border border-[#B2DDFF]'
                : 'text-[#667085] hover:bg-[#F8F9FB] hover:text-[#252B36]'
            }`}
          >
            <FileText className="w-4 h-4" />
            Statutory Filings
            <span className="ml-auto text-xs font-medium text-[#667085]">{applications.length}</span>
          </button>
        </nav>

        {/* Assigned CA Mini Card */}
        <div className="p-4 rounded-xl bg-[#F8F9FB] border border-[#E5E7EB] space-y-2 text-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#155EEF]">Assigned Professional</div>
          <div className="font-bold text-sm text-[#252B36]">{activeApp?.assigned_ca_name || 'Senior CA Review Team'}</div>
          <div className="text-[11px] text-[#667085]">Statutory Compliance Desk</div>
          <div className="pt-2 flex gap-2">
            <a
              href="https://wa.me/9118008908800"
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-1.5 rounded-lg bg-[#027A48] hover:bg-[#05603A] text-center font-semibold text-[11px] text-white transition shadow-xs"
            >
              WhatsApp
            </a>
            <a
              href="tel:18008908800"
              className="flex-1 py-1.5 rounded-lg bg-white hover:bg-[#F3F4F6] text-center font-semibold text-[11px] text-[#252B36] border border-[#E5E7EB] transition"
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
                <h1 className="text-xl sm:text-2xl font-bold text-[#252B36]">
                  Welcome back, {user?.full_name?.split(' ')[0]} 👋
                </h1>
                <p className="text-xs text-[#667085] mt-0.5">
                  Live status of your statutory filings and verified compliance certificates.
                </p>
              </div>

              <Link
                to="/services"
                className="px-4 py-2.5 rounded-lg bg-[#155EEF] hover:bg-[#1048C6] text-white font-semibold text-xs shadow-xs transition flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Start New Statutory Filing
              </Link>
            </div>

            {/* Multi-Application Selector Tabs */}
            {applications.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider mr-1">
                  Active Cases ({applications.length}):
                </span>
                {applications.map((app, idx) => (
                  <button
                    key={app.id || idx}
                    onClick={() => setSelectedAppIndex(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                      selectedAppIndex === idx
                        ? 'bg-[#155EEF] text-white shadow-xs'
                        : 'bg-white text-[#252B36] border border-[#E5E7EB] hover:bg-[#F8F9FB]'
                    }`}
                  >
                    <span className={`text-[10px] uppercase px-1.5 py-0.5 rounded font-bold ${
                      selectedAppIndex === idx ? 'bg-white/20 text-white' : 'bg-[#EFF8FF] text-[#155EEF]'
                    }`}>
                      {app.module_type || 'GST'}
                    </span>
                    <span className="font-mono text-[11px]">{app.application_number}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Active Application Card */}
            {activeApp ? (
              <div className="bg-white rounded-xl p-6 sm:p-7 border border-[#E5E7EB] shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#E5E7EB] pb-5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#252B36] bg-[#F8F9FB] border border-[#E5E7EB] px-2 py-0.5 rounded">
                        {activeApp.application_number}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-[#155EEF] bg-[#EFF8FF] px-2 py-0.5 rounded border border-[#B2DDFF]">
                        {activeApp.module_type || 'GST'}
                      </span>
                      <span className="text-xs font-semibold text-[#027A48] bg-[#ECFDF3] px-2.5 py-0.5 rounded-full border border-[#A6F4C5]">
                        {activeApp.customer_status}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-[#252B36] mt-2">
                      {activeApp.service_name || activeApp.fields_data?.legal_name || activeApp.business_type || 'Statutory Compliance Dossier'}
                    </h2>
                    <div className="text-xs text-[#667085] mt-0.5">
                      Jurisdiction: {activeApp.state} · Principal Activity: {activeApp.fields_data?.business_activity || 'Statutory Enterprise'}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3.5 py-1.5 rounded-lg bg-[#F8F9FB] text-[#252B36] font-medium text-xs border border-[#E5E7EB]">
                      Filing Managed by Assigned CA
                    </span>
                  </div>
                </div>

                {/* 4-Stage Statutory Progress Tracker */}
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-[#252B36] mb-3">
                    <div className="flex items-center gap-2">
                      <span>Statutory Filing Milestones</span>
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#ECFDF3] text-[#027A48] text-[10px] font-semibold border border-[#A6F4C5]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#12B76A] animate-ping"></span>
                        Live Statutory Sync
                      </span>
                    </div>
                    <span className="text-[#155EEF] font-bold">
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
                      let bg = 'bg-[#F8F9FB] text-[#667085] border-[#E5E7EB]';
                      let icon = idx + 1;

                      if (step.status === 'done') {
                        bg = 'bg-[#ECFDF3] text-[#027A48] border-[#A6F4C5] font-semibold';
                        icon = '✓';
                      } else if (step.status === 'active') {
                        bg = 'bg-[#EFF8FF] text-[#155EEF] border-[#B2DDFF] font-semibold';
                        icon = '⏳';
                      }

                      return (
                        <div key={idx} className={`p-3.5 rounded-lg border text-center space-y-1.5 transition ${bg}`}>
                          <div className="w-6 h-6 rounded-full bg-white mx-auto flex items-center justify-center text-xs font-bold shadow-xs">
                            {icon}
                          </div>
                          <div className="text-xs font-semibold leading-tight">{step.title}</div>
                          <div className="text-[10px] opacity-80">{step.desc}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* ARN & Official Registration Allotment Card */}
                <div className="p-5 rounded-lg bg-[#F8F9FB] border border-[#E5E7EB] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs items-center">
                  <div>
                    <div className="text-[#667085] font-bold uppercase text-[10px] tracking-wider">
                      {moduleType === 'COMPANY'
                        ? 'Corporate SRN'
                        : moduleType === 'ITR'
                        ? 'ITD Ack No'
                        : moduleType === 'TRADEMARK'
                        ? 'TM Application No'
                        : moduleType === 'LLP'
                        ? 'FiLLiP SRN'
                        : moduleType === 'UDYAM' || moduleType === 'MSME'
                        ? 'Udyam Ack No'
                        : 'Government ARN'}
                    </div>
                    <div className="font-mono font-semibold text-[#252B36] text-sm mt-0.5">
                      {activeApp.arn ? (
                        <span className="text-[#027A48] font-bold">{activeApp.arn}</span>
                      ) : (
                        <span className="text-[#98A2B3] italic">Generated upon submission</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="text-[#667085] font-bold uppercase text-[10px] tracking-wider">
                      {moduleType === 'COMPANY'
                        ? 'Corporate CIN'
                        : moduleType === 'ITR'
                        ? 'Assessment Ref'
                        : moduleType === 'TRADEMARK'
                        ? 'Registered TM No'
                        : moduleType === 'LLP'
                        ? 'Allotted LLPIN'
                        : moduleType === 'UDYAM' || moduleType === 'MSME'
                        ? 'Udyam Reg Number'
                        : 'Allotted GSTIN'}
                    </div>
                    <div className="font-mono font-semibold text-sm mt-0.5">
                      {activeApp.gstin ? (
                        <span className="text-[#027A48] font-bold">{activeApp.gstin}</span>
                      ) : (
                        <span className="text-[#98A2B3] italic">Issued upon final approval</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center sm:justify-end">
                    <button
                      onClick={handleDownloadCertificate}
                      disabled={activeApp.internal_status !== 'COMPLETED' && !activeApp.certificate_url && !activeApp.gstin}
                      className={`px-4 py-2.5 rounded-lg font-semibold text-xs flex items-center gap-2 transition ${
                        activeApp.internal_status === 'COMPLETED' || activeApp.certificate_url || activeApp.gstin
                          ? 'bg-[#155EEF] hover:bg-[#1048C6] text-white cursor-pointer active:scale-95 shadow-xs'
                          : 'bg-[#F3F4F6] text-[#98A2B3] border border-[#E5E7EB] cursor-not-allowed'
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
                          : moduleType === 'UDYAM' || moduleType === 'MSME'
                          ? 'Download Udyam Certificate'
                          : 'Download GST Certificate (REG-06)'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Hero Get Started Banner */}
                <div className="rounded-xl bg-white border border-[#E5E7EB] p-6 sm:p-8 shadow-xs space-y-4">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#EFF8FF] text-[#155EEF] text-xs font-semibold border border-[#B2DDFF]">
                    Zero Active Filings • 3-Step Guided Filing
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#252B36] tracking-tight">
                    Start Your Business Statutory Registrations
                  </h2>
                  <p className="text-xs sm:text-sm text-[#667085] leading-relaxed max-w-2xl">
                    You have not initiated any filings yet. Every application on BharatFiling is verified, prepared, and filed by verified Chartered Accountants and corporate compliance professionals.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-3">
                    <Link
                      to="/apply/gst"
                      className="px-5 py-2.5 rounded-lg bg-[#155EEF] hover:bg-[#1048C6] text-white font-semibold text-xs shadow-xs transition flex items-center gap-2"
                    >
                      <FileCheck2 className="w-4 h-4" />
                      <span>Apply for GST Registration (₹1,769 All-Inclusive) &rarr;</span>
                    </Link>
                    <Link
                      to="/services"
                      className="px-4 py-2.5 rounded-lg bg-white hover:bg-[#F8F9FB] text-[#252B36] font-semibold text-xs border border-[#E5E7EB] transition"
                    >
                      Explore All Services
                    </Link>
                  </div>
                </div>

                {/* Available Statutory Compliance Modules */}
                <div>
                  <h3 className="text-xs font-bold text-[#667085] uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#155EEF]" />
                    Available Statutory Compliance Modules
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* GST Module */}
                    <div className="p-5 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#155EEF] transition flex flex-col justify-between space-y-4 shadow-xs">
                      <div className="space-y-2">
                        <div className="w-9 h-9 rounded-lg bg-[#EFF8FF] text-[#155EEF] flex items-center justify-center font-bold text-sm">
                          GST
                        </div>
                        <h4 className="font-bold text-[#252B36] text-sm">GST Registration</h4>
                        <p className="text-xs text-[#667085] leading-relaxed">
                          Form REG-01 filing, 15-digit ARN generation, and official Form REG-06 Certificate allotment.
                        </p>
                      </div>
                      <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
                        <span className="font-bold text-[#252B36] text-xs">₹1,769 All-Inclusive</span>
                        <Link
                          to="/apply/gst"
                          className="px-3 py-1.5 rounded-lg bg-[#155EEF] hover:bg-[#1048C6] text-white text-xs font-semibold"
                        >
                          Apply Now &rarr;
                        </Link>
                      </div>
                    </div>

                    {/* Udyam Registration */}
                    <div className="p-5 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#155EEF] transition flex flex-col justify-between space-y-4 shadow-xs">
                      <div className="space-y-2">
                        <div className="w-9 h-9 rounded-lg bg-[#EFF8FF] text-[#155EEF] flex items-center justify-center font-bold text-sm">
                          MSME
                        </div>
                        <h4 className="font-bold text-[#252B36] text-sm">Udyam / MSME Registration</h4>
                        <p className="text-xs text-[#667085] leading-relaxed">
                          Ministry of MSME official registration with 3-tier NIC code classification and government certificate.
                        </p>
                      </div>
                      <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
                        <span className="font-bold text-[#252B36] text-xs">₹999 All-Inclusive</span>
                        <Link
                          to="/apply/udyam"
                          className="px-3 py-1.5 rounded-lg bg-[#155EEF] hover:bg-[#1048C6] text-white text-xs font-semibold"
                        >
                          Apply Now &rarr;
                        </Link>
                      </div>
                    </div>

                    {/* Company Registration */}
                    <div className="p-5 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#155EEF] transition flex flex-col justify-between space-y-4 shadow-xs">
                      <div className="space-y-2">
                        <div className="w-9 h-9 rounded-lg bg-[#EFF8FF] text-[#155EEF] flex items-center justify-center font-bold text-sm">
                          MCA
                        </div>
                        <h4 className="font-bold text-[#252B36] text-sm">Private Limited Company</h4>
                        <p className="text-xs text-[#667085] leading-relaxed">
                          MCA SPICe+ incorporation with RUN name approval, DIN, PAN, TAN and Certificate of Incorporation.
                        </p>
                      </div>
                      <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
                        <span className="font-bold text-[#252B36] text-xs">₹4,999 All-Inclusive</span>
                        <Link
                          to="/services/company-registration"
                          className="px-3 py-1.5 rounded-lg bg-[#155EEF] hover:bg-[#1048C6] text-white text-xs font-semibold"
                        >
                          Apply Now &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3 Operational Standards */}
                <div className="p-5 rounded-xl bg-white border border-[#E5E7EB] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs shadow-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#EFF8FF] text-[#155EEF] flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#252B36]">Assigned Chartered Accountant</div>
                      <div className="text-[11px] text-[#667085] mt-0.5">Every statutory filing is verified by a qualified professional.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#EFF8FF] text-[#155EEF] flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#252B36]">Live Application Sync</div>
                      <div className="text-[11px] text-[#667085] mt-0.5">Stage progression updates directly as each phase is completed.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#EFF8FF] text-[#155EEF] flex items-center justify-center shrink-0">
                      <FileCheck2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#252B36]">Direct Certificate Delivery</div>
                      <div className="text-[11px] text-[#667085] mt-0.5">Download government certificates directly from your account dashboard.</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* MASTER PROFILE TAB */}
        {activeTab === 'profile' && profile && (
          <div className="bg-white rounded-xl p-6 sm:p-7 border border-[#E5E7EB] shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4">
              <div>
                <h2 className="text-lg font-bold text-[#252B36]">Master Customer Profile</h2>
                <p className="text-xs text-[#667085] mt-0.5">
                  Centralized identity dossier verified once and referenced across statutory filings.
                </p>
              </div>
              <span className="bg-[#ECFDF3] text-[#027A48] text-xs font-semibold px-2.5 py-1 rounded-md border border-[#A6F4C5] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Profile
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
              {/* Personal Details */}
              <div className="p-4 rounded-lg bg-[#F8F9FB] border border-[#E5E7EB] space-y-3">
                <h3 className="font-bold text-[#252B36] text-xs uppercase tracking-wider">Personal Information</h3>
                <div className="space-y-1.5 text-[#252B36]">
                  <div>Full Name: <strong className="font-semibold">{profile.personal_info?.full_name}</strong></div>
                  <div>Father's Name: <strong className="font-semibold">{profile.personal_info?.father_name}</strong></div>
                  <div>Date of Birth: <strong className="font-semibold">{profile.personal_info?.dob}</strong></div>
                  <div>Gender: <strong className="font-semibold">{profile.personal_info?.gender || 'Not specified'}</strong></div>
                </div>
              </div>

              {/* Identity Details */}
              <div className="p-4 rounded-lg bg-[#F8F9FB] border border-[#E5E7EB] space-y-3">
                <h3 className="font-bold text-[#252B36] text-xs uppercase tracking-wider">Statutory Identity Proofs</h3>
                <div className="space-y-2 text-[#252B36]">
                  <div className="flex items-center justify-between">
                    <span>PAN Number: <strong className="font-mono">{profile.identity_info?.pan_number}</strong></span>
                    <span className="text-[10px] bg-[#ECFDF3] text-[#027A48] border border-[#A6F4C5] font-semibold px-1.5 py-0.5 rounded">Verified</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Aadhaar: <strong className="font-mono">XXXX-XXXX-1012</strong></span>
                    <span className="text-[10px] bg-[#ECFDF3] text-[#027A48] border border-[#A6F4C5] font-semibold px-1.5 py-0.5 rounded">Verified</span>
                  </div>
                </div>
              </div>

              {/* Address Details */}
              <div className="p-4 rounded-lg bg-[#F8F9FB] border border-[#E5E7EB] space-y-2 sm:col-span-2">
                <h3 className="font-bold text-[#252B36] text-xs uppercase tracking-wider">Permanent Address</h3>
                <div className="text-[#252B36] leading-relaxed">
                  {profile.address_info?.address_line_1}, {profile.address_info?.address_line_2}, {profile.address_info?.city}, {profile.address_info?.state} — {profile.address_info?.pincode}
                </div>
              </div>

              {/* Security & Password Management */}
              <div className="p-5 rounded-lg bg-white border border-[#E5E7EB] space-y-4 sm:col-span-2">
                <div className="flex items-center gap-2 pb-2 border-b border-[#E5E7EB]">
                  <div className="w-7 h-7 rounded-md bg-[#EFF8FF] text-[#155EEF] flex items-center justify-center">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#252B36] text-sm">Security & Password Management</h3>
                    <p className="text-[11px] text-[#667085]">
                      Update your login password. An email audit alert is dispatched upon confirmation.
                    </p>
                  </div>
                </div>

                <form onSubmit={handlePasswordChange} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[#252B36] font-medium mb-1">Current Password</label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3 py-2 rounded-lg border border-[#E5E7EB] bg-white text-[#252B36] text-xs focus:border-[#155EEF] focus:outline-hidden"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[#252B36] font-medium mb-1">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      className="w-full px-3 py-2 rounded-lg border border-[#E5E7EB] bg-white text-[#252B36] text-xs focus:border-[#155EEF] focus:outline-hidden"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[#252B36] font-medium mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      className="w-full px-3 py-2 rounded-lg border border-[#E5E7EB] bg-white text-[#252B36] text-xs focus:border-[#155EEF] focus:outline-hidden"
                      required
                    />
                  </div>

                  <div className="sm:col-span-3 flex justify-end pt-2">
                    <button
                      type="submit"
                      disabled={pwdLoading}
                      className="px-4 py-2 rounded-lg bg-[#155EEF] hover:bg-[#1048C6] text-white font-semibold text-xs shadow-xs transition disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
                    >
                      {pwdLoading ? 'Updating Password...' : 'Save New Password'}
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* BUSINESSES TAB */}
        {activeTab === 'businesses' && (
          <div className="bg-white rounded-xl p-6 sm:p-7 border border-[#E5E7EB] shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4">
              <div>
                <h2 className="text-lg font-bold text-[#252B36]">Registered Business Profiles</h2>
                <p className="text-xs text-[#667085] mt-0.5">
                  Manage multiple registered enterprise structures under one unified master account.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {businesses.length > 0 ? (
                businesses.map((biz) => (
                  <div
                    key={biz.id}
                    className="p-4 rounded-lg border border-[#E5E7EB] bg-[#F8F9FB] flex items-center justify-between"
                  >
                    <div className="space-y-1 text-xs">
                      <div className="font-bold text-sm text-[#252B36]">{biz.legal_name}</div>
                      <div className="text-[#667085]">
                        Type: <strong className="text-[#252B36]">{biz.business_type}</strong> | State: <strong className="text-[#252B36]">{biz.state}</strong>
                      </div>
                      <div className="text-[#667085] text-[11px]">{biz.address_line_1}, {biz.city}</div>
                    </div>

                    <Link
                      to="/apply/gst"
                      className="px-3.5 py-1.5 rounded-lg bg-[#155EEF] hover:bg-[#1048C6] text-white font-semibold text-xs transition"
                    >
                      Apply Filing &rarr;
                    </Link>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-xs text-[#667085]">
                  No businesses created yet. Business profiles are generated automatically upon your first filing.
                </div>
              )}
            </div>
          </div>
        )}

        {/* APPLICATIONS TAB */}
        {activeTab === 'applications' && (
          <div className="bg-white rounded-xl p-6 sm:p-7 border border-[#E5E7EB] shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4">
              <div>
                <h2 className="text-lg font-bold text-[#252B36]">All Statutory Filings</h2>
                <p className="text-xs text-[#667085] mt-0.5">
                  Audit registry of all taxation, business registration, and licensing filings.
                </p>
              </div>
              <Link
                to="/services"
                className="px-3.5 py-2 rounded-lg bg-[#155EEF] hover:bg-[#1048C6] text-white font-semibold text-xs transition flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Start New Filing
              </Link>
            </div>

            {applications.length > 0 ? (
              <div className="space-y-3">
                {applications.map((app, idx) => (
                  <div
                    key={app.id || idx}
                    className="p-4 rounded-lg border border-[#E5E7EB] bg-white hover:border-[#155EEF] hover:shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs transition group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#252B36] font-mono text-sm">{app.application_number}</span>
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#EFF8FF] text-[#155EEF] border border-[#B2DDFF]">
                          {app.module_type || 'GST'}
                        </span>
                      </div>
                      <div className="text-[#667085] mt-1">
                        {app.service_name || app.business_type} · {app.state || 'India'}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-[#027A48] bg-[#ECFDF3] px-2.5 py-1 rounded-md border border-[#A6F4C5]">
                        {app.customer_status || 'In Progress'}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedAppIndex(idx);
                          setActiveTab('overview');
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-[#155EEF] hover:bg-[#1048C6] text-white font-semibold text-xs shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Open & Track</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-[#667085] space-y-3">
                <div>No statutory filings recorded yet.</div>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#155EEF] hover:bg-[#1048C6] text-white font-semibold text-xs shadow-xs transition"
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
